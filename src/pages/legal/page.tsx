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

const DetailCard = ({ details, title }: { details: Detail[]; title: string }) => (
  <div className="rounded-[16px] border border-viore-border-strong bg-white p-5 sm:p-6">
    <p className="font-semibold text-viore-text">{title}</p>
    <dl className="mt-4 grid grid-cols-[76px_minmax(0,1fr)] gap-x-4 gap-y-2 text-[13px] leading-6 sm:grid-cols-[104px_minmax(0,1fr)]">
      {details.map((detail) => (
        <div className="contents" key={detail.label}>
          <dt className="text-viore-faint">{detail.label}</dt>
          <dd>{detail.value}</dd>
        </div>
      ))}
    </dl>
  </div>
);

const PROCESSING_ITEMS = [
  {
    title: '이메일 문의',
    details: [
      { label: '목적', value: '문의 확인 및 회신' },
      { label: '항목', value: '이름, 이메일 주소, 문의 내용, 첨부파일 등 이용자가 직접 제공한 정보' },
      { label: '처리 근거', value: '개인정보 보호법 제15조 제1항 제4호' },
      { label: '보유 기간', value: '문의 접수일로부터 1년 후 파기 절차 진행' },
    ],
  },
  {
    title: '홈페이지 접속',
    details: [
      { label: '목적', value: '보안 및 안정적인 홈페이지 운영' },
      { label: '항목', value: 'IP 주소, 접속 일시, 브라우저 및 기기 정보 등 접속기록' },
      { label: '처리 근거', value: '개인정보 보호법 제15조 제1항 제6호' },
      { label: '보유 기간', value: '바이오레는 별도 저장하지 않으며 호스팅 사업자의 정책에 따름' },
    ],
  },
];

