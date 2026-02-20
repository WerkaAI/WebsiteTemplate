# Team Meeting — Step 08: CSP production default mode

Data: 2026-02-21  
Uczestnicy: Architekt, Security, QA, Frontend, Platform, Nieszablonowy Geniusz

## Cel kroku
Domknąć rollout CSP tak, aby domyślnie produkcja działała w trybie bezpiecznym (`dual`), a środowiska nieprodukcyjne pozostały przyjazne dla iteracji (`report-only`).

## Zmiany
- `src/lib/security/csp.ts`
  - domyślny tryb zależny od środowiska: `dual` dla produkcji (Vercel production), `report-only` poza produkcją,
  - zachowany override przez `CSP_MODE`,
  - zachowany override per-request dla testów poza produkcją.
- `.env.example`
  - dodane sekcje `CSP_MODE` oraz `CSP_REPORT_URI` z opisem.
- `.env.local.example`
  - dodane `CSP_MODE` i `CSP_REPORT_URI` dla lokalnej konfiguracji.
- ADR:
  - dodano `ADR-0005-csp-production-default-mode.md`.

## Walidacja
- lint: green
- testy: green
- typecheck: green

## Ryzyka / decyzje
- W produkcji wystąpią równolegle nagłówki enforce + report-only (zamierzone, dla telemetrii).
- Kolejny krok: obserwować raporty CSP i stopniowo zawężać allowlist.

## Uzgodniony następny krok
- Rozpocząć telemetry-driven CSP cleanup i przygotować checklistę przejścia do pełnego enforce (tam gdzie to możliwe).
