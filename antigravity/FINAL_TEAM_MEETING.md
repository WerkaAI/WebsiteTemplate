# 🏁 Finałowe Spotkanie Zespołu — Onboarding Przed Produkcją

**Data:** 18 lutego 2026, 14:00  
**Obecni:** Dr Ewa Nowak, Jakub Wiśniewski, Natalia Kowalczyk, Tomasz Zieliński, Marta Lewandowska, Igor Przełomski (gościnnie)  
**Kontekst:** Analiza wyników symulacji 5 użytkowników + decyzje przed deploy na produkcję

---

## 📋 Agenda

1. Przegląd wyników symulacji (5 min)
2. Dyskusja per problem (30 min)
3. Propozycja Igora (10 min)
4. Lista zadań przed deploy (5 min)
5. Decyzja: GO / NO-GO

---

## 1. Przegląd — Tomasz otwiera

**Tomasz Zieliński:** Przeszliśmy pięciu symulowanych użytkowników. Ania — nowicjuszka, liniowe przejście, 8 minut. Vasyl — Ukrainiec z iPhone'em, przeskoczył 8 z 14 kroków w 4 minuty. Kasia — przerwała po Rozdziale 1, wróciła po 3 dniach. Marek — 45 lat, skipnął prawie wszystko, potem wrócił przez mapę. Igor — power-user, testował edge-case'y.

**Tomasz:** Zero crashy. Zero utraty danych. Persystencja localStorage działa — activeBranch przeżywa refresh, greeting kontekstowy, toasty się nie powtarzają. System jest stabilny. Ale mamy 5 problemów do omówienia.

---

## 2. Dyskusja per Problem

### 🔴 Problem #3/#9: „100% ukończone" mimo dużo skip-ów

**Tomasz:** Vasyl skipnął 8/14 kroków i widzi pasek 100%. Marek skipnął 12/14 — też 100%. To dlatego, że `percentComplete` liczy skipnięte kroki jako ukończone.

**Ewa Nowak:** Z perspektywy behawioralnej — to jest celowe. 100% mówi „przeszedłeś cały materiał, nic Cię nie zaskoczy". Nie mówi „zrobiłeś ćwiczenie do końca". Porównaj: Netflix mówi „obejrzane" nawet jak przewinąłeś odcinek. Retencja jest w XP — tam widzisz różnicę 650 vs 1125.

**Natalia Kowalczyk:** Zgadzam się z Ewą. W Duolingo pominięcie lekcji to wciąż progres. XP jest walutą „głębokości", progress bar jest walutą „szerokości". Rozdzielanie ich jest prawidłowe. Ale powinniśmy zmienić label. „100% ukończone" to kłamstwo. „14/14 przejrzane" — to prawda.

**Jakub Wiśniewski:** Na mobile tym bardziej — user widzi zielony pasek = „skończyłem, jestem wolny". To motywuje. Nie zabierajmy tego. Ale mała zmiana labela to minimum.

**Tomasz:** Sam stałem za kasą — pracownik chce widzieć „gotowe". Czy zrobił ćwiczenie czy nie — wie że coś istnieje. Zgadzam się z Natalią: label → „przejrzane" zamiast „ukończone".

> **✅ DECYZJA:** Zostaje 100% przy skip-ach. Label zmieniamy na format `X/14 kroków` bez słowa „ukończone". Pasek pełny = przejrzałeś całość.

---

### 🟡 Problem #7: stepStatuses w drawer per currentChapter

**Marta Lewandowska:** Zweryfikowałam kod. To NIE jest bug. Drawer wyświetla kroki (`stepStatuses`) TYLKO dla `isCurrentChapter` — dzięki warunkowi `{isCurrentChapter && (...)}`. Więc statusy zawsze odpowiadają aktywnemu rozdziałowi. Inne rozdziały pokazują TYLKO header i status „Ukończony ✓" / „W trakcie", bez rozwiniętej listy kroków.

**Jakub:** Ale to znaczy, że Marek NIE WIDZI które konkretne kroki skipnął w innym rozdziale. Jak chce wrócić, musi kliknąć rozdział (co go przeniesie tam), otworzyć drawer, DOPIERO WTEDY zobaczyć listę kroków. Dwa kliknięcia za dużo.

