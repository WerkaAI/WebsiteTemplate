export type PricingPlan = {
  id: string
  title: string
  headline: string
  priceMonthly: string
  priceYearly?: string
  annualNote?: string
  description: string
  bestFor: string
  highlights: string[]
  cta: string
  ctaHref: string
  badge?: string
  isFeatured?: boolean
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'trial',
    title: 'Free trial',
    headline: '14 dni pełnych funkcji bez zobowiązań',
    priceMonthly: '0 zł / 14 dni',
    description:
      'Przetestuj wszystkie moduły AutoŻaby bez ryzyka: od automatycznych grafików po dokumenty PIP. Dedykowany konsultant pomoże Ci w imporcie danych i konfiguracji pierwszych procesów.',
    bestFor: 'Testy i konfiguracja 1–3 sklepów',
    highlights: [
      'Pełen dostęp do grafików, ewidencji i dokumentów compliance',
      'Import grafików z Excela oraz konfiguracja szablonów obsady',
  'Warsztat wdrożeniowy 1:1 z konsultantem AutoŻaba',
  'Czat z zespołem wsparcia w trakcie trialu (9:00–21:00)'
    ],
    cta: 'Aktywuj darmowy trial',
    ctaHref: 'https://app.autozaba.pl/trial',
    badge: 'Najpierw sprawdź',
    isFeatured: false
  },
  {
    id: 'single-store',
    title: 'Pierwszy sklep',
    headline: 'Stała kontrola nad grafikiem i dokumentami',
    priceMonthly: '449 zł / mies.',
    priceYearly: '399 zł / mies.',
    annualNote: 'Płatność roczna: oszczędzasz 600 zł',
    description:
      'Pakiet dla franczyzobiorców prowadzących jeden sklep Żabka. Automatyzuje grafik, pilnuje kodeksu pracy i porządkuje rozliczenia zespołu.',
    bestFor: '1 lokalizacja | do 15 osób w zespole',
    highlights: [
      'Automatyczne układanie grafików z kontrolą przepisów',
      'Rejestracja czasu pracy i rozliczenia kasowe w jednym panelu',
      'Powiadomienia SMS/e-mail dla całego zespołu',
  'Biblioteka dokumentów PIP, RODO i BHP',
  'Wsparcie onboardingowe 1:1 (2 spotkania)'
    ],
    cta: 'Porozmawiaj o wdrożeniu',
    ctaHref: '/kontakt',
    badge: 'Najczęstszy wybór',
    isFeatured: true
  },
  {
    id: 'multi-store',
    title: 'Pełna automatyzacja dla kilku sklepów',
    headline: 'Spójne operacje w 2–5 lokalizacjach',
    priceMonthly: '649 zł / mies.',
    priceYearly: '599 zł / mies.',
    annualNote: 'Płatność roczna: oszczędzasz 960 zł',
    description:
      'Najczęściej wybierany przez właścicieli kilku sklepów. Zapewnia centralne raportowanie, wsparcie prawne i integracje z systemami księgowymi.',
    bestFor: '2–5 lokalizacji | do 50 osób w zespole',
    highlights: [
      'Wszystko z planu Pierwszy sklep + szablony obsady wielosklepowej',
      'Panel multi-store z porównaniem KPI i planów obsad',
      'Kwartalny audyt prawny i konsultacje compliance',
  'Integracje z biurem rachunkowym (XLSX/CSV/REST API)',
  'Priorytetowe wsparcie (SLA 4h) i hotline 24/7'
    ],
    cta: 'Zamów prezentację dla sieci',
    ctaHref: '/kontakt',
    badge: 'Dla sieci',
    isFeatured: false
  }
]

export type AddOn = {
  title: string
  description: string
  price: string
}

export const addOns: AddOn[] = [
  {
    title: 'Pakiet komunikacji SMS',
    description: 'Dodatkowa pula 500 wiadomości SMS miesięcznie do powiadomień zmianowych.',
    price: '49 zł / mies.'
  },
  {
    title: 'Integracja kadrowo-płacowa',
    description: 'Dwukierunkowa integracja z wybranym systemem kadrowo-płacowym (Enova, Teta, Optima).',
    price: 'od 249 zł / mies.'
  },
  {
    title: 'Audyt PIP on-demand',
    description: 'Symulacja kontroli PIP z raportem ryzyk i rekomendacjami działań korygujących.',
    price: '749 zł jednorazowo'
  }
]

export type FAQItem = {
  question: string
  answer: string
}

export const pricingFaq: FAQItem[] = [
  {
    question: 'Czy mogę przetestować AutoŻabę przed podpisaniem umowy?',
    answer:
      'Tak. Wybierz opcję Free trial, aby przez 14 dni korzystać ze wszystkich modułów. W tym czasie konsultant AutoŻaby pomaga w imporcie danych i konfiguracji procesów.'
  },
  {
    question: 'Jak działa rozliczanie w przypadku kilku sklepów?',
    answer:
      'Plan “Pełna automatyzacja dla kilku sklepów” obejmuje do pięciu lokalizacji w jednej opłacie abonamentowej. Dodatkowe sklepy możesz dodawać w dowolnym momencie, rozliczamy je proporcjonalnie do końca okresu.'
  },
  {
    question: 'Czy dane są bezpieczne i zgodne z RODO?',
    answer: 'Tak. Dane hostujemy w ramach infrastruktury spełniającej wymogi RODO, z szyfrowaniem w spoczynku i w transmisji. Zapewniamy umowę powierzenia przetwarzania danych osobowych.'
  },
  {
    question: 'Czy pomogą mi Państwo w migracji z Excela?',
    answer:
      'Oczywiście. W każdej opcji otrzymujesz checklistę migracji, a w planach “Pierwszy sklep” i “Pełna automatyzacja” dedykowany opiekun importuje dane i przygotowuje szablony grafików.'
  }
]

export const valueHighlights: { title: string; description: string }[] = [
  {
    title: 'Oszczędność czasu',
    description: 'Średnio 8-12 godzin tygodniowo odzyskanych przez właściciela dzięki automatycznym grafikom i gotowym raportom.'
  },
  {
    title: 'Pełna zgodność prawna',
    description: 'Silnik AutoŻaba blokuje naruszenia kodeksowe i generuje dokumentację zgodną z wymaganiami PIP.'
  },
  {
    title: 'Wsparcie ekspertów',
    description: 'Konsultanci i prawnicy AutoŻaby są dostępni przez telefon, e-mail i w aplikacji — 24/7 w planie Pełna automatyzacja.'
  }
]

export const guaranteePoints: string[] = [
  'Umowa miesięczna bez długoterminowych zobowiązań — możesz zrezygnować z miesięcznym wyprzedzeniem.',
  'Jeśli po 90 dniach nie widzisz poprawy wskaźników operacyjnych, oddamy Ci koszt jednego miesiąca abonamentu.',
  'Wdrożenie z dedykowanym opiekunem zapewnia pełną migrację danych i przeszkolenie zespołu.'
]
