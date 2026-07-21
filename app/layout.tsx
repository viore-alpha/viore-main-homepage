import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./technology.css";
import "./knowledge.css";
import {
  HOME_SEO,
  SEO_KEYWORDS,
  SITE_NAME,
  SITE_ORIGIN,
  SOCIAL_IMAGE_PATH,
  SQUARE_LOGO_PATH,
} from "@/app/seo";

const defaultSeo = HOME_SEO.ko;

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: defaultSeo.title,
  description: defaultSeo.description,
  applicationName: "바이오레",
  authors: [{ name: "Viore Inc.", url: SITE_ORIGIN }],
  creator: "Viore Inc.",
  publisher: "Viore Inc.",
  category: "Medical Technology",
  keywords: SEO_KEYWORDS,
  referrer: "origin-when-cross-origin",
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  icons: {
    icon: [{ url: SQUARE_LOGO_PATH, type: "image/png", sizes: "1024x1024" }],
    shortcut: SQUARE_LOGO_PATH,
    apple: [{ url: SQUARE_LOGO_PATH, type: "image/png", sizes: "1024x1024" }],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: "바이오레",
    statusBarStyle: "default",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "jHNuqMrzpeZwUGWutN9Mms8neuaBP87Ouc1RNOYBSyg",
    other: {
      "naver-site-verification": "0e061d531e55879e99b874a7f3c1ed095c7462d6",
    },
  },
  openGraph: {
    title: defaultSeo.title,
    description: defaultSeo.description,
    type: "website",
    url: "/ko",
    locale: defaultSeo.locale,
    alternateLocale: [HOME_SEO.en.locale],
    siteName: SITE_NAME,
    images: [
      {
        url: SOCIAL_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: "흰 배경의 바이오레 영문 로고",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSeo.title,
    description: defaultSeo.description,
    images: [SOCIAL_IMAGE_PATH],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/toss/tossface@1.6.1/dist/tossface.css"
          rel="stylesheet"
          integrity="sha384-NvFWxNBCtS/t7ARZAnagIacT7UimQmV2ye6DK4dEJvzGQthX59t7e+f1Ll/6xMXR"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
