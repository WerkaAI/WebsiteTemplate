import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'Polityka prywatności — jak chronimy dane',
  description:
    'Dowiedz się, jak przetwarzamy dane klientów i użytkowników. Poznaj cele, podstawy prawne, okresy przechowywania oraz swoje prawa.',
  alternates: {
    canonical: '/polityka-prywatnosci'
  },
  openGraph: {
    title: 'Polityka prywatności — ochrona danych w praktyce',
    description:
      'Poznaj zasady przetwarzania danych: role administratora i procesora, bezpieczeństwo, cookies oraz prawa osób.',
    url: '/polityka-prywatnosci',
    type: 'website'
  }
}

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-50">
      <Navigation />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-emerald-200/35 via-white to-white pb-20 pt-16 dark:from-emerald-500/15 dark:via-slate-950 dark:to-slate-950">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <header className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/60 bg-emerald-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:border-emerald-400/40 dark:text-emerald-200">
                Dokument prawny
              </span>
              <h1 className="mt-6 text-balance text-4xl font-semibold leading-tight text-slate-900 dark:text-slate-50">
                Polityka prywatności
              </h1>
              <p className="mt-4 text-base text-slate-700 dark:text-slate-300">
                Niniejszy dokument opisuje, w jaki sposób gromadzimy, wykorzystujemy i chronimy dane osobowe użytkowników odwiedzających i korzystających ze strony gabinetu fizjoterapii.
              </p>
            </header>
            <div className="mt-12 rounded-3xl border border-slate-200 bg-white/95 p-10 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
              <div className="prose prose-slate max-w-none text-sm leading-relaxed dark:prose-invert">
                <h2 id="polityka-prywatnosci">Polityka prywatności</h2>
                <p>
                  <strong>SERWIS (&quot;Polityka&quot;)</strong>
                </p>
                <blockquote>
                  <p>
                    Niniejsza Polityka dotyczy przetwarzania danych osobowych przez gabinet fizjoterapii Anety Kołoszyńskiej.
                  </p>
                </blockquote>
                <hr />
                <h2 id="1-kim-jestesmy-i-kogo-dotyczy-ta-polityka">1. Kim jesteśmy i kogo dotyczy ta Polityka</h2>
                <p>
                  <strong>Administrator danych:</strong> <strong>Fizjoterapia Aneta Kołoszyńska</strong> (dalej: &quot;<strong>my</strong>&quot;, &quot;<strong>Administrator</strong>&quot;).
                  <br />
                  Kontakt w sprawach prywatności: <strong>[Podaj adres email do kontaktu, np. kontakt@fizjoterapiawroclaw.com]</strong>.
                </p>
                <p>
                  <strong>Zakres podmiotowy.</strong> Polityka dotyczy w szczególności:
                </p>
                <ul>
                  <li>osób odwiedzających naszą stronę internetową (dalej: &quot;<strong>Serwis</strong>&quot;);</li>
                  <li>osób kontaktujących się z nami elektronicznie lub telefonicznie;</li>
                  <li>odbiorców treści marketingowych;</li>
                  <li>obserwujących nasze profile w mediach społecznościowych.</li>
                </ul>
                <hr />
                <h2 id="2-nasze-role-administrator-vs-podmiot-przetwarzajacy">2. Nasza rola jako Administrator</h2>
                <p>Występujemy wyłącznie jako <strong>Administrator danych</strong> dla danych:</p>
                <ul>
                  <li>osób odwiedzających stronę internetową i kontaktujących się z gabinetem (komunikacja, umawianie wizyt);</li>
                  <li>do celów analityki, bezpieczeństwa i ewentualnego marketingu (zgodnie z Twoimi zgodami/preferencjami).</li>
                </ul>
                <hr />
                <h2 id="3-skad-mamy-dane">3. Skąd mamy dane</h2>
                <p>Otrzymujemy dane:</p>
                <ul>
                  <li><strong>bezpośrednio od Ciebie</strong> (gdy kontaktujesz się z nami mailowo lub telefonicznie w celu umówienia wizyty);</li>
                  <li><strong>automatycznie</strong> w związku z korzystaniem z Serwisu (telemetria, logi, identyfikatory urządzenia/przeglądarki, cookies analityczne);</li>
                  <li><strong>z publicznych źródeł</strong> (np. profile społecznościowe – gdy wchodzisz z nami w interakcję lub wystawiasz nam opinię).</li>
                </ul>
                <hr />
                <h2 id="4-kategorie-danych-ktore-przetwarzamy">4. Kategorie danych, które przetwarzamy</h2>
                <p>
                  <strong>A) Odwiedzający Serwis</strong>
                </p>
                <p>
                  Adres IP, informacje o urządzeniu/przeglądarce, dzienniki serwera, identyfikatory cookies/SDK Google Analytics i związane z nimi powszechne zdarzenia analityczne.
                </p>
                <p>
                  <strong>B) Osoby kontaktujące się z gabinetem</strong>
                </p>
                <p>
                  Imię i nazwisko, numer telefonu, adres e-mail, treść zapytania kierowanego w mailu lub telefonicznie (w tym potencjalnie informacje o dolegliwościach podane z własnej inicjatywy w celu umówienia odpowiedniej wizyty).
                </p>
                <p>
                  <strong>C) Marketing i interakcje społecznościowe</strong>
                </p>
                <p>
                  Dane o interakcji ze stroną zbierane przez analitykę oraz dane z profili udostępniane nam przez sieci społecznościowe (gdy np. obserwujesz nasz profil na Facebooku lub Instagramie).
                </p>
                <hr />
                <h2 id="5-cele-i-podstawy-przetwarzania">5. Cele i podstawy przetwarzania (art. 6 RODO)</h2>
                <p>
                  <strong>Obsługa zapytań i umawianie wizyt</strong> – art. 6 ust. 1 lit. b RODO (czynności zmierzające do zawarcia umowy o świadczenie usług fizjoterapeutycznych) oraz art. 9 ust. 2 lit. h RODO (w zakresie w jakim z własnej woli podasz informacje o stanie zdrowia podczas umawiania wizyty).
                </p>
                <p>
                  <strong>Analityka odwiedzin strony</strong> (telemetria, statystyki Google Analytics) – art. 6 ust. 1 lit. a RODO (zależnie od Twojej wyraźnej zgody na ciasteczka analityczne).
                </p>
                <p>
                  <strong>Realizacja obowiązków prawnych</strong> (rachunkowość, dokumentacja medyczna po wykonanej usłudze) – art. 6 ust. 1 lit. c RODO oraz odpowiednie przepisy dotyczące praw pacjenta i działalności leczniczej.
                </p>
                <p>
                  <strong>Ustalenie, dochodzenie lub obrona roszczeń</strong> – art. 6 ust. 1 lit. f RODO.
                </p>
                <p>
                  Jeśli podstawą przetwarzania na stronie jest <strong>zgoda</strong> (np. Ciasteczka analityczne Google), możesz ją w każdej chwili wycofać – nie wpływa to na zgodność z prawem przetwarzania sprzed cofnięcia. Zgodą możesz zarządzać poprzez ustawienia na naszej stronie.
                </p>
                <hr />
                <h2 id="7-odbiorcy-danych">6. Odbiorcy danych</h2>
                <p>Możemy udostępniać dane na zewnątrz wyłącznie w niezbędnym zakresie, wskazanym poniżej podmiotom zaufanym, aby móc prowadzić naszą działalność i utrzymywać stronę internetową:</p>
                <ul>
                  <li>dostawcom usług IT: hostingowi strony internetowej;</li>
                  <li>systemowi analitycznemu: <strong>Google (Google Analytics)</strong> – wyłącznie pod warunkiem udzielenia przez Ciebie odpowiedniej zgody na Ciasteczka;</li>
                  <li>uprawnionym organom państwowym i szczebla medycznego – w sytuacjach w których jest to wymagane przez bezwzględnie obowiązujące przepisy prawa.</li>
                </ul>
                <hr />
                <h2 id="8-przekazywanie-danych-poza-eog">7. Przekazywanie danych poza EOG</h2>
                <p>
                  Nasi dostawcy usług analitycznych (Google) mogą przetwarzać lub przesyłać część danych do infrastruktury znajdującej się w Stanach Zjednoczonych. W przypadku przekazywania danych poza EOG stosowane są odpowiednie zabezpieczenia, w szczególności opieramy się na decyzjach Komisji Europejskiej stwierdzających odpowiedni stopień ochrony (w tym Data Privacy Framework regulujący transfery na linii UE-USA). 
                </p>
                <hr />
                <h2 id="9-okres-przechowywania">8. Okres przechowywania</h2>
                <ul>
                  <li>
                    <strong>Dokumentacja medyczna pacjentów</strong> – przez okres m.in. 20 lat (lub odmiennie wprost wynikający z przepisów Prawa, m.in ustawy o prawach pacjenta i Rzeczniku Praw Pacjenta).
                  </li>
                  <li>
                    <strong>Komunikacja i zapytania niewiążące się z rozpoczęciem leczenia</strong> – przez czas niezbędny do obsługi zapytania i krótki czas po jej zakończeniu w celu utrzymania ciągłości korespondencji (zazwyczaj do 1 roku lub do przedawnienia roszczeń).
                  </li>
                  <li>
                    <strong>Telemetria strony/ciasteczka</strong> – cookies zgody na stronie są przechowywane do 12 miesięcy, natomiast dane wewnątrz Google Analytics przechowywane są z domyślnie skróconym okresem retencji (np. 14 miesięcy) zgodnie z odrębną Polityką Cookies.
                  </li>
                </ul>
                <hr />
                <h2 id="10-twoje-prawa">9. Twoje prawa</h2>
                <p>
                  Masz prawo żądać: <strong>dostępu</strong> do danych, ich <strong>sprostowania</strong>, <strong>usunięcia</strong> (tam gdzie nie koliduje to z obowiązkiem przechowywania dokumentacji medycznej i rachunkowej), <strong>ograniczenia przetwarzania</strong>, <strong>przenoszenia</strong> danych oraz wnieść <strong>sprzeciw</strong>. 
                </p>
                <p>
                  Przysługuje Ci także prawo skargi do Prezesa <strong>Urzędu Ochrony Danych Osobowych</strong> (<a href="https://uodo.gov.pl" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400">uodo.gov.pl</a>).
                </p>
                <p>
                  W sprawach dotyczących realizowania swoich praw, prosimy o kontakt bezpośrednio pod adresem gabinetu, lub mailowo wskazując zapytanie dotyczące danych osobowych.
                </p>
                <hr />
                <h2 id="11-bezpieczenstwo-danych">10. Bezpieczeństwo danych</h2>
                <p>
                  Stosujemy odpowiednie środki techniczne i organizacyjne adekwatne do ryzyk, m.in. certyfikaty protokołu SSL do szyfrowania połączenia ze stroną. Dokumentacja medyczna w gabinecie przechowywana jest z zachowaniem najwyższych wytycznych bezpieczeństwa wymaganych od podmiotów i profesjonalistów leczniczych, niedostępna dla osób postronnych.
                </p>
                <hr />
                <h2 id="12-pliki-cookies-i-podobne-technologie">11. Pliki cookies i podobne technologie</h2>
                <p>
                  Strona internetowa używa technologii cookies. Służą one zapewnieniu niezbędnego i bezpiecznego działania strony, oraz – za Twoją wyraźną zgodą – analityce ruchu poprzez Google Analytics. Ustawieniami cookies możesz zarządzać samodzielnie za pomocą banera dostępnego na stronie naszej wizytówki (zakładka ustawień cookies w stopce) bądź poprzez ustawienia przeglądarki.
                </p>
                <p>
                  Szczegółowy Wykaz używanych narzędzi znajduje się w <Link href="/polityka-cookies" className="text-primary hover:underline">Polityce cookies</Link>.
                </p>
                <hr />
                <h2 id="13-media-spolecznosciowe">12. Media społecznościowe</h2>
                <p>
                  Posiadamy profile i wizytówki publiczne m.in. na portalach Meta (Facebook, Instagram) oraz Google (Google Maps/Wizytówka Firmowa). Właściwi operatorzy portali przetwarzają dane na własnych zasadach. Decydując się na interakcję z naszymi profilami (reakcje, wiadomości) ujawniasz nam dane publicznie widoczne na własnym profilu.
                </p>
                <hr />
                <h2 id="14-kontakt">13. Kontakt</h2>
                <p>
                  W pytaniach dotyczących prywatności, prosimy o kierowanie wiadomości mailowej do gabinetu na adres wskazany na stronie lub kontakt telefoniczny.
                </p>
                <hr />
                <h2 id="15-zmiany-polityki">14. Zmiany Polityki</h2>
                <p>
                  Zastrzegamy możliwość aktualizacji dokumentu w razie wdrażania nowych funkcji na stronę bądź zmian prawnych.
                </p>
                <p>
                  <strong>Data obowiązywania:</strong> Marzec 2026 r.
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
