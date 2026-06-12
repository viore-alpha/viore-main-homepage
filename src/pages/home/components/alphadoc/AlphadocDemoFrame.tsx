import { useEffect, useRef, useState } from 'react';
import type { AlphadocContent, AlphadocWorkflow } from './alphadocContent';

type AlphadocDemoFrameProps = {
  readonly content: AlphadocContent;
  readonly workflow: AlphadocWorkflow;
};

const motionSrcByWorkflow = {
  alphaWing: '/alphadoc-alphawing-motion/index.html',
} satisfies Partial<Record<AlphadocWorkflow['id'], string>>;

const shellClassByWorkflow = {
  clinicalEngine: 'h-[330px] sm:h-[440px]',
  alphaWing: 'h-[390px] sm:h-[420px]',
  widgetBar: 'h-[390px] sm:h-[420px]',
} satisfies Record<AlphadocWorkflow['id'], string>;

export const AlphadocDemoFrame = ({ content, workflow }: AlphadocDemoFrameProps) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [shouldLoadMotion, setShouldLoadMotion] = useState(false);
  const motionSrc = motionSrcByWorkflow[workflow.id];

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || shouldLoadMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          setShouldLoadMotion(true);
          observer.disconnect();
        }
      },
      { threshold: [0.35] },
    );

    observer.observe(frame);
    return () => observer.disconnect();
  }, [shouldLoadMotion]);

  return (
    <div
      className={`relative overflow-visible lg:aspect-[3/2] lg:h-auto ${shellClassByWorkflow[workflow.id]}`}
      aria-label={`${content.demoTitle} ${workflow.title}`}
    >
      <div className="pointer-events-none absolute inset-x-[8%] -bottom-7 h-16 rounded-[999px] bg-black/[0.08] blur-2xl" aria-hidden />
      <div
        ref={frameRef}
        data-demo-workflow={workflow.id}
        className="relative flex h-full w-full overflow-hidden rounded-[28px] bg-[#F7F6F3] shadow-[0_34px_90px_rgba(17,17,19,0.16)]"
      >
        {shouldLoadMotion && motionSrc ? (
          <iframe
            src={motionSrc}
            title={`${content.demoTitle} ${workflow.title}`}
            className="h-full w-full border-0 bg-transparent"
          />
        ) : (
          <div className="flex h-full w-full flex-col justify-between p-6 text-[#222226] sm:p-8">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-[0_10px_30px_rgba(17,17,19,0.08)]">
                  <i className={`${workflow.navIcon} text-xl text-[#4A6D57]`} aria-hidden />
                </span>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#8A8A8A]">{content.demoTitle}</p>
                  <p className="text-[18px] font-semibold text-[#222226]">{workflow.responseTitle}</p>
                </div>
              </div>
              <div className="rounded-[22px] bg-white p-5 shadow-[0_18px_45px_rgba(17,17,19,0.08)]">
                <p className="mb-4 text-[14px] leading-6 text-[#6B6B70]">{workflow.prompt}</p>
                <div className="space-y-3">
                  {workflow.response.map((item) => (
                    <div key={item} className="flex gap-3 text-[14px] leading-6 text-[#38383D]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7A9C83]" aria-hidden />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {workflow.sources.map((source) => (
                <span key={source} className="rounded-full bg-white/80 px-3 py-1.5 text-[12px] font-medium text-[#6F736C]">
                  {source}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
