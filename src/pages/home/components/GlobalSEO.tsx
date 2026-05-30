import { useEffect } from 'react';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://vioreai.com';
const GLOBAL_URL = `${SITE_URL}/global`;

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Viore Inc.',
    alternateName: ['Viore', '바이오레', '주식회사 바이오레'],
    url: SITE_URL,
    email: 'sj@vioreai.com',
    description:
      'Viore builds Alphadoc — the evidence-based clinical AI platform designed for physicians. Smarter clinical decisions, curated medical news, and physician community in one place.',
    foundingDate: '2024',
    knowsAbout: [
      'Medical AI',
      'Clinical Decision Support',
      'Evidence-Based Medicine',
      'Physician Platform',
      'Healthcare Technology',
    ],
    sameAs: ['https://alphadoc.ai'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Viore',
    url: SITE_URL,
    description:
      'Viore — the medical AI platform that transforms physicians\u2019 day. Powered by Alphadoc.',
    inLanguage: 'en-US',
    publisher: {
      '@type': 'Organization',
      name: 'Viore Inc.',
      url: SITE_URL,
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
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
      '@type': 'Organization',
      name: 'Viore Inc.',
      url: SITE_URL,
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${GLOBAL_URL}#webpage`,
    url: GLOBAL_URL,
    name: 'Viore | Medical AI Platform That Transforms Physicians\u2019 Day \u00b7 Alphadoc',
    description:
      'Viore builds Alphadoc \u2014 the evidence-based clinical AI platform designed for physicians. Smarter decisions, meaningful care, all in one place.',
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      url: SITE_URL,
    },
    about: {
      '@type': 'Organization',
      name: 'Viore Inc.',
    },
    dateModified: '2026-05-16',
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
          text: 'Viore (Viore Inc.) is a medical AI company building Alphadoc \u2014 an evidence-based clinical AI platform designed to transform physicians\u2019 daily practice. We help doctors make smarter clinical decisions within the tight time constraints of modern medicine.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Alphadoc?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Alphadoc is a medical AI platform developed by Viore, offering evidence-based clinical Q&A, curated medical news, literature search, and a physician community \u2014 all in one place. Available at alphadoc.ai.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is a Medical AI Platform?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A medical AI platform uses Evidence-Based Medicine (EBM) principles to support clinical decision-making. Viore\u2019s Alphadoc helps physicians quickly find and apply the latest medical evidence, improving care quality within limited consultation time.',
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
      // Remove Korean schemas injected by HomeSEO
      document.querySelectorAll('[id^="schema-home-"]').forEach((el) => el.remove());

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