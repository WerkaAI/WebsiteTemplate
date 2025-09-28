# Visual Refresh Plan (GPT-5-Codex Ready)

_Last updated: 2025-09-28_

## 1. Goals

- Strengthen the "chaos → calm" story with premium visuals.
- Protect conversions: clearer CTAs, stronger proof, richer product visuals.
- Keep changes accessible, performant, and easy to ship inside this Next.js + Tailwind stack.
- Produce a repeatable playbook Codex can execute task-by-task.

## 2. Guardrails for every task

- Prefer `apply_patch` for edits; keep diffs scoped.
- Stay inside existing design tokens unless expanding the palette is part of the task.
- Re-run `npm run lint`, `npm run typecheck`, and `npm run build` before merging major visual changes.
- Respect reduced-motion, focus-visible, and color-contrast rules already in the repo.
- Defer heavy assets (video, large images) to lazy loading or async imports.

## 3. Quick setup checklist

1. `npm install`
2. `npm run lint && npm run typecheck`
3. `npm run dev` (preview while iterating)
4. When a milestone finishes: `npm run build && npm test`

## 4. Work queue (priority order)

### 4.1 Quick wins (ship first)

1. Hero CTA + proof strip
   - Wrap primary CTA in gradient aura; add secondary text link to demo.
   - Add trust strip (logos or metrics) below the buttons.
2. Typography hygiene
   - Set `max-w-[65ch]` on long paragraphs; introduce clamp-based heading utilities.
3. Consistent imagery tint
   - Apply brand overlay via pseudo-element on Problem/Solution/Testimonial images.
4. Dark-mode polish
   - Provide dark hero gradient and adjust card shadows/icons for contrast.

### 4.2 Sprint 1 (1–3 day chunk)

1. Hero visual revamp
   - Swap the static calendar for layered UI mockups or a short demo loop.
   - Rebalance copy grid; stagger text + proof entry animations.
2. Navigation + footer
   - Highlight login CTA, add "Bezpłatna konsultacja" button.
   - Add scroll progress indicator; expand footer with links, compliance badge, CTA.
3. Section narrative
   - Apply gradients per section (chaos → neutral → calm) and add timeline separators.
   - Restructure Problem/Solution cards with iconography and metrics.

### 4.3 Sprint 2 (optional / deeper investment)

1. Motion system
   - Replace hover scaling with translate/shadow micro-interactions.
   - Add scroll-trigger reveals via reusable hook (`useInView`).
2. Testimonial + stats carousel
   - Build component with animated counters, quotes, logos.
3. Brand assets
   - Source/produce tinted photography and a 15s product demo video.
4. Lightweight design system sync
   - Mirror tokens/components in Figma; document usage in repo.

## 5. Task reference (grab as needed)

- **Tokens & theme**: extend palette (`--primary-strong`, `--cta`), create heading utilities, document gradients.
- **Section refresh**: Problem (warm gradient, empathy quote), Solution (stepper, metrics), Pricing (plan cards), Testimonials (tinted background, proof badges).
- **Contact funnel**: redesign `/kontakt` split layout, add reassurance panel + success state animation.
- **Nav/footer extras**: persistent mobile CTA (phone/WhatsApp), footer newsletter block.
- **Motion**: `data-animate` attributes, reduced-motion fallbacks, shared spring configs if using framer-motion later.

## 6. Dependencies & coordination notes

- Confirm palette/typography tweaks with marketing stakeholder before widening usage.
- Hero mockup needs current UI screenshots or figma frame.
- Validate scroll-trigger animations on Safari/iOS to avoid jank.
- Loop in content/legal for updated quotes, compliance stats, and logos.

## 7. Done when

- Updated visuals live for hero, Problem, Solution, Pricing, Testimonials, Contact, nav, footer.
- Dark mode and accessibility checks pass; Lighthouse score within ±5% of baseline.
- README or this file updated with status notes + remaining backlog.
- Before/after screenshots captured for analytics review.
