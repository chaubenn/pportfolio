# Ben Chau - Portfolio

This is my personal portfolio website built with Next.js, featuring:

- **Home Page** - Personal bio and recent blog posts
- **Blog** - MDX-powered blog with syntax highlighting
- **Resume** - Interactive PDF viewer with download functionality
- **Responsive Design** - Optimized for all device sizes

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- MDX for blog content

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

## Deploy

This portfolio is deployed on GitHub Pages using GitHub Actions for automatic deployment.

### GitHub Pages Setup
- The site is automatically built and deployed when changes are pushed to the main branch
- Uses GitHub Actions workflow (`.github/workflows/deploy.yml`) for CI/CD
- Static export configuration optimized for GitHub Pages hosting

### Custom Domain
To set up a custom domain:
1. Add your domain in GitHub repository Settings → Pages
2. Create a CNAME file: `echo "yourdomain.com" > public/CNAME`
3. Configure DNS records with your domain provider

---

© 2025 Ben Chau - MIT Licensed
