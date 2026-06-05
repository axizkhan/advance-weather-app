/** @type {import('next').NextConfig} */
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  // Aggressively cache static assets
  buildExcludes: [/middleware-manifest\.json$/],
});

const nextConfig = {
  turbopack: {},
  reactStrictMode: true,
  images: {
    // Explicit remote image optimization patterns
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
    // Aggressive TTL caching (in seconds) - set to 30 days
    minimumCacheTTL: 2592000,
    formats: ["image/avif", "image/webp"],
  },
  // Ensure experimental features for fluid rendering
  experimental: {
    optimizeCss: true, // Only if standard css optimization is needed, removing to be safe
  },
};

export default withPWA(nextConfig);
