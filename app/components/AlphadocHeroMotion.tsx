"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Language } from "@/app/site-content";

type MotionPhase = "intro" | "typing" | "submitting" | "thinking" | "answer";

const motionCopy = {
  ko: {
    brand: "알파닥",
    headline: "의료인들의 하루를 바꾸는 워크스페이스",
    placeholder: "임상 질문을 물어봐 주세요",
    medicalNotice: "알파닥의 답변은 의료인께서 판단하시는 데 참고로만 사용해 주세요.",
    prompts: ["패혈증 진단 기준은?", "급성 심근경색 초기 처치는?", "심부전 NYHA 분류는?"],
    questionParts: [
      "38세 여성, Hb 8.1, 혈소판 18,000, schistocyte, LDH 1,240, Cr 1.4,",
      "PT/aPTT 정상이며 혼돈이 있습니다.",
      "TTP와 DIC를 감별하고 즉시 처치를 정리해줘.",
    ],
    time: "오전 01:33",
    thinking: "답변을 준비하고 있어요",
    answerLeadStart: "제시된 소견은 ",
    answerLeadPrimary: "혈전성 혈소판감소성 자반증(Thrombotic Thrombocytopenic Purpura, TTP)",
    answerLeadBetween: "에 매우 합당하며, ",
    answerLeadSecondary: "파종성 혈관내 응고(DIC)",
    answerLeadEnd: "보다 우선 가능성이 높습니다.",
    answerPoints: [
      ["핵심 감별:", "미세혈관병성 용혈성 빈혈, 중증 혈소판감소, 신경학적 증상과 정상 PT/aPTT 조합은 TTP를 강하게 시사합니다."],
      ["DIC와의 차이:", "DIC는 흔히 PT/aPTT 연장, fibrinogen 감소, D-dimer 상승이 동반되므로 해당 수치를 동시에 확인합니다."],
      ["ADAMTS13·PLASMIC:", "혈장치료 전 ADAMTS13 검체를 채취하고 PLASMIC score를 계산하되, 결과를 기다리며 치료를 미루지 않습니다."],
      ["즉시 처치:", "혈액내과에 긴급 협진해 혈장교환과 전신 스테로이드를 시작하고, 후천성 TTP가 의심되면 caplacizumab을 고려합니다."],
    ],
    cautionTitle: "임상적 주의사항:",
    cautionPoints: [
      "생명을 위협하는 출혈이 아니라면 혈소판 수혈은 피하고 심장·신경·신장 손상을 함께 감시합니다.",
      "패혈증이나 산과적 합병증 등 DIC 유발 요인이 있으면 원인 평가와 처치를 병행합니다.",
    ],
    suggestions: ["PLASMIC score도 계산할까요?", "초기 처치 순서를 볼까요?"],
    actionLabels: ["복사", "저장", "좋아요", "싫어요"],
  },
  en: {
    brand: "Alphadoc",
    headline: "The workspace changing every clinician's day",
    placeholder: "Ask a clinical question",
    medicalNotice: "Use Alphadoc answers only as a reference for clinical judgment.",
    prompts: ["Sepsis criteria?", "Initial care for acute MI?", "NYHA classification?"],
    questionParts: [
      "A 38-year-old woman has Hb 8.1, platelets 18,000, schistocytes, LDH 1,240, Cr 1.4,",
      "normal PT/aPTT, and confusion.",
      "Differentiate TTP from DIC and outline immediate management.",
    ],
    time: "1:33 AM",
    thinking: "Preparing an answer",
    answerLeadStart: "These findings are highly consistent with ",
    answerLeadPrimary: "thrombotic thrombocytopenic purpura (TTP)",
    answerLeadBetween: " and make ",
    answerLeadSecondary: "disseminated intravascular coagulation (DIC)",
    answerLeadEnd: " less likely as the leading diagnosis.",
    answerPoints: [
      ["Key distinction:", "Microangiopathic hemolytic anemia, severe thrombocytopenia, neurologic symptoms, and normal PT/aPTT strongly favor TTP."],
      ["Compared with DIC:", "DIC more often causes prolonged PT/aPTT, low fibrinogen, and elevated D-dimer; check these in parallel."],
      ["ADAMTS13 and PLASMIC:", "Draw ADAMTS13 before plasma therapy and calculate a PLASMIC score, but do not delay treatment for the result."],
      ["Immediate care:", "Obtain urgent hematology input, start plasma exchange and systemic steroids, and consider caplacizumab for suspected acquired TTP."],
    ],
    cautionTitle: "Clinical considerations:",
    cautionPoints: [
      "Avoid platelet transfusion unless bleeding is life-threatening, and monitor cardiac, neurologic, and renal injury.",
      "If a strong DIC trigger such as sepsis or an obstetric complication exists, evaluate and treat it concurrently.",
    ],
    suggestions: ["Calculate the PLASMIC score?", "Review the first-hour steps?"],
    actionLabels: ["Copy", "Save", "Like", "Dislike"],
  },
} as const;

function SubmitIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 25V7M16 7l-7 7M16 7l7 7" />
    </svg>
  );
}

function AttachIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="m11.2 16.8 8.9-8.9a5.2 5.2 0 0 1 7.4 7.4L14.9 27.9A8 8 0 0 1 3.6 16.6L16 4.2" />
    </svg>
  );
}

function CopyIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="7" width="12" height="12" rx="2" /><path d="M5 16H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1" /></svg>;
}

function BookmarkIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4Z" /></svg>;
}

