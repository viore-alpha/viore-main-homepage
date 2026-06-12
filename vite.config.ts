import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import AutoImport from "unplugin-auto-import/vite";

const base = process.env.BASE_PATH || "/";
const isPreview = process.env.IS_PREVIEW ? true : false;
const globalRouteUrl = "https://vioreai.com/global/";
const vioreRouteUrl = "https://vioreai.com/viore/";
const medicalAiRouteUrl = "https://vioreai.com/medical-ai-startup/";
const globalRouteImage = "https://vioreai.com/brand/viore/og-image.png";
const vioreLogoImage = "https://vioreai.com/brand/viore/logo-square.png";
const organizationId = "https://vioreai.com/#organization";
const websiteId = "https://vioreai.com/#website";
const alphadocId = "https://alphadoc.ai/#software";

const globalRouteMeta = {
  title: "Viore Inc. Korea | Alphadoc Operator - Medical AI Startup",
  description:
    "Viore Inc. Korea is the developer and official operator of Alphadoc, a medical AI platform for physicians. Its official Korean name is 주식회사 바이오레, not 바이오어.",
  keywords:
    "Viore, Viore Inc., Viore Inc. Korea, Viore Korea, vioreai.com, Alphadoc, Alphadoc operator, official operator of Alphadoc, developer of Alphadoc, Medical AI Platform, Clinical AI, Evidence-Based Medicine, EBM AI, Physician AI, Healthcare AI, Clinical Decision Support, Medical News AI, Physician Community, Medical AI startup, Doctor AI app, alphadoc.ai",
  ogTitle: "Viore Inc. Korea | Alphadoc Operator",
  ogDescription:
    "Viore Inc. Korea is the developer and official operator of Alphadoc. The official Korean name is 주식회사 바이오레.",
  ogImageAlt: "Viore Inc. Korea - Alphadoc operator",
  twitterDescription:
    "Viore Inc. Korea builds Alphadoc, a physician-focused medical AI platform.",
};

const vioreRouteMeta = {
  title: "바이오레 공식 홈페이지 | 주식회사 바이오레 Viore · 알파닥 운영사",
  description:
    "바이오레는 주식회사 바이오레(Viore Inc. Korea)의 공식 한글명입니다. 바이오레는 알파닥(Alphadoc)을 개발·운영하는 한국 의료 AI 스타트업이며, 비오레(Bioré) 화장품 브랜드와 무관합니다.",
  keywords:
    "바이오레, 주식회사 바이오레, 바이오레 공식 홈페이지, 바이오레 Viore, Viore Inc. Korea, Viore Inc., vioreai.com, 알파닥 운영사, 알파닥 개발사, 알파닥 만든 회사, 알파닥 공식 운영사, 의료 AI 스타트업, 비오레 아님, Bioré 아님",
  ogTitle: "바이오레 공식 홈페이지 | 주식회사 바이오레",
  ogDescription:
    "바이오레는 알파닥을 개발·운영하는 한국 의료 AI 스타트업입니다. 비오레(Bioré) 화장품 브랜드와 무관합니다.",
  ogImageAlt: "바이오레 공식 홈페이지 - 주식회사 바이오레",
  twitterDescription:
    "바이오레는 주식회사 바이오레(Viore Inc. Korea)의 공식 한글명이며 알파닥 운영사입니다.",
};

const medicalAiRouteMeta = {
  title: "국내 의료 AI 스타트업 | 주식회사 바이오레 Viore · 알파닥",
  description:
    "주식회사 바이오레는 국내 의료 AI 스타트업입니다. 바이오레는 의사용 의료 AI 플랫폼 알파닥(Alphadoc)을 개발·운영하며, 근거 기반 임상 AI와 의학 정보 워크플로를 만듭니다.",
  keywords:
    "국내 의료 AI 스타트업, 의료 AI 스타트업, 의료 스타트업, 한국 의료 AI 스타트업, 바이오레, 주식회사 바이오레, Viore Inc. Korea, 알파닥, Alphadoc, 의사용 의료 AI, 임상 AI, 의사 AI 플랫폼, 근거 기반 임상 AI, 의료 정보 검색, 디지털 헬스케어 스타트업",
  ogTitle: "국내 의료 AI 스타트업 | 주식회사 바이오레",
  ogDescription:
    "주식회사 바이오레는 의사용 의료 AI 플랫폼 알파닥을 개발·운영하는 국내 의료 AI 스타트업입니다.",
  ogImageAlt: "국내 의료 AI 스타트업 - 주식회사 바이오레",
  twitterDescription:
    "바이오레는 알파닥을 개발·운영하는 국내 의료 AI 스타트업입니다.",
};

const globalRouteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "Viore Inc. Korea",
      legalName: "주식회사 바이오레",
      alternateName: ["Viore", "Viore Inc.", "Viore Inc. Korea", "Viore Korea", "바이오레", "주식회사 바이오레"],
      url: "https://vioreai.com",
      logo: vioreLogoImage,
      image: vioreLogoImage,
      email: "sj@vioreai.com",
      description:
        "Viore Inc. Korea is the developer and official operator of Alphadoc, a medical AI platform for physicians.",
      disambiguatingDescription:
        "Viore Inc. Korea is legally 주식회사 바이오레. 바이오어 is not the official Korean spelling.",
      foundingDate: "2024",
      knowsAbout: [
        "Medical AI",
        "Clinical Decision Support",
        "Evidence-Based Medicine",
        "Physician Platform",
        "Healthcare Technology",
      ],
      brand: {
        "@id": alphadocId,
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "sj@vioreai.com",
        contactType: "business inquiries",
        availableLanguage: ["ko", "en"],
      },
      areaServed: ["KR", "Global"],
      sameAs: ["https://alphadoc.ai"],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: "Viore",
      url: "https://vioreai.com",
      description: "Viore Inc. Korea official website. Viore is the developer and official operator of Alphadoc.",
      inLanguage: "en-US",
      publisher: {
        "@id": organizationId,
      },
    },
    {
      "@type": "WebPage",
      "@id": `${globalRouteUrl}#webpage`,
      url: globalRouteUrl,
      name: globalRouteMeta.title,
      description: globalRouteMeta.description,
      inLanguage: "en-US",
      dateModified: "2026-06-12",
      isPartOf: {
        "@id": websiteId,
      },
      about: {
        "@id": organizationId,
      },
      primaryEntity: {
        "@id": organizationId,
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": alphadocId,
      name: "Alphadoc",
      url: "https://alphadoc.ai",
      applicationCategory: "MedicalApplication",
      operatingSystem: "Web",
      description:
        "Alphadoc is a physician-focused medical AI platform operated by Viore Inc. Korea, with evidence-based clinical AI, medical news, literature search, and physician community.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: {
        "@id": organizationId,
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Viore?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Viore Inc. Korea is the developer and official operator of Alphadoc, a medical AI platform for physicians.",
          },
        },
        {
          "@type": "Question",
          name: "Who operates Alphadoc?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Alphadoc is officially operated by Viore Inc. Korea, legally 주식회사 바이오레.",
          },
        },
        {
          "@type": "Question",
          name: "What is Alphadoc?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Alphadoc is a medical AI platform for physicians, offering evidence-based clinical AI, medical news, literature search, and physician community.",
          },
        },
        {
          "@type": "Question",
          name: "What is the correct Korean spelling of Viore?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The official Korean spelling is 바이오레. 바이오어 is not the official spelling of Viore Inc. Korea.",
          },
        },
        {
          "@type": "Question",
          name: "What is the official Viore website?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Viore's official website is https://vioreai.com, and Alphadoc is available at https://alphadoc.ai.",
          },
        },
      ],
    },
  ],
};

const vioreRouteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "주식회사 바이오레",
      legalName: "주식회사 바이오레",
      alternateName: ["바이오레", "Viore", "Viore Inc.", "Viore Inc. Korea"],
      url: "https://vioreai.com",
      logo: vioreLogoImage,
      image: vioreLogoImage,
      email: "sj@vioreai.com",
      description:
        "바이오레는 주식회사 바이오레(Viore Inc. Korea)의 공식 한글명이며, 알파닥(Alphadoc)을 개발·운영하는 한국 의료 AI 스타트업입니다.",
      disambiguatingDescription:
        "바이오레는 비오레(Bioré) 화장품 브랜드와 무관한 한국 의료 AI 스타트업입니다. 바이오어는 공식 표기가 아닙니다.",
      foundingDate: "2024",
      knowsAbout: [
        "의료 AI",
        "의사용 AI 플랫폼",
        "임상 의사결정 지원",
        "근거 기반 의학",
        "의학 정보 검색",
      ],
      brand: {
        "@id": alphadocId,
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "sj@vioreai.com",
        contactType: "business inquiries",
        availableLanguage: ["ko", "en"],
      },
      areaServed: ["KR", "Global"],
      sameAs: ["https://alphadoc.ai"],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: "바이오레 Viore",
      url: "https://vioreai.com",
      description:
        "주식회사 바이오레 공식 홈페이지. 바이오레는 알파닥(Alphadoc)의 개발사이자 공식 운영사입니다.",
      inLanguage: "ko-KR",
      publisher: {
        "@id": organizationId,
      },
    },
    {
      "@type": "WebPage",
      "@id": `${vioreRouteUrl}#webpage`,
      url: vioreRouteUrl,
      name: vioreRouteMeta.title,
      description: vioreRouteMeta.description,
      inLanguage: "ko-KR",
      dateModified: "2026-06-12",
      isPartOf: {
        "@id": websiteId,
      },
      about: {
        "@id": organizationId,
      },
      primaryEntity: {
        "@id": organizationId,
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": alphadocId,
      name: "알파닥 Alphadoc",
      url: "https://alphadoc.ai",
      applicationCategory: "MedicalApplication",
      operatingSystem: "Web",
      description:
        "알파닥은 주식회사 바이오레가 개발·운영하는 의사용 의료 AI 플랫폼입니다.",
      author: {
        "@id": organizationId,
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "바이오레",
          item: vioreRouteUrl,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "바이오레는 어떤 회사인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "바이오레는 주식회사 바이오레(Viore Inc. Korea)의 공식 한글명입니다. 바이오레는 알파닥(Alphadoc)을 개발·운영하는 한국 의료 AI 스타트업입니다.",
          },
        },
        {
          "@type": "Question",
          name: "바이오레와 비오레는 같은 브랜드인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "아닙니다. 바이오레(Viore)는 알파닥을 운영하는 한국 의료 AI 스타트업이고, 비오레(Bioré)는 별도의 화장품 브랜드입니다.",
          },
        },
        {
          "@type": "Question",
          name: "바이오레 공식 홈페이지는 어디인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "바이오레 공식 홈페이지는 https://vioreai.com/ 이며, 바이오레 공식 검색 정보 페이지는 https://vioreai.com/viore/ 입니다.",
          },
        },
        {
          "@type": "Question",
          name: "알파닥 운영사는 어디인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "알파닥(Alphadoc)의 공식 운영사는 주식회사 바이오레(Viore Inc. Korea)입니다.",
          },
        },
      ],
    },
  ],
};

const medicalAiRouteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "주식회사 바이오레",
      legalName: "주식회사 바이오레",
      alternateName: ["바이오레", "Viore", "Viore Inc.", "Viore Inc. Korea"],
      url: "https://vioreai.com",
      logo: vioreLogoImage,
      image: vioreLogoImage,
      email: "sj@vioreai.com",
      description:
        "주식회사 바이오레는 국내 의료 AI 스타트업으로, 의사용 의료 AI 플랫폼 알파닥(Alphadoc)을 개발·운영합니다.",
      foundingDate: "2024",
      industry: "Medical AI",
      keywords:
        "국내 의료 AI 스타트업, 의료 AI 스타트업, 의료 스타트업, 의사용 의료 AI, 임상 AI",
      knowsAbout: [
        "의료 AI",
        "의료 스타트업",
        "의사용 AI 플랫폼",
        "임상 의사결정 지원",
        "근거 기반 의학",
        "의학 정보 검색",
      ],
      brand: {
        "@id": alphadocId,
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "sj@vioreai.com",
        contactType: "business inquiries",
        availableLanguage: ["ko", "en"],
      },
      areaServed: ["KR", "Global"],
      sameAs: ["https://alphadoc.ai"],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: "바이오레 Viore",
      url: "https://vioreai.com",
      description:
        "주식회사 바이오레 공식 홈페이지. 바이오레는 국내 의료 AI 스타트업이며 알파닥의 개발사이자 공식 운영사입니다.",
      inLanguage: "ko-KR",
      publisher: {
        "@id": organizationId,
      },
    },
    {
      "@type": "AboutPage",
      "@id": `${medicalAiRouteUrl}#webpage`,
      url: medicalAiRouteUrl,
      name: medicalAiRouteMeta.title,
      description: medicalAiRouteMeta.description,
      inLanguage: "ko-KR",
      dateModified: "2026-06-12",
      isPartOf: {
        "@id": websiteId,
      },
      about: {
        "@id": organizationId,
      },
      primaryEntity: {
        "@id": organizationId,
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": alphadocId,
      name: "알파닥 Alphadoc",
      url: "https://alphadoc.ai",
      applicationCategory: "MedicalApplication",
      operatingSystem: "Web",
      description:
        "알파닥은 주식회사 바이오레가 개발·운영하는 의사용 의료 AI 플랫폼입니다.",
      author: {
        "@id": organizationId,
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "국내 의료 AI 스타트업",
          item: medicalAiRouteUrl,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "바이오레는 국내 의료 AI 스타트업인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "네. 주식회사 바이오레(Viore Inc. Korea)는 국내 의료 AI 스타트업으로, 의사용 의료 AI 플랫폼 알파닥(Alphadoc)을 개발·운영합니다.",
          },
        },
        {
          "@type": "Question",
          name: "바이오레는 어떤 의료 AI를 만드나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "바이오레는 의사를 위한 근거 기반 임상 AI, 의학 뉴스, 논문 검색, 의사 커뮤니티 워크플로를 알파닥 안에 구축하고 있습니다.",
          },
        },
        {
          "@type": "Question",
          name: "알파닥과 바이오레의 관계는 무엇인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "알파닥(Alphadoc)은 주식회사 바이오레가 개발·운영하는 의사용 의료 AI 플랫폼입니다.",
          },
        },
        {
          "@type": "Question",
          name: "알파닥은 환자 진단 서비스인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "아닙니다. 알파닥은 의료인과 보건의료 전문가를 위한 의사결정 지원 및 업무 지원 플랫폼이며, 의사의 판단을 대체하지 않습니다.",
          },
        },
      ],
    },
  ],
};

