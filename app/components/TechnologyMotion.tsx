import type { CSSProperties, ReactNode } from "react";
import { ViewportMotion } from "@/app/components/ViewportMotion";
import type { Language } from "@/app/site-content";

export type TechnologyMotionKind = "overview" | "evidence" | "engine" | "document" | "layer";
type SvgTone = "ink" | "blue" | "red" | "muted";

const diagramCopy = {
  ko: {
    overview: {
      title: "바이오레 기술 생태계",
      description: "AlphaDoc Engine을 중심으로 AlphaEvidence, AlphaDocument, AlphaLayer와 Alphadoc이 서로 다른 역할로 연결되는 비직렬 기술 구조입니다.",
    },
    evidence: {
      title: "AlphaEvidence 근거 생태계",
      description: "AlphaEvidence DB를 중심으로 출처, 변화, 권리 맥락, 품질과 검색 계약이 함께 연결되는 Evidence Foundation 구조입니다.",
    },
    engine: {
      title: "AlphaDoc Engine 실행 오케스트레이션",
      description: "AlphaDoc Engine을 중심으로 질문, 근거, 문서, 도구와 검토가 목적별 capability로 연결되는 구조입니다.",
    },
    document: {
      title: "AlphaDocument artifact 구조",
      description: "다양한 디지털 문서가 AlphaDocument에서 출처와 구조가 보존된 하나의 artifact로 수렴하고 여러 기술에서 다시 활용되는 구조입니다.",
    },
    layer: {
      title: "AlphaLayer 보호 실행 구조",
      description: "AlphaLayer를 중심으로 목적 확인, 정보 최소화, 외부 실행 통제, 응답 무결성과 실행 기록이 동시에 작동하는 구조입니다.",
    },
  },
  en: {
    overview: {
      title: "The Viore technology constellation",
      description: "A non-linear system where AlphaEvidence, AlphaDocument, AlphaLayer, and Alphadoc connect around AlphaDoc Engine through distinct responsibilities.",
    },
    evidence: {
      title: "The AlphaEvidence evidence constellation",
      description: "An Evidence Foundation where source, change, rights context, quality, and retrieval contracts connect around AlphaEvidence DB.",
    },
    engine: {
      title: "AlphaDoc Engine orchestration",
      description: "Questions, evidence, documents, tools, and review connect around AlphaDoc Engine through purpose-defined capabilities.",
    },
    document: {
      title: "The AlphaDocument artifact system",
      description: "Digital documents converge into one provenance-carrying artifact and become reusable across Viore technologies.",
    },
    layer: {
      title: "The AlphaLayer protected execution system",
      description: "Purpose, minimization, external execution control, response integrity, and execution records operate around AlphaLayer.",
    },
  },
} as const;

function stepStyle(step: number): CSSProperties {
  return { "--svg-step": step } as CSSProperties;
}

function textLines(value: string | readonly string[]) {
  return typeof value === "string" ? [value] : value;
}

