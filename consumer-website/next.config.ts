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
  // distDir: 'out', // This is not needed for static export
  // Specify the root directory to avoid workspace detection issues
  turbopack: {
    root: "."
  },
  // Added for GitHub Pages deployment
  // Using base path for GitHub Pages
  basePath: '',
};

export default nextConfig;