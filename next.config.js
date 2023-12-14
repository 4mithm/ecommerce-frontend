/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'timbercom.s3.amazonaws.com',
        pathname:"/**"
      },
      {
        protocol: 'https',
        hostname: 'timbercom2.s3.amazonaws.com',
        pathname:"/**"
      },
    ]
  }
}

module.exports = nextConfig


// next.config.js

module.exports = {
  images: {
    domains: ['timbercom2.s3.amazonaws.com'],
  },
};
