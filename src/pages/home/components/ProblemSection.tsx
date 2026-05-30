import { useTranslation } from 'react-i18next';
import { useSectionReveal } from '@/hooks/useSectionReveal';

const ProblemSection = () => {
  const { t } = useTranslation();
  const { ref, visible } = useSectionReveal(0.1);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="border-b border-viore-border"
      style={{ backgroundColor: 'rgba(245,244,240,0.80)', padding: 'clamp(56px, 8vw, 120px) 0' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
          {/* Left body */}
          <div className={`${visible ? 'reveal-visible' : 'reveal-hidden'} flex flex-col gap-5`}>
            {t('problem_body')
              .split('\n')
              .map((line, i) => (
                <p
                  key={i}
                  className="text-viore-text leading-[1.9]"
                  style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)' }}
                >
                  {line}
                </p>
              ))}

            {/* Sub stat */}
            <div className="mt-6 p-6 rounded-[20px] bg-white border border-viore-border card-hover">
              <p
                className="stat-num font-bold text-viore-crimson"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}
              >
                {t('problem_sub_num')}
              </p>
              <p className="mt-2 text-[14px] text-viore-muted leading-relaxed">{t('problem_sub_label')}</p>
              <p className="mt-2 text-[11px] text-viore-faint">{t('problem_sub_source')}</p>
            </div>
          </div>

          {/* Right — big stat */}
          <div className={`${visible ? 'reveal-visible' : 'reveal-hidden'}`}>
            <p
              className="font-bold text-viore-text leading-none"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5.2rem)', letterSpacing: '-0.03em', lineHeight: 1.05, whiteSpace: 'pre-line' }}
            >
              {t('problem_num')}
            </p>
            <p className="mt-4 text-[15px] text-viore-text font-medium">{t('problem_caption')}</p>

            {/* Visual half-bar */}
            <div className="mt-8">
              <div className="flex gap-1 h-14">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-sm transition-all duration-700 ${
                      i < 10 ? 'bg-viore-text/15' : 'bg-viore-surface-2'
                    }`}
                    style={{
                      transitionDelay: visible ? `${i * 40}ms` : '0ms',
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'scaleY(1)' : 'scaleY(0)',
                      transformOrigin: 'bottom',
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[12px] text-viore-muted">{t('problem_bar_admin')}</span>
                <span className="text-[12px] text-viore-muted">{t('problem_bar_patient')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;