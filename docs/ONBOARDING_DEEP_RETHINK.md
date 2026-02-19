# Onboarding Deep Rethink — Zespół Specjalistów × 3 Spotkania

> **Data:** 2026-07-28  
> **Kontekst biznesowy:** Pracownicy sklepów Żabka — wysoki turnover, nizka biegłość techniczna (18-35 lat, zmęczeni wielozmianowością), systemy dopaminowe "wystrzelone" przez social media, 90%+ używa telefonu w trakcie zmiany.  
> **Cel:** Zaprojektować onboarding, który jest łatwy, przyjemny i budzi radość z nauki — zastępując szkolenie prowadzone przez właściciela.

---

## 👥 Skład Zespołu

### 1. Dr Ewa Nowak — Psycholog Behawioralny & Microlearning Architect
**Specjalizacja:** Projektowanie systemów uczenia dla osób o niskiej motywacji i krótkiej uwadze. 8 lat w corporate learning dla pracowników frontline (retail, gastro, logistyka). Autorka badań nt. "micro-dopamine loops" w edukacji mobilnej.  
**Dlaczego tu jest:** Rozumie, jak mózg zmęczonego kasjerka przetwarza informacje — wie, że tradycyjny tutorial to wróg retencji. Projektuje sekwencje uczenia oparte o nagrody zmienne (variable reward schedules) zamiast stałych.

### 2. Jakub Wiśniewski — Senior Mobile UX Designer (Low-Literacy & Accessibility)
**Specjalizacja:** Projektowanie interfejsów dla użytkowników o niskiej biegłości cyfrowej. Portfolio: onboarding dla InPost Paczkomat (kierowcy), Glovo (kurierzy), aplikacje bankowe dla 60+. Autor wytycznych "1-Thumb Rule" dla mobile-first z jedną ręką.  
**Dlaczego tu jest:** Wie, że 48px przyciski to dopiero początek. Projektuje flow, w których użytkownik *nie musi czytać* — ikonografia, animacje demonstracyjne, progresywne ujawnianie. Motto: "Jeśli muszę czytać instrukcję, to instrukcja jest zła."

### 3. Natalia Kowalczyk — Gamification Designer & Behavioral Economist
**Specjalizacja:** Systemy grywalizacji dla dojrzałych produktów SaaS. Wcześniej: Duolingo (localization PL), Habitica (growth), startup edtech w Polsce. Zna wszystkie pułapki naiwnej gamifikacji (badge fatigue, meaningless XP, leaderboard toxicity).  
**Dlaczego tu jest:** Obecny system gamifikacji (XP, odznaki, poziomy sklepu) to solidny fundament, ale potrzebuje kalibracji pod ekstremalnie krótkie sesje (2-3 minuty między klientami). Natalia wie, jak "skompresować" dopaminę w micro-interakcje.

### 4. Tomasz Zieliński — Content Strategist & Retail Operations Expert
**Specjalizacja:** 6 lat jako trener operacyjny w sieciach convenience (w tym 2 lata bezpośrednio w sieci Żabka jako area manager). Zna realia: co jest naprawdę trudne dla nowego pracownika, gdzie gubi się w systemie, kiedy dzwoni do właściciela bo "coś nie działa". Przeszedł na stronę contentu — teraz pisze onboardingi, które brzmią jak rozmowa z kolegą, nie jak instrukcja obsługi.  
**Dlaczego tu jest:** Jedyny w zespole, kto *naprawdę* stał za kasą i szkolił nowych. Wie, że "Rozliczanie godzin" to nie abstrakcja — to moment po 8h zmiany, kiedy chcesz iść do domu, a musisz jeszcze kliknąć 3 guziki.

### 5. Marta Lewandowska — Frontend Performance Engineer & Animation Specialist
**Specjalizacja:** Optymalizacja animacji na low-end Android (framer-motion, CSS animations, Lottie). Doświadczenie z PWA offline-first. Wie, ile kosztuje (w ms i KB) każdy `motion.div`, każdy `AnimatePresence`. Profiluje na Redmi Note 9 pro w 3G.  
**Dlaczego tu jest:** Onboarding musi być *błyskawiczny* na tanim Androidzie. Obecne animacje (spring transitions, layout animations) mogą lagować na urządzeniach, które pracownicy faktycznie mają. Marta zabezpieczy, żeby "radość z UX" nie zamieniła się w "frustracja z laga."

