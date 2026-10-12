/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [{
      source: '/apps/markdown-preview',
      destination: '/apps/markdown-preview/',
      permanent: true,
    }];
  },
  async rewrites() {
    return [{
      source: '/apps/markdown-preview/:path*',
      destination: 'https://md-reader-lalit.vercel.app/:path*',
    }];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars1.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
