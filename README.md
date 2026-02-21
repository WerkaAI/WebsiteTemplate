# Website Template (Next.js + MDX)

Reusable starter for marketing websites and content hubs. Built with Next.js App Router, TypeScript, Tailwind, shadcn/radix UI, and MDX.

## Documentation

- Central index: [docs/README.md](docs/README.md)
- Roadmap/status: [docs/foundation/ROADMAP_12_WEEKS.md](docs/foundation/ROADMAP_12_WEEKS.md)

Kept by default:
- Architecture decisions: `docs/adr/**`
- Foundation/process docs: `docs/foundation/**`
- Security documentation: `docs/security/**`

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
npm run test:contact-form  # browser check for landing + /kontakt forms
npm run test:csp      # CSP lifecycle gate check
npm run test:boundary # CoreStarter vs PerProject boundary check
npm run security:inventory # security inventory snapshot
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

## Repository hygiene

- Keep repository content minimal: source code, required assets, and key documentation only.
- Do not commit local artifacts (`.next/`, logs, temporary reports, local caches).
- Remove one-off migration notes and ad-hoc review files after decisions are captured in ADR/foundation/security docs.

## Notes

- The OG image route uses Edge runtime.
- Consider adding `rehype-sanitize` if you plan to accept raw HTML in MDX from untrusted sources.
