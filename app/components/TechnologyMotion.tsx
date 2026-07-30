import type { CSSProperties } from "react";
import { ViewportMotion } from "@/app/components/ViewportMotion";
import type { Language } from "@/app/site-content";

export type TechnologyMotionKind =
  | "overview"
  | "evidence"
  | "engine"
  | "document"
  | "image"
  | "layer"
  | "seal";

type DiagramTone = "ink" | "blue" | "red" | "muted";
type DiagramNode = {
  eyebrow: string;
  lines: readonly string[];
  tone: DiagramTone;
};
type DiagramSpec = {
  title: string;
  description: string;
  principle: readonly string[];
  nodes: readonly DiagramNode[];
  note: string;
};

const diagramCopy: Record<Language, Record<TechnologyMotionKind, DiagramSpec>> = {
  ko: {
    overview: {
      title: "바이오레 기술 체계",
      description: "근거, 문서와 이미지, 업무 실행, 외부 AI 통제와 1:1 대화 보호를 서로 다른 기술로 나누고 검증된 범위에서 알파닥에 연결하는 바이오레의 공개 기술 체계입니다.",
      principle: ["각자의 책임은 분명하게,", "연결은 검증된 범위에서만."],
      nodes: [
        { eyebrow: "ALPHAEVIDENCE", lines: ["근거가 남는", "의료 지식"], tone: "blue" },
        { eyebrow: "ALPHADOCUMENT · ALPHAIMAGE", lines: ["다시 쓸 수 있는", "문서와 이미지"], tone: "ink" },
        { eyebrow: "ENGINE · ALPHALAYER", lines: ["목적에 맞춘", "통제된 실행"], tone: "red" },
        { eyebrow: "ALPHADOC · ALPHASEAL", lines: ["검토와 보호가 있는", "제품 경험"], tone: "blue" },
      ],
      note: "구현 · 제품 연결 · 운영 검증은 서로 다른 상태로 공개합니다.",
    },
    evidence: {
      title: "AlphaEvidence · 근거가 다시 쓰이는 흐름",
      description: "확인 가능한 자료를 출처와 변화가 남는 계보로 정리하고 검토 가능한 근거 맥락으로 전달하는 AlphaEvidence의 흐름입니다.",
      principle: ["근거는 양보다", "다시 확인할 수 있는 계보가 먼저입니다."],
      nodes: [
        { eyebrow: "INPUT", lines: ["확인 가능한", "문헌·진료지침"], tone: "ink" },
        { eyebrow: "IDENTITY", lines: ["출처와 식별 정보", "변화의 연결"], tone: "blue" },
        { eyebrow: "LINEAGE", lines: ["다시 살필 수 있는", "근거의 계보"], tone: "red" },
        { eyebrow: "USE", lines: ["검토 가능한", "근거 맥락"], tone: "blue" },
      ],
      note: "공개 집계의 레코드 수는 모든 자료의 임상 검증 완료를 뜻하지 않습니다.",
    },
    engine: {
      title: "AlphaDoc Engine · 질문 다음의 일",
      description: "업무 목적을 확인하고 필요한 근거와 사용 가능한 아티팩트를 조합한 뒤 결과를 사용자 검토와 다음 행동으로 잇는 흐름입니다.",
      principle: ["모델보다 먼저", "사용자가 하려는 일을 구분합니다."],
      nodes: [
        { eyebrow: "PURPOSE", lines: ["의료 업무의", "목적 확인"], tone: "ink" },
        { eyebrow: "CONTEXT", lines: ["필요한 근거와", "사용 가능한 입력"], tone: "blue" },
        { eyebrow: "EXECUTION", lines: ["목적에 맞춘", "통제된 실행"], tone: "red" },
        { eyebrow: "OUTCOME", lines: ["사용자 검토와", "다음 행동"], tone: "blue" },
      ],
      note: "근거 품질 평가가 적용되는 범위와 방식은 기능마다 다릅니다.",
    },
    document: {
      title: "AlphaDocument · 다시 쓰이는 문서",
      description: "지원 문서에서 보존 가능한 구조와 출처를 정리해 알파닥 기능이 다시 쓸 수 있는 문서 아티팩트로 잇는 흐름입니다.",
      principle: ["문서 지식은", "원문으로 돌아갈 수 있어야 합니다."],
      nodes: [
        { eyebrow: "INPUT", lines: ["지원되는", "디지털 문서"], tone: "ink" },
        { eyebrow: "PRESERVE", lines: ["보존 가능한", "구조와 출처"], tone: "blue" },
        { eyebrow: "ARTIFACT", lines: ["다시 쓸 수 있는", "문서 아티팩트"], tone: "red" },
        { eyebrow: "REUSE", lines: ["문서 맥락이 필요한", "알파닥 기능"], tone: "blue" },
      ],
      note: "보존 범위는 형식마다 다르며 원본 배치의 완전한 재현을 뜻하지 않습니다.",
    },
    image: {
      title: "AlphaImage · 해석 전의 공통 기준",
      description: "지원되는 정적 이미지를 일관된 표현과 좌표로 정리하고 원본과 기존 주석의 계보를 후속 기능에 잇는 흐름입니다.",
      principle: ["이미지 해석보다", "입력의 일관성이 먼저입니다."],
      nodes: [
        { eyebrow: "INPUT", lines: ["지원되는", "정적 이미지"], tone: "ink" },
        { eyebrow: "CONSISTENCY", lines: ["안전한 공통 표현과", "좌표 기준"], tone: "blue" },
        { eyebrow: "LINEAGE", lines: ["원본과 기존 주석의", "이어지는 계보"], tone: "red" },
        { eyebrow: "REUSE", lines: ["후속 기능이 쓰는", "공통 기반"], tone: "blue" },
      ],
      note: "AlphaImage는 영상 판독이나 진단의 참·거짓을 결정하지 않습니다.",
    },
    layer: {
      title: "AlphaLayer · 자율성과 보안 사이의 경계",
      description: "선택된 보호 텍스트를 등록된 정책 경계에서 확인하고 통제된 외부 실행과 제한된 결과 반환을 같은 요청 맥락으로 잇는 흐름입니다.",
      principle: ["LLM의 자율성과 보안,", "그 사이의 경계를 바로잡습니다."],
      nodes: [
        { eyebrow: "SELECTED PATH", lines: ["선택된", "보호 텍스트"], tone: "ink" },
        { eyebrow: "POLICY", lines: ["등록된 목적과", "요청 조건"], tone: "blue" },
        { eyebrow: "EXECUTION", lines: ["통제된", "외부 AI 실행"], tone: "red" },
        { eyebrow: "RETURN", lines: ["요청에 묶인", "제한된 결과 반환"], tone: "blue" },
      ],
      note: "모든 기능·식별정보·원문 파일 또는 법적 적합성을 포괄하는 경계가 아닙니다.",
    },
    seal: {
      title: "AlphaSeal · 브라우저 사이의 봉인",
      description: "지원되는 1:1 쪽지 본문을 발신자 브라우저에서 암호화해 일반 저장 경로에는 암호문으로 남기고 수신자 브라우저에서 여는 흐름입니다.",
      principle: ["대화 내용과", "전달에 필요한 정보는 다릅니다."],
      nodes: [
        { eyebrow: "SENDER", lines: ["발신자", "브라우저"], tone: "ink" },
        { eyebrow: "MESSAGE BODY", lines: ["암호화된", "1:1 쪽지 본문"], tone: "red" },
        { eyebrow: "STORAGE", lines: ["일반 저장 경로의", "암호문"], tone: "muted" },
        { eyebrow: "RECIPIENT", lines: ["수신자", "브라우저"], tone: "blue" },
      ],
      note: "전달 메타데이터와 신고 경로는 별도이며, 현재 범위는 지원되는 1:1 쪽지입니다.",
    },
  },
  en: {
    overview: {
      title: "Viore technology system",
      description: "Viore separates evidence, documents and images, work execution, external AI control, and one-to-one conversation protection, connecting each to Alphadoc only within a verified scope.",
      principle: ["Clear responsibility for each technology.", "Connections only within verified scope."],
      nodes: [
        { eyebrow: "ALPHAEVIDENCE", lines: ["Medical knowledge", "that keeps its source"], tone: "blue" },
        { eyebrow: "ALPHADOCUMENT · ALPHAIMAGE", lines: ["Reusable document", "and image inputs"], tone: "ink" },
        { eyebrow: "ENGINE · ALPHALAYER", lines: ["Purpose-defined", "controlled execution"], tone: "red" },
        { eyebrow: "ALPHADOC · ALPHASEAL", lines: ["Product experience", "with review and protection"], tone: "blue" },
      ],
      note: "Implementation, product connection, and runtime verification are reported as distinct states.",
    },
    evidence: {
      title: "AlphaEvidence · evidence that remains reusable",
      description: "How verifiable material becomes source- and change-aware lineage and reviewable evidence context.",
      principle: ["Evidence needs more than volume.", "It needs lineage people can revisit."],
      nodes: [
        { eyebrow: "INPUT", lines: ["Verifiable literature", "and guidelines"], tone: "ink" },
        { eyebrow: "IDENTITY", lines: ["Source identity", "and observed change"], tone: "blue" },
        { eyebrow: "LINEAGE", lines: ["Evidence lineage", "people can revisit"], tone: "red" },
        { eyebrow: "USE", lines: ["Reviewable", "evidence context"], tone: "blue" },
      ],
      note: "Public record counts do not mean every item has completed clinical validation.",
    },
    engine: {
      title: "AlphaDoc Engine · what comes after the question",
      description: "How work purpose, evidence and available artifacts lead to controlled execution, user review, and the next action.",
      principle: ["Define the work first.", "Choose execution only after that."],
      nodes: [
        { eyebrow: "PURPOSE", lines: ["Purpose of the", "medical task"], tone: "ink" },
        { eyebrow: "CONTEXT", lines: ["Required evidence", "and available inputs"], tone: "blue" },
        { eyebrow: "EXECUTION", lines: ["Purpose-defined", "controlled execution"], tone: "red" },
        { eyebrow: "OUTCOME", lines: ["User review", "and next action"], tone: "blue" },
      ],
      note: "Evidence-quality evaluation scope and method vary by feature.",
    },
    document: {
      title: "AlphaDocument · documents made reusable",
      description: "How supported documents become reusable artifacts carrying the structure and provenance AlphaDocument can preserve.",
      principle: ["Document knowledge should", "lead back to its source."],
      nodes: [
        { eyebrow: "INPUT", lines: ["Supported", "digital document"], tone: "ink" },
        { eyebrow: "PRESERVE", lines: ["Recoverable structure", "and provenance"], tone: "blue" },
        { eyebrow: "ARTIFACT", lines: ["Reusable", "document artifact"], tone: "red" },
        { eyebrow: "REUSE", lines: ["Alphadoc features", "needing document context"], tone: "blue" },
      ],
      note: "Preservation varies by format and does not imply exact reproduction of every source layout.",
    },
    image: {
      title: "AlphaImage · a shared basis before interpretation",
      description: "How supported static images become consistent representations and coordinates while retaining source and existing-annotation lineage.",
      principle: ["Input consistency", "comes before interpretation."],
      nodes: [
        { eyebrow: "INPUT", lines: ["Supported", "static image"], tone: "ink" },
        { eyebrow: "CONSISTENCY", lines: ["Safe shared representation", "and coordinates"], tone: "blue" },
        { eyebrow: "LINEAGE", lines: ["Source and existing", "annotation lineage"], tone: "red" },
        { eyebrow: "REUSE", lines: ["Shared foundation", "for downstream use"], tone: "blue" },
      ],
      note: "AlphaImage does not interpret images or determine diagnostic truth.",
    },
    layer: {
      title: "AlphaLayer · the boundary between autonomy and security",
      description: "How selected protected text passes a registered policy boundary for controlled external execution and bounded result return.",
      principle: ["LLM autonomy and security", "need a deliberate boundary."],
      nodes: [
        { eyebrow: "SELECTED PATH", lines: ["Selected", "protected text"], tone: "ink" },
        { eyebrow: "POLICY", lines: ["Registered purpose", "and request conditions"], tone: "blue" },
        { eyebrow: "EXECUTION", lines: ["Controlled", "external AI execution"], tone: "red" },
        { eyebrow: "RETURN", lines: ["Bounded result", "tied to the request"], tone: "blue" },
      ],
      note: "This boundary does not cover every feature, identifier, source file, or legal-suitability question.",
    },
    seal: {
      title: "AlphaSeal · sealed between browsers",
      description: "How supported one-to-one message bodies are encrypted in the sender browser, stored as ciphertext, and opened in the recipient browser.",
      principle: ["Conversation content", "is different from delivery data."],
      nodes: [
        { eyebrow: "SENDER", lines: ["Sender", "browser"], tone: "ink" },
        { eyebrow: "MESSAGE BODY", lines: ["Encrypted one-to-one", "message body"], tone: "red" },
        { eyebrow: "STORAGE", lines: ["Ciphertext in the", "ordinary storage path"], tone: "muted" },
        { eyebrow: "RECIPIENT", lines: ["Recipient", "browser"], tone: "blue" },
      ],
      note: "Delivery metadata and reporting paths remain separate; the current scope is supported one-to-one messaging.",
    },
  },
};

