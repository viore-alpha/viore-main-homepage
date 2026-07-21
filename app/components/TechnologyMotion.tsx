"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export type TechnologyMotionKind = "overview" | "evidence" | "engine" | "evaluation" | "document" | "layer";
type SvgTone = "ink" | "blue" | "red" | "muted";

const diagramCopy: Record<TechnologyMotionKind, { title: string; description: string }> = {
  overview: {
    title: "바이오레 기술의 전체 흐름",
    description: "의학 근거와 업무 의도가 각각의 경계를 지나 AlphaDoc Engine에서 만나고, 문서 통제와 사용자 검토로 이어지는 구조입니다.",
  },
  evidence: {
    title: "AlphaEvidence 수집과 출처 이력",
    description: "허용된 출처가 독립 stream과 하나의 ingestion gateway를 지나 세 가지 기록으로 보존된 뒤 버전이 있는 검색 계약으로 전달됩니다.",
  },
  engine: {
    title: "AlphaDoc Engine capability 실행 구조",
    description: "업무 의도가 등록된 capability contract를 거쳐 실행되고 Release Identity가 sidecar 기록으로 남는 구조입니다.",
  },
  evaluation: {
    title: "AlphaDoc Engine 평가 게이트",
    description: "코드로 판정하는 실패, 모델 보조 평가, 사용자 검토를 한 점수로 섞지 않고 각각의 게이트로 다루는 구조입니다.",
  },
  document: {
    title: "AlphaDocument 문서 통제 구조",
    description: "문서 경계와 필수 입력을 먼저 확인하고 허용된 workflow만 실행한 뒤 모든 결과를 사용자 검토로 보내는 구조입니다.",
  },
  layer: {
    title: "AlphaLayer 개인정보 통제 경로",
    description: "현재 작동하는 인증과 파일 통제는 실선으로, 분류와 tokenization, rehydration 목표 경로는 점선으로 구분한 구조입니다.",
  },
};

function stepStyle(step: number): CSSProperties {
  return { "--svg-step": step } as CSSProperties;
}

function textLines(value: string | readonly string[]): readonly string[] {
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

function Paper({ filterId, width, height }: { filterId: string; width: number; height: number }) {
  return (
    <g aria-hidden="true">
      <rect width={width} height={height} className="diagram-paper" />
      <rect width={width} height={height} className="diagram-paper-grain" filter={`url(#${filterId}-paper-grain)`} />
    </g>
  );
}

function SvgNode({
  x,
  y,
  width,
  height,
  eyebrow,
  title,
  detail,
  tone = "ink",
  dashed = false,
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
  dashed?: boolean;
  step: number;
  center?: boolean;
}) {
  const titleLines = textLines(title);
  const detailLines = detail ? textLines(detail) : [];
  const textX = center ? x + width / 2 : x + 14;
  const anchor = center ? "middle" : "start";
  const tightLayout = height <= 64 && (titleLines.length > 1 || detailLines.length > 0);
  const eyebrowY = y + (tightLayout ? 15 : 20);
  const titleY = y + (tightLayout ? 33 : 43);
  const titleLineHeight = tightLayout ? 14 : 17;
  const detailLineHeight = tightLayout ? 10 : 12;
  const titleLastBaseline = titleY + ((titleLines.length - 1) * titleLineHeight);
  const detailStart = Math.max(
    titleLastBaseline + (tightLayout ? 10 : 15),
    y + height - (tightLayout ? 9 : 13) - ((detailLines.length - 1) * detailLineHeight),
  );
  const eyebrowWidth = Array.from(eyebrow).reduce((sum, character) => {
    if (/\s/.test(character)) return sum + 3;
    if (/[A-Z0-9]/.test(character)) return sum + 5.1;
    if (/[a-z]/.test(character)) return sum + 4.2;
    return sum + 7.5;
  }, 0) + Math.max(0, eyebrow.length - 1) * .7;
  const eyebrowTextLength = eyebrowWidth > width - 28 ? width - 28 : undefined;

  return (
    <g className="technology-svg-step" style={stepStyle(step)}>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="5"
        className={`diagram-box diagram-box-${tone}${dashed ? " is-dashed" : ""}`}
      />
      <circle cx={x + 8} cy={y + 8} r="3.2" className={`diagram-dot diagram-dot-${tone}${dashed ? " is-hollow" : ""}`} />
      <text
        x={textX}
        y={eyebrowY}
        textAnchor={anchor}
        className={`diagram-eyebrow${tightLayout ? " is-tight" : ""}`}
        textLength={eyebrowTextLength}
        lengthAdjust={eyebrowTextLength ? "spacingAndGlyphs" : undefined}
      >
        {eyebrow}
      </text>
      <text x={textX} y={titleY} textAnchor={anchor} className={`diagram-title${tightLayout ? " is-tight" : ""}`}>
        {titleLines.map((line, index) => (
          <tspan x={textX} dy={index === 0 ? 0 : titleLineHeight} key={line}>{line}</tspan>
        ))}
      </text>
      {detailLines.length > 0 && (
        <text x={textX} y={detailStart} textAnchor={anchor} className={`diagram-detail${tightLayout ? " is-tight" : ""}`}>
          {detailLines.map((line, index) => (
            <tspan x={textX} dy={index === 0 ? 0 : detailLineHeight} key={line}>{line}</tspan>
          ))}
        </text>
      )}
    </g>
  );
}

function SvgConnector({
  d,
  id,
  tone = "ink",
  dashed = false,
  arrow = true,
  step,
}: {
  d: string;
  id: string;
  tone?: SvgTone;
  dashed?: boolean;
  arrow?: boolean;
  step: number;
}) {
  return (
    <path
      d={d}
      className={`diagram-link diagram-link-${tone} technology-svg-step${dashed ? " is-dashed" : ""}`}
      markerEnd={arrow ? `url(#${id}-arrow-${tone})` : undefined}
      style={stepStyle(step)}
    />
  );
}

function SvgLaneLabel({ x, y, children, tone = "ink" }: { x: number; y: number; children: ReactNode; tone?: SvgTone }) {
  return <text x={x} y={y} className={`diagram-lane-label diagram-text-${tone}`}>{children}</text>;
}

function DiagramSvg({
  id,
  kind,
  mobile,
  width,
  height,
  children,
}: {
  id: string;
  kind: TechnologyMotionKind;
  mobile: boolean;
  width: number;
  height: number;
  children: ReactNode;
}) {
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`technology-paper-svg ${mobile ? "technology-paper-svg-mobile" : "technology-paper-svg-desktop"}`}
      role="img"
      aria-labelledby={`${titleId} ${descriptionId}`}
    >
      <title id={titleId}>{diagramCopy[kind].title}</title>
      <desc id={descriptionId}>{diagramCopy[kind].description}</desc>
      <SvgDefs id={id} />
      <Paper filterId={id} width={width} height={height} />
      {children}
    </svg>
  );
}

