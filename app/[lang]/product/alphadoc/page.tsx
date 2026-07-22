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
    title: lang === "ko"
      ? "알파닥 | 의료인의 하루를 잇는 Medical Workspace | 바이오레"
      : "Alphadoc | The Medical Workspace for a connected clinical day | Viore",
    description: lang === "ko"
      ? "질문과 근거 탐색, 진료노트, 진료서류, 문서 번역, 의료 공지까지. 흩어진 의료인의 업무를 한곳에서 이어주는 알파닥을 만나보세요."
      : "Meet Alphadoc, the Medical Workspace connecting questions, evidence discovery, clinical notes, forms, translation, and medical updates in one place.",
    path: "/product/alphadoc",
  });
}

export default async function AlphadocProductRoute({ params }: { params: ProductRouteParams }) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();

  return <ProductPage language={lang} />;
}
