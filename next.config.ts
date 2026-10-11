import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  cacheComponents: true,
  // Preserve the existing prefetch behavior during the Next 16 upgrade.
  partialPrefetching: false,
  // This repository maintains its own AGENTS.md.
  agentRules: false,
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
