/* ───────────────────────────────────────────────────
   Pricing configuration — single product, simple path
   ─────────────────────────────────────────────────── */

export const pricingConfig = {
  regularPrice: 199,
  promoPrice: 149,
  discountPercent: 25,
  additionalStoreRegular: 100,
  additionalStorePromo: 75,
  trialDays: 14,
  guaranteeMonths: 12,
  ctaHref: 'https://app.example.com/register',
  ctaLabel: 'Wypróbuj produkt za darmo',
  ctaSubtext: 'Bez zobowiązań · Bez karty płatniczej · Pełen dostęp przez 14 dni',
} as const

/** Calculate total monthly price for N locations (promo) */
export function calcPromoPrice(stores: number): number {
  if (stores <= 0) return 0
  return pricingConfig.promoPrice + Math.max(0, stores - 1) * pricingConfig.additionalStorePromo
}

/** Calculate total monthly price for N locations (regular) */
export function calcRegularPrice(stores: number): number {
  if (stores <= 0) return 0
  return pricingConfig.regularPrice + Math.max(0, stores - 1) * pricingConfig.additionalStoreRegular
}

/* ─── Steps (replaces old "plans") ─── */

export type PricingStep = {
  id: string
  step: number
  title: string
  headline: string
  details: string[]
  priceLabel?: string
  priceRegular?: string
  badge?: string
}

export const pricingSteps: PricingStep[] = [
  {
    id: 'trial',
    step: 1,
    title: 'Wypróbuj za darmo',
    headline: '14 dni pełnego dostępu — bez żadnych opłat',
    details: [
      'Pełen dostęp do grafików, ewidencji i dokumentów',
      'Konsultant przeprowadzi Cię przez cały system',
      'Wsparcie czatowe 9:00–21:00 przez 14 dni',
    ],
    priceLabel: '0 zł',
    badge: 'Start tutaj',
  },
  {
    id: 'subscription',
    step: 2,
    title: 'Wybierz abonament',
    headline: 'Jedna lokalizacja — jedna stała cena, bez limitów',
    details: [
      'Grafiki zgodne z kodeksem pracy w kilka minut',
      'Ewidencja czasu pracy i rozliczenia w jednym miejscu',
      'Pomoc we wdrożeniu — krok po kroku',
      'Dokumenty operacyjne gotowe do archiwizacji',
      'Bez limitu pracowników',
    ],
    priceLabel: '149 zł / mies.',
    priceRegular: '199 zł',
    badge: '-25% przez pierwszy rok',
  },
  {
    id: 'additional-stores',
    step: 3,
    title: 'Dodaj kolejne lokalizacje',
    headline: 'Zarządzaj wieloma lokalizacjami z jednego miejsca',
    details: [
      'Wspólne planowanie obsady dla wszystkich lokalizacji',
      'Raporty dla wszystkich lokalizacji',
      'Szybka pomoc, kiedy jej potrzebujesz',
      'Każda kolejna lokalizacja to prosty dodatek do abonamentu',
    ],
    priceLabel: '+75 zł / kolejna lokalizacja',
    priceRegular: '+100 zł',
    badge: '-25% przez pierwszy rok',
  },
]

/* ─── What you get — universal features ─── */

export const universalFeatures: string[] = [
  'Automatyczne grafiki zgodne z prawem pracy',
  'Ewidencja czasu pracy i rozliczenia kasowe',
  'Dokumenty operacyjne — gotowe do archiwizacji',
  'Pomoc we wdrożeniu — krok po kroku',
  'Wsparcie prawne i techniczne',
  'Bez limitu pracowników',
  'Dostęp z telefonu i komputera',
]

/* ─── Legacy export for backward compatibility ─── */

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
    description: '',
    bestFor: '1–3 lokalizacje na starcie',
    highlights: [
      'Pełen dostęp do grafików, ewidencji i dokumentów',
      'Konsultant przeprowadzi Cię przez cały system i odpowie na pytania',
      'Wsparcie czatowe 9:00–21:00 przez 14 dni',
    ],
    cta: 'Przetestuj za darmo',
    ctaHref: 'https://app.example.com/register',
    badge: 'Najpierw sprawdź',
    isFeatured: false,
  },
  {
    id: 'single-store',
    title: 'Jedna lokalizacja',
    headline: 'Stała kontrola nad grafikiem i dokumentami',
    priceMonthly: '149 zł / mies.',
    annualNote: 'Cena gwarantowana przez 12 miesięcy',
    description: '',
    bestFor: '1 lokalizacja | do 15 osób',
    highlights: [
      'Grafiki zgodne z kodeksem pracy w kilka minut',
      'Ewidencja czasu pracy i rozliczenia kasowe w jednym miejscu',
      'Pomoc we wdrożeniu — krok po kroku',
      'Bez limitu pracowników',
    ],
    cta: 'Wypróbuj za darmo',
    ctaHref: 'https://app.example.com/register',
    badge: 'Najczęstszy wybór',
    isFeatured: true,
  },
]

