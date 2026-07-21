import type { KnowledgeInitialFeedResult } from "@/app/knowledge-feed";
import type { Language } from "@/app/site-content";
import { KnowledgePaperLibrary } from "@/app/components/KnowledgePaperLibrary";

function formatUpdatedAt(value: string, language: Language) {
  return new Intl.DateTimeFormat(language === "ko" ? "ko-KR" : "en-US", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(value));
}

export function KnowledgePage({
  language,
  result,
}: {
  language: Language;
  result: KnowledgeInitialFeedResult;
}) {
  const ko = language === "ko";
  const updatedAt = result.page.refreshed_at ?? result.lastSuccessAt;
  const stateLabel = result.state === "live"
    ? "LIVE"
    : result.state === "stale"
      ? ko ? "동기화 확인 중" : "Sync check"
      : ko ? "연결 중" : "Connecting";

  return (
    <article className="knowledge-page" data-knowledge-state={result.state}>
      <section className="knowledge-hero" aria-labelledby="knowledge-title">
        <div className="knowledge-shell knowledge-hero-inner">
          <h1 id="knowledge-title">Knowledge</h1>
          <p className="knowledge-lead">
            {ko ? "실시간으로 채워지는 논문 라이브러리." : "A living library of newly published medical literature."}
          </p>
          <div className="knowledge-live-line" aria-label={ko ? "알파닥 논문 데이터 연결 상태" : "Alphadoc literature data status"}>
            <i aria-hidden="true" />
            <span>{stateLabel}</span>
            {updatedAt && <time dateTime={updatedAt}>{formatUpdatedAt(updatedAt, language)} KST</time>}
          </div>
        </div>
      </section>

      <section className="knowledge-library" aria-labelledby="knowledge-library-title">
        <div className="knowledge-shell">
          <header className="knowledge-library-head">
            <h2 id="knowledge-library-title">{ko ? "신규 논문과 브리프" : "New papers and briefs"}</h2>
            <p>
              {result.page.items.length > 0
                ? ko
                  ? "알파닥 논문 DB에서 선별한 국내외 최신 논문"
                  : "Recent global and Korean papers selected from the Alphadoc literature database"
                : ko
                  ? "알파닥 논문 DB와 연결하고 있습니다."
                  : "Connecting to the Alphadoc literature database."}
            </p>
          </header>

          <KnowledgePaperLibrary initialPage={result.page} language={language} />

          <footer className="knowledge-library-foot">
            <p>{ko ? "더 깊은 검색과 원문 탐색은 알파닥에서 이어집니다." : "Continue with deeper search and source review in Alphadoc."}</p>
            <a href="https://www.alphadoc.ai" target="_blank" rel="noopener noreferrer">
              <span>{ko ? "알파닥에서 논문 찾기" : "Search in Alphadoc"}</span>
              <i aria-hidden="true">↗</i>
            </a>
          </footer>
        </div>
      </section>
    </article>
  );
}
