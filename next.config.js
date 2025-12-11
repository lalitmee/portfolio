/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Enable static HTML export
  basePath: '/portfolio', // GitHub Pages subdirectory
  trailingSlash: true, // Better compatibility with static hosts
  images: {
    unoptimized: true, // Required for static export (disables Image Optimization API)
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
