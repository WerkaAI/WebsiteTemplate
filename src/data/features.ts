export type FeatureModule = {
  id: string
  title: string
  summary: string
  highlights: string[]
  badge?: string
}

export const featureModules: FeatureModule[] = [
  {
    id: 'stores',
    title: 'Zarządzanie sklepami',
    summary: 'Centralne miejsce do prowadzenia wszystkich lokalizacji wraz z bieżącą kontrolą obsady i zgodnością BHP.',
    highlights: [
      'Twórz i aktualizuj profile sklepów wraz z adresami i parametrami operacyjnymi.',
      'Przypisuj zespoły do konkretnych lokalizacji i monitoruj kompletność obsady.',
      'Otrzymuj kontekstowe wskazówki BHP i prawne dopasowane do danej placówki.'
    ],
    badge: 'Moduł główny'
  },
  {
    id: 'people',
    title: 'Zarządzanie personelem',
    summary: 'Pełna ewidencja pracowników, ról i umów z systemem ostrzeżeń przed ryzykiem naruszeń prawa pracy.',
    highlights: [
      'Dodawaj pracowników, przypisuj role i dostęp do sklepów w kilku kliknięciach.',
      'Przechowuj dane o typach umów, stawkach i obowiązywaniu w jednym miejscu.',
      'Korzystaj z automatycznych alertów prawnych przy ryzykownych konfiguracjach umów.'
    ]
  },
  {
    id: 'availability',
    title: 'Dostępność i preferencje',
    summary: 'Zbierz deklaracje zmian bez konieczności wymiany wiadomości i wykorzystaj je w planowaniu.',
    highlights: [
      'Pracownicy sami zgłaszają dostępność i preferowane zmiany.',
      'Notatki dla właściciela pomagają reagować na wyjątkowe potrzeby.',
      'Preferencje trafiają prosto do silnika układania grafików.'
    ]
  },
  {
    id: 'schedule',
    title: 'Harmonogram pracy',
    summary: 'Serce systemu, które automatyzuje planowanie grafików i blokuje naruszenia kodeksowe zanim się wydarzą.',
    highlights: [
      'Automatyczne lub ręczne planowanie zmian z wizualnym podglądem siatki.',
      'Wbudowane reguły odpoczynków dobowych i tygodniowych (11h/35h).',
      'Zarządzanie urlopami, zamianami zmian i gotowe eksporty dla zespołu.'
    ],
    badge: 'Auto harmonogram'
  },
  {
    id: 'timesheets',
    title: 'Rozliczanie godzin i kas',
    summary: 'Precyzyjne raportowanie przepracowanego czasu, rozliczeń kasowych oraz dokumentacji kontrolnej.',
    highlights: [
      'Pracownicy zatwierdzają zmiany, a system rozlicza godziny automatycznie.',
      'Prowadź ewidencję gotówki, niedoborów oraz zaliczek w jednym widoku.',
      'Generuj kompletne zestawienia PIP i księgowości gotowe do wysyłki.'
    ]
  },
  {
    id: 'automation',
    title: 'Silnik automatyzacji grafików',
    summary: 'Algorytm, który rozumie realia franczyzy i respektuje zarówno potrzeby biznesu, jak i prawo pracy.',
    highlights: [
      'Układa grafiki na podstawie dostępności, umów i sezonowości ruchu.',
      'Tworzy szablony obsady, które możesz zapisać i szybko uruchomić na nowy tydzień.',
      'Proponuje korekty, gdy wykryje ryzyko naruszeń, zanim zobaczy je PIP.'
    ],
    badge: 'AI wspomaganie'
  }
]

export const legalHighlights: string[] = [
  'Ikony § z kontekstową pomocą prawną pojawiają się dokładnie w miejscach podejmowania decyzji.',
  'Alerty o potencjalnych naruszeniach (np. doba pracownicza, zbyt mało odpoczynku) wraz z gotową podpowiedzią co poprawić.',
  'Szablony dokumentów i eksporty zgodne z wymaganiami PIP oraz RODO.',
  'Automatyczne przypomnienia o terminach retencji dokumentów i aktualizacji umów.'
]

