"use client";

import { useEffect, useRef, useState } from "react";

export function useViewportMotion<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(media.matches);
    const updatePageVisibility = () => setPageVisible(document.visibilityState !== "hidden");

    updateMotionPreference();
    updatePageVisibility();
    media.addEventListener("change", updateMotionPreference);
    document.addEventListener("visibilitychange", updatePageVisibility);

    return () => {
      media.removeEventListener("change", updateMotionPreference);
      document.removeEventListener("visibilitychange", updatePageVisibility);
    };
  }, []);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const Observer = globalThis.IntersectionObserver;
    if (typeof Observer !== "function") {
      const frame = globalThis.requestAnimationFrame(() => setInView(true));
      return () => globalThis.cancelAnimationFrame(frame);
    }

    const observer = new Observer(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= threshold),
      { threshold: [0, threshold] },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [threshold]);

  return {
    ref,
    inView,
    reducedMotion,
    shouldAnimate: inView && pageVisible && !reducedMotion,
  };
}
