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
  // Specify the correct root directory to resolve multiple lockfiles warning
  turbopack: {
    root: "C:\\Users\\huesh\\gold-shop\\consumer-website"
  }
};

export default nextConfig;