import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../../technology.css";
import { getAlphaEvidencePublicSnapshot } from "@/app/alphaevidence-snapshot";
import { TechnologyPage } from "@/app/components/TechnologyPage";
import { buildPageMetadata } from "@/app/seo";
import { isLanguage } from "@/app/site-content";

type TechnologyRouteParams = Promise<{ lang: string }>;

export const revalidate = 600;

const metadataCopy = {
  ko: {
    title: "Technology — Viore",
    description: "AlphaEvidence, AlphaDoc Engine, AlphaDocument, AlphaLayer에서 시작해 새로 개발·검증·통합되는 바이오레의 기술과 연결 구조를 계속 소개합니다.",
  },
  en: {
    title: "Technology — Viore",
    description: "Viore's Technology Journal begins with AlphaEvidence, AlphaDoc Engine, AlphaDocument, and AlphaLayer, and continues to document newly developed, validated, and integrated technologies.",
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

const techArticles = {
  ko: [
    {
      id: "technology-alphaevidence",
      headline: "AlphaEvidence — Evidence Foundation",
      description: "AlphaEvidence DB를 데이터 계층으로 삼아 출처, 변화, 이용 맥락과 품질을 검토 가능한 근거 계보로 연결하는 Evidence Foundation을 소개합니다.",
      about: ["Evidence Foundation", "AlphaEvidence DB", "medical evidence provenance"],
    },
    {
      id: "technology-alphadoc-engine",
      headline: "AlphaDoc Engine — Medical Workflow Orchestration",
      description: "의료 업무의 목적을 중심으로 질문, 근거, 문서, 도구와 검토를 연결하는 실행 오케스트레이션을 소개합니다.",
      about: ["medical workflow orchestration", "purpose-defined capability", "AI execution"],
    },
    {
      id: "technology-alphadocument",
      headline: "AlphaDocument — Deterministic Document-to-Artifact Engine",
      description: "다양한 디지털 문서를 구조와 출처가 보존된 재사용 가능한 Document Artifact로 변환하는 기술을 소개합니다.",
      about: ["Document Artifact", "document provenance", "deterministic extraction"],
    },
    {
      id: "technology-alphalayer",
      headline: "AlphaLayer — Protected Inference Gateway",
      description: "업무 목적, 정보 최소화, 조건을 충족한 외부 실행, 응답 무결성과 실행 기록을 하나의 보호 경계로 연결하는 기술을 소개합니다.",
      about: ["Protected Inference Gateway", "purpose-aware protection", "AI execution assurance"],
    },
  ],
  en: [
    {
      id: "technology-alphaevidence",
      headline: "AlphaEvidence — Evidence Foundation",
      description: "Explore the Evidence Foundation that uses AlphaEvidence DB as its data layer to connect source, change, rights context, and quality into a reviewable evidence lineage.",
      about: ["Evidence Foundation", "AlphaEvidence DB", "medical evidence provenance"],
    },
    {
      id: "technology-alphadoc-engine",
      headline: "AlphaDoc Engine — Medical Workflow Orchestration",
      description: "Explore purpose-defined orchestration connecting questions, evidence, documents, tools, and professional review.",
      about: ["medical workflow orchestration", "purpose-defined capability", "AI execution"],
    },
    {
      id: "technology-alphadocument",
      headline: "AlphaDocument — Deterministic Document-to-Artifact Engine",
      description: "Explore how digital documents become reusable Document Artifacts with structure and provenance intact.",
      about: ["Document Artifact", "document provenance", "deterministic extraction"],
    },
    {
      id: "technology-alphalayer",
      headline: "AlphaLayer — Protected Inference Gateway",
      description: "Explore the protected boundary connecting purpose, minimization, condition-governed external execution, response integrity, and execution evidence.",
      about: ["Protected Inference Gateway", "purpose-aware protection", "AI execution assurance"],
    },
  ],
} as const;

export default async function TechnologyRoute({ params }: { params: TechnologyRouteParams }) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const snapshotResult = await getAlphaEvidencePublicSnapshot();
  const pageUrl = `https://vioreai.com/${lang}/technology`;
  const articles = techArticles[lang];
  const inLanguage = lang === "ko" ? "ko-KR" : "en-US";
  const articleNodes = articles.map((article) => ({
    "@type": "TechArticle",
    "@id": `${pageUrl}#${article.id}`,
    headline: article.headline,
    description: article.description,
    datePublished: "2026-07-21",
    dateModified: "2026-07-26",
    about: article.about,
    isPartOf: { "@type": "CollectionPage", "@id": pageUrl, name: "Viore Technology Journal" },
    author: { "@type": "Organization", name: "Viore Inc.", url: "https://vioreai.com" },
    inLanguage,
  }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": pageUrl,
        name: "Viore Technology Journal",
        description: metadataCopy[lang].description,
        dateModified: "2026-07-26",
        inLanguage,
        hasPart: articles.map((article) => ({ "@id": `${pageUrl}#${article.id}` })),
      },
      ...articleNodes,
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replaceAll("<", "\\u003c") }}
      />
      <TechnologyPage language={lang} snapshotResult={snapshotResult} />
    </>
  );
}
