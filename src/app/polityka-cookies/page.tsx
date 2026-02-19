import type { Metadata } from 'next'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'
import { CookieSettingsButton } from '@/components/cookies/cookie-settings-button'

export const metadata: Metadata = {
  title: 'Polityka cookies AutoŻaba — pliki cookies i technologie śledzące',
  description:
    'Informacja o plikach cookies i podobnych technologiach używanych w serwisie autozaba.pl. Poznaj kategorie cookies, dostawców, okresy retencji i zarządzaj swoimi preferencjami.',
  alternates: {
    canonical: '/polityka-cookies',
  },
  openGraph: {
    title: 'Polityka cookies AutoŻaba',
    description:
      'Transparentna informacja o cookies i technologiach śledzących w serwisie autozaba.pl.',
    url: '/polityka-cookies',
    type: 'website',
  },
}

export default function CookiePolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-50">
      <Navigation />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-emerald-200/35 via-white to-white pb-20 pt-16 dark:from-emerald-500/15 dark:via-slate-950 dark:to-slate-950">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <header className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/60 bg-emerald-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:border-emerald-400/40 dark:text-emerald-200">
                Dokument prawny
              </span>
              <h1 className="mt-6 text-balance text-4xl font-semibold leading-tight text-slate-900 dark:text-slate-50">
                Polityka plików cookies
              </h1>
              <p className="mt-4 text-base text-slate-700 dark:text-slate-300">
                Niniejszy dokument wyjaśnia, w jaki sposób serwis autozaba.pl
                wykorzystuje pliki cookies i podobne technologie, jakie dane
                zbieramy oraz jak możesz zarządzać swoimi preferencjami.
              </p>
            </header>

            {/* Content */}
            <div className="mt-12 rounded-3xl border border-slate-200 bg-white/95 p-10 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
              <div className="prose prose-slate max-w-none text-sm leading-relaxed dark:prose-invert">

                <h2 id="czym-sa-cookies">1. Czym są pliki cookies?</h2>
                <p>
                  Pliki cookies to małe pliki tekstowe zapisywane na Twoim urządzeniu
                  przez przeglądarkę internetową podczas wizyty na stronie. Służą do
                  zapamiętywania Twoich preferencji, analizy ruchu i — za Twoją zgodą —
                  personalizacji reklam. Oprócz cookies używamy także podobnych technologii,
                  takich jak Local Storage, piksele śledzące i SDK.
                </p>

                <hr />

                <h2 id="kategorie-cookies">2. Kategorie plików cookies</h2>
                <p>
                  Podzieliliśmy pliki cookies na trzy kategorie, z których każda
                  ma odmienny cel i podstawę prawną:
                </p>

                {/* Necessary cookies */}
                <h3>🔒 Niezbędne (Strictly Necessary)</h3>
                <p>
                  <strong>Podstawa prawna:</strong> Art. 173 ust. 3 PKE (niezbędność techniczna)
                  + Art. 6 ust. 1 lit. f RODO (uzasadniony interes — bezpieczeństwo).
                  <br />
                  <strong>Wymagają zgody:</strong> Nie. Te cookies są konieczne do
                  działania strony i nie można ich wyłączyć.
                </p>
                <div className="overflow-x-auto">
                  <table>
                    <thead>
                      <tr>
                        <th>Nazwa</th>
                        <th>Dostawca</th>
                        <th>Cel</th>
                        <th>Typ</th>
                        <th>Retencja</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>az_consent</td>
                        <td>AutoŻaba</td>
                        <td>Zapamiętanie preferencji zgody na cookies</td>
                        <td>HTTP Cookie</td>
                        <td>12 miesięcy</td>
                      </tr>
                      <tr>
                        <td>autozaba-theme</td>
                        <td>AutoŻaba</td>
                        <td>Zapamiętanie wybranego motywu (jasny/ciemny)</td>
                        <td>Local Storage</td>
                        <td>Bezterminowo</td>
                      </tr>
                      <tr>
                        <td>__cf_bm</td>
                        <td>Cloudflare</td>
                        <td>Ochrona przed botami i atakami DDoS</td>
                        <td>HTTP Cookie</td>
                        <td>30 minut</td>
                      </tr>
                      <tr>
                        <td>cf_clearance</td>
                        <td>Cloudflare Turnstile</td>
                        <td>Weryfikacja CAPTCHA w formularzach</td>
                        <td>HTTP Cookie</td>
                        <td>Sesja</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Analytics cookies */}
                <h3>📊 Analityczne (Analytics)</h3>
                <p>
                  <strong>Podstawa prawna:</strong> Art. 6 ust. 1 lit. a RODO (zgoda).
                  <br />
                  <strong>Wymagają zgody:</strong> Tak. Włączane dopiero po wyrażeniu
                  zgody w panelu cookies.
                </p>
                <div className="overflow-x-auto">
                  <table>
                    <thead>
                      <tr>
                        <th>Nazwa</th>
                        <th>Dostawca</th>
                        <th>Cel</th>
                        <th>Typ</th>
                        <th>Retencja</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>_ga</td>
                        <td>Google Analytics 4</td>
                        <td>Rozróżnianie użytkowników (pseudonimizacja)</td>
                        <td>HTTP Cookie</td>
                        <td>Do 24 miesięcy</td>
                      </tr>
                      <tr>
                        <td>_ga_*</td>
                        <td>Google Analytics 4</td>
                        <td>Utrzymanie stanu sesji pomiarowej</td>
                        <td>HTTP Cookie</td>
                        <td>Do 24 miesięcy</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Marketing cookies */}
                <h3>📢 Marketingowe (Advertising)</h3>
                <p>
                  <strong>Podstawa prawna:</strong> Art. 6 ust. 1 lit. a RODO
                  (wyraźna zgoda, opt-in).
                  <br />
                  <strong>Wymagają zgody:</strong> Tak. Aktywne wyłącznie po
                  wyrażeniu zgody.
                </p>
                <div className="overflow-x-auto">
                  <table>
                    <thead>
                      <tr>
                        <th>Nazwa</th>
                        <th>Dostawca</th>
                        <th>Cel</th>
                        <th>Typ</th>
                        <th>Retencja</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>_gcl_*</td>
                        <td>Google Ads</td>
                        <td>Śledzenie konwersji reklamowych</td>
                        <td>HTTP Cookie</td>
                        <td>Do 90 dni</td>
                      </tr>
                      <tr>
                        <td>_fbp</td>
                        <td>Meta (Facebook)</td>
                        <td>Remarketing i budowanie profili odbiorców</td>
                        <td>HTTP Cookie</td>
                        <td>Do 90 dni</td>
                      </tr>
                      <tr>
                        <td>_fbc</td>
                        <td>Meta (Facebook)</td>
                        <td>Identyfikacja kliknięcia w reklamę</td>
                        <td>HTTP Cookie</td>
                        <td>Do 90 dni</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <hr />

                <h2 id="google-consent-mode">3. Google Consent Mode v2</h2>
                <p>
                  Na stronie autozaba.pl stosujemy <strong>Google Consent Mode v2</strong>{' '}
                  w trybie Advanced. Oznacza to, że:
                </p>
                <ul>
                  <li>
                    Skrypty Google (GA4, Google Ads) ładują się na stronie od razu,
                    ale <strong>nie zapisują plików cookies</strong> dopóki nie wyrazisz zgody.
                  </li>
                  <li>
                    Gdy nie wyrazisz zgody, Google otrzymuje jedynie minimalne,
                    bezciasteczkowe sygnały (tzw. &quot;pingi&quot;), które nie pozwalają na
                    identyfikację użytkownika.
                  </li>
                  <li>
                    Po wyrażeniu zgody skrypty przechodzą w tryb pełny i mogą
                    zapisywać cookies analityczne lub marketingowe.
                  </li>
                </ul>

                <hr />

                <h2 id="transfer-poza-eog">4. Transfer danych poza EOG</h2>
                <p>
                  Korzystanie z narzędzi Google Analytics i Meta Pixel wiąże się
                  z transferem danych do serwerów zlokalizowanych w Stanach
                  Zjednoczonych. Transfer ten jest objęty:
                </p>
                <ul>
                  <li>
                    <strong>EU-US Data Privacy Framework</strong> (DPF) — Google LLC
                    i Meta Platforms, Inc. posiadają aktualną certyfikację DPF.
                  </li>
                  <li>
                    <strong>Standardowe Klauzule Umowne (SCC)</strong> — jako
                    dodatkowe zabezpieczenie zgodne z art. 46 ust. 2 lit. c RODO.
                  </li>
                </ul>
                <p>
                  W przypadku utraty ważności mechanizmu DPF, opieramy się na SCC
                  uzupełnionych o Transfer Impact Assessment (TIA).
                </p>

                <hr />

                <h2 id="global-privacy-control">5. Global Privacy Control (GPC)</h2>
                <p>
                  Respektujemy sygnał <strong>Global Privacy Control</strong> wysyłany
                  przez Twoją przeglądarkę. Jeśli GPC jest aktywny, automatycznie
                  traktujemy to jako odmowę zgody na cookies analityczne
                  i marketingowe — baner nie jest wyświetlany.
                </p>

                <hr />

                <h2 id="retencja">6. Okresy przechowywania danych</h2>
                <ul>
                  <li>
                    <strong>Dane analityczne (GA4):</strong> maksymalnie 14 lub 26 miesięcy
                    (zgodnie z ustawieniami retencji GA4). Na poziomie użytkownika
                    dane usuwane są po upływie tego okresu.
                  </li>
                  <li>
                    <strong>Dane marketingowe:</strong> okres powiązany z cyklem
                    sprzedażowym, zazwyczaj 90–540 dni. Listy remarketingowe Google Ads
                    mają maksymalną retencję 540 dni.
                  </li>
                  <li>
                    <strong>Cookie zgody (az_consent):</strong> 12 miesięcy.
                    Po tym czasie zostaniesz poproszony/-a o ponowne wyrażenie zgody.
                  </li>
                </ul>

                <hr />

                <h2 id="zarzadzanie-zgodami">7. Jak zarządzać swoimi zgodami?</h2>
                <p>
                  Masz pełną kontrolę nad plikami cookies. Możesz zmienić swoje
                  preferencje w dowolnym momencie:
                </p>
                <ol>
                  <li>
                    Kliknij przycisk <strong>&bdquo;🍪 Ustawienia Cookies&rdquo;</strong> w stopce
                    strony — dostępny na każdej podstronie.
                  </li>
                  <li>
                    W panelu ustawień włącz lub wyłącz poszczególne kategorie
                    (analityczne, marketingowe).
                  </li>
                  <li>Kliknij <strong>&bdquo;Zapisz wybory&rdquo;</strong>.</li>
                </ol>
                <p>
                  Alternatywnie możesz zarządzać cookies w ustawieniach swojej
                  przeglądarki (usunięcie, blokowanie). Pamiętaj jednak, że
                  zablokowanie cookies niezbędnych może uniemożliwić prawidłowe
                  działanie strony.
                </p>

                {/* Client component for the settings button */}
                <div className="not-prose">
                  <CookieSettingsButton />
                </div>

                <hr />

                <h2 id="app-autozaba">8. Cookies w aplikacji app.autozaba.pl</h2>
                <p>
                  Aplikacja SaaS dostępna pod adresem app.autozaba.pl stosuje
                  wyłącznie <strong>pliki cookies niezbędne</strong> do działania
                  systemu:
                </p>
                <ul>
                  <li>Tokeny autoryzacyjne (sesja logowania) — flagi: Secure, HttpOnly, SameSite=Strict</li>
                  <li>Ochrona przed atakami CSRF</li>
                  <li>Równoważenie obciążenia serwerów</li>
                </ul>
                <p>
                  Aplikacja <strong>nie wykorzystuje</strong> żadnych cookies
                  analitycznych ani marketingowych. Piksele reklamowe nie są
                  ładowane w panelu SaaS ze względu na ochronę prywatności
                  pracowników (nierównowaga sił w relacji pracodawca-pracownik
                  per wytyczne UODO).
                </p>
                <p>
                  Cookies z domeny www.autozaba.pl <strong>nie propagują się</strong>{' '}
                  do subdomeny app.autozaba.pl — izolacja domen jest wymuszana
                  poprzez brak atrybutu Domain= w ustawieniach cookies.
                </p>

                <hr />

                <h2 id="kontakt">9. Kontakt</h2>
                <p>
                  W sprawach dotyczących plików cookies i prywatności skontaktuj
                  się z nami:{' '}
                  <a
                    href="mailto:autozaba@ainything.pl"
                    className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
                  >
                    autozaba@ainything.pl
                  </a>
                </p>

                <hr />

                <h2 id="zmiany">10. Zmiany polityki cookies</h2>
                <p>
                  Zastrzegamy możliwość aktualizacji niniejszej polityki cookies.
                  Aktualna wersja jest zawsze dostępna pod adresem{' '}
                  <a
                    href="https://autozaba.pl/polityka-cookies"
                    className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
                  >
                    https://autozaba.pl/polityka-cookies
                  </a>{' '}
                  i opatrzona datą obowiązywania.
                </p>
                <p>
                  <strong>Data obowiązywania:</strong> 09.02.2026 r.
                </p>

              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
