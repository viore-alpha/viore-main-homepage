import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname) {
  const baseUrl = process.env.VIORE_TEST_BASE_URL;
  if (!baseUrl) throw new Error("VIORE_TEST_BASE_URL is required");

  return fetch(new URL(pathname, baseUrl), {
    headers: { accept: "text/html" },
    redirect: "manual",
  });
}

test("server-renders canonical Viore homepage metadata", async () => {
  const response = await render("/ko");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<title>Viore, Drawing a New Linearity in Medicine\.<\/title>/);
  assert.match(html, /<meta name="description" content="의료의 전문성과 시스템을 연결해/);
  assert.match(html, /<meta name="robots" content="index, follow"/);
  assert.match(html, /<link rel="canonical" href="https:\/\/vioreai\.com\/ko"/);
  assert.match(html, /<link rel="alternate" hrefLang="en-US" href="https:\/\/vioreai\.com\/en"/);
  assert.match(html, /<meta property="og:title" content="Viore, Drawing a New Linearity in Medicine\."/);
  assert.match(html, /<meta property="og:image" content="https:\/\/vioreai\.com\/brand\/viore-social-card-white-v3\.png"/);
  assert.match(html, /<meta property="og:image:width" content="1200"/);
  assert.match(html, /<meta property="og:image:height" content="630"/);
  assert.match(html, /<meta name="twitter:title" content="Viore, Drawing a New Linearity in Medicine\."/);
  assert.match(html, /<link rel="icon" href="\/brand\/viore-v-square-white-v2\.png"/);
  assert.match(html, /<meta name="google-site-verification"/);
  assert.match(html, /<meta name="naver-site-verification"/);
  assert.match(html, /id="viore-home-structured-data"/);
  assert.match(html, /"legalName":"주식회사 바이오레"/);
  assert.doesNotMatch(html, /\[object Object\]/);
});

test("permanently redirects the root index to the Korean canonical page", async () => {
  const response = await render("/");
  assert.equal(response.status, 308);
  assert.equal(new URL(response.headers.get("location"), "http://localhost").pathname, "/ko");
});

test("permanently redirects the former Company routes to each locale homepage", async () => {
  for (const [legacyPath, currentPath] of [
    ["/ko/company", "/ko"],
    ["/en/company", "/en"],
  ]) {
    const response = await render(legacyPath);
    assert.equal(response.status, 308);
    assert.equal(new URL(response.headers.get("location"), "http://localhost").pathname, currentPath);
  }
});

test("permanently redirects the former Contact routes to the partnership inquiry", async () => {
  for (const [legacyPath, currentPath] of [
    ["/ko/contact", "/ko#partnership-inquiry"],
    ["/en/contact", "/en#partnership-inquiry"],
  ]) {
    const response = await render(legacyPath);
    const location = new URL(response.headers.get("location"), "http://localhost");
    assert.equal(response.status, 308);
    assert.equal(`${location.pathname}${location.hash}`, currentPath);
  }
});

test("keeps the inactive language option legible over the translucent header", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(css, /\.language-switch a \{[^}]*color: #3f4044;[^}]*font-weight: 650;/);
  assert.match(css, /\.language-switch a:hover,\.language-switch a:focus-visible \{[^}]*color: var\(--ink\);/);
  assert.match(css, /\.language-switch a\.is-active \{[^}]*color: var\(--ink\);/);
});

