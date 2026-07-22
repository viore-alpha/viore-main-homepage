"use client";

import { useEffect, useRef } from "react";

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
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const balanced = quality === "balanced";
    let width = 1;
    let height = 1;
    let drawFrame = 0;
    let isIntersecting = false;

    const traceStrand = (index: number, count: number, family: EnergyFamily) => {
      const position = count === 1 ? 0 : index / (count - 1);
      const offset = position * 2 - 1;
      const centerY = height * 0.53;
      const spreadScale = family === 0 ? 0.105 : family === 1 ? 0.085 : 0.12;
      const spread = offset * height * spreadScale;
      const pulse = Math.sin(index * 0.13 + family * 1.7);
      const counterPulse = Math.cos(-index * 0.09 + family * 1.1);
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
      } else if (family === 2) {
        gradient.addColorStop(0, "rgba(255, 112, 35, .14)");
        gradient.addColorStop(0.3, "rgba(246, 188, 59, .74)");
        gradient.addColorStop(0.56, "rgba(255, 111, 31, .82)");
        gradient.addColorStop(0.8, "rgba(244, 199, 83, .64)");
        gradient.addColorStop(1, "rgba(255, 139, 43, .12)");
      } else {
        gradient.addColorStop(0, "rgba(246, 187, 58, .18)");
        gradient.addColorStop(0.22, "rgba(255, 126, 29, .84)");
        gradient.addColorStop(0.5, "rgba(255, 70, 24, .96)");
        gradient.addColorStop(0.74, "rgba(255, 147, 38, .8)");
        gradient.addColorStop(1, "rgba(246, 198, 77, .16)");
      }
      return gradient;
    };

    const strokeBundle = (
      count: number,
      family: EnergyFamily,
      gradient: CanvasGradient,
      haze = false,
    ) => {
      for (let index = 0; index < count; index += 1) {
        traceStrand(index, count, family);
        const accent = !haze && index % (family === 0 ? 10 : 8) === 0;
        const densityCompensation = balanced && !haze ? 1.12 : 1;
        context.strokeStyle = gradient;
        context.globalAlpha = haze
          ? 0.055
          : Math.min(1, (accent ? 0.78 : 0.21) * densityCompensation);
        context.lineWidth = haze ? 18 : accent ? 2.35 : 0.76 + (index % 4) * 0.11;
        context.stroke();
      }
    };

    const draw = () => {
      const compact = width < 700;
      const primaryGradient = makeGradient(0);
      const counterGradient = makeGradient(1);
      const goldGradient = makeGradient(2);

      context.clearRect(0, 0, width, height);
      context.save();
      context.globalCompositeOperation = "multiply";
      context.lineCap = "round";
      context.lineJoin = "round";
      context.shadowBlur = 0;

      strokeBundle(compact ? 6 : 8, 0, primaryGradient, true);
      strokeBundle(compact ? 3 : 4, 1, counterGradient, true);
      strokeBundle(compact ? (balanced ? 32 : 40) : (balanced ? 48 : 64), 0, primaryGradient);
      strokeBundle(compact ? (balanced ? 7 : 9) : (balanced ? 11 : 14), 1, counterGradient);
      strokeBundle(compact ? (balanced ? 11 : 14) : (balanced ? 17 : 22), 2, goldGradient);
      context.restore();
    };

    const releaseCanvas = () => {
      width = 1;
      height = 1;
      if (canvas.width !== 1) canvas.width = 1;
      if (canvas.height !== 1) canvas.height = 1;
    };

    const resizeAndDraw = () => {
      drawFrame = 0;
      if (!isIntersecting || document.hidden) return;
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(bounds.width));
      height = Math.max(1, Math.round(bounds.height));
      const pixelRatioCap = width < 700 ? 1 : balanced ? 1.25 : 1.5;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, pixelRatioCap);
      const renderWidth = Math.round(width * pixelRatio);
      const renderHeight = Math.round(height * pixelRatio);

      if (canvas.width !== renderWidth || canvas.height !== renderHeight) {
        canvas.width = renderWidth;
        canvas.height = renderHeight;
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      }
      draw();
    };

    const requestDraw = () => {
      if (!drawFrame) drawFrame = window.requestAnimationFrame(resizeAndDraw);
    };

    const syncMotion = () => {
      const visible = isIntersecting && !document.hidden;
      canvas.classList.toggle("is-motion-active", visible && !reducedMotion.matches);
      if (visible) requestDraw();
      else releaseCanvas();
    };

    const resizeObserver = new ResizeObserver(requestDraw);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry?.isIntersecting ?? false;
        syncMotion();
      },
      { rootMargin: "160px 0px" },
    );

    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    reducedMotion.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncMotion);
    syncMotion();

    return () => {
      window.cancelAnimationFrame(drawFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      reducedMotion.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncMotion);
      canvas.classList.remove("is-motion-active");
      releaseCanvas();
    };
  }, [quality]);

  return <canvas ref={canvasRef} className="company-energy-canvas" aria-hidden="true" />;
}
