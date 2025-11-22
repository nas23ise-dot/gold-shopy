import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configure for static export with App Router
  distDir: 'out',
  // Removed exportPathMap as it's incompatible with App Router
  // Using generateStaticParams in app directory instead
};

export default nextConfig;