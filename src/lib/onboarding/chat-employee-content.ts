/**
 * Chat-based onboarding content for EMPLOYEE role.
 *
 * Migrated from onboarding-employee.ts (adventure/quest format)
 * into the new ChatChapter/ChatStep/ChatMessage format.
 *
 * 4 Chapters, ~13 Steps — same content, conversational delivery.
 * Each Quest → ChatStep, each QuestStep → ChatMessage sequence.
 *
 * Branching example: emp-a1-instalacja has Android/iOS branches.
 */

import type {
    ChatChapter,
    ChatStep,
    ChatMessage,
    ChatMedia,
    QuickHelpShortcut,
} from './chat-types';
import type { PointerAnimation } from './chat-animations';

// ─── Helper: message factory ──────────────────────────────────────────

/** Creates a deterministic message ID based on step context */
function createMsgId(stepId: string, index: number): string {
    return `${stepId}-m${index}`;
}

/** Counter per step — reset in each step definition via withStepIds() */
function withStepIds(stepId: string, messages: Omit<ChatMessage, 'id'>[]): ChatMessage[] {
    return messages.map((m, i) => ({ ...m, id: createMsgId(stepId, i) }));
}

function zabek(content: string, extra?: Partial<Omit<ChatMessage, 'id'>>): Omit<ChatMessage, 'id'> {
    return {
        sender: 'zabek',
        type: 'text',
        content,
        delay: 500,
        ...extra,
    };
}

/** Creates a media-only message (annotated screenshot or video) */
function screenshot(
    src: string,
    alt: string,
    caption?: string,
    opts?: { branchId?: string; pointerAnimation?: PointerAnimation; video?: boolean; poster?: string; playbackRate?: number },
): Omit<ChatMessage, 'id'> {
    const isVideo = opts?.video ?? /\.(mp4|webm|mov)$/i.test(src);
    const media: ChatMedia = {
        type: isVideo ? 'video' : 'animated-screenshot',
        src,
        alt,
        caption,
        width: 750,
        height: 468,
        ...(opts?.poster ? { poster: opts.poster } : {}),
        ...(opts?.playbackRate ? { playbackRate: opts.playbackRate } : {}),
        ...(opts?.pointerAnimation ? { pointerAnimation: opts.pointerAnimation } : {}),
    };
    return {
        sender: 'zabek',
        type: 'media',
        content: '',
        delay: 300,
        media,
        ...(opts?.branchId ? { branchId: opts.branchId } : {}),
    };
}

function tip(content: string): Omit<ChatMessage, 'id'> {
    return {
        sender: 'zabek',
        type: 'tip',
        content,
        delay: 300,
    };
}

function buttons(content: string, btns: ChatMessage['buttons']): Omit<ChatMessage, 'id'> {
    return {
        sender: 'zabek',
        type: 'buttons',
        content,
        delay: 500,
        buttons: btns,
    };
}

function reward(xp: number, message: string): Omit<ChatMessage, 'id'> {
    return {
        sender: 'system',
        type: 'reward',
        content: '',
        delay: 200,
        reward: { xp, message },
    };
}

// ─── CHAPTER A: Pierwsze Kroki ────────────────────────────────────────

const stepA0_welcome: ChatStep = {
    id: 'emp-a0-witaj',
    chapterId: 'emp-ch-pierwsze-kroki',
    title: 'Witaj w Przygodzie!',
    quickAnswer: 'Jesteś tutaj — to już sukces! 🎉',
    keywords: ['start', 'początek', 'witaj'],
    difficulty: 'easy',
    xpReward: 25,
    messages: withStepIds('emp-a0-witaj', [
        zabek('Cześć! Jestem Żabek — Twój przewodnik po aplikacji. 🐸'),
        zabek('Pokażę Ci krok po kroku jak korzystać z aplikacji. W każdej chwili kliknij **🗺️ mapę** w prawym górnym rogu — tam znajdziesz mapę rozdziałów i swój postęp.'),
        buttons('Gotowy?', [
            { label: 'Zaczynamy! 🚀', action: 'complete' },
        ]),
    ]),
    rewardVariants: [
        'Pierwszy krok za Tobą!',
        'Witaj na pokładzie! 🎉',
        'No to lecimy!',
    ],
};

