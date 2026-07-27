import type { CSSProperties, ReactNode } from "react";
import { ViewportMotion } from "@/app/components/ViewportMotion";
import type { Language } from "@/app/site-content";

export type TechnologyMotionKind = "overview" | "evidence" | "engine" | "document" | "image" | "layer" | "seal";
type DiagramTone = "ink" | "blue" | "red" | "muted";
type DiagramLines = string | readonly string[];

const diagramCopy = {
  ko: {
    overview: {
      title: "바이오레 기술 시스템 맵",
      description: "AlphaEvidence, AlphaDocument, AlphaImage, AlphaLayer와 Alphadoc의 구현·통합·운영 상태를 구분하면서 근거, 문서·이미지 아티팩트, 실행, 검토와 무결성 기록을 연결합니다.",
    },
    evidence: {
      title: "AlphaEvidence 근거 계보 구조",
      description: "공개 근거가 출처 식별, 정규화, 변화 이력, 권리 맥락과 품질 관찰을 거쳐 검토 가능한 Evidence Packet과 Retrieval Contract로 구성됩니다.",
    },
    engine: {
      title: "AlphaDoc Engine 기능 단위 구조",
      description: "의료 업무의 의도와 제약을 조립하고 여러 기능 단위(capability)와 평가 게이트, 의료인의 검토와 수정 흐름을 비직렬 구조로 연결합니다.",
    },
    document: {
      title: "AlphaDocument 디지털 아티팩트 구조",
      description: "디지털 문서를 블록, 의미 앵커, 스키마와 출처 연결로 분해하고 검증한 뒤 재사용 가능한 문서 아티팩트로 조립합니다.",
    },
    image: {
      title: "AlphaImage 이미지 아티팩트 구조",
      description: "허용된 정적 이미지의 표현과 좌표를 정규화하고 원본, 기존 주석, 변환 계보와 무결성을 재사용 가능한 Image Artifact에 연결합니다.",
    },
    layer: {
      title: "AlphaLayer 보호 실행 경계",
      description: "선택된 보호 텍스트 경로에서 목적과 요청 조건, 정보 최소화, 정책 변환, 응답 무결성과 원문 없는 최소 실행 기록을 하나의 경계로 연결합니다.",
    },
    seal: {
      title: "AlphaSeal 대화 봉인 구조",
      description: "대화별 키를 참여자 신원 키로 봉인해 두 사람의 기기에서만 열리게 하고, 서버에는 읽을 수 없는 암호문과 최소 전달 정보만 남깁니다. 사용자만 가진 키로 봉인 백업해 기기 이전 시 지난 대화를 복원합니다.",
    },
  },
  en: {
    overview: {
      title: "Viore technology system map",
      description: "AlphaEvidence, AlphaDocument, AlphaImage, AlphaLayer, and Alphadoc preserve distinct implementation, integration, and operating states while exchanging evidence, document and image artifacts, execution, review, and integrity records.",
    },
    evidence: {
      title: "AlphaEvidence provenance architecture",
      description: "Public evidence is organized through source identity, normalization, version history, rights context, and quality observation into reviewable Evidence Packets and Retrieval Contracts.",
    },
    engine: {
      title: "AlphaDoc Engine capability architecture",
      description: "Medical intent and constraints are assembled across a non-linear capability fabric, evaluation gates, professional review, and revision loops.",
    },
    document: {
      title: "AlphaDocument digital artifact architecture",
      description: "Digital documents are decomposed into blocks, semantic anchors, schema, and provenance links, then validated and assembled into reusable artifacts.",
    },
    image: {
      title: "AlphaImage image artifact architecture",
      description: "Supported static images are normalized into consistent representations and coordinates, then bound to their source, existing annotations, transformation lineage, and integrity in a reusable Image Artifact.",
    },
    layer: {
      title: "AlphaLayer protected execution boundary",
      description: "On selected protected text paths, purpose and request conditions, minimization, policy transformation, response integrity, and a source-free minimal execution record remain connected through one boundary.",
    },
    seal: {
      title: "AlphaSeal sealed-conversation structure",
      description: "Each conversation key is sealed to the participants' identity keys so it opens only on the two devices, leaving the server ciphertext and minimal delivery data. A backup sealed under a user-held key restores past conversations on a new device.",
    },
  },
} as const;

function pick(language: Language, ko: string, en: string) {
  return language === "ko" ? ko : en;
}

function stepStyle(step: number): CSSProperties {
  return { "--svg-step": step } as CSSProperties;
}

function asLines(value: DiagramLines) {
  return typeof value === "string" ? [value] : value;
}

function DiagramDefs({ id }: { id: string }) {
  return (
    <defs>
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
      <DiagramDefs id={id} />
      <rect width={width} height={height} rx={mobile ? 10 : 12} className="diagram-paper" />
      {children}
    </svg>
  );
}

function Boundary({
  x,
  y,
  width,
  height,
  label,
  tone = "ink",
  step,
  solid = false,
  emphasized = false,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  tone?: DiagramTone;
  step: number;
  solid?: boolean;
  emphasized?: boolean;
}) {
  return (
    <g className="technology-svg-step" style={stepStyle(step)}>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="9"
        className={[
          "diagram-boundary",
          `diagram-boundary-${tone}`,
          solid ? "is-solid" : "",
          emphasized ? "is-emphasized" : "",
        ].filter(Boolean).join(" ")}
      />
      <text x={x + 13} y={y + 20} className={`diagram-domain-label diagram-text-${tone}`}>
        {label}
      </text>
    </g>
  );
}

