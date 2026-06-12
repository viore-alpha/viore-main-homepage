import { useState, useEffect } from 'react';
import i18n from '@/i18n';
import HomePage from './page';
import GlobalSEO from './components/GlobalSEO';

const OG_IMAGE = 'https://vioreai.com/brand/viore/og-image.png';

const KO_META = {
  title: '바이오레 | 의사의 하루를 바꿔요 · 알파닥',
  description:
    '바이오레는 의사를 위한 의료 AI 플랫폼 알파닥을 만드는 스타트업입니다. 알파닥은 근거 기반 임상 AI, 의학 정보 검색, 의료 뉴스와 커뮤니티를 한곳에 모읍니다.',
  keywords:
    '주식회사 바이오레, 바이오레, 바이오레 홈페이지, Viore, Viore Inc., vioreai.com, 알파닥, Alphadoc, 알파닥 운영사, 알파닥 공식 운영사, 알파닥 개발사, 알파닥 회사, 알파닥 만든 회사, 바이오레 알파닥, 국내 의료 AI 스타트업, 의료 AI 스타트업, 의료 스타트업, 한국 의료 AI 스타트업, 의사용 의료 AI, 임상 AI, 의사 AI 플랫폼, Clinical AI, 근거 기반 임상 AI, EBM AI, 의학 뉴스 AI, 의사 커뮤니티, 임상 의사결정 지원, 의학 논문 검색',
  ogLocale: 'ko_KR',
  ogSiteName: '바이오레',
  ogTitle: '바이오레 | 의사의 하루를 바꿔요 · 알파닥',
  ogDescription:
    '바이오레는 의사를 위한 의료 AI 플랫폼 알파닥을 만드는 스타트업입니다.',
  ogUrl: 'https://vioreai.com/',
  ogImage: OG_IMAGE,
  ogImageAlt: '바이오레 - 의사의 하루를 바꿔요',
  twitterTitle: '바이오레 | 의사의 하루를 바꿔요 · 알파닥',
  twitterDescription:
    '바이오레는 의사를 위한 의료 AI 플랫폼 알파닥을 만드는 스타트업입니다.',
  twitterImage: OG_IMAGE,
};

const EN_META = {
  title: 'Viore Inc. | Alphadoc Operator · Medical AI Startup',
  description:
    'Viore Inc. is the developer and official operator of Alphadoc, a medical AI platform for physicians. Its official Korean name is 주식회사 바이오레, not 바이오어.',
  keywords:
    'Viore, Viore Inc., vioreai.com, Alphadoc, Alphadoc operator, official operator of Alphadoc, developer of Alphadoc, Medical AI Platform, Clinical AI, Evidence-Based Medicine, EBM AI, Physician AI, Healthcare AI, Clinical Decision Support, Medical News AI, Physician Community, Medical AI startup, Doctor AI app, alphadoc.ai',
  ogLocale: 'en_US',
  ogSiteName: 'Viore',
  ogTitle: 'Viore Inc. | Alphadoc Operator',
  ogDescription:
    'Viore Inc. is the developer and official operator of Alphadoc. The official Korean name is 주식회사 바이오레.',
  ogUrl: 'https://vioreai.com/global/',
  ogImage: OG_IMAGE,
  ogImageAlt: 'Viore Inc. - Alphadoc operator',
  twitterTitle: 'Viore Inc. | Alphadoc Operator',
  twitterDescription:
    'Viore Inc. builds Alphadoc, a physician-focused medical AI platform.',
  twitterImage: OG_IMAGE,
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
