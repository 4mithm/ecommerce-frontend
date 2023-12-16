

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname:"/**"

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
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        pathname:"/**"

      },
      {
        protocol: 'https',
        hostname:"www.kasandbox.org",
        pathaname:"/**"
      }

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