const OVERSEAS_PROCESSORS = [
  {
    title: 'Google LLC · Google Workspace',
    details: [
      { label: '연락처', value: <a className="text-viore-teal hover:underline" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google 개인정보처리방침</a> },
      { label: '이전 항목', value: '이름, 이메일 주소, 문의 내용 및 첨부파일' },
      { label: '목적', value: '업무용 이메일 송수신 및 보관' },
      { label: '이전 국가', value: '미국 등 Google이 서비스를 제공하는 국가' },
      { label: '시점·방법', value: '이메일 송수신 시 암호화된 네트워크로 전송' },
      { label: '보유 기간', value: '문의 접수일로부터 1년 후 파기 절차 진행 또는 위탁계약 종료 시까지' },
    ],
  },
  {
    title: 'GitHub, Inc. · GitHub Pages',
    details: [
      { label: '연락처', value: <a className="text-viore-teal hover:underline" href="mailto:dpo@github.com">dpo@github.com</a> },
      { label: '이전 항목', value: 'IP 주소, 접속 일시 등 접속기록' },
      { label: '목적', value: '홈페이지 호스팅 및 보안' },
      { label: '이전 국가', value: '미국 및 GitHub 관계사·수탁자가 운영되는 국가' },
      { label: '시점·방법', value: '홈페이지 접속 시 암호화된 네트워크로 전송' },
      { label: '보유 기간', value: 'GitHub의 개인정보 보유정책 또는 위탁계약 종료 시까지' },
    ],
  },
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
        주식회사 바이오레는 정보주체의 자유와 권리를 보호하기 위해 개인정보 보호법과 관계 법령을 준수하며,
        개인정보 처리 절차와 기준을 다음과 같이 공개합니다.
      </p>
    </div>

    <div className="space-y-10">
      <LegalSection number="1" title="개인정보의 처리 목적과 항목">
        <div className="grid gap-3 sm:grid-cols-2">
          {PROCESSING_ITEMS.map((item) => <DetailCard key={item.title} {...item} />)}
        </div>
        <p>처리 목적이 변경되는 경우 관계 법령에 따라 별도의 동의를 받는 등 필요한 조치를 합니다.</p>
      </LegalSection>

      <LegalSection number="2" title="자동으로 수집되는 정보">
        <p>
          GitHub Pages에서 홈페이지 보안을 위해 IP 주소와 접속 일시 등이 자동으로 기록될 수 있습니다.
          바이오레는 해당 접속기록을 직접 조회하거나 별도로 저장하지 않습니다.
        </p>
        <p>바이오레 홈페이지는 광고성 쿠키, 방문자 분석 도구 또는 맞춤형 광고를 위한 행태정보를 수집하지 않습니다.</p>
      </LegalSection>

      <LegalSection number="3" title="개인정보의 제3자 제공">
        <p>바이오레는 개인정보를 제3자에게 제공하지 않습니다. 법령에 특별한 규정이 있는 경우는 예외로 합니다.</p>
      </LegalSection>

      <LegalSection number="4" title="처리 위탁 및 국외 이전">
        <p>
          바이오레는 서비스 제공을 위해 개인정보 처리업무를 아래와 같이 위탁하며,
          개인정보 보호법 제28조의8 제1항 제3호에 따라 계약 이행에 필요한 범위에서 국외로 이전·보관합니다.
        </p>
        <div className="space-y-3">
          {OVERSEAS_PROCESSORS.map((processor) => <DetailCard key={processor.title} {...processor} />)}
        </div>
        <p>
          국외 이전을 원하지 않는 경우 홈페이지 이용 또는 이메일 문의를 하지 않을 수 있습니다.
          이 경우 홈페이지 열람이나 문의 회신이 제한될 수 있습니다.
        </p>
      </LegalSection>

      <LegalSection number="5" title="처리하지 않는 개인정보">
        <p>
          바이오레 홈페이지는 만 14세 미만 아동을 대상으로 하지 않으며, 고유식별정보, 민감정보, 개인위치정보 또는 가명정보를 처리하지 않습니다.
          해당 정보가 의도치 않게 접수된 사실을 확인하면 지체 없이 삭제합니다.
        </p>
      </LegalSection>

      <LegalSection number="6" title="개인정보의 파기">
        <p>
          보유 기간이 끝나거나 처리 목적을 달성한 개인정보는 지체 없이 파기합니다.
          전자 파일은 복구할 수 없는 방법으로 삭제하고, 종이 문서는 분쇄하거나 소각합니다.
          법령에 따라 별도 보존이 필요한 경우에는 다른 개인정보와 분리해 해당 기간 동안만 보관합니다.
        </p>
      </LegalSection>

      <LegalSection number="7" title="정보주체의 권리와 행사방법">
        <p>
          정보주체는 개인정보의 열람, 정정·삭제, 처리정지 또는 동의 철회를 요청할 수 있습니다.
          본인 또는 적법한 대리인이 아래 이메일로 요청하면 법령이 정한 절차에 따라 지체 없이 처리합니다.
        </p>
        <p>정정을 요청한 개인정보는 정정이 완료될 때까지 이용하거나 제공하지 않습니다.</p>
      </LegalSection>

      <LegalSection number="8" title="안전성 확보 조치">
        <p>
          바이오레는 개인정보 취급자를 최소화하고 접근 권한을 관리하며, 전송구간 암호화와 계정 보호 등 필요한 관리적·기술적 보호조치를 적용합니다.
        </p>
      </LegalSection>

      <LegalSection number="9" title="개인정보 보호 및 열람청구 담당">
        <p>개인정보 관련 문의, 권리행사 및 피해구제 요청은 아래 담당으로 접수할 수 있습니다.</p>
        <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1">
          <dt className="text-viore-faint">담당 부서</dt>
          <dd className="text-viore-text">개인정보 보호 담당</dd>
          <dt className="text-viore-faint">이메일</dt>
          <dd>
            <a className="text-viore-teal hover:underline" href="mailto:cs@vioreai.com">
              cs@vioreai.com
            </a>
          </dd>
        </dl>
      </LegalSection>

      <LegalSection number="10" title="권익침해 구제">
        <ul className="space-y-1">
          <li>개인정보 침해신고센터 · <a className="text-viore-teal hover:underline" href="https://privacy.kisa.or.kr" target="_blank" rel="noopener noreferrer">privacy.kisa.or.kr</a> · 118</li>
          <li>개인정보분쟁조정위원회 · <a className="text-viore-teal hover:underline" href="https://www.kopico.go.kr" target="_blank" rel="noopener noreferrer">kopico.go.kr</a> · 1833-6972</li>
          <li>경찰청 사이버범죄 신고시스템 · <a className="text-viore-teal hover:underline" href="https://ecrm.police.go.kr" target="_blank" rel="noopener noreferrer">ecrm.police.go.kr</a> · 182</li>
        </ul>
      </LegalSection>

      <LegalSection number="11" title="처리방침의 변경">
        <p>이 방침은 {EFFECTIVE_DATE}부터 적용됩니다. 변경 시 시행일과 변경 내용을 홈페이지에 공개합니다.</p>
      </LegalSection>
    </div>
  </article>
);

