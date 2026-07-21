"use client";

import { useEffect, useRef } from "react";

export function CompanyNetworkBackdrop() {
  const backdropRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const backdrop = backdropRef.current;
    const image = imageRef.current;
    if (!backdrop || !image) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = backdrop.getBoundingClientRect();
      const scrollDistance = Math.max(backdrop.offsetHeight - window.innerHeight, 1);
      const progress = reducedMotion.matches
        ? 0.18
        : Math.min(Math.max(-rect.top / scrollDistance, 0), 1);
      const imageTravel = Math.max(image.offsetHeight - window.innerHeight, 0);

      backdrop.style.setProperty("--company-network-shift", `${-progress * imageTravel}px`);
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reducedMotion.addEventListener("change", requestUpdate);
    image.addEventListener("load", requestUpdate);
    update();

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotion.removeEventListener("change", requestUpdate);
      image.removeEventListener("load", requestUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={backdropRef} className="company-network-backdrop" aria-hidden="true">
      <div className="company-network-viewport">
        <img
          ref={imageRef}
          className="company-network-source"
          src="/media/viore-company-network-dark-portrait-transparent.png"
          width="1882"
          height="3344"
          decoding="async"
          alt=""
        />
      </div>
    </div>
  );
}