function SvgDefs({ id }: { id: string }) {
  return (
    <defs>
      <filter id={`${id}-paper-grain`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency=".82" numOctaves="2" seed="11" />
        <feColorMatrix type="matrix" values=".18 0 0 0 .72  0 .18 0 0 .72  0 0 .18 0 .7  0 0 0 .12 0" />
      </filter>
      {(["ink", "blue", "red", "muted"] as const).map((tone) => (
        <marker
          id={`${id}-arrow-${tone}`}
          key={tone}
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="7"
          markerHeight="7"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path d="M 0 0 L 8 4 L 0 8 Z" className={`diagram-marker diagram-marker-${tone}`} />
        </marker>
      ))}
    </defs>
  );
}

function Node({
  x,
  y,
  width,
  height,
  eyebrow,
  title,
  detail,
  tone = "ink",
  step,
  center = false,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  eyebrow: string;
  title: string | readonly string[];
  detail?: string | readonly string[];
  tone?: SvgTone;
  step: number;
  center?: boolean;
}) {
  const titles = textLines(title);
  const details = detail ? textLines(detail) : [];
  const textX = center ? x + width / 2 : x + 14;
  const anchor = center ? "middle" : "start";
  const titleY = y + (height <= 62 ? 35 : 44);
  const detailY = y + height - 13 - Math.max(0, details.length - 1) * 11;

  return (
    <g className="technology-svg-step" style={stepStyle(step)}>
      <rect x={x} y={y} width={width} height={height} rx="7" className={`diagram-box diagram-box-${tone}`} />
      <circle cx={x + 9} cy={y + 9} r="3.3" className={`diagram-dot diagram-dot-${tone}`} />
      <text x={textX} y={y + 20} textAnchor={anchor} className="diagram-eyebrow">{eyebrow}</text>
      <text x={textX} y={titleY} textAnchor={anchor} className="diagram-title">
        {titles.map((line, index) => (
          <tspan x={textX} dy={index === 0 ? 0 : 17} key={line}>{line}</tspan>
        ))}
      </text>
      {details.length > 0 && (
        <text x={textX} y={detailY} textAnchor={anchor} className="diagram-detail">
          {details.map((line, index) => (
            <tspan x={textX} dy={index === 0 ? 0 : 11} key={line}>{line}</tspan>
          ))}
        </text>
      )}
    </g>
  );
}

function Curve({
  d,
  id,
  tone = "ink",
  step,
  arrow = false,
}: {
  d: string;
  id: string;
  tone?: SvgTone;
  step: number;
  arrow?: boolean;
}) {
  return (
    <path
      d={d}
      className={`diagram-link diagram-link-${tone} technology-svg-step`}
      markerEnd={arrow ? `url(#${id}-arrow-${tone})` : undefined}
      style={stepStyle(step)}
    />
  );
}

function Orbit({ cx, cy, rx, ry, step }: { cx: number; cy: number; rx: number; ry: number; step: number }) {
  return (
    <ellipse
      cx={cx}
      cy={cy}
      rx={rx}
      ry={ry}
      className="diagram-orbit technology-svg-step"
      style={stepStyle(step)}
    />
  );
}

function DiagramSvg({
  id,
  kind,
  language,
  mobile,
  width,
  height,
  children,
}: {
  id: string;
  kind: TechnologyMotionKind;
  language: Language;
  mobile: boolean;
  width: number;
  height: number;
  children: ReactNode;
}) {
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;
  const copy = diagramCopy[language][kind];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`technology-paper-svg ${mobile ? "technology-paper-svg-mobile" : "technology-paper-svg-desktop"}`}
      role="img"
      aria-labelledby={`${titleId} ${descriptionId}`}
    >
      <title id={titleId}>{copy.title}</title>
      <desc id={descriptionId}>{copy.description}</desc>
      <SvgDefs id={id} />
      <rect width={width} height={height} className="diagram-paper" />
      <rect width={width} height={height} className="diagram-paper-grain" filter={`url(#${id}-paper-grain)`} />
      {children}
    </svg>
  );
}

