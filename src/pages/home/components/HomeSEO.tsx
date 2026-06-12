import { useEffect } from 'react';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://vioreai.com';
const HOME_SCHEMA_ID = 'schema-home';

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: '주식회사 바이오레',
      alternateName: ['Viore Inc.', '바이오레', 'Viore'],
      url: SITE_URL,
      email: 'sj@vioreai.com',
      description:
        '의사의 하루를 바꾸는 메디컬AI 플랫폼. 알파닥(Alphadoc)으로 근거 기반 임상 AI, 의학 뉴스, 의사 커뮤니티를 제공합니다.',
      foundingDate: '2024',
      knowsAbout: [
        '의료 AI',
        '임상 의사결정 지원',
        'Evidence-Based Medicine',
        '의사 플랫폼',
      ],
      sameAs: ['https://alphadoc.ai'],
    },
    {
      '@type': 'WebSite',
      name: '바이오레 Viore',
      url: SITE_URL,
      description: '의사의 하루를 바꾸는 메디컬AI 플랫폼 바이오레 공식 사이트',
      inLanguage: 'ko-KR',
      publisher: {
        '@type': 'Organization',
        name: '주식회사 바이오레',
        url: SITE_URL,
      },
    },
    {
      '@type': 'SoftwareApplication',
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
        '@type': 'Organization',
        name: '주식회사 바이오레',
        url: SITE_URL,
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: '바이오레 Viore | 의사의 하루를 바꾸는 메디컬AI 플랫폼 · 알파닥',
      description:
        '바이오레(Viore Inc.)는 의사의 하루를 바꾸는 메디컬AI 플랫폼을 만드는 스타트업입니다. 알파닥(Alphadoc)으로 4.3분의 진료 시간을 더 의미 있게.',
      inLanguage: 'ko-KR',
      isPartOf: {
        '@type': 'WebSite',
        url: SITE_URL,
      },
      about: {
        '@type': 'Organization',
        name: '주식회사 바이오레',
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
            text: '바이오레(주식회사 바이오레, Viore Inc.)는 의사의 하루를 바꾸는 메디컬AI 플랫폼 알파닥(Alphadoc)을 개발하는 의료 AI 스타트업입니다. 한국 의사에게 주어진 평균 4.3분의 진료 시간을 더 의미 있게 만들기 위해 근거 기반 임상 AI, 의학 뉴스, 의사 커뮤니티를 하나의 공간에서 제공합니다.',
          },
        },
        {
          '@type': 'Question',
          name: '알파닥(Alphadoc)이란 무엇인가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '알파닥(Alphadoc)은 바이오레가 개발한 의사의 하루를 바꾸는 메디컬AI 플랫폼으로, 임상 질문 응답, 최신 의학 뉴스 큐레이션, 논문 검색, 의사 커뮤니티 기능을 제공합니다. alphadoc.ai에서 사용할 수 있습니다.',
          },
        },
        {
          '@type': 'Question',
          name: '메디컬AI 플랫폼이란 무엇인가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '메디컬AI 플랫폼은 근거 중심 의학(Evidence-Based Medicine) 원칙을 기반으로 임상 의사결정을 지원하는 AI 서비스입니다. 바이오레는 알파닥을 통해 의사가 최신 의학적 근거를 빠르게 찾고 적용할 수 있도록 돕습니다.',
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
