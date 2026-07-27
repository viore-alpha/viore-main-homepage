import type { Metadata } from "next";
import type { Language } from "@/app/site-content";

export const SITE_ORIGIN = "https://vioreai.com";
export const SITE_NAME = "바이오레 | Viore";
export const SQUARE_LOGO_PATH = "/brand/viore-v-square-white-v2.png";
export const SOCIAL_IMAGE_PATHS: Record<Language, string> = {
  ko: "/brand/viore-social-card-ko-v1.png",
  en: "/brand/viore-social-card-en-v1.png",
};
export const SOCIAL_IMAGE_PATH = SOCIAL_IMAGE_PATHS.ko;

export const HOME_SEO: Record<
  Language,
  {
    title: string;
    description: string;
    locale: "ko_KR" | "en_US";
    language: "ko-KR" | "en-US";
  }
> = {
  ko: {
    title: "바이오레, 새로운 선형을 그리다.",
    description:
      "의료의 전문성과 시스템을 연결해 의료인의 질문, 근거, 문서와 도구가 하나의 흐름으로 이어지는 Medical OS를 만드는 주식회사 바이오레 공식 홈페이지입니다.",
    locale: "ko_KR",
    language: "ko-KR",
  },
  en: {
    title: "Viore, Drawing a New Linearity in Medicine.",
    description:
      "Viore builds a Medical OS that connects clinical questions, evidence, documents, and tools into one continuous flow for healthcare professionals.",
    locale: "en_US",
    language: "en-US",
  },
};

export const PAGE_SEO = {
  technology: {
    ko: {
      title: "바이오레 기술 | 의료 근거·문서·이미지·AI 실행을 잇는 기술",
      description:
        "AlphaEvidence, AlphaDoc Engine, AlphaDocument, AlphaImage와 선택된 보호 경로의 AlphaLayer를 통해 의료 근거, 문서·이미지 아티팩트와 AI 실행을 연결하는 바이오레의 기술을 소개합니다.",
    },
    en: {
      title: "Viore Technology | Connected Medical Intelligence",
      description:
        "Explore how Viore connects evidence, workflow orchestration, document and image artifacts, and selected protected AI execution paths.",
    },
  },
  product: {
    ko: {
      title: "알파닥 | 의료 업무를 잇는 AI Medical Workspace",
      description:
        "알파닥은 질문과 근거 탐색, 진료노트, 진료서류, 문서 번역과 의료 공지를 하나의 흐름으로 잇는 AI Medical Workspace입니다.",
    },
    en: {
      title: "Alphadoc | AI Medical Workspace by Viore",
      description:
        "Alphadoc is an AI Medical Workspace connecting questions, evidence discovery, clinical notes, forms, translation, and medical updates in one flow.",
    },
  },
  knowledge: {
    ko: {
      title: "바이오레 Knowledge | 최신 의학 논문과 근거",
      description:
        "AlphaEvidence DB에서 선별한 최신 의학 논문과 한국어 브리프를 확인하는 바이오레의 살아 있는 문헌 라이브러리입니다.",
    },
    en: {
      title: "Viore Knowledge | Medical Literature and Evidence",
      description:
        "A living literature library with newly published medical papers and evidence briefs selected from AlphaEvidence DB.",
    },
  },
} as const;

export const SEO_KEYWORDS = [
  "바이오레",
  "Viore",
  "주식회사 바이오레",
  "의료 AI",
  "의료 AI 스타트업",
  "Medical OS",
  "알파닥",
  "Alphadoc",
  "AI Medical Workspace",
  "AlphaDoc Engine",
  "AlphaEvidence",
];

export function absoluteUrl(path: string) {
  return new URL(path, SITE_ORIGIN).toString();
}

export function languageAlternates(path = "") {
  return {
    "ko-KR": `/ko${path}`,
    "en-US": `/en${path}`,
    "x-default": `/ko${path}`,
  };
}

export function buildSiteMetadata(lang: Language): Metadata {
  const seo = HOME_SEO[lang];
  const socialImagePath = SOCIAL_IMAGE_PATHS[lang];
  const applicationName = lang === "ko" ? "바이오레" : "Viore";

  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: seo.title,
    description: seo.description,
    applicationName,
    authors: [{ name: "Viore Inc.", url: SITE_ORIGIN }],
    creator: "Viore Inc.",
    publisher: "Viore Inc.",
    category: "Medical Technology",
    keywords: SEO_KEYWORDS,
    referrer: "origin-when-cross-origin",
    formatDetection: {
      address: false,
      email: false,
      telephone: false,
    },
    icons: {
      icon: [{ url: SQUARE_LOGO_PATH, type: "image/png", sizes: "1024x1024" }],
      shortcut: SQUARE_LOGO_PATH,
      apple: [{ url: SQUARE_LOGO_PATH, type: "image/png", sizes: "1024x1024" }],
    },
    manifest: "/site.webmanifest",
    appleWebApp: {
      capable: true,
      title: applicationName,
      statusBarStyle: "default",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    verification: {
      google: "jHNuqMrzpeZwUGWutN9Mms8neuaBP87Ouc1RNOYBSyg",
      other: {
        "naver-site-verification": "0e061d531e55879e99b874a7f3c1ed095c7462d6",
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      url: `/${lang}`,
      locale: seo.locale,
      alternateLocale: [lang === "ko" ? HOME_SEO.en.locale : HOME_SEO.ko.locale],
      siteName: SITE_NAME,
      images: [
        {
          url: socialImagePath,
          width: 1200,
          height: 630,
          alt: lang === "ko"
            ? "바이오레, 새로운 선형을 그리다."
            : "Viore, Drawing a New Linearity in Medicine.",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [socialImagePath],
    },
  };
}

export function buildPageMetadata({
  lang,
  title,
  description,
  path = "",
  type = "website",
}: {
  lang: Language;
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
}): Metadata {
  const canonical = `/${lang}${path}`;
  const socialImagePath = SOCIAL_IMAGE_PATHS[lang];

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: languageAlternates(path),
      types: {
        "text/plain": "/llms.txt",
      },
    },
    openGraph: {
      title,
      description,
      type,
      url: canonical,
      locale: HOME_SEO[lang].locale,
      alternateLocale: [lang === "ko" ? HOME_SEO.en.locale : HOME_SEO.ko.locale],
      siteName: SITE_NAME,
      images: [
        {
          url: socialImagePath,
          width: 1200,
          height: 630,
          alt: lang === "ko"
            ? "바이오레, 새로운 선형을 그리다."
            : "Viore, Drawing a New Linearity in Medicine.",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImagePath],
    },
  };
}
