# CSP strategy workshop — per project gate

Data: 2026-02-21

## Cel
Ocenić, czy CSP enforce powinien być aktywowany globalnie w starterze, czy dopiero pod koniec wdrożenia per projekt.

## Uczestnicy (role)
- Security Lead
- Platform Lead
- DX Lead
- QA/Release Lead

## Ustalenia
1. Domyślne enforce na etapie implementacji zwiększa ryzyko blockerów i spowalnia development.
2. Najbezpieczniejszy kompromis to lifecycle gate:
   - implementacja: `report-only`,
   - pre-release: `dual`,
   - produkcja po akceptacji: `enforce` (lub `dual` z uzasadnieniem).
3. Przełączenie trybu CSP musi być częścią checklisty release.

## Decyzja robocza
- Przygotowano ADR do zatwierdzenia:
  - `docs/adr/ADR-0008-csp-per-project-enforcement-gate.md` (Status: Proposed)

## Akcje
- [ ] Zatwierdzić ADR-0008 (Owner: Security + Platform)
- [ ] Dodać krótki section CSP lifecycle do runbooka release
- [ ] W kolejnym projekcie pilotażowym przejść pełny cykl report-only -> dual -> enforce

## Kryterium akceptacji
- Brak blockerów CSP podczas developmentu.
- Potwierdzone smoke + E2E po przejściu na tryb release.
- Udokumentowana decyzja trybu CSP per projekt.
