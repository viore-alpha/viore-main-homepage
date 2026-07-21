import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAlphaEvidencePublicSnapshot } from "@/app/alphaevidence-snapshot";
import { TechnologyPage } from "@/app/components/TechnologyPage";
import { buildPageMetadata } from "@/app/seo";
import { isLanguage } from "@/app/site-content";

type TechnologyRouteParams = Promise<{ lang: string }>;

export const revalidate = 10 * 60;

const metadataCopy = {
  ko: {
    title: "Technology — Viore",
    description: "근거의 출처와 변경, AI 실행 조건, 문서 통제, 개인정보 보호 목표 구조를 구현 상태와 한계까지 구분해 설명합니다.",
  },
  en: {
    title: "Technology — Viore",
    description: "Explore Viore's evidence provenance, AI execution controls, document boundaries, and privacy architecture with implementation status and limitations clearly distinguished.",
  },
} as const;

export async function generateMetadata({ params }: { params: TechnologyRouteParams }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) return {};
  const copy = metadataCopy[lang];
  return buildPageMetadata({
    lang,
    title: copy.title,
    description: copy.description,
    path: "/technology",
    type: "article",
  });
}

const techArticles = [
  {
    id: "technology-alphaevidence",
    headline: "AlphaEvidence — LLM을 위한 검증된 증거와 자동화",
    description: "허용된 의학 문헌과 진료지침의 provenance, 변경 관찰, rights snapshot과 versioned retrieval contract를 설명합니다.",
    about: ["medical evidence provenance", "source health", "versioned retrieval"],
  },
  {
    id: "technology-alphadoc-engine",
    headline: "AlphaDoc Engine — 의료 특화 Workflow Orchestration",
    description: "Capability Registry, capability boundary, Release Identity와 세 층의 Evaluation Gate를 설명합니다.",
    about: ["capability registry", "release identity", "AI evaluation"],
  },
  {
    id: "technology-alphadocument",
    headline: "AlphaDocument — 생성보다 먼저, 문서의 경계를 정의합니다.",
    description: "등록된 의료 문서 workflow, deterministic rendering, source-bound translation과 human review 경계를 설명합니다.",
    about: ["medical document control", "source-bound translation", "human review"],
  },
  {
    id: "technology-alphalayer",
    headline: "AlphaLayer — 개인정보 보호를 통제 경로로 설계합니다.",
    description: "현재 운영 중인 보안 통제와 개발 중인 privacy-control architecture를 명확히 구분합니다.",
    about: ["privacy control architecture", "data minimization", "tokenization"],
  },
] as const;

export default async function TechnologyRoute({ params }: { params: TechnologyRouteParams }) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const snapshotResult = await getAlphaEvidencePublicSnapshot();
  const pageUrl = `https://vioreai.com/${lang}/technology`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": techArticles.map((article) => ({
      "@type": "TechArticle",
      "@id": `${pageUrl}#${article.id}`,
      headline: article.headline,
      description: article.description,
      dateModified: "2026-07-20",
      about: article.about,
      isPartOf: { "@type": "CollectionPage", "@id": pageUrl, name: "Viore Technology" },
      author: { "@type": "Organization", name: "Viore Inc.", url: "https://vioreai.com" },
      inLanguage: "ko-KR",
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replaceAll("<", "\\u003c") }}
      />
      <TechnologyPage snapshotResult={snapshotResult} />
    </>
  );
}
