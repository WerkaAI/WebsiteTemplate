# White-label audit — 2026-02-21

## Cel
Zidentyfikować pozostałości po poprzednim projekcie i oszacować zakres dalszego czyszczenia template.

## Wynik skanu (grep)
- `src`: 134 trafienia (`autozaba|AutoŻaba|Żabka|app.autozaba.pl|panel.autozaba.pl`)
- `content`: 47 trafień
- `docs`: 69 trafień

## Największe skupiska
1. `src/app/polityka-cookies/page.tsx`
2. `src/app/polityka-prywatnosci/page.tsx`
3. `src/lib/onboarding/*`
4. `src/app/tutoriale/page.tsx`
5. `src/app/funkcje/page.tsx`
6. `src/app/page.tsx`
7. `src/data/blog-posts.ts`

## Public assets — obserwacje
- folder `public/blog-illustrations/DlaDImy/*` wygląda na archiwalny
- plik `public/Regulamin_Serwisu_Autozaba.pdf` nie jest już używany przez runtime
- nazewnictwo części assetów nadal zawiera ślady poprzedniego brandu

## Zmiany wykonane w tym kroku
- neutralizacja kolejnych stringów legacy w:
  - `src/components/cookies/cookie-banner.tsx`
  - `src/lib/cookies/consent-types.ts`
  - `src/lib/cookies/consent-manager.ts`
  - `src/data/pricing.ts`
  - `src/components/features/home/contact-section.tsx`
  - `src/components/features/onboarding/chat-flow.tsx`
- odświeżony lockfile (`npm install --package-lock-only`) po zmianie nazwy pakietu

## Co zostało do zrobienia (kolejny krok)
- pełny pass white-label w `src/app/*` i `src/lib/onboarding/*`
- czyszczenie/lub archiwizacja legacy docs i draft contentu historycznego
- porządki w `public/` (usunąć nieużywane assety i/lub ujednolicić nazewnictwo)

---

## Aktualizacja po Step 10B (part 2)

### Wynik ponownego skanu (grep)
- `src`: 55 trafień
- `content`: 47 trafień
- `docs`: 70 trafień

### Postęp
- istotna redukcja legacy w runtime (`src`) — z 134 do 55
- zneutralizowane legal pages i część onboarding/cookies/metadata

### Kolejność dalszych działań
1. dokończyć white-label `src/app/page.tsx`, `src/app/funkcje/page.tsx`, `src/data/blog-posts.ts`
2. ograniczyć legacy w `src/lib/onboarding/*` do neutralnego słownika
3. odchudzić `docs/` i `public/` z archiwalnych artefaktów

---

## Aktualizacja po Step 10B (part 3)

### Wynik ponownego skanu (grep)
- `src`: 37 trafień
- `content`: 47 trafień
- `docs`: 71 trafień

### Postęp
- dokończono neutralizację metadata i copy w:
  - `src/app/page.tsx`
  - `src/app/funkcje/page.tsx`
  - `src/data/blog-posts.ts`
- dalsza redukcja legacy w runtime (`src`) — z 55 do 37

### Kolejność dalszych działań
1. finalny pass `src/lib/onboarding/*` i `src/app/tutoriale/page.tsx`
2. ograniczyć legacy `docs/*` do sekcji archiwalnych i wyraźnie oznaczyć je jako historical
3. porządki `public/` (usunąć nieużywane legacy assets)

---

## Aktualizacja po Step 10B (part 4)

### Wynik ponownego skanu (grep)
- `src`: 37 trafień
- `content`: 47 trafień
- `docs`: 54 trafienia

### Postęp
- usunięto nieużywane legacy assets z `public/` (PNG/MP4/PDF)
- usunięto przestarzałe dokumenty planistyczne z `docs/` (m.in. `CENNIK_REDESIGN_PLAN.md`)
- zaktualizowano odwołania w dokumentacji do aktualnych plików foundation
- brak nieużywanych plików multimedialnych w `public/` po skanie referencji