### 🌟 6. "Igor" — Nieszablonowy Geniusz
**Tożsamość:** Igor Przełomski — były game designer (CD Projekt RED, 11bit Studios), teraz prowadzi studio kreatywne robiące "anty-apki" — narzędzia, które celowo łamią konwencje UX żeby odkryć nowe wzory. Jego ostatni projekt: system szkoleniowy dla spawaczy, który wyglądał jak Tinder (swipe'uj poprawne szwy od wadliwych) — adopcja 94%.  
**Rola:** NIE jest stałym członkiem zespołu. Podrzuca nieszablonowe pomysły, prowokuje, kwestionuje założenia. Zespół analizuje jego pomysły i decyduje, czy pasują. Igor mówi: "A co gdybyśmy…?" — zespół odpowiada: "Tak, bo…" lub "Nie, ponieważ…"

---

---

# 📅 SPOTKANIE 1: Audyt & Diagnoza

**Temat:** Co *naprawdę* nie działa w obecnym onboardingu i dlaczego?  
**Facylitator:** Dr Ewa Nowak  
**Czas:** 90 minut

---

### 1.1 Otwarcie — Dr Ewa Nowak

> Zanim pokażę wam ekrany, chcę żebyśmy ustalili jedną rzecz: nasz użytkownik to nie jest osoba, która *chce* się czegoś nauczyć. To osoba, która *musi* — bo inaczej nie rozliczy zmiany, nie ustawi dostępności i zadzwoni do właściciela o 22:00. Motywacja jest czysto utylitarna. Każdy gram dodatkowego wysiłku poznawczego to moment, w którym użytkownik odpada.
>
> Mam tu dane z badań retail onboardingu: **73% pracowników frontline porzuca onboarding cyfrowy w ciągu pierwszych 3 minut jeśli nie widzi natychmiastowej wartości.** Czyli: jeśli po 3 minutach nie rozumie, po co to klika — zamyka i dzwoni do kogoś.

---

### 1.2 Audyt ekranów — Jakub Wiśniewski

**Jakub** *(dzieląc ekran z aktualnym /onboarding na iPhone 13 mini)*:

> Przeszedłem cały flow jako nowy pracownik. Oto moje ustalenia:

**Problem 1 — Zbyt wiele elementów widocznych jednocześnie (cognitive clutter)**
> Kiedy wchodzę na stronę, widzę jednocześnie:
> - Maskotkę żabki 🐸 z balonem mówienia
> - Przełącznik roli (Pracownik/Właściciel) 
> - Display poziomu sklepu (Kiosk → Supermarket)
> - Pasek XP
> - Odznaki (4 sztuki, szare)
> - Streak + procent postępu
> - A potem dopiero przygody
>
> Na iPhonie 13 mini muszę scrollować ~1.5 ekranu zanim w ogóle zobaczę pierwszą kartę przygody. Na Samsungu Galaxy A13 (budżetowy, 6.6") jest lepiej, ale wciąż — nad kartą przygód jest ~400px "dashboardu". Dla osoby, która otwiera to po raz pierwszy i nie ma żadnego postępu — te odznaki, XP, poziomy to szum. Jeszcze nic nie znaczą.

**Problem 2 — Karta przygody rozwija listę questów, ale nie nawiguje**
> Kiedy klikam w przygodę "Pierwsze Skoki", rozwija się lista 6 questów. Ale na small screen widzę może 2-3 questy. Żeby zobaczyć resztę, muszę scrollować w ramach strony. Na telefonie z wolnym procesorem, AnimatePresence + layout animation + 6 questów naraz = zauważalny hiccup (~300-400ms lag na Galaxy A13).

**Problem 3 — Quest rozwinięty = ściana tekstu**
> Kiedy rozwijam quest np. "Jak zainstalować AutoŻaba" — widzę: video (16:9, zajmuje ~60% ekranu), pod nim kroki (5 kroków z tipami, każdy 2-3 linie). To jest w sumie ~3 ekrany scrollowania w ramach jednego questa. A ten quest to najprostszy w onboardingu! Bardziej złożone questy (dostępność, rozliczanie) będą dłuższe.

**Problem 4 — Brak "co dalej?"**
> Kiedy kończę questa (klikam ✅) — dostaję checkmark i +100 XP. Fajnie. Ale co dalej? Nie ma automatycznej nawigacji do następnego questa. User musi: zwinąć questa → scrollować → znaleźć następnego → rozwinąć. 4 akcje zamiast 0. Powinno auto-przejść do następnego.

**Problem 5 — Video bez kontekstu**
> Video jest na górze questa, ale nie mówi "co tu zobaczysz" ani nie jest podzielone na chaptery/timestamps. Pracownik klika play, widzi 30-sekundowy filmik, i musi zapamiętać sekwencje, żeby zastosować je na swoim telefonie. Ale pamięć robocza po 8h zmiany? Minimalna.

---

### 1.3 Perspektywa z frontu — Tomasz Zieliński

**Tomasz** *(gestykuluje z frustracją nostalgiczną)*:

> Pracowałem z setkami nowych pracowników Żabki. Powiem wam jak wygląda realny scenariusz:
>
> **Dzień 1:** Właściciel mówi: "Tutaj masz link, przejdź sobie onboarding." Pracownik dostaje linka na WhatsAppie, otwiera na telefonie między rozładunkiem towaru. Ma 5 minut. Otwiera stronę, widzi żabkę, widzi 4 przygody, widzi "Przygoda 1: Pierwsze Skoki — 6 zadań". I myśli: "6 zadań!? Teraz?". Zamyka. Dzwoni do właściciela: "Pokaż mi jak się logować."
>
> **Problem nie jest w treści — problem jest w prezentacji objętości.** 13 questów to dobra liczba, ale pracownik NIE powinien widzieć, że jest ich 13. Powinien widzieć JEDEN. Teraz. Następny — kiedy skończy ten.

> **Drugie spostrzeżenie:** Nazewnictwo. "Przygoda", "Quest", "XP" — to brzmi gamingowo, ale nowy pracownik Żabki niekoniecznie jest graczem. Część z nich ma 40+ lat i "quest" kojarzy im się z niczym. Propozycja: rozważmy terminologię bliższą codziennej mowie. "Krok", "Zadanie", "Do zrobienia" zamiast "Quest". "Rozdział" zamiast "Przygoda". Albo zachowajmy gaming ale z wyjaśnieniem.

> **Trzecie spostrzeżenie:** Najbardziej stresujący moment to "Rozliczanie godzin". Nowy pracownik po pierwszej zmianie — jest zmęczony, chce iść do domu, a musi rozliczyć godziny w apce. Jeśli onboarding tego nie przećwiczył *emocjonalnie* (nie tylko proceduralnie) — to w tym momencie dzwoni do właściciela. Ćwiczenie = "Zobacz jak to będzie wyglądać kiedy skończysz zmianę. To 3 kliknięcia. Gotowe."

---

### 1.4 Analiza gamifikacji — Natalia Kowalczyk

**Natalia** *(otwiera spreadsheet z audytem obecnego systemu)*:

> System gamifikacji ma solidne fundamenty, ale jest zaprojektowany dla *zaangażowanego* użytkownika. Nasz użytkownik jest *przymuszony*. To fundamentalnie zmienia design:

| Element | Stan obecny | Problem | Ocena |
|---------|-------------|---------|-------|
| XP (100/quest) | Stale 100 za każdy quest | Brak różnicowania nagród. Prosty quest (logowanie) = tyle samo co złożony (rozliczanie). Brak poczucia "ten jest ważniejszy" | 🟡 |
| Poziomy sklepu | 5 poziomów (Kiosk→Imperium) | Metafora "sklepu" jest dobra, ale poziomy odblokowane numerem questów, nie ich jakością. User może skip'ować 5 questów i być na tak samo jak ktoś kto zrobił 5 najważniejszych | 🟠 |
| Odznaki | 4 odznaki (1 per przygodę) | Wyświetlane od razu jako szare/zablokowane. To "empty trophy case" antipattern — użytkownik widzi 4 rzeczy, których nie ma, zamiast jednej, którą może zdobyć | 🔴 |
| Streak | Dziennie | Streak zakłada, że user wraca codziennie. Pracownik Żabki pracuje zmianowo — może wrócić za 3 dni. Streak resetuje się → kara za rotacyjny grafik → demotywacja | 🔴 |
| Hidden achievements | 5 (night-owl, speedrunner, etc.) | Ciekawe, ale user nigdy się o nich nie dowie, bo nie ma mechanizmu discovery. Są invisible dopóki ich nie odblokujesz — zero "wiem że coś jest, szukam" anticipation | 🟡 |
| Progress ring | Procent globalny | Na początku (0-20%) ring jest prawie pusty → "dużo przede mną" feeling zamiast "blisko celu" | 🟠 |
| Confetti | Na 100% | Świetne! Ale za daleko. User który ma 30% nigdy tej gratyfikacji nie zobaczy. Potrzebujemy micro-celebrations po KAŻDEJ przygodzie, nie tylko na 100% | 🔴 |

> **Kluczowa metryka:** Czas do pierwszej nagrody (Time-To-First-Reward). Obecnie: użytkownik musi rozwinąć przygodę → rozwinąć questa → obejrzeć video → przejść 5 kroków → kliknąć "Ukończ" → wtedy dopiero +100 XP. To **minimum 2-3 minuty do pierwszej nagrody.** W mobile games TTFR to 15-30 sekund. My przegrywamy z TikTokiem o rząd wielkości.

---

### 1.5 Analiza techniczna — Marta Lewandowska

**Marta** *(pokazuje profil Lighthouse na Galaxy A13)*:

> Odpalałam /onboarding na moim testowym Galaxy A13 (Exynos 850, 4GB RAM, Android 13 Go). Wyniki:
>
> - **First Contentful Paint:** 1.8s (ok)
> - **Time to Interactive:** 3.4s (słabo — framer-motion bundle)
> - **Total Blocking Time:** 680ms (źle — AnimatePresence renders)
> - **Layout Shift:** 0.12 (głównie z powodu lazy-loaded video + spring animations)
>
> **Konkretne wąskie gardła:**
>
> 1. **framer-motion spring animations na layout** — każda karta przygody i każdy quest używa `layout` prop. Na Exynos 850 z 6 questami na ekranie → 6 layoutów przeliczanych na każde rozwinięcie. Widoczny jank.
>
> 2. **LazyVideo z IntersectionObserver** — dobre podejście, ale samo renderowanie `<video>` tag'a nawet bez play sprawia, że browser alokuje pamięć. 5-6 questów z video = ~50MB wideo w DOM (nawet nie załadowane, browser preloaduje metadata). Na 4GB RAM to odczuwalne.
>
> 3. **AnimatePresence umieszczony w wielu zagnieżdżeniach** — content.tsx AnimatePresence (role switch) → adventure-card AnimatePresence (subtitle hide) → quest-item AnimatePresence (description hide) → quest-item AnimatePresence (steps expand). To 4 warstwy AnimatePresence. framer-motion *nigdy* nie planował takiego zagnieżdżenia. Mogą być race conditions w unmount callbacks.
>
> 4. **localStorage serialization na każdy toggle** — `use-progress.ts` serializuje cały obiekt stanu do JSON na każdą zmianę. Przy 13 questach to nie problem, ale z hiddenAchievements + quizResults + streaks... na każdy klik checkbox → `JSON.stringify()` → `localStorage.setItem()`. Na wolnym CPU to ~15ms blocking per action.
>
> **Rekomendacja:** Rozważyć podejście "one quest at a time" nie tylko ze względu na UX, ale też na performance. Jeśli user widzi 1 quest naraz (nie 6) — eliminujemy 5/6 DOM nodes z ich animacjami. Radykalnie mniej pracy dla głównego wątku.

---

### 1.6 Wejście Igora — Prowokacja #1

**Igor** *(siedzi z nogami na stole, rysuje coś na tablecie)*:

> Słucham was od 40 minut i mam fundamental question: **dlaczego to w ogóle jest strona?**
>
> Pracownik dostaje linka na WhatsAppie. Otwiera przeglądarkę. Ładuje się Next.js app. Widzi żabki, XP, przygody. To jest *strona marketingowa* — ładna, pełna animacji, z gamifikacją. Ale pracownik nie szuka *doświadczenia* — szuka *odpowiedzi*.
>
> **A co gdybyśmy zrobili onboarding w formacie chat?**
>
> Nie chatbot — nie AI, nie LLM. Zwykły, skryptowany chat. Jak WhatsApp conversation. Użytkownik otwiera stronę i widzi:
>
> ```
> 🐸 Cześć! Jestem Żabek — Twój pomocnik w AutoŻaba.
> 🐸 Na start: zainstaluj aplikację. Android czy iPhone?
>    [Android]  [iPhone]
> ```
>
> User klika [Android]. Widzi:
>
> ```
> 🐸 Super! Oto link: [Pobierz z Google Play]
> 🐸 Zainstalowałeś? 
>    [Tak ✅]  [Nie, pomóż 🤔]
> ```
>
> **Zero scrollowania. Zero rozwijania kart. Zero cognitive load.** User odpowiada na proste pytania i dostaje dokładnie to, czego potrzebuje.  
>
> XP i gamifikacja? Wciąż tam jest — ale w tle. Po każdej odpowiedzi: "+50 XP" pop-up na 2 sekundy. Pasek postępu na górze chat window — nie ring, nie dashboard, po prostu zielony pasek który rośnie.
>
> Video? Zamiast osobnego ekranu — inline w chacie jako krótki GIF/animacja (5-8 sekund loop, nie 30-sekundowy film). User nie musi klikać play ani pauzować.
>
> To eliminuje *każdy* problem, który wymieniliście:
> - Cognitive clutter → zero (jeden balon na raz)
> - "6 questów widocznych jednocześnie" → zero (jeden komunikat na raz)
> - Performance → minimalny DOM  
> - Time-To-First-Reward → natychmiastowy (pierwsza odpowiedź = +XP)
> - "Co dalej?" → automatyczne (chat kontynuuje)
> - Mobile-first → native feel (każdy zna WhatsApp)

---

### 1.7 Reakcja zespołu na pomysł Igora

**Dr Ewa Nowak:**
> Igor trafił w sedno problemu z cognitive load. Format konwersacyjny to najniższy próg wejścia, jaki znam — badania UCLA 2023 pokazują 2.3x wyższy completion rate dla chat-based onboarding vs tutorial-based w kontekście frontline workers. ALE — tu potrzebuję random access. Pracownik po 2 tygodniach wraca i mówi: "Jak rozliczyć godziny?" W chacie musi przescrollować 40 balonów. Potrzebujemy *hybrydę*: onboarding = chat flow, referencja = cheat sheet (który już mamy!).

**Jakub Wiśniewski:**
> Chat to świetny mental model, ale mam 3 zastrzeżenia z UX perspective:
> 1. Chat implikuje *linearność*. Pracownik A chce zacząć od rozliczania (bo to go stresuje), pracownik B od dostępności. Flow musi mieć *wyjścia boczne* — "Pomiń na razie, wróć później".
> 2. Chat history sprawia, że strona rośnie w dół nieskończenie. Na powrót — user musi wiedzieć gdzie jest.
> 3. Jest risk "uncanny valley" — user myśli że rozmawia z botem i zaczyna pisać wolne pytania. Musimy jasno pokazać, że to skryptowana nauka, nie chatbot.

**Natalia Kowalczyk:**
> Z gamifikacji: chat skasowałby mi system odznak i poziomów w obecnej formie. ALE daje mi coś lepszego: **conversational rewards**. Żabek mówi: "Wow, 3 zadania z rzędu! 🔥 Streak!" — bezpośrednio w flow, nie w osobnym dashboardzie. Reward jest *kontekstowa* i *natychmiastowa*. To jest to, czego brakowało.

**Tomasz Zieliński:**
> Z operacyjnego punktu widzenia: chat format jest bliższy temu, jak pracownicy *naprawdę* się uczą — pytają kolegę na WhatsAppie. "Ej, jak rozliczyć godziny?" → kolega wysyła screenshota. Dokładnie to powinien robić Żabek. ALE: musimy zachować możliwość "przeskoczenia" do konkretnego tematu. W onboardingu tradycyjnym mogę kliknąć "Przygoda 3: Rozliczanie" i pominąć resztę. W chacie muszę przejść przez wszystko od początku.

**Marta Lewandowska:**
> Technicznie: chat to *dramatycznie* mniej DOM. Zamiast renderować 4 adventure cards z 13 questami + AnimatePresence na 4 poziomach — renderuję N balonów (max ~20 widocznych). Virtualized list eliminuje problem. Mogę zrezygnować z framer-motion layout animations na rzecz simple CSS transitions na balonach. **Performance win: szacuję 60-70% redukcji JS bundle i TBT.**

---

### 1.8 Synteza Spotkania 1 — Dr Ewa Nowak

> Mamy konsensus w diagnozie:
>
> **5 głównych problemów obecnego onboardingu:**
>
> 1. **Cognitive overload na starcie** — dashboard (XP, odznaki, poziom, streak, %) wyświetlany zanim user cokolwiek zrobił → szum, nie wartość
> 2. **"Ściana zadań"** — widok 4 przygód × questy sprawia wrażenie dużego wysiłku → user porzuca
> 3. **Brak natychmiastowej nagrody** — TTFR = 2-3 minuty zamiast 15-30 sekund
> 4. **Brak automatycznej nawigacji** — po ukończeniu questa user musi ręcznie nawigować do następnego
> 5. **Performance na low-end** — zagnieżdżone AnimatePresence + layout animations + preloaded videos = lag na budżetowych Androidach
>
> **Kierunek rozwiązania (do wypracowania na Spotkaniu 2):**
> - Hybrydowy model: **Chat Flow** (główny onboarding) + **Cheat Sheet** (referencja powrotna)
> - Progresywne ujawnianie — user widzi JEDNO zadanie/pytanie na raz
> - Gamifikacja inline — nagrody w flow konwersacji, nie w osobnym dashboardzie
> - Zachowanie nieliniowości — możliwość "przeskoczenia" do tematu
> - Radykalna redukcja animacji na rzecz performance
>
> **Otwarte pytania na Spotkanie 2:**
> - Jak zachować wybór roli (Pracownik/Właściciel) w modelu chat?
> - Jak obsłużyć "powrót" do konkretnego topiku?
> - Co z video — inline GIF/animacja vs osobny player?
> - Jak technicznie przejść z obecnej architektury na chat bez utraty istniejącego contentu?

---

---

# 📅 SPOTKANIE 2: Projektowanie Rozwiązania

**Temat:** Jak ma wyglądać i działać nowy onboarding?  
**Facylitator:** Jakub Wiśniewski  
**Czas:** 120 minut

---

### 2.1 Otwarcie — Jakub Wiśniewski

> Na podstawie Spotkania 1 mamy jasny kierunek: hybrydowy model Chat Flow + Cheat Sheet. Ale "chat" to szeroki termin. Dziś musimy ustalić *dokładnie* jak to wygląda, jak się zachowuje, i co jest pod spodem technicznie.
>
> Proponuję strukturę dyskusji:
> 1. Layout & wizual — co user widzi
> 2. Flow & logika — jak przebiega konwersacja
> 3. Gamifikacja 2.0 — jak nagradzamy w kontekście chatu
> 4. Technologia — jak to budujemy
> 5. Migracja — jak przechodzimy z obecnego systemu

---

### 2.2 Layout & Wizual — Jakub Wiśniewski

**Jakub** *(prezentuje wireframe na Figmie)*:

> **Layout — Mobile First (jedyny, który się liczy):**
>
> ```
> ┌─────────────────────────────┐
> │ ░░░░░░░░░░░░░░░░░░░░░░░░░░ │  ← Progress bar (thin, 4px, green)
> │ ☰  AutoŻaba Onboarding  📖 │  ← Header: hamburger + title + cheat sheet
> ├─────────────────────────────┤
> │                             │
> │  🐸 Cześć! Jestem Żabek.   │  ← Chat bubble (left-aligned)
> │                             │
> │  🐸 Zacznijmy od           │
> │  zainstalowania apki.       │
> │                             │
> │  🐸 Jaki masz telefon?      │
> │                             │
> │        ┌──────┐ ┌─────────┐ │
> │        │Andr. │ │ iPhone  │ │  ← Response buttons (right-aligned)
> │        └──────┘ └─────────┘ │
> │                             │
> │  ✨ +50 XP                  │  ← Inline reward (subtle, fades)
> │                             │
> └─────────────────────────────┘
> │  [💬 Wpisz wiadomość...]    │  ← Input field (optional, for search)
> └─────────────────────────────┘
> ```
>
> **Kluczowe decyzje wizualne:**
> 
> 1. **Progress bar na górze zamiast ring/dashboard** — cienki (4px), zawsze widoczny, rośnie od lewej do prawej. Zero tekstu, zero procentów. Użytkownik *czuje* postęp periferycznie, nie musi go interpretować.
>
> 2. **Żabek = avatar w chat bubble** — mały avatar 🐸 (32px) po lewej, balon mowy po prawej. Jak WhatsApp. Nie bouncing emoji — statyczny, wiarygodny.
>
> 3. **Odpowiedzi użytkownika = przyciski po prawej stronie** — NIE pole tekstowe, NIE dropdown. Duże pill-buttons (min 48px height) wyrównane do prawej. Jak w Messenger botach.
>
> 4. **Inline media** — zamiast osobnego video player'a, wyświetlamy w balonie Żabka:
>    - Krótki GIF/animowany screenshot (3-8 sekund, loop)
>    - Pod spodem: caption "Kliknij tu → tu → gotowe"
>    - Opcjonalnie: "Pokaż pełny filmik" (ekspanduje w balonie)
>
> 5. **Cheat Sheet 📖** — ikona w headerze. Kliknięcie otwiera obecny side panel. To jest "tryb referencji" — user wraca po tygodniu i nie chce przechodzić chatu, chce znaleźć "Jak rozliczyć godziny?"
>
> 6. **Role — brak wizualnego przełącznika w chacie.** Zamiast tego: Żabek pyta na starcie:
>    ```
>    🐸 Kim jesteś?
>       [👨‍💼 Właściciel/Manager]  [🧑‍🤝‍🧑 Pracownik]
>    ```
>    Wybór determinuje dalszą ścieżkę. Zapisany w localStorage. Przy powrocie — pamięta.

**Dr Ewa Nowak:**
> Podoba mi się — to jest *progresywne ujawnianie* w najczystszej formie. Ale dodam ważny element: **potwierdzenia sukcesu między krokami.** Nie tylko "+50 XP" — ale kontekstowy komunikat Żabka:
> - "Świetnie! Apka zainstalowana. To był najważniejszy krok — reszta jest łatwiejsza. 💪"
> - " Masz już dostępność ustawioną. Twój właściciel to widzi. Gotowe! 🎉"
>
> Badania Fogg'a (BJ Fogg, Stanford) mówią: *celebration* po mikro-akcji buduje nawyk. Nie XP — emocja. XP to metrika, Żabek "mówiący dobra robota" to emocja.

---

### 2.3 Flow & Logika — Dr Ewa Nowak + Tomasz Zieliński

**Dr Ewa Nowak:**

> Flow musi mieć strukturę "chapters" (odpowiednik obecnych przygód) ale user ich nie widzi jako listy. Widzi je jako naturalne przejścia w rozmowie:

> **Architektura flowu:**
>
> ```
> START
>   └── Kto jesteś? → [Pracownik] / [Właściciel]
>                         │
>           CHAPTER 1: Pierwsze Kroki
>                         │
>           ├── Instalacja apki
>           │     ├── Android / iPhone → instrukcja + GIF
>           │     └── "Mam" / "Problem" 
>           ├── Logowanie
>           │     ├── GIF: ekran logowania
>           │     └── "Zalogowałem się" / "Nie działa"
>           ├── Język (opcjonalny)
>           │     └── "Chcę zmienić" / "Polski OK"
>           └── Konto & Powiadomienia
>                 └── GIF: ustawienia → done
>                         │
>           🎉 CHAPTER 1 COMPLETE — badge + celebration
>                         │
>           CHAPTER 2: Twoja Dostępność
>                         │
>           ...i tak dalej
> ```

**Tomasz Zieliński:**

> Ważne z perspektywy operacyjnej: muszę dodać **"escape hatches"** — punkty, w których user może:
> 1. **Pominąć chapter** — "Wiem już jak to działa, przejdź dalej →"
> 2. **Wrócić do chapteru** — Menu hamburger z listą chapters i statusem (✅ / ⏳ / 🔒)
> 3. **Wybrać "Potrzebuję tego teraz!"** — np. pracownik w trakcie zmiany otwiera i potrzebuje NATYCHMIAST rozliczyć godziny. Chat powinien mieć ścieżkę szybkiego dostępu: "Czego potrzebujesz teraz?" → [Rozliczyć zmianę] → od razu kroki, zero wstępu.
>
> Ten punkt nr 3 to kluczowy insight: onboarding NIE zawsze jest liniowy. Pierwsza sesja — tak, prowadzi od A do D. Ale druga, trzecia sesja? User wraca z *konkretnym problemem*. Chat musi to obsługiwać.

**Jakub Wiśniewski:**
> Technicznie: menu hamburger z listą chapters to *map view*:
> ```
> ┌─────────────────────────┐
> │  📍 Twoja mapa          │
> ├─────────────────────────┤
> │  ✅ Pierwsze Kroki      │ ← ukończone
> │  ▶️ Twoja Dostępność    │ ← aktualny
> │  🔒 Rozliczanie Godzin  │ ← zablokowany
> │  🔒 Twój Harmonogram    │ ← zablokowany
> ├─────────────────────────┤
> │  ⚡ Szybka pomoc         │
> │      Rozlicz zmianę      │ ← shortcut
> │      Sprawdź grafik      │ ← shortcut
> └─────────────────────────┘
> ```
>
> Zablokowane chapters odblokują się sekwencyjnie (chapter 2 po ukończeniu 1) ALE: "Szybka pomoc" na dole jest zawsze dostępna. To bridge między onboardingiem a cheat sheetem.

**Natalia Kowalczyk:**
> Propozycja gamifikacyjna do flowu: zamiast blokowna chapters twardo, użyjmy **soft lock**. Zablokowany chapter ma mały tekst: "Ukończ [Pierwsze Kroki] żeby odblokować — lub [pomiń i otwórz]". Kliknięcie "pomiń" odblokuje ale nie da XP za skip. Daje wolność ale zachowuje incentive żeby robić po kolei.

**Dr Ewa Nowak:**
> Agree. Hard lock jest paternalistyczny. Soft lock daje autonomię + incentive. Ważne z psychologii: *reactance theory* — kiedy ludziom coś zabierasz (dostęp), reagują oporem. Kiedy dajesz wybór z incentive — współpracują.

---

### 2.4 Gamifikacja 2.0 — Natalia Kowalczyk

**Natalia** *(prezentuje nowy framework)*:

> Obecny system gamifikacji był "dashboard-centric" — user widzi statystyki w jednym miejscu. W chat-based modelu gamifikacja musi być **flow-centric** — nagrody i feedback dzieją się *w trakcie rozmowy*.

> **Nowy framework gamifikacji:**

> **A) Micro-rewards (po każdej odpowiedzi):**
> - "+50 XP" inline toast (subtle, 2s fade)
> - Feedback Żabka: "👍", "Świetnie!", "Łatwe, co?" 
> - Randomizacja komunikatu (zmienny wzmacniacz — Skinner schedule)
>
> **B) Chapter rewards (po ukończeniu chapteru):**
> - Pełnoekranowa animacja (mniejsza niż confetti, ale widoczna)
> - Badge z nazwą chapteru (okazuje się w pasku postępu)
> - Komunikat: "Rozdział 1 ukończony! Jesteś już [Odkrywcą 🔍]. Dalej?"
> - Czas trwania: 3-4 sekundy, auto-dismiss
>
> **C) Streakowa redefinicja:**
> - USUWAMY daily streak (nie pasuje do zmianowej pracy)
> - DODAJEMY **session streak** — ile chapter steps zrobiłeś bez zamknięcia
> - "🔥 3 z rzędu! Spread na fire!"
> - Streak resetuje się na zamknięcie strony, nie na nowy dzień
>
> **D) Level display — UPROSZCZENIE:**
> - Zamiast 5 poziomów (Kiosk → Imperium): **3 statusy wizualne** w progress barze
>   - 🟢 Początkujący (0-33%)
>   - 🟡 Ogarnięty (34-66%)  
>   - 🏆 Mistrz (67-100%)
> - Status widoczny jako label obok progress bara: "Ogarnięty 🟡 — 48%"
> - Po 100%: "Mistrz 🏆 — Wiesz wszystko!"
>
> **E) Odznaki — HIDE UNTIL EARNED:**
> - Usuwamy "empty trophy case" (szare odznaki na starcie)
> - Badge pojawia się DOPIERO gdy user go zdobywa — w chat flow
> - Zdobyte odznaki kolekcjonowane w "📖 Twoja karta" (dostępne z hamburgera)
>
> **F) XP scaling:**
> - Prosty krok (np. zmień język): 25 XP
> - Normalny krok (np. ustaw dostępność): 50 XP
> - Trudny krok (np. rozlicz godziny): 100 XP
> - Chapter completion bonus: 150 XP
> - To daje poczucie "ten krok był ważniejszy" i "chapter bonus czuję"