function OverviewSvg({ mobile }: { mobile: boolean }) {
  const id = `technology-overview-${mobile ? "mobile" : "desktop"}`;

  if (mobile) {
    return (
      <DiagramSvg id={id} kind="overview" mobile width={360} height={930}>
        <SvgLaneLabel x={18} y={32}>INPUT</SvgLaneLabel>
        <SvgNode x={18} y={48} width={146} height={94} eyebrow="EVIDENCE INPUT" title={["의학 문헌", "진료지침"]} tone="blue" step={1} />
        <SvgNode x={196} y={48} width={146} height={94} eyebrow="WORK INPUT" title={["질문 · 파일", "업무 의도"]} tone="red" step={2} />
        <SvgConnector d="M 91 142 V 182" id={id} tone="blue" step={3} />
        <SvgConnector d="M 269 142 V 182" id={id} tone="red" step={3} />

        <SvgLaneLabel x={18} y={170}>FOUNDATION</SvgLaneLabel>
        <SvgNode x={18} y={186} width={146} height={96} eyebrow="IN PRODUCTION" title="AlphaEvidence" detail="source · change" tone="blue" step={4} />
        <SvgNode x={196} y={186} width={146} height={96} eyebrow="IN PRODUCTION" title={["Capability", "Registry"]} detail="boundary · contract" tone="red" step={5} />
        <SvgConnector d="M 91 282 V 306 H 180 V 334" id={id} tone="blue" step={6} />
        <SvgConnector d="M 269 282 V 306 H 180 V 334" id={id} tone="red" step={6} />

        <SvgLaneLabel x={42} y={322} tone="red">EXECUTION</SvgLaneLabel>
        <SvgNode x={42} y={338} width={276} height={90} eyebrow="IN PRODUCTION" title="AlphaDoc Engine" detail="registered execution" tone="red" step={7} />
        <SvgConnector d="M 180 428 V 470" id={id} tone="red" step={8} />

        <SvgLaneLabel x={28} y={458}>CONTROLLED OUTPUT</SvgLaneLabel>
        <SvgNode x={28} y={474} width={304} height={80} eyebrow="CONTROLLED WORKFLOWS" title="AlphaDocument" detail="render · translate · stop" tone="blue" step={9} />
        <SvgConnector d="M 180 554 V 582" id={id} tone="ink" step={10} />
        <SvgNode x={28} y={598} width={304} height={78} eyebrow="USER REVIEW" title="사용자 검토" detail="approve · revise · hold" tone="ink" step={11} />

        <SvgLaneLabel x={28} y={724} tone="blue">CONTROL &amp; TARGET</SvgLaneLabel>
        <SvgNode x={28} y={740} width={304} height={72} eyebrow="CURRENT SECURITY CONTROLS" title="인증 · 소유권 · 파일 무결성" detail="Engine · Document에 적용" tone="blue" dashed step={12} />
        <SvgConnector d="M 180 812 V 836" id={id} tone="muted" dashed step={13} />
        <SvgNode x={28} y={852} width={304} height={54} eyebrow="ARCHITECTURE IN DEVELOPMENT" title="AlphaLayer" tone="muted" dashed step={14} />
      </DiagramSvg>
    );
  }

  return (
    <DiagramSvg id={id} kind="overview" mobile={false} width={720} height={430}>
      <SvgLaneLabel x={20} y={32}>INPUT</SvgLaneLabel>
      <SvgLaneLabel x={198} y={32}>FOUNDATION</SvgLaneLabel>
      <SvgLaneLabel x={384} y={32} tone="red">EXECUTION</SvgLaneLabel>
      <SvgLaneLabel x={546} y={32}>CONTROLLED OUTPUT</SvgLaneLabel>
      <SvgNode x={20} y={50} width={140} height={86} eyebrow="EVIDENCE INPUT" title={["의학 문헌", "진료지침"]} tone="blue" step={1} />
      <SvgNode x={20} y={160} width={140} height={86} eyebrow="WORK INPUT" title={["질문 · 파일", "업무 의도"]} tone="red" step={2} />
      <SvgNode x={198} y={50} width={140} height={86} eyebrow="IN PRODUCTION" title="AlphaEvidence" detail="source · change" tone="blue" step={3} />
      <SvgNode x={198} y={160} width={140} height={86} eyebrow="IN PRODUCTION" title={["Capability", "Registry"]} detail="boundary · contract" tone="red" step={4} />
      <SvgNode x={384} y={105} width={140} height={106} eyebrow="IN PRODUCTION" title={["AlphaDoc", "Engine"]} detail="registered execution" tone="red" step={6} />
      <SvgNode x={546} y={50} width={154} height={86} eyebrow="CONTROLLED" title="AlphaDocument" detail="render · translate" tone="blue" step={8} />
      <SvgNode x={546} y={160} width={154} height={86} eyebrow="USER REVIEW" title="사용자 검토" detail="approve · revise" tone="ink" step={9} />
      <SvgConnector d="M 160 93 H 194" id={id} tone="blue" step={3} />
      <SvgConnector d="M 160 203 H 194" id={id} tone="red" step={4} />
      <SvgConnector d="M 338 93 H 360 Q 372 93 384 142" id={id} tone="blue" step={5} />
      <SvgConnector d="M 338 203 H 360 Q 372 203 384 174" id={id} tone="red" step={5} />
      <SvgConnector d="M 524 158 H 534 V 93 H 542" id={id} tone="red" step={7} />
      <SvgConnector d="M 623 136 V 156" id={id} tone="ink" step={9} />

      <SvgLaneLabel x={198} y={300} tone="blue">CONTROL &amp; TARGET</SvgLaneLabel>
      <SvgNode x={198} y={318} width={238} height={76} eyebrow="CURRENT SECURITY CONTROLS" title="인증 · 소유권 · 파일 무결성" detail="Engine · Document에 적용" tone="blue" dashed step={10} />
      <SvgConnector d="M 436 356 H 474" id={id} tone="muted" dashed step={11} />
      <SvgNode x={478} y={318} width={222} height={76} eyebrow="ARCHITECTURE IN DEVELOPMENT" title="AlphaLayer" detail="현재 통제의 목표 확장" tone="muted" dashed step={12} />
    </DiagramSvg>
  );
}

