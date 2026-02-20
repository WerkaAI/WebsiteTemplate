# Team Meeting — Step 01 (Quality Gates)

- Data: 2026-02-20
- Cel kroku: domknięcie podstawowej bramki jakości przed dalszym hardeningiem.

## Uczestnicy (5+1)
- Platform Architect
- Content/MDX Lead
- Forms & Integrations Lead
- Security & Compliance Lead
- Quality & CI/CD Lead
- Nieszablonowy Geniusz (observer)

## Przebieg dyskusji
1. Quality & CI/CD Lead: zgłoszenie luki — CI nie uruchamia testów.
2. Forms Lead: zgłoszenie błędu testowego `TutorialGrid` przez zależność od consent context.
3. Security Lead: warunek wejścia do kolejnego kroku — testy muszą być deterministyczne.
4. Nieszablonowy Geniusz: rekomendacja, aby najpierw usunąć niestabilność testów, dopiero potem dokładać kolejne warstwy.

## Decyzje zespołu
- Dodać `npm run test` do CI.
- Naprawić test `TutorialGrid` przez mock `useAnalytics`.
- Kontynuować tylko po zielonym `test + typecheck`.

## Wynik
- CI zawiera testy.
- Testy lokalne przechodzą.
- Etap zamknięty i zatwierdzony do dalszego hardeningu.

## Artefakty
- [.github/workflows/ci.yml](../../../.github/workflows/ci.yml)
- [src/components/__tests__/tutorial-grid.test.tsx](../../../src/components/__tests__/tutorial-grid.test.tsx)
