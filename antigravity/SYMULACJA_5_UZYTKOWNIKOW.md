# 🧪 Symulacja 5 Użytkowników — Raport dla Zespołu

**Data:** 18 lutego 2026
**Cel:** Walidacja systemu onboardingu przed wdrożeniem na produkcję
**Metoda:** Symulacja 5 różnych profili użytkowników przechodzących pełny flow — analiza ścieżki krok po kroku, znajdowanie edge-case'ów, zbieranie wrażeń

---

## 👤 Użytkownik 1: Ania (22 lata, studentka, Android, pierwszy raz w gastro)

**Profil:** Kompletny nowicjusz, telefon Android, nigdy nie używała żadnego systemu grafiku. Podchodzi ostrożnie, czyta wszystko uważnie. Chce ukończyć wszystko za jednym razem.

### Ścieżka

| Krok | Co widzi | Akcja | Stan |
|------|----------|-------|------|
| A0 Witaj | „Cześć! Jestem Żabek" + hint o ≡ menu | „Zaczynamy! 🚀" | ✅ 25 XP |
| A1 Instalacja | „Jaki masz telefon?" | „Android 🤖" → branch | branch=android |
| A1 (cd.) | Instrukcja Chrome + video 0.5x | „Gotowe ✅" | ✅ 50 XP |
| A2 Logowanie | Karta startowa + video | „Jestem w środku ✅" | ✅ 50 XP |
| A3 Język | Flaga + video | „Nie zmieniam 👍" | ⏭️ skip, 0 XP |
| A4 Konto | Profil + video | „Gotowe ✅" | ✅ 25 XP |
| A5 Powiadomienia | Dzwonek + video | „Gotowe ✅" | ✅ 25 XP |
| **🏁 Rozdział 1** | Toast: 🐣 Pierwszy Skok +150 XP | auto-dismiss 3s | **325 XP** |
| B4 Zakres | Selektor daty + video | „Rozumiem ✅" | ✅ 25 XP |
| B1 Dostępność | Kalendarz + tip + video | „Zapisałem ✅" | ✅ 50 XP |
| B2 Pędzel | Pędzel + video | „Fajne! ✅" | ✅ 25 XP |
| B3 Notatka | Pole tekstowe + video | „Gotowe ✅" | ✅ 25 XP |
| **🏁 Rozdział 2** | Toast: 📅 Mistrz Kalendarza +150 XP | auto-dismiss 3s | **600 XP** |
| C1 Rozlicz | Formularz + tip + video | „Rozumiem ✅" | ✅ 100 XP |
| C2 Edytuj | Edycja + tip + video | „Rozumiem ✅" | ✅ 50 XP |
| C3 Sklep | „Pracujesz w więcej niż jednym?" | „Nie, w jednym" → complete | ✅ 25 XP |
| **🏁 Rozdział 3** | Toast: ⏱️ Punktualny Żabian +150 XP | auto-dismiss 3s | **925 XP** |
| D1 Grafik | Harmonogram + tip + video | „Widzę ✅" | ✅ 50 XP |
| **🏁 Rozdział 4** | Toast: 🗓️ Zawsze Na Czas +150 XP | — | **1125 XP** |
| **Zakończenie** | 🎉 Onboarding ukończony! + Żabek golden + 4 odznaki | — | **100%** |

