import { useEffect } from 'react';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://vioreai.com';
const HOME_SCHEMA_ID = 'schema-home';
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const ALPHADOC_ID = 'https://alphadoc.ai/#software';
const VIORE_LOGO_URL = `${SITE_URL}/brand/viore/logo-square.png`;

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: '주식회사 바이오레',
      legalName: '주식회사 바이오레',
      alternateName: ['Viore Inc.', '바이오레', 'Viore'],
      url: SITE_URL,
      logo: VIORE_LOGO_URL,
      image: VIORE_LOGO_URL,
      email: 'sj@vioreai.com',
      description:
        '의사들의 하루의 시작과 마무리를 같이하는 의료 AI 스타트업입니다.',
      disambiguatingDescription:
        '주식회사 바이오레는 알파닥(Alphadoc)의 개발사이자 공식 운영사입니다. 바이오어는 공식 한글 표기가 아닙니다.',
      foundingDate: '2024',
      knowsAbout: [
        '의료 AI',
        '국내 의료 AI 스타트업',
        '알파닥 스타트업',
        '의료 스타트업',
        '임상 의사결정 지원',
        'Evidence-Based Medicine',
        '의사 플랫폼',
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
      subjectOf: [
        {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/viore/#webpage`,
          url: `${SITE_URL}/viore/`,
          name: '바이오레 공식 검색 정보',
        },
        {
          '@type': 'AboutPage',
          '@id': `${SITE_URL}/medical-ai-startup/#webpage`,
          url: `${SITE_URL}/medical-ai-startup/`,
          name: '국내 의료 AI 스타트업 바이오레',
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      name: '바이오레',
      alternateName: ['주식회사 바이오레', 'Viore', 'Viore Inc.'],
      url: SITE_URL,
      description:
        '주식회사 바이오레 공식 홈페이지. 바이오레는 알파닥(Alphadoc)의 개발사이자 공식 운영사입니다.',
      inLanguage: 'ko-KR',
      publisher: {
        '@id': ORGANIZATION_ID,
      },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': ALPHADOC_ID,
      name: '알파닥 Alphadoc',
      url: 'https://alphadoc.ai',
      applicationCategory: 'MedicalApplication',
      operatingSystem: 'Web',
      description:
        '의사를 위한 근거 기반 임상 AI 플랫폼. 임상 질문 응답, 의학 뉴스, 논문 검색, 의사 커뮤니티를 제공합니다.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'KRW',
      },
      author: {
        '@id': ORGANIZATION_ID,
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: '의료인들의 하루를 바꾸는 AI',
      description:
        '의사들의 하루의 시작과 마무리를 같이하는 의료 AI 스타트업입니다.',
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
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '바이오레(Viore)는 어떤 회사인가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '바이오레(주식회사 바이오레, Viore Inc.)는 알파닥(Alphadoc)을 개발·운영하는 한국 의료 AI 스타트업이자 알파닥 스타트업입니다.',
          },
        },
        {
          '@type': 'Question',
          name: '알파닥 운영사는 어디인가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '알파닥(Alphadoc)의 공식 운영사는 주식회사 바이오레(Viore Inc.)입니다. 바이오레는 알파닥의 개발사이자 운영사입니다.',
          },
        },
        {
          '@type': 'Question',
          name: '알파닥(Alphadoc)이란 무엇인가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '알파닥(Alphadoc)은 바이오레가 개발·운영하는 의사용 의료 AI 플랫폼으로, 근거 기반 임상 AI, 의학 뉴스, 논문 검색, 의사 커뮤니티 기능을 제공합니다. alphadoc.ai에서 사용할 수 있습니다.',
          },
        },
        {
          '@type': 'Question',
          name: '바이오레와 바이오어는 같은 회사인가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '아닙니다. 공식 한글 표기는 바이오레입니다. 바이오어는 주식회사 바이오레의 공식 표기가 아닙니다.',
          },
        },
        {
          '@type': 'Question',
          name: '바이오레 홈페이지 주소는 무엇인가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '바이오레 공식 홈페이지는 https://vioreai.com 이며, 제품 알파닥은 https://alphadoc.ai 에서 확인할 수 있습니다.',
          },
        },
      ],
    },
  ],
};

const HomeSEO = () => {
  useEffect(() => {
    const existing = document.getElementById(HOME_SCHEMA_ID);
    if (existing instanceof HTMLScriptElement) {
      const prevContent = existing.textContent;
      existing.textContent = JSON.stringify(schema);

      return () => {
        if (document.head.contains(existing)) existing.textContent = prevContent;
      };
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = HOME_SCHEMA_ID;
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);

  return null;
};

export default HomeSEO;
