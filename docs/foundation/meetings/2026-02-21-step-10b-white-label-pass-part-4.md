# Step 10B — white-label pass (part 4)

Data: 2026-02-21

## Zakres
- cleanup nieużywanych plików multimedialnych i dokumentacji legacy

## Co zrobiono
- usunięto nieużywane assets z `public/`:
  - legacy PNG z `public/blog-illustrations/*` (w tym katalog `DlaDImy`)
  - nieużywany film `public/images/onboarding/a1_logowanie.mp4`
  - nieużywany plik `public/logo_color64x64.png`
  - nieużywany PDF `public/Regulamin_Serwisu_Autozaba.pdf`
- usunięto przestarzałe plany z `docs/`:
  - `CENNIK_REDESIGN_PLAN.md`
  - `COOKIE_IMPLEMENTATION_PLAN.md`
  - `HERO_REDESIGN_PLAN.md`
  - `homepage-interaction-plan.md`
  - `New-pages-plan.md`
  - `ONBOARDING_REDESIGN_PLAN.md`
  - `tutorials-page-plan.md`
  - `visual-refresh-plan.md`
- zaktualizowano odwołania w:
  - `REVIEW_PLAN.md`
  - `docs/security-hardening-plan.md`
  - `docs/review/mobile_review_plan.md`

## Walidacja
- skan referencji multimediów: brak nieużywanych plików w `public/`
- legacy grep po zmianach: `src=37 content=47 docs=54`

## Decyzje
- Step 10B part 4 uznany za zakończony
- następny krok: finalny runtime/content cleanup (onboarding/tutoriale + historyczne treści)