### Doświadczenie Ani
- ✅ **Pozytywne:** Jasne instrukcje, video w zwolnionym tempie dla PWA bardzo pomogło. Tipy dają poczucie „wiem coś ekstra". Toast po rozdziale — dyskretny, nie blokuje.
- ✅ **Branching działa** — po kliknięciu Android od razu instrukcja + video per platforma.
- ✅ **C3 Sklep** — pytanie „Pracujesz w więcej niż jednym?" → „Nie" → od razu complete. Inteligentne, nie traci czasu.
- ✅ **Zakończenie** — golden Żabek + 4 odznaki + XP = satysfakcja.
- ⚠️ **Drobnostka:** Po A3 (skip „Nie zmieniam") pasek postępu przeskoczył, ale Ania nie dostała XP — to OK, ale brak żadnej informacji „pominięto, 0 XP" — mogła się zastanawiać.
- 📊 **Czas:** ~8 minut, 14 kroków

### Znalezione problemy
1. **[P3-UX]** Przy skip nie ma żadnego potwierdzenia/feedbacku — user może nie zauważyć, że krok został pominięty
2. **[OK]** Pasek 100% i zakończenie wyświetlają się tylko na D1 — prawidłowe

---

## 👤 Użytkownik 2: Vasyl (35 lat, Ukrainiec, iPhone, średnio-zaawansowany)

**Profil:** Pracuje w Żabce od miesiąca, mówi po polsku, ale preferuje ukraiński. Ma iPhone'a. Chce przejść szybko, pomija rzeczy które zna. Przeglądarka Safari.

### Ścieżka

| Krok | Co widzi | Akcja | Stan |
|------|----------|-------|------|
| A0 Witaj | Powitanie | „Zaczynamy!" | ✅ 25 XP |
| A1 Instalacja | „Jaki telefon?" | „iPhone 🍎" → branch=ios | — |
| A1 (cd.) | Safari instrukcja + video 0.5x | „Gotowe ✅" | ✅ 50 XP |
| A2 Logowanie | Karta startowa | „Jestem w środku ✅" | ✅ 50 XP |
| A3 Język | Zmiana flagi | „Gotowe ✅" | ✅ 25 XP |
| A4 Konto | Profil | „Pominę ⏭️" | ⏭️ skip |
| A5 Powiadomienia | Dzwonek | „Pominę ⏭️" | ⏭️ skip |
| 🏁 Rozdział 1 | Toast +150 XP | — | **300 XP** |
| B4 Zakres | Selektor | „Pominę ⏭️" | ⏭️ skip |
| B1 Dostępność | Kalendarz | „Zrobię to w pracy ⏭️" | ⏭️ skip |
| B2 Pędzel | Pędzel | „Pominę ⏭️" | ⏭️ skip |
| B3 Notatka | Notatka | „Pominę ⏭️" | ⏭️ skip |
| 🏁 Rozdział 2 | Toast +150 XP | — | **450 XP** |
| C1 Rozlicz | Formularz | „Rozumiem ✅" | ✅ 100 XP |
| C2 Edytuj | Edycja | „Pominę ⏭️" | ⏭️ skip |
| C3 Sklep | „Pracujesz w kilku?" | „Tak, w kilku 🏪" → next | — |
| C3 (cd.) | Selektor + video | „Gotowe ✅" | ✅ 25 XP |
| 🏁 Rozdział 3 | Toast +150 XP | — | **725 XP** |
| D1 Grafik | Harmonogram | „Grafik pusty ⏭️" | ⏭️ skip |
| 🏁 Rozdział 4 | Toast +150 XP | — | **875 XP** |
| Zakończenie | 🎉 Onboarding ukończony! | — | **100%** |

### Doświadczenie Vasyla
- ✅ **Szybka ścieżka działa** — przeskoczył 8/14 kroków, całość w ~4 minuty
- ✅ **iPhone branch** — specyfika Safari (nie Chrome!) dobrze zaakcentowana
- ✅ **C3 Sklep** — multi-sklep flow (Tak → next → instrukcja → Gotowe) płynny
- ✅ **Zmiana języka A3** — Vasyl zmienił na ukraiński, krok miał sens
- ⚠️ **100% completion mimo 8 skipów** — Vasyl ma 100% completion ale tylko 875 XP z możliwych 1125 (77%). Progress bar mówi „100%" mimo dużo pominiętych kroków. Może to mylić — „100% ukończone" sugeruje pełne zrobienie.
- ⚠️ **Total XP niejasny** — 875 XP, ale nie widać ile mógłby mieć gdyby nie skipował

### Znalezione problemy
3. **[P2-UX]** `percentComplete` liczy skipy jako „completed" → użytkownik widzi 100% mimo ominięcia połowy kroków. Pasek postępu nie rozróżnia complete vs skip. Może „100% przejrzane" zamiast „100% ukończone"?
4. **[P3-info]** Brak widoca maximum XP — user nie wie 875/1125

---

## 👤 Użytkownik 3: Kasia (28 lat, Android, przerywa i wraca po 3 dniach)

**Profil:** Pracownica, robi onboarding na zmianie. Przechodzi do B1 i musi zamknąć przeglądarkę. Wraca po 3 dniach.

### Ścieżka — sesja 1

| Krok | Akcja | Stan |
|------|-------|------|
| A0 Witaj | „Zaczynamy!" | ✅ |
| A1 Instalacja | Android → „Gotowe" | ✅ |
| A2 Logowanie | „Jestem w środku" | ✅ |
| A3 Język | „Nie zmieniam" | ⏭️ |
| A4 Konto | „Gotowe" | ✅ |
| A5 Powiadomienia | „Gotowe" | ✅ |
| 🏁 Rozdział 1 | Toast | **325 XP** |
| B4 Zakres | „Rozumiem" | ✅ |
| **≡ Zamyka przeglądarkę** | | Postęp zapisany |

**Stan w localStorage:** currentStep = emp-b1-dostepnosc, activeBranch = null, completedSteps = [a0,a1,a2,a3,a4,a5,b4], completedChapters = [ch1]

### Ścieżka — sesja 2 (po 3 dniach)

| Krok | Co widzi | Stan |
|------|----------|------|
| Otwarcie | „🐸 Dawno Cię nie było! Zostawiliśmy zakładkę w **Ustawianie dostępności**." | greeting = resume, timeSince = medium |
| B1 Dostępność | Kliknij kafelki + tip + video → buttons | Pojouter → „Zapisałem ✅" → ✅ |
| B2 Pędzel | Pędzel + video | „Fajne! ✅" → ✅ |
| B3 Notatka | Notatka + video | „Gotowe ✅" → ✅ |
| 🏁 Rozdział 2 | Toast +150 XP | ✅ |
| (kontynuuje do końca...) | | |

### Doświadczenie Kasi
- ✅ **Powrót płynny** — greeting na zielono, dokładnie na kroku B1
- ✅ **activeBranch=null** po powrocie — prawidłowe (branch z A1 android został wyczyszczony po complete)
- ✅ **Greeting znika po pierwszej zmianie kroku** — `greetingDismissedRef.current = true` w useEffect. Nie pojawia się ponownie.
- ✅ **Cały postęp z sesji 1 zachowany** — XP, badges, completed steps
- ⚠️ **Greeting tekst zawiera step.title** — ale ten tytuł się zmieni jeśli user wejdzie w mapę i przeskoczy do innego kroku. `returnGreeting` jest `useMemo` z deps `[currentStep.title, percentComplete]` — zmieni się jeśli step się zmieni, co nie jest intencją. Powinien być zamrożony na mount.

### Znalezione problemy
5. **[P2-logic]** `returnGreeting` przelicza się gdy step się zmieni (deps na `currentStep.title`). Jeśli Kasia kliknie mapę i przeskoczy do innego kroku, greeting się zmieni zamiast zniknąć. W praktyce `greetingDismissedRef` chroni przed ponownym wyświetleniem, ale treść `returnGreeting` zmienia się w pamięci niepotrzebnie.
6. **[OK]** `timeSince = medium` (3 dni < 7) — prawidłowa kategoria

---

## 👤 Użytkownik 4: Marek (45 lat, Android, niski tech-level, dużo klika „nie wiem")

**Profil:** Starszy pracownik, pierwszy smartfon. Często się gubi, klika skip na trudniejszych krokach. Po ukończeniu wchodzi w mapę żeby wrócić do pominiętych.

### Ścieżka — pierwsze przejście

| Krok | Akcja | Stan |
|------|-------|------|
| A0 | „Zaczynamy!" | ✅ |
| A1 | Android → „Zrobię później ⏭️" | ⏭️ |
| A2 | „Nie mam karty 🤔" → next → „Pominę ⏭️" | ⏭️ |
| A3 | „Nie zmieniam" | ⏭️ |
| A4 | „Pominę ⏭️" | ⏭️ |
| A5 | „Pominę ⏭️" | ⏭️ |
| 🏁 Rozdział 1 | Toast | **175 XP** (25 + 150 bonus) |
| B4 | „Pominę ⏭️" | ⏭️ |
| B1 | „Zrobię to w pracy ⏭️" | ⏭️ |
| B2 | „Pominę ⏭️" | ⏭️ |
| B3 | „Pominę ⏭️" | ⏭️ |
| 🏁 Rozdział 2 | Toast | **325 XP** |
| C1 | „Zrobię to w pracy ⏭️" | ⏭️ |
| C2 | „Pominę ⏭️" | ⏭️ |
| C3 | „Nie, w jednym" → complete | ✅ |
| 🏁 Rozdział 3 | Toast | **500 XP** |
| D1 | „Grafik pusty ⏭️" | ⏭️ |
| 🏁 Rozdział 4 | Toast | **650 XP** |
| Zakończenie | 🎉 Onboarding ukończony! | 100% |

### Marek wraca do pominiętych kroków z mapy

| Akcja | Co widzi | Wynik |
|-------|----------|-------|
| Otwiera mapę (🗺️) | 4 rozdziały — wszystkie „Ukończony ✓" | OK |
| Klika „Pierwsze Kroki" | Przeskakuje do ch1, firstIncomplete (ale… wszystkie complete/skip) | ⚠️ |
| Klika „Instalacja" | Widzi wszystkie wiadomości (read-only, bez buttonów) | Przeglądanie OK |
| Klika „Logowanie" | Widzi wiadomości + extra flow (oba zestawy buttons) — read-only | Przeglądanie OK |

### Doświadczenie Marka
- ✅ **Skip jest łatwy i nie karze** — Marek mógł przejść cały onboarding w ~2 minuty klikając skip
- ✅ **Read-only mode** dla ukończonych/skipowanych kroków działa — widać treść bez aktywnych buttonów
- ✅ **A2 „Nie mam karty"** → next → dodatkowa wiadomość → buttons. Flow wielokrokowy w jednym stepie działa.
- ⚠️ **Marek dostał 650 XP z maks 1125** — ale pasek mówi 100%. Rozbieżność.
- ⚠️ **jumpToChapter z complete chapters** — `firstIncomplete = ch.steps.find(s => !completedSteps.includes(s.id))` — ale ALL steps are in completedSteps (skip dorzuca do completedSteps). Więc `firstIncomplete = undefined` → fallback: `ch.steps[0]`. OK — wraca do pierwszego kroku.
- ⚠️ **Brak rozróżnienia „skip" vs „complete" w mapie** — oba wyglądają tak samo (completed ✓ vs line-through). Marek widzi `stepStatuses` ale te się liczą per `currentChapter`. Jak przeskakuje do innego rozdziału, stepStatuses pokazuje statuses ACTIVE chapter, nie klikniętego.

### Znalezione problemy
7. **[P2-UX]** `stepStatuses` jest obliczany dla `currentChapter`, ale drawer pokazuje steps per chapter. Gdy user kliknie inny rozdział w mapie, pod nim widzi steps z `stepStatuses` (które dotyczą OBECNEGO rozdziału, nie klikniętego). Ikona √ / ○ / line-through mogą być błędne.
8. **[P3-UX]** Brak jasnego CTA dla „wróć do pominiętych" — Marek musiał sam zorientować się, że mapa pozwala na nawigację
9. **[P2-UX]** `percentComplete` = 100% przy dużo skip-ów — patrz problem #3

---

## 👤 Użytkownik 5: Igor (19 lat, iPhone, power-user, testuje edge-case'y)

**Profil:** Ciekawy, klika wszystko, wraca, przeskakuje rozdziały, restartuje. Szuka bugów.

### Scenariusz A: Przeskoki i nawigacja

| Akcja | Wynik |
|-------|-------|
| A0 „Zaczynamy!" → ✅ | OK |
| Otwiera mapę → klika „Rozliczanie Godzin" (Ch3) | `jumpToChapter('emp-ch-rozliczenia')` — przeskakuje do C1 | 
| C1 widzi treść, klika „Rozumiem ✅" | ✅ C1, step przechodzi na C2 |
| Otwiera mapę → klika „Twoja Dostępność" (Ch2) | przeskakuje do B4 (first incomplete) |
| B4 → „Rozumiem ✅" | ✅, przechodzi do B1 |
| Otwiera mapę → klika „Twój Harmonogram" (Ch4) | przeskakuje do D1 |
| D1 → „Widzę ✅" | ✅ D1, to ostatni step w ch4 |

**Pytanie:** Czy toast celebracji Ch4 się pokaże?
- Sprawdzam: `isLastStepInChapter = true`, `!progress.completedChapters.includes(currentChapter.id)` — ch4 NIE jest w completedChapters → **TAK, toast się pokaże** ✅
- Ale `percentComplete` = round((A0+C1+B4+D1)/14*100) = round(4/14*100) = 29%. Więc completion card **NIE** pokaże się (percentComplete ≠ 100%).
- `advanceToNextStep`: ch4 to last chapter → `nextChapter = undefined` → stays on ch4/D1. ✅

### Scenariusz B: reset + ponowne przejście

| Akcja | Wynik |
|-------|-------|
| Otwiera mapę → „Resetuj postęp" → confirm | `createInitialProgress()` — all state zeroed |
| Widzi A0 od nowa | ✅ Czyste |
| Przechodzi A0→A1 (iPhone branch) | branch=ios, widzi Safari instrukcję |
| **Odświeża stronę (F5)** | |
| Po refresh | `activeBranch = 'ios'` (z localStorage) — widzi dalej iOS content |
| Klika „Gotowe ✅" | ✅, activeBranch → null, idzie do A2 |

**Persistencja branch po refresh:** ✅ działa prawidłowo.

### Scenariusz C: Ukończ wszystko, potem wejdź w mapę do ukończonego kroku

| Akcja | Wynik |
|-------|-------|
| (Igor ukończył 100%) | Completion card na D1 |
| Otwiera mapę → klika „Rozliczanie Godzin" → „Rozlicz zmianę" | jumpToStep('emp-c1-rozlicz') |
| C1 ładuje się | Widzi all messages (read-only, no buttons) |
| **Pod treścią** | `percentComplete === 100 && isOnFinalStep` — `isOnFinalStep = currentStep.id === 'emp-d1-grafik'` → **FALSE** (jest na C1). |
| **Wynik:** | 🎉 completion card **NIE** wyświetla się na C1. ✅ |

### Scenariusz D: Co gdy skip → later return → try to complete?

| Akcja | Wynik |
|-------|-------|
| A1 → skip | skippedSteps + completedSteps includes A1 |
| (later) Mapa → klika A1 | Widzi all messages read-only, **BEZ** buttonów |
| Igor chce zrobić A1 „na serio" | ❌ **Nie może** — buttons hidden bo step in completedSteps |

### Doświadczenie Igora
- ✅ **Swobodna nawigacja** — przeskoki między rozdziałami działają płynnie
- ✅ **Reset** — wyczyścił i zaczął od nowa, bez artefaktów
- ✅ **Branch persistence** — odświeżenie strony zachowuje branch iPhone
- ✅ **Completion card** — NIE nakłada się na lekcje z mapy (fix z isOnFinalStep działa)
- ✅ **Chapter toast** — toasty poprawnie per rozdział, nie powtarzają się
- ⚠️ **Nie można ponownie ukończyć skipniętego kroku** — po skip krok traktowany jak complete (no buttons). Jeśli user chce wrócić i „zrobić na serio" → nie może zdobyć XP.

### Znalezione problemy
10. **[P2-UX]** Skip dodaje do `completedSteps` → użytkownik nie może wrócić i zrobić kroku „na serio" (no buttons, read-only). Brakuje „Powtórz krok" / opcji odblokowania.
11. **[P3-edge]** `jumpToChapter` z completed chapter → `firstIncomplete = undefined` → fallback `ch.steps[0]`. Poprawne, ale mapa nie daje wizualnego feedbacku „wszystko zrobione, cofasz się do podglądu".

---

## 📊 Podsumowanie — Macierz Problemów

| # | Priorytet | Typ | Problem | Dotyka | Rekomendacja |
|---|-----------|-----|---------|--------|--------------|
| 3 | **P2** | UX/Logic | 100% completion mimo wielu skip-ów. `percentComplete` traktuje skip jak complete. | Wszyscy skiperzy | Rozdzielić: `completedSteps` (real) vs `skippedSteps`. Progress bar = only real completions. Albo zmienić label na „Przejrzane" zamiast „Ukończone". |
| 7 | **P2** | UI Bug | `stepStatuses` obliczane per `currentChapter`, ale drawer wyświetla kroki z innego (klikniętego) rozdziału. Statusy mogą się nie zgadzać. | Nawigacja mapą | Obliczyć statusy per chapter wewnątrz DrawerContent, nie przekazywać jedną tablicę. |
| 9 | **P2** | UX | Identyczne jak #3 — Marek i Vasyl | — | j.w. |
| 10 | **P2** | UX | Skipnięte kroki read-only, nie można wrócić i zrobić „na serio" | Marek, Igor | Dodać „🔄 Powtórz krok" button w read-only widoku ukończonego/skipniętego kroku |
| 5 | **P2** | Logic | `returnGreeting` re-oblicza się przy zmianie kroku (deps na currentStep.title). Niegroźne dzięki `greetingDismissedRef`, ale niepotrzebna praca. | Kasia | Użyć `useRef` zamiast `useMemo` — zamrozić na mount. |
| 1 | **P3** | UX | Brak feedbacku przy skip — user nie wie że krok pominięty i 0 XP | Ania | Dodać krótką toast: „Pominięto — 0 XP" |
| 4 | **P3** | Info | Brak widocznego max XP — user nie wie ile mógłby mieć | Vasyl | Opcjonalnie: w mapie/karcie dodać „875 / 1125 XP" |
| 8 | **P3** | UX | Brak CTA „wróć do pominiętych" po ukończeniu | Marek | W completion card dodać link „Wróć do pominiętych kroków" z filtrem |
| 11 | **P3** | Edge | jumpToChapter → completed → fallback steps[0] bez wizualnego feedbacku | Igor | Drobne — dodać oznaczenie „podgląd" |

---

## ✅ Co Działa Dobrze (produkcja-ready)

1. **Branching Android/iOS** — pełna izolacja, prawidłowa filtracja, video per platform
2. **PlaybackRate 0.5x** — PWA video wolniejsze, dobrze widać kroki
3. **Persistencja localStorage** — postęp, activeBranch, XP, badges — wszystko przeżywa refresh
4. **Return greeting** — kontekstowe, nie irytujące, znika po zmianie kroku
5. **Chapter toast** — kompaktowy, 3s auto-dismiss, nie blokuje interfejsu
6. **Completion card** — tylko na D1 (final step), nie nakłada się na lekcje
7. **Read-only mode** — ukończone kroki pokazują treść bez buttonów
8. **Multi-step within step** — A2 „Nie mam karty" → next → extra msg → buttons
9. **C3 conditional** — „Pracujesz w kilku?" → Yes/No split
10. **Newlines** — `\n` w treści renderuje się jako `<br />`, markdown bold działa per linia
11. **Tip styling** — 💡 prefix, niebieska ramka, bez podwójnego emoji
12. **Mapa/drawer** — przejrzysta nawigacja, odznaki, reset z confirm

---

## 🎯 Rekomendacja Końcowa

### Gotowe na produkcję: ✅ TAK, z zastrzeżeniami

System jest stabilny, persystencja działa, edge-case'y obsłużone. **Nie znaleziono crashy ani data-loss scenarios.**

### Przed release — priorytety:

**MUST (P2 — naprawić przed deploy):**
- [ ] **#3/#9:** Zmienić `percentComplete` żeby nie liczył skip-ów jako 100%, LUB zmienić label „przejrzano X/14 kroków"
- [ ] **#7:** Fix `stepStatuses` w drawer — obliczać per chapter, nie per currentChapter
- [ ] **#10:** Dodać „Powtórz krok" dla skipniętych kroków (opcjonalne, ale mocno poprawia UX)

**SHOULD (P3 — nice-to-have, nieblokujące):**
- [ ] #1: Toast „Pominięto" przy skip
- [ ] #4: Pokazać max XP (np. „875 / 1125 XP")
- [ ] #8: CTA „Wróć do pominiętych" na completion card
- [ ] #5: Zamrozić returnGreeting na mount (useRef zamiast useMemo)

**Decyzja zespołu potrzebna na:**
1. Czy skip = 100% jest OK? Czy chcemy rozróżniać? (wpływa na pasek i tekst)
2. Czy dodajemy „Powtórz krok"? (wymaga zmiany w handleButtonClick + renderowania buttonu w read-only)
3. Czy max XP powinien być widoczny? (transparentność vs. „nie chcemy straszyć liczbami")
