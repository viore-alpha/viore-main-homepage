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
        '바이오레는 의료인이 필요로 하는 모든 기능을 새롭게 구현하고자 하는 의료 AI 스타트업입니다.',
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
      name: '의료인의 하루를 함께하는 동반자, 바이오레',
      description:
        '바이오레는 의료인이 필요로 하는 모든 기능을 새롭게 구현하고자 하는 의료 AI 스타트업입니다.',
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
      dateModified: '2026-06-18',
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
