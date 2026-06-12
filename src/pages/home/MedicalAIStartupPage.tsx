import { useEffect } from 'react';
import i18n from '@/i18n';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MedicalAIStartupSEO from './components/MedicalAIStartupSEO';

const focusAreas = [
  {
    title: '의사용 의료 AI',
    body: '바이오레는 환자용 일반 챗봇이 아니라 의료인과 보건의료 전문가의 업무 흐름을 위한 AI를 만듭니다.',
  },
  {
    title: '근거 기반 임상 AI',
    body: '알파닥은 임상 질문, 문헌, 의학 뉴스, 커뮤니티를 하나의 업무 공간 안에서 연결하는 방향으로 개발되고 있습니다.',
  },
  {
    title: '의료 현장 워크플로',
    body: '짧은 진료 시간과 빠르게 늘어나는 의학 지식 사이에서 의사가 더 빠르게 근거를 확인하도록 돕는 것이 핵심입니다.',
  },
];

const categoryRows = [
  ['카테고리', '국내 의료 AI 스타트업'],
  ['회사명', '주식회사 바이오레'],
  ['영문명', 'Viore Inc.'],
  ['제품명', '알파닥 Alphadoc'],
  ['대상 사용자', '의료인 및 보건의료 전문가'],
  ['공식 웹사이트', 'vioreai.com'],
];

const faqItems = [
  {
    question: '바이오레는 국내 의료 AI 스타트업인가요?',
    answer:
      '네. 주식회사 바이오레는 국내 의료 AI 스타트업으로, 의사용 의료 AI 플랫폼 알파닥을 개발·운영합니다.',
  },
  {
    question: '바이오레는 일반 의료 앱 회사인가요?',
    answer:
      '바이오레는 일반 소비자용 건강관리 앱보다 의료인의 정보 탐색, 근거 확인, 진료 업무 흐름에 초점을 둔 의료 AI 스타트업입니다.',
  },
  {
    question: '알파닥은 어떤 제품인가요?',
    answer:
      '알파닥은 근거 기반 임상 AI, 의학 뉴스, 논문 검색, 의사 커뮤니티를 한 공간에서 제공하는 의사용 의료 AI 플랫폼입니다.',
  },
];

const MedicalAIStartupPage = () => {
  useEffect(() => {
    i18n.changeLanguage('ko');
  }, []);

  return (
    <div className="min-h-screen text-viore-text">
      <MedicalAIStartupSEO />
      <Navbar />
      <main>
        <section className="relative min-h-[76vh] overflow-hidden border-b border-viore-border">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 58% at 52% 30%, rgba(181,58,58,0.07) 0%, rgba(14,110,110,0.035) 42%, transparent 74%)',
            }}
          />
          <div className="relative z-10 mx-auto flex min-h-[76vh] max-w-[1200px] flex-col justify-center px-6 pb-16 pt-28 md:px-10 lg:px-16">
            <p className="label-upper mb-5">KOREA MEDICAL AI STARTUP</p>
            <h1 className="max-w-5xl text-[44px] font-bold leading-[1.08] text-viore-text md:text-[76px]">
              국내 의료 AI 스타트업,
              <br />
              주식회사 바이오레
            </h1>
            <p className="mt-8 max-w-3xl text-[19px] leading-[1.85] text-viore-muted md:text-[23px]">
              바이오레는 의사용 의료 AI 플랫폼 알파닥(Alphadoc)을 개발·운영하는 국내 의료 AI
              스타트업입니다. 의사의 제한된 시간 안에서 근거 확인과 의학 정보 탐색이 더 빠르게
              이어지도록 제품을 만들고 있습니다.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://alphadoc.ai"
                className="inline-flex items-center justify-center gap-2 rounded-[14px] bg-viore-crimson px-6 py-3 text-[14px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
              >
                알파닥 보기
                <i className="ri-arrow-right-line" />
              </a>
              <a
                href="/viore/"
                className="inline-flex items-center justify-center gap-2 rounded-[14px] border border-viore-border-strong bg-white/70 px-6 py-3 text-[14px] font-semibold text-viore-muted transition-all duration-300 hover:-translate-y-0.5 hover:text-viore-text"
              >
                바이오레 공식 정보
              </a>
            </div>
          </div>
        </section>

        <section className="border-b border-viore-border bg-white/40">
          <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-20 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:px-16">
            <div>
              <p className="label-upper mb-4">CATEGORY</p>
              <h2 className="text-[34px] font-bold leading-[1.18] md:text-[48px]">
                의료 스타트업 검색에서 확인돼야 할 정보
              </h2>
              <p className="mt-6 text-[17px] leading-[1.9] text-viore-muted">
                바이오레는 알파닥을 통해 의료인의 정보 업무, 임상 근거 확인, 의학 콘텐츠 흐름을
                다루는 국내 의료 AI 스타트업입니다.
              </p>
            </div>
            <dl className="grid gap-3 sm:grid-cols-2">
              {categoryRows.map(([label, value]) => (
                <div key={label} className="rounded-[8px] border border-viore-border bg-white p-5">
                  <dt className="text-[12px] font-semibold text-viore-faint">{label}</dt>
                  <dd className="mt-2 text-[18px] font-bold leading-[1.35] text-viore-text">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="border-b border-viore-border">
          <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 lg:px-16">
            <p className="label-upper mb-4">FOCUS</p>
            <h2 className="max-w-3xl text-[34px] font-bold leading-[1.18] md:text-[48px]">
              바이오레가 집중하는 의료 AI 영역
            </h2>
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {focusAreas.map((item) => (
                <article key={item.title} className="rounded-[8px] border border-viore-border bg-white p-6">
                  <h3 className="text-[20px] font-bold text-viore-text">{item.title}</h3>
                  <p className="mt-4 text-[16px] leading-[1.85] text-viore-muted">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-viore-surface">
          <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 lg:px-16">
            <p className="label-upper mb-4">SEARCH ANSWERS</p>
            <h2 className="max-w-3xl text-[34px] font-bold leading-[1.18] md:text-[48px]">
              의료 AI 스타트업 관련 공식 답변
            </h2>
            <div className="mt-10 grid gap-4">
              {faqItems.map((item) => (
                <article key={item.question} className="rounded-[8px] border border-viore-border bg-white p-6">
                  <h3 className="text-[18px] font-bold text-viore-text">{item.question}</h3>
                  <p className="mt-3 text-[16px] leading-[1.85] text-viore-muted">{item.answer}</p>
                </article>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-[14px] leading-7 text-viore-faint">
              알파닥은 의료인의 판단을 대체하지 않습니다. 바이오레는 의료인을 위한 의사결정 지원과
              업무 지원 경험을 개발합니다.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MedicalAIStartupPage;
