"use client";

import { useEffect, useRef, useState } from "react";
import type { Language } from "@/app/site-content";

const motionCopy = {
  ko: {
    headline: "의료인들의 하루를 바꾸는 워크스페이스",
    headlineMobile: ["의료인들의 하루를 바꾸는", "워크스페이스"],
    placeholder: "의료 관련 질문을 입력해보세요",
    prompts: ["패혈증 진단 기준은?", "급성 심근경색 초기 처치는?", "심부전 NYHA 분류는?"],
    start: "알파닥 시작하기",
  },
  en: {
    headline: "The workspace changing every clinician's day",
    headlineMobile: ["The workspace changing", "every clinician's day"],
    placeholder: "Ask a medical question",
    prompts: ["Sepsis criteria?", "Initial care for acute MI?", "NYHA classification?"],
    start: "Start Alphadoc",
  },
} as const;

function SearchIcon({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} fill="none" stroke="#aab1bd" strokeLinecap="round" strokeWidth="5">
      <circle cx="0" cy="0" r="14" />
      <path d="M10 10 24 24" />
    </g>
  );
}

function SubmitIcon({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} fill="none" stroke="#8d95a3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.5">
      <path d="M0 16V-16M0-16-12-4M0-16 12-4" />
    </g>
  );
}

function PadakiMark({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="4" rx="17" ry="22" fill="#ffd84d" />
      <circle cx="0" cy="-12" r="14" fill="#ffdc51" />
      <path d="M-15 1-28 10-15 14ZM15 1 28 10 15 14Z" fill="#ffd84d" />
      <circle cx="-5" cy="-14" r="1.8" fill="#25262a" />
      <circle cx="5" cy="-14" r="1.8" fill="#25262a" />
      <path d="m-2-8 5 2-5 2Z" fill="#f39a32" />
      <path d="M-7 25v6m14-6v6M-11 31h8M3 31h8" fill="none" stroke="#ee8f2c" strokeLinecap="round" strokeWidth="2.5" />
    </g>
  );
}

export function AlphadocHeroMotion({ language, label }: { language: Language; label: string }) {
  const copy = motionCopy[language];
  const motionRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const target = motionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setIsPlaying(true);
      observer.disconnect();
    }, { threshold: 0.34 });

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={motionRef}
      className={`ap-hero-stage ap-hero-motion${isPlaying ? " is-playing" : ""}`}
      role="img"
      aria-label={label}
    >
      <svg className="ap-hero-motion-svg ap-hero-motion-svg--desktop" viewBox="0 0 1400 800" aria-hidden="true">
        <rect className="ap-motion-surface" x="1" y="1" width="1398" height="798" rx="30" />

        <g className="ap-motion-headline">
          <text x="700" y="294" textAnchor="middle">{copy.headline}</text>
        </g>

        <g className="ap-motion-interface ap-motion-logo">
          <image href="/brand/alphadoc-alpha.png" x="522" y="58" width="145" height="127" preserveAspectRatio="xMidYMid meet" />
          <text className="ap-motion-brand-name" x="692" y="148">알파닥</text>
        </g>

        <g className="ap-motion-interface ap-motion-search">
          <rect className="ap-motion-field" x="72" y="356" width="1256" height="112" rx="56" />
          <SearchIcon x={122} y={412} scale={1.08} />
          <text className="ap-motion-placeholder" x="170" y="424">{copy.placeholder}</text>
          <circle className="ap-motion-submit" cx="1270" cy="412" r="35" />
          <SubmitIcon x={1270} y={412} scale={0.72} />
        </g>

        <g className="ap-motion-interface ap-motion-prompt ap-motion-prompt--one">
          <rect x="266" y="512" width="254" height="66" rx="33" />
          <text x="393" y="553" textAnchor="middle">{copy.prompts[0]}</text>
        </g>
        <g className="ap-motion-interface ap-motion-prompt ap-motion-prompt--two">
          <rect x="538" y="512" width="324" height="66" rx="33" />
          <text x="700" y="553" textAnchor="middle">{copy.prompts[1]}</text>
        </g>
        <g className="ap-motion-interface ap-motion-prompt ap-motion-prompt--three">
          <rect x="880" y="512" width="254" height="66" rx="33" />
          <text x="1007" y="553" textAnchor="middle">{copy.prompts[2]}</text>
        </g>

        <g className="ap-motion-interface ap-motion-start">
          <rect x="548" y="650" width="304" height="78" rx="39" />
          <PadakiMark x={603} y={684} scale={0.82} />
          <text x="715" y="699" textAnchor="middle">{copy.start}</text>
        </g>
      </svg>

      <svg className="ap-hero-motion-svg ap-hero-motion-svg--mobile" viewBox="0 0 800 980" aria-hidden="true">
        <rect className="ap-motion-surface" x="1" y="1" width="798" height="978" rx="32" />

        <g className="ap-motion-headline">
          <text x="400" y="280" textAnchor="middle">{copy.headlineMobile[0]}</text>
          <text x="400" y="342" textAnchor="middle">{copy.headlineMobile[1]}</text>
        </g>

        <g className="ap-motion-interface ap-motion-logo">
          <image href="/brand/alphadoc-alpha.png" x="262" y="63" width="115" height="100" preserveAspectRatio="xMidYMid meet" />
          <text className="ap-motion-brand-name" x="397" y="133">알파닥</text>
        </g>

        <g className="ap-motion-interface ap-motion-search">
          <rect className="ap-motion-field" x="44" y="402" width="712" height="112" rx="56" />
          <SearchIcon x={94} y={458} scale={1.02} />
          <text className="ap-motion-placeholder" x="142" y="469">{copy.placeholder}</text>
          <circle className="ap-motion-submit" cx="700" cy="458" r="35" />
          <SubmitIcon x={700} y={458} scale={0.72} />
        </g>

        <g className="ap-motion-interface ap-motion-prompt ap-motion-prompt--one">
          <rect x="90" y="560" width="620" height="62" rx="31" />
          <text x="400" y="599" textAnchor="middle">{copy.prompts[0]}</text>
        </g>
        <g className="ap-motion-interface ap-motion-prompt ap-motion-prompt--two">
          <rect x="90" y="642" width="620" height="62" rx="31" />
          <text x="400" y="681" textAnchor="middle">{copy.prompts[1]}</text>
        </g>
        <g className="ap-motion-interface ap-motion-prompt ap-motion-prompt--three">
          <rect x="90" y="724" width="620" height="62" rx="31" />
          <text x="400" y="763" textAnchor="middle">{copy.prompts[2]}</text>
        </g>

        <g className="ap-motion-interface ap-motion-start">
          <rect x="244" y="846" width="312" height="82" rx="41" />
          <PadakiMark x={300} y={882} scale={0.84} />
          <text x="418" y="897" textAnchor="middle">{copy.start}</text>
        </g>
      </svg>
    </div>
  );
}