function ThumbIcon({ down = false }: { down?: boolean }) {
  return (
    <svg className={down ? "is-down" : ""} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 10v11H3V10h4Zm0 9h10.2a2 2 0 0 0 1.9-1.4l2.1-7A2 2 0 0 0 19.3 8H15l.7-3.2A2.4 2.4 0 0 0 13.3 2L7 10v9Z" />
    </svg>
  );
}

export function AlphadocHeroMotion({ language, label }: { language: Language; label: string }) {
  const copy = motionCopy[language];
  const fullQuestion = copy.questionParts.join(" ");
  const motionRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [phase, setPhase] = useState<MotionPhase>("intro");
  const [typedLength, setTypedLength] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

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

  useEffect(() => {
    if (!isPlaying || reducedMotion) return;
    const timeouts: number[] = [];
    let typingTimer = 0;
    const schedule = (callback: () => void, delay: number) => {
      timeouts.push(window.setTimeout(callback, delay));
    };

    schedule(() => {
      setTypedLength(0);
      setPhase("intro");
    }, 0);
    schedule(() => {
      setPhase("typing");
      let cursor = 0;
      typingTimer = window.setInterval(() => {
        cursor = Math.min(cursor + 2, fullQuestion.length);
        setTypedLength(cursor);
        if (cursor < fullQuestion.length) return;

        window.clearInterval(typingTimer);
        typingTimer = 0;
        schedule(() => setPhase("submitting"), 360);
        schedule(() => setPhase("thinking"), 780);
        schedule(() => setPhase("answer"), 1880);
      }, 32);
    }, 1350);

    return () => {
      timeouts.forEach((timer) => window.clearTimeout(timer));
      if (typingTimer) window.clearInterval(typingTimer);
    };
  }, [fullQuestion, isPlaying, reducedMotion]);

  const visiblePhase: MotionPhase = reducedMotion && isPlaying ? "answer" : phase;
  const visibleTypedLength = reducedMotion && isPlaying ? fullQuestion.length : typedLength;
  const typedQuestion = fullQuestion.slice(0, visibleTypedLength);
  const actionIcons = [<CopyIcon key="copy" />, <BookmarkIcon key="bookmark" />, <ThumbIcon key="like" />, <ThumbIcon key="dislike" down />];

  return (
    <div
      ref={motionRef}
      className={`ap-hero-stage ap-hero-motion${isPlaying ? " is-playing" : ""} is-${visiblePhase}${reducedMotion ? " is-reduced" : ""}`}
      role="img"
      aria-label={label}
    >
      <div className="ap-hero-motion-scene" aria-hidden="true">
        <div className="ap-motion-compose">
          <div className="ap-motion-interface ap-motion-logo">
            <Image src="/brand/alphadoc-alpha.png" alt="" width={419} height={365} priority />
            <strong>{copy.brand}</strong>
          </div>

          <p className="ap-motion-headline">{copy.headline}</p>

          <div className={`ap-motion-interface ap-motion-search${visiblePhase === "typing" ? " is-typing" : ""}`}>
            <span className="ap-motion-attach"><AttachIcon /></span>
            <p className={typedQuestion ? "" : "is-placeholder"}>
              {typedQuestion || copy.placeholder}
              {visiblePhase === "typing" ? <i className="ap-motion-caret" /> : null}
            </p>
            <span className="ap-motion-submit"><SubmitIcon /></span>
          </div>

          <div className="ap-motion-prompts">
            {copy.prompts.map((prompt, index) => (
              <span className={`ap-motion-interface ap-motion-prompt ap-motion-prompt--${index + 1}`} key={prompt}>{prompt}</span>
            ))}
          </div>
        </div>

        <div className="ap-motion-chat">
          <div className="ap-motion-chat-scroll">
            <div className="ap-motion-chat-document">
              <div className="ap-motion-user-row">
                <div className="ap-motion-user-bubble"><p>{fullQuestion}</p></div>
                <time>{copy.time}</time>
              </div>

              <div className="ap-motion-response">
                <div className="ap-motion-thinking">
                  <span><i /><i /><i /></span>
                  <p>{copy.thinking}</p>
                </div>

                <div className="ap-motion-answer">
                  <p className="ap-motion-answer-lead">
                    {copy.answerLeadStart}<strong>{copy.answerLeadPrimary}</strong>{copy.answerLeadBetween}<strong>{copy.answerLeadSecondary}</strong>{copy.answerLeadEnd}
                  </p>

                  <ul className="ap-motion-answer-list">
                    {copy.answerPoints.map(([name, detail]) => (
                      <li key={name}><i /><p><strong>{name}</strong> {detail}</p></li>
                    ))}
                  </ul>

                  <section className="ap-motion-caution">
                    <strong>{copy.cautionTitle}</strong>
                    <ul>
                      {copy.cautionPoints.map((point) => <li key={point}><i /><span>{point}</span></li>)}
                    </ul>
                  </section>

                  <div className="ap-motion-suggestions">
                    {copy.suggestions.map((suggestion) => <span key={suggestion}>{suggestion}</span>)}
                  </div>

                  <div className="ap-motion-answer-footer">
                    <div className="ap-motion-action-bar">
                      {actionIcons.map((icon, index) => <span key={copy.actionLabels[index]} aria-label={copy.actionLabels[index]}>{icon}</span>)}
                    </div>
                    <time>{copy.time}</time>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="ap-motion-composer">
            <span className="ap-motion-composer-attach"><AttachIcon /></span>
            <span className="ap-motion-composer-copy">
              <b>{copy.placeholder}</b>
              <small>{copy.medicalNotice}</small>
            </span>
            <span className="ap-motion-composer-submit"><SubmitIcon /></span>
          </div>
        </div>
      </div>
    </div>
  );
}
