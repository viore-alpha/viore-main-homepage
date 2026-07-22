import type { NextConfig } from "next";

const staticAssetCacheHeader = {
  key: "Cache-Control",
  value: "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=604800",
};

const nextConfig: NextConfig = {
  async headers() {
    return ["assets", "brand", "media"].map((directory) => ({
      source: `/${directory}/:path*`,
      headers: [staticAssetCacheHeader],
    }));
  },
};

export default nextConfig;
