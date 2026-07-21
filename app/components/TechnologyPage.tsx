import type { AlphaEvidenceSnapshotResult } from "@/app/alphaevidence-snapshot";
import { AlphaEvidenceSnapshot } from "@/app/components/AlphaEvidenceSnapshot";
import { TechnologyArticleNav } from "@/app/components/TechnologyArticleNav";
import { TechnologyMotion } from "@/app/components/TechnologyMotion";

type TechnologyStatus = "IN PRODUCTION" | "CONTROLLED WORKFLOWS" | "ARCHITECTURE IN DEVELOPMENT";
type TechnologyDiagramKind = "overview" | "evidence" | "engine" | "evaluation" | "document" | "layer";

const VERIFIED_DATE = "2026-07-20";
const MFDS_GUIDANCE_URL = "https://www.mfds.go.kr/brd/m_1060/view.do?Data_stts_gubun=C1004&company_cd=&company_nm=&itm_seq_1=0&itm_seq_2=0&multi_itm_seq=0&page=3&seq=15879&srchFr=&srchTo=&srchTp=0&srchWord=";

function TechnologySectionHeader({
  index,
  name,
  englishTitle,
  lead,
  status,
}: {
  index: string;
  name: string;
  englishTitle?: string;
  lead: string;
  status: TechnologyStatus;
}) {
  const statusClass = status.toLowerCase().replaceAll(" ", "-");

  return (
    <header className="technology-section-header">
      <div className="technology-post-heading">
        <span className="technology-post-number">POST {index}</span>
        <div>
          {englishTitle && <p className="technology-section-english">{englishTitle}</p>}
          <h2>{name}</h2>
          <p className="technology-section-lead">{lead}</p>
        </div>
      </div>

      <dl className="technology-status-list">
        <div>
          <dt>Status</dt>
          <dd><span className={`technology-status technology-status-${statusClass}`}>{status}</span></dd>
        </div>
        <div>
          <dt>Last verified</dt>
          <dd><time dateTime={VERIFIED_DATE}>{VERIFIED_DATE}</time></dd>
        </div>
      </dl>
    </header>
  );
}

function TechnologyFigure({
  number,
  kind,
  title,
  caption,
}: {
  number: string;
  kind: TechnologyDiagramKind;
  title: string;
  caption: string;
}) {
  return (
    <figure className={`technology-figure technology-figure-${kind}`}>
      <div className="technology-figure-heading" aria-hidden="true">
        <span>FIG. {number}</span>
        <p>{title}</p>
      </div>
      <TechnologyMotion kind={kind} />
      <figcaption><strong>Figure {number}</strong><span>{caption}</span></figcaption>
    </figure>
  );
}

