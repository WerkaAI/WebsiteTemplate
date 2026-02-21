# Step 10B — white-label pass (part 6)

Data: 2026-02-21

## Zakres
- finalny pass white-label dla `content/**` (blog/tutorial drafts)

## Co zrobiono
- zneutralizowano copy legacy i nazewnictwo brandowe w plikach:
  - `content/blog/2025-08-21-witaj-autozaba.mdx`
  - `content/blog/2025-10-25-jak-wdrazamy-klientow.mdx`
  - `content/blog/2025-10-26-jak-nauczylismy-autozabe-uczyc.mdx`
  - `content/tutorials/2025-10-18-start-w-autozaba.mdx`
  - `content/tutorials/2025-10-19-pierwsze-kroki-pracownika.mdx`
  - `content/tutorials/2025-10-19-tworzenie-grafiku.mdx`
  - `content/tutorials/2025-10-20-ewidencja-czasu-pracy.mdx`
  - `content/tutorials/2025-10-21-dodawanie-nowych-pracownikow.mdx`
  - `content/tutorials/2025-10-24-pierwszy-harmonogram.mdx`
- usunięto legacy domeny (`app.autozaba.pl`, `panel.autozaba.pl`) i brandowe maile
- podmieniono legacy cover URL-e i część inline obrazów na neutralne placeholdery lokalne

## Walidacja
- grep legacy po zmianach:
  - `src=0`
  - `content=0`
  - `docs=70`
- brak błędów w edytowanych plikach runtime (wcześniejsza walidacja Step 10B)

## Decyzje
- Part 6 zakończony.
- Do domknięcia Step 10B pozostaje decyzja zespołu dot. `docs/**`:
  - opcja A: zachować legacy referencje jako historical/audit trail,
  - opcja B: wykonać pełny rewrite archiwalnych dokumentów do neutralnej nomenklatury.