const Terms = () => (
  <article id="terms" className="scroll-mt-8 border-t border-viore-border-strong pt-20">
    <div className="mb-10">
      <p className="label-upper">TERMS</p>
      <h2 className="mt-3 text-[28px] font-bold tracking-[-0.03em] text-viore-text sm:text-[34px]">
        홈페이지 이용약관
      </h2>
      <p className="mt-3 text-[13px] text-viore-faint">시행일 {EFFECTIVE_DATE}</p>
    </div>

    <div className="space-y-10">
      <LegalSection number="1" title="목적">
        <p>이 약관은 주식회사 바이오레가 운영하는 vioreai.com 홈페이지의 이용 조건을 정합니다.</p>
      </LegalSection>

      <LegalSection number="2" title="홈페이지의 이용">
        <p>
          홈페이지는 바이오레와 제품에 관한 정보를 제공합니다. 바이오레는 필요한 경우 홈페이지의 내용이나 운영 방식을 변경하거나 중단할 수 있습니다.
        </p>
      </LegalSection>

      <LegalSection number="3" title="지식재산권">
        <p>
          홈페이지의 문구, 이미지, 로고, 디자인 및 기타 콘텐츠에 관한 권리는 바이오레 또는 정당한 권리자에게 있습니다.
          사전 서면 동의 없이 복제, 배포, 변형 또는 상업적으로 이용할 수 없습니다.
        </p>
      </LegalSection>

      <LegalSection number="4" title="금지행위">
        <p>
          홈페이지의 정상적인 운영을 방해하거나, 보안을 침해하거나, 타인의 권리를 침해하거나, 법령에 위반되는 방식으로 이용해서는 안 됩니다.
        </p>
      </LegalSection>

      <LegalSection number="5" title="정보의 성격">
        <p>
          홈페이지의 내용은 회사와 제품에 관한 일반적인 안내이며, 의료적 진단이나 치료 또는 법률·투자 자문을 제공하지 않습니다.
          알파닥 서비스에는 알파닥에서 공개하는 별도 약관과 정책이 적용됩니다.
        </p>
      </LegalSection>

      <LegalSection number="6" title="외부 링크">
        <p>외부 웹사이트와 서비스는 각 운영자의 책임과 정책에 따라 제공됩니다.</p>
      </LegalSection>

      <LegalSection number="7" title="책임의 제한">
        <p>
          바이오레는 고의 또는 중대한 과실이 없는 한 천재지변, 통신 장애, 외부 서비스 장애 등 통제하기 어려운 사유로 발생한 손해에 책임을 지지 않습니다.
        </p>
      </LegalSection>

      <LegalSection number="8" title="약관의 변경">
        <p>약관을 변경하는 경우 적용일과 변경 내용을 홈페이지에 공개합니다.</p>
      </LegalSection>

      <LegalSection number="9" title="준거법과 관할">
        <p>이 약관은 대한민국 법률에 따르며, 분쟁이 발생하면 민사소송법이 정한 관할법원에서 해결합니다.</p>
      </LegalSection>

      <LegalSection number="10" title="문의">
        <p>
          약관에 관한 문의는{' '}
          <a className="text-viore-teal hover:underline" href="mailto:cs@vioreai.com">
            cs@vioreai.com
          </a>
          으로 보내주세요.
        </p>
      </LegalSection>
    </div>
  </article>
);

const LegalPage = () => {
  useEffect(() => {
    document.title = '법무고지 | 바이오레';
    document.documentElement.lang = 'ko';

    const description = '주식회사 바이오레의 개인정보처리방침과 홈페이지 이용약관입니다.';
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
              홈페이지 이용약관
            </a>
          </nav>
        </div>

        <div className="max-w-[820px] space-y-20">
          <PrivacyPolicy />
          <Terms />
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
