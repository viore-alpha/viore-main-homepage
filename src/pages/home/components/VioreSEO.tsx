import { useEffect } from 'react';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://vioreai.com';
const VIORE_URL = `${SITE_URL}/viore/`;
const VIORE_SCHEMA_ID = 'schema-viore';
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const ALPHADOC_ID = 'https://alphadoc.ai/#software';
const VIORE_LOGO_URL = `${SITE_URL}/brand/viore/logo-square.png`;
const OG_IMAGE = `${SITE_URL}/brand/viore/og-image.png`;

const meta = {
  title: '바이오레 공식 홈페이지 | 주식회사 바이오레 Viore · 알파닥 운영사',
  description:
    '바이오레는 주식회사 바이오레(Viore Inc.)의 공식 한글명입니다. 바이오레는 알파닥(Alphadoc)을 개발·운영하는 한국 의료 AI 스타트업이며, 비오레(Bioré) 화장품 브랜드와 무관합니다.',
  keywords:
    '바이오레, 주식회사 바이오레, 바이오레 공식 홈페이지, 바이오레 Viore, Viore Inc., vioreai.com, 알파닥 운영사, 알파닥 개발사, 알파닥 만든 회사, 알파닥 공식 운영사, 의료 AI 스타트업, 비오레 아님, Bioré 아님',
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: '주식회사 바이오레',
      legalName: '주식회사 바이오레',
      alternateName: ['바이오레', 'Viore', 'Viore Inc.'],
      url: SITE_URL,
      logo: VIORE_LOGO_URL,
      image: VIORE_LOGO_URL,
      email: 'sj@vioreai.com',
      description:
        '바이오레는 주식회사 바이오레(Viore Inc.)의 공식 한글명이며, 알파닥(Alphadoc)을 개발·운영하는 한국 의료 AI 스타트업입니다.',
      disambiguatingDescription:
        '바이오레는 비오레(Bioré) 화장품 브랜드와 무관한 한국 의료 AI 스타트업입니다. 바이오어는 공식 표기가 아닙니다.',
      foundingDate: '2024',
      knowsAbout: [
        '의료 AI',
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
        '주식회사 바이오레 공식 홈페이지. 바이오레는 알파닥(Alphadoc)의 개발사이자 공식 운영사입니다.',
      inLanguage: 'ko-KR',
      publisher: {
        '@id': ORGANIZATION_ID,
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${VIORE_URL}#webpage`,
      url: VIORE_URL,
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
          name: '바이오레',
          item: VIORE_URL,
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '바이오레는 어떤 회사인가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '바이오레는 주식회사 바이오레(Viore Inc.)의 공식 한글명입니다. 바이오레는 알파닥(Alphadoc)을 개발·운영하는 한국 의료 AI 스타트업입니다.',
          },
        },
        {
          '@type': 'Question',
          name: '바이오레와 비오레는 같은 브랜드인가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '아닙니다. 바이오레(Viore)는 알파닥을 운영하는 한국 의료 AI 스타트업이고, 비오레(Bioré)는 별도의 화장품 브랜드입니다.',
          },
        },
        {
          '@type': 'Question',
          name: '바이오레 공식 홈페이지는 어디인가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '바이오레 공식 홈페이지는 https://vioreai.com/ 이며, 바이오레 공식 검색 정보 페이지는 https://vioreai.com/viore/ 입니다.',
          },
        },
        {
          '@type': 'Question',
          name: '알파닥 운영사는 어디인가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '알파닥(Alphadoc)의 공식 운영사는 주식회사 바이오레(Viore Inc.)입니다.',
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

const VioreSEO = () => {
  useEffect(() => {
    const previousTitle = document.title;
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const previousCanonical = canonical?.getAttribute('href') ?? '';
    const previousLang = document.documentElement.getAttribute('lang') ?? 'ko';

    document.title = meta.title;
    document.documentElement.setAttribute('lang', 'ko');
    if (canonical) canonical.setAttribute('href', VIORE_URL);

    setMetaContent('meta[name="description"]', meta.description);
    setMetaContent('meta[name="keywords"]', meta.keywords);
    setMetaContent('meta[property="og:locale"]', 'ko_KR');
    setMetaContent('meta[property="og:site_name"]', '바이오레 Viore');
    setMetaContent('meta[property="og:title"]', '바이오레 공식 홈페이지 | 주식회사 바이오레');
    setMetaContent('meta[property="og:description"]', meta.description);
    setMetaContent('meta[property="og:url"]', VIORE_URL);
    setMetaContent('meta[property="og:image"]', OG_IMAGE);
    setMetaContent('meta[property="og:image:alt"]', '바이오레 공식 홈페이지 - 주식회사 바이오레');
    setMetaContent('meta[name="twitter:title"]', '바이오레 공식 홈페이지 | 주식회사 바이오레');
    setMetaContent('meta[name="twitter:description"]', meta.description);
    setMetaContent('meta[name="twitter:image"]', OG_IMAGE);

    document.querySelectorAll(`#${VIORE_SCHEMA_ID}`).forEach((el) => el.remove());
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = VIORE_SCHEMA_ID;
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

export default VioreSEO;