export function TechnologyPage({
  snapshotResult,
}: {
  snapshotResult: AlphaEvidenceSnapshotResult;
}) {
  return (
    <div className="technology-journal" lang="ko">
      <header className="technology-hero" id="technology-overview">
        <div className="technology-hero-meta">
          <span>Journal</span>
          <time dateTime="2026-07-21">July 21, 2026</time>
        </div>

        <h1>우리만의 선형을<br />만드는 과정</h1>
        <p className="technology-hero-author">Viore Team</p>

        <div className="technology-intro-copy">
          <p>모든 산업에는 변화 이전과 이후를 가르는 순간이 있습니다. 그러나 그 변화는 새로운 기술 하나가 기존의 모든 것을 지우며 시작되지 않습니다.</p>
          <p>오랜 시간 축적된 기술과 전문성이 하나의 더 큰 구조 안에서 연결될 때, 흩어진 점들은 선이 되고 이전에는 없던 새로운 형태가 만들어집니다. 바이오레는 그것을 새로운 선형이라 부릅니다.</p>
          <p>아이폰은 전화와 음악, 인터넷을 하나의 인터페이스로 연결했습니다. 테슬라는 자동차와 소프트웨어를 하나의 지속적인 생애주기로 연결했습니다. SpaceX는 발사와 회수, 재사용을 하나의 반복 가능한 시스템으로 연결했습니다.</p>
          <p>그들이 바꾼 것은 개별 기술이 아니었습니다. 기술들이 함께 작동하는 방식이었습니다.</p>
          <p className="technology-intro-emphasis">이제 의료계에도 새로운 선형이 필요합니다.</p>
          <p>바이오레는 의료인의 전문성을 바꾸려 하지 않습니다. 그 전문성을 둘러싼 디지털 환경을 바꾸려 합니다.</p>
          <p>기존 시스템의 가치를 유지하면서도 지식과 도구, 문서와 데이터, 사람과 조직이 하나의 경험 안에서 작동하도록 연결하는 것. 새로운 AI와 애플리케이션이 그 위에서 계속 확장될 수 있는 의료의 상위 운영 계층을 만드는 것.</p>
          <blockquote>
            <span>모든 것을 하나에 가두는 All-in-One이 아니라,</span>
            <strong>모든 것이 함께 작동하게 하는 One Operating Layer.</strong>
          </blockquote>
          <p>그것이 바이오레가 만들고 있는 Medical OS, 그리고 우리가 의료계에 그리고자 하는 새로운 선형입니다.</p>
        </div>

        <TechnologyFigure
          number="01"
          kind="overview"
          title="Viore technology at a glance"
          caption="의학 문헌과 진료지침, 질문과 업무 의도가 각자의 경계를 지나 AlphaDoc Engine에서 만납니다. 실선은 현재 흐름을, 점선과 빈 원은 통제 또는 개발 중인 확장 관계를 뜻합니다."
        />
      </header>

      <TechnologyArticleNav />

      <main className="technology-article-stream">
        <article id="technology-alphaevidence" className="technology-post" data-tech-status="in-production">
          <TechnologySectionHeader
            index="01"
            name="AlphaEvidence"
            englishTitle="Verified evidence and automation for LLM"
            lead="LLM을 위한 검증된 증거와 자동화"
            status="IN PRODUCTION"
          />

          <div className="technology-prose">
            <section>
              <h3>검색은 이미 늦은 단계입니다</h3>
              <p>의료 AI를 설명할 때는 흔히 검색 정확도부터 꺼냅니다. 하지만 검색은 저장된 것만 고릅니다. 출처가 어디였는지, 원문이 언제 바뀌었는지, 어떤 이용 조건으로 들어왔는지가 사라지고 나면 더 좋은 모델을 붙여도 지난 이력을 되살리기 어렵습니다.</p>
              <p>AlphaEvidence는 바로 그 앞단을 맡습니다. 허용된 출처만 정해진 범위에서 수집하고, 같은 논문은 안정된 레코드로 맞춥니다. 수집 당시의 원본 hash, 정규화 결과, parser version, 이용 정책 판단도 함께 남습니다. 같은 자료를 다시 만났다고 그대로 넘기지 않습니다. 단순 중복인지, 출처가 수정됐는지, 처리 규칙이 바뀌었는지를 가립니다.</p>
              <p>여기서 문헌은 검색 결과 한 줄로 끝나지 않습니다. 출처와 변환 과정, 지금 다시 확인할 수 있는지까지 하나의 기록으로 이어집니다. AlphaDoc Engine은 이 계약에 따라 근거를 받습니다. 답변 모델이 출처 이력을 임의로 만들어내지 못하게 막는 경계이기도 합니다.</p>
            </section>

            <section>
              <h3>권리를 추정하지 않고, 판단 시점을 남깁니다</h3>
              <p>AlphaEvidence의 rights snapshot은 저작권 문제가 모두 해결됐다는 표시가 아닙니다. 각 레코드를 들여오던 시점에 확인한 이용 정책, 허용 범위, 저장·노출 수준을 남긴 운영 기록입니다. 원문이나 파생 데이터는 명시적으로 허용된 범위 안에서만 다룹니다. 조건이 불명확하거나 제한된 자료라면 메타데이터와 원문 링크를 중심으로 남깁니다.</p>
              <p>정책이 바뀌어도 과거 판단을 덮어쓰지 않습니다. 나중에 재검토하거나 삭제 요청을 처리하려면 언제, 어떤 근거로 다뤘는지가 남아 있어야 합니다.</p>
            </section>

            <TechnologyFigure
              number="02"
              kind="evidence"
              title="AlphaEvidence ingestion and provenance"
              caption="목적이 다른 출처는 독립 stream과 cursor로 움직입니다. 모든 쓰기는 하나의 ingestion gateway를 지나 canonical record, 출처·변경 관찰, rights snapshot으로 나뉘며, 이 기록을 지우지 않은 versioned contract가 AlphaDoc Engine으로 전달됩니다."
            />

            <section className="technology-data-section">
              <h3>시간과 함께 커지는 지식</h3>
              <AlphaEvidenceSnapshot initialResult={snapshotResult} />
            </section>
          </div>
        </article>

        <article id="technology-alphadoc-engine" className="technology-post" data-tech-status="in-production">
          <TechnologySectionHeader
            index="02"
            name="AlphaDoc Engine"
            lead="의료 특화 Workflow Orchestration"
            status="IN PRODUCTION"
          />

          <div className="technology-prose">
            <section>
              <h3>같은 모델도 같은 시스템은 아닙니다</h3>
              <p>의료 AI는 모델 이름 하나로 작동 방식을 설명할 수 없습니다. 같은 모델을 써도 검색 정책, prompt pipeline, 추론 설정, 문서 처리 규칙, guardrail에 따라 결과가 나온 조건이 달라집니다. 무엇을 실행하려 했는지조차 분명하지 않다면 변경 전후를 비교하기 어렵습니다. 문제가 생긴 뒤 당시 조건을 재구성하기도 힘듭니다.</p>
              <p>AlphaDoc Engine은 기능을 provider 호출 목록으로 세지 않습니다. 각 능력에는 고유한 capability ID가 있습니다. 목적, 실행 방식, 허용 입력, 근거 정책, model 필요 여부는 하나의 계약으로 묶입니다. 공식 문서 작성, 원문 종속 번역, 일반 생성, SOAP, 근거 검색은 이름만 바꾼 prompt가 아닙니다. 저마다 실행 경계가 다릅니다.</p>
              <p>새 provider 호출을 넣으려면 먼저 어느 capability에 속하는지 선언해야 합니다. 등록되지 않은 경로는 범용 생성으로 조용히 빠질 수 없습니다. 기능이 늘어날수록 이 작은 registry의 역할도 커집니다. 모델을 몇 개 더 붙이기에 앞서, 각 모델이 무엇을 해도 되는지 코드로 남깁니다.</p>
            </section>

            <TechnologyFigure
              number="03"
              kind="engine"
              title="Capability contract and execution path"
              caption="업무 의도는 Capability Registry에서 등록된 계약을 찾습니다. contract가 확인된 뒤에만 실행 방식이 갈라지고, Release Identity는 답변 입력이 아니라 실행 조건을 추적하는 sidecar 기록으로 남습니다."
            />

            <section>
              <h3>Release Identity는 실행의 지문입니다</h3>
              <p>AlphaDoc Engine은 실행 조건을 Code Identity, Behavior Identity, Runtime Identity로 나눕니다. 배포된 코드, capability와 prompt·설정·guardrail의 fingerprint, 실제 runtime이 보고한 deployment와 model 정보를 서로 섞지 않고 기록합니다. 민감한 질문이나 문서 원문, 생성 결과는 이 식별 기록에 넣지 않습니다.</p>
              <p>이 기록으로 특정 결과가 어떤 코드와 동작 설정에서 나왔는지 조사할 수 있습니다. 설정 모델과 runtime이 실제로 보고한 모델도 따로 봅니다. 정보가 없으면 추정하지 않고 확인이 필요하다고 남깁니다.</p>
              <blockquote className="technology-inline-quote">Release Identity supports reconstruction of execution conditions. It does not by itself prove that an output was clinically correct.</blockquote>
              <p>Release Identity는 실행 조건을 다시 찾기 위한 기반입니다. 답변이 의학적으로 옳았다는 증명서는 아닙니다. 임상적 타당성은 별도의 평가 설계와 사용자 검토로 판단해야 합니다.</p>
            </section>

            <section>
              <h3>평가는 한 점수로 닫지 않습니다</h3>
              <p>Evaluation Gate는 서로 성격이 다른 실패를 AI 점수 하나에 섞지 않습니다. 코드로 확정할 수 있는 실패, 반복 관찰을 돕는 보조 평가, 의료적 맥락을 판단하는 검토를 세 층으로 나눕니다.</p>
              <dl className="technology-evaluation-explainer">
                <div>
                  <dt>Deterministic checks</dt>
                  <dd>identity 일치, citation integrity, 빈 응답, canary 노출, 금지된 단정처럼 코드로 판정할 수 있는 실패를 찾습니다. hard failure는 평균 점수가 높아도 상쇄되지 않습니다.</dd>
                </div>
                <div>
                  <dt>Model-assisted checks</dt>
                  <dd>관련성, 충실도, 환각 가능성을 반복해서 살피는 보조 수단입니다. 사람이 볼 대상을 좁히는 데 쓰되 단독 승인 근거로 삼지 않습니다.</dd>
                </div>
                <div>
                  <dt>User review</dt>
                  <dd>근거 충실도, 임상적 타당성, 실제 업무에서의 쓸모를 봅니다. 자동 평가가 확신하기 어려운 항목은 <code>human_review_required</code>로 남깁니다.</dd>
                </div>
              </dl>
            </section>

            <TechnologyFigure
              number="04"
              kind="evaluation"
              title="AlphaDoc Engine Evaluation Gate"
              caption="Deterministic failure는 즉시 차단되고, model-assisted check는 점선으로 표시한 보조 관찰에 머뭅니다. 의료적 판단이 필요한 평가는 User Review에 남으며, 세 층은 하나의 평균 점수로 합쳐지지 않습니다."
            />

            <aside className="technology-scope-note" aria-labelledby="engine-current-scope-title">
              <span>CURRENT VALIDATED SCOPE</span>
              <h3 id="engine-current-scope-title"><code>chat.evidence-search</code></h3>
              <p>현재 Evaluation Gate의 검증된 범위는 이 capability에 한정됩니다. 다른 capability까지 자동으로 평가됐다고 주장하지 않으며, 임상적 groundedness와 faithfulness를 기계적으로 확정할 수 없는 경우 사용자 검토 대상으로 남깁니다.</p>
            </aside>

            <aside className="technology-regulatory-reference" aria-labelledby="mfds-reference-title">
              <span>REGULATORY REFERENCE</span>
              <h3 id="mfds-reference-title">평가 설계를 위한 공식 참고자료</h3>
              <p>식품의약품안전처는 2026년 6월 30일 「거대언어모델(LLM) 기반 디지털의료기기 허가·심사 가이드라인(민원인 안내서)」을 공개했습니다. 바이오레는 이 안내서를 평가 체계를 설계할 때 검토하는 공식 참고자료 중 하나로 사용합니다.</p>
              <p>이 참고는 Alphadoc이나 해당 기능이 의료기기로 허가·인증됐거나 임상적으로 검증됐다는 뜻이 아닙니다.</p>
              <a href={MFDS_GUIDANCE_URL}>식품의약품안전처 원문 보기 <span aria-hidden="true">↗</span></a>
            </aside>
          </div>
        </article>

        <article id="technology-alphadocument" className="technology-post" data-tech-status="controlled-workflows">
          <TechnologySectionHeader
            index="03"
            name="AlphaDocument"
            lead="생성보다 먼저, 문서의 경계를 정의합니다."
            status="CONTROLLED WORKFLOWS"
          />

          <div className="technology-prose">
            <section>
              <h3>의료 문서에서 자유도는 늘 좋은 것이 아닙니다</h3>
              <p>문장을 잘 만든다고 문서 시스템까지 좋아지는 것은 아닙니다. 의료 문서에서는 오히려 반대 상황이 자주 생깁니다. 빠진 필드를 자연스러운 문장으로 메우고, 번역하면서 설명을 보태고, 작성 기능을 일반 대화로 우회하면 읽기는 쉽지만 틀린 문서가 나올 수 있습니다.</p>
              <p>AlphaDocument는 문서의 경계부터 고정합니다. workflow와 필수 필드, 값을 입력한 주체, 원문을 보존할 범위를 정합니다. 그다음에야 문서를 처리합니다.</p>
              <p>공식 문서 작성은 등록된 template과 필드 schema를 따릅니다. 필수 값이 하나라도 비어 있으면 생성을 멈춥니다. 한국어 공식 문서는 사용자가 입력한 값을 AI가 다시 쓰지 않습니다. 정해진 template에 로컬로 배치합니다. 다른 언어가 필요할 때만 별도의 원문 종속 번역 capability를 거칩니다. 원문에 없는 진단, 치료, 예후, 위험, 권고는 이 경로에서 추가할 수 없습니다.</p>
              <p>업로드 문서의 전체 번역과 요약 번역도 서로 다른 capability로 나뉩니다. 사용자가 고른 범위를 바꾸지 않고, 일반 생성으로 조용히 fallback하지도 않습니다. 파일은 곧바로 읽지 않습니다. 인증, 소유권, 안전한 저장 경로, quarantine 상태, 승인된 파일의 SHA-256 일치부터 확인합니다.</p>
              <blockquote className="technology-inline-quote">가장 발전된 문서 AI는 언제 생성하지 말아야 하는지 압니다.</blockquote>
              <p>이 문장이 AlphaDocument가 모든 의료 문서를 대신 쓴다는 뜻은 아닙니다. 현재 구현 범위는 사전에 정의된 공식 문서 작성 workflow와 원문 종속형 문서 번역입니다. 결과는 사용자가 검토하며, 실제 사용에 대한 책임도 사람에게 남습니다.</p>
            </section>

            <TechnologyFigure
              number="05"
              kind="document"
              title="AlphaDocument control flow"
              caption="문서 의도와 schema를 먼저 고정하고 필수 입력을 확인합니다. 한국어 공식 문서는 model rewrite 없이 렌더링되고, 번역은 원문 종속 경계를 따릅니다. 입력이 부족하면 멈추며 모든 결과는 사용자 검토로 이어집니다."
            />
          </div>
        </article>

        <article id="technology-alphalayer" className="technology-post" data-tech-status="architecture-in-development">
          <TechnologySectionHeader
            index="04"
            name="AlphaLayer"
            lead="개인정보 보호를 기능 하나가 아니라 통제 경로로 설계합니다."
            status="ARCHITECTURE IN DEVELOPMENT"
          />

          <div className="technology-prose">
            <section>
              <h3>의료 정보 보안을 위한 최적의 설계</h3>
              <p>AlphaLayer는 지금 운영 중인 단일 제품 모듈의 이름이 아닙니다. 의료 맥락의 민감정보를 다루기 위해 바이오레가 만들고 있는 목표 privacy-control architecture입니다. 출발점은 인증과 파일 소유권 확인 같은 현재 통제입니다. 필요한 정보만 외부 처리 경계로 보내고, 허가된 상황에서만 되돌리는 전체 경로를 설계합니다.</p>
              <p>정규식 몇 개만으로도 개인정보를 가린 듯한 화면은 만들 수 있습니다. 그러나 의료 맥락은 그렇게 단순하지 않습니다. 똑같은 단어가 환자 식별자일 때도 있고, 임상적으로 꼭 필요한 정보일 때도 있습니다. 지울 항목만 정해서 끝낼 수 없는 이유입니다. 어떤 목적으로 어느 정보가 필요한지 판단하고 그 결정까지 기록해야 합니다.</p>
              <p>reversible tokenization 역시 문자열 치환만으로는 부족합니다. 원문과 token의 대응표는 처리 경로 밖에 분리합니다. 응답에 token이 빠졌는지, 새로 생겼는지, 형태가 달라졌는지도 확인해야 합니다. rehydration은 권한이 확인된 사용자와 목적에만 허용합니다. 이때 생기는 처리 지연과 남은 재식별 위험까지 함께 측정합니다.</p>
            </section>

            <TechnologyFigure
              number="06"
              kind="layer"
              title="AlphaLayer privacy-control path"
              caption="실선과 채운 원은 현재 적용된 인증·소유권·quarantine·무결성 통제를 뜻합니다. 점선과 빈 원은 분류, 목적별 최소화, reversible tokenization, 격리된 Token Vault, 응답 무결성, 권한 있는 rehydration으로 확장할 목표 경로입니다."
            />
          </div>
        </article>
      </main>
    </div>
  );
}