const escapeHtmlAttribute = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

const replaceNameMeta = (html: string, name: string, content: string) =>
  html.replace(
    new RegExp(`<meta name="${name}" content="[^"]*" />`),
    `<meta name="${name}" content="${escapeHtmlAttribute(content)}" />`,
  );

const replacePropertyMeta = (html: string, property: string, content: string) =>
  html.replace(
    new RegExp(`<meta property="${property}" content="[^"]*" />`),
    `<meta property="${property}" content="${escapeHtmlAttribute(content)}" />`,
  );

const buildGlobalRouteHtml = (source: string) => {
  const schemaJson = JSON.stringify(globalRouteSchema, null, 8)
    .split("\n")
    .map((line) => `      ${line}`)
    .join("\n");

  let html = source
    .replace("<html lang=\"ko\">", "<html lang=\"en\">")
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${globalRouteMeta.title}</title>`)
    .replace(
      /<link rel="canonical" href="[^"]+" \/>/,
      `<link rel="canonical" href="${globalRouteUrl}" />`,
    )
    .replace(
      /<link rel="alternate" hreflang="en" href="[^"]+" \/>/,
      `<link rel="alternate" hreflang="en" href="${globalRouteUrl}" />`,
    )
    .replace(
      /    <script type="application\/ld\+json" id="schema-home">[\s\S]*?    <\/script>/,
      `    <script type="application/ld+json" id="schema-global">\n${schemaJson}\n    </script>`,
    )
    .replace(
      /    <noscript>[\s\S]*?    <\/noscript>/,
      `    <noscript>
      <main>
        <h1>Viore</h1>
        <p>Viore Inc. Korea is the developer and official operator of Alphadoc, a medical AI platform for physicians.</p>
        <p>The legal Korean name is 주식회사 바이오레. 바이오어 is not the official Korean spelling.</p>
        <p>Alphadoc brings clinical AI, medical news, literature search, and physician community into one physician workspace.</p>
        <nav aria-label="Viore key links">
          <a href="https://alphadoc.ai">Alphadoc</a>
          <a href="/">Viore Korea</a>
        </nav>
      </main>
    </noscript>`,
    );

  html = replaceNameMeta(html, "description", globalRouteMeta.description);
  html = replaceNameMeta(html, "keywords", globalRouteMeta.keywords);
  html = replacePropertyMeta(html, "og:locale", "en_US");
  html = replacePropertyMeta(html, "og:site_name", "Viore");
  html = replacePropertyMeta(html, "og:title", globalRouteMeta.ogTitle);
  html = replacePropertyMeta(html, "og:description", globalRouteMeta.ogDescription);
  html = replacePropertyMeta(html, "og:url", globalRouteUrl);
  html = replacePropertyMeta(html, "og:image", globalRouteImage);
  html = replacePropertyMeta(html, "og:image:alt", globalRouteMeta.ogImageAlt);
  html = replaceNameMeta(html, "twitter:title", globalRouteMeta.ogTitle);
  html = replaceNameMeta(html, "twitter:description", globalRouteMeta.twitterDescription);
  html = replaceNameMeta(html, "twitter:image", globalRouteImage);

  return html;
};

const buildVioreRouteHtml = (source: string) => {
  const schemaJson = JSON.stringify(vioreRouteSchema, null, 8)
    .split("\n")
    .map((line) => `      ${line}`)
    .join("\n");

  let html = source
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${vioreRouteMeta.title}</title>`)
    .replace(
      /<link rel="canonical" href="[^"]+" \/>/,
      `<link rel="canonical" href="${vioreRouteUrl}" />`,
    )
    .replace(
      /<link rel="alternate" hreflang="ko" href="[^"]+" \/>/,
      `<link rel="alternate" hreflang="ko" href="${vioreRouteUrl}" />`,
    )
    .replace(
      /<link rel="alternate" hreflang="x-default" href="[^"]+" \/>/,
      `<link rel="alternate" hreflang="x-default" href="${vioreRouteUrl}" />`,
    )
    .replace(
      /    <script type="application\/ld\+json" id="schema-home">[\s\S]*?    <\/script>/,
      `    <script type="application/ld+json" id="schema-viore">\n${schemaJson}\n    </script>`,
    )
    .replace(
      /    <noscript>[\s\S]*?    <\/noscript>/,
      `    <noscript>
      <main>
        <h1>바이오레 공식 홈페이지</h1>
        <p>바이오레는 주식회사 바이오레(Viore Inc. Korea)의 공식 한글명입니다.</p>
        <p>바이오레는 알파닥(Alphadoc)을 개발·운영하는 한국 의료 AI 스타트업입니다.</p>
        <p>바이오레는 비오레(Bioré) 화장품 브랜드와 무관합니다. 바이오어는 공식 표기가 아닙니다.</p>
        <nav aria-label="바이오레 공식 링크">
          <a href="/">바이오레 홈페이지</a>
          <a href="https://alphadoc.ai">알파닥 Alphadoc</a>
          <a href="/global/">Viore Global</a>
        </nav>
      </main>
    </noscript>`,
    );

  html = replaceNameMeta(html, "description", vioreRouteMeta.description);
  html = replaceNameMeta(html, "keywords", vioreRouteMeta.keywords);
  html = replacePropertyMeta(html, "og:locale", "ko_KR");
  html = replacePropertyMeta(html, "og:site_name", "바이오레 Viore");
  html = replacePropertyMeta(html, "og:title", vioreRouteMeta.ogTitle);
  html = replacePropertyMeta(html, "og:description", vioreRouteMeta.ogDescription);
  html = replacePropertyMeta(html, "og:url", vioreRouteUrl);
  html = replacePropertyMeta(html, "og:image", globalRouteImage);
  html = replacePropertyMeta(html, "og:image:alt", vioreRouteMeta.ogImageAlt);
  html = replaceNameMeta(html, "twitter:title", vioreRouteMeta.ogTitle);
  html = replaceNameMeta(html, "twitter:description", vioreRouteMeta.twitterDescription);
  html = replaceNameMeta(html, "twitter:image", globalRouteImage);

  return html;
};