**Ewa:** Dla Marka (niski tech-level) to faktycznie bariera. Ale przy MVP — nie blokowałabym release'u. Jeden poziom nawigacji w drawer jest wystarczający na start.

**Natalia:** Propozycja kompromisu: pod headerem zablokowanego/ukończonego rozdziału dodać miniaturkę postępu, np. „4/6 ukończone, 2 pominięte". Bez rozwijania pełnej listy. Jednolinijkowy feedback.

> **✅ DECYZJA:** P3 — nie blokuje release'u. W drawer, pod tytułem rozdziału dodajemy mini-summary: `„X ukończone · Y pominięte"`. Pełna lista kroków → faza 2.

---

### 🔴 Problem #10: Nie można wrócić i zrobić skipniętego kroku „na serio"

**Tomasz:** Igor skipnął A1, potem wrócił przez mapę — widzi treść read-only, bez przycisków. Nie może zdobyć XP. To jest problem — właściciel pyta „czemu Marek nie umie rozliczyć godzin?", a Marek mówi „coś skipnąłem i nie mogę wrócić".

**Ewa:** To jest największy problem z perspektywy learning outcomes. Skip powinien być odwracalny. Natalia, jak robiliście to w Duolingo?

**Natalia:** W Duolingo nie ma skip — jest „test out". Ale w naszym kontekście bym to uprościła: skipnięty krok ma dodatkowy przycisk „🔄 Chcę to zrobić" który resetuje status tego kroku i odpala flow od nowa. XP przyznawane normalnie.

**Marta:** Technicznie proste — usuwam step.id z `completedSteps` i `skippedSteps`, resetuję `lastSeenMessageId` i ustawiam `currentStepId`. 15 linii kodu.

**Jakub:** Przycisk nie powinien dominować — traktujemy go jako ghost/secondary pod treścią read-only. Tekst: „Zrób ten krok" — bez emoji, prosty.

**Igor Przełomski:** A gdyby „Powtórz krok" wyglądał jak zaproszenie od Żabka? Nie przycisk, a bąbelek: „🐸 Hej! Chcesz to zrobić teraz?" — z jednym przyciskiem „Tak, pokaż mi". Czujesz tę różnicę? System *zaprasza*, nie *oferuje opcję*.

**Ewa:** Podoba mi się propozycja Igora. Bąbelek od Żabka zamiast zimnego przycisku. Buduje relację.

**Tomasz:** Zgadzam się — ale nie za dużo tekstu. „Chcesz to zrobić?" + „Pokaż mi 👀" — krótko.

> **✅ DECYZJA:** Dodajemy. Na skipniętym kroku w read-only mode, na dole Żabek pyta: „Chcesz to zrobić?" + przycisk „Pokaż mi 👀" (action='retry'). Technicznie: nowy action type 'retry' w handleButtonClick → usuwa z completedSteps/skippedSteps, resetuje lastSeenMessageId.

---

### 🟡 Problem #5: returnGreeting re-oblicza się na zmianę kroku

**Marta:** Zmienne `returnScenarioRef` i `timeSinceRef` to `useRef`, więc stabilne. Ale `useMemo` ma deps `[currentStep.title, percentComplete]`. Jeśli user zmieni krok, greeting się przelicza. W praktyce `greetingDismissedRef` blokuje ponowne wyświetlenie, więc jest to waste obliczeniowy, nie bug wizualny.

**Jakub:** Koszt zerowy na UX. Skip.

**Marta:** Poprawię dla czystości: zamrożę na `useRef` z lazy init zamiast `useMemo`. 3 linie zmian. Zero ryzyka.

> **✅ DECYZJA:** Marta robi przy okazji. Nie testujemy oddzielnie — zero wpływu na UX.

---

### 🟢 Problem #1: Brak feedbacku przy skip (P3)

**Ewa:** Dodawanie toastu „pominięto, 0 XP" to kara psychologiczna. User wybrał skip — szanujemy to. Duolingo nie mówi „przegapiłeś 10 XP". Lepsza strategia: POZYTYWNY feedback za zrobienie — „+50 XP 🎉", nie negatywny za pominięcie.

