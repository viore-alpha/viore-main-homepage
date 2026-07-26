import type { Metadata } from "next";
import { notFound, permanentRedirect, redirect } from "next/navigation";
import {
  AlphaDocumentVisual,
  AlphaDocOrchestrationVisual,
  AlphaEvidenceVisual,
  CouncilPartnersVisual,
} from "@/app/components/BrandVisuals";
import { buildPageMetadata } from "@/app/seo";
import { detailContent, insightPageFromLegacySlug, isLanguage, pageKeyFromSlug, pageRoutes, routeFor, technologyAnchorFromLegacySlug, technologyRouteFor, type Language, type PageKey } from "@/app/site-content";

type RouteParams = Promise<{ lang: string; slug: string[] }>;

export async function generateMetadata({ params }: { params: RouteParams }): Promise<Metadata> {
  const { lang, slug } = await params;
  const technologyAnchor = technologyAnchorFromLegacySlug(slug);
  if (isLanguage(lang) && technologyAnchor) {
    return {
      title: "Technology — Viore",
      description: lang === "ko"
        ? "현재 공개된 기술에서 시작해 새로 개발·검증·통합되는 바이오레의 기술과 연결 구조를 계속 소개합니다."
        : "Viore's Technology Journal begins with its currently presented technologies and continues to document newly developed, validated, and integrated technologies.",
      alternates: { canonical: technologyRouteFor(lang, technologyAnchor) },
    };
  }
  const key = pageKeyFromSlug(slug);
  if (!isLanguage(lang) || !key) return {};
  if (key === "company" || key === "contact") return {};
  if (key === "knowledge") {
    return buildPageMetadata({
      lang,
      title: "Knowledge — Viore",
      description: lang === "ko"
        ? "실시간으로 채워지는 문헌 라이브러리. AlphaEvidence DB에서 신규 의학 논문과 한국어 브리프를 확인하세요."
        : "A living literature library with newly published medical papers and Korean briefs from AlphaEvidence DB.",
      path: `/${pageRoutes[key]}`,
    });
  }
  if (key === "alphadoc") {
    return buildPageMetadata({
      lang,
      title: "Alphadoc, an AI Medical Workspace.",
      description: lang === "ko"
        ? "알파닥은 질문과 근거 탐색, 진료노트, 진료서류, 문서 번역과 의료 공지를 하나의 흐름으로 잇는 AI Medical Workspace입니다."
        : "Alphadoc is an AI Medical Workspace connecting questions, evidence discovery, clinical notes, forms, translation, and medical updates in one flow.",
      path: `/${pageRoutes[key]}`,
    });
  }
  const page = detailContent[lang][key];
  return buildPageMetadata({
    lang,
    title: `${page.title.replace(/\n/g, " ")} — Viore`,
    description: page.lead.replace(/\n/g, " "),
    path: `/${pageRoutes[key]}`,
  });
}

function PageVisual({ pageKey }: { pageKey: Exclude<PageKey, "company" | "alphadoc" | "contact"> }) {
  if (pageKey === "alphadoc-engine") return <AlphaDocOrchestrationVisual compact />;
  if (pageKey === "alphaevidence") return <AlphaEvidenceVisual />;
  if (pageKey === "alphadocument") return <AlphaDocumentVisual />;
  if (pageKey === "clinical-council") return <CouncilPartnersVisual compact />;
  return null;
}

function continuationFor(language: Language, pageKey: PageKey) {
  const ko = language === "ko";
  if (pageKey === "alphadoc-engine") return { label: "Explore AlphaEvidence", href: routeFor(language, "alphaevidence") };
  if (pageKey === "alphaevidence") return { label: "Explore AlphaDocument", href: routeFor(language, "alphadocument") };
  if (pageKey === "alphadocument") return { label: ko ? "알파닥 만나기" : "Meet Alphadoc", href: routeFor(language, "alphadoc") };
  if (pageKey === "alphadoc") return { label: "Open alphadoc.ai", href: "https://alphadoc.ai", external: true };
  if (pageKey === "knowledge") return { label: ko ? "Council & Partners 만나기" : "Meet Council & Partners", href: routeFor(language, "clinical-council") };
  if (pageKey === "clinical-council") return { label: ko ? "함께 이야기하기" : "Start a conversation", href: routeFor(language, "contact") };
  return null;
}

export default async function DetailRoute({ params }: { params: RouteParams }) {
  const { lang, slug } = await params;
  if (!isLanguage(lang)) notFound();
  const technologyAnchor = technologyAnchorFromLegacySlug(slug);
  if (technologyAnchor) redirect(technologyRouteFor(lang, technologyAnchor));
  const legacyInsightPage = insightPageFromLegacySlug(slug);
  if (legacyInsightPage) permanentRedirect(routeFor(lang, legacyInsightPage));
  const pageKey = pageKeyFromSlug(slug);
  if (!pageKey) notFound();
  if (pageKey === "company") permanentRedirect(routeFor(lang, "company"));
  if (pageKey === "contact") permanentRedirect(routeFor(lang, "contact"));
  const page = detailContent[lang][pageKey];
  const continuation = continuationFor(lang, pageKey);

  if (pageKey === "alphadoc" || pageKey === "knowledge") notFound();

  return (
    <article className={`detail-page detail-page-${pageKey} detail-${page.kind}`}>
      <section className="detail-hero">
        <div className="detail-network-backdrop" aria-hidden="true" />
        <div className="detail-hero-copy">
          <div className="detail-kicker"><span>{page.eyebrow}</span>{page.status && <i>{page.status}</i>}</div>
          <h1>{page.title}</h1>
          <p>{page.lead}</p>
        </div>
        <PageVisual pageKey={pageKey} />
      </section>

      <div className="detail-chapter">
        <section className="detail-body">
          <div className="detail-line-marker" aria-hidden="true"><i /><span /></div>
          <h2>{page.statement}</h2>
          {page.statementLead && <p className="detail-statement-lead">{page.statementLead}</p>}
          <div className="detail-items">
            {page.items.map((item) => <article key={item.index}><span>{item.index}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}
          </div>
        </section>
        {continuation && (
          <section className="detail-next">
            <small>{lang === "ko" ? "NEXT LINE" : "NEXT LINE"}</small>
            <a href={continuation.href} target={continuation.external ? "_blank" : undefined} rel={continuation.external ? "noreferrer" : undefined}>
              <span>{continuation.label}</span><i>↗</i>
            </a>
          </section>
        )}
      </div>
    </article>
  );
}
