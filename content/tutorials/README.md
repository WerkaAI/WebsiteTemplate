# Zasady przygotowania tutoriali

Każdy tutorial zapisujemy w pliku `.mdx` w tym katalogu. Poniżej krótka checklista:

1. Uzupełnij frontmatter zgodnie z przykładem:
   ```yaml
   ---
   title: "Jak uruchomić raport dzienny"
   description: "Krok po kroku jak wygenerować raport dzienny w AutoŻaba."
   date: "2025-10-15"
   persona: ["właściciel", "manager"]
   difficulty: "podstawowy"
   durationMinutes: 6
   tags: ["raporty", "start"]
   draft: false
   ---
   ```
2. `persona` to lista ról, które skorzystają z tutorialu (np. `właściciel`, `pracownik`, `manager`).
3. `difficulty` może przyjmować: `podstawowy`, `średniozaawansowany`, `zaawansowany`.
4. `durationMinutes` wpisujemy jako liczbę minut potrzebnych na przerobienie materiału.
5. Dla wersji roboczych ustaw `draft: true` – taki plik nie pojawi się na stronie.
6. Dodaj alternatywny tekst do każdej grafiki (`alt="..."`).
7. Na końcu dodaj sekcję z następnym krokiem lub linkiem do wsparcia.

> TODO: Rozszerzyć listę o zasady nazewnictwa plików i persony, kiedy zespół contentu zatwierdzi słownik.
