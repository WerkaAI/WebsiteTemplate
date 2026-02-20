# Team Meeting — Step 10B (Part 2): legal + onboarding cleanup

Data: 2026-02-21  
Uczestnicy: Architekt, Security, QA, Frontend, Platform, Nieszablonowy Geniusz

## Cel
Kontynuacja pełnego passu white-label w krytycznych plikach runtime z największą liczbą pozostałości brandowych.

## Zakres zmian
- Legal pages:
  - `src/app/polityka-cookies/page.tsx`
  - `src/app/polityka-prywatnosci/page.tsx`
- Onboarding / identity:
  - `src/app/onboarding/page.tsx`
  - `src/lib/onboarding/use-progress.ts`
  - `src/lib/onboarding/use-chat-progress.ts`
  - `src/lib/onboarding/onboarding-employee.ts`
  - `src/lib/onboarding/chat-employee-content.ts`

## Co zostało zneutralizowane
- tytuły, opisy i CTA z nazwą poprzedniego projektu,
- hardcoded domeny (`app.autozaba.pl`, `panel.autozaba.pl`),
- część hardcoded maili,
- localStorage keys powiązane z poprzednim brandem,
- fragmenty legal copy i odnośników na placeholdery template.

## Walidacja
- lint: green
- test: green
- typecheck: green

## Metryka po kroku
- liczba trafień legacy w `src` spadła z 134 do 55 (wg grep).

## Następny krok
- domknąć Step 10B: `src/app/page.tsx`, `src/app/funkcje/page.tsx`, `src/data/blog-posts.ts`, porządki `public/` i redukcja legacy docs.
