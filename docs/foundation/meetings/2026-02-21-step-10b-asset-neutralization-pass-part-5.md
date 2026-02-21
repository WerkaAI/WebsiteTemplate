# Step 10B — asset neutralization pass (part 5)

Data: 2026-02-21

## Zakres
- wykonanie decyzji zespołu po meetingu dot. brandowych mediów

## Co zrobiono
- dodano neutralne placeholdery runtime:
  - `public/illustrations/neutral-feature.svg`
  - `public/images/placeholders/onboarding-neutral.svg`
  - `public/illustrations/og-template-cover.svg`
- podmieniono referencje runtime na neutralne assety:
  - home sections (`calculator`, `solution`, `problem`)
  - metadata OG/Twitter (`layout`, `home`)
  - onboarding data (`onboarding-content`, `onboarding-employee`, `chat-employee-content`)
- usunięto brandowe media z runtime:
  - wszystkie MP4 z `public/images/onboarding/`
  - legacy ilustracje mascot/problem/home
  - stary `public/blog-illustrations/jak-wdrazamy.png`

## Walidacja
- `npm run lint` ✅
- `npm run typecheck` ✅
- `npm run test -- --run` ✅
- grep runtime ścieżek: brak `/images/onboarding/` i brak starych mascot paths w `src/*`

## Metryki
- legacy grep: `src=36 content=47 docs=55`

## Decyzje
- Part 5 zakończony.
- Następny krok: dokończyć white-label copy w `src/lib/onboarding/*` i domknąć Step 10B.