const stepA1_instalacja: ChatStep = {
    id: 'emp-a1-instalacja',
    chapterId: 'emp-ch-pierwsze-kroki',
    title: 'Instalacja aplikacji',
    quickAnswer: 'Otwórz adres aplikacji w przeglądarce → „⋮" → „Dodaj do ekranu głównego".',
    keywords: ['instalacja', 'aplikacja', 'telefon', 'pwa', 'android', 'ios'],
    difficulty: 'normal',
    xpReward: 50,
    messages: withStepIds('emp-a1-instalacja', [
        buttons('Zainstalujmy aplikację na Twoim telefonie. Jaki masz telefon?', [
            { label: 'Android 🤖', action: 'branch', branchId: 'android' },
            { label: 'iPhone 🍎', action: 'branch', branchId: 'ios' },
        ]),
        // ── Android branch ──
        zabek('① Otwórz adres aplikacji w Chrome\n② Kliknij menu **⋮** (trzy kropki)\n③ Wybierz **„Dodaj do ekranu głównego"**\n④ Potwierdź — gotowe! 📱', { branchId: 'android' }),
        screenshot(
            '/images/placeholders/onboarding-neutral.svg',
            'Instalacja PWA na Androidzie',
            'Menu ⋮ → Dodaj do ekranu → Potwierdź',
            { branchId: 'android', playbackRate: 0.5 },
        ),
        // ── iOS branch ──
        zabek('① Otwórz adres aplikacji w **Safari**\n② Kliknij ikonkę udostępniania **↑** na dole ekranu\n③ Wybierz **„Dodaj do ekranu początkowego"**\n④ Kliknij **„Dodaj"** — gotowe! 📱', { branchId: 'ios' }),
        screenshot(
            '/images/placeholders/onboarding-neutral.svg',
            'Instalacja PWA na iPhonie',
            'Udostępnij ↑ → Do ekranu → Dodaj',
            { branchId: 'ios', playbackRate: 0.5 },
        ),
        // ── Common continuation ──
        buttons('Zainstalowałeś?', [
            { label: 'Gotowe ✅', action: 'complete' },
            { label: 'Zrobię później ⏭️', action: 'skip' },
        ]),
    ]),
    rewardVariants: [
        'Aplikacja gotowa! 📱',
        'Masz AutoŻabę na telefonie!',
        'Świetnie!',
    ],
};

const stepA2_logowanie: ChatStep = {
    id: 'emp-a2-logowanie',
    chapterId: 'emp-ch-pierwsze-kroki',
    title: 'Logowanie do systemu',
    quickAnswer: 'Otwórz adres aplikacji → przepisz dane z karty startowej.',
    keywords: ['logowanie', 'login', 'hasło', 'zaloguj', 'karta startowa'],
    difficulty: 'normal',
    xpReward: 50,
    messages: withStepIds('emp-a2-logowanie', [
        zabek('Weź do ręki **kartę startową** od pracodawcy, otwórz aplikację i przepisz dane z karty.'),
        screenshot(
            '/images/placeholders/onboarding-neutral.svg',
            'Logowanie do systemu',
            'Przepisz dane z karty startowej',
        ),
        buttons('Zalogowałeś się?', [
            { label: 'Jestem w środku ✅', action: 'complete' },
            { label: 'Nie mam karty 🤔', action: 'next' },
        ]),
        zabek('Karta startowa to karteczka z loginem i hasłem. Zapytaj pracodawcę — powinien ją mieć!'),
        buttons('Masz kartę?', [
            { label: 'Gotowe ✅', action: 'complete' },
            { label: 'Pominę ⏭️', action: 'skip' },
        ]),
    ]),
    rewardVariants: [
        'Zalogowany! 🔑',
        'Jesteś w środku! 💪',
        'Login — check! ✅',
    ],
};