function EvidenceSvg({ mobile }: { mobile: boolean }) {
  const id = `technology-evidence-${mobile ? "mobile" : "desktop"}`;

  if (mobile) {
    return (
      <DiagramSvg id={id} kind="evidence" mobile width={360} height={1105}>
        <SvgLaneLabel x={28} y={32}>01 · ALLOW</SvgLaneLabel>
        <SvgNode x={28} y={48} width={304} height={70} eyebrow="BOUNDED SOURCE" title="허용된 의학 문헌 · 진료지침" tone="blue" step={1} />
        <SvgConnector d="M 180 118 V 130" id={id} tone="blue" step={2} />
        <SvgNode x={28} y={146} width={304} height={70} eyebrow="SOURCE REGISTRY" title="source · policy · scope" tone="blue" step={2} />
        <SvgConnector d="M 180 216 V 258" id={id} tone="blue" step={3} />

        <SvgLaneLabel x={28} y={246}>02 · INGEST</SvgLaneLabel>
        <SvgNode x={28} y={262} width={304} height={70} eyebrow="BOUNDED STREAMS" title="독립 stream · cursor · rate · retry" tone="red" step={3} />
        <SvgConnector d="M 180 332 V 344" id={id} tone="red" step={4} />
        <SvgNode x={28} y={360} width={304} height={76} eyebrow="SINGLE WRITE PATH" title="Single Ingestion Gateway" tone="red" step={4} />

        <SvgLaneLabel x={46} y={484}>03 · PRESERVE</SvgLaneLabel>
        <SvgConnector d="M 180 436 V 466 H 20 V 696" id={id} tone="blue" arrow={false} step={5} />
        <SvgNode x={46} y={500} width={286} height={62} eyebrow="IDENTITY" title="Canonical Evidence" detail="stable identity" tone="blue" step={5} />
        <SvgNode x={46} y={584} width={286} height={62} eyebrow="OBSERVATION" title="Source &amp; Change Observations" detail="immutable history" tone="blue" step={5} />
        <SvgNode x={46} y={668} width={286} height={62} eyebrow="RIGHTS" title="Rights Snapshot" detail="record-level decision" tone="blue" step={5} />
        <SvgConnector d="M 20 531 H 42" id={id} tone="blue" step={5} />
        <SvgConnector d="M 20 615 H 42" id={id} tone="blue" step={5} />
        <SvgConnector d="M 20 699 H 42" id={id} tone="blue" step={5} />
        <SvgConnector d="M 332 531 H 340 V 754" id={id} tone="blue" arrow={false} step={6} />
        <SvgConnector d="M 332 615 H 340" id={id} tone="blue" arrow={false} step={6} />
        <SvgConnector d="M 332 699 H 340" id={id} tone="blue" arrow={false} step={6} />

        <SvgLaneLabel x={46} y={782}>04 · QUALIFY</SvgLaneLabel>
        <SvgConnector d="M 340 754 H 180 V 786" id={id} tone="red" step={6} />
        <SvgNode x={46} y={802} width={286} height={82} eyebrow="QUALITY &amp; SOURCE HEALTH" title="availability · conflict · ingestion lag" tone="red" step={7} />
        <SvgConnector d="M 180 884 V 926" id={id} tone="red" step={8} />

        <SvgLaneLabel x={46} y={914}>05 · SERVE</SvgLaneLabel>
        <SvgNode x={46} y={930} width={286} height={72} eyebrow="VERSIONED CONTRACT" title="Versioned Retrieval Contract" tone="blue" step={9} />
        <SvgConnector d="M 180 1002 V 1018" id={id} tone="ink" step={10} />
        <SvgNode x={46} y={1034} width={286} height={48} eyebrow="DOWNSTREAM" title="AlphaDoc Engine" tone="ink" step={10} />
      </DiagramSvg>
    );
  }

  return (
    <DiagramSvg id={id} kind="evidence" mobile={false} width={800} height={300}>
      <SvgLaneLabel x={18} y={28}>01 · ALLOW</SvgLaneLabel>
      <SvgLaneLabel x={168} y={28}>02 · INGEST</SvgLaneLabel>
      <SvgLaneLabel x={326} y={28}>03 · PRESERVE</SvgLaneLabel>
      <SvgLaneLabel x={514} y={28}>04 · QUALIFY</SvgLaneLabel>
      <SvgLaneLabel x={662} y={28}>05 · SERVE</SvgLaneLabel>

      <SvgNode x={18} y={46} width={130} height={70} eyebrow="BOUNDED SOURCE" title={["의학 문헌", "진료지침"]} tone="blue" step={1} />
      <SvgNode x={18} y={136} width={130} height={70} eyebrow="SOURCE REGISTRY" title={["source · policy", "· scope"]} tone="blue" step={1} />
      <SvgConnector d="M 83 116 V 132" id={id} tone="blue" step={2} />

      <SvgNode x={168} y={46} width={135} height={70} eyebrow="BOUNDED STREAMS" title="독립 stream" detail="cursor · rate · retry" tone="red" step={3} />
      <SvgNode x={168} y={136} width={135} height={76} eyebrow="SINGLE WRITE PATH" title={["Ingestion", "Gateway"]} tone="red" step={3} />
      <SvgConnector d="M 148 171 H 158 V 81 H 164" id={id} tone="blue" step={3} />
      <SvgConnector d="M 235 116 V 132" id={id} tone="red" step={4} />

      <SvgNode x={326} y={38} width={170} height={62} eyebrow="IDENTITY" title="Canonical Evidence" detail="stable identity" tone="blue" step={5} />
      <SvgNode x={326} y={118} width={170} height={62} eyebrow="OBSERVATION" title={["Source & Change", "Observations"]} detail="immutable history" tone="blue" step={5} />
      <SvgNode x={326} y={198} width={170} height={62} eyebrow="RIGHTS" title="Rights Snapshot" detail="record-level decision" tone="blue" step={5} />
      <SvgConnector d="M 303 174 H 314 V 69 H 322" id={id} tone="blue" step={5} />
      <SvgConnector d="M 303 174 H 322" id={id} tone="blue" step={5} />
      <SvgConnector d="M 303 174 H 314 V 229 H 322" id={id} tone="blue" step={5} />

      <SvgNode x={514} y={103} width={130} height={88} eyebrow="QUALITY &amp; HEALTH" title={["Source health", "& quality"]} detail="lag · conflict" tone="red" step={7} />
      <SvgConnector d="M 496 69 H 504 V 147 H 510" id={id} tone="blue" step={6} />
      <SvgConnector d="M 496 149 H 510" id={id} tone="blue" step={6} />
      <SvgConnector d="M 496 229 H 504 V 147 H 510" id={id} tone="blue" step={6} />

      <SvgNode x={662} y={62} width={120} height={76} eyebrow="VERSIONED CONTRACT" title={["Retrieval", "Contract"]} tone="blue" step={9} />
      <SvgNode x={662} y={162} width={120} height={62} eyebrow="DOWNSTREAM" title={["AlphaDoc", "Engine"]} tone="ink" step={10} />
      <SvgConnector d="M 644 147 H 652 V 100 H 658" id={id} tone="red" step={8} />
      <SvgConnector d="M 722 138 V 158" id={id} tone="ink" step={10} />
    </DiagramSvg>
  );
}

