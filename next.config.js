/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: "https",
        hostname: "lexica-serve-encoded-images2.sharif.workers.dev",
      },
    ],
    
    domains: ["www.ujjainkalsarp.com"],
    formats: ["image/webp"],
    deviceSizes: [640, 768, 1200, 1920], // Match common viewport widths
    imageSizes: [256, 384, 640, 750, 828, 1080, 1200, 1920],
  },
};

module.exports = nextConfig;

