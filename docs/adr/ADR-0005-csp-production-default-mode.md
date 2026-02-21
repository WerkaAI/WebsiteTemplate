# ADR-0005: CSP default mode strategy for production rollout

- Status: Superseded by ADR-0008
- Data: 2026-02-21

## Kontekst
Po hardeningu security baseline potrzebny jest bezpieczny domyślny profil CSP w produkcji, który jednocześnie wymusza politykę i zbiera raporty naruszeń.

## Opcje
1. Domyślnie `report-only` wszędzie.
2. Domyślnie `enforce` wszędzie.
3. Domyślnie `dual` na produkcji, `report-only` poza produkcją.

## Decyzja
Wybór opcji 3.

## Konsekwencje
- Plusy:
  - lepsza ochrona produkcji (enforce aktywny)
  - zachowana obserwowalność (report-only równolegle)
  - bezpieczniejsze iteracje lokalnie/staging
- Minusy:
  - podwójne nagłówki CSP w produkcji
  - potrzeba monitorowania raportów i utrzymania allowlist

## Plan rollback
- Ustawić `CSP_MODE=report-only` i wdrożyć ponownie.
- Alternatywnie ustawić `CSP_MODE=enforce` przy dojrzałej telemetrii.

## Metryki sukcesu
- Spadek naruszeń CSP w czasie.
- Brak regresji funkcjonalnej w krytycznych trasach.
- Brak wzrostu błędów produkcyjnych związanych z polityką CSP.
