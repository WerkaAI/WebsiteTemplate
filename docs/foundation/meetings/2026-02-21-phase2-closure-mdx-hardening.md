# Faza 2 — closure (Content/MDX hardening)

Data: 2026-02-21

## Cel fazy
- ujednolicić kontrakty frontmatter i walidację MDX
- pokryć parser i ścieżki slug testami
- osiągnąć 0 błędów walidacji istniejącego contentu

## Zakres wykonany
- wzmocniono bazową walidację metadanych kolekcji:
  - `src/lib/mdx-collection.ts`
  - deterministyczne sortowanie slugów
  - walidacja bazowa także bez przekazanej dedykowanej schemy
- dodano testy kontraktu schem MDX:
  - `src/lib/__tests__/mdx-schemas.test.ts`
- dodano testy parsera i slugów:
  - `src/lib/__tests__/slugs-and-parser.test.ts`
- dodano test walidacji całego contentu na aktualnych schemach:
  - `src/lib/__tests__/content-validation.test.ts`

## Walidacja
- `npm run test` ✅ (22 testy)
- `npm run typecheck` ✅
- `npm run test:smoke` ✅
- `npm run test:contact-form` ✅

## Wynik
- Faza 2 została domknięta.
- Brak błędów walidacji istniejącego contentu (`content/blog`, `content/tutorials`).
- Gotowe wejście do kolejnego etapu roadmapy: CSP enforce rollout telemetry.
