# Blog Review & Optimization Master Plan

## Goal
Maximize the blog's readability, educational value for franchisees, and SEO performance. The blog should serve as a high-utility resource, positioning "AutoŻaba" as an authority.

## 1. Audit & Discovery
- [x] **Technical Audit**: Checked `src/app/blog` structure, metadata generation, and sitemap. **Findings**: Metadata is dynamic, JSON-LD is present, Sitemap is correct.
- [x] **Content Audit**: Reviewed existing MDX files. **Findings**: Heavy use of raw HTML classes (`blog-hero`, `blog-section`). Needs refactoring to React Components for maintainability.
- [x] **UX/UI Audit**: Evaluated reading experience. **Findings**: Good base typography (`prose`), but missing "Table of Contents" and "Reading Progress".
- [x] **SEO Audit**: Checked Schema markup. **Findings**: `Article` and `BreadcrumbList` schema are correctly implemented.

## 2. Strategy: The "Franchisee-First" Approach
To make the content "very useful" for franchisees, we will introduce:
- **"TL;DR" / Executive Summary**: A quick bulleted list at the top of each article.
- **"Actionable Takeaways"**: Clear steps the franchisee can apply immediately.
- **"Legal/Compliance Notes"**: Specific callouts for Tarcza Prawna compliance (if applicable).
- **Estimated Reading Time**: Respect their busy schedule.
- **Print-Friendly Styles**: In case they want to print a guide for their staff.

## 3. Implementation Plan

### Phase 1: Component Architecture (New)
- [x] **Create MDX Components**:
    - `BlogHero`: Replaces `<div className="blog-hero">`.
    - `BlogSection`: Replaces `<section className="blog-section">`.
    - `BlogChecklist`: Replaces `<ul className="blog-checklist">`.
    - `BlogCallout`: New component for warnings/tips.
    - `TLDR`: New component for executive summary.
- [x] **Navigation Components**:
    - `TableOfContents`: Sticky sidebar component.
    - `ReadingProgress`: Top progress bar.

### Phase 2: Refactoring & Content
- [x] **Refactor `2025-10-25-jak-wdrazamy-klientow.mdx`**:
    - Replace HTML with new components.
    - Add "TL;DR" section.
    - Add "Actionable Takeaways".
- [x] **Update `mdx-components.tsx`**: Ensure components are available globally or imported correctly.
- [x] **Refactor `2025-08-21-witaj-autozaba.mdx`**:
    - Replace HTML with new components.
    - Add "TL;DR" section.
- [x] **Refactor `2025-10-26-jak-nauczylismy-autozabe-uczyc.mdx`**:
    - Replace HTML with new components.
    - Add "TL;DR" section.

### Phase 3: Visual Polish
- [x] **Typography**: Verify `prose` styles match the "Premium" aesthetic.
- [x] **Print Styles**: Add `@media print` styles to `globals.css`.

## 4. Verification
- [x] **Lighthouse SEO Score**: Target 100/100.
- [x] **Mobile Responsiveness Check**: Verified reading experience on phone.
- [x] **User Simulation**: Walk through a post as a "Franchisee" looking for a specific answer.
