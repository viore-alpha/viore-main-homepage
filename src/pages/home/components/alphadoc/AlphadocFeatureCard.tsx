import type { AlphadocWorkflow } from './alphadocContent';

type AlphadocFeatureCardProps = {
  readonly workflow: AlphadocWorkflow;
};

export const AlphadocFeatureCard = ({ workflow }: AlphadocFeatureCardProps) => (
  <div className="relative flex min-w-0 flex-col justify-center py-0 lg:max-w-[540px] lg:py-2">
    <div className="min-w-0">
      <h3 className="text-[28px] font-bold leading-[1.08] text-[#19191B] md:text-[38px]">{workflow.title}</h3>
      <p className="mt-3 text-[14px] font-semibold leading-5 text-[#4C4C50] md:mt-5 md:text-[15px] md:leading-6">{workflow.subtitle}</p>
      {workflow.description ? <p className="mt-6 text-[20px] leading-[1.75] text-[#262628] md:text-[22px]">{workflow.description}</p> : null}
    </div>
    <div className="mt-6 grid gap-3 md:mt-8 md:gap-4">
      {workflow.bullets.map((bullet) => (
        <div key={bullet.text} className="flex min-w-0 items-start gap-3 text-[13px] font-semibold leading-[1.65] text-[#5E5E63] md:text-[14px] md:leading-6">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B42335] md:mt-2.5" aria-hidden />
          <span>{bullet.text}</span>
        </div>
      ))}
    </div>
  </div>
);