test("ships aligned crawler files and brand thumbnail dimensions", async () => {
  const [robots, sitemap, llms, manifestText, socialImage, squareImage] = await Promise.all([
    readFile(new URL("../public/robots.txt", import.meta.url), "utf8"),
    readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8"),
    readFile(new URL("../public/llms.txt", import.meta.url), "utf8"),
    readFile(new URL("../public/site.webmanifest", import.meta.url), "utf8"),
    readFile(new URL("../public/brand/viore-social-card-white-v3.png", import.meta.url)),
    readFile(new URL("../public/brand/viore-v-square-white-v2.png", import.meta.url)),
  ]);

  assert.match(robots, /Sitemap: https:\/\/vioreai\.com\/sitemap\.xml/);
  assert.match(robots, /Disallow: \/api\//);
  assert.match(sitemap, /<loc>https:\/\/vioreai\.com\/ko<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/vioreai\.com\/en<\/loc>/);
  assert.doesNotMatch(sitemap, /\/company/);
  assert.doesNotMatch(sitemap, /\/contact/);
  assert.match(sitemap, /<loc>https:\/\/vioreai\.com\/ko\/knowledge<\/loc>/);
  assert.doesNotMatch(sitemap, /\/council/);
  assert.doesNotMatch(sitemap, /\/insight\//);
  assert.match(sitemap, /hreflang="x-default" href="https:\/\/vioreai\.com\/ko"/);
  assert.match(llms, /Korean homepage: https:\/\/vioreai\.com\/ko/);
  assert.doesNotMatch(llms, /vioreai\.com\/ko\/company/);
  assert.match(llms, /Knowledge: https:\/\/vioreai\.com\/ko\/knowledge/);
  assert.doesNotMatch(llms, /Council:|\/council/);

  const manifest = JSON.parse(manifestText);
  assert.equal(manifest.name, "바이오레 | Viore");
  assert.equal(manifest.icons[0].src, "/brand/viore-v-square-white-v2.png");

  const pngSize = (buffer) => ({
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  });
  assert.deepEqual(pngSize(socialImage), { width: 1200, height: 630 });
  assert.deepEqual(pngSize(squareImage), { width: 1024, height: 1024 });
});

test("server-renders the Korean Company story as the homepage", async () => {
  const response = await render("/ko");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<link rel="canonical" href="https:\/\/vioreai\.com\/ko"/);
  assert.match(html, /<meta property="og:url" content="https:\/\/vioreai\.com\/ko"/);
  assert.match(html, /<link rel="alternate" hrefLang="en-US" href="https:\/\/vioreai\.com\/en"/);
  assert.match(html, /class="company-hero"/);
  assert.match(html, /의료계의/);
  assert.match(html, /새로운 선형을 그리다\./);
  assert.match(html, /의료계가 오랜 시간 축적해 온 전문성과 시스템을 연결하기 위한 선/);
  assert.match(html, /그것이 바이오레 입니다/);
  assert.match(html, /의료의 모든 순간이/);
  assert.match(html, /하나의 흐름으로 이어지도록/);
  assert.match(html, /혁신은, 더 많이 더하는 일이 아닙니다\./);
  assert.match(html, /이미 존재하는 의료의 전문성과 시스템이 더 자연스럽게 이어지도록 만드는 일입니다\./);
  assert.match(html, /바이오레는 의료인의 질문과 문서, 지식과 도구가 끊김 없이 이어지는 환경을 Medical OS\(Operating System\)라고 부릅니다\./);
  assert.match(html, /class="detail-statement-lead"/);
  assert.match(html, /data-metrics-source="(?:live|snapshot)"/);
  assert.match(html, /Medical Documents Added Monthly/);
  assert.match(html, /Standardized Medical Documents/);
  assert.match(html, /Korean &amp; Global Clinical Guidelines/);
  assert.match(html, /최근 30일 신규 정규화 문헌/);
  assert.match(html, /누적 정규화 의료 문헌/);
  assert.match(html, /누적 공개 국내외 가이드라인·지침 문헌/);
  assert.match(html, /class="company-connections"/);
  assert.doesNotMatch(html, /CONNECTED BY DESIGN/);
  assert.match(html, /One connected Flow/);
  assert.match(html, /for Medicine/);
  assert.match(html, /더 직관적인 경험/);
  assert.match(html, /더 자연스럽게 연결되는 흐름/);
  assert.match(html, /처음부터 설계 기준에 포함된 보안/);
  assert.match(html, /viore-company-network-dark-portrait-transparent\.png/);
  assert.doesNotMatch(html, /viore-connected-principles/);
  assert.match(html, /그 첫 번째 선형, 알파닥 Alphadoc/);
  assert.match(html, /id="partnership-inquiry"/);
  assert.match(html, /href="\/ko#partnership-inquiry"[^>]*>Contact<\/a>/);
  assert.doesNotMatch(html, /NEW LINE/);
  assert.doesNotMatch(html, />첫 번째 선형, 알파닥</);
  assert.doesNotMatch(html, /Medical intelligence|Connected workflow|Responsible direction/);
  assert.doesNotMatch(html, /바이오레는 의료계의 새로운 선형을 그립니다\./);
  assert.match(html, /class="company-energy-canvas"/);
  assert.match(html, /class="company-scroll-cue"/);
  assert.doesNotMatch(html, />스크롤</);
  assert.doesNotMatch(html, /company-energy-line|company-energy-core/);
  assert.doesNotMatch(html, /detail-network-backdrop|company-linearity-visual/);
});

test("keeps Knowledge public while Council is unavailable and marked coming soon", async () => {
  const [companyResponse, knowledgeResponse, councilResponse] = await Promise.all([
    render("/ko"),
    render("/ko/knowledge"),
    render("/ko/council"),
  ]);

  assert.equal(companyResponse.status, 200);
  assert.equal(knowledgeResponse.status, 200);
  assert.equal(councilResponse.status, 404);

  const [companyHtml, knowledgeHtml] = await Promise.all([
    companyResponse.text(),
    knowledgeResponse.text(),
  ]);

  assert.match(companyHtml, /href="\/ko\/knowledge"[^>]*>Knowledge<\/a>/);
  assert.doesNotMatch(companyHtml, /href="\/ko\/council"/);
  assert.match(companyHtml, /class="nav-link nav-link-disabled"[^>]*disabled=""[^>]*>[\s\S]*?<span>Council<\/span>[\s\S]*?<small>Coming soon<\/small>/);
  assert.match(companyHtml, /class="mobile-top-link mobile-top-link-disabled"[^>]*disabled=""/);
  assert.doesNotMatch(companyHtml, />Insight<\/button>/);
  assert.doesNotMatch(knowledgeHtml, /INSIGHT ·/);
  assert.match(knowledgeHtml, /<link rel="canonical" href="https:\/\/vioreai\.com\/ko\/knowledge"/);
  assert.match(knowledgeHtml, /class="knowledge-page" data-knowledge-state="live"/);
  assert.doesNotMatch(knowledgeHtml, /VIORE · ALPHADOC LITERATURE/);
  assert.match(knowledgeHtml, /실시간으로 채워지는 논문 라이브러리\./);
  assert.match(knowledgeHtml, /신규 논문과 브리프/);
  assert.match(knowledgeHtml, /알파닥 논문 DB에서 선별한 국내외 최신 논문/);
  assert.match(knowledgeHtml, /aria-label="전체"[^>]*aria-pressed="true"/);
  assert.match(knowledgeHtml, /aria-label="해외"[^>]*aria-pressed="false"/);
  assert.match(knowledgeHtml, /aria-label="국내"[^>]*aria-pressed="false"/);
  const paperCardCount = (knowledgeHtml.match(/class="knowledge-paper-card"/g) ?? []).length;
  assert.equal(paperCardCount, 12);
  assert.match(knowledgeHtml, /data-paper-scope="overseas"/);
  assert.match(knowledgeHtml, /class="knowledge-paper-brief" lang="ko"/);
  assert.match(knowledgeHtml, /rel="noopener noreferrer"/);
  assert.match(knowledgeHtml, /class="knowledge-feed-sentinel"/);
  assert.doesNotMatch(knowledgeHtml, /knowledge-filter-result/);
  assert.doesNotMatch(knowledgeHtml, /class="knowledge-scope-filter"[^>]*><span>[^<]+<\/span><small>/);
  assert.doesNotMatch(knowledgeHtml, /detail-page-knowledge|knowledge-motion|knowledge-stack/);
});

test("implements Knowledge as a paginated live literature contract on paper", async () => {
  const [contract, dataSource, component, paperLibrary, apiRoute, css, migration] = await Promise.all([
    readFile(new URL("../app/knowledge-contract.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/knowledge-feed.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/KnowledgePage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/KnowledgePaperLibrary.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/api/knowledge/papers/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/knowledge.css", import.meta.url), "utf8"),
    readFile(new URL("../supabase/migrations/20260721103250_knowledge_infinite_public_feed.sql", import.meta.url), "utf8"),
  ]);

  assert.match(contract, /KNOWLEDGE_PAGE_SIZE = 12/);
  assert.match(contract, /knowledge\.literature\.page\.v1/);
  assert.match(contract, /href\.protocol !== "https:"/);
  assert.match(contract, /items\.length > KNOWLEDGE_MAX_PAGE_SIZE/);
  assert.match(dataSource, /viore_knowledge_public_papers/);
  assert.match(dataSource, /published_date\.lt\./);
  assert.match(dataSource, /paper_id\.lt\./);
  assert.match(dataSource, /limit \+ 1/);
  assert.match(dataSource, /AbortSignal\.timeout\(KNOWLEDGE_FEED_FETCH_TIMEOUT_MS\)/);
  assert.match(dataSource, /next: \{ revalidate: KNOWLEDGE_FEED_REVALIDATE_SECONDS \}/);
  assert.doesNotMatch(dataSource, /service_role|service-role|secret key/i);
  assert.match(component, /실시간으로 채워지는 논문 라이브러리\./);
  assert.match(paperLibrary, /useState<KnowledgeFilter>\("all"\)/);
  assert.match(paperLibrary, /aria-pressed=\{activeFilter === filter\.value\}/);
  assert.match(paperLibrary, /new IntersectionObserver/);
  assert.match(paperLibrary, /rootMargin: "900px 0px"/);
  assert.match(paperLibrary, /\/api\/knowledge\/papers/);
  assert.match(paperLibrary, /parseKnowledgePaperPage/);
  assert.match(paperLibrary, /target="_blank"/);
  assert.match(paperLibrary, /rel="noopener noreferrer"/);
  assert.match(paperLibrary, /item\.brief/);
  assert.doesNotMatch(paperLibrary, /counts|knowledge-filter-result|<small>/);
  assert.match(apiRoute, /invalid_scope/);
  assert.match(apiRoute, /invalid_cursor/);
  assert.match(apiRoute, /Cache-Control/);
  assert.match(migration, /enable row level security/);
  assert.match(migration, /grant select on table public\.viore_knowledge_public_papers to anon, authenticated/);
  assert.match(migration, /refresh_viore_knowledge_public_papers/);
  assert.match(migration, /viore-knowledge-public-papers-hourly/);
  assert.match(migration, /viore_knowledge_abstract_allowed/);
  assert.match(css, /\.knowledge-paper-columns \{[\s\S]*?column-count: 4;/);
  assert.match(css, /\.knowledge-paper-card \{[\s\S]*?border-radius: 0;[\s\S]*?background: transparent;[\s\S]*?box-shadow: none;/);
  assert.match(css, /\.knowledge-scope-filter \{[\s\S]*?background: transparent;/);
  assert.match(css, /\.knowledge-feed-sentinel/);
  assert.match(css, /background-image: var\(--paper-texture\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});

test("rejects malformed or unsafe paginated Knowledge payloads", async () => {
  const {
    isKnowledgeCursor,
    parseKnowledgePaperPage,
  } = await import(new URL("../app/knowledge-contract.ts", import.meta.url));
  const refreshedAt = "2026-07-21T09:50:33.000Z";
  const validPage = {
    schema_version: "knowledge.literature.page.v1",
    items: [{
      paper_id: "33e7523d-1405-4566-b91d-547ea2807610",
      published_date: "2026-07-21",
      title: "A clinically relevant paper title",
      title_ko: null,
      brief: "알파닥 카드 요약 정책을 통과한 완결된 한국어 브리프입니다.",
      authors: ["Kim A"],
      author_count: 1,
      journal: "Clinical Journal",
      published_year: 2026,
      source: "pubmed",
      scope: "overseas",
      href: "https://pubmed.ncbi.nlm.nih.gov/12345678/",
    }],
    next_cursor: "2026-07-21_33e7523d-1405-4566-b91d-547ea2807610",
    data_as_of: refreshedAt,
    refreshed_at: refreshedAt,
  };

  assert.ok(parseKnowledgePaperPage(validPage));
  assert.ok(isKnowledgeCursor(validPage.next_cursor));
  assert.equal(isKnowledgeCursor("not-a-cursor"), false);
  assert.equal(parseKnowledgePaperPage({ ...validPage, next_cursor: "not-a-cursor" }), null);
  assert.equal(parseKnowledgePaperPage({
    ...validPage,
    items: [{ ...validPage.items[0], href: "javascript:alert(1)" }],
  }), null);
  assert.equal(parseKnowledgePaperPage({
    ...validPage,
    items: [{ ...validPage.items[0], brief: "English-only abstract is rejected." }],
  }), null);
  assert.equal(parseKnowledgePaperPage({
    ...validPage,
    items: [validPage.items[0], validPage.items[0]],
  }), null);
});

test("serves domestic Knowledge pages and advances the cursor without duplicates", async () => {
  const firstResponse = await render("/api/knowledge/papers?scope=domestic");
  assert.equal(firstResponse.status, 200);
  const firstPage = await firstResponse.json();
  assert.equal(firstPage.schema_version, "knowledge.literature.page.v1");
  assert.equal(firstPage.items.length, 12);
  assert.ok(firstPage.items.every((item) => item.scope === "domestic"));
  assert.ok(firstPage.items.every((item) => /[가-힣]/u.test(item.brief)));
  assert.match(firstPage.next_cursor, /^\d{4}-\d{2}-\d{2}_[0-9a-f-]{36}$/i);

  const secondResponse = await render(`/api/knowledge/papers?scope=domestic&cursor=${encodeURIComponent(firstPage.next_cursor)}`);
  assert.equal(secondResponse.status, 200);
  const secondPage = await secondResponse.json();
  assert.equal(secondPage.items.length, 12);
  const firstIds = new Set(firstPage.items.map((item) => item.paper_id));
  assert.ok(secondPage.items.every((item) => !firstIds.has(item.paper_id)));

  const invalidResponse = await render("/api/knowledge/papers?scope=domestic&cursor=unsafe");
  assert.equal(invalidResponse.status, 400);
});

test("redirects legacy Knowledge while keeping the former Council route unavailable", async () => {
  const knowledgeResponse = await render("/ko/insight/knowledge");
  assert.equal(knowledgeResponse.status, 308);
  assert.equal(new URL(knowledgeResponse.headers.get("location"), "http://localhost").pathname, "/ko/knowledge");

  const councilResponse = await render("/ko/insight/clinical-council");
  assert.equal(councilResponse.status, 404);
});

test("server-renders the Alphadoc product story from real product UI", async () => {
  const [response, css, productSource, workspaceSource, energyCanvasSource] = await Promise.all([
    render("/ko/product/alphadoc"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ProductPage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/AlphadocWorkspaceMotion.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/CompanyEnergyCanvas.tsx", import.meta.url), "utf8"),
  ]);
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<title>알파닥 \| 의료인의 하루를 잇는 Medical Workspace \| 바이오레<\/title>/);
  assert.match(html, /<link rel="canonical" href="https:\/\/vioreai\.com\/ko\/product\/alphadoc"/);
  assert.match(html, /class="alphadoc-product lang-ko"/);
  assert.match(html, /class="site-header site-header-dark"/);
  assert.match(html, /class="site-footer "/);
  assert.doesNotMatch(html, /class="site-footer site-footer-dark"/);
  assert.match(html, /Alphadoc, an AI Medical Workspace/);
  assert.match(html, /임상 질문부터 근거 확인, 문서 작성과 번역까지\.\s*의료인의 업무를 앱의 형태로 이어주는 공간\./);
  assert.match(html, /의료인들의 하루를 바꾸는 워크스페이스/);
  assert.match(html, /ap-hero-motion-svg ap-hero-motion-svg--desktop/);
  assert.match(html, /ap-hero-motion-svg ap-hero-motion-svg--mobile/);
  assert.match(html, /\/brand\/alphadoc-alpha\.png/);
  assert.match(html, /모든 것이 하나의 화면 안에/);
  assert.match(html, /필요한 모든 기능이 단 하나의 공간에 펼쳐집니다\.\s*복잡함은 비우고 시야는 넓혀, 당신이 필요한 순간에 완벽하게 집중할 수 있도록\./);
  assert.match(html, /class="ap-workspace-motion/);
  assert.match(html, /brand\/alphawing\/original\.png/);
  assert.match(html, /brand\/alphachick-motion\/egg\.png/);
  assert.match(html, /brand\/alphachick-motion\/chick\.png/);
  assert.match(html, /brand\/alphachick-motion\/chirp\.png/);
  assert.match(html, /brand\/feature-icons\/functions\/soap\/logo\.svg/);
  assert.match(html, /brand\/feature-icons\/panel\/community\/logo\.svg/);
  assert.match(html, /응급실 흉통 평가,[\s\S]*연속 검사 중심으로 개편/);
  assert.match(html, /Accelerated Chest Pain Assessment/);
  assert.match(html, /generated\/news-chest-pain-night\.jpg/);
  assert.match(html, /generated\/community-chest-pain-handoff\.jpg/);
  assert.match(html, /혼합 산-염기 장애 계산/);
  assert.match(html, /138−\(102\+13\)/);
  assert.match(html, /23\+2\.5×\(4\.4−2\.4\)/);
  assert.match(html, /25\.5–29\.5/);
  assert.match(html, /고음이온차 대사성 산증/);
  assert.match(html, /날씨 데이터: 기상청 단기예보/);
  assert.match(html, /16:00 업데이트/);
  assert.match(html, /야간 흉통 인계 때 쓰는 체크리스트를 공유합니다/);
  assert.match(html, /저위험 흉통 환자, hs-cTn 재검 간격은/);
  assert.match(html, /65% · 25/);
  assert.match(html, /모든 가능성은 앱 하나로/);
  assert.match(html, /필요한 순간 앱을 바로 실행하세요\.\s*더 높은 자율성, 손쉬운 연동, 그리고 계속해서 추가되는 앱까지\.\s*하나의 공간에서 이 모든 것이 가능해집니다\./);
  assert.match(html, /href="#overview"[^>]*>한눈에/);
  assert.match(html, /href="#clinical"[^>]*>앱/);
  assert.match(html, /href="#alphadocs"[^>]*>알파닥스/);
  assert.match(html, /논문 검색/);
  assert.match(html, /의료 공지/);
  assert.match(html, /진료서류/);
  assert.match(html, /문서 번역/);
  assert.match(html, /수많은 논문 사이에서, 지금 필요한 근거를 찾습니다/);
  assert.match(productSource, /의료 현장의 변화를 놓치지 않도록, 흩어진 공지를 한곳에 모읍니다/);
  assert.match(productSource, /반복되는 서류 업무를, 하나의 완성된 흐름으로 바꿉니다/);
  assert.match(productSource, /언어가 달라도, 의료 문서의 흐름은 끊기지 않습니다/);
  assert.match(productSource, /전체 번역과 요약 번역 중 목적에 맞는 방식을 고를 수 있습니다/);
  assert.match(productSource, /판단이 필요한 순간, 필요한 의료 도구를 바로 엽니다/);
  assert.match(html, /의료 도구/);
  assert.match(html, /외 다수의 앱들/);
  assert.match(html, /https:\/\/www\.alphadoc\.ai\/brand\/feature-icons\/panel\/paper\/logo\.svg/);
  assert.match(html, /https:\/\/www\.alphadoc\.ai\/brand\/feature-icons\/functions\/medical-notices\/logo\.png/);
  assert.match(html, /https:\/\/www\.alphadoc\.ai\/brand\/feature-icons\/functions\/guide\/logo\.svg/);
  assert.match(html, /https:\/\/www\.alphadoc\.ai\/brand\/feature-icons\/functions\/document-translation\/logo\.svg/);
  assert.match(html, /https:\/\/www\.alphadoc\.ai\/brand\/feature-icons\/functions\/medical-tools\/logo\.svg/);
  assert.match(html, /소통의 모든 순간을,\s*가장 트렌디하고 안전하게/);
  assert.match(html, /알파닥스는 당신이 원하는 어떤 모습으로든 자유롭게 이어지는 트렌디한 프라이빗 커뮤니티입니다/);
  assert.match(html, /class="ap-alphadocs-demo/);
  assert.match(html, /class="ap-alphadocs-phone"/);
  assert.match(html, /class="ap-community-panel-switcher"/);
  assert.match(html, /핫 포스트/);
  assert.match(html, />알파닥스</);
  assert.match(html, /새벽두시라떼/);
  assert.match(html, /개원한지2년/);
  assert.match(html, /로딩중인전공의/);
  assert.match(html, /문서정리중/);
  assert.match(html, /내 선택을 가장 많이 바꾼 조건은\?/);
  assert.match(html, /교육 분위기/);
  assert.match(html, /당직 강도/);
  assert.match(html, /급여·복지/);
  assert.match(html, /community-chest-pain-handoff\.jpg/);
  assert.doesNotMatch(html, /ap-community-global-head|새로운 소식이 있나요\?/);
  assert.doesNotMatch(html, /내과의 · 18분|중증 패혈증 초기 수액 후 승압제/);
  assert.match(html, /Intuitive UI/);
  assert.match(html, /Verified Access/);
  assert.match(html, /AlphaEncryption/);
  assert.match(html, /https:\/\/www\.alphadoc\.ai\/brand\/feature-icons\/panel\/community\/logo\.svg/);
  assert.match(html, /바이오레의 첫번째 선형,/);
  assert.match(html, /이제 시작해보세요\./);
  assert.match(html, /class="ap-final-logo-stage"/);
  assert.match(html, /class="company-energy-canvas"/);
  assert.match(html, /class="ap-final-logo" src="\/brand\/alphadoc-alpha\.png"/);
  assert.match(productSource, /<CompanyEnergyCanvas quality="balanced" \/>/);
  assert.match(workspaceSource, /setIsPlaying\(entry\.isIntersecting && entry\.intersectionRatio >= 0\.08\)/);
  assert.match(energyCanvasSource, /balanced \? 1000 \/ 24 : FRAME_INTERVAL/);
  assert.match(energyCanvasSource, /balanced \? 1\.25 : 1\.5/);
  assert.match(html, /11-paper-search\.jpg/);
  assert.match(html, /10-medical-notices\.jpg/);
  assert.match(html, /05-official-documents\.jpg/);
  assert.match(html, /09-document-translation\.jpg/);
  assert.match(html, /08-medical-tools\.jpg/);
  assert.match(html, /"@type":"SoftwareApplication"/);
  assert.match(html, /role="tablist"/);
  assert.match(html, /class="ap-button ap-button-primary"/);
  assert.doesNotMatch(html, /제품 화면 보기/);
  assert.doesNotMatch(html, /ALPHADOC · MEDICAL WORKSPACE|WORKSPACE ANATOMY|CLINICAL WORK|MEDICAL INTELLIGENCE|RECORDS &amp; DOCUMENTS|CONTINUITY/);
  assert.doesNotMatch(html, /실제 운영 UI|REAL UI|REAL PRODUCT UI/);
  assert.doesNotMatch(html, /ONE DAY · MANY SCREENS|ONE CONTINUOUS WORKFLOW/);
  assert.doesNotMatch(html, /ap-fragmented|ap-workflow/);
  assert.doesNotMatch(html, /ap-hero-panel|ap-hero-widget|ap-hero-workspace|ap-hero-wing|ap-hero-news|ap-hero-connector/);
  assert.doesNotMatch(html, /오픈.?베타|OPEN.?BETA/);
  assert.doesNotMatch(html, /바이오레가 그리는 새로운 선형을 의료인의 실제 하루로 옮긴/);
  assert.doesNotMatch(html, /의료인의 판단을 대신하지 않습니다/);
  assert.doesNotMatch(html, /href="#evidence"|href="#documents"|id="evidence"|id="documents"/);
  assert.doesNotMatch(html, /근거를 찾고 원문과 최신 업데이트까지 확인합니다|기록과 문서를 필요한 형식으로 완성합니다/);
  assert.doesNotMatch(html, /작업은 저장되고 다음번에도 이어집니다/);
  assert.doesNotMatch(html, /clinical-gallery-tab-(?:note|drug|guidelines|wing|form)"/);
  assert.doesNotMatch(html, /결과를 그대로 진료에 사용해도 되나요/);
  assert.doesNotMatch(html, /EMR이나 HIS를 대체하나요/);
  assert.doesNotMatch(html, /chickwing-logo\.svg|alphachicks\/cta-chick/);
  assert.doesNotMatch(html, /img\.hankyung\.com|it\.donga\.com|\[데스크칼럼\]|퓨리오사AI/);
  assert.doesNotMatch(html, /Ranson|핵심 정리/);
  assert.match(html, /논문 근거 3건/);
  assert.match(html, /Winter 공식 · 1967/);
  assert.match(html, /Albert et al\. · PMID 6016545/);
  assert.match(html, /PMID 6016545/);
  assert.match(html, /Albumin 보정 · 1998/);
  assert.match(html, /Figge et al\. · PMID 9824071/);
  assert.match(html, /PMID 9824071/);
  assert.match(html, /Delta gap · 1990/);
  assert.match(html, /Wrenn · PMID 2240729/);
  assert.match(html, /PMID 2240729/);
  assert.match(html, /중환자실 항생제 재평가/);
  assert.match(html, /48시간 체크리스트 도입/);
  assert.match(html, /news-antibiotic-review\.jpg/);

  const productCss = css.slice(css.indexOf("/* Alphadoc product · real UI narrative */"));
  assert.match(css, /src: url\("\/fonts\/PretendardVariable\.woff2"\)/);
  assert.match(css, /--dark-paper-base: #08080a;/);
  assert.match(css, /--dark-paper-image: linear-gradient\(rgba\(0,0,0,\.24\),rgba\(0,0,0,\.24\)\),url/);
  assert.match(productCss, /\.alphadoc-product \{[\s\S]*?background-color: var\(--dark-paper-base\);[\s\S]*?background-image: var\(--dark-paper-image\);/);
  assert.match(productCss, /\.alphadoc-product \{[\s\S]*?background-size: var\(--dark-paper-size\);/);
  assert.match(productCss, /--ap-red: #ff8177/);
  assert.match(productCss, /\.ap-button-primary \{[\s\S]*?background: var\(--ap-red\);/);
  assert.match(productCss, /\.ap-hero-motion\.is-playing \.ap-motion-logo \{ animation: ap-motion-ui-in \.72s 1\.6s/);
  assert.match(productCss, /\.ap-hero-motion-svg--mobile \{ display: none; \}/);
  assert.match(productCss, /\.ap-hero-copy h1 \{[\s\S]*?white-space: nowrap;/);
  assert.match(productCss, /\.ap-hero-lead \{[\s\S]*?white-space: pre-line;/);
  assert.match(productCss, /\.ap-section-head \{[\s\S]*?grid-template-columns: 1fr;[\s\S]*?align-items: start;/);
  assert.match(productCss, /\.ap-showcase-evidence \{[\s\S]*?background: rgba\(255,255,255,\.018\);/);
  assert.match(productCss, /\.ap-workspace-motion\.is-playing \.ap-real-calendar-palette/);
  assert.match(productCss, /@keyframes ap-real-chat-view/);
  assert.match(productCss, /@keyframes ap-real-literature-state/);
  assert.match(productCss, /@keyframes ap-real-community-state/);
  assert.match(productCss, /@keyframes ap-community-feed-scroll/);
  assert.match(productCss, /@keyframes ap-community-poll-fill/);
  assert.match(productCss, /@keyframes ap-community-touch/);
  assert.match(productCss, /\.ap-alphadocs-phone \{[\s\S]*?aspect-ratio: 393\/852;/);
  assert.match(productCss, /\.ap-community-poll \{[\s\S]*?background:#f6f9ff;/);
  assert.match(productCss, /\.ap-final-cta\.is-playing \.ap-final-logo-stage::before/);
  assert.doesNotMatch(productCss, /ap-real-cursor-ring/);
  assert.doesNotMatch(productCss, /\.ap-eyebrow|\.ap-fragmented|\.ap-workflow|\.ap-ui-badge|\.ap-hero-replay/);

  const asset = await readFile(new URL("../public/assets/product/alphadoc/01-workspace-apps.jpg", import.meta.url));
  assert.ok(asset.length > 30_000);
  const generatedNewsAsset = await readFile(new URL("../public/assets/product/alphadoc/generated/news-chest-pain-night.jpg", import.meta.url));
  const generatedSecondaryNewsAsset = await readFile(new URL("../public/assets/product/alphadoc/generated/news-antibiotic-review.jpg", import.meta.url));
  const generatedCommunityAsset = await readFile(new URL("../public/assets/product/alphadoc/generated/community-chest-pain-handoff.jpg", import.meta.url));
  const pretendardAsset = await readFile(new URL("../public/fonts/PretendardVariable.woff2", import.meta.url));
  assert.ok(generatedNewsAsset.length > 100_000);
  assert.ok(generatedSecondaryNewsAsset.length > 100_000);
  assert.ok(generatedCommunityAsset.length > 100_000);
  assert.ok(pretendardAsset.length > 1_000_000);
});

test("uses the flowing filament background and carries the transparent network through the dark chapter", async () => {
  const [page, energyCanvas, companyBackdrop, content, css, companyNetwork] = await Promise.all([
    readFile(new URL("../app/components/CompanyPage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/CompanyEnergyCanvas.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/CompanyNetworkBackdrop.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/site-content.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../public/media/viore-company-network-dark-portrait-transparent.png", import.meta.url)),
  ]);

  assert.match(page, /href="#company-story"/);
  assert.match(page, /<CompanyEnergyCanvas \/>/);
  assert.doesNotMatch(page, /CompanyEnergyField/);
  assert.doesNotMatch(page, /CompanyLinearityVisual/);
  assert.match(energyCanvas, /requestAnimationFrame/);
  assert.match(energyCanvas, /prefers-reduced-motion: reduce/);
  assert.match(energyCanvas, /globalCompositeOperation = "multiply"/);
  assert.match(content, /title: "의료계의\\n새로운 선형을 그리다\."/);
  assert.match(content, /연결하기 위한 선\\n그것이 바이오레 입니다/);
  assert.match(css, /\.company-hero \{[^}]*background-color: var\(--paper-base\);/);
  assert.match(css, /\.company-hero-copy \{[^}]*text-align: center;/);
  assert.match(css, /\.company-hero p \{[^}]*white-space: pre-line;/);
  assert.match(css, /\.company-energy-canvas \{/);
  assert.match(css, /--paper-texture: url\("\/media\/viore-paper-texture\.webp"\);/);
  assert.match(css, /html,body \{[^}]*background-image: var\(--paper-texture\);/);
  assert.match(css, /\.detail-page \{[^}]*background-image: var\(--paper-texture\);/);
  assert.match(css, /\.company-hero \{[^}]*background-image: var\(--paper-texture\);/);
  assert.match(css, /\.legal-page \{[^}]*background-image: var\(--paper-texture\);/);
  assert.match(css, /\.product-page-v2 \{[^}]*background-image: var\(--paper-texture\);/);
  assert.match(page, /<CompanyNetworkBackdrop \/>/);
  assert.doesNotMatch(page, /viore-company-terminal-pin-dark\.png|company-pin-alpha|company-pin-mask-boost/);
  assert.match(companyBackdrop, /viore-company-network-dark-portrait-transparent\.png/);
  assert.match(companyBackdrop, /requestAnimationFrame/);
  assert.match(companyBackdrop, /prefers-reduced-motion: reduce/);
  assert.match(companyBackdrop, /--company-network-shift/);
  assert.match(css, /\.company-network-backdrop \{[^}]*position: absolute;[^}]*inset: 0;/);
  assert.match(css, /\.company-network-viewport \{[^}]*position: sticky;[^}]*height: 100svh;/);
  assert.match(css, /\.company-network-source \{[^}]*width: max\(100vw,118svh\);/);
  assert.ok(companyNetwork.length > 500_000);
  assert.equal(companyNetwork[25], 6, "company network asset must be an RGBA PNG");
  assert.match(css, /@keyframes company-scroll-energy/);
  assert.match(css, /@keyframes company-scroll-chevron/);
  assert.match(css, /prefers-reduced-motion: reduce/);
});

test("uses the Alphadoc intelligence lens without the retired spiral visual", async () => {
  const [lens, brandVisuals, css] = await Promise.all([
    readFile(new URL("../app/components/AlphaDocIntelligenceLens.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/BrandVisuals.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(lens, /alphadoc-intelligence-lens\.png/);
  assert.match(lens, /intelligence-lens-white-key/);
  assert.doesNotMatch(lens, /strand|spiral/i);
  assert.match(brandVisuals, /AlphaDocIntelligenceLens/);
  assert.doesNotMatch(brandVisuals, /AlphaDocSpiralCanvas/);
  assert.match(css, /@keyframes intelligence-lens-drift/);
  assert.match(css, /@keyframes intelligence-lens-sheen/);
});

test("uses accessible live count-up company metrics with a verified snapshot fallback", async () => {
  const [page, metrics, dataSource, content, css] = await Promise.all([
    readFile(new URL("../app/components/CompanyPage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/CompanyMetrics.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/company-metrics.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/site-content.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /getCompanyMetrics\(language, page\.metrics\)/);
  assert.match(page, /metrics=\{companyMetrics\?\.metrics \?\? page\.metrics\}/);
  assert.match(metrics, /IntersectionObserver/);
  assert.match(metrics, /requestAnimationFrame/);
  assert.match(metrics, /prefers-reduced-motion: reduce/);
  assert.match(metrics, /aria-label=\{metric\.ariaLabel\}/);
  assert.match(metrics, /data-metrics-source=\{source\}/);
  assert.doesNotMatch(metrics, /company-metric-index|padStart/);
  assert.match(dataSource, /viore_company_metrics/);
  assert.match(dataSource, /medical_documents_added_30d/);
  assert.match(dataSource, /standardized_medical_documents/);
  assert.match(dataSource, /clinical_guidelines/);
  assert.match(dataSource, /revalidate: COMPANY_METRICS_REVALIDATE_SECONDS/);
  assert.doesNotMatch(dataSource, /service_role|service-role|secret key/i);
  assert.match(content, /value: 36047/);
  assert.match(content, /value: 212891/);
  assert.match(content, /value: 9476/);
  assert.match(css, /\.company-metrics \{[^}]*grid-template-columns: repeat\(3,minmax\(0,1fr\)\);/);
  assert.match(css, /\.company-metric-value \{[^}]*font-variant-numeric: tabular-nums;/);
});

test("keeps the three connected principles text-only over the continuous company network", async () => {
  const [page, connections, content, css] = await Promise.all([
    readFile(new URL("../app/components/CompanyPage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/CompanyConnections.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/site-content.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<CompanyConnections content=\{page\.connections\} \/>/);
  assert.doesNotMatch(connections, /<img|viore-connected-principles/);
  assert.doesNotMatch(connections, /padStart|String\(index \+ 1\)/);
  assert.match(connections, /content\.nodes\.map/);
  assert.match(connections, /aria-labelledby="company-connections-title"/);
  assert.equal((content.match(/더 직관적인 경험|더 자연스럽게 연결되는 흐름|처음부터 설계 기준에 포함된 보안/g) ?? []).length, 3);
  assert.match(content, /A more intuitive experience/);
  assert.match(content, /A more natural, connected flow/);
  assert.match(content, /Security built in from the start/);
  assert.match(css, /\.company-connection-nodes \{[^}]*grid-template-columns: repeat\(3,minmax\(0,1fr\)\);/);
});

test("routes Company and Contact navigation into the locale homepage", async () => {
  const [content, chrome] = await Promise.all([
    readFile(new URL("../app/site-content.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteChrome.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(content, /if \(key === "company"\) return `\/\$\{language\}`;/);
  assert.match(content, /if \(key === "contact"\) return `\/\$\{language\}#partnership-inquiry`;/);
  assert.match(chrome, /const isCompanyPage = pathname === `\/\$\{language\}`/);
  assert.match(chrome, /const isProductPage = pathname\.includes\("\/product\/alphadoc"\)/);
  assert.match(chrome, /const isDarkPage = isTechnologyPage \|\| isProductPage/);
  assert.match(chrome, /const isDarkFooter = isCompanyPage \|\| isTechnologyPage/);
  assert.match(chrome, /nav-link \$\{isCompanyPage \? "is-active" : ""\}/);
  assert.match(chrome, /site-footer \$\{isDarkFooter \? "site-footer-dark" : ""\}/);
});

test("server-renders one accessible Technology journal with four independent articles", async () => {
  const response = await render("/ko/technology");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(html, />Journal/);
  assert.doesNotMatch(html, />Tech Blog</);
  assert.match(html, /우리만의 선형을/);
  assert.match(html, /만드는 과정/);
  assert.match(html, /Viore Team/);
  assert.doesNotMatch(html, /Viore Technology Team/);
  assert.match(html, /이제 의료계에도 새로운 선형이 필요합니다/);
  assert.match(html, /모든 것이 함께 작동하게 하는 One Operating Layer/);
  assert.match(html, /AlphaEvidence는 바로 그 앞단을 맡습니다/);
  assert.match(html, /Verified evidence and automation for LLM/);
  assert.match(html, /LLM을 위한 검증된 증거와 자동화/);
  assert.match(html, /시간과 함께 커지는 지식/);
  assert.match(html, /의료 AI는 모델 이름 하나로 작동 방식을 설명할 수 없습니다/);
  assert.match(html, /AlphaDoc Engine/);
  assert.match(html, /의료 특화 Workflow Orchestration/);
  assert.match(html, /Alphadoc이나/);
  assert.doesNotMatch(html, /AlphaDoc이나/);
  assert.match(html, /의료 문서에서 자유도는 늘 좋은 것이 아닙니다/);
  assert.match(html, /AlphaLayer는 지금 운영 중인 단일 제품 모듈의 이름이 아닙니다/);
  for (const id of [
    "technology-alphaevidence",
    "technology-alphadoc-engine",
    "technology-alphadocument",
    "technology-alphalayer",
  ]) {
    assert.match(html, new RegExp(`<article id="${id}"`));
  }
  assert.match(html, /IN PRODUCTION/);
  assert.match(html, /CONTROLLED WORKFLOWS/);
  assert.match(html, /ARCHITECTURE IN DEVELOPMENT/);
  assert.match(html, /July 21, 2026/);
  assert.match(html, /2026-07-20/);
  assert.doesNotMatch(html, /Current scope/);
  assert.doesNotMatch(html, /Not claimed/);
  assert.doesNotMatch(html, /Evidence begins before retrieval/);
  assert.doesNotMatch(html, /검색보다 먼저, 출처와 변경을 보존합니다/);
  assert.doesNotMatch(html, /숫자보다 상태를 함께 공개합니다/);
  assert.doesNotMatch(html, /아래 숫자는 빌드할 때 입력한 홍보 수치가 아닙니다/);
  assert.doesNotMatch(html, /집계 범위\.|해석 범위\./);
  assert.doesNotMatch(html, /모델을 호출하는 코드가 아니라, 실행 조건을 관리하는 엔진/);
  assert.doesNotMatch(html, /AlphaDocument is the document-control subsystem/);
  assert.doesNotMatch(html, /AlphaLayer describes Viore’s target privacy-control architecture/);
  assert.doesNotMatch(html, /아직 완성됐다고 말하지 않는 이유/);
  assert.match(html, /의료 정보 보안을 위한 최적의 설계/);
  assert.doesNotMatch(html, /이런 이유로 AlphaLayer는 개발 상태를 숨기지 않습니다/);
  assert.doesNotMatch(html, /현재 범위|주장하지 않는 범위|현재 작동하는 통제|구현·검증 중인 경로/);
  assert.doesNotMatch(html, /technology-claim-boundary|technology-scope-columns|technology-page-footer/);
  assert.doesNotMatch(html, /CLAIM BOUNDARY|STATUS NOTE|기술 상태에 대하여/);
  assert.match(html, /평가 설계를 위한 공식 참고자료/);
  assert.match(html, /현재 Evaluation Gate의 검증된 범위는 이 capability에 한정됩니다/);
  assert.match(html, /data-snapshot-state="live"/);
  assert.match(html, /정규화 논문 레코드/);
  assert.match(html, /초록 보유 논문/);
  assert.match(html, /노출 가능한 진료지침/);
  assert.match(html, /출처·변경 관찰 기록/);
  assert.doesNotMatch(html, /Operational signal|alphaevidence-ops-table/);
  assert.match(html, /사용자 검토/);
  assert.match(html, /User Review/);
  assert.doesNotMatch(html, /의료진|Human Clinical Review|HUMAN CLINICAL REVIEW|CLINICAL LOOP|CLINICAL REVIEW/);
  assert.match(html, /TechArticle/);
  assert.equal((html.match(/<figcaption>/g) ?? []).length, 6);
  assert.match(html, /technology-raw-diagram-overview/);
  assert.match(html, /technology-raw-diagram-evidence/);
  assert.match(html, /technology-raw-diagram-engine/);
  assert.match(html, /technology-raw-diagram-evaluation/);
  assert.match(html, /technology-raw-diagram-document/);
  assert.match(html, /technology-raw-diagram-layer/);
  assert.doesNotMatch(html, /개발 지시 — 비공개|개발 계약 — 비공개|내부 근거 지도/);
});

test("implements the AlphaEvidence public snapshot as a bounded server contract", async () => {
  const [dataSource, route, snapshot, motion, nav, chrome, css] = await Promise.all([
    readFile(new URL("../app/alphaevidence-snapshot.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/api/technology/alphaevidence-snapshot/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/AlphaEvidenceSnapshot.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/TechnologyMotion.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/TechnologyArticleNav.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteChrome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/technology.css", import.meta.url), "utf8"),
  ]);

  assert.match(dataSource, /viore_alphaevidence_public_snapshot/);
  assert.match(dataSource, /technology\.alphaevidence\.snapshot\.v1/);
  assert.match(dataSource, /ALPHAEVIDENCE_SNAPSHOT_STALE_AFTER_MS/);
  assert.match(dataSource, /AbortSignal\.timeout\(ALPHAEVIDENCE_SNAPSHOT_FETCH_TIMEOUT_MS\)/);
  assert.match(dataSource, /next: \{ revalidate: ALPHAEVIDENCE_SNAPSHOT_REVALIDATE_SECONDS \}/);
  assert.doesNotMatch(dataSource, /service_role|service-role|secret key/i);
  assert.match(route, /result\.state === "unavailable" \? 503 : 200/);
  assert.match(snapshot, /집계 갱신 중/);
  assert.match(snapshot, /마지막 성공/);
  assert.match(snapshot, /prefers-reduced-motion: reduce/);
  assert.match(snapshot, /IntersectionObserver/);
  assert.doesNotMatch(snapshot, /Operational signal|Source health|Ingestion lag|alphaevidence-ops-table|alphaevidence-inline-stats/);
  assert.match(motion, /<svg/);
  assert.match(motion, /<title/);
  assert.match(motion, /<desc/);
  assert.doesNotMatch(motion, /<iframe|raw-paper-mint/);
  assert.match(motion, /function SvgNode/);
  assert.match(motion, /function EvaluationSvg/);
  assert.match(motion, /technology-paper-svg-mobile/);
  assert.match(motion, /diagram-paper-grain/);
  assert.match(motion, /Source & Change/);
  assert.match(motion, /Rights Snapshot/);
  assert.match(motion, /Source-bound Translation/);
  assert.match(motion, /Evidence Search/);
  assert.match(motion, /Bounded Generation/);
  assert.match(motion, /업로드 문서 번역/);
  assert.match(motion, /사용자에게 허용된 결과/);
  assert.doesNotMatch(motion, /Three records|Registered path|Residual-risk evaluation/);
  assert.match(motion, /local render/);
  assert.match(motion, /Current Security Controls/);
  assert.match(motion, /IntersectionObserver/);
  assert.match(motion, /prefers-reduced-motion: reduce/);
  assert.match(motion, /is-enhanced/);
  assert.match(motion, /observer\.disconnect\(\)/);
  assert.match(nav, /aria-label="Technology articles"/);
  assert.match(chrome, /href=\{technologyRouteFor\(language\)\}/);
  assert.doesNotMatch(chrome, /technologyRouteFor\(language, "(?:alphaevidence|alphadoc-engine|alphadocument|alphalayer)"\)/);
  assert.match(chrome, /\["product"\] as MenuId\[\]/);
  assert.match(chrome, /routeFor\(language, "knowledge"\)/);
  assert.doesNotMatch(chrome, /routeFor\(language, "clinical-council"\)/);
  assert.match(chrome, /nav-link nav-link-disabled/);
  assert.match(chrome, /<small>Coming soon<\/small>/);
  assert.match(css, /\.technology-article-nav \{\s*position: fixed;/);
  assert.match(css, /\.technology-post \{\s*scroll-margin-top:/);
  assert.match(css, /--technology-page: var\(--dark-paper-base\)/);
  assert.match(css, /--technology-paper: var\(--dark-paper-image\)/);
  assert.match(css, /--technology-blue: #8bb5ff/);
  assert.match(css, /--technology-red: #ff8177/);
  assert.match(css, /"Pretendard Variable", Pretendard/);
  assert.match(css, /--diagram-paper: #f7f6f1/);
  assert.match(css, /\.technology-paper-svg-mobile/);
  assert.match(css, /\.technology-paper-svg \.diagram-box\.is-dashed/);
  assert.match(css, /\.technology-paper-svg \.diagram-paper-grain/);
  assert.doesNotMatch(css, /#e7efe9|raw-paper-mint|raw-paper-lilac|radial-gradient\(circle at 50% -8%/);
  assert.match(css, /\.site-header\.site-header-dark/);
  assert.match(css, /\.site-header\.site-header-dark \{[\s\S]*?color: #f5f5f7;/);
  assert.match(css, /\.site-header-dark \.contact-link \{[\s\S]*?color: #f5f5f7;/);
  assert.match(css, /\.technology-article-nav \{[\s\S]*?border: 0;[\s\S]*?background: transparent;[\s\S]*?backdrop-filter: none;/);
  assert.match(css, /\.technology-article-nav-inner \{[\s\S]*?border: 0;[\s\S]*?background: transparent;[\s\S]*?backdrop-filter: none;/);
  assert.match(css, /\.technology-data-section \{[\s\S]*?margin: 58px 0 0 !important;/);
  assert.doesNotMatch(css, /background: linear-gradient\(90deg, rgba\(17, 17, 20, \.68\), transparent\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  const mobileTechnologyCss = css.slice(
    css.indexOf("@media (max-width: 760px)"),
    css.indexOf("@media (max-width: 480px)"),
  );
  assert.match(mobileTechnologyCss, /\.alphaevidence-count-table \{[\s\S]*?min-width: 0;/);
  assert.match(mobileTechnologyCss, /\.alphaevidence-count-index,[\s\S]*?display: none;/);
  assert.doesNotMatch(css, /alphaevidence-ops-table|alphaevidence-inline-stats|alphaevidence-lag-pending/);
});

test("classifies fresh and stale AlphaEvidence snapshots at the fixed boundary", async () => {
  const {
    ALPHAEVIDENCE_SNAPSHOT_STALE_AFTER_MS,
    parseAlphaEvidenceSnapshot,
    snapshotStateAt,
  } = await import(new URL("../app/alphaevidence-snapshot.ts", import.meta.url));
  const generatedAt = "2026-07-20T12:00:00.000Z";
  const snapshot = parseAlphaEvidenceSnapshot({
    schema_version: "technology.alphaevidence.snapshot.v1",
    generated_at: generatedAt,
    data_as_of: generatedAt,
    counts: {
      canonical_papers: 1,
      papers_with_abstract: 1,
      visible_guidelines: 1,
      source_change_observations: 1,
      managed_units: 1,
    },
    source_health: { healthy: 1, degraded: 0, failed: 0, unknown: 0 },
    observation_outcomes_30d: { unchanged: 0, updated: 0, conflict: 0, unknown: 1 },
    ingestion_lag_hours_30d: { p50: null, p95: null, max: null, unknown_count: 1 },
    observation_window_days: 30,
    health_max_stale_hours: 48,
  });

  assert.ok(snapshot);
  const generatedAtMs = Date.parse(generatedAt);
  assert.equal(
    snapshotStateAt(snapshot, generatedAtMs + ALPHAEVIDENCE_SNAPSHOT_STALE_AFTER_MS),
    "live",
  );
  assert.equal(
    snapshotStateAt(snapshot, generatedAtMs + ALPHAEVIDENCE_SNAPSHOT_STALE_AFTER_MS + 1),
    "stale",
  );
});

test("redirects legacy Technology detail routes to the matching article anchor", async () => {
  const response = await render("/ko/technology/alphaevidence");

  assert.equal(response.status, 307);
  assert.match(response.headers.get("location") ?? "", /\/ko\/technology#technology-alphaevidence$/);
});
