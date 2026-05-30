import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSectionReveal } from '@/hooks/useSectionReveal';

const CRIMSON = '#B53A3A';

// ── 스크린샷 URLs ────────────────────────────────────────────────
const SS_CLINICAL_REASONING =
  'https://storage.readdy-site.link/project_files/f0121b54-b4dd-49ef-9b9a-70a9b6263ce6/350aac27-1537-4231-9bb1-b4e57c6e8ec5_Screenshot-2026-05-13-at-1.24.21AM.png?v=d94c4507cdf8bc893ff69872f0b9f879';
const SS_CLINICAL_PAPER =
  'https://storage.readdy-site.link/project_files/f0121b54-b4dd-49ef-9b9a-70a9b6263ce6/5bc12ad8-7e81-45a4-8fca-d048a974b8c1_Screenshot-2026-05-13-at-2.25.24PM.png?v=0bad12985e45b969636bffc92f858cbd';
const SS_PANEL_NEWS =
  'https://static.readdy.ai/image/6dd256f1af0a69f80b0795e79fdc4817/b4c7503ab1984391ecb9840f07196ba6.png';
const SS_PANEL_GUIDE =
  'https://static.readdy.ai/image/6dd256f1af0a69f80b0795e79fdc4817/3bfc4716b0d4c54e036068eeb6f89d1e.png';
const SS_PANEL_COMMUNITY =
  'https://storage.readdy-site.link/project_files/f0121b54-b4dd-49ef-9b9a-70a9b6263ce6/b6583935-b233-4981-9084-c06855c73667_Screenshot-2026-05-13-at-2.45.14PM.png?v=7779831c36810f3820bfd3f57cf855cc';

// ── 타입 ────────────────────────────────────────────────────────
type PanelItem = { src: string; label: string; comingSoon?: boolean };
type ScreenshotConfig =
  | { type: 'dual'; left: PanelItem; right: PanelItem }
  | { type: 'triple'; items: [PanelItem, PanelItem, PanelItem] }
  | { type: 'quad'; items: [PanelItem, PanelItem, PanelItem, PanelItem] }
  | { type: 'single'; src: string };

// ── 제품 데이터 (KO) ─────────────────────────────────────────────
const PRODUCTS_KO: {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  features: { icon: string; label: string; desc: string; comingSoon?: boolean }[];
  screenshot: ScreenshotConfig;
}[] = [
  {
    id: 'clinical',
    icon: 'ri-brain-line',
    title: '임상용 AI',
    subtitle: '의사를 위한 근거 중심 임상 보조 AI',
    features: [
      { icon: 'ri-links-line', label: '근거 기반 추론', desc: '모든 답변에 출처 논문을 함께 제시해요' },
      { icon: 'ri-file-search-line', label: '논문·이미지 인식 추론', desc: '첨부 파일과 이미지로 즉시 임상 추론' },
    ],
    screenshot: {
      type: 'dual',
      left: { src: SS_CLINICAL_REASONING, label: '근거 기반 추론' },
      right: { src: SS_CLINICAL_PAPER, label: '논문·이미지 인식 추론' },
    },
  },
  {
    id: 'panel',
    icon: 'ri-layout-grid-line',
    title: '알파닥 패널',
    subtitle: '의료인의 일상을 채우는 정보 허브',
    features: [
      { icon: 'ri-newspaper-line', label: '실시간 의료 뉴스', desc: '전문과별 핵심 뉴스를 매일 큐레이션' },
      { icon: 'ri-book-open-line', label: '논문 및 가이드 허브', desc: '최신 가이드라인과 논문을 한 곳에서' },
      { icon: 'ri-team-line', label: '글로벌 의료인 커뮤니티', desc: '전문과·병원을 넘어 동료 의사와 소통' },
      { icon: 'ri-rocket-line', label: '더 많은 기능 출시 예정', desc: '의료인 특화 기능이 계속 추가돼요', comingSoon: true },
    ],
    screenshot: {
      type: 'quad',
      items: [
        { src: SS_PANEL_NEWS, label: '의료 뉴스' },
        { src: SS_PANEL_GUIDE, label: '가이드 허브' },
        { src: SS_PANEL_COMMUNITY, label: '커뮤니티' },
        { src: '', label: 'Coming Soon', comingSoon: true },
      ],
    },
  },
];

// ── 제품 데이터 (EN) ─────────────────────────────────────────────
const PRODUCTS_EN: typeof PRODUCTS_KO = [
  {
    id: 'clinical',
    icon: 'ri-brain-line',
    title: 'Clinical AI',
    subtitle: 'Evidence-based clinical AI for physicians',
    features: [
      { icon: 'ri-links-line', label: 'Evidence-based Reasoning', desc: 'Every answer is backed by cited source papers' },
      { icon: 'ri-file-search-line', label: 'Paper & Image Recognition', desc: 'Instant clinical reasoning from attachments and images' },
    ],
    screenshot: {
      type: 'dual',
      left: { src: SS_CLINICAL_REASONING, label: 'Evidence-based Reasoning' },
      right: { src: SS_CLINICAL_PAPER, label: 'Paper & Image Recognition' },
    },
  },
  {
    id: 'panel',
    icon: 'ri-layout-grid-line',
    title: 'Alphadoc Panel',
    subtitle: 'The daily information hub for physicians',
    features: [
      { icon: 'ri-newspaper-line', label: 'Real-time Medical News', desc: 'Daily curated specialty-specific news' },
      { icon: 'ri-book-open-line', label: 'Paper & Guideline Hub', desc: 'Latest guidelines and papers in one place' },
      { icon: 'ri-team-line', label: 'Global Physician Community', desc: 'Connect with peers across specialties and hospitals' },
      { icon: 'ri-rocket-line', label: 'More Features Coming', desc: 'New physician-focused features are on the way', comingSoon: true },
    ],
    screenshot: {
      type: 'quad',
      items: [
        { src: SS_PANEL_NEWS, label: 'Medical News' },
        { src: SS_PANEL_GUIDE, label: 'Guide Hub' },
        { src: SS_PANEL_COMMUNITY, label: 'Community' },
        { src: '', label: 'Coming Soon', comingSoon: true },
      ],
    },
  },
];

// ── Screenshot badge ─────────────────────────────────────────────
const ScreenshotBadge = ({ label }: { label: string }) => (
  <div
    className="absolute top-3 left-3 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full"
    style={{
      background: 'rgba(255,255,255,0.93)',
      border: '1px solid rgba(181,58,58,0.13)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
    }}
  >
    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: CRIMSON }} />
    <span className="text-[11px] font-semibold whitespace-nowrap" style={{ color: '#1C1C1E' }}>
      {label}
    </span>
  </div>
);

// ── Coming Soon panel ────────────────────────────────────────────
const ComingSoonPanel = ({ isEn }: { isEn?: boolean }) => (
  <div
    className="w-full h-full flex flex-col items-center justify-center gap-3 rounded-[12px] relative overflow-hidden"
    style={{
      background: '#EDECEA',
      border: '1px solid rgba(0,0,0,0.06)',
    }}
  >
    <div className="flex flex-col items-center gap-2.5">
      <div
        className="w-9 h-9 flex items-center justify-center rounded-full"
        style={{ background: 'rgba(181,58,58,0.08)' }}
      >
        <i className="ri-rocket-line text-[15px]" style={{ color: 'rgba(181,58,58,0.55)' }} />
      </div>
      <div className="text-center px-4">
        <p className="text-[12px] font-semibold leading-tight mb-1" style={{ color: '#8E8E93' }}>Coming Soon</p>
        <p className="text-[10px] leading-relaxed" style={{ color: '#AEAEB2' }}>
          {isEn ? <>More features<br />on the way</> : <>더 많은 기능이<br />준비 중이에요</>}
        </p>
      </div>
      <div
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
        style={{ background: 'rgba(0,0,0,0.05)' }}
      >
        <span className="w-1 h-1 rounded-full" style={{ background: '#AEAEB2', animation: 'pulseDot 1.6s ease-in-out infinite' }} />
        <span className="text-[9px] font-medium" style={{ color: '#AEAEB2' }}>{isEn ? 'Coming soon' : '업데이트 예정'}</span>
      </div>
    </div>
  </div>
);

// ── Dual panel ────────────────────────────────────────────────────
const DualPanel = ({ left, right, animKey }: { left: PanelItem; right: PanelItem; animKey: number }) => (
  <div
    key={animKey}
    className="flex gap-3 w-full h-full"
    style={{ animation: 'screenshotFadeIn 0.35s ease both' }}
  >
    {[left, right].map((item, idx) => (
      <div
        key={idx}
        className="flex-1 relative rounded-[12px] overflow-hidden"
        style={{ border: '1px solid rgba(0,0,0,0.06)' }}
      >
        <ScreenshotBadge label={item.label} />
        <img src={item.src} alt={item.label} className="w-full h-full object-cover object-top" />
      </div>
    ))}
  </div>
);

