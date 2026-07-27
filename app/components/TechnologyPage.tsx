import type { AlphaEvidenceSnapshotResult } from "@/app/alphaevidence-snapshot";
import { AlphaEvidenceSnapshot } from "@/app/components/AlphaEvidenceSnapshot";
import { TechnologyArticleNav } from "@/app/components/TechnologyArticleNav";
import { TechnologyMotion, type TechnologyMotionKind } from "@/app/components/TechnologyMotion";
import type { Language } from "@/app/site-content";

type TechnologyStatus =
  | "implemented-foundation"
  | "implemented-capability"
  | "release-in-review"
  | "integration-in-review"
  | "selected-path-active";

const VERIFIED_DATE = "2026-07-27";

const sharedCopy = {
  ko: {
    journal: "Journal",
    published: "2026년 7월 21일",
    updated: "2026년 7월 27일 업데이트",
    hero: <>우리만의 선형을<br />만드는 과정</>,
    author: "Viore Team",
    status: "상태",
    verified: "최근 검증",
    figure: "그림",
    statuses: {
      "implemented-foundation": "구현된 기반",
      "implemented-capability": "구현된 기능",
      "release-in-review": "구현 · 출시 검토 중",
      "integration-in-review": "구현 · 통합 검토 중",
      "selected-path-active": "구현 · 선택 경로 운영 중",
    },
    intro: [
      "의료 AI는 하나의 거대한 모델만으로 완성되지 않습니다. 좋은 근거가 어디에서 왔는지 기억하는 기반, 문서와 이미지를 다시 쓸 수 있는 아티팩트로 바꾸는 기술, 업무의 목적에 따라 실행을 조율하는 지능, 그리고 외부 실행을 보호하는 경계가 함께 움직여야 합니다.",
      "현재 AlphaEvidence와 AlphaDoc Engine은 각각 구현된 기반과 기능입니다. AlphaDocument는 출시 검토 중이고, AlphaImage는 정적 이미지 아티팩트 구현을 마치고 Alphadoc 사용자 workflow 통합을 검토하고 있습니다. AlphaLayer는 선택된 보호 텍스트 경로에서 동작합니다. 바이오레는 이 상태를 하나의 ‘완성’으로 묶지 않고 구분해 공개합니다.",
      "각 기술은 책임을 분리한 채 연결됩니다. 새로운 근거는 지식의 맥락을 넓히고, 문서와 이미지는 재사용 가능한 아티팩트가 됩니다. 외부 AI 실행이 필요한 선택 경로에는 독립된 보호 경계를 적용합니다.",
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
    updated: "Updated July 27, 2026",
    hero: <>How we build<br />our own technology system</>,
    author: "Viore Team",
    status: "Status",
    verified: "Last verified",
    figure: "Figure",
    statuses: {
      "implemented-foundation": "IMPLEMENTED FOUNDATION",
      "implemented-capability": "IMPLEMENTED CAPABILITY",
      "release-in-review": "IMPLEMENTED · RELEASE IN REVIEW",
      "integration-in-review": "IMPLEMENTED · INTEGRATION IN REVIEW",
      "selected-path-active": "IMPLEMENTED · SELECTED PATHS ACTIVE",
    },
    intro: [
      "Medical AI does not come from one large model alone. It needs a foundation that remembers where evidence came from, technology that turns documents and images into reusable artifacts, intelligence that orchestrates execution around purpose, and a boundary that protects external execution.",
      "AlphaEvidence and AlphaDoc Engine are implemented as a foundation and a product capability. AlphaDocument is under release review. AlphaImage's static-image artifact technology is implemented, while activation in Alphadoc user workflows remains under integration review. AlphaLayer operates on selected protected text paths. Viore reports these states separately rather than presenting them as one completed rollout.",
      "Each technology keeps a distinct responsibility while connecting through explicit contracts. New evidence expands knowledge context, documents and images become reusable artifacts, and selected external AI paths use a separate protection boundary.",
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
            "AlphaEvidence에서 출처가 연결된 근거를 받습니다. 문서와 이미지 맥락이 필요한 업무에는 AlphaDocument와 AlphaImage 아티팩트를 연결하고, 외부 AI가 필요한 일부 보호 텍스트 경로에는 AlphaLayer 경계를 적용합니다. 각 연결은 구현과 제품 통합 상태를 구분해 확장합니다.",
            "Release Identity는 실행에 사용된 코드와 동작 조건을 구분해 남깁니다. 평가 게이트는 근거의 충실도, 결과의 쓸모와 의료인의 검토 항목을 따로 살핍니다. 여러 기준을 평균 점수 하나로 뭉개지 않고, 무엇이 실행됐는지도 함께 추적합니다.",
          ],
        },
      ],
      figureTitle: "Purpose-defined orchestration",
      figureCaption: "AlphaDoc Engine은 질문, 근거, 문서·이미지 아티팩트, 선택된 보호 AI 실행 경로와 사용자 검토를 업무 목적에 맞게 조율합니다. 각 기술의 통합 상태에 따라 결과를 제품과 다음 작업에 연결합니다.",
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
            "Document Artifact는 특정 화면이나 기능에 묶이지 않는 계약으로 구현되어 있습니다. AlphaDoc Engine과 AlphaEvidence는 문서 맥락과 출처 구조가 필요한 업무에 이 아티팩트를 활용할 수 있습니다.",
            "출처가 보존된 하나의 아티팩트를 여러 업무에서 재사용하는 것이 AlphaDocument의 목표입니다. 엔진 구현은 완료됐고 제품 출시는 검토 중입니다.",
          ],
        },
      ],
      figureTitle: "One document, many reusable contexts",
      figureCaption: "서로 다른 디지털 문서는 AlphaDocument에서 구조와 출처가 보존된 아티팩트가 됩니다. AlphaDoc Engine과 AlphaEvidence는 이를 각자의 목적에 맞게 활용할 수 있습니다.",
    },
    image: {
      name: "AlphaImage",
      englishTitle: "Deterministic Image Artifact Compiler",
      lead: "이미지를 해석하기 전에, 안전하고 다시 쓸 수 있는 Image Artifact로 만듭니다.",
      sections: [
        {
          title: "정적 이미지를 검증 가능한 아티팩트로",
          paragraphs: [
            "같은 이미지라도 파일 형식, 방향, 해상도와 좌표계가 다르면 후속 작업은 서로 다른 입력을 보게 됩니다. 원본과 파생 이미지를 따로 다루면 어느 변환에서 무엇이 바뀌었는지도 잃기 쉽습니다.",
            "AlphaImage는 허용된 정적 이미지 입력을 안전하게 확인하고, 픽셀 표현과 방향·좌표계를 일관된 구조로 정규화합니다. 원본과 처리 기준, 파생 표현의 무결성을 묶은 불변 Image Artifact가 만들어지므로 같은 입력을 같은 기준으로 다시 사용할 수 있습니다.",
          ],
        },
        {
          title: "좌표와 주석의 계보를 그대로 이어갑니다",
          paragraphs: [
            "경계 상자, 다각형, 마스크처럼 이미 존재하는 주석은 원본 좌표에서 정규화 좌표로 연결되고, 어떤 원천과 검토 상태에서 왔는지도 함께 남습니다. AlphaImage는 주석 형식과 좌표를 검증하지만 임상적 참·거짓을 대신 판단하지 않습니다.",
            "AlphaImage는 판독 모델이나 진단 기능이 아니라 이미지 기반 업무가 같은 표현·좌표·계보를 공유하도록 만드는 기반입니다. 기술 구현은 완료됐고, Alphadoc 사용자 workflow와의 연결은 통합 검토 중입니다.",
          ],
        },
      ],
      figureTitle: "One image, one verifiable coordinate system",
      figureCaption: "AlphaImage는 허용된 정적 이미지를 안전한 표현으로 정규화하고, 원본·좌표 변환·기존 주석·무결성 정보를 Image Artifact에 연결합니다. 결과는 분석이나 진단이 아니라 후속 workflow가 재사용할 수 있는 검증 가능한 이미지 기반입니다.",
    },
    layer: {
      name: "AlphaLayer",
      englishTitle: "Protected Inference Gateway",
      lead: "선택된 외부 AI 실행을 하나의 보호 경계 안에서 통제합니다.",
      sections: [
        {
          title: "선택된 보호 경로에서 실제로 작동합니다",
          paragraphs: [
            "의료 AI의 보호는 입력창에서 몇 개의 문자열을 가리는 것으로 끝나지 않습니다. 어떤 업무를 위해 어떤 정보가 필요한지 확인하고, 외부 실행 전후의 경계를 하나의 구조로 통제해야 합니다.",
            "AlphaLayer는 AlphaDoc Engine과 외부 생성 모델 사이의 실행 경계를 담당하는 Protected Inference Gateway입니다. 등록된 업무 목적과 요청 조건을 확인하고, 민감정보를 정책에 따라 변환해 필요한 정보만 남깁니다. 조건을 충족하지 못한 요청은 외부 실행 전에 차단됩니다.",
          ],
        },
        {
          title: "요청부터 응답까지, 실행 맥락을 하나로 묶습니다",
          paragraphs: [
            "AlphaLayer는 외부로 나가는 요청과 돌아오는 응답을 같은 실행 맥락에 묶습니다. 응답 무결성을 확인하고, 원문 대신 어떤 보호 조건 아래 실행됐는지 필요한 최소 정보만 기록합니다.",
            "현재 Alphadoc의 선택된 보호 텍스트 경로가 AlphaLayer에 연결돼 있습니다. 이는 모든 기능이 자동으로 보호됐다는 의미가 아니며, 전체 서비스 적용·환자정보 처리 준비·법적 적합성 확인을 뜻하지 않습니다.",
          ],
        },
      ],
      figureTitle: "Selected execution paths, one protected boundary",
      figureCaption: "AlphaLayer는 선택된 보호 텍스트 경로에서 목적과 요청 조건을 확인하고, 정보 최소화와 정책 변환을 거친 실행만 외부 경계로 보냅니다. 응답 무결성과 원문 없는 최소 실행 기록까지 같은 맥락에 연결됩니다.",
    },
    seal: {
      name: "AlphaSeal",
      englishTitle: "End-to-End Conversation Seal",
      lead: "의료인 간 대화를, 서버도 열지 못하는 종단간 암호화로 봉인합니다.",
      sections: [
        {
          title: "대화의 주인은 대화한 두 사람뿐",
          paragraphs: [
            "쪽지 보호는 전송 구간만 암호화하는 것으로 끝나지 않습니다. 서버가 내용을 복호화할 수 있다면, 보관과 운영의 모든 지점이 신뢰의 대상이 됩니다. AlphaSeal은 그 전제를 바꿉니다.",
            "대화마다 별도의 키를 만들어 참여한 두 사람의 신원 키로만 봉인합니다. 서버는 암호문과 최소한의 전달 정보만 보관하며, 대화 내용을 읽지 못합니다. 개인 키는 브라우저의 보안 저장소에 non-extractable 형태로 두어, 악성 스크립트가 침입해도 키 자체를 꺼내 갈 수 없습니다.",
          ],
        },
        {
          title: "위변조는 드러나고, 지난 대화는 기기를 넘어 이어집니다",
          paragraphs: [
            "각 쪽지는 어느 대화의, 누가 보낸, 몇 번째 메시지인지에 암호학적으로 묶입니다. 서버가 순서를 바꾸거나 다른 자리에 옮기면 복호화 단계에서 곧바로 드러납니다. 대화 키는 일정 주기로 자동 교체되어, 한 시점의 키가 노출돼도 그 구간 밖으로 영향이 번지지 않습니다.",
            "기기를 바꾸거나 데이터가 지워져도 지난 쪽지는 잃지 않습니다. 대화 키를 사용자만 가진 키로 봉인해 백업하고, 생체인증 또는 복구 코드로 새 기기에서 되살립니다. 백업은 서버에 있어도 서버가 열 수 없습니다. 그룹 대화 암호화와 완전한 순방향 비밀성은 이 경계에 포함되지 않으며, 메타데이터 비공개나 환자정보 처리 적합성을 뜻하지 않습니다.",
          ],
        },
      ],
      figureTitle: "One conversation, sealed end to end",
      figureCaption: "AlphaSeal은 대화별 키를 참여자 신원 키로 봉인해 두 기기에서만 열리게 하고, 서버에는 읽을 수 없는 암호문만 남깁니다. 위변조 감지와 사용자 키 기반 백업으로, 대화의 무결성과 기기 이전 복원을 같은 경계 안에서 보장합니다.",
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
            "AlphaDoc Engine receives source-bound evidence from AlphaEvidence. Workflows that need document or image context can connect to AlphaDocument and AlphaImage artifacts, while selected protected text paths use the AlphaLayer boundary. Each connection expands according to its verified implementation and product-integration state.",
            "Release Identity records the code and behavior conditions used for an execution. Evaluation gates examine evidence fidelity, usefulness, and professional review separately while preserving what was executed.",
          ],
        },
      ],
      figureTitle: "Purpose-defined orchestration",
      figureCaption: "AlphaDoc Engine orchestrates questions, evidence, document and image artifacts, selected protected AI execution paths, and user review around the purpose of the work. Connections expand according to each technology's integration state.",
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
            "A Document Artifact is implemented as a contract independent of any one screen or feature. AlphaDoc Engine and AlphaEvidence can use the artifact where document context and source structure are required.",
            "AlphaDocument's goal is to let multiple workflows reuse one provenance-carrying artifact instead of interpreting the same document from scratch. Engine implementation is complete, while product release remains under review.",
          ],
        },
      ],
      figureTitle: "One document, many reusable contexts",
      figureCaption: "Different digital documents become provenance-carrying artifacts in AlphaDocument. AlphaDoc Engine and AlphaEvidence can use them for their respective purposes.",
    },
    image: {
      name: "AlphaImage",
      englishTitle: "Deterministic Image Artifact Compiler",
      lead: "Before interpreting an image, we turn it into a safe, reusable Image Artifact.",
      sections: [
        {
          title: "From static images to verifiable artifacts",
          paragraphs: [
            "The same image can appear different to downstream systems when file format, orientation, resolution, or coordinate space changes. Treating source and derivative images separately also makes it easy to lose what changed at each transformation.",
            "AlphaImage safely validates supported static image inputs and normalizes pixel representations, orientation, and coordinate systems into one consistent structure. The resulting immutable Image Artifact binds the source, processing identity, derivative representations, and integrity so the same input can be reused under the same rules.",
          ],
        },
        {
          title: "Coordinate and annotation lineage stays connected",
          paragraphs: [
            "Existing bounding boxes, polygons, and masks are mapped from source coordinates into normalized coordinates while retaining their origin and declared review state. AlphaImage validates annotation format and geometry without deciding whether a clinical assertion is true.",
            "AlphaImage is not a reading model or diagnostic feature. It is the foundation that lets image-based workflows share the same representations, coordinates, and lineage. The technology is implemented, while activation in Alphadoc user workflows remains under integration review.",
          ],
        },
      ],
      figureTitle: "One image, one verifiable coordinate system",
      figureCaption: "AlphaImage normalizes supported static images into safe representations and binds the source, coordinate transforms, existing annotations, and integrity inside an Image Artifact. The output is not an analysis or diagnosis, but a verifiable image foundation for downstream workflows.",
    },
    layer: {
      name: "AlphaLayer",
      englishTitle: "Protected Inference Gateway",
      lead: "Selected external AI executions operate inside one protected boundary.",
      sections: [
        {
          title: "Protection operating on selected paths",
          paragraphs: [
            "Protecting medical AI does not end with masking a few strings. The system must understand why information is needed and control the boundary before and after external execution.",
            "AlphaLayer is the Protected Inference Gateway between AlphaDoc Engine and external generation models. It checks registered purpose and request conditions, transforms sensitive information under policy, and retains only what the execution needs. Requests that fail those conditions are blocked before external execution.",
          ],
        },
        {
          title: "One execution context from request to response",
          paragraphs: [
            "AlphaLayer binds outbound requests and returning responses to the same execution context. It verifies response integrity and records only the minimum information needed to identify the protection conditions, without retaining source content.",
            "Selected protected text paths in Alphadoc now run through AlphaLayer. This does not mean every feature is covered, and it does not represent full-service rollout, patient-information processing readiness, or legal suitability.",
          ],
        },
      ],
      figureTitle: "Selected execution paths, one protected boundary",
      figureCaption: "For selected protected text paths, AlphaLayer checks purpose and request conditions, applies minimization and policy transformation, and permits only conforming external execution. Response integrity and a source-free minimal execution record remain bound to the same context.",
    },
    seal: {
      name: "AlphaSeal",
      englishTitle: "End-to-End Conversation Seal",
      lead: "Seals conversations between clinicians with end-to-end encryption the server cannot open.",
      sections: [
        {
          title: "A conversation belongs only to the two who share it",
          paragraphs: [
            "Protecting messages does not end with encrypting the transport link. If the server can decrypt the content, every point of storage and operation becomes something to trust. AlphaSeal changes that premise.",
            "Each conversation gets its own key, sealed only to the identity keys of the two participants. The server holds ciphertext and minimal delivery data, and cannot read the content. Private keys live in the browser's secure store as non-extractable keys, so even a script that breaks in cannot take the key itself.",
          ],
        },
        {
          title: "Tampering shows, and past conversations follow you across devices",
          paragraphs: [
            "Each message is cryptographically bound to which conversation, which sender, and which position it holds. If the server reorders or relocates it, that surfaces immediately at decryption. Conversation keys rotate on a regular cadence, so exposure at one point does not spread beyond that window.",
            "Switching or wiping a device does not lose past messages. Conversation keys are backed up sealed under a key only the user holds, and restored on a new device with biometrics or a recovery code. The backup cannot be opened by the server even though it resides there. Group-conversation encryption and perfect forward secrecy are not part of this boundary, and it does not imply metadata confidentiality or patient-information suitability.",
          ],
        },
      ],
      figureTitle: "One conversation, sealed end to end",
      figureCaption: "AlphaSeal seals each conversation key to the participants' identity keys so it opens only on the two devices, leaving the server unreadable ciphertext. Tamper detection and user-key backup keep conversation integrity and cross-device restore within the same boundary.",
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
  const statusClass = status;

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
          <dd><span className={`technology-status technology-status-${statusClass}`}>{labels.statuses[status]}</span></dd>
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
            ? "AlphaEvidence와 AlphaDoc Engine은 구현된 기반과 기능, AlphaDocument는 출시 검토, AlphaImage는 통합 검토, AlphaLayer는 선택 경로 운영 상태입니다. 각 기술은 상태와 책임을 구분한 채 명시적인 연결 계약으로 이어집니다."
            : "AlphaEvidence and AlphaDoc Engine are implemented as a foundation and capability. AlphaDocument is under release review, AlphaImage is under integration review, and AlphaLayer operates on selected paths. Explicit contracts connect them while preserving distinct status and responsibility."}
        />
      </header>

      <TechnologyArticleNav language={language} />

      <main className="technology-article-stream">
        <article id="technology-alphaevidence" className="technology-post" data-tech-status="implemented-foundation">
          <TechnologySectionHeader
            language={language}
            index="01"
            name={articles.evidence.name}
            englishTitle={articles.evidence.englishTitle}
            lead={articles.evidence.lead}
            status="implemented-foundation"
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

        <article id="technology-alphadoc-engine" className="technology-post" data-tech-status="implemented-capability">
          <TechnologySectionHeader
            language={language}
            index="02"
            name={articles.engine.name}
            englishTitle={articles.engine.englishTitle}
            lead={articles.engine.lead}
            status="implemented-capability"
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

        <article id="technology-alphadocument" className="technology-post" data-tech-status="release-in-review">
          <TechnologySectionHeader
            language={language}
            index="03"
            name={articles.document.name}
            englishTitle={articles.document.englishTitle}
            lead={articles.document.lead}
            status="release-in-review"
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

        <article id="technology-alphaimage" className="technology-post" data-tech-status="integration-in-review">
          <TechnologySectionHeader
            language={language}
            index="04"
            name={articles.image.name}
            englishTitle={articles.image.englishTitle}
            lead={articles.image.lead}
            status="integration-in-review"
          />
          <div className="technology-prose">
            <ProseSections sections={articles.image.sections} />
            <TechnologyFigure
              language={language}
              number="05"
              kind="image"
              title={articles.image.figureTitle}
              caption={articles.image.figureCaption}
            />
          </div>
        </article>

        <article id="technology-alphalayer" className="technology-post" data-tech-status="selected-path-active">
          <TechnologySectionHeader
            language={language}
            index="05"
            name={articles.layer.name}
            englishTitle={articles.layer.englishTitle}
            lead={articles.layer.lead}
            status="selected-path-active"
          />
          <div className="technology-prose">
            <ProseSections sections={articles.layer.sections} />
            <TechnologyFigure
              language={language}
              number="06"
              kind="layer"
              title={articles.layer.figureTitle}
              caption={articles.layer.figureCaption}
            />
          </div>
        </article>

        <article id="technology-alphaseal" className="technology-post" data-tech-status="implemented-capability">
          <TechnologySectionHeader
            language={language}
            index="06"
            name={articles.seal.name}
            englishTitle={articles.seal.englishTitle}
            lead={articles.seal.lead}
            status="implemented-capability"
          />
          <div className="technology-prose">
            <ProseSections sections={articles.seal.sections} />
            {/* 전용 다이어그램은 후속 디자인 작업. 확정 전까지 도형 없이 산문만 노출한다. */}
          </div>
        </article>
      </main>
    </div>
  );
}
