import type { AlphaEvidenceSnapshotResult } from "@/app/alphaevidence-snapshot";
import { AlphaEvidenceSnapshot } from "@/app/components/AlphaEvidenceSnapshot";
import { TechnologyArticleNav } from "@/app/components/TechnologyArticleNav";
import { TechnologyMotion, type TechnologyMotionKind } from "@/app/components/TechnologyMotion";
import type { Language } from "@/app/site-content";

type TechnologyStatus = "DEVELOPED & INTEGRATED";

const VERIFIED_DATE = "2026-07-26";

const sharedCopy = {
  ko: {
    journal: "Journal",
    published: "2026년 7월 21일",
    updated: "2026년 7월 26일 업데이트",
    hero: <>우리만의 선형을<br />만드는 과정</>,
    author: "Viore Team",
    status: "상태",
    verified: "최근 검증",
    figure: "그림",
    intro: [
      "의료 AI는 하나의 거대한 모델만으로 완성되지 않습니다. 좋은 근거가 어디에서 왔는지 기억하는 기반, 문서를 다시 쓸 수 있는 지식으로 바꾸는 기술, 업무의 목적에 따라 실행을 조율하는 지능, 그리고 외부 실행을 보호하는 경계가 함께 움직여야 합니다.",
      "바이오레의 기술은 앞에서 뒤로 한 번 흘러가는 파이프라인이 아닙니다. 현재 공개된 AlphaEvidence, AlphaDocument, AlphaLayer는 각자의 책임을 지키면서 AlphaDoc Engine과 계속 정보를 주고받습니다. Alphadoc은 이 기술들이 의료인의 실제 업무 안에서 만나는 공간입니다.",
      "각 기술은 독립적으로 발전하면서 함께 작동할 때 더 큰 가치를 만듭니다. 새로운 근거는 지식의 맥락을 넓히고, 새로운 문서는 다시 활용할 수 있는 아티팩트가 됩니다. 새로운 AI가 등장해도 실행 경계는 유지됩니다.",
      "이 구조는 지금 소개하는 기술로 끝나지 않습니다. 바이오레가 새로운 기술을 개발하고 검증해 제품에 통합할 때마다, 그 역할과 연결 방식도 이 Technology Journal에 계속 더해집니다.",
    ],
    quote: {
      first: "하나의 기술에 모든 것을 가두는 대신,",
      second: "서로 다른 기술이 모여 하나의 의료 경험을 만듭니다.",
    },
    introClose: "이것이 바이오레가 의료의 새로운 선형을 만드는 방식입니다.",
  },
  en: {
    journal: "Journal",
    published: "July 21, 2026",
    updated: "Updated July 26, 2026",
    hero: <>How we build<br />our own technology system</>,
    author: "Viore Team",
    status: "Status",
    verified: "Last verified",
    figure: "Figure",
    intro: [
      "Medical AI does not come from one large model alone. It needs a foundation that remembers where evidence came from, technology that turns documents into reusable knowledge, intelligence that orchestrates execution around purpose, and a boundary that protects external execution.",
      "Viore's technologies do not form a one-way pipeline. The technologies presented today—AlphaEvidence, AlphaDocument, and AlphaLayer—retain distinct responsibilities while continuously interacting with AlphaDoc Engine. Alphadoc is where they meet the real work of medical professionals.",
      "Each technology advances independently and creates greater value together. New evidence expands the context of knowledge. New documents become reusable artifacts. New AI can emerge while the execution boundary remains consistent.",
      "The system does not end with the technologies presented here. As Viore develops, validates, and integrates new technologies into its products, their roles and connections will continue to be added to this Technology Journal.",
    ],
    quote: {
      first: "Instead of placing everything inside one technology,",
      second: "we let distinct technologies create one medical experience.",
    },
    introClose: "This is how Viore builds its own technology system for medicine.",
  },
} as const;

