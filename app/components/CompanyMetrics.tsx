"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { CompanyMetric, Language } from "@/app/site-content";

const numberFormatter = new Intl.NumberFormat("en-US");
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia(reducedMotionQuery);
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return typeof window === "undefined" || window.matchMedia(reducedMotionQuery).matches;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeToReducedMotion, getReducedMotionSnapshot, () => true);
}

function useCountUp(target: number, started: boolean, delay: number, reduceMotion: boolean) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (reduceMotion || !started) return;

    let frame = 0;
    const duration = 1_650;
    const startsAt = performance.now() + delay;

    const tick = (now: number) => {
      if (now < startsAt) {
        frame = requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min((now - startsAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.round(target * eased));

      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [delay, reduceMotion, started, target]);

  return reduceMotion ? target : displayValue;
}

function Metric({
  metric,
  index,
  started,
  reduceMotion,
}: {
  metric: CompanyMetric;
  index: number;
  started: boolean;
  reduceMotion: boolean;
}) {
  const displayValue = useCountUp(metric.value, started, index * 115, reduceMotion);

  return (
    <article className="company-metric">
      <strong className="company-metric-value" aria-label={metric.ariaLabel}>
        <span aria-hidden="true">{numberFormatter.format(displayValue)}</span>
        <sup aria-hidden="true">{metric.suffix ?? "+"}</sup>
      </strong>
      <div className="company-metric-copy">
        <h3>{metric.label}</h3>
        <p>{metric.caption}</p>
      </div>
    </article>
  );
}

export function CompanyMetrics({
  metrics,
  language,
  source = "snapshot",
  generatedAt,
}: {
  metrics: CompanyMetric[];
  language: Language;
  source?: "live" | "snapshot";
  generatedAt?: string | null;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const supportsIntersectionObserver =
    typeof window !== "undefined" && "IntersectionObserver" in window;
  const countingStarted = started || reduceMotion || !supportsIntersectionObserver;
  const formattedGeneratedAt = generatedAt
    ? new Intl.DateTimeFormat(language === "ko" ? "ko-KR" : "en-US", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: source === "live" ? "2-digit" : undefined,
      minute: source === "live" ? "2-digit" : undefined,
      hour12: false,
    }).format(new Date(generatedAt))
    : null;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || countingStarted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setStarted(true);
        observer.disconnect();
      },
      { threshold: 0.24 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [countingStarted]);

  return (
    <div
      ref={sectionRef}
      className="company-metrics"
      data-counting={countingStarted ? "active" : "idle"}
      data-metrics-source={source}
      data-metrics-generated-at={generatedAt ?? undefined}
    >
      {formattedGeneratedAt && (
        <p className="company-metrics-asof">
          {language === "ko"
            ? source === "live"
              ? `데이터 기준 ${formattedGeneratedAt} KST · 공개 집계`
              : `검증 스냅샷 게시 ${formattedGeneratedAt} KST · 실시간 갱신 확인 중`
            : source === "live"
              ? `Data as of ${formattedGeneratedAt} KST · Public aggregate`
              : `Verified snapshot published ${formattedGeneratedAt} KST · Live refresh pending`}
        </p>
      )}
      {metrics.map((metric, index) => (
        <Metric
          key={`${metric.label}-${metric.value}`}
          metric={metric}
          index={index}
          started={countingStarted}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
  );
}
