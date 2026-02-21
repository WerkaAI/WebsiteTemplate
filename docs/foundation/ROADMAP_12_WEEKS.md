# Roadmap 8–12 tygodni: CoreStarter

## Status realizacji
- [x] Step 01: baseline jakości i governance
- [x] Step 02: hardening rate limiting kontaktu
- [x] Step 03: formalna granica CoreStarter vs PerProject
- [x] Step 04: zero-warning baseline + build potwierdzający
- [x] Step 07: smoke E2E dla krytycznych tras
- [x] Step 08: CSP production default mode + env controls
- [x] Step 09: template cleanup pass (neutral baseline)
- [x] Step 10A: white-label inventory + targeted cleanup
- [x] Step 10B: full white-label pass (zamknięty: `src/**`=0, `content/**`=0, `docs/**` utrzymane jako historical per ADR-0007)
- [x] Step 11: Faza 2 MDX hardening (kontrakt+parser+slug tests, content validation=0)
- [x] Step 12: CSP lifecycle gate implementation (ADR-0008 accepted, `build -> pre-release -> release`)
- [x] Step 13: Faza 4 security enforcement closure (telemetry endpoint + release checklist + test:csp)
- [x] Step 14: Faza 5 productization closure (boundary gate + release playbook + smoke)
- [x] Roadmap 8–12 tygodni domknięta

## Status bieżący (2026-02-21)
- [x] Forms reliability: automatyczny browser flow dla formularzy (`npm run test:contact-form`)
- [x] MDX hardening: domknięty kontrakt frontmatter + parser/slug tests + walidacja contentu
- [x] CSP rollout strategy: warsztat specjalistów wykonany, ADR-0008 (Accepted)
- [x] CSP lifecycle wdrożony w runtime (`CSP_LIFECYCLE_STAGE` + `CSP_MODE` override)
- [x] Faza 4: telemetry rollout + release checklist CSP
- [x] Faza 5: boundary gate + release playbook + final quality gates

## Podsumowanie wykonanych prac (całość do 2026-02-21)

### 1) Governance, jakość i neutralny baseline
- Uruchomiono model ADR i porządek decyzyjny dla zmian architektonicznych.
- Utrzymano stabilny zestaw quality gates: `test`, `typecheck`, `test:smoke`.
- Domknięto czyszczenie template’u i white-label pass (warstwa `src/**` i `content/**` neutralna).

### 2) Forms reliability i hardening kontaktu
- Domknięto hardening rate limiting dla kontaktu.
- Dodano automatyczną weryfikację formularzy w przeglądarce (`npm run test:contact-form`) z naciskiem na stabilność i powtarzalność.
- Pokryto scenariusze krytyczne: poprawny submit, stany ładowania, obsługa błędów i anty-spam.

### 3) Content/MDX hardening
- Wdrożono spójny kontrakt frontmatter i walidację danych contentowych.
- Dodano testy parsera, slugów i porządku deterministycznego kolekcji.
- Potwierdzono 0 błędów walidacji istniejącego contentu przy aktualnym zbiorze wpisów.

### 4) Security enforcement (CSP)
- Wypracowano i przyjęto strategię lifecycle CSP (ADR-0008).
- Wdrożono tryby runtime: `build -> pre-release -> release` z kontrolą przez `CSP_LIFECYCLE_STAGE` oraz override `CSP_MODE`.
- Dodano endpoint telemetry (`/api/csp-report`) i checklistę wdrożeniową CSP.
- Dodano walidację automatyczną lifecycle (`npm run test:csp`).

### 5) Productization startera
- Utrwalono granicę `CoreStarter` vs `PerProject` i dodano gate automatyczny (`npm run test:boundary`).
- Dodano release playbook dla procesu wydawniczego i przekazania między środowiskami.
- Potwierdzono pełną gotowość do wielokrotnego użycia startera w projektach klientów.

### Wynik końcowy programu
- Roadmap 8–12 tygodni: **domknięta**.
- Wszystkie fazy 1–5: **zakończone**.
- Kluczowe bramki jakości i bezpieczeństwa: **zielone**.

## Faza 1 (Tydzień 1–2): Baseline jakości i governance
- Deliverables:
  - uruchomione ADR i operating model
  - CI gate: typecheck + lint + test + build
- Wejście:
  - aktualny stan repo
- Wyjście:
  - stabilny pipeline i pierwszy raport jakości

## Faza 2 (Tydzień 3–4): Content/MDX hardening
Status: ✅ Zakończona (2026-02-21)

- Deliverables:
  - ujednolicenie kontraktów frontmatter i walidacji
  - testy dla parserów oraz ścieżek slug
- Wejście:
  - działające quality gates
- Wyjście:
  - 0 błędów walidacji istniejącego contentu

## Faza 3 (Tydzień 5–6): Forms reliability
Status: ✅ Zakończona (2026-02-21)

- Deliverables:
  - rozszerzone testy API kontaktu
  - plan migracji rate limit do durable store
- Wejście:
  - stabilne testy bazowe
- Wyjście:
  - pokryte scenariusze błędne i anty-spam

### Domknięcie fazy
- [x] automatyczny browser flow formularza kontaktowego (`npm run test:contact-form`)
- [x] potwierdzona stabilność scenariuszy submit/loading/error
- [x] spójność z baseline security i smoke po zmianach

## Faza 4 (Tydzień 7–8): Security enforcement
Status: ✅ Zakończona (2026-02-21)

- Deliverables:
  - rollout CSP z report-only do enforce
  - aktualizacja specyfikacji security
- Wejście:
  - telemetry i brak krytycznych regresji
- Wyjście:
  - enforce mode dla krytycznych tras

### Domknięcie fazy
- [x] telemetry collector uruchomiony (`/api/csp-report`)
- [x] checklista release CSP dodana (`docs/security/csp-release-checklist.md`)
- [x] walidacja lifecycle gate (`npm run test:csp`)
- [x] smoke po zmianach security (`npm run test:smoke`)

## Faza 5 (Tydzień 9–12): Productization startera
Status: ✅ Zakończona (2026-02-21)

- Deliverables:
  - separacja `CoreStarter` vs `PerProject`
  - smoke E2E kluczowych ścieżek
  - release playbook
- Wejście:
  - stabilny security baseline
- Wyjście:
  - gotowość do wielokrotnego użycia w projektach klientów

### Domknięcie fazy
- [x] separacja `CoreStarter` vs `PerProject` utrwalona i walidowana (`npm run test:boundary`)
- [x] smoke E2E kluczowych ścieżek (`npm run test:smoke`)
- [x] release playbook dodany (`docs/foundation/RELEASE_PLAYBOOK.md`)

## Metryki globalne
- Green CI >95%
- Flakiness testów <2%
- Open High/Critical = 0
- PR lead time <24h (standardowe zmiany)
