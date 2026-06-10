import type { CSSProperties, ReactNode } from 'react';
import type { AlphadocContent } from './alphadocContent';

type ClinicalEngineMotionDemoProps = {
  readonly content: AlphadocContent;
  readonly progressPercent: string;
};

const openingButtons = [
  { icon: '/brand/alphadoc/feature-icons/functions/soap.svg', label: 'SOAP 초안' },
  { icon: '/brand/alphadoc/feature-icons/functions/guide.svg', label: '진료 지침' },
  { icon: '/brand/alphadoc/feature-icons/functions/drug.svg', label: '약물 상호작용' },
  { icon: 'ri-image-circle-line', label: '영상 분석' },
] as const;

const firstAnswer = [
  '발열, 기침, 흉부 영상 소견을 함께 보면 지역사회획득폐렴 가능성을 우선 검토합니다.',
  '혈압약과 당뇨약 복용 이력을 기준으로 항생제 선택 전 상호작용 위험을 확인했습니다.',
  '의료인이 바로 검토할 수 있도록 SOAP 초안과 추가 검사 포인트를 정리했습니다.',
] as const;

const secondAnswer = [
  '첨부 논문은 CAP 환자에서 조기 항생제 선택과 위험도 분류 근거를 보강합니다.',
  '흉부 이미지는 양측 하엽 침윤 가능성이 보여 영상의학 판독과 함께 확인이 필요합니다.',
  '검색으로 최신 가이드라인 변경 여부를 다시 확인한 뒤 치료 옵션을 우선순위로 정리합니다.',
] as const;

const attachedFiles = [
  { icon: 'ri-file-paper-2-line', label: 'CAP_guideline_2024.pdf' },
  { icon: 'ri-image-2-line', label: 'chest-xray.png' },
] as const;