### Kolejność dalszych działań
1. finalny pass white-label dla `src/lib/onboarding/*` i `src/app/tutoriale/page.tsx`
2. redukcja legacy wpisów w `content/*` (draft/historyczne materiały)
3. domknięcie Step 10B i przejście do finalnego polish pass

### Decyzja zespołu (meeting)
- zwołano spotkanie Step 10B dot. mediów (`assets + onboarding video`)
- decyzja: CoreStarter ma być neutralny również wizualnie (nie tylko tekstowo)
- action: uruchomić part 5 „Asset Neutralization Pass” + checklista zgodności assetów

---

## Aktualizacja po Step 10B (part 5)

### Wynik ponownego skanu (grep)
- `src`: 36 trafień
- `content`: 47 trafień
- `docs`: 55 trafień

### Postęp
- runtime odpięty od brandowych mediów onboarding (MP4) na rzecz neutralnych placeholderów
- runtime odpięty od brandowych ilustracji „maskotki” na rzecz neutralnych grafik template
- usunięto brandowe media z `public/images/onboarding/*` i legacy ilustracje używane wcześniej w home
- social preview (OG/Twitter) przełączony na neutralny cover

### Kolejność dalszych działań
1. finalny pass treści onboarding (copy + nazewnictwo) w `src/lib/onboarding/*`
2. domknięcie cleanup historycznych treści w `content/*`
3. finalne zamknięcie Step 10B

---

## Aktualizacja po Step 10B (part 6)

### Wynik ponownego skanu (grep)
- `src`: 0 trafień
- `content`: 49 trafień
- `docs`: 65 trafień

### Postęp
- domknięto runtime cleanup: brak stringów legacy w `src/**` dla wzorca `autozaba|AutoŻaba|Żabka|app.autozaba.pl|panel.autozaba.pl`
- zneutralizowano onboarding runtime (copy, localStorage keys, deepLink placeholders)
- zneutralizowano pozostałe copy i metadata runtime (home, cennik, blog/tutorial structured data)

### Kolejność dalszych działań
1. finalny pass white-label dla `content/**` (frontmatter, copy i legacy URL-e CDN/app)
2. oznaczenie historycznych dokumentów w `docs/**` jako archiwalne lub ich przeniesienie do sekcji historical
3. po czyszczeniu content/docs: formalne zamknięcie Step 10B w roadmapie

---

## Aktualizacja po Step 10B (part 7)

### Wynik ponownego skanu (grep)
- `src`: 0 trafień
- `content`: 0 trafień
- `docs`: 70 trafień

### Postęp
- domknięto cleanup white-label dla `content/**`:
  - zneutralizowano tytuły/opisy i copy brandowe w blog/tutorial drafts
  - usunięto legacy domeny app/panel i adresy mailowe brandowe
  - podmieniono legacy URL-e coverów i części obrazów na neutralne placeholdery lokalne
- runtime + content są teraz neutralne względem wzorca legacy

### Pozostały zakres
1. utrzymać `docs/**` jako obszar historyczny (świadomie zawiera legacy referencje audytowe i archiwalne)
2. dodać finalną notę zamknięcia Step 10B po decyzji zespołu, czy czyścimy historyczne docs czy je oznaczamy

---

## Aktualizacja po Step 10B (part 8) — closure

### Wynik końcowy
- `src`: 0 trafień
- `content`: 0 trafień
- `docs`: trafienia wyłącznie historyczne/audytowe

### Domknięcie dokumentacji
- skonsolidowano plany operacyjne do `docs/plans/*`
- dodano centralny indeks dokumentacji: `docs/README.md`
- root markdown ograniczony do plików-przekierowań + `README.md`

### Decyzja formalna
- policy dla legacy referencji w docs: **Accepted** (`ADR-0007`)
- Step 10B uznany za zamknięty
