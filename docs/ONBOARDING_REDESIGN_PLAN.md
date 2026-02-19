# Onboarding Redesign — Plan & Team Discussion

> **Data:** 2026-02-10  
> **Cel:** Przebudowa /onboarding: podział na role (Pracownik / Właściciel), uproszczenie UX, nowy content  
> **Faza pierwsza:** Tylko widok Pracownika

---

## 🗣️ Dyskusja Zespołu

### Senior UX/UI Designer — Kasia

**Problem obecnego stanu:**
Obecna strona /onboarding ma 5 przygód z 25 questami. Pracownik sklepu (kasjer, magazynier) widzi **dokładnie to samo** co właściciel — w tym konfigurację sklepu, dodawanie pracowników, AI harmonogram, eksport PIP. To około 60-70% treści, z których nigdy nie skorzysta. Efekt: **cognitive overload** → użytkownik zamyka stronę po 30 sekundach.

**Propozycja UX:**

1. **Role Toggle na górze strony** — prosty, elegancki przełącznik "Pracownik / Właściciel". Domyślnie: Pracownik. Żadnego dropdown, select, ani modala — jeden klik i zmiana widoku. Umieścimy go bezpośrednio pod nagłówkiem, nad kartami przygód.

2. **Ukrywanie description przy rozwinięciu** — Kiedy użytkownik rozwija quest (klika, żeby zobaczyć filmik/kroki), opis pod tytułem znika. To daje więcej miejsca na content i eliminuje redundancję — kroki i filmik mówią to samo co opis. Quest zamknięty = tytuł + opis (preview). Quest otwarty = tytuł + content (kroki, filmik).

3. **Pracownik: 4 przygody zamiast 5** — Struktura:
   - A) Pierwsze Skoki (5 questów — app install, login, język, konto, powiadomienia)
   - B) Twoja Dostępność (4 questy — dostępność, pędzel, notatka, zakres dat)
   - C) Rozliczanie Godzin Pracy (3 questy — rozlicz, edytuj, wybierz sklep)
   - D) Twój Harmonogram Pracy (1 quest — sprawdź grafik)
   
   Łącznie: **13 questów** zamiast 25. To bardziej przystępna liczba.

4. **Gamifikacja zostaje** ale odznak będzie mniej (4 zamiast 5), XP i poziomy działają tak samo. Quizy opcjonalnie — dla pracownika proponuję ich nie dawać (mniej stresujący onboarding).

### Senior Marketing Specialist — Marek

**Z perspektywy użytkownika docelowego:**

Pracownik Żabki ma 18-35 lat, jest często wielozmianowy, otwiera telefon między klientami. Nie ma czasu na "przygodę" z 25 krokami. Potrzebuje:
- Szybko zainstalować appkę
- Wiedzieć jak się logować
- Umieć wpisać swoją dostępność
- Rozliczyć zmianę po pracy

**Rekomendacje copy:**

1. **Tytulatura przygód** — zachuję nazwy "Przygoda 1, 2, 3, 4" bo gamifikacja działa (user engagement +40% vs suchy tutorial). Ale nazwy przygód powinny być jasne i praktyczne.

2. **Krok-po-kroku** — Instrukcje muszą być ultrakrótkie. Jedna wiadomość = jedna czynność. Żadnego "Przejdź do zakładki X, następnie kliknij Y, a potem..." — rozbijamy na osobne kroki.

3. **Tipy jako kontekstualne uwagi** — Rzeczy typu "Pamiętaj, żeby po pierwszym logowaniu ustawić swoje hasła" to tip, nie krok. Wizualnie powinien wyglądać inaczej (kursywa, emoji 💡, mniejszy font).

4. **"Notatki" w kroce C.3 to gwiazdki** — "*Jeśli pracujesz w więcej niż 1 sklepie" — to warunek, nie krok. Użyjemy tip/note z innym stylem.

5. **Domyślnie "Pracownik"** — Właściciel i tak zazwyczaj wie więcej (sam wdrażał system). Pracownik to nasz priorytetowy use case.

### Senior Web Developer — Tomek

**Architektura zmian:**

