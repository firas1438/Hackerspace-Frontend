import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.hackerspace.tn",
        pathname: "/upload/files/**",
      },
    ],
  },
};

export default nextConfig;