function OverviewSvg({ language, mobile }: { language: Language; mobile: boolean }) {
  const id = `technology-overview-${language}-${mobile ? "mobile" : "desktop"}`;
  const ko = language === "ko";

  if (mobile) {
    return (
      <DiagramSvg id={id} kind="overview" language={language} mobile width={420} height={590}>
        <Orbit cx={210} cy={292} rx={170} ry={208} step={1} />
        <Orbit cx={210} cy={292} rx={112} ry={142} step={1} />
        <Curve d="M 210 195 C 140 170 100 160 74 143" id={id} tone="blue" step={2} />
        <Curve d="M 210 195 C 280 170 320 160 346 143" id={id} tone="red" step={2} />
        <Curve d="M 145 300 C 90 300 74 310 60 332" id={id} tone="blue" step={3} />
        <Curve d="M 275 300 C 330 300 346 310 360 332" id={id} tone="red" step={3} />
        <Curve d="M 210 387 C 210 430 210 448 210 470" id={id} tone="ink" step={4} />
        <Node x={135} y={238} width={150} height={108} eyebrow="ORCHESTRATION" title={["AlphaDoc", "Engine"]} detail={ko ? "목적 · 맥락 · 실행" : "purpose · context · action"} tone="red" step={5} center />
        <Node x={20} y={72} width={150} height={86} eyebrow="EVIDENCE FOUNDATION" title="AlphaEvidence" detail={ko ? "출처 · 변화 · 근거" : "source · change · evidence"} tone="blue" step={6} />
        <Node x={250} y={72} width={150} height={86} eyebrow="DOCUMENT ARTIFACTS" title="AlphaDocument" detail={ko ? "구조 · 출처 · 무결성" : "structure · provenance · integrity"} tone="blue" step={7} />
        <Node x={18} y={332} width={150} height={88} eyebrow="PROTECTED EXECUTION" title="AlphaLayer" detail={ko ? "보호 · 통제 · 증거" : "protect · control · assure"} tone="red" step={8} />
        <Node x={252} y={332} width={150} height={88} eyebrow="AI MEDICAL WORKSPACE" title="Alphadoc" detail={ko ? "질문 · 문서 · 도구" : "questions · documents · tools"} tone="ink" step={9} />
        <Node x={126} y={474} width={168} height={76} eyebrow="HUMAN IN THE LOOP" title={ko ? "의료인의 검토" : "Professional review"} tone="ink" step={10} center />
      </DiagramSvg>
    );
  }

  return (
    <DiagramSvg id={id} kind="overview" language={language} mobile={false} width={820} height={510}>
      <Orbit cx={410} cy={255} rx={322} ry={184} step={1} />
      <Orbit cx={410} cy={255} rx={218} ry={128} step={1} />
      <Curve d="M 340 218 C 276 150 220 132 178 136" id={id} tone="blue" step={2} />
      <Curve d="M 480 218 C 544 150 600 132 642 136" id={id} tone="blue" step={2} />
      <Curve d="M 340 290 C 274 350 222 368 178 366" id={id} tone="red" step={3} />
      <Curve d="M 480 290 C 546 350 598 368 642 366" id={id} tone="ink" step={3} />
      <Curve d="M 410 311 C 410 370 410 402 410 428" id={id} tone="ink" step={4} />
      <Node x={315} y={198} width={190} height={114} eyebrow="ORCHESTRATION" title="AlphaDoc Engine" detail={ko ? "목적 · 맥락 · 근거 · 실행" : "purpose · context · evidence · action"} tone="red" step={5} center />
      <Node x={35} y={86} width={206} height={96} eyebrow="EVIDENCE FOUNDATION" title="AlphaEvidence" detail={ko ? "출처 · 변화 · 근거의 계보" : "source · change · evidence lineage"} tone="blue" step={6} />
      <Node x={579} y={86} width={206} height={96} eyebrow="DOCUMENT ARTIFACTS" title="AlphaDocument" detail={ko ? "구조 · 출처 · 무결성" : "structure · provenance · integrity"} tone="blue" step={7} />
      <Node x={35} y={322} width={206} height={96} eyebrow="PROTECTED EXECUTION" title="AlphaLayer" detail={ko ? "보호 · 통제 · 실행 증거" : "protection · control · assurance"} tone="red" step={8} />
      <Node x={579} y={322} width={206} height={96} eyebrow="AI MEDICAL WORKSPACE" title="Alphadoc" detail={ko ? "질문 · 문서 · 도구 · 커뮤니티" : "questions · documents · tools · community"} tone="ink" step={9} />
      <Node x={316} y={420} width={188} height={64} eyebrow="HUMAN IN THE LOOP" title={ko ? "의료인의 검토와 판단" : "Professional review"} tone="ink" step={10} center />
    </DiagramSvg>
  );
}

