import { useTranslation } from 'react-i18next';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { highlightViore } from '@/utils/highlightViore';

const principles = [
  { icon: 'ri-article-line', titleKey: 'howwebuild_p1_title', descKey: 'howwebuild_p1_desc' },
  { icon: 'ri-stethoscope-line', titleKey: 'howwebuild_p2_title', descKey: 'howwebuild_p2_desc' },
  { icon: 'ri-hammer-line', titleKey: 'howwebuild_p3_title', descKey: 'howwebuild_p3_desc' },
];

const HowWeBuildSection = () => {
  const { t } = useTranslation();
  const { ref, visible } = useSectionReveal(0.1);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="border-b border-viore-border"
      style={{ backgroundColor: 'rgba(245,244,240,0.80)', padding: 'clamp(56px, 8vw, 120px) 0' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-start">
          {/* Left */}
          <div className={`${visible ? 'reveal-visible' : 'reveal-hidden'}`}>
            <h2
              className="font-bold text-viore-text leading-[1.22]"
              style={{ fontSize: 'clamp(1.7rem, 3vw, 2.5rem)', letterSpacing: '-0.025em' }}
            >
              {t('howwebuild_headline')}
            </h2>
            <div className="mt-7 flex flex-col gap-4">
              {t('howwebuild_body')
                .split('\n')
                .map((line, i) => (
                  <p
                    key={i}
                    className="text-viore-muted leading-[1.9]"
                    style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)' }}
                  >
                    {highlightViore(line)}
                  </p>
                ))}
            </div>
          </div>

          {/* Right — principle cards */}
          <div className={`${visible ? 'reveal-visible' : 'reveal-hidden'} flex flex-col gap-4`}>
            {principles.map((p, i) => (
              <div
                key={i}
                className="flex gap-5 p-6 rounded-[20px] bg-white border border-viore-border card-hover"
              >
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-[12px] flex-shrink-0"
                  style={{ background: 'rgba(14,110,110,0.08)' }}
                >
                  <i className={`${p.icon} text-viore-teal text-[16px]`} />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-viore-text mb-1">{t(p.titleKey)}</p>
                  <p className="text-[13px] text-viore-muted leading-relaxed">{t(p.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeBuildSection;