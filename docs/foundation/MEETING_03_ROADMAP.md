# Spotkanie 3: Cięcie Zakresu i Roadmapa (The Reality Check)

**Data:** 21 lutego 2026
**Uczestnicy:** Victor (Product Lead), David (Frontend Architect), Sophia (Performance Ninja), Bartosz (Wildcard)
**Kontekst:** Zespół podsumowuje pomysły ze Spotkań 1 i 2, tnie zakres (scope creep) i tworzy ostateczną roadmapę dla jednego Senior Developera.

## Przebieg dyskusji

**Victor:** Dobra, mamy mnóstwo pomysłów. CMD+K, Haptic Feedback, Conversational Form, View Transitions, Bento Grids, 3D Tilt. Co z tego wchodzi do MVP silnika? Pamiętajcie, że to musi być wykonalne i utrzymywalne przez jednego Senior Deva.

**David:** View Transitions API w Next.js App Router jest jeszcze eksperymentalne/wymaga ostrożności, ale zrobimy to. To jest ten "wow factor", który nie kosztuje nas dużo pracy, a wygląda niesamowicie premium. CMD+K (np. `cmdk` library) to 2 godziny pracy, a daje ogromny efekt wow. Conversational Form zrobimy na bazie obecnego React Hook Form + Framer Motion.

**Sophia:** Haptic Feedback to jedna linijka w JS (`navigator.vibrate`), wchodzi. Ale 3D Tilt na każdej karcie? To zabije wydajność na słabszych urządzeniach. Proponuję ograniczyć to tylko do głównej sekcji Hero lub wyłączyć całkowicie na mobile.

**David:** Zgoda. 3D Tilt tylko na desktopie i tylko na kluczowych elementach. Reszta to czysty CSS (transformacje).

*(Bartosz, który do tej pory milczał, odzywa się)*

**Bartosz:** A co gdybyśmy dodali jeszcze... generator memów z twarzą klienta na stronie 404?

**Victor:** *(wzdycha)* Bartosz, nie. To jest dokładnie to, co nazywamy "scope creep". Tniemy to. Skupiamy się na tym, co przynosi wartość biznesową i konwersję.

**David:** Zgadzam się z Victorem. Nasz Senior Dev ma ograniczony czas. Musimy skupić się na fundamentach i tych kilku "wow factorach", które ustaliliśmy.

## Ustalenia i Wnioski (Roadmapa dla Senior Deva)

1. **Faza 1: Fundamenty i "Signature Look" (Tydzień 1)**
   * Wdrożenie asymetrycznych siatek (Bento Grids) i glassmorphismu na obecne komponenty shadcn/ui.
   * Optymalizacja typografii (Inter/Geist) i przestrzeni (whitespace).
   * Wdrożenie leniwego ładowania (`next/dynamic`) dla cięższych komponentów.

2. **Faza 2: Interakcje i "Wow Factor" (Tydzień 2)**
   * Wdrożenie Command Palette (CMD+K) do nawigacji i akcji.
   * Dodanie View Transitions API dla płynnych przejść między podstronami.
   * Wdrożenie Haptic Feedback (`navigator.vibrate`) na urządzeniach mobilnych przy kluczowych interakcjach.
   * Dodanie 3D Tilt (Framer Motion) tylko na desktopie dla kluczowych elementów (np. Hero).

3. **Faza 3: Konwersja i Formularze (Tydzień 3)**
   * Przebudowa obecnego formularza kontaktowego na interaktywny, wieloetapowy proces (Conversational Form) z wykorzystaniem React Hook Form i Framer Motion.
   * Testy A/B dla nagłówków i CTA (wykorzystanie komponentu `<ABTest>` w MDX).

4. **Faza 4: Optymalizacja i QA (Tydzień 4)**
   * Audyt wydajności (Core Web Vitals) i dostępności (a11y).
   * Testy na różnych urządzeniach i przeglądarkach.
   * Finalne szlify i przygotowanie dokumentacji dla klientów.

**Victor:** To jest nasz plan. Ambitny, ale wykonalny dla jednego Senior Deva. Zespół, dobra robota. Mamy silnik, który zdominuje rynek landing page'y premium.