const stepA3_jezyk: ChatStep = {
    id: 'emp-a3-jezyk',
    chapterId: 'emp-ch-pierwsze-kroki',
    title: 'Zmiana języka',
    quickAnswer: 'Górny pasek → ikonka flagi → wybierz język.',
    keywords: ['język', 'polski', 'angielski', 'ukraiński', 'language', 'flaga'],
    difficulty: 'easy',
    xpReward: 25,
    isOptional: true,
    messages: withStepIds('emp-a3-jezyk', [
        zabek('Możesz zmienić język interfejsu. Kliknij **ikonkę flagi** 🏳️ na górnym pasku i wybierz swój język.'),
        screenshot(
            '/images/placeholders/onboarding-neutral.svg',
            'Zmiana języka interfejsu',
            'Kliknij flagę → Wybierz język',
        ),
        buttons('Zmieniony?', [
            { label: 'Gotowe ✅', action: 'complete' },
            { label: 'Nie zmieniam 👍', action: 'skip' },
        ]),
    ]),
    rewardVariants: [
        'Język ustawiony! 🌍',
        'Gotowe!',
        'Twój interfejs, Twój język!',
    ],
};

const stepA4_konto: ChatStep = {
    id: 'emp-a4-konto',
    chapterId: 'emp-ch-pierwsze-kroki',
    title: 'Ustawienia konta',
    quickAnswer: 'Kliknij swoją nazwę w prawym górnym rogu → „Profil".',
    keywords: ['konto', 'profil', 'ustawienia', 'email', 'hasło'],
    difficulty: 'easy',
    xpReward: 25,
    messages: withStepIds('emp-a4-konto', [
        zabek('Kliknij swoją **nazwę** w prawym górnym rogu → wybierz **„Profil"**. Tam możesz sprawdzić i zmienić swoje dane.'),
        screenshot(
            '/images/placeholders/onboarding-neutral.svg',
            'Ustawienia konta i profilu',
            'Twoja nazwa → Profil',
        ),
        buttons('Zerknąłeś?', [
            { label: 'Gotowe ✅', action: 'complete' },
            { label: 'Pominę ⏭️', action: 'skip' },
        ]),
    ]),
    rewardVariants: [
        'Profil sprawdzony! 👤',
        'Wiesz gdzie są ustawienia!',
    ],
};

const stepA5_powiadomienia: ChatStep = {
    id: 'emp-a5-powiadomienia',
    chapterId: 'emp-ch-pierwsze-kroki',
    title: 'Powiadomienia',
    quickAnswer: 'Ikonka dzwoneczka na górnym pasku → kliknij powiadomienie.',
    keywords: ['powiadomienia', 'alerty', 'dzwonek', 'notyfikacje'],
    difficulty: 'easy',
    xpReward: 25,
    messages: withStepIds('emp-a5-powiadomienia', [
        zabek('Kliknij ikonkę **dzwoneczka 🔔** na górnym pasku — tam pojawiają się powiadomienia. Sprawdź, czy coś na Ciebie czeka!'),
        screenshot(
            '/images/placeholders/onboarding-neutral.svg',
            'Powiadomienia w systemie',
            'Kliknij 🔔 → Sprawdź powiadomienia',
        ),
        buttons('Widzisz dzwoneczek?', [
            { label: 'Gotowe ✅', action: 'complete' },
            { label: 'Pominę ⏭️', action: 'skip' },
        ]),
    ]),
    rewardVariants: [
        'Dzwonek — check! 🔔',
        'Będziesz na bieżąco!',
    ],
};

// ─── CHAPTER B: Twoja Dostępność ──────────────────────────────────────

const stepB1_dostepnosc: ChatStep = {
    id: 'emp-b1-dostepnosc',
    chapterId: 'emp-ch-dostepnosc',
    title: 'Ustawianie dostępności',
    quickAnswer: 'Zakładka Dostępność → klikaj kafelki dat → „Zapisz".',
    keywords: ['dostępność', 'kiedy mogę pracować', 'kalendarz'],
    difficulty: 'normal',
    xpReward: 50,
    messages: withStepIds('emp-b1-dostepnosc', [
        zabek('Przejdź do zakładki **„Dostępność"**, klikaj kafelki z datami i zaznacz dni, w których możesz pracować. Na koniec kliknij **„Zapisz"**.'),
        tip('Im dokładniej wypełnisz dostępność, tym lepszy grafik otrzymasz!'),
        screenshot(
            '/images/placeholders/onboarding-neutral.svg',
            'Ustawianie dostępności — kalendarz',
            'Kalendarz → Kliknij dzień → Zapisz',
        ),
        buttons('Ustawione?', [
            { label: 'Zapisałem ✅', action: 'complete' },
            { label: 'Zrobię to w pracy ⏭️', action: 'skip' },
        ]),
    ]),
    rewardVariants: [
        'Dostępność ustawiona! 📅',
        'Pracodawca widzi Twoje dni!',
        'To klucz do dobrego grafiku!',
    ],
};

const stepB2_pedzel: ChatStep = {
    id: 'emp-b2-pedzel',
    chapterId: 'emp-ch-dostepnosc',
    title: 'Pędzel dostępności',
    quickAnswer: 'Wybierz kolor pędzla → klikaj kafelki → „Zapisz".',
    keywords: ['pędzel', 'kolor', 'preferencja', 'szybkie ustawianie'],
    difficulty: 'easy',
    xpReward: 25,
    messages: withStepIds('emp-b2-pedzel', [
        zabek('Szybszy sposób — **pędzel** 🖌️! Wybierz kolor odpowiadający zmianie i klikaj kafelki. Na koniec **„Zapisz"**.'),        screenshot(
            '/images/placeholders/onboarding-neutral.svg',
            'Pędzel dostępności',
            'Wybierz kolor → Klikaj kafelki → Zapisz',
        ),        buttons('Przetestowałeś?', [
            { label: 'Fajne! ✅', action: 'complete' },
            { label: 'Pominę ⏭️', action: 'skip' },
        ]),
    ]),
    rewardVariants: [
        'Pędzel opanowany! 🖌️',
        'Szybciej się nie da!',
    ],
};

const stepB3_notatka: ChatStep = {
    id: 'emp-b3-notatka',
    chapterId: 'emp-ch-dostepnosc',
    title: 'Notatka dla pracodawcy',
    quickAnswer: 'Pod kafelkami dostępności → pole tekstowe → wpisz notatkę → „Zapisz".',
    keywords: ['notatka', 'wiadomość', 'komentarz', 'pracodawca'],
    difficulty: 'easy',
    xpReward: 25,
    messages: withStepIds('emp-b3-notatka', [
        zabek('Pod kafelkami jest pole tekstowe — wpisz notatkę dla pracodawcy (np. „W piątek mam lekarza") i kliknij **„Zapisz"**.'),        screenshot(
            '/images/placeholders/onboarding-neutral.svg',
            'Notatka dla pracodawcy',
            'Wpisz notatkę → Zapisz',
        ),        buttons('Jasne?', [
            { label: 'Gotowe ✅', action: 'complete' },
            { label: 'Pominę ⏭️', action: 'skip' },
        ]),
    ]),
    rewardVariants: [
        'Notatka — proste! 📝',
        'Twój głos się liczy!',
    ],
};