1. **Nowy plik danych** — Zamiast modyfikować `onboarding-content.ts` (który działa jako single source), dodaję nowy plik `onboarding-employee.ts` z treścią dla pracownika. Istniejący plik zostanie w przyszłości przemianowany na `onboarding-owner.ts` (lub rozszerzony). Dzięki temu:
   - Zero regresji w obecnym systemie
   - Łatwe porównanie old vs new
   - Owner content dodamy w kolejnej fazie

2. **Role Toggle** — Stan `role: 'employee' | 'owner'` w `content.tsx`. Żaden routing (nie chcemy /onboarding/pracownik), bo to ta sama strona z filtrem. Zapisuję wybór w localStorage razem z progressem.

3. **Osobne progressy per rola** — Klucz w localStorage: `autozaba-onboarding-employee` vs `autozaba-onboarding-owner`. Tak żeby ukończenie questów pracownika nie mieszało się z questami właściciela.

4. **Quest description ukrywanie** — W `quest-item.tsx`, w sekcji headera, wrappuję `<p>{description}</p>` w `AnimatePresence` z warunkiem `!isExpanded`. Animacja: fade-out 150ms. Proste, zero regresji.

5. **Adventure subtitle ukrywanie** — Analogicznie w `adventure-card.tsx` — subtitle ukryty gdy `isExpanded`.

6. **Bez quizów dla pracownika** — Przygody pracownika nie mają pola `quiz`. Komponent `AdventureCard` już to obsługuje (`hasQuiz = !!adventure.quiz`).

7. **Zachowanie backward compatibility** — `use-progress.ts` i gamifikacja działają identycznie. Jedyne co się zmienia to dane wejściowe (jakie questy/adventures są wyświetlane).

---

## 📋 Plan Implementacji

### Krok 1: Nowy plik danych — `onboarding-employee.ts`
Nowy plik z 4 przygodami i 13 questami dla roli Pracownik.
- Reuse interfejsów z `onboarding-content.ts` (Quest, Adventure, etc.)
- Nowe ID questów z prefixem `emp-` aby nie kolidować z istniejącymi
- Treść kroków (steps) dopasowana do user's sketchu
- Bez quizów, bez deep links (na razie)

### Krok 2: Role Toggle w `content.tsx`
- Dodanie stanu `role` z localStorage persistence
- Przełącznik wizualny (pill toggle) pod nagłówkiem
- Warunkowe renderowanie: `role === 'employee' ? EMPLOYEE_ADVENTURES : ADVENTURES`
- Osobne klucze localStorage per rola

### Krok 3: UX improvements w komponentach
- `quest-item.tsx` — ukrywanie description przy expanded
- `adventure-card.tsx` — ukrywanie subtitle przy expanded
- Tekst logowania: zmiana description na "Jak zalogować się do AutoŻaba"

### Krok 4: Build & testy
- `tsc --noEmit` — zero errors
- Weryfikacja localStorage: osobne klucze per rola
- Testowanie toggle employee ↔ owner (owner = stary content)

---

## 🎯 Scope Dzisiejszy

| Element | Status |
|---------|--------|
| `onboarding-employee.ts` — content dla Pracownika | DO ZROBIENIA |
| Role toggle (Pracownik/Właściciel) w `content.tsx` | DO ZROBIENIA |
| Ukrywanie description/subtitle na expand | DO ZROBIENIA |
| Oddzielny localStorage per rola | DO ZROBIENIA |
| Content Właściciela | ⏳ PRZYSZŁOŚĆ |
| Filmiki do kroków | ⏳ PRZYSZŁOŚĆ (user doda) |

---

## ✅ Decyzje Zespołu

1. **Role toggle** = pill/segmented control, inline pod maskotem, nad kartami
2. **Domyślna rola** = Pracownik (employee)
3. **Pracownik: 4 przygody, 13 questów**, bez quizów
4. **Description hide** = AnimatePresence fade-out na expand
5. **Osobny localStorage** per rola
6. **Existing owner content** = istniejący ADVENTURES (nie ruszamy)
7. **Quest IDs** = prefiks `emp-` (employee) aby uniknąć kolizji
