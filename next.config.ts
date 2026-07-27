import type { NextConfig } from "next";

const staticAssetCacheHeader = {
  key: "Cache-Control",
  value: "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=604800",
};

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  experimental: {
    globalNotFound: true,
  },
  async redirects() {
    return [
      {
        source: "/global",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/global/",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/legal",
        destination: "/ko/legal",
        permanent: true,
      },
      {
        source: "/legal/",
        destination: "/ko/legal",
        permanent: true,
      },
      {
        source: "/:path+/",
        destination: "/:path+",
        permanent: true,
      },
    ];
  },
  async headers() {
    return ["assets", "brand", "media"].map((directory) => ({
      source: `/${directory}/:path*`,
      headers: [staticAssetCacheHeader],
    }));
  },
};

export default nextConfig;
