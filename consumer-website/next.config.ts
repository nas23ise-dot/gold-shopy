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
  // Configure for static export on Vercel
  distDir: 'out',
  // Ensure proper handling of static export
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      // Add other static routes as needed
    };
  },
};

export default nextConfig;