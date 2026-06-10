import type { AlphadocContent, AlphadocWorkflow, AlphadocWorkflowId } from './alphadocContent';

type AlphadocDemoFrameProps = {
  readonly content: AlphadocContent;
  readonly workflow: AlphadocWorkflow;
};

const motionSrcByWorkflow = {
  clinicalEngine: '/alphadoc-clinical-ai-motion/index.html',
  alphaWing: '/alphadoc-alphawing-motion/index.html',
  widgetBar: '/alphadoc-widget-motion/index.html',
} satisfies Record<AlphadocWorkflowId, string>;

const shellClassByWorkflow = {
  clinicalEngine: 'h-[330px] sm:h-[440px]',
  alphaWing: 'h-[390px] sm:h-[420px]',
  widgetBar: 'h-[390px] sm:h-[420px]',
} satisfies Record<AlphadocWorkflowId, string>;

export const AlphadocDemoFrame = ({ content, workflow }: AlphadocDemoFrameProps) => (
  <div
    className={`relative overflow-visible lg:aspect-[3/2] lg:h-auto ${shellClassByWorkflow[workflow.id]}`}
    aria-label={`${content.demoTitle} ${workflow.title}`}
  >
    <div className="pointer-events-none absolute inset-x-[8%] -bottom-7 h-16 rounded-[999px] bg-black/[0.08] blur-2xl" aria-hidden />
    <div
      data-demo-workflow={workflow.id}
      className="relative flex h-full w-full overflow-hidden rounded-[28px] bg-[#F7F6F3] shadow-[0_34px_90px_rgba(17,17,19,0.16)]"
    >
      <iframe
        src={motionSrcByWorkflow[workflow.id]}
        title={`${content.demoTitle} ${workflow.title}`}
        loading="lazy"
        className="h-full w-full border-0 bg-transparent"
      />
    </div>
  </div>
);