function EvidenceSvg({ language, mobile }: { language: Language; mobile: boolean }) {
  const id = `technology-evidence-${language}-${mobile ? "mobile" : "desktop"}`;
  const ko = language === "ko";
  const width = mobile ? 420 : 820;
  const height = mobile ? 610 : 470;
  const cx = width / 2;
  const cy = mobile ? 305 : 235;
  const hubX = mobile ? 125 : 300;
  const hubY = mobile ? 248 : 178;
  const hubW = mobile ? 170 : 220;

  return (
    <DiagramSvg id={id} kind="evidence" language={language} mobile={mobile} width={width} height={height}>
      <Orbit cx={cx} cy={cy} rx={mobile ? 174 : 314} ry={mobile ? 230 : 164} step={1} />
      <Orbit cx={cx} cy={cy} rx={mobile ? 116 : 206} ry={mobile ? 150 : 108} step={1} />
      <Curve d={mobile ? "M 160 248 C 118 195 90 160 78 130" : "M 330 178 C 280 130 236 105 204 108"} id={id} tone="blue" step={2} />
      <Curve d={mobile ? "M 260 248 C 302 195 330 160 342 130" : "M 490 178 C 540 130 584 105 616 108"} id={id} tone="blue" step={2} />
      <Curve d={mobile ? "M 125 305 C 88 310 70 340 66 375" : "M 300 235 C 240 235 204 260 182 300"} id={id} tone="red" step={3} />
      <Curve d={mobile ? "M 295 305 C 332 310 350 340 354 375" : "M 520 235 C 580 235 616 260 638 300"} id={id} tone="red" step={3} />
      <Curve d={mobile ? "M 210 362 C 210 420 210 456 210 486" : "M 410 292 C 410 344 410 372 410 392"} id={id} tone="ink" step={4} />
      <Node x={hubX} y={hubY} width={hubW} height={114} eyebrow="EVIDENCE FOUNDATION" title="AlphaEvidence DB" detail={ko ? "살아 있는 근거의 중심" : "a living center of evidence"} tone="blue" step={5} center />
      <Node x={mobile ? 18 : 38} y={mobile ? 64 : 60} width={mobile ? 154 : 210} height={90} eyebrow="SOURCE IDENTITY" title={ko ? "출처를 잃지 않는 근거" : "Evidence with identity"} detail={ko ? "source · provenance" : "source · provenance"} tone="blue" step={6} />
      <Node x={mobile ? 248 : 572} y={mobile ? 64 : 60} width={mobile ? 154 : 210} height={90} eyebrow="LIVING HISTORY" title={ko ? "변화를 기억하는 지식" : "Knowledge that remembers"} detail={ko ? "version · observation" : "version · observation"} tone="blue" step={7} />
      <Node x={mobile ? 16 : 36} y={mobile ? 365 : 286} width={mobile ? 154 : 210} height={94} eyebrow="RIGHTS CONTEXT" title={ko ? "이용 맥락까지 함께" : "Rights in context"} detail={ko ? "policy · scope" : "policy · scope"} tone="red" step={8} />
      <Node x={mobile ? 250 : 574} y={mobile ? 365 : 286} width={mobile ? 154 : 210} height={94} eyebrow="SOURCE HEALTH" title={ko ? "계속 확인되는 품질" : "Continuously observed"} detail={ko ? "freshness · quality" : "freshness · quality"} tone="red" step={9} />
      <Node x={mobile ? 126 : 306} y={mobile ? 490 : 386} width={mobile ? 168 : 208} height={76} eyebrow="RETRIEVAL CONTRACT" title="AlphaDoc Engine" detail={ko ? "검토 가능한 근거로 전달" : "reviewable evidence delivery"} tone="ink" step={10} center />
    </DiagramSvg>
  );
}

