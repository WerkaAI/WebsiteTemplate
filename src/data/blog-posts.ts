export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "11-godzin-odpoczynku-jak-nie-popelnic-bledu",
    title: "11 godzin odpoczynku - jak nie popełnić błędu?",
    excerpt: "Najbardziej podstawowa zasada Kodeksu Pracy wytłumaczona na prostych przykładach. Kiedy liczyć od końca zmiany, a kiedy od wyjścia ze sklepu?",
    category: "Prawo Pracy",
    date: "15 grudnia 2024",
    readTime: "5 min czytania",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    content: `
      <h2>Podstawowa zasada odpoczynku</h2>
      <p>Zgodnie z art. 132 § 1 Kodeksu Pracy, pracownik ma prawo do nieprzerwianego odpoczynku trwającego co najmniej 11 godzin w każdej dobie.</p>
      
      <h3>Kiedy zaczyna się liczyć czas odpoczynku?</h3>
      <p>Odpoczynek rozpoczyna się z chwilą zakończenia pracy, nie zaś opuszczenia miejsca pracy. To oznacza, że jeśli pracownik kończy pracę o 22:00, ale zostaje jeszcze 15 minut na przekazanie kasy, odpoczynek zaczyna się liczyć od 22:15.</p>
      
      <h3>Praktyczne przykłady</h3>
      <ul>
        <li><strong>Zmiana wieczorna:</strong> Pracownik kończy o 22:00 - następną zmianę może rozpocząć najwcześniej o 9:00</li>
        <li><strong>Zmiana nocna:</strong> Pracownik kończy o 6:00 - następną zmianę może rozpocząć najwcześniej o 17:00</li>
        <li><strong>Przekazanie zmiany:</strong> Jeśli przekazanie trwa 30 minut, to ten czas wlicza się do pracy</li>
      </ul>
      
      <h3>Najczęstsze błędy</h3>
      <p>Franczyzobiorcy często mylą się przy:</p>
      <ul>
        <li>Liczeniu czasu od wyjścia ze sklepu zamiast od zakończenia obowiązków</li>
        <li>Nieuwzględnianiu czasu przekazania zmiany</li>
        <li>Planowaniu zmian "na granicy" bez marginesu bezpieczeństwa</li>
      </ul>
      
      <h3>Jak uniknąć problemów?</h3>
      <p>AutoŻaba automatycznie kontroluje przestrzeganie 11-godzinnego odpoczynku i ostrzega przed błędami jeszcze na etapie planowania grafiku.</p>
    `
  },
  {
    slug: "uop-vs-umowa-zlecenie-kiedy-co-wybrac",
    title: "UoP vs Umowa Zlecenie - kiedy co wybrać?",
    excerpt: "Praktyczny przewodnik po rodzajach umów w sklepie. Jak uniknąć przekwalifikowania i kar finansowych? Konkretne przykłady i checklisty.",
    category: "Umowy",
    date: "12 grudnia 2024", 
    readTime: "7 min czytania",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    content: `
      <h2>Różnice między UoP a umową zlecenie</h2>
      <p>Wybór rodzaju umowy w sklepie to jedna z najważniejszych decyzji, która wpływa na koszty i bezpieczeństwo prawne.</p>
      
      <h3>Umowa o pracę (UoP)</h3>
      <h4>Kiedy stosować:</h4>
      <ul>
        <li>Pracownik pracuje regularnie, minimum 2-3 dni w tygodniu</li>
        <li>Ma stałe godziny pracy i miejsce wykonywania obowiązków</li>
        <li>Podlega kierownictwu właściciela sklepu</li>
        <li>Wykonuje podstawowe czynności sprzedawcy</li>
      </ul>
      
      <h4>Korzyści:</h4>
      <ul>
        <li>Większa stabilność zatrudnienia</li>
        <li>Jasne reguły czasu pracy</li>
        <li>Ochrona przed nadużyciami</li>
      </ul>
      
      <h3>Umowa zlecenie</h3>
      <h4>Kiedy stosować:</h4>
      <ul>
        <li>Pracownik pracuje sporadycznie, zastępczo</li>
        <li>Wykonuje konkretne zadania (np. inwentaryzacja)</li>
        <li>Ma elastyczne godziny pracy</li>
        <li>Nie podlega ścisłemu nadzorowi</li>
      </ul>
      
      <h4>Uwaga na przekwalifikowanie!</h4>
      <p>Inspekcja Pracy może przekwalifikować umowę zlecenie na UoP jeśli:</p>
      <ul>
        <li>Praca ma charakter ciągły i regularny</li>
        <li>Pracownik podlega ścisłemu nadzorowi</li>
        <li>Wykonuje typowe obowiązki sprzedawcy</li>
        <li>Ma stałe miejsce i godziny pracy</li>
      </ul>
      
      <h3>Praktyczne wskazówki</h3>
      <p>W większości przypadków w sklepach Żabka najbezpieczniejsze jest stosowanie umów o pracę dla pracowników stałych. Umowy zlecenie pozostaw dla prawdziwych zleceń - zastępstw, sprzątania, czy konkretnych projektów.</p>
      
      <h3>Automatyczna kontrola w AutoŻaba</h3>
      <p>System AutoŻaba analizuje wzorce pracy i ostrzega przed ryzykiem przekwalifikowania umów, pomagając utrzymać zgodność z prawem.</p>
    `
  },
  {
    slug: "kontrola-pip-checklist-franczyzobiorcy",
    title: "Kontrola PIP - checklist franczyzobiorcy", 
    excerpt: "Co sprawdza inspektor? Jak przygotować dokumenty? Lista 15 najważniejszych dokumentów, które musisz mieć pod ręką.",
    category: "PIP",
    date: "8 grudnia 2024",
    readTime: "10 min czytania", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    content: `
      <h2>Przygotowanie do kontroli PIP</h2>
      <p>Kontrola Państwowej Inspekcji Pracy może nastąpić w każdej chwili. Przygotowanie odpowiedniej dokumentacji to klucz do uniknięcia kar.</p>
      
      <h3>15 najważniejszych dokumentów</h3>
      
      <h4>Dokumenty osobowe pracowników:</h4>
      <ol>
        <li><strong>Umowy o pracę/zlecenie</strong> - wszystkie aktualne i zakończone z ostatnich 3 lat</li>
        <li><strong>Regulamin pracy</strong> - musi być aktualny i dostępny dla pracowników</li>
        <li><strong>Regulamin wynagradzania</strong> - jeśli został wprowadzony</li>
        <li><strong>Potwierdzenia zapoznania się z przepisami BHP</strong></li>
        <li><strong>Świadectwa pracy</strong> - dla pracowników, którzy odeszli</li>
      </ol>
      
      <h4>Dokumentacja czasu pracy:</h4>
      <ol start="6">
        <li><strong>Ewidencja czasu pracy (RCP)</strong> - najważniejszy dokument!</li>
        <li><strong>Grafiki pracy</strong> - aktualne i archiwalne z ostatnich 12 miesięcy</li>
        <li><strong>Rejestry godzin nadliczbowych</strong></li>
        <li><strong>Wnioski o urlopy i ich rozliczenia</strong></li>
        <li><strong>Dokumentacja pracy w dni wolne od pracy</strong></li>
      </ol>
      
      <h4>Dokumenty płacowe:</h4>
      <ol start="11">
        <li><strong>Listy płac</strong> - z ostatnich 12 miesięcy</li>
        <li><strong>Dokumenty rozliczenia wynagrodzeń</strong></li>
        <li><strong>Faktury/rachunki za pracę na umowach zlecenia</strong></li>
        <li><strong>Dokumenty ZUS i US</strong></li>
        <li><strong>Ewidencja wypadków przy pracy</strong> - jeśli wystąpiły</li>
      </ol>
      
      <h3>Na co szczególnie zwraca uwagę inspektor?</h3>
      
      <h4>Czas pracy:</h4>
      <ul>
        <li>Czy przestrzegana jest norma 8h/dobę i 40h/tydzień</li>
        <li>Czy zapewniony jest 11-godzinny odpoczynek</li>
        <li>Czy praca w niedziele jest zgodna z prawem</li>
        <li>Czy godziny nadliczbowe nie przekraczają limitów</li>
      </ul>
      
      <h4>Wynagrodzenia:</h4>
      <ul>
        <li>Czy płacona jest minimalna stawka godzinowa</li>
        <li>Czy dopłaty za nadgodziny są prawidłowe</li>
        <li>Czy składki są odprowadzane terminowo</li>
      </ul>
      
      <h4>Forma zatrudnienia:</h4>
      <ul>
        <li>Czy umowy zlecenie nie powinny być UoP</li>
        <li>Czy warunki pracy odpowiadają rodzajowi umowy</li>
      </ul>
      
      <h3>Najczęstsze naruszenia i kary</h3>
      <ul>
        <li><strong>Brak ewidencji czasu pracy:</strong> kara do 30 000 zł</li>
        <li><strong>Przekroczenie norm czasu pracy:</strong> kara do 30 000 zł</li>
        <li><strong>Niepłacenie za nadgodziny:</strong> kara do 30 000 zł + zwrot zaległości</li>
        <li><strong>Nieprawidłowe umowy:</strong> kara + przekwalifikowanie</li>
      </ul>
      
      <h3>Jak AutoŻaba chroni przed kontrolą?</h3>
      <p>AutoŻaba automatycznie:</p>
      <ul>
        <li>Generuje poprawną ewidencję czasu pracy (RCP)</li>
        <li>Sprawdza zgodność grafików z Kodeksem Pracy</li>
        <li>Ostrzega przed przekroczeniami norm</li>
        <li>Przygotowuje raporty gotowe do kontroli PIP</li>
        <li>Archiwizuje całą dokumentację w sposób zgodny z prawem</li>
      </ul>
      
      <h3>Co robić w przypadku kontroli?</h3>
      <ol>
        <li><strong>Zachowaj spokój</strong> - inspektor to nie wróg</li>
        <li><strong>Współpracuj</strong> - udostępnij wymagane dokumenty</li>
        <li><strong>Nie podpisuj niczego</strong> na siłę - możesz poprosić o czas na analizę</li>
        <li><strong>Rób notatki</strong> - zapisuj pytania inspektora i swoje odpowiedzi</li>
        <li><strong>Skontaktuj się z prawnikiem</strong> - jeśli masz wątpliwości</li>
      </ol>
      
      <p><strong>Pamiętaj:</strong> Najlepsza obrona to profilaktyka. Regularnie aktualizuj dokumentację i korzystaj z narzędzi, które gwarantują zgodność z prawem.</p>
    `
  }
];
