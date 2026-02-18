# 🐸 Onboarding Chat — Dokumentacja Deweloperska

> Kompletny przewodnik po systemie czatowego onboardingu AutoŻaba.
> Ostatnia aktualizacja: lipiec 2025 r.

---

## Spis treści

1. [Jak to działa — przegląd](#1-jak-to-działa--przegląd)
2. [Mapa plików](#2-mapa-plików)
3. [Architektura danych](#3-architektura-danych)
4. [Funkcje pomocnicze (helpery)](#4-funkcje-pomocnicze-helpery)
5. [Edytowanie istniejącej treści](#5-edytowanie-istniejącej-treści)
6. [Dodawanie nowego kroku](#6-dodawanie-nowego-kroku)
7. [Dodawanie nowego rozdziału](#7-dodawanie-nowego-rozdziału)
8. [Dodawanie mediów (wideo / screenshot)](#8-dodawanie-mediów-wideo--screenshot)
9. [Animacje wskaźnika (pointer)](#9-animacje-wskaźnika-pointer)
10. [Rozgałęzienia (branching)](#10-rozgałęzienia-branching)
11. [Quick Help — szybka pomoc](#11-quick-help--szybka-pomoc)
12. [Grywalizacja — XP, odznaki, Żabek](#12-grywalizacja--xp-odznaki-żabek)
13. [Gdzie wstawiać nowe pliki graficzne/wideo](#13-gdzie-wstawiać-nowe-pliki-graficznewideo)
14. [Weryfikacja buildu](#14-weryfikacja-buildu)
15. [FAQ / Najczęstsze pytania](#15-faq--najczęstsze-pytania)

---

## 1. Jak to działa — przegląd

System onboardingu prezentuje użytkownikowi (pracownikowi) **rozmowę czatową** z maskotką **Żabkiem**. Żabek krok po kroku oprowadza nowego pracownika po aplikacji AutoŻaba.

```
Użytkownik otwiera stronę → wybiera rolę „Pracownik"
  → ChatFlow renderuje rozmowę
    → Żabek wysyła wiadomości (tekst, media, tipy)
    → Użytkownik klika przyciski (odpowiedzi)
    → Po ukończeniu kroku → XP + ewolucja Żabka
    → Po ukończeniu rozdziału → odznaka + bonus XP
```

**Przepływ danych:**

```
chat-types.ts          ← Typy i stałe
chat-animations.ts     ← Predefiniowane animacje wskaźnika
chat-employee-content.ts ← Treść rozdziałów i kroków
        ↓
use-chat-progress.ts   ← Hook zarządzający stanem (localStorage)
        ↓
chat-flow.tsx          ← Główny kontener UI
  ├── chat-bubble.tsx          ← Pojedyncza "bańka" wiadomości
  ├── chat-buttons.tsx         ← Przyciski odpowiedzi
  ├── animated-screenshot.tsx  ← Screenshoty/wideo z animacją
  ├── zabek-evolution.tsx      ← 5 poziomów SVG Żabka
  └── chat-badge-collection.tsx ← Kolekcja odznak
```

---

## 2. Mapa plików

### Warstwa danych (`src/lib/onboarding/`)

| Plik | Rozmiar | Co zawiera |
|------|---------|------------|
| `chat-types.ts` | ~290 linii | Wszystkie typy TypeScript, stałe (XP, progi), `createInitialProgress()` |
| `chat-animations.ts` | ~90 linii | Typy animacji wskaźnika + 4 gotowe presety |
| `chat-employee-content.ts` | ~663 linii | 4 rozdziały, 14 kroków, 3 skróty Quick Help, funkcje wyszukiwania |
| `use-chat-progress.ts` | ~516 linii | Hook `useChatProgress` — stan, localStorage, historia, powitania |

### Warstwa komponentów (`src/components/features/onboarding/`)

| Plik | Co robi |
|------|---------|
| `chat-flow.tsx` | Główny kontener — drawer (Sheet), mapa rozdziałów, Quick Help, resetowanie |
| `chat-bubble.tsx` | Renderuje pojedynczą wiadomość (tekst, media, tipy) |
| `chat-buttons.tsx` | Przyciski odpowiedzi (pill buttons) |
| `animated-screenshot.tsx` | Renderuje `<Image>` lub `<video>` z opcjonalną animacją wskaźnika |
| `zabek-evolution.tsx` | 5 wariantów SVG Żabka: basic → crown → cape → flag → golden |
| `chat-badge-collection.tsx` | „Twoja karta" — kolekcja zdobytych odznak |

### Zasoby (`public/images/onboarding/`)

| Plik | Używany w kroku |
|------|-----------------|
| `a2_pwa.mp4` | A1 — Instalacja aplikacji (Android + iOS) |
| `a1_logowanie2.mp4` | A2 — Logowanie do systemu |
| `a2_zmianajezyka.mp4` | A3 — Zmiana języka |
| `a5_ustawieniakonta.mp4` | A4 — Ustawienia konta |
| `a6_powiadomienia.mp4` | A5 — Powiadomienia |
| `onb-emp-b1-dostepnosc.png` | B1 — Ustawianie dostępności *(do stworzenia)* |
| `onb-emp-c1-rozlicz.png` | C1 — Rozlicz zmianę *(do stworzenia)* |
| `onb-emp-d1-grafik.png` | D1 — Sprawdź swój grafik *(do stworzenia)* |

---

## 3. Architektura danych

### Hierarchia

```
ChatChapter (rozdział)
  └── ChatStep (krok)
        └── ChatMessage[] (wiadomości)
              ├── tekst Żabka
              ├── tip 💡
              ├── media (screenshot / wideo)
              ├── przyciski
              └── reward (XP)
```

### Kluczowe typy

```typescript
// ── Wiadomość ──
interface ChatMessage {
  id: string;               // Unikalny identyfikator
  sender: 'zabek' | 'user' | 'system';
  type: 'text' | 'media' | 'tip' | 'buttons' | 'reward';
  content: string;           // Treść (markdown-lite: **bold**, *italic*)
  media?: ChatMedia;         // Opcjonalnie: obraz / wideo
  buttons?: ChatButton[];    // Opcjonalnie: przyciski odpowiedzi
  reward?: { xp: number; message: string };
  delay?: number;            // Opóźnienie wyświetlenia (ms)
  branchId?: string;         // Do rozgałęzień (patrz sekcja 10)
}

// ── Media ──
interface ChatMedia {
  type: 'image' | 'gif' | 'animated-screenshot' | 'video';
  src: string;               // Ścieżka np. '/images/onboarding/plik.mp4'
  alt: string;               // Tekst alternatywny (a11y)
  caption?: string;          // Podpis pod mediami
  width?: number;
  height?: number;
  poster?: string;           // Miniatura (tylko video)
  pointerAnimation?: PointerAnimation;  // Animacja wskaźnika
}

// ── Przycisk ──
interface ChatButton {
  label: string;             // Tekst na przycisku
  icon?: string;             // Emoji ikona
  action: 'next' | 'complete' | 'skip' | 'branch';
  branchId?: string;         // Wymagane gdy action='branch'
}

// ── Krok ──
interface ChatStep {
  id: string;                // np. 'emp-a1-instalacja'
  chapterId: string;         // ID rozdziału nadrzędnego
  title: string;             // Nazwa kroku
  quickAnswer: string;       // Krótka odpowiedź (Quick Help)
  keywords: string[];        // Słowa kluczowe do wyszukiwania
  difficulty: 'easy' | 'normal' | 'hard';
  xpReward: number;          // XP za ukończenie
  messages: ChatMessage[];   // Tablica wiadomości
  isOptional?: boolean;      // Krok opcjonalny?
  conditionalNote?: string;  // Informacja kiedy krok ma sens
  rewardVariants?: string[]; // Losowe warianty gratulacji
}

// ── Rozdział ──
interface ChatChapter {
  id: string;                // np. 'emp-ch-pierwsze-kroki'
  number: number;            // 1, 2, 3, 4...
  title: string;             // Nazwa rozdziału
  icon: string;              // Emoji ikona
  badge: { id: string; name: string; icon: string };
  steps: ChatStep[];         // Lista kroków
  celebrationMessage: string;
  zabekEvolution: 'basic' | 'crown' | 'cape' | 'flag' | 'golden';
  completionBonusXP: number; // Bonus XP za cały rozdział (150)
}
```

### Stałe

| Stała | Wartość | Opis |
|-------|---------|------|
| `XP_BY_DIFFICULTY` | easy: 25, normal: 50, hard: 100 | XP za krok wg trudności |
| `CHAPTER_BONUS_XP` | 150 | Bonus XP za ukończenie rozdziału |
| `MAX_CHAT_HISTORY` | 50 | Maks. wiadomości w historii |
| `STATUS_THRESHOLDS` | beginner: 0%, competent: 34%, master: 67% | Progi statusów |
| `ZABEK_EVOLUTION_ORDER` | basic → crown → cape → flag → golden | Kolejność ewolucji |
| `STREAK_MILESTONES` | 3, 5, 10 | Progi serii (streak) |

---

## 4. Funkcje pomocnicze (helpery)

**Plik:** `chat-employee-content.ts`

Helpery służą do wygodnego tworzenia wiadomości. Zamiast ręcznie konstruować obiekty `ChatMessage`, używasz krótkich funkcji:

### `zabek(content, extra?)`
Tworzy wiadomość od Żabka.
```typescript
zabek('Cześć! Witaj w AutoŻabie! 🐸')
// → { sender: 'zabek', type: 'text', content: 'Cześć!...' }

// Z opcjami (np. branchId):
zabek('Na Androidzie to proste:', { branchId: 'android' })
```

### `screenshot(src, alt, caption?, opts?)`
Tworzy wiadomość z obrazem lub filmem. **Automatycznie wykrywa wideo** po rozszerzeniu (`.mp4`, `.webm`, `.mov`).
```typescript
// Obraz (PNG):
screenshot(
  '/images/onboarding/onb-emp-c1-rozlicz.png',
  'Opis alternatywny',
  'Podpis pod obrazkiem',
  { pointerAnimation: POINTER_ROZLICZ }
)

// Wideo (MP4) — rozpoznaje automatycznie:
screenshot(
  '/images/onboarding/a2_pwa.mp4',
  'Opis alternatywny',
  'Podpis pod filmem'
)
```

### `tip(content)`
Tworzy wiadomość systemową z tipem.
```typescript
tip('💡 Im wcześniej ustawisz dostępność, tym lepszy grafik!')
```

### `buttons(content, btns)`
Tworzy wiadomość z przyciskami.
```typescript
buttons('Zainstalowałeś?', [
  { label: 'Tak ✅', action: 'complete' },
  { label: 'Zrobię później ⏭️', action: 'skip' },
])
```

### `reward(xp, message)`
Tworzy wiadomość z nagrodą XP.
```typescript
reward(50, 'Świetna robota!')
```

### `withStepIds(stepId, messages)`
Opakowuje tablicę wiadomości — dodaje każdej unikalny `id` na bazie `stepId`.
```typescript
messages: withStepIds('emp-a1-instalacja', [
  zabek('...'),
  screenshot('...', '...'),
  buttons('...', [...]),
])
```

---

## 5. Edytowanie istniejącej treści

### Zmiana tekstu wiadomości Żabka

1. Otwórz `src/lib/onboarding/chat-employee-content.ts`
2. Znajdź odpowiedni krok (np. `stepA2_logowanie`)
3. Zmień tekst w `zabek('...')` lub `tip('...')`

```typescript
// Przed:
zabek('Teraz zalogujmy się do systemu.')

// Po:
zabek('Super! Czas się zalogować do systemu AutoŻaba. 🔑')
```

### Zmiana tekstu przycisku

```typescript
// Przed:
{ label: 'Tak ✅', action: 'complete' }

// Po:
{ label: 'Gotowe, zalogowałem się! ✅', action: 'complete' }
```

### Zmiana podpisu pod mediami

```typescript
screenshot(
  '/images/onboarding/a1_logowanie2.mp4',
  'Film pokazujący logowanie',
  'Nowy podpis tutaj',   // ← zmień ten tekst
)
```

### Zmiana gratulacji po ukończeniu kroku

```typescript
rewardVariants: [
  'Zmień ten tekst!',      // losowo wyświetlany
  'Lub ten!',
  'Albo ten! 🎉',
],
```

### Zmiana tekstu szybkiej odpowiedzi (quickAnswer)

Wyświetlany w Quick Help w drawer menu:
```typescript
quickAnswer: 'Otwórz app.autozaba.pl → przepisz dane z karty startowej.',
```

---

## 6. Dodawanie nowego kroku

### Krok po kroku:

**1.** W `chat-employee-content.ts` stwórz nowy obiekt `ChatStep`:

```typescript
const stepB5_nowaFunkcja: ChatStep = {
    id: 'emp-b5-nowa-funkcja',          // unikalne ID: emp-{rozdział}{nr}-{nazwa}
    chapterId: 'emp-ch-dostepnosc',      // ID rozdziału, do którego należy
    title: 'Nazwa Nowej Funkcji',
    quickAnswer: 'Krótka instrukcja — 1 zdanie.',
    keywords: ['słowo1', 'słowo2'],      // do wyszukiwania
    difficulty: 'easy',                  // easy=25xp, normal=50xp, hard=100xp
    xpReward: 25,
    messages: withStepIds('emp-b5-nowa-funkcja', [
        zabek('Tekst od Żabka.'),
        tip('💡 Podpowiedź.'),
        buttons('Zrozumiałeś?', [
            { label: 'Tak ✅', action: 'complete' },
            { label: 'Pominę ⏭️', action: 'skip' },
        ]),
    ]),
    rewardVariants: [
        'Gratulacja 1!',
        'Gratulacja 2! 🎉',
    ],
};
```

**2.** Dodaj krok do odpowiedniego rozdziału w tablicy `EMPLOYEE_CHAT_CHAPTERS`:

```typescript
{
    id: 'emp-ch-dostepnosc',
    // ...
    steps: [stepB1_dostepnosc, stepB2_pedzel, stepB3_notatka, stepB4_zakres, stepB5_nowaFunkcja],
    //                                                                        ↑ dodaj tutaj
},
```

**3.** Zbuduj i zweryfikuj (patrz [sekcja 14](#14-weryfikacja-buildu)).

### Pola opcjonalne kroku

```typescript
isOptional: true,                       // Krok opcjonalny (można pominąć)
conditionalNote: 'Tylko dla wielu sklepów.'  // Info kiedy krok ma sens
```

---

## 7. Dodawanie nowego rozdziału

**1.** Stwórz kroki (patrz sekcja 6).

**2.** Dodaj nowy rozdział na koniec tablicy `EMPLOYEE_CHAT_CHAPTERS`:

```typescript
{
    id: 'emp-ch-nowy-rozdzial',           // unikalne ID
    number: 5,                            // kolejny numer
    title: 'Nazwa Rozdziału',
    icon: '🆕',                           // emoji ikona
    badge: {
        id: 'emp-badge-nowy',
        name: 'Nazwa Odznaki',
        icon: '🆕',
    },
    steps: [stepE1_cos, stepE2_cosinnego],
    celebrationMessage: 'Gratulacje! Nowy rozdział ukończony! 🎉',
    zabekEvolution: 'golden',             // patrz tabela poniżej
    completionBonusXP: 150,
},
```

**3.** Ewolucja Żabka — dostępne warianty:

| Wartość | Opis |
|---------|------|
| `'basic'` | Domyślny Żabek |
| `'crown'` | Żabek z koroną |
| `'cape'` | Żabek z peleryną |
| `'flag'` | Żabek z flagą |
| `'golden'` | Złoty Żabek |

> **Uwaga:** Kolejność ewolucji wynika z `ZABEK_EVOLUTION_ORDER` w `chat-types.ts`.
> Jeśli chcesz dodać nowy poziom ewolucji, musisz też stworzyć nowy komponent SVG w `zabek-evolution.tsx`.

---

## 8. Dodawanie mediów (wideo / screenshot)

### Screenshoty (PNG)

```typescript
screenshot(
  '/images/onboarding/moj-nowy-screenshot.png',  // ścieżka
  'Opis dla czytników ekranu',                    // alt (a11y!)
  'Podpis widoczny pod obrazkiem',                // caption
)
```

### Filmy (MP4)

```typescript
screenshot(
  '/images/onboarding/moj-film.mp4',              // auto-detekcja video
  'Opis dla czytników ekranu',
  'Podpis pod filmem',
)
```

Helper `screenshot()` automatycznie rozpoznaje wideo po rozszerzeniu (`.mp4`, `.webm`, `.mov`) i ustawia:
- `autoPlay`, `loop`, `muted`, `playsInline`
- `disablePictureInPicture`, `disableRemotePlayback`

### Screenshot z animacją wskaźnika

```typescript
screenshot(
  '/images/onboarding/moj-screenshot.png',
  'Opis',
  'Podpis',
  { pointerAnimation: POINTER_ROZLICZ }           // preset z chat-animations.ts
)
```

> **⚠️ Ważne:** Nie dodawaj animacji wskaźnika do filmów! Na filmach animacja koliduje z ruchomym obrazem i jest chaotyczna. Animacje wskaźnika mają sens tylko na **statycznych screenshotach** (PNG).

### Wymiary

Domyślne wymiary to 390×844 (iPhone). Możesz nadpisać:
```typescript
screenshot('/images/...png', 'Alt', 'Caption', {
  width: 800,
  height: 600,
})
```

---

## 9. Animacje wskaźnika (pointer)

Animacje wskaźnika to CSS-only animowany kursor, który „klikuje" we wskazane punkty na screenshocie. Służą do pokazania użytkownikowi, gdzie powinien kliknąć.

### Gotowe presety

Zdefiniowane w `src/lib/onboarding/chat-animations.ts`:

| Preset | Punkty tapnięcia | Użyty w kroku |
|--------|-------------------|--------|
| `POINTER_ROZLICZ` | ① Rozliczenie (50%, 85%) → ② Pracownik (50%, 45%) → ③ Zatwierdź (50%, 75%) | C1 |
| `POINTER_DOSTEPNOSC` | ① Kalendarz (50%, 30%) → ② Dzień (35%, 55%) → ③ Status (35%, 70%) | B1 |
| `POINTER_PWA_ANDROID` | ① ⋮Menu (92%, 8%) → ② Dodaj do ekranu (50%, 55%) → ③ Dodaj (65%, 62%) | *(nieużywany)* |
| `POINTER_PWA_IOS` | ① Udostępnij ↑ (50%, 95%) → ② Do ekranu (50%, 60%) → ③ Dodaj (80%, 8%) | *(nieużywany)* |

### Tworzenie własnej animacji

```typescript
// W chat-animations.ts dodaj:
export const POINTER_MOJA_NOWA: PointerAnimation = {
    taps: [
        { x: 30, y: 20, label: 'Kliknij tutaj' },     // ① 30% od lewej, 20% od góry
        { x: 70, y: 50, label: 'Potem tutaj' },        // ② 70% od lewej, 50% od góry
        { x: 50, y: 80, label: 'Na koniec tutaj' },    // ③ 50% od lewej, 80% od góry
    ],
    durationSec: 4,    // czas pełnego cyklu (domyślnie 4s)
    pauseSec: 1,       // pauza na końcu (domyślnie 1s)
};
```

**Jak działają koordynaty:**
- `x` i `y` to procenty od lewego-górnego rogu obrazka
- `x: 50, y: 50` = środek
- `x: 0, y: 0` = lewy-górny róg
- `x: 100, y: 100` = prawy-dolny róg

**Jak to wygląda:**
- Statyczne kółka z numerami (①②③) są **zawsze widoczne** na obrazku
- Animowany kursor (zielone kółko) przeskakuje między punktami
- Animacja **zatrzymuje się** gdy użytkownik ma włączone `prefers-reduced-motion`

### Użycie presetu

```typescript
import { POINTER_MOJA_NOWA } from '@/lib/onboarding/chat-animations';

screenshot('/images/...png', 'Alt', 'Caption', {
  pointerAnimation: POINTER_MOJA_NOWA,
})
```

---

## 10. Rozgałęzienia (branching)

Branching pozwala na różne ścieżki w zależności od odpowiedzi użytkownika. Przykład: Android vs. iPhone.

### Jak to działa

**1.** Przycisk z `action: 'branch'` i `branchId`:

```typescript
buttons('Jaki masz telefon?', [
    { label: 'Android', icon: '🤖', action: 'branch', branchId: 'android' },
    { label: 'iPhone', icon: '🍎', action: 'branch', branchId: 'ios' },
])
```

**2.** Wiadomości przypisane do gałęzi za pomocą `branchId`:

```typescript
// Tylko dla Androida:
zabek('Na Androidzie to proste:', { branchId: 'android' })
screenshot('/images/...mp4', 'Alt', 'Caption', { branchId: 'android' })

// Tylko dla iPhone:
zabek('Na iPhonie robimy to przez Safari:', { branchId: 'ios' })
screenshot('/images/...mp4', 'Alt', 'Caption', { branchId: 'ios' })
```

**3.** Wiadomości **bez** `branchId` to wspólna kontynuacja — wyświetlane po obu gałęziach:

```typescript
// Po wyborze gałęzi, te wiadomości widzi każdy:
tip('💡 Aplikacja na pulpicie otwiera się szybciej!'),
buttons('Zainstalowałeś?', [
    { label: 'Tak ✅', action: 'complete' },
])
```

### Kolejność w tablicy `messages`

```
[przycisk branchujący] → [wiadomości android] → [wiadomości ios] → [wspólne]
```

System wyświetla tylko wiadomości z wybranej gałęzi + wspólne.

---

## 11. Quick Help — szybka pomoc

Quick Help to 3 skróty dostępne w bocznym menu (drawer). Każdy skrót zawiera `miniAnswer` — krótkie instrukcje wyświetlane jako accordion.

### Edytowanie istniejącego skrótu

W `chat-employee-content.ts` znajdź `QUICK_HELP_SHORTCUTS`:

```typescript
{
    id: 'qh-rozlicz',
    label: 'Rozlicz zmianę',           // tekst na przycisku
    icon: '⏱️',                         // emoji ikona
    targetStepId: 'emp-c1-rozlicz',     // link do pełnego kroku
    miniAnswer: [
        '🐸 Wejdź w zakładkę **Rozliczenie** w menu głównym.',
        'Kliknij nazwisko pracownika → wprowadź godziny → **Zatwierdź**.',
        '💡 Pamiętaj: rozliczenie musisz zatwierdzić przed końcem dnia!',
    ],
},
```

### Dodanie nowego skrótu

Dodaj nowy obiekt do tablicy `QUICK_HELP_SHORTCUTS`:

```typescript
{
    id: 'qh-nazwa',                      // unikalne ID
    label: 'Tekst przycisku',
    icon: '🔧',
    targetStepId: 'emp-xx-krok',         // ID istniejącego kroku
    miniAnswer: [
        '🐸 Pierwsza linia instrukcji.',
        'Druga linia.',
        '💡 Tip na koniec!',
    ],
},
```

---

## 12. Grywalizacja — XP, odznaki, Żabek

### XP (Experience Points)

- Każdy krok daje XP wg poziomu trudności:
  - `easy` → 25 XP
  - `normal` → 50 XP
  - `hard` → 100 XP
- Ukończenie całego rozdziału daje bonus **150 XP**
- Łączne możliwe XP: obliczane przez `getTotalPossibleXP()`

### Odznaki (badges)

Każdy rozdział ma przypisaną odznakę:

| Rozdział | Odznaka |
|----------|---------|
| 1. Pierwsze Kroki | 🐣 Pierwszy Skok |
| 2. Twoja Dostępność | 📅 Mistrz Kalendarza |
| 3. Rozliczanie Godzin | ⏱️ Punktualny Żabian |
| 4. Twój Harmonogram | 🗓️ Zawsze Na Czas |

Odznaki wyświetlane są w sekcji „Twoja karta" w bocznym menu.

### Ewolucja Żabka

Po ukończeniu każdego rozdziału Żabek ewoluuje:

```
basic (start) → crown (rozdz. 1) → cape (rozdz. 2) → flag (rozdz. 3) → golden (rozdz. 4)
```

Każdy wariant to osobny inline SVG w `zabek-evolution.tsx`.

### Streak (seria)

System liczy ile kroków użytkownik ukończył pod rząd. Milestone'y na 3, 5 i 10 kroków.

### Status użytkownika

Trzy statusy wg % ukończenia:

| Status | Próg |
|--------|------|
| Początkujący | 0% |
| Kompetentny | 34% |
| Mistrz | 67% |

---

## 13. Gdzie wstawiać nowe pliki graficzne/wideo

### Lokalizacja

```
public/images/onboarding/
```

### Konwencja nazewnictwa

```
{litera_rozdziału}{nr_kroku}_{nazwa}.{rozszerzenie}
```

Przykłady:
- `a2_pwa.mp4` — rozdział A, krok 2, temat: PWA
- `onb-emp-b1-dostepnosc.png` — alternatywna konwencja z pełnym prefixem

### Formaty

| Typ | Rozszerzenie | Uwagi |
|-----|------|-------|
| Screenshot | `.png` | Preferowany dla statycznych zrzutów |
| Film | `.mp4` | Auto-detected, autoplay+loop+muted |
| Film | `.webm` | Również auto-detected |

### Wymiary zalecane

- **Mobilne screenshoty:** 390 × 844 px (iPhone viewport)
- **Filmy:** dowolne, ale zachowaj proporcje telefonu

### Konfiguracja Next.js

Pliki w `public/` są automatycznie serwowane. Nie trzeba nic konfigurować.

---

## 14. Weryfikacja buildu

Po każdej zmianie uruchom:

```bash
npx tsc --noEmit
```

To sprawdzi wszystkie błędy TypeScript bez generowania plików JS.

**Oczekiwany wynik:** `0 errors`

Jeśli widzisz błędy — najczęstsze przyczyny:
- Literówka w `chapterId` — musi dokładnie odpowiadać ID rozdziału
- Brakujące pole w `ChatStep` — sprawdź wymagane pola w sekcji 3
- Nieistniejący import — np. nieimportowany preset animacji

---

## 15. FAQ / Najczęstsze pytania

### Jak zmienić kolejność kroków?
Zmień kolejność w tablicy `steps` w definicji rozdziału (`EMPLOYEE_CHAT_CHAPTERS`).

### Jak usunąć krok?
Usuń obiekt kroku i wyjmij go z tablicy `steps` w rozdziale.

### Jak przetestować?
Uruchom `npm run dev` i przejdź na stronę onboardingu. Wybierz rolę „Pracownik". W drawer menu jest przycisk „Resetuj postęp" do testowania od nowa.

### Jak wyczyścić dane testowe?
W przeglądarce: DevTools → Application → Local Storage → usuń klucz `autozaba-chat-employee`.

### Gdzie jest localStorage?
Klucz: `autozaba-chat-employee`. Przechowuje obiekt `ChatProgress` zakodowany w JSON.

### Jak działa return flow (powrót)?
Kiedy użytkownik wraca po przerwie, `buildReturnGreeting()` w `use-chat-progress.ts` generuje powitanie na bazie upływu czasu:
- **< 24h:** „Hej, wracasz! Byliśmy na..."
- **1-7 dni:** „O, dawno Cię nie było! Pamiętasz gdzie skończyliśmy?"
- **> 7 dni:** „Cześć! Trochę czasu minęło..."

### Co to jest `isOptional`?
Krok z `isOptional: true` można pominąć bez wpływu na progres. Używane np. dla zmiany języka (A3) i wyboru sklepu (C3).

### Czym się różni `action: 'next'` od `action: 'complete'`?
- `'next'` — pokaż kolejne wiadomości z tego samego kroku (kontynuuj rozmowę)
- `'complete'` — zamknij krok, przyznaj XP, przejdź do następnego
- `'skip'` — zamknij krok bez XP
- `'branch'` — przejdź do gałęzi o danym `branchId`

### Jak dodać **bold** lub *italic* w tekście?
Tekst w wiadomościach wspiera markdown-lite:
- `**pogrubiony**` → **pogrubiony**
- `*kursywa*` → *kursywa*

---

## Podsumowanie: Co zmienić, żeby…

| Chcesz… | Edytuj plik |
|---------|-------------|
| Zmienić tekst wiadomości | `chat-employee-content.ts` → odpowiedni krok |
| Dodać nowy krok | `chat-employee-content.ts` → nowy obiekt + tablica `steps` |
| Dodać nowy rozdział | `chat-employee-content.ts` → nowy rozdział w `EMPLOYEE_CHAT_CHAPTERS` |
| Dodać screenshot/wideo | Plik do `public/images/onboarding/` + `screenshot()` w kroku |
| Stworzyć animację wskaźnika | `chat-animations.ts` → nowy preset |
| Zmienić Quick Help | `chat-employee-content.ts` → `QUICK_HELP_SHORTCUTS` |
| Zmienić XP/trudność | `chat-employee-content.ts` → pole `difficulty` lub `xpReward` w kroku |
| Zmienić stałe systemu | `chat-types.ts` → stałe (XP_BY_DIFFICULTY, CHAPTER_BONUS_XP, itp.) |
| Dodać nowego Żabka SVG | `zabek-evolution.tsx` + `chat-types.ts` (ZABEK_EVOLUTION_ORDER) |
| Zmienić wygląd bąbelka | `chat-bubble.tsx` |
| Zmienić layout drawer / mapy | `chat-flow.tsx` |
