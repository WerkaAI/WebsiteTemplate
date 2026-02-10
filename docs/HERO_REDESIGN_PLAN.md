# Hero Section Redesign — "Żywy Grafik"

> Plan opracowany przez zespół: Senior Web Developer, Senior Marketing Specialist, UX/UI Designer

---

## 1. Diagnoza obecnego stanu

### Obecna hero section
- Lewa strona: copywriting + CTA + social proof
- Prawa strona: **statyczna symulacja "chaotycznego tygodnia"** — 7 kafelków z błędami (Pon–Nie)
- Problem: to nie przypomina prawdziwej aplikacji, jest abstrakcyjna "ilustracją chaosu"
- Floating badge "Kontrola PIP za 2 dni!" — efektowny, ale oderwany od produktu

### Co zachowujemy
- Lewą kolumnę (nagłówek, CTA, social proof) — działa dobrze, minimalne zmiany
- Tilt-on-hover na boardzie — subtelna mikro-interakcja, premium feel
- Istniejącą infrastrukturę: framer-motion, `usePrefersReducedMotion`, CSS custom properties
- Filozofię "Calm & Control" — hero dalej opowiada historię chaosem → porządek

---

## 2. Dyskusja zespołu

### 🎨 UX/UI Designer — Marta

**Kluczowy insight:** "Użytkownik musi zobaczyć narzędzie w akcji jeszcze ZANIM kliknie cokolwiek. Hero to nasze 3-sekundowe okno na uwagę. Animacja harmonogramu wyręcza nas w tłumaczeniu — jest to 'show, don't tell' w najczystszej formie."

- **Grid musi być rozpoznawalny** — ktoś, kto widział tabelkę w Excelu, od razu zorientuje się, że to grafik zmian. Wiersze = pracownicy, kolumny = dni tygodnia.
- **Nie symulujemy kursora myszy** — to anti-pattern na mobile. Zamiast tego animacja odpalana jest automatycznie po załadowaniu, jak "film productowy".
- **Pusta tablica → wypełnienie powinno trwać max 2.5s** po pojawieniu się w viewport. Longer = użytkownik scrolluje dalej.
- **Kafelki zmian** powinny mieć kolory pastelowe jak w appce: zielony (rano), żółty (popołudnie), różowy (wolne/niedostępność). To buduje podświadome skojarzenie z produktem.
- **Status Obsady na dole** (zielone fajki) — kluczowy element "rozwiązania problemu". Bez niego animacja nie ma pointy.
- **Na mobile (< 768px)** — zamiast ucinać grid, pokażmy statyczny, wypełniony harmonogram jako obraz/mini-grid. Animacja tylko na desktop.

### 📈 Senior Marketing Specialist — Marek

**Kluczowy insight:** "Hero sprzedaje emocję, nie feature. Emocja to: 'wreszcie mam to z głowy'. Animacja wypełniającego się grafiku to najsilniejszy wizualny komunikat, jaki możemy dać."

- **Sekwencja emocjonalna powinna być:** 😰 pustka/problem → ✨ magia jednym klikiem → 😌 pełen grafik
- **Nie pokazujmy drag & drop w hero** — to za dużo złożoności. Hero = "jednym przyciskiem zrobiłeś grafik". Interaktywne ficzery (D&D, edycja) najlepiej w oddzielnej sekcji demo poniżej.
- **Floating badge z "Kontrola PIP"** — zachowuję, ale zmieniam na kontekst post-generacji: "✓ 0 naruszeń Kodeksu Pracy" (pozytywny framing po wypełnieniu grafiku)
- **Status Obsady (dół gridu)** — powinien animować się z "❌ -2" na "✅" — to JEDYNA rzecz, którą musi zapamiętać visitor: "system rozwiązuje problemy automatycznie"
- **Nie przesadzamy z realizmem** — nie potrzebujemy 7 pracowników × 7 dni na desktopie. 5 pracowników × 5 dni (Pon–Pt) jest wystarczające i czytelne.

