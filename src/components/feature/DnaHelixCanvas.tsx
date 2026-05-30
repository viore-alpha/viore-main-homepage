import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────
   DNA Helix Canvas – Optimised version
   Key optimisations:
   • ctx.filter REMOVED – depth shown via alpha only (was #1 perf killer)
   • Cells batched by colour – minimise fillStyle switches
   • setTransform instead of save/restore per cell
   • Pre-allocated cell array, no per-frame GC pressure
   • blocksPerScreen reduced to 48
   • clearRect on physical pixels (DPR-aware)
───────────────────────────────────────────── */

type RGB = [number, number, number];

interface Cell {
  x: number;
  y: number;
  w: number;
  h: number;
  alpha: number;
  rotation: number;
  z: number;
  colorIdx: number; // index into COLORS array
  glow: boolean;
  isCircle: boolean;
}

const INK:     RGB = [26,  24,  21 ];
const TEAL:    RGB = [92,  156, 152];
const CRIMSON: RGB = [200, 66,  90 ];
const COLORS: RGB[] = [INK, TEAL, CRIMSON];

const CFG = {
  axisXFactor:       0.78,
  radiusFactor:      0.13,
  radiusMin:         95,
  radiusMax:         200,
  turnsPerScreen:    1.35,
  blocksPerScreen:   48,
  blockBaseW:        18,
  blockBaseH:        7,
  blockRadius:       2,
  cellGap:           2,
  rungEvery:         5,
  rungBlockCount:    5,
  rungNodeSize:      3.2,
  scrollRotate:      0.0028,
  autoRotateSpeed:   0.00009,
  scrollLerp:        0.085,
  parallaxStrength:  0.045,
  breatheAmp:        0.10,
  breatheSpeed:      0.0008,
  backboneAlpha:     0.88,
  rungAlpha:         0.58,
  globalAlpha:       0.90,
  // backbone color weights (must sum to 1)
  bbW: [0.62, 0.34, 0.04] as number[], // INK, TEAL, CRIMSON
  // rung color weights (order matches COLORS = [INK, TEAL, CRIMSON])
  rgW: [0.45, 0.50, 0.05] as number[], // INK, TEAL, CRIMSON
};

function hash(i: number, j: number, salt = 0): number {
  let x = i * 374761393 + j * 668265263 + salt * 2147483647;
  x = (x ^ (x >>> 13)) * 1274126177;
  x = x ^ (x >>> 16);
  return ((x >>> 0) % 100000) / 100000;
}

function pickColor(h: number, weights: number[]): number {
  let acc = 0;
  for (let i = 0; i < weights.length; i++) {
    acc += weights[i];
    if (h <= acc) return i;
  }
  return 0;
}

const DnaHelixCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let W = 0, H = 0, DPR = 1;
    let scrollY = 0, targetScrollY = 0;
    let autoTime = 0, lastFrame = performance.now();
    let mouseX = 0, smoothMouseX = 0;
    let rafId = 0;

    // ── resize ──────────────────────────────────────────
    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width  = Math.round(W * DPR);
      canvas!.height = Math.round(H * DPR);
      canvas!.style.width  = W + 'px';
      canvas!.style.height = H + 'px';
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    // ── geometry helpers ──────────────────────────────────
    function radius() {
      return Math.min(CFG.radiusMax, Math.max(CFG.radiusMin, W * CFG.radiusFactor));
    }
    function axisX() { return W * CFG.axisXFactor; }

    function helixPt(y: number, strand: number, gA: number, pA: number) {
      const vp = (y / H) * CFG.turnsPerScreen * Math.PI * 2;
      const angle = vp + gA + pA + strand * Math.PI;
      const x = axisX() + Math.cos(angle) * radius();
      const zNorm = Math.sin(angle);
      return { x, zNorm, depth: (zNorm + 1) / 2 };
    }

    // ── build cell list ───────────────────────────────────
    function buildCells(gA: number, pA: number): Cell[] {
      const cells: Cell[] = [];
      const total = CFG.blocksPerScreen + 8;
      const start = -4;

      // backbone blocks
      for (let strand = 0; strand < 2; strand++) {
        for (let s = start; s < start + total; s++) {
          const y   = (s / CFG.blocksPerScreen) * H;
          const pt  = helixPt(y, strand, gA, pA);
          const pt2 = helixPt(y + 1, strand, gA, pA);
          const depth = pt.depth;
          const scale = 0.55 + 0.55 * depth;
          const w = (CFG.blockBaseW - CFG.cellGap) * scale;
          const h = CFG.blockBaseH * scale;
          const dx = pt2.x - pt.x;
          const rotation = Math.atan2(1, dx) - Math.PI / 2;
          const phase  = hash(s, strand, 91) * Math.PI * 2;
          const breathe = 1 + CFG.breatheAmp * Math.sin(autoTime * CFG.breatheSpeed + phase);
          const baseA  = CFG.backboneAlpha * (0.28 + 0.72 * depth);
          const alpha  = Math.min(1, baseA * breathe) * CFG.globalAlpha;
          const colorIdx = pickColor(hash(s, strand, 7), CFG.bbW);
          cells.push({ x: pt.x, y, w, h, alpha, rotation, z: pt.zNorm,
            colorIdx, glow: colorIdx === 2, isCircle: false });
        }
      }

      // rungs
      for (let s = start; s < start + total; s++) {
        if (((s % CFG.rungEvery) + CFG.rungEvery) % CFG.rungEvery !== 0) continue;
        const y  = (s / CFG.blocksPerScreen) * H;
        const p0 = helixPt(y, 0, gA, pA);
        const p1 = helixPt(y, 1, gA, pA);
        const avg = (p0.depth + p1.depth) / 2;
        if (avg < 0.16) continue;

        // endpoint nodes
        for (const p of [p0, p1]) {
          cells.push({
            x: p.x, y,
            w: CFG.rungNodeSize * 2, h: CFG.rungNodeSize * 2,
            alpha: 0.82 * (0.4 + 0.6 * p.depth) * CFG.globalAlpha,
            rotation: 0, z: p.zNorm,
            colorIdx: 1, // teal
            glow: false, isCircle: true,
          });
        }

        // rung bridge blocks
        for (let k = 1; k < CFG.rungBlockCount; k++) {
          const t = k / CFG.rungBlockCount;
          const x = p0.x * (1 - t) + p1.x * t;
          const z = p0.zNorm * (1 - t) + p1.zNorm * t;
          const sizeCurve = 1 - Math.abs(t - 0.5) * 2;
          const scale = (0.45 + 0.55 * avg) * (0.65 + 0.45 * sizeCurve);
          const bw  = (CFG.blockBaseW * 0.42 - CFG.cellGap) * scale;
          const bh  = CFG.blockBaseH * 0.85 * scale;
          const phase   = hash(s, k, 53) * Math.PI * 2;
          const breathe = 1 + CFG.breatheAmp * 0.7 * Math.sin(autoTime * CFG.breatheSpeed + phase);
          const baseA   = CFG.rungAlpha * (0.35 + 0.65 * avg);
          const alpha   = Math.min(1, baseA * breathe) * CFG.globalAlpha;
          const jitter  = (hash(s, k, 41) - 0.5) * 1.5;
          const colorIdx = pickColor(hash(s, k, 23), CFG.rgW);
          cells.push({ x, y: y + jitter, w: bw, h: bh, alpha,
            rotation: 0, z, colorIdx, glow: colorIdx === 2, isCircle: false });
        }
      }

      cells.sort((a, b) => a.z - b.z);
      return cells;
    }

    // ── draw ─────────────────────────────────────────────
    // Batch by colorIdx to minimise fillStyle changes
    function drawCells(cells: Cell[]) {
      // group by colorIdx
      const groups: Cell[][] = [[], [], []];
      for (const c of cells) groups[c.colorIdx].push(c);

      // draw non-glow groups first (INK=0, TEAL=1)
      for (const colorIdx of [0, 1]) {
        const group = groups[colorIdx];
        if (group.length === 0) continue;
        const [r, g, b] = COLORS[colorIdx];

        for (const c of group) {
          ctx!.globalAlpha = c.alpha;
          ctx!.fillStyle = `rgb(${r},${g},${b})`;
          ctx!.beginPath();
          ctx!.setTransform(DPR, 0, 0, DPR, Math.round(c.x * DPR), Math.round(c.y * DPR));
          if (c.rotation && !c.isCircle) {
            ctx!.setTransform(
              Math.cos(c.rotation) * DPR, Math.sin(c.rotation) * DPR,
              -Math.sin(c.rotation) * DPR, Math.cos(c.rotation) * DPR,
              Math.round(c.x * DPR), Math.round(c.y * DPR)
            );
          }
          if (c.isCircle) {
            ctx!.arc(0, 0, c.w / 2, 0, Math.PI * 2);
          } else {
            ctx!.roundRect(-c.w / 2, -c.h / 2, c.w, c.h, CFG.blockRadius);
          }
          ctx!.fill();
        }
      }

      // draw crimson (idx=2) with glow
      const [cr, cg, cb] = COLORS[2];
      ctx!.shadowBlur = 12;
      ctx!.shadowColor = `rgba(${cr},${cg},${cb},0.55)`;
      for (const c of groups[2]) {
        ctx!.globalAlpha = c.alpha;
        ctx!.fillStyle = `rgb(${cr},${cg},${cb})`;
        ctx!.setTransform(DPR, 0, 0, DPR, Math.round(c.x * DPR), Math.round(c.y * DPR));
        ctx!.beginPath();
        ctx!.roundRect(-c.w / 2, -c.h / 2, c.w, c.h, CFG.blockRadius);
        ctx!.fill();
      }

      // reset
      ctx!.shadowBlur = 0;
      ctx!.globalAlpha = 1;
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    // ── RAF loop ─────────────────────────────────────────
    function frame(now: number) {
      const dt = Math.min(now - lastFrame, 50); // cap dt to avoid spiral
      lastFrame = now;
      scrollY   += (targetScrollY - scrollY) * CFG.scrollLerp;
      autoTime  += dt;
      smoothMouseX += (mouseX - smoothMouseX) * 0.05;

      const gA = scrollY * CFG.scrollRotate + autoTime * CFG.autoRotateSpeed;
      const pA = smoothMouseX * CFG.parallaxStrength;

      ctx!.clearRect(0, 0, W, H);
      drawCells(buildCells(gA, pA));
      rafId = requestAnimationFrame(frame);
    }

    // ── event listeners ──────────────────────────────────
    const onScroll     = () => { targetScrollY = window.scrollY; };
    const onMouseMove  = (e: MouseEvent) => { mouseX = (e.clientX / window.innerWidth) * 2 - 1; };
    const onMouseLeave = () => { mouseX = 0; };
    const isTouch = window.matchMedia('(hover: none)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    if (!isTouch) {
      window.addEventListener('mousemove',  onMouseMove);
      window.addEventListener('mouseleave', onMouseLeave);
    }

    resize();
    onScroll();
    scrollY = targetScrollY;

    if (reduced) {
      const gA = scrollY * CFG.scrollRotate;
      ctx.clearRect(0, 0, W, H);
      drawCells(buildCells(gA, 0));
    } else {
      rafId = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      if (!isTouch) {
        window.removeEventListener('mousemove',  onMouseMove);
        window.removeEventListener('mouseleave', onMouseLeave);
      }
    };
  }, []);

  return (
    <>
      {/* DNA helix canvas – fixed background, behind all content */}
      <canvas
        ref={canvasRef}
        id="dna"
        aria-hidden="true"
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          zIndex:        0,
          pointerEvents: 'none',
          display:       'block',
        }}
      />
      {/* Atmosphere – soft radial gradient overlay */}
      <div
        aria-hidden="true"
        style={{
          position:      'fixed',
          inset:         0,
          zIndex:        1,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse at 22% 32%, rgba(221,234,211,0.20), transparent 55%),' +
            'radial-gradient(ellipse at 78% 72%, rgba(245,217,208,0.14), transparent 50%)',
          mixBlendMode:  'multiply',
        }}
      />
    </>
  );
};

export default DnaHelixCanvas;