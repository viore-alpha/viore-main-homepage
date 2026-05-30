import { useTranslation } from 'react-i18next';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { highlightViore } from '@/utils/highlightViore';

const OurAnswerSection = () => {
  const { t } = useTranslation();
  const { ref, visible } = useSectionReveal(0.1);

  const bodyLines = [
    t('ouranswer_body_1'),
    t('ouranswer_body_2'),
    t('ouranswer_body_3'),
  ];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="border-b border-viore-border"
      style={{ backgroundColor: 'rgba(245,244,240,0.80)', padding: 'clamp(56px, 8vw, 120px) 0' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
          {/* Left */}
          <div className={`${visible ? 'reveal-visible' : 'reveal-hidden'}`}>
            <h2
              className="font-bold text-viore-text leading-[1.22]"
              style={{ fontSize: 'clamp(1.7rem, 3vw, 2.5rem)', letterSpacing: '-0.025em' }}
            >
              {highlightViore(t('ouranswer_headline'))}
            </h2>

            <div className="mt-10 flex flex-col gap-4">
              {bodyLines.map((line, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className="mt-1 w-1.5 h-1.5 rounded-full bg-viore-teal flex-shrink-0"
                    style={{ marginTop: '9px' }}
                  />
                  <p
                    className="text-viore-text leading-relaxed"
                    style={{ fontSize: 'clamp(1rem, 1.4vw, 1.1rem)' }}
                  >
                    {line}
                  </p>
                </div>
              ))}
            </div>

            <p
              className="mt-6 text-viore-muted leading-[1.9]"
              style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)' }}
            >
              {t('ouranswer_body_4').split('\n').map((l, i) => (
                <span key={i} className="block">{highlightViore(l)}</span>
              ))}
            </p>
          </div>

          {/* Right — key message box */}
          <div className={`${visible ? 'reveal-visible' : 'reveal-hidden'}`}>
            <div
              className="p-6 md:p-10 rounded-[20px] border border-viore-teal/25 bg-white relative overflow-hidden"
            >
              {/* Decorative teal corner */}
              <div
                className="absolute top-0 right-0 w-32 h-32 opacity-[0.035]"
                style={{
                  background: 'radial-gradient(circle, #0E6E6E 0%, transparent 70%)',
                }}
              />
              <div className="relative z-10">
                <div className="w-8 h-8 flex items-center justify-center rounded-[10px] bg-viore-teal-light mb-6">
                  <i className="ri-double-quotes-l text-viore-teal text-sm" />
                </div>
                <p
                  className="text-viore-text font-medium leading-[1.7]"
                  style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)', letterSpacing: '-0.015em' }}
                >
                  {t('ouranswer_box_1')}
                </p>
                <p
                  className="mt-2 text-viore-teal font-semibold leading-[1.7]"
                  style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)', letterSpacing: '-0.015em' }}
                >
                  {t('ouranswer_box_2')}
                </p>
              </div>
            </div>

            {/* Small decorative stat */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { icon: 'ri-time-line', label: t('ouranswer_icon_1') },
                { icon: 'ri-file-list-3-line', label: t('ouranswer_icon_2') },
                { icon: 'ri-book-open-line', label: t('ouranswer_icon_3') },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-[16px] bg-viore-surface-2 border border-viore-border"
                >
                  <i className={`${item.icon} text-viore-teal text-lg`} />
                  <span className="text-[12px] text-viore-muted">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurAnswerSection;