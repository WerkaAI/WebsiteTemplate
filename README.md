# Website Template (Next.js + MDX)

Reusable starter for marketing websites and content hubs. Built with Next.js App Router, TypeScript, Tailwind, shadcn/radix UI, and MDX.

## Requirements

- Node.js 20+

## Setup

```bash
npm install
cp .env.local.example .env.local
```

## Scripts

```bash
npm run dev          # start dev server
npm run build        # production build
npm run start        # run production server
npm run lint         # eslint
npm run typecheck    # typescript check
npm run browserslist:update  # optional, update caniuse db
npm run test:smoke    # smoke test for critical routes
```

To analyze bundle sizes:

```bash
ANALYZE=true npm run build
```

## Content authoring

- Blog posts live in `content/blog/*.mdx` with frontmatter (`title`, `description`, `date`, `tags`, `cover`, `draft`)
- Tutorials live in `content/tutorials/*.mdx`; required fields are described in `content/tutorials/README.md`
- MDX headings are auto-linkable; mapping is in `mdx-components.tsx`

## Images

- Use `next/image`. Remote patterns allow `images.unsplash.com`.
- OG image available at `/og-image.jpg` (rewritten to a dynamic generator at `/opengraph-image`).

## SEO

- `metadataBase` uses `NEXT_PUBLIC_SITE_URL`
- `robots.txt` and `sitemap.xml` are generated under `/robots.txt` and `/sitemap.xml`

## CI

- GitHub Actions workflow runs typecheck, lint, tests, and build on PRs and pushes to `main`.

## White-label checklist

Before starting a new client project:
- replace brand copy in `src/app` and `src/components`
- set `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_APP_URL`, contact emails in `.env.local`
- replace logo/favicon/manifest assets in `public/`
- add project-specific legal pages and policy text
- replace sample MDX content in `content/blog` and `content/tutorials`

## Notes

- The OG image route uses Edge runtime.
- Consider adding `rehype-sanitize` if you plan to accept raw HTML in MDX from untrusted sources.
