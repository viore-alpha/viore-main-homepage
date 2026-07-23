"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent as ReactPointerEvent, type TouchEvent as ReactTouchEvent, type UIEvent } from "react";
import type { Language } from "@/app/site-content";
import { AlphadocFeatureCard, type AlphadocFeatureItem } from "@/app/components/AlphadocFeatureCard";
import { useViewportMotion } from "@/app/components/useViewportMotion";

const AUTO_SCROLL_PX_PER_SECOND = 18;
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
  const cardMetricsRef = useRef<Array<{ center: number; index: number }>>([]);
  const lastAutoFrameRef = useRef<number | null>(null);
  const loopInitializedRef = useRef(false);
  const loopWidthRef = useRef(0);
  const mountedInstancesRef = useRef<Set<string>>(new Set());
  const scrollFrameRef = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [touchPaused, setTouchPaused] = useState(false);
  const [visibleInstances, setVisibleInstances] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const measureLoop = () => {
      const first = rail.querySelector<HTMLElement>('[data-feature-copy="0"][data-feature-index="0"]');
      const duplicate = rail.querySelector<HTMLElement>('[data-feature-copy="1"][data-feature-index="0"]');
      if (!first || !duplicate) return;
      const previousLoopWidth = loopWidthRef.current;
      const nextLoopWidth = Math.max(0, duplicate.offsetLeft - first.offsetLeft);
      loopWidthRef.current = nextLoopWidth;
      cardMetricsRef.current = Array.from(rail.querySelectorAll<HTMLElement>("[data-feature-index]"))
        .map((card) => ({
          center: card.offsetLeft + card.offsetWidth / 2,
          index: Number(card.dataset.featureIndex ?? 0),
        }));

      if (nextLoopWidth <= 0) return;
      if (!loopInitializedRef.current) {
        rail.scrollLeft = nextLoopWidth;
        loopInitializedRef.current = true;
      } else if (previousLoopWidth > 0 && previousLoopWidth !== nextLoopWidth) {
        const loopProgress = Math.min(1, Math.max(0, rail.scrollLeft / previousLoopWidth));
        rail.scrollLeft = loopProgress * nextLoopWidth;
      }
    };

    loopInitializedRef.current = false;
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
    const pendingInstances = new Set<string>();
    let mountTimer: number | undefined;
    let idleHandle: number | undefined;

    function cancelScheduledMount() {
      if (mountTimer !== undefined) window.clearTimeout(mountTimer);
      if (idleHandle !== undefined && typeof cancelIdleCallback === "function") {
        cancelIdleCallback(idleHandle);
      }
      mountTimer = undefined;
      idleHandle = undefined;
    }

    function mountNext() {
      idleHandle = undefined;
      const instance = pendingInstances.values().next().value;
      if (!instance) return;
      pendingInstances.delete(instance);
      mountedInstancesRef.current.add(instance);
      setVisibleInstances((current) => {
        if (current.has(instance)) return current;
        const next = new Set(current);
        next.add(instance);
        return next;
      });
      scheduleQueuedMount(140);
    }

    function scheduleQueuedMount(delay = 220) {
      cancelScheduledMount();
      if (pendingInstances.size === 0) return;
      mountTimer = window.setTimeout(() => {
        mountTimer = undefined;
        if (typeof requestIdleCallback === "function") {
          idleHandle = requestIdleCallback(mountNext, { timeout: 700 });
        } else {
          mountNext();
        }
      }, delay);
    }

    const deferDuringPageScroll = () => {
      if (pendingInstances.size > 0) scheduleQueuedMount();
    };

    if (!Observer) {
      cards.forEach((card) => {
        const instance = card.dataset.featureInstance;
        if (instance) pendingInstances.add(instance);
      });
      scheduleQueuedMount();
      window.addEventListener("scroll", deferDuringPageScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", deferDuringPageScroll);
        cancelScheduledMount();
      };
    }

    const observer = new Observer((entries) => {
      entries.forEach((entry) => {
        const instance = (entry.target as HTMLElement).dataset.featureInstance;
        if (!instance) return;
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.06;
        if (visible && !mountedInstancesRef.current.has(instance)) {
          pendingInstances.add(instance);
        } else if (!visible) {
          pendingInstances.delete(instance);
        }
      });
      scheduleQueuedMount();
    }, { root: rail, rootMargin: "0px 48px", threshold: [0, 0.06] });

    cards.forEach((card) => observer.observe(card));
    window.addEventListener("scroll", deferDuringPageScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", deferDuringPageScroll);
      cancelScheduledMount();
    };
  }, [items.length]);

  const railPaused = paused || hoverPaused || touchPaused;
  const autoScrollRunning = shouldAnimate && !railPaused && items.length >= 2;

  useEffect(() => {
    if (!autoScrollRunning) return;

    const tick = (time: number) => {
      const rail = railRef.current;
      if (!rail) return;

      const previous = lastAutoFrameRef.current ?? time;
      const elapsed = Math.min(64, Math.max(0, time - previous));
      lastAutoFrameRef.current = time;
      const loopWidth = loopWidthRef.current;

      if (loopWidth > 0) {
        let next = rail.scrollLeft - (elapsed * AUTO_SCROLL_PX_PER_SECOND) / 1000;
        if (next <= 0) next += loopWidth;
        else if (next > loopWidth) next -= loopWidth;
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
  }, [autoScrollRunning]);

  useEffect(() => () => {
    if (autoFrameRef.current !== null) window.cancelAnimationFrame(autoFrameRef.current);
    if (scrollFrameRef.current !== null) window.cancelAnimationFrame(scrollFrameRef.current);
  }, []);

  function handleScroll(event: UIEvent<HTMLDivElement>) {
    const rail = event.currentTarget;
    if (scrollFrameRef.current !== null) window.cancelAnimationFrame(scrollFrameRef.current);

    scrollFrameRef.current = window.requestAnimationFrame(() => {
      const cards = cardMetricsRef.current;
      const viewportCenter = rail.scrollLeft + rail.clientWidth / 2;
      let nearestIndex = active;
      let nearestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card) => {
        const distance = Math.abs(card.center - viewportCenter);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = card.index;
        }
      });

      if (nearestIndex !== active) setActive(nearestIndex);
      scrollFrameRef.current = null;
    });
  }

  const handleCardPointerEnter = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse") setHoverPaused(true);
  }, []);

  const handleCardPointerLeave = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse") setHoverPaused(false);
  }, []);

  function handleTouchRelease(event: ReactTouchEvent<HTMLDivElement>) {
    setTouchPaused(event.touches.length > 0);
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
      data-auto-scroll={autoScrollRunning ? "running" : "paused"}
    >
      <div className="ap-feature-rail-viewport">
        <div
          ref={railRef}
          className="ap-feature-rail"
          aria-label={railLabel}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          onTouchStart={() => setTouchPaused(true)}
          onTouchEnd={handleTouchRelease}
          onTouchCancel={handleTouchRelease}
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
                onPointerEnter={handleCardPointerEnter}
                onPointerLeave={handleCardPointerLeave}
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
