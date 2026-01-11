import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { 
    unoptimized: true 
  },
  basePath: "/company-review-listing",
  assetPrefix: "/company-review-listing/",
};

export default nextConfig;