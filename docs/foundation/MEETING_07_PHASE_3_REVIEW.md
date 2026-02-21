# Spotkanie 7: Przegląd Fazy 3 (Konwersja i Formularze)

**Data:** 21 lutego 2026  
**Uczestnicy:** Victor (Product Lead), David (Frontend Architect), Elena (UI/UX), Marcus (CRO), Sophia (Performance), Bartosz (Wildcard)

## Przebieg dyskusji

**Victor:** David, podsumuj efekty Fazy 3.

**David:** Dostarczyłem 2 kluczowe elementy:
1. **Conversational Form (multi-step)** w `ContactForm`:
   - krokowy flow: dane kontaktowe → kontekst → wiadomość i zgody,
   - płynne przejścia i pasek progresu,
   - zachowane wszystkie istniejące `data-testid`, walidacje Zod, Turnstile i API.
2. **Dostosowanie testów E2E** do nowego flow:
   - test przechodzi przez kroki formularza,
   - potwierdza walidację, stan ładowania, sukces i błąd sieciowy,
   - wynik: scenariusze landing + `/kontakt` działają poprawnie.

**Elena:** UX jest dużo lepszy. Formularz nie przytłacza i prowadzi użytkownika krok po kroku.

**Marcus:** To wspiera konwersję. Mniejsza liczba pól na ekranie i progres zwiększają szansę dokończenia.

**Sophia:** Nie ma regresji krytycznych. Implementacja jest lekka, a testy automatyczne chronią przed przypadkowym złamaniem flow.

**Bartosz:** Chciałbym kiedyś dodać tryb „smart prompts” z dynamicznymi pytaniami zależnie od odpowiedzi.

**Victor:** Dobry pomysł do backlogu. Na teraz zamykamy Fazę 3.

## Ustalenia i decyzje

1. **Faza 3 zaakceptowana.**
2. **Conversational Form** zostaje jako domyślny wzorzec formularza kontaktowego.
3. **ABTest dla MDX** dodany jako komponent bazowy do eksperymentów treści.
4. Kolejny krok: plan eksperymentów A/B i mierzenie wpływu na konwersję.
