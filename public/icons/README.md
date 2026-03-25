# Customowe Ikony SVG — FizjoterapiaWrocław

Ten katalog (`public/icons/`) przeznaczony jest na dedykowane, minimalistyczne ikony linearne zamówione u grafika.

## Zamówione ze spotkania Fazy 3 (6 sztuk)

Styl: liniowe, jednokolorowe SVG (stroke, brak fill), grubość kreski 1.5px, rozmiar viewport 24x24.
Kolor bazowy: `currentColor` (aby ikony dziedzicziły kolor z CSS).

| Plik                  | Opis                                    | Status     |
|-----------------------|-----------------------------------------|------------|
| `icon-spine.svg`      | Zarys kręgosłupa (widok boczny)         | ⏳ oczekuje |
| `icon-hand-therapy.svg` | Dłonie podczas terapii              | ⏳ oczekuje |
| `icon-foot.svg`       | Stopa (widok boczny, naturalny łuk)     | ⏳ oczekuje |
| `icon-knee.svg`       | Kolano / staw kolanowy                  | ⏳ oczekuje |
| `icon-shoulder.svg`   | Bark / obręcz barkowa                   | ⏳ oczekuje |
| `icon-movement.svg`   | Ruch / zakres ruchu (postać w ruchu)    | ⏳ oczekuje |

## Instrukcja dla grafika

1. Eksportuj jako SVG z `viewBox="0 0 24 24"`
2. Użyj `stroke="currentColor"` i `fill="none"`
3. `stroke-width="1.5"`, `stroke-linecap="round"`, `stroke-linejoin="round"`
4. Brak wewnętrznych `style=""` ani hardkodowanych kolorów
5. Plik powinien mieć < 2KB

## Użycie w kodzie (placeholder do czasu dostarczenia)

```tsx
import IconSpine from "@/public/icons/icon-spine.svg";
// lub jako img z next/image dla SVG

<img
  src="/icons/icon-spine.svg"
  alt=""
  aria-hidden="true"
  className="w-6 h-6"
/>
```
