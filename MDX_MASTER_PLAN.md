# MDX Master Plan: Comprehensive Review & Improvement Strategy

## 1. Current State Analysis

### Architecture & Configuration
- **Pipeline**: Complex custom pipeline in `next.config.mjs` involving `rehypeMdxJsxToElements` -> `rehypeMdxProtect` -> `rehype-sanitize` -> `rehypeMdxRestore`.
- **Goal**: This pipeline attempts to sanitize content while preserving custom React components.
- **Risk**: The complexity makes it fragile and hard to debug. `mdxJsxFlowElement` nodes are manually converted to HAST elements and back, which is prone to edge cases.
- **Dependencies**: Uses `@next/mdx` v15, `rehype-sanitize`, and standard remark/rehype plugins.

### Content Structure
- **Location**: `content/` directory.
- **Frontmatter**: Handled by `remark-frontmatter` and `remark-mdx-frontmatter`.
- **Type Safety**: Currently lacks strict schema validation (e.g., Zod) for frontmatter, relying on loose typing or manual checks.

### Components
- **Mapping**: `mdx-components.tsx` maps standard HTML and a set of custom components (`BlogHero`, `TutorialStep`, etc.).
- **Styling**: Tailwind CSS via `className` props.

## 2. Strategic Goals

1.  **Robust Security**: Maintain protection against XSS, but simplify the pipeline if possible.
2.  **Developer Experience (DX)**: Type-safe frontmatter, better error messages, standard usage patterns.
3.  **Content Richness**: Support for advanced features (syntax highlighting, diagrams, interactive widgets).
4.  **SEO & Performance**: Optimized metadata, fast loading, proper indexing.
5.  **Maintainability**: Clean code, clear separation of concerns, automated testing.

## 3. Phased Implementation Plan

### Phase 1: Security & Pipeline Simplification (Critical)
**Objective**: Stabilize the rendering pipeline and ensure security without excessive complexity.

- [ ] **Audit Sanitization Logic**: Review `rehypeMdxProtect`/`Restore` and `rehypeMdxJsxToElements`.
    - *Decision Point*: If content is 100% internal/trusted, consider removing runtime sanitization to drastically simplify the build. If untrusted content is expected, refactor to use a standard library or a cleaner custom plugin.
- [ ] **Refactor `next.config.mjs`**: Extract inline plugins to separate files in `src/lib/mdx/`.
- [ ] **Verify `mdxJsxFlowElement` Handling**: Ensure the AST transformation doesn't break props or children (especially complex objects).

### Phase 2: Content Architecture & Type Safety
**Objective**: Ensure all content follows a strict schema and is easy to query.

- [ ] **Implement Zod Schemas**: Define schemas for Blog Posts, Tutorials, and other content types.
- [ ] **Frontmatter Validation**: Create a utility to validate MDX files against schemas at build time (or use a tool like `content-collections` or `velite` if `contentlayer` is too heavy/dead).
- [ ] **Centralized Data Access**: Create `src/lib/content.ts` to handle reading, sorting, and filtering MDX files type-safely.

### Phase 3: Component Ecosystem & Features
**Objective**: Enhance the reading experience with rich components.

- [ ] **Syntax Highlighting**: Integrate `rehype-pretty-code` or `rehype-highlight` for beautiful code blocks.
- [ ] **Enhanced Components**:
    - `Callout` (Info, Warning, Error, Success)
    - `Tabs` for code examples
    - `Image` with automatic captions and zoom (using `medium-zoom` or similar).
- [ ] **Standardize `mdx-components.tsx`**: Ensure all components accept standard props and are accessible.

### Phase 4: SEO & Performance
**Objective**: Maximize visibility and speed.

- [ ] **Metadata Generation**: Auto-generate `metadata` (title, description, OG images) from frontmatter.
- [ ] **Sitemap & RSS**: Ensure all MDX pages are included in `sitemap.xml` and generate an RSS feed.
- [ ] **Structured Data (JSON-LD)**: Inject `Article` or `HowTo` schema into tutorial/blog pages.
- [ ] **Bundle Analysis**: Check if any heavy MDX components are bloating the main bundle.

### Phase 5: Testing & Validation
**Objective**: Prevent regressions.

- [ ] **Broken Link Checker**: Script to verify internal links within MDX files.
- [ ] **Rendering Tests**: Unit tests to verify that critical components render correctly and sanitization doesn't strip valid content.
- [ ] **Accessibility Audit**: Automated check for `alt` tags, heading hierarchy, etc.

## 4. Immediate Next Steps
1.  **User Decision**: Confirm if strict runtime sanitization is required (vs. build-time trusted content).
2.  **Refactor**: Move inline plugins out of `next.config.mjs`.
3.  **Type Safety**: Set up Zod schemas for frontmatter.
