import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import AutoImport from "unplugin-auto-import/vite";

const base = process.env.BASE_PATH || "/";
const isPreview = process.env.IS_PREVIEW ? true : false;
const globalRouteUrl = "https://vioreai.com/global/";
const legalRouteUrl = "https://vioreai.com/legal/";
const globalRouteImage = "https://vioreai.com/brand/viore/og-image-white-v2.png";
const vioreLogoImage = "https://vioreai.com/brand/viore/logo-square.png";
const organizationId = "https://vioreai.com/#organization";
const websiteId = "https://vioreai.com/#website";
const alphadocId = "https://alphadoc.ai/#software";

const globalRouteMeta = {
  title: "Viore | Medical AI for the Doctor's Day",
  description:
    "Viore Inc. builds Alphadoc, a physician-focused medical AI platform for evidence-based clinical support, medical news, literature search, and physician workflows.",
  ogTitle: "Viore | Medical AI for the Doctor's Day",
  ogDescription:
    "Viore Inc. builds Alphadoc, a physician-focused medical AI platform for evidence-based clinical support and physician workflows.",
  ogImageAlt: "Viore - medical AI for the doctor's day",
  twitterDescription:
    "Viore Inc. builds Alphadoc, a physician-focused medical AI platform.",
};

const globalRouteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "Viore Inc.",
      legalName: "주식회사 바이오레",
      alternateName: ["Viore", "Viore Inc.", "바이오레", "주식회사 바이오레"],
      url: "https://vioreai.com",
      logo: vioreLogoImage,
      image: vioreLogoImage,
      email: "sj@vioreai.com",
      description:
        "Viore Inc. builds Alphadoc, a physician-focused medical AI platform for evidence-based clinical support and physician workflows.",
      disambiguatingDescription:
        "Viore Inc. is legally 주식회사 바이오레. 바이오어 is not the official Korean spelling.",
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
      alternateName: ["Viore", "Viore Inc.", "주식회사 바이오레"],
      url: "https://vioreai.com",
      description: "Viore Inc. builds medical AI products for physicians, including Alphadoc.",
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
      dateModified: "2026-06-18",
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
        "Alphadoc is a physician-focused medical AI platform operated by Viore Inc., with evidence-based clinical AI, medical news, literature search, and physician community.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: {
        "@id": organizationId,
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
        <p>Viore Inc. builds Alphadoc, a physician-focused medical AI platform.</p>
        <p>Alphadoc supports evidence-based clinical workflows for physicians.</p>
        <nav aria-label="Viore links">
          <a href="https://alphadoc.ai">Alphadoc</a>
          <a href="/">Viore Korean</a>
        </nav>
      </main>
    </noscript>`,
    )
    .replace(
      /    <div id="root">[\s\S]*?<\/div>/,
      `    <div id="root"></div>`,
    );

  html = replaceNameMeta(html, "description", globalRouteMeta.description);
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

const buildLegalRouteHtml = (source: string) => {
  const title = "법무고지 | 바이오레";
  const description = "주식회사 바이오레의 개인정보처리방침과 사이트 이용안내입니다.";

  let html = source
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta name="robots" content="[^"]*" \/>/,
      '<meta name="robots" content="noindex, follow" />',
    )
    .replace(
      /<link rel="canonical" href="[^"]+" \/>/,
      `<link rel="canonical" href="${legalRouteUrl}" />`,
    )
    .replace(
      /    <noscript>[\s\S]*?    <\/noscript>/,
      `    <noscript>
      <main>
        <h1>법무고지</h1>
        <p>주식회사 바이오레의 개인정보처리방침과 사이트 이용안내입니다.</p>
        <a href="mailto:cs@vioreai.com">cs@vioreai.com</a>
      </main>
    </noscript>`,
    );

  html = replaceNameMeta(html, "description", description);
  html = replacePropertyMeta(html, "og:title", title);
  html = replacePropertyMeta(html, "og:description", description);
  html = replacePropertyMeta(html, "og:url", legalRouteUrl);
  html = replaceNameMeta(html, "twitter:title", title);
  html = replaceNameMeta(html, "twitter:description", description);

  return html;
};

const githubPagesFallback = () => ({
  name: "github-pages-spa-fallback",
  closeBundle() {
    const indexPath = resolve(__dirname, "out/index.html");
    const fallbackPath = resolve(__dirname, "out/404.html");
    const globalRoutePath = resolve(__dirname, "out/global/index.html");
    const legalRoutePath = resolve(__dirname, "out/legal/index.html");
    if (!existsSync(indexPath)) return;
    const indexHtml = readFileSync(indexPath, "utf8");
    copyFileSync(indexPath, fallbackPath);
    mkdirSync(resolve(__dirname, "out/global"), { recursive: true });
    writeFileSync(globalRoutePath, buildGlobalRouteHtml(indexHtml));
    mkdirSync(resolve(__dirname, "out/legal"), { recursive: true });
    writeFileSync(legalRoutePath, buildLegalRouteHtml(indexHtml));
  },
});

const localMotionRouteIndex = () => {
  const motionRouteIndexByPathname = new Map([
    ["/alphadoc-clinical-ai-motion/", "/alphadoc-clinical-ai-motion/index.html"],
    ["/alphadoc-widget-motion/", "/alphadoc-widget-motion/index.html"],
  ]);

  return {
    name: "local-motion-route-index",
    enforce: "pre" as const,
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url) {
          next();
          return;
        }

        const [pathname, search] = req.url.split("?");
        const target = motionRouteIndexByPathname.get(pathname);
        if (!target) {
          next();
          return;
        }

        req.url = search ? `${target}?${search}` : target;
        next();
      });
    },
  };
};

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
    localMotionRouteIndex(),
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
