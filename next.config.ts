import withPWAInit from "next-pwa";
import type { NextConfig } from "next";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  buildExcludes: [/middleware-manifest\.json$/],
});

const nextConfig: NextConfig = {
  turbopack: {},

  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.weatherapi.com",
      },
      {
        protocol: "https",
        hostname: "openweathermap.org",
      },
    ],

    minimumCacheTTL: 2592000,

    formats: ["image/avif", "image/webp"] as const,
  },

  experimental: {
    optimizeCss: true,
  },
};

export default withPWA(nextConfig);
