import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Specify the root directory to avoid workspace detection issues
  turbopack: {
    root: "."
  }
};

export default nextConfig;