const articleCopy = {
  ko: {
    evidence: {
      name: "AlphaEvidence",
      englishTitle: "Evidence Foundation",
      lead: "근거를 검색하기 전에, 근거가 믿을 수 있는 구조부터 만듭니다.",
      sections: [
        {
          title: "근거의 계보가 이어지는 기반",
          paragraphs: [
            "의학 문헌은 숫자로만 쌓인다고 지식이 되지 않습니다. 같은 논문이라도 어느 출처에서 들어왔는지, 언제 확인했는지, 이후 무엇이 달라졌는지가 함께 남아야 다음 판단에 다시 쓸 수 있습니다.",
            "AlphaEvidence는 문헌과 진료지침의 식별 정보, 출처와 변화 이력을 연결합니다. 근거를 들여오는 순간부터 다시 꺼내 쓰는 순간까지 하나의 계보가 이어집니다.",
          ],
        },
        {
          title: "AlphaEvidence DB, 근거의 계보를 잇는 데이터 계층",
          paragraphs: [
            "AlphaEvidence DB는 Evidence Foundation의 데이터 계층입니다. 정규화된 문헌, 출처와 변화의 기록, 이용 맥락, 품질과 최신성 신호가 서로 연결됩니다.",
            "AlphaDoc Engine은 이 구조에서 필요한 근거를 받습니다. 질문과 근거 사이에 출처가 남고, 새로운 자료가 들어오면 기존 지식과의 관계도 확장됩니다. 이렇게 쌓인 계보가 근거 검색을 시간이 갈수록 단단해지는 기반으로 만듭니다.",
          ],
        },
      ],
      figureTitle: "The AlphaEvidence evidence constellation",
      figureCaption: "AlphaEvidence는 AlphaEvidence DB를 데이터 계층으로 삼아 출처, 변화, 이용 맥락과 품질을 검토 가능한 근거 계보로 연결합니다.",
      snapshotTitle: "매일 더 깊어지는 AlphaEvidence DB",
    },
    engine: {
      name: "AlphaDoc Engine",
      englishTitle: "Medical Workflow Orchestration",
      lead: "질문을 답변으로 끝내지 않고, 다음 의료 업무까지 이어지는 실행 구조를 만듭니다.",
      sections: [
        {
          title: "의료 업무의 목적에서 시작합니다",
          paragraphs: [
            "같은 AI를 사용해도 무엇을 위해 실행하는지에 따라 필요한 근거와 문서, 도구와 결과의 형태는 달라집니다. AlphaDoc Engine은 모델을 정하기 전에 업무의 목적과 맥락을 구분합니다.",
            "임상 질문, 근거 탐색, 문서 업무, 번역과 의료 도구는 필요한 입력과 근거, 실행 방식, 다음 행동이 서로 다릅니다. AlphaDoc Engine은 이를 기능 단위(capability)로 연결합니다.",
          ],
        },
        {
          title: "서로 다른 기술을 하나의 경험으로 오케스트레이션합니다",
          paragraphs: [
            "AlphaEvidence에서 출처가 연결된 근거를 받고, AlphaDocument의 아티팩트에서 문서 맥락을 읽으며, 외부 AI 실행이 필요할 때는 AlphaLayer의 보호 경계를 사용합니다. 그 결과는 다시 Alphadoc의 앱과 도구, 문서와 검토 흐름으로 이어집니다.",
            "Release Identity는 실행에 사용된 코드와 동작 조건을 구분해 남깁니다. 평가 게이트는 근거의 충실도, 결과의 쓸모와 의료인의 검토 항목을 따로 살핍니다. 여러 기준을 평균 점수 하나로 뭉개지 않고, 무엇이 실행됐는지도 함께 추적합니다.",
          ],
        },
      ],
      figureTitle: "Purpose-defined orchestration",
      figureCaption: "AlphaDoc Engine은 질문, 근거, 문서, 보호된 AI 실행과 의료인의 검토를 업무 목적에 맞게 조율합니다. 필요한 기술을 선택하고 결과를 다시 제품과 다음 작업에 연결합니다.",
    },
    document: {
      name: "AlphaDocument",
      englishTitle: "Deterministic Document-to-Artifact Engine",
      lead: "문서를 읽는 순간부터, 다시 쓸 수 있는 지식으로 바꿉니다.",
      sections: [
        {
          title: "문서 파일을 재사용 가능한 아티팩트로",
          paragraphs: [
            "PDF, DOCX, HWP, CSV처럼 형식이 다른 문서는 내용이 같아 보여도 구조와 위치 정보가 제각각입니다. 한 번 읽고 버리는 텍스트로 바꾸면 표와 문단, 원문의 위치와 처리 이력이 쉽게 사라집니다.",
            "AlphaDocument는 디지털 문서를 결정론적인 Document Artifact(문서 아티팩트)로 변환합니다. 정규화된 내용과 구조, 원문 위치, 처리 기준과 무결성 정보가 하나의 아티팩트에 함께 담깁니다. 같은 문서와 같은 처리 기준은 같은 Document Artifact로 재현되므로, 문서 지식을 반복해서 사용할 수 있습니다.",
          ],
        },
        {
          title: "한 번 만든 문서 지식이 여러 기술에서 다시 쓰입니다",
          paragraphs: [
            "Document Artifact는 특정 화면이나 기능에 묶이지 않습니다. AlphaDoc Engine은 문서 맥락이 필요한 업무에 아티팩트를 활용하고, AlphaEvidence는 디지털 문서에서 들어온 근거의 출처와 구조를 이어받을 수 있습니다.",
            "출처가 보존된 아티팩트를 여러 업무가 공유하므로 문서를 매번 처음부터 해석할 필요가 없습니다. AlphaDocument는 바이오레의 문서 지식 기반입니다.",
          ],
        },
      ],
      figureTitle: "One document, many reusable contexts",
      figureCaption: "서로 다른 디지털 문서는 AlphaDocument에서 구조와 출처가 보존된 아티팩트가 됩니다. AlphaDoc Engine과 AlphaEvidence는 이 아티팩트를 각자의 목적에 맞게 다시 활용합니다.",
    },
    layer: {
      name: "AlphaLayer",
      englishTitle: "Protected Inference Gateway",
      lead: "AI를 실행하는 순간에도 의료 정보의 맥락과 통제를 놓치지 않습니다.",
      sections: [
        {
          title: "보호 원칙을 실행 구조에 담습니다",
          paragraphs: [
            "의료 AI의 보호는 입력창에서 몇 개의 문자열을 가리는 것으로 끝나지 않습니다. 어떤 업무를 위해 어떤 정보가 필요한지 확인하고, 외부 실행 전후의 경계를 하나의 구조로 통제해야 합니다.",
            "AlphaLayer는 AlphaDoc Engine과 외부 생성 모델 사이의 실행 경계를 담당하는 Protected Inference Gateway입니다. 등록된 업무 목적과 처리 조건을 확인하고, 필요한 정보만 남긴 요청만 실행 경계를 통과시킵니다. 외부 AI가 바뀌어도 바이오레가 정의한 보호 경계는 유지됩니다.",
          ],
        },
        {
          title: "요청과 응답, 실행의 증거까지 하나의 경계 안에서",
          paragraphs: [
            "AlphaLayer는 외부로 나가는 요청과 돌아오는 응답을 같은 실행 맥락에 묶습니다. 응답 무결성을 확인하고 어떤 보호 정책 아래 실행됐는지 기록합니다.",
            "실행 기록에는 원문을 남기지 않고 필요한 최소 정보만 담습니다. AlphaLayer는 바이오레의 AI 기능이 같은 보호 원칙 안에서 확장되도록 받치는 공통 실행 기반입니다.",
          ],
        },
      ],
      figureTitle: "Protection around every execution",
      figureCaption: "AlphaLayer 안에서 목적 확인, 정보 최소화, 조건을 충족한 외부 실행, 응답 무결성과 실행 기록이 함께 작동합니다. 보호 경계는 요청부터 응답까지 실행 전체를 둘러쌉니다.",
    },
  },
  en: {
    evidence: {
      name: "AlphaEvidence",
      englishTitle: "Evidence Foundation",
      lead: "Before searching evidence, we build a structure that makes evidence trustworthy.",
      sections: [
        {
          title: "A foundation built on evidence lineage",
          paragraphs: [
            "Medical literature does not become knowledge by volume alone. Where a paper came from, when it was observed, and what later changed must stay connected before that evidence can support the next judgment.",
            "AlphaEvidence connects the identity, provenance, and change history of literature and clinical guidelines. One lineage continues from the moment evidence enters the system to the moment it is used again.",
          ],
        },
        {
          title: "AlphaEvidence DB, the data layer that carries evidence lineage",
          paragraphs: [
            "AlphaEvidence DB is the data layer of the Evidence Foundation. Normalized literature, source and change records, rights context, quality, and freshness signals remain connected.",
            "AlphaDoc Engine receives evidence through this structure. Sources remain attached to questions, and new material expands its relationship with existing knowledge. The resulting lineage makes evidence retrieval stronger over time.",
          ],
        },
      ],
      figureTitle: "The AlphaEvidence evidence constellation",
      figureCaption: "AlphaEvidence uses AlphaEvidence DB as its data layer to connect source, change, rights context, and quality into a reviewable evidence lineage.",
      snapshotTitle: "AlphaEvidence DB, growing deeper every day",
    },
    engine: {
      name: "AlphaDoc Engine",
      englishTitle: "Medical Workflow Orchestration",
      lead: "We connect a question not only to an answer, but to the next medical task.",
      sections: [
        {
          title: "Medical work starts with purpose",
          paragraphs: [
            "The evidence, documents, tools, and result needed from AI change with the purpose of the work. AlphaDoc Engine distinguishes that purpose and context before choosing a model.",
            "Clinical questions, evidence discovery, document work, translation, and medical tools require different inputs, evidence, execution, and next actions. AlphaDoc Engine connects them as purpose-defined capabilities.",
          ],
        },
        {
          title: "Distinct technologies become one experience",
          paragraphs: [
            "AlphaDoc Engine receives source-bound evidence from AlphaEvidence, reads document context from AlphaDocument artifacts, and uses AlphaLayer when protected external execution is needed. The result returns to apps, tools, documents, and review inside Alphadoc.",
            "Release Identity records the code and behavior conditions used for an execution. Evaluation gates examine evidence fidelity, usefulness, and professional review separately while preserving what was executed.",
          ],
        },
      ],
      figureTitle: "Purpose-defined orchestration",
      figureCaption: "AlphaDoc Engine orchestrates questions, evidence, documents, protected AI execution, and professional review around the purpose of the work. It selects the technologies needed and connects the result back to the product and the next task.",
    },
    document: {
      name: "AlphaDocument",
      englishTitle: "Deterministic Document-to-Artifact Engine",
      lead: "From the moment a document is read, we turn it into reusable knowledge.",
      sections: [
        {
          title: "From document files to reusable artifacts",
          paragraphs: [
            "PDF, DOCX, HWP, and CSV files carry structure and source locations in different ways. Turning them into disposable text loses tables, blocks, anchors, and processing history.",
            "AlphaDocument transforms digital documents into deterministic Document Artifacts. Normalized content, structure, source locations, processing identity, and integrity travel together. The same document under the same processing identity is reproduced as the same Document Artifact.",
          ],
        },
        {
          title: "Document knowledge that works across technologies",
          paragraphs: [
            "A Document Artifact is not tied to one screen or feature. AlphaDoc Engine can use it for document-aware work, while AlphaEvidence can preserve the source and structure of evidence arriving through digital documents.",
            "Instead of interpreting the same document from scratch every time, Viore technologies share one provenance-carrying artifact. That is why AlphaDocument is more than a parser.",
          ],
        },
      ],
      figureTitle: "One document, many reusable contexts",
      figureCaption: "Different digital documents become provenance-carrying artifacts in AlphaDocument. AlphaDoc Engine and AlphaEvidence can reuse those artifacts for their own purposes.",
    },
    layer: {
      name: "AlphaLayer",
      englishTitle: "Protected Inference Gateway",
      lead: "Medical context and control remain intact at the moment AI executes.",
      sections: [
        {
          title: "Protection principles built into execution",
          paragraphs: [
            "Protecting medical AI does not end with masking a few strings. The system must understand why information is needed and control the boundary before and after external execution.",
            "AlphaLayer is the Protected Inference Gateway that governs the execution boundary between AlphaDoc Engine and external generation models. It checks registered purpose and processing conditions, then allows only requests reduced to necessary information through the execution boundary. External AI can change while Viore's protection boundary remains consistent.",
          ],
        },
        {
          title: "Request, response, and execution evidence in one boundary",
          paragraphs: [
            "AlphaLayer binds outbound requests and returning responses to the same execution context. It verifies response integrity and records the protection policy under which execution occurred.",
            "Execution records omit source content and retain only the minimum information needed. AlphaLayer is the shared execution foundation that lets Viore's AI capabilities expand under the same protection principles.",
          ],
        },
      ],
      figureTitle: "Protection around every execution",
      figureCaption: "Purpose, minimization, condition-governed external execution, response integrity, and execution evidence work together inside AlphaLayer. The protection boundary surrounds the full execution from request to response.",
    },
  },
} as const;