function EngineSvg({ mobile }: { mobile: boolean }) {
  const id = `technology-engine-${mobile ? "mobile" : "desktop"}`;

  if (mobile) {
    return (
      <DiagramSvg id={id} kind="engine" mobile width={360} height={1220}>
        <SvgLaneLabel x={28} y={32}>01 · BOUNDARY</SvgLaneLabel>
        <SvgNode x={28} y={48} width={304} height={72} eyebrow="INPUT" title="질문 · 파일 · 업무 의도" tone="red" step={1} />
        <SvgConnector d="M 180 120 V 132" id={id} tone="red" step={2} />
        <SvgNode x={28} y={148} width={304} height={72} eyebrow="INPUT BOUNDARY" title="요청의 목적과 입력 경계 확인" tone="red" step={2} />
        <SvgConnector d="M 180 220 V 262" id={id} tone="red" step={3} />

        <SvgLaneLabel x={28} y={250}>02 · CONTRACT</SvgLaneLabel>
        <SvgNode x={28} y={266} width={304} height={72} eyebrow="CAPABILITY REGISTRY" title="등록된 capability 확인" tone="red" step={3} />
        <SvgConnector d="M 180 338 V 350" id={id} tone="red" step={4} />
        <SvgNode x={28} y={366} width={304} height={86} eyebrow="CAPABILITY CONTRACT" title="purpose · nature · source policy" detail="허용 입력 · 실행 방식 · 출력 경계" tone="red" step={4} />
        <SvgNode x={60} y={476} width={240} height={72} eyebrow="EVIDENCE CONTRACT" title="AlphaEvidence" detail="source-bound evidence" tone="blue" step={5} />
        <SvgConnector d="M 180 476 V 456" id={id} tone="blue" step={5} />

        <SvgLaneLabel x={48} y={584}>03 · EXECUTION NATURE</SvgLaneLabel>
        <SvgConnector d="M 28 409 H 20 V 844" id={id} tone="red" arrow={false} step={6} />
        <SvgNode x={48} y={600} width={284} height={56} eyebrow="PATH 01" title="Deterministic" tone="blue" step={6} />
        <SvgNode x={48} y={672} width={284} height={56} eyebrow="PATH 02" title="Source-bound Translation" tone="blue" step={6} />
        <SvgNode x={48} y={744} width={284} height={56} eyebrow="PATH 03" title="Evidence Search" tone="blue" step={6} />
        <SvgNode x={48} y={816} width={284} height={56} eyebrow="PATH 04" title="Bounded Generation" tone="red" step={6} />
        <SvgConnector d="M 20 628 H 44" id={id} tone="blue" step={6} />
        <SvgConnector d="M 20 700 H 44" id={id} tone="blue" step={6} />
        <SvgConnector d="M 20 772 H 44" id={id} tone="blue" step={6} />
        <SvgConnector d="M 20 844 H 44" id={id} tone="red" step={6} />
        <SvgConnector d="M 332 628 H 340 V 894" id={id} tone="ink" arrow={false} step={7} />
        <SvgConnector d="M 332 700 H 340" id={id} tone="ink" arrow={false} step={7} />
        <SvgConnector d="M 332 772 H 340" id={id} tone="ink" arrow={false} step={7} />
        <SvgConnector d="M 332 844 H 340" id={id} tone="ink" arrow={false} step={7} />

        <SvgLaneLabel x={28} y={918}>04 · OUTPUT</SvgLaneLabel>
        <SvgConnector d="M 340 894 H 180 V 934" id={id} tone="red" step={7} />
        <SvgNode x={28} y={938} width={304} height={78} eyebrow="GUARDRAILS &amp; OUTPUT CONTRACT" title="허용된 결과 경계" tone="red" step={8} />
        <SvgConnector d="M 180 1016 V 1028" id={id} tone="ink" step={9} />
        <SvgNode x={28} y={1044} width={304} height={64} eyebrow="RESULT" title="사용자 결과" tone="ink" step={9} />

        <SvgConnector d="M 332 409 H 348 V 1110 H 180 V 1122" id={id} tone="blue" dashed step={10} />
        <SvgNode x={48} y={1126} width={284} height={72} eyebrow="SIDECAR · RELEASE IDENTITY" title="Code · Behavior · Runtime" detail="실행 조건만 별도로 기록" tone="blue" dashed step={10} />
      </DiagramSvg>
    );
  }

  return (
    <DiagramSvg id={id} kind="engine" mobile={false} width={800} height={470}>
      <SvgLaneLabel x={18} y={28}>01 · BOUNDARY</SvgLaneLabel>
      <SvgLaneLabel x={190} y={28}>02 · CONTRACT</SvgLaneLabel>
      <SvgLaneLabel x={394} y={28}>03 · EXECUTION NATURE</SvgLaneLabel>
      <SvgLaneLabel x={632} y={28}>04 · OUTPUT</SvgLaneLabel>

      <SvgNode x={18} y={48} width={144} height={72} eyebrow="INPUT" title={["질문 · 파일", "업무 의도"]} tone="red" step={1} />
      <SvgNode x={18} y={138} width={144} height={72} eyebrow="INPUT BOUNDARY" title={["목적 · 입력", "경계 확인"]} tone="red" step={2} />
      <SvgConnector d="M 90 120 V 134" id={id} tone="red" step={2} />

      <SvgNode x={190} y={48} width={160} height={72} eyebrow="CAPABILITY REGISTRY" title="등록 capability" tone="red" step={3} />
      <SvgNode x={190} y={138} width={160} height={88} eyebrow="CAPABILITY CONTRACT" title={["purpose · nature", "source policy"]} detail="input · execution · output" tone="red" step={4} />
      <SvgNode x={190} y={248} width={160} height={72} eyebrow="EVIDENCE CONTRACT" title="AlphaEvidence" detail="source-bound evidence" tone="blue" step={5} />
      <SvgConnector d="M 162 174 H 176 V 84 H 186" id={id} tone="red" step={3} />
      <SvgConnector d="M 270 120 V 134" id={id} tone="red" step={4} />
      <SvgConnector d="M 270 248 V 230" id={id} tone="blue" step={5} />

      <SvgNode x={394} y={40} width={210} height={52} eyebrow="PATH 01" title="Deterministic" tone="blue" step={6} />
      <SvgNode x={394} y={106} width={210} height={52} eyebrow="PATH 02" title="Source-bound Translation" tone="blue" step={6} />
      <SvgNode x={394} y={172} width={210} height={52} eyebrow="PATH 03" title="Evidence Search" tone="blue" step={6} />
      <SvgNode x={394} y={238} width={210} height={52} eyebrow="PATH 04" title="Bounded Generation" tone="red" step={6} />
      <SvgConnector d="M 350 182 H 374 V 66 H 390" id={id} tone="blue" step={6} />
      <SvgConnector d="M 350 182 H 374 V 132 H 390" id={id} tone="blue" step={6} />
      <SvgConnector d="M 350 182 H 374 V 198 H 390" id={id} tone="blue" step={6} />
      <SvgConnector d="M 350 182 H 374 V 264 H 390" id={id} tone="red" step={6} />

      <SvgNode x={632} y={96} width={150} height={88} eyebrow="GUARDRAILS &amp; OUTPUT" title={["Output", "Contract"]} detail="bounded result" tone="red" step={8} />
      <SvgNode x={632} y={210} width={150} height={70} eyebrow="RESULT" title="사용자 결과" tone="ink" step={9} />
      <SvgConnector d="M 604 66 H 620 V 140 H 628" id={id} tone="blue" step={7} />
      <SvgConnector d="M 604 132 H 628" id={id} tone="blue" step={7} />
      <SvgConnector d="M 604 198 H 620 V 140 H 628" id={id} tone="blue" step={7} />
      <SvgConnector d="M 604 264 H 620 V 140 H 628" id={id} tone="red" step={7} />
      <SvgConnector d="M 707 184 V 206" id={id} tone="ink" step={9} />

      <SvgNode x={190} y={372} width={330} height={70} eyebrow="SIDECAR · RELEASE IDENTITY" title="Code · Behavior · Runtime" detail="Capability Contract의 실행 조건을 별도로 기록" tone="blue" dashed step={10} />
      <SvgConnector d="M 350 182 H 374 V 350 H 355 V 368" id={id} tone="blue" dashed step={10} />
    </DiagramSvg>
  );
}

