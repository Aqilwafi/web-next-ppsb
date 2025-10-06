import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   eslint: {
    ignoreDuringBuilds: true, // ⬅️ ini kuncinya
  },
};

export default nextConfig;
