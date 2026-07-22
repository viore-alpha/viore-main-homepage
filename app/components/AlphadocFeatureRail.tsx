"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent as ReactPointerEvent, type UIEvent } from "react";
import type { Language } from "@/app/site-content";
import { AlphadocFeatureCard, type AlphadocFeatureItem } from "@/app/components/AlphadocFeatureCard";
import { useViewportMotion } from "@/app/components/useViewportMotion";

const AUTO_SCROLL_PX_PER_SECOND = 18;
const INTERACTION_RESUME_MS = 1200;
const RAIL_COPIES = [0, 1] as const;

interface AlphadocFeatureRailProps {
  ariaLabel: string;
  id: string;
  items: readonly AlphadocFeatureItem[];
  language: Language;
}

export function AlphadocFeatureRail({ ariaLabel, id, items, language }: AlphadocFeatureRailProps) {
  const { ref: galleryRef, inView, reducedMotion, shouldAnimate } = useViewportMotion<HTMLDivElement>(0.04);
  const railRef = useRef<HTMLDivElement>(null);
  const autoFrameRef = useRef<number | null>(null);
  const lastAutoFrameRef = useRef<number | null>(null);
  const loopWidthRef = useRef(0);
  const scrollFrameRef = useRef<number | null>(null);
  const interactionResumeRef = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [visibleInstances, setVisibleInstances] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const measureLoop = () => {
      const first = rail.querySelector<HTMLElement>('[data-feature-copy="0"][data-feature-index="0"]');
      const duplicate = rail.querySelector<HTMLElement>('[data-feature-copy="1"][data-feature-index="0"]');
      if (!first || !duplicate) return;
      loopWidthRef.current = Math.max(0, duplicate.offsetLeft - first.offsetLeft);
    };

    measureLoop();
    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measureLoop);
    resizeObserver?.observe(rail);
    window.addEventListener("resize", measureLoop, { passive: true });

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", measureLoop);
    };
  }, [items.length]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const cards = Array.from(rail.querySelectorAll<HTMLElement>("[data-feature-instance]"));
    const Observer = window.IntersectionObserver;

    if (!Observer) {
      setVisibleInstances(new Set(cards.map((card) => card.dataset.featureInstance ?? "").filter(Boolean)));
      return;
    }

    const observer = new Observer((entries) => {
      setVisibleInstances((current) => {
        const next = new Set(current);
        let changed = false;

        entries.forEach((entry) => {
          const instance = (entry.target as HTMLElement).dataset.featureInstance;
          if (!instance) return;
          const visible = entry.isIntersecting && entry.intersectionRatio >= 0.06;
          if (visible && !next.has(instance)) {
            next.add(instance);
            changed = true;
          } else if (!visible && next.delete(instance)) {
            changed = true;
          }
        });

        return changed ? next : current;
      });
    }, { root: rail, rootMargin: "0px 48px", threshold: [0, 0.06] });

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [items.length]);

  const railPaused = paused || interactionPaused;

  useEffect(() => {
    if (!shouldAnimate || railPaused || items.length < 2) return;

    const tick = (time: number) => {
      const rail = railRef.current;
      if (!rail) return;

      const previous = lastAutoFrameRef.current ?? time;
      const elapsed = Math.min(64, Math.max(0, time - previous));
      lastAutoFrameRef.current = time;
      const loopWidth = loopWidthRef.current;

      if (loopWidth > 0) {
        let next = rail.scrollLeft + (elapsed * AUTO_SCROLL_PX_PER_SECOND) / 1000;
        if (next >= loopWidth) next -= loopWidth;
        rail.scrollLeft = next;
      }

      autoFrameRef.current = window.requestAnimationFrame(tick);
    };

    autoFrameRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (autoFrameRef.current !== null) window.cancelAnimationFrame(autoFrameRef.current);
      autoFrameRef.current = null;
      lastAutoFrameRef.current = null;
    };
  }, [items.length, railPaused, shouldAnimate]);

  useEffect(() => () => {
    if (autoFrameRef.current !== null) window.cancelAnimationFrame(autoFrameRef.current);
    if (scrollFrameRef.current !== null) window.cancelAnimationFrame(scrollFrameRef.current);
    if (interactionResumeRef.current !== null) window.clearTimeout(interactionResumeRef.current);
  }, []);

  function handleScroll(event: UIEvent<HTMLDivElement>) {
    const rail = event.currentTarget;
    if (scrollFrameRef.current !== null) window.cancelAnimationFrame(scrollFrameRef.current);

    scrollFrameRef.current = window.requestAnimationFrame(() => {
      const cards = Array.from(rail.querySelectorAll<HTMLElement>("[data-feature-index]"));
      const viewportCenter = rail.scrollLeft + rail.clientWidth / 2;
      let nearestIndex = active;
      let nearestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(cardCenter - viewportCenter);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = Number(card.dataset.featureIndex ?? 0);
        }
      });

      if (nearestIndex !== active) setActive(nearestIndex);
      scrollFrameRef.current = null;
    });
  }

  function scheduleInteractionResume() {
    if (interactionResumeRef.current !== null) window.clearTimeout(interactionResumeRef.current);
    interactionResumeRef.current = window.setTimeout(() => {
      setInteractionPaused(false);
      interactionResumeRef.current = null;
    }, INTERACTION_RESUME_MS);
  }

  function handlePointerEnter(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse") setInteractionPaused(true);
  }

  function handlePointerLeave(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse") setInteractionPaused(false);
    else scheduleInteractionResume();
  }

  function handlePointerRelease(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") scheduleInteractionResume();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const rail = railRef.current;
    if (!rail) return;
    const distance = Math.max(96, rail.clientWidth * 0.16);
    rail.scrollBy({ left: event.key === "ArrowLeft" ? -distance : distance, behavior: reducedMotion ? "auto" : "smooth" });
  }

  const playing = shouldAnimate;
  const motionPaused = railPaused;
  const currentNumber = String(active + 1).padStart(2, "0");
  const totalNumber = String(items.length).padStart(2, "0");
  const pauseLabel = language === "ko" ? "기능 카드 연속 흐름 일시정지" : "Pause continuous feature flow";
  const playLabel = language === "ko" ? "기능 카드 연속 흐름 재생" : "Play continuous feature flow";
  const railLabel = language === "ko" ? `${ariaLabel} 기능 카드` : `${ariaLabel} feature cards`;

  return (
    <div
      ref={galleryRef}
      className={`ap-feature-gallery${playing ? " is-playing" : ""}${motionPaused ? " is-paused" : ""}${inView && reducedMotion ? " is-reduced" : ""}`}
      id={id}
      aria-label={ariaLabel}
      role="region"
      data-auto-scroll={motionPaused ? "paused" : "running"}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocusCapture={() => setInteractionPaused(true)}
      onBlurCapture={() => setInteractionPaused(false)}
    >
      <div className="ap-feature-rail-viewport">
        <div
          ref={railRef}
          className="ap-feature-rail"
          aria-label={railLabel}
          onKeyDown={handleKeyDown}
          onPointerDown={() => setInteractionPaused(true)}
          onPointerUp={handlePointerRelease}
          onPointerCancel={handlePointerRelease}
          onScroll={handleScroll}
          onWheel={() => {
            setInteractionPaused(true);
            scheduleInteractionResume();
          }}
          role="list"
          tabIndex={0}
        >
          {RAIL_COPIES.map((copyIndex) => items.map((item, index) => {
            const instanceId = `${copyIndex}-${item.id}`;
            return (
              <AlphadocFeatureCard
                active={active === index}
                copyIndex={copyIndex}
                duplicate={copyIndex > 0}
                index={index}
                instanceId={instanceId}
                item={item}
                language={language}
                key={instanceId}
                motionVisible={visibleInstances.has(instanceId)}
              />
            );
          }))}
        </div>
      </div>

      <div className="ap-feature-rail-controls">
        <div className="ap-feature-rail-count" aria-hidden="true"><strong>{currentNumber}</strong><span>/ {totalNumber}</span></div>
        <div className="ap-feature-rail-steps" aria-hidden="true">
          {items.map((item, index) => <i className={active === index ? "is-current" : ""} key={item.id} />)}
        </div>
        <div className="ap-feature-rail-buttons">
          {!reducedMotion ? (
            <button type="button" onClick={() => setPaused((current) => !current)} aria-label={paused ? playLabel : pauseLabel}>
              <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
