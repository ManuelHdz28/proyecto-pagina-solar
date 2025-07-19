import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
      {
      protocol: 'https',
      hostname: 'res.cloudinary.com',
      pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'grupo-mc-solar.onrender.com',
        port: '',
        pathname: '/media/**',
      },
    ],
  },
};

export default nextConfig;

