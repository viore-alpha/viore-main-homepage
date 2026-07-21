"use client";

import { useEffect, useRef } from "react";

const FRAME_INTERVAL = 1000 / 24;
type EnergyFamily = 0 | 1 | 2;
type Rgb = readonly [number, number, number];

const ORANGE_PALETTE: Record<EnergyFamily, readonly [Rgb, Rgb, Rgb]> = {
  0: [[246, 187, 58], [255, 126, 29], [255, 70, 24]],
  1: [[248, 195, 70], [255, 139, 36], [255, 78, 29]],
  2: [[246, 188, 59], [255, 112, 35], [255, 92, 27]],
};

const RED_PALETTE: Record<EnergyFamily, readonly [Rgb, Rgb, Rgb]> = {
  0: [[255, 92, 43], [255, 59, 48], [205, 26, 24]],
  1: [[255, 105, 44], [244, 54, 42], [197, 24, 24]],
  2: [[255, 112, 49], [250, 63, 42], [214, 29, 23]],
};

const clamp = (value: number, minimum = 0, maximum = 1) =>
  Math.min(Math.max(value, minimum), maximum);

const mix = (from: number, to: number, progress: number) =>
  from + (to - from) * progress;

const mixColor = (from: Rgb, to: Rgb, progress: number): Rgb => [
  Math.round(mix(from[0], to[0], progress)),
  Math.round(mix(from[1], to[1], progress)),
  Math.round(mix(from[2], to[2], progress)),
];

const rgba = ([red, green, blue]: Rgb, alpha = 1) =>
  `rgba(${red}, ${green}, ${blue}, ${alpha})`;

const continueSmoothly = (
  previousControl: number,
  midpoint: number,
  previousProgress: number,
  midpointProgress: number,
  nextProgress: number,
) =>
  midpoint +
  (midpoint - previousControl) *
    ((nextProgress - midpointProgress) / (midpointProgress - previousProgress));

