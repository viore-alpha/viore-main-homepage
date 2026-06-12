import { useState, useEffect } from 'react';
import i18n from '@/i18n';
import HomePage from './page';
import GlobalSEO from './components/GlobalSEO';

const SQ_LOGO =
  'https://storage.readdy-site.link/project_files/f0121b54-b4dd-49ef-9b9a-70a9b6263ce6/91ded2f8-1398-49f9-8863-1016633642aa_viore-eng-logotype---.png?v=1591502e1944a7c7ff916e99d0b5260b';

const WIDE_LOGO =
  'https://storage.readdy-site.link/project_files/f0121b54-b4dd-49ef-9b9a-70a9b6263ce6/cdecc015-3612-48e5-96cf-4d67c12a1a43_viore-eng-logotype.png?v=c244b85742c4ab34af42521986a4c558';

const KO_META = {
  title: '바이오레 Viore | 의사의 하루를 바꾸는 메디컬AI 플랫폼 · 알파닥',
  description:
    '바이오레(Viore Inc.)는 의사의 하루를 바꾸는 메디컬AI 플랫폼을 만드는 스타트업입니다. 알파닥(Alphadoc)으로 4.3분의 진료 시간을 더 의미 있게 — 근거 기반 임상 AI, 의학 뉴스, 의사 커뮤니티를 하나의 공간에서.',
  keywords:
    '바이오레, Viore, Viore Inc., 알파닥, Alphadoc, 메디컬AI 플랫폼, 의사 메디컬AI, 의료 AI, 임상 AI, 의사 AI 플랫폼, Clinical AI, 의사용 AI, 근거 기반 임상 AI, EBM AI, 의학 뉴스 AI, 의사 커뮤니티, 임상 의사결정 지원, 의료 스타트업, 의사 앱, 의학 논문 검색',
  ogLocale: 'ko_KR',
  ogSiteName: '바이오레 Viore',
  ogTitle: '바이오레 Viore | 의사의 하루를 바꾸는 메디컬AI 플랫폼',
  ogDescription:
    '의사의 하루를 바꾸는 메디컬AI 플랫폼 바이오레. 한국 의사에게 허락된 시간은 단 4.3분 — 알파닥으로 근거 기반 임상 AI, 의학 뉴스, 의사 커뮤니티를 하나의 공간에서.',
  ogUrl: 'https://vioreai.com/',
  ogImage: SQ_LOGO,
  ogImageAlt: '바이오레 Viore — 의사의 하루를 바꾸는 메디컬AI 플랫폼',
  twitterTitle: '바이오레 Viore | 의사의 하루를 바꾸는 메디컬AI 플랫폼',
  twitterDescription:
    '의사의 하루를 바꾸는 메디컬AI 플랫폼 바이오레. 알파닥으로 4.3분의 진료 시간을 더 의미 있게 — 근거 기반 임상 AI, 의학 뉴스, 의사 커뮤니티.',
  twitterImage: SQ_LOGO,
};

const EN_META = {
  title: 'Viore | Medical AI Platform That Transforms Physicians\' Day · Alphadoc',
  description:
    'Viore (Viore Inc.) builds Alphadoc — the evidence-based clinical AI platform designed for physicians. Smarter clinical decisions, curated medical news, and physician community in one place.',
  keywords:
    'Viore, Viore Inc., Alphadoc, Medical AI Platform, Clinical AI, Evidence-Based Medicine, EBM AI, Physician AI, Healthcare AI, Clinical Decision Support, Medical News AI, Physician Community, Medical AI startup, Doctor AI app, alphadoc.ai',
  ogLocale: 'en_US',
  ogSiteName: 'Viore',
  ogTitle: 'Viore | Medical AI Platform That Transforms Physicians\' Day',
  ogDescription:
    'Viore builds Alphadoc — the evidence-based clinical AI platform designed for physicians. Smarter decisions, meaningful care, all in one place.',
  ogUrl: 'https://vioreai.com/global/',
  ogImage: WIDE_LOGO,
  ogImageAlt: 'Viore — Medical AI Platform for Physicians · Alphadoc',
  twitterTitle: 'Viore | Medical AI Platform That Transforms Physicians\' Day',
  twitterDescription:
    'Viore builds Alphadoc — clinical AI, medical news, and physician community to make every 4.3 minutes count.',
  twitterImage: WIDE_LOGO,
};

type MetaMap = typeof KO_META;

const setMeta = (meta: MetaMap) => {
  document.title = meta.title;

  const set = (selector: string, attr: string, value: string) => {
    const el = document.querySelector<HTMLMetaElement>(selector);
    if (el) el.setAttribute(attr, value);
  };

  // Core meta tags — critical for Google search snippets
  set('meta[name="description"]', 'content', meta.description);
  set('meta[name="keywords"]', 'content', meta.keywords);

  // Open Graph
  set('meta[property="og:locale"]', 'content', meta.ogLocale);
  set('meta[property="og:site_name"]', 'content', meta.ogSiteName);
  set('meta[property="og:title"]', 'content', meta.ogTitle);
  set('meta[property="og:description"]', 'content', meta.ogDescription);
  set('meta[property="og:url"]', 'content', meta.ogUrl);
  set('meta[property="og:image"]', 'content', meta.ogImage);
  set('meta[property="og:image:alt"]', 'content', meta.ogImageAlt);

  // Twitter / X
  set('meta[name="twitter:title"]', 'content', meta.twitterTitle);
  set('meta[name="twitter:description"]', 'content', meta.twitterDescription);
  set('meta[name="twitter:image"]', 'content', meta.twitterImage);
};

/**
 * /global route — forces English language + English OG meta tags.
 * Restores Korean on unmount (navigating away).
 */
const GlobalPage = () => {
  const [ready, setReady] = useState(i18n.language === 'en');

  useEffect(() => {
    setMeta(EN_META);
    i18n.changeLanguage('en').then(() => setReady(true));

    return () => {
      setMeta(KO_META);
      i18n.changeLanguage('ko');
    };
  }, []);

  if (!ready) return null;
  return (
    <>
      <GlobalSEO />
      <HomePage />
    </>
  );
};

export default GlobalPage;