### 💻 Senior Web Developer — Paweł

**Kluczowy insight:** "Animacja musi być deterministyczna i lekka. Żaden randomowy timer — precyzyjne staggered delays przez framer-motion `variants`. Na bundle ZERO dodatkowych zależności."

- **Technologia:** framer-motion `variants` z `staggerChildren` — już jest w projekcie, zero nowego kodu.
- **Performance budget:** cały komponent < 12KB gzip. Żadnych obrazków, żadnych Lottie. Czysty JSX + CSS.
- **Implementacja grid:** Tailwind `grid-cols-6` (nazwa + 5 dni) × 5 wierszy. Stały font-size na kafelkach.
- **Animacja 3-fazowa:**
  - Faza 0 (0–0.3s): Grid pojawia się pusty z delikatnym fade-in.
  - Faza 1 (0.3–0.8s): Status Obsady na dole mruga "na czerwono" — sygnalizuje braki (ikonki ❌ lub -2)
  - Faza 2 (0.8–2.8s): Kafelki zmian "wyskakują" kaskadowo (`scale: 0 → 1` z `ease: backOut`), kolumna po kolumnie (Pon → Pt). Każda kolumna z 120ms delay.
  - Faza 3 (2.8–3.5s): Status Obsady zmienia się z ❌ na ✅ (jeden po drugim, left-to-right, 80ms stagger). Badge "0 naruszeń" pojawia się.
- **Repeat loop:** po 8s pauzy, cała animacja resetuje się (opacity fade-out, 0.5s) i odtwarza od nowa. Na phone — statycznie, bez loop.
- **Accessibility:** `prefers-reduced-motion` = pokaż finalny stan (wypełniony grafik) bez animacji.
- **Data model:** Stała tablica shift-ów — żadnych losowo generowanych danych.

---

## 3. Finalna koncepcja — "Żywy Grafik"

### 3.1 Layout
```
┌─────────────────────────────────────────────────────────┐
│  [Lewa kolumna — bez zmian]     │  [Prawa kolumna]      │
│                                 │                       │
│  badge: Automatyczna Tarcza     │  ┌─────────────────┐  │
│                                 │  │ SYMULACJA GRIDU │  │
│  h1: Twój Cyfrowy Pomocnik     │  │                 │  │
│                                 │  │  Puste → Pełne  │  │
│  p: Zarządzaj sklepem...       │  │  (animacja)     │  │
│                                 │  │                 │  │
│  [CTA: Zacznij teraz →]        │  │  Status obsady  │  │
│  [CTA: Zobacz demo]            │  │  ❌ → ✅        │  │
│                                 │  └─────────────────┘  │
│  Social proof: 120+ sklepów    │                       │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Grid — struktura danych

| | Pon | Wt | Śr | Czw | Pt |
|---|---|---|---|---|---|
| **Szef Tadeusz** | 05:30–15:30 🟢 | — | — | 05:30–15:30 🟢 | — |
| **Olga** | — | — | 08:00–16:00 🟢 | — | — |
| **Andrzej** | — | 05:30–15:30 🟢 | — | — | — |
| **Tomek** | — | — | 13:30–21:30 🟡 | — | 13:30–21:30 🟡 |
| **Asia** | — | — | — | 13:30–21:30 🟡 | 13:30–21:30 🟡 |

Kolory kafelków (pastelowe, jak w appce):
- 🟢 **Poranna** (05:30–15:30, 08:00–16:00): `bg-emerald-100 text-emerald-800 border-emerald-200` | dark: `bg-emerald-500/15 text-emerald-200 border-emerald-500/30`
- 🟡 **Popołudniowa** (13:30–21:30): `bg-amber-100 text-amber-800 border-amber-200` | dark: `bg-amber-500/15 text-amber-200 border-amber-500/30`
- 🔴 **Brak obsady** (przed wypełnieniem): `bg-rose-50 text-rose-400` — ikonka ludzika z "?"

### 3.3 Status Obsady (dolny pasek)

5 komórek (Pon–Pt), każda przechodzi animację:
- **Faza 1 (problem):** Czerwone kółko z liczbą: `❌ -2`, `❌ -1`, etc.
- **Faza 3 (rozwiązanie):** Zielona fajka: `✅`

### 3.4 Floating badge (prawy-górny róg gridu)

- **Faza 1–2:** Ukryty (opacity: 0)
- **Faza 3:** Pojawia się z animacją spring: 
  - Treść: `✓ 0 naruszeń Kodeksu Pracy`
  - Styl: zielony accent, identyczny z istniejącym badge, ale pozytywny

### 3.5 Nagłówek gridu

Mini-header nad siatką:
```
┌──────────────────────────────────┐
│  📅 Harmonogram pracy           │
│  Luty, tydzień 7                │
└──────────────────────────────────┘
```

---

## 4. Sekwencja animacji — timeline

```
Czas (s)  Wydarzenie
───────── ──────────────────────────────────────────────
0.0       Grid wchodzi fade-in (opacity 0→1, translateY 20→0)
0.3       Nagłówek "Harmonogram pracy | Luty, tydzień 7" pojawia się
0.5       Kolumny dni (Pon–Pt) i wiersze pracowników — fade-in stagger
0.8       Status Obsady na dole: pojawia się z ikonkami ❌ i liczbami (-2, -1...)
1.0       Puste komórki: delikatne "pulsujące" tło rose-50 (sygnał problemu)
1.5       ── GENEROWANIE ──
1.5–2.8   Kafelki zmian wchodzą kaskadowo (kolumna po kolumnie):
          - Pon: 3 kafelki pojawiają się (scale 0→1, backOut)
          - Wt: +150ms delay
          - Śr: +150ms
          - Czw: +150ms
          - Pt: +150ms
          Każdy kafelek ma wewnętrzny stagger 60ms między wierszami
