# ADR-0008: CSP enforcement gate per project lifecycle

- Status: Accepted
- Data: 2026-02-21
- Supersedes (proposed): ADR-0005 (only for rollout policy)

## Kontekst
Po wdrożeniu baseline CSP pojawił się problem DX: polityka CSP potrafi blokować integracje i utrudniać development na etapie template customization.

Zespół zgłosił potrzebę, aby **egzekwowanie CSP (enforce)** uruchamiać dopiero pod koniec wdrożenia konkretnego projektu, po zamknięciu integracji marketing/analityka/media.

## Głos specjalistów (podsumowanie)
- Security: enforce powinno być finalnym gate przed produkcją, nie pierwszym krokiem.
- Platform: starter powinien mieć przewidywalny tryb domyślny i prosty przełącznik env.
- DX: lokalnie i na etapie implementacji najlepiej działa `report-only`.
- QA/Release: potrzebny checklist gate i smoke po zmianie trybu.

## Opcje
1. Utrzymać aktualny model z ADR-0005 (`dual` domyślnie na produkcji).
2. Wprowadzić **per-project gate**:
   - etap implementacji: `report-only`,
   - pre-release/staging: `dual`,
   - produkcja po akceptacji: `enforce` lub `dual` zgodnie z ryzykiem.
3. Całkowicie wyłączyć CSP w starterze i dodawać ręcznie.

## Decyzja
Wybrano opcję 2: **CSP enforce jako końcowy gate per project**, nie jako sztywny default startera.

## Konsekwencje
- Plusy
  - lepszy DX i mniej blokad w trakcie developmentu,
  - bardziej przewidywalne wdrożenia klientów,
  - czytelny moment odpowiedzialności security przed release.
- Minusy
  - wymaga dyscypliny release (nie można pominąć gate),
  - potrzebna krótka checklista i notatka z decyzją trybu.

## Playbook (minimalny)
1. Start projektu: `CSP_MODE=report-only`.
2. Freeze integracji: `CSP_MODE=dual` + monitoring naruszeń.
3. Go-live decision: `CSP_MODE=enforce` (lub pozostanie na `dual` z uzasadnieniem).
4. Smoke + kontakt E2E obowiązkowo po zmianie trybu.

## Plan rollback
W przypadku regresji po przejściu na enforce:
1. natychmiast przełączyć na `CSP_MODE=report-only`,
2. zebrać naruszenia i zaktualizować allowlist,
3. ponowić rollout przez `dual`.

## Metryki sukcesu
- brak blockerów developerskich związanych z CSP na etapie implementacji,
- brak krytycznych regresji po przejściu do enforce,
- udokumentowany gate CSP dla każdego projektu klienta.
