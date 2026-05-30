import { useTranslation } from 'react-i18next';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { highlightViore } from '@/utils/highlightViore';

const ClosingSection = () => {
  const { t } = useTranslation();
  const { ref, visible } = useSectionReveal(0.1);

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ backgroundColor: 'rgba(245,244,240,0.80)', padding: 'clamp(64px, 10vw, 140px) 0' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className={`${visible ? 'reveal-visible' : 'reveal-hidden'} grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center`}>

          {/* Left — big number */}
          <div>
            <p
              className="stat-num font-bold text-viore-teal"
              style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', letterSpacing: '-0.04em' }}
            >
              {t('closing_num')}
            </p>
            <p
              className="mt-4 text-viore-text font-medium"
              style={{ fontSize: 'clamp(1rem, 1.6vw, 1.2rem)' }}
            >
              {t('closing_sub_1')}
            </p>

            <div className="mt-3">
              {t('closing_sub_2')
                .split('\n')
                .map((line, i) => (
                  <p
                    key={i}
                    className="text-viore-muted"
                    style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)', lineHeight: 1.8 }}
                  >
                    {highlightViore(line)}
                  </p>
                ))}
            </div>
          </div>

          {/* Right — contact */}
          <div className="flex flex-col gap-6">
            <div>
              <h2
                className="font-bold text-viore-text leading-[1.22]"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', letterSpacing: '-0.025em' }}
              >
                {highlightViore(t('contact_headline'))}
              </h2>
              <p className="mt-3 text-[15px] text-viore-muted">{t('contact_sub')}</p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center gap-3 px-5 py-3.5 rounded-[14px] bg-white border border-viore-border">
                <div
                  className="w-7 h-7 flex items-center justify-center rounded-[9px] flex-shrink-0"
                  style={{ background: 'rgba(14,110,110,0.08)' }}
                >
                  <i className="ri-mail-line text-viore-teal text-[14px]" />
                </div>
                <span className="text-[14px] font-medium text-viore-text" style={{ fontFamily: "'Inter', sans-serif" }}>
                  sj@vioreai.com
                </span>
              </div>
              <a
                href="mailto:sj@vioreai.com"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[14px] text-[14px] font-semibold text-white bg-viore-teal hover:bg-viore-teal-mid transition-all duration-300 hover:translate-y-[-2px] whitespace-nowrap cursor-pointer"
              >
                <i className="ri-send-plane-line" />
                {t('contact_cta')}
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ClosingSection;