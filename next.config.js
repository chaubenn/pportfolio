/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure proper static export for GitHub Pages
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  basePath: '/pportfolio',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
