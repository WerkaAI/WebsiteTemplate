# Faza 4 — closure (Security enforcement)

Data: 2026-02-21

## Zakres
- rollout CSP z report-only do enforce
- aktualizacja specyfikacji security

## Co zrobiono
- wdrożono lifecycle gate CSP per projekt:
  - `build -> report-only`
  - `pre-release -> dual`
  - `release -> enforce`
- uruchomiono endpoint telemetry:
  - `src/app/api/csp-report/route.ts`
- ustawiono domyślny `report-uri` na `/api/csp-report` (gdy brak `CSP_REPORT_URI`)
- dodano automatyczną walidację lifecycle:
  - `scripts/csp-lifecycle-check.mjs`
  - `npm run test:csp`
- zaktualizowano dokumentację security:
  - `docs/security/headers-spec.md`
  - `docs/security/post-rollout.md`
  - `docs/security/csp-release-checklist.md`
- zaktualizowano ADR:
  - `ADR-0008` accepted
  - `ADR-0005` superseded by ADR-0008

## Walidacja
- `npm run test` ✅
- `npm run typecheck` ✅
- `npm run test:csp` ✅
- `npm run test:smoke` ✅
- `npm run test:contact-form` ✅

## Wynik
- Faza 4 zamknięta.
- Następny etap: Faza 5 (Productization startera).
