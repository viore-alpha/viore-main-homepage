"use client";

import { useEffect, useRef } from "react";

export function NetworkScrollScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const image = imageRef.current;
    const page = scene?.closest<HTMLElement>(".home-scroll-page");
    const hero = page?.querySelector<HTMLElement>(".home-hero");
    const contact = page?.querySelector<HTMLElement>(".home-contact");
    if (!scene || !image || !page || !hero || !contact) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previousFocus = -1;
    let previousWashOpacity = -1;

    const update = () => {
      frame = 0;
      const pageTop = page.getBoundingClientRect().top;
      const scrollDistance = Math.max(page.offsetHeight - window.innerHeight, 1);
      const progress = reducedMotion.matches ? 0 : Math.min(Math.max(-pageTop / scrollDistance, 0), 1);
      const imageTravel = Math.max(image.offsetHeight - window.innerHeight, 0);
      const contactTop = contact.getBoundingClientRect().top;
      const focusDistance = Math.max(window.innerHeight * 0.55, 1);
      const endFocus = Math.min(Math.max((window.innerHeight - contactTop) / focusDistance, 0), 1);
      const heroFadeStart = hero.offsetHeight * 0.65;
      const heroFadeDistance = Math.max(hero.offsetHeight * 0.35, 1);
      const heroExit = Math.min(Math.max((-pageTop - heroFadeStart) / heroFadeDistance, 0), 1);
      const heroWashOpacity = 0.55 * (1 - heroExit);
      const washOpacity = heroWashOpacity * (1 - endFocus);
      scene.style.setProperty("--network-shift", `${-progress * imageTravel}px`);
      if (Math.abs(washOpacity - previousWashOpacity) > 0.001) {
        scene.style.setProperty("--network-wash-opacity", washOpacity.toFixed(4));
        previousWashOpacity = washOpacity;
      }
      if (Math.abs(endFocus - previousFocus) > 0.001) {
        scene.style.setProperty("--network-saturation", (1 + endFocus * 0.18).toFixed(4));
        scene.style.setProperty("--network-contrast", (1 + endFocus * 0.16).toFixed(4));
        scene.style.setProperty("--network-brightness", (1 - endFocus * 0.015).toFixed(4));
        previousFocus = endFocus;
      }
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
    <div ref={sceneRef} className="network-scroll-scene" aria-hidden="true">
      <img ref={imageRef} className="network-scroll-base" src="/media/viore-network-scroll-focus-v2.png" alt="" />
      <div className="network-scroll-wash" />
    </div>
  );
}
