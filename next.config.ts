import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/prompt-to-website",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
