import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CompanyPage } from "@/app/components/CompanyPage";
import {
  HOME_SEO,
  SITE_NAME,
  SITE_ORIGIN,
  SOCIAL_IMAGE_PATH,
  SQUARE_LOGO_PATH,
  absoluteUrl,
  buildPageMetadata,
} from "@/app/seo";
import { isLanguage } from "@/app/site-content";

type LanguageRouteParams = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: LanguageRouteParams }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) return {};
  const seo = HOME_SEO[lang];
  return buildPageMetadata({ lang, title: seo.title, description: seo.description });
}

export default async function LanguageHome({ params }: { params: LanguageRouteParams }) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const seo = HOME_SEO[lang];
  const pageUrl = absoluteUrl(`/${lang}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_ORIGIN}/#organization`,
        name: "Viore Inc.",
        legalName: "주식회사 바이오레",
        alternateName: ["바이오레", "Viore"],
        url: SITE_ORIGIN,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl(SQUARE_LOGO_PATH),
          width: 1024,
          height: 1024,
        },
        image: {
          "@type": "ImageObject",
          url: absoluteUrl(SOCIAL_IMAGE_PATH),
          width: 1200,
          height: 630,
        },
        email: "biz@vioreai.com",
        description: seo.description,
        contactPoint: {
          "@type": "ContactPoint",
          email: "biz@vioreai.com",
          contactType: "business inquiries",
          availableLanguage: ["Korean", "English"],
        },
        areaServed: ["KR", "Global"],
        brand: {
          "@type": "Brand",
          "@id": "https://alphadoc.ai/#brand",
          name: "Alphadoc",
          alternateName: "알파닥",
          url: "https://alphadoc.ai",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_ORIGIN}/#website`,
        url: SITE_ORIGIN,
        name: SITE_NAME,
        alternateName: ["Viore Inc.", "주식회사 바이오레"],
        description: seo.description,
        inLanguage: ["ko-KR", "en-US"],
        publisher: { "@id": `${SITE_ORIGIN}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: seo.title,
        description: seo.description,
        inLanguage: seo.language,
        dateModified: "2026-07-20",
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        about: { "@id": `${SITE_ORIGIN}/#organization` },
        primaryEntity: { "@id": `${SITE_ORIGIN}/#organization` },
        image: absoluteUrl(SOCIAL_IMAGE_PATH),
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://alphadoc.ai/#software",
        name: "Alphadoc",
        alternateName: "알파닥",
        url: "https://alphadoc.ai",
        applicationCategory: "MedicalApplication",
        operatingSystem: "Web",
        description:
          lang === "ko"
            ? "의료인의 질문을 맥락에 맞는 근거와 다음 행동으로 연결하는 바이오레의 의료 AI 워크스페이스입니다."
            : "Viore's medical AI workspace connecting clinical questions to contextual evidence and next actions.",
        author: { "@id": `${SITE_ORIGIN}/#organization` },
      },
    ],
  };

  return (
    <>
      <script
        id="viore-home-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replaceAll("<", "\\u003c") }}
      />
      <CompanyPage language={lang} />
    </>
  );
}
