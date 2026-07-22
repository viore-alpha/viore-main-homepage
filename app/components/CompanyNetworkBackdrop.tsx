"use client";

import { useEffect, useRef } from "react";

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
  const viewportRef = useRef<HTMLDivElement>(null);
  const startCanvasRef = useRef<HTMLCanvasElement>(null);
  const endCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const backdrop = backdropRef.current;
    const viewport = viewportRef.current;
    const startCanvas = startCanvasRef.current;
    const endCanvas = endCanvasRef.current;
    const startContext = startCanvas?.getContext("2d", { alpha: true });
    const endContext = endCanvas?.getContext("2d", { alpha: true });
    const chapter = backdrop?.closest<HTMLElement>(".company-dark-chapter");
    const join = chapter?.querySelector<HTMLElement>(".company-join") ?? null;
    if (!backdrop || !viewport || !startCanvas || !endCanvas || !startContext || !endContext) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 1;
    let height = 1;
    let chapterStart = 0;
    let finishDistance = 1;
    let progress = -1;
    let renderFrame = 0;
    let scrollFrame = 0;
    let isNearViewport = false;

    const traceStrand = (
      context: CanvasRenderingContext2D,
      layerProgress: number,
      index: number,
      count: number,
      family: EnergyFamily,
    ) => {
      const position = count === 1 ? 0 : index / (count - 1);
      const offset = position * 2 - 1;
      const localProgress = clamp(layerProgress + 0.035 * (1 - layerProgress));
      const convergence = Math.pow(localProgress, 2.6);
      const compact = width < 700;
      const lateralScale = compact ? 0.64 : 1;
      const spreadScale = family === 0 ? 0.38 : family === 1 ? 0.31 : 0.43;
      const initialSpread = width * spreadScale * lateralScale;
      const finalSpread = Math.max(compact ? 2.4 : 3.2, width * 0.0035);
      const spread = offset * mix(initialSpread, finalSpread, convergence);
      const flowScale = 1 - convergence;
      const curveScale = flowScale * lateralScale;
      const pulse = Math.sin(index * 0.13 + family * 1.7);
      const counterPulse = Math.cos(-index * 0.09 + family * 1.1);
      const drift = pulse * width * 0.024 * flowScale * lateralScale;
      const fineDrift = counterPulse * width * 0.011 * flowScale * lateralScale;
      const jitterA = Math.sin((index + 1) * 1.91 + family * 2.7) * width * 0.018 * flowScale * lateralScale;
      const jitterB = Math.cos((index + 1) * 2.47 + family * 1.3) * width * 0.014 * flowScale * lateralScale;
      const jitterC = Math.sin((index + 1) * 3.31 + family * 0.8) * width * 0.012 * flowScale * lateralScale;
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

    const makeGradient = (
      context: CanvasRenderingContext2D,
      layerProgress: number,
      family: EnergyFamily,
    ) => {
      const orange = ORANGE_PALETTE[family];
      const red = RED_PALETTE[family];
      const colorProgress = Math.pow(layerProgress, 1.18);
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

    const drawLayer = (context: CanvasRenderingContext2D, layerProgress: number) => {
      const compact = width < 700;
      const convergenceAlpha = mix(1, 0.3, Math.pow(layerProgress, 2.6));
      const gradients = [0, 1, 2].map((family) =>
        makeGradient(context, layerProgress, family as EnergyFamily));

      const strokeFamily = (count: number, family: EnergyFamily, haze = false) => {
        for (let index = 0; index < count; index += 1) {
          traceStrand(context, layerProgress, index, count, family);
          const accent = !haze && index % (family === 0 ? 11 : 8) === 0;
          context.strokeStyle = gradients[family];
          context.globalAlpha = haze
            ? 0.055 * convergenceAlpha
            : (accent ? 0.78 : 0.21) * convergenceAlpha;
          context.lineWidth = haze ? 18 : accent ? 2.35 : 0.76 + (index % 4) * 0.11;
          context.stroke();
        }
      };

      context.clearRect(0, 0, width, height);
      context.save();
      context.globalCompositeOperation = "screen";
      context.lineCap = "round";
      context.lineJoin = "round";
      context.shadowBlur = 0;
      strokeFamily(compact ? 6 : 8, 0, true);
      strokeFamily(compact ? 3 : 4, 1, true);
      strokeFamily(compact ? 32 : 48, 0);
      strokeFamily(compact ? 7 : 11, 1);
      strokeFamily(compact ? 11 : 17, 2);
      context.restore();
    };

    const releaseCanvases = () => {
      width = 1;
      height = 1;
      for (const canvas of [startCanvas, endCanvas]) {
        if (canvas.width !== 1) canvas.width = 1;
        if (canvas.height !== 1) canvas.height = 1;
      }
    };

    const updateProgress = () => {
      scrollFrame = 0;
      const nextProgress = clamp((window.scrollY - chapterStart) / finishDistance);
      if (Math.abs(nextProgress - progress) < 0.0005) return;
      progress = nextProgress;
      backdrop.style.setProperty("--company-convergence-progress", progress.toFixed(4));
    };

    const requestProgressUpdate = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateProgress);
    };

    const resizeAndRender = () => {
      renderFrame = 0;
      if (!isNearViewport || document.hidden) return;

      const bounds = startCanvas.getBoundingClientRect();
      width = Math.max(1, Math.round(bounds.width));
      height = Math.max(1, Math.round(bounds.height));
      chapterStart = backdrop.getBoundingClientRect().top + window.scrollY;
      const fallbackFinish = Math.max(backdrop.offsetHeight - window.innerHeight * 0.85, 1);
      finishDistance = join
        ? Math.max(join.offsetTop - window.innerHeight * 0.15, 1)
        : fallbackFinish;

      const pixelRatioCap = width < 700 ? 1 : 1.15;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, pixelRatioCap);
      const renderWidth = Math.round(width * pixelRatio);
      const renderHeight = Math.round(height * pixelRatio);

      for (const [canvas, context] of [[startCanvas, startContext], [endCanvas, endContext]] as const) {
        canvas.width = renderWidth;
        canvas.height = renderHeight;
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      }

      drawLayer(startContext, 0);
      drawLayer(endContext, 1);
      updateProgress();
    };

    const requestRender = () => {
      if (!renderFrame) renderFrame = window.requestAnimationFrame(resizeAndRender);
    };

    const syncMotion = () => {
      const visible = isNearViewport && !document.hidden;
      backdrop.classList.toggle("is-motion-active", visible && !reducedMotion.matches);
      if (visible) requestRender();
      else releaseCanvases();
    };

    const resizeObserver = new ResizeObserver(requestRender);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isNearViewport = entry?.isIntersecting ?? false;
        syncMotion();
      },
      { rootMargin: "100% 0px" },
    );

    resizeObserver.observe(viewport);
    intersectionObserver.observe(backdrop);
    window.addEventListener("scroll", requestProgressUpdate, { passive: true });
    window.addEventListener("resize", requestRender, { passive: true });
    reducedMotion.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncMotion);
    requestProgressUpdate();
    syncMotion();

    return () => {
      window.cancelAnimationFrame(renderFrame);
      window.cancelAnimationFrame(scrollFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("scroll", requestProgressUpdate);
      window.removeEventListener("resize", requestRender);
      reducedMotion.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncMotion);
      backdrop.classList.remove("is-motion-active");
      releaseCanvases();
    };
  }, []);

  return (
    <div ref={backdropRef} className="company-network-backdrop" aria-hidden="true">
      <div ref={viewportRef} className="company-network-viewport">
        <div className="company-network-layers">
          <canvas ref={startCanvasRef} className="company-convergence-canvas company-convergence-canvas-start" />
          <canvas ref={endCanvasRef} className="company-convergence-canvas company-convergence-canvas-end" />
        </div>
      </div>
    </div>
  );
}
