import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../../technology.css";
import { getAlphaEvidencePublicSnapshot } from "@/app/alphaevidence-snapshot";
import { TechnologyPage } from "@/app/components/TechnologyPage";
import { buildPageMetadata, PAGE_SEO } from "@/app/seo";
import { isLanguage } from "@/app/site-content";

type TechnologyRouteParams = Promise<{ lang: string }>;

export const revalidate = 600;

export async function generateMetadata({ params }: { params: TechnologyRouteParams }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) return {};
  const copy = PAGE_SEO.technology[lang];
  return buildPageMetadata({
    lang,
    title: copy.title,
    description: copy.description,
    path: "/technology",
  });
}

const techArticles = {
  ko: [
    {
      id: "technology-alphaevidence",
      headline: "AlphaEvidence — Evidence Foundation",
      description: "출처, 변화, 이용 맥락과 품질을 검토 가능한 근거 계보로 연결하는 AlphaEvidence의 구현 기반을 소개합니다.",
      about: ["Evidence Foundation", "AlphaEvidence DB", "medical evidence provenance"],
    },
    {
      id: "technology-alphadoc-engine",
      headline: "AlphaDoc Engine — Medical Workflow Orchestration",
      description: "의료 업무의 목적을 중심으로 질문, 근거, 문서, 도구와 검토를 연결하는 AlphaDoc Engine의 구현 기능을 소개합니다.",
      about: ["medical workflow orchestration", "purpose-defined capability", "AI execution"],
    },
    {
      id: "technology-alphadocument",
      headline: "AlphaDocument — Deterministic Document-to-Artifact Engine",
      description: "디지털 문서를 구조와 출처가 보존된 Document Artifact로 변환하는 구현과 제품 출시 검토 상태를 소개합니다.",
      about: ["Document Artifact", "document provenance", "deterministic extraction"],
    },
    {
      id: "technology-alphaimage",
      headline: "AlphaImage — Deterministic Image Artifact Compiler",
      description: "허용된 정적 이미지의 표현과 좌표를 정규화하고 원본, 기존 주석과 무결성을 재사용 가능한 Image Artifact로 연결하는 구현 기술을 소개합니다.",
      about: ["Image Artifact", "image coordinate normalization", "annotation provenance"],
    },
    {
      id: "technology-alphalayer",
      headline: "AlphaLayer — Protected Inference Gateway",
      description: "선택된 보호 텍스트 경로에서 목적, 정보 최소화, 정책 변환, 응답 무결성과 최소 실행 기록을 연결하는 AlphaLayer의 운영 경계를 소개합니다.",
      about: ["Protected Inference Gateway", "purpose-aware protection", "AI execution assurance"],
    },
  ],
  en: [
    {
      id: "technology-alphaevidence",
      headline: "AlphaEvidence — Evidence Foundation",
      description: "Explore AlphaEvidence's implemented foundation for reviewable provenance, change, rights context, and quality signals.",
      about: ["Evidence Foundation", "AlphaEvidence DB", "medical evidence provenance"],
    },
    {
      id: "technology-alphadoc-engine",
      headline: "AlphaDoc Engine — Medical Workflow Orchestration",
      description: "Explore the implemented AlphaDoc Engine capability connecting questions, evidence, documents, tools, and user review.",
      about: ["medical workflow orchestration", "purpose-defined capability", "AI execution"],
    },
    {
      id: "technology-alphadocument",
      headline: "AlphaDocument — Deterministic Document-to-Artifact Engine",
      description: "Explore the implemented document-to-artifact engine and its product release review status.",
      about: ["Document Artifact", "document provenance", "deterministic extraction"],
    },
    {
      id: "technology-alphaimage",
      headline: "AlphaImage — Deterministic Image Artifact Compiler",
      description: "Explore the implemented technology that normalizes supported static images and binds representations, coordinate transforms, existing annotations, and integrity in reusable Image Artifacts.",
      about: ["Image Artifact", "image coordinate normalization", "annotation provenance"],
    },
    {
      id: "technology-alphalayer",
      headline: "AlphaLayer — Protected Inference Gateway",
      description: "Explore AlphaLayer's operating boundary for selected protected text paths, connecting purpose, minimization, policy transformation, response integrity, and minimal execution records.",
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
  const collectionName = lang === "ko" ? "바이오레 기술 저널" : "Viore Technology Journal";
  const articleNodes = articles.map((article) => ({
    "@type": "TechArticle",
    "@id": `${pageUrl}#${article.id}`,
    headline: article.headline,
    description: article.description,
    datePublished: "2026-07-21",
    dateModified: "2026-07-27",
    about: article.about,
    isPartOf: { "@type": "CollectionPage", "@id": pageUrl, name: collectionName },
    author: { "@type": "Organization", name: "Viore Inc.", url: "https://vioreai.com" },
    inLanguage,
  }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": pageUrl,
        name: collectionName,
        description: PAGE_SEO.technology[lang].description,
        dateModified: "2026-07-27",
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
