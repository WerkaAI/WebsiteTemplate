# ADR-0007: Polityka legacy referencji w dokumentacji historycznej

- Status: Accepted
- Data: 2026-02-21

## Kontekst
W ramach Step 10B osiągnęliśmy neutralny runtime (`src/**`) i neutralny content (`content/**`).
Pozostałe trafienia legacy występują głównie w `docs/**`, gdzie pełnią funkcję:
- śladu audytowego (historyczne metryki grep i nazwy plików),
- dokumentacji decyzji security i onboarding,
- materiałów referencyjnych z okresu przed white-label.

Pełny rewrite takich dokumentów obniża wartość historyczną i utrudnia audyt porównawczy.

## Opcje
1. Pełny rewrite wszystkich `docs/**` do neutralnej nomenklatury.
2. Oznaczyć dokumenty historyczne i zachować legacy referencje jako audit trail.
3. Usunąć dokumenty historyczne zawierające legacy nazwy.

## Decyzja
Proponujemy **Opcję 2**: zachować legacy referencje w dokumentach historycznych, ale wyraźnie je oznaczyć jako archiwalne i wyłączone z wymogu white-label runtime/content.

Uzasadnienie:
- zachowanie ciągłości dowodowej i audytowej,
- niższy koszt utrzymania niż pełny rewrite,
- brak wpływu na runtime i UX końcowego produktu.

## Konsekwencje
- Plusy
  - pełna historia decyzji i metryk pozostaje dostępna,
  - szybsze domknięcie Step 10B,
  - niższe ryzyko wprowadzenia błędów merytorycznych w archiwach.
- Minusy
  - grep globalny dla repo nadal pokaże trafienia legacy w `docs/**`.
- Wpływ na utrzymanie
  - konieczność utrzymania prostego oznaczenia "historical" w dokumentach archiwalnych.

## Plan rollback
Jeśli opcja 2 okaże się niewystarczająca:
1. przejść na opcję 1 dla wskazanej podgrupy dokumentów,
2. prowadzić rewrite etapami (security → onboarding → review),
3. utrzymać changelog migracji po każdej partii.

## Metryki sukcesu
- `src/**`: 0 trafień legacy,
- `content/**`: 0 trafień legacy,
- `docs/**`: wszystkie trafienia występują wyłącznie w dokumentach oznaczonych jako historyczne/audytowe,
- Step 10B zamknięty formalnie w roadmapie.
