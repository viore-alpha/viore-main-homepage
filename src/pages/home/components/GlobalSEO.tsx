import { useEffect } from 'react';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://vioreai.com';
const GLOBAL_URL = `${SITE_URL}/global/`;
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const ALPHADOC_ID = 'https://alphadoc.ai/#software';
const VIORE_LOGO_URL = `${SITE_URL}/brand/viore/logo-square.png`;

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: 'Viore Inc.',
    legalName: '주식회사 바이오레',
    alternateName: ['Viore', 'Viore Inc.', '바이오레', '주식회사 바이오레'],
    url: SITE_URL,
    logo: VIORE_LOGO_URL,
    image: VIORE_LOGO_URL,
    email: 'sj@vioreai.com',
    description:
      '바이오레는 의료인이 필요로 하는 모든 기능을 새롭게 구현하고자 하는 의료 AI 스타트업입니다.',
    disambiguatingDescription:
      'Viore Inc. is legally 주식회사 바이오레. 바이오어 is not the official Korean spelling.',
    foundingDate: '2024',
    knowsAbout: [
      'Medical AI',
      'Clinical Decision Support',
      'Evidence-Based Medicine',
      'Physician Platform',
      'Healthcare Technology',
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
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: '바이오레',
    alternateName: ['Viore', 'Viore Inc.', '주식회사 바이오레'],
    url: SITE_URL,
    description:
      '바이오레는 의료인이 필요로 하는 모든 기능을 새롭게 구현하고자 하는 의료 AI 스타트업입니다.',
    inLanguage: 'en-US',
    publisher: {
      '@id': ORGANIZATION_ID,
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': ALPHADOC_ID,
    name: 'Alphadoc',
    url: 'https://alphadoc.ai',
    applicationCategory: 'MedicalApplication',
    operatingSystem: 'Web',
    description:
      'Alphadoc is the evidence-based clinical AI platform built for physicians — clinical Q&A, medical news, literature search, and physician community.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@id': ORGANIZATION_ID,
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${GLOBAL_URL}#webpage`,
    url: GLOBAL_URL,
    name: '의료인의 하루를 함께하는 동반자, 바이오레',
    description:
      '바이오레는 의료인이 필요로 하는 모든 기능을 새롭게 구현하고자 하는 의료 AI 스타트업입니다.',
    inLanguage: 'en-US',
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
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Viore?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Viore Inc. is the developer and official operator of Alphadoc, a medical AI platform for physicians.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who operates Alphadoc?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Alphadoc is officially operated by Viore Inc., legally 주식회사 바이오레.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Alphadoc?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Alphadoc is a medical AI platform for physicians, offering evidence-based clinical AI, medical news, literature search, and physician community. Available at alphadoc.ai.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the correct Korean spelling of Viore?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The official Korean spelling is 바이오레. 바이오어 is not used by Viore Inc.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the official Viore website?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Viore’s official website is https://vioreai.com, and Alphadoc is available at https://alphadoc.ai.',
        },
      },
    ],
  },
];

const GlobalSEO = () => {
  useEffect(() => {
    // Update canonical link for /global
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const prevCanonical = canonical?.getAttribute('href') ?? '';
    if (canonical) canonical.setAttribute('href', GLOBAL_URL);

    // Update lang attribute
    const prevLang = document.documentElement.getAttribute('lang') ?? 'ko';
    document.documentElement.setAttribute('lang', 'en');

    const injected: HTMLScriptElement[] = [];

    // Use a microtask to run after HomeSEO's useEffect has injected Korean schemas
    const timer = setTimeout(() => {
      // Remove static/home schemas before injecting route-specific English schemas
      document.querySelectorAll('[id^="schema-home"], #schema-global').forEach((el) => el.remove());

      // Inject English schemas
      schemas.forEach((schema, i) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = `schema-global-${i}`;
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
        injected.push(script);
      });
    }, 0);

    return () => {
      clearTimeout(timer);
      // Restore canonical
      if (canonical) canonical.setAttribute('href', prevCanonical);
      // Restore lang
      document.documentElement.setAttribute('lang', prevLang);
      // Remove injected English schemas
      injected.forEach((el) => {
        if (document.head.contains(el)) document.head.removeChild(el);
      });
    };
  }, []);

  return null;
};

export default GlobalSEO;
