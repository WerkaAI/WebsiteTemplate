# Blueprint dla GPT-5 Codex: Podstrona "Tutoriale"

## 0. Instrukcja nadrzędna
- Traktuj ten dokument jako blueprint zgodny z workflow "Blueprint" opisanym w wiedzy bazowej GPT-5 Vibe Coding.
- Każdą fazę realizuj iteracyjnie: wyprodukuj artefakt → przedstaw do weryfikacji → kontynuuj dopiero po akceptacji.
- Stosuj komentarze w stylu `// GPT-5 Directive: ...` lub `/** GPT-5 Directive: ... */` aby utrzymać kontekst lokalny tam, gdzie dalsze generacje będą korzystać z kodu.

## 1. Architectural Priming
- Architektura: Next.js 14 App Router z SSR, kolekcje treści w MDX, TypeScript jako język bazowy, Tailwind CSS do stylowania.
- Wzorzec: Generyczny loader MDX → specyficzne kolekcje (Blog, Tutoriale). Utwórz moduł `src/lib/mdx-collection.ts` implementujący logikę wspólną, a następnie moduły domenowe (`src/lib/tutorials.ts`, aktualizacja `posts.ts` do korzystania z nowego loadera).
- Separacja domen: `/blog` pozostaje źródłem artykułów eksperckich, `/tutoriale` przedstawia instruktaże produktu. Utrzymaj niezależne katalogi treści oraz routing.
- Warstwa prezentacji: lista kart tutoriali + widok pojedynczego MDX. Reuse istniejących komponentów blogowych, kiedy możliwe, ale preferuj ekstrakcję wspólnych elementów do `src/components/content/`.

## 2. Content Blueprint
- Utwórz katalog `content/tutorials/` i README z zasadami edytorskimi oraz przykładowym frontmatterem.
- Frontmatter (wymagany): `title`, `description`, `date`, `persona` (tablica stringów), `difficulty`, `durationMinutes`, `tags` (tablica stringów), `draft` (boolean). Dodaj walidację typów w warstwie ładowania.
- Zapewnij opcję rozszerzania schematu frontmatter w przyszłości (np. `relatedTutorials`). Zaimplementuj walidację przez Zod albo własny guard TypeScript tak, by błędne frontmatter powodowały ostrzeżenie w konsoli builda.

## 3. Data Layer Directives
- W `src/lib/mdx-collection.ts` zaimplementuj funkcje: `getCollectionSlugs(dir)`, `loadEntry(dir, slug)`, `getAllEntries(dir, options)`. Zadbaj o obsługę draftów, sortowanie po `date` oraz fallback na pustą listę gdy katalog nie istnieje.
- W `src/lib/tutorials.ts` eksportuj: `TutorialMeta` (interfejs), `getAllTutorialSlugs`, `loadTutorial`, `getAllTutorials`. Stosuj `as const` dla katalogu bazowego `TUTORIAL_DIR`.
- Zrefaktoryzuj `src/lib/posts.ts`, aby używał nowego loadera. Zabezpiecz kompatybilność API (dotychczasowe funkcje i typy muszą pozostać zgodne).

## 4. Routing i UI Spec
- Ścieżka lista: `src/app/tutoriale/page.tsx` (server component). Pobierz dane przez `getAllTutorials`. Zaimplementuj hero, listę kart, badge person i trudności oraz CTA do rozpoczęcia tutorialu.
- Dynamiczny widok: `src/app/tutoriale/[slug]/page.tsx`. Implementuj `generateStaticParams`, `generateMetadata` (tytuł, opis, tags, open graph). Renderuj MDX przez `MDXRemote` lub istniejące komponenty z `mdx-components.tsx`.
- Dodaj layout meta (`metadata` export) w katalogu `tutoriale`. Rozważ breadcrumbs jako komponent reużywalny.
- W komponentach zastosuj semantykę HTML5 (`<main>`, `<article>`, `<nav>`), a filtry/future state oznacz komentarzem TODO.

