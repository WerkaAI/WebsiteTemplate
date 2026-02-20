# Team Meeting — Step 10A: inventory + targeted cleanup

Data: 2026-02-21  
Uczestnicy: Architekt, Security, QA, Frontend, Platform, Nieszablonowy Geniusz

## Cel kroku
Zrobić pełny rekonesans pozostałości po poprzednim projekcie i wykonać bezpieczne, szybkie cięcia white-label bez ryzyka regresji.

## Co zrobiono
- przeszukano całe repo i policzono skalę pozostałości (src/content/docs)
- wskazano największe hotspoty do kolejnego sprintu
- zneutralizowano część runtime stringów (cookies/pricing/contact/onboarding CTA)
- zaktualizowano lockfile po zmianie nazwy pakietu

## Walidacja
- lint: green
- test: green
- typecheck: green

## Ryzyka
- największa część legacy copy nadal siedzi w stronach legal i onboarding/content

## Następny krok
- Step 10B: pełny white-label pass plików `src/app/*`, `src/lib/onboarding/*`, `src/data/*` + porządek w `public/` i legacy docs.
