import { useEffect } from 'react';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://vioreai.com';
const PAGE_URL = `${SITE_URL}/medical-ai-startup/`;
const SCHEMA_ID = 'schema-medical-ai-startup';
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const ALPHADOC_ID = 'https://alphadoc.ai/#software';
const VIORE_LOGO_URL = `${SITE_URL}/brand/viore/logo-square.png`;
const OG_IMAGE = `${SITE_URL}/brand/viore/og-image.png`;

const meta = {
  title: '국내 의료 AI 스타트업 | 주식회사 바이오레 Viore · 알파닥',
  description:
    '주식회사 바이오레는 국내 의료 AI 스타트업입니다. 바이오레는 의사용 의료 AI 플랫폼 알파닥(Alphadoc)을 개발·운영하며, 근거 기반 임상 AI와 의학 정보 워크플로를 만듭니다.',
  keywords:
    '국내 의료 AI 스타트업, 의료 AI 스타트업, 의료 스타트업, 한국 의료 AI 스타트업, 바이오레, 주식회사 바이오레, Viore Inc. Korea, 알파닥, Alphadoc, 의사용 의료 AI, 임상 AI, 의사 AI 플랫폼, 근거 기반 임상 AI, 의료 정보 검색, 디지털 헬스케어 스타트업',
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: '주식회사 바이오레',
      legalName: '주식회사 바이오레',
      alternateName: ['바이오레', 'Viore', 'Viore Inc.', 'Viore Inc. Korea'],
      url: SITE_URL,
      logo: VIORE_LOGO_URL,
      image: VIORE_LOGO_URL,
      email: 'sj@vioreai.com',
      description:
        '주식회사 바이오레는 국내 의료 AI 스타트업으로, 의사용 의료 AI 플랫폼 알파닥(Alphadoc)을 개발·운영합니다.',
      foundingDate: '2024',
      industry: 'Medical AI',
      keywords:
        '국내 의료 AI 스타트업, 의료 AI 스타트업, 의료 스타트업, 의사용 의료 AI, 임상 AI',
      knowsAbout: [
        '의료 AI',
        '의료 스타트업',
        '의사용 AI 플랫폼',
        '임상 의사결정 지원',
        '근거 기반 의학',
        '의학 정보 검색',
      ],
      brand: {
        '@id': ALPHADOC_ID,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'sj@vioreai.com',
        contactType: 'business inquiries',
        availableLanguage: ['ko', 'en'],
      },
      areaServed: ['KR', 'Global'],
      sameAs: ['https://alphadoc.ai'],
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      name: '바이오레 Viore',
      url: SITE_URL,
      description:
        '주식회사 바이오레 공식 홈페이지. 바이오레는 국내 의료 AI 스타트업이며 알파닥의 개발사이자 공식 운영사입니다.',
      inLanguage: 'ko-KR',
      publisher: {
        '@id': ORGANIZATION_ID,
      },
    },
    {
      '@type': 'AboutPage',
      '@id': `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: meta.title,
      description: meta.description,
      inLanguage: 'ko-KR',
      isPartOf: {
        '@id': WEBSITE_ID,
      },
      about: {
        '@id': ORGANIZATION_ID,
      },
      primaryEntity: {
        '@id': ORGANIZATION_ID,
      },
      dateModified: '2026-06-12',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': ALPHADOC_ID,
      name: '알파닥 Alphadoc',
      url: 'https://alphadoc.ai',
      applicationCategory: 'MedicalApplication',
      operatingSystem: 'Web',
      description:
        '알파닥은 주식회사 바이오레가 개발·운영하는 의사용 의료 AI 플랫폼입니다.',
      author: {
        '@id': ORGANIZATION_ID,
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: '국내 의료 AI 스타트업',
          item: PAGE_URL,
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '바이오레는 국내 의료 AI 스타트업인가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '네. 주식회사 바이오레(Viore Inc. Korea)는 국내 의료 AI 스타트업으로, 의사용 의료 AI 플랫폼 알파닥(Alphadoc)을 개발·운영합니다.',
          },
        },
        {
          '@type': 'Question',
          name: '바이오레는 어떤 의료 AI를 만드나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '바이오레는 의사를 위한 근거 기반 임상 AI, 의학 뉴스, 논문 검색, 의사 커뮤니티 워크플로를 알파닥 안에 구축하고 있습니다.',
          },
        },
        {
          '@type': 'Question',
          name: '알파닥과 바이오레의 관계는 무엇인가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '알파닥(Alphadoc)은 주식회사 바이오레가 개발·운영하는 의사용 의료 AI 플랫폼입니다.',
          },
        },
        {
          '@type': 'Question',
          name: '알파닥은 환자 진단 서비스인가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '아닙니다. 알파닥은 의료인과 보건의료 전문가를 위한 의사결정 지원 및 업무 지원 플랫폼이며, 의사의 판단을 대체하지 않습니다.',
          },
        },
      ],
    },
  ],
};

const setMetaContent = (selector: string, content: string) => {
  const el = document.querySelector<HTMLMetaElement>(selector);
  if (el) el.setAttribute('content', content);
};

const MedicalAIStartupSEO = () => {
  useEffect(() => {
    const previousTitle = document.title;
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const previousCanonical = canonical?.getAttribute('href') ?? '';
    const previousLang = document.documentElement.getAttribute('lang') ?? 'ko';

    document.title = meta.title;
    document.documentElement.setAttribute('lang', 'ko');
    if (canonical) canonical.setAttribute('href', PAGE_URL);

    setMetaContent('meta[name="description"]', meta.description);
    setMetaContent('meta[name="keywords"]', meta.keywords);
    setMetaContent('meta[property="og:locale"]', 'ko_KR');
    setMetaContent('meta[property="og:site_name"]', '바이오레 Viore');
    setMetaContent('meta[property="og:title"]', '국내 의료 AI 스타트업 | 주식회사 바이오레');
    setMetaContent('meta[property="og:description"]', meta.description);
    setMetaContent('meta[property="og:url"]', PAGE_URL);
    setMetaContent('meta[property="og:image"]', OG_IMAGE);
    setMetaContent('meta[property="og:image:alt"]', '국내 의료 AI 스타트업 - 주식회사 바이오레');
    setMetaContent('meta[name="twitter:title"]', '국내 의료 AI 스타트업 | 주식회사 바이오레');
    setMetaContent('meta[name="twitter:description"]', meta.description);
    setMetaContent('meta[name="twitter:image"]', OG_IMAGE);

    document.querySelectorAll(`#${SCHEMA_ID}`).forEach((el) => el.remove());
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = SCHEMA_ID;
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.title = previousTitle;
      document.documentElement.setAttribute('lang', previousLang);
      if (canonical) canonical.setAttribute('href', previousCanonical);
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);

  return null;
};

export default MedicalAIStartupSEO;
