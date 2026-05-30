import { useTranslation } from 'react-i18next';
import { useSectionReveal } from '@/hooks/useSectionReveal';

const CareersSection = () => {
  const { t } = useTranslation();
  const { ref, visible } = useSectionReveal(0.1);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="border-b border-viore-border"
      style={{ backgroundColor: 'rgba(251,250,247,0.80)', padding: 'clamp(60px, 6vw, 96px) 0' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div
          className={`${visible ? 'reveal-visible' : 'reveal-hidden'} flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 p-8 md:p-10 rounded-[20px] bg-viore-surface border border-viore-border`}
        >
          <div className="flex-1">
            <h2
              className="font-bold text-viore-text leading-[1.22]"
              style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.8rem)', letterSpacing: '-0.02em' }}
            >
              {t('careers_headline')}
            </h2>
            <div className="mt-4 flex flex-col gap-2">
              {t('careers_body')
                .split('\n')
                .map((line, i) => (
                  <p key={i} className="text-[14px] text-viore-muted leading-relaxed">{line}</p>
                ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CareersSection;