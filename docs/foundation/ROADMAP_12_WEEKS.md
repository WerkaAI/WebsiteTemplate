# Roadmap 8–12 tygodni: CoreStarter

## Status realizacji
- [x] Step 01: baseline jakości i governance
- [x] Step 02: hardening rate limiting kontaktu
- [x] Step 03: formalna granica CoreStarter vs PerProject
- [x] Step 04: zero-warning baseline + build potwierdzający
- [ ] Kolejne etapy: MDX hardening, CSP enforce rollout, smoke E2E

## Faza 1 (Tydzień 1–2): Baseline jakości i governance
- Deliverables:
  - uruchomione ADR i operating model
  - CI gate: typecheck + lint + test + build
- Wejście:
  - aktualny stan repo
- Wyjście:
  - stabilny pipeline i pierwszy raport jakości

## Faza 2 (Tydzień 3–4): Content/MDX hardening
- Deliverables:
  - ujednolicenie kontraktów frontmatter i walidacji
  - testy dla parserów oraz ścieżek slug
- Wejście:
  - działające quality gates
- Wyjście:
  - 0 błędów walidacji istniejącego contentu

## Faza 3 (Tydzień 5–6): Forms reliability
- Deliverables:
  - rozszerzone testy API kontaktu
  - plan migracji rate limit do durable store
- Wejście:
  - stabilne testy bazowe
- Wyjście:
  - pokryte scenariusze błędne i anty-spam

## Faza 4 (Tydzień 7–8): Security enforcement
- Deliverables:
  - rollout CSP z report-only do enforce
  - aktualizacja specyfikacji security
- Wejście:
  - telemetry i brak krytycznych regresji
- Wyjście:
  - enforce mode dla krytycznych tras

## Faza 5 (Tydzień 9–12): Productization startera
- Deliverables:
  - separacja `CoreStarter` vs `PerProject`
  - smoke E2E kluczowych ścieżek
  - release playbook
- Wejście:
  - stabilny security baseline
- Wyjście:
  - gotowość do wielokrotnego użycia w projektach klientów

## Metryki globalne
- Green CI >95%
- Flakiness testów <2%
- Open High/Critical = 0
- PR lead time <24h (standardowe zmiany)
