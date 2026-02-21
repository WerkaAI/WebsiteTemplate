# Faza 2 kickoff — MDX hardening + contact form E2E

Data: 2026-02-21

## Zakres
- domknięcie reliability dla formularzy kontaktowych
- rozpoczęcie fazy MDX hardening

## Co zrobiono
- dodano automatyczny test przeglądarkowy formularzy:
  - landing `/#contact`
  - strona `/kontakt`
  - scenariusze: validation, loading, success toast, error toast
- dodano skrypt npm: `test:contact-form`
- zaktualizowano TODO forms (`docs/plans/COPILOT_TODO.md`) jako completed
- dodano testy kontraktu frontmatter MDX:
  - `src/lib/__tests__/mdx-schemas.test.ts`
  - walidacja `cover` jako URL absolutny
  - walidacja formatu daty `YYYY-MM-DD`
  - normalizacja pól tablicowych (`tags/persona/relatedTutorials`)

## Walidacja
- `npm run test:contact-form` ✅
- `npm run test` ✅

## Decyzja
- Forms reliability uznajemy za domknięte na poziomie baseline E2E.
- Kontynuujemy Faza 2: parser/slug tests + domknięcie pełnego kontraktu contentu.
