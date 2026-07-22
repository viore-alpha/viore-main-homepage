"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface ViewportMotionProps {
  activeClassName?: string;
  ariaLabel?: string;
  as?: "div" | "section";
  children: ReactNode;
  className: string;
  deferChildren?: boolean;
  enhancedClassName?: string;
  mountMargin?: string;
  once?: boolean;
  reducedClassName?: string;
  role?: string;
  threshold?: number;
}

export function ViewportMotion({
  activeClassName = "is-playing",
  ariaLabel,
  as = "div",
  children,
  className,
  deferChildren = false,
  enhancedClassName,
  mountMargin = "600px 0px",
  once = false,
  reducedClassName = "is-reduced",
  role,
  threshold = 0.12,
}: ViewportMotionProps) {
  const rootRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(!deferChildren);
  const [active, setActive] = useState(false);
  const [enhanced, setEnhanced] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => {
      setReducedMotion(media.matches);
      setEnhanced(!media.matches && "IntersectionObserver" in window);
    };
    syncMotionPreference();
    media.addEventListener("change", syncMotionPreference);

    if (!("IntersectionObserver" in window)) {
      const fallbackFrame = requestAnimationFrame(() => {
        setMounted(true);
        setActive(true);
      });
      return () => {
        cancelAnimationFrame(fallbackFrame);
        media.removeEventListener("change", syncMotionPreference);
      };
    }

    const mountObserver = deferChildren
      ? new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting) return;
            setMounted(true);
            mountObserver?.disconnect();
          },
          { rootMargin: mountMargin },
        )
      : null;

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        const visible = Boolean(entry?.isIntersecting && entry.intersectionRatio >= threshold);
        if (visible) {
          setActive(true);
          if (once) visibilityObserver.disconnect();
        } else if (!once) {
          setActive(false);
        }
      },
      { threshold: [0, threshold] },
    );

    mountObserver?.observe(root);
    visibilityObserver.observe(root);

    return () => {
      media.removeEventListener("change", syncMotionPreference);
      mountObserver?.disconnect();
      visibilityObserver.disconnect();
    };
  }, [deferChildren, mountMargin, once, threshold]);

  const classes = [
    className,
    enhanced && enhancedClassName,
    active && !reducedMotion && activeClassName,
    reducedMotion && reducedClassName,
  ].filter(Boolean).join(" ");

  const setRoot = (node: HTMLElement | null) => {
    rootRef.current = node;
  };

  if (as === "section") {
    return (
      <section
        ref={setRoot}
        className={classes}
        role={role}
        aria-label={ariaLabel}
        data-motion-mounted={mounted ? "true" : "false"}
      >
        {mounted ? children : null}
      </section>
    );
  }

  return (
    <div
      ref={setRoot}
      className={classes}
      role={role}
      aria-label={ariaLabel}
      data-motion-mounted={mounted ? "true" : "false"}
    >
      {mounted ? children : null}
    </div>
  );
}
