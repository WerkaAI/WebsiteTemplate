# ADR-0003: CoreStarter vs PerProject boundary

- Status: Accepted
- Data: 2026-02-20

## Kontekst
Rosnąca liczba modułów utrudnia szybkie uruchamianie nowych projektów. Brak formalnej granicy między częścią wspólną i projektową zwiększa ryzyko regresji oraz koszt utrzymania.

## Opcje
1. Brak formalnej granicy (decyzje ad-hoc).
2. Twarda separacja na dwa repozytoria.
3. Jedno repo z formalną granicą i regułami zmian.

## Decyzja
Wybór opcji 3.

## Konsekwencje
- Plusy:
  - przewidywalny start projektów
  - mniejsze ryzyko osłabienia security/quality baseline
  - prostsza praca agentowa nad roadmapą
- Minusy:
  - większa dyscyplina procesowa
  - potrzeba regularnej aktualizacji dokumentu granic

## Plan rollback
- Tymczasowo dopuścić wyjątki bez ADR tylko dla zmian krytycznych produkcyjnie.
- Po stabilizacji wrócić do pełnych reguł.

## Metryki sukcesu
- Krótszy lead time uruchomienia nowego projektu.
- Mniejsza liczba regresji w obszarze core.
- Stabilny poziom green CI >95%.
