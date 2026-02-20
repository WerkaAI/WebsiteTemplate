# Step 10B — team meeting: assets i onboarding media

Data: 2026-02-21
Tryb: decyzja operacyjna (5+1)

## Kontekst
W runtime nadal istnieją używane pliki, które mogą być neutralne po nazwie, ale wizualnie odnoszą się do poprzedniego projektu (maskotka/estetyka klienta) — szczególnie:
- ilustracje hero/problem/solution
- materiały w `public/images/onboarding/*` (mp4)

## Uczestnicy
- Product/Delivery
- Architecture
- Frontend UX/UI
- Security/Compliance
- Content/SEO
- Nieszablonowy Geniusz (challenger)

## Ustalenia
1. **CoreStarter musi być wizualnie neutralny**, nie tylko tekstowo neutralny.
2. Materiały onboarding video pokazujące brand poprzedniego klienta nie mogą zostać jako domyślne w starterze.
3. Rozdzielamy media na dwie klasy:
   - `CoreStarter`: neutralne placeholdery i neutralne przykłady
   - `PerProject`: właściwe brandowe media klienta
4. Do czasu przygotowania nowych mediów:
   - onboarding ma działać bez zależności od brandowego video (fallback content),
   - sekcje z ilustracjami mają używać neutralnych placeholderów.

## Decyzja
- **Approve:** uruchomić Step 10B part 5 jako „Asset Neutralization Pass”.

## Zakres part 5
- podmienić ilustracje maskotki/brandowe na neutralne grafiki zastępcze,
- odłączyć brandowe MP4 z onboarding i przejść na neutralny fallback (tekst + statyczne ilustracje),
- przygotować prosty standard: `docs/foundation/ASSET_COMPLIANCE_CHECKLIST.md`.

## Kryterium DONE
- brak materiałów wizualnych jednoznacznie kojarzonych z poprzednim klientem w runtime,
- onboarding zachowuje pełną czytelność flow bez brandowego wideo,
- lint/typecheck/test green,
- commit + update audytu white-label.

## Ryzyka
- chwilowy spadek atrakcyjności onboarding preview po usunięciu video.
- potrzeba szybkiego uzupełnienia neutralnych assetów produkcyjnych.

## Mitigacje
- fallbacky projektowane jako czytelne „how-to cards” z krótkimi instrukcjami,
- docelowo podmiana na neutralne nagrania demo w kolejnym kroku contentowym.
