# ADR-0006: Template neutral baseline (de-branding pass)

- Status: Accepted
- Data: 2026-02-21

## Kontekst
Repozytorium zawierało liczne artefakty brandowe i contentowe po poprzednim projekcie klienta, co utrudnia ponowne użycie jako startera.

## Decyzja
Wprowadzamy neutralny baseline:
- generyczne wartości env/config dla URL-i i emaili,
- neutralne sample content (blog/tutorial),
- legacy wpisy oznaczone jako `draft`,
- usunięcie twardych zależności CSP/MDX od domeny poprzedniego klienta,
- neutralizacja domyślnych tras dla skryptów review.

## Konsekwencje
- Plusy:
  - szybszy start kolejnych projektów
  - mniejsze ryzyko wycieku brandu klienta do nowego wdrożenia
- Minusy:
  - w kodzie UI nadal istnieją fragmenty copy specyficzne dla poprzedniego projektu (do dalszej migracji)

## Plan rollback
- Przywrócić poprzednie wartości w `next.config.mjs`, `.env.example`, `.env.local.example` i modułach security.

## Następny krok
- Step 10: pełny white-label UI/SEO copy pass (`src/app`, `src/components`, `src/data`).
