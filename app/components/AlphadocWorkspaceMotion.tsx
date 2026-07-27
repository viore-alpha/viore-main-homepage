import type { Language } from "@/app/site-content";
import { ViewportMotion } from "@/app/components/ViewportMotion";

const AD_ASSET = "https://alphadoc.ai";
const GENERATED_NEWS_IMAGE = "/assets/product/alphadoc/generated/news-chest-pain-night-optimized.webp";
const GENERATED_SECONDARY_NEWS_IMAGE = "/assets/product/alphadoc/generated/news-antibiotic-review-optimized.webp";
const GENERATED_COMMUNITY_IMAGE = "/assets/product/alphadoc/generated/community-chest-pain-handoff-optimized.webp";

const uiCopy = {
  ko: {
    greeting: "좋은 하루에요!",
    name: "알파닥님",
    role: "의료인",
    today: "Today is 7월 21일",
    conversations: [
      "혼합 산-염기 장애 계산",
      "CrCl 35에서 DOAC 용량 조절",
      "흉통 환자 troponin 재검 간격",
      "패혈증 의심 환자 초기 처치",
      "고혈압 2제 병용 시작 기준",
      "소아 발열 진료의 레드 플래그",
      "천식 급성 악화 초기 처치",
    ],
    questionLines: [
      "pH 7.28, PaCO₂ 28, HCO₃⁻ 13, Na 138, Cl 102, albumin 2.4,",
      "lactate 5.1입니다. 혼합 산-염기 장애를 계산표로 정리해줘.",
    ],
    typedQuestion: "ABGA·전해질로 혼합 산-염기 장애를 계산표로 정리해줘",
    input: "임상 질문을 물어봐 주세요",
    answerTitle: "혼합 산-염기 장애 계산",
    answerLead: "제시한 ABGA와 전해질을 단계별로 계산하면 다음과 같습니다.",
    tableHeaders: ["단계", "계산", "결과", "해석"],
    tableRows: [
      ["일차 장애", "pH↓ · HCO₃⁻↓", "대사성 산증", "산혈증의 주된 원인"],
      ["Anion gap", "138−(102+13)", "23 mEq/L", "고음이온차"],
      ["Albumin 보정", "23+2.5×(4.4−2.4)", "28 mEq/L", "저알부민 보정 후 상승"],
      ["Winter 공식", "1.5×13+8 ±2", "25.5–29.5", "PaCO₂ 28: 적절한 보상"],
      ["Delta gap", "(28−12)−(24−13)", "+5", "뚜렷한 추가 대사성 장애 없음"],
    ],
    answerConclusion: ["고음이온차 대사성 산증이며 호흡성 보상은 적절합니다.", "Lactate 5.1 mmol/L가 상승해 있어 원인 평가와 추적이 필요합니다."],
    evidenceLabel: "출처",
    evidenceSources: [
      ["Winter 공식 · 1967", "Albert et al. · PMID 6016545"],
      ["Albumin 보정 · 1998", "Figge et al. · PMID 9824071"],
      ["Delta gap · 1990", "Wrenn · PMID 2240729"],
    ],
    followups: ["원인별 감별표 만들기", "보상 범위 다시 계산"],
    savedConversation: "오늘 저장한 대화 · 7건",
    literatureExtra: ["New evidence for early sepsis bundles", "Critical Care Update · 2026"],
    briefing: "오늘의 브리핑",
    briefingTime: "21시에 고른 기사에요.",
    newsTitle: "응급실 흉통 평가,\n연속 검사 중심으로 개편",
    newsMeta: "메디컬 브리프 · 2시간 전",
    newsParagraphs: [
      ["수도권 권역응급의료센터가 흉통 환자의 초기 평가 흐름을", "연속 ECG와 hs-cTn 중심으로 재정비했습니다."],
      ["접수 직후 위험 신호를 먼저 분류하고 첫 검사 결과에 따라", "1시간 재검 또는 관찰 경로로 나눕니다."],
      ["경계값 환자는 증상 변화와 ECG를 함께 검토하고", "단일 수치만으로 퇴원을 결정하지 않도록 했습니다."],
      ["퇴원 환자에게는 재내원 신호와 외래 추적 시점을", "같은 화면에서 안내하도록 구성했습니다."],
    ],
    secondaryNewsTitle: "중환자실 항생제 재평가,\n48시간 체크리스트 도입",
    secondaryNewsMeta: "임상저널 · 4시간 전",
    secondaryNewsSummary: ["배양 결과와 임상 반응을 함께 검토해", "광범위 항생제 사용을 줄이는 경로입니다."],
    newsListTitle: "전체 뉴스",
    newsListCount: "24개",
    newsListItems: [
      {
        category: "의료",
        source: "청년의사",
        time: "4시간 전",
        title: ["중환자실 항생제 재평가,", "48시간 체크리스트 도입"],
      },
      {
        category: "정책",
        source: "의협신문",
        time: "6시간 전",
        title: ["필수의료 지원체계 개편안,", "현장 의견수렴 시작"],
      },
      {
        category: "산업",
        source: "메디게이트뉴스",
        time: "8시간 전",
        title: ["병원 진료기록 표준화,", "상호운용성 논의 본격화"],
      },
    ],
    literatureTitle: "새로 올라온 문헌",
    communityTitle: "핫 포스트",
    communityTextPost: {
      author: "개원한지2년",
      time: "13분",
      body: ["직원 면담을 월 1회로 잡아봤는데 생각보다", "할 이야기가 많네요. 정기 면담을 따로 하시나요?"],
      replies: [
        ["동네소아과", "저희는 분기마다 해요. 질문을 미리 받아요."],
        ["문서정리중", "합의한 한 가지만 적어두니 수월했습니다."],
      ],
      likes: "18",
      comments: "9",
    },
    communityPhotoPost: {
      author: "새벽두시라떼",
      time: "7분",
      body: ["내일 컨퍼런스 전에 흉통 프로토콜 다시 보는 중입니다.", "저희는 0/1시간 경로로 바꿨는데, 야간에도", "그대로 적용하시나요?"],
      likes: "24",
      comments: "11",
    },
    communityNextPost: ["로딩중인전공의", "· 21분", "수련병원 선택에서 가장 크게 본 조건은?"],
  },
  en: {
    greeting: "Have a good day!",
    name: "Alphadoc",
    role: "Clinician",
    today: "Today is July 21",
    conversations: [
      "Mixed acid-base calculation",
      "DOAC dosing with CrCl 35",
      "Troponin retest interval in chest pain",
      "Initial management of suspected sepsis",
      "Starting dual therapy for hypertension",
      "Red flags in pediatric fever",
      "Initial care for acute asthma",
    ],
    questionLines: [
      "pH 7.28, PaCO₂ 28, HCO₃⁻ 13, Na 138, Cl 102, albumin 2.4,",
      "and lactate 5.1. Build a table for the mixed acid-base analysis.",
    ],
    typedQuestion: "Build a table for this mixed acid-base disorder",
    input: "Ask a clinical question",
    answerTitle: "Mixed acid-base calculation",
    answerLead: "A stepwise calculation from the ABG and electrolytes gives:",
    tableHeaders: ["Step", "Calculation", "Result", "Interpretation"],
    tableRows: [
      ["Primary disorder", "pH↓ · HCO₃⁻↓", "Metabolic acidosis", "Primary driver of acidemia"],
      ["Anion gap", "138−(102+13)", "23 mEq/L", "High anion gap"],
      ["Albumin correction", "23+2.5×(4.4−2.4)", "28 mEq/L", "Elevated after correction"],
      ["Winter formula", "1.5×13+8 ±2", "25.5–29.5", "PaCO₂ 28: appropriate"],
      ["Delta gap", "(28−12)−(24−13)", "+5", "No clear second metabolic process"],
    ],
    answerConclusion: ["High-anion-gap metabolic acidosis with appropriate respiratory compensation.", "Lactate is elevated at 5.1 mmol/L and warrants etiologic assessment and follow-up."],
    evidenceLabel: "Sources",
    evidenceSources: [
      ["Winter formula · 1967", "Albert et al. · PMID 6016545"],
      ["Albumin correction · 1998", "Figge et al. · PMID 9824071"],
      ["Delta gap · 1990", "Wrenn · PMID 2240729"],
    ],
    followups: ["Build a differential table", "Recheck compensation range"],
    savedConversation: "7 conversations saved today",
    literatureExtra: ["New evidence for early sepsis bundles", "Critical Care Update · 2026"],
    briefing: "Today’s briefing",
    briefingTime: "Selected at 9 PM.",
    newsTitle: "Chest-pain assessment shifts\nto serial testing",
    newsMeta: "Medical Brief · 2 hours ago",
    newsParagraphs: [
      ["A regional emergency center reorganized early chest-pain", "assessment around serial ECG and high-sensitivity troponin."],
      ["Red flags are screened first, followed by a one-hour", "retest or observation pathway after initial results."],
      ["Borderline results are reviewed with symptom changes", "and ECG findings instead of a single value."],
      ["Discharge guidance keeps return precautions and", "follow-up timing together in the same workflow."],
    ],
    secondaryNewsTitle: "ICU antibiotic review adds\na 48-hour checkpoint",
    secondaryNewsMeta: "Clinical Journal · 4 hours ago",
    secondaryNewsSummary: ["Culture results and clinical response guide", "timely de-escalation of broad therapy."],
    newsListTitle: "All news",
    newsListCount: "24",
    newsListItems: [
      {
        category: "Clinical",
        source: "Medical Times",
        time: "4h",
        title: ["ICU antibiotic review adds", "a 48-hour checkpoint"],
      },
      {
        category: "Policy",
        source: "Health Policy",
        time: "6h",
        title: ["Essential-care support plan", "opens for field feedback"],
      },
      {
        category: "Industry",
        source: "Medigate News",
        time: "8h",
        title: ["Clinical-record standards", "move into implementation talks"],
      },
    ],
    literatureTitle: "New literature",
    communityTitle: "Hot posts",
    communityTextPost: {
      author: "ClinicYearTwo",
      time: "13m",
      body: ["Monthly staff check-ins bring up more than I expected.", "Do other clinic owners schedule regular one-on-ones?"],
      replies: [
        ["NeighborhoodPeds", "We meet quarterly and collect questions first."],
        ["ClosingCharts", "One written action makes the next talk easier."],
      ],
      likes: "18",
      comments: "9",
    },
    communityPhotoPost: {
      author: "LatteAt2AM",
      time: "7m",
      body: ["Reviewing our chest-pain protocol before tomorrow’s conference.", "We moved to a 0/1-hour pathway—do you keep it", "unchanged overnight?"],
      likes: "24",
      comments: "11",
    },
    communityNextPost: ["ResidentLoading", "· 21m", "What mattered most when choosing a training hospital?"],
  },
} as const;

