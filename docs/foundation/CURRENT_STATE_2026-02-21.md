# Current State — 2026-02-21

Ten dokument opisuje **aktualny stan techniczny projektu**: stack, architekturę, elementy funkcjonalne i status walidacji.

## 1) Stack technologiczny

- **Framework:** Next.js (App Router)
- **Język:** TypeScript
- **UI:** React 18, Tailwind CSS, shadcn/radix UI, Framer Motion
- **Content:** MDX (`content/blog`, `content/tutorials`) + remark/rehype pipeline
- **Walidacja danych:** Zod
- **Formularze:** React Hook Form
- **Email:** Resend (z fallbackiem DRY RUN bez klucza API)
- **Rate limiting:** lokalny adapter + wsparcie pod Upstash Redis
- **Testy/QA:** Vitest + skrypty smoke/contact/CSP/boundary

Źródło: [package.json](../../package.json), [next.config.mjs](../../next.config.mjs), [tailwind.config.ts](../../tailwind.config.ts).

## 2) Architektura aplikacji

### Routing (App Router)

Główne segmenty znajdują się w [src/app](../../src/app):

- `page.tsx` — strona główna (sekcje marketingowe)
- `blog/` — listing i wpisy MDX
- `tutoriale/` — listing i poradniki MDX
- `funkcje/`, `cennik/`, `kontakt/`, `onboarding/`
- `polityka-prywatnosci/`, `polityka-cookies/`
- `api/contact/` — endpoint formularza kontaktowego
- `api/csp-report/` — endpoint raportów CSP
- `robots.ts`, `sitemap.ts`, `feed.xml/`
- `opengraph-image/` + rewrite `/og-image.jpg`

### Layout i SEO

- Globalny layout: [src/app/layout.tsx](../../src/app/layout.tsx)
- Metadane (`Metadata`), OpenGraph/Twitter, `metadataBase`
- JSON-LD przez komponent SEO
- Skip-link dostępności i warstwa consent/cookies

### Security baseline

- Middleware ustawia security headers i CSP: [src/middleware.ts](../../src/middleware.ts)
- Logika CSP/nonce: [src/lib/security/csp.ts](../../src/lib/security/csp.ts)
- Tryby CSP: `report-only` / `dual` / `enforce` (sterowane env + lifecycle)
- Endpoint telemetry CSP: [src/app/api/csp-report/route.ts](../../src/app/api/csp-report/route.ts)

## 3) Content i MDX

- Treści blogowe i tutorialowe są rozdzielone w `content/**`.
- Pipeline MDX obejmuje m.in. `remark-gfm`, frontmatter parsing, `rehype-slug`, `rehype-autolink-headings`, `rehype-pretty-code`.
- Działa walidacja/sanitizacja URL i renderu treści (hardening pod untrusted content).

## 4) Formularz kontaktowy (stan operacyjny)

Endpoint: [src/app/api/contact/route.ts](../../src/app/api/contact/route.ts)

Założenia:

- ograniczenie payload size,
- rate limit na IP,
- honeypot (`company`),
- opcjonalny Turnstile (w produkcji przy obecnym sekrecie),
- walidacja Zod,
- wysyłka przez Resend lub tryb testowy (bez `RESEND_API_KEY`).

## 5) Co działa obecnie (potwierdzone)

- Aplikacja budowana jako nowoczesny starter marketingowy z gotowymi sekcjami home i podstronami.
- Routing i podstawowe strony produktowe/treściowe są dostępne.
- Formularz kontaktowy posiada pełny przepływ serwerowy (walidacja + anti-abuse + email).
- CSP + security headers są centralnie obsługiwane na poziomie middleware.
- SEO podstawowe (metadata, robots, sitemap, OG) jest skonfigurowane.

### Ostatnia weryfikacja

- `npm run typecheck` — **OK** (2026-02-21)

## 6) Granice template vs projekt docelowy

Projekt jest po czyszczeniu white-label i ma neutralną bazę. Do wdrożenia klienta wymagane są zwykle:

- podmiana brandingu (logo, claimy, grafiki),
- aktualizacja treści legal/compliance,
- podpięcie produkcyjnych kluczy/env,
- finalny przegląd SEO i analityki.

Powiązane dokumenty:

- [docs/foundation/ROADMAP_12_WEEKS.md](ROADMAP_12_WEEKS.md)
- [docs/foundation/WHITE_LABEL_AUDIT_2026-02-21.md](WHITE_LABEL_AUDIT_2026-02-21.md)
- [docs/security](../security)