**Igor** *(wtrąca się)*:
> Natalia, a co jeśli XP to nie punkt count, a *postać* która rośnie? Zamiast "350 XP" → Żabek zaczyna jako mały 🐸 (32px) i z każdym chapteren rośnie fizycznie w chacie? Chapter 1 = 32px, Chapter 2 = 40px, Chapter 3 = 48px, Chapter 4 = 56px? User *widzi* jak jego żabek rośnie z nim? To jest visceral feedback — nie numer, a obiekt wizualny który się zmienia.

**Natalia:**
> To jest… naprawdę dobre. Visceral progression to concept z game designu — player character widocznie się zmienia. Ale tu jest subtlety: na telefonie różnica 32px vs 56px jest ledwo widoczna. Proponuję inaczej: Żabek nie rośnie w rozmiarze, ale w **wyglądzie**:
> - Start: prosty emoji 🐸
> - Po Chapter 1: 🐸 z małą koroną (SVG)
> - Po Chapter 2: 🐸 z koroną i peleryną
> - Po Chapter 3: 🐸 z koroną, peleryną i falującą flagą
> - Po Chapter 4 (100%): 🐸 ZŁOTY z animacją glow
>
> To jest "character progression arc" — user widzi, że Żabek *rośnie z nim*. Proste do zaimplementowania: 4-5 SVG wariantów. Nie 3D, nie Lottie — czysty SVG swap na avatarze w chacie.