**Natalia:** Dokładnie. Negatywny feedback na skip zwiększa guilt-avoidance, nie motywację. Skiper nie wróci, bo czuje winę.

**Tomasz:** Pracownik po 8h zmianie nie chce widzieć „0 XP". Skipnij i idź do domu.

> **✅ DECYZJA:** NIE dodajemy feedbacku na skip. Pozytywna gamifikacja only.

---

### 🟢 Problem #4: Brak widocznego max XP

**Natalia:** „875 / 1125 XP" to porównanie społeczne z samym sobą. Tworzy deficyt: „brakuje mi 250 XP". W grywalizacji single-player to antywzorzec — chyba że masz leaderboard, nie pokazuj max.

**Igor:** A co gdyby zamiast max, był „ukryty" próg? Tipo: po 1000 XP Żabek mówi coś specjalnego. Surprise & delight. Nie mówisz ile brakuje — nagradzasz za osiągnięcie.

**Ewa:** Podoba mi się. Variable reward schedule — user nie wie kiedy dostanie bonus, więc kontynuuje.

> **✅ DECYZJA:** NIE pokazujemy max XP. Rozważymy ukryte progi nagradzane w fazie 2. Teraz — just ship.

---

### 🟢 Problem #8: Brak CTA „wróć do pominiętych"

**Jakub:** Na ekranie completion mamy golden Żabek, 4 odznaki, XP. Dodanie linku „Wróć do pominiętych" na tym widoku jest naturalne — user właśnie skończył, widzi listę, klika.

**Tomasz:** Ale TYLKO jeśli mamy „Powtórz krok" (#10). Bez niego — prowadzisz usera do dead-end.

**Jakub:** Prawidłowo. To jest zależne od #10.

> **✅ DECYZJA:** TAK — dodajemy na completion card tekst „X kroków pominięto" + link do mapy. Wchodzi RAZEM z #10 (retry).

---

### 🟢 Problem #11: jumpToChapter → completed → fallback bez feedbacku

**Jakub:** Kosmetyka. Gdy user klika ukończony rozdział, trafia na steps[0] bez wizualnego kontekstu „to jest przegląd". Ale greeting i read-only mode robią wystarczający kontekst.

> **✅ DECYZJA:** Skip. Nie implementujemy. Drawer i tak nie rozwija kroków niebieżącego rozdziału. Zero impact.

---

## 3. Propozycja Igora

**Igor Przełomski:** Posłuchajcie. Zrobiłem audit z pozycji game designera. System jest solidny, ale brakuje mu jednej rzeczy: **tension arc**. Cały onboarding to płaska linia — krok, krok, krok, koniec. Nie ma momentu „o kurde, co teraz?".

**Igor:** Propozycja: **Dark Step**. Jeden krok w Rozdziale 3 gdzie Żabek mówi: „Uwaga — teraz będzie trudne. Rozliczanie godzin to rzecz, o którą najczęściej pytają nowi." Zmiana tonu — tło lekko ciemniejsze, Żabek poważny. Po ukończeniu: duże XP + specjalny badge „Nieugięty". Budujecie narrację: „przetrwałeś najtrudniejsze".

**Ewa:** Ciekawe z perspektywy emocjonalnej — peak-end rule. Ludzie pamiętają peak (najtrudniejsze) i end (zakończenie). Mamy strong end (golden Żabek). Brakuje peaku. Dark step to go daje.

**Natalia:** C1 „Rozlicz zmianę" już ma `difficulty: 'hard'` i 100 XP. Moglibyśmy to wzmocnić bez zmiany mechaniki — dodatkowe stylowanie bąbelka, zmiana tonu treści, bonus badge.

**Tomasz:** „Rozliczanie godzin" to FAKTYCZNIE najtrudniejsza rzecz na zmianie. Nowi pracownicy dzwonią po tym kroku najczęściej. Budowanie „to jest boss fight" ma sens.

**Marta:** Stylistycznie proste — dodaję wariant `dark` do ChatBubble ze zmienionymi kolorami. Zero nowych komponentów.

