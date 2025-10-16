# Home Route Blueprint (360×740 focus)

## Layout Intent
- Single-column scroll that preserves Calm Control breathing space using `container-spacing` padding and `section-padding` rhythm.
- Sticky navigation with progress bar anchoring the experience; hero occupies first viewport with CTA stack followed by narrative sections (`problem`, `solution`, `calculator`, `demo`, `testimonials`, `pricing`, `blog`, `contact`).
- Each section uses soft gradients/rounded cards to move from chaos ➝ control storytelling without causing horizontal overflow.

## Priority Content Blocks
1. **Navigation** — sticky top bar with progress indicator, mobile sheet menu, primary CTA (`Zaloguj się`).
2. **Hero** — headline + supporting copy, register/demo CTA pair, trust strip carousel, interactive schedule board illustration.
3. **Problem Section** — three cards (chaos, compliance, balance) with imagery, stats, and count-up interactions.
4. **Solution Section** — value pillars, legal shield messaging, timeline; needs parity with Calm Control tokens.
5. **Calculator** — ROI calculator with inputs/toggles; ensure form controls accessible on small screens.
6. **Demo** — embedded video/steps; check tap targets and aspect ratios.
7. **Testimonials & Pricing** — social proof cards + pricing tiers with CTA buttons.
8. **Blog Preview** — latest posts feed, cards linking to `/blog`.
9. **Contact Section & Footer** — lead capture form, trust indicators, footer navigation.

## Interaction Goals
- Smooth internal navigation via section IDs; sheet menu closes on selection.
- Hero register CTA opens new tab; demo CTA scrolls to `#demo`.
- Animated hero board tilts on pointer but must degrade gracefully for touch devices.
- Count-up stats, carousels, and theme toggle stay performant and respect reduced-motion preference.

## Constraint Summary
- No horizontal scroll at 360px; absolute hero orb/board must stay within viewport.
- Minimum tap target height 48px for buttons, sheet items, calculator inputs.
- Maintain WCAG AA contrast for text on gradients and image overlays.
- Keep line length within 65ch; avoid long Polish copy wrapping awkwardly.
- Motion adheres to Calm Control timing; reduced-motion paths produce static state.

## Calm Control Cues
- Gradual gradients (`hero-gradient`, `problem-wave`) support calm narrative.
- Shadows limited to `calm-shadow` palette; avoid harsh drop shadows.
- Typography: `heading-display` for hero, `text-xl` for supporting copy, consistent `text-sm` for labels.

## Known Dependencies & Reuse Patterns
- Layout primitives from `src/app/layout.tsx` and `src/app/globals.css` (`container-spacing`, `section-padding`).
- Buttons rely on `@/components/ui/button`; sheet from `shadcn` base.
- Hero board replicates 3D tilt effect used elsewhere? Unique but should reuse `motion` settings defined in CSS.
- Pricing/testimonials share card components; align spacing with `ProblemSection` cards to stay consistent.

## Open Questions
- Confirm if `calculator-section` inputs remain legible without zoom.
- Verify hero animated board/ orb does not trigger GPU jank on low-end mobile.
- Ensure external Unsplash images are optimized and not blocking LCP (consider placeholders/lazy loading).