**Dr Ewa Nowak:**
> Z psychologii: wizualna progresja postaci to silniejszy motywator niż numeryczny XP. Badania z Tamagotchi effect (Turkle, 2004): ludzie inwestują emocjonalnie w wizualną "istotę" nawet jeśli jest prymitywna. Żabek z koroną > "350 XP". Approve.

**Tomasz Zieliński:**
> Z perspektywy contentu: pracownik widzi że *jego* Żabek ma koronę, a kolegi nie (bo jeszcze nie przeszedł onboardingu). To jest social proof w pracy. "Ej, czemu twój żabek ma pelerynę?" → "Bo przeszedłem szkolenie, zajmuje 15 minut." → kolega też robi. Wiralny efekt.

---

### 2.5 Wejście Igora — Prowokacja #2

**Igor:**

> Macie świetny plan na onboarding. Ale brakuje mi jednego: **co się dzieje PO onboardingu?**
>
> User kończy 4 chapters, Żabek jest złoty, 100%. I co dalej? Strona jest martwa. User nie ma powodu wracać.
>
> **A co gdyby Żabek został "assist buddy"?** Po onboardingu Żabek nie znika — staje się *persistent widget* w głównej aplikacji AutoŻaba. Mały przycisk 🐸 w rogu ekranu. Klik → "Cześć! Czego szukasz?" z lista 3 najczęstszych pytań (na podstawie tego, co user robił ostatnio).
>
> Wiem, wiem — to wykracza poza scope strony marketingowej. Ale: **onboarding który kończy się na "gratuluję 100%" to onboarding który user zapomina w 2 dni.** Post-onboarding reinforcement to klucz do retencji wiedzy. Krzywa zapominania Ebbinghausa: po 24h zapamiętujemy 33%, po tygodniu 20%. Żabek musi *przypominać*.