2.8       Ostatni kafelek jest na miejscu
2.8–3.3   Status Obsady: ❌ → ✅ jeden po drugim (80ms stagger)
3.3       Floating badge "✓ 0 naruszeń" pojawia się (spring animation)
3.5       Toast notification na dole gridu: "Harmonogram utworzony" (fade-in, 2s widoczny)
5.5       Toast znika (fade-out)
8.0       Cały grid robi fade-out (0.4s)
8.5       Restart od fazy 0 (loop)
```

**`prefers-reduced-motion`:** Pomijamy animację — od razu renderujemy pełen grafik (stan końcowy).

---

## 5. Specyfikacja komponentów

### 5.1 `<HeroScheduleGrid />`
Nowy podkomponent wewnątrz hero-section.tsx (lub wydzielony do osobnego pliku).

```
Props: brak (dane wbudowane w komponent)
Stan: animationPhase: 'empty' | 'filling' | 'complete'
```

Wewnętrzne elementy:
- `<ScheduleHeader />` — "Harmonogram pracy | Luty, tydzień 7"
- `<ScheduleGrid />` — siatka 6 kolumn × 6 wierszy (header + 5 pracowników)
- `<ShiftTile />` — pojedynczy kafelek zmiany (poranna/popołudniowa)
- `<StaffingStatus />` — dolny pasek z 5 ikonkami
- `<ComplianceBadge />` — floating badge "0 naruszeń" 
- `<SuccessToast />` — toast na dole

### 5.2 Stała danych (shifts)
```ts
type Shift = {
  employee: string
  day: number // 0=Pon, 1=Wt, ...4=Pt
  time: string // "05:30 – 15:30"  
  type: 'morning' | 'afternoon'
}