export function CompanyNetworkBackdrop() {
  const backdropRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const backdrop = backdropRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    const chapter = backdrop?.closest<HTMLElement>(".company-dark-chapter");
    const join = chapter?.querySelector<HTMLElement>(".company-join") ?? null;
    if (!backdrop || !canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 1;
    let height = 1;
    let progress = 0;
    let animationFrame = 0;
    let scrollFrame = 0;
    let lastFrame = 0;
    let isIntersecting = true;

    const traceStrand = (index: number, count: number, seconds: number, family: EnergyFamily) => {
      const position = count === 1 ? 0 : index / (count - 1);
      const offset = position * 2 - 1;
      const localProgress = clamp(progress + 0.035 * (1 - progress));
      const convergence = Math.pow(localProgress, 2.6);
      const compact = width < 700;
      const spreadScale = family === 0 ? 0.38 : family === 1 ? 0.31 : 0.43;
      const initialSpread = width * (compact ? spreadScale * 1.08 : spreadScale);
      const finalSpread = Math.max(compact ? 2.4 : 3.2, width * 0.0035);
      const spread = offset * mix(initialSpread, finalSpread, convergence);
      const flowScale = 1 - convergence;
      const curveScale = flowScale;
      const pulse = Math.sin(seconds * (0.22 + family * 0.025) + index * 0.13 + family * 1.7);
      const counterPulse = Math.cos(seconds * (0.15 + family * 0.018) - index * 0.09 + family * 1.1);
      const drift = pulse * width * 0.024 * flowScale;
      const fineDrift = counterPulse * width * 0.011 * flowScale;
      const jitterA = Math.sin((index + 1) * 1.91 + family * 2.7) * width * 0.018 * flowScale;
      const jitterB = Math.cos((index + 1) * 2.47 + family * 1.3) * width * 0.014 * flowScale;
      const jitterC = Math.sin((index + 1) * 3.31 + family * 0.8) * width * 0.012 * flowScale;
      const centerX = width * 0.5;

      context.beginPath();

      if (family === 0) {
        const previousControlX = centerX + width * 0.145 * curveScale - spread * 0.12 + drift + jitterB;
        const midpointX = centerX - width * 0.024 * curveScale - spread * 0.42 - drift + jitterC;
        const nextControlX = continueSmoothly(previousControlX, midpointX, 0.31, 0.51, 0.69);

        context.moveTo(centerX - width * 0.018 * curveScale + spread + drift, -height * 0.08);
        context.bezierCurveTo(
          centerX + width * 0.105 * curveScale + spread * 0.62 - fineDrift + jitterA,
          height * 0.14,
          previousControlX,
          height * 0.31,
          midpointX,
          height * 0.51,
        );
        context.bezierCurveTo(
          nextControlX,
          height * 0.69,
          centerX - width * 0.105 * curveScale + spread * 0.78 - drift + jitterA,
          height * 0.85,
          centerX + width * 0.025 * curveScale + spread + fineDrift,
          height * 1.08,
        );
        return;
      }

      if (family === 1) {
        const previousControlX = centerX + width * 0.07 * curveScale - spread * 0.35 - fineDrift + jitterA;
        const midpointX = centerX - width * 0.08 * curveScale + spread * 0.3 + drift + jitterC;
        const nextControlX = continueSmoothly(previousControlX, midpointX, 0.35, 0.55, 0.72);

        context.moveTo(centerX + width * 0.025 * curveScale + spread - fineDrift + jitterA, -height * 0.08);
        context.bezierCurveTo(
          centerX + width * 0.11 * curveScale + spread * 0.55 + drift + jitterB,
          height * 0.18,
          previousControlX,
          height * 0.35,
          midpointX,
          height * 0.55,
        );
        context.bezierCurveTo(
          nextControlX,
          height * 0.72,
          centerX - width * 0.08 * curveScale + spread * 0.62 + fineDrift + jitterA,
          height * 0.88,
          centerX + width * 0.045 * curveScale + spread - drift + jitterC,
          height * 1.08,
        );
        return;
      }

      const previousControlX = centerX + width * 0.11 * curveScale + spread * 0.2 + fineDrift + jitterC;
      const midpointX = centerX + width * 0.015 * curveScale - spread * 0.28 + drift + jitterB;
      const nextControlX = continueSmoothly(previousControlX, midpointX, 0.32, 0.47, 0.64);

      context.moveTo(centerX - width * 0.06 * curveScale + spread + fineDrift + jitterB, -height * 0.08);
      context.bezierCurveTo(
        centerX + width * 0.04 * curveScale + spread * 0.7 - drift + jitterA,
        height * 0.16,
        previousControlX,
        height * 0.32,
        midpointX,
        height * 0.47,
      );
      context.bezierCurveTo(
        nextControlX,
        height * 0.64,
        centerX - width * 0.16 * curveScale + spread * 0.6 + drift + jitterC,
        height * 0.82,
        centerX - width * 0.01 * curveScale + spread - fineDrift + jitterB,
        height * 1.08,
      );
    };

    const makeGradient = (family: EnergyFamily) => {
      const orange = ORANGE_PALETTE[family];
      const red = RED_PALETTE[family];
      const colorProgress = Math.pow(progress, 1.18);
      const gradient = context.createLinearGradient(0, -height * 0.1, 0, height * 1.1);

      const stops = family === 0
        ? ([
            [0, orange[0], red[0], 0.18],
            [0.22, orange[1], red[0], 0.84],
            [0.5, orange[2], red[1], 0.96],
            [0.74, orange[1], red[1], 0.8],
            [1, orange[0], red[2], 0.16],
          ] as const)
        : family === 1
          ? ([
              [0, orange[0], red[0], 0.2],
              [0.28, orange[1], red[0], 0.88],
              [0.58, orange[2], red[1], 0.92],
              [0.82, orange[0], red[1], 0.72],
              [1, orange[0], red[2], 0.16],
            ] as const)
          : ([
              [0, orange[1], red[0], 0.14],
              [0.3, orange[0], red[0], 0.74],
              [0.56, orange[1], red[1], 0.82],
              [0.8, orange[0], red[1], 0.64],
              [1, orange[1], red[2], 0.12],
            ] as const);

      for (const [stop, orangeColor, redColor, alpha] of stops) {
        gradient.addColorStop(stop, rgba(mixColor(orangeColor, redColor, colorProgress), alpha));
      }
      return gradient;
    };

    const strokeFamily = (
      count: number,
      seconds: number,
      family: EnergyFamily,
      gradient: CanvasGradient,
      haze = false,
    ) => {
      const convergence = Math.pow(progress, 2.6);
      const convergenceAlpha = mix(1, 0.3, convergence);

      for (let index = 0; index < count; index += 1) {
        traceStrand(index, count, seconds, family);
        const accent = !haze && index % (family === 0 ? 11 : 8) === 0;
        const shimmer = 0.86 + Math.sin(seconds * 0.22 + index * 0.57 + family) * 0.14;
        context.strokeStyle = gradient;
        context.globalAlpha = haze
          ? 0.055 * convergenceAlpha
          : (accent ? 0.78 : 0.21) * shimmer * convergenceAlpha;
        context.lineWidth = haze ? 18 : accent ? 2.35 : 0.76 + (index % 4) * 0.11;

        if (haze || accent) {
          context.shadowColor = progress > 0.72
            ? "rgba(255, 59, 48, .28)"
            : family === 2
              ? "rgba(248, 183, 53, .2)"
              : "rgba(255, 93, 31, .24)";
          context.shadowBlur = haze ? 20 : 8;
        } else {
          context.shadowBlur = 0;
        }

        context.stroke();
      }
    };

    const draw = (seconds: number) => {
      context.clearRect(0, 0, width, height);
      context.save();
      context.globalCompositeOperation = "screen";
      context.lineCap = "round";
      context.lineJoin = "round";

      const compact = width < 700;
      const primaryGradient = makeGradient(0);
      const counterGradient = makeGradient(1);
      const goldGradient = makeGradient(2);

      strokeFamily(compact ? 6 : 8, seconds, 0, primaryGradient, true);
      strokeFamily(compact ? 3 : 4, seconds, 1, counterGradient, true);
      strokeFamily(compact ? 40 : 64, seconds, 0, primaryGradient);
      strokeFamily(compact ? 9 : 14, seconds, 1, counterGradient);
      strokeFamily(compact ? 14 : 22, seconds, 2, goldGradient);

      context.restore();
    };

    const updateProgress = () => {
      scrollFrame = 0;
      const rect = backdrop.getBoundingClientRect();
      const fallbackFinish = Math.max(backdrop.offsetHeight - window.innerHeight * 0.85, 1);
      const finishDistance = join
        ? Math.max(join.offsetTop - window.innerHeight * 0.15, 1)
        : fallbackFinish;
      const nextProgress = clamp(Math.max(-rect.top, 0) / finishDistance);

      if (Math.abs(nextProgress - progress) > 0.0005) {
        progress = nextProgress;
        backdrop.style.setProperty("--company-convergence-progress", progress.toFixed(4));
        if (reducedMotion.matches) draw(0);
      }
    };

    const requestProgressUpdate = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateProgress);
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(bounds.width));
      height = Math.max(1, Math.round(bounds.height));
      const pixelRatioCap = width < 700 ? 1 : 1.35;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, pixelRatioCap);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      updateProgress();
      draw(reducedMotion.matches ? 0 : performance.now() / 1000);
    };

    const animate = (timestamp: number) => {
      if (timestamp - lastFrame >= FRAME_INTERVAL) {
        draw(timestamp / 1000);
        lastFrame = timestamp;
      }
      animationFrame = window.requestAnimationFrame(animate);
    };

    const syncMotion = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      lastFrame = 0;

      if (!isIntersecting || document.hidden) return;
      if (reducedMotion.matches) draw(0);
      else animationFrame = window.requestAnimationFrame(animate);
    };

    const handleMotionChange = () => {
      updateProgress();
      syncMotion();
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry?.isIntersecting ?? false;
        syncMotion();
      },
      { rootMargin: "120px 0px" },
    );

    resizeObserver.observe(canvas);
    intersectionObserver.observe(backdrop);
    window.addEventListener("scroll", requestProgressUpdate, { passive: true });
    window.addEventListener("resize", requestProgressUpdate);
    reducedMotion.addEventListener("change", handleMotionChange);
    document.addEventListener("visibilitychange", syncMotion);
    resize();
    syncMotion();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.cancelAnimationFrame(scrollFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("scroll", requestProgressUpdate);
      window.removeEventListener("resize", requestProgressUpdate);
      reducedMotion.removeEventListener("change", handleMotionChange);
      document.removeEventListener("visibilitychange", syncMotion);
    };
  }, []);

  return (
    <div ref={backdropRef} className="company-network-backdrop" aria-hidden="true">
      <div className="company-network-viewport">
        <canvas ref={canvasRef} className="company-convergence-canvas" />
      </div>
    </div>
  );
}