function PlateModule({
  x,
  y,
  width,
  height,
  label,
  tone = "ink",
  step,
  center = false,
  dashed = false,
  strong = false,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  label: DiagramLines;
  tone?: DiagramTone;
  step: number;
  center?: boolean;
  dashed?: boolean;
  strong?: boolean;
}) {
  const lines = asLines(label);
  const textX = center ? x + width / 2 : x + 10;
  const textY = y + height / 2 - ((lines.length - 1) * 7);

  return (
    <g className="technology-svg-step" style={stepStyle(step)}>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="4"
        className={[
          "diagram-module",
          `diagram-module-${tone}`,
          dashed ? "is-dashed" : "",
          strong ? "is-strong" : "",
        ].filter(Boolean).join(" ")}
      />
      <text
        x={textX}
        y={textY}
        textAnchor={center ? "middle" : "start"}
        dominantBaseline="middle"
        className={`diagram-module-label ${strong ? "is-strong" : ""}`}
      >
        {lines.map((line, index) => (
          <tspan x={textX} dy={index === 0 ? 0 : 14} key={`${line}-${index}`}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

function StackPanel({
  x,
  y,
  width,
  height,
  title,
  rows,
  tone = "ink",
  step,
  tokens = 0,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  rows: readonly DiagramLines[];
  tone?: DiagramTone;
  step: number;
  tokens?: number;
}) {
  const headerHeight = 30;
  const tokenHeight = tokens > 0 ? 25 : 0;
  const contentHeight = height - headerHeight - tokenHeight;
  const rowHeight = contentHeight / rows.length;

  return (
    <g className="technology-svg-step" style={stepStyle(step)}>
      <rect x={x} y={y} width={width} height={height} rx="5" className={`diagram-panel diagram-panel-${tone}`} />
      <text x={x + 11} y={y + 19} className={`diagram-panel-title diagram-text-${tone}`}>{title}</text>
      <line x1={x} y1={y + headerHeight} x2={x + width} y2={y + headerHeight} className="diagram-panel-rule" />
      {rows.map((row, index) => {
        const lines = asLines(row);
        const rowTop = y + headerHeight + rowHeight * index;
        const rowCenter = rowTop + rowHeight / 2 - ((lines.length - 1) * 6);
        return (
          <g key={`${title}-${index}`}>
            {index > 0 && (
              <line x1={x + 8} y1={rowTop} x2={x + width - 8} y2={rowTop} className="diagram-panel-rule is-light" />
            )}
            <text x={x + 11} y={rowCenter} dominantBaseline="middle" className="diagram-panel-row">
              {lines.map((line, lineIndex) => (
                <tspan x={x + 11} dy={lineIndex === 0 ? 0 : 12} key={`${line}-${lineIndex}`}>{line}</tspan>
              ))}
            </text>
          </g>
        );
      })}
      {tokens > 0 && (
        <>
          <line x1={x} y1={y + height - tokenHeight} x2={x + width} y2={y + height - tokenHeight} className="diagram-panel-rule" />
          <TokenStrip x={x + 11} y={y + height - 17} count={tokens} tone={tone} step={step} size={8} gap={4} />
        </>
      )}
    </g>
  );
}

function TokenStrip({
  x,
  y,
  count,
  tone,
  step,
  size = 9,
  gap = 4,
  hollowEvery = 0,
}: {
  x: number;
  y: number;
  count: number;
  tone: DiagramTone;
  step: number;
  size?: number;
  gap?: number;
  hollowEvery?: number;
}) {
  return (
    <g className="technology-svg-step" style={stepStyle(step)}>
      {Array.from({ length: count }, (_, index) => (
        <rect
          key={index}
          x={x + index * (size + gap)}
          y={y}
          width={size}
          height={size}
          rx="1"
          className={`diagram-token diagram-token-${tone} ${hollowEvery > 0 && (index + 1) % hollowEvery === 0 ? "is-hollow" : ""}`}
        />
      ))}
    </g>
  );
}

function Link({
  d,
  id,
  tone = "ink",
  step,
  arrow = true,
  dashed = false,
  startArrow = false,
}: {
  d: string;
  id: string;
  tone?: DiagramTone;
  step: number;
  arrow?: boolean;
  dashed?: boolean;
  startArrow?: boolean;
}) {
  return (
    <path
      d={d}
      className={`diagram-link diagram-link-${tone} technology-svg-step ${dashed ? "is-dashed" : ""}`}
      markerEnd={arrow ? `url(#${id}-arrow-${tone})` : undefined}
      markerStart={startArrow ? `url(#${id}-arrow-${tone})` : undefined}
      style={stepStyle(step)}
    />
  );
}

function MicroLabel({
  x,
  y,
  children,
  tone = "muted",
  anchor = "start",
  step,
}: {
  x: number;
  y: number;
  children: ReactNode;
  tone?: DiagramTone;
  anchor?: "start" | "middle" | "end";
  step: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className={`diagram-micro-label diagram-text-${tone} technology-svg-step`}
      style={stepStyle(step)}
    >
      {children}
    </text>
  );
}

function ArtifactChain({
  id,
  language,
  y,
  mobile = false,
}: {
  id: string;
  language: Language;
  y: number;
  mobile?: boolean;
}) {
  const items = [
    "Evidence Packet",
    pick(language, "검토 상태", "Review State"),
    "Typed Artifacts",
    "Citation Map",
    "Integrity Record",
  ];

  if (mobile) {
    return (
      <g>
        <MicroLabel x={24} y={y} tone="ink" step={13}>ARTIFACT LINEAGE</MicroLabel>
        {items.map((item, index) => {
          const column = index % 2;
          const row = Math.floor(index / 2);
          const x = 24 + column * 186;
          const boxY = y + 14 + row * 42;
          return (
            <g key={item}>
              <PlateModule x={x} y={boxY} width={164} height={28} label={item} tone={index % 2 === 0 ? "blue" : "red"} step={14 + index} />
              {index < items.length - 1 && (
                <Link
                  d={column === 0
                    ? `M ${x + 164} ${boxY + 14} H ${x + 181}`
                    : `M ${x + 82} ${boxY + 28} V ${boxY + 38} H 106 V ${boxY + 42}`}
                  id={id}
                  tone="muted"
                  step={14 + index}
                  dashed={index === 1}
                />
              )}
            </g>
          );
        })}
      </g>
    );
  }

  const xPositions = [118, 276, 434, 592, 750];
  return (
    <g>
      <MicroLabel x={28} y={y + 18} tone="ink" step={13}>ARTIFACT LINEAGE</MicroLabel>
      {items.map((item, index) => (
        <g key={item}>
          <PlateModule
            x={xPositions[index]}
            y={y}
            width={132}
            height={32}
            label={item}
            tone={index % 2 === 0 ? "blue" : "red"}
            step={14 + index}
            center
          />
          {index < items.length - 1 && (
            <Link
              d={`M ${xPositions[index] + 132} ${y + 16} H ${xPositions[index + 1] - 8}`}
              id={id}
              tone="muted"
              step={14 + index}
              dashed={index === 1}
            />
          )}
        </g>
      ))}
    </g>
  );
}

function OverviewSvg({ language, mobile }: { language: Language; mobile: boolean }) {
  const id = `technology-overview-${language}-${mobile ? "mobile" : "desktop"}`;

  if (mobile) {
    return (
      <DiagramSvg id={id} kind="overview" language={language} mobile width={420} height={990}>
        <Boundary x={20} y={24} width={180} height={190} label="ALPHAEVIDENCE" tone="blue" step={1} solid />
        <StackPanel
          x={34}
          y={54}
          width={152}
          height={140}
          title="EVIDENCE FOUNDATION"
          rows={["Source Identity", "Version / Change", "Rights Context", "Quality"]}
          tone="blue"
          step={2}
          tokens={6}
        />
        <Boundary x={220} y={24} width={180} height={190} label="ARTIFACT COMPILERS" tone="blue" step={1} solid />
        <PlateModule x={234} y={60} width={152} height={50} label={["AlphaDocument", "Document Artifact"]} tone="blue" step={3} />
        <PlateModule x={234} y={126} width={152} height={50} label={["AlphaImage", "Image Artifact"]} tone="blue" step={3} />
        <TokenStrip x={274} y={190} count={6} tone="blue" step={3} size={7} gap={3} />

        <Boundary x={24} y={248} width={372} height={298} label="ALPHADOC ENGINE" tone="red" step={4} emphasized />
        <MicroLabel x={210} y={285} anchor="middle" tone="red" step={5}>
          INTENT + CONSTRAINT ASSEMBLY
        </MicroLabel>
        <PlateModule x={48} y={302} width={100} height={34} label="Intent" tone="red" step={5} center />
        <PlateModule x={160} y={302} width={100} height={34} label="Constraints" tone="red" step={5} center />
        <PlateModule x={272} y={302} width={100} height={34} label="Context" tone="red" step={5} center />
        <Boundary x={46} y={356} width={328} height={142} label="CAPABILITY FABRIC" tone="ink" step={6} />
        <PlateModule x={64} y={390} width={88} height={34} label={["Evidence", "Retrieval"]} tone="blue" step={7} center />
        <PlateModule x={166} y={378} width={88} height={34} label={["Reasoning", "Synthesis"]} tone="red" step={7} center strong />
        <PlateModule x={268} y={390} width={88} height={34} label={["Artifact", "Assembly"]} tone="blue" step={7} center />
        <PlateModule x={115} y={444} width={88} height={34} label={["Citation", "Binding"]} tone="ink" step={8} center />
        <PlateModule x={217} y={444} width={88} height={34} label={["Quality", "Check"]} tone="ink" step={8} center />
        <Link d="M 152 407 L 166 395" id={id} tone="blue" step={9} />
        <Link d="M 254 395 L 268 407" id={id} tone="red" step={9} />
        <Link d="M 190 412 L 172 444" id={id} tone="ink" step={9} />
        <Link d="M 230 412 L 248 444" id={id} tone="ink" step={9} />
        <TokenStrip x={155} y={518} count={8} tone="red" step={10} />

        <Boundary x={20} y={584} width={180} height={208} label="ALPHALAYER" tone="red" step={10} solid />
        <StackPanel
          x={34}
          y={616}
          width={152}
          height={154}
          title="PROTECTED EXECUTION"
          rows={["Registered Path", "Minimization", "Integrity", "Minimal Record"]}
          tone="red"
          step={11}
          tokens={6}
        />
        <Boundary x={220} y={584} width={180} height={208} label="ALPHADOC" tone="blue" step={10} solid />
        <StackPanel
          x={234}
          y={616}
          width={152}
          height={154}
          title="AI MEDICAL WORKSPACE"
          rows={["Workspace Apps", pick(language, "의료인의 검토", "Human Review"), "Permissions", "Records / UI"]}
          tone="blue"
          step={12}
          tokens={6}
        />

        <Link d="M 110 214 V 236 H 168 V 248" id={id} tone="blue" step={5} />
        <Link d="M 310 214 V 236 H 252 V 248" id={id} tone="blue" step={5} />
        <Link d="M 142 546 V 570 H 110 V 584" id={id} tone="red" step={11} />
        <Link d="M 278 546 V 570 H 310 V 584" id={id} tone="blue" step={12} />
        <Link d="M 200 688 H 220" id={id} tone="red" step={12} dashed startArrow />

        <MicroLabel x={210} y={812} anchor="middle" tone="muted" step={13}>
          {pick(language, "새로운 기술이 같은 연결 원칙 위에 더해집니다", "NEW TECHNOLOGIES EXTEND THE SAME SYSTEM")}
        </MicroLabel>
        <ArtifactChain id={id} language={language} y={840} mobile />
      </DiagramSvg>
    );
  }

  return (
    <DiagramSvg id={id} kind="overview" language={language} mobile={false} width={960} height={610}>
      <Boundary x={26} y={34} width={224} height={220} label="ALPHAEVIDENCE" tone="blue" step={1} solid />
      <StackPanel
        x={42}
        y={67}
        width={192}
        height={165}
        title="EVIDENCE FOUNDATION"
        rows={["Source Identity", "Version / Change", "Rights Context", "Quality Observation"]}
        tone="blue"
        step={2}
        tokens={8}
      />

      <Boundary x={288} y={72} width={384} height={326} label="ALPHADOC ENGINE" tone="red" step={2} emphasized />
      <MicroLabel x={480} y={111} anchor="middle" tone="red" step={3}>INTENT + CONSTRAINT ASSEMBLY</MicroLabel>
      <PlateModule x={316} y={127} width={98} height={34} label="Intent" tone="red" step={3} center />
      <PlateModule x={431} y={127} width={98} height={34} label="Constraints" tone="red" step={3} center />
      <PlateModule x={546} y={127} width={98} height={34} label="Context" tone="red" step={3} center />
      <Boundary x={314} y={180} width={332} height={164} label="CAPABILITY FABRIC" tone="ink" step={4} />
      <PlateModule x={332} y={216} width={88} height={38} label={["Evidence", "Retrieval"]} tone="blue" step={5} center />
      <PlateModule x={436} y={204} width={88} height={38} label={["Reasoning", "Synthesis"]} tone="red" step={5} center strong />
      <PlateModule x={540} y={216} width={88} height={38} label={["Artifact", "Assembly"]} tone="blue" step={5} center />
      <PlateModule x={384} y={286} width={88} height={38} label={["Citation", "Binding"]} tone="ink" step={6} center />
      <PlateModule x={488} y={286} width={88} height={38} label={["Quality", "Check"]} tone="ink" step={6} center />
      <Link d="M 420 235 L 436 223" id={id} tone="blue" step={7} />
      <Link d="M 524 223 L 540 235" id={id} tone="red" step={7} />
      <Link d="M 460 242 L 440 286" id={id} tone="ink" step={7} />
      <Link d="M 500 242 L 520 286" id={id} tone="ink" step={7} />
      <Link d="M 420 235 C 455 265 505 265 540 235" id={id} tone="muted" step={7} dashed />
      <TokenStrip x={424} y={366} count={9} tone="red" step={8} />

      <Boundary x={710} y={34} width={224} height={220} label="ARTIFACT COMPILERS" tone="blue" step={1} solid />
      <PlateModule x={726} y={75} width={192} height={60} label={["AlphaDocument", "Document Artifact"]} tone="blue" step={3} />
      <PlateModule x={726} y={157} width={192} height={60} label={["AlphaImage", "Image Artifact"]} tone="blue" step={3} />
      <TokenStrip x={789} y={232} count={8} tone="blue" step={3} size={7} gap={3} />

      <Boundary x={62} y={318} width={230} height={208} label="ALPHALAYER" tone="red" step={8} solid />
      <StackPanel
        x={78}
        y={351}
        width={198}
        height={152}
        title="PROTECTED EXECUTION"
        rows={["Registered Path", "Minimization", "Response Integrity", "Minimal Record"]}
        tone="red"
        step={9}
        tokens={8}
      />
      <Boundary x={668} y={318} width={230} height={208} label="ALPHADOC" tone="blue" step={8} solid />
      <StackPanel
        x={684}
        y={351}
        width={198}
        height={152}
        title="AI MEDICAL WORKSPACE"
        rows={["Workspace Apps", pick(language, "사용자 검토", "User Review"), "User Permissions", "Records / UI"]}
        tone="blue"
        step={10}
        tokens={8}
      />

      <Boundary
        x={346}
        y={424}
        width={268}
        height={102}
        label={pick(language, "사용자 검토와 판단", "USER REVIEW CONTROL")}
        tone="ink"
        step={9}
      />
      <PlateModule x={365} y={462} width={72} height={30} label="REVIEW" tone="blue" step={10} center />
      <PlateModule x={444} y={462} width={72} height={30} label="DECIDE" tone="ink" step={10} center />
      <PlateModule x={523} y={462} width={72} height={30} label="REVISE" tone="red" step={10} center />

      <Link d="M 250 142 H 272 V 224 H 288" id={id} tone="blue" step={4} />
      <Link d="M 710 142 H 688 V 224 H 672" id={id} tone="blue" step={4} startArrow />
      <Link d="M 365 398 V 424" id={id} tone="red" step={9} />
      <Link d="M 595 398 V 424" id={id} tone="ink" step={9} />
      <Link d="M 314 336 C 312 366 308 394 292 410" id={id} tone="red" step={9} dashed />
      <Link d="M 646 336 C 648 366 652 394 668 410" id={id} tone="blue" step={10} dashed />
      <Link d="M 292 422 H 346" id={id} tone="ink" step={10} />
      <Link d="M 614 475 H 668" id={id} tone="ink" step={10} />
      <Link d="M 292 500 C 374 545 586 545 668 500" id={id} tone="red" step={11} dashed startArrow />

      <MicroLabel x={480} y={544} anchor="middle" tone="muted" step={12}>
        {pick(language, "새로운 기술이 같은 연결 원칙 위에 더해집니다", "NEW TECHNOLOGIES EXTEND THE SAME SYSTEM")}
      </MicroLabel>
      <ArtifactChain id={id} language={language} y={562} />
    </DiagramSvg>
  );
}

function EvidenceSvg({ language, mobile }: { language: Language; mobile: boolean }) {
  const id = `technology-evidence-${language}-${mobile ? "mobile" : "desktop"}`;
  const sourceRows = [
    pick(language, "의학 문헌", "Medical Literature"),
    pick(language, "진료지침", "Clinical Guidelines"),
    pick(language, "규제 공지", "Regulatory Notices"),
    pick(language, "공개 데이터", "Open Data"),
  ];

  if (mobile) {
    return (
      <DiagramSvg id={id} kind="evidence" language={language} mobile width={420} height={900}>
        <Boundary x={22} y={24} width={376} height={150} label="SOURCE CLASSES" tone="ink" step={1} />
        {sourceRows.map((source, index) => (
          <PlateModule
            key={source}
            x={38 + (index % 2) * 174}
            y={58 + Math.floor(index / 2) * 48}
            width={158}
            height={34}
            label={source}
            tone={index < 2 ? "blue" : "ink"}
            step={2 + index}
          />
        ))}
        <TokenStrip x={149} y={153} count={9} tone="blue" step={5} />

        <Boundary x={22} y={210} width={376} height={454} label="ALPHAEVIDENCE FOUNDATION" tone="blue" step={6} emphasized />
        <PlateModule x={42} y={250} width={152} height={42} label="Source Identity" tone="blue" step={7} center />
        <PlateModule x={226} y={250} width={152} height={42} label="Normalization" tone="blue" step={7} center />
        <PlateModule x={42} y={326} width={152} height={94} label="Version / Change Graph" tone="ink" step={8} center />
        <circle cx="72" cy="380" r="4" className="diagram-version-node diagram-version-node-blue" />
        <circle cx="112" cy="360" r="4" className="diagram-version-node" />
        <circle cx="112" cy="400" r="4" className="diagram-version-node diagram-version-node-muted" />
        <circle cx="162" cy="380" r="4" className="diagram-version-node diagram-version-node-blue" />
        <Link d="M 76 380 H 96 L 108 362" id={id} tone="blue" step={9} arrow={false} />
        <Link d="M 96 380 L 108 398" id={id} tone="muted" step={9} arrow={false} />
        <Link d="M 116 360 L 158 380" id={id} tone="ink" step={9} arrow={false} />
        <Link d="M 116 400 L 158 380" id={id} tone="ink" step={9} arrow={false} />
        <PlateModule x={226} y={326} width={152} height={42} label="Rights Context" tone="red" step={8} center />
        <PlateModule x={226} y={378} width={152} height={42} label="Quality Observation" tone="red" step={8} center />
        <Link d="M 194 271 H 226" id={id} tone="blue" step={9} startArrow />
        <Link d="M 118 292 V 326" id={id} tone="ink" step={9} />
        <Link d="M 302 292 V 326" id={id} tone="red" step={9} />
        <Link d="M 194 373 H 226" id={id} tone="muted" step={9} />

        <Boundary x={42} y={448} width={336} height={184} label="TYPED EVIDENCE OUTPUTS" tone="ink" step={10} solid />
        <StackPanel
          x={58}
          y={484}
          width={144}
          height={124}
          title="EVIDENCE PACKET"
          rows={["Normalized Entities", "Citations", "Version Graph"]}
          tone="blue"
          step={11}
          tokens={7}
        />
        <StackPanel
          x={218}
          y={484}
          width={144}
          height={124}
          title="RETRIEVAL CONTRACT"
          rows={["Query Intent", "Filters / Scope", "Access / Use"]}
          tone="blue"
          step={11}
          tokens={7}
        />

        <Link d="M 210 174 V 210" id={id} tone="blue" step={6} />
        <Link d="M 118 420 V 448" id={id} tone="ink" step={10} />
        <Link d="M 302 420 V 448" id={id} tone="red" step={10} />

        <Boundary x={22} y={704} width={376} height={164} label="PROVENANCE CONTRACT" tone="ink" step={12} />
        <PlateModule x={42} y={744} width={154} height={36} label="Citation Map" tone="blue" step={13} />
        <PlateModule x={224} y={744} width={154} height={36} label="Review Anchor" tone="ink" step={13} />
        <PlateModule x={42} y={798} width={154} height={36} label="Retrieval Identity" tone="red" step={14} />
        <PlateModule x={224} y={798} width={154} height={36} label="Evidence Packet" tone="blue" step={14} />
        <Link d="M 130 632 V 680 H 210 V 704" id={id} tone="blue" step={12} />
        <Link d="M 290 632 V 680 H 210" id={id} tone="red" step={12} />
      </DiagramSvg>
    );
  }

  return (
    <DiagramSvg id={id} kind="evidence" language={language} mobile={false} width={960} height={560}>
      <Boundary x={24} y={46} width={190} height={424} label="SOURCE CLASSES" tone="ink" step={1} />
      <StackPanel
        x={40}
        y={82}
        width={158}
        height={344}
        title="PUBLIC EVIDENCE"
        rows={sourceRows}
        tone="ink"
        step={2}
        tokens={8}
      />

      <Boundary x={250} y={30} width={424} height={472} label="ALPHAEVIDENCE FOUNDATION" tone="blue" step={3} emphasized />
      <PlateModule x={274} y={72} width={170} height={54} label="Source Identity" tone="blue" step={4} />
      <PlateModule x={478} y={72} width={170} height={54} label="Normalization" tone="blue" step={4} />
      <TokenStrip x={326} y={136} count={7} tone="blue" step={5} size={7} gap={3} />
      <TokenStrip x={530} y={136} count={7} tone="blue" step={5} size={7} gap={3} />

      <Boundary x={274} y={154} width={374} height={152} label="VERSION / CHANGE GRAPH" tone="ink" step={6} solid />
      <circle cx="304" cy="230" r="5" className="diagram-version-node diagram-version-node-blue technology-svg-step" style={stepStyle(7)} />
      <circle cx="368" cy="204" r="5" className="diagram-version-node technology-svg-step" style={stepStyle(7)} />
      <circle cx="368" cy="256" r="5" className="diagram-version-node diagram-version-node-muted technology-svg-step" style={stepStyle(7)} />
      <circle cx="450" cy="230" r="5" className="diagram-version-node diagram-version-node-blue technology-svg-step" style={stepStyle(7)} />
      <circle cx="526" cy="194" r="5" className="diagram-version-node technology-svg-step" style={stepStyle(7)} />
      <circle cx="526" cy="266" r="5" className="diagram-version-node diagram-version-node-muted technology-svg-step" style={stepStyle(7)} />
      <circle cx="612" cy="230" r="5" className="diagram-version-node diagram-version-node-blue technology-svg-step" style={stepStyle(7)} />
      <Link d="M 309 230 H 338 L 363 206" id={id} tone="blue" step={7} arrow={false} />
      <Link d="M 338 230 L 363 254" id={id} tone="muted" step={7} arrow={false} />
      <Link d="M 373 204 L 445 228" id={id} tone="ink" step={7} arrow={false} />
      <Link d="M 373 256 L 445 232" id={id} tone="ink" step={7} arrow={false} />
      <Link d="M 455 230 H 486 L 521 196" id={id} tone="blue" step={7} arrow={false} />
      <Link d="M 486 230 L 521 264" id={id} tone="muted" step={7} arrow={false} />
      <Link d="M 531 194 L 607 228" id={id} tone="ink" step={7} arrow={false} />
      <Link d="M 531 266 L 607 232" id={id} tone="ink" step={7} arrow={false} />
      <MicroLabel x={304} y={278} tone="blue" step={7}>BASE</MicroLabel>
      <MicroLabel x={450} y={278} anchor="middle" tone="ink" step={7}>BRANCH</MicroLabel>
      <MicroLabel x={612} y={278} anchor="end" tone="blue" step={7}>CURRENT</MicroLabel>

      <PlateModule x={274} y={330} width={178} height={66} label={["Rights Context", "License · Scope · Use"]} tone="red" step={8} />
      <PlateModule x={470} y={330} width={178} height={66} label={["Quality Observation", "Freshness · Consistency"]} tone="red" step={8} />
      <PlateModule x={274} y={416} width={374} height={58} label="Evidence Packet Assembly" tone="blue" step={9} center strong />
      <TokenStrip x={418} y={481} count={10} tone="blue" step={9} size={7} gap={3} hollowEvery={5} />

      <Link d="M 214 148 H 238 V 99 H 250" id={id} tone="ink" step={4} />
      <Link d="M 214 258 H 232 V 230 H 250" id={id} tone="blue" step={6} />
      <Link d="M 214 368 H 238 V 363 H 250" id={id} tone="red" step={8} />
      <Link d="M 359 126 V 154" id={id} tone="blue" step={6} />
      <Link d="M 563 126 V 154" id={id} tone="blue" step={6} />
      <Link d="M 374 306 V 330" id={id} tone="ink" step={8} />
      <Link d="M 548 306 V 330" id={id} tone="muted" step={8} />
      <Link d="M 363 396 V 416" id={id} tone="red" step={9} />
      <Link d="M 559 396 V 416" id={id} tone="red" step={9} />

      <Boundary x={714} y={64} width={220} height={406} label="RETRIEVAL CONTRACT" tone="blue" step={9} solid />
      <StackPanel
        x={732}
        y={104}
        width={184}
        height={180}
        title="EVIDENCE PACKET"
        rows={["Normalized Entities", "Assertions", "Citations", "Version Graph"]}
        tone="blue"
        step={10}
        tokens={8}
      />
      <StackPanel
        x={732}
        y={306}
        width={184}
        height={138}
        title="QUERY CONTRACT"
        rows={["Intent / Constraints", "Scope / Time", "Access / Use"]}
        tone="blue"
        step={11}
        tokens={8}
      />
      <Link d="M 648 222 H 694 V 194 H 714" id={id} tone="blue" step={10} />
      <Link d="M 648 445 H 688 V 375 H 714" id={id} tone="blue" step={11} />
      <Link d="M 714 262 H 694 V 350 H 648" id={id} tone="muted" step={11} dashed />

      <MicroLabel x={24} y={530} tone="muted" step={12}>
        SOURCE IDENTITY · VERSION LINEAGE · RIGHTS CONTEXT · QUALITY OBSERVATION
      </MicroLabel>
      <TokenStrip x={776} y={519} count={12} tone="blue" step={12} size={8} gap={4} hollowEvery={6} />
    </DiagramSvg>
  );
}

function EngineSvg({ language, mobile }: { language: Language; mobile: boolean }) {
  const id = `technology-engine-${language}-${mobile ? "mobile" : "desktop"}`;
  const inputRows = [
    pick(language, "의료 업무 의도", "Medical Intent"),
    pick(language, "임상 맥락", "Clinical Context"),
    "Evidence Packet",
    ["Document Artifact", "Image Artifact"],
  ];

  if (mobile) {
    return (
      <DiagramSvg id={id} kind="engine" language={language} mobile width={420} height={1030}>
        <Boundary x={22} y={24} width={376} height={166} label="CONTEXT INPUTS" tone="ink" step={1} />
        {inputRows.map((row, index) => (
          <PlateModule
            key={asLines(row).join("-")}
            x={38 + (index % 2) * 174}
            y={60 + Math.floor(index / 2) * 48}
            width={158}
            height={34}
            label={row}
            tone={index >= 2 ? "blue" : "ink"}
            step={2 + index}
          />
        ))}
        <TokenStrip x={149} y={169} count={9} tone="blue" step={5} />

        <Boundary x={22} y={222} width={376} height={526} label="ALPHADOC ENGINE" tone="red" step={6} emphasized />
        <Boundary x={40} y={258} width={340} height={118} label="INTENT + CONSTRAINT ASSEMBLY" tone="red" step={7} />
        <PlateModule x={56} y={296} width={96} height={44} label={["Intent", "Parsing"]} tone="red" step={8} center />
        <PlateModule x={162} y={296} width={96} height={44} label={["Constraint", "Mapping"]} tone="red" step={8} center />
        <PlateModule x={268} y={296} width={96} height={44} label={["Scope", "Definition"]} tone="red" step={8} center />
        <TokenStrip x={155} y={354} count={8} tone="red" step={8} />

        <Boundary x={40} y={398} width={340} height={214} label="CAPABILITY FABRIC" tone="ink" step={9} solid />
        <PlateModule x={56} y={430} width={86} height={36} label={["Evidence", "Retrieval"]} tone="blue" step={10} center />
        <PlateModule x={167} y={430} width={86} height={36} label={["Knowledge", "Grounding"]} tone="blue" step={10} center />
        <PlateModule x={278} y={430} width={86} height={36} label={["Terminology", "Mapping"]} tone="blue" step={10} center />
        <PlateModule x={56} y={486} width={86} height={36} label={["Logic", "Evaluation"]} tone="ink" step={11} center />
        <PlateModule x={167} y={486} width={86} height={36} label={["Reasoning", "Synthesis"]} tone="red" step={11} center strong />
        <PlateModule x={278} y={486} width={86} height={36} label={["Conflict", "Detection"]} tone="ink" step={11} center />
        <PlateModule x={56} y={542} width={86} height={36} label={["Citation", "Binding"]} tone="ink" step={12} center />
        <PlateModule x={167} y={542} width={86} height={36} label={["Explanation", "Assembly"]} tone="ink" step={12} center />
        <PlateModule x={278} y={542} width={86} height={36} label={["Quality", "Check"]} tone="ink" step={12} center />
        <Link d="M 99 466 V 486" id={id} tone="blue" step={12} />
        <Link d="M 142 448 L 167 504" id={id} tone="blue" step={12} />
        <Link d="M 188 466 L 142 486" id={id} tone="ink" step={12} />
        <Link d="M 210 466 V 486" id={id} tone="red" step={12} />
        <Link d="M 232 466 L 278 486" id={id} tone="ink" step={12} />
        <Link d="M 278 448 L 253 504" id={id} tone="blue" step={12} />
        <Link d="M 321 466 V 486" id={id} tone="blue" step={12} />
        <Link d="M 99 522 V 542" id={id} tone="ink" step={12} />
        <Link d="M 142 504 L 167 560" id={id} tone="ink" step={12} />
        <Link d="M 188 522 L 142 542" id={id} tone="red" step={12} />
        <Link d="M 210 522 V 542" id={id} tone="red" step={12} />
        <Link d="M 232 522 L 278 542" id={id} tone="red" step={12} />
        <Link d="M 278 504 L 253 560" id={id} tone="ink" step={12} />
        <Link d="M 321 522 V 542" id={id} tone="ink" step={12} />
        <Link d="M 142 560 C 190 524 230 524 278 560" id={id} tone="muted" step={12} dashed />

        <Boundary x={40} y={634} width={340} height={88} label="EVALUATION GATES" tone="red" step={13} />
        {["Source-bound", "Complete", "Consistent", "Traceable"].map((label, index) => (
          <PlateModule
            key={label}
            x={52 + index * 80}
            y={672}
            width={72}
            height={28}
            label={label}
            tone={index % 2 === 0 ? "blue" : "ink"}
            step={14}
            center
          />
        ))}

        <Boundary x={22} y={786} width={176} height={210} label="PROFESSIONAL REVIEW" tone="blue" step={15} />
        <PlateModule x={40} y={830} width={140} height={34} label="REVIEW_REQUIRED" tone="blue" step={16} center strong />
        <PlateModule x={40} y={876} width={140} height={34} label="CLINICIAN DECISION" tone="blue" step={16} center />
        <PlateModule x={40} y={922} width={140} height={34} label="REVISION LOOP" tone="red" step={16} center />

        <Boundary x={220} y={786} width={178} height={210} label="TYPED OUTPUTS" tone="red" step={15} />
        <PlateModule x={238} y={830} width={142} height={34} label="Answer Artifact" tone="red" step={16} />
        <PlateModule x={238} y={876} width={142} height={34} label="Evidence Pack" tone="blue" step={16} />
        <PlateModule x={238} y={922} width={142} height={34} label="Release Identity" tone="ink" step={16} />

        <Link d="M 210 190 V 222" id={id} tone="red" step={6} />
        <Link d="M 210 376 V 398" id={id} tone="red" step={9} />
        <Link d="M 210 612 V 634" id={id} tone="ink" step={13} />
        <Link d="M 210 722 V 766 H 110 V 786" id={id} tone="blue" step={15} />
        <Link d="M 210 766 H 309 V 786" id={id} tone="red" step={15} />
        <Link d="M 110 956 V 1010 H 14 V 504 H 40" id={id} tone="ink" step={17} dashed />
        <MicroLabel x={26} y={1020} tone="ink" step={17}>REVISE / RETRY LOOP</MicroLabel>
      </DiagramSvg>
    );
  }

  return (
    <DiagramSvg id={id} kind="engine" language={language} mobile={false} width={960} height={600}>
      <Boundary x={20} y={54} width={174} height={416} label="CONTEXT INPUTS" tone="ink" step={1} />
      <StackPanel
        x={36}
        y={92}
        width={142}
        height={330}
        title="PURPOSE + CONTEXT"
        rows={inputRows}
        tone="ink"
        step={2}
        tokens={8}
      />

      <Boundary x={226} y={30} width={500} height={496} label="ALPHADOC ENGINE" tone="red" step={3} emphasized />
      <Boundary x={246} y={66} width={460} height={112} label="INTENT + CONSTRAINT ASSEMBLY" tone="red" step={4} />
      <PlateModule x={264} y={104} width={126} height={42} label="Intent Parsing" tone="red" step={5} center />
      <PlateModule x={414} y={104} width={126} height={42} label="Constraint Mapping" tone="red" step={5} center />
      <PlateModule x={564} y={104} width={126} height={42} label="Scope Definition" tone="red" step={5} center />
      <TokenStrip x={426} y={158} count={9} tone="red" step={5} />

      <Boundary x={246} y={198} width={460} height={210} label="CAPABILITY FABRIC" tone="ink" step={6} solid />
      <PlateModule x={266} y={230} width={104} height={38} label={["Evidence", "Retrieval"]} tone="blue" step={7} center />
      <PlateModule x={426} y={230} width={104} height={38} label={["Knowledge", "Grounding"]} tone="blue" step={7} center />
      <PlateModule x={582} y={230} width={104} height={38} label={["Terminology", "Mapping"]} tone="blue" step={7} center />
      <PlateModule x={266} y={286} width={104} height={38} label={["Logic", "Evaluation"]} tone="ink" step={8} center />
      <PlateModule x={426} y={286} width={104} height={38} label={["Reasoning", "Synthesis"]} tone="red" step={8} center strong />
      <PlateModule x={582} y={286} width={104} height={38} label={["Conflict", "Detection"]} tone="ink" step={8} center />
      <PlateModule x={266} y={342} width={104} height={38} label={["Citation", "Binding"]} tone="ink" step={8} center />
      <PlateModule x={426} y={342} width={104} height={38} label={["Explanation", "Assembly"]} tone="ink" step={8} center />
      <PlateModule x={582} y={342} width={104} height={38} label={["Quality", "Check"]} tone="ink" step={8} center />
      <Link d="M 318 268 V 286" id={id} tone="blue" step={9} />
      <Link d="M 370 249 L 426 305" id={id} tone="blue" step={9} />
      <Link d="M 452 268 L 370 286" id={id} tone="ink" step={9} />
      <Link d="M 478 268 V 286" id={id} tone="red" step={9} />
      <Link d="M 504 268 L 582 286" id={id} tone="ink" step={9} />
      <Link d="M 582 249 L 530 305" id={id} tone="blue" step={9} />
      <Link d="M 634 268 V 286" id={id} tone="blue" step={9} />
      <Link d="M 318 324 V 342" id={id} tone="ink" step={9} />
      <Link d="M 370 305 L 426 361" id={id} tone="ink" step={9} />
      <Link d="M 452 324 L 370 342" id={id} tone="red" step={9} />
      <Link d="M 478 324 V 342" id={id} tone="red" step={9} />
      <Link d="M 504 324 L 582 342" id={id} tone="red" step={9} />
      <Link d="M 582 305 L 530 361" id={id} tone="ink" step={9} />
      <Link d="M 634 324 V 342" id={id} tone="ink" step={9} />
      <Link d="M 370 361 C 430 326 522 326 582 361" id={id} tone="muted" step={9} dashed />

      <Boundary x={246} y={430} width={460} height={72} label="EVALUATION GATES" tone="red" step={10} />
      {["Source-bound", "Completeness", "Consistency", "Traceability", "Safety"].map((label, index) => (
        <PlateModule
          key={label}
          x={258 + index * 88}
          y={462}
          width={78}
          height={26}
          label={label}
          tone={index === 0 ? "blue" : index === 4 ? "red" : "ink"}
          step={11}
          center
        />
      ))}

      <Boundary x={758} y={54} width={182} height={216} label="PROFESSIONAL REVIEW" tone="blue" step={10} />
      <PlateModule x={776} y={96} width={146} height={34} label="REVIEW_REQUIRED" tone="blue" step={11} center strong />
      <PlateModule x={776} y={142} width={146} height={34} label="CLINICIAN DECISION" tone="blue" step={11} center />
      <PlateModule x={776} y={188} width={146} height={34} label="REVISION LOOP" tone="red" step={11} center />
      <PlateModule x={776} y={234} width={146} height={24} label="DECISION TRACE" tone="muted" step={11} center />

      <Boundary x={758} y={294} width={182} height={232} label="TYPED OUTPUTS" tone="red" step={12} />
      <StackPanel
        x={776}
        y={334}
        width={146}
        height={168}
        title="ARTIFACTS"
        rows={["Answer Artifact", "Document Artifact", "Evidence Pack", "Release Identity"]}
        tone="red"
        step={13}
        tokens={8}
      />

      <Link d="M 194 260 H 226" id={id} tone="red" step={3} />
      <Link d="M 476 178 V 198" id={id} tone="red" step={6} />
      <Link d="M 476 408 V 430" id={id} tone="ink" step={10} />
      <Link d="M 706 466 H 734 V 162 H 758" id={id} tone="blue" step={11} />
      <Link d="M 849 270 V 294" id={id} tone="red" step={12} />
      <Link d="M 776 205 H 744 V 554 H 208 V 390 H 226" id={id} tone="ink" step={14} dashed />
      <MicroLabel x={480} y={574} anchor="middle" tone="ink" step={14}>REVISE / RETRY LOOP</MicroLabel>
      <TokenStrip x={424} y={548} count={9} tone="red" step={14} />
    </DiagramSvg>
  );
}

function DocumentViewport({
  x,
  y,
  width,
  height,
  step,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  step: number;
}) {
  return (
    <g className="technology-svg-step" style={stepStyle(step)}>
      <rect x={x + 7} y={y + 7} width={width} height={height} rx="4" className="diagram-document-shadow" />
      <rect x={x} y={y} width={width} height={height} rx="4" className="diagram-document-page" />
      <rect x={x + 15} y={y + 17} width={width * .58} height="7" className="diagram-document-heading" />
      <rect x={x + 15} y={y + 36} width={width * .76} height="3" className="diagram-document-line" />
      <rect x={x + 15} y={y + 45} width={width * .52} height="3" className="diagram-document-line" />
      <rect x={x + 15} y={y + 65} width={width * .43} height={height * .22} className="diagram-document-figure" />
      <path
        d={`M ${x + 21} ${y + 65 + height * .16} L ${x + 34} ${y + 65 + height * .1} L ${x + 46} ${y + 65 + height * .14} L ${x + 62} ${y + 65 + height * .05} L ${x + 75} ${y + 65 + height * .1}`}
        className="diagram-document-chart"
      />
      <rect x={x + width * .56} y={y + 65} width={width * .3} height="3" className="diagram-document-line" />
      <rect x={x + width * .56} y={y + 76} width={width * .34} height="3" className="diagram-document-line" />
      <rect x={x + width * .56} y={y + 87} width={width * .26} height="3" className="diagram-document-line" />
      {Array.from({ length: 7 }, (_, index) => (
        <rect
          key={index}
          x={x + 15}
          y={y + height * .53 + index * 10}
          width={width * (.72 - (index % 3) * .08)}
          height="3"
          className="diagram-document-line"
        />
      ))}
    </g>
  );
}

function DocumentSvg({ language, mobile }: { language: Language; mobile: boolean }) {
  const id = `technology-document-${language}-${mobile ? "mobile" : "desktop"}`;

  if (mobile) {
    return (
      <DiagramSvg id={id} kind="document" language={language} mobile width={420} height={980}>
        <Boundary x={22} y={24} width={376} height={210} label="DIGITAL DOCUMENT INPUT" tone="ink" step={1} />
        <DocumentViewport x={42} y={58} width={136} height={148} step={2} />
        <MicroLabel x={282} y={78} anchor="middle" tone="ink" step={2}>PDF · DOCX · HWP · CSV</MicroLabel>
        <PlateModule x={210} y={98} width={144} height={34} label="Original Structure" tone="blue" step={3} />
        <PlateModule x={210} y={144} width={144} height={34} label="Source Locations" tone="blue" step={3} />
        <TokenStrip x={223} y={194} count={9} tone="blue" step={3} />

        <Boundary x={22} y={270} width={376} height={486} label="ALPHADOCUMENT" tone="blue" step={4} emphasized />
        <Boundary x={40} y={306} width={340} height={136} label="STRUCTURAL DECOMPOSITION" tone="ink" step={5} />
        <PlateModule x={54} y={344} width={92} height={44} label={["Block", "Tokens"]} tone="blue" step={6} center />
        <PlateModule x={164} y={344} width={92} height={44} label={["Semantic", "Anchors"]} tone="blue" step={6} center />
        <PlateModule x={274} y={344} width={92} height={44} label={["Schema", "Nodes"]} tone="blue" step={6} center />
        <TokenStrip x={67} y={408} count={7} tone="blue" step={7} size={7} gap={3} />
        <circle cx="210" cy="408" r="4" className="diagram-version-node diagram-version-node-blue" />
        <circle cx="190" cy="422" r="3" className="diagram-version-node" />
        <circle cx="230" cy="422" r="3" className="diagram-version-node" />
        <Link d="M 207 411 L 193 420" id={id} tone="blue" step={7} arrow={false} />
        <Link d="M 213 411 L 227 420" id={id} tone="blue" step={7} arrow={false} />
        <TokenStrip x={286} y={408} count={7} tone="blue" step={7} size={7} gap={3} hollowEvery={4} />

        <Boundary x={40} y={464} width={340} height={142} label="PROVENANCE + VALIDATION" tone="red" step={8} />
        <PlateModule x={54} y={502} width={140} height={36} label="Provenance Links" tone="blue" step={9} />
        <PlateModule x={226} y={502} width={140} height={36} label="Citation Binding" tone="blue" step={9} />
        <PlateModule x={54} y={550} width={96} height={30} label="Structure" tone="ink" step={10} center />
        <PlateModule x={162} y={550} width={96} height={30} label="Consistency" tone="ink" step={10} center />
        <PlateModule x={270} y={550} width={96} height={30} label="Traceability" tone="red" step={10} center />

        <Boundary x={40} y={628} width={340} height={102} label="RENDER + ASSEMBLY" tone="blue" step={11} solid />
        <PlateModule x={58} y={668} width={142} height={36} label="Template Assembly" tone="blue" step={12} />
        <PlateModule x={220} y={668} width={142} height={36} label="Artifact Identity" tone="red" step={12} />

        <Link d="M 210 234 V 270" id={id} tone="blue" step={4} />
        <Link d="M 146 366 H 164" id={id} tone="blue" step={7} />
        <Link d="M 256 366 H 274" id={id} tone="blue" step={7} />
        <Link d="M 210 442 V 464" id={id} tone="red" step={8} />
        <Link d="M 210 606 V 628" id={id} tone="ink" step={11} />

        <Boundary x={22} y={792} width={376} height={156} label="DERIVATIVE ARTIFACTS" tone="red" step={13} />
        <PlateModule x={40} y={830} width={158} height={34} label="Structured Document" tone="red" step={14} />
        <PlateModule x={222} y={830} width={158} height={34} label="Citation Map" tone="blue" step={14} />
        <PlateModule x={40} y={878} width={158} height={34} label="Validation Report" tone="ink" step={15} />
        <PlateModule x={222} y={878} width={158} height={34} label="Integrity Record" tone="red" step={15} />
        <Link d="M 210 756 V 776 H 119 V 792" id={id} tone="red" step={13} />
        <Link d="M 210 776 H 301 V 792" id={id} tone="blue" step={13} />
      </DiagramSvg>
    );
  }

  return (
    <DiagramSvg id={id} kind="document" language={language} mobile={false} width={960} height={590}>
      <Boundary x={22} y={82} width={188} height={390} label="DIGITAL DOCUMENTS" tone="ink" step={1} />
      <DocumentViewport x={42} y={122} width={146} height={228} step={2} />
      <MicroLabel x={115} y={382} anchor="middle" tone="ink" step={3}>PDF · DOCX · HWP · CSV</MicroLabel>
      <TokenStrip x={65} y={416} count={8} tone="blue" step={3} />

      <Boundary x={244} y={30} width={488} height={500} label="ALPHADOCUMENT" tone="blue" step={4} emphasized />
      <Boundary x={264} y={68} width={448} height={158} label="STRUCTURAL DECOMPOSITION" tone="ink" step={5} />
      <PlateModule x={284} y={108} width={122} height={48} label={["Block Tokens", "Structural Units"]} tone="blue" step={6} center />
      <PlateModule x={427} y={108} width={122} height={48} label={["Semantic Anchors", "Meaning + Entities"]} tone="blue" step={6} center />
      <PlateModule x={570} y={108} width={122} height={48} label={["Schema Nodes", "Typed Structure"]} tone="blue" step={6} center />
      <TokenStrip x={308} y={180} count={7} tone="blue" step={7} size={7} gap={3} />
      <circle cx="488" cy="180" r="5" className="diagram-version-node diagram-version-node-blue" />
      <circle cx="468" cy="202" r="4" className="diagram-version-node" />
      <circle cx="508" cy="202" r="4" className="diagram-version-node" />
      <Link d="M 485 184 L 471 199" id={id} tone="blue" step={7} arrow={false} />
      <Link d="M 491 184 L 505 199" id={id} tone="blue" step={7} arrow={false} />
      <TokenStrip x={592} y={180} count={7} tone="blue" step={7} size={7} gap={3} hollowEvery={4} />
      <Link d="M 406 132 H 427" id={id} tone="blue" step={7} />
      <Link d="M 549 132 H 570" id={id} tone="blue" step={7} />

      <Boundary x={264} y={248} width={448} height={142} label="PROVENANCE + VALIDATION" tone="red" step={8} />
      <PlateModule x={282} y={286} width={128} height={38} label="Provenance Links" tone="blue" step={9} center />
      <PlateModule x={426} y={286} width={128} height={38} label="Citation Binding" tone="blue" step={9} center />
      <PlateModule x={570} y={286} width={124} height={38} label="Business Rules" tone="red" step={9} center />
      {["Structure", "Consistency", "Traceability", "Integrity"].map((label, index) => (
        <PlateModule
          key={label}
          x={282 + index * 103}
          y={342}
          width={92}
          height={28}
          label={label}
          tone={index === 3 ? "red" : "ink"}
          step={10}
          center
        />
      ))}
      <Link d="M 488 226 V 248" id={id} tone="red" step={8} />

      <Boundary x={264} y={412} width={448} height={92} label="RENDER + ASSEMBLY" tone="blue" step={11} solid />
      <PlateModule x={284} y={450} width={194} height={34} label="Template Assembly" tone="blue" step={12} center />
      <PlateModule x={498} y={450} width={194} height={34} label="Artifact Identity" tone="red" step={12} center />
      <Link d="M 488 390 V 412" id={id} tone="ink" step={11} />

      <Link d="M 210 238 H 244" id={id} tone="blue" step={4} />
      <Link d="M 210 312 H 228 V 320 H 244" id={id} tone="muted" step={8} dashed />

      <Boundary x={766} y={82} width={172} height={390} label="DERIVATIVE ARTIFACTS" tone="red" step={12} />
      <StackPanel
        x={784}
        y={122}
        width={136}
        height={320}
        title="TYPED OUTPUTS"
        rows={["Structured Document", "Citation Map", "Validation Report", "Integrity Record", "Review State"]}
        tone="red"
        step={13}
        tokens={8}
      />
      <Link d="M 712 458 H 746 V 282 H 766" id={id} tone="red" step={13} />
      <Link d="M 732 132 H 750 V 186 H 766" id={id} tone="blue" step={13} dashed />
      <Link d="M 732 320 H 750 V 376 H 766" id={id} tone="ink" step={13} />

      <MicroLabel x={24} y={552} tone="muted" step={14}>
        STRUCTURE · SOURCE LOCATION · VALIDATION · ARTIFACT IDENTITY
      </MicroLabel>
      <TokenStrip x={778} y={540} count={12} tone="red" step={14} size={8} gap={4} hollowEvery={6} />
    </DiagramSvg>
  );
}

function ImageSvg({ language, mobile }: { language: Language; mobile: boolean }) {
  const id = `technology-image-${language}-${mobile ? "mobile" : "desktop"}`;
  const inputRows = [
    pick(language, "정적 이미지", "Static Raster"),
    pick(language, "제한된 2D X-ray", "Bounded 2D X-ray"),
    pick(language, "기존 주석", "Existing Annotations"),
    pick(language, "원본 식별 정보", "Source Identity"),
  ];

  if (mobile) {
    return (
      <DiagramSvg id={id} kind="image" language={language} mobile width={420} height={1000}>
        <Boundary x={22} y={24} width={376} height={190} label="SUPPORTED STATIC INPUTS" tone="ink" step={1} />
        {inputRows.map((row, index) => (
          <PlateModule
            key={row}
            x={38 + (index % 2) * 174}
            y={62 + Math.floor(index / 2) * 50}
            width={158}
            height={36}
            label={row}
            tone={index < 2 ? "blue" : "ink"}
            step={2 + index}
          />
        ))}
        <TokenStrip x={149} y={190} count={9} tone="blue" step={5} />

        <Boundary x={22} y={250} width={376} height={500} label="ALPHAIMAGE" tone="blue" step={6} emphasized />
        <Boundary x={40} y={286} width={340} height={112} label="BOUNDED INPUT CONTRACT" tone="ink" step={7} />
        <PlateModule x={54} y={326} width={92} height={38} label={["Type", "Size"]} tone="blue" step={8} center />
        <PlateModule x={164} y={326} width={92} height={38} label={["Static", "Frame"]} tone="blue" step={8} center />
        <PlateModule x={274} y={326} width={92} height={38} label={["Safe", "Decode"]} tone="blue" step={8} center />

        <Boundary x={40} y={420} width={340} height={140} label="REPRESENTATION NORMALIZATION" tone="blue" step={9} solid />
        <PlateModule x={54} y={462} width={92} height={42} label="Native" tone="ink" step={10} center />
        <PlateModule x={164} y={462} width={92} height={42} label="Normalized" tone="blue" step={10} center strong />
        <PlateModule x={274} y={462} width={92} height={42} label="Preview" tone="ink" step={10} center />
        <Link d="M 146 483 H 164" id={id} tone="blue" step={11} />
        <Link d="M 256 483 H 274" id={id} tone="blue" step={11} />
        <TokenStrip x={155} y={530} count={8} tone="blue" step={11} hollowEvery={4} />

        <Boundary x={40} y={582} width={340} height={140} label="COORDINATES + LINEAGE" tone="red" step={12} />
        <PlateModule x={54} y={622} width={92} height={42} label={["Coordinate", "Map"]} tone="blue" step={13} center />
        <PlateModule x={164} y={622} width={92} height={42} label={["Existing", "Annotations"]} tone="ink" step={13} center />
        <PlateModule x={274} y={622} width={92} height={42} label={["Integrity", "Binding"]} tone="red" step={13} center />
        <Link d="M 146 643 H 164" id={id} tone="blue" step={14} />
        <Link d="M 256 643 H 274" id={id} tone="red" step={14} />
        <TokenStrip x={155} y={690} count={8} tone="red" step={14} hollowEvery={4} />

        <Link d="M 210 214 V 250" id={id} tone="blue" step={6} />
        <Link d="M 210 398 V 420" id={id} tone="blue" step={9} />
        <Link d="M 210 560 V 582" id={id} tone="red" step={12} />

        <Boundary x={22} y={790} width={376} height={170} label="IMAGE ARTIFACT V1" tone="red" step={15} solid />
        <PlateModule x={40} y={832} width={158} height={36} label="Safe Representations" tone="blue" step={16} />
        <PlateModule x={222} y={832} width={158} height={36} label="Coordinate Systems" tone="blue" step={16} />
        <PlateModule x={40} y={884} width={158} height={36} label="Annotation Lineage" tone="ink" step={17} />
        <PlateModule x={222} y={884} width={158} height={36} label="Integrity Record" tone="red" step={17} />
        <Link d="M 210 750 V 774 H 119 V 790" id={id} tone="blue" step={15} />
        <Link d="M 210 774 H 301 V 790" id={id} tone="red" step={15} />
      </DiagramSvg>
    );
  }

  return (
    <DiagramSvg id={id} kind="image" language={language} mobile={false} width={960} height={590}>
      <Boundary x={20} y={82} width={180} height={390} label="STATIC IMAGE INPUTS" tone="ink" step={1} />
      <StackPanel
        x={36}
        y={122}
        width={148}
        height={320}
        title="SOURCE"
        rows={inputRows}
        tone="ink"
        step={2}
        tokens={8}
      />

      <Boundary x={230} y={30} width={500} height={500} label="ALPHAIMAGE" tone="blue" step={3} emphasized />
      <Boundary x={252} y={68} width={456} height={96} label="BOUNDED INPUT CONTRACT" tone="ink" step={4} />
      <PlateModule x={270} y={104} width={126} height={38} label="Type + Size" tone="blue" step={5} center />
      <PlateModule x={417} y={104} width={126} height={38} label="Static Frame" tone="blue" step={5} center />
      <PlateModule x={564} y={104} width={126} height={38} label="Safe Decode" tone="blue" step={5} center />

      <Boundary x={252} y={186} width={456} height={142} label="REPRESENTATION NORMALIZATION" tone="blue" step={6} solid />
      <PlateModule x={270} y={228} width={126} height={44} label="Native" tone="ink" step={7} center />
      <PlateModule x={417} y={228} width={126} height={44} label="Normalized" tone="blue" step={7} center strong />
      <PlateModule x={564} y={228} width={126} height={44} label="Preview" tone="ink" step={7} center />
      <Link d="M 396 250 H 417" id={id} tone="blue" step={8} />
      <Link d="M 543 250 H 564" id={id} tone="blue" step={8} />
      <TokenStrip x={432} y={296} count={9} tone="blue" step={8} hollowEvery={5} />

      <Boundary x={252} y={350} width={456} height={154} label="COORDINATES + LINEAGE" tone="red" step={9} />
      <PlateModule x={270} y={394} width={126} height={44} label={["Coordinate", "Transform"]} tone="blue" step={10} center />
      <PlateModule x={417} y={394} width={126} height={44} label={["Existing Annotation", "Lineage"]} tone="ink" step={10} center />
      <PlateModule x={564} y={394} width={126} height={44} label={["Processing +", "Integrity Identity"]} tone="red" step={10} center />
      <Link d="M 396 416 H 417" id={id} tone="blue" step={11} />
      <Link d="M 543 416 H 564" id={id} tone="red" step={11} />
      <TokenStrip x={432} y={466} count={9} tone="red" step={11} hollowEvery={5} />

      <Link d="M 200 250 H 216 V 116 H 230" id={id} tone="blue" step={3} />
      <Link d="M 480 164 V 186" id={id} tone="blue" step={6} />
      <Link d="M 480 328 V 350" id={id} tone="red" step={9} />

      <Boundary x={760} y={82} width={180} height={390} label="IMAGE ARTIFACT V1" tone="red" step={12} solid />
      <StackPanel
        x={778}
        y={122}
        width={144}
        height={320}
        title="TYPED OUTPUT"
        rows={["Safe Representations", "Coordinate Systems", "Annotation Lineage", "Processing Identity", "Integrity Record"]}
        tone="red"
        step={13}
        tokens={8}
      />
      <Link d="M 730 266 H 744 V 222 H 760" id={id} tone="blue" step={13} />
      <Link d="M 708 428 H 744 V 372 H 760" id={id} tone="red" step={13} />

      <MicroLabel x={24} y={552} tone="muted" step={14}>
        REPRESENTATION · COORDINATES · ANNOTATION LINEAGE · INTEGRITY
      </MicroLabel>
      <TokenStrip x={780} y={540} count={12} tone="red" step={14} size={8} gap={4} hollowEvery={6} />
    </DiagramSvg>
  );
}

function LayerSvg({ language, mobile }: { language: Language; mobile: boolean }) {
  const id = `technology-layer-${language}-${mobile ? "mobile" : "desktop"}`;
  const requestRows = [
    pick(language, "근거 텍스트", "Evidence Text"),
    pick(language, "문서 텍스트", "Document Text"),
    pick(language, "업무 텍스트", "Workflow Text"),
    pick(language, "등록된 작업", "Registered Task"),
  ];

  if (mobile) {
    return (
      <DiagramSvg id={id} kind="layer" language={language} mobile width={420} height={1050}>
        <Boundary x={22} y={24} width={376} height={166} label="SELECTED PROTECTED TEXT PATHS" tone="ink" step={1} />
        {requestRows.map((row, index) => (
          <PlateModule
            key={row}
            x={38 + (index % 2) * 174}
            y={60 + Math.floor(index / 2) * 48}
            width={158}
            height={34}
            label={row}
            tone={index % 2 === 0 ? "blue" : "ink"}
            step={2 + index}
          />
        ))}
        <TokenStrip x={149} y={169} count={9} tone="blue" step={5} />

        <Boundary x={20} y={224} width={380} height={552} label="PURPOSE + POLICY BOUNDARY" tone="blue" step={6} emphasized />
        <PlateModule x={40} y={264} width={102} height={34} label="Purpose Bind" tone="blue" step={7} center />
        <PlateModule x={159} y={264} width={102} height={34} label="Request Contract" tone="blue" step={7} center />
        <PlateModule x={278} y={264} width={102} height={34} label="Processing Scope" tone="blue" step={7} center />
        <TokenStrip x={155} y={315} count={8} tone="red" step={7} />

        <Boundary x={40} y={342} width={340} height={180} label="MINIMIZATION BOUNDARY" tone="blue" step={8} />
        <PlateModule x={56} y={380} width={92} height={38} label={["Data", "Minimization"]} tone="blue" step={9} center />
        <PlateModule x={164} y={380} width={92} height={38} label={["Policy", "Transform"]} tone="blue" step={9} center />
        <PlateModule x={272} y={380} width={92} height={38} label={["Scope", "Limitation"]} tone="blue" step={9} center />
        <TokenStrip x={155} y={444} count={8} tone="red" step={10} />

        <Boundary x={58} y={468} width={304} height={164} label="PROTECTED EXECUTION" tone="red" step={10} solid />
        <PlateModule x={76} y={512} width={82} height={44} label={["Policy", "Check"]} tone="red" step={11} center />
        <PlateModule x={169} y={512} width={82} height={44} label={["Controlled", "Egress"]} tone="red" step={11} center strong />
        <PlateModule x={262} y={512} width={82} height={44} label={["Response", "Guard"]} tone="red" step={11} center />
        <TokenStrip x={155} y={590} count={8} tone="red" step={11} />

        <Boundary x={40} y={650} width={164} height={100} label="RESPONSE INTEGRITY" tone="blue" step={12} />
        <PlateModule x={56} y={688} width={132} height={34} label="Request Binding" tone="blue" step={13} />
        <Boundary x={216} y={650} width={164} height={100} label="MINIMAL EXECUTION RECORD" tone="red" step={12} />
        <PlateModule x={232} y={688} width={132} height={34} label="Policy Reference" tone="red" step={13} />

        <Link d="M 210 190 V 224" id={id} tone="blue" step={6} />
        <Link d="M 210 298 V 342" id={id} tone="red" step={8} />
        <Link d="M 210 522 V 650" id={id} tone="red" step={12} />
        <Link d="M 210 632 V 650" id={id} tone="blue" step={12} />

        <Boundary x={22} y={812} width={376} height={206} label="EXECUTION CONTEXT" tone="ink" step={14} />
        <PlateModule x={42} y={852} width={154} height={34} label="Request Context" tone="blue" step={15} />
        <PlateModule x={224} y={852} width={154} height={34} label="Minimal Record" tone="blue" step={15} />
        <PlateModule x={42} y={912} width={102} height={32} label="Policy Bind" tone="red" step={16} center />
        <PlateModule x={159} y={912} width={102} height={32} label="Execution Bind" tone="red" step={16} center />
        <PlateModule x={276} y={912} width={102} height={32} label="Response Bind" tone="red" step={16} center />
        <Link d="M 196 869 H 224" id={id} tone="red" step={16} dashed startArrow />
        <Link d="M 93 886 V 912" id={id} tone="red" step={16} />
        <Link d="M 301 886 V 912" id={id} tone="red" step={16} />
        <Link d="M 144 928 H 159" id={id} tone="ink" step={16} />
        <Link d="M 261 928 H 276" id={id} tone="ink" step={16} />
        <TokenStrip x={155} y={976} count={8} tone="blue" step={17} />
      </DiagramSvg>
    );
  }

  return (
    <DiagramSvg id={id} kind="layer" language={language} mobile={false} width={960} height={600}>
      <Boundary x={20} y={94} width={170} height={356} label="SELECTED PATHS" tone="ink" step={1} />
      <StackPanel
        x={36}
        y={132}
        width={138}
        height={272}
        title="PROTECTED TEXT"
        rows={requestRows}
        tone="ink"
        step={2}
        tokens={8}
      />

      <Boundary x={220} y={30} width={520} height={464} label="PURPOSE + POLICY BOUNDARY" tone="blue" step={3} emphasized />
      <PlateModule x={244} y={72} width={108} height={34} label="Purpose Binding" tone="blue" step={4} center />
      <PlateModule x={372} y={72} width={108} height={34} label="Request Contract" tone="blue" step={4} center />
      <PlateModule x={500} y={72} width={108} height={34} label="Policy Gate" tone="blue" step={4} center />
      <PlateModule x={628} y={72} width={88} height={34} label="Scope" tone="blue" step={4} center />
      <TokenStrip x={432} y={122} count={9} tone="red" step={5} />

      <Boundary x={250} y={146} width={460} height={306} label="MINIMIZATION BOUNDARY" tone="blue" step={5} />
      <PlateModule x={276} y={188} width={122} height={38} label="Data Minimization" tone="blue" step={6} center />
      <PlateModule x={419} y={188} width={122} height={38} label="Policy Transform" tone="blue" step={6} center />
      <PlateModule x={562} y={188} width={122} height={38} label="Scope Limitation" tone="blue" step={6} center />
      <TokenStrip x={432} y={244} count={9} tone="red" step={7} />

      <Boundary x={276} y={270} width={408} height={148} label="PROTECTED EXECUTION" tone="red" step={7} solid />
      <PlateModule x={296} y={314} width={110} height={50} label={["Policy", "Check"]} tone="red" step={8} center />
      <PlateModule x={425} y={314} width={110} height={50} label={["Controlled", "Egress"]} tone="red" step={8} center strong />
      <PlateModule x={554} y={314} width={110} height={50} label={["Response", "Guard"]} tone="red" step={8} center />
      <TokenStrip x={428} y={390} count={9} tone="red" step={9} />

      <Boundary x={770} y={94} width={170} height={170} label="RESPONSE INTEGRITY" tone="blue" step={9} />
      <PlateModule x={788} y={136} width={134} height={34} label="Integrity Check" tone="blue" step={10} />
      <PlateModule x={788} y={182} width={134} height={34} label="Request Binding" tone="blue" step={10} />
      <TokenStrip x={817} y={238} count={7} tone="blue" step={10} />

      <Boundary x={770} y={284} width={170} height={166} label="MINIMAL EXECUTION RECORD" tone="red" step={9} />
      <PlateModule x={788} y={326} width={134} height={34} label="Execution State" tone="red" step={10} />
      <PlateModule x={788} y={372} width={134} height={34} label="Policy Binding" tone="red" step={10} />
      <TokenStrip x={817} y={424} count={7} tone="red" step={10} />

      <Link d="M 190 270 H 220" id={id} tone="blue" step={3} />
      <Link d="M 740 188 H 770" id={id} tone="blue" step={9} />
      <Link d="M 684 344 H 728 V 367 H 770" id={id} tone="red" step={9} />
      <Link d="M 480 106 V 146" id={id} tone="red" step={5} />
      <Link d="M 480 226 V 270" id={id} tone="red" step={7} />
      <Link d="M 250 302 H 220 V 506 H 480 V 494" id={id} tone="blue" step={11} dashed />
      <Link d="M 710 302 H 744 V 506 H 480" id={id} tone="red" step={11} dashed />

      <Boundary x={84} y={516} width={792} height={58} label="EXECUTION CONTEXT" tone="ink" step={11} />
      <PlateModule x={110} y={538} width={132} height={26} label="Request Context" tone="blue" step={12} center />
      <PlateModule x={286} y={538} width={112} height={26} label="Policy Bind" tone="red" step={12} center />
      <PlateModule x={424} y={538} width={112} height={26} label="Execution Bind" tone="red" step={12} center />
      <PlateModule x={562} y={538} width={112} height={26} label="Response Bind" tone="red" step={12} center />
      <PlateModule x={718} y={538} width={132} height={26} label="Minimal Record" tone="blue" step={12} center />
      <Link d="M 242 551 H 286" id={id} tone="blue" step={13} />
      <Link d="M 398 551 H 424" id={id} tone="ink" step={13} />
      <Link d="M 536 551 H 562" id={id} tone="ink" step={13} />
      <Link d="M 674 551 H 718" id={id} tone="red" step={13} />
    </DiagramSvg>
  );
}

function SealSvg({ language, mobile }: { language: Language; mobile: boolean }) {
  const id = `technology-seal-${language}-${mobile ? "mobile" : "desktop"}`;

  if (mobile) {
    return (
      <DiagramSvg id={id} kind="seal" language={language} mobile width={420} height={980}>
        <Boundary x={22} y={24} width={376} height={170} label="SENDER · END TO END" tone="ink" step={1} />
        <PlateModule x={40} y={60} width={160} height={36} label="Compose" tone="blue" step={2} />
        <PlateModule x={218} y={56} width={162} height={44} label={["Seal with", "recipient key"]} tone="red" step={3} center />
        <TokenStrip x={149} y={150} count={8} tone="blue" step={4} />

        <Boundary x={20} y={214} width={380} height={330} label="SERVER · CANNOT READ" tone="red" step={5} emphasized />
        <PlateModule x={40} y={254} width={340} height={38} label="Encrypted Envelope" tone="red" step={6} center />
        <PlateModule x={40} y={304} width={340} height={44} label={["Bound to conversation,", "sender & message order"]} tone="red" step={6} center />
        <Boundary x={40} y={362} width={340} height={92} label="CIPHERTEXT ONLY" tone="red" step={7} solid />
        <PlateModule x={58} y={398} width={304} height={38} label="Sealed message store" tone="red" step={8} center />
        <PlateModule x={40} y={478} width={340} height={38} label="Delivery metadata (minimal)" tone="ink" step={9} center />

        <Boundary x={22} y={566} width={376} height={150} label="RECIPIENT" tone="ink" step={10} />
        <PlateModule x={40} y={602} width={160} height={44} label={["Open with", "own key"]} tone="red" step={11} center />
        <PlateModule x={218} y={606} width={162} height={36} label="Read & verify" tone="blue" step={11} />
        <TokenStrip x={149} y={686} count={8} tone="blue" step={12} />

        <Boundary x={22} y={738} width={376} height={214} label="USER-KEY BACKUP" tone="blue" step={13} />
        <PlateModule x={42} y={778} width={336} height={38} label="Sealed key backup" tone="blue" step={14} center />
        <PlateModule x={42} y={830} width={160} height={44} label={["Biometric passkey", "or recovery code"]} tone="blue" step={14} center />
        <PlateModule x={218} y={830} width={160} height={44} label="New-device restore" tone="blue" step={14} center strong />
        <MicroLabel x={210} y={922} anchor="middle" tone="muted" step={15}>past messages restored</MicroLabel>

        <Link d="M 210 194 V 214" id={id} tone="blue" step={5} />
        <Link d="M 210 544 V 566" id={id} tone="blue" step={10} />
        <Link d="M 210 738 V 716" id={id} tone="blue" step={15} dashed startArrow />
      </DiagramSvg>
    );
  }

  return (
    <DiagramSvg id={id} kind="seal" language={language} mobile={false} width={960} height={600}>
      <Boundary x={24} y={70} width={210} height={300} label="SENDER" tone="ink" step={1} />
      <PlateModule x={40} y={110} width={178} height={40} label="Compose" tone="blue" step={2} />
      <PlateModule x={40} y={168} width={178} height={48} label={["Seal with", "recipient key"]} tone="red" step={3} center />
      <TokenStrip x={80} y={252} count={6} tone="blue" step={4} />
      <MicroLabel x={129} y={306} anchor="middle" tone="muted" step={4}>sealed on device</MicroLabel>

      <Boundary x={270} y={44} width={330} height={360} label="SERVER" tone="red" step={5} emphasized />
      <MicroLabel x={435} y={78} anchor="middle" tone="red" step={5}>CANNOT READ CONTENT</MicroLabel>
      <PlateModule x={294} y={92} width={282} height={38} label="Encrypted Envelope" tone="red" step={6} center />
      <PlateModule x={294} y={148} width={282} height={46} label={["Bound to conversation,", "sender & message order"]} tone="red" step={6} center />
      <Boundary x={294} y={214} width={282} height={96} label="CIPHERTEXT ONLY" tone="red" step={7} solid />
      <PlateModule x={312} y={248} width={246} height={40} label="Sealed message store" tone="red" step={8} center />
      <PlateModule x={294} y={330} width={282} height={40} label="Delivery metadata (minimal)" tone="ink" step={9} center />

      <Boundary x={636} y={70} width={210} height={300} label="RECIPIENT" tone="ink" step={10} />
      <PlateModule x={652} y={110} width={178} height={48} label={["Open with", "own key"]} tone="red" step={11} center />
      <PlateModule x={652} y={176} width={178} height={40} label="Read & verify" tone="blue" step={11} />
      <TokenStrip x={690} y={252} count={6} tone="blue" step={12} />
      <MicroLabel x={741} y={306} anchor="middle" tone="muted" step={12}>opens only here</MicroLabel>

      <Boundary x={120} y={440} width={720} height={120} label="USER-KEY BACKUP" tone="blue" step={13} />
      <PlateModule x={150} y={482} width={180} height={44} label="Sealed key backup" tone="blue" step={14} center />
      <PlateModule x={360} y={482} width={200} height={44} label={["Biometric passkey", "or recovery code"]} tone="blue" step={14} center />
      <PlateModule x={600} y={482} width={200} height={44} label="New-device restore" tone="blue" step={14} center strong />
      <MicroLabel x={480} y={548} anchor="middle" tone="muted" step={15}>past messages restored across devices</MicroLabel>

      <Link d="M 234 188 H 270" id={id} tone="blue" step={5} />
      <Link d="M 600 154 H 636" id={id} tone="blue" step={10} />
      <Link d="M 330 504 H 360" id={id} tone="ink" step={15} />
      <Link d="M 560 504 H 600" id={id} tone="ink" step={15} />
      <Link d="M 129 440 V 370" id={id} tone="blue" step={15} dashed startArrow />
      <Link d="M 741 440 V 370" id={id} tone="blue" step={15} dashed startArrow />
    </DiagramSvg>
  );
}

function DiagramPair({ kind, language }: { kind: TechnologyMotionKind; language: Language }) {
  if (kind === "seal") {
    return <><SealSvg language={language} mobile={false} /><SealSvg language={language} mobile /></>;
  }
  if (kind === "overview") {
    return <><OverviewSvg language={language} mobile={false} /><OverviewSvg language={language} mobile /></>;
  }
  if (kind === "evidence") {
    return <><EvidenceSvg language={language} mobile={false} /><EvidenceSvg language={language} mobile /></>;
  }
  if (kind === "engine") {
    return <><EngineSvg language={language} mobile={false} /><EngineSvg language={language} mobile /></>;
  }
  if (kind === "document") {
    return <><DocumentSvg language={language} mobile={false} /><DocumentSvg language={language} mobile /></>;
  }
  if (kind === "image") {
    return <><ImageSvg language={language} mobile={false} /><ImageSvg language={language} mobile /></>;
  }
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