export type BenefitGroup = {
  audience: string
  summary: string
  points: string[]
}

export const benefitGroups: BenefitGroup[] = [
  {
    audience: 'Franczyzobiorcy i właściciele sklepów',
    summary: 'Spokój operacyjny i prawny bez utraty kontroli nad biznesem.',
    points: [
      'Oszczędzasz 8–12 godzin tygodniowo na planowaniu i rozliczeniach.',
      'Masz pewność, że grafiki i dokumentacja przechodzą kontrolę PIP.',
      'Widzisz stan obsady każdego sklepu i reagujesz zanim powstanie luka.'
    ]
  },
  {
    audience: 'Zespół sklepu',
    summary: 'Transparentny grafik i jasna komunikacja bez dodatkowych aplikacji.',
    points: [
      'Pracownicy deklarują dostępność i preferują zmiany, co buduje fair kulturę.',
      'Każdy ma podgląd na harmonogram i rozliczenia w czasie rzeczywistym.',
      'Automatyczne powiadomienia informują o zmianach i akceptacjach.'
    ]
  },
  {
    audience: 'Biura rachunkowe i księgowe',
    summary: 'Dane dostarczone w standardowych formatach, gotowe do księgowania.',
    points: [
      'Eksporty XLSX i CSV z pełnymi danymi do rozliczeń delegowanych.',
      'Komplet dokumentów pracowniczych bez dzwonienia do sklepu.',
      'Stały podgląd zgodności z przepisami ułatwia audyty i doradztwo.'
    ]
  }
]

export type TimelineStep = {
  title: string
  description: string
}

export const onboardingTimeline: TimelineStep[] = [
  {
    title: 'Dzień 1: konfiguracja konta',
    description: 'Wprowadzasz sklepy, umowy i członków zespołu. Asystent prowadzi Cię krok po kroku.'
  },
  {
    title: 'Dzień 2–3: pierwszy grafik',
    description: 'Silnik proponuje harmonogram z uwzględnieniem dostępności i umów. Ty akceptujesz i publikujesz.'
  },
  {
    title: 'Dzień 4–5: automatyczne alerty',
    description: 'Otrzymujesz powiadomienia o ewentualnych naruszeniach i poprawiasz je jednym kliknięciem.'
  },
  {
    title: 'Dzień 6–7: raporty i spokój',
    description: 'Generujesz dokumenty PIP, zestawienia kasowe i ustalasz ciągły rytm pracy.'
  }
]

export const experienceHighlights: { title: string; description: string }[] = [
  {
    title: 'Wielojęzyczny interfejs',
    description: 'Polski, angielski i ukraiński interfejs ułatwia onboarding całego zespołu.'
  },
  {
    title: 'Powiadomienia w czasie rzeczywistym',
    description: 'Dzwonek powiadomień, e-maile i SMS-y informują o kluczowych zmianach.'
  },
  {
    title: 'Widget pomocy 24/7',
    description: 'Bezpośrednie wsparcie zespołu AutoŻaba i dostęp do bazy wiedzy w jednym miejscu.'
  },
  {
    title: 'Bezpieczeństwo i RODO',
    description: 'Szyfrowanie danych, kopie zapasowe i pełna zgodność z ochroną danych osobowych.'
  }
]

export const heroMetrics: { value: string; label: string; description: string }[] = [
  {
    value: '15 min',
    label: 'na kompletny grafik',
    description: 'Automatyzacja planowania zmian skraca cotygodniową pracę do kwadransa.'
  },
  {
    value: '0 kar',
    label: 'z kontroli PIP',
    description: 'Wbudowana tarcza prawna pilnuje, by grafiki i dokumentacja spełniały wymagania.'
  },
  {
    value: '24/7',
    label: 'wsparcie AutoŻaba',
    description: 'Pomoc techniczna i prawną otrzymujesz dokładnie wtedy, gdy jej potrzebujesz.'
  }
]
