/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure proper static export for Netlify
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