**Tomasz Zieliński:**
> Igor — to jest super insight, ale wykracza poza nasz scope. My robimy stronę marketingową z onboardingiem SaaS. Persistent widget w apce AutoŻaba to product feature, nie marketing. JEDNAK: możemy zrobić jedno — po 100%: "Zainstaluj shortcut na pulpicie 📱 → szybki dostęp do Ściągi". To jest bridge: onboarding → referencja. User ma one-tap dostęp do cheat sheeta na telefonach bez otwierania przeglądarki i szukania strony.

**Dr Ewa Nowak:**
> Spaced repetition powinno być częścią flow, nie widget post-completion. Propozycja: po ukończeniu onboardingu, Żabek mówi: "Wrócę za 3 dni z szybkim quizem — 3 pytania, 1 minuta. Żeby upewnić się, że pamiętasz. 😉" User dostaje push notification (jeśli PWA) lub reminder email. Quiz = odświeżenie. To mieści się w naszym scope (to wciąż strona onboardingowa).

**Jakub Wiśniewski:**
> Push notification z PWA → service worker. Marta, jest to wykonalne?

**Marta Lewandowska:**
> Tak, ale wymagałoby service worker + web push API + user opt-in. W obecnym stack (Next.js, hosted na Replit) jest to możliwe, ale wymaga backend'u na push subscription storage. To duży scope. Alternatywa: przy zamykaniu strony (beforeunload) → "Dodaj do ekranu głównego" prompt + bookmark suggestion. Prostsze, zero backendu.

**Natalia Kowalczyk:**
> Kompromis: zostawiamy post-onboarding reinforcement jako **Phase 2 feature**. W Phase 1 focus = chat flow onboarding. Po 100%: Żabek zachęca do dodania na pulpit + otwiera Cheat Sheet. Phase 2: quiz reminders, spaced repetition.

**Konsensus:** ✅ Tak. Post-100% = Cheat Sheet + Add to Home Screen prompt. Spaced repetition = Phase 2.

---

### 2.6 Obsługa "powrotu" — Tomasz Zieliński + Jakub Wiśniewski

**Tomasz:**

> Mamy 3 scenariusze powrotu:
>
> **Scenariusz A: User wraca na następny dzień, onboarding w trakcie**
> - Żabek: "Witaj z powrotem! Byliśmy w [Twoja Dostępność]. Kontynuujemy? [Tak ▶️] [Od początku 🔄] [Mapa 📍]"
> - Chat scrolluje do miejsca, gdzie user skończył
> - Poprzednie wiadomości widoczne ale "collapsed" — last 2-3 messages visible, reszta za "Pokaż wcześniejsze"
>
> **Scenariusz B: User wraca po ukończeniu, potrzebuje pomocy**
> - Żabek: "Cześć, Mistrzu! 🏆 Wszystko ukończone. Czego szukasz?"
> - Automatycznie otwiera Cheat Sheet mode (lub "Szybka pomoc" shortcuts)
>
> **Scenariusz C: User wraca w trakcie, ale potrzebuje jednego konkretnego tematu**
> - Hamburger → Mapa → "⚡ Szybka pomoc" → [Rozlicz zmianę] → Żabek przeskakuje do mini-flow rozliczania (3 balonów, bez wstępu)
>
> W każdym scenariuszu: **postęp jest zachowany**. Chat history w localStorage (ale trimmed — max last 50 messages, reszta w compact form).

**Jakub:**
> Wizual powrotu — Scenariusz A:
> ```
> ┌─────────────────────────────┐
> │ ████████░░░░░░░░░░░░░░░░░░ │  ← Progress 35%
> │ ☰  AutoŻaba Onboarding  📖 │
> ├─────────────────────────────┤
> │                             │
> │  🐸👑 Witaj z powrotem!     │  ← Crown Żabek (chapter 1 done)
> │                             │
> │  🐸 Ostatnim razem          │
> │  ustawiłeś dostępność.      │
> │  Zostały 2 kroki w tym      │
> │  rozdziale.                 │
> │                             │
> │  ┌───────────────────────┐  │
> │  │ ▶️ Kontynuuj          │  │
> │  └───────────────────────┘  │
> │  ┌───────────────────────┐  │
> │  │ 📍 Mapa rozdziałów    │  │
> │  └───────────────────────┘  │
> │  ┌───────────────────────┐  │
> │  │ ⚡ Szybka pomoc        │  │
> │  └───────────────────────┘  │
> │                             │
> └─────────────────────────────┘
> ```

