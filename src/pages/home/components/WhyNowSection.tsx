import { useTranslation } from 'react-i18next';
import { useSectionReveal } from '@/hooks/useSectionReveal';

const WhyNowSection = () => {
  const { t } = useTranslation();
  const { ref, visible } = useSectionReveal(0.1);

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="border-b border-viore-border"
      style={{ backgroundColor: 'rgba(251,250,247,0.80)', padding: 'clamp(56px, 8vw, 120px) 0' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">

          {/* ── Left column ── */}
          <div className={`${visible ? 'reveal-visible' : 'reveal-hidden'} flex flex-col gap-0`}>

            {/* Hero number */}
            <p
              className="stat-num font-bold text-viore-teal leading-none"
              style={{ fontSize: 'clamp(5rem, 12vw, 9rem)', letterSpacing: '-0.04em' }}
            >
              {t('whynow_num')}
            </p>
            <p className="mt-4 text-[15px] text-viore-text font-medium">{t('whynow_caption')}</p>
            <p className="mt-1 text-[12px] text-viore-faint">{t('whynow_source')}</p>

            {/* Body text */}
            <div className="mt-8 flex flex-col gap-4">
              {t('whynow_body')
                .split('\n')
                .map((line, i) => (
                  <p
                    key={i}
                    className="text-viore-text leading-[1.9]"
                    style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.2rem)' }}
                  >
                    {line}
                  </p>
                ))}
            </div>

            {/* Comparison bars */}
            <div className="mt-10 space-y-5">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[12px] font-medium text-viore-muted">{t('whynow_bar_avg')}</span>
                  <span className="text-[12px] font-semibold text-viore-teal stat-num">{t('whynow_num')}</span>
                </div>
                <div className="h-2 bg-viore-surface-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-viore-teal rounded-full transition-all duration-1000"
                    style={{ width: visible ? '15%' : '0%' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[12px] font-medium text-viore-muted">{t('whynow_bar_search')}</span>
                  <span className="text-[12px] font-semibold text-viore-text stat-num">{t('whynow_compare_num')}</span>
                </div>
                <div className="h-2 bg-viore-surface-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-viore-text/30 rounded-full transition-all duration-1000 delay-200"
                    style={{ width: visible ? '100%' : '0%' }}
                  />
                </div>
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/32334400/"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="mt-1.5 block text-[11px] text-viore-faint underline-offset-2 hover:text-viore-muted transition-colors cursor-pointer"
                >
                  {t('whynow_bar_source_cite')}
                </a>
              </div>
            </div>
          </div>

          {/* ── Right column — supporting stats ── */}
          <div className={`${visible ? 'reveal-visible' : 'reveal-hidden'} flex flex-col gap-4`}>

            {/* Card 1 — 49% EHR time */}
            <div className="p-6 rounded-[20px] bg-viore-surface border border-viore-border card-hover">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p
                    className="stat-num font-bold text-viore-teal leading-none"
                    style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)', letterSpacing: '-0.04em' }}
                  >
                    {t('problem_num')}
                  </p>
                  <p className="mt-2 text-[13px] font-medium text-viore-text leading-snug">{t('problem_caption')}</p>
                </div>
                {/* Mini segment bar — 49% ≈ 5/10 lit */}
                <div className="flex gap-0.5 h-12 items-end shrink-0 mt-1">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 rounded-sm transition-all duration-500 ${
                        i < 5 ? 'bg-viore-teal/50' : 'bg-viore-surface-2'
                      }`}
                      style={{
                        height: visible ? '100%' : '15%',
                        transitionDelay: visible ? `${i * 50}ms` : '0ms',
                      }}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-4 text-[13px] text-viore-muted leading-relaxed">{t('problem_body_detail')}</p>
              <p className="mt-3 text-[11px] text-viore-faint">{t('problem_source')}</p>
            </div>

            {/* Card 2 — 46% patient clarity */}
            <div className="p-6 rounded-[20px] bg-viore-surface border border-viore-border card-hover">
              <p
                className="stat-num font-bold text-viore-text leading-none"
                style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)', letterSpacing: '-0.04em' }}
              >
                {t('problem_sub_num')}
              </p>
              <p className="mt-2 text-[13px] font-medium text-viore-text leading-snug">{t('problem_sub_label')}</p>
              <p className="mt-4 text-[13px] text-viore-muted leading-relaxed">{t('problem_sub_body')}</p>
              <p className="mt-3 text-[11px] text-viore-faint">{t('problem_sub_source')}</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyNowSection;