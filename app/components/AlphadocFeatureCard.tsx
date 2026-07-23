/* eslint-disable @next/next/no-img-element -- External Alphadoc app icons are served from the product asset registry. */
"use client";

import { lazy, memo, Suspense, type PointerEvent as ReactPointerEvent } from "react";
import type { Language } from "@/app/site-content";
import type { AlphadocFeatureId } from "@/app/components/AlphadocFeatureMotionSvg";

const AlphadocFeatureMotionSvg = lazy(async () => {
  const loadedModule = await import("@/app/components/AlphadocFeatureMotionSvg");
  return { default: loadedModule.AlphadocFeatureMotionSvg };
});

const ALPHADOC_ASSET_ROOT = "https://www.alphadoc.ai";

export interface AlphadocFeatureItem {
  id: AlphadocFeatureId;
  label: string;
  icon: string;
  note?: string;
  title: string;
  body: string;
}

interface AlphadocFeatureCardProps {
  active: boolean;
  copyIndex: number;
  duplicate: boolean;
  index: number;
  instanceId: string;
  item: AlphadocFeatureItem;
  language: Language;
  motionVisible: boolean;
  onPointerEnter: (event: ReactPointerEvent<HTMLElement>) => void;
  onPointerLeave: (event: ReactPointerEvent<HTMLElement>) => void;
}

export const AlphadocFeatureCard = memo(function AlphadocFeatureCard({ active, copyIndex, duplicate, index, instanceId, item, language, motionVisible, onPointerEnter, onPointerLeave }: AlphadocFeatureCardProps) {
  return (
    <article
      className={`ap-feature-card${active ? " is-current" : ""}${motionVisible ? " is-motion-visible" : ""}`}
      data-feature-card={item.id}
      data-feature-copy={copyIndex}
      data-feature-index={index}
      data-feature-instance={instanceId}
      aria-current={!duplicate && active ? "true" : undefined}
      aria-hidden={duplicate ? "true" : undefined}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      role="listitem"
    >
      <div className="ap-feature-motion">
        {motionVisible ? (
          <Suspense fallback={<span className="ap-feature-motion-placeholder" aria-hidden="true" />}>
            <AlphadocFeatureMotionSvg
              featureId={item.id}
              icon={item.icon}
              label={item.label}
              language={language}
            />
          </Suspense>
        ) : <span className="ap-feature-motion-placeholder" aria-hidden="true" />}
      </div>

      <div className="ap-feature-card-copy">
        <div className="ap-feature-card-label">
          <img
            src={`${ALPHADOC_ASSET_ROOT}${item.icon}`}
            alt=""
            aria-hidden="true"
            width="48"
            height="48"
            loading="lazy"
            decoding="async"
          />
          <span>{item.label}</span>
          {item.note ? <small>{item.note}</small> : null}
        </div>
        <h3>{item.title}</h3>
        <p>{item.body}</p>
      </div>
    </article>
  );
});
