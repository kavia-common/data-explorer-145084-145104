 /** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Avoid failing the production build due to lint errors
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