export const ClinicalEngineMotionDemo = ({ content, progressPercent }: ClinicalEngineMotionDemoProps) => (
  <div className="alphadoc-chat-motion relative flex min-h-[500px] flex-1 overflow-hidden bg-[#FBFBFB] lg:min-h-[520px] xl:min-h-[540px]">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(14,110,110,0.08),transparent_34%),linear-gradient(180deg,#FFFFFF_0%,#FBFBFB_62%,#F3F3F3_100%)]" />

    <div className="alphadoc-opening absolute inset-x-0 top-0 flex min-h-[390px] flex-col items-center px-8 pt-10 text-center sm:pt-12">
      <img
        src={content.assets.mascot}
        alt=""
        className="alphadoc-flow-item h-16 w-16 object-contain drop-shadow-[0_14px_24px_rgba(14,110,110,0.16)] sm:h-[74px] sm:w-[74px]"
        loading="lazy"
        decoding="async"
      />
      <h4 className="alphadoc-flow-item mt-6 text-[32px] font-bold leading-[1.15] text-[#2A2A2C] sm:text-[42px]">
        오늘도 도와드릴 준비가 되었어요.
      </h4>
      <p className="alphadoc-flow-item mt-5 max-w-[520px] text-[15px] font-semibold leading-7 text-[#9A9A9E] sm:text-[17px]">
        알파닥은 아래뿐만 아니라 더 많은 것을 할 수 있답니다.
        <br />
        의학 질문을 물어봐 주세요.
      </p>
      <div className="mt-8 grid w-full max-w-[560px] grid-cols-2 gap-3 sm:grid-cols-4">
        {openingButtons.map((button, index) => (
          <div
            key={button.label}
            className="alphadoc-feature-pop grid min-h-[92px] place-items-center rounded-lg border border-white bg-white/88 px-2 text-center shadow-[0_18px_38px_rgba(17,17,19,0.1),0_1px_0_rgba(255,255,255,0.96)_inset]"
            style={{ animationDelay: `${0.68 + index * 0.12}s` }}
          >
            {button.icon.endsWith('.svg') ? (
              <img src={button.icon} alt="" className="h-8 w-8 object-contain opacity-60" loading="lazy" decoding="async" />
            ) : (
              <i className={`${button.icon} text-[32px] text-[#9A9A9E]`} aria-hidden />
            )}
            <span className="text-[13px] font-bold text-[#707075] sm:text-[14px]">{button.label}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="alphadoc-chat-sequence relative z-10 flex min-h-0 w-full flex-1 flex-col px-4 pb-[86px] pt-4 sm:px-5">
      <div className="min-h-0 flex-1 space-y-3 overflow-hidden">
        <QuestionBubble className="alphadoc-question-one">
          <TypingText text="58세 남성, 발열과 기침. 흉부 이미지와 복용약 목록을 함께 검토해줘." characters={42} />
        </QuestionBubble>
        <AnswerCard className="alphadoc-answer-one" content={content} progressPercent={progressPercent} lines={firstAnswer} sources={['K-CPG CAP 2023', 'IDSA/ATS 2019', 'PubMed 검색']} />

        <div className="alphadoc-attachment-row ml-auto grid w-full max-w-[440px] grid-cols-1 gap-2 sm:grid-cols-2">
          {attachedFiles.map((file) => (
            <div key={file.label} className="flex items-center gap-2 rounded-md border border-black/[0.06] bg-white px-3 py-2 shadow-[0_8px_22px_rgba(17,17,19,0.05)]">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-sm bg-[#F6F6F7] text-[#6B6B6B]">
                <i className={`${file.icon} text-[15px]`} aria-hidden />
              </span>
              <span className="truncate text-[11px] font-bold text-[#5F5F63]">{file.label}</span>
            </div>
          ))}
        </div>

        <QuestionBubble className="alphadoc-question-two">
          <TypingText text="이 논문과 이미지를 같이 보고 항생제 선택과 추적 계획을 정리해줘." characters={34} />
        </QuestionBubble>
        <AnswerCard className="alphadoc-answer-two" content={content} progressPercent="92%" lines={secondAnswer} sources={['첨부 논문', '흉부 이미지', '검색 확인']} />
      </div>
    </div>

    <div className="absolute inset-x-0 bottom-0 z-20 border-t border-black/[0.04] bg-white/72 px-4 py-3 backdrop-blur-xl sm:px-5">
      <div className="grid grid-cols-[42px_minmax(0,1fr)_42px] items-center gap-3">
        <button type="button" className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#6B6B6B] shadow-[0_10px_28px_rgba(17,17,19,0.08)]" aria-label="첨부">
          <i className="ri-attachment-2 text-[22px]" aria-hidden />
        </button>
        <div className="relative h-11 overflow-hidden rounded-full bg-white px-5 text-[13px] font-semibold leading-[44px] text-[#8A8A8E] shadow-[0_10px_26px_rgba(17,17,19,0.08)]">
          <span className="alphadoc-input-placeholder">메시지를 입력하세요...</span>
          <span className="alphadoc-input-typing absolute left-5 top-0 text-[#3C3C3E]">58세 남성, 발열과 기침...</span>
        </div>
        <button type="button" className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#8A8A8E] shadow-[0_10px_28px_rgba(17,17,19,0.08)]" aria-label="전송">
          <i className="ri-arrow-up-line text-[21px]" aria-hidden />
        </button>
      </div>
    </div>
  </div>
);

type QuestionBubbleProps = {
  readonly children: ReactNode;
  readonly className: string;
};

const QuestionBubble = ({ children, className }: QuestionBubbleProps) => (
  <div className={`${className} ml-auto max-w-[78%] rounded-md bg-white px-4 py-3 text-[12px] font-semibold leading-5 text-[#2C2C2C] shadow-[0_8px_24px_rgba(17,17,19,0.06)]`}>
    {children}
  </div>
);

type AnswerCardProps = {
  readonly className: string;
  readonly content: AlphadocContent;
  readonly lines: readonly string[];
  readonly progressPercent: string;
  readonly sources: readonly string[];
};

const AnswerCard = ({ className, content, lines, progressPercent, sources }: AnswerCardProps) => (
  <div className={`${className} rounded-lg border border-black/[0.06] bg-white/88 p-4 shadow-[0_14px_32px_rgba(17,17,19,0.08)]`}>
    <div className="mb-3 flex items-center gap-2">
      <img src={content.assets.mascot} alt="" className="h-7 w-7 object-contain" loading="lazy" decoding="async" />
      <div className="min-w-0">
        <p className="text-[12px] font-bold text-[#1D1D1F]">알파닥AI</p>
        <p className="text-[11px] text-[#8A8A8E]">근거 확인 중</p>
      </div>
      <div className="ml-auto h-1.5 w-24 overflow-hidden rounded-full bg-black/[0.06]">
        <div className="h-full rounded-full bg-[#B42335]" style={{ width: progressPercent }} />
      </div>
    </div>
    <div className="space-y-2">
      {lines.map((line) => (
        <p key={line} className="text-[12px] leading-5 text-[#2C2C2C]">
          {line}
        </p>
      ))}
    </div>
    <div className="mt-3 flex flex-wrap gap-2">
      {sources.map((source, index) => (
        <span key={source} className="inline-flex h-6 items-center gap-1 rounded-full border border-black/[0.06] bg-[#F7F7F9] px-2 text-[10px] font-semibold text-[#5F5F63]">
          <span className="text-[#B42335]">{index + 1}</span>
          {source}
        </span>
      ))}
    </div>
  </div>
);

type TypingTextProps = {
  readonly characters: number;
  readonly text: string;
};

type TypingStyle = CSSProperties & {
  readonly '--typing-characters': number;
};

const TypingText = ({ characters, text }: TypingTextProps) => {
  const typingStyle: TypingStyle = { '--typing-characters': characters };

  return (
    <span className="alphadoc-typewriter" style={typingStyle}>
      {text}
    </span>
  );
};
