import type { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Polityka prywatności AutoŻaba — jak chronimy dane',
  description:
    'Dowiedz się, jak AutoŻaba przetwarza dane klientów, użytkowników i pracowników. Poznaj cele, podstawy prawne, okresy przechowywania oraz swoje prawa.',
  alternates: {
    canonical: '/polityka-prywatnosci'
  },
  openGraph: {
    title: 'Polityka prywatności AutoŻaba — ochrona danych w praktyce',
    description:
      'Poznaj zasady przetwarzania danych w AutoŻaba: role administratora i procesora, bezpieczeństwo, cookies, prawa osób i gwarancje współpracy.',
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
                Polityka prywatności AutoŻaba
              </h1>
              <p className="mt-4 text-base text-slate-700 dark:text-slate-300">
                Niniejszy dokument opisuje, w jaki sposób AutoŻaba gromadzi, wykorzystuje i chroni dane osobowe użytkowników oraz zespołów korzystających z systemu SaaS do zarządzania sklepami.
              </p>
            </header>
            <div className="mt-12 rounded-3xl border border-slate-200 bg-white/95 p-10 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
              <div className="prose prose-slate max-w-none text-sm leading-relaxed dark:prose-invert">
                <h2 id="polityka-prywatnosci">Polityka prywatności</h2>
                <p>
                  <strong>AUTOŻABA (&quot;Polityka&quot;)</strong>
                </p>
                <blockquote>
                  <p>
                    Niniejsza Polityka została przygotowana specjalnie dla platformy AutoŻaba – systemu SaaS do zarządzania personelem i harmonogramami pracy w sklepach. Zastępuje ogólne szablony i uwzględnia specyfikę działania aplikacji (m.in. planowanie grafików, ewidencję czasu pracy, rozliczenia zmian, eksporty dla PIP i księgowości, panel feedbacku oraz powiadomienia).
                  </p>
                </blockquote>
                <hr />
                <h2 id="1-kim-jestesmy-i-kogo-dotyczy-ta-polityka">1. Kim jesteśmy i kogo dotyczy ta Polityka</h2>
                <p>
                  <strong>Administrator danych:</strong> <strong>[[pełna nazwa i forma prawna podmiotu prowadzącego AutoŻabę]]</strong> z siedzibą pod adresem <strong>[[adres spółki]]</strong>, wpisana do rejestru przedsiębiorców <strong>[[KRS]]</strong>, NIP: <strong>[[NIP]]</strong>, REGON: <strong>[[REGON]]</strong> (dalej: &quot;<strong>my</strong>&quot;, &quot;<strong>AutoŻaba</strong>&quot;, &quot;<strong>Administrator</strong>&quot;).
                  <br />
                  Kontakt w sprawach prywatności: <strong>autozaba@ainything.pl</strong>. Jeśli powołaliśmy inspektora ochrony danych (IOD), aktualne dane kontaktowe znajdziesz w zakładce <strong>Prywatność / RODO</strong> w aplikacji. W przeciwnym razie nie powołaliśmy IOD.
                </p>
                <p>
                  <strong>Zakres podmiotowy.</strong> Polityka dotyczy w szczególności:
                </p>
                <ul>
                  <li>osób odwiedzających nasze strony i panele (dalej: &quot;<strong>Serwis</strong>&quot;);</li>
                  <li>klientów biznesowych (właścicieli/franczyzobiorców sklepów) zakładających konta i ich użytkowników;</li>
                  <li>pracowników i współpracowników naszych klientów, których dane są wprowadzane do aplikacji;</li>
                  <li>osób kontaktujących się z nami (e-mail, formularz, telefon, chat);</li>
                  <li>odbiorców treści marketingowych i newslettera;</li>
                  <li>kandydatów do pracy/współpracy;</li>
                  <li>obserwujących nasze profile w mediach społecznościowych.</li>
                </ul>
                <hr />
                <h2 id="2-nasze-role-administrator-vs-podmiot-przetwarzajacy">2. Nasze role: Administrator vs. podmiot przetwarzający</h2>
                <p>W zależności od celu przetwarzania możemy występować jako:</p>
                <ol>
                  <li>
                    <p>
                      <strong>Administrator danych</strong> – dla danych:
                    </p>
                    <ul>
                      <li>konta klientów i użytkowników (rejestracja, rozliczenia, bezpieczeństwo, utrzymanie usługi, komunikacja);</li>
                      <li>komunikacji (zapytania, support, panel feedbacku);</li>
                      <li>analityki, bezpieczeństwa i marketingu (zgodnie z Twoimi zgodami/preferencjami);</li>
                      <li>rekrutacji i spraw kadrowych wewnętrznych.</li>
                    </ul>
                  </li>
                  <li>
                    <p>
                      <strong>Podmiot przetwarzający (procesor)</strong> – gdy przetwarzamy dane <strong>pracowników/współpracowników</strong> naszych klientów (np. dostępność, grafiki, ewidencja czasu pracy, rozliczenia zmian, eksporty do PIP/księgowości) <strong>wyłącznie na udokumentowane polecenie klienta</strong> (administrator danych). Zasady te reguluje <strong>umowa powierzenia przetwarzania danych</strong> (DPA) stanowiąca część umowy/Regulaminu. Na żądanie udostępnimy jej aktualne brzmienie.
                    </p>
                  </li>
                </ol>
                <hr />
                <h2 id="3-skad-mamy-dane">3. Skąd mamy dane</h2>
                <p>Otrzymujemy dane:</p>
                <ul>
                  <li><strong>bezpośrednio od Ciebie</strong> (rejestracja, wypełnianie profilu, korespondencja, feedback);</li>
                  <li><strong>od Twojego pracodawcy/zleceniodawcy</strong> (gdy zakłada konto użytkownika lub importuje dane załogi);</li>
                  <li><strong>automatycznie</strong> w związku z korzystaniem z Serwisu (telemetria, logi, identyfikatory urządzenia/przeglądarki, cookies/podobne technologie);</li>
                  <li><strong>z publicznych źródeł</strong> (np. profile społecznościowe – gdy wchodzisz z nami w interakcję).</li>
                </ul>
                <hr />
                <h2 id="4-kategorie-danych-ktore-przetwarzamy">4. Kategorie danych, które przetwarzamy</h2>
                <p>
                  <strong>A) Użytkownicy – klienci B2B i ich użytkownicy</strong>
                </p>
                <p>
                  Imię i nazwisko, adres e-mail, telefon (opcjonalnie), dane firmy (nazwa, NIP), rola/uprawnienia w systemie, język interfejsu, ustawienia konta, identyfikatory techniczne, historia logowania i działań administracyjnych.
                </p>
                <p>
                  <strong>B) Dane załogi przetwarzane na polecenie klienta (procesor)</strong>
                </p>
                <p>
                  Imię i nazwisko, identyfikator pracowniczy/użytkownika, przypisanie do sklepu/lokalizacji, rodzaj i parametry umowy (np. UoP/UZ, stawki, daty obowiązywania), dostępność/preferencje, grafiki i zmiany, ewidencja czasu pracy (wejścia/wyjścia, nieobecności, urlopy), rozliczenia zmian (w tym ewidencja gotówki/niedoborów/zaliczek – jeśli włączone), komentarze i notatki służbowe, metadane operacji, eksporty do PIP/biura rachunkowego. <strong>UWAGA:</strong> system nie jest przeznaczony do gromadzenia szczególnych kategorii danych (np. o zdrowiu).
                </p>
                <p>
                  <strong>C) Odwiedzający Serwis</strong>
                </p>
                <p>
                  Adres IP, informacje o urządzeniu/przeglądarce, dzienniki serwera, identyfikatory cookies/SDK i związane z nimi zdarzenia.
                </p>
                <p>
                  <strong>D) Marketing i komunikacja</strong>
                </p>
                <p>
                  Imię, e-mail/telefon (jeśli podasz), preferencje dot. komunikacji, treści zgód/wycofań, dane dot. interakcji (otwarcia/kliknięcia – gdy dopuszczalne).
                </p>
                <p>
                  <strong>E) Rekrutacja</strong>
                </p>
                <p>
                  Dane z CV/portfolio i korespondencji (zakres zależny od Ciebie i od ogłoszenia), historia procesu, notatki rekrutacyjne.
                </p>
                <hr />
                <h2 id="5-cele-i-podstawy-przetwarzania">5. Cele i podstawy przetwarzania (art. 6 RODO)</h2>
                <p>
                  <strong>Utrzymanie i świadczenie usługi SaaS</strong> (rejestracja, logowanie, konfiguracja, wsparcie, płatności, powiadomienia, bezpieczeństwo) – art. 6 ust. 1 lit. b RODO (umowa) oraz lit. f (uzasadniony interes: zapewnienie jakości i bezpieczeństwa).
                </p>
                <p>
                  <strong>Analityka i rozwój produktu</strong> (telemetria, statystyki, badania użyteczności, panel feedbacku) – art. 6 ust. 1 lit. f RODO (uzasadniony interes: rozwój i ulepszanie funkcjonalności).
                </p>
                <p>
                  <strong>Marketing własny i newsletter</strong> – art. 6 ust. 1 lit. f RODO (marketing bezpośredni własnych usług) oraz – gdzie wymagane – art. 6 ust. 1 lit. a RODO (Twoja zgoda, np. na e-mail/SMS i cookies marketingowe).
                </p>
                <p>
                  <strong>Realizacja obowiązków prawnych</strong> (rachunkowość, podatki, odpowiedzi na uprawnione żądania organów) – art. 6 ust. 1 lit. c RODO.
                </p>
                <p>
                  <strong>Ustalenie, dochodzenie lub obrona roszczeń</strong> – art. 6 ust. 1 lit. f RODO.
                </p>
                <p>
                  <strong>Przetwarzanie danych załogi klientów jako procesor</strong> – art. 28 RODO i umowa powierzenia (przetwarzamy wyłącznie w celu i zakresie wskazanym przez klienta-administratora).
                </p>
                <p>
                  Jeśli podstawą jest <strong>zgoda</strong>, możesz ją w każdej chwili wycofać – nie wpływa to na zgodność z prawem przetwarzania sprzed cofnięcia.
                </p>
                <hr />
                <h2 id="6-profilowanie-i-zautomatyzowane-decyzje">6. Profilowanie i zautomatyzowane decyzje</h2>
                <p>
                  Aplikacja może stosować reguły/algorytmy (np. przy <strong>automatycznym generowaniu grafików</strong>) oraz ostrzeżenia o ryzyku naruszeń prawa pracy. Są to <strong>podpowiedzi dla użytkownika</strong> – odpowiedzialność za ostateczne decyzje grafikowe i kadrowe ponosi klient (pracodawca). <strong>Nie podejmujemy wobec Ciebie decyzji opartych wyłącznie na zautomatyzowanym przetwarzaniu, wywołujących skutki prawne lub w podobny sposób istotnie na Ciebie wpływające.</strong>
                </p>
                <hr />
                <h2 id="7-odbiorcy-danych">7. Odbiorcy danych</h2>
                <p>Możemy udostępniać dane:</p>
                <ul>
                  <li>dostawcom usług IT (hosting/chmura, utrzymanie, bezpieczeństwo, monitorowanie, narzędzia analityczne, systemy mailingowe/powiadomień, narzędzia obsługi klienta);</li>
                  <li>księgowym i doradcom (prawnym/podatkowym) – w niezbędnym zakresie;</li>
                  <li>operatorom płatności – gdy korzystasz z płatnych planów;</li>
                  <li>naszym upoważnionym współpracownikom/osobom zatrudnionym – w oparciu o stosowne upoważnienia poufności;</li>
                  <li>organom publicznym – gdy wymagają tego przepisy;</li>
                  <li>w ramach relacji <strong>procesor–podprocesor</strong> (dla danych załogi klientów) – wyłącznie na podstawie poleceń administratora i odpowiednich umów.</li>
                </ul>
                <p>
                  Aktualną listę kluczowych kategorii podmiotów przetwarzających możemy udostępnić na żądanie.
                </p>
                <hr />
                <h2 id="8-przekazywanie-danych-poza-eog">8. Przekazywanie danych poza EOG</h2>
                <p>
                  Jeśli nasi dostawcy mają siedziby poza EOG (np. w USA), przekazywanie odbywa się z zastosowaniem odpowiednich zabezpieczeń, w szczególności <strong>Standardowych Klauzul Umownych (SCC)</strong>, ewentualnie na podstawie decyzji stwierdzających odpowiedni stopień ochrony lub – w razie potrzeby – Twojej wyraźnej zgody. Kopię mechanizmów zabezpieczeń możesz uzyskać, kontaktując się z nami.
                </p>
                <hr />
                <h2 id="9-okres-przechowywania">9. Okres przechowywania</h2>
                <ul>
                  <li>
                    <strong>Konto i rozliczenia klientów</strong> – przez czas trwania umowy, a następnie przez okres przedawnienia roszczeń oraz wymagany przepisami rachunkowymi/podatkowymi.
                  </li>
                  <li>
                    <strong>Komunikacja i wsparcie</strong> – przez czas niezbędny do obsługi sprawy; wybrane wątki mogą być przechowywane dłużej dla celów dowodowych (przedawnienie).
                  </li>
                  <li>
                    <strong>Marketing/newsletter</strong> – do czasu wycofania zgody/sprzeciwu lub dezaktywacji adresu; podstawowe informacje o udzieleniu/wycofaniu zgody przechowujemy dla celów rozliczalności.
                  </li>
                  <li>
                    <strong>Telemetria/logi bezpieczeństwa</strong> – co do zasady do 12 miesięcy, chyba że dłużej wymagają tego cele dowodowe/bezpieczeństwa.
                  </li>
                  <li>
                    <strong>Rekrutacja</strong> – do zakończenia procesu; jeśli wyrazisz zgodę na przyszłe rekrutacje, nie dłużej niż 12 miesięcy od zakończenia bieżącej rekrutacji lub do cofnięcia zgody.
                  </li>
                  <li>
                    <strong>Dane załogi klientów (procesor)</strong> – zgodnie z poleceniami administratora (klienta) i umową powierzenia; co do zasady do końca świadczenia usługi i upływu przewidzianych w umowie terminów eksportu/usunięcia/kopii zapasowych.
                  </li>
                </ul>
                <hr />
                <h2 id="10-twoje-prawa">10. Twoje prawa</h2>
                <p>
                  Masz prawo żądać: <strong>dostępu</strong> do danych, ich <strong>sprostowania</strong>, <strong>usunięcia</strong>, <strong>ograniczenia przetwarzania</strong>, <strong>przenoszenia</strong> danych oraz wnieść <strong>sprzeciw</strong> (w szczególności wobec marketingu bezpośredniego). Jeśli przetwarzanie opiera się na zgodzie – możesz ją <strong>cofnąć</strong> w dowolnym momencie.
                </p>
                <p>
                  Przysługuje Ci także prawo skargi do Prezesa <strong>Urzędu Ochrony Danych Osobowych</strong> (uodo.gov.pl).
                </p>
                <p>
                  W celu realizacji praw skontaktuj się z nami: <strong>autozaba@ainything.pl</strong>. W niektórych przypadkach (gdy działamy jako procesor) możemy przekazać Twoje zgłoszenie właściwemu administratorowi (Twojemu pracodawcy/zleceniodawcy).
                </p>
                <hr />
                <h2 id="11-bezpieczenstwo-danych">11. Bezpieczeństwo danych</h2>
                <p>
                  Stosujemy odpowiednie środki techniczne i organizacyjne adekwatne do ryzyk, m.in. szyfrowanie w tranzycie i spoczynku (tam gdzie to możliwe), kontrolę dostępu i autoryzacji, rejestrowanie zdarzeń, segmentację środowisk, kopie zapasowe oraz przeglądy uprawnień. Wymagamy poufności od osób mających dostęp do danych i audytujemy dostawców w granicach naszych możliwości.
                </p>
                <hr />
                <h2 id="12-pliki-cookies-i-podobne-technologie">12. Pliki cookies i podobne technologie</h2>
                <p>
                  W Serwisie używamy cookies/SDK oraz podobnych technologii (np. piksele). Służą one zapewnieniu działania, bezpieczeństwa, analityki i – za Twoją zgodą – marketingowi. Panel zgód pozwala zarządzać kategoriami plików (niezbędne/analityczne/marketingowe). Ustawieniami cookies możesz zarządzać także w przeglądarce.
                </p>
                <p>
                  Szczegółowy <strong>Wykaz Cookies</strong> (nazwa, cel, dostawca, czas przechowywania) publikujemy w banerze/polityce cookies i aktualizujemy go wraz ze zmianami narzędzi.
                </p>
                <hr />
                <h2 id="13-media-spolecznosciowe">13. Media społecznościowe</h2>
                <p>
                  Prowadzimy profile w wybranych mediach społecznościowych. Dane przetwarza także operator danego portalu – jako niezależny administrator – zgodnie z jego regulaminem i polityką prywatności. Gdy komentujesz/wiadomościujesz, widzimy dane ujawnione publicznie lub przekazane nam dobrowolnie.
                </p>
                <hr />
                <h2 id="14-kontakt">14. Kontakt</h2>
                <p>
                  W sprawach ochrony prywatności: <strong>autozaba@ainything.pl</strong>.
                  <br />
                  Adres rejestrowy i pozostałe dane formalne Administratora uzupełnij w sekcji 1 po podpisaniu dokumentu.
                </p>
                <hr />
                <h2 id="15-zmiany-polityki">15. Zmiany Polityki</h2>
                <p>
                  Zastrzegamy możliwość aktualizacji Polityki – aktualna wersja jest zawsze dostępna w Serwisie i opatrzona datą. O istotnych zmianach poinformujemy w aplikacji lub e-mailem (jeśli to możliwe).
                </p>
                <p>
                  <strong>Data obowiązywania:</strong> 18.10.2025 r.
                </p>
                <hr />
                <h3 id="zalacznik-informacja-dla-klienta-umowa-powierzenia-skrot">Załącznik: Informacja dla klienta – umowa powierzenia (skrót)</h3>
                <ol>
                  <li>Przetwarzamy dane załogi wyłącznie na udokumentowane polecenie klienta-administratora i w celu świadczenia usługi.</li>
                  <li>Zapewniamy poufność i odpowiednie środki bezpieczeństwa.</li>
                  <li>Włączamy dalszych przetwarzających (podwykonawców IT itp.) wyłącznie w oparciu o umowę i przy zapewnieniu równoważnych zabezpieczeń.</li>
                  <li>Wspieramy administratora w realizacji obowiązków wobec osób, których dane dotyczą (w miarę charakteru przetwarzania).</li>
                  <li>Po zakończeniu świadczenia usługi – na polecenie administratora – usuwamy lub zwracamy dane oraz usuwamy istniejące kopie, chyba że przepisy wymagają ich dalszego przechowywania.</li>
                  <li>Udostępniamy administratorowi informacje niezbędne do wykazania zgodności oraz umożliwiamy audyty w uzgodnionym zakresie.</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
