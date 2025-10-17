# Blog Listing Blueprint (360×740 focus)

## Layout Intent
- Minimal chrome: sticky navigation followed by a single-column blog listing within `container-spacing` padding.
- Hero intro frames the blog mission with centered copy, then collapses into search and card grid.
- Card grid becomes one column on phones, two columns ≥768px, three columns ≥1024px.

## Priority Content Blocks
1. **Intro** — title `Blog: Prawo Pracy w Pigułce`, supporting description, brand emphasis.
2. **Search** — inline icon + input field for filtering titles/descriptions.
3. **Post Cards** — cover image, meta row (date/read time), title, excerpt, tag badges, CTA.
4. **Newsletter** — value proposition, email input + CTA, bonus copy.
5. **Global Chrome** — navigation and footer reused from root.

## Interaction Goals
- Search filters cards on input without layout shift; maintain keyboard focus.
- Each card links to detail page and exposes explicit "Czytaj więcej" CTA.
- Newsletter input must align to Calm Control voice; button triggers email capture (no backend yet).

## Constraint Summary
- Maintain `container-spacing` gutters; ensure cards stay within 360px viewport without horizontal scroll.
- CTA sizes ≥48px height, including newsletter button.
- Card shadows stay within Calm Control palette (soft, low elevation).
- Search input uses accessible label and retains icon spacing at small widths.

## Calm Control Cues
- Soft gradients limited to newsletter block; rest uses muted surfaces with subtle shadows.
- Typography hierarchy: `text-4xl` headline, `text-xl` paragraph, `text-sm` meta data.
- Rounded corners (`rounded-2xl`) align with brand softness.

## Known Dependencies & Reuse Patterns
- Cards composed of `Card`, `CardHeader`, `CardContent` from UI kit.
- Newsletter shares button/input primitives with hero CTAs.
- Navigation/footer identical to home blueprint; reuse anchor IDs for menu items.

## Open Questions
- Confirm search input retains 48px tap target on small screens.
- Validate newsletter form error states (none yet) for a11y.
- Evaluate cover image lazy-loading strategy for performance on mobile networks.