function EvaluationSvg({ mobile }: { mobile: boolean }) {
  const id = `technology-evaluation-${mobile ? "mobile" : "desktop"}`;

  if (mobile) {
    return (
      <DiagramSvg id={id} kind="evaluation" mobile width={360} height={920}>
        <SvgNode x={48} y={30} width={264} height={72} eyebrow="CANDIDATE" title="Candidate Behavior Identity" detail="capability · corpus · scoring version" tone="red" step={1} />
        <SvgConnector d="M 180 102 V 132 H 20 V 550" id={id} tone="ink" arrow={false} step={2} />

        <SvgNode x={48} y={160} width={264} height={112} eyebrow="DETERMINISTIC · HARD GATE" title="Deterministic Checks" detail={["identity · citation · empty · canary", "hard failure는 평균으로 상쇄하지 않음"]} tone="red" step={3} />
        <SvgNode x={48} y={316} width={264} height={112} eyebrow="MODEL-ASSISTED · SUPPORT" title="Model-assisted Checks" detail={["supplementary evaluation", "단독 승인 근거로 사용하지 않음"]} tone="blue" dashed step={4} />
        <SvgNode x={48} y={472} width={264} height={112} eyebrow="USER REVIEW" title="User Review" detail={["groundedness · validity · usefulness", "의학적 판단은 사용자가 검토"]} tone="ink" step={5} />
        <SvgConnector d="M 20 216 H 44" id={id} tone="red" step={3} />
        <SvgConnector d="M 20 372 H 44" id={id} tone="blue" dashed step={4} />
        <SvgConnector d="M 20 528 H 44" id={id} tone="ink" step={5} />
        <SvgConnector d="M 312 216 H 340 V 610" id={id} tone="red" arrow={false} step={6} />
        <SvgConnector d="M 312 372 H 340" id={id} tone="blue" dashed arrow={false} step={6} />
        <SvgConnector d="M 312 528 H 340" id={id} tone="ink" arrow={false} step={6} />
        <SvgConnector d="M 340 610 H 180 V 636" id={id} tone="ink" step={6} />

        <SvgNode x={48} y={652} width={264} height={66} eyebrow="DECISION" title="Evaluation Decision" tone="ink" step={7} />
        <SvgConnector d="M 180 718 V 748 H 92 V 764" id={id} tone="blue" step={8} />
        <SvgConnector d="M 180 718 V 748 H 268 V 764" id={id} tone="red" step={8} />
        <SvgNode x={20} y={780} width={144} height={94} eyebrow="PASS" title={["Release", "Candidate"]} tone="blue" step={9} />
        <SvgNode x={196} y={780} width={144} height={94} eyebrow="FAIL / REVIEW" title={["Hold · investigate", "revise"]} tone="red" step={10} />
      </DiagramSvg>
    );
  }

  return (
    <DiagramSvg id={id} kind="evaluation" mobile={false} width={720} height={470}>
      <SvgNode x={250} y={26} width={220} height={72} eyebrow="CANDIDATE" title="Candidate Behavior Identity" detail="capability · corpus · scoring version" tone="red" step={1} />
      <SvgConnector d="M 360 98 V 126" id={id} tone="ink" step={2} />
      <SvgNode x={20} y={142} width={210} height={142} eyebrow="DETERMINISTIC · HARD GATE" title="Deterministic Checks" detail={["identity · citation · empty", "canary · prohibited claims"]} tone="red" step={3} />
      <SvgNode x={255} y={142} width={210} height={142} eyebrow="MODEL-ASSISTED · SUPPORT" title="Model-assisted Checks" detail={["supplementary evaluation", "단독 승인 근거 아님"]} tone="blue" dashed step={4} />
      <SvgNode x={490} y={142} width={210} height={142} eyebrow="USER REVIEW" title="User Review" detail={["groundedness · validity", "workflow usefulness"]} tone="ink" step={5} />
      <SvgConnector d="M 360 126 H 125 V 138" id={id} tone="red" step={3} />
      <SvgConnector d="M 360 126 V 138" id={id} tone="blue" dashed step={4} />
      <SvgConnector d="M 360 126 H 595 V 138" id={id} tone="ink" step={5} />
      <SvgConnector d="M 125 284 V 316 H 360" id={id} tone="red" step={6} />
      <SvgConnector d="M 360 284 V 316" id={id} tone="blue" dashed step={6} />
      <SvgConnector d="M 595 284 V 316 H 360" id={id} tone="ink" step={6} />
      <SvgNode x={250} y={326} width={220} height={66} eyebrow="DECISION" title="Evaluation Decision" tone="ink" step={7} />
      <SvgConnector d="M 360 392 V 396 H 160 V 400" id={id} tone="blue" step={8} />
      <SvgConnector d="M 360 392 V 396 H 560 V 400" id={id} tone="red" step={8} />
      <SvgNode x={72} y={404} width={176} height={60} eyebrow="PASS" title={["Release", "Candidate"]} tone="blue" step={9} />
      <SvgNode x={472} y={404} width={176} height={60} eyebrow="FAIL / REVIEW" title={["Hold · investigate", "revise"]} tone="red" step={10} />
    </DiagramSvg>
  );
}

