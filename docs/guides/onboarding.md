# Onboarding - Dokumentacja Techniczna

> **"Przygoda Żabiana"** - Gamifikowany system onboardingu dla użytkowników AutoŻaba

---

## Przegląd

System onboardingu prowadzi nowych użytkowników przez funkcje aplikacji w formie interaktywnych "przygód" i "questów". Wykorzystuje gamifikację (odznaki, serie, ukryte osiągnięcia) do zwiększenia zaangażowania.

### Kluczowe cechy
- 🎮 5 Przygód, 25 Questów
- 🏆 System odznak per przygoda
- 🔥 Śledzenie serii (streak)
- 🦉 Ukryte osiągnięcia (Easter Eggs)
- 📱 Mobile-first UX (48px touch targets)
- 💾 Persystencja w localStorage

---

## Architektura

```
src/
├── app/onboarding/
│   ├── page.tsx          # Strona (metadata + suspense)
│   └── content.tsx       # Główna logika i UI
├── components/features/onboarding/
│   ├── index.ts          # Barrel export
│   ├── adventure-card.tsx
│   ├── quest-item.tsx
│   ├── progress-ring.tsx
│   ├── badge-display.tsx
│   ├── zabek-guide.tsx
│   └── cheat-sheet-panel.tsx
└── lib/onboarding/
    ├── onboarding-content.ts  # Dane curriculum
    └── use-progress.ts        # Hook stanu
```

---

## Komponenty

### `OnboardingPageContent`
**Plik:** `src/app/onboarding/content.tsx`

Główny komponent strony. Zarządza:
- Wyświetlaniem przygód
- Komunikatami Żabka
- Confetti przy 100%
- Responsywnym rozmiarem pierścienia

```tsx
import { OnboardingPageContent } from '@/app/onboarding/content';
```

### `AdventureCard`
**Plik:** `src/components/features/onboarding/adventure-card.tsx`

Rozwijana karta przygody z:
- Paskiem postępu
- Listą questów
- Odznaką po ukończeniu

```tsx
<AdventureCard
  adventure={adventure}
  completedQuests={['a1-logowanie']}
  onToggleQuest={(id) => toggleQuest(id)}
  onBadgeEarned={(id) => earnBadge(id)}
  defaultExpanded={true}
/>
```

### `QuestItem`
**Plik:** `src/components/features/onboarding/quest-item.tsx`

Pojedynczy quest z:
- Gwiazdkami trudności (⭐⭐⭐)
- Krokami instrukcji
- Przyciskiem "Pomiń"
- Deep linkiem do aplikacji
- Placeholderem na media

```tsx
<QuestItem
  id="a1-logowanie"
  title="Logowanie do systemu"
  description="..."
  timeEstimate={2}
  isCompleted={false}
  onToggle={(id) => toggleQuest(id)}
  difficulty={1}
  deepLink="https://panel.autozaba.pl"
  canSkip={true}
/>
```

### `CheatSheetPanel`
**Plik:** `src/components/features/onboarding/cheat-sheet-panel.tsx`

Boczny panel "Ściąga" z:
- Wyszukiwaniem (debounced 200ms)
- Kategoriami
- Szybkimi odpowiedziami

---

## Hook: `useOnboardingProgress`

**Plik:** `src/lib/onboarding/use-progress.ts`

```tsx
const {
  progress,           // OnboardingProgress
  isLoaded,           // boolean
  isFirstVisit,       // boolean
  showStreakCelebration, // boolean
  newAchievement,     // AchievementId | null
  
  completeQuest,      // (questId: string) => void
  uncompleteQuest,    // (questId: string) => void
  toggleQuest,        // (questId: string) => void
  earnBadge,          // (badgeId: string) => void
  earnAchievement,    // (achievementId: AchievementId) => void
  isQuestCompleted,   // (questId: string) => boolean
  isBadgeEarned,      // (badgeId: string) => boolean
  isAchievementEarned,// (achievementId: AchievementId) => boolean
  getCompletionPercentage, // (total: number) => number
  resetProgress,      // () => void
  clearNewAchievement // () => void
} = useOnboardingProgress();
```

