import type { Metadata } from "next";
import type { Language } from "@/app/site-content";

export const SITE_ORIGIN = "https://vioreai.com";
export const SITE_NAME = "바이오레 | Viore";
export const SQUARE_LOGO_PATH = "/brand/viore-v-square-white-v2.png";
export const SOCIAL_IMAGE_PATH = "/brand/viore-social-card-white-v3.png";

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
    title: "Viore, Drawing a New Linearity in Medicine.",
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

export const SEO_KEYWORDS = [
  "바이오레",
  "Viore",
  "주식회사 바이오레",
  "의료 AI",
  "의료 AI 스타트업",
  "Medical OS",
  "알파닥",
  "Alphadoc",
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
          url: SOCIAL_IMAGE_PATH,
          width: 1200,
          height: 630,
          alt: lang === "ko" ? "흰 배경의 바이오레 영문 로고" : "Viore wordmark on a white background",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SOCIAL_IMAGE_PATH],
    },
  };
}
