import { useTranslation } from 'react-i18next';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { AlphadocDemoFrame } from './alphadoc/AlphadocDemoFrame';
import { AlphadocFeatureCard } from './alphadoc/AlphadocFeatureCard';
import { ALPHADOC_CONTENT } from './alphadoc/alphadocContent';

const AlphadocSection = () => {
  const { i18n } = useTranslation();
  const { ref, visible } = useSectionReveal(0.08);
  const language = i18n.language === 'en' ? 'en' : 'ko';
  const content = ALPHADOC_CONTENT[language];
  const revealClassName = visible ? 'reveal-visible' : 'reveal-hidden';

  return (
    <section
      ref={ref}
      aria-labelledby="alphadoc-heading"
      className="relative overflow-hidden border-b border-viore-border bg-[linear-gradient(180deg,#FAFAF9_0%,#FFFFFF_52%,#F7F7F6_100%)]"
      style={{ padding: '112px 0 120px' }}
    >
      <span id="alphadoc" className="absolute -top-24 block h-px w-px" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-6 md:px-10 lg:px-16">
        <div className={`${revealClassName} grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.58fr)] lg:items-end lg:gap-12`}>
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <img src={content.assets.symbol} alt="" className="h-8 w-8 object-contain" loading="lazy" decoding="async" />
              <img
                src={content.assets.logotypeKo}
                alt="알파닥"
                className="h-7 w-auto object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
            <h2
              id="alphadoc-heading"
              className="mt-8 max-w-[720px] text-[42px] font-bold leading-[1.12] text-[#111113] md:text-[56px]"
            >
              {content.headline}
            </h2>
          </div>
          <div className="min-w-0 lg:pb-1">
            <p className="max-w-[520px] text-[16px] leading-8 text-[#5F5F63]">{content.body}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col 2xl:flex-row">
              <a
                href="https://alphadoc.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-[#111113] px-5 text-[14px] font-bold text-white transition-[background-color,transform] duration-180 hover:bg-[#2C2C2C] active:scale-[0.98]"
              >
                {content.ctaLabel}
                <i className="ri-arrow-right-line text-[15px]" aria-hidden />
              </a>
              <span className="inline-flex min-h-12 max-w-[420px] items-center rounded-md border border-black/[0.08] bg-white/68 px-4 text-[12px] font-semibold leading-5 text-[#8A8A8E]">
                {content.note}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col border-y border-black/[0.06] lg:mt-20">
          {content.workflows.map((workflow, index) => (
            <article
              key={workflow.id}
              data-testid={`alphadoc-feature-${workflow.id}`}
              className={`${revealClassName} grid grid-cols-1 items-stretch gap-6 py-10 lg:grid-cols-[minmax(300px,0.78fr)_minmax(0,1.22fr)] lg:gap-10 lg:py-12 xl:gap-12 ${
                index > 0 ? 'border-t border-black/[0.06]' : ''
              }`}
            >
              <AlphadocFeatureCard workflow={workflow} index={index} />
              <div className="min-w-0 lg:h-full">
                <AlphadocDemoFrame content={content} workflow={workflow} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AlphadocSection;
