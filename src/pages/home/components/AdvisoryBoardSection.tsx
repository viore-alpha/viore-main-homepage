import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { highlightViore } from '@/utils/highlightViore';

// ── Category label ────────────────────────────────────────────
const CategoryLabel = ({ ko, en, isEn }: { ko: string; en: string; isEn: boolean }) => (
  <span
    className="inline-flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-[0.12em]"
    style={{ color: '#0E6E6E', fontFamily: "'Inter', sans-serif" }}
  >
    <span className="w-3 h-px" style={{ background: '#0E6E6E', display: 'inline-block' }} />
    {isEn ? en : ko}
  </span>
);

// ── Bullet list ───────────────────────────────────────────────
const BulletList = ({ items }: { items: React.ReactNode[] }) => (
  <ul className="flex flex-col gap-1.5 mt-2">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2">
        <span
          className="mt-[6px] w-1 h-1 rounded-full flex-shrink-0"
          style={{ background: '#0E6E6E', opacity: 0.5 }}
        />
        <span className="text-[13px] text-[#3C3C3E] leading-[1.65]">{item}</span>
      </li>
    ))}
  </ul>
);

// ── Mobile inner slider ───────────────────────────────────────
const MobileCardSlider = ({
  profilePanel,
  detailPanel,
}: {
  profilePanel: React.ReactNode;
  detailPanel: React.ReactNode;
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    setActiveSlide(scrollLeft > clientWidth / 2 ? 1 : 0);
  };

  const goTo = (i: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({ left: i * scrollRef.current.clientWidth, behavior: 'smooth' });
  };

  return (
    <div className="lg:hidden">
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex-none w-full snap-start">{profilePanel}</div>
          <div className="flex-none w-full snap-start">{detailPanel}</div>
        </div>
        {/* 오른쪽 화살표 - 패널 1일 때 */}
        <button
          onClick={() => goTo(1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer flex items-center justify-center rounded-full transition-all duration-300"
          style={{
            width: '32px',
            height: '32px',
            background: 'rgba(255,255,255,0.96)',
            border: '1.5px solid rgba(14,110,110,0.35)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            opacity: activeSlide === 0 ? 1 : 0,
            pointerEvents: activeSlide === 0 ? 'auto' : 'none',
            animation: activeSlide === 0 ? 'swipeHintPulse 1.6s ease-in-out infinite' : 'none',
          }}
        >
          <i className="ri-arrow-right-s-line text-[#0E6E6E] text-[18px]" />
        </button>
        {/* 왼쪽 화살표 - 패널 2일 때 */}
        <button
          onClick={() => goTo(0)}
          className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer flex items-center justify-center rounded-full transition-all duration-300"
          style={{
            width: '32px',
            height: '32px',
            background: 'rgba(255,255,255,0.96)',
            border: '1.5px solid rgba(14,110,110,0.35)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            opacity: activeSlide === 1 ? 1 : 0,
            pointerEvents: activeSlide === 1 ? 'auto' : 'none',
            animation: activeSlide === 1 ? 'swipeHintPulseLeft 1.6s ease-in-out infinite' : 'none',
          }}
        >
          <i className="ri-arrow-left-s-line text-[#0E6E6E] text-[18px]" />
        </button>
      </div>
      {/* Dot indicator */}
      <div className="flex items-center justify-center py-3 border-t border-[#F0EFEB]">
        <div className="flex gap-1.5">
          {[0, 1].map((i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full cursor-pointer transition-all duration-300"
              style={{
                width: activeSlide === i ? '18px' : '6px',
                height: '6px',
                background: activeSlide === i ? '#0E6E6E' : 'rgba(14,110,110,0.22)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const PrivateAdvisorCard = ({ isEn }: { isEn: boolean }) => (
  <div
    className="rounded-2xl bg-white border border-[#E5E5EA] overflow-hidden min-h-[240px] flex items-center justify-center px-6 py-12"
    style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
  >
    <div className="flex flex-col items-center gap-4 text-center">
      <span
        className="w-12 h-12 flex items-center justify-center rounded-full"
        style={{ background: 'rgba(14,110,110,0.08)' }}
      >
        <i className="ri-lock-line text-[#0E6E6E] text-xl" />
      </span>
      <div>
        <p className="text-[13px] font-semibold text-[#0E6E6E] tracking-wide">Coming Soon</p>
        <p className="mt-1 text-[12px] text-viore-muted">
          {isEn ? 'Advisor profile coming soon' : '자문위원 프로필은 곧 공개됩니다'}
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-2" aria-hidden="true">
        {[120, 84, 104].map((width) => (
          <span
            key={width}
            className="h-6 rounded-full"
            style={{ width, background: 'rgba(14,110,110,0.08)' }}
          />
        ))}
      </div>
    </div>
  </div>
);

// ── Main component ────────────────────────────────────────────
const AdvisoryBoardSection = () => {
  const { t, i18n } = useTranslation();
  const { ref, visible } = useSectionReveal(0.08);
  const isEn = i18n.language === 'en';

  return (
    <section
      id="advisory"
      ref={ref as React.RefObject<HTMLElement>}
      className="border-b border-viore-border"
      style={{ backgroundColor: 'rgba(251,250,247,0.80)', padding: 'clamp(56px, 8vw, 120px) 0' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

        {/* ── Section header ── */}
        <div className={`${visible ? 'reveal-visible' : 'reveal-hidden'} mb-10`}>
          <h2
            className="font-bold text-viore-text leading-[1.22] max-w-xl"
            style={{ fontSize: 'clamp(1.7rem, 3vw, 2.5rem)', letterSpacing: '-0.025em' }}
          >
            {highlightViore(t('advisory_headline'))}
          </h2>
          <div className="mt-4 max-w-lg">
            {t('advisory_sub').split('\n').map((line, i) => (
              <p key={i} className="text-[15px] text-viore-muted leading-[1.8]">{line}</p>
            ))}
          </div>
        </div>

        {/* ── Advisor cards: 세로 리스트 ── */}
        <div className={`${visible ? 'reveal-visible' : 'reveal-hidden'} flex flex-col gap-5 lg:gap-6`}>

          {/* ══════════════════════════════════════════════
              Card 1: 민희석 원장
          ══════════════════════════════════════════════ */}
          <div
            className="rounded-2xl bg-white border border-[#E5E5EA] overflow-hidden transition-all duration-300 hover:translate-y-[-2px]"
            style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
          >
            {/* Mobile: 2-panel slider */}
            <MobileCardSlider
              profilePanel={
                <div className="flex flex-col items-center gap-4 p-6">
                  <div
                    className="rounded-xl overflow-hidden flex-shrink-0"
                    style={{ width: '160px', height: '160px', border: '1px solid rgba(14,110,110,0.12)' }}
                  >
                    <img
                      src="https://public.readdy.ai/ai/img_res/edited_6e3d94c2ca4da10e26686a2e35973b58_f7d81238.jpg"
                      alt="Heesuk Min, M.D."
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div
                    className="w-full max-w-[200px] flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(14,110,110,0.12)' }}
                  >
                    <p className="text-[11px] font-semibold text-viore-teal text-center">OPEN healthcare</p>
                    <p className="text-[10px] text-viore-muted text-center leading-snug">Seegene M.F. · OneBiomed (Singapore)</p>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: '#B53A3A' }}>Medical Advisor</span>
                    <h3 className="mt-1 font-bold text-viore-text text-[1.35rem] leading-tight" style={{ letterSpacing: '-0.02em' }}>
                      {isEn ? 'Heesuk Min' : '민희석'}
                      {' '}<span className="font-semibold text-[0.75em] text-[#6E6E73]">M.D.</span>
                    </h3>
                    <p className="mt-1 text-[12px] text-[#3C3C3E] leading-snug">
                      {isEn ? 'Chief Director, OHKZ · Board Director, OneBiomed' : 'OHKZ 대표원장 · OneBiomed 이사회 임원'}
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {(isEn
                      ? ['Chief Director, OHKZ', 'Internist & Cardiologist', 'Global Healthcare Entrepreneur', 'Former Presidential Physician']
                      : ['OHKZ 대표원장', '내과·심장내과 전문의', '글로벌 헬스케어 사업가', '前 청와대 의무실 의사']
                    ).map((badge) => (
                      <span key={badge} className="text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap" style={{ background: '#F5F4F0', color: '#3C3C3E', border: '1px solid #E5E5EA' }}>{badge}</span>
                    ))}
                  </div>
                </div>
              }
              detailPanel={
                <div className="p-6 flex flex-col gap-4">
                  <div>
                    <CategoryLabel ko="임상 Clinical" en="Clinical" isEn={isEn} />
                    {isEn ? (
                      <BulletList items={[
                        'Former Clinical Professor, Cardiology, SNU Hospital Gangnam Center',
                        <><span style={{ color: '#B53A3A', fontWeight: 600 }}>Former Presidential Medical Corps, Blue House</span></>,
                        'Internal Medicine Resident, Seoul National University Hospital',
                      ]} />
                    ) : (
                      <BulletList items={[
                        '前 서울대학교병원 강남센터 순환기내과 진료교수',
                        <><span style={{ color: '#B53A3A', fontWeight: 600 }}>前 청와대 의무실</span></>,
                        '서울대학교병원 내과 레지던트',
                      ]} />
                    )}
                  </div>
                  <div>
                    <CategoryLabel ko="글로벌 Global" en="Global" isEn={isEn} />
                    {isEn ? (
                      <BulletList items={[
                        <><span style={{ color: '#B53A3A', fontWeight: 600 }}>Chief Director, OPEN Healthcare KMC, Almaty</span></>,
                        <><span style={{ color: '#B53A3A', fontWeight: 600 }}>Board Director, OneBiomed (Singapore)</span></>,
                        'Former CEO, Medical Partners Korea & Kazakhstan',
                      ]} />
                    ) : (
                      <BulletList items={[
                        <><span style={{ color: '#B53A3A', fontWeight: 600 }}>(현) OPEN healthcare KMC Almaty 대표원장</span></>,
                        <><span style={{ color: '#B53A3A', fontWeight: 600 }}>(현) OneBiomed (싱가포르) 이사회 임원</span></>,
                        '前 Medical Partners Korea 대표 겸 카자흐스탄 법인장',
                      ]} />
                    )}
                  </div>
                  <div>
                    <CategoryLabel ko="교육 Education" en="Education" isEn={isEn} />
                    {isEn ? (
                      <BulletList items={[
                        'M.S. Internal Medicine, Chung-Ang Univ. (2010)',
                        'M.D., Seoul National University (Feb 2003)',
                      ]} />
                    ) : (
                      <BulletList items={[
                        '중앙대학교 의과대학 내과학 석사 (2010)',
                        '서울대학교 의과대학 졸업 (2003년 2월)',
                      ]} />
                    )}
                  </div>
                </div>
              }
            />

            {/* Desktop: 기존 레이아웃 유지 */}
            <div className="hidden lg:flex flex-row">
              <div className="flex-shrink-0 flex flex-col items-center justify-start gap-4 p-10 w-[280px] border-r border-[#F0EFEB]">
                <div
                  className="w-full rounded-xl overflow-hidden flex-shrink-0"
                  style={{ aspectRatio: '1 / 1', maxWidth: '220px', border: '1px solid rgba(14,110,110,0.12)' }}
                >
                  <img
                    src="https://public.readdy.ai/ai/img_res/edited_6e3d94c2ca4da10e26686a2e35973b58_f7d81238.jpg"
                    alt="Heesuk Min, M.D."
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div
                  className="w-full max-w-[220px] flex flex-col items-center gap-2 px-4 py-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(14,110,110,0.12)' }}
                >
                  <p className="text-[12px] font-semibold text-viore-teal text-center leading-snug">OPEN healthcare</p>
                  <p className="text-[10px] text-viore-muted text-center leading-snug">Seegene M. F. OpenHealthcare&nbsp;<br />OneBiomed Pte Ltd (Singapore)</p>
                </div>
              </div>
              <div className="flex-1 pt-10 pr-10 pl-0 pb-6 flex flex-col gap-4">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.22em]" style={{ color: '#B53A3A', fontFamily: "'Inter', sans-serif" }}>Medical Advisor</span>
                <div className="flex flex-wrap gap-2 -mt-1">
                  {(isEn
                    ? ['Chief Director, OHKZ', 'Internist & Cardiologist', 'Global Healthcare Entrepreneur', 'Former Presidential Physician']
                    : ['OHKZ 대표원장', '내과·심장내과 전문의', '글로벌 헬스케어 사업가', '前 청와대 의무실 의사']
                  ).map((badge) => (
                    <span key={badge} className="text-[11px] px-2.5 py-1 rounded-full whitespace-nowrap" style={{ background: '#F5F4F0', color: '#3C3C3E', border: '1px solid #E5E5EA', fontFamily: "'Inter', sans-serif" }}>{badge}</span>
                  ))}
                </div>
                <div>
                  <h3 className="font-bold text-viore-text leading-tight" style={{ fontSize: 'clamp(1.4rem, 2vw, 1.8rem)', letterSpacing: '-0.02em' }}>
                    {isEn ? <>Heesuk Min{' '}<span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.75em', color: '#6E6E73' }}>M.D.</span></> : <>민희석{' '}<span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.75em', color: '#6E6E73' }}>Heesuk Min, M.D.</span></>}
                  </h3>
                  <p className="mt-1 text-[14px] font-medium text-[#3C3C3E] leading-snug">
                    {isEn ? 'Chief Director, Seegene Medical Foundation Open Healthcare KMC · Board Director, OneBiomed' : '씨젠의료재단 오픈헬스케어 KMC 대표원장 · OneBiomed 이사회 임원'}
                  </p>
                  <p className="mt-1 text-[13px] text-viore-muted leading-snug">
                    {isEn ? 'Cardiologist · Global K-Healthcare Entrepreneur · Former Presidential Physician' : '심장내과 전문의 · 글로벌 K-의료 사업가 · 청와대 출신 임상의'}
                  </p>
                </div>
                <div className="h-px bg-[#F0EFEB]" />
                <div className="grid grid-cols-3 gap-5">
                  <div>
                    <CategoryLabel ko="임상 Clinical" en="Clinical" isEn={isEn} />
                    {isEn ? (
                      <BulletList items={[
                        'Former Clinical Professor, Cardiology, SNU Hospital Gangnam Center',
                        <><span style={{ color: '#B53A3A', fontWeight: 600 }}>Former Presidential Medical Corps, Blue House</span></>,
                        'Internal Medicine Resident, Seoul National University Hospital',
                        'Intern, Seoul National University Hospital',
                      ]} />
                    ) : (
                      <BulletList items={[
                        '前 서울대학교병원 강남센터 순환기내과 진료교수',
                        <><span style={{ color: '#B53A3A', fontWeight: 600 }}>前 청와대 의무실</span></>,
                        '서울대학교병원 내과 레지던트',
                        '서울대학교병원 인턴',
                      ]} />
                    )}
                  </div>
                  <div>
                    <CategoryLabel ko="글로벌 Global" en="Global" isEn={isEn} />
                    {isEn ? (
                      <BulletList items={[
                        <><span style={{ color: '#B53A3A', fontWeight: 600 }}>Chief Director, OPEN Healthcare KMC, Almaty</span></>,
                        <><span style={{ color: '#B53A3A', fontWeight: 600 }}>Board Director, OneBiomed (Singapore)</span></>,
                        'Former CEO, Medical Partners Korea & Kazakhstan',
                      ]} />
                    ) : (
                      <BulletList items={[
                        <><span style={{ color: '#B53A3A', fontWeight: 600 }}>(현) OPEN healthcare KMC Almaty 대표원장</span></>,
                        <><span style={{ color: '#B53A3A', fontWeight: 600 }}>(현) OneBiomed (싱가포르) 이사회 임원</span></>,
                        '前 Medical Partners Korea 대표 겸 카자흐스탄 법인장',
                      ]} />
                    )}
                  </div>
                  <div>
                    <CategoryLabel ko="교육 Education" en="Education" isEn={isEn} />
                    {isEn ? (
                      <BulletList items={[
                        'M.S. Internal Medicine, Chung-Ang Univ. School of Medicine (2010)',
                        'M.D., Seoul National University College of Medicine (Feb 2003)',
                      ]} />
                    ) : (
                      <BulletList items={[
                        '중앙대학교 의과대학 내과학 석사 (2010)',
                        '서울대학교 의과대학 졸업 (2003년 2월)',
                      ]} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <PrivateAdvisorCard isEn={isEn} />
          <PrivateAdvisorCard isEn={isEn} />

        </div>
      </div>

      <style>{`
        .advisory-scroll::-webkit-scrollbar { display: none; }
        @keyframes swipeHintPulse {
          0%, 100% { transform: translateY(-50%) translateX(0); }
          50% { transform: translateY(-50%) translateX(5px); }
        }
        @keyframes swipeHintPulseLeft {
          0%, 100% { transform: translateY(-50%) translateX(0); }
          50% { transform: translateY(-50%) translateX(-5px); }
        }
      `}</style>
    </section>
  );
};

export default AdvisoryBoardSection;