## 5. Stylistic Injection
- Utrzymuj idiomatyczny TypeScript (pełne typowanie, brak `any`).
- Priorytet: klarowność nad spryt. Zgodnie z filozofią "readability-first" unikaj magii.
- Styl Tailwind: komponuj utility-classes, ale dla powtarzalnych bloków ekstraktuj komponenty z `cva` lub dedykowane klasy.
- W docstrings i komentarzach opisuj nietrywialne decyzje (np. sortowanie, fallback) w duchu "Contextual Framing".

## 6. Constraint Layering
- Performance: statyczne generowanie ścieżek (`generateStaticParams`), SSR bez dodatkowych zapytań runtime.
- Security: brak dynamicznych importów z niezaufanych ścieżek; walidacja frontmatter aby uniknąć injection w meta tagach.
- Accessibility: kontrast tekstu, focus outline, ALT-y w treściach. Dodaj check-listę w README dla autorów treści.
- Operacyjnie: wszystkie funkcje eksportowane z modułów muszą być czyste (pure) względem inputu i nie zapisywać na dysk.

## 7. Navigation & Linking
- Zaktualizuj globalny header (`src/components/layout/Header.tsx` lub aktualny plik nawigacji) o link "Tutoriale" z aktywnym stanem.
- Rozszerz stopkę sekcją "Pomoc" linkującą `/tutoriale` oraz ewentualne CTA dla supportu.
- Na liście bloga dodaj sekcję cross-link "Powiązane tutoriale" (na razie placeholder z TODO, jeśli brak danych).

## 8. SEO & Analytics
- Lista: `metadata` z opisem misji tutoriali, `robots` allow, `openGraph` i `twitter` z obrazem fallback z `/public/og-image-placeholder.png`.
- Pojedynczy tutorial: generowanie canonical, breadcrumbs schema (`@graph`).
- Przygotuj hook lub util do rejestrowania zdarzeń (np. `tutorial_started`) i załóż TODO na integrację z analityką (np. w `src/hooks/useAnalytics.ts`).

## 9. Test Plan (TDD Symbiosis)
- Etap Red: napisz testy jednostkowe dla `getAllTutorials` (mock FS) i komponentów (lista renderuje dane, ukrywa drafty).
- Etap Green: minimalne implementacje aż testy przejdą.
- Etap Refactor: wyrównanie stylu, ekstrakcja komponentów, uzupełnienie dokumentacji.
- E2E/manual: sprawdź generowane statyczne strony, nawigację, dostępność (Tab order, screen reader).

## 10. Dokumentacja i Utrzymanie
- `content/tutorials/README.md`: zasady frontmatter, styl pisania, checklista dostępności.
- `docs/tutorials-page-plan.md`: aktualizuj po każdej większej iteracji, opisując co zostało wdrożone.
- `README.md`: sekcja "Treści" rozszerzona o informacje o tutorialach, sposób dodawania nowego pliku MDX.
- Dodaj TODO listę migracji istniejących wpisów (jeżeli któreś powinny przejść do tutoriali).

## 11. Harmonogram Iteracji
1. Infrastruktura MDX (katalog, generyczny loader, typy) + testy Red (0.5 dnia).
2. Implementacja listy i widoku szczegółowego + metadane (1 dzień).
3. Integracja nawigacji, SEO, analityki light (0.5 dnia).
4. Refine & QA: accessibility audit, cross-links, dokumentacja (0.5 dnia).
5. Wgranie treści i review merytoryczny (czas zależny od zespołu contentu).

## 12. Definition of Done
- Wszystkie testy i build przechodzą (`npm run test`, `npm run lint`, `npm run build`).
- Content pipeline: co najmniej jeden przykładowy tutorial MDX z poprawnym frontmatterem i renderowaniem.
- Nawigacja i SEO działają zgodnie z opisem, meta dane widoczne w DevTools.
- Dokumentacja repo uzupełniona, TODO oznaczone realnymi follow-upami.
