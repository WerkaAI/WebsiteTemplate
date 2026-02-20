# TEMPLATE_WHITE_LABEL_BACKLOG

Status: otwarte
Data: 2026-02-21

## Cel
Dokończyć pełny pass white-label, aby w kodzie produkcyjnym nie pozostały odniesienia do poprzedniego klienta.

## Zakres następnego kroku (Step 10)

### 1) Copy i metadane stron
- `src/app/page.tsx`
- `src/app/funkcje/page.tsx`
- `src/app/cennik/page.tsx`
- `src/app/kontakt/page.tsx`
- `src/app/polityka-prywatnosci/page.tsx`
- `src/app/polityka-cookies/page.tsx`
- `src/app/tutoriale/page.tsx`
- `src/app/tutoriale/layout.tsx`
- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`

### 2) Dane i komponenty UI
- `src/data/*`
- `src/components/features/home/*`
- `src/components/features/onboarding/*`
- `src/lib/onboarding/*`

### 3) Polityki i cookies
- `src/lib/cookies/*` (komentarze i opisy brandowe)
- finalna rewizja contentu legal pod nowy projekt

### 4) Legacy docs/pliki do usunięcia lub archiwizacji
- root: `BLOG_SETUP.md`, `MDX_MASTER_PLAN.md`, `REVIEW_PLAN.md`, `replit.md`
- docs: plany redesign/onboarding/review z poprzedniego projektu

## Kryterium zamknięcia
- brak stringów `autozaba|AutoŻaba|Żabka` w kodzie runtime startera,
- lint/test/typecheck green,
- smoke E2E green,
- commit + meeting note dla Step 10.
