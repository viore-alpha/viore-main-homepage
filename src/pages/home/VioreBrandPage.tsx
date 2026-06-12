import { useEffect } from 'react';
import i18n from '@/i18n';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import VioreSEO from './components/VioreSEO';

const identityRows = [
  ['공식 한글명', '바이오레'],
  ['법인명', '주식회사 바이오레'],
  ['영문 표기', 'Viore Inc.'],
  ['공식 도메인', 'vioreai.com'],
  ['제품', '알파닥 Alphadoc'],
  ['역할', '알파닥 개발사 및 공식 운영사'],
];

const searchQuestions = [
  {
    question: '바이오레는 무엇인가요?',
    answer:
      '바이오레는 주식회사 바이오레(Viore Inc.)의 공식 한글명입니다. 바이오레는 의사용 의료 AI 플랫폼 알파닥(Alphadoc)을 개발·운영합니다.',
  },
  {
    question: '바이오레와 비오레는 같은 브랜드인가요?',
    answer:
      '아닙니다. 바이오레(Viore)는 한국 의료 AI 스타트업이고, 비오레(Bioré)는 별도의 화장품 브랜드입니다.',
  },
  {
    question: '알파닥 운영사는 어디인가요?',
    answer:
      '알파닥(Alphadoc)의 공식 운영사는 주식회사 바이오레(Viore Inc.)입니다.',
  },
];

const VioreBrandPage = () => {
  useEffect(() => {
    i18n.changeLanguage('ko');
  }, []);

  return (
    <div className="min-h-screen text-viore-text">
      <VioreSEO />
      <Navbar />
      <main>
        <section className="relative min-h-[74vh] overflow-hidden border-b border-viore-border">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 68% 54% at 48% 28%, rgba(14,110,110,0.08) 0%, rgba(14,110,110,0.02) 42%, transparent 72%)',
            }}
          />
          <div className="relative z-10 mx-auto flex min-h-[74vh] max-w-[1200px] flex-col justify-center px-6 pb-16 pt-28 md:px-10 lg:px-16">
            <img
              src="/brand/viore/logotype.png"
              alt="Viore"
              className="mb-10 h-9 w-fit object-contain"
            />
            <p className="label-upper mb-5">OFFICIAL BRAND INFORMATION</p>
            <h1 className="max-w-4xl text-[54px] font-bold leading-[1.04] text-viore-text md:text-[86px]">
              바이오레
            </h1>
            <p className="mt-8 max-w-2xl text-[20px] leading-[1.8] text-viore-muted md:text-[24px]">
              바이오레는 주식회사 바이오레(Viore Inc.)의 공식 한글명입니다.
              바이오레는 알파닥(Alphadoc)을 개발·운영하는 한국 의료 AI 스타트업입니다.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://alphadoc.ai"
                className="inline-flex items-center justify-center gap-2 rounded-[14px] bg-viore-teal px-6 py-3 text-[14px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-viore-teal-mid"
              >
                알파닥 보기
                <i className="ri-arrow-right-line" />
              </a>
              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-[14px] border border-viore-border-strong bg-white/70 px-6 py-3 text-[14px] font-semibold text-viore-muted transition-all duration-300 hover:-translate-y-0.5 hover:text-viore-text"
              >
                홈페이지로 이동
              </a>
            </div>
          </div>
        </section>

        <section className="border-b border-viore-border bg-white/38">
          <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-20 md:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:px-16">
            <div>
              <p className="label-upper mb-4">ENTITY</p>
              <h2 className="text-[34px] font-bold leading-[1.18] md:text-[48px]">
                검색엔진이 알아야 할 공식 표기
              </h2>
              <p className="mt-6 text-[17px] leading-[1.9] text-viore-muted">
                바이오레는 의료 AI 회사의 이름입니다. 제품명은 알파닥이며, 공식 웹사이트는
                vioreai.com입니다.
              </p>
            </div>
            <dl className="grid gap-3 sm:grid-cols-2">
              {identityRows.map(([label, value]) => (
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
            <p className="label-upper mb-4">DISAMBIGUATION</p>
            <div className="max-w-3xl">
              <h2 className="text-[34px] font-bold leading-[1.18] md:text-[48px]">
                바이오레는 비오레(Bioré)와 다른 이름입니다.
              </h2>
              <p className="mt-6 text-[18px] leading-[1.9] text-viore-muted">
                바이오레(Viore)는 알파닥을 운영하는 한국 의료 AI 스타트업입니다. 비오레(Bioré)는
                별도의 화장품 브랜드이며, 바이오레와 관계가 없습니다. 또한 바이오어는 바이오레의
                공식 표기가 아닙니다.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-viore-surface">
          <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 lg:px-16">
            <p className="label-upper mb-4">SEARCH ANSWERS</p>
            <h2 className="max-w-3xl text-[34px] font-bold leading-[1.18] md:text-[48px]">
              자주 검색되는 질문의 공식 답변
            </h2>
            <div className="mt-10 grid gap-4">
              {searchQuestions.map((item) => (
                <article key={item.question} className="rounded-[8px] border border-viore-border bg-white p-6">
                  <h3 className="text-[18px] font-bold text-viore-text">{item.question}</h3>
                  <p className="mt-3 text-[16px] leading-[1.85] text-viore-muted">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default VioreBrandPage;
