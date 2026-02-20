# Review Plan: AutoZabaMarketing (Next.js + MDX)

Date: 2025-09-24
Reviewer: Web landing + MDX blog specialist

## Progress to date (as of 2025-09-25)

- Quality gates: lint/typecheck/build all PASS; optional bundle analyzer run completed (reports in `.next/analyze/`).
- MDX security/stability: Added `rehype-sanitize` and robust meta extraction with `gray-matter` fallback to prevent prerender errors.
- Images/perf: Migrated raw `<img>` to `next/image`; added Unsplash `remotePatterns`; marked blog cover image as `priority`.
- A11y: Added skip link and main landmark; improved nav ARIA (roles/labels, aria-expanded); global `:focus-visible` styles.
- Blog UX: Added `loading.tsx` and `error.tsx` for blog index and posts; friendlier fallbacks; fixed static params/meta extraction.
- SEO/branding: Dynamic OG image route; rewrite `/og-image.jpg` → `/opengraph-image`; favicon + `site.webmanifest`; Organization JSON-LD on home; Article JSON-LD on posts.
- Forms/validation: Rewrote contact form with `react-hook-form` + `zod`; accessible errors, aria attributes, disabled submit while submitting.
- Security headers: Added Referrer-Policy, X-Content-Type-Options, X-Frame-Options, Permissions-Policy; new production Content-Security-Policy (allows YouTube embeds, tight defaults).
- Video/privacy: Updated demo iframe to `youtube-nocookie.com` and aligned with CSP; tightened `allow` list.
- External links: Hero CTA opens with `noopener,noreferrer`.
- CI/CD: GitHub Actions workflow for lint/typecheck/build; scripts added for typecheck and browserslist update.

Baseline build metrics (Next.js report):

- First Load JS shared by all: ~87.3 kB
- Routes (First Load JS):
   - `/` ≈ 175 kB; `/blog` ≈ 134 kB; `/blog/[slug]` ≈ 92.6 kB
- Analyzer reports: `.next/analyze/client.html`, `edge.html`, `nodejs.html`
 - Final report and walkthrough published: `docs/review/FINAL_REPORT.md`

## 1) Scope and objectives

- App type: Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/radix UI + MDX blog
- Primary scope: Landing page quality, performance, accessibility, SEO, and MDX content pipeline for a marketing site.
- Secondary scope: Dev experience, testing, CI/CD, security posture.

## 2) Deliverables

- Executive summary: Top issues (severity, impact, effort), recommended next steps
- Detailed findings by category with code pointers and rationale
- Quick wins list (low-risk improvements we can implement immediately)
- Suggested PR notes/diffs for prioritized fixes
- Baseline metrics: Lighthouse (desktop/mobile), bundle size notes, lint/typecheck status

## 3) Severity / impact / effort rubric

- Critical: Security or data-loss risks; severe SEO/perf blockers; a11y blockers on primary flows
- High: Significant UX/a11y/perf issues; incorrect content semantics; broken metadata
- Medium: Maintainability debt, inconsistent patterns, missing tests, minor UX issues
- Low: Polish, docs, tidy-ups, consistency improvements

Each finding also receives:
- Impact: High / Medium / Low (business/user effect)
- Effort: S / M / L (small <2h, medium <1d, large >1d)

## 4) Environment & commands

- Node: 20.x (matches `.replit` modules)
- Minimal env vars: `NEXT_PUBLIC_SITE_URL` (observed in `src/app/layout.tsx`)

Common commands:

```bash
# install
npm install

# dev server
npm run dev

# build
npm run build

# lint
npm run lint

# typecheck
npm run typecheck

# optional: refresh browserslist database
npm run browserslist:update
```

Optional tools (to be added during review if needed):
- Bundle analyzer: `@next/bundle-analyzer`
- Lighthouse: Chrome DevTools or CLI
- a11y checks: axe DevTools, manual keyboard testing

Note: Bundle analyzer is already wired; set `ANALYZE=true` when building to emit reports to `.next/analyze/`.

## 5) Phases and checklist

1. Inventory project structure and routes
   - Map `src/app/**` routes, layouts, shared components, error/loading/not-found files
   - Review key configs: `next.config.mjs`, `tailwind.config.ts`, `tsconfig.json`
   - Map MDX content: `content/blog/**`, `mdx-components.tsx`, remark/rehype plugins

2. Verify environment and quality gates
   - Run: dev, build, lint, typecheck; capture warnings/errors
   - Confirm required env vars and defaults

3. Architecture and routing audit
   - App Router usage; server vs client components boundaries
   - Metadata config (static vs dynamic, `metadataBase`, Open Graph)
   - Route groups, dynamic segments, code-splitting, RSC data flows

4. UI system and theming review
   - Tailwind setup, design tokens, spacing/typography scale
   - shadcn/radix use: accessibility props, composition, variant patterns
   - Dark mode (next-themes), theme persistence, prefers-color-scheme

5. Accessibility (a11y) audit
   - Semantic landmarks (header/nav/main/footer), labels, roles
   - Keyboard nav, focus order/traps, visible focus states
   - Color contrast (WCAG AA), reduced motion support

6. Performance and bundle size
   - next/image usage, font loading (next/font), CLS/INP considerations
   - Code-splitting, dynamic import, tree-shaking of icon libs
   - Caching/ISR/revalidation settings, static vs dynamic rendering
   - Lighthouse baseline (mobile/desktop) and key CWV notes

