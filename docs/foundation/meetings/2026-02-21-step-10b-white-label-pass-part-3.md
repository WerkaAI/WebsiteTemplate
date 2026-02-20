# Step 10B — white-label pass (part 3)

Data: 2026-02-21

## Zakres
- neutralizacja pozostałości legacy w kluczowych plikach runtime:
  - `src/app/page.tsx`
  - `src/app/funkcje/page.tsx`
  - `src/data/blog-posts.ts`

## Co zrobiono
- podmieniono metadata i opisy SEO na neutralne template copy na homepage
- zneutralizowano copy i CTA w `funkcje` (usunięcie zewnętrznej domeny brandowej)
- zastąpiono statyczny dataset bloga neutralnymi postami przykładowymi

## Walidacja
- `npm run lint` ✅
- `npm run typecheck` ✅
- `npm run test -- --run` ✅

## Metryki white-label
- przed part 3: `src=55 content=47 docs=70`
- po part 3: `src=37 content=47 docs=71`

## Decyzje
- Step 10B part 3 uznany za zakończony
- kolejny krok: finalny pass `src/lib/onboarding/*`, `src/app/tutoriale/page.tsx` + cleanup `public/` i oznaczenie legacy docs jako historyczne
