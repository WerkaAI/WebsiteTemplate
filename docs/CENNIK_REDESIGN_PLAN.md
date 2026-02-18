# Plan Redesignu Strony /cennik — Zespół 5 Person

## Skład Zespołu

| Rola | Imię | Odpowiedzialność |
|---|---|---|
| **CEO Projektu** | Marcin | Wizja produktu, strategia biznesowa, finalne zatwierdzenie |
| **Specjalista ds. Marketingu** | Anna | Pozycjonowanie oferty, komunikacja wartości, konwersja |
| **Specjalista ds. Komunikacji** | Kasia | Ton głosu, prostota języka, czytelność przekazu |
| **UX/UI Designer** | Tomek | Architektura informacji, layout, interakcje, hierarchia wizualna |
| **Senior Web Developer** | Paweł | Wykonalność techniczna, implementacja, wydajność |

---

## 1. Diagnoza obecnego stanu (wspólna analiza)

### Problemy zidentyfikowane przez zespół:

**Marcin (CEO):**
> Strona prezentuje 3 pakiety jakby to były różne produkty — ale w rzeczywistości to jest JEDEN produkt z jedną ścieżką: trial → płatny abonament → opcjonalnie więcej sklepów. Wszystkie 3 przyciski prowadzą na app.autozaba.pl/register. To myli użytkownika i rozmywa decyzję.

**Anna (Marketing):**
> Brakuje kotwicy cenowej — nie widać, że 149 zł to -25% promocja. Bez przekreślonej ceny regularnej (199 zł) klient nie czuje, że dostaje okazję. Dodatkowo cena za kolejny sklep (50 zł) jest zaniżona — powinna być 100 zł regularnie, 75 zł w promocji. Trzy równorzędne karty sugerują trzy oddzielne decyzje, a powinna być JEDNA jasna ścieżka.

**Kasia (Komunikacja):**
> Używamy słów obcych naszemu klientowi: "multistore", "onboarding 1:1", "compliance", "konsultacje compliance". Nasz klient to "Zmęczony Bohater" — franczyzobiorca Żabki pracujący 16h dziennie. Musimy mówić prosto: "pomoc we wdrożeniu", "wspólne zarządzanie wieloma sklepami", "wsparcie prawne". Opisy pod tytułami na kartach są zbyt długie i niepotrzebne.

**Tomek (UX/UI):**
> Trzy karty w layoucie sugerują porównanie i wybór — klasyczny pricing table. Ale skoro nie ma wyboru (każdy dostaje to samo), to layout kłamie. Potrzebujemy zupełnie innej architektury informacji: jedna jasna ścieżka z krokami, a nie porównanie pakietów.

**Paweł (Developer):**
> Dane w `pricing.ts` powielają informacje z homepage `pricing-section.tsx` — to dwa źródła prawdy. Trzeba zaktualizować oba. Struktura `PricingPlan` wymaga pól na cenę regularną i promocyjną.

---

## 2. Nowa koncepcja strony /cennik

### 2.1 Wizja strategiczna (Marcin, CEO)

**Kluczowa zmiana:** Zamiast 3 pakietów do porównania → **Jedna oferta z przejrzystą ścieżką dołączenia.**

Ścieżka klienta:
1. Rejestrujesz się → dostajesz **14 dni za darmo** (pełen dostęp)
2. Po 14 dniach → **149 zł/mies.** za 1 sklep (cena promocyjna, regularnie 199 zł)
3. Chcesz więcej sklepów? → **+75 zł za każdy kolejny** (regularnie +100 zł)

Nie ma pakietów. Jest JEDEN produkt. Każdy dostaje WSZYSTKO.

### 2.2 Strategia komunikacji cenowej (Anna, Marketing)

**Kotwica cenowa — technika przekreślonej ceny:**
- Cena regularna: ~~199 zł/mies.~~ → **149 zł/mies.**
- Oznaczyć jako: "Promocja na pierwszy rok: -25%"
- Kolejny sklep: ~~+100 zł~~ → **+75 zł/mies.**
- Jasna informacja: "Cena gwarantowana przez 12 miesięcy"

**Jeden przycisk CTA:**
- Zamiast 3 przycisków → 1 duży, zachęcający przycisk
- Tekst: "Wypróbuj 14 dni za darmo" / "Dołącz do AutoŻaby"
- Kolor: emerald-500, duży, z animacją pulse
- Pod przyciskiem: "Bez zobowiązań • Bez karty płatniczej • Pełen dostęp"

### 2.3 Język i ton (Kasia, Komunikacja)

**Słowa do usunięcia/zastąpienia:**

| Było | Będzie |
|---|---|
| Onboarding 1:1 | Pomoc we wdrożeniu — krok po kroku |
| Multi-store | Zarządzanie wieloma sklepami |
| Konsultacje compliance | Wsparcie prawne |
| Raporty multi-store | Raporty dla wszystkich sklepów |
| Priorytetowe wsparcie 24/7 | Szybka pomoc, kiedy jej potrzebujesz |

**Teksty do usunięcia (zaznaczone na screenie):**
1. Opis trial: "Sprawdź AutoŻabę bez ryzyka — nasz konsultant pokaże Ci krok po kroku każdą funkcję i pomoże skonfigurować system." → USUNĄĆ
2. Opis multi-store: "Centralizuje raporty, grafik i wsparcie prawne dla kilku lokalizacji. Każdy dodatkowy sklep to jedynie 50 zł więcej." → USUNĄĆ

### 2.4 Nowa architektura strony (Tomek, UX/UI)

