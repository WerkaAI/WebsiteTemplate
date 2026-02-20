# ADR-0004: Smoke E2E coverage for critical marketing routes

- Status: Accepted
- Data: 2026-02-21

## Kontekst
Foundation potrzebuje szybkiego testu end-to-end, który wychwyci regresje na kluczowych trasach po zmianach UI/infra.

## Opcje
1. Pozostać przy samych testach unit/integration.
2. Dodać pełny pakiet E2E dla wszystkich scenariuszy od razu.
3. Dodać lekki smoke E2E dla krytycznych tras i rozszerzać iteracyjnie.

## Decyzja
Wybór opcji 3: `scripts/smoke-e2e.mjs` + skrypt `npm run test:smoke`.

## Konsekwencje
- Plusy:
  - szybka detekcja regresji runtime
  - niski koszt utrzymania na starcie
  - dobre dopasowanie do modelu startera
- Minusy:
  - nie pokrywa pełnych flow użytkownika
  - wymaga kolejnych iteracji pokrycia

## Plan rollback
- Wyłączyć uruchamianie smoke testu i wrócić do unit/integration.
- Zachować skrypt do manualnej diagnostyki.

## Metryki sukcesu
- Stabilny pass rate smoke >95%.
- Spadek regresji wykrywanych dopiero po wdrożeniu.
- Skrócenie czasu wykrycia awarii krytycznych tras.