function stepStyle(step: number): CSSProperties {
  return { "--svg-step": step } as CSSProperties;
}

function DiagramDefs({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={`${id}-arrow`}
        viewBox="0 0 8 8"
        refX="7"
        refY="4"
        markerWidth="7"
        markerHeight="7"
        orient="auto"
        markerUnits="userSpaceOnUse"
      >
        <path d="M 0 0 L 8 4 L 0 8 Z" className="diagram-marker diagram-marker-muted" />
      </marker>
    </defs>
  );
}

function NodeLabel({
  lines,
  x,
  y,
  lineHeight,
}: {
  lines: readonly string[];
  x: number;
  y: number;
  lineHeight: number;
}) {
  return (
    <text x={x} y={y} textAnchor="middle" className="diagram-public-node-title">
      {lines.map((line, index) => (
        <tspan key={line} x={x} dy={index === 0 ? 0 : lineHeight}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

function Principle({
  lines,
  x,
  y,
  mobile,
}: {
  lines: readonly string[];
  x: number;
  y: number;
  mobile: boolean;
}) {
  return (
    <text x={x} y={y} className="diagram-public-principle">
      {lines.map((line, index) => (
        <tspan key={line} x={x} dy={index === 0 ? 0 : mobile ? 22 : 25}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

function wrapWords(text: string, maxCharacters: number) {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxCharacters || !current) {
      current = candidate;
      continue;
    }
    lines.push(current);
    current = word;
  }
  if (current) lines.push(current);
  return lines;
}

function PublicNode({
  node,
  index,
  x,
  y,
  width,
  height,
  mobile,
}: {
  node: DiagramNode;
  index: number;
  x: number;
  y: number;
  width: number;
  height: number;
  mobile: boolean;
}) {
  const centerX = x + width / 2;
  const lineStart = y + (mobile ? 54 : 77);

  return (
    <g className="technology-svg-step" style={stepStyle(index + 2)}>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={mobile ? 8 : 10}
        className={`diagram-module diagram-module-${node.tone}${node.tone === "red" ? " is-strong" : ""}`}
      />
      <text x={x + 14} y={y + 21} className={`diagram-public-node-eyebrow diagram-text-${node.tone}`}>
        {String(index + 1).padStart(2, "0")} · {node.eyebrow}
      </text>
      <NodeLabel lines={node.lines} x={centerX} y={lineStart} lineHeight={mobile ? 18 : 22} />
    </g>
  );
}

function DiagramNote({
  text,
  x,
  y,
  width,
  mobile,
}: {
  text: string;
  x: number;
  y: number;
  width: number;
  mobile: boolean;
}) {
  const lines = wrapWords(text, mobile ? 43 : 120);

  return (
    <g className="technology-svg-step" style={stepStyle(7)}>
      <line x1={x} y1={y} x2={x + width} y2={y} className="diagram-panel-rule" />
      <text x={x} y={y + (mobile ? 22 : 25)} className="diagram-public-note">
        {lines.map((line, index) => (
          <tspan key={line} x={x} dy={index === 0 ? 0 : 15}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

function DesktopDiagram({
  id,
  spec,
}: {
  id: string;
  spec: DiagramSpec;
}) {
  const nodeWidth = 198;
  const nodeHeight = 142;
  const nodeY = 155;
  const nodeXs = [48, 270, 492, 714] as const;

  return (
    <svg
      viewBox="0 0 960 420"
      className="technology-paper-svg technology-paper-svg-desktop"
      role="img"
      aria-labelledby={`${id}-title ${id}-description`}
      data-diagram-level="public-outcome"
    >
      <title id={`${id}-title`}>{spec.title}</title>
      <desc id={`${id}-description`}>{spec.description}</desc>
      <DiagramDefs id={id} />
      <rect width="960" height="420" rx="12" className="diagram-paper" />
      <g className="technology-svg-step" style={stepStyle(1)}>
        <text x="48" y="43" className="diagram-public-kicker">VIORE · TECHNOLOGY JOURNAL</text>
        <Principle lines={spec.principle} x={48} y={82} mobile={false} />
      </g>

      {spec.nodes.map((node, index) => (
        <PublicNode
          key={node.eyebrow}
          node={node}
          index={index}
          x={nodeXs[index]}
          y={nodeY}
          width={nodeWidth}
          height={nodeHeight}
          mobile={false}
        />
      ))}

      {nodeXs.slice(0, -1).map((x, index) => (
        <path
          key={x}
          d={`M ${x + nodeWidth} ${nodeY + nodeHeight / 2} H ${nodeXs[index + 1] - 8}`}
          className="diagram-link diagram-link-muted technology-svg-step"
          markerEnd={`url(#${id}-arrow)`}
          style={stepStyle(index + 3)}
        />
      ))}

      <DiagramNote text={spec.note} x={48} y={349} width={864} mobile={false} />
    </svg>
  );
}

function MobileDiagram({
  id,
  spec,
}: {
  id: string;
  spec: DiagramSpec;
}) {
  const nodeX = 26;
  const nodeWidth = 368;
  const nodeHeight = 88;
  const nodeYs = [142, 254, 366, 478] as const;

  return (
    <svg
      viewBox="0 0 420 680"
      className="technology-paper-svg technology-paper-svg-mobile"
      role="img"
      aria-labelledby={`${id}-mobile-title ${id}-mobile-description`}
      data-diagram-level="public-outcome"
    >
      <title id={`${id}-mobile-title`}>{spec.title}</title>
      <desc id={`${id}-mobile-description`}>{spec.description}</desc>
      <DiagramDefs id={`${id}-mobile`} />
      <rect width="420" height="680" rx="10" className="diagram-paper" />
      <g className="technology-svg-step" style={stepStyle(1)}>
        <text x="26" y="34" className="diagram-public-kicker">VIORE · TECHNOLOGY</text>
        <Principle lines={spec.principle} x={26} y={69} mobile />
      </g>

      {spec.nodes.map((node, index) => (
        <PublicNode
          key={node.eyebrow}
          node={node}
          index={index}
          x={nodeX}
          y={nodeYs[index]}
          width={nodeWidth}
          height={nodeHeight}
          mobile
        />
      ))}

      {nodeYs.slice(0, -1).map((y, index) => (
        <path
          key={y}
          d={`M 210 ${y + nodeHeight} V ${nodeYs[index + 1] - 8}`}
          className="diagram-link diagram-link-muted technology-svg-step"
          markerEnd={`url(#${id}-mobile-arrow)`}
          style={stepStyle(index + 3)}
        />
      ))}

      <DiagramNote text={spec.note} x={26} y={610} width={368} mobile />
    </svg>
  );
}

function DiagramPair({
  kind,
  language,
}: {
  kind: TechnologyMotionKind;
  language: Language;
}) {
  const spec = diagramCopy[language][kind];
  const id = `viore-${language}-${kind}`;

  return (
    <>
      <DesktopDiagram id={id} spec={spec} />
      <MobileDiagram id={id} spec={spec} />
    </>
  );
}

export function TechnologyMotion({
  kind,
  language,
}: {
  kind: TechnologyMotionKind;
  language: Language;
}) {
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
