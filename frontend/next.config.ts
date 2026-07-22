import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fix Next.js Dev Cross-Origin HMR
  allowedDevOrigins: [
    'localhost:3000',
    '127.0.0.1:3000',
    '169.254.131.93:3000',
    '169.254.131.93',
  ],
};

export default nextConfig;
