# Release Playbook (CoreStarter -> PerProject)

## Cel
Powtarzalny proces wydania nowego projektu klienta na bazie CoreStarter.

## Etap 1 — Bootstrap PerProject
- [ ] Uzupełnij `.env.local` i parametry projektu (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_APP_URL`, kontakt).
- [ ] Wymień branding/copy i assety klienta.
- [ ] Zweryfikuj boundary:
  - `npm run test:boundary`

## Etap 2 — Quality gates
- [ ] `npm run test`
- [ ] `npm run typecheck`
- [ ] `npm run test:smoke`
- [ ] `npm run test:contact-form`

## Etap 3 — Security gate (CSP lifecycle)
- [ ] Build stage: `CSP_LIFECYCLE_STAGE=build`
- [ ] Pre-release stage: `CSP_LIFECYCLE_STAGE=pre-release`
- [ ] Release stage: `CSP_LIFECYCLE_STAGE=release`
- [ ] W każdym etapie uruchom:
  - `npm run test:csp`
  - `npm run test:smoke`

## Etap 4 — Content & compliance
- [ ] Frontmatter contentu przechodzi walidację (testy green)
- [ ] Asset compliance checklist domknięta
- [ ] Dokumentacja projektu uzupełniona

## Etap 5 — Go-live decision
- [ ] Brak krytycznych błędów i blockerów
- [ ] Security telemetry przejrzane
- [ ] Finalna decyzja release udokumentowana (meeting note)

## Rollback
- [ ] Ustaw `CSP_MODE=report-only`
- [ ] Wycofaj ostatni deploy
- [ ] Zbierz naruszenia i popraw allowlist
- [ ] Przejdź ponownie przez pre-release gate