---

### 2.7 Struktura danych — Marta Lewandowska

**Marta:**

> Muszę zaprojektować model danych, który:
> 1. Obsłuży chat flow (sekwencyjne wiadomości z decyzjami)
> 2. Zachowa kompatybilność z istniejącym contentem (steps, media, tips)
> 3. Pozwoli na nieliniowość (skip, jump to chapter)
> 4. Będzie lekki w localStorage
>
> Propozycja modelu:

```typescript
// Wiadomość w chacie
interface ChatMessage {
  id: string;
  sender: 'zabek' | 'user' | 'system';
  type: 'text' | 'media' | 'buttons' | 'reward' | 'celebration';
  content: string;
  media?: {
    type: 'gif' | 'image' | 'video';
    src: string;
    alt: string;
    caption?: string;
  };
  buttons?: ChatButton[];
  reward?: { xp: number; message: string };
  delay?: number; // ms before showing (typing effect)
}

// Przycisk odpowiedzi
interface ChatButton {
  label: string;
  icon?: string;
  action: 'next' | 'skip' | 'branch' | 'complete' | 'link';
  target?: string; // next step id, branch id, or URL
  xpReward?: number;
}

// Krok w chacie (odpowiednik jednego questa)
interface ChatStep {
  id: string;
  chapterId: string;
  messages: ChatMessage[]; // sekwencja balonów dla tego stepu
  xpTotal: number; // suma XP za wszystkie akcje w stepie
  isOptional?: boolean;
  deepLink?: string; // link do apki
}

// Rozdział (odpowiednik przygody)
interface ChatChapter {
  id: string;
  title: string;
  icon: string;
  badge: { name: string; icon: string };
  steps: ChatStep[];
  celebrationMessage: string;
  zabekEvolution: 'basic' | 'crown' | 'cape' | 'flag' | 'golden';
}

// Stan w localStorage
interface ChatProgress {
  role: 'employee' | 'owner';
  currentChapterId: string;
  currentStepId: string;
  completedSteps: string[];
  completedChapters: string[];
  totalXP: number;
  sessionStreak: number;
  badges: string[];
  zabekLevel: number; // 0-4
  lastVisit: string; // ISO date
  chatHistory: CompactMessage[]; // trimmed, max 50
}

// Kompakt do localStorage (mniejszy footprint)
interface CompactMessage {
  id: string;
  s: 'z' | 'u' | 's'; // sender shorthand
  c: string; // content
  t: number; // timestamp
}
```

> **Migracja z istniejącego contentu:**
> - Obecne `Quest.steps[]` → mapują się na `ChatMessage[]` (jeden krok = jeden balon)
> - Obecne `Quest.media` → mapuje się na `ChatMessage` z type='media'
> - Obecne `Quest.tips[]` → wplatane jako baloniki Żabka z emoji 💡
> - Obecne `Adventure` → `ChatChapter` z badge
>
> Istniejący plik `onboarding-employee.ts` (340 linii) staje się źródłem, ale content jest re-strukturyzowany do nowego formatu. Stary format pozostaje dla trybu Właściciela (faza 2 migracji).

---

### 2.8 Wejście Igora — Prowokacja #3

**Igor:**

> Team, mam jeszcze jedno. Mówicie o GIFach zamiast video. Ale co jeśli zamiast prerecorded media — **Żabek rysuje live?**
>
> Wyobraźcie sobie: Żabek mówi "Kliknij tu" i w balonie pojawia się *animowany screenshot* — statyczny obraz ekranu apki, a na nim pojawia się animated cursor/pointer (SVG) który *klika* w odpowiednie miejsce. Highlight flash. Pointer przesuwa się na następny element. Klik. Highlight. Done.
>
> Nie video, nie GIF — **CSS animation na statycznym obrazie.** Zero decodowania video, zero ładowania GIF (który waży 2-5MB). Statyczny PNG (~50KB) + CSS keyframes (~2KB) = ta sama informacja, 98% mniejszy payload. I działa offline (cache'owalny).
>
> Bazowałem na tym co Stripe robi w swoich docsach — interactive code walkthroughs. Tyle że prostsze.

**Marta Lewandowska:**
> 🤯 To jest genialne z performance perspective. PNG + CSS animation to dosłownie zero JS. Mogę je cache'ować w service worker, rendering nie wymaga JS thread. Na Galaxy A13 to będzie instant. ALE: wymaga więcej pracy niż nagranie ekranu. Każda animacja to custom CSS. Propozycja kompromisowa:
> - **Phase 1:** Używamy statycznych screenshotów z obrysowanymi elementami (strzałki, kółka, numery) — zero animacji, ale zero laga
> - **Phase 1.5:** Dodajemy CSS pointer animation na najważniejszych krokach (logowanie, rozliczanie — te, gdzie user się gubi)
> - Odrzucamy video/GIF dla wersji pracowniczej. Video zostaje dla Właściciela (tam UX jest mniej krytyczny)

**Jakub:**
> Z UX: static screenshot z annotacjami to sprawdzony pattern (Notion onboarding, Linear onboarding). Dodajmy numbering na screenshotach: ① tutaj klik, ② tu wpisz, ③ zatwierdź. Powiązane z krokami w tekście. Prosty visual-text link.

**Konsensus:** ✅ Static screenshots z annotacjami (Phase 1) + CSS pointer animations (Phase 1.5). Video/GIF odrzucone dla wersji pracowniczej.

---

### 2.9 Synteza Spotkania 2 — Jakub Wiśniewski

> **Zaprojektowaliśmy następujący system:**
>
> **A) Format: Chat flow (Żabek rozmawia z userem)**
> - Progresywne ujawnianie — 1 wiadomość / 1 pytanie na raz
> - Odpowiedzi via pill buttons, nie tekst
> - Inline media: annotated screenshots (strzałki + numery)
> - Inline rewards: XP toasty + Żabek komentarze
>
> **B) Nawigacja:**
> - Progress bar (4px, top, always visible)
> - Hamburger → Map view (chapters + status + quick help shortcuts)
> - Cheat Sheet (📖) — istniejący side panel, dostępny zawsze
> - Powrót = resume point + map + quick help
>
> **C) Gamifikacja 2.0:**
> - Micro-rewards per action (25/50/100 XP scaled by difficulty)
> - Chapter completion celebrations (3-4s animation + badge)
> - Session streak (not daily) — "🔥 X z rzędu!"
> - Żabek evolution: emoji → crown → cape → flag → golden (per chapter)
> - Badges: hidden until earned, kolekcjonowane w "Twoja karta"
> - 3 statusy: Początkujący → Ogarnięty → Mistrz
>
> **D) Role:**
> - Żabek pyta na starcie (nie toggle)
> - Pracownik = chat flow (4 chapters, ~13 steps)
> - Właściciel = obecny adventure/quest format (brak zmian — Phase 2 migracja)
>
> **E) Post-100%:**
> - Cheat Sheet jako referencja stała
> - "Dodaj na pulpit" prompt
> - Spaced repetition quiz → Phase 2
>
> **F) Media strategy:**
> - Annotated static screenshots (PNG + arrows + numbers)
> - CSS pointer animations na kluczowych krokach (Phase 1.5)
> - Zero video/GIF w wersji pracowniczej
>
> **G) Dane:**
> - Nowy model: ChatMessage → ChatStep → ChatChapter
> - Migracja z istniejącego onboarding-employee.ts
> - localStorage: ChatProgress (compact, <5KB)

---

---

# 📅 SPOTKANIE 3: Plan Implementacji

**Temat:** Jak to budujemy? W jakiej kolejności? Jakie są ryzyka?  
**Facylitator:** Marta Lewandowska  
**Czas:** 90 minut

---

### 3.1 Otwarcie — Marta Lewandowska

