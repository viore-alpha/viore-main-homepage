import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다 | Viore",
  description: "요청한 바이오레 페이지가 존재하지 않거나 이동되었습니다.",
};

export default function GlobalNotFound() {
  return (
    <html lang="ko-KR">
      <body
        style={{
          alignItems: "center",
          background: "#ffffff",
          color: "#101010",
          display: "flex",
          fontFamily: "Arial, sans-serif",
          justifyContent: "center",
          margin: 0,
          minHeight: "100vh",
        }}
      >
        <main style={{ maxWidth: 560, padding: 32, textAlign: "center" }}>
          <p style={{ fontSize: 13, letterSpacing: "0.12em", margin: "0 0 18px" }}>404 · VIORE</p>
          <h1 style={{ fontSize: 34, letterSpacing: "-0.04em", margin: "0 0 16px" }}>
            페이지를 찾을 수 없습니다.
          </h1>
          <p style={{ color: "#666666", lineHeight: 1.7, margin: "0 0 28px" }}>
            요청한 주소가 변경되었거나 존재하지 않습니다.
            <br />
            The requested page does not exist.
          </p>
          <Link href="/ko" style={{ color: "#101010", fontWeight: 700 }}>
            바이오레 홈페이지로 이동
          </Link>
        </main>
      </body>
    </html>
  );
}
