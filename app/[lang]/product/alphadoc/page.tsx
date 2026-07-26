import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../../../product.css";
import { ProductPage } from "@/app/components/ProductPage";
import { buildPageMetadata } from "@/app/seo";
import { isLanguage } from "@/app/site-content";

type ProductRouteParams = Promise<{ lang: string }>;

export const revalidate = 86_400;

export async function generateMetadata({ params }: { params: ProductRouteParams }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) return {};

  return buildPageMetadata({
    lang,
    title: "Alphadoc, an AI Medical Workspace.",
    description: lang === "ko"
      ? "알파닥은 질문과 근거 탐색, 진료노트, 진료서류, 문서 번역과 의료 공지를 하나의 흐름으로 잇는 AI Medical Workspace입니다."
      : "Alphadoc is an AI Medical Workspace connecting questions, evidence discovery, clinical notes, forms, translation, and medical updates in one flow.",
    path: "/product/alphadoc",
  });
}

export default async function AlphadocProductRoute({ params }: { params: ProductRouteParams }) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();

  return <ProductPage language={lang} />;
}
