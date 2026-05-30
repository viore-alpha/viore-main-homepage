import { useTranslation } from 'react-i18next';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { useCountUp } from '@/hooks/useCountUp';

const timelineData = [
  { tkKey: 'accel_t1', vkKey: 'accel_v1', dkKey: 'accel_t1_desc', pct: 44 },
  { tkKey: 'accel_t2', vkKey: 'accel_v2', dkKey: 'accel_t2_desc', pct: 63 },
  { tkKey: 'accel_t3', vkKey: 'accel_v3', dkKey: 'accel_t3_desc', pct: 57 },
  { tkKey: 'accel_t4', vkKey: 'accel_v4', dkKey: 'accel_t4_desc', pct: 70 },
];

const AccelerationSection = () => {
  const { t } = useTranslation();
  const { ref, visible } = useSectionReveal(0.1);

  // Big stat: 0 → 70 with easeOutExpo, fires once visible
  const countedNum = useCountUp(70, 900, visible);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="border-b border-viore-border"
      style={{ backgroundColor: 'rgba(251,250,247,0.80)', padding: 'clamp(56px, 8vw, 120px) 0' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-start">

          {/* Left */}
          <div className={`${visible ? 'reveal-visible' : 'reveal-hidden'}`}>
            {/* Animated big number */}
            <div
              className="relative inline-block"
              style={{
                transform: visible ? 'scale(1)' : 'scale(0.92)',
                transition: 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <p
                className="stat-num font-bold text-viore-teal leading-none"
                style={{ fontSize: 'clamp(5rem, 12vw, 9rem)', letterSpacing: '-0.04em' }}
              >
                {countedNum}%
              </p>

            </div>

            <p className="mt-4 text-[15px] text-viore-text font-medium">{t('accel_caption')}</p>
            <p className="mt-1 text-[12px] text-viore-faint">{t('accel_source')}</p>

            <div className="mt-10 flex flex-col gap-4">
              {t('accel_body')
                .split('\n')
                .map((line, i) => (
                  <p
                    key={i}
                    className="text-viore-text leading-[1.9]"
                    style={{ fontSize: 'clamp(1rem, 1.4vw, 1.15rem)' }}
                  >
                    {line}
                  </p>
                ))}
            </div>
          </div>

          {/* Right — stats */}
          <div className={`${visible ? 'reveal-visible' : 'reveal-hidden'}`}>
            <div className="space-y-6">
              {timelineData.map(({ tkKey, vkKey, dkKey, pct }, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className="text-[13px] font-semibold text-viore-muted tracking-wide uppercase"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {t(tkKey)}
                    </span>
                    <span
                      className="stat-num text-[15px] font-bold text-viore-text"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {t(vkKey)}
                    </span>
                  </div>

                  {/* Bar track */}
                  <div className="h-1.5 bg-viore-surface-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: visible ? `${pct}%` : '0%',
                        /* easeOutExpo matches the count-up feel */
                        transition: `width 850ms cubic-bezier(0.16, 1, 0.3, 1)`,
                        transitionDelay: `${i * 90}ms`,
                        background:
                          i === 3
                            ? '#0E6E6E'
                            : `rgba(14, 110, 110, ${0.25 + i * 0.18})`,
                      }}
                    />
                  </div>

                  <p className="mt-1.5 text-[12px] text-viore-faint leading-relaxed">
                    {t(dkKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AccelerationSection;