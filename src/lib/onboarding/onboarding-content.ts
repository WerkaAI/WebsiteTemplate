// Onboarding content data - curriculum structure for the "Przygoda Żabiana" experience

export interface QuestStep {
    /** Step number */
    step: number;
    /** Instruction text */
    instruction: string;
    /** Optional tip or note */
    tip?: string;
}

export interface QuestMedia {
    /** Type of media: 'image', 'gif', or 'video' */
    type: 'image' | 'gif' | 'video';
    /** Path to media file (relative to /public) */
    src: string;
    /** Alt text for accessibility */
    alt: string;
}

export interface Quest {
    id: string;
    title: string;
    description: string;
    /** Estimated time in minutes */
    timeEstimate: number;
    /** Keywords for cheat sheet search */
    keywords: string[];
    /** Short answer for cheat sheet */
    quickAnswer: string;
    /** Step-by-step instructions (optional, for detailed view) */
    steps?: QuestStep[];
    /** Media content - screenshots, GIFs, videos (optional) */
    media?: QuestMedia;
    /** Difficulty level: 1 = easy, 2 = medium, 3 = advanced */
    difficulty?: 1 | 2 | 3;
    /** Deep link to the app feature (optional) */
    deepLink?: string;
    /** Can be skipped with "I already know this" (default: true) */
    canSkip?: boolean;
    /** Auto-complete on first visit (for welcome quest) */
    autoComplete?: boolean;
}

export interface Adventure {
    id: string;
    number: number;
    title: string;
    subtitle: string;
    /** Emoji or icon identifier */
    icon: string;
    /** Badge earned upon completion */
    badge: {
        id: string;
        name: string;
        icon: string;
    };
    quests: Quest[];
}

export interface CheatSheetCategory {
    id: string;
    name: string;
    icon: string;
}

// Categories for the cheat sheet
export const CHEAT_SHEET_CATEGORIES: CheatSheetCategory[] = [
    { id: 'ogolne', name: 'Ogólne', icon: '⚙️' },
    { id: 'personel', name: 'Personel', icon: '👥' },
    { id: 'sklep', name: 'Sklep', icon: '🏪' },
    { id: 'rozliczenia', name: 'Rozliczenia', icon: '📊' },
    { id: 'dostepnosc', name: 'Dostępność', icon: '📅' },
    { id: 'harmonogram', name: 'Harmonogram', icon: '🗓️' },
    { id: 'automatyzacja', name: 'Automatyzacja', icon: '🤖' },
];