```
┌──────────────────────────────────────────────────────┐
│  HERO: "Jeden system. Prosta cena. Pełna ochrona."  │
│  Podtytuł + badge "Promocja -25% na pierwszy rok"   │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌─── JAK TO DZIAŁA? 3 KROKI ──────────────────┐   │
│  │                                               │   │
│  │  ① WYPRÓBUJ ZA DARMO                         │   │
│  │     14 dni pełnego dostępu                    │   │
│  │     Bez karty, bez zobowiązań                 │   │
│  │                                               │   │
│  │  ② WYBIERZ ABONAMENT                         │   │
│  │     ~~199 zł~~ → 149 zł/mies. za sklep      │   │
│  │     -25% przez pierwszy rok                   │   │
│  │                                               │   │
│  │  ③ DODAJ KOLEJNE SKLEPY (opcjonalnie)        │   │
│  │     ~~+100 zł~~ → +75 zł za każdy kolejny   │   │
│  │     -25% przez pierwszy rok                   │   │
│  │                                               │   │
│  └───────────────────────────────────────────────┘   │
│                                                      │
│  ┌──── CO DOSTAJESZ? ───────────────────────────┐   │
│  │  ✓ Grafiki zgodne z prawem w kilka minut      │   │
│  │  ✓ Ewidencja czasu pracy i rozliczenia        │   │
│  │  ✓ Dokumenty PIP/BHP gotowe do kontroli       │   │
│  │  ✓ Pomoc we wdrożeniu — krok po kroku         │   │
│  │  ✓ Wsparcie prawne i techniczne               │   │
│  │  ✓ Bez limitu pracowników                     │   │
│  └───────────────────────────────────────────────┘   │
│                                                      │
│  ┌──── WIELKI PRZYCISK CTA ─────────────────────┐   │
│  │  [ 🐸 Wypróbuj AutoŻabę za darmo ]           │   │
│  │  Bez zobowiązań • Pełen dostęp • 14 dni      │   │
│  └───────────────────────────────────────────────┘   │
│                                                      │
│  ┌──── KALKULATOR CENY ─────────────────────────┐   │
│  │  Ile masz sklepów?  [1] [2] [3] [4] [5]      │   │
│  │  Twoja cena:  149 zł / mies.                  │   │
│  │  (regularnie: 199 zł — oszczędzasz 50 zł)    │   │
│  └───────────────────────────────────────────────┘   │
│                                                      │
│  ┌──── WARTOŚĆ — BENTO GRID ────────────────────┐   │
│  │  (Istniejąca sekcja z koszt summary)          │   │
│  └───────────────────────────────────────────────┘   │
│                                                      │
│  ┌──── WDROŻENIE W 7 DNI ───────────────────────┐   │
│  │  (Istniejąca sekcja onboarding timeline)      │   │
│  └───────────────────────────────────────────────┘   │
│                                                      │
│  ┌──── FAQ ─────────────────────────────────────┐   │
│  │  (Zaktualizowane FAQ)                         │   │
│  └───────────────────────────────────────────────┘   │
├──────────────────────────────────────────────────────┤
│  FOOTER                                              │
└──────────────────────────────────────────────────────┘
```

### 2.5 Implementacja techniczna (Paweł, Developer)

**Zmiany w plikach:**

1. **`src/data/pricing.ts`** — Zastąpić 3 plany jedną strukturą danych + kalkulator
2. **`src/app/cennik/page.tsx`** — Nowy layout: kroki zamiast kart, jeden CTA, kalkulator
3. **`src/components/features/home/pricing-section.tsx`** — Zsynchronizować z nowym podejściem

**Nowe elementy:**
- Komponent kalkulatora ceny (interaktywny)
- Animacja crossed-out price
- Jeden duży CTA button z subtekstem

**Zaktualizowane typy:**
```typescript
type PricingConfig = {
  regularPrice: number      // 199
  promoPrice: number        // 149
  discount: string          // "-25%"
  additionalStoreRegular: number  // 100
  additionalStorePromo: number    // 75
  trialDays: number         // 14
  guaranteeMonths: number   // 12
}
```

---

## 3. Plan realizacji

| Krok | Zadanie | Priorytet |
|---|---|---|
| 1 | Zaktualizować `pricing.ts` — nowa struktura danych | P0 |
| 2 | Przebudować `cennik/page.tsx` — nowy layout z krokami | P0 |
| 3 | Dodać kalkulator ceny (interaktywny) | P0 |
| 4 | Usunąć zaznaczone na czerwono teksty | P0 |
| 5 | Dodać przekreśloną cenę regularną + badge -25% | P0 |
| 6 | Zamienić 3 CTA na 1 duży przycisk | P0 |
| 7 | Oczyścić język z żargonu | P0 |
| 8 | Zaktualizować FAQ pod nowy model | P1 |
| 9 | Zsynchronizować homepage pricing-section | P1 |
| 10 | Zmienić tytuł sekcji onboarding ("Onboarding" → "Wdrożenie") | P1 |

---

## 4. Zatwierdzenie zespołu

- [x] **Marcin (CEO):** Zatwierdzam wizję jednej oferty zamiast 3 pakietów.
- [x] **Anna (Marketing):** Zatwierdzam strategię kotwicy cenowej i jeden CTA.
- [x] **Kasia (Komunikacja):** Zatwierdzam czyszczenie języka i listę zamian.
- [x] **Tomek (UX/UI):** Zatwierdzam nową architekturę informacji z krokami.
- [x] **Paweł (Developer):** Zatwierdzam plan techniczny. Przystępuję do implementacji.