function EngineSvg({ language, mobile }: { language: Language; mobile: boolean }) {
  const id = `technology-engine-${language}-${mobile ? "mobile" : "desktop"}`;
  const ko = language === "ko";

  if (mobile) {
    return (
      <DiagramSvg id={id} kind="engine" language={language} mobile width={420} height={650}>
        <Orbit cx={210} cy={318} rx={176} ry={248} step={1} />
        <Curve d="M 170 270 C 124 210 92 170 76 140" id={id} tone="red" step={2} />
        <Curve d="M 250 270 C 296 210 328 170 344 140" id={id} tone="blue" step={2} />
        <Curve d="M 130 318 C 88 318 70 340 60 376" id={id} tone="blue" step={3} />
        <Curve d="M 290 318 C 332 318 350 340 360 376" id={id} tone="red" step={3} />
        <Curve d="M 170 372 C 130 430 106 466 90 494" id={id} tone="ink" step={4} />
        <Curve d="M 250 372 C 290 430 314 466 330 494" id={id} tone="ink" step={4} />
        <Node x={126} y={265} width={168} height={112} eyebrow="PURPOSE-DEFINED" title={["AlphaDoc", "Engine"]} detail={ko ? "업무 의도를 실행으로" : "intent into action"} tone="red" step={5} center />
        <Node x={18} y={74} width={154} height={88} eyebrow="QUESTION" title={ko ? "임상 질문" : "Clinical question"} detail={ko ? "맥락을 이해" : "context understood"} tone="red" step={6} />
        <Node x={248} y={74} width={154} height={88} eyebrow="EVIDENCE" title="AlphaEvidence" detail={ko ? "근거를 결합" : "evidence connected"} tone="blue" step={7} />
        <Node x={16} y={372} width={154} height={88} eyebrow="DOCUMENT" title="AlphaDocument" detail={ko ? "artifact를 활용" : "artifacts in context"} tone="blue" step={8} />
        <Node x={250} y={372} width={154} height={88} eyebrow="PROTECTED AI" title="AlphaLayer" detail={ko ? "보호된 실행" : "protected execution"} tone="red" step={9} />
        <Node x={28} y={502} width={164} height={80} eyebrow="TOOLS & WORKFLOWS" title={ko ? "다음 업무" : "Next actions"} tone="ink" step={10} />
        <Node x={228} y={502} width={164} height={80} eyebrow="REVIEW" title={ko ? "의료인의 판단" : "Professional judgment"} tone="ink" step={11} />
      </DiagramSvg>
    );
  }

  return (
    <DiagramSvg id={id} kind="engine" language={language} mobile={false} width={820} height={510}>
      <Orbit cx={410} cy={255} rx={330} ry={188} step={1} />
      <Orbit cx={410} cy={255} rx={218} ry={125} step={1} />
      <Curve d="M 340 210 C 286 148 236 126 190 128" id={id} tone="red" step={2} />
      <Curve d="M 480 210 C 534 148 584 126 630 128" id={id} tone="blue" step={2} />
      <Curve d="M 315 255 C 252 255 210 264 172 292" id={id} tone="blue" step={3} />
      <Curve d="M 505 255 C 568 255 610 264 648 292" id={id} tone="red" step={3} />
      <Curve d="M 348 308 C 296 366 256 386 208 390" id={id} tone="ink" step={4} />
      <Curve d="M 472 308 C 524 366 564 386 612 390" id={id} tone="ink" step={4} />
      <Node x={315} y={196} width={190} height={118} eyebrow="PURPOSE-DEFINED" title="AlphaDoc Engine" detail={ko ? "업무 의도를 실행 가능한 흐름으로" : "medical intent into executable flow"} tone="red" step={5} center />
      <Node x={34} y={82} width={210} height={94} eyebrow="QUESTION" title={ko ? "임상 질문과 맥락" : "Clinical question"} detail={ko ? "질문의 목적을 이해" : "intent in context"} tone="red" step={6} />
      <Node x={576} y={82} width={210} height={94} eyebrow="EVIDENCE" title="AlphaEvidence" detail={ko ? "출처가 살아 있는 근거" : "source-bound evidence"} tone="blue" step={7} />
      <Node x={28} y={270} width={210} height={94} eyebrow="DOCUMENT" title="AlphaDocument" detail={ko ? "문서 artifact를 활용" : "artifacts in context"} tone="blue" step={8} />
      <Node x={582} y={270} width={210} height={94} eyebrow="PROTECTED AI" title="AlphaLayer" detail={ko ? "보호된 외부 실행" : "protected external execution"} tone="red" step={9} />
      <Node x={82} y={382} width={220} height={80} eyebrow="TOOLS & WORKFLOWS" title={ko ? "답변 다음의 업무" : "Actions beyond answers"} tone="ink" step={10} />
      <Node x={518} y={382} width={220} height={80} eyebrow="REVIEW" title={ko ? "의료인의 검토와 판단" : "Professional judgment"} tone="ink" step={11} />
    </DiagramSvg>
  );
}

