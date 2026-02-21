# Spotkanie 1: Fundamenty i Architektura (The Core)

**Data:** 21 lutego 2026
**Uczestnicy:** Victor (Product Lead), David (Frontend Architect), Sophia (Performance Ninja), Bartosz (Wildcard)
**Kontekst:** Zespół zapoznał się z dokumentem `CURRENT_STATE_2026-02-21.md`.

## Przebieg dyskusji

**Victor:** Zespół, przeczytaliśmy raport o aktualnym stanie. Nie zaczynamy od zera. Mamy już potężny fundament: Next.js (App Router), Tailwind, shadcn/ui, Framer Motion, MDX, a nawet zaawansowane mechanizmy bezpieczeństwa (CSP, rate limiting) i gotowy formularz kontaktowy z walidacją Zod. Jak to oceniasz, David?

**David:** Z perspektywy jednego Senior Deva, to jest marzenie. Ktoś odwalił kawał dobrej roboty z boilerplate'em. Mamy gotowy pipeline MDX, co rozwiązuje problem CMS-a. Mamy Resend i React Hook Form. Naszym zadaniem nie jest budowanie koła na nowo, ale wzięcie tego solidnego wozu i zrobienie z niego Ferrari. Architektura jest gotowa na skalowanie, ale musimy uważać, żeby jej nie przekombinować.

**Sophia:** Zgadzam się. Middleware z CSP i security headers to rzadkość w zwykłych szablonach, to od razu pozycjonuje nas w segmencie premium (Enterprise-grade security dla małych firm). Ale widzę tu Framer Motion. Musimy ustalić twardy *Performance Budget*. Proponuję max 100KB JavaScriptu na start (initial load) i leniwe ładowanie (lazy loading) wszystkich ciężkich animacji i komponentów poniżej linii zanurzenia (below the fold).

**David:** Jasne. Użyjemy `next/dynamic` do ładowania cięższych interaktywnych wysp (Interactive Islands) tylko wtedy, gdy użytkownik do nich doscrolluje.

*(Bartosz, który do tej pory przeglądał kod źródłowy na telefonie, odzywa się nagle)*

**Bartosz:** Słuchajcie, skoro mamy już tak mocny backend (rate limiting, CSP, API routes), zróbmy z tego silnika coś więcej niż statyczną stronę. Każdy szablon ma nawigację na górze. Nuda. Dodajmy ukryty "God Mode" – Command Palette (CMD+K / CTRL+K). Niech użytkownik (lub klient) wciśnie skrót i dostanie wyszukiwarkę w stylu Spotlight z macOS. Może tam szukać artykułów na blogu, przechodzić do cennika, a nawet zmieniać motyw (Dark/Light). To krzyczy "Premium" i "Tech-Savvy".

**Victor:** CMD+K na landing page'u? To nietypowe, ale... genialne. Daje natychmiastowy efekt "wow" dla użytkowników technicznych i biznesowych, a dla jednego deva to kwestia wdrożenia biblioteki `cmdk` i podpięcia pod nasz routing. Zapisuję to.

**David:** A co z płynnością? Wspominałem wcześniej o View Transitions API. Next.js zaczyna to wspierać. Zróbmy płynne przejścia między podstronami (np. z `/` do `/blog`), żeby strona zachowywała się jak aplikacja natywna (SPA), ale z zachowaniem pełnego SEO i Server Components.

**Sophia:** O ile nie zepsuje to dostępności (a11y) i czytników ekranu, jestem za. Musimy tylko pamiętać o `prefers-reduced-motion`.

## Ustalenia i Wnioski (Decyzje Architektoniczne)

1. **Akceptacja obecnego Stacku:** Next.js, Tailwind, shadcn/ui, Framer Motion, MDX zostają. Są idealne dla 1 Senior Deva.
2. **Performance Budget:** Agresywne leniwe ładowanie (`next/dynamic`) dla komponentów poniżej linii zanurzenia.
3. **Feature Premium #1 (Command Palette):** Wdrażamy globalne menu CMD+K (`cmdk`) do nawigacji i akcji (np. zmiana motywu, wyszukiwanie w MDX).
4. **Feature Premium #2 (Płynne Przejścia):** Wykorzystanie View Transitions API dla efektu aplikacji natywnej bez utraty SEO.
