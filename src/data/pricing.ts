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
  disabled?: boolean
  status?: {
    badge: string
    headline: string
    description: string
  }
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'trial',
    title: 'Przetestuj',
    headline: '14 dni pełnych funkcji bez zobowiązań',
    priceMonthly: '0 zł / 14 dni',
    description: 'Sprawdź AutoŻabę bez ryzyka — nasz konsultant pokaże Ci krok po kroku każdą funkcję i pomoże skonfigurować system.',
    bestFor: '1–3 sklepy na starcie',
    highlights: [
      'Pełen dostęp do grafików, ewidencji i dokumentów',
      'Konsultant przeprowadzi Cię przez cały system i odpowie na pytania',
      'Wsparcie czatowe 9:00–21:00 przez 14 dni'
    ],
    cta: 'Przetestuj za darmo',
    ctaHref: 'https://app.autozaba.pl/register',
    badge: 'Najpierw sprawdź',
    isFeatured: false
  },
  {
    id: 'single-store',
    title: 'Jeden sklep',
    headline: 'Stała kontrola nad grafikiem i dokumentami',
    priceMonthly: '149 zł / mies.',
    annualNote: 'Cena gwarantowana przez 12 miesięcy',
    description: 'Automatyzuje grafik, dokumenty PIP i codzienne rozliczenia w jednym sklepie.',
    bestFor: '1 lokalizacja | do 15 osób',
    highlights: [
      'Grafiki zgodne z kodeksem pracy w kilka minut',
      'Ewidencja czasu pracy i rozliczenia kasowe w jednym miejscu',
      'Onboarding 1:1 oraz biblioteka dokumentów PIP/BHP',
      'Nieograniczona liczba pracowników w cenie'
    ],
    cta: 'Wybierz plan',
    ctaHref: 'https://app.autozaba.pl/register',
    badge: 'Najczęstszy wybór',
    isFeatured: true
  },
  {
    id: 'multi-store',
    title: 'Kilka sklepów',
    headline: 'Spójne operacje w 2–5 lokalizacjach',
    priceMonthly: '149 zł + 50 zł / kolejny sklep',
    annualNote: 'Np. 2 sklepy = 199 zł/mies. — cena gwarantowana 12 mies.',
    description: 'Centralizuje raporty, grafik i wsparcie prawne dla kilku lokalizacji. Każdy dodatkowy sklep to jedynie 50 zł więcej.',
    bestFor: '2–5 lokalizacji | do 50 osób',
    highlights: [
      'Wspólne planowanie obsady dla wszystkich sklepów',
      'Raporty multi-store (wkrótce) i konsultacje compliance',
      'Priorytetowe wsparcie 24/7',
      'Każdy kolejny sklep tylko +50 zł/mies.'
    ],
    cta: 'Wybierz plan',
    ctaHref: 'https://app.autozaba.pl/register',
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
      'Pierwszy sklep kosztuje 149 zł/mies., a każdy kolejny to jedynie 50 zł/mies. więcej. Na przykład 3 sklepy to 249 zł/mies. Dodatkowe lokalizacje możesz dodawać w dowolnym momencie — rozliczamy je proporcjonalnie do końca okresu.'
  },
  {
    question: 'Czy cena 149 zł/mies. się zmieni?',
    answer:
      'Cena 149 zł/mies. jest gwarantowana przez 12 miesięcy od momentu aktywacji. To specjalna oferta dla klientów, którzy dołączają teraz — dzięki niej oszczędzasz 25% w porównaniu do ceny standardowej.'
  },
  {
    question: 'Czy dane są bezpieczne i zgodne z RODO?',
    answer: 'Tak. Dane hostujemy w ramach infrastruktury spełniającej wymogi RODO, z szyfrowaniem w spoczynku i w transmisji. Zapewniamy umowę powierzenia przetwarzania danych osobowych.'
  },
  {
    question: 'Jak wygląda wdrożenie i czy ktoś mi pomoże?',
    answer:
      'Jak najbardziej. Nasz konsultant przeprowadzi Cię przez cały system — pokaże każdą funkcję, opowie jak z niej korzystać i odpowie na wszystkie pytania. Jesteśmy z Tobą na każdym etapie.'
  }
]

export const valueHighlights: { title: string; description: string }[] = [
  {
    title: 'Oszczędność czasu',
    description: 'Średnio 2–4 godziny odzyskane tygodniowo dzięki automatycznym grafikom i gotowym raportom.'
  },
  {
    title: 'Pełna zgodność prawna',
    description: 'Silnik AutoŻaby generuje dokumentację zgodną z PIP i podpowiada przepisy, ale nie blokuje Twoich decyzji.'
  },
  {
    title: 'Wsparcie ekspertów',
    description: 'Konsultanci i prawnicy AutoŻaby są dostępni przez telefon, e-mail i w aplikacji — 24/7 w planie Pełna automatyzacja.'
  }
]

export const guaranteePoints: string[] = [
  'Umowa miesięczna bez długoterminowych zobowiązań — możesz zrezygnować w dowolnym momencie.',
  'Wdrożenie z dedykowanym opiekunem zapewnia pełną migrację danych i przeszkolenie zespołu.'
]
