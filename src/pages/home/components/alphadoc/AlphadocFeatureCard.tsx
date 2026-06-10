import type { AlphadocWorkflow } from './alphadocContent';

type AlphadocFeatureCardProps = {
  readonly workflow: AlphadocWorkflow;
  readonly index: number;
};

export const AlphadocFeatureCard = ({ workflow, index }: AlphadocFeatureCardProps) => (
  <div
    className="relative flex h-full min-w-0 flex-col overflow-hidden rounded-lg border bg-white/78 px-5 py-5 shadow-[0_20px_54px_rgba(17,17,19,0.07),0_1px_0_rgba(255,255,255,0.86)_inset] md:px-6 md:py-6 lg:min-h-[520px]"
    style={{ borderColor: 'rgba(17,17,19,0.08)' }}
  >
    <span className="absolute bottom-6 left-0 top-6 w-[3px] rounded-r-full bg-[#B42335]" aria-hidden />
    <div className="flex min-w-0 items-start justify-between gap-4">
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border"
        style={{ background: 'rgba(180,35,53,0.075)', borderColor: 'rgba(180,35,53,0.14)' }}
      >
        <img src={workflow.icon} alt="" className="h-6 w-6 object-contain" loading="lazy" decoding="async" />
      </span>
      <span className="shrink-0 text-[11px] font-bold leading-4 text-[#B42335]">{String(index + 1).padStart(2, '0')}</span>
    </div>
    <div className="mt-6 min-w-0">
      <h3 className="text-[24px] font-bold leading-[1.2] text-[#111113] md:text-[28px]">{workflow.title}</h3>
      <p className="mt-2 text-[13px] font-semibold leading-5 text-[#6B6B6B]">{workflow.subtitle}</p>
      <p className="mt-5 text-[14px] leading-7 text-[#5F5F63]">{workflow.description}</p>
    </div>
    <div className="mt-7 grid gap-3 border-t border-black/[0.06] pt-5 lg:mt-auto">
      {workflow.bullets.map((bullet) => (
        <div key={bullet.text} className="flex min-w-0 items-start gap-3 text-[13px] font-semibold leading-5 text-[#3C3C3E]">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[rgba(17,17,19,0.05)] text-[#6B6B6B]">
            <i className={`${bullet.icon} text-[14px]`} aria-hidden />
          </span>
          <span className="pt-1">{bullet.text}</span>
        </div>
      ))}
    </div>
  </div>
);
