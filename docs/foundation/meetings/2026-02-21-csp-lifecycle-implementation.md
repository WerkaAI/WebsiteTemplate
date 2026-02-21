# CSP lifecycle implementation — per project gate

Data: 2026-02-21

## Decyzja
Na podstawie warsztatu i ADR-0008 wdrożono model CSP per project lifecycle:
- `build` -> `report-only`
- `pre-release` -> `dual`
- `release` -> `enforce`

## Implementacja
- `src/lib/security/csp.ts`
  - dodany `CspLifecycleStage`
  - nowa funkcja `resolveCspMode()`
  - wsparcie dla `CSP_LIFECYCLE_STAGE`
  - zachowane explicit override: `CSP_MODE`
  - dodany nagłówek diagnostyczny `x-csp-active-mode`
- testy:
  - `src/lib/security/__tests__/csp-mode.test.ts`

## Dokumentacja
- `docs/adr/ADR-0008-csp-per-project-enforcement-gate.md` -> Status: Accepted
- `docs/security/headers-spec.md` -> rozszerzone runtime flags
- `docs/foundation/ROADMAP_12_WEEKS.md` -> aktualizacja statusu CSP strategy

## Walidacja
- `npm run test` ✅
- `npm run typecheck` ✅
- `npm run test:smoke` ✅

## Następny krok
Dodać release checklistę CSP mode transition do playbooka i telemetry review dla naruszeń.
