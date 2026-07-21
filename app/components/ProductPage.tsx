/* eslint-disable @next/next/no-img-element -- Real product captures need predictable layering for crossfades and motion. */
"use client";

import { useEffect, useRef, useState } from "react";
import { technologyRouteFor, type Language } from "@/app/site-content";
import { AlphadocHeroMotion } from "@/app/components/AlphadocHeroMotion";
import { AlphadocWorkspaceMotion } from "@/app/components/AlphadocWorkspaceMotion";
import { AlphadocsPhoneDemo } from "@/app/components/AlphadocsPhoneDemo";
import { CompanyEnergyCanvas } from "@/app/components/CompanyEnergyCanvas";

const ASSET_ROOT = "/assets/product/alphadoc";
const ALPHADOC_ASSET_ROOT = "https://www.alphadoc.ai";

type GalleryItem = {
  id: string;
  label: string;
  icon: string;
  note?: string;
  title: string;
  body: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

const productCopy = {
  ko: {
    nav: [
      ["overview", "한눈에"],
      ["clinical", "앱"],
      ["alphadocs", "알파닥스"],
    ],
    hero: {
      title: ["Alphadoc, an AI Medical Workspace"],
      lead: "임상 질문부터 근거 확인, 문서 작성과 번역까지.\n의료인의 업무를 앱의 형태로 이어주는 공간.",
      primary: "알파닥 시작하기",
      visualLabel: "의료인들의 하루를 바꾸는 워크스페이스라는 문구 뒤로 알파닥 검색 화면이 완성되는 애니메이션",
    },
    anatomy: {
      title: "모든 것이 하나의 화면 안에",
      body: "필요한 모든 기능이 단 하나의 공간에 펼쳐집니다.\n복잡함은 비우고 시야는 넓혀, 당신이 필요한 순간에 완벽하게 집중할 수 있도록.",
      figures: [
        ["Widgetbar", "오늘의 맥락", "날씨, 일정, 최근 업무의 흐름", "03-widget-context.jpg", "알파닥 Widgetbar에 표시된 날씨와 월간 달력", 256, 347],
        ["Workspace", "지금 하는 일", "질문, 도구, 기록과 문서", "01-workspace-apps.jpg", "알파닥 Workspace의 앱 화면", 648, 648],
        ["Alphawing", "새 문헌과 소식", "뉴스, 문헌, 의료인 연결", "13-alphawing-literature.jpg", "국가와 분야, 최신순과 인용순을 고르는 알파닥 Alphawing 문헌 탭", 320, 648],
      ],
    },
    clinical: {
      title: "모든 가능성은 앱 하나로",
      body: "필요한 순간 앱을 바로 실행하세요.\n더 높은 자율성, 손쉬운 연동, 그리고 계속해서 추가되는 앱까지.\n하나의 공간에서 이 모든 것이 가능해집니다.",
      items: [
        { id: "papers", label: "논문 검색", icon: "/brand/feature-icons/panel/paper/logo.svg", title: "수많은 논문 사이에서, 지금 필요한 근거를 찾습니다.", body: "국내외 의학 논문을 한곳에서 탐색하고 제목과 출처, 발행일, 원문을 함께 확인합니다. 질문에서 근거 검토까지 흩어졌던 검색 단계를 하나로 줄였습니다.", src: "11-paper-search.jpg", alt: "국내외 논문 카드와 출처, 날짜가 보이는 알파닥 논문 검색 화면", width: 960, height: 576 },
        { id: "notices", label: "의료 공지", icon: "/brand/feature-icons/functions/medical-notices/logo.png", title: "의료 현장의 변화를 놓치지 않도록, 흩어진 공지를 한곳에 모읍니다.", body: "기관별 의료 공지를 출처와 함께 정리합니다. 목록에서 상세 내용과 원문까지 바로 이어져 중요한 변화를 더 빠르게 파악할 수 있습니다.", src: "10-medical-notices.jpg", alt: "출처 목록, 공지 목록, 원문 상세가 한 화면에 보이는 알파닥 의료 공지 UI", width: 1120, height: 642 },
        { id: "forms", label: "진료서류", icon: "/brand/feature-icons/functions/guide/logo.svg", title: "반복되는 서류 업무를, 하나의 완성된 흐름으로 바꿉니다.", body: "진단서와 확인서를 유형별로 찾고 문서에 필요한 항목을 같은 작업 공간에서 채웁니다. 반복되는 문서 업무가 진료의 흐름을 끊지 않도록 설계했습니다.", src: "05-official-documents.jpg", alt: "법정과 표준 진료서류 유형을 고르는 알파닥 진료서류 작성 화면", width: 608, height: 656 },
        { id: "translation", label: "문서 번역", icon: "/brand/feature-icons/functions/document-translation/logo.svg", title: "언어가 달라도, 의료 문서의 흐름은 끊기지 않습니다.", body: "파일을 올리면 전체 번역과 요약 번역 중 목적에 맞는 방식을 고를 수 있습니다. 목표 언어까지 한 화면에서 설정해, 문서를 읽고 활용하는 다음 단계로 곧바로 이어갑니다.", src: "09-document-translation.jpg", alt: "파일 형식, 번역 방식과 목표 언어를 고르는 알파닥 문서 번역 화면", width: 384, height: 656 },
        { id: "tools", label: "의료 도구", icon: "/brand/feature-icons/functions/medical-tools/logo.svg", note: "외 다수의 앱들", title: "판단이 필요한 순간, 필요한 의료 도구를 바로 엽니다.", body: "eGFR, CHA₂DS₂-VASc, HAS-BLED, CURB-65 등 자주 쓰는 임상 계산 도구를 분야별로 모았습니다. 검색과 이동을 줄여 필요한 계산을 현재 업무 안에서 곧바로 이어갑니다.", src: "08-medical-tools.jpg", alt: "eGFR, CHA2DS2-VASc, HAS-BLED, CURB-65 등이 보이는 알파닥 의료 도구 목록", width: 500, height: 576 },
      ] satisfies GalleryItem[],
    },
    alphadocs: {
      title: "소통의 모든 순간을,\n가장 트렌디하고 안전하게",
      body: "알파닥스는 당신이 원하는 어떤 모습으로든 자유롭게 이어지는 트렌디한 프라이빗 커뮤니티입니다. 강력한 프라이버시 위에 펼쳐지는 다채로운 소통을 경험해 보세요.",
      items: [
        ["Intuitive UI", "모바일 환경에 완벽히 최적화된 인터페이스를 제공합니다. 매일 쓰던 앱처럼 직관적이고 매끄러운 디자인 덕분에, 별도의 적응 과정 없이 바로 대화에 몰입할 수 있습니다."],
        ["Verified Access", "철저하게 인증된 알파닥 유저만 참여할 수 있는 프라이빗 커뮤니티입니다. 불필요한 외부 시선에서 벗어나, 믿을 수 있는 사람들과 오롯이 안전한 담소를 나눠보세요."],
        ["AlphaEncryption", "바이오레에서 독자 개발한 암호화 기술이 오가는 모든 메시지와 데이터를 철저하게 보호합니다. 당신의 소중한 대화는 오직 당신의 커뮤니티 안에서만 안전하게 머뭅니다."],
      ],
    },
    cta: {
      title: ["바이오레의 첫번째 선형,", "이제 시작해보세요."],
      primary: "알파닥 시작하기",
      secondary: "Technology 살펴보기",
    },
  },
  en: {
    nav: [["overview", "Overview"], ["clinical", "Apps"], ["alphadocs", "Alphadocs"]],
    hero: {
      title: ["Alphadoc, an AI Medical Workspace"],
      lead: "From clinical questions and evidence review to document creation and translation. A space that connects medical work through apps.",
      primary: "Start Alphadoc",
      visualLabel: "An animation introducing Alphadoc as the workspace changing every clinician's day",
    },
    anatomy: {
      title: "Three roles in one screen",
      body: "Today's context stays on the left, active work sits in the center, and incoming knowledge flows on the right.",
      figures: [
        ["Widgetbar", "Today's context", "Weather, schedule, and recent work", "03-widget-context.jpg", "Weather and monthly calendar in the Alphadoc Widgetbar", 256, 347],
        ["Workspace", "Work in progress", "Questions, clinical tools, records, and documents", "01-workspace-apps.jpg", "The Alphadoc Workspace app launcher", 648, 648],
        ["Alphawing", "Incoming knowledge", "News, literature, and professional connections", "13-alphawing-literature.jpg", "The literature tab in Alphawing", 320, 648],
      ],
    },
    clinical: {
      title: "Every possibility, one app.",
      body: "Open the app you need, when you need it.\nMore autonomy, seamless connections, and a growing set of apps.\nEverything comes together in one workspace.",
      items: [
        { id: "papers", label: "Literature search", icon: "/brand/feature-icons/panel/paper/logo.svg", title: "Find the evidence you need among thousands of papers.", body: "Search medical literature from Korea and abroad, then review titles, sources, publication dates, and original articles together. The path from question to evidence review becomes one focused flow.", src: "11-paper-search.jpg", alt: "Literature search in Alphadoc", width: 960, height: 576 },
        { id: "notices", label: "Medical notices", icon: "/brand/feature-icons/functions/medical-notices/logo.png", title: "Bring scattered medical updates into one clear view.", body: "Review notices by institution with their sources attached. Move directly from the list to details and the original notice, so important changes are easier to identify.", src: "10-medical-notices.jpg", alt: "Medical notices in Alphadoc", width: 1120, height: 642 },
        { id: "forms", label: "Medical forms", icon: "/brand/feature-icons/functions/guide/logo.svg", title: "Turn repetitive paperwork into one complete flow.", body: "Find certificates and confirmations by type, then complete the required fields in the same workspace. Document work stays connected to the clinical task around it.", src: "05-official-documents.jpg", alt: "Medical form catalog in Alphadoc", width: 608, height: 656 },
        { id: "translation", label: "Document translation", icon: "/brand/feature-icons/functions/document-translation/logo.svg", title: "Language changes. The flow of the medical document does not.", body: "Upload a file and choose full or summary translation for the task at hand. Set the target language in the same view and continue directly into reading and using the document.", src: "09-document-translation.jpg", alt: "Document translation in Alphadoc", width: 384, height: 656 },
        { id: "tools", label: "Medical tools", icon: "/brand/feature-icons/functions/medical-tools/logo.svg", note: "and many more apps", title: "Open the right medical tool at the moment of judgment.", body: "Access frequently used clinical calculators including eGFR, CHA2DS2-VASc, HAS-BLED, and CURB-65 by category. Reduce searching and switching, and keep each calculation within the task at hand.", src: "08-medical-tools.jpg", alt: "Medical tool catalog in Alphadoc", width: 500, height: 576 },
      ] satisfies GalleryItem[],
    },
    alphadocs: {
      title: "Every moment of connection,\nmore current and more secure",
      body: "Alphadocs is a private community that connects freely in whatever form you choose. Discover vibrant conversation built on robust privacy.",
      items: [
        ["Intuitive UI", "A mobile-first interface feels as intuitive and fluid as the apps you already use, so you can join the conversation without a learning curve."],
        ["Verified Access", "Only verified Alphadoc users can join this private community. Step away from outside attention and talk freely with people you can trust."],
        ["AlphaEncryption", "Viore's proprietary encryption technology protects every message and piece of data exchanged. Your conversations remain safely within your community."],
      ],
    },
    cta: {
      title: ["Viore's first linearity,", "starts here."],
      primary: "Start Alphadoc",
      secondary: "Explore Technology",
    },
  },
} as const;

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useInView<T extends HTMLElement>(threshold = 0.55) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

function MotionGallery({ id, items, ariaLabel, wide = false }: { id: string; items: readonly GalleryItem[]; ariaLabel: string; wide?: boolean }) {
  const [active, setActive] = useState(0);
  const [galleryRef, inView] = useInView<HTMLDivElement>(0.58);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || reducedMotion) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % items.length), 5200);
    return () => window.clearInterval(timer);
  }, [active, inView, items.length, reducedMotion]);

  const current = items[active];

  return (
    <div ref={galleryRef} className={`ap-motion-gallery ${wide ? "is-wide" : ""}`}>
      <div className="ap-gallery-tabs" role="tablist" aria-label={ariaLabel}>
        {items.map((item, index) => (
          <button
            id={`${id}-tab-${item.id}`}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls={`${id}-panel`}
            className={active === index ? "is-active" : ""}
            onClick={() => setActive(index)}
            key={item.id}
          >
            <span className="ap-gallery-tab-content">
              <img src={`${ALPHADOC_ASSET_ROOT}${item.icon}`} alt="" aria-hidden="true" />
              <span className="ap-gallery-tab-copy">
                <strong>{item.label}</strong>
                {item.note ? <small>{item.note}</small> : null}
              </span>
            </span>
            <i aria-hidden="true"><b key={`${active}-${inView}`} className={active === index && inView && !reducedMotion ? "is-running" : ""} /></i>
          </button>
        ))}
      </div>
      <div className="ap-gallery-display" id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${current.id}`}>
        <figure className="ap-gallery-figure">
          <div className="ap-gallery-frame">
            {items.map((item, index) => (
              <img
                className={active === index ? "is-active" : ""}
                src={`${ASSET_ROOT}/${item.src}`}
                alt={active === index ? item.alt : ""}
                width={item.width}
                height={item.height}
                loading="lazy"
                decoding="async"
                aria-hidden={active !== index}
                key={item.id}
              />
            ))}
          </div>
          <figcaption><strong>{current.title}</strong><span>{current.body}</span></figcaption>
        </figure>
      </div>
    </div>
  );
}

export function ProductPage({ language }: { language: Language }) {
  const content = productCopy[language];
  const [activeSection, setActiveSection] = useState("overview");
  const [finalCtaRef, finalCtaInView] = useInView<HTMLElement>(0.12);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-ap-section]"));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveSection(visible.target.id);
    }, { rootMargin: "-24% 0px -62%", threshold: [0, 0.2, 0.5] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Alphadoc",
    applicationCategory: "Medical workspace software",
    operatingSystem: "Web",
    url: "https://www.alphadoc.ai",
    description: language === "ko"
      ? "질문과 근거 탐색, 임상 도구, 진료노트와 문서를 한곳에서 이어주는 Medical Workspace"
      : "A Medical Workspace connecting questions, evidence, clinical tools, notes, and documents in one place",
    inLanguage: language,
  };

  return (
    <article className={`alphadoc-product lang-${language}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="ap-hero" id="overview" data-ap-section>
        <div className="ap-hero-copy">
          <h1>{content.hero.title.map((line) => <span key={line}>{line}</span>)}</h1>
          <p className="ap-hero-lead">{content.hero.lead}</p>
          <div className="ap-hero-actions">
            <a className="ap-button ap-button-primary" href="https://www.alphadoc.ai" target="_blank" rel="noreferrer">{content.hero.primary}<span aria-hidden="true">↗</span></a>
          </div>
        </div>

        <div className="ap-hero-visual">
          <AlphadocHeroMotion language={language} label={content.hero.visualLabel} />
        </div>
      </section>

      <nav className="ap-local-nav" aria-label={language === "ko" ? "알파닥 제품 페이지" : "Alphadoc product page"}>
        <div>
          {content.nav.map(([id, label]) => <a href={`#${id}`} aria-current={activeSection === id ? "location" : undefined} key={id}>{label}</a>)}
        </div>
      </nav>

      <section className="ap-anatomy ap-shell" id="workspace">
        <header className="ap-section-head">
          <div><h2>{content.anatomy.title}</h2></div>
          <p className="ap-anatomy-lead">{content.anatomy.body}</p>
        </header>
        <figure className="ap-anatomy-motion-figure">
          <AlphadocWorkspaceMotion
            language={language}
            label={language === "ko"
              ? "달력 색상 마킹, 임상 질문과 답변, Alphawing 탭 전환이 순서대로 이어지는 알파닥 화면"
              : "The Alphadoc workspace moving from calendar marking to a clinical answer and Alphawing tabs"}
          />
        </figure>
      </section>

      <section className="ap-showcase ap-shell" id="clinical" data-ap-section>
        <header className="ap-section-head">
          <div><h2>{content.clinical.title}</h2></div>
          <p className="ap-clinical-lead">{content.clinical.body}</p>
        </header>
        <MotionGallery id="clinical-gallery" items={content.clinical.items} ariaLabel={content.clinical.title} />
      </section>

      <section className="ap-alphadocs" id="alphadocs" data-ap-section>
        <div className="ap-alphadocs-visual"><AlphadocsPhoneDemo language={language} /></div>
        <div className="ap-alphadocs-copy">
          <h2>{content.alphadocs.title}</h2>
          <p>{content.alphadocs.body}</p>
          <div className="ap-alphadocs-list">
            {content.alphadocs.items.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}
          </div>
        </div>
      </section>

      <section ref={finalCtaRef} className={`ap-final-cta${finalCtaInView ? " is-playing" : ""}`}>
        <CompanyEnergyCanvas quality="balanced" />
        <div className="ap-final-screen" aria-hidden="true">
          <div className="ap-final-logo-stage">
            <img className="ap-final-logo" src="/brand/alphadoc-alpha.png" alt="" width="419" height="365" loading="lazy" decoding="async" />
          </div>
        </div>
        <div className="ap-final-copy">
          <h2>{content.cta.title.map((line) => <span key={line}>{line}</span>)}</h2>
          <div className="ap-hero-actions">
            <a className="ap-button ap-button-primary" href="https://www.alphadoc.ai" target="_blank" rel="noreferrer">{content.cta.primary}<span aria-hidden="true">↗</span></a>
            <a className="ap-text-link" href={technologyRouteFor(language)}>{content.cta.secondary}<span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>
    </article>
  );
}