function TechnologySectionHeader({
  language,
  index,
  name,
  englishTitle,
  lead,
  status,
}: {
  language: Language;
  index: string;
  name: string;
  englishTitle: string;
  lead: string;
  status: TechnologyStatus;
}) {
  const labels = sharedCopy[language];
  const statusClass = status.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and");

  return (
    <header className="technology-section-header">
      <div className="technology-post-heading">
        <span className="technology-post-number">POST {index}</span>
        <div>
          <p className="technology-section-english">{englishTitle}</p>
          <h2>{name}</h2>
          <p className="technology-section-lead">{lead}</p>
        </div>
      </div>

      <dl className="technology-status-list">
        <div>
          <dt>{labels.status}</dt>
          <dd><span className={`technology-status technology-status-${statusClass}`}>{status}</span></dd>
        </div>
        <div>
          <dt>{labels.verified}</dt>
          <dd><time dateTime={VERIFIED_DATE}>{VERIFIED_DATE}</time></dd>
        </div>
      </dl>
    </header>
  );
}

function TechnologyFigure({
  language,
  number,
  kind,
  title,
  caption,
}: {
  language: Language;
  number: string;
  kind: TechnologyMotionKind;
  title: string;
  caption: string;
}) {
  return (
    <figure className={`technology-figure technology-figure-${kind}`}>
      <div className="technology-figure-heading" aria-hidden="true">
        <span>FIG. {number}</span>
        <p>{title}</p>
      </div>
      <TechnologyMotion kind={kind} language={language} />
      <figcaption>
        <strong>{sharedCopy[language].figure} {number}</strong>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}

function ProseSections({
  sections,
}: {
  sections: ReadonlyArray<{
    title: string;
    paragraphs: readonly string[];
  }>;
}) {
  return (
    <>
      {sections.map((section) => (
        <section key={section.title}>
          <h3>{section.title}</h3>
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>
      ))}
    </>
  );
}

export function TechnologyPage({
  language,
  snapshotResult,
}: {
  language: Language;
  snapshotResult: AlphaEvidenceSnapshotResult;
}) {
  const page = sharedCopy[language];
  const articles = articleCopy[language];

  return (
    <div className="technology-journal" lang={language}>
      <header className="technology-hero" id="technology-overview">
        <div className="technology-hero-meta">
          <span>{page.journal}</span>
          <p><time dateTime="2026-07-21">{page.published}</time><small>{page.updated}</small></p>
        </div>

        <h1>{page.hero}</h1>
        <p className="technology-hero-author">{page.author}</p>

        <div className="technology-intro-copy">
          {page.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <blockquote>
            <span>{page.quote.first}</span>
            <strong>{page.quote.second}</strong>
          </blockquote>
          <p className="technology-intro-emphasis">{page.introClose}</p>
        </div>

        <TechnologyFigure
          language={language}
          number="01"
          kind="overview"
          title={language === "ko" ? "Viore technology constellation" : "Viore technology constellation"}
          caption={language === "ko"
            ? "AlphaDoc Engine을 중심으로 현재 공개된 AlphaEvidence, AlphaDocument, AlphaLayer와 Alphadoc이 각자의 책임을 유지한 채 상호작용합니다. 새로운 기술도 같은 연결 원칙 위에 더해지며, 업무 목적에 따라 필요한 기술이 선택되고 다시 연결됩니다."
            : "The technologies currently presented—AlphaEvidence, AlphaDocument, AlphaLayer, and Alphadoc—interact around AlphaDoc Engine while retaining distinct responsibilities. New technologies can be added through the same connection principles as the system continues to expand."}
        />
      </header>

      <TechnologyArticleNav language={language} />

      <main className="technology-article-stream">
        <article id="technology-alphaevidence" className="technology-post" data-tech-status="developed-integrated">
          <TechnologySectionHeader
            language={language}
            index="01"
            name={articles.evidence.name}
            englishTitle={articles.evidence.englishTitle}
            lead={articles.evidence.lead}
            status="DEVELOPED & INTEGRATED"
          />
          <div className="technology-prose">
            <ProseSections sections={articles.evidence.sections} />
            <TechnologyFigure
              language={language}
              number="02"
              kind="evidence"
              title={articles.evidence.figureTitle}
              caption={articles.evidence.figureCaption}
            />
            <section className="technology-data-section">
              <h3>{articles.evidence.snapshotTitle}</h3>
              <AlphaEvidenceSnapshot initialResult={snapshotResult} language={language} />
            </section>
          </div>
        </article>

        <article id="technology-alphadoc-engine" className="technology-post" data-tech-status="developed-integrated">
          <TechnologySectionHeader
            language={language}
            index="02"
            name={articles.engine.name}
            englishTitle={articles.engine.englishTitle}
            lead={articles.engine.lead}
            status="DEVELOPED & INTEGRATED"
          />
          <div className="technology-prose">
            <ProseSections sections={articles.engine.sections} />
            <TechnologyFigure
              language={language}
              number="03"
              kind="engine"
              title={articles.engine.figureTitle}
              caption={articles.engine.figureCaption}
            />
          </div>
        </article>

        <article id="technology-alphadocument" className="technology-post" data-tech-status="developed-integrated">
          <TechnologySectionHeader
            language={language}
            index="03"
            name={articles.document.name}
            englishTitle={articles.document.englishTitle}
            lead={articles.document.lead}
            status="DEVELOPED & INTEGRATED"
          />
          <div className="technology-prose">
            <ProseSections sections={articles.document.sections} />
            <TechnologyFigure
              language={language}
              number="04"
              kind="document"
              title={articles.document.figureTitle}
              caption={articles.document.figureCaption}
            />
          </div>
        </article>

        <article id="technology-alphalayer" className="technology-post" data-tech-status="developed-integrated">
          <TechnologySectionHeader
            language={language}
            index="04"
            name={articles.layer.name}
            englishTitle={articles.layer.englishTitle}
            lead={articles.layer.lead}
            status="DEVELOPED & INTEGRATED"
          />
          <div className="technology-prose">
            <ProseSections sections={articles.layer.sections} />
            <TechnologyFigure
              language={language}
              number="05"
              kind="layer"
              title={articles.layer.figureTitle}
              caption={articles.layer.figureCaption}
            />
          </div>
        </article>
      </main>
    </div>
  );
}
