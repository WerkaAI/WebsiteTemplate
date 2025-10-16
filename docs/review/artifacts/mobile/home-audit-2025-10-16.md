# Home Route Audit — 2025-10-16

## Inputs
- Blueprint: `docs/review/artifacts/mobile/home-blueprint.md`
- DOM snapshot: _pending_ (requires capture script)
- Token dump: _pending_ (requires extraction script)

## Key Findings

| # | Severity | Area | Description | Suggested Fix | Constraint |
|---|----------|------|-------------|---------------|------------|
| 1 | High | `src/components/hero-section.tsx` | `<section>` wrapping the hero lacks `id="hero"`, so the navigation item mapped to `navigateToSection('hero')` fails to scroll on mobile (both in-sheet and hash routes). Users dropped near the footer cannot jump back to the top hero CTA. | Add `id="hero"` to the hero section and ensure the `InteractionLayer` still loads correctly. Verify smooth scroll works when invoked from `/blog` via hash. | Architectural priming (nav blueprint), tap flow |
| 2 | High | `src/components/hero-section.tsx` | The hero orb/board combo uses fixed dimensions (`h-[420px] w-[420px]`) inside a 360px viewport with no overflow guard, producing horizontal scroll and violating the "no horizontal scroll" constraint. | Constrain the visual by wrapping it in an `overflow-hidden` container and replace the hard-coded width with `max-w-[min(420px,100%)]` or responsive Tailwind classes (`w-full max-w-[320px] sm:max-w-[420px]`). | Constraint layering — layout integrity |
| 3 | Medium | `src/components/testimonials-section.tsx`, `src/components/navigation.tsx` | Icon-only controls inherit the global `size="icon"` button variant (`h-10 w-10`, 40px), which is below the 48px mobile tap target requirement. This affects the burger menu trigger and testimonial carousel controls. | Introduce a `size="touch"` variant (≥48px) or override the size locally for mobile viewports (`md:hidden` set) and update usage so all primary actions reach 48px. | Constraint layering — tap target |

## Follow-up Checks
- After fixes, capture a DOM snapshot to confirm horizontal scrolling is eliminated.
- Re-run tap target audit across other icon buttons (`ThemeToggle`, form toggles) once the larger size variant exists.
- Update navigation prompt templates to include the blueprint anchor list so new sections aren’t missing IDs.

## Remediation Notes (2025-10-16)
- [Resolved] Added `id="hero"` to the hero section and constrained the hero orb container (`max-w-[420px]`, mobile overflow guard) to prevent off-screen overflow while keeping the interaction layer intact.
- [Resolved] Expanded the button system with `touch`/`touchIcon` sizes and updated navigation trigger, theme toggle, and testimonial carousel controls; CSS tap targets now render at 48px on mobile with responsive adjustments for larger viewports.
- [Resolved] Elevated all primary CTAs (hero, demo, calculator, pricing, contact, footer, share actions) to the new touch sizes for consistent 48px targets and refreshed the footer CTA layout with `Button` primitives.