const stepB4_zakres: ChatStep = {
    id: 'emp-b4-zakres',
    chapterId: 'emp-ch-dostepnosc',
    title: 'Zakres dat',
    quickAnswer: 'Kliknij selektor daty → wybierz: Tydzień / 2 Tygodnie / Miesiąc.',
    keywords: ['zakres', 'tydzień', 'miesiąc', 'dwa tygodnie', 'selektor daty'],
    difficulty: 'easy',
    xpReward: 25,
    messages: withStepIds('emp-b4-zakres', [
        zabek('Czas na Twoją dostępność! 📅 Najpierw — możesz zmienić widok kalendarza. Kliknij selektor daty i wybierz zakres: **tydzień**, **2 tygodnie** lub **miesiąc**.'),
        screenshot(
            '/images/placeholders/onboarding-neutral.svg',
            'Przełączanie widoku kalendarza',
            'Selektor daty → Tydzień / 2 Tygodnie / Miesiąc',
        ),
        buttons('Widzisz selektor?', [
            { label: 'Rozumiem ✅', action: 'complete' },
            { label: 'Pominę ⏭️', action: 'skip' },
        ]),
    ]),
    rewardVariants: [
        'Zakres dat — gotowe! 📆',
        'Wiesz jak zmienić widok!',
    ],
};

// ─── CHAPTER C: Rozliczanie Godzin Pracy ─────────────────────────────

const stepC1_rozlicz: ChatStep = {
    id: 'emp-c1-rozlicz',
    chapterId: 'emp-ch-rozliczenia',
    title: 'Rozlicz zmianę',
    quickAnswer: 'Rozliczenie Godzin → „+ Rozlicz Zmianę" → wypełnij → „Zapisz".',
    keywords: ['rozliczenie', 'zmiana', 'godziny', 'przepracowane'],
    difficulty: 'hard',
    xpReward: 100,
    messages: withStepIds('emp-c1-rozlicz', [
        zabek('Po każdej zmianie rozlicz godziny — to najważniejszy krok! Wejdź w **„Rozliczenie Godzin"** → kliknij **„+ Rozlicz Zmianę"** → wypełnij formularz → **„Zapisz"**.'),
        tip('Rób to od razu po zmianie — później łatwo zapomnieć!'),
        screenshot(
            '/images/placeholders/onboarding-neutral.svg',
            'Rozliczanie zmiany krok po kroku',
            'Rozliczenie → + Rozlicz Zmianę → Zapisz',
        ),
        buttons('Jasne?', [
            { label: 'Rozumiem ✅', action: 'complete' },
            { label: 'Zrobię to w pracy ⏭️', action: 'skip' },
        ]),
    ]),
    rewardVariants: [
        'Rozliczanie opanowane! ⏱️',
        'Żadne godziny Ci nie uciekną! 💪',
        'Rób to zaraz po zmianie ⏰',
    ],
};

const stepC2_edytuj: ChatStep = {
    id: 'emp-c2-edytuj',
    chapterId: 'emp-ch-rozliczenia',
    title: 'Edytuj zmianę',
    quickAnswer: 'Wybierz zmianę z listy → popraw → „Zapisz".',
    keywords: ['edycja', 'popraw', 'zmień zmianę', 'korekta'],
    difficulty: 'normal',
    xpReward: 50,
    messages: withStepIds('emp-c2-edytuj', [
        zabek('Pomyliłeś się? Wybierz zmianę z listy, popraw formularz i kliknij **„Zapisz"**.'),
        tip('Edycja jest dostępna przez 24h. Później skontaktuj się z przełożonym.'),
        screenshot(
            '/images/placeholders/onboarding-neutral.svg',
            'Edycja rozliczonej zmiany',
            'Wybierz zmianę → Popraw → Zapisz',
        ),
        buttons('Jasne?', [
            { label: 'Rozumiem ✅', action: 'complete' },
            { label: 'Pominę ⏭️', action: 'skip' },
        ]),
    ]),
    rewardVariants: [
        'Edycja — żaden problem! ✏️',
        'Wiesz jak poprawić!',
    ],
};

const stepC3_sklep: ChatStep = {
    id: 'emp-c3-sklep',
    chapterId: 'emp-ch-rozliczenia',
    title: 'Wybierz sklep',
    quickAnswer: 'Kliknij selektor sklepu → wybierz jeden lub więcej sklepów.',
    keywords: ['sklep', 'selektor', 'wiele sklepów', 'przełącz'],
    difficulty: 'easy',
    xpReward: 25,
    isOptional: true,
    conditionalNote: 'Ten krok dotyczy tylko osób pracujących w więcej niż jednym sklepie.',
    messages: withStepIds('emp-c3-sklep', [
        buttons('Pracujesz w więcej niż jednym sklepie?', [
            { label: 'Tak, w kilku 🏪', action: 'next' },
            { label: 'Nie, w jednym', action: 'complete' },
        ]),
        zabek('Możesz przełączać się między sklepami! Kliknij **selektor sklepu** i wybierz właściwy.'),
        screenshot(
            '/images/placeholders/onboarding-neutral.svg',
            'Przełączanie między sklepami',
            'Selektor sklepu → Wybierz sklep',
        ),
        buttons('Jasne?', [
            { label: 'Gotowe ✅', action: 'complete' },
        ]),
    ]),
    rewardVariants: [
        'Multi-sklep opanowany! 🏪',
        'Przełączanie sklepów — check!',
    ],
};

// ─── CHAPTER D: Twój Harmonogram Pracy ───────────────────────────────

const stepD1_grafik: ChatStep = {
    id: 'emp-d1-grafik',
    chapterId: 'emp-ch-harmonogram',
    title: 'Sprawdź swój grafik',
    quickAnswer: 'Moduł Harmonogram Pracy → przeglądaj swoje zmiany.',
    keywords: ['harmonogram', 'grafik', 'zmiany', 'kiedy pracuję'],
    difficulty: 'normal',
    xpReward: 50,
    messages: withStepIds('emp-d1-grafik', [
        zabek('Ostatni krok! Przejdź do **„Harmonogram Pracy"** i przeglądaj swoje zaplanowane zmiany. 🗓️'),
        tip('Nie widzisz zmian? Pracodawca jeszcze ich nie wystawił — wypełnij dostępność, żeby mu pomóc!'),
        screenshot(
            '/images/placeholders/onboarding-neutral.svg',
            'Harmonogram pracy — widok zaplanowanych zmian',
            'Harmonogram Pracy → Twoje zmiany',
        ),
        buttons('Widzisz grafik?', [
            { label: 'Widzę ✅', action: 'complete' },
            { label: 'Grafik pusty ⏭️', action: 'skip' },
        ]),
    ]),
    rewardVariants: [
        'Grafik opanowany! 🗓️',
        'Wiesz kiedy pracujesz!',
    ],
};

// ─── Chapters assembly ───────────────────────────────────────────────

export const EMPLOYEE_CHAT_CHAPTERS: ChatChapter[] = [
    {
        id: 'emp-ch-pierwsze-kroki',
        number: 1,
        title: 'Pierwsze Kroki',
        icon: '🐣',
        badge: { id: 'emp-badge-start', name: 'Pierwszy Skok', icon: '🐣' },
        steps: [
            stepA0_welcome,
            stepA1_instalacja,
            stepA2_logowanie,
            stepA3_jezyk,
            stepA4_konto,
            stepA5_powiadomienia,
        ],
        celebrationMessage: 'Rozdział 1 ukończony! Masz już podstawy — reszta będzie łatwiejsza! 🎉',
        zabekEvolution: 'crown',
        completionBonusXP: 150,
    },
    {
        id: 'emp-ch-dostepnosc',
        number: 2,
        title: 'Twoja Dostępność',
        icon: '📅',
        badge: { id: 'emp-badge-dostepnosc', name: 'Mistrz Kalendarza', icon: '📅' },
        steps: [stepB4_zakres, stepB1_dostepnosc, stepB2_pedzel, stepB3_notatka],
        celebrationMessage: 'Twoja dostępność jest ustawiona! Pracodawca wie kiedy możesz pracować. 💪',
        zabekEvolution: 'cape',
        completionBonusXP: 150,
    },
    {
        id: 'emp-ch-rozliczenia',
        number: 3,
        title: 'Rozliczanie Godzin',
        icon: '⏱️',
        badge: { id: 'emp-badge-rozliczenia', name: 'Punktualny Żabian', icon: '⏱️' },
        steps: [stepC1_rozlicz, stepC2_edytuj, stepC3_sklep],
        celebrationMessage: 'Rozliczanie godzin opanowane! Żadna zmiana Ci nie umknie! ⏱️',
        zabekEvolution: 'flag',
        completionBonusXP: 150,
    },
    {
        id: 'emp-ch-harmonogram',
        number: 4,
        title: 'Twój Harmonogram',
        icon: '🗓️',
        badge: { id: 'emp-badge-harmonogram', name: 'Zawsze Na Czas', icon: '🗓️' },
        steps: [stepD1_grafik],
        celebrationMessage: 'Gratulacje! Wiesz już wszystko co potrzebne! Jesteś mistrzem onboardingu! 🏆🐸',
        zabekEvolution: 'golden',
        completionBonusXP: 150,
    },
];