### Interface `OnboardingProgress`

```typescript
interface OnboardingProgress {
  completedQuests: string[];
  earnedBadges: string[];
  earnedAchievements: AchievementId[];
  lastVisit: string;
  isFirstVisit: boolean;
  currentStreak: number;
  lastQuestCompletedAt: string | null;
}
```

---

## Dane: Struktura Curriculum

**Plik:** `src/lib/onboarding/onboarding-content.ts`

### Interface `Quest`

```typescript
interface Quest {
  id: string;
  title: string;
  description: string;
  timeEstimate: number;      // minuty
  keywords: string[];        // do wyszukiwania
  quickAnswer: string;       // odpowiedź w ściądze
  steps?: QuestStep[];       // kroki instrukcji
  media?: QuestMedia;        // screenshot/gif/video
  difficulty?: 1 | 2 | 3;    // gwiazdki
  deepLink?: string;         // link do panelu
  canSkip?: boolean;         // default: true
  autoComplete?: boolean;    // dla welcome questa
}
```

### Interface `Adventure`

```typescript
interface Adventure {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  icon: string;              // emoji
  badge: {
    id: string;
    name: string;
    icon: string;
  };
  quests: Quest[];
}
```

### Eksporty

```typescript
import { 
  ADVENTURES,           // Adventure[]
  CHEAT_SHEET_CATEGORIES,
  getAllQuests,         // () => Quest[]
  searchQuests          // (query: string) => Quest[]
} from '@/lib/onboarding/onboarding-content';
```

---

## Ukryte Osiągnięcia

| ID | Nazwa | Trigger |
|----|-------|---------|
| `night-owl` | Nocny Maratończyk 🦉 | Quest po 22:00 |
| `early-bird` | Ranny Ptaszek 🐦 | Quest przed 8:00 |
| `weekend-warrior` | Wojownik Weekendu ⚔️ | Quest w weekend |
| `streak-3` | Seria Mistrza 🔥 | 3 questy pod rząd |
| `speedrunner` | Speedrunner ⚡ | 5 questów w 5 min |

---

## Rozszerzanie

### Dodawanie nowego questa

```typescript
// W onboarding-content.ts, w odpowiedniej przygodzie:
{
  id: 'x1-nowy-quest',  // unikalny id
  title: 'Nazwa questa',
  description: 'Opis co użytkownik nauczy się',
  timeEstimate: 3,
  keywords: ['słowo1', 'słowo2'],
  quickAnswer: 'Krótka odpowiedź do ściągi',
  difficulty: 2,
  deepLink: 'https://panel.autozaba.pl/funkcja',
  steps: [
    { step: 1, instruction: 'Krok 1', tip: 'Opcjonalna wskazówka' },
    { step: 2, instruction: 'Krok 2' },
  ],
}
```

### Dodawanie nowej przygody

```typescript
// Dodaj do ADVENTURES:
{
  id: 'nowa-przygoda',
  number: 6,
  title: 'Nowa Przygoda',
  subtitle: 'Opis przygody',
  icon: '🎯',
  badge: {
    id: 'badge-nowy',
    name: 'Nowa Odznaka',
    icon: '🎯',
  },
  quests: [
    // ... questy
  ],
}
```

### Dodawanie nowego osiągnięcia

1. Dodaj do `HIDDEN_ACHIEVEMENTS` w `use-progress.ts`:
```typescript
'new-achievement': { 
  id: 'new-achievement', 
  name: 'Nazwa', 
  icon: '🏅', 
  description: 'Opis' 
},
```

2. Dodaj typ do `AchievementId`
3. Dodaj logikę wykrywania w `checkTimeAchievements` lub `processQuestCompletion`

---

## Stylowanie

Komponenty używają:
- **Tailwind CSS** - utility classes
- **Framer Motion** - animacje
- **CSS Variables** - `--brand-green`, `--brand-green-secondary`

### Touch targets
- Mobile: min 48×48px
- Desktop: min 44×44px

