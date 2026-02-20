/**
 * Onboarding content for the EMPLOYEE role.
 * 4 Adventures, 13 Quests — focused on day-to-day tasks a store employee needs.
 * No quizzes — less pressure, friendlier onboarding.
 *
 * Reuses interfaces from onboarding-content.ts.
 * Quest IDs use the `emp-` prefix to avoid collisions with the owner curriculum.
 */

import type { Adventure } from './onboarding-content';

export const EMPLOYEE_ADVENTURES: Adventure[] = [
    // ─── A) Pierwsze Skoki ────────────────────────────────────────────
    {
        id: 'emp-pierwsze-skoki',
        number: 1,
        title: 'Pierwsze Skoki',
        subtitle: 'Zainstaluj aplikację i poznaj podstawy',
        icon: '🐣',
        badge: {
            id: 'emp-badge-start',
            name: 'Pierwszy Skok',
            icon: '🐣',
        },
        quests: [
            // 0 — auto-complete welcome
            {
                id: 'emp-a0-witaj',
                title: 'Witaj w Przygodzie!',
                description: 'Właśnie zaczynasz onboarding. Spokojnie — krok po kroku!',
                timeEstimate: 0,
                keywords: ['start', 'początek', 'witaj'],
                quickAnswer: 'Jesteś tutaj — to już sukces! 🎉',
                difficulty: 1,
                autoComplete: true,
                canSkip: false,
            },
            // 1 — Instalacja PWA
            {
                id: 'emp-a1-instalacja',
                title: 'Instalacja aplikacji',
                description: 'Zainstaluj aplikację na swoim telefonie, aby mieć do niej szybki dostęp.',
                timeEstimate: 3,
                keywords: ['instalacja', 'aplikacja', 'telefon', 'pwa', 'android', 'ios'],
                quickAnswer: 'Otwórz adres aplikacji w przeglądarce telefonu → „⋮" → „Dodaj do ekranu głównego".',
                difficulty: 1,
                mediaVariants: [
                    {
                        id: 'android',
                        label: 'Android (Chrome)',
                        media: {
                            type: 'video',
                            src: '/images/onboarding/a2_pwa.mp4',
                            alt: 'Instalacja aplikacji na Android',
                        },
                    },
                    {
                        id: 'ios',
                        label: 'iOS (Safari)',
                        media: {
                            type: 'video',
                            src: '/images/onboarding/a2_pwa.mp4',
                            alt: 'Instalacja aplikacji na iOS',
                        },
                    },
                ],
                steps: [
                    { step: 1, instruction: 'Otwórz adres aplikacji w przeglądarce na telefonie.' },
                    { step: 2, instruction: 'Kliknij ikonę menu „⋮" (trzy kropki).' },
                    { step: 3, instruction: 'Wybierz „Dodaj do ekranu głównego".' },
                    { step: 4, instruction: 'Potwierdź instalację — gotowe!' },
                ],
            },
            // 2 — Logowanie
            {
                id: 'emp-a2-logowanie',
                title: 'Logowanie do systemu',
                description: 'Jak zalogować się do systemu.',
                timeEstimate: 2,
                keywords: ['logowanie', 'login', 'hasło', 'zaloguj', 'karta startowa'],
                quickAnswer: 'Otwórz adres aplikacji → przepisz dane z karty startowej.',
                difficulty: 1,
                media: {
                    type: 'video',
                    src: '/images/onboarding/a1_logowanie2.mp4',
                    alt: 'Film pokazujący jak zalogować się do systemu',
                },
                steps: [
                    { step: 1, instruction: 'Weź do ręki swoją kartę startową.' },
                    { step: 2, instruction: 'Przejdź na stronę aplikacji.' },
                    { step: 3, instruction: 'Przepisz tymczasowe dane z karty.', tip: 'Po pierwszym logowaniu ustaw własne hasło — będzie Ci łatwiej je zapamiętać.' },
                ],
            },
            // 3 — Zmiana języka
            {
                id: 'emp-a3-jezyk',
                title: 'Zmiana języka',
                description: 'Ustaw preferowany język interfejsu.',
                timeEstimate: 1,
                keywords: ['język', 'polski', 'angielski', 'ukraiński', 'language', 'flaga'],
                quickAnswer: 'Górny pasek → ikonka flagi → wybierz język.',
                difficulty: 1,
                media: {
                    type: 'video',
                    src: '/images/onboarding/a2_zmianajezyka.mp4',
                    alt: 'Film pokazujący jak zmienić język interfejsu',
                },
                steps: [
                    { step: 1, instruction: 'Po zalogowaniu znajdź ikonkę flagi na górnym pasku.' },
                    { step: 2, instruction: 'Kliknij ją i wybierz swój preferowany język.' },
                ],
            },
            // 4 — Ustawienia konta
            {
                id: 'emp-a4-konto',
                title: 'Ustawienia konta',
                description: 'Sprawdź swój profil i dane konta.',
                timeEstimate: 2,
                keywords: ['konto', 'profil', 'ustawienia', 'email', 'hasło'],
                quickAnswer: 'Kliknij swoją nazwę w prawym górnym rogu → „Profil".',
                difficulty: 1,
                media: {
                    type: 'video',
                    src: '/images/onboarding/a5_ustawieniakonta.mp4',
                    alt: 'Film pokazujący ustawienia konta',
                },
                steps: [
                    { step: 1, instruction: 'Kliknij na swoją nazwę w prawym górnym rogu.' },
                    { step: 2, instruction: 'Wybierz „Profil".' },
                ],
            },
            // 5 — Powiadomienia
            {
                id: 'emp-a5-powiadomienia',
                title: 'Powiadomienia',
                description: 'Sprawdzaj powiadomienia, żeby niczego nie przegapić.',
                timeEstimate: 1,
                keywords: ['powiadomienia', 'alerty', 'dzwonek', 'notyfikacje'],
                quickAnswer: 'Ikonka dzwoneczka na górnym pasku → kliknij powiadomienie.',
                difficulty: 1,
                media: {
                    type: 'video',
                    src: '/images/onboarding/a6_powiadomienia.mp4',
                    alt: 'Film pokazujący powiadomienia w systemie',
                },
                steps: [
                    { step: 1, instruction: 'Kliknij ikonkę dzwoneczka na górnym pasku.' },
                    { step: 2, instruction: 'Kliknij w wybrane powiadomienie, żeby je sprawdzić.' },
                ],
            },
        ],
    },

    // ─── B) Twoja Dostępność ──────────────────────────────────────────
    {
        id: 'emp-dostepnosc',
        number: 2,
        title: 'Twoja Dostępność',
        subtitle: 'Pokaż pracodawcy, kiedy możesz pracować',
        icon: '📅',
        badge: {
            id: 'emp-badge-dostepnosc',
            name: 'Mistrz Kalendarza',
            icon: '📅',
        },
        quests: [
            // 1 — Ustawianie dostępności
            {
                id: 'emp-b1-dostepnosc',
                title: 'Ustawianie dostępności',
                description: 'Oznacz dni, w których możesz pracować.',
                timeEstimate: 3,
                keywords: ['dostępność', 'kiedy mogę pracować', 'kalendarz'],
                quickAnswer: 'Zakładka Dostępność → klikaj kafelki dat → „Zapisz".',
                difficulty: 1,
                steps: [
                    { step: 1, instruction: 'Zaloguj się do aplikacji.' },
                    { step: 2, instruction: 'Przejdź do zakładki „Dostępność".' },
                    { step: 3, instruction: 'Klikając kafelki z datą, wybierz kiedy możesz pracować.' },
                    { step: 4, instruction: 'Kliknij przycisk „Zapisz".' },
                ],
            },
            // 2 — Pędzel dostępności
            {
                id: 'emp-b2-pedzel',
                title: 'Pędzel dostępności',
                description: 'Szybko ustaw preferencje za pomocą kolorowego pędzla.',
                timeEstimate: 2,
                keywords: ['pędzel', 'kolor', 'preferencja', 'szybkie ustawianie'],
                quickAnswer: 'Wybierz kolor pędzla → klikaj kafelki → „Zapisz".',
                difficulty: 1,
                steps: [
                    { step: 1, instruction: 'W widoku dostępności wybierz kolor pędzla.' },
                    { step: 2, instruction: 'Klikaj na kafelki — od razu ustawią się na wybraną preferencję.' },
                    { step: 3, instruction: 'Kliknij przycisk „Zapisz".' },
                ],
            },
            // 3 — Notatka
            {
                id: 'emp-b3-notatka',
                title: 'Notatka dla pracodawcy',
                description: 'Zostaw wiadomość widoczną dla Twojego przełożonego.',
                timeEstimate: 1,
                keywords: ['notatka', 'wiadomość', 'komentarz', 'pracodawca'],
                quickAnswer: 'Pod kafelkami dostępności → pole tekstowe → wpisz notatkę → „Zapisz".',
                difficulty: 1,
                steps: [
                    { step: 1, instruction: 'Pod kafelkami z dostępnością znajdź pole tekstowe.' },
                    { step: 2, instruction: 'Wpisz wiadomość, którą chcesz przekazać pracodawcy.' },
                    { step: 3, instruction: 'Kliknij przycisk „Zapisz".' },
                ],
            },
            // 4 — Zakres dat
            {
                id: 'emp-b4-zakres',
                title: 'Zakres dat',
                description: 'Zmień widok kalendarza na tydzień, dwa tygodnie lub miesiąc.',
                timeEstimate: 1,
                keywords: ['zakres', 'tydzień', 'miesiąc', 'dwa tygodnie', 'selektor daty'],
                quickAnswer: 'Kliknij selektor daty → wybierz zakres: Tydzień / 2 Tygodnie / 3 Tygodnie / Miesiąc.',
                difficulty: 1,
                steps: [
                    { step: 1, instruction: 'Wszędzie gdzie widzisz selektor daty — kliknij go.' },
                    { step: 2, instruction: 'Wybierz zakres, który Ci odpowiada: Tydzień, 2 Tygodnie, 3 Tygodnie lub Miesiąc.' },
                ],
            },
        ],
    },

    // ─── C) Rozliczanie Godzin Pracy ─────────────────────────────────
    {
        id: 'emp-rozliczenia',
        number: 3,
        title: 'Rozliczanie Godzin Pracy',
        subtitle: 'Zapisuj i zarządzaj swoimi przepracowanymi godzinami',
        icon: '⏱️',
        badge: {
            id: 'emp-badge-rozliczenia',
            name: 'Punktualny Żabian',
            icon: '⏱️',
        },
        quests: [
            // 1 — Rozlicz zmianę
            {
                id: 'emp-c1-rozlicz',
                title: 'Rozlicz zmianę',
                description: 'Zapisz swoją przepracowaną zmianę w systemie.',
                timeEstimate: 3,
                keywords: ['rozliczenie', 'zmiana', 'godziny', 'przepracowane'],
                quickAnswer: 'Rozliczenie Godzin → „+ Rozlicz Zmianę" → wypełnij formularz → „Zapisz".',
                difficulty: 1,
                steps: [
                    { step: 1, instruction: 'Po zakończeniu pracy zaloguj się do aplikacji.' },
                    { step: 2, instruction: 'Przejdź do modułu „Rozliczenie Godzin".' },
                    { step: 3, instruction: 'Kliknij przycisk „+ Rozlicz Zmianę".' },
                    { step: 4, instruction: 'Wypełnij formularz.' },
                    { step: 5, instruction: 'Kliknij „Zapisz".' },
                ],
            },
            // 2 — Edytuj zmianę
            {
                id: 'emp-c2-edytuj',
                title: 'Edytuj zmianę',
                description: 'Popraw już zapisaną zmianę, jeśli coś się nie zgadza.',
                timeEstimate: 2,
                keywords: ['edycja', 'popraw', 'zmień zmianę', 'korekta'],
                quickAnswer: 'Wybierz zmianę z listy → popraw formularz → „Zapisz".',
                difficulty: 1,
                steps: [
                    { step: 1, instruction: 'Wybierz zmianę z listy Twoich zmian.' },
                    { step: 2, instruction: 'Popraw formularz.' },
                    { step: 3, instruction: 'Kliknij „Zapisz".', tip: 'Edycja jest dostępna przez 24 godziny od wprowadzenia. Po tym czasie skontaktuj się z przełożonym.' },
                ],
            },
            // 3 — Wybierz sklep
            {
                id: 'emp-c3-sklep',
                title: 'Wybierz sklep',
                description: 'Przełączaj się między sklepami, jeśli pracujesz w kilku.',
                timeEstimate: 1,
                keywords: ['sklep', 'selektor', 'wiele sklepów', 'przełącz'],
                quickAnswer: 'Kliknij selektor sklepu → wybierz jeden lub więcej sklepów.',
                difficulty: 1,
                steps: [
                    { step: 1, instruction: 'Jeśli widzisz selektor sklepu — kliknij go.' },
                    { step: 2, instruction: 'Wybierz, czy chcesz widzieć jeden czy więcej sklepów.' },
                ],
                // This quest is conditional — only relevant for multi-store employees
            },
        ],
    },

    // ─── D) Twój Harmonogram Pracy ───────────────────────────────────
    {
        id: 'emp-harmonogram',
        number: 4,
        title: 'Twój Harmonogram Pracy',
        subtitle: 'Sprawdź swój grafik na nadchodzący okres',
        icon: '🗓️',
        badge: {
            id: 'emp-badge-harmonogram',
            name: 'Zawsze Na Czas',
            icon: '🗓️',
        },
        quests: [
            // 1 — Sprawdź grafik
            {
                id: 'emp-d1-grafik',
                title: 'Sprawdź swój grafik',
                description: 'Zobacz kiedy i gdzie masz zaplanowane zmiany.',
                timeEstimate: 2,
                keywords: ['harmonogram', 'grafik', 'zmiany', 'kiedy pracuję'],
                quickAnswer: 'Moduł Harmonogram Pracy → przeglądaj swoje zmiany.',
                difficulty: 1,
                steps: [
                    { step: 1, instruction: 'Przejdź do modułu „Harmonogram Pracy".' },
                    { step: 2, instruction: 'Przeglądaj swoje zaplanowane zmiany.', tip: 'Jeśli nie widzisz zmian — pracodawca jeszcze ich nie wystawił. Wypełnij swoją dostępność, żeby mu w tym pomóc!' },
                ],
            },
        ],
    },
];

/** Helper: get all employee quests flat */
export function getAllEmployeeQuests() {
    return EMPLOYEE_ADVENTURES.flatMap((a) => a.quests);
}

/** Helper: search employee quests by keyword */
export function searchEmployeeQuests(query: string) {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return getAllEmployeeQuests().filter(
        (quest) =>
            quest.title.toLowerCase().includes(q) ||
            quest.keywords.some((kw) => kw.toLowerCase().includes(q)) ||
            quest.quickAnswer.toLowerCase().includes(q),
    );
}
