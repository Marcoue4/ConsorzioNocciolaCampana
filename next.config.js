/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.consorzionocciolacampana.it'
      }
    ]
  }
}

module.exports = nextConfig