const calendarDays = [
  ["28", true], ["29", true], ["30", true], ["1", false], ["2", false], ["3", false], ["4", false],
  ["5", false], ["6", false], ["7", false], ["8", false], ["9", false], ["10", false], ["11", false],
  ["12", false], ["13", false], ["14", false], ["15", false], ["16", false], ["17", false], ["18", false],
  ["19", false], ["20", false], ["21", false], ["22", false], ["23", false], ["24", false], ["25", false],
  ["26", false], ["27", false], ["28", false], ["29", false], ["30", false], ["31", false], ["1", true],
] as const;

const appItems = [
  ["/brand/feature-icons/functions/soap/logo.svg", "진료노트"],
  ["/brand/feature-icons/functions/guide/logo.svg", "진료서류 작성"],
  ["/brand/feature-icons/functions/drug/logo.svg", "약물 상호작용"],
  ["/brand/feature-icons/functions/medical-tools/logo.svg", "의료 도구"],
  ["/brand/feature-icons/functions/document-translation/logo.svg", "문서 번역"],
  ["/brand/feature-icons/functions/medical-notices/logo.png", "의료 공지"],
  ["/brand/feature-icons/panel/paper/logo.svg", "논문 검색"],
  ["/brand/feature-icons/panel/guideline/logo.svg", "최신 지침"],
] as const;

const tabIcons = {
  news: "/brand/feature-icons/panel/news/logo.svg",
  literature: "/brand/feature-icons/panel/literature/logo.svg",
  community: "/brand/feature-icons/panel/community/logo.svg",
} as const;

function Cursor({ className }: { className: string }) {
  return (
    <g className={className} filter="url(#apRealCursorShadow)">
      <path d="M1.7 1.6v24.2l6.5-6.2 4.5 10 5.2-2.4-4.4-9.5h9.2Z" fill="#111214" stroke="#fff" strokeWidth="2.25" strokeLinejoin="round" />
    </g>
  );
}

function TabBar({ active }: { active: "news" | "literature" | "community" }) {
  const config = active === "news"
    ? {
      width: 226,
      indicator: { x: 11, width: 106 },
      icons: { news: 32, literature: 129, community: 178 },
      labelX: 71,
    }
    : active === "literature"
      ? {
        width: 226,
        indicator: { x: 60, width: 106 },
        icons: { news: 16, literature: 81, community: 178 },
        labelX: 120,
      }
      : {
        width: 258,
        indicator: { x: 108, width: 140 },
        icons: { news: 15, literature: 64, community: 135 },
        labelX: 174,
      };
  const labels = { news: "뉴스", literature: "문헌", community: "알파닥스" } as const;

  return (
    <g>
      <rect width={config.width} height="54" rx="27" fill="url(#apRealGlass)" filter="url(#apRealSoftShadow)" />
      <rect x={config.indicator.x} y="6" width={config.indicator.width} height="42" rx="21" fill="url(#apRealPill)" stroke="rgba(255,255,255,.68)" />
      {(["news", "literature", "community"] as const).map((tab) => {
        const isActive = tab === active;
        const x = config.icons[tab];
        return (
          <g key={tab} opacity={isActive ? 1 : 0.56}>
            <image href={`${AD_ASSET}${tabIcons[tab]}`} x={x} y="11" width="32" height="32" style={{ filter: isActive ? "none" : "grayscale(1) saturate(.1) brightness(.55)" }} />
            {isActive && <text x={config.labelX} y="33" fill="#111315" fontSize="13" fontWeight="720">{labels[tab]}</text>}
          </g>
        );
      })}
    </g>
  );
}

export function AlphadocWorkspaceMotion({ language, label }: { language: Language; label: string }) {
  const copy = uiCopy[language];
  const sourceChipLayout = language === "ko"
    ? [{ x: 365, width: 140 }, { x: 515, width: 150 }, { x: 675, width: 138 }]
    : [{ x: 365, width: 156 }, { x: 531, width: 174 }, { x: 715, width: 146 }];
  const followupChipLayout = language === "ko"
    ? [{ x: 327, width: 178 }, { x: 515, width: 174 }]
    : [{ x: 327, width: 194 }, { x: 531, width: 204 }];
  const id = `workspace-${language}`;
  const newsClip = `ap-real-news-${id}`;
  const newsListClip = `ap-real-news-list-${id}`;
  const communityClip = `ap-real-community-${id}`;
  const weatherClip = `ap-real-weather-${id}`;

  return (
    <ViewportMotion
      className="ap-workspace-motion"
      deferChildren
      mountMargin="520px 0px"
      threshold={0.08}
      role="img"
      ariaLabel={label}
    >
      <svg className="ap-workspace-motion-svg" viewBox="0 0 1280 840" aria-hidden="true">
        <defs>
          <linearGradient id="apRealPage" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#fbfbfc" />
            <stop offset=".55" stopColor="#f4f5f8" />
            <stop offset="1" stopColor="#eef0f5" />
          </linearGradient>
          <linearGradient id="apRealHeader" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="rgba(255,255,255,.92)" />
            <stop offset="1" stopColor="rgba(245,245,247,.74)" />
          </linearGradient>
          <linearGradient id="apRealLeft" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="rgba(255,255,255,.88)" />
            <stop offset=".55" stopColor="rgba(248,248,250,.74)" />
            <stop offset="1" stopColor="rgba(242,242,247,.72)" />
          </linearGradient>
          <linearGradient id="apRealRight" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#fafbff" />
            <stop offset=".52" stopColor="#f7f7fb" />
            <stop offset="1" stopColor="#f1f3f8" />
          </linearGradient>
          <linearGradient id="apRealWeather" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#294975" />
            <stop offset=".48" stopColor="#1d334f" />
            <stop offset="1" stopColor="#111f33" />
          </linearGradient>
          <radialGradient id="apRealWeatherGlowA" cx="0" cy="0" r="1" gradientTransform="translate(55 165) rotate(62) scale(118 141)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#85b8e3" stopOpacity=".36" />
            <stop offset=".68" stopColor="#85b8e3" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="apRealWeatherGlowB" cx="0" cy="0" r="1" gradientTransform="translate(268 190) rotate(132) scale(106 126)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5478ab" stopOpacity=".34" />
            <stop offset=".72" stopColor="#5478ab" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="apRealWeatherArea" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#dcecff" stopOpacity=".2" />
            <stop offset="1" stopColor="#dcecff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="apRealGlass" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="rgba(255,255,255,.96)" />
            <stop offset="1" stopColor="rgba(255,255,255,.70)" />
          </linearGradient>
          <linearGradient id="apRealPill" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#fff" />
            <stop offset="1" stopColor="#f8fafc" />
          </linearGradient>
          <linearGradient id="apRealNewsShade" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="rgba(12,18,27,0)" />
            <stop offset=".42" stopColor="rgba(12,18,27,.58)" />
            <stop offset="1" stopColor="rgba(12,18,27,.92)" />
          </linearGradient>
          <radialGradient id="apRealMainGlow" cx=".5" cy=".42" r=".72">
            <stop stopColor="#fff" />
            <stop offset="1" stopColor="#f7f8fc" />
          </radialGradient>
          <filter id="apRealWindowShadow" x="-30%" y="-40%" width="160%" height="190%">
            <feDropShadow dx="0" dy="18" stdDeviation="21" floodColor="#111113" floodOpacity=".08" />
          </filter>
          <filter id="apRealSoftShadow" x="-30%" y="-40%" width="160%" height="190%">
            <feDropShadow dx="0" dy="9" stdDeviation="11" floodColor="#231815" floodOpacity=".09" />
          </filter>
          <filter id="apRealComposerShadow" x="-20%" y="-80%" width="140%" height="260%">
            <feDropShadow dx="0" dy="12" stdDeviation="13" floodColor="#1f2328" floodOpacity=".14" />
          </filter>
          <filter id="apRealPhotoShadow" x="-20%" y="-30%" width="140%" height="170%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#111" floodOpacity=".12" />
          </filter>
          <filter id="apRealCursorShadow" x="-80%" y="-50%" width="260%" height="240%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" floodColor="#000" floodOpacity=".6" />
          </filter>
          <filter id="apRealRainBlur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.1" />
          </filter>
          <clipPath id={weatherClip}><rect x="20" y="176" width="245" height="133" rx="22" /></clipPath>
          <clipPath id={newsClip}><rect x="968" y="263" width="288" height="146" rx="18" /></clipPath>
          <clipPath id={newsListClip}>
            <rect x="976" y="548" width="56" height="56" rx="12" />
            <rect x="976" y="634" width="56" height="56" rx="12" />
            <rect x="976" y="720" width="56" height="56" rx="12" />
          </clipPath>
          <clipPath id={communityClip}><rect x="984" y="504" width="256" height="126" rx="13" /></clipPath>
        </defs>

        <rect width="1280" height="840" fill="url(#apRealPage)" />

        <g className="ap-real-shell">
          <rect x="8" y="8" width="1264" height="52" rx="26" fill="url(#apRealHeader)" filter="url(#apRealWindowShadow)" />
          <g transform="translate(25 17) scale(.0883)" aria-hidden="true">
            <path d="M162 1.1c-67.7 7.7-126.9 53.7-150.4 117.1-32.7 88.1 6.5 186.2 90.9 227.2 80.7 39.4 179.1 13.9 229.6-59.4 3.2-4.7 6.3-9 6.8-9.7.6-.6 3.9-7.1 7.5-14.5 6.5-13.5 10.9-25.8 14.5-40.3 1.4-5.7 52.1-175.9 57.7-193.8.5-1.6-1.4-1.7-33.1-1.5l-33.7.3-9.3 24.8c-5.1 13.7-9.6 25.1-9.9 25.5-.4.3-1.3-.3-2.1-1.5-19.7-28.2-53.3-53.2-87.6-65.1-24.3-8.5-55.2-12-80.9-9.1Zm33 68.9c26.2 3.2 49.2 14.3 67.5 32.5 44 44.1 44 114.9 0 159-28.5 28.5-69.2 39.5-108.5 29.5-25.5-6.5-50.1-24-64.8-45.9-13.6-20.2-19.3-39-19.3-63.1 0-23.9 5.6-42.6 18.7-62.2 23.4-35.2 65.3-54.8 106.4-49.8Z" fill="#1d1d1f" />
            <path d="M335 282.5c-9.3 14.3-23.6 30-38.2 41.7-4.9 3.8-8.8 7.4-8.8 8 0 .6 1.6 3.2 3.5 5.8 7.2 9.7 22.4 17.5 43.2 22.1 8.2 1.8 14.2 2.2 36.1 2.6l26.2.5V302h-13.2c-28.3-.1-41.5-6.6-43.7-21.8l-.6-4.6-4.5 6.9Z" fill="#c8202f" />
          </g>
          <g transform="translate(1051 14)">
            <rect width="112" height="40" rx="20" fill="rgba(255,255,255,.74)" filter="url(#apRealSoftShadow)" />
            <image href={`${AD_ASSET}/brand/alphawing/original.png`} x="12" y="7" width="30" height="30" opacity=".1" transform="translate(1.5 1.5) rotate(-6 27 22)" />
            <image className="ap-real-wing-art" href={`${AD_ASSET}/brand/alphawing/original.png`} x="12" y="7" width="30" height="30" transform="rotate(-6 27 22)" />
            <text x="49" y="25" fill="#2f3034" fontSize="12" fontWeight="700">알파윙 닫기</text>
          </g>
          <circle cx="1194" cy="34" r="20" fill="rgba(255,255,255,.78)" filter="url(#apRealSoftShadow)" />
          <image href={`${AD_ASSET}/brand/feature-icons/header/notification/logo.svg`} x="1182" y="22" width="24" height="24" />
          <circle cx="1239" cy="34" r="20" fill="rgba(255,255,255,.78)" filter="url(#apRealSoftShadow)" />
          <image href={`${AD_ASSET}/brand/feature-icons/header/profile-menu/logo.svg`} x="1227" y="22" width="24" height="24" />
        </g>

        <g className="ap-real-left-panel">
          <rect x="8" y="72" width="280" height="768" rx="26" fill="url(#apRealLeft)" />
          <g filter="url(#apRealSoftShadow)">
            <rect x="20" y="82" width="245" height="80" rx="26" fill="rgba(255,255,255,.74)" />
            <text x="36" y="111" fill="#111" fontSize="16" fontWeight="740">{copy.greeting}</text>
            <text x="36" y="139" fill="#111" fontSize="15" fontWeight="660">{copy.name}</text>
            <rect x="104" y="120" width="54" height="25" rx="13" fill="#e5f7e8" />
            <text x="131" y="137" textAnchor="middle" fill="#239d52" fontSize="10" fontWeight="700">{copy.role}</text>
            <g className="ap-real-alphachick" transform="translate(163 86)">
              <image className="ap-real-alphachick-egg" href={`${AD_ASSET}/brand/alphachick-motion/egg.png`} x="4.8" y="24.4" width="31.1" height="26.5" />
              <image className="ap-real-alphachick-body" href={`${AD_ASSET}/brand/alphachick-motion/chick.png`} x="5.1" y="9.2" width="26" height="22.8" />
              <image className="ap-real-alphachick-chirp" href={`${AD_ASSET}/brand/alphachick-motion/chirp.png`} x="33.7" y="12.7" width="4.8" height="4.8" />
            </g>
            <circle cx="226" cy="122" r="27" fill="#fff" stroke="#9b1730" strokeWidth="6" strokeDasharray="118 52" transform="rotate(-90 226 122)" />
            <text x="226" y="122" textAnchor="middle" fill="#26272b" fontSize="17" fontWeight="760">3</text>
            <text x="226" y="136" textAnchor="middle" fill="#26272b" fontSize="8" fontWeight="700">LV</text>
          </g>
          <g transform="translate(272 88)" filter="url(#apRealSoftShadow)"><circle r="20" fill="#fff" /><path d="M-7-4h14M-7 3h10" stroke="#85878d" strokeWidth="2.5" strokeLinecap="round" /></g>

          <g filter="url(#apRealPhotoShadow)">
            <g clipPath={`url(#${weatherClip})`}>
              <rect x="20" y="176" width="245" height="133" rx="22" fill="url(#apRealWeather)" />
              <rect x="20" y="176" width="245" height="133" fill="url(#apRealWeatherGlowA)" />
              <rect x="20" y="176" width="245" height="133" fill="url(#apRealWeatherGlowB)" />
              <g opacity=".18" filter="url(#apRealRainBlur)" stroke="#d6e9ff" strokeWidth="2.2" strokeLinecap="round">
                <path d="m43 179-6 17m38-13-7 20m39-24-6 18m40-11-8 23m42-30-7 21m40-13-8 22m35-27-7 21" />
              </g>
              <ellipse cx="94" cy="232" rx="88" ry="41" fill="#9fc0df" opacity=".055" filter="url(#apRealRainBlur)" />
            </g>
            <text x="32" y="197" fill="#fff" fontSize="11" fontWeight="700">서울</text>
            <path d="m55 190 4 4 4-4" fill="none" stroke="#fff" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
            <text x="32" y="214" fill="#fff" fontSize="12" fontWeight="650">비</text>
            <g transform="translate(116 185)" filter="url(#apRealSoftShadow)">
              <ellipse cx="19" cy="22" rx="19" ry="9" fill="#c8d9ea" opacity=".3" />
              <circle cx="13" cy="17" r="9" fill="#dfeaf5" />
              <circle cx="23" cy="13" r="11" fill="#f7fbff" />
              <circle cx="31" cy="19" r="8" fill="#e9f2fa" />
              <rect x="6" y="17" width="31" height="10" rx="5" fill="#f6fbff" />
              <path d="M9 29 5 38m16-9-4 9m16-9-4 9" stroke="#72bff5" strokeWidth="2.7" strokeLinecap="round" />
              <path d="M10 18c5-7 18-8 25 0" fill="none" stroke="#fff" strokeWidth="2" opacity=".72" />
            </g>
            <text x="253" y="210" textAnchor="end" fill="#fff" fontSize="30" fontWeight="800">25°</text>
            <text x="253" y="225" textAnchor="end" fill="#fff" fontSize="9" fontWeight="620">최고 26° · 최저 24°</text>
            <g className="ap-real-weather-chart">
              <path d="M47.4 268.4V250.7L78.3 262.4 109.1 253.4 140 253.4 170.9 244.4 201.7 253.4 232.6 253.4V268.4Z" fill="url(#apRealWeatherArea)" />
              <path d="m47.4 250.7 30.9 11.7 30.8-9 30.9 0 30.9-9 30.8 9 30.9 0" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              {[25,24,25,25,26,25,25].map((temp,index) => {
                const x = 47.4 + index * 30.87;
                const y = [250.7,262.4,253.4,253.4,244.4,253.4,253.4][index];
                return <g key={`${temp}-${index}`}><circle cx={x} cy={y} r="3.1" fill="#fff" /><text x={x} y={y-6} textAnchor="middle" fill="#fff" fontSize="7.4" fontWeight="800">{temp}°</text></g>;
              })}
              {['지금','17시','18시','19시','20시','21시','22시'].map((hour,index)=><text key={hour} x={47.4+index*30.87} y="277" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="700">{hour}</text>)}
            </g>
            <text x="32" y="299" fill="rgba(226,232,240,.64)" fontSize="8.5" fontWeight="600">날씨 데이터: 기상청 단기예보</text>
            <text x="253" y="299" textAnchor="end" fill="rgba(226,232,240,.64)" fontSize="8.5" fontWeight="600">16:00 업데이트</text>
          </g>

          <g className="ap-real-calendar" filter="url(#apRealPhotoShadow)">
            <rect x="20" y="319" width="245" height="202" rx="24" fill="#1d1d1f" />
            <rect x="31" y="329" width="93" height="26" rx="13" fill="#39393c" stroke="#5a5a5e" />
            <text x="77" y="347" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">2026년 7월⌄</text>
            <g transform="translate(133 329)"><rect width="19" height="28" rx="9" fill="#2b2b2e" /><path d="m6 10 3.5-3.5L13 10m-7 8 3.5 3.5L13 18" fill="none" stroke="#d4d4d7" strokeWidth="1.3" /></g>
            <text x="251" y="346" textAnchor="end" fill="#f5f5f7" fontSize="10" fontWeight="650">{copy.today}</text>
            {['일','월','화','수','목','금','토'].map((day,index)=><text key={day} x={42+index*34} y="375" textAnchor="middle" fill={index===0?'#ff453a':'#8e8e93'} fontSize="8.5" fontWeight="650">{day}</text>)}
            {calendarDays.map(([day, dim], index) => {
              const column = index % 7;
              const row = Math.floor(index / 7);
              const x = 42 + column * 34;
              const y = 392 + row * 25;
              const disabled = dim || column === 0;
              return (
                <g key={`${day}-${index}`}>
                  <circle cx={x} cy={y} r="10.5" fill={dim ? "#242426" : "#2a2a2c"} stroke="rgba(255,255,255,.06)" />
                  <text x={x} y={y+3.5} textAnchor="middle" fill={dim?'rgba(242,242,243,.16)':disabled?'#ff453a':'#f2f2f3'} fontSize="9" fontWeight="650">{day}</text>
                </g>
              );
            })}
            <g className="ap-real-calendar-mark">
              <circle cx="144" cy="442" r="10.5" fill="#0a84ff" stroke="rgba(255,255,255,.18)" />
              <text x="144" y="445.5" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="720">15</text>
            </g>
            <g className="ap-real-calendar-palette">
              <rect x="31" y="432" width="223" height="34" rx="17" fill="#2c2c2e" stroke="rgba(255,255,255,.12)" />
              <path d="m139 432 5-5 5 5" fill="#2c2c2e" stroke="rgba(255,255,255,.12)" />
              {['#ff514d','#0a84ff','#64d2cf','#30d158','#ffd60a','#ff9f0a','#bf5af2'].map((color,index)=><circle key={color} cx={47+index*27} cy="449" r="9.5" fill={color} stroke="rgba(255,255,255,.24)" />)}
              <circle cx="236" cy="449" r="10" fill="rgba(255,255,255,.08)" /><path d="m232 445 8 8m0-8-8 8" stroke="#f5f5f7" strokeWidth="1.5" />
            </g>
          </g>
          <Cursor className="ap-real-calendar-cursor" />

          <g className="ap-real-history">
            <rect x="20" y="533" width="245" height="307" rx="25" fill="rgba(255,255,255,.70)" />
            <rect x="31" y="544" width="147" height="35" rx="18" fill="#fff" stroke="#ececef" />
            <text x="45" y="566" fill="#25262a" fontSize="12" fontWeight="720">대화 목록</text>
            <circle cx="207" cy="561" r="17" fill="#fff" stroke="#ececef" /><text x="207" y="566" textAnchor="middle" fontSize="15">🗄️</text>
            <circle cx="246" cy="561" r="17" fill="#fff" stroke="#ececef" /><image href={`${AD_ASSET}/brand/feature-icons/controls/search/logo.svg`} x="235" y="550" width="22" height="22" />
            {copy.conversations.map((title,index)=><text key={title} x="37" y={601+index*25} fill="#3b3b3f" fontSize="10.5">{title}</text>)}
            <path d="M32 771h221" stroke="#e6e7eb" />
            <text x="37" y="799" fill="#6f7279" fontSize="9.5" fontWeight="620">{copy.savedConversation}</text>
            <circle cx="249" cy="800" r="22" fill="#fff" stroke="#ececef" /><image href={`${AD_ASSET}/brand/feature-icons/chat/new-chat/logo.svg`} x="237" y="788" width="24" height="24" opacity=".8" />
          </g>
        </g>

        <g className="ap-real-main-panel">
          <rect x="296" y="72" width="648" height="768" rx="26" fill="url(#apRealMainGlow)" />
          <g className="ap-real-launcher">
            {appItems.map(([src, title], index) => {
              const col = index % 4;
              const row = Math.floor(index / 4);
              const x = 397 + col * 135;
              const y = 228 + row * 148;
              return (
                <g key={src}>
                  <image href={`${AD_ASSET}${src}`} x={x-28} y={y-28} width="56" height="56" />
                  <text x={x} y={y+54} textAnchor="middle" fill="#303136" fontSize="13" fontWeight="660">{title}</text>
                  {index === 5 && <g><circle cx={x+30} cy={y-30} r="10" fill="#ff453a" /><text x={x+30} y={y-26} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="760">8</text></g>}
                </g>
              );
            })}
            <image href={`${AD_ASSET}/brand/feature-icons/functions/opinion-box/logo.svg`} x="591" y="518" width="58" height="58" />
            <text x="620" y="599" textAnchor="middle" fill="#303136" fontSize="13" fontWeight="660">의견함</text>
          </g>

          <g className="ap-real-chat-view">
            <g className="ap-real-chat-question">
              <rect className="ap-real-chat-question-bubble" x="455" y="143" width="452" height="74" rx="25" fill="#29292b" stroke="rgba(255,255,255,.08)" filter="url(#apRealSoftShadow)" />
              <text x="886" y="170" textAnchor="end" fill="#fff" fontSize="11.7" fontWeight="560">
                {copy.questionLines.map((line,index)=><tspan key={line} x="886" dy={index===0?0:20}>{line}</tspan>)}
              </text>
              <text x="907" y="232" textAnchor="end" fill="#a7a7aa" fontSize="8.5">오후 02:24</text>
            </g>
            <g className="ap-real-answer">
              <text x="327" y="257" fill="#202124" fontSize="15" fontWeight="760">{copy.answerTitle}</text>
              <text x="327" y="280" fill="#4b4d52" fontSize="11.4" fontWeight="470">{copy.answerLead}</text>
              <g className="ap-real-answer-table">
                <rect x="327" y="294" width="580" height="218" rx="14" fill="rgba(255,255,255,.86)" stroke="#e1e3e7" />
                <path d="M327 308q0-14 14-14h552q14 0 14 14v18H327Z" fill="#f1f3f6" />
                <path d="M425 294v218M620 294v218M733 294v218" stroke="#e1e3e7" />
                {[326,363,400,437,474].map((y)=><path key={y} d={`M327 ${y}h580`} stroke="#e8e9ec" />)}
                {copy.tableHeaders.map((heading,index)=><text key={heading} x={[376,522.5,676.5,820][index]} y="315" textAnchor="middle" fill="#52555b" fontSize="9.4" fontWeight="720">{heading}</text>)}
                {copy.tableRows.map((row,rowIndex) => {
                  const y = 349 + rowIndex * 37;
                  return <g key={row[0]}>{row.map((cell,columnIndex)=><text key={cell} x={[338,437,632,744][columnIndex]} y={y} fill={columnIndex===0?'#292b2f':'#4a4d53'} fontSize={columnIndex===3?8.8:9.3} fontWeight={columnIndex===0||columnIndex===2?680:500}>{cell}</text>)}</g>;
                })}
              </g>
              <g className="ap-real-answer-interpretation">
                <text x="327" y="536" fill="#1d1d1f" fontSize="10.4" fontWeight="760">{language === "ko" ? "핵심 해석" : "Key interpretation"}</text>
                {copy.answerConclusion.map((line,index) => {
                  const y = 559 + index * 22;
                  return (
                    <g key={line}>
                      <circle cx="333" cy={y-3.5} r="2.4" fill="#8e8e93" />
                      <text x="344" y={y} fill="#303136" fontSize="9.1" fontWeight={index===0?600:480}>{line}</text>
                    </g>
                  );
                })}
              </g>
              <g className="ap-real-answer-actions">
                <g className="ap-real-answer-source-row">
                  <text x="327" y="615" fill="#7d7f85" fontSize="8.8" fontWeight="760">{copy.evidenceLabel}</text>
                  {copy.evidenceSources.map(([source, pmid], index) => {
                    const { x, width } = sourceChipLayout[index];
                    return (
                      <g className="ap-real-answer-source-chip" key={pmid} transform={`translate(${x} 595)`}>
                        <rect width={width} height="32" rx="16" fill="rgba(255,255,255,.94)" stroke="rgba(29,29,31,.11)" />
                        <g transform="translate(11 10)" fill="none" stroke="#666970" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4.5 8.5 2.8 10.2a3 3 0 0 1-4.2-4.2L1 3.6" />
                          <path d="m5.5 3.5 1.7-1.7A3 3 0 0 1 11.4 6L9 8.4M2.5 7.5l6-6" />
                        </g>
                        <text x="31" y="20.5" fill="#1d1d1f" fontSize="9" fontWeight="680">{source}</text>
                      </g>
                    );
                  })}
                </g>
                <g className="ap-real-answer-suggestion-row">
                  {copy.followups.map((followup, index) => {
                    const { x, width } = followupChipLayout[index];
                    return (
                      <g className="ap-real-answer-suggestion-chip" key={followup} transform={`translate(${x} 641)`}>
                        <rect width={width} height="38" rx="19" fill="rgba(255,255,255,.96)" stroke="rgba(29,29,31,.12)" />
                        <text x="16" y="24" fill="#1d1d1f" fontSize="9.8" fontWeight="570">{followup}</text>
                        <path d={`M${width-21} 15.5l4 3.5-4 3.5`} fill="none" stroke="#777a80" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                    );
                  })}
                </g>
                <g className="ap-real-answer-message-actions" transform="translate(327 690)">
                  <rect width="145" height="30" rx="15" fill="rgba(255,255,255,.82)" stroke="rgba(29,29,31,.09)" />
                  <g fill="none" stroke="#6b6b6b" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                    <g transform="translate(12 8)"><rect x="3" y="1" width="10" height="11" rx="1.5" /><path d="M10 1V-2H0v11h3" /></g>
                    <path d="M50 7v15l6-3.4 6 3.4V7Z" />
                    <path d="M91 19V11l4-4h3v4h5v8l-2 3h-7Z" />
                    <path d="M124 10v8l4 4h3v-4h5v-8l-2-3h-7Z" />
                  </g>
                  <path d="M76 7v16" stroke="rgba(29,29,31,.1)" />
                </g>
                <text x="907" y="710" textAnchor="end" fill="#b0afac" fontSize="7.5">오후 02:24</text>
              </g>
            </g>
          </g>

          <g className="ap-real-composer" filter="url(#apRealComposerShadow)">
            <rect x="296" y="742" width="648" height="61" rx="31" fill="rgba(255,255,255,.68)" stroke="rgba(255,255,255,.82)" />
            <circle cx="324" cy="772.5" r="22" fill="url(#apRealPill)" stroke="rgba(255,255,255,.84)" />
            <image href={`${AD_ASSET}/brand/feature-icons/chat/attach/logo.svg`} x="309" y="758" width="30" height="30" />
            <rect x="355" y="749" width="582" height="44" rx="22" fill="rgba(255,255,255,.66)" stroke="rgba(255,255,255,.78)" />
            <text className="ap-real-input-placeholder" x="374" y="776" fill="#6d7077" fontSize="12">{copy.input}</text>
            <text className="ap-real-input-typed" x="374" y="776" fill="#2c2c2c" fontSize="12" fontWeight="520">{copy.typedQuestion}</text>
            <text x="850" y="776" textAnchor="end" fill="#757880" fontSize="7.4">알파닥의 답변은 의료인께서 판단하시는 데 참고로만 사용해 주세요.</text>
            <circle className="ap-real-send-button" cx="914" cy="771" r="18" fill="#e8ebf0" />
            <g className="ap-real-send-glyph" color="#8e97a6" aria-hidden="true">
              <path d="M914 779V764m0 0-6 6m6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>
          <text x="620" y="821" textAnchor="middle" fill="#9a9da2" fontSize="8">개인정보처리방침 · 이용약관</text>
          <Cursor className="ap-real-chat-cursor" />
        </g>

        <g className="ap-real-right-panel">
          <rect x="952" y="72" width="320" height="768" rx="26" fill="url(#apRealRight)" filter="url(#apRealWindowShadow)" />

          <g className="ap-real-news-state">
            <g transform="translate(999 80)"><TabBar active="news" /></g>
            <rect x="968" y="150" width="288" height="44" rx="22" fill="rgba(255,255,255,.74)" />
            {(language === "ko"
              ? ["종합", "의료", "정치", "경제", "사회", "IT", "문화", "세계", "스포츠", "연예"]
              : ["All", "Med", "Policy", "Biz", "Soc", "IT", "Life", "World", "Sport", "Culture"]
            ).map((item,index)=><g key={item}>{index===0&&<rect x="974" y="155" width="28" height="34" rx="17" fill="#fff" filter="url(#apRealSoftShadow)" />}<text x={988+index*28.5} y="176" textAnchor="middle" fill={index===0?'#242529':'#8b8d92'} fontSize={item.length > 3 ? "6.2" : "7"} fontWeight={index===0?720:560}>{item}</text></g>)}
            <rect x="968" y="207" width="288" height="47" rx="24" fill="rgba(255,255,255,.78)" filter="url(#apRealSoftShadow)" />
            <text x="984" y="230" fill="#303136" fontSize="13" fontWeight="740">{copy.briefing}</text><text x="1077" y="230" fill="#44464b" fontSize="8.5">{copy.briefingTime}</text>
            <image href={`${AD_ASSET}/brand/feature-icons/controls/search/logo.svg`} x="1221" y="217" width="26" height="26" />
            <g className="ap-real-news-pick-card" filter="url(#apRealPhotoShadow)">
              <rect x="968" y="263" width="288" height="246" rx="18" fill="rgba(255,255,255,.92)" />
              <image href={GENERATED_NEWS_IMAGE} x="968" y="263" width="288" height="146" preserveAspectRatio="xMidYMid slice" clipPath={`url(#${newsClip})`} />
              <rect x="968" y="314" width="288" height="95" fill="url(#apRealNewsShade)" clipPath={`url(#${newsClip})`} />
              <rect x="980" y="275" width="34" height="19" rx="10" fill="rgba(255,255,255,.92)" /><text x="997" y="288" textAnchor="middle" fill="#51545b" fontSize="8" fontWeight="700">의료</text>
              <rect x="1153" y="275" width="90" height="19" rx="10" fill="rgba(54,54,58,.68)" /><text x="1198" y="288" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="700">✦ 알파닥 Pick</text>
              <text x="981" y="354" fill="rgba(255,255,255,.82)" fontSize="7.7" fontWeight="600">{copy.newsMeta}</text>
              <text x="981" y="375" fill="#fff" fontSize="12.4" fontWeight="760">
                {copy.newsTitle.split("\n").map((line,index)=><tspan key={line} x="981" dy={index===0?0:16}>{line}</tspan>)}
              </text>
              {copy.newsParagraphs.slice(0, 2).map((paragraph,index) => {
                const y = 417 + index * 43;
                return (
                  <g key={paragraph[0]}>
                    <rect x="980" y={y} width="264" height="36" rx="9" fill="rgba(29,29,31,.025)" />
                    <text x="990" y={y+14} fill="#55585e" fontSize="7.45" fontWeight="500">
                      {paragraph.map((line,lineIndex)=><tspan key={line} x="990" dy={lineIndex===0?0:11}>{line}</tspan>)}
                    </text>
                    {index === 1 && <text x="1233" y={y+23} textAnchor="middle" fill="#878a90" fontSize="10" fontWeight="650">↗</text>}
                  </g>
                );
              })}
            </g>
            <g className="ap-real-news-list-heading">
              <text x="972" y="529" fill="#1d1d1f" fontSize="10" fontWeight="760">{copy.newsListTitle}</text>
              <text x="1247" y="529" textAnchor="end" fill="#999ba1" fontSize="7.5" fontWeight="650">{copy.newsListCount}</text>
            </g>
            <g className="ap-real-news-list-surface" filter="url(#apRealSoftShadow)">
              <rect x="968" y="536" width="288" height="270" rx="18" fill="rgba(255,255,255,.68)" />
              {copy.newsListItems.map((item, index) => {
                const y = 540 + index * 86;
                const imageHref = index === 0 ? GENERATED_SECONDARY_NEWS_IMAGE : index === 1 ? GENERATED_NEWS_IMAGE : GENERATED_SECONDARY_NEWS_IMAGE;
                const categoryWidth = language === "ko" ? 34 : 46;
                return (
                  <g className="ap-real-news-list-row" key={`${item.source}-${item.time}`}>
                    <image href={imageHref} x="976" y={y+8} width="56" height="56" preserveAspectRatio="xMidYMid slice" clipPath={`url(#${newsListClip})`} />
                    <rect x="1043" y={y+8} width={categoryWidth} height="16" rx="8" fill="#eef2f6" />
                    <text x={1043+categoryWidth/2} y={y+19.5} textAnchor="middle" fill="#566372" fontSize="6.4" fontWeight="720">{item.category}</text>
                    <text x={1049+categoryWidth} y={y+19.5} fill="#85888e" fontSize="6.6" fontWeight="600">{item.source}</text>
                    <text x="1239" y={y+19.5} textAnchor="end" fill="#a0a2a7" fontSize="6.4">{item.time}</text>
                    <text x="1043" y={y+43} fill="#292b2f" fontSize="9.15" fontWeight="700">
                      {item.title.map((line,lineIndex)=><tspan key={line} x="1043" dy={lineIndex===0?0:13}>{line}</tspan>)}
                    </text>
                    <path d={`m1241 ${y+44} 4 4-4 4`} fill="none" stroke="#a5a7ac" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    {index < copy.newsListItems.length - 1 && <path d={`M1043 ${y+85.5}h202`} stroke="rgba(29,29,31,.065)" />}
                  </g>
                );
              })}
            </g>
          </g>

          <g className="ap-real-literature-state">
            <g transform="translate(999 80)"><TabBar active="literature" /></g>
            <g transform="translate(968 150)">
              <rect width="288" height="52" rx="24" fill="rgba(255,255,255,.77)" filter="url(#apRealSoftShadow)" />
              <rect x="10" y="7" width="132" height="38" rx="19" fill="#fff" /><image href={`${AD_ASSET}/brand/feature-icons/panel/paper/logo.svg`} x="28" y="15" width="22" height="22" /><text x="75" y="31" textAnchor="middle" fill="#303136" fontSize="11" fontWeight="700">논문</text>
              <image href={`${AD_ASSET}/brand/feature-icons/panel/guideline/logo.svg`} x="174" y="15" width="22" height="22" /><text x="218" y="31" textAnchor="middle" fill="#303136" fontSize="11" fontWeight="650">가이드라인</text>
            </g>
            <rect x="968" y="214" width="288" height="61" rx="23" fill="rgba(255,255,255,.72)" />
            {['전체 국가','국내','해외'].map((item,index)=><g key={item}>{index===0&&<rect x="976" y="221" width="94" height="30" rx="15" fill="#fff" filter="url(#apRealSoftShadow)" />}<text x={1023+index*96} y="241" textAnchor="middle" fill="#33353a" fontSize="9" fontWeight={index===0?720:580}>{item}</text></g>)}
            <text x="984" y="267" fill="#34363a" fontSize="8.5" fontWeight="650">전체 분야　 감염내과　 내분비　 류마티스　 심장내과</text>
            <g transform="translate(968 287)">
              <rect width="288" height="42" rx="21" fill="rgba(255,255,255,.76)" />
              <rect x="5" y="5" width="92" height="32" rx="16" fill="#fff" filter="url(#apRealSoftShadow)" />
              <text x="51" y="26" textAnchor="middle" fill="#303136" fontSize="9" fontWeight="700">최신순</text><text x="144" y="26" textAnchor="middle" fill="#303136" fontSize="9">인용순</text><text x="238" y="26" textAnchor="middle" fill="#303136" fontSize="9">저장</text>
            </g>
            <rect x="968" y="342" width="288" height="43" rx="22" fill="rgba(255,255,255,.76)" filter="url(#apRealSoftShadow)" />
            <text x="982" y="368" fill="#303136" fontSize="12" fontWeight="740">{copy.literatureTitle}</text><image href={`${AD_ASSET}/brand/feature-icons/controls/search/logo.svg`} x="1223" y="352" width="23" height="23" />
            <g filter="url(#apRealSoftShadow)">
              <rect x="968" y="398" width="288" height="176" rx="21" fill="rgba(255,255,255,.86)" />
              <rect x="982" y="413" width="45" height="18" rx="9" fill="#eef2f6" /><text x="1004" y="426" textAnchor="middle" fill="#4d545d" fontSize="7" fontWeight="700">영상의학</text>
              <rect x="1033" y="413" width="31" height="18" rx="9" fill="#eef2f6" /><text x="1048" y="426" textAnchor="middle" fill="#4d545d" fontSize="7">해외</text>
              <rect x="1070" y="413" width="45" height="18" rx="9" fill="#eef2f6" /><text x="1092" y="426" textAnchor="middle" fill="#4d545d" fontSize="7">PubMed</text>
              <text x="982" y="456" fill="#25262a" fontSize="12.2" fontWeight="740">Accelerated Chest Pain Assessment</text>
              <text x="982" y="475" fill="#25262a" fontSize="12.2" fontWeight="740">Using High-Sensitivity Troponin:</text>
              <text x="982" y="494" fill="#25262a" fontSize="12.2" fontWeight="740">A Multicenter Validation Study.</text>
              <text x="982" y="519" fill="#6f7278" fontSize="8.5">Clinical Evidence Review · 2026 · Lee J 외 8인</text>
              <text x="982" y="548" fill="#54585f" fontSize="8.5">흉통 환자의 조기 위험분류에 필요한 근거를 정리했습니다.</text>
            </g>
            <g filter="url(#apRealSoftShadow)">
              <rect x="968" y="587" width="288" height="105" rx="21" fill="rgba(255,255,255,.84)" />
              <text x="982" y="613" fill="#4f78ab" fontSize="7.5" fontWeight="700">정신건강 · 해외 · PubMed</text>
              <text x="982" y="640" fill="#25262a" fontSize="11.2" fontWeight="720">Real-world Outcomes of Early SGLT2</text>
              <text x="982" y="659" fill="#25262a" fontSize="11.2" fontWeight="720">Inhibitor Initiation in HFpEF</text>
              <text x="982" y="680" fill="#797c82" fontSize="8">Evidence Practice Journal · 2026</text>
            </g>
            <g className="ap-real-stream-card" filter="url(#apRealSoftShadow)">
              <rect x="968" y="704" width="288" height="112" rx="21" fill="rgba(255,255,255,.86)" />
              <rect x="982" y="718" width="42" height="18" rx="9" fill="#eef2f6" /><text x="1003" y="731" textAnchor="middle" fill="#4d545d" fontSize="7" fontWeight="700">중환자</text>
              <text x="982" y="759" fill="#25262a" fontSize="10.8" fontWeight="720">{copy.literatureExtra[0]}</text>
              <text x="982" y="783" fill="#797c82" fontSize="8">{copy.literatureExtra[1]}</text>
              <rect x="1164" y="778" width="78" height="22" rx="11" fill="#f2f4f7" /><text x="1203" y="792.5" textAnchor="middle" fill="#5d6672" fontSize="7.2" fontWeight="650">근거 저장</text>
            </g>
          </g>

          <g className="ap-real-community-state">
            <g transform="translate(983 80)"><TabBar active="community" /></g>
            <g transform="translate(1052 142)" filter="url(#apRealSoftShadow)">
              <rect width="120" height="32" rx="16" fill="url(#apRealGlass)" />
              <text className="ap-real-tossface" x="12" y="21" fontSize="14">🔥</text>
              <text x="34" y="21" fill="#1d1d1f" fontSize="13" fontWeight="700">{copy.communityTitle}</text>
              <path d="m105 13 4 4 4-4" fill="none" stroke="#8e8e93" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <circle cx="1244" cy="158" r="16" fill="url(#apRealGlass)" filter="url(#apRealSoftShadow)" />
            <text className="ap-real-tossface" x="1244" y="164" textAnchor="middle" fontSize="18">🔍</text>
            <g className="ap-real-community-post ap-real-community-post--text" filter="url(#apRealSoftShadow)">
              <rect x="968" y="190" width="288" height="210" rx="18" fill="rgba(255,255,255,.88)" />
              <text x="984" y="216" fill="#111113" fontSize="10.5" fontWeight="760">{copy.communityTextPost.author}</text>
              <text x="1055" y="216" fill="#8e8e93" fontSize="8" fontWeight="540">· {copy.communityTextPost.time}</text>
              <text x="1240" y="215" textAnchor="middle" fill="#a2a3a8" fontSize="11" fontWeight="700">•••</text>
              <text x="984" y="245" fill="#292b2f" fontSize="9.4" fontWeight="520">
                {copy.communityTextPost.body.map((line,index)=><tspan key={line} x="984" dy={index===0?0:15}>{line}</tspan>)}
              </text>
              <path d="M984 283h256" stroke="rgba(29,29,31,.07)" />
              {copy.communityTextPost.replies.map(([author,reply],index) => {
                const y = 307 + index * 27;
                return (
                  <g className="ap-real-community-reply" key={author}>
                    <text x="984" y={y} fill="#3a3a3c" fontSize="7.7" fontWeight="720">{author}</text>
                    <text x="1041" y={y} fill="#6e6e73" fontSize="7.25" fontWeight="500">{reply}</text>
                    {index === 0 && <g transform={`translate(1225 ${y-9})`} fill="#8e8e93"><path d="M0 4c0-2.8 3.5-3.6 5-1 1.5-2.6 5-1.8 5 1 0 2.8-5 5.5-5 5.5S0 6.8 0 4Z" /><text x="13" y="8" fontSize="6.5" fontWeight="650">3</text></g>}
                  </g>
                );
              })}
              <g className="ap-real-community-post-actions" transform="translate(984 366)" fill="none" stroke="#62656b" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 5c0-4 5-5 7-1 2-4 7-3 7 1 0 4-7 8-7 8S1 9 1 5Z" /><text x="20" y="11" fill="#676a70" stroke="none" fontSize="8" fontWeight="650">{copy.communityTextPost.likes}</text>
                <path d="M47 2h4v10h-4Zm5 1h7l2 2v2l-3 6h-3l1-4h-4Z" />
                <path d="M84 2h13v9h-7l-4 3v-3h-2Z" /><text x="103" y="11" fill="#676a70" stroke="none" fontSize="8" fontWeight="650">{copy.communityTextPost.comments}</text>
                <path d="M137 2v12l5-3 5 3V2Z" />
              </g>
            </g>
            <g className="ap-real-community-post ap-real-community-post--photo" filter="url(#apRealSoftShadow)">
              <rect x="968" y="412" width="288" height="292" rx="18" fill="rgba(255,255,255,.88)" />
              <text x="984" y="438" fill="#111113" fontSize="10.5" fontWeight="760">{copy.communityPhotoPost.author}</text>
              <text x="1056" y="438" fill="#8e8e93" fontSize="8" fontWeight="540">· {copy.communityPhotoPost.time}</text>
              <text x="1240" y="437" textAnchor="middle" fill="#a2a3a8" fontSize="11" fontWeight="700">•••</text>
              <text x="984" y="466" fill="#292b2f" fontSize="9.15" fontWeight="520">
                {copy.communityPhotoPost.body.map((line,index)=><tspan key={line} x="984" dy={index===0?0:14}>{line}</tspan>)}
              </text>
              <image href={GENERATED_COMMUNITY_IMAGE} x="984" y="504" width="256" height="126" preserveAspectRatio="xMidYMid slice" clipPath={`url(#${communityClip})`} />
              <rect x="984" y="504" width="256" height="126" rx="13" fill="none" stroke="rgba(29,29,31,.08)" />
              <g className="ap-real-community-post-actions" transform="translate(984 668)" fill="none" stroke="#62656b" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 5c0-4 5-5 7-1 2-4 7-3 7 1 0 4-7 8-7 8S1 9 1 5Z" /><text x="20" y="11" fill="#676a70" stroke="none" fontSize="8" fontWeight="650">{copy.communityPhotoPost.likes}</text>
                <path d="M47 2h4v10h-4Zm5 1h7l2 2v2l-3 6h-3l1-4h-4Z" />
                <path d="M84 2h13v9h-7l-4 3v-3h-2Z" /><text x="103" y="11" fill="#676a70" stroke="none" fontSize="8" fontWeight="650">{copy.communityPhotoPost.comments}</text>
                <path d="M137 2v12l5-3 5 3V2Z" />
              </g>
            </g>
            <g className="ap-real-community-post ap-real-community-post--peek ap-real-stream-card" filter="url(#apRealSoftShadow)">
              <rect x="968" y="716" width="288" height="56" rx="18" fill="rgba(255,255,255,.88)" />
              <text x="984" y="740" fill="#111113" fontSize="9.7" fontWeight="760">{copy.communityNextPost[0]}</text>
              <text x="1060" y="740" fill="#8e8e93" fontSize="7.7">{copy.communityNextPost[1]}</text>
              <text x="984" y="760" fill="#45474c" fontSize="8.4" fontWeight="520">{copy.communityNextPost[2]}</text>
            </g>
            <g transform="translate(968 784)" filter="url(#apRealSoftShadow)"><rect width="288" height="48" rx="24" fill="rgba(255,255,255,.9)" /><rect x="5" y="4" width="48" height="40" rx="20" fill="rgba(255,255,255,.78)" stroke="rgba(255,255,255,.9)" />{['🏠','✉️','✏️','❤️','👤'].map((item,index)=><text className="ap-real-tossface" key={`${item}-${index}`} x={29+index*58} y="31" textAnchor="middle" fontSize={index===2?20:16}>{item}</text>)}</g>
          </g>
          <Cursor className="ap-real-tab-cursor" />
        </g>
      </svg>
    </ViewportMotion>
  );
}
