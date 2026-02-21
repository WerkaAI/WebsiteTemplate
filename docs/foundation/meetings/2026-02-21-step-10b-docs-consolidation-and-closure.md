# Step 10B — docs consolidation and closure

Data: 2026-02-21

## Zakres
- porządki dokumentacji i finalizacja Step 10B

## Co zrobiono
- utworzono centralny indeks dokumentacji: `docs/README.md`
- utworzono katalog planów operacyjnych: `docs/plans/*`
- przeniesiono zawartość dokumentów planistycznych z root do `docs/plans/*`
- root dokumenty (`BLOG_SETUP.md`, `COPILOT_TODO.md`, `MDX_MASTER_PLAN.md`, `REVIEW_PLAN.md`, `replit.md`) zamieniono na pliki-przekierowania
- zaktualizowano `README.md` i backlog foundation pod nową strukturę docs
- zaakceptowano policy historycznych referencji: `ADR-0007`

## Walidacja
- stan white-label:
  - `src=0`
  - `content=0`
  - `docs=historical/audit only`
- brak błędów w edytowanych plikach dokumentacyjnych

## Decyzja
- Step 10B uznany za zakończony.
- Kolejny etap: MDX hardening + CSP enforce telemetry (zgodnie z roadmapą).
