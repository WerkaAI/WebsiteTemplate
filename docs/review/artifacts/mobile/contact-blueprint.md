# Kontakt Route Blueprint (360×740 focus)

## Layout Intent
- Full-page contact flow with navigation, hero header, info cards, form, and supportive CTAs.
- Uses `container-spacing` to keep gutters consistent; sections stacked with generous breathing room.
- Contact form prioritizes single-column layout on mobile, two-column inputs only on ≥768px.

## Priority Content Blocks
1. **Hero header** — back link, H1/H2 copy, mission statement.
2. **Info cards** — grid of email/phone/response time/location with icons.
3. **Primary form** — `ContactForm` component with required fields, consent, optional Turnstile.
4. **Why contact** — bullet list explaining benefits.
5. **Urgent help card** — phone CTA for immediate support.
6. **Global chrome** — navigation + footer reused from other routes.

## Interaction Goals
- Back button returns to home without losing nav context.
- Form validates with `react-hook-form`/Zod; toast feedback on success/error.
- Turnstile widget only renders when site key present; fallback ensures tests run locally.
- Urgent call button uses `tel:` link for mobile devices.

## Constraint Summary
- Maintain ≥48px tap targets for form fields, submit button, and info card icons.
- Ensure two-column input grid gracefully stacks at 360px (no clipped labels).
- Cards should avoid box-shadow overflow; maintain Calm Control subtlety.
- Keep hero copy ≤ 60ch to avoid wrapping issues in Polish copy.

## Calm Control Cues
- Soft muted backgrounds with low-elevation shadows (`calm-shadow-lg`).
- Primary CTA uses emerald palette; urgent card uses toned accent.
- Rounded corners and spaced typography maintain welcoming tone.

## Known Dependencies & Reuse Patterns
- `ContactForm` component reused from home contact section; uses shared UI primitives.
- Navigation/footer identical to other routes; blueprint inherits existing section IDs (`contact`).
- Toast notifications rely on global toast hook.

## Open Questions
- Confirm Turnstile widget height does not force horizontal scroll on 360px devices.
- Evaluate serverless endpoint `/api/contact` for rate limiting; not part of UI but impacts UX.
- Determine if location map or chat widget needed in future iteration.
