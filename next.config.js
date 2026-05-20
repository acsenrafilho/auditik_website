/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Enables static export for Next.js 14+
  trailingSlash: true, // Keeps exported routes compatible with S3 static website hosting on refresh.
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
  // Satellite pages live under pages/subs-aparelhos/ for code organization; public URLs use
  // flat stubs in pages/ (e.g. aparelhos-auditivos-em-piracicaba.tsx re-export).
  exportPathMap: async (defaultPathMap) => {
    const pathMap = {};
    for (const [pathname, config] of Object.entries(defaultPathMap)) {
      if (pathname.startsWith("/subs-aparelhos/")) continue;
      pathMap[pathname] = config;
    }
    return pathMap;
  },
};

module.exports = nextConfig;
