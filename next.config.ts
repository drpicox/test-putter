import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.GITHUB_ACTIONS && process.env.NODE_ENV === 'production'
    ? '/test-putter'
    : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
