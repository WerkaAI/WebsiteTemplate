# MDX Master Plan

## Strategic goals

1. Robust security in the MDX pipeline.
2. Better DX through type-safe frontmatter.
3. Richer components and content UX.
4. SEO + performance consistency.
5. Regression safety via tests.

## Phases

### 1) Security & pipeline simplification (Critical)
- Audit sanitization flow in `next.config.mjs`.
- Move inline plugins to `src/lib/mdx/*`.
- Re-validate handling of custom MDX JSX nodes.

### 2) Content architecture & type safety
- Add Zod schemas for blog/tutorial frontmatter.
- Validate frontmatter at build time.
- Centralize content loaders in `src/lib/content.ts`.

### 3) Components & features
- Add syntax highlighting (`rehype-pretty-code` or equivalent).
- Expand MDX component set (`Callout`, `Tabs`, media helpers).
- Standardize accessibility props.

### 4) SEO & performance
- Metadata generated from frontmatter.
- Ensure sitemap coverage and RSS.
- Keep JSON-LD on articles/tutorials.
- Watch bundle impact of MDX components.

### 5) Testing & validation
- Broken internal link checker for MDX.
- Rendering tests for critical MDX components.
- Automated accessibility checks for content pages.

## Next action
Decide policy: trusted-only content vs strict sanitization for potentially untrusted content.
