# White-label audit — 2026-02-21

## Cel
Zidentyfikować pozostałości po poprzednim projekcie i oszacować zakres dalszego czyszczenia template.

## Wynik skanu (grep)
- `src`: 134 trafienia (`autozaba|AutoŻaba|Żabka|app.autozaba.pl|panel.autozaba.pl`)
- `content`: 47 trafień
- `docs`: 69 trafień

## Największe skupiska
1. `src/app/polityka-cookies/page.tsx`
2. `src/app/polityka-prywatnosci/page.tsx`
3. `src/lib/onboarding/*`
4. `src/app/tutoriale/page.tsx`
5. `src/app/funkcje/page.tsx`
6. `src/app/page.tsx`
7. `src/data/blog-posts.ts`

## Public assets — obserwacje
- folder `public/blog-illustrations/DlaDImy/*` wygląda na archiwalny
- plik `public/Regulamin_Serwisu_Autozaba.pdf` nie jest już używany przez runtime
- nazewnictwo części assetów nadal zawiera ślady poprzedniego brandu

## Zmiany wykonane w tym kroku
- neutralizacja kolejnych stringów legacy w:
  - `src/components/cookies/cookie-banner.tsx`
  - `src/lib/cookies/consent-types.ts`
  - `src/lib/cookies/consent-manager.ts`
  - `src/data/pricing.ts`
  - `src/components/features/home/contact-section.tsx`
  - `src/components/features/onboarding/chat-flow.tsx`
- odświeżony lockfile (`npm install --package-lock-only`) po zmianie nazwy pakietu

## Co zostało do zrobienia (kolejny krok)
- pełny pass white-label w `src/app/*` i `src/lib/onboarding/*`
- czyszczenie/lub archiwizacja legacy docs i draft contentu historycznego
- porządki w `public/` (usunąć nieużywane assety i/lub ujednolicić nazewnictwo)
