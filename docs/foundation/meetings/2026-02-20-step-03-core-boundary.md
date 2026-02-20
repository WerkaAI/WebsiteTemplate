# Team Meeting — Step 03 (Core Boundary)

- Data: 2026-02-20
- Cel kroku: formalnie oddzielić część reusable od per-projekt.

## Uczestnicy (5+1)
- Platform Architect
- Content/MDX Lead
- Forms & Integrations Lead
- Security & Compliance Lead
- Quality & CI/CD Lead
- Nieszablonowy Geniusz (observer)

## Przebieg dyskusji
1. Platform Architect: ryzyko dryfu architektury bez formalnej granicy.
2. Content Lead: konieczność rozdzielenia pipeline core od treści klienta.
3. Security Lead: wymóg, aby override per-projekt nie osłabiał baseline.
4. Quality Lead: każda zmiana core musi mieć test/aktualizację testu.
5. Nieszablonowy Geniusz: propozycja dokumentu „boundary” jako kontraktu dla agentów i developerów.

## Decyzje zespołu
- Przyjąć dokument granicy `CoreStarter` vs `PerProject`.
- Utrwalić decyzję w ADR-0003.

## Wynik
- Powstał dokument granic i reguł pracy.
- Decyzja zapisana i zaakceptowana.

## Artefakty
- [docs/foundation/CORE_STARTER_BOUNDARY.md](../CORE_STARTER_BOUNDARY.md)
- [docs/adr/ADR-0003-core-vs-project-boundary.md](../../adr/ADR-0003-core-vs-project-boundary.md)