7. SEO and social metadata
   - Canonical URLs, `metadataBase`, OG/Twitter, favicons
   - `robots.txt`, `sitemap.xml`, structured data (JSON-LD if relevant)
   - MDX frontmatter -> page metadata mapping

8. MDX content pipeline
   - `mdx-components.tsx` safety: sanitize/escape rules; disallowed raw HTML
   - remark/rehype plugins: `rehype-slug`, `rehype-autolink-headings`, gfm/frontmatter
   - Code blocks, images, embeds, headings linkability
   - Authoring workflow in `content/blog/**` (drafts, tags, cover, dates)

9. Forms and validation
   - `react-hook-form` + `zod` schema alignment
   - Error states, accessibility (aria-invalid, aria-describedby)
   - Loading/disabled states and optimistic UI where applicable

10. Data fetching and state
    - Server actions/fetch patterns; `cache`, `revalidate`, `force-cache`
    - Loading/error boundaries; minimal client state

11. Security posture
    - `next.config.mjs` headers (CSP, Referrer-Policy, Permissions-Policy)
    - Env var handling; MDX HTML injection risks; dependency audit

12. Error, loading, and not-found UX
    - Coverage of `error.tsx`, `loading.tsx`, and `not-found.tsx`
    - Friendly copy and retry/return paths

13. Testing strategy
    - Identify existing tests; propose minimal setup (Vitest + RTL; Playwright for smoke)
    - Add `typecheck` script in `package.json`

14. CI/CD and repo hygiene
    - GitHub Actions (lint/typecheck/build), Dependabot, PR templates
    - README with local setup and content authoring guide (BLOG_SETUP.md exists)

15. Quick wins list
    - Small, low-risk fixes to ship during review window

16. Final report and walkthrough
    - Structured findings with severity/impact/effort
    - Suggested diffs and PR plan

### Checklist status

- [x] 1. Inventory project structure and routes
- [x] 2. Verify environment and quality gates (build/lint/typecheck PASS)
- [x] 3. Architecture and routing audit (App Router, metadata, OG route; more deep-dive optional)
- [x] 4. UI system and theming review (ThemeProvider + toggle added; tokens reviewed; prefers-reduced-motion added)
- [x] 5. Accessibility audit (landmarks, nav ARIA, focus-visible done; contrast/reduced-motion review pending)
- [~] 6. Performance and bundle size (analyzer run complete; targeted cuts/lighthouse pending)
- [x] 7. SEO and social metadata (canonicals present; BreadcrumbList JSON-LD added; OG visuals enhancement optional)
- [x] 8. MDX content pipeline (sanitized, slugged, autolinked; meta fallback added)
- [x] 9. Forms and validation (react-hook-form + zod, accessible errors)
- [x] 10. Data fetching and state (loading/error boundaries for blog; minimal client state retained)
- [x] 11. Security posture (headers + new production CSP; MDX sanitized)
- [x] 12. Error, loading, and not-found UX (added for blog + not-found page)
- [~] 13. Testing strategy (typecheck script present; Vitest + RTL baseline added; e2e tests pending)
- [x] 14. CI/CD and repo hygiene (CI + Dependabot + husky pre-commit + lint-staged configured)
- [x] 15. Quick wins list (multiple shipped during review window)
- [x] 16. Final report and walkthrough (see `docs/review/FINAL_REPORT.md`)

## 6) Artifacts and evidence

- Store screenshots (Lighthouse), logs, and notes under `docs/review/` (to be created)
 - Final report lives at `docs/review/FINAL_REPORT.md`. Add Lighthouse screenshots here when available.
- Reference exact file paths and line ranges for all findings
 - Bundle analyzer reports in `.next/analyze/`
 - Latest build output lists route sizes (see Progress section)

## 7) Initial hypotheses to verify

- `NEXT_PUBLIC_SITE_URL` default exists; verify canonical links and OG URLs
- MDX pipeline uses `rehype-slug`/`autolink` but sanitization not evident—assess HTML injection risk
   - Status: mitigated; `rehype-sanitize` added and MDX components hardened
- Tailwind/shadcn tokens consistent; verify dark mode coverage and a11y props on Radix components
- Large icon sets or charts could inflate bundle—check tree-shaking
   - Status: no `react-icons` found; `lucide-react` is tree-shaken; chart/day-picker/carousel present in UI library—ensure route-level lazy load if used

## 8) Proposed timeline

- Day 0: Inventory + quality gates + baseline metrics
- Day 1: Architecture/UI/a11y/perf/SEO/MDX deep dives
- Day 2: Quick wins PR(s) + final report

## 9) Acceptance criteria

- All quality gates verified with captured output
- Baseline Lighthouse and bundle notes included
- Top issues prioritized with clear next steps and estimate
- ≥5 actionable quick wins identified; 1–2 implemented if requested

## Next steps

- Review the current foundation roadmap in `docs/foundation/ROADMAP_12_WEEKS.md` and slot upcoming design sprints.
- Tighten CSP further with nonces/hashed scripts and `next/script` where possible; enumerate any external `connect-src` if needed.
- Run Lighthouse (mobile/desktop) and capture screenshots; address top opportunities (fonts/LCP/INP).
- Verify canonical tags site-wide; consider BreadcrumbList JSON-LD.
- Consider dynamic imports for heavy UI widgets if used on non-critical routes (charts, date-picker, carousel).
- Add Dependabot config and optional pre-commit hooks (husky + lint-staged).
- Prepare the final report with severity/impact/effort and suggested PRs.

---

This plan will guide a focused, business-impactful review of the landing site and MDX blog with concrete fixes and measured improvements.