/* ─── Add-ons (kept for future use) ─── */

export type AddOn = {
  title: string
  description: string
  price: string
}

export const addOns: AddOn[] = [
  {
    title: 'Pakiet komunikacji SMS',
    description: 'Dodatkowa pula 500 wiadomości SMS miesięcznie do powiadomień zmianowych.',
    price: '49 zł / mies.',
  },
  {
    title: 'Integracja kadrowo-płacowa',
    description: 'Dwukierunkowa integracja z wybranym systemem kadrowo-płacowym (Enova, Teta, Optima).',
    price: 'od 249 zł / mies.',
  },
  {
    title: 'Audyt procesów na życzenie',
    description: 'Symulacja audytu z raportem ryzyk i rekomendacjami działań.',
    price: '749 zł jednorazowo',
  },
]

/* ─── FAQ ─── */

export type FAQItem = {
  question: string
  answer: string
}

export const pricingFaq: FAQItem[] = [
  {
    question: 'Czy mogę przetestować produkt przed podpisaniem umowy?',
    answer:
      'Tak. Po rejestracji masz 14 dni pełnego dostępu do wszystkich funkcji — za darmo i bez zobowiązań. W tym czasie konsultant pomoże Ci skonfigurować system i odpowie na każde pytanie.',
  },
  {
    question: 'Ile kosztuje system, jeśli mam kilka lokalizacji?',
    answer:
      'Pierwsza lokalizacja to 149 zł/mies. (cena promocyjna, regularnie 199 zł). Każda kolejna lokalizacja to +75 zł/mies. (regularnie +100 zł). Na przykład: 2 lokalizacje = 224 zł/mies., 3 lokalizacje = 299 zł/mies. Cena promocyjna jest gwarantowana przez 12 miesięcy.',
  },
  {
    question: 'Czy cena 149 zł/mies. się zmieni?',
    answer:
      'Cena 149 zł/mies. to promocja -25% gwarantowana przez 12 miesięcy od momentu aktywacji. Po tym okresie cena wynosi 199 zł/mies., ale poinformujemy Cię o tym z wyprzedzeniem.',
  },
  {
    question: 'Czy wszyscy klienci dostają te same funkcje?',
    answer:
      'Tak. Każdy użytkownik ma dostęp do wszystkich funkcji — bez sztucznego podziału na pakiety o różnym zakresie.',
  },
  {
    question: 'Czy dane są bezpieczne i zgodne z RODO?',
    answer:
      'Tak. Dane przechowujemy na serwerach spełniających wymogi RODO, z szyfrowaniem w spoczynku i w transmisji. Zapewniamy umowę powierzenia przetwarzania danych osobowych.',
  },
  {
    question: 'Jak wygląda wdrożenie i czy ktoś mi pomoże?',
    answer:
      'Jak najbardziej. Nasz konsultant przeprowadzi Cię przez cały system — pokaże każdą funkcję, opowie jak z niej korzystać i odpowie na wszystkie pytania. Jesteśmy z Tobą na każdym etapie.',
  },
]

/* ─── Value highlights ─── */

export const valueHighlights: { title: string; description: string }[] = [
  {
    title: 'Oszczędność czasu',
    description: 'Średnio 2–4 godziny odzyskane tygodniowo dzięki automatycznym grafikom i gotowym raportom.',
  },
  {
    title: 'Pełna spójność procesowa',
    description:
      'Silnik systemu generuje dokumentację zgodną z przyjętymi standardami i podpowiada działania, ale nie blokuje Twoich decyzji.',
  },
  {
    title: 'Wsparcie ekspertów',
    description:
      'Konsultanci są dostępni przez telefon, e-mail i w aplikacji — zawsze gotowi pomóc.',
  },
]

export const guaranteePoints: string[] = [
  'Umowa miesięczna bez długoterminowych zobowiązań — możesz zrezygnować w dowolnym momencie.',
  'Wdrożenie z dedykowanym opiekunem zapewnia pełną pomoc w konfiguracji i przeszkolenie zespołu.',
]
