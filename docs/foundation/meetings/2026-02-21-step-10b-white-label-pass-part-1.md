# Team Meeting — Step 10B (Part 1): white-label pass

Data: 2026-02-21  
Uczestnicy: Architekt, Security, QA, Frontend, Platform, Nieszablonowy Geniusz

## Cel
Kontynuacja usuwania brandowych pozostałości z runtime (`src/app`, `src/components`, `src/data`, `src/lib/cookies`).

## Zmiany
- Neutralizacja copy i danych kontaktowych:
  - `src/app/tutoriale/layout.tsx`
  - `src/app/tutoriale/page.tsx`
  - `src/app/blog/page.tsx`
  - `src/app/kontakt/page.tsx`
  - `src/app/opengraph-image/route.tsx`
  - `src/components/cookies/cookie-banner.tsx`
  - `src/components/features/home/contact-section.tsx`
  - `src/components/features/onboarding/chat-flow.tsx`
  - `src/data/pricing.ts`
  - `src/lib/cookies/consent-manager.ts`
  - `src/lib/cookies/consent-types.ts`

## Walidacja
- lint: green
- test: green
- typecheck: green

## Otwarte punkty
- największe skupiska legacy nadal w:
  - `src/app/polityka-cookies/page.tsx`
  - `src/app/polityka-prywatnosci/page.tsx`
  - `src/lib/onboarding/*`
  - `src/data/blog-posts.ts`

## Następny krok
- Step 10B (Part 2): legal pages i onboarding content + finalne porządki w docs/public.
