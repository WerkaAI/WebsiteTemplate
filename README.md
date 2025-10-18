# AutoŻaba Marketing (Next.js + MDX)

Marketing site and blog for AutoŻaba, built with Next.js App Router, TypeScript, Tailwind, shadcn/radix UI, and MDX.

## Requirements
- Node.js 20+

## Setup
```bash
npm install
cp .env.local.example .env.local  # set NEXT_PUBLIC_SITE_URL
```

## Scripts
```bash
npm run dev          # start dev server
npm run build        # production build
npm run start        # run production server
npm run lint         # eslint
npm run typecheck    # typescript check
npm run browserslist:update  # optional, update caniuse db
```

To analyze bundle sizes:
```bash
ANALYZE=true npm run build
```

## Content authoring
- Blog posts live in `content/blog/*.mdx` with frontmatter (title, description, date, tags, cover, draft)
- Tutoriale produktu żyją w `content/tutorials/*.mdx`; wymagane pola frontmatteru opisuje `content/tutorials/README.md`
- MDX headings są auto-linkowane; więcej w `mdx-components.tsx`
- Dodatkowe szczegóły dla zespołu contentu: `BLOG_SETUP.md` i `docs/tutorials-page-plan.md`

## Images
- Use `next/image`. Remote patterns allow `images.unsplash.com`.
- OG image available at `/og-image.jpg` (rewritten to a dynamic generator at `/opengraph-image`).

## SEO
- `metadataBase` uses `NEXT_PUBLIC_SITE_URL`
- `robots.txt` and `sitemap.xml` are generated under `/robots.txt` and `/sitemap.xml`

## CI
- GitHub Actions workflow runs typecheck, lint, and build on PRs and pushes to `main`.

## Notes
- The OG image route uses Edge runtime.
- Consider adding `rehype-sanitize` if you plan to accept raw HTML in MDX from untrusted sources.