// The 5 Adventures curriculum
export const ADVENTURES: Adventure[] = [
    {
        id: 'pierwsze-skoki',
        number: 1,
        title: 'Pierwsze Skoki',
        subtitle: 'Poznaj swoje konto i podstawy systemu',
        icon: '🐣',
        badge: {
            id: 'badge-nowy',
            name: 'Nowy w Stawie',
            icon: '🐣',
        },
        quests: [
            {
                id: 'a0-witaj',
                title: 'Witaj w Przygodzie!',
                description: 'Gratulacje! Właśnie zacząłeś swoją przygodę z AutoŻaba.',
                timeEstimate: 0,
                keywords: ['start', 'początek', 'witaj'],
                quickAnswer: 'Jesteś tutaj - to już sukces! 🎉',
                difficulty: 1,
                autoComplete: true,
                canSkip: false,
            },
            {
                id: 'a1-logowanie',
                title: 'Logowanie do systemu',
                description: 'Jak zalogować się do AutoŻaba i co zrobić gdy zapomnisz hasła.',
                timeEstimate: 2,
                keywords: ['logowanie', 'login', 'hasło', 'zaloguj', 'wejść'],
                quickAnswer: 'Wejdź na panel.autozaba.pl i użyj danych otrzymanych w emailu powitalnym.',
                difficulty: 1,
                deepLink: 'https://panel.autozaba.pl',
            },
            {
                id: 'a2-jezyk',
                title: 'Zmiana języka',
                description: 'Jak zmienić język interfejsu na preferowany.',
                timeEstimate: 1,
                keywords: ['język', 'polski', 'angielski', 'language'],
                quickAnswer: 'Kliknij ikonę profilu → Ustawienia → Język.',
                difficulty: 1,
                deepLink: 'https://panel.autozaba.pl/settings',
            },
            {
                id: 'a3-konto',
                title: 'Ustawienia konta',
                description: 'Zarządzaj swoim loginem, emailem i hasłem.',
                timeEstimate: 2,
                keywords: ['konto', 'email', 'hasło', 'profil', 'ustawienia', 'zmiana hasła'],
                quickAnswer: 'Profil → Ustawienia konta. Tutaj zmienisz email, login i hasło.',
                difficulty: 1,
            },
            {
                id: 'a4-powiadomienia',
                title: 'Powiadomienia',
                description: 'Skonfiguruj jakie powiadomienia chcesz otrzymywać.',
                timeEstimate: 2,
                keywords: ['powiadomienia', 'alerty', 'email', 'push', 'notyfikacje'],
                quickAnswer: 'Ustawienia → Powiadomienia. Włącz/wyłącz poszczególne typy alertów.',
                difficulty: 1,
            },
        ],
    },
    {
        id: 'twoja-twierdza',
        number: 2,
        title: 'Twoja Twierdza',
        subtitle: 'Skonfiguruj swój sklep i zbuduj zespół',
        icon: '🏪',
        badge: {
            id: 'badge-wlasciciel',
            name: 'Właściciel Sklepu',
            icon: '🏪',
        },
        quests: [
            {
                id: 'c1-sklep',
                title: 'Edycja danych sklepu',
                description: 'Uzupełnij dane swojego sklepu - adres, godziny otwarcia, itp.',
                timeEstimate: 3,
                keywords: ['sklep', 'dane sklepu', 'adres', 'godziny otwarcia', 'edycja sklepu'],
                quickAnswer: 'Menu → Sklepy → Wybierz sklep → Edytuj. Uzupełnij wszystkie pola.',
                difficulty: 1,
            },
            {
                id: 'b1-dodawanie',
                title: 'Dodawanie pracownika',
                description: 'Jak dodać nowego członka zespołu do systemu.',
                timeEstimate: 3,
                keywords: ['pracownik', 'dodaj pracownika', 'nowy pracownik', 'zatrudnienie'],
                quickAnswer: 'Personel → Dodaj pracownika. Wypełnij dane i przypisz do sklepu.',
                difficulty: 2,
            },
            {
                id: 'b2-edycja',
                title: 'Edycja pracowników',
                description: 'Zmiana danych, przypisanie do sklepu, role, hasła i blokowanie kont.',
                timeEstimate: 4,
                keywords: ['edycja pracownika', 'rola', 'uprawnienia', 'zablokuj', 'zmień hasło pracownika'],
                quickAnswer: 'Personel → Kliknij pracownika → Edytuj. Możesz zmienić dane, rolę, hasło.',
                difficulty: 2,
            },
        ],
    },
    {
        id: 'kalendarz-dostepnosci',
        number: 3,
        title: 'Kalendarz Dostępności',
        subtitle: 'Wiedz kiedy Twój zespół może pracować',
        icon: '📅',
        badge: {
            id: 'badge-kalendarz',
            name: 'Mistrz Kalendarza',
            icon: '📅',
        },
        quests: [
            {
                id: 'f1-wlasna',
                title: 'Ustawianie własnej dostępności',
                description: 'Jak oznaczyć kiedy jesteś dostępny do pracy.',
                timeEstimate: 2,
                keywords: ['dostępność', 'moja dostępność', 'kiedy mogę pracować'],
                quickAnswer: 'Dostępność → Moja dostępność. Kliknij dni i ustaw godziny.',
                difficulty: 1,
            },
            {
                id: 'f2-pracownicy',
                title: 'Dostępność pracowników',
                description: 'Jak przeglądać i edytować dostępność członków zespołu.',
                timeEstimate: 3,
                keywords: ['dostępność pracownika', 'kto może pracować', 'grafik dostępności'],
                quickAnswer: 'Dostępność → Wybierz pracownika z listy. Edytuj jego kalendarz.',
                difficulty: 2,
            },
            {
                id: 'f3-notatki',
                title: 'Notatki w dostępności',
                description: 'Dodawaj notatki do dni - urlopy, ważne informacje.',
                timeEstimate: 2,
                keywords: ['notatka', 'urlop', 'uwagi', 'komentarz'],
                quickAnswer: 'Kliknij dzień → Dodaj notatkę. Notatki widoczne są w harmonogramie.',
                difficulty: 1,
            },
        ],
    },
    {
        id: 'grafik-i-czas',
        number: 4,
        title: 'Grafik & Rozliczenia',
        subtitle: 'Planuj zmiany i rozliczaj godziny',
        icon: '⏱️',
        badge: {
            id: 'badge-grafik',
            name: 'Mistrz Grafiku',
            icon: '⏱️',
        },
        quests: [
            {
                id: 'g1-interfejs',
                title: 'Interfejs harmonogramu',
                description: 'Poznaj widok harmonogramu - nawigacja, filtry, widoki.',
                timeEstimate: 3,
                keywords: ['harmonogram', 'grafik', 'widok', 'filtr', 'tydzień', 'miesiąc'],
                quickAnswer: 'Harmonogram → Użyj przycisków góry do zmiany widoku i filtrowania.',
                difficulty: 2,
            },
            {
                id: 'g2-zmiany',
                title: 'Dodawanie zmian',
                description: 'Jak dodać, edytować i usunąć zmianę w harmonogramie.',
                timeEstimate: 3,
                keywords: ['zmiana', 'dodaj zmianę', 'edytuj zmianę', 'usuń zmianę'],
                quickAnswer: 'Kliknij komórkę → Dodaj zmianę. Przeciągnij by edytować czas.',
                difficulty: 2,
            },
            {
                id: 'g3-dragdrop',
                title: 'Drag & Drop',
                description: 'Przeciągaj i upuszczaj zmiany między dniami i pracownikami.',
                timeEstimate: 2,
                keywords: ['przeciągnij', 'przesuń', 'drag', 'drop'],
                quickAnswer: 'Złap zmianę i przeciągnij na inny dzień lub pracownika.',
                difficulty: 1,
            },
            {
                id: 'd1-rozliczenie',
                title: 'Rozliczenie godzin',
                description: 'Jak rozliczać przepracowane godziny.',
                timeEstimate: 4,
                keywords: ['rozliczenie', 'godziny', 'przepracowane', 'ewidencja'],
                quickAnswer: 'Rozliczenia → Wybierz okres → Zatwierdź godziny pracowników.',
                difficulty: 2,
            },
            {
                id: 'd2-zmiany-rozliczenie',
                title: 'Edycja rozliczeń',
                description: 'Poprawianie i aktualizacja rozliczeń godzinowych.',
                timeEstimate: 3,
                keywords: ['popraw rozliczenie', 'edycja godzin', 'korekta'],
                quickAnswer: 'Rozliczenia → Kliknij wpis → Edytuj. Zapisz zmiany.',
                difficulty: 2,
            },
        ],
    },
    {
        id: 'automatyzacja',
        number: 5,
        title: 'Moc Automatyzacji',
        subtitle: 'Odblokuj zaawansowane funkcje i AI',
        icon: '🚀',
        badge: {
            id: 'badge-master',
            name: 'Żabozbawca',
            icon: '🐸',
        },
        quests: [
            {
                id: 'h1-ai-interfejs',
                title: 'AI Harmonogram - Interfejs',
                description: 'Poznaj magiczny przycisk automatycznego generowania grafiku.',
                timeEstimate: 3,
                keywords: ['AI', 'automatyczny harmonogram', 'sztuczna inteligencja', 'generuj'],
                quickAnswer: 'Harmonogram → Przycisk "Generuj AI". Ustaw parametry i kliknij.',
                difficulty: 3,
            },
            {
                id: 'h2-jak-dziala',
                title: 'Jak działa AI',
                description: 'Zrozum jak algorytm dobiera pracowników do zmian.',
                timeEstimate: 4,
                keywords: ['algorytm', 'jak działa AI', 'optymalizacja'],
                quickAnswer: 'AI analizuje dostępność, umiejętności i preferencje pracowników.',
                difficulty: 3,
            },
            {
                id: 'h3-pierwszy',
                title: 'Pierwszy automatyczny harmonogram',
                description: 'Wygeneruj swój pierwszy grafik jednym kliknięciem.',
                timeEstimate: 5,
                keywords: ['pierwszy grafik', 'wygeneruj', 'automatycznie'],
                quickAnswer: 'Upewnij się że masz ustawioną dostępność → Kliknij "Generuj AI".',
                difficulty: 3,
            },
            {
                id: 'd3-podsumowanie',
                title: 'Podsumowanie rozliczeń',
                description: 'Widok zbiorczy godzin i kosztów.',
                timeEstimate: 3,
                keywords: ['podsumowanie', 'raport', 'zestawienie', 'koszty'],
                quickAnswer: 'Rozliczenia → Tab Podsumowanie. Eksportuj do PDF/Excel.',
                difficulty: 2,
            },
            {
                id: 'd4-pip',
                title: 'Eksport dla PIP',
                description: 'Generuj dokumenty zgodne z wymaganiami Państwowej Inspekcji Pracy.',
                timeEstimate: 3,
                keywords: ['PIP', 'inspekcja pracy', 'eksport', 'dokumenty'],
                quickAnswer: 'Rozliczenia → Eksport → Format PIP. Pobierz gotowy dokument.',
                difficulty: 2,
            },
            {
                id: 'b3-umowy',
                title: 'Zarządzanie umowami',
                description: 'Dodawaj i zarządzaj umowami pracowników.',
                timeEstimate: 4,
                keywords: ['umowa', 'kontrakt', 'zatrudnienie', 'dokumenty pracownika'],
                quickAnswer: 'Personel → Pracownik → Tab Umowy. Dodaj nową lub edytuj istniejącą.',
                difficulty: 2,
            },
            {
                id: 'e1-custom',
                title: 'Własne typy zmian',
                description: 'Twórz niestandardowe typy zmian dla swojego sklepu.',
                timeEstimate: 3,
                keywords: ['typ zmiany', 'własna zmiana', 'customowa zmiana', 'ustawienia zmian'],
                quickAnswer: 'Ustawienia → Typy zmian → Dodaj nowy. Ustaw nazwę, kolor, godziny.',
                difficulty: 3,
            },
            {
                id: 'g5-obsada',
                title: 'Obsada i wnioski',
                description: 'Zarządzaj obsadą zmian i wnioskami pracowników.',
                timeEstimate: 4,
                keywords: ['obsada', 'wnioski', 'prośby', 'zamiana zmian'],
                quickAnswer: 'Harmonogram → Tab Wnioski. Akceptuj lub odrzucaj prośby zespołu.',
                difficulty: 2,
            },
            {
                id: 'g8-eksport',
                title: 'Eksport harmonogramu',
                description: 'Eksportuj grafik do PDF, Excel lub wydrukuj.',
                timeEstimate: 2,
                keywords: ['eksport harmonogramu', 'drukuj grafik', 'PDF', 'Excel'],
                quickAnswer: 'Harmonogram → Eksport (ikona). Wybierz format i pobierz.',
                difficulty: 1,
            },
        ],
    },
];

// Helper to get all quests flat for cheat sheet search
export function getAllQuests(): Quest[] {
    return ADVENTURES.flatMap(adventure => adventure.quests);
}

// Helper to search quests by keyword
export function searchQuests(query: string): Quest[] {
    const normalizedQuery = query.toLowerCase().trim();
    if (!normalizedQuery) return [];

    return getAllQuests().filter(quest =>
        quest.title.toLowerCase().includes(normalizedQuery) ||
        quest.keywords.some(kw => kw.toLowerCase().includes(normalizedQuery)) ||
        quest.quickAnswer.toLowerCase().includes(normalizedQuery)
    );
}
