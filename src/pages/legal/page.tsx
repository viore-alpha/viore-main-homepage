import { useEffect } from 'react';

const EFFECTIVE_DATE = '2026년 7월 14일';

type LegalSectionProps = {
  children: React.ReactNode;
  number: string;
  title: string;
};

const LegalSection = ({ children, number, title }: LegalSectionProps) => (
  <section className="border-t border-viore-border-strong pt-8 first:border-0 first:pt-0">
    <h3 className="text-[17px] font-semibold tracking-[-0.015em] text-viore-text">
      {number}. {title}
    </h3>
    <div className="mt-4 space-y-3 text-[14px] leading-7 text-viore-muted">{children}</div>
  </section>
);

type Detail = {
  label: string;
  value: React.ReactNode;
};

const DetailCard = ({ details }: { details: Detail[] }) => (
  <dl className="grid grid-cols-[84px_minmax(0,1fr)] gap-x-4 gap-y-2 rounded-[16px] border border-viore-border-strong bg-white p-5 text-[13px] leading-6 sm:grid-cols-[116px_minmax(0,1fr)] sm:p-6">
    {details.map((detail) => (
      <div className="contents" key={detail.label}>
        <dt className="text-viore-faint">{detail.label}</dt>
        <dd>{detail.value}</dd>
      </div>
    ))}
  </dl>
);

const INQUIRY_DETAILS: Detail[] = [
  { label: '목적', value: '문의 확인 및 회신' },
  { label: '항목', value: '이름, 이메일 주소, 문의 내용과 이용자가 직접 첨부한 정보' },
  { label: '처리 근거', value: '개인정보 보호법 제15조 제1항 제4호' },
  { label: '보유 기간', value: '문의 접수일로부터 1년' },
];

const GOOGLE_DETAILS: Detail[] = [
  { label: '이전받는 자', value: <a className="text-viore-teal hover:underline" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google LLC · Google Workspace</a> },
  { label: '이전 근거', value: '개인정보 보호법 제28조의8 제1항 제3호' },
  { label: '이전 항목', value: '이름, 이메일 주소, 문의 내용과 첨부파일' },
  { label: '이전 목적', value: '업무용 이메일 송수신 및 보관' },
  { label: '이전 국가', value: '미국 등 Google의 데이터 처리 시설이 위치한 국가' },
  { label: '시점·방법', value: '이메일 송수신 시 암호화된 네트워크로 전송' },
  { label: '보유 기간', value: '문의 접수일로부터 1년 또는 위탁계약 종료 시까지' },
];

const PrivacyPolicy = () => (
  <article id="privacy" className="scroll-mt-8">
    <div className="mb-10">
      <p className="label-upper">PRIVACY</p>
      <h2 className="mt-3 text-[28px] font-bold tracking-[-0.03em] text-viore-text sm:text-[34px]">
        개인정보처리방침
      </h2>
      <p className="mt-3 text-[13px] text-viore-faint">시행일 {EFFECTIVE_DATE}</p>
      <p className="mt-8 max-w-[720px] text-[14px] leading-7 text-viore-muted">
        주식회사 바이오레는 홈페이지 운영에 필요한 최소한의 개인정보만 처리합니다.
      </p>
    </div>

    <div className="space-y-10">
      <LegalSection number="1" title="처리하는 개인정보">
        <DetailCard details={INQUIRY_DETAILS} />
      </LegalSection>

      <LegalSection number="2" title="처리 위탁 및 국외 이전">
        <p>이메일 문의 처리를 위해 다음과 같이 개인정보의 보관을 위탁합니다.</p>
        <DetailCard details={GOOGLE_DETAILS} />
        <p>국외 이전을 원하지 않으면 이메일 문의를 보내지 않을 수 있으며, 이 경우 문의에 대한 회신이 제한됩니다.</p>
      </LegalSection>

      <LegalSection number="3" title="제3자 제공 및 자동 수집">
        <p>바이오레는 개인정보를 제3자에게 제공하지 않습니다. 법령에 특별한 규정이 있는 경우는 예외로 합니다.</p>
        <p>홈페이지는 광고성 쿠키, 방문자 분석 도구 또는 맞춤형 광고를 사용하지 않습니다.</p>
      </LegalSection>

      <LegalSection number="4" title="개인정보의 파기">
        <p>
          보유 기간이 끝나거나 처리 목적을 달성한 개인정보는 지체 없이 파기합니다.
          전자 파일은 복구할 수 없는 방법으로 삭제하며, 법령상 보존 의무가 있는 정보는 해당 기간 동안 분리해 보관합니다.
        </p>
      </LegalSection>

      <LegalSection number="5" title="이용자의 권리와 문의">
        <p>이용자는 개인정보의 열람, 정정·삭제 또는 처리정지를 요청할 수 있습니다.</p>
        <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1">
          <dt className="text-viore-faint">담당</dt>
          <dd className="text-viore-text">개인정보 보호 담당</dd>
          <dt className="text-viore-faint">이메일</dt>
          <dd>
            <a className="text-viore-teal hover:underline" href="mailto:cs@vioreai.com">
              cs@vioreai.com
            </a>
          </dd>
        </dl>
      </LegalSection>

      <LegalSection number="6" title="보호조치 및 변경">
        <p>바이오레는 개인정보 취급자를 최소화하고 접근 권한 관리, 전송구간 암호화와 계정 보호 조치를 적용합니다.</p>
        <p>이 방침은 {EFFECTIVE_DATE}부터 적용하며, 변경 시 홈페이지에 공개합니다.</p>
      </LegalSection>
    </div>
  </article>
);

