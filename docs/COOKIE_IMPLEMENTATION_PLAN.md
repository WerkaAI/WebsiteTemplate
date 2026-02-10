# 🍪 Plan Wdrożenia Polityki Cookies — AutoŻaba

> **Data:** 09.02.2026  
> **Dotyczy:** www.autozaba.pl (marketing) + app.autozaba.pl (SaaS)  
> **Status:** DO ZATWIERDZENIA

---

## 0. Stan Obecny (Audyt)

| Element | Status |
|---|---|
| Cookie consent banner | ❌ Brak |
| Google Analytics / GTM | ❌ Brak (jest stub `useAnalytics`) |
| Meta Pixel / LinkedIn / inne piksele | ❌ Brak |
| Biblioteka CMP | ❌ Brak |
| Polityka prywatności | ✅ Jest (`/polityka-prywatnosci`), sekcja 12 już wspomina o 3 kategoriach cookies |
| Osobna strona Polityki Cookies | ❌ Brak |
| CSP + nonce system | ✅ Rozbudowany (`src/lib/security/csp.ts`) |
| Shadcn/ui komponenty | ✅ 46 komponentów (dialog, sheet, switch, toast) |
| Dark mode | ✅ Pełne wsparcie (class strategy) |
| `next/script` | ❌ Nie używany jeszcze |
| Env vars do trackingu | ❌ Brak (`GA_ID`, `GTM_ID` nie zdefiniowane) |

**Wniosek:** Projekt jest "czystą kartą" — brak jakiejkolwiek implementacji cookies/trackingu. Polityka prywatności już antycypuje 3 kategorie zgód.

---

## 1. Architektura Dualna: Marketing vs SaaS

Zgodnie z wytycznymi z dokumentu strategicznego, stosujemy **dwa różne podejścia**:

### 🌐 www.autozaba.pl (Strona Marketingowa — TEN PROJEKT)
- **Pełny baner cookies** z 3 przyciskami (Akceptuj / Odrzuć / Dostosuj)
- **Google Consent Mode v2** w trybie Advanced
- **Kategorie:** Niezbędne (bez zgody), Analityczne (zgoda), Marketingowe (zgoda)
- **CMP wbudowany** (custom, zbudowany na shadcn/ui — nie SaaS CMP)
- Obsługa sygnału **GPC (Global Privacy Control)**
- Zgodność z **WCAG 2.2 AA** (fokus trap, klawiatura, ARIA, kontrast)
- Persistentny link **„Ustawienia Cookies"** w stopce

### 🔒 app.autozaba.pl (Aplikacja SaaS)
- **Minimalistyczne podejście** — brak inwazyjnego banera
- Jedynie **cookies niezbędne** (sesja, CSRF, bezpieczeństwo) — bez zgody
- **Zakaz pikseli marketingowych** wewnątrz aplikacji
- Dyskretna informacja w stopce/ustawieniach
- Analityka produktowa (jeśli będzie) — wyłącznie zanonimizowana
- Izolacja domeny — cookies z `www.autozaba.pl` nie wyciekają do `app.autozaba.pl`

---

## 2. Plan Implementacji dla www.autozaba.pl (Ten Projekt)

### Faza 1: Infrastruktura Consent (Core)

#### 2.1 Typy i stałe konsentu
**Plik:** `src/lib/cookies/consent-types.ts`

```
Kategorie zgody:
- necessary    → zawsze aktywne, nie wymaga zgody
- analytics    → GA4, Hotjar itp. — wymaga opt-in
- marketing    → Google Ads, Meta Pixel, LinkedIn — wymaga opt-in

Stany zgody: 'granted' | 'denied'

Stan domyślny: { necessary: 'granted', analytics: 'denied', marketing: 'denied' }
```

#### 2.2 Zarządzanie stanem zgody (Cookie Storage)
**Plik:** `src/lib/cookies/consent-manager.ts`

