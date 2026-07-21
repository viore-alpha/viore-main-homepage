"use client";

import { useEffect, useState } from "react";

const ARTICLES = [
  { id: "technology-alphaevidence", label: "AlphaEvidence" },
  { id: "technology-alphadoc-engine", label: "AlphaDoc Engine" },
  { id: "technology-alphadocument", label: "AlphaDocument" },
  { id: "technology-alphalayer", label: "AlphaLayer" },
] as const;

export function TechnologyArticleNav() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const sections = ARTICLES.map(({ id }) => document.getElementById(id)).filter(
      (section): section is HTMLElement => Boolean(section),
    );
    if (!sections.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-22% 0px -58%", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`technology-article-nav${activeId ? " is-visible" : ""}`}
      aria-label="Technology articles"
    >
      <div className="technology-article-nav-inner">
        <span>Technology</span>
        <ol>
          {ARTICLES.map((article, index) => (
            <li key={article.id}>
              <a
                className={activeId === article.id ? "is-active" : undefined}
                href={`#${article.id}`}
                aria-current={activeId === article.id ? "location" : undefined}
              >
                <small>{String(index + 1).padStart(2, "0")}</small>
                {article.label}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