function DocumentSvg({ mobile }: { mobile: boolean }) {
  const id = `technology-document-${mobile ? "mobile" : "desktop"}`;

  if (mobile) {
    return (
      <DiagramSvg id={id} kind="document" mobile width={360} height={1205}>
        <SvgLaneLabel x={28} y={32}>01 · DEFINE</SvgLaneLabel>
        <SvgNode x={28} y={48} width={304} height={70} eyebrow="DOCUMENT INTENT" title="문서 업무 의도" tone="red" step={1} />
        <SvgConnector d="M 180 118 V 130" id={id} tone="red" step={2} />
        <SvgNode x={28} y={146} width={304} height={70} eyebrow="REGISTERED WORKFLOW" title="등록된 문서 처리 경로" tone="red" step={2} />
        <SvgConnector d="M 180 216 V 258" id={id} tone="red" step={3} />

        <SvgLaneLabel x={28} y={246}>02 · VALIDATE</SvgLaneLabel>
        <SvgNode x={28} y={262} width={304} height={78} eyebrow="DOCUMENT CONTRACT" title="Template · Field Schema · Source Policy" tone="blue" step={3} />
        <SvgConnector d="M 180 340 V 352" id={id} tone="red" step={4} />
        <SvgNode x={28} y={368} width={304} height={78} eyebrow="REQUIRED-FIELD VALIDATION" title="필수 입력이 없으면 STOP" tone="red" step={4} />

        <SvgLaneLabel x={48} y={484}>03 · SELECTED WORKFLOW</SvgLaneLabel>
        <SvgConnector d="M 180 446 V 468 H 22 V 704" id={id} tone="ink" arrow={false} step={5} />
        <SvgNode x={48} y={500} width={284} height={64} eyebrow="PATH 01" title="한국어 공식 문서" detail="deterministic local render · no rewrite" tone="blue" step={5} />
        <SvgNode x={48} y={584} width={284} height={64} eyebrow="PATH 02" title="공식 문서 번역" detail="source-bound full translation" tone="blue" step={5} />
        <SvgNode x={48} y={668} width={284} height={64} eyebrow="PATH 03" title="업로드 문서 번역" detail="full or summary · explicit selection" tone="red" step={5} />
        <SvgConnector d="M 22 532 H 44" id={id} tone="blue" step={5} />
        <SvgConnector d="M 22 616 H 44" id={id} tone="blue" step={5} />
        <SvgConnector d="M 22 700 H 44" id={id} tone="red" step={5} />
        <SvgConnector d="M 332 532 H 340 V 752" id={id} tone="blue" arrow={false} step={6} />
        <SvgConnector d="M 332 616 H 340" id={id} tone="blue" arrow={false} step={6} />
        <SvgConnector d="M 332 700 H 340" id={id} tone="red" arrow={false} step={6} />

        <SvgLaneLabel x={28} y={782}>04 · BIND</SvgLaneLabel>
        <SvgConnector d="M 340 752 H 180 V 786" id={id} tone="blue" step={6} />
        <SvgNode x={28} y={802} width={304} height={72} eyebrow="SOURCE-BOUND TRANSFORMATION" title="원문 경계를 유지한 변환" tone="blue" step={7} />
        <SvgConnector d="M 180 874 V 886" id={id} tone="red" step={8} />
        <SvgNode x={28} y={902} width={304} height={72} eyebrow="OUTPUT CONTRACT" title="추론 보완 · fail-open 차단" tone="red" step={8} />
        <SvgConnector d="M 180 974 V 1016" id={id} tone="ink" step={9} />

        <SvgLaneLabel x={28} y={1004}>05 · REVIEW</SvgLaneLabel>
        <SvgNode x={28} y={1020} width={304} height={64} eyebrow="USER REVIEW" title="사용자 검토" tone="ink" step={9} />

        <SvgNode x={28} y={1112} width={304} height={70} eyebrow="CURRENT SECURITY CONTROLS" title="auth · ownership · quarantine · SHA-256" detail="검증과 업로드 처리 전에 확인" tone="blue" dashed step={10} />
        <SvgConnector d="M 28 1147 H 16 V 301 H 24" id={id} tone="blue" dashed step={10} />
      </DiagramSvg>
    );
  }

  return (
    <DiagramSvg id={id} kind="document" mobile={false} width={800} height={430}>
      <SvgLaneLabel x={18} y={28}>01 · DEFINE</SvgLaneLabel>
      <SvgLaneLabel x={168} y={28}>02 · VALIDATE</SvgLaneLabel>
      <SvgLaneLabel x={328} y={28}>03 · SELECTED WORKFLOW</SvgLaneLabel>
      <SvgLaneLabel x={548} y={28}>04 · BIND</SvgLaneLabel>
      <SvgLaneLabel x={690} y={28}>05 · REVIEW</SvgLaneLabel>

      <SvgNode x={18} y={46} width={130} height={70} eyebrow="DOCUMENT INTENT" title="문서 업무 의도" tone="red" step={1} />
      <SvgNode x={18} y={136} width={130} height={70} eyebrow="REGISTERED FLOW" title={["등록된 문서", "처리 경로"]} tone="red" step={2} />
      <SvgConnector d="M 83 116 V 132" id={id} tone="red" step={2} />

      <SvgNode x={168} y={46} width={140} height={78} eyebrow="DOCUMENT CONTRACT" title={["Template · Field", "Schema · Policy"]} tone="blue" step={3} />
      <SvgNode x={168} y={144} width={140} height={78} eyebrow="REQUIRED FIELDS" title={["필수 입력 없으면", "STOP"]} tone="red" step={4} />
      <SvgConnector d="M 148 171 H 158 V 85 H 164" id={id} tone="red" step={3} />
      <SvgConnector d="M 238 124 V 140" id={id} tone="red" step={4} />

      <SvgNode x={328} y={38} width={196} height={62} eyebrow="PATH 01" title="한국어 공식 문서" detail="local render · no model rewrite" tone="blue" step={5} />
      <SvgNode x={328} y={118} width={196} height={62} eyebrow="PATH 02" title="공식 문서 번역" detail="source-bound full translation" tone="blue" step={5} />
      <SvgNode x={328} y={198} width={196} height={62} eyebrow="PATH 03" title="업로드 문서 번역" detail="full / summary · explicit selection" tone="red" step={5} />
      <SvgConnector d="M 308 183 H 318 V 69 H 324" id={id} tone="blue" step={5} />
      <SvgConnector d="M 308 183 H 316 V 149 H 324" id={id} tone="blue" step={5} />
      <SvgConnector d="M 308 183 H 318 V 229 H 324" id={id} tone="red" step={5} />

      <SvgNode x={548} y={72} width={124} height={76} eyebrow="SOURCE-BOUND" title={["Controlled", "Transformation"]} tone="blue" step={7} />
      <SvgNode x={548} y={172} width={124} height={76} eyebrow="OUTPUT CONTRACT" title={["no inference", "no fail-open"]} tone="red" step={8} />
      <SvgConnector d="M 524 69 H 538 V 110 H 544" id={id} tone="blue" step={6} />
      <SvgConnector d="M 524 149 H 544" id={id} tone="blue" step={6} />
      <SvgConnector d="M 524 229 H 538 V 110 H 544" id={id} tone="red" step={6} />
      <SvgConnector d="M 610 148 V 168" id={id} tone="red" step={8} />

      <SvgNode x={690} y={110} width={92} height={92} eyebrow="USER" title={["사용자", "검토"]} tone="ink" step={9} />
      <SvgConnector d="M 672 210 H 680 V 156 H 686" id={id} tone="ink" step={9} />

      <SvgNode x={168} y={330} width={504} height={68} eyebrow="CURRENT SECURITY CONTROLS" title="Authentication · Ownership · Quarantine · SHA-256" detail="필수 필드 검증과 업로드 처리 전에 확인" tone="blue" dashed step={10} />
      <SvgConnector d="M 238 330 V 304 H 238 V 226" id={id} tone="blue" dashed step={10} />
      <SvgConnector d="M 510 330 V 302 H 426 V 264" id={id} tone="blue" dashed step={10} />
    </DiagramSvg>
  );
}

