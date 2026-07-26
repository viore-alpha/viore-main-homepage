import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../../knowledge.css";
import { KnowledgePage } from "@/app/components/KnowledgePage";
import { getKnowledgeInitialFeed } from "@/app/knowledge-feed";
import { buildPageMetadata } from "@/app/seo";
import { isLanguage } from "@/app/site-content";

type KnowledgeRouteParams = Promise<{ lang: string }>;

export const revalidate = 600;

export async function generateMetadata({ params }: { params: KnowledgeRouteParams }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) return {};

  return buildPageMetadata({
    lang,
    title: "Knowledge — Viore",
    description: lang === "ko"
      ? "실시간으로 채워지는 문헌 라이브러리. AlphaEvidence DB에서 신규 의학 논문과 한국어 브리프를 확인하세요."
      : "A living literature library with newly published medical papers and Korean briefs from AlphaEvidence DB.",
    path: "/knowledge",
  });
}

export default async function KnowledgeRoute({ params }: { params: KnowledgeRouteParams }) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const result = await getKnowledgeInitialFeed();

  return <KnowledgePage language={lang} result={result} />;
}
