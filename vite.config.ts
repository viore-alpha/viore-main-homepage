import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import AutoImport from "unplugin-auto-import/vite";

const base = process.env.BASE_PATH || "/";
const isPreview = process.env.IS_PREVIEW ? true : false;
const globalRouteUrl = "https://vioreai.com/global/";
const globalRouteImage =
  "https://storage.readdy-site.link/project_files/f0121b54-b4dd-49ef-9b9a-70a9b6263ce6/cdecc015-3612-48e5-96cf-4d67c12a1a43_viore-eng-logotype.png?v=c244b85742c4ab34af42521986a4c558";

const globalRouteMeta = {
  title: "Viore | Medical AI Platform That Transforms Physicians' Day - Alphadoc",
  description:
    "Viore (Viore Inc.) builds Alphadoc, the evidence-based clinical AI platform designed for physicians. Smarter clinical decisions, curated medical news, and physician community in one place.",
  keywords:
    "Viore, Viore Inc., Alphadoc, Medical AI Platform, Clinical AI, Evidence-Based Medicine, EBM AI, Physician AI, Healthcare AI, Clinical Decision Support, Medical News AI, Physician Community, Medical AI startup, Doctor AI app, alphadoc.ai",
  ogTitle: "Viore | Medical AI Platform That Transforms Physicians' Day",
  ogDescription:
    "Viore builds Alphadoc, the evidence-based clinical AI platform designed for physicians. Smarter decisions, meaningful care, all in one place.",
  ogImageAlt: "Viore - Medical AI Platform for Physicians - Alphadoc",
  twitterDescription:
    "Viore builds Alphadoc - clinical AI, medical news, and physician community to make every 4.3 minutes count.",
};

const globalRouteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Viore Inc.",
      alternateName: ["Viore", "Viore Inc.", "Viore Korea"],
      url: "https://vioreai.com",
      email: "sj@vioreai.com",
      description:
        "Viore builds Alphadoc, an evidence-based clinical AI platform designed for physicians.",
      foundingDate: "2024",
      knowsAbout: [
        "Medical AI",
        "Clinical Decision Support",
        "Evidence-Based Medicine",
        "Physician Platform",
        "Healthcare Technology",
      ],
      sameAs: ["https://alphadoc.ai"],
    },
    {
      "@type": "WebSite",
      name: "Viore",
      url: "https://vioreai.com",
      description: "Viore official website for Alphadoc, a medical AI platform for physicians.",
      inLanguage: "en-US",
      publisher: {
        "@type": "Organization",
        name: "Viore Inc.",
        url: "https://vioreai.com",
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
        "@type": "WebSite",
        url: "https://vioreai.com",
      },
      about: {
        "@type": "Organization",
        name: "Viore Inc.",
      },
    },
    {
      "@type": "SoftwareApplication",
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
        "@type": "Organization",
        name: "Viore Inc.",
        url: "https://vioreai.com",
      },
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