Funkcjonalność:
- Zapis/odczyt preferencji w cookie `az_consent` (niezbędne — nie wymaga zgody)
- Format JSON: `{ analytics: "granted"|"denied", marketing: "granted"|"denied", timestamp: ISO, version: "1.0" }`
- Retencja: **12 miesięcy** (standard PKE)
- Flagi: `Secure; SameSite=Lax; Path=/`
- Scope: **ściśle `www.autozaba.pl`** — nie `.autozaba.pl`!
- Detekcja sygnału **GPC** (`navigator.globalPrivacyControl`)
- Jeśli GPC=true → automatycznie `analytics: denied, marketing: denied`, baner nie wyskakuje

#### 2.3 Google Consent Mode v2 Integration
**Plik:** `src/lib/cookies/gcm-v2.ts`

```
Domyślny stan (prior consent):
  ad_storage: 'denied'
  ad_user_data: 'denied'
  ad_personalization: 'denied'
  analytics_storage: 'denied'
  functionality_storage: 'granted'
  personalization_storage: 'denied'
  security_storage: 'granted'

  wait_for_update: 500ms
  url_passthrough: true
  ads_data_redaction: true

Po zgodzie → gtag('consent', 'update', { ... })
```

Snippet inicjalizacyjny musi załadować się PRZED GTM/gtag.

#### 2.4 Script Loader (Consent-gated)
**Plik:** `src/lib/cookies/script-loader.ts`

- Registry skryptów z przypisaniem do kategorii
- Ładowanie skryptów dopiero PO uzyskaniu zgody na daną kategorię
- Wykorzystanie `next/script` z strategią `afterInteractive`
- Integracja z CSP nonce (obecny system)

---

### Faza 2: Komponent UI — Cookie Banner

#### 2.5 Cookie Banner (Layer 1)
**Plik:** `src/components/cookies/cookie-banner.tsx`

Wymogi UI:
- **3 równorzędne przyciski**: „Akceptuj wszystko", „Odrzuć wszystko", „Dostosuj"
- Przyciski „Akceptuj" i „Odrzuć" — **identyczny rozmiar i waga wizualna** (symetria wyboru!)
- „Dostosuj" — przycisk wariantu `outline` (mniejsza waga, ale widoczny)
- **Nie blokuje scroll** — pojawia się na dole ekranu (fixed bottom)
- Link do Polityki Prywatności widoczny bezpośrednio z banera
- Dark mode support (obowiązkowe)
- Mobile: max ~35% ekranu, przyciski min 44×44px dotyk
- Nie pojawia się jeśli GPC=true (automatyczne odrzucenie)
- Nie pojawia się jeśli consent jest już zapisany

Tekst (zgodny z wytycznymi):
```
"Szanujemy Twoją prywatność. Serwis autozaba.pl wykorzystuje pliki cookies 
niezbędne do jego prawidłowego działania. Za Twoją zgodą używamy także plików 
cookies analitycznych i marketingowych, aby dopasować treści do Twoich potrzeb 
i mierzyć skuteczność naszych kampanii. Możesz zaakceptować wszystkie, odrzucić 
niewymagane lub dostosować swoje wybory. Wycofanie zgody jest możliwe w każdym 
momencie."
```

#### WCAG 2.2 AA — Wymagania dostępności:
- `role="alertdialog"`, `aria-modal="true"`, `aria-labelledby`
- **Focus trap** — Tab krąży wewnątrz banera (nie ucieka do strony pod spodem)
- **Powrót fokusu** po zamknięciu — na `<body>` lub element triggera
- **Keyboard:** pełna obsługa Tab, Shift+Tab, Enter, Space, Escape
- **Focus visible:** wyraźny wskaźnik fokusu (nigdy `outline: none`)
- Kontrast minimum **4.5:1** (tekst), **3:1** (elementy UI)
- Skalowanie do **200%** bez utraty funkcjonalności

#### 2.6 Panel Ustawień Cookies (Layer 2)
**Plik:** `src/components/cookies/cookie-settings-panel.tsx`