> Mamy design. Teraz budujemy. Proponuję podzielić implementację na fazy, z clear deliverables per fazę. Każda faza musi być *deployable* — zero "jeszcze nie działa, poczekaj na fazę 3". Każdy merge do main = działająca strona.

---

### 3.2 Faza 1A: Fundament (3-4 dni robocze)

**Marta:**

> **Scope:**
> 1. **Data model** — nowe pliki TypeScript:
>    - `src/lib/onboarding/chat-types.ts` — interfejsy (ChatMessage, ChatStep, ChatChapter, ChatProgress, etc.)
>    - `src/lib/onboarding/chat-employee-content.ts` — content pracownika w nowym formacie (migracja z onboarding-employee.ts)
>    - `src/lib/onboarding/use-chat-progress.ts` — hook do zarządzania stanem chat flow
>
> 2. **Core chat component**:
>    - `src/components/features/onboarding/chat-flow.tsx` — główny kontener chatu
>    - `src/components/features/onboarding/chat-bubble.tsx` — balon wiadomości (Żabek/user/system)
>    - `src/components/features/onboarding/chat-buttons.tsx` — pill buttons odpowiedzi
>
> 3. **Integration**:
>    - `content.tsx` — modyfikacja: rola "Pracownik" → ChatFlow, rola "Właściciel" → stary AdventureCard system
>    - Progress bar na górze zamiast dashboard (dla pracownika)

**Jakub:**
> UI specs dla chat-bubble:
> - Żabek bubble: bg-white dark:bg-slate-800, border-l-4 border-brand-green, roundd-tr-xl rounded-br-xl rounded-bl-xl (left-aligned, WhatsApp style)
> - User bubble: bg-brand-green text-white, rounded-tl-xl rounded-bl-xl rounded-br-xl (right-aligned)
> - System bubble (rewards): bg-amber-50 dark:bg-amber-900/20, border border-amber-200, centered, small text
> - Max-width: 85vw (mobile), 65% (desktop)
> - Font: system default, 15px (nie 14, nie 16 — sweet spot czytelności na mobile)
> - Typing indicator: 3 animated dots (pure CSS, no JS) before each Żabek message, delay 300-600ms

**Dr Ewa Nowak:**
> Content migration rules:
> - Obecny `Quest.steps[].instruction` → ChatMessage.content (1 step = 1 bubble)
> - Obecny `Quest.steps[].tip` → osobny ChatMessage z "💡" prefix (typ = tip, stylowanie delikatniejsze)
> - Obecny `Quest.description` → intro message od Żabka na start stepu
> - Obecny `Quest.quickAnswer` → "TL;DR" button alternativa w map view
> - Obecny `QuestMedia`/`QuestMediaVariant` → ChatMessage type='media' z annotated screenshot (Phase 1: placeholder, Phase 1.5: actual screenshots)

**Natalia:**
> Gamification in Phase 1A: XP system only (toast after action, running total in progress bar hover). Badges, evolution, celebrate — Phase 1B.

---

### 3.3 Faza 1B: Gamifikacja & Polish (2-3 dni)

**Natalia** *(szczegóły implementacji gamifikacji)*:

> **Scope:**
> 1. **Żabek evolution** — 5 SVG wariantów avatara:
>    - Level 0: prosty żabek (flat, green, smiling)
>    - Level 1: żabek + mała korona (po Chapter 1)
>    - Level 2: żabek + korona + peleryna (po Chapter 2)
>    - Level 3: żabek + korona + peleryna + flaga (po Chapter 3)
>    - Level 4: złoty żabek z glow (po Chapter 4 / 100%)
>    - Transition: crossfade 500ms przy zmianie poziomu
>
> 2. **Chapter celebration** — fullscreen overlay:
>    - Background: radial gradient (brand-green → transparent)
>    - Evolved Żabek SVG centered, scale-in animation
>    - Badge appears below with name
>    - "Rozdział [X] ukończony!" text
>    - Auto-dismiss 4s lub tap to continue
>    - Sound: opcjonalnie (user preference), subtle "ding" (Web Audio API, <1KB inline)
>
> 3. **Session streak** — counter in chat:
>    - After 3 consecutive answers: "🔥 3 z rzędu!" system bubble
>    - After 5: "🔥🔥 5 z rzędu! Maszyna!"
>    - After 10: "🔥🔥🔥 10! Niezłomny Wojownik!"
>    - Reset on page reload (session only)
>
> 4. **Badge collection** — "Twoja karta" accessible from hamburger menu:
>    - Grid of earned badges (circle SVGs)
>    - Unearned = not visible (no grey placeholders)
>    - Simple, clean, no animations needed

**Marta:**
> Tech zmiana: Phase 1B musi też include'ować:
> - **Reduced motion support** — `prefers-reduced-motion` media query. Wszystkie animacje (typing dots, celebrations, evolution crossfade) są wyłączone jeśli user ma reduced motion w systemie.
> - **Accessibility audit** — ARIA roles na chat (role="log", aria-live="polite" na balonach), button labeling, focus management.

---

### 3.4 Faza 1C: Map View & Return Flow (2 dni)

**Jakub:**

> **Scope:**
> 1. **Hamburger menu** → slide-in panel (left, reuse CheatSheet pattern from right):
>    - Map view (chapters + status)
>    - Quick help shortcuts
>    - "Twoja karta" (badges)
>    - Reset button (z confirmation dialog)
>
> 2. **Return logic** in `use-chat-progress.ts`:
>    - On load: check `lastVisit` + `currentStepId`
>    - If returning user: show "Witaj z powrotem" sequence
>    - Trim chat history > 50 messages (keep compact form)
>    - Resume at last incomplete step
>
> 3. **Quick help shortcuts**:
>    - "Rozlicz zmianę" → mini-flow (3 messages, context-free)
>    - "Sprawdź grafik" → mini-flow (2 messages)
>    - These are SEPARATE from main flow — self-contained, no prerequisites

**Dr Ewa Nowak:**
> Return flow messaging is critical. The tone must be warm but not annoying:
> - Po < 24h: "Cześć! Wracamy do [topic]."
> - Po 1-7 dni: "Dawno Cię nie było! Zostawiliśmy zakładkę w [topic]."
> - Po > 7 dni: "Witaj ponownie! Twój postęp jest zapisany — [X]% ukończone."
> - NIGDY: "Tęskniliśmy!" (cringe), "Gdzie byłeś?" (guilt trip)

---

### 3.5 Faza 1.5: Annotated Screenshots (2-3 dni, równolegle z dev)

**Tomasz + Jakub** *(content + design collaboration)*:

> **Scope:** Stworzenie annotated screenshots dla wszystkich 13 steps:
>
> **Production pipeline:**
> 1. Tomek robi screenshot w apce AutoŻaba (faktyczny ekran, nie mockup)
> 2. Jakub dodaje annotations w Figmie:
>    - Red circles (① ② ③) na elementach do kliknięcia
>    - Strzałki wskazujące kierunek
>    - Obwódka vignette (ciemnienie krawędzi, focus na centrum)
>    - Text labels PL (krótkie, 2-3 słowa)
> 3. Eksport: PNG, max 750px wide (mobile optimized), ~30-80KB each
> 4. Naming convention: `onb-emp-[chapter]-[step].png` (np. `onb-emp-a1-login.png`)
> 5. Umieszczenie: `/public/images/onboarding/`
>
> **Phase 1.5 CSS pointer animations (top 3 most complex steps only):**
> - `emp-c1` (rozlicz godziny) — pointer clicks "Rozliczenie" tab → clicks employee name → clicks "Zatwierdź"
> - `emp-b1` (ustaw dostępność) — pointer navigates calendar → taps day → selects status
> - `emp-a1` (instalacja PWA) — pointer taps "Share" → "Add to Home Screen" → "Add"
>
> Implementation: CSS `@keyframes` on absolutely positioned pseudo-element over `<img>`. No JS.

---

### 3.6 Ryzyka i Mitygacje — cały zespół

**Marta:**

