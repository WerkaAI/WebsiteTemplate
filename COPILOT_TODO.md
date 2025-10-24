# Copilot TODO: Align Contact Forms

## Goal
Make the landing page and /kontakt forms share the same validation, submission flow, and API integration.

## Tasks
- [x] Audit fields required across both forms (name, email, phone, shops, message, consent, token, honeypot) and define a common payload specification.
- [x] Extract a shared zod schema for the contact payload (e.g. `src/lib/validation/contact.ts`) reused by UI forms and `src/app/api/contact/route.ts`.
- [x] Update the API handler to accept the unified payload, adapt Turnstile handling, and ensure Resend email includes all optional fields.
- [x] Build a reusable React form component or hook that implements submission to `/api/contact`, Turnstile support, and toast handling.
- [x] Replace the inline form in `src/components/contact-section.tsx` with the shared component while preserving layout-specific UI (header copy, quick links, etc.).
- [ ] Verify both pages manually (dev mode) to ensure validation, loading state, and success/error toasts work; note any gaps for follow-up testing.
