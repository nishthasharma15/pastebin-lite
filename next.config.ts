// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure App Router is being used
  experimental: {
    // Remove if you're on Next.js 13.4+
  },
  // Explicitly set output (optional but recommended)
  output: 'standalone',
}

module.exports = nextConfig