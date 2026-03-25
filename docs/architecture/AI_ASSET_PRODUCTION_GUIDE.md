# AI Asset Production Guide (FizjoterapiaWrocławWeb)

Cel: wytworzyć **używalne materiały** (stills / ornamenty / ewentualne wideo-tekstury / cutout) pod animacje i hero, w sposób powtarzalny, bez chaosu i bez ryzyk dla SSR/perf/a11y.

Źródło decyzji: [docs/foundation/MEETING_16_ANIMATIONS_AI_WOW_FACTOR.md](../foundation/MEETING_16_ANIMATIONS_AI_WOW_FACTOR.md)

---

## Zasady bezpieczeństwa (zanim cokolwiek wygenerujesz)

1. Above-the-fold ma być czytelny bez JS (nie generuj assetów, które są „konieczne” do czytelności H1/CTA).
2. `prefers-reduced-motion` = wersja statyczna (stills zamiast wideo, brak parallax/auto-ruchu).
3. Na mobile asset nie może wymagać kursora (spotlight ma fallback statyczny).
4. AI nie tworzy fałszywych „pacjentów” do opinii.
5. Kolory i kontrast muszą pasować do istniejącego brandu (bez nowych, krzykliwych palet).

### Brand / tokeny (dla spójności)

Z obecnych tokenów wynika, że najbezpieczniejszy kierunek to **jasne, spokojne tła** z bardzo delikatnym mint akcentem:
- Primary mint: `#75F1EB`
- Light mint: `#E0F9F8`
- Tło: `#FAFAFA` / `#F4F4F5`
- Tekst: `#1A1A1A`

W praktyce: ornament ma żyć w neutralach, a ewentualny mint ma być **bardzo nisko nasycony** (jak w `.hero-gradient`).

---

## Co produkujemy (MVP → Upgrade)

### MVP (must-have)
- **Hero ornament (stills):** 1–2 warianty statycznej tekstury/ornamentu pod spotlight.
- **Hero cutout (jeśli potrzeba):** dopracowane wycięcie zdjęcia (tło transparentne), bez zmiany wizerunku.

### Upgrade (opcjonalnie)
- **Wideo-tekstura (4–8s loop):** spokojne abstrakcyjne tło jako dekoracja (z poster + fallback still).vv

---

## Proces (krok po kroku)

> Każdy krok kończy się artefaktem (plikiem) w `docs/production/`.

### Krok 1 — Brief (15–25 min)
1. Skopiuj szablon: [docs/production/templates/asset-brief.md](templates/asset-brief.md)
2. Uzupełnij dla konkretnego assetu (np. `Hero ornament – variant A`).
3. Zapisz jako: `docs/production/briefs/BRIEF_<asset>_<YYYY-MM-DD>.md`

**Exit criteria:** brief ma jednoznaczny cel, format wyjściowy i ograniczenia.

### Krok 2 — Moodboard (20–40 min)
1. Zbierz 8–12 referencji (linki + 1 zdanie „co z tego bierzemy”).
2. Zapisz w briefie w sekcji Moodboard.

**Exit criteria:** 2–3 spójne kierunki estetyczne (bez mieszania stylów).

### Krok 3 — Storyboard (10–20 min)
1. Skopiuj: [docs/production/templates/storyboard.md](templates/storyboard.md)
2. Uzupełnij: gdzie asset występuje (Hero), jak się zachowuje (statycznie / wideo), fallbacki.
3. Zapisz jako: `docs/production/storyboards/STORY_<asset>_<YYYY-MM-DD>.md`

**Exit criteria:** wiadomo, w jakiej warstwie jest asset (dekoracja), i co jest fallbackiem.

### Krok 4 — Generacja (30–120 min)
1. Skopiuj: [docs/production/templates/prompt-log.md](templates/prompt-log.md)
2. Generuj w narzędziach (MJ / Kling / Veo3 / Nanobanana).
3. Zapisuj każdy prompt + seed/ustawienia + wynik (link/ID).
4. Wybierz 3 najlepsze wyniki do postprodukcji.

**Exit criteria:** 3 kandydaty, każdy pasuje do briefu i nie jest „plastikowy”.

#### Szybka rubryka wyboru (żeby wybór był obiektywny)
Każdy kandydat oceń w skali 1–5 dla:
- **Czytelność:** czy H1/CTA byłby czytelny na tym tle?
- **Subtelność:** czy to nie kradnie uwagi od copy?
- **„Premium”:** czy wygląda jak editorial design, a nie jak generator?
- **Crop:** czy da się dobrze przyciąć na mobile?

### Krok 5 — Postprodukcja (Adobe) (30–90 min)
- Wyrównaj kolorystycznie do brandu.
- Usuń artefakty.
- Przy cutout: dopracuj krawędzie (włosy/ramiona), dodaj naturalny feather.

**Exit criteria:** asset wygląda naturalnie, nie „AI”.

### Krok 6 — Eksport web (15–45 min)
**Stills:** eksportuj WebP/AVIF (zależnie od pipeline) + ewentualny PNG (gdy transparent).

Minimalne założenia eksportu:
- rozdzielczość: w praktyce wystarczy tło „hero desktop” + możliwość cropu
- waga: preferuj „kilkaset KB lub mniej” dla tła (im mniej tym lepiej)

**Wideo (jeśli upgrade):**
- bez audio,
- krótka pętla,
- zawsze `poster`.

**Exit criteria:** pliki są lekkie i mają czytelne nazwy.

### Krok 7 — QA + akceptacja (15–30 min)
Skorzystaj z checklisty z końca spotkania + dopisz w logu wynik.

---

## Spec dostarczania assetów (nazwy i struktura)

> Ta część jest po to, żeby integracja w kodzie była szybka.

### Rekomendowana struktura (gdy zaczniemy dodawać do repo)
- `public/images/hero/`
- `public/videos/hero/` (tylko jeśli upgrade)

### Naming
- `hero-ornament-a.webp`
- `hero-ornament-b.webp`
- `hero-cutout.png`
- `hero-ornament-loop.mp4`
- `hero-ornament-loop-poster.webp`

---

## Minimalny „Definition of Done” dla assetu

- pasuje do briefu
- ma fallback statyczny
- nie wymusza motion do czytelności
- działa na mobile
- nie ma flicker
- ma wpis w prompt logu

---

## Start tutaj (praktycznie)

Jeśli robimy teraz MVP, to zaczynamy od:
1) Brief: **Hero ornament (variant A)**
2) Prompt log: 10–15 prób
3) 3 kandydaty → post → eksport