const SCHEDULE_DATA: Shift[] = [
  { employee: 'Szef Tadeusz', day: 0, time: '05:30\n15:30', type: 'morning' },
  { employee: 'Szef Tadeusz', day: 3, time: '05:30\n15:30', type: 'morning' },
  { employee: 'Olga',         day: 2, time: '08:00\n16:00', type: 'morning' },
  { employee: 'Andrzej',      day: 1, time: '05:30\n15:30', type: 'morning' },
  { employee: 'Tomek',        day: 2, time: '13:30\n21:30', type: 'afternoon' },
  { employee: 'Tomek',        day: 4, time: '13:30\n21:30', type: 'afternoon' },
  { employee: 'Asia',         day: 3, time: '13:30\n21:30', type: 'afternoon' },
  { employee: 'Asia',         day: 4, time: '13:30\n21:30', type: 'afternoon' },
]
```

### 5.3 Styling kafelków

```
Morning shift:
  light: bg-emerald-50 border border-emerald-200 text-emerald-800
  dark:  bg-emerald-500/15 border-emerald-500/30 text-emerald-200

Afternoon shift:  
  light: bg-amber-50 border border-amber-200 text-amber-800
  dark:  bg-amber-500/15 border-amber-500/30 text-amber-200

Empty (problem phase):
  light: bg-rose-50/50
  dark:  bg-rose-500/5
```

### 5.4 Responsywność

| Breakpoint | Zachowanie |
|---|---|
| `lg` (1024px+) | Pełna animacja, 2-kolumnowy layout L+R |
| `md` (768px–1023px) | Grid widoczny pod tekstem (1 kolumna), animacja uproszczona |
| `< 768px` | Grid ukryty LUB mini-wersja statyczna (3 kolumny × 3 wiersze, stan końcowy) |

---

## 6. Harmonogram implementacji

| Krok | Opis | Estymacja |
|---|---|---|
| 1 | Stworzenie `HeroScheduleGrid` ze statycznym gridem (dane + style) | 30 min |
| 2 | Podpięcie do hero-section.tsx (zamiana prawej kolumny) | 15 min |
| 3 | Implementacja animacji fazowej (framer-motion variants) | 45 min |
| 4 | Status Obsady + ComplianceBadge + Toast | 30 min |
| 5 | Responsive / mobile fallback | 20 min |
| 6 | Accessibility (reduced-motion, ARIA) | 10 min |
| 7 | Dark mode tuning | 15 min |
| 8 | QA + final polish | 15 min |

**Łączna estymacja: ~3h pracy deweloperskiej**

---

## 7. Czego NIE robimy w hero (ale warto na przyszłość)

- ❌ **Symulacja kursora myszy** — nie działa na mobile, uncanny valley
- ❌ **Drag & drop w hero** — zbyt złożone, lepiej w sekcji demo
- ❌ **Modal "Generuj"** — dodaje krok wizualny bez wartości marketingowej
- ❌ **Pełny 7-dniowy grid** — za szeroki, nieczytelny na desktop
- ❌ **Losowe dane** — determinizm = QA-friendly, consistent screenshots

---

## 8. Metryki sukcesu

- **Scroll depth:** Czy więcej użytkowników dociera do sekcji pod hero? (animacja przyciąga wzrok)
- **CTA click rate:** Czy "Zacznij teraz" ma wyższy CTR? (lepsze zrozumienie produktu)
- **Time on page:** Czy użytkownicy spędzają 2-5s dłużej? (oglądają animację)
- **Bounce rate:** Czy spada? (hero lepiej komunikuje wartość)

---

## 9. Decyzja: Co wybrać?

**Rekomendacja zespołu:** Wersja z automatyczną animacją fazową (bez symulacji kursora). To najlepszy kompromis między:
- ✅ Wow-efektem (kaskadowe wypełnianie gridu)
- ✅ Wydajnością (zero nowych deps, <12KB)
- ✅ Mobile-friendly (statyczny fallback)
- ✅ Brand consistency ("Calm & Control")
- ✅ Bliskością z realną aplikacją (pastelowe kafelki, prawdziwe dane zmian, status obsady)
