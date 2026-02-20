# Team Meeting — Step 06 (Repo Migration & Cleanup)

- Data: 2026-02-20
- Cel kroku: przepiąć projekt na nowe repo i odchudzić template z plików roboczych.

## Uczestnicy (5+1)
- Platform Architect
- Content/MDX Lead
- Forms & Integrations Lead
- Security & Compliance Lead
- Quality & CI/CD Lead
- Nieszablonowy Geniusz (observer)

## Przebieg dyskusji
1. Platform Architect: potwierdzenie nowego `origin` do `WerkaAI/WebsiteTemplate`.
2. Quality Lead: rekomendacja usunięcia katalogów, które nie wpływają na działanie produktu.
3. Security Lead: zalecenie, aby nie trzymać w template historycznych plików researchowych i eksportów audytowych.
4. Content Lead: zgoda na usunięcie `attached_assets` i `antigravity` jako materiałów procesowych.
5. Nieszablonowy Geniusz: sugestia utrzymania lekkiej dokumentacji operacyjnej + możliwości odtworzenia artefaktów przez skrypty.

## Decyzje zespołu
- Przepiąć `origin` na nowe repo GitHub.
- Usunąć z repo katalogi:
  - `attached_assets/`
  - `antigravity/`
  - `docs/review/artifacts/mobile/`
- Dodać reguły do `.gitignore`, by te katalogi nie wracały.
- Uporządkować odniesienia w `docs/review/mobile_review_plan.md`.

## Wynik
- Repo jest gotowe do publikacji jako czystszy starter.
- Kod produkcyjny i aktywne skrypty pozostały bez naruszeń.

## Artefakty
- [.gitignore](../../../.gitignore)
- [docs/review/mobile_review_plan.md](../../../docs/review/mobile_review_plan.md)
- [docs/foundation/FOUNDATION_CLOSEOUT_2026-02-20.md](../FOUNDATION_CLOSEOUT_2026-02-20.md)
