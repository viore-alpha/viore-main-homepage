import type { AlphadocContent, AlphadocWorkflow } from './alphadocContent';
import { AlphadocDemoMain } from './AlphadocDemoMain';

type AlphadocDemoFrameProps = {
  readonly content: AlphadocContent;
  readonly workflow: AlphadocWorkflow;
};

const demoProgressByWorkflow = {
  clinicalEngine: '86%',
  alphaWing: '72%',
  widgetBar: '64%',
} as const;

export const AlphadocDemoFrame = ({ content, workflow }: AlphadocDemoFrameProps) => {
  if (workflow.id === 'clinicalEngine') {
    return (
      <div className="relative h-full min-h-[500px] lg:min-h-[520px] xl:min-h-[540px]" aria-label={`${content.demoTitle} ${workflow.title}`}>
        <div
          className="absolute right-0 top-12 hidden h-[82%] w-[76%] rounded-lg border bg-white/32 2xl:block"
          style={{ borderColor: 'rgba(17,17,19,0.06)', transform: 'translateX(34px)' }}
          aria-hidden
        />
        <div
          className="absolute right-0 top-7 hidden h-[88%] w-[82%] rounded-lg border bg-white/48 2xl:block"
          style={{ borderColor: 'rgba(17,17,19,0.07)', transform: 'translateX(18px)' }}
          aria-hidden
        />
        <div
          data-demo-workflow={workflow.id}
          className="relative flex h-full min-h-[500px] overflow-hidden rounded-lg border bg-white shadow-[0_30px_86px_rgba(17,17,19,0.12),0_1px_0_rgba(255,255,255,0.9)_inset] lg:min-h-[520px] xl:min-h-[540px]"
          style={{ borderColor: 'rgba(17,17,19,0.08)' }}
        >
          <AlphadocDemoMain content={content} workflow={workflow} progressPercent={demoProgressByWorkflow[workflow.id]} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[500px] lg:min-h-[520px] xl:min-h-[540px]" aria-label={`${content.demoTitle} ${workflow.title}`}>
      <div
        className="absolute right-0 top-12 hidden h-[82%] w-[76%] rounded-lg border bg-white/32 2xl:block"
        style={{ borderColor: 'rgba(17,17,19,0.06)', transform: 'translateX(34px)' }}
        aria-hidden
      />
      <div
        className="absolute right-0 top-7 hidden h-[88%] w-[82%] rounded-lg border bg-white/48 2xl:block"
        style={{ borderColor: 'rgba(17,17,19,0.07)', transform: 'translateX(18px)' }}
        aria-hidden
      />
      <div
        data-demo-workflow={workflow.id}
        className="relative grid h-full min-h-[500px] overflow-hidden rounded-lg border bg-white/84 shadow-[0_30px_86px_rgba(17,17,19,0.12),0_1px_0_rgba(255,255,255,0.9)_inset] backdrop-blur-2xl lg:min-h-[520px] xl:min-h-[540px] 2xl:grid-cols-[minmax(0,1fr)_260px]"
        style={{ borderColor: 'rgba(17,17,19,0.08)' }}
      >
        <main className="relative flex min-w-0 flex-col bg-[rgba(248,248,250,0.72)]">
          <header className="flex h-14 shrink-0 items-center justify-between border-b border-black/[0.06] bg-white/70 px-4">
            <div className="min-w-0">
              <p className="truncate text-[13px] font-bold text-[#1D1D1F]">{workflow.responseTitle}</p>
              <p className="mt-0.5 text-[11px] font-semibold text-[#8A8A8E]">{content.demoSubtitle}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] font-bold text-[#6B6B6B] shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B42335] animate-pulse-dot" />
              {content.progressLabel}
            </span>
          </header>

          <AlphadocDemoMain content={content} workflow={workflow} progressPercent={demoProgressByWorkflow[workflow.id]} />

          <div className="border-t border-black/[0.06] bg-white/66 px-4 py-3">
            <div className="grid grid-cols-[36px_minmax(0,1fr)_36px] items-center gap-2">
              <button type="button" className="grid h-9 w-9 place-items-center rounded-full bg-[#F2F2F7] text-[#6B6B6B]" aria-label="첨부">
                <i className="ri-add-line text-[16px]" aria-hidden />
              </button>
              <div className="h-10 rounded-full border border-black/[0.08] bg-white px-4 text-[12px] font-medium leading-10 text-[#8A8A8E] shadow-[0_10px_24px_rgba(17,17,19,0.06)]">
                의료 질문을 입력하세요...
              </div>
              <button type="button" className="grid h-9 w-9 place-items-center rounded-full bg-[#1D1D1F] text-white" aria-label="전송">
                <i className="ri-arrow-up-line text-[15px]" aria-hidden />
              </button>
            </div>
          </div>
        </main>

        <aside className="hidden min-w-0 border-l border-black/[0.06] bg-white/62 p-4 2xl:flex 2xl:flex-col 2xl:gap-3">
          <PanelBlock title={content.sourceTitle} icon="ri-links-line" color="#B42335" items={workflow.sources} />
          {workflow.panels.map((panel) => (
            <PanelBlock key={panel.title} title={panel.title} icon={panel.icon} color="#5F5F63" items={panel.items} />
          ))}
        </aside>
      </div>
    </div>
  );
};

type PanelBlockProps = {
  readonly title: string;
  readonly icon: string;
  readonly color: string;
  readonly items: readonly string[];
};

const PanelBlock = ({ title, icon, color, items }: PanelBlockProps) => (
  <section className="rounded-md border border-black/[0.06] bg-white/72 p-3 shadow-[0_1px_0_rgba(255,255,255,0.82)_inset]">
    <div className="mb-2 flex items-center justify-between gap-2">
      <div className="flex min-w-0 items-center gap-2">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#F7F7F9]" style={{ color }}>
          <i className={`${icon} text-[14px]`} aria-hidden />
        </span>
        <p className="truncate text-[12px] font-bold text-[#1D1D1F]">{title}</p>
      </div>
      <span className="text-[10px] font-semibold text-[#B0AFAC]">더보기</span>
    </div>
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item} className="rounded-sm bg-[#F7F7F9] px-3 py-2 text-[11px] leading-4 text-[#5F5F63]">
          {item}
        </div>
      ))}
    </div>
  </section>
);
