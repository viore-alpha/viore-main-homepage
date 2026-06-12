import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import AutoImport from "unplugin-auto-import/vite";

const base = process.env.BASE_PATH || "/";
const isPreview = process.env.IS_PREVIEW ? true : false;
const globalRouteUrl = "https://vioreai.com/global/";
const globalRouteImage = "https://vioreai.com/brand/viore/og-image.png";
const vioreLogoImage = "https://vioreai.com/brand/viore/logo-square.png";
const organizationId = "https://vioreai.com/#organization";
const websiteId = "https://vioreai.com/#website";
const alphadocId = "https://alphadoc.ai/#software";

const globalRouteMeta = {
  title: "Viore Inc. Korea | Official Operator of Alphadoc - Medical AI Startup",
  description:
    "Viore Inc. Korea builds and operates Alphadoc, a medical AI platform for physicians with evidence-based clinical AI, medical news, literature search, and physician community.",
  keywords:
    "Viore, Viore Inc., Viore Korea, vioreai.com, Alphadoc, official operator of Alphadoc, Medical AI Platform, Clinical AI, Evidence-Based Medicine, EBM AI, Physician AI, Healthcare AI, Clinical Decision Support, Medical News AI, Physician Community, Medical AI startup, Doctor AI app, alphadoc.ai",
  ogTitle: "Viore Inc. Korea | Official Operator of Alphadoc",
  ogDescription:
    "Viore Inc. Korea builds and operates Alphadoc, a medical AI platform for physicians.",
  ogImageAlt: "Viore Inc. Korea - official operator of Alphadoc",
  twitterDescription:
    "Viore Inc. Korea builds Alphadoc - clinical AI, medical news, literature search, and physician community for doctors.",
};

const globalRouteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "Viore Inc. Korea",
      legalName: "주식회사 바이오레",
      alternateName: ["Viore", "Viore Inc.", "Viore Korea", "바이오레", "주식회사 바이오레"],
      url: "https://vioreai.com",
      logo: vioreLogoImage,
      image: vioreLogoImage,
      email: "sj@vioreai.com",
      description:
        "Viore Inc. Korea builds and operates Alphadoc, a medical AI platform for physicians.",
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
      description: "Viore official website for Alphadoc, a medical AI platform for physicians.",
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
        "Alphadoc is the evidence-based clinical AI platform built for physicians, with clinical Q&A, medical news, literature search, and physician community.",
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
            text: "Viore Inc. Korea builds and operates Alphadoc, a medical AI platform for physicians.",
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
        <p>Viore Inc. builds Alphadoc, an evidence-based medical AI platform designed for physicians.</p>
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

const githubPagesFallback = () => ({
  name: "github-pages-spa-fallback",
  closeBundle() {
    const indexPath = resolve(__dirname, "out/index.html");
    const fallbackPath = resolve(__dirname, "out/404.html");
    const globalRoutePath = resolve(__dirname, "out/global/index.html");
    if (!existsSync(indexPath)) return;
    copyFileSync(indexPath, fallbackPath);
    mkdirSync(resolve(__dirname, "out/global"), { recursive: true });
    writeFileSync(globalRoutePath, buildGlobalRouteHtml(readFileSync(indexPath, "utf8")));
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