### Responsywność
- `sm:` breakpoint (640px) dla desktop
- iOS safe areas: `env(safe-area-inset-*)`

---

## localStorage

**Klucz:** `autozaba-onboarding-progress`

```json
{
  "completedQuests": ["a0-witaj", "a1-logowanie"],
  "earnedBadges": ["badge-nowy"],
  "earnedAchievements": ["night-owl"],
  "lastVisit": "2025-12-16T10:00:00.000Z",
  "isFirstVisit": false,
  "currentStreak": 2,
  "lastQuestCompletedAt": "2025-12-16T09:55:00.000Z"
}
```

### Obsługa błędów
- Walidacja struktury przy ładowaniu
- Automatyczny reset przy corrupted data
- Console warning przy błędach

---

## Wytyczne Multimedialne

### 📸 Screenshoty

| Parametr | Wartość | Uzasadnienie |
|----------|---------|--------------|
| **Rozdzielczość** | 1280×720px (16:9) | Optymalne dla mobile + desktop |
| **Format** | WebP (preferowany) lub PNG | WebP: 30% mniejszy rozmiar |
| **Jakość WebP** | 85% | Balans jakość/rozmiar |
| **Retina** | 2560×1440px @2x | Dla ekranów HiDPI |

**Jak robić:**
1. Ustaw okno przeglądarki na 1280×720px
2. Użyj DevTools → Device toolbar → Responsive 1280×720
3. Zrób screenshot całego widoku (nie tylko viewport)
4. Zapisz jako WebP lub PNG