const layerTargetSteps = [
  ["Korean Medical-context", "PHI / PII Classification"],
  "Purpose-aware Minimization",
  "Reversible Tokenization",
  "External Processing with Tokens",
  "Response Token Integrity",
  "Authorized Rehydration",
  "사용자에게 허용된 결과",
] as const;

function LayerSvg({ mobile }: { mobile: boolean }) {
  const id = `technology-layer-${mobile ? "mobile" : "desktop"}`;

  if (mobile) {
    return (
      <DiagramSvg id={id} kind="layer" mobile width={360} height={1100}>
        <SvgLaneLabel x={28} y={30} tone="blue">RUNNING TODAY · SOLID</SvgLaneLabel>
        <SvgNode x={28} y={46} width={304} height={72} eyebrow="01 · ACCESS" title="인증된 요청 · 소유권 확인 파일" tone="red" step={1} />
        <SvgConnector d="M 180 118 V 130" id={id} tone="blue" step={2} />
        <SvgNode x={28} y={146} width={304} height={72} eyebrow="02 · CONTROL" title="Current Security Controls" detail="quarantine · integrity · minimum audit" tone="blue" step={3} />
        <SvgConnector d="M 180 218 V 230" id={id} tone="blue" step={4} />
        <SvgNode x={28} y={246} width={304} height={72} eyebrow="03 · BOUNDARY" title="Authorized Processing Boundary" detail="provider restrictions · fail closed" tone="red" step={5} />
        <SvgConnector d="M 180 318 V 334 H 340 V 400 H 336" id={id} tone="muted" dashed step={6} />

        <SvgLaneLabel x={28} y={350} tone="muted">ARCHITECTURE IN DEVELOPMENT · DASHED</SvgLaneLabel>
        <SvgNode x={28} y={366} width={304} height={68} eyebrow="TARGET 01" title={layerTargetSteps[0]} tone="muted" dashed step={6} />
        <SvgConnector d="M 180 434 V 446" id={id} tone="muted" dashed step={7} />
        <SvgNode x={28} y={462} width={304} height={64} eyebrow="TARGET 02" title={layerTargetSteps[1]} tone="muted" dashed step={7} />
        <SvgConnector d="M 180 526 V 538" id={id} tone="muted" dashed step={8} />
        <SvgNode x={28} y={554} width={304} height={64} eyebrow="TARGET 03" title={layerTargetSteps[2]} tone="muted" dashed step={8} />

        <SvgNode x={52} y={638} width={256} height={66} eyebrow="ISOLATED TOKEN VAULT" title="mapping 분리" detail="권한 확인 후 rehydration" tone="blue" dashed step={9} />
        <SvgConnector d="M 180 618 V 634" id={id} tone="blue" dashed step={9} />
        <SvgConnector d="M 332 586 H 340 V 706 H 180 V 734" id={id} tone="muted" dashed step={9} />

        <SvgNode x={28} y={738} width={304} height={64} eyebrow="TARGET 04" title={layerTargetSteps[3]} tone="muted" dashed step={10} />
        <SvgConnector d="M 180 802 V 814" id={id} tone="muted" dashed step={11} />
        <SvgNode x={28} y={830} width={304} height={64} eyebrow="TARGET 05" title={layerTargetSteps[4]} tone="muted" dashed step={11} />
        <SvgConnector d="M 180 894 V 906" id={id} tone="muted" dashed step={12} />
        <SvgNode x={28} y={922} width={304} height={64} eyebrow="TARGET 06" title={layerTargetSteps[5]} tone="muted" dashed step={12} />
        <SvgConnector d="M 52 671 H 16 V 954 H 24" id={id} tone="blue" dashed step={12} />
        <SvgConnector d="M 180 986 V 998" id={id} tone="muted" dashed step={13} />
        <SvgNode x={28} y={1014} width={304} height={64} eyebrow="TARGET 07 · RESULT" title={layerTargetSteps[6]} tone="muted" dashed step={13} />
      </DiagramSvg>
    );
  }

  return (
    <DiagramSvg id={id} kind="layer" mobile={false} width={800} height={700}>
      <SvgLaneLabel x={18} y={30} tone="blue">RUNNING TODAY · SOLID</SvgLaneLabel>
      <SvgNode x={18} y={48} width={226} height={84} eyebrow="01 · ACCESS" title={["인증된 요청", "소유권 확인 파일"]} tone="red" step={1} />
      <SvgNode x={287} y={48} width={226} height={84} eyebrow="02 · CONTROL" title="Current Security Controls" detail="quarantine · integrity · minimum audit" tone="blue" step={3} />
      <SvgNode x={556} y={48} width={226} height={84} eyebrow="03 · BOUNDARY" title={["Authorized Processing", "Boundary"]} detail="provider restrictions · fail closed" tone="red" step={5} />
      <SvgConnector d="M 244 90 H 283" id={id} tone="blue" step={2} />
      <SvgConnector d="M 513 90 H 552" id={id} tone="blue" step={4} />
      <SvgConnector d="M 669 132 V 166 H 790 V 236 H 786" id={id} tone="muted" dashed step={6} />

      <SvgLaneLabel x={420} y={188} tone="muted">ARCHITECTURE IN DEVELOPMENT · DASHED</SvgLaneLabel>
      {layerTargetSteps.map((title, index) => {
        const y = 204 + (index * 70);
        const nodeHeight = index === 0 ? 64 : 56;
        return (
          <g key={typeof title === "string" ? title : title.join("-")}>
            <SvgNode x={420} y={y} width={362} height={nodeHeight} eyebrow={`TARGET ${String(index + 1).padStart(2, "0")}`} title={title} tone="muted" dashed step={index + 6} />
            {index < layerTargetSteps.length - 1 && (
              <SvgConnector d={`M 601 ${y + nodeHeight} V ${y + 66}`} id={id} tone="muted" dashed step={index + 7} />
            )}
          </g>
        );
      })}

      <SvgNode x={40} y={422} width={300} height={88} eyebrow="ISOLATED TOKEN VAULT" title="Token mapping 분리" detail="외부 처리 경로와 분리 · 권한 확인 후 rehydration" tone="blue" dashed step={10} />
      <SvgConnector d="M 420 360 H 380 V 466 H 344" id={id} tone="blue" dashed step={10} />
      <SvgConnector d="M 340 466 H 380 V 586 H 416" id={id} tone="blue" dashed step={12} />
    </DiagramSvg>
  );
}

function DiagramPair({ kind }: { kind: TechnologyMotionKind }) {
  if (kind === "overview") return <><OverviewSvg mobile={false} /><OverviewSvg mobile /></>;
  if (kind === "evidence") return <><EvidenceSvg mobile={false} /><EvidenceSvg mobile /></>;
  if (kind === "engine") return <><EngineSvg mobile={false} /><EngineSvg mobile /></>;
  if (kind === "evaluation") return <><EvaluationSvg mobile={false} /><EvaluationSvg mobile /></>;
  if (kind === "document") return <><DocumentSvg mobile={false} /><DocumentSvg mobile /></>;
  return <><LayerSvg mobile={false} /><LayerSvg mobile /></>;
}

export function TechnologyMotion({ kind }: { kind: TechnologyMotionKind }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) return;

    root.classList.add("is-enhanced");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        root.classList.add("is-active");
        observer.disconnect();
      },
      { threshold: 0.14, rootMargin: "0px 0px -8%" },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className={`technology-raw-diagram technology-raw-diagram-${kind}`}>
      <DiagramPair kind={kind} />
    </div>
  );
}