// ── Quad panel ────────────────────────────────────────────────────
const QuadPanel = ({
  items,
  animKey,
  isEn,
}: {
  items: [PanelItem, PanelItem, PanelItem, PanelItem];
  animKey: number;
  isEn?: boolean;
}) => {
  const mainItems = items.filter((item) => !item.comingSoon);
  return (
    <div
      key={animKey}
      className="w-full h-full"
      style={{ animation: 'screenshotFadeIn 0.35s ease both' }}
    >
      {/* Mobile: 3 panels side by side (tighter) */}
      <div className="flex lg:hidden gap-1.5 h-full">
        {mainItems.map((item, idx) => (
          <div
            key={idx}
            className="flex-1 relative rounded-[10px] overflow-hidden"
            style={{ border: '1px solid rgba(0,0,0,0.06)', minWidth: 0 }}
          >
            <div
              className="absolute top-2 left-2 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.93)',
                border: '1px solid rgba(181,58,58,0.13)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: CRIMSON }} />
              <span className="text-[10px] font-semibold whitespace-nowrap" style={{ color: '#1C1C1E' }}>
                {item.label}
              </span>
            </div>
            <img src={item.src} alt={item.label} className="w-full h-full object-cover object-top" />
          </div>
        ))}
      </div>
      {/* Desktop: full 4-panel layout */}
      <div className="hidden lg:flex gap-2 h-full">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`relative rounded-[12px] overflow-hidden ${
              item.comingSoon ? 'flex-none' : 'flex-1'
            }`}
            style={{
              width: item.comingSoon ? '9%' : undefined,
              border: item.comingSoon ? 'none' : '1px solid rgba(0,0,0,0.06)',
            }}
          >
            {item.comingSoon ? (
              <ComingSoonPanel isEn={isEn} />
            ) : (
              <>
                <ScreenshotBadge label={item.label} />
                <img src={item.src} alt={item.label} className="w-full h-full object-cover object-top" />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Feature item ─────────────────────────────────────────────────
const FeatureItem = ({
  icon,
  label,
  desc,
  isActive,
  comingSoon,
}: {
  icon: string;
  label: string;
  desc: string;
  isActive: boolean;
  comingSoon?: boolean;
}) => (
  <div className="flex items-start gap-3">
    <div
      className="w-7 h-7 flex items-center justify-center rounded-[8px] flex-shrink-0 mt-0.5"
      style={{
        background: comingSoon
          ? isActive ? 'rgba(181,58,58,0.06)' : 'rgba(0,0,0,0.03)'
          : isActive ? 'rgba(181,58,58,0.10)' : 'rgba(0,0,0,0.04)',
      }}
    >
      <i className={`${icon} text-[13px]`} style={{ color: isActive ? (comingSoon ? 'rgba(181,58,58,0.5)' : CRIMSON) : '#AEAEB2' }} />
    </div>
    <div>
      <div className="flex items-center gap-2 mb-0.5">
        <p
          className="text-[13px] font-semibold leading-tight"
          style={{ color: isActive ? (comingSoon ? '#AEAEB2' : '#1C1C1E') : '#8E8E93' }}
        >
          {label}
        </p>
        {comingSoon && isActive && (
          <span
            className="text-[9px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap"
            style={{ background: 'rgba(181,58,58,0.10)', color: CRIMSON, letterSpacing: '0.05em' }}
          >
            SOON
          </span>
        )}
      </div>
      <p className="text-[12px] leading-relaxed" style={{ color: isActive ? (comingSoon ? '#C7C7CC' : '#6E6E73') : '#AEAEB2' }}>
        {desc}
      </p>
    </div>
  </div>
);

// ── Main component ───────────────────────────────────────────────
const AlphadocSection = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const PRODUCTS = isEn ? PRODUCTS_EN : PRODUCTS_KO;

  const { ref, visible } = useSectionReveal(0.06);
  const [activeIdx, setActiveIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIdxRef = useRef(0);

  // 스크롤 → activeIdx 자동 연동 (모바일 전용)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    if (window.innerWidth >= 1024) return;

    const ratios: number[] = PRODUCTS.map(() => 0);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = cardRefs.current.findIndex((r) => r === entry.target);
          if (idx !== -1) ratios[idx] = entry.intersectionRatio;
        });
        const maxRatio = Math.max(...ratios);
        const newIdx = ratios.indexOf(maxRatio);
        if (newIdx !== -1 && maxRatio > 0.4 && newIdx !== activeIdxRef.current) {
          activeIdxRef.current = newIdx;
          setActiveIdx(newIdx);
          setAnimKey((prev) => prev + 1);
        }
      },
      {
        root: container,
        threshold: [0.4, 0.5, 0.6, 0.7, 0.8],
      }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [PRODUCTS]);

  const handleSwitch = (i: number) => {
    if (i === activeIdx) return;
    activeIdxRef.current = i;
    setActiveIdx(i);
    setAnimKey((prev) => prev + 1);
    // 모바일에서 클릭 시 해당 카드로 스크롤
    if (window.innerWidth < 1024 && cardRefs.current[i]) {
      cardRefs.current[i]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  };

  const active = PRODUCTS[activeIdx];

  return (
    <section
      id="alphadoc"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative overflow-hidden border-b border-viore-border"
      style={{ backgroundColor: 'rgba(251,250,247,0.80)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 18%, rgba(14,110,110,0.05) 0%, transparent 70%)',
        }}
      />

      <div
        className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16"
        style={{ paddingTop: 'clamp(80px, 8vw, 120px)' }}
      >
        {/* ── Header ── */}
        <div className={`text-center mb-12 ${visible ? 'reveal-visible' : 'reveal-hidden'}`}>
          <img
            src="https://static.readdy.ai/image/6dd256f1af0a69f80b0795e79fdc4817/2dc1688315e04214b8eebad32886e1da.png"
            alt="Alphadoc"
            className="inline-block mb-5 w-auto"
            style={{ height: '36px' }}
          />
          <h2
            className="font-bold text-viore-text leading-[1.18] mx-auto"
            style={{
              fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)',
              letterSpacing: '-0.025em',
              maxWidth: '640px',
            }}
          >
            {t('alphadoc_headline')}
          </h2>
          <p
            className="mt-4 mx-auto text-viore-muted"
            style={{ fontSize: '15px', maxWidth: '480px', lineHeight: '1.7' }}
          >
            {t('alphadoc_sub')}
          </p>
          <a
            href="https://alphadoc.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-[12px] text-[14px] font-semibold text-white whitespace-nowrap cursor-pointer transition-all duration-300 hover:opacity-90 hover:translate-y-[-2px]"
            style={{ background: CRIMSON }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/70" style={{ animation: 'pulseDot 1.6s ease-in-out infinite' }} />
            {isEn ? 'Join Alphadoc Beta' : '알파닥 베타테스트 참여하기'}
            <i className="ri-arrow-right-line text-[13px]" />
          </a>
          {/* Language availability note */}
          <p
            className="mt-3 text-[12px] flex items-center justify-center gap-1.5"
            style={{ color: '#AEAEB2', letterSpacing: '0.01em' }}
          >
            <i className="ri-global-line text-[11px]" />
            {isEn
              ? 'Currently available in Korean only — English version coming soon'
              : '현재 한국어만 지원되며, 영문 버전은 곧 출시 예정이에요'}
          </p>
        </div>

        {/* ── Screenshot area ── */}
        <div className={`${visible ? 'reveal-visible' : 'reveal-hidden'}`}>
          <div
            className="relative rounded-[20px]"
            style={{
              padding: '1px',
              background:
                'linear-gradient(135deg, rgba(181,58,58,0.28) 0%, rgba(14,110,110,0.18) 50%, rgba(181,58,58,0.10) 100%)',
              boxShadow:
                '0 0 0 1px rgba(0,0,0,0.06), 0 8px 48px rgba(181,58,58,0.12), 0 24px 64px rgba(0,0,0,0.10)',
            }}
          >
            <div
              className="rounded-[19px] overflow-hidden bg-viore-surface relative p-3"
              style={{ height: 'clamp(280px, 42vw, 620px)' }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none z-10"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0.7) 60%, transparent 100%)',
                }}
              />
              {active.screenshot.type === 'dual' && (
                <DualPanel
                  left={active.screenshot.left}
                  right={active.screenshot.right}
                  animKey={animKey}
                />
              )}
              {active.screenshot.type === 'quad' && (
                <QuadPanel items={active.screenshot.items} animKey={animKey} isEn={isEn} />
              )}
              {active.screenshot.type === 'single' && (
                <img
                  key={animKey}
                  src={active.screenshot.src}
                  alt={active.title}
                  className="w-full h-full object-cover object-top block rounded-[12px]"
                  style={{ animation: 'screenshotFadeIn 0.35s ease both' }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Product cards ── */}
      <div
        className={`relative z-10 border-t border-viore-border ${visible ? 'reveal-visible' : 'reveal-hidden'}`}
        style={{ background: '#F5F4F0' }}
      >
        <div className="max-w-[1200px] mx-auto lg:px-16">
          <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-2 lg:overflow-visible"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {PRODUCTS.map((prod, i) => {
              const isActive = activeIdx === i;
              return (
                <button
                  key={prod.id}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  onClick={() => handleSwitch(i)}
                  className={`text-left flex-none w-[82vw] sm:w-[70vw] snap-start lg:w-auto
                    py-7 px-6 lg:py-10 lg:px-8
                    ${i === 0 ? 'ml-6 lg:ml-0' : ''}
                    ${i === PRODUCTS.length - 1 ? 'mr-6 lg:mr-0' : ''}
                    cursor-pointer transition-all duration-200 relative outline-none`}
                  style={{
                    borderRight: i === 0 ? '1px solid rgba(0,0,0,0.07)' : 'none',
                    background: isActive ? 'rgba(255,255,255,0.75)' : 'transparent',
                  }}
                >
                  {isActive && (
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px]"
                      style={{ background: CRIMSON }}
                    />
                  )}
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-9 h-9 flex items-center justify-center rounded-[10px] flex-shrink-0"
                      style={{ background: isActive ? '#F9EDED' : 'rgba(181,58,58,0.08)' }}
                    >
                      <i className={`${prod.icon} text-[15px]`} style={{ color: CRIMSON }} />
                    </div>
                    <div>
                      <p
                        className="text-[15px] font-bold leading-tight"
                        style={{
                          color: isActive ? '#1C1C1E' : '#8E8E93',
                          fontFamily: "'Inter', sans-serif",
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {prod.title}
                      </p>
                      <p className="text-[11px] mt-0.5" style={{ color: isActive ? '#8E8E93' : '#C7C7CC' }}>
                        {prod.subtitle}
                      </p>
                    </div>
                  </div>
                  <div
                    className="my-5 h-px"
                    style={{ background: isActive ? 'rgba(181,58,58,0.10)' : 'rgba(0,0,0,0.05)' }}
                  />
                  <div className="flex flex-col gap-4">
                    {prod.features.map((feat) => (
                      <FeatureItem
                        key={feat.label}
                        icon={feat.icon}
                        label={feat.label}
                        desc={feat.desc}
                        isActive={isActive}
                        comingSoon={feat.comingSoon}
                      />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
          {/* 오른쪽 화살표: 첫 번째 카드일 때 */}
          <button
            onClick={() => handleSwitch(1)}
            className="lg:hidden absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer flex items-center justify-center rounded-full transition-all duration-300 z-10"
            style={{
              width: '32px',
              height: '32px',
              background: 'rgba(255,255,255,0.96)',
              border: '1.5px solid rgba(181,58,58,0.35)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              opacity: activeIdx === 0 ? 1 : 0,
              pointerEvents: activeIdx === 0 ? 'auto' : 'none',
              animation: activeIdx === 0 ? 'cardHintRight 1.6s ease-in-out infinite' : 'none',
            }}
          >
            <i className="ri-arrow-right-s-line text-[18px]" style={{ color: '#B53A3A' }} />
          </button>
          {/* 왼쪽 화살표: 두 번째 카드일 때 */}
          <button
            onClick={() => handleSwitch(0)}
            className="lg:hidden absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer flex items-center justify-center rounded-full transition-all duration-300 z-10"
            style={{
              width: '32px',
              height: '32px',
              background: 'rgba(255,255,255,0.96)',
              border: '1.5px solid rgba(181,58,58,0.35)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              opacity: activeIdx === 1 ? 1 : 0,
              pointerEvents: activeIdx === 1 ? 'auto' : 'none',
              animation: activeIdx === 1 ? 'cardHintLeft 1.6s ease-in-out infinite' : 'none',
            }}
          >
            <i className="ri-arrow-left-s-line text-[18px]" style={{ color: '#B53A3A' }} />
          </button>
          </div>{/* /relative */}
        </div>

        {/* ── Dot indicator (mobile only) ── */}
        <div className="flex lg:hidden items-center justify-center gap-2 py-4">
          {PRODUCTS.map((_, i) => (
            <button
              key={i}
              onClick={() => handleSwitch(i)}
              className="cursor-pointer transition-all duration-300 rounded-full"
              style={{
                width: activeIdx === i ? '20px' : '6px',
                height: '6px',
                background: activeIdx === i ? CRIMSON : 'rgba(181,58,58,0.22)',
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes cardHintRight {
          0%, 100% { transform: translateY(-50%) translateX(0); }
          50% { transform: translateY(-50%) translateX(5px); }
        }
        @keyframes cardHintLeft {
          0%, 100% { transform: translateY(-50%) translateX(0); }
          50% { transform: translateY(-50%) translateX(-5px); }
        }
        @keyframes screenshotFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
        .snap-x::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};

export default AlphadocSection;
