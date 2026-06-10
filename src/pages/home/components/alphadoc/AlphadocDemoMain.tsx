import type { AlphadocContent, AlphadocWorkflow } from './alphadocContent';
import { ClinicalEngineMotionDemo } from './ClinicalEngineMotionDemo';

type AlphadocDemoMainProps = {
  readonly content: AlphadocContent;
  readonly workflow: AlphadocWorkflow;
  readonly progressPercent: string;
};

function assertNever(value: never): never {
  throw new Error(`Unexpected Alphadoc workflow: ${value}`);
}

export const AlphadocDemoMain = ({ content, workflow, progressPercent }: AlphadocDemoMainProps) => {
  switch (workflow.id) {
    case 'clinicalEngine':
      return <ClinicalEngineMotionDemo content={content} progressPercent={progressPercent} />;
    case 'alphaWing':
      return <AlphaWingDemo workflow={workflow} />;
    case 'widgetBar':
      return <WidgetBarDemo workflow={workflow} />;
    default:
      return assertNever(workflow.id);
  }
};

type WorkflowDemoProps = {
  readonly workflow: AlphadocWorkflow;
};

const AlphaWingDemo = ({ workflow }: WorkflowDemoProps) => (
  <div className="flex min-h-0 flex-1 flex-col gap-4 px-4 py-5">
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-black/[0.06] bg-white/78 p-3">
      {workflow.panels.map((panel, index) => (
        <span
          key={panel.title}
          className="inline-flex h-9 items-center gap-2 rounded-sm px-3 text-[12px] font-bold"
          style={{
            background: index === 0 ? 'rgba(180,35,53,0.08)' : 'rgba(17,17,19,0.04)',
            color: index === 0 ? '#B42335' : '#5F5F63',
          }}
        >
          <i className={`${panel.icon} text-[14px]`} aria-hidden />
          {panel.title}
        </span>
      ))}
    </div>
    <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[1.15fr_0.85fr]">
      <section className="rounded-lg border border-black/[0.06] bg-white/84 p-4 shadow-[0_12px_30px_rgba(17,17,19,0.06)]">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[13px] font-bold text-[#1D1D1F]">알파윙 Today</p>
            <p className="mt-1 text-[11px] font-semibold text-[#8A8A8E]">진료 전 브리핑</p>
          </div>
          <span className="rounded-full bg-[#FBEAEC] px-2.5 py-1 text-[11px] font-bold text-[#B42335]">Live</span>
        </div>
        <div className="space-y-3">
          {workflow.response.map((line) => (
            <article key={line} className="rounded-md bg-[#F7F7F9] px-3 py-3">
              <p className="text-[12px] font-semibold leading-5 text-[#2C2C2C]">{line}</p>
            </article>
          ))}
        </div>
      </section>
      <div className="grid gap-3">
        {workflow.panels.map((panel) => (
          <MiniPanel key={panel.title} title={panel.title} icon={panel.icon} items={panel.items} />
        ))}
      </div>
    </div>
  </div>
);

const WidgetBarDemo = ({ workflow }: WorkflowDemoProps) => (
  <div className="flex min-h-0 flex-1 flex-col gap-4 px-4 py-5">
    <div className="grid grid-cols-4 gap-2 rounded-lg border border-black/[0.06] bg-white/80 p-2 shadow-[0_10px_24px_rgba(17,17,19,0.05)]">
      {workflow.bullets.map((bullet) => (
        <WidgetButton key={bullet.text} icon={bullet.icon} label={bullet.text} />
      ))}
      <WidgetButton icon="ri-stethoscope-line" label="진료 보조 위젯" />
      <WidgetButton icon="ri-add-line" label="추가 예정" />
    </div>
    <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[0.92fr_1.08fr]">
      <section className="rounded-lg border border-black/[0.06] bg-white/84 p-4">
        <p className="text-[13px] font-bold text-[#1D1D1F]">오늘의 캘린더</p>
        <div className="mt-4 grid grid-cols-7 gap-1.5">
          {['월', '화', '수', '목', '금', '토', '일'].map((day) => (
            <span key={day} className="text-center text-[10px] font-bold text-[#8A8A8E]">
              {day}
            </span>
          ))}
          {Array.from({ length: 14 }, (_, index) => (
            <span
              key={index}
              className="grid aspect-square place-items-center rounded-sm text-[11px] font-bold"
              style={{
                background: index === 7 ? '#111113' : 'rgba(17,17,19,0.04)',
                color: index === 7 ? '#FFFFFF' : '#5F5F63',
              }}
            >
              {index + 1}
            </span>
          ))}
        </div>
      </section>
      <section className="rounded-lg border border-black/[0.06] bg-white/84 p-4">
        <p className="text-[13px] font-bold text-[#1D1D1F]">의료계산기</p>
        <div className="mt-4 space-y-3">
          {['eGFR', 'BMI', 'CHA2DS2-VASc'].map((label, index) => (
            <div key={label} className="grid grid-cols-[84px_minmax(0,1fr)_48px] items-center gap-3 rounded-md bg-[#F7F7F9] px-3 py-3">
              <span className="text-[12px] font-bold text-[#1D1D1F]">{label}</span>
              <span className="h-2 overflow-hidden rounded-full bg-black/[0.06]">
                <span className="block h-full rounded-full bg-[#B42335]" style={{ width: `${52 + index * 16}%` }} />
              </span>
              <span className="text-right text-[11px] font-bold text-[#6B6B6B]">열기</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
);

type MiniPanelProps = {
  readonly title: string;
  readonly icon: string;
  readonly items: readonly string[];
};

const MiniPanel = ({ title, icon, items }: MiniPanelProps) => (
  <section className="rounded-md border border-black/[0.06] bg-white/74 p-3">
    <div className="mb-2 flex items-center gap-2">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#F7F7F9] text-[#5F5F63]">
        <i className={`${icon} text-[14px]`} aria-hidden />
      </span>
      <p className="truncate text-[12px] font-bold text-[#1D1D1F]">{title}</p>
    </div>
    <div className="space-y-2">
      {items.map((item) => (
        <p key={item} className="rounded-sm bg-[#F7F7F9] px-3 py-2 text-[11px] font-semibold leading-4 text-[#5F5F63]">
          {item}
        </p>
      ))}
    </div>
  </section>
);

type WidgetButtonProps = {
  readonly icon: string;
  readonly label: string;
};

const WidgetButton = ({ icon, label }: WidgetButtonProps) => (
  <span className="grid min-h-16 place-items-center rounded-md bg-[#F7F7F9] px-2 text-center">
    <i className={`${icon} text-[17px] text-[#1D1D1F]`} aria-hidden />
    <span className="mt-1 line-clamp-2 text-[10px] font-bold leading-3 text-[#5F5F63]">{label}</span>
  </span>
);
