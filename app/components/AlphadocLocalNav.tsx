"use client";

import { useEffect, useState } from "react";
import type { Language } from "@/app/site-content";

interface AlphadocLocalNavProps {
  items: readonly (readonly [string, string])[];
  language: Language;
}

export function AlphadocLocalNav({ items, language }: AlphadocLocalNavProps) {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-ap-section]"));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];
      if (visible?.target.id) setActiveSection(visible.target.id);
    }, { rootMargin: "-24% 0px -62%", threshold: [0, 0.2, 0.5] });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="ap-local-nav" aria-label={language === "ko" ? "알파닥 제품 페이지" : "Alphadoc product page"}>
      <div>
        {items.map(([id, label]) => (
          <a href={`#${id}`} aria-current={activeSection === id ? "location" : undefined} key={id}>
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
