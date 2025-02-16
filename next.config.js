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
  },
};

module.exports = nextConfig;

