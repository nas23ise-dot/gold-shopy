import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Specify the root directory to avoid workspace detection issues
  turbopack: {
    root: "."
  }
};

export default nextConfig;