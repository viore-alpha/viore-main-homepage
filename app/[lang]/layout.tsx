import { notFound } from "next/navigation";
import { SiteChrome } from "@/app/components/SiteChrome";
import { isLanguage } from "@/app/site-content";

export function generateStaticParams() {
  return [{ lang: "ko" }, { lang: "en" }];
}

export const dynamicParams = false;

export default async function LanguageLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  return <SiteChrome language={lang}>{children}</SiteChrome>;
}