**Jakub:** Jedno zastrzeżenie: nie przeginamy z dramatyzmem. Na low-literacy user „UWAGA TRUDNE" może wystraszyć. Proponuję: „To najważniejszy krok — ale masz Żabka!" — budowanie pewności, nie strachu.

**Igor:** Idealne. Strach → nie. Respect → tak.

> **✅ DECYZJA:** Faza 2. Nie blokuje release'u. Tomasz przygotuje zmienioną treść C1, Marta — wariant stylistyczny. Wchodzi w pierwszej iteracji po launch.

---

## 4. Lista Zadań Przed Deploy

### 🔴 MUST — Przed produkcją

| # | Zadanie | Właściciel | Estymacja | Zależności |
|---|---------|------------|-----------|------------|
| T1 | Zmienić label progress bar: process bar bez słowa „ukończone", format `X/14` | Marta | 15 min | — |
| T2 | Mini-summary w drawer per rozdział: `„X done · Y skip"` | Marta | 30 min | — |
| T3 | „Powtórz krok" — retry action w `handleButtonClick` + bąbelek Żabka na skipniętych krokach | Marta | 45 min | — |
| T4 | Completion card: „X kroków pominięto" + link do mapy | Marta | 20 min | T3 |
| T5 | Zamrozić `returnGreeting` na `useRef` | Marta | 5 min | — |

**Łącznie:** ~2h pracy developerskiej

### 🟢 Faza 2 — Po launch

| # | Zadanie | Właściciel |
|---|---------|------------|
| F1 | Dark Step (C1 visual + content rework) | Tomasz + Marta |
| F2 | Ukryte progi XP (surprise rewards) | Natalia + Marta |
| F3 | Rozwijana lista kroków per non-active chapter w drawer | Jakub + Marta |

### ❌ Odrzucone

| # | Co | Dlaczego |
|---|----|----|
| R1 | Toast „pominięto, 0 XP" | Kara psychologiczna — antywzorzec gamifikacji |
| R2 | Pokazywanie max XP | Tworzy deficyt, nie motywuje |
| R3 | Feedback wizualny na jumpToChapter completed | Zero UX impact |

---

## 5. Decyzja: GO / NO-GO

**Tomasz:** Podsumowując: system jest stabilny, zero crashy, persystencja działa. Mamy 5 zadań MUST, estymacja 2h. Po wykonaniu — produkcja.

**Ewa:** Z perspektywy learning design — wszystkie fundamenty są prawidłowe. Progressywne ujawnianie, skip bez kary, kontekstowy powrót. GO po taskach.

**Jakub:** Accessibility OK — aria-labels, role="log", reduced-motion. Buttony >= 48px. GO.

**Natalia:** Gamifikacja ma sens — XP zróżnicowane per trudność, badges per chapter, ewolucja Żabka. Nie ma badge fatigue (4 badges to max). GO.

**Marta:** Performance — testowałam na emulacie Redmi Note 9. Framer-motion spring + AnimatePresence — 60fps na mid-range Android. 14 MP4-ek mają lazy loading. GO.

**Igor:** Jedyny komentarz: to jest najlepszy onboarding pracowniczy jaki widziałem w Polsce. Żabek > 90% korporacyjnych e-learningów. Ship it, iterujcie, nie overengineerujcie.

> ### 🟢 DECYZJA: **GO** — po wykonaniu T1-T5 system wchodzi na produkcję.

---

## Podpisy

| Rola | Imię | Decyzja |
|------|-------|---------|
| Psycholog Behawioralny | Dr Ewa Nowak | ✅ GO |
| Mobile UX Designer | Jakub Wiśniewski | ✅ GO |
| Gamification Designer | Natalia Kowalczyk | ✅ GO |
| Content Strategist | Tomasz Zieliński | ✅ GO |
| Frontend Engineer | Marta Lewandowska | ✅ GO |
| Game Designer (gość) | Igor Przełomski | ✅ GO |

---

*Następny krok: Marta implementuje T1-T5. Tomasz robi smoke test. Deploy na produkcję.*
