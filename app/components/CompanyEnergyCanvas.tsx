"use client";

import { useEffect, useRef } from "react";

type EnergyFamily = 0 | 1 | 2;
type EnergyCanvasQuality = "full" | "balanced";
type EnergyCanvasMotion = "layered" | "ambient";

const ENERGY_LAYER_COUNT = 2;

const continueSmoothly = (
  previousControlY: number,
  midpointY: number,
  previousControlX: number,
  midpointX: number,
  nextControlX: number,
) =>
  midpointY +
  (midpointY - previousControlY) * ((nextControlX - midpointX) / (midpointX - previousControlX));

export function CompanyEnergyCanvas({
  quality = "full",
  motion = "layered",
}: {
  quality?: EnergyCanvasQuality;
  motion?: EnergyCanvasMotion;
}) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const canvasRefs = useRef<Array<HTMLCanvasElement | null>>([]);
  const layerCount = motion === "ambient" ? 1 : ENERGY_LAYER_COUNT;

  useEffect(() => {
    const field = fieldRef.current;
    const canvases = canvasRefs.current.slice(0, layerCount);
    const contexts = canvases.map((canvas) => canvas?.getContext("2d", { alpha: true }) ?? null);
    if (!field || canvases.some((canvas) => !canvas) || contexts.some((context) => !context)) return;

    const usableCanvases = canvases as HTMLCanvasElement[];
    const usableContexts = contexts as CanvasRenderingContext2D[];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const balanced = quality === "balanced";
    let width = 1;
    let height = 1;
    let drawFrame = 0;
    let isIntersecting = false;

    const traceStrand = (
      context: CanvasRenderingContext2D,
      index: number,
      count: number,
      family: EnergyFamily,
    ) => {
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

    const makeGradient = (context: CanvasRenderingContext2D, family: EnergyFamily) => {
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
      context: CanvasRenderingContext2D,
      count: number,
      family: EnergyFamily,
      gradient: CanvasGradient,
      accepts: (index: number) => boolean,
      haze = false,
    ) => {
      for (let index = 0; index < count; index += 1) {
        if (!accepts(index)) continue;
        traceStrand(context, index, count, family);
        const accent = !haze && index % (family === 0 ? 10 : 8) === 0;
        const densityCompensation = balanced && !haze ? 1.12 : 1;
        context.strokeStyle = gradient;
        context.globalAlpha = haze
          ? 0.045
          : Math.min(1, (accent ? 0.78 : 0.21) * densityCompensation);
        context.lineWidth = haze ? 16 : accent ? 2.35 : 0.76 + (index % 4) * 0.11;
        context.stroke();
      }
    };

    const drawLayer = (context: CanvasRenderingContext2D, layer: number) => {
      const compact = width < 700;
      const primaryCount = compact ? (balanced ? 32 : 40) : (balanced ? 48 : 64);
      const counterCount = compact ? (balanced ? 7 : 9) : (balanced ? 11 : 14);
      const goldCount = compact ? (balanced ? 11 : 14) : (balanced ? 17 : 22);
      const gradients = [0, 1, 2].map((family) =>
        makeGradient(context, family as EnergyFamily));

      context.clearRect(0, 0, width, height);
      context.save();
      context.globalCompositeOperation = "multiply";
      context.lineCap = "round";
      context.lineJoin = "round";
      context.shadowBlur = 0;

      if (layerCount === 1) {
        strokeBundle(context, compact ? 2 : 4, 0, gradients[0], () => true, true);
        strokeBundle(context, 1, 1, gradients[1], () => true, true);
        strokeBundle(context, Math.ceil(primaryCount * 0.58), 0, gradients[0], () => true);
        strokeBundle(context, Math.ceil(counterCount * 0.58), 1, gradients[1], () => true);
        strokeBundle(context, Math.ceil(goldCount * 0.58), 2, gradients[2], () => true);
      } else {
        const evenLayer = layer === 0;
        if (evenLayer) {
          strokeBundle(context, compact ? 4 : 6, 0, gradients[0], () => true, true);
          strokeBundle(context, compact ? 1 : 2, 1, gradients[1], () => true, true);
        }
        strokeBundle(
          context,
          primaryCount,
          0,
          gradients[0],
          (index) => (index % 2 === 0) === evenLayer,
        );
        if (!evenLayer) strokeBundle(context, counterCount, 1, gradients[1], () => true);
        strokeBundle(
          context,
          goldCount,
          2,
          gradients[2],
          (index) => (index % 2 === 0) === evenLayer,
        );
      }

      context.restore();
    };

    const releaseCanvases = () => {
      width = 1;
      height = 1;
      for (const canvas of usableCanvases) {
        if (canvas.width !== 1) canvas.width = 1;
        if (canvas.height !== 1) canvas.height = 1;
      }
    };

    const resizeAndDraw = () => {
      drawFrame = 0;
      if (!isIntersecting || document.hidden) return;
      const bounds = field.getBoundingClientRect();
      width = Math.max(1, Math.round(bounds.width));
      height = Math.max(1, Math.round(bounds.height));
      const pixelRatioCap = width < 700
        ? balanced ? 1.35 : 1.5
        : balanced ? 1.15 : 1.25;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, pixelRatioCap);
      const renderWidth = Math.round(width * pixelRatio);
      const renderHeight = Math.round(height * pixelRatio);

      for (let layer = 0; layer < layerCount; layer += 1) {
        const canvas = usableCanvases[layer];
        const context = usableContexts[layer];
        if (canvas.width !== renderWidth || canvas.height !== renderHeight) {
          canvas.width = renderWidth;
          canvas.height = renderHeight;
        }
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        drawLayer(context, layer);
      }
    };

    const requestDraw = () => {
      if (!drawFrame) drawFrame = window.requestAnimationFrame(resizeAndDraw);
    };

    const syncMotion = () => {
      const visible = isIntersecting && !document.hidden;
      field.classList.toggle("is-motion-active", visible && !reducedMotion.matches);
      if (visible) requestDraw();
      else releaseCanvases();
    };

    const resizeObserver = new ResizeObserver(requestDraw);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry?.isIntersecting ?? false;
        syncMotion();
      },
      { rootMargin: "160px 0px" },
    );

    resizeObserver.observe(field);
    intersectionObserver.observe(field);
    reducedMotion.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncMotion);
    syncMotion();

    return () => {
      window.cancelAnimationFrame(drawFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      reducedMotion.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncMotion);
      field.classList.remove("is-motion-active");
      releaseCanvases();
    };
  }, [layerCount, quality]);

  return (
    <div ref={fieldRef} className={`company-energy-field company-energy-field-${motion}`} aria-hidden="true">
      {Array.from({ length: layerCount }, (_, layer) => (
        <canvas
          className={`company-energy-canvas company-energy-layer-${layer}`}
          key={layer}
          ref={(canvas) => {
            canvasRefs.current[layer] = canvas;
          }}
        />
      ))}
    </div>
  );
}