**Narzędzia:**
- Chrome DevTools (F12 → Capture screenshot)
- [CleanShot X](https://cleanshot.com/) (Mac)
- [ShareX](https://getsharex.com/) (Windows)

**Lokalizacja plików:**
```
public/
└── images/
    └── onboarding/
        ├── a1-logowanie.webp
        ├── a1-logowanie@2x.webp  # opcjonalnie retina
        └── b1-dodawanie.webp
```

---

### 🎬 GIFy (animacje)

| Parametr | Wartość |
|----------|---------|
| **Rozdzielczość** | 800×450px (16:9) |
| **Długość** | 3-8 sekund |
| **FPS** | 15 fps |
| **Max rozmiar** | 500KB |
| **Kolory** | 128 (dithering) |

**Kiedy używać GIF:**
- Krótkie akcje (klik → efekt)
- Hover effects
- Drag & drop
- Animacje UI

**Jak tworzyć:**
1. Nagraj ekran (1280×720)
2. Przytnij do 3-8s
3. Eksportuj jako GIF 800×450 @ 15fps
4. Optymalizuj przez [ezgif.com](https://ezgif.com/optimize)

**Narzędzia:**
- [ScreenToGif](https://www.screentogif.com/) (Windows)
- [Gifski](https://gif.ski/) (Mac)
- [LICEcap](https://www.cockos.com/licecap/) (cross-platform)

---

### 🎥 Wideo

| Parametr | Wartość |
|----------|---------|
| **Rozdzielczość** | 1280×720p (HD) |
| **Format** | MP4 (H.264) |
| **Bitrate** | 2-4 Mbps |
| **Audio** | Opcjonalnie, 128kbps AAC |
| **Długość** | 15-60 sekund |
| **Max rozmiar** | 5MB |

**Kiedy używać wideo:**
- Złożone procesy (>3 kroki)
- Wyjaśnienia z narracją
- Pełne workflow

**Narzędzia:**
- [OBS Studio](https://obsproject.com/) - nagrywanie
- [HandBrake](https://handbrake.fr/) - kompresja
- [DaVinci Resolve](https://www.blackmagicdesign.com/products/davinciresolve) - edycja

---

### ✍️ Pisanie instrukcji (steps)

**Struktura kroku:**

```typescript
{
  step: 1,
  instruction: "Kliknij przycisk 'Dodaj pracownika' w górnym prawym rogu",
  tip: "Możesz też użyć skrótu Ctrl+N"  // opcjonalne
}
```

**Zasady pisania:**

| ✅ Dobrze | ❌ Źle |
|-----------|--------|
| "Kliknij przycisk **Zapisz**" | "Zapisz" |
| "Wybierz **Personel** z menu bocznego" | "Wejdź w personel" |
| "Wypełnij pole **Imię i nazwisko**" | "Wpisz dane" |
| "Poczekaj aż pojawi się komunikat sukcesu" | "Powinno zadziałać" |

**Formatowanie:**
- Używaj **pogrubienia** dla nazw przycisków/pól
- Numeruj kroki (1, 2, 3...)
- Max 1-2 zdania na krok
- Używaj czasowników rozkazujących (Kliknij, Wybierz, Wpisz)

**Wskazówki (tips):**
- Skróty klawiszowe
- Alternatywne metody
- Częste błędy do uniknięcia
- Pro tips

---

### 📝 Przykład kompletnego questa

```typescript
{
  id: 'b1-dodawanie',
  title: 'Dodawanie pracownika',
  description: 'Jak dodać nowego członka zespołu do systemu.',
  timeEstimate: 3,
  keywords: ['pracownik', 'dodaj pracownika', 'nowy pracownik', 'zatrudnienie'],
  quickAnswer: 'Personel → Dodaj pracownika. Wypełnij dane i przypisz do sklepu.',
  difficulty: 2,
  deepLink: 'https://panel.autozaba.pl/personel/dodaj',
  canSkip: true,
  
  media: {
    type: 'gif',
    src: '/images/onboarding/b1-dodawanie.gif',
    alt: 'Animacja pokazująca jak dodać pracownika'
  },
  
  steps: [
    {
      step: 1,
      instruction: 'Kliknij **Personel** w menu bocznym',
      tip: 'Ikona wygląda jak grupa osób 👥'
    },
    {
      step: 2,
      instruction: 'Kliknij przycisk **+ Dodaj pracownika** w górnym prawym rogu'
    },
    {
      step: 3,
      instruction: 'Wypełnij wymagane pola: **Imię**, **Nazwisko**, **Email**',
      tip: 'Email musi być unikalny w systemie'
    },
    {
      step: 4,
      instruction: 'Wybierz **Sklep** do którego przypisujesz pracownika'
    },
    {
      step: 5,
      instruction: 'Kliknij **Zapisz** aby dodać pracownika',
      tip: 'Pracownik otrzyma email z danymi logowania'
    }
  ]
}
```

---

### 🗂️ Struktura plików multimedialnych

```
public/
└── images/
    └── onboarding/
        ├── README.md           # Ten plik z wytycznymi
        │
        ├── adventure-1/        # Pierwsze Skoki
        │   ├── a1-logowanie.webp
        │   ├── a2-jezyk.gif
        │   └── a3-konto.webp
        │
        ├── adventure-2/        # Twoja Twierdza
        │   ├── b1-dodawanie.gif
        │   ├── c1-sklep.webp
        │   └── ...
        │
        └── adventure-5/        # Moc Automatyzacji
            ├── h1-ai-interfejs.mp4
            └── h3-pierwszy.gif
```

---

### ⚡ Checklist przed dodaniem

- [ ] Rozdzielczość zgodna z wytycznymi
- [ ] Rozmiar pliku < limit
- [ ] Alt text opisuje co widać
- [ ] Plik w `/public/images/onboarding/`
- [ ] Ścieżka zaczyna się od `/images/...` (bez `public`)
- [ ] Przetestowane na mobile i desktop

---

## TODO / Placeholder'y

| Element | Lokalizacja | Opis |
|---------|-------------|------|
| Żabek mascot | `zabek-guide.tsx` | Zamień emoji na SVG/Lottie (Opcjonalne) |
| Media questów | `quest-item.tsx` | Dodaj screenshoty/GIFy (Zaimplementowano placeholders+upload) |
| Steps questów | `onboarding-content.ts` | Uzupełnij kroki (Zrobione dla wszystkich questów) |
| Speedrunner | `use-progress.ts` | Zaimplementuj tracking czasu (Zrobione logicznie) |