- Otwierany z Layer 1 („Dostosuj") lub z linku w stopce
- **Granularne przełączniki** (Switch z shadcn/ui) dla każdej kategorii:
  - ✅ Niezbędne — zawsze włączone, zablokowane (disabled), z wyjaśnieniem
  - ☐ Analityczne — off domyślnie, opis: GA4, pomiar ruchu
  - ☐ Marketingowe — off domyślnie, opis: Google Ads, Meta, remarketing
- Każda kategoria: nazwa, opis celu, lista dostawców/technologii
- Przyciski: „Zapisz wybory", „Akceptuj wszystkie", „Odrzuć wszystkie"
- Zbudowany na `Dialog` lub `Sheet` z shadcn/ui
- Pełna dostępność (ARIA, klawiatura, fokus trap)

---

### Faza 3: Integracja w Aplikacji

#### 2.7 Provider kontekstu
**Plik:** `src/components/cookies/consent-provider.tsx`

- React Context: `ConsentContext` z aktualnym stanem zgód
- Provider wrappujący aplikację w `layout.tsx`
- Udostępnia: `consent`, `updateConsent()`, `hasConsent(category)`
- Serwer: czyta cookie `az_consent` i przekazuje jako initial state
- Klient: hydratuje ze stanu serwera, nasłuchuje zmian

#### 2.8 Conditional Script Tags
**Plik:** `src/components/cookies/consent-scripts.tsx`

- Komponent renderujący `<Script>` tagi warunkowo na podstawie consent
- GA4 / gtag → ładowany tylko jeśli `analytics: granted`
- GTM → ładowany po consent update
- Meta Pixel → ładowany tylko jeśli `marketing: granted`
- Każdy skrypt z `nonce` z CSP

#### 2.9 Aktualizacja useAnalytics hook
**Plik:** `src/hooks/use-analytics.ts`

- Sprawdzanie `hasConsent('analytics')` przed wysłaniem eventu
- Integracja z GA4 `gtag()` jeśli consent jest granted
- Fallback: nic nie robi jeśli consent denied

#### 2.10 Link w stopce
**Plik:** `src/components/layout/footer.tsx` (modyfikacja)

- Dodanie linku „Ustawienia Cookies" 🍪 w sekcji prawnej stopki
- Kliknięcie otwiera Cookie Settings Panel (Layer 2)
- Zawsze widoczny i dostępny — wymóg prawny

---

### Faza 4: Konfiguracja i bezpieczeństwo

#### 2.11 Zmienne środowiskowe
**Plik:** `.env.local` (nowe wpisy)

```env
# Tracking (puste do momentu posiadania kont)
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_META_PIXEL_ID=

# Cookie consent
NEXT_PUBLIC_COOKIE_CONSENT_VERSION=1.0
```

#### 2.12 Aktualizacja CSP
**Plik:** `src/lib/security/headers.ts`

Dodanie dozwolonych domen (warunkowo, gdy tracking aktywny):
```
script-src: 
  + https://www.googletagmanager.com
  + https://www.google-analytics.com
  + https://connect.facebook.net

connect-src:
  + https://www.google-analytics.com
  + https://analytics.google.com
  + https://region1.google-analytics.com

img-src:
  + https://www.google-analytics.com
  + https://www.facebook.com
```

#### 2.13 Izolacja domeny (Cookie Scope)
- Cookie `az_consent` → Domain: `www.autozaba.pl` (nie `.autozaba.pl`)
- Cookies marketingowe/analityczne — nie wyciekają do subdomeny `app.`
- Wymuszenie w konfiguracji CSP i Set-Cookie

---

### Faza 5: Strona Polityki Cookies

#### 2.14 Dedykowana strona polityki cookies
**Plik:** `src/app/polityka-cookies/page.tsx`

Zawartość:
- **Dynamiczna tabela cookies** (nazwa, dostawca, cel, typ, retencja)
- Podział na kategorie (niezbędne / analityczne / marketingowe)
- Informacja o transferach poza EOG (Data Privacy Framework, SCC)
- Procedura wycofania zgody (krok po kroku)
- Klauzula retencji danych (14-26 mies. analityka, 90-540 dni marketing)
- Link/button do otwarcia panelu ustawień cookies
- SEO metadata

#### 2.15 Aktualizacja polityki prywatności
**Plik:** `src/app/polityka-prywatnosci/page.tsx`

- Dodanie linku do nowej strony `/polityka-cookies` w sekcji 12
- Aktualizacja daty obowiązywania

---

## 3. Plan dla app.autozaba.pl (SaaS — osobny projekt)

> ⚠️ Poniższe dotyczy oddzielnego projektu aplikacji SaaS, ale dokumentujemy tu wymagania.

### 3.1 Cookies Sesyjne (Hardening)
```
Set-Cookie: SESSION_ID=xxx; Secure; HttpOnly; SameSite=Strict; Path=/
```
- Wszystkie cookies autoryzacyjne: `Secure`, `HttpOnly`, `SameSite=Strict`
- Brak cookies marketingowych
- Brak cookies analitycznych (chyba że zanonimizowane)

### 3.2 Informacja (nie baner)
- Dyskretna informacja w stopce: "Używamy plików cookies niezbędnych do działania systemu"
- Link do polityki prywatności www.autozaba.pl

### 3.3 Local Storage
- Ustawienia UI (sidebar, dark mode) → `localStorage` (nie cookies)
- Żadne PII w localStorage
- Żadne tokeny w localStorage (cookie-based auth only)

### 3.4 Izolacja
- Cookies z `www.autozaba.pl` NIE propagują się do `app.autozaba.pl`
- Osobna polityka prywatności wewnątrz SaaS (lub link do wspólnej)

---

## 4. Struktura Plików (Nowe/Modyfikowane)

```
src/
├── lib/cookies/
│   ├── consent-types.ts           ← Typy, stałe, kategorie
│   ├── consent-manager.ts         ← Logika zapisu/odczytu consent
│   ├── gcm-v2.ts                  ← Google Consent Mode v2
│   └── script-registry.ts         ← Registry skryptów per kategoria
├── components/cookies/
│   ├── consent-provider.tsx        ← React Context provider
│   ├── cookie-banner.tsx           ← Layer 1 — główny baner
│   ├── cookie-settings-panel.tsx   ← Layer 2 — granularne ustawienia
│   └── consent-scripts.tsx         ← Warunkowe ładowanie skryptów
├── hooks/
│   └── use-analytics.ts            ← MODYFIKACJA — consent-aware
├── components/layout/
│   └── footer.tsx                   ← MODYFIKACJA — link "Ustawienia Cookies"
├── app/
│   └── polityka-cookies/
│       └── page.tsx                 ← Nowa strona polityki cookies
└── lib/security/
    └── headers.ts                   ← MODYFIKACJA — CSP dla tracking domen
```

---

## 5. Kolejność Implementacji

| Krok | Opis | Zależności |
|------|------|-----------|
| 1 | `consent-types.ts` — typy i stałe | — |
| 2 | `consent-manager.ts` — logika consent | Krok 1 |
| 3 | `gcm-v2.ts` — GCM v2 snippet | Krok 1 |
| 4 | `consent-provider.tsx` — React context | Kroki 1-2 |
| 5 | `cookie-banner.tsx` — Layer 1 UI | Kroki 1-4 |
| 6 | `cookie-settings-panel.tsx` — Layer 2 UI | Kroki 1-4 |
| 7 | `consent-scripts.tsx` — warunkowe skrypty | Kroki 3-4 |
| 8 | Integracja w `layout.tsx` | Kroki 4-7 |
| 9 | Aktualizacja `footer.tsx` — link | Krok 6 |
| 10 | Aktualizacja `use-analytics.ts` | Krok 4 |
| 11 | Aktualizacja CSP w `headers.ts` | Krok 7 |
| 12 | Env vars (`.env.local`) | Krok 7 |
| 13 | Strona `/polityka-cookies` | Kroki 1-4 |
| 14 | Aktualizacja polityki prywatności | Krok 13 |
| 15 | Testy WCAG (manualne + automatyczne) | Kroki 5-6 |

---

## 6. Kryteria Akceptacji

### Prawne (PKE 2026 / RODO / DSA / Digital Omnibus)
- [ ] 3 równorzędne przyciski na Layer 1 (symetria wyboru)
- [ ] Prior consent — żaden tracking nie ładuje się przed zgodą
- [ ] GCM v2 w trybie Advanced z domyślnym `denied`
- [ ] Obsługa sygnału GPC (automatyczne odrzucenie)
- [ ] Granularne wybory per kategoria (Layer 2)
- [ ] Consent zapisany na max 12 miesięcy
- [ ] Procedura wycofania zgody (link w stopce, zawsze dostępny)
- [ ] Brak cookie wall (strona dostępna bez zgody)
- [ ] Brak dark patterns (żadne vizualne faworyzowanie)
- [ ] Informacja o transferach poza EOG

### Techniczne
- [ ] Cookie `az_consent` scoped do `www.autozaba.pl`
- [ ] CSP nonce integration dla tracking skryptów
- [ ] `next/script` z odpowiednimi strategiami
- [ ] SSR-safe (brak hydration mismatch)
- [ ] Nie blokuje renderowania strony (async)

### Dostępność (WCAG 2.2 AA)
- [ ] `role="alertdialog"`, `aria-modal="true"`, `aria-labelledby`
- [ ] Focus trap w banerze
- [ ] Pełna obsługa klawiatury (Tab, Shift+Tab, Enter, Space, Esc)
- [ ] Widoczny wskaźnik fokusu
- [ ] Kontrast ≥ 4.5:1 (tekst) / ≥ 3:1 (UI)
- [ ] Skalowanie do 200%
- [ ] Przyciski min 44×44px na mobile
- [ ] Powrót fokusu po zamknięciu

### UX
- [ ] Dark mode + Light mode
- [ ] Responsywność (mobile ≤35% ekranu)
- [ ] Framer-motion animacja (slide-up/fade-in)
- [ ] Nie zakrywa kluczowych CTA
- [ ] Spójność z design systemem (brand-green, shadcn/ui)

---

## 7. Czego NIE robimy (Świadome wyłączenia)

1. **Nie wdrażamy SaaS CMP** (Cookiebot, OneTrust) — budujemy custom, bo:
   - Pełna kontrola nad UX/design
   - Brak zewnętrznych zależności i vendor lock-in
   - Lżejszy bundle (nie ładujemy ~100KB CMP SDK)
   - Projekt nie ma jeszcze żadnego trackingu — łatwiej zbudować od zera
   
2. **Nie wdrażamy trackingu teraz** — infrastruktura consent jest "ready", ale faktyczne skrypty GA4/Meta zostaną podłączone gdy będą konta reklamowe. Env vars zostaną puste.

3. **Nie implementujemy IAB TCF 2.2** — nie prowadzimy programmatic advertising, nie jesteśmy publisherem. Wystarczy GCM v2 + własne kategorie.

4. **Nie modyfikujemy app.autozaba.pl** — to osobny projekt. Dokumentujemy wymagania w sekcji 3.

---

## 8. Ryzyka i Mitigacja

| Ryzyko | Wpływ | Mitigacja |
|--------|-------|-----------|
| CSP blokuje skrypty trackingowe | Tracking nie działa | Whitelisting domen w headers.ts |
| Hydration mismatch (cookie state) | UI glitch | Server → initial state, client hydration |
| GPC false positive | Baner nie wyskakuje | Respektujemy GPC — to wymóg prawny |
| Użytkownik czyści cookies | Baner wyskakuje ponownie | OK — to prawidłowe zachowanie |
| UODO zmienia interpretację | Niezgodność | Monitoring prawny, łatwa aktualizacja tekstu |

---

> **Następny krok:** Po zatwierdzeniu tego planu — implementacja krok po kroku zgodnie z kolejnością z sekcji 5.
