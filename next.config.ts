import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/site",
  assetPrefix: "/site/",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "bcalabs.org",
      },
    ],
  },
};

export default nextConfig;
