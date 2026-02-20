# Team Meeting — Step 09: template cleanup pass

Data: 2026-02-21  
Uczestnicy: Architekt, Security, QA, Frontend, Platform, Nieszablonowy Geniusz

## Cel kroku
Ograniczyć artefakty poprzedniego projektu i przygotować repo do ponownego użycia jako starter.

## Zrealizowane zmiany
- Ustawienia i fallbacki domen/emaili zneutralizowane (`example.com`).
- CSP/MDX policy odpięte od hostów poprzedniego klienta.
- Legacy MDX oznaczone jako draft (`draft: true`).
- Dodane neutralne sample entries dla bloga i tutoriali.
- README przepisane pod użycie szablonowe + checklista white-label.
- Skrypty review (`capture-dom`, `run-axe`) używają neutralnego slugu testowego.

## Walidacja
- lint: green
- test: green
- typecheck: green

## Ryzyka
- Część copy/UI nadal zawiera branding poprzedniego projektu (zakres na kolejny krok).

## Następny krok
- Step 10: pełny pass white-label na warstwie `src/app`, `src/components`, `src/data`.
