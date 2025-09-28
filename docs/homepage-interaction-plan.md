# Homepage Interaction Plan — Codex Workflow

_Last updated: September 28, 2025_

This document reframes the motion roadmap so GPT-5-Codex agents can execute it with minimal prompting, tight loops, and predictable validation.

## 1. Guardrails for Codex Sessions

- **Keep prompts minimal.** Describe target section + motion result in one short sentence; reference this plan instead of repeating details.
- **Use core tools only.** Default to `apply_patch` for edits, `npx next lint`, and `npm run build` when phases end.
- **Work in short loops.** Ship one subsection per task, recap deltas, then proceed.
- **Respect accessibility.** Wrap motion behind `prefers-reduced-motion` checks and preserve focus outlines.
- **Protect performance.** Stick to `transform`/`opacity`, reuse shared hooks, and avoid new heavy deps.

## 2. Motion Modules (Codex Briefs)

| Priority | Section | One-line brief for Codex |
|----------|---------|--------------------------|
| P0 | Navigation / Hero | Scroll shadow toggle, top progress bar, headline + CTA stagger (`data-animate="headline"`), enhanced orb parallax. |
| P0 | Problem | Keep reveal, add count-up for risk stats, drop in animated SVG wave background. |
| P0 | Solution | Slide-in before/after panels, hover lift + icon tilt on feature cards. |
| P1 | Calculator | Floating labels, `useSpringNumber` for metrics, pulse "Bezcenny" badge. |
| P1 | Demo | Scroll-linked timeline bar, hover zoom on video preview. |
| P1 | Testimonials | Lightweight auto carousel (pause on hover) with subtle parallax. |
| P1 | Pricing | Recommended card pulse loop, entrance scale choreography, animated comparison bar. |
| P2 | Blog | Image hover pan, badge shimmer, tuned stagger delays. |
| P2 | Contact / Footer | Form input stagger, animated submit border, footer underline gradient. |

Copy the exact brief into the Codex prompt when working on that module.

## 3. Phase Sequencing

1. **Phase 1 – Foundations (P0)**
   - Refactor `InteractionLayer` for new variants (`headline`, `slide`).
   - Add global motion tokens (CSS custom properties for timing/easing).
   - Complete Navigation, Hero, Problem, Solution briefs.

2. **Phase 2 – Engagement (P1)**
   - Build reusable hooks (`useSpringNumber`, `useCarousel`).
   - Implement Calculator, Demo, Testimonials, Pricing briefs.

3. **Phase 3 – Polish (P2 + QA)**
   - Finish Blog, Contact, Footer briefs.
   - Run cross-browser smoke, reduced-motion validation, doc updates.

## 4. Codex Task Template

```
Implement P0 Navigation/Hero brief: add scroll shadow toggle in `navigation.tsx`, top progress bar component, headline/CTA stagger in `hero-section.tsx` (`data-animate="headline"`). Update tokens if required. Run `npx next lint` when done.
```

Keep prompts this short—Codex already understands tooling, testing, and apply_patch usage.

## 5. Validation per Task

- `npx next lint`
- `npm run build` (phase exit or shared util change)
- Manual reduced-motion toggle check
- Scroll smoke test in local dev

## 6. Definition of Done (per Phase)

- All briefs in scope merged with clean lint/build.
- `docs/homepage-interaction-plan.md` updated with any adjustments.
- Accessibility + reduced-motion behaviour confirmed.
- Follow-ups tracked as concise, Codex-friendly issues.

Adhering to these notes keeps the collaboration efficient while delivering the lively, premium homepage experience we want.
