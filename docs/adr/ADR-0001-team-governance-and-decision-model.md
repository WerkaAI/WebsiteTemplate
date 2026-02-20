# ADR-0001: Team governance and decision model for CoreStarter

- Status: Accepted
- Data: 2026-02-20

## Kontekst
Projekt ewoluował organicznie i ma dużą liczbę obszarów krytycznych (MDX, formularze, bezpieczeństwo, CI). Potrzebny jest spójny model decyzji, aby utrzymać jakość przy rosnącej liczbie wdrożeń.

## Opcje
1. Decyzje ad-hoc bez formalnego modelu.
2. Jeden tech lead decyduje o wszystkim.
3. Model `DACI` z 5 rolami decyzyjnymi + 1 obserwatorem (Geniusz).

## Decyzja
Wybieramy opcję 3: `DACI` oraz formalny rytm pracy opisany w [docs/foundation/TEAM_OPERATING_SYSTEM.md](../foundation/TEAM_OPERATING_SYSTEM.md).

## Konsekwencje
- Plusy:
  - szybsze i bardziej przewidywalne decyzje
  - mniejsze ryzyko regresji cross-domain
  - lepsza dokumentacja wiedzy
- Minusy:
  - dodatkowy koszt procesu i dyscypliny dokumentacyjnej

## Plan rollback
Jeśli model obniży throughput przez 2 sprinty z rzędu:
1. redukcja ceremonii (mniej review)
2. uproszczenie ról do 3 ownerów
3. ponowna ocena po 1 sprincie

## Metryki sukcesu
- Green CI >95%.
- Decyzje architektoniczne domykane <48h.
- Brak otwartych High/Critical >7 dni.
- Lead time PR->merge <24h dla standardowych zmian.
