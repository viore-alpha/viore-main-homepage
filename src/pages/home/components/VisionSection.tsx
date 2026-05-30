import { useTranslation } from 'react-i18next';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { highlightViore } from '@/utils/highlightViore';

const stacks = [
  { icon: 'ri-cpu-line', key: 'vision_stack_1', num: '01' },
  { icon: 'ri-layout-3-line', key: 'vision_stack_2', num: '02' },
  { icon: 'ri-global-line', key: 'vision_stack_3', num: '03' },
];

const VisionSection = () => {
  const { t } = useTranslation();
  const { ref, visible } = useSectionReveal(0.08);

  return (
    <section
      id="vision"
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
              style={{ fontSize: 'clamp(1.7rem, 3vw, 2.6rem)', letterSpacing: '-0.025em' }}
            >
              {t('vision_headline')}
            </h2>
            <div className="mt-8 flex flex-col gap-4">
              {t('vision_body')
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

          {/* Right — stack */}
          <div className={`${visible ? 'reveal-visible' : 'reveal-hidden'} flex flex-col gap-4`}>
            {stacks.map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-5 p-6 rounded-[20px] bg-white border border-viore-border card-hover"
              >
                <span
                  className="text-[11px] font-bold text-viore-faint flex-shrink-0"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {s.num}
                </span>
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-[12px] flex-shrink-0"
                  style={{ background: 'rgba(14,110,110,0.08)' }}
                >
                  <i className={`${s.icon} text-viore-teal text-[16px]`} />
                </div>
                <p className="text-[14px] font-medium text-viore-text leading-snug">{t(s.key)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;