const ALPHADOC_ASSETS = {
  symbol: '/brand/alphadoc/symbol/alpha.png',
  logotypeKo: '/brand/alphadoc/logotype/ko.png',
  mascot: '/brand/alphadoc/mascot/ai-compact.png',
  engineIcon: '/brand/alphadoc/feature-icons/functions/soap.svg',
  wingIcon: '/brand/alphadoc/feature-icons/panel/news.svg',
  widgetIcon: '/brand/alphadoc/feature-icons/functions/widget.svg',
} as const;

export type AlphadocWorkflowId = 'clinicalEngine' | 'alphaWing' | 'widgetBar';

export type AlphadocModuleBullet = {
  readonly icon: string;
  readonly text: string;
};

export type AlphadocDemoPanel = {
  readonly title: string;
  readonly icon: string;
  readonly items: readonly string[];
};

export type AlphadocWorkflow = {
  readonly id: AlphadocWorkflowId;
  readonly icon: string;
  readonly navIcon: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly bullets: readonly AlphadocModuleBullet[];
  readonly prompt: string;
  readonly responseTitle: string;
  readonly response: readonly string[];
  readonly sources: readonly string[];
  readonly panels: readonly AlphadocDemoPanel[];
};

export type AlphadocContent = {
  readonly assets: typeof ALPHADOC_ASSETS;
  readonly headline: string;
  readonly body: string;
  readonly ctaLabel: string;
  readonly note: string;
  readonly demoTitle: string;
  readonly demoSubtitle: string;
  readonly progressLabel: string;
  readonly sourceTitle: string;
  readonly workflows: readonly AlphadocWorkflow[];
};

export const ALPHADOC_CONTENT = {
  ko: {
    assets: ALPHADOC_ASSETS,
    headline: '의료인의 하루를 같이해요.',
    body: '알파닥은 의료인의 하루의 시작과 마무리를 같이하는 동반자에요.',
    ctaLabel: '알파닥 시작하기',
    note: '글로벌 버전은 개발 중이에요.',
    demoTitle: '알파닥 데모',
    demoSubtitle: '임상 AI · 알파윙 · 위젯바',
    progressLabel: '데모 모션',
    sourceTitle: '근거',
    workflows: [
      {
        id: 'clinicalEngine',
        icon: ALPHADOC_ASSETS.engineIcon,
        navIcon: 'ri-stethoscope-line',
        title: '임상용 알파닥 AI 엔진',
        subtitle: '의료인을 위한 근거 중심 의료AI',
        description: '',
        bullets: [
          { icon: 'ri-links-line', text: '모든 답변에 출처와 논문을 함께 제시해요 그리고 최신 정보인지도 확인해요' },
          { icon: 'ri-image-2-line', text: '논문과 이미지도 교차로 인식해서 추론 할 수 있어요' },
          { icon: 'ri-file-list-3-line', text: '가이드라인 및 논문도 자체DB와 온라인에서 검색해서 알려드릴 수 있어요' },
          { icon: 'ri-search-eye-line', text: 'SOAP 초안 작성 같은 일도 해드릴 수 있어요' },
        ],
        prompt: '58세 남성, 발열과 기침. 흉부 이미지와 복용약 목록을 함께 검토해줘.',
        responseTitle: '근거 기반 임상 추론',
        response: [
          '증상과 영상 소견은 지역사회획득폐렴 가능성을 우선 검토합니다.',
          '첨부 문서의 약물 이력에서 QT 연장 위험 약제를 함께 확인했습니다.',
          '초기 SOAP 초안과 추적 검사 계획을 의료인이 검토할 수 있게 정리합니다.',
        ],
        sources: ['K-CPG CAP 2023', 'IDSA/ATS 2019', 'PubMed 검색 확인'],
        panels: [
          { title: '문서·이미지', icon: 'ri-image-2-line', items: ['흉부 이미지 요약', '복용약 목록 인식'] },
          { title: 'SOAP 초안', icon: 'ri-file-list-3-line', items: ['S/O/A/P 자동 구조화', '검토 포인트 표시'] },
          { title: '최신성 확인', icon: 'ri-search-eye-line', items: ['검색 기반 근거 확인', '지침 업데이트 감지'] },
        ],
      },
      {
        id: 'alphaWing',
        icon: ALPHADOC_ASSETS.wingIcon,
        navIcon: 'ri-layout-right-line',
        title: '의료 정보 패널 알파윙',
        subtitle: '의료인에 맞춤형 뉴스, 의학 자료 DB, 커뮤니티',
        description: '',
        bullets: [
          { icon: 'ri-newspaper-line', text: '최신 뉴스를 선별해서 브리핑도 해드려요' },
          { icon: 'ri-book-open-line', text: '글로벌 및 국내 논문과 최신의 가이드라인을 확인하실 수 있어요' },
          { icon: 'ri-team-line', text: '알파닥 유저들만의 소통 공간이 있어요' },
          { icon: 'ri-global-line', text: '글로벌 버전도 개발하고 있어요' },
        ],
        prompt: '오늘 외래 전에 봐야 할 의료 뉴스, 논문, 커뮤니티 이슈를 정리해줘.',
        responseTitle: '알파윙 브리핑',
        response: [
          '전문과별 핵심 뉴스와 실시간 업데이트를 진료 영향도 순으로 묶었습니다.',
          '새 논문과 가이드라인은 한 화면에서 원문 맥락까지 이어집니다.',
          '익명 커뮤니티의 토론은 필요한 경우 질문으로 가져와 이어볼 수 있습니다.',
        ],
        sources: ['알파닥Pick', 'KAMJE', '알파닥 커뮤니티'],
        panels: [
          { title: '뉴스', icon: 'ri-newspaper-line', items: ['핵심 의료 뉴스 큐레이션', '실시간 이슈 업데이트'] },
          { title: '논문·가이드라인', icon: 'ri-book-open-line', items: ['글로벌 논문 허브', '진료 지침 요약'] },
          { title: '커뮤니티', icon: 'ri-team-line', items: ['의료인 익명 토론', '글로벌 기능 준비 중'] },
        ],
      },
      {
        id: 'widgetBar',
        icon: ALPHADOC_ASSETS.widgetIcon,
        navIcon: 'ri-dashboard-line',
        title: '의료인을 위한 위젯바',
        subtitle: '유용한 도구들의 모음공간',
        description: '',
        bullets: [
          { icon: 'ri-calendar-line', text: '날짜를 색으로 구분 하는 캘린더 위젯이 있어요' },
          { icon: 'ri-calculator-line', text: '의료계산기 및 여러 추가 기능들을 개발하고 있어요' },
        ],
        prompt: '오늘 날짜와 외래 중 자주 쓰는 계산 도구를 바로 열어줘.',
        responseTitle: '위젯바',
        response: [
          '오늘 날짜와 주간 일정을 상단 위젯에서 바로 확인합니다.',
          'BMI, eGFR, CHA2DS2-VASc 같은 계산기를 빠르게 호출합니다.',
          '진료실에서 반복되는 작은 작업을 계속 위젯으로 확장합니다.',
        ],
        sources: ['캘린더', '의료계산기', '추가 기능 예정'],
        panels: [
          { title: '캘린더', icon: 'ri-calendar-line', items: ['오늘 날짜 표시', '주간 일정 확인'] },
          { title: '계산기', icon: 'ri-calculator-line', items: ['BMI/eGFR', '위험도 계산'] },
          { title: '추가 예정', icon: 'ri-add-circle-line', items: ['진료 보조 위젯', '편의 기능 확장'] },
        ],
      },
    ],
  },
  en: {
    assets: ALPHADOC_ASSETS,
    headline: 'Alphadoc stays with healthcare professionals all day.',
    body: 'Alphadoc is a daily companion from the first clinical check to the end-of-day wrap-up.',
    ctaLabel: 'Start Alphadoc',
    note: 'Global version in development',
    demoTitle: 'Alphadoc demo',
    demoSubtitle: 'Clinical AI · AlphaWing · Widget bar',
    progressLabel: 'Demo motion',
    sourceTitle: 'Evidence',
    workflows: [
      {
        id: 'clinicalEngine',
        icon: ALPHADOC_ASSETS.engineIcon,
        navIcon: 'ri-stethoscope-line',
        title: 'Clinical AlphadocAI engine',
        subtitle: 'Evidence, documents, and SOAP in one flow',
        description: 'Clinical questions flow into evidence checks, document and image reasoning, and review-ready SOAP drafts.',
        bullets: [
          { icon: 'ri-links-line', text: 'Latest guidelines and evidence-based reasoning' },
          { icon: 'ri-image-2-line', text: 'Document and image-based reasoning' },
          { icon: 'ri-file-list-3-line', text: 'SOAP drafting' },
          { icon: 'ri-search-eye-line', text: 'Search-backed freshness checks' },
        ],
        prompt: 'Review a 58-year-old male with fever, cough, chest image, and medication list.',
        responseTitle: 'Evidence-based clinical reasoning',
        response: [
          'Symptoms and imaging suggest prioritizing community-acquired pneumonia.',
          'Medication history is checked for QT prolongation and interaction risks.',
          'A review-ready SOAP draft and follow-up plan are organized for the clinician.',
        ],
        sources: ['K-CPG CAP 2023', 'IDSA/ATS 2019', 'PubMed search'],
        panels: [
          { title: 'Documents', icon: 'ri-image-2-line', items: ['Chest image summary', 'Medication list parsing'] },
          { title: 'SOAP draft', icon: 'ri-file-list-3-line', items: ['S/O/A/P structure', 'Review points'] },
          { title: 'Freshness', icon: 'ri-search-eye-line', items: ['Search-backed evidence', 'Guideline update check'] },
        ],
      },
      {
        id: 'alphaWing',
        icon: ALPHADOC_ASSETS.wingIcon,
        navIcon: 'ri-layout-right-line',
        title: 'AlphaWing medical information panel',
        subtitle: 'News, papers, and community beside the workflow',
        description: 'AlphaWing keeps medical updates and peer context close before and after clinic.',
        bullets: [
          { icon: 'ri-newspaper-line', text: 'Curated core medical news and real-time news' },
          { icon: 'ri-book-open-line', text: 'Global papers and guideline hub' },
          { icon: 'ri-team-line', text: 'Anonymous community for Alphadoc users' },
          { icon: 'ri-global-line', text: 'Global features coming later' },
        ],
        prompt: 'Brief the medical news, papers, and community topics to check before clinic.',
        responseTitle: 'AlphaWing briefing',
        response: [
          'Specialty news and live updates are grouped by clinical relevance.',
          'New papers and guidelines connect to original context in the same panel.',
          'Anonymous community discussions can be brought into chat for follow-up.',
        ],
        sources: ['Alphadoc Pick', 'KAMJE', 'Alphadoc Community'],
        panels: [
          { title: 'News', icon: 'ri-newspaper-line', items: ['Curated medical news', 'Real-time updates'] },
          { title: 'Papers', icon: 'ri-book-open-line', items: ['Global literature hub', 'Guideline summaries'] },
          { title: 'Community', icon: 'ri-team-line', items: ['Anonymous physician threads', 'Global features in preparation'] },
        ],
      },
      {
        id: 'widgetBar',
        icon: ALPHADOC_ASSETS.widgetIcon,
        navIcon: 'ri-dashboard-line',
        title: 'Widget bar for healthcare professionals',
        subtitle: 'Dates and calculators always nearby',
        description: 'A compact bar keeps dates, calculators, and small clinical utilities near the care workflow.',
        bullets: [
          { icon: 'ri-calendar-line', text: 'Calendar for date display' },
          { icon: 'ri-calculator-line', text: 'Medical calculators and utility features coming soon' },
        ],
        prompt: 'Open today’s date and frequently used clinic calculators.',
        responseTitle: 'Widget bar',
        response: [
          'Today’s date and weekly schedule stay visible in the top widget.',
          'BMI, eGFR, and CHA2DS2-VASc calculators can be opened quickly.',
          'Repeated clinic micro-tasks will continue to expand as widgets.',
        ],
        sources: ['Calendar', 'Medical calculator', 'More tools coming'],
        panels: [
          { title: 'Calendar', icon: 'ri-calendar-line', items: ['Today display', 'Weekly schedule'] },
          { title: 'Calculator', icon: 'ri-calculator-line', items: ['BMI/eGFR', 'Risk scores'] },
          { title: 'Coming soon', icon: 'ri-add-circle-line', items: ['Clinical widgets', 'Utility expansion'] },
        ],
      },
    ],
  },
} satisfies Record<'ko' | 'en', AlphadocContent>;
