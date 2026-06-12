import { useTranslation } from 'react-i18next';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { AlphadocDemoFrame } from './alphadoc/AlphadocDemoFrame';
import { AlphadocFeatureCard } from './alphadoc/AlphadocFeatureCard';
import { ALPHADOC_CONTENT } from './alphadoc/alphadocContent';
import type { AlphadocContent } from './alphadoc/alphadocContent';

type AlphadocCtaProps = {
  readonly content: AlphadocContent;
  readonly className?: string;
};

const AlphadocCta = ({ content, className = '' }: AlphadocCtaProps) => (
  <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
    <a
      href="https://alphadoc.ai"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#111113] px-4 text-[13px] font-bold text-white shadow-[0_12px_24px_rgba(17,17,19,0.12)] transition-[background-color,transform] duration-180 hover:bg-[#2C2C2C] active:scale-[0.98]"
    >
      {content.ctaLabel}
      <span className="text-[14px] leading-none" aria-hidden>
        →
      </span>
    </a>
    <span className="inline-flex h-10 items-center rounded-full border border-black/[0.08] bg-white/72 px-4 text-[12px] font-semibold text-[#8A8A8E]">
      {content.note}
    </span>
  </div>
);

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
      className="relative overflow-hidden bg-[linear-gradient(180deg,#F7F8F2_0%,#FFFFFF_42%,#F7F6F2_100%)]"
      style={{ padding: 'clamp(78px,7vw,104px) 0 clamp(88px,8vw,118px)' }}
    >
      <span id="alphadoc" className="absolute -top-24 block h-px w-px" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(255,255,255,0))]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-6 md:px-10 lg:px-16">
        <div className={`${revealClassName} max-w-[780px]`}>
          <div className="flex items-center gap-3">
            <img src={content.assets.symbol} alt="" className="h-9 w-9 object-contain" loading="lazy" decoding="async" />
            <img
              src={content.assets.logotypeKo}
              alt="알파닥"
              className="h-7 w-auto object-contain md:h-8"
              loading="lazy"
              decoding="async"
            />
          </div>
          <h2
            id="alphadoc-heading"
            className="mt-8 max-w-[740px] text-[42px] font-bold leading-[1.1] text-[#111113] md:text-[58px]"
          >
            {content.headline}
          </h2>
          <p className="mt-6 max-w-[620px] text-[16px] leading-8 text-[#5F5F63]">{content.body}</p>
        </div>

        <div className="mt-14 flex flex-col gap-14 lg:mt-20 lg:gap-16 xl:gap-20">
          {content.workflows.map((workflow, index) => (
            <article
              key={workflow.id}
              data-testid={`alphadoc-feature-${workflow.id}`}
              className={`${revealClassName} grid grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(360px,0.72fr)_minmax(0,1fr)] lg:items-center lg:gap-14 xl:gap-20`}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="order-2 lg:order-1">
                <AlphadocFeatureCard workflow={workflow} />
              </div>
              <div className="order-1 min-w-0 lg:order-2">
                <AlphadocDemoFrame content={content} workflow={workflow} />
              </div>
            </article>
          ))}
        </div>

        <AlphadocCta
          content={content}
          className={`${revealClassName} mt-10 justify-start sm:justify-center lg:mt-12`}
        />
      </div>
    </section>
  );
};

export default AlphadocSection;