const buildMedicalAiRouteHtml = (source: string) => {
  const schemaJson = JSON.stringify(medicalAiRouteSchema, null, 8)
    .split("\n")
    .map((line) => `      ${line}`)
    .join("\n");

  let html = source
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${medicalAiRouteMeta.title}</title>`)
    .replace(
      /<link rel="canonical" href="[^"]+" \/>/,
      `<link rel="canonical" href="${medicalAiRouteUrl}" />`,
    )
    .replace(
      /<link rel="alternate" hreflang="ko" href="[^"]+" \/>/,
      `<link rel="alternate" hreflang="ko" href="${medicalAiRouteUrl}" />`,
    )
    .replace(
      /<link rel="alternate" hreflang="x-default" href="[^"]+" \/>/,
      `<link rel="alternate" hreflang="x-default" href="${medicalAiRouteUrl}" />`,
    )
    .replace(
      /    <script type="application\/ld\+json" id="schema-home">[\s\S]*?    <\/script>/,
      `    <script type="application/ld+json" id="schema-medical-ai-startup">\n${schemaJson}\n    </script>`,
    )
    .replace(
      /    <noscript>[\s\S]*?    <\/noscript>/,
      `    <noscript>
      <main>
        <h1>국내 의료 AI 스타트업, 주식회사 바이오레</h1>
        <p>주식회사 바이오레는 의사용 의료 AI 플랫폼 알파닥(Alphadoc)을 개발·운영하는 국내 의료 AI 스타트업입니다.</p>
        <p>바이오레는 근거 기반 임상 AI, 의학 정보 검색, 의료인 업무 지원 워크플로를 만들고 있습니다.</p>
        <p>알파닥은 의료인의 판단을 대체하지 않는 의사결정 지원 및 업무 지원 플랫폼입니다.</p>
        <nav aria-label="국내 의료 AI 스타트업 바이오레 공식 링크">
          <a href="/">바이오레 홈페이지</a>
          <a href="/viore/">바이오레 공식 정보</a>
          <a href="https://alphadoc.ai">알파닥 Alphadoc</a>
        </nav>
      </main>
    </noscript>`,
    );

  html = replaceNameMeta(html, "description", medicalAiRouteMeta.description);
  html = replaceNameMeta(html, "keywords", medicalAiRouteMeta.keywords);
  html = replacePropertyMeta(html, "og:locale", "ko_KR");
  html = replacePropertyMeta(html, "og:site_name", "바이오레 Viore");
  html = replacePropertyMeta(html, "og:title", medicalAiRouteMeta.ogTitle);
  html = replacePropertyMeta(html, "og:description", medicalAiRouteMeta.ogDescription);
  html = replacePropertyMeta(html, "og:url", medicalAiRouteUrl);
  html = replacePropertyMeta(html, "og:image", globalRouteImage);
  html = replacePropertyMeta(html, "og:image:alt", medicalAiRouteMeta.ogImageAlt);
  html = replaceNameMeta(html, "twitter:title", medicalAiRouteMeta.ogTitle);
  html = replaceNameMeta(html, "twitter:description", medicalAiRouteMeta.twitterDescription);
  html = replaceNameMeta(html, "twitter:image", globalRouteImage);

  return html;
};

const githubPagesFallback = () => ({
  name: "github-pages-spa-fallback",
  closeBundle() {
    const indexPath = resolve(__dirname, "out/index.html");
    const fallbackPath = resolve(__dirname, "out/404.html");
    const globalRoutePath = resolve(__dirname, "out/global/index.html");
    const vioreRoutePath = resolve(__dirname, "out/viore/index.html");
    const medicalAiRoutePath = resolve(__dirname, "out/medical-ai-startup/index.html");
    if (!existsSync(indexPath)) return;
    const indexHtml = readFileSync(indexPath, "utf8");
    copyFileSync(indexPath, fallbackPath);
    mkdirSync(resolve(__dirname, "out/global"), { recursive: true });
    mkdirSync(resolve(__dirname, "out/viore"), { recursive: true });
    mkdirSync(resolve(__dirname, "out/medical-ai-startup"), { recursive: true });
    writeFileSync(globalRoutePath, buildGlobalRouteHtml(indexHtml));
    writeFileSync(vioreRoutePath, buildVioreRouteHtml(indexHtml));
    writeFileSync(medicalAiRoutePath, buildMedicalAiRouteHtml(indexHtml));
  },
});

// https://vite.dev/config/
export default defineConfig({
  define: {
    __BASE_PATH__: JSON.stringify(base),
    __IS_PREVIEW__: JSON.stringify(isPreview),
    __READDY_PROJECT_ID__: JSON.stringify(process.env.PROJECT_ID || ""),
    __READDY_VERSION_ID__: JSON.stringify(process.env.VERSION_ID || ""),
    __READDY_AI_DOMAIN__: JSON.stringify(process.env.READDY_AI_DOMAIN || ""),
  },
  plugins: [
    react(),
    githubPagesFallback(),
    AutoImport({
      imports: [
        {
          react: [
            "React",
            "useState",
            "useEffect",
            "useContext",
            "useReducer",
            "useCallback",
            "useMemo",
            "useRef",
            "useImperativeHandle",
            "useLayoutEffect",
            "useDebugValue",
            "useDeferredValue",
            "useId",
            "useInsertionEffect",
            "useSyncExternalStore",
            "useTransition",
            "startTransition",
            "lazy",
            "memo",
            "forwardRef",
            "createContext",
            "createElement",
            "cloneElement",
            "isValidElement",
          ],
        },
        // React i18n
        {
          "react-i18next": ["useTranslation", "Trans"],
        },
      ],
      dts: true,
    }),
  ],
  base,
  build: {
    sourcemap: false,
    outDir: "out",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
});