| Ryzyko | Prawdopodobieństwo | Impact | Mitygacja |
|--------|-------------------|--------|-----------|
| Chat format = duży redesign = regression w owner view | Średnie | Wysoki | Owner view NIE jest ruszany. Pracownik = ChatFlow, Owner = stary system. Osobne ścieżki renders w content.tsx |
| Annotated screenshots się dezaktualizują gdy apka się zmieni | Wysokie | Średni | Naming convention + centralized image map. Zmiana screenshot = 1 file swap, zero code changes |
| localStorage > 5MB na starych telefonach | Niskie | Wysoki | CompactMessage format. 50 msg limit. Szacunkowy rozmiar: ~2-3KB. Bezpieczny margines |
| User confusion: "to żywy chat? mogę pisać?" | Średnie | Średni | Input field *domyślnie ukryty*. Tylko pill buttons. Brak sugestii "wpisz wiadomość". Jasny visual language |
| SVG Żabek avatary — quality, consistency | Niskie | Niski | 5 prostych SVG, flat design, brand-green palette. Zlecić jednej osobie for consistency |
| CSS animations not supported on old WebView | Niskie | Niski | Graceful degradation: brak animacji = statyczny screenshot. Działa |
| Owner role migration (Phase 2) complexity | Wysokie | Średni | Udokumentowany format + migration script template. Phase 2 scope jasno zdefiniowany |

**Igor** *(ostatni głos)*:
> Jedno jeszcze. Testujcie to na prawdziwych pracownikach Żabki. Nie na designerach, nie na devach — na 18-letnim kasjerze po 8-godzinnej zmianie. Dajcie mu telefon, dajcie linka, i *nie mówcie nic*. Patrzcie czy sam przejdzie Chapter 1 bez pytania "co mam kliknąć?". Jeśli pyta — coś jest nie tak. Jeśli przechodzi i uśmiecha się — wygraliście.

**Dr Ewa Nowak:**
> To się nazywa "5-second usability test" — i Igor ma rację. Proponuję: po Phase 1A (chat flow działa), robimy test z 3-5 pracownikami Żabki. Przed Phase 1B. Feedback z real users wpłynie na gamification design (może XP wkurzają? może chcą mniej balonów? nie wiemy dopóki nie zapytamy).

**Konsensus:** ✅ User testing po Phase 1A, przed Phase 1B.

---

### 3.7 Timeline & Deliverables — Marta Lewandowska

```
Phase 1A: Fundament (3-4 dni)
├── chat-types.ts
├── chat-employee-content.ts  
├── use-chat-progress.ts
├── chat-flow.tsx + chat-bubble.tsx + chat-buttons.tsx
├── content.tsx modification (role → chat vs adventure)
├── Progress bar component
└── ✅ DELIVERABLE: Działa chat flow dla Pracownika, tekst only, XP toast

     ↓ USER TESTING (1-2 dni) ← 3-5 pracowników Żabki

Phase 1B: Gamifikacja & Polish (2-3 dni)
├── Żabek SVG evolution (5 wariantów)
├── Chapter celebration overlay
├── Session streak system
├── Badge collection ("Twoja karta")
├── Reduced motion & accessibility
└── ✅ DELIVERABLE: Pełna gamifikacja, testy a11y

Phase 1C: Map View & Return (2 dni)
├── Hamburger menu + chapter map
├── Return flow logic
├── Quick help shortcuts
├── Chat history management (trim > 50)
└── ✅ DELIVERABLE: Nawigacja, powroty, szybka pomoc

Phase 1.5: Annotated Screenshots (2-3 dni, równolegle)
├── 13 annotated screenshots (Figma → PNG)
├── 3 CSS pointer animations (top complex steps)
├── Image optimization + caching
└── ✅ DELIVERABLE: Visual instructions w balonach

Phase 2 (PRZYSZŁOŚĆ):
├── Owner role migration do chat formatu
├── Spaced repetition quizy
├── Push notifications (PWA)
├── CSS pointer animations for all steps
└── Advanced analytics (completion rates, drop-off points)
```

> **Total Phase 1 (all sub-phases):** ~10-12 dni roboczych  
> **Phase 1 z screenshotami (parallel):** ~8-10 dni (screenshots run parallel to 1B/1C)

---

### 3.8 Zamknięcie — Dr Ewa Nowak

> Podsumowanie trzech spotkań:
>
> **Spotkanie 1** — zdiagnozowaliśmy 5 głównych problemów: cognitive overload, ściana zadań, wolne nagrody, brak auto-nawigacji, performance lag.
>
> **Spotkanie 2** — zaprojektowaliśmy rozwiązanie: chat flow z Żabkiem, progresywne ujawnianie, inline gamifikacja, annotated screenshots, map view do nawigacji, i Żabek evolution jako visceral progression.
>
> **Spotkanie 3** — zaplanowaliśmy implementację w 4 fazach (1A→1B→1C→1.5), z user testingiem po Phase 1A, i jasno zdefiniowaliśmy Phase 2 scope.
>
> Kluczowy insight Igora który zmienił wszystko: **"Dlaczego to jest strona? Zróbmy to jako chat."** — to przeformułowało cały problem z "jak uprościć tutorial" na "jak prowadzić rozmowę."
>
> Ten team dostarczył:
> - Psychologicznie uzasadniony model uczenia (micro-dopamine, variable rewards, reactance avoidance)
> - Technicznie wykonalną architekturę (minimal DOM, CSS > JS, compact localStorage)
> - Operacyjnie zwalidowany content (Tomasz wie, co pracownik naprawdę potrzebuje)
> - Gamifikację kalibrowaną pod krótkie sesje (session streak > daily, evolution > XP number)
> - Performance-first media strategy (annotated PNG > video/GIF)
>
> **Gotowi do budowania.** 🐸

---

## ✅ Decyzje finalne — Wszystkie 3 spotkania

| # | Decyzja | Uzasadnienie | Status |
|---|---------|-------------|--------|
| 1 | Chat flow zamiast adventure cards (dla pracownika) | Eliminuje cognitive overload, 2.3x wyższy completion rate w badaniach | ✅ |
| 2 | Progresywne ujawnianie (1 balon na raz) | Zero scrollowania, zero "ściany zadań" | ✅ |
| 3 | Pill buttons zamiast input text | Eliminuje "uncanny valley" chatbota + szybsze | ✅ |
| 4 | Annotated screenshots zamiast video | 98% mniejszy payload, works offline, zero lag | ✅ |
| 5 | CSS pointer animations (Phase 1.5, top 3 steps) | Interactive demo bez JS overhead | ✅ |
| 6 | Żabek evolution (emoji → crown → cape → flag → golden) | Visceral progression > numeric XP. Tamagotchi effect | ✅ |
| 7 | Session streak zamiast daily streak | Zmianowa praca ≠ daily cadence. Brak kary za przerwy | ✅ |
| 8 | Soft lock chapters (odblokuj lub pomiń) | Autonomia + incentive > paternalizm (reactance theory) | ✅ |
| 9 | XP skalowane (25/50/100 per difficulty + 150 chapter bonus) | Poczucie "ten krok jest ważniejszy" | ✅ |
| 10 | Badges hidden until earned | Eliminacja "empty trophy case" antipattern | ✅ |
| 11 | 3 statusy: Początkujący → Ogarnięty → Mistrz | Prostsze niż 5 poziomów sklepu, bardziej intuicyjne | ✅ |
| 12 | Map view w hamburgerze + Quick Help shortcuts | Nieliniowość + szybki dostęp do krytycznych akcji | ✅ |
| 13 | Return flow z kontekstowym Żabkiem | Warm tone, no guilt, resume point | ✅ |
| 14 | Owner view = bez zmian (Phase 2 migracja) | Zero regresji, focus na pracowniku | ✅ |
| 15 | User testing po Phase 1A przed Phase 1B | Real feedback przed gamification design | ✅ |
| 16 | Post-100%: Cheat Sheet + Add to Home Screen | Bridge onboarding → referencja | ✅ |
| 17 | Spaced repetition = Phase 2 | Wymaga backendu (push), za duży scope na Phase 1 | ✅ Phase 2 |
| 18 | Input field domyślnie ukryty | Zapobiega myleniu ze skryptowanym chatem | ✅ |
| 19 | No video/GIF w wersji pracowniczej | Performance first na low-end Android | ✅ |
| 20 | CompactMessage (max 50) w localStorage | <5KB footprint, bezpieczny na starych telefonach | ✅ |

---

*Dokument wygenerowany po 3 spotkaniach zespołu specjalistów. Gotowy do implementacji Phase 1A.*