const SiteNotice = () => (
  <article id="terms" className="scroll-mt-8 border-t border-viore-border-strong pt-20">
    <div className="mb-10">
      <p className="label-upper">SITE NOTICE</p>
      <h2 className="mt-3 text-[28px] font-bold tracking-[-0.03em] text-viore-text sm:text-[34px]">
        사이트 이용안내
      </h2>
    </div>

    <div className="space-y-4 text-[14px] leading-7 text-viore-muted">
      <p>이 홈페이지는 바이오레와 제품에 관한 일반적인 정보를 제공하며, 내용은 필요한 경우 변경될 수 있습니다.</p>
      <p>문구, 이미지, 로고와 디자인의 권리는 바이오레 또는 정당한 권리자에게 있으며, 사전 동의 없는 상업적 이용을 금합니다.</p>
      <p>알파닥 서비스에는 알파닥에서 공개하는 별도 약관과 정책이 적용됩니다.</p>
      <p>
        문의는{' '}
        <a className="text-viore-teal hover:underline" href="mailto:cs@vioreai.com">
          cs@vioreai.com
        </a>
        으로 보내주세요.
      </p>
    </div>
  </article>
);

const LegalPage = () => {
  useEffect(() => {
    document.title = '법무고지 | 바이오레';
    document.documentElement.lang = 'ko';

    const description = '주식회사 바이오레의 개인정보처리방침과 사이트 이용안내입니다.';
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', '법무고지 | 바이오레');
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', 'https://vioreai.com/legal/');

    if (window.location.hash) {
      window.requestAnimationFrame(() => {
        document.querySelector(window.location.hash)?.scrollIntoView();
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-viore-bg text-viore-text">
      <header className="border-b border-viore-border bg-[rgba(251,250,247,0.92)] backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[960px] items-center justify-between px-6 md:px-10">
          <a href="/" aria-label="바이오레 홈페이지로 이동">
            <img src="/brand/viore/logotype.png" alt="Viore" className="h-[18px] w-auto object-contain" />
          </a>
          <a href="/" className="text-[13px] font-medium text-viore-muted transition-colors hover:text-viore-text">
            홈
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-[960px] px-6 pb-28 pt-16 md:px-10 md:pb-36 md:pt-24">
        <div className="mb-16 md:mb-24">
          <h1 className="text-[40px] font-bold tracking-[-0.045em] text-viore-text sm:text-[54px]">법무고지</h1>
          <nav aria-label="법무고지 목차" className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-b border-viore-border-strong pb-5">
            <a className="text-[14px] font-medium text-viore-teal hover:underline" href="#privacy">
              개인정보처리방침
            </a>
            <a className="text-[14px] font-medium text-viore-muted hover:text-viore-text" href="#terms">
              사이트 이용안내
            </a>
          </nav>
        </div>

        <div className="max-w-[820px] space-y-20">
          <PrivacyPolicy />
          <SiteNotice />
        </div>
      </main>

      <footer className="border-t border-viore-border bg-viore-surface">
        <div className="mx-auto flex max-w-[960px] flex-col gap-2 px-6 py-8 text-[12px] text-viore-faint sm:flex-row sm:items-center sm:justify-between md:px-10">
          <span>주식회사 바이오레</span>
          <span>© 2026 Viore Inc. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default LegalPage;