function DocumentSvg({ language, mobile }: { language: Language; mobile: boolean }) {
  const id = `technology-document-${language}-${mobile ? "mobile" : "desktop"}`;
  const ko = language === "ko";

  if (mobile) {
    return (
      <DiagramSvg id={id} kind="document" language={language} mobile width={420} height={620}>
        <Orbit cx={210} cy={310} rx={176} ry={222} step={1} />
        <Curve d="M 140 262 C 110 220 88 184 74 148" id={id} tone="blue" step={2} />
        <Curve d="M 280 262 C 310 220 332 184 346 148" id={id} tone="blue" step={2} />
        <Curve d="M 125 316 C 84 316 64 330 52 360" id={id} tone="muted" step={3} />
        <Curve d="M 295 316 C 336 316 356 330 368 360" id={id} tone="red" step={3} />
        <Curve d="M 210 378 C 210 428 210 458 210 486" id={id} tone="ink" step={4} />
        <Node x={120} y={255} width={180} height={124} eyebrow="DETERMINISTIC CORE" title={["Document", "Artifact"]} detail={ko ? "구조 · 출처 · 무결성" : "structure · provenance · integrity"} tone="blue" step={5} center />
        <Node x={18} y={72} width={154} height={90} eyebrow="DIGITAL DOCUMENTS" title={ko ? "다양한 문서 형식" : "Multiple formats"} detail="PDF · DOCX · HWP · CSV" tone="blue" step={6} />
        <Node x={248} y={72} width={154} height={90} eyebrow="SOURCE ANCHORS" title={ko ? "원문 위치를 보존" : "Source locations"} detail={ko ? "문단 · 표 · 구조" : "blocks · tables · structure"} tone="blue" step={7} />
        <Node x={16} y={360} width={154} height={90} eyebrow="REUSABLE INPUT" title="AlphaEvidence" detail={ko ? "근거 수집의 기반" : "evidence ingestion"} tone="muted" step={8} />
        <Node x={250} y={360} width={154} height={90} eyebrow="REUSABLE INPUT" title="AlphaDoc Engine" detail={ko ? "문서 맥락의 기반" : "document context"} tone="red" step={9} />
        <Node x={118} y={492} width={184} height={78} eyebrow="ONE SOURCE, MANY USES" title={ko ? "다시 쓰이는 문서 지식" : "Reusable document knowledge"} tone="ink" step={10} center />
      </DiagramSvg>
    );
  }

  return (
    <DiagramSvg id={id} kind="document" language={language} mobile={false} width={820} height={480}>
      <Orbit cx={410} cy={240} rx={325} ry={172} step={1} />
      <Orbit cx={410} cy={240} rx={218} ry={112} step={1} />
      <Curve d="M 330 195 C 274 138 226 118 186 124" id={id} tone="blue" step={2} />
      <Curve d="M 490 195 C 546 138 594 118 634 124" id={id} tone="blue" step={2} />
      <Curve d="M 315 260 C 252 272 218 302 188 326" id={id} tone="muted" step={3} />
      <Curve d="M 505 260 C 568 272 602 302 632 326" id={id} tone="red" step={3} />
      <Curve d="M 410 304 C 410 350 410 376 410 396" id={id} tone="ink" step={4} />
      <Node x={310} y={184} width={200} height={122} eyebrow="DETERMINISTIC CORE" title="Document Artifact" detail={ko ? "구조 · 출처 · 무결성" : "structure · provenance · integrity"} tone="blue" step={5} center />
      <Node x={36} y={72} width={220} height={96} eyebrow="DIGITAL DOCUMENTS" title={ko ? "다양한 문서 형식" : "Multiple formats"} detail="PDF · DOCX · HWP · CSV" tone="blue" step={6} />
      <Node x={564} y={72} width={220} height={96} eyebrow="SOURCE ANCHORS" title={ko ? "원문 위치를 보존" : "Source locations"} detail={ko ? "문단 · 표 · 구조" : "blocks · tables · structure"} tone="blue" step={7} />
      <Node x={34} y={292} width={220} height={96} eyebrow="REUSABLE INPUT" title="AlphaEvidence" detail={ko ? "근거 수집의 기반" : "evidence ingestion"} tone="muted" step={8} />
      <Node x={566} y={292} width={220} height={96} eyebrow="REUSABLE INPUT" title="AlphaDoc Engine" detail={ko ? "문서 맥락의 기반" : "document context"} tone="red" step={9} />
      <Node x={300} y={394} width={220} height={62} eyebrow="ONE SOURCE, MANY USES" title={ko ? "다시 쓰이는 문서 지식" : "Reusable document knowledge"} tone="ink" step={10} center />
    </DiagramSvg>
  );
}

