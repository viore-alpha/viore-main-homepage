"use client";

import { useEffect, useRef } from "react";

// Soft glow is produced once per frame with a single GPU blur pass (a blurred
// colour underlay for this light-background/multiply design) instead of
// per-stroke shadowBlur, which keeps the glow while cutting cost.
const GLOW_BLUR_PX = 6;
const GLOW_STRENGTH = 0.5;
type EnergyFamily = 0 | 1 | 2;
type EnergyCanvasQuality = "full" | "balanced";

const continueSmoothly = (
  previousControlY: number,
  midpointY: number,
  previousControlX: number,
  midpointX: number,
  nextControlX: number,
) =>
  midpointY +
  (midpointY - previousControlY) * ((nextControlX - midpointX) / (midpointX - previousControlX));

export function CompanyEnergyCanvas({ quality = "full" }: { quality?: EnergyCanvasQuality }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const mainContext = canvas?.getContext("2d", { alpha: true });
    // Strands are drawn to an offscreen buffer at full device resolution so the
    // visible canvas can composite a soft glow underlay plus a crisp pass.
    const scene = document.createElement("canvas");
    const context = scene.getContext("2d", { alpha: true });
    if (!canvas || !mainContext || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 1;
    let height = 1;
    let frame = 0;
    let renderScale = 1;
    let isIntersecting = false;
    let primaryGradient: CanvasGradient | null = null;
    let counterGradient: CanvasGradient | null = null;
    let goldGradient: CanvasGradient | null = null;
    const balanced = quality === "balanced";

    const traceStrand = (index: number, count: number, seconds: number, family: EnergyFamily) => {
      const position = count === 1 ? 0 : index / (count - 1);
      const offset = position * 2 - 1;
      const centerY = height * 0.53;
      const spreadScale = family === 0 ? 0.105 : family === 1 ? 0.085 : 0.12;
      const spread = offset * height * spreadScale;
      const pulse = Math.sin(seconds * (0.72 + family * 0.08) + index * 0.13 + family * 1.7);
      const counterPulse = Math.cos(seconds * (0.5 + family * 0.06) - index * 0.09 + family * 1.1);
      const drift = pulse * height * 0.024;
      const fineDrift = counterPulse * height * 0.011;
      const jitterA = Math.sin((index + 1) * 1.91 + family * 2.7) * height * 0.018;
      const jitterB = Math.cos((index + 1) * 2.47 + family * 1.3) * height * 0.014;
      const jitterC = Math.sin((index + 1) * 3.31 + family * 0.8) * height * 0.012;

      context.beginPath();

      if (family === 0) {
        const previousControlY = centerY + height * 0.145 - spread * 0.12 + drift + jitterB;
        const midpointY = centerY - height * 0.024 - spread * 0.42 - drift + jitterC;
        const nextControlY = continueSmoothly(previousControlY, midpointY, 0.31, 0.51, 0.69);

        context.moveTo(-width * 0.08, centerY - height * 0.018 + spread + drift);
        context.bezierCurveTo(
          width * 0.14,
          centerY + height * 0.105 + spread * 0.62 - fineDrift + jitterA,
          width * 0.31,
          previousControlY,
          width * 0.51,
          midpointY,
        );
        context.bezierCurveTo(
          width * 0.69,
          nextControlY,
          width * 0.85,
          centerY - height * 0.105 + spread * 0.78 - drift + jitterA,
          width * 1.08,
          centerY + height * 0.025 + spread + fineDrift,
        );
        return;
      }

      if (family === 1) {
        const previousControlY = centerY + height * 0.07 - spread * 0.35 - fineDrift + jitterA;
        const midpointY = centerY - height * 0.08 + spread * 0.3 + drift + jitterC;
        const nextControlY = continueSmoothly(previousControlY, midpointY, 0.35, 0.55, 0.72);

        context.moveTo(-width * 0.08, centerY + height * 0.025 + spread - fineDrift + jitterA);
        context.bezierCurveTo(
          width * 0.18,
          centerY + height * 0.11 + spread * 0.55 + drift + jitterB,
          width * 0.35,
          previousControlY,
          width * 0.55,
          midpointY,
        );
        context.bezierCurveTo(
          width * 0.72,
          nextControlY,
          width * 0.88,
          centerY - height * 0.08 + spread * 0.62 + fineDrift + jitterA,
          width * 1.08,
          centerY + height * 0.045 + spread - drift + jitterC,
        );
        return;
      }

      const previousControlY = centerY + height * 0.11 + spread * 0.2 + fineDrift + jitterC;
      const midpointY = centerY + height * 0.015 - spread * 0.28 + drift + jitterB;
      const nextControlY = continueSmoothly(previousControlY, midpointY, 0.32, 0.47, 0.64);

      context.moveTo(-width * 0.08, centerY - height * 0.06 + spread + fineDrift + jitterB);
      context.bezierCurveTo(
        width * 0.16,
        centerY + height * 0.04 + spread * 0.7 - drift + jitterA,
        width * 0.32,
        previousControlY,
        width * 0.47,
        midpointY,
      );
      context.bezierCurveTo(
        width * 0.64,
        nextControlY,
        width * 0.82,
        centerY - height * 0.16 + spread * 0.6 + drift + jitterC,
        width * 1.08,
        centerY - height * 0.01 + spread - fineDrift + jitterB,
      );
    };

    const makeGradient = (family: EnergyFamily) => {
      const gradient = context.createLinearGradient(-width * 0.05, 0, width * 1.05, 0);
      if (family === 1) {
        gradient.addColorStop(0, "rgba(248, 195, 70, .2)");
        gradient.addColorStop(0.28, "rgba(255, 139, 36, .88)");
        gradient.addColorStop(0.58, "rgba(255, 78, 29, .92)");
        gradient.addColorStop(0.82, "rgba(245, 176, 54, .72)");
        gradient.addColorStop(1, "rgba(246, 204, 91, .16)");
        return gradient;
      }
      if (family === 2) {
        gradient.addColorStop(0, "rgba(255, 112, 35, .14)");
        gradient.addColorStop(0.3, "rgba(246, 188, 59, .74)");
        gradient.addColorStop(0.56, "rgba(255, 111, 31, .82)");
        gradient.addColorStop(0.8, "rgba(244, 199, 83, .64)");
        gradient.addColorStop(1, "rgba(255, 139, 43, .12)");
        return gradient;
      }
      gradient.addColorStop(0, "rgba(246, 187, 58, .18)");
      gradient.addColorStop(0.22, "rgba(255, 126, 29, .84)");
      gradient.addColorStop(0.5, "rgba(255, 70, 24, .96)");
      gradient.addColorStop(0.74, "rgba(255, 147, 38, .8)");
      gradient.addColorStop(1, "rgba(246, 198, 77, .16)");
      return gradient;
    };

    const strokeBundle = (
      count: number,
      seconds: number,
      family: EnergyFamily,
      gradient: CanvasGradient,
      haze = false,
    ) => {
      for (let index = 0; index < count; index += 1) {
        traceStrand(index, count, seconds, family);
        const accent = !haze && index % (family === 0 ? 10 : 8) === 0;
        const shimmer = 0.86 + Math.sin(seconds * 0.72 + index * 0.57 + family) * 0.14;
        context.strokeStyle = gradient;
        const densityCompensation = balanced && !haze ? 1.12 : 1;
        context.globalAlpha = haze
          ? 0.055
          : Math.min(1, (accent ? 0.78 : 0.21) * shimmer * densityCompensation);
        context.lineWidth = haze ? 18 : accent ? 2.35 : 0.76 + (index % 4) * 0.11;
        context.stroke();
      }
    };

    const draw = (seconds: number) => {
      if (!primaryGradient || !counterGradient || !goldGradient) return;

      context.clearRect(0, 0, width, height);
      context.save();
      context.globalCompositeOperation = "multiply";
      context.lineCap = "round";
      context.lineJoin = "round";

      const compact = width < 700;

      strokeBundle(compact ? 6 : 8, seconds, 0, primaryGradient, true);
      strokeBundle(compact ? 3 : 4, seconds, 1, counterGradient, true);
      strokeBundle(compact ? (balanced ? 32 : 40) : (balanced ? 48 : 64), seconds, 0, primaryGradient);
      strokeBundle(compact ? (balanced ? 7 : 9) : (balanced ? 11 : 14), seconds, 1, counterGradient);
      strokeBundle(compact ? (balanced ? 11 : 14) : (balanced ? 17 : 22), seconds, 2, goldGradient);

      context.restore();

      // Composite the offscreen scene onto the visible canvas: a soft blurred
      // colour underlay for the glow, then the crisp lines on top.
      mainContext.setTransform(1, 0, 0, 1, 0, 0);
      mainContext.clearRect(0, 0, canvas.width, canvas.height);
      mainContext.globalCompositeOperation = "source-over";
      mainContext.filter = `blur(${(GLOW_BLUR_PX * renderScale).toFixed(2)}px)`;
      mainContext.globalAlpha = GLOW_STRENGTH;
      mainContext.drawImage(scene, 0, 0);
      mainContext.filter = "none";
      mainContext.globalAlpha = 1;
      mainContext.drawImage(scene, 0, 0);
    };

    const releaseCanvas = () => {
      width = 1;
      height = 1;
      primaryGradient = null;
      counterGradient = null;
      goldGradient = null;
      if (canvas.width !== 1) canvas.width = 1;
      if (canvas.height !== 1) canvas.height = 1;
      if (scene.width !== 1) scene.width = 1;
      if (scene.height !== 1) scene.height = 1;
    };

    const resize = () => {
      if (!isIntersecting || document.hidden) return;
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(bounds.width));
      height = Math.max(1, Math.round(bounds.height));
      // Render at full device resolution (capped at 2x) for crisp lines.
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      renderScale = pixelRatio;
      const renderWidth = Math.round(width * pixelRatio);
      const renderHeight = Math.round(height * pixelRatio);
      const sizeChanged = canvas.width !== renderWidth || canvas.height !== renderHeight;

      if (sizeChanged) {
        canvas.width = renderWidth;
        canvas.height = renderHeight;
        scene.width = renderWidth;
        scene.height = renderHeight;
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        primaryGradient = makeGradient(0);
        counterGradient = makeGradient(1);
        goldGradient = makeGradient(2);
      }

      if (!primaryGradient || !counterGradient || !goldGradient) {
        primaryGradient = makeGradient(0);
        counterGradient = makeGradient(1);
        goldGradient = makeGradient(2);
      }
      draw(reducedMotion.matches ? 0 : performance.now() / 1000);
    };

    const animate = (timestamp: number) => {
      draw(timestamp / 1000);
      frame = window.requestAnimationFrame(animate);
    };

    const syncMotion = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;

      if (!isIntersecting || document.hidden) {
        releaseCanvas();
        return;
      }
      resize();
      if (reducedMotion.matches) draw(0);
      else frame = window.requestAnimationFrame(animate);
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
    intersectionObserver.observe(canvas);
    reducedMotion.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncMotion);
    syncMotion();

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      reducedMotion.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncMotion);
      releaseCanvas();
    };
  }, [quality]);

  return <canvas ref={canvasRef} className="company-energy-canvas" aria-hidden="true" />;
}
