/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Enables static export for Next.js 14+
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // Required for static export (`output: "export"`).
    // Next.js image optimization API is not available without a Node server.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  // For static export, set security headers in S3/CloudFront instead of Next headers().
};

module.exports = nextConfig;