// ─── Quick Help Shortcuts ─────────────────────────────────────────────

export const QUICK_HELP_SHORTCUTS: QuickHelpShortcut[] = [
    {
        id: 'qh-rozlicz',
        label: 'Rozlicz zmianę',
        icon: '⏱️',
        targetStepId: 'emp-c1-rozlicz',
        miniAnswer: [
            '🐸 Wejdź w zakładkę **Rozliczenie** w menu głównym.',
            'Kliknij nazwisko pracownika → wprowadź godziny → **Zatwierdź**.',
            'Pamiętaj: rozliczenie musisz zatwierdzić przed końcem dnia!',
        ],
    },
    {
        id: 'qh-grafik',
        label: 'Sprawdź grafik',
        icon: '🗓️',
        targetStepId: 'emp-d1-grafik',
        miniAnswer: [
            '🐸 Otwórz zakładkę **Grafik** — zobaczysz swój plan na cały tydzień.',
            'Przesuwaj palcem w lewo/prawo żeby zobaczyć kolejne dni.',
        ],
    },
    {
        id: 'qh-dostepnosc',
        label: 'Ustaw dostępność',
        icon: '📅',
        targetStepId: 'emp-b1-dostepnosc',
        miniAnswer: [
            '🐸 Wejdź w **Dostępność** z menu głównego.',
            'Wybierz dzień na kalendarzu → ustaw status (dostępny/niedostępny) → **Zapisz**.',
            'Im wcześniej ustawisz dostępność, tym lepiej menedżer zaplanuje grafik!',
        ],
    },
];

// ─── Helpers ──────────────────────────────────────────────────────────

/** Get all steps across all chapters (flat) */
export function getAllChatSteps(): ChatStep[] {
    return EMPLOYEE_CHAT_CHAPTERS.flatMap((ch) => ch.steps);
}

/** Find a step by id */
export function findChatStep(stepId: string): ChatStep | undefined {
    return getAllChatSteps().find((s) => s.id === stepId);
}

/** Find a chapter by id */
export function findChatChapter(chapterId: string): ChatChapter | undefined {
    return EMPLOYEE_CHAT_CHAPTERS.find((ch) => ch.id === chapterId);
}

/** Search steps by keyword */
export function searchChatSteps(query: string): ChatStep[] {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return getAllChatSteps().filter(
        (step) =>
            step.title.toLowerCase().includes(q) ||
            step.keywords.some((kw) => kw.toLowerCase().includes(q)) ||
            step.quickAnswer.toLowerCase().includes(q),
    );
}

/** Total possible XP across all chapters + bonus */
export function getTotalPossibleXP(): number {
    return EMPLOYEE_CHAT_CHAPTERS.reduce(
        (sum, ch) => sum + ch.completionBonusXP + ch.steps.reduce((s, step) => s + step.xpReward, 0),
        0,
    );
}
