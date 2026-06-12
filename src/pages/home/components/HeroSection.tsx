import { useTranslation } from 'react-i18next';
import { highlightViore } from '@/utils/highlightViore';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Subtle warm light bloom */}
      <div
        className="hero-bloom absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 48% 38%, rgba(14,110,110,0.055) 0%, transparent 68%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 80% 60%, rgba(251,250,247,0) 0%, rgba(245,244,240,0.5) 100%)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 pt-24 md:pt-32 lg:pt-36 pb-14 md:pb-20 lg:pb-24">
        {/* Main headline */}
        <h1
          className="hero-fade-up hero-fade-up-1 font-bold text-viore-text leading-[1.13] max-w-2xl"
          style={{
            fontSize: 'clamp(2.6rem, 6vw, 4.8rem)',
            letterSpacing: '-0.03em',
          }}
        >
          {t('hero_title')}
          <span className="sr-only">
            {' '}주식회사 바이오레 Viore, 알파닥 Alphadoc 공식 운영사
          </span>
        </h1>

        {/* Sub copy */}
        <div className="hero-fade-up hero-fade-up-3 mt-7 max-w-lg">
          {t('hero_sub')
            .split('\n')
            .map((line, i) => (
              <p
                key={i}
                className="text-viore-muted leading-relaxed"
                style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)', lineHeight: 1.85 }}
              >
                {highlightViore(line)}
              </p>
            ))}
        </div>

        {/* CTA Buttons */}
        <div className="hero-fade-up hero-fade-up-4 flex flex-col sm:flex-row gap-3 mt-9">
          <a
            href="#alphadoc"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[14px] text-[14px] font-semibold text-white whitespace-nowrap cursor-pointer transition-all duration-300 hover:translate-y-[-2px] hover:opacity-90"
            style={{ background: '#B53A3A' }}
          >
            {t('hero_cta_primary')}
            <i className="ri-arrow-right-line" />
          </a>
          <a
            href="#about"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[14px] text-[14px] font-medium text-viore-muted border border-viore-border-strong hover:text-viore-text whitespace-nowrap cursor-pointer transition-all duration-300 hover:translate-y-[-2px] bg-white/60"
          >
            {t('hero_cta_secondary')}
          </a>
        </div>

        {/* Data badges */}
        <div className="hero-fade-up hero-fade-up-5 flex flex-col sm:flex-row flex-wrap gap-3 mt-10">
          {[
            { num: t('hero_badge_1_num'), label: t('hero_badge_1_label') },
            { num: t('hero_badge_2_num'), label: t('hero_badge_2_label') },
            { num: t('hero_badge_3_num'), label: t('hero_badge_3_label') },
          ].map((badge, i) => (
            <div
              key={i}
              className="flex sm:inline-flex items-center gap-3 px-5 py-3 rounded-[14px] bg-viore-surface border border-viore-border"
            >
              <span
                className="stat-num font-bold text-viore-teal whitespace-nowrap"
                style={{ fontSize: '1.25rem', letterSpacing: '-0.025em' }}
              >
                {badge.num}
              </span>
              <span className="text-[12px] text-viore-muted leading-snug max-w-[160px]">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-viore-border" />
    </section>
  );
};

export default HeroSection;
