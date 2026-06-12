import { useState, useEffect } from 'react';
import i18n from '@/i18n';
import HomePage from './page';
import GlobalSEO from './components/GlobalSEO';

const OG_IMAGE = 'https://vioreai.com/brand/viore/og-image.png';

const KO_META = {
  title: '의료인의 하루를 함께하는 동반자, 바이오레',
  description:
    '바이오레는 의료인이 필요로 하는 모든 기능을 새롭게 구현하고자 하는 의료 AI 스타트업입니다.',
  keywords:
    '주식회사 바이오레, 바이오레, 바이오레 홈페이지, Viore, Viore Inc., vioreai.com, 알파닥, 알파닥 스타트업, Alphadoc, 알파닥 운영사, 알파닥 공식 운영사, 알파닥 개발사, 알파닥 회사, 알파닥 만든 회사, 바이오레 알파닥, 국내 의료 AI 스타트업, 의료 AI 스타트업, 의료 스타트업, 한국 의료 AI 스타트업, 의사용 의료 AI, 임상 AI, 의사 AI 플랫폼, Clinical AI, 근거 기반 임상 AI, EBM AI, 의학 뉴스 AI, 의사 커뮤니티, 임상 의사결정 지원, 의학 논문 검색',
  ogLocale: 'ko_KR',
  ogSiteName: '바이오레',
  ogTitle: '의료인의 하루를 함께하는 동반자, 바이오레',
  ogDescription:
    '바이오레는 의료인이 필요로 하는 모든 기능을 새롭게 구현하고자 하는 의료 AI 스타트업입니다.',
  ogUrl: 'https://vioreai.com/',
  ogImage: OG_IMAGE,
  ogImageAlt: '바이오레 - 의료인의 하루를 함께하는 동반자',
  twitterTitle: '의료인의 하루를 함께하는 동반자, 바이오레',
  twitterDescription:
    '바이오레는 의료인이 필요로 하는 모든 기능을 새롭게 구현하고자 하는 의료 AI 스타트업입니다.',
  twitterImage: OG_IMAGE,
};

const EN_META = {
  title: '의료인의 하루를 함께하는 동반자, 바이오레',
  description:
    '바이오레는 의료인이 필요로 하는 모든 기능을 새롭게 구현하고자 하는 의료 AI 스타트업입니다.',
  keywords:
    'Viore, Viore Inc., vioreai.com, Alphadoc, Alphadoc operator, official operator of Alphadoc, developer of Alphadoc, Medical AI Platform, Clinical AI, Evidence-Based Medicine, EBM AI, Physician AI, Healthcare AI, Clinical Decision Support, Medical News AI, Physician Community, Medical AI startup, Doctor AI app, alphadoc.ai',
  ogLocale: 'en_US',
  ogSiteName: '바이오레',
  ogTitle: '의료인의 하루를 함께하는 동반자, 바이오레',
  ogDescription:
    '바이오레는 의료인이 필요로 하는 모든 기능을 새롭게 구현하고자 하는 의료 AI 스타트업입니다.',
  ogUrl: 'https://vioreai.com/global/',
  ogImage: OG_IMAGE,
  ogImageAlt: '바이오레 - 의료인의 하루를 함께하는 동반자',
  twitterTitle: '의료인의 하루를 함께하는 동반자, 바이오레',
  twitterDescription:
    '바이오레는 의료인이 필요로 하는 모든 기능을 새롭게 구현하고자 하는 의료 AI 스타트업입니다.',
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
