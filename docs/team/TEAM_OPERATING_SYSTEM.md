# Team Operating System (5+1)

## Cel
Zbudować i utrzymywać `CoreStarter` dla projektów web, tak aby skrócić czas wdrożeń, zwiększyć powtarzalność jakości i obniżyć ryzyko regresji.

## Skład zespołu 5+1

### 1) Platform Architect (Lead)
- Zakres: granice modułów, decyzje cross-cutting, standardy Next.js.
- Odpowiedzialność kodowa:
  - [src/app](../../src/app)
  - [next.config.mjs](../../next.config.mjs)
  - [tsconfig.json](../../tsconfig.json)
- KPI:
  - decyzja architektoniczna do 48h
  - <10% cofniętych decyzji na kwartał

### 2) Content/MDX Lead
- Zakres: pipeline treści, walidacja frontmatter, DX publikacji.
- Odpowiedzialność kodowa:
  - [src/lib/content.ts](../../src/lib/content.ts)
  - [src/lib/posts.ts](../../src/lib/posts.ts)
  - [content/blog](../../content/blog)
  - [content/tutorials](../../content/tutorials)
- KPI:
  - 0 regresji renderowania slugów
  - 100% zgodności frontmatter ze schemą

### 3) Forms & Integrations Lead
- Zakres: formularze, API kontaktu, anty-spam, integracje.
- Odpowiedzialność kodowa:
  - [src/components/forms](../../src/components/forms)
  - [src/app/api/contact/route.ts](../../src/app/api/contact/route.ts)
- KPI:
  - sukces zgłoszeń >98%
  - spam pass-through <1%

### 4) Security & Compliance Lead
- Zakres: CSP, nagłówki, consent, sanitizacja treści.
- Odpowiedzialność kodowa:
  - [src/middleware.ts](../../src/middleware.ts)
  - [src/lib/security](../../src/lib/security)
  - [docs/security](../security)
- KPI:
  - 0 otwartych High/Critical >7 dni
  - 100% tras HTML z security headers

### 5) Quality & CI/CD Lead
- Zakres: testy, quality gates, releasy.
- Odpowiedzialność kodowa:
  - [.github/workflows/ci.yml](../../.github/workflows/ci.yml)
  - [vitest.config.ts](../../vitest.config.ts)
  - [src/components/__tests__](../../src/components/__tests__)
  - [src/lib/__tests__](../../src/lib/__tests__)
- KPI:
  - green CI >95%
  - flakiness <2%

### +1) Nieszablonowy Geniusz (Observer)
- Rola: dostarcza alternatywy i pre-mortem.
- Zasada: brak prawa weta, brak ownership tasków, brak blokowania release.
- KPI:
  - min. 2 hipotezy tygodniowo
  - 1 pre-mortem na sprint

## Model decyzyjny
Stosujemy `DACI`:
- Driver: właściciel tematu
- Approver: Platform Architect lub Security Lead (zależnie od obszaru)
- Contributors: pozostali specjaliści
- Informed: cały zespół + Geniusz

Reguła sporu:
1. 24h na konsensus.
2. Brak konsensusu -> decyzja `Approver`.
3. Ryzyko High/Critical -> Security może zablokować release.

## Rytm pracy
- Daily: 15 min (blokery + ryzyka).
- Design review: 2x tygodniowo po 45 min.
- Challenge session (Geniusz): 1x tygodniowo, 30 min.
- Sprint: 2 tygodnie, zakończony demo + retro + aktualizacją ADR.

## Definition of Done (global)
- Green CI: typecheck + lint + test + build.
- ADR dla każdej zmiany arch/security/CI >0.5 dnia pracy.
- Brak otwartych ryzyk High bez zaakceptowanego wyjątku.