function LayerSvg({ language, mobile }: { language: Language; mobile: boolean }) {
  const id = `technology-layer-${language}-${mobile ? "mobile" : "desktop"}`;
  const ko = language === "ko";

  if (mobile) {
    return (
      <DiagramSvg id={id} kind="layer" language={language} mobile width={420} height={650}>
        <Orbit cx={210} cy={318} rx={176} ry={246} step={1} />
        <Orbit cx={210} cy={318} rx={112} ry={156} step={1} />
        <Curve d="M 126 318 C 94 300 72 270 62 230" id={id} tone="red" step={2} />
        <Curve d="M 294 318 C 326 300 348 270 358 230" id={id} tone="red" step={2} />
        <Curve d="M 168 262 C 128 214 102 176 86 142" id={id} tone="blue" step={3} />
        <Curve d="M 252 262 C 292 214 318 176 334 142" id={id} tone="blue" step={3} />
        <Curve d="M 168 374 C 128 428 102 466 86 500" id={id} tone="ink" step={4} />
        <Curve d="M 252 374 C 292 428 318 466 334 500" id={id} tone="ink" step={4} />
        <Node x={126} y={263} width={168} height={112} eyebrow="PROTECTED GATEWAY" title="AlphaLayer" detail={ko ? "외부 실행의 보호 경계" : "protected execution boundary"} tone="red" step={5} center />
        <Node x={18} y={70} width={154} height={88} eyebrow="PURPOSE" title={ko ? "목적을 먼저 확인" : "Purpose first"} detail={ko ? "업무별 실행 경계" : "task-bound execution"} tone="blue" step={6} />
        <Node x={248} y={70} width={154} height={88} eyebrow="MINIMIZATION" title={ko ? "필요한 정보만" : "Only what is needed"} detail={ko ? "맥락을 지키며 최소화" : "context-aware minimization"} tone="blue" step={7} />
        <Node x={16} y={196} width={154} height={88} eyebrow="ENGINE SIDE" title="AlphaDoc Engine" detail={ko ? "승인된 실행 요청" : "approved invocation"} tone="red" step={8} />
        <Node x={250} y={196} width={154} height={88} eyebrow="EXECUTION SIDE" title={ko ? "승인된 실행 환경" : "Approved execution"} detail={ko ? "교체 가능한 실행 기반" : "replaceable backend"} tone="red" step={9} />
        <Node x={18} y={498} width={154} height={88} eyebrow="INTEGRITY" title={ko ? "응답 무결성" : "Response integrity"} detail={ko ? "요청과 응답을 연결" : "request-bound response"} tone="ink" step={10} />
        <Node x={248} y={498} width={154} height={88} eyebrow="ASSURANCE" title={ko ? "실행의 증거" : "Execution evidence"} detail={ko ? "원문 없는 최소 기록" : "minimal payload-free record"} tone="ink" step={11} />
      </DiagramSvg>
    );
  }

  return (
    <DiagramSvg id={id} kind="layer" language={language} mobile={false} width={820} height={520}>
      <Orbit cx={410} cy={260} rx={330} ry={190} step={1} />
      <Orbit cx={410} cy={260} rx={222} ry={126} step={1} />
      <Curve d="M 315 260 C 262 248 224 226 194 204" id={id} tone="red" step={2} />
      <Curve d="M 505 260 C 558 248 596 226 626 204" id={id} tone="red" step={2} />
      <Curve d="M 348 207 C 294 150 246 126 196 128" id={id} tone="blue" step={3} />
      <Curve d="M 472 207 C 526 150 574 126 624 128" id={id} tone="blue" step={3} />
      <Curve d="M 348 313 C 294 370 246 394 196 392" id={id} tone="ink" step={4} />
      <Curve d="M 472 313 C 526 370 574 394 624 392" id={id} tone="ink" step={4} />
      <Node x={315} y={202} width={190} height={116} eyebrow="PROTECTED GATEWAY" title="AlphaLayer" detail={ko ? "외부 실행의 보호 경계" : "protected execution boundary"} tone="red" step={5} center />
      <Node x={34} y={78} width={220} height={94} eyebrow="PURPOSE" title={ko ? "목적을 먼저 확인" : "Purpose first"} detail={ko ? "업무별 실행 경계" : "task-bound execution"} tone="blue" step={6} />
      <Node x={566} y={78} width={220} height={94} eyebrow="MINIMIZATION" title={ko ? "필요한 정보만" : "Only what is needed"} detail={ko ? "맥락을 지키며 최소화" : "context-aware minimization"} tone="blue" step={7} />
      <Node x={26} y={202} width={220} height={94} eyebrow="ENGINE SIDE" title="AlphaDoc Engine" detail={ko ? "승인된 실행 요청" : "approved invocation"} tone="red" step={8} />
      <Node x={574} y={202} width={220} height={94} eyebrow="EXECUTION SIDE" title={ko ? "승인된 실행 환경" : "Approved execution"} detail={ko ? "교체 가능한 실행 기반" : "replaceable backend"} tone="red" step={9} />
      <Node x={34} y={350} width={220} height={94} eyebrow="INTEGRITY" title={ko ? "응답 무결성" : "Response integrity"} detail={ko ? "요청과 응답을 정확히 연결" : "request-bound response"} tone="ink" step={10} />
      <Node x={566} y={350} width={220} height={94} eyebrow="ASSURANCE" title={ko ? "실행의 증거" : "Execution evidence"} detail={ko ? "원문 없는 최소 기록" : "minimal payload-free record"} tone="ink" step={11} />
    </DiagramSvg>
  );
}

function DiagramPair({ kind, language }: { kind: TechnologyMotionKind; language: Language }) {
  if (kind === "overview") return <><OverviewSvg language={language} mobile={false} /><OverviewSvg language={language} mobile /></>;
  if (kind === "evidence") return <><EvidenceSvg language={language} mobile={false} /><EvidenceSvg language={language} mobile /></>;
  if (kind === "engine") return <><EngineSvg language={language} mobile={false} /><EngineSvg language={language} mobile /></>;
  if (kind === "document") return <><DocumentSvg language={language} mobile={false} /><DocumentSvg language={language} mobile /></>;
  return <><LayerSvg language={language} mobile={false} /><LayerSvg language={language} mobile /></>;
}

export function TechnologyMotion({ kind, language }: { kind: TechnologyMotionKind; language: Language }) {
  return (
    <ViewportMotion
      activeClassName="is-active"
      className={`technology-raw-diagram technology-raw-diagram-${kind}`}
      deferChildren
      eagerOnSmallScreens
      enhancedClassName="is-enhanced"
      mountMargin="720px 0px"
      once
      threshold={0.14}
    >
      <DiagramPair kind={kind} language={language} />
    </ViewportMotion>
  );
}
