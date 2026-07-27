import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { SiteChrome } from "@/app/components/SiteChrome";
import { buildSiteMetadata, HOME_SEO } from "@/app/seo";
import { isLanguage } from "@/app/site-content";

export function generateStaticParams() {
  return [{ lang: "ko" }, { lang: "en" }];
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) return {};
  return buildSiteMetadata(lang);
}

export default async function LanguageLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  return (
    <html lang={HOME_SEO[lang].language}>
      <body>
        <SiteChrome language={lang}>{children}</SiteChrome>
      </body>
    </html>
  );
}
