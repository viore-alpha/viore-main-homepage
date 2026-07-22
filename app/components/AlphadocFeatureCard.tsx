/* eslint-disable @next/next/no-img-element -- External Alphadoc app icons are served from the product asset registry. */
"use client";

import { memo } from "react";
import type { Language } from "@/app/site-content";
import { AlphadocFeatureMotionSvg, type AlphadocFeatureId } from "@/app/components/AlphadocFeatureMotionSvg";

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
}

export const AlphadocFeatureCard = memo(function AlphadocFeatureCard({ active, copyIndex, duplicate, index, instanceId, item, language, motionVisible }: AlphadocFeatureCardProps) {
  return (
    <article
      className={`ap-feature-card${active ? " is-current" : ""}${motionVisible ? " is-motion-visible" : ""}`}
      data-feature-card={item.id}
      data-feature-copy={copyIndex}
      data-feature-index={index}
      data-feature-instance={instanceId}
      aria-current={!duplicate && active ? "true" : undefined}
      aria-hidden={duplicate ? "true" : undefined}
      role="listitem"
    >
      <div className="ap-feature-motion">
        <AlphadocFeatureMotionSvg
          featureId={item.id}
          icon={item.icon}
          label={item.label}
          language={language}
        />
      </div>

      <div className="ap-feature-card-copy">
        <div className="ap-feature-card-label">
          <img src={`${ALPHADOC_ASSET_ROOT}${item.icon}`} alt="" aria-hidden="true" />
          <span>{item.label}</span>
          {item.note ? <small>{item.note}</small> : null}
        </div>
        <h3>{item.title}</h3>
        <p>{item.body}</p>
      </div>
    </article>
  );
});
