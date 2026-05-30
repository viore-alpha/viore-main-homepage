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
                        'Pioneer of CPX Prep Program (since 2009)',
                        'M.S. Internal Medicine, Chung-Ang Univ. (2010)',
                        'M.D., Seoul National University (Feb 2003)',
                      ]} />
                    ) : (
                      <BulletList items={[
                        '2009년~ 국내 최초 의사국시 CPX 특별반 운영',
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
                        'Pioneer of CPX Prep Program for Medical Licensing Exam (since 2009)',
                        'M.S. Internal Medicine, Chung-Ang Univ. School of Medicine (2010)',
                        'M.D., Seoul National University College of Medicine (Feb 2003)',
                      ]} />
                    ) : (
                      <BulletList items={[
                        '2009년~ 국내 최초 의사국시 CPX 특별반 운영',
                        '중앙대학교 의과대학 내과학 석사 (2010)',
                        '서울대학교 의과대학 졸업 (2003년 2월)',
                      ]} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════
              Card 2: 전기현 교수 (Coming Soon)
          ══════════════════════════════════════════════ */}
          <div className="relative rounded-2xl overflow-hidden">
            {/* 비공개 커버 */}
            <div
              className="absolute inset-0 z-10 rounded-2xl flex flex-col items-center justify-center gap-3 pointer-events-none"
              style={{ background: 'rgba(251,250,247,0.82)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', border: '1px solid rgba(14,110,110,0.10)' }}
            >
              <span className="w-9 h-9 flex items-center justify-center rounded-full" style={{ background: 'rgba(14,110,110,0.08)' }}>
                <i className="ri-lock-line text-[#0E6E6E] text-lg" />
              </span>
              <p className="text-[13px] font-semibold text-[#0E6E6E] tracking-wide">Coming Soon</p>
              <p className="text-[11px] text-viore-muted">{isEn ? 'Profile coming soon' : '곧 공개될 예정입니다'}</p>
            </div>
            <div
              className="rounded-2xl bg-white border border-[#E5E5EA] overflow-hidden"
              style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
            >
              {/* Mobile slider (blurred) */}
              <MobileCardSlider
                profilePanel={
                  <div className="flex flex-col items-center gap-4 p-6">
                    <div className="rounded-xl overflow-hidden" style={{ width: '160px', height: '160px', border: '1px solid rgba(14,110,110,0.12)' }}>
                      <img src="https://storage.readdy-site.link/project_files/f0121b54-b4dd-49ef-9b9a-70a9b6263ce6/4f344f32-a73a-4529-bd40-6ec54ef034bb_1004675_p2.png?v=f6df5677bf83cce9f55071fe31903644" alt="Ki-Hyun Jeon, M.D." className="w-full h-full object-cover object-top" />
                    </div>
                    <div className="w-full max-w-[200px] flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(14,110,110,0.12)' }}>
                      <img src="https://www.snubh.org/front/images/header/tit_logo.png" alt="SNUBH" className="h-8 w-auto object-contain" />
                      <p className="text-[10px] text-viore-muted text-center">Seoul National University Bundang Hospital</p>
                    </div>
                    <div className="text-center">
                      <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: '#B53A3A' }}>Medical Advisor</span>
                      <h3 className="mt-1 font-bold text-viore-text text-[1.35rem] leading-tight" style={{ letterSpacing: '-0.02em' }}>
                        {isEn ? 'Ki-Hyun Jeon' : '전기현'}{' '}<span className="font-semibold text-[0.75em] text-[#6E6E73]">M.D.</span>
                      </h3>
                      <p className="mt-1 text-[12px] text-[#3C3C3E] leading-snug">
                        {isEn ? 'Associate Professor, SNUBH' : '분당서울대학교병원 부교수'}
                      </p>
                    </div>
                  </div>
                }
                detailPanel={
                  <div className="p-6 flex flex-col gap-4">
                    <div>
                      <CategoryLabel ko="임상 Clinical" en="Clinical" isEn={isEn} />
                      {isEn ? (
                        <BulletList items={[
                          <><span style={{ color: '#B53A3A', fontWeight: 600 }}>Associate Professor, Cardiovascular Center, SNUBH</span></>,
                          'Former Director of Clinical Research, Mediplex Sejong Hospital',
                        ]} />
                      ) : (
                        <BulletList items={[
                          <><span style={{ color: '#B53A3A', fontWeight: 600 }}>(현) 분당서울대병원 순환기내과 부교수</span></>,
                          '前 메디플렉스 세종병원 심장내과 임상연구실장',
                        ]} />
                      )}
                    </div>
                    <div>
                      <CategoryLabel ko="AI · 교육" en="AI · Education" isEn={isEn} />
                      {isEn ? (
                        <BulletList items={[
                          <>&quot;Medical Research with ChatGPT&quot; (FastCampus) — <span style={{ color: '#B53A3A', fontWeight: 600 }}>₩100M Revenue in 50 Days</span></>,
                        ]} />
                      ) : (
                        <BulletList items={[
                          <>패스트캠퍼스 <span style={{ color: '#B53A3A', fontWeight: 600 }}>출시 50일 매출 1억 돌파</span></>,
                        ]} />
                      )}
                    </div>
                  </div>
                }
              />
              {/* Desktop */}
              <div className="hidden lg:flex flex-row">
                <div className="flex-shrink-0 flex flex-col items-center justify-start gap-4 p-10 w-[280px] border-r border-[#F0EFEB]">
                  <div className="w-full rounded-xl overflow-hidden" style={{ aspectRatio: '1 / 1', maxWidth: '200px', border: '1px solid rgba(14,110,110,0.12)' }}>
                    <img src="https://storage.readdy-site.link/project_files/f0121b54-b4dd-49ef-9b9a-70a9b6263ce6/4f344f32-a73a-4529-bd40-6ec54ef034bb_1004675_p2.png?v=f6df5677bf83cce9f55071fe31903644" alt="Ki-Hyun Jeon, M.D." className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="w-full max-w-[220px] flex flex-col items-center gap-2 px-4 py-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(14,110,110,0.12)' }}>
                    <img src="https://www.snubh.org/front/images/header/tit_logo.png" alt="SNUBH" className="w-full h-auto object-contain" style={{ maxHeight: '40px' }} />
                    <p className="text-[10px] text-viore-muted text-center leading-snug">Seoul National University<br />Bundang Hospital</p>
                  </div>
                </div>
                <div className="flex-1 pt-10 pr-10 pl-0 pb-6 flex flex-col gap-4">
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.22em]" style={{ color: '#B53A3A', fontFamily: "'Inter', sans-serif" }}>Medical Advisor</span>
                  <div className="flex flex-wrap gap-2 -mt-1">
                    {(isEn
                      ? ['Associate Professor, SNUBH', 'Cardiologist', 'Medical AI Researcher', 'Bestselling Instructor · FastCampus']
                      : ['분당서울대학교병원 부교수', '심장내과 전문의', '의료 AI 연구자', '베스트셀러 강사 · 패스트캠퍼스']
                    ).map((badge) => (
                      <span key={badge} className="text-[11px] px-2.5 py-1 rounded-full whitespace-nowrap" style={{ background: '#F5F4F0', color: '#3C3C3E', border: '1px solid #E5E5EA', fontFamily: "'Inter', sans-serif" }}>{badge}</span>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-bold text-viore-text leading-tight" style={{ fontSize: 'clamp(1.4rem, 2vw, 1.8rem)', letterSpacing: '-0.02em' }}>
                      {isEn ? <>Ki-Hyun Jeon{' '}<span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.75em', color: '#6E6E73' }}>M.D.</span></> : <>전기현{' '}<span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.75em', color: '#6E6E73' }}>Ki-Hyun Jeon, M.D.</span></>}
                    </h3>
                    <p className="mt-1 text-[14px] font-medium text-[#3C3C3E] leading-snug">
                      {isEn ? 'Associate Professor, Cardiovascular Center, SNUBH' : '분당서울대학교병원 심장혈관센터 순환기내과 부교수'}
                    </p>
                    <p className="mt-1 text-[13px] text-viore-muted leading-snug">
                      {isEn ? 'Cardiologist · Medical AI Researcher · Bestselling AI Medical Research Instructor' : '심장내과 임상의 · 의료 AI 연구자 · 베스트셀러 AI 의학연구 강사'}
                    </p>
                  </div>
                  <div className="h-px bg-[#F0EFEB]" />
                  <div className="grid grid-cols-3 gap-5">
                    <div>
                      <CategoryLabel ko="임상 Clinical" en="Clinical" isEn={isEn} />
                      {isEn ? (
                        <BulletList items={[
                          <><span style={{ color: '#B53A3A', fontWeight: 600 }}>Associate Professor, Cardiovascular Center, SNUBH</span></>,
                          'Former Director of Clinical Research, Mediplex Sejong Hospital Cardiology',
                          'B.S. & M.S., Medicine, Chung-Ang University School of Medicine',
                        ]} />
                      ) : (
                        <BulletList items={[
                          <><span style={{ color: '#B53A3A', fontWeight: 600 }}>(현) 분당서울대병원 심장혈관센터 순환기내과 부교수</span></>,
                          '前 메디플렉스 세종병원 심장내과 임상연구실장',
                          '중앙대학교 의과대학 의학 학사·석사',
                        ]} />
                      )}
                    </div>
                    <div>
                      <CategoryLabel ko="연구 Research" en="Research" isEn={isEn} />
                      {isEn ? (
                        <BulletList items={[
                          'AI-based ECG Analysis & ML Cardiovascular Outcome Prediction',
                          <><span style={{ color: '#B53A3A', fontWeight: 600 }}>JAMA Network</span> & other SCI journal publications</>,
                          <><span style={{ color: '#B53A3A', fontWeight: 600 }}>2025 Korea Healthcare Forum</span> — Invited Speaker</>,
                        ]} />
                      ) : (
                        <BulletList items={[
                          'AI 기반 심전도(ECG) 분석 및 머신러닝 심혈관 예후 예측',
                          <><span style={{ color: '#B53A3A', fontWeight: 600 }}>JAMA Network 계열</span> 등 SCI 국제학술지 다수 게재</>,
                          <><span style={{ color: '#B53A3A', fontWeight: 600 }}>2025 대한민국 헬스케어 포럼</span> 초청 연자</>,
                        ]} />
                      )}
                    </div>
                    <div>
                      <CategoryLabel ko="AI · 교육" en="AI · Education" isEn={isEn} />
                      {isEn ? (
                        <BulletList items={[
                          <>&quot;Medical Research with ChatGPT, Taught by a Doctor&quot; — <span style={{ color: '#B53A3A', fontWeight: 600 }}>₩100M Revenue in 50 Days</span></>,
                          '&quot;Medical Research with Gemini, Taught by a Doctor&quot; — Lead Instructor',
                        ]} />
                      ) : (
                        <BulletList items={[
                          <>패스트캠퍼스 &apos;의사에게 배우는 ChatGPT 의학연구&apos; — <span style={{ color: '#B53A3A', fontWeight: 600 }}>출시 50일 매출 1억 돌파</span></>,
                          '패스트캠퍼스 &apos;Gemini 의학연구 방법&apos; 대표 강사',
                        ]} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════
              Card 3: 양민석 교수 (Coming Soon)
          ══════════════════════════════════════════════ */}
          <div className="relative rounded-2xl overflow-hidden">
            {/* 비공개 커버 */}
            <div
              className="absolute inset-0 z-10 rounded-2xl flex flex-col items-center justify-center gap-3 pointer-events-none"
              style={{ background: 'rgba(251,250,247,0.82)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', border: '1px solid rgba(14,110,110,0.10)' }}
            >
              <span className="w-9 h-9 flex items-center justify-center rounded-full" style={{ background: 'rgba(14,110,110,0.08)' }}>
                <i className="ri-lock-line text-[#0E6E6E] text-lg" />
              </span>
              <p className="text-[13px] font-semibold text-[#0E6E6E] tracking-wide">Coming Soon</p>
              <p className="text-[11px] text-viore-muted">{isEn ? 'Profile coming soon' : '곧 공개될 예정입니다'}</p>
            </div>
            <div
              className="rounded-2xl bg-white border border-[#E5E5EA] overflow-hidden"
              style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
            >
              {/* Mobile slider (blurred) */}
              <MobileCardSlider
                profilePanel={
                  <div className="flex flex-col items-center gap-4 p-6">
                    <div className="rounded-xl overflow-hidden" style={{ width: '160px', height: '160px', border: '1px solid rgba(14,110,110,0.12)' }}>
                      <img src="https://storage.readdy-site.link/project_files/f0121b54-b4dd-49ef-9b9a-70a9b6263ce6/e3add32e-5193-454f-8011-69b25fc4eb9e_8b34fbc441e849d8bfde41956baeff3a.jpg?v=fe6ace577eb64329ba23741ee68b1e8b" alt="Min-Suk Yang, M.D., Ph.D." className="w-full h-full object-cover object-top" />
                    </div>
                    <div className="w-full max-w-[200px] flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(14,110,110,0.12)' }}>
                      <img src="https://www.brmh.org/images_brmh_new/common/logo01.png" alt="Boramae Medical Center" className="h-8 w-auto object-contain" />
                      <p className="text-[10px] text-viore-muted text-center">SMG-SNU Boramae Medical Center</p>
                    </div>
                    <div className="text-center">
                      <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: '#B53A3A' }}>Medical Advisor</span>
                      <h3 className="mt-1 font-bold text-viore-text text-[1.35rem] leading-tight" style={{ letterSpacing: '-0.02em' }}>
                        {isEn ? 'Min-Suk Yang' : '양민석'}{' '}<span className="font-semibold text-[0.75em] text-[#6E6E73]">M.D., Ph.D.</span>
                      </h3>
                      <p className="mt-1 text-[12px] text-[#3C3C3E] leading-snug">
                        {isEn ? 'Associate Professor, Boramae Medical Center' : '보라매병원 알레르기내과 부교수'}
                      </p>
                    </div>
                  </div>
                }
                detailPanel={
                  <div className="p-6 flex flex-col gap-4">
                    <div>
                      <CategoryLabel ko="임상 Clinical" en="Clinical" isEn={isEn} />
                      {isEn ? (
                        <BulletList items={[
                          <><span style={{ color: '#B53A3A', fontWeight: 600 }}>Associate Professor, Allergy & Immunology, Boramae</span></>,
                          'Former Clinical Instructor, Allergy, SNUH',
                        ]} />
                      ) : (
                        <BulletList items={[
                          <><span style={{ color: '#B53A3A', fontWeight: 600 }}>(현) 보라매병원 알레르기내과 부교수</span></>,
                          '前 서울대학교병원 알레르기내과 임상강사',
                        ]} />
                      )}
                    </div>
                    <div>
                      <CategoryLabel ko="가이드라인 Guidelines" en="Guidelines" isEn={isEn} />
                      {isEn ? (
                        <BulletList items={[
                          <>&ldquo;Asthma & Allergic Diseases&rdquo; 3rd Ed. — <span style={{ color: '#B53A3A', fontWeight: 600 }}>Editorial Board Member</span></>,
                          'Co-author, Korean Asthma Practice Guidelines',
                        ]} />
                      ) : (
                        <BulletList items={[
                          <>『천식과 알레르기질환』 <span style={{ color: '#B53A3A', fontWeight: 600 }}>제3판 편찬위원</span> (2023)</>,
                          '한국천식진료지침 공저',
                        ]} />
                      )}
                    </div>
                  </div>
                }
              />
              {/* Desktop */}
              <div className="hidden lg:flex flex-row">
                <div className="flex-shrink-0 flex flex-col items-center justify-start gap-4 p-10 w-[280px] border-r border-[#F0EFEB]">
                  <div className="w-full rounded-xl overflow-hidden" style={{ aspectRatio: '1 / 1', maxWidth: '200px', border: '1px solid rgba(14,110,110,0.12)' }}>
                    <img src="https://storage.readdy-site.link/project_files/f0121b54-b4dd-49ef-9b9a-70a9b6263ce6/e3add32e-5193-454f-8011-69b25fc4eb9e_8b34fbc441e849d8bfde41956baeff3a.jpg?v=fe6ace577eb64329ba23741ee68b1e8b" alt="Min-Suk Yang, M.D., Ph.D." className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="w-full max-w-[220px] flex flex-col items-center gap-2 px-4 py-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(14,110,110,0.12)' }}>
                    <img src="https://www.brmh.org/images_brmh_new/common/logo01.png" alt="SMG-SNU Boramae Medical Center" className="w-full h-auto object-contain" style={{ maxHeight: '44px' }} />
                    <p className="text-[10px] text-viore-muted text-center leading-snug">SMG-SNU Boramae<br />Medical Center</p>
                  </div>
                </div>
                <div className="flex-1 pt-10 pr-10 pl-0 pb-6 flex flex-col gap-4">
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.22em]" style={{ color: '#B53A3A', fontFamily: "'Inter', sans-serif" }}>Medical Advisor</span>
                  <div className="flex flex-wrap gap-2 -mt-2">
                    {(isEn
                      ? ['Associate Professor, Boramae', 'Allergist & Immunologist', 'QI Committee Professor', 'Clinical Guideline Co-author']
                      : ['보라매병원 부교수', '알레르기내과 전문의', '의료질향상담당 교수', '진료지침 공저자']
                    ).map((badge) => (
                      <span key={badge} className="text-[11px] px-2.5 py-1 rounded-full whitespace-nowrap" style={{ background: '#F5F4F0', color: '#3C3C3E', border: '1px solid #E5E5EA', fontFamily: "'Inter', sans-serif" }}>{badge}</span>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-bold text-viore-text leading-tight" style={{ fontSize: 'clamp(1.4rem, 2vw, 1.8rem)', letterSpacing: '-0.02em' }}>
                      {isEn ? <>Min-Suk Yang{' '}<span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.75em', color: '#6E6E73' }}>M.D., Ph.D.</span></> : <>양민석{' '}<span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.75em', color: '#6E6E73' }}>Min-Suk Yang, M.D., Ph.D.</span></>}
                    </h3>
                    <p className="mt-1 text-[14px] font-medium text-[#3C3C3E] leading-snug">
                      {isEn ? 'Associate Professor, Allergy & Clinical Immunology, SMG-SNU Boramae Medical Center' : '서울대학교병원운영 서울특별시보라매병원 알레르기내과 부교수'}
                    </p>
                    <p className="mt-1 text-[13px] text-viore-muted leading-snug">
                      {isEn ? 'Allergist-Immunologist · Drug Adverse Reaction Expert · National Guideline Co-author' : '알레르기·천식 임상의 · 약물부작용 전문가 · 국가 진료지침 공저자'}
                    </p>
                  </div>
                  <div className="h-px bg-[#F0EFEB]" />
                  <div className="grid grid-cols-3 gap-5">
                    <div>
                      <CategoryLabel ko="임상 Clinical" en="Clinical" isEn={isEn} />
                      {isEn ? (
                        <BulletList items={[
                          <><span style={{ color: '#B53A3A', fontWeight: 600 }}>Associate Professor, Allergy & Immunology, Boramae Medical Center</span></>,
                          'Former Clinical Instructor, Allergy, Seoul National University Hospital',
                          'B.S., M.S., Ph.D., Seoul National University College of Medicine',
                          'Asthma, Anaphylaxis, Drug & Food Allergy, Chronic Cough',
                        ]} />
                      ) : (
                        <BulletList items={[
                          <><span style={{ color: '#B53A3A', fontWeight: 600 }}>(현) 보라매병원 알레르기내과 부교수</span></>,
                          '前 서울대학교병원 알레르기내과 임상강사',
                          '서울대학교 의과대학 의학 학사·석사·박사',
                          '천식, 아나필락시스, 약물·음식물 알레르기, 만성기침 진료',
                        ]} />
                      )}
                    </div>
                    <div>
                      <CategoryLabel ko="연구 Research" en="Research" isEn={isEn} />
                      {isEn ? (
                        <BulletList items={[
                          'Extensive research on drug adverse reactions & anaphylaxis',
                          'Multiple SCI international journal publications',
                          <><span style={{ color: '#B53A3A', fontWeight: 600 }}>World Allergy Organization Junior Abstract Award</span> (2011)</>,
                          <><span style={{ color: '#B53A3A', fontWeight: 600 }}>Commendation from Minister of Health &amp; Welfare</span> (2010)</>,
                        ]} />
                      ) : (
                        <BulletList items={[
                          '약물 유해반응·아나필락시스 임상연구 다수',
                          'SCI 국제학술지 논문 다수 게재',
                          <><span style={{ color: '#B53A3A', fontWeight: 600 }}>World Allergy Organization Junior Abstract Award</span> (2011)</>,
                          <><span style={{ color: '#B53A3A', fontWeight: 600 }}>보건복지부장관 표창</span> (2010)</>,
                        ]} />
                      )}
                    </div>
                    <div>
                      <CategoryLabel ko="가이드라인 Guidelines" en="Guidelines" isEn={isEn} />
                      {isEn ? (
                        <BulletList items={[
                          <>&ldquo;Asthma & Allergic Diseases&rdquo; 3rd Ed. — <span style={{ color: '#B53A3A', fontWeight: 600 }}>Editorial Board Member</span> (2023)</>,
                          'Co-author, Korean Asthma Practice Guidelines',
                          'Co-author, Clinical Practice Guidelines for Allergic Rhinitis',
                          'Co-author, Korean Guidelines on Contrast Media Adverse Reactions',
                        ]} />
                      ) : (
                        <BulletList items={[
                          <>『천식과 알레르기질환』 <span style={{ color: '#B53A3A', fontWeight: 600 }}>제3판 편찬위원</span> (2023)</>,
                          '한국천식진료지침 공저',
                          '임상의를 위한 알레르기비염 진료가이드라인 공저',
                          '조영제 유해반응 한국 임상진료지침 공저',
                        ]} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

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