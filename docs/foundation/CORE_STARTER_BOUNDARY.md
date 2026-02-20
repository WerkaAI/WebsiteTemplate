# CoreStarter Boundary (v1)

## Cel
Oddzielić reusable `CoreStarter` od warstwy `PerProject`, aby każdy nowy projekt startował szybko i bez długu architektonicznego.

## CoreStarter (obowiązkowe)
- Platforma i runtime:
  - [src/app](../../src/app)
  - [next.config.mjs](../../next.config.mjs)
  - [tsconfig.json](../../tsconfig.json)
- Security baseline:
  - [src/middleware.ts](../../src/middleware.ts)
  - [src/lib/security](../../src/lib/security)
- Formularze i anti-abuse:
  - [src/app/api/contact/route.ts](../../src/app/api/contact/route.ts)
  - [src/lib/validation/contact.ts](../../src/lib/validation/contact.ts)
- Content platform:
  - [src/lib/content.ts](../../src/lib/content.ts)
  - [src/lib/posts.ts](../../src/lib/posts.ts)
- Quality gates:
  - [.github/workflows/ci.yml](../../.github/workflows/ci.yml)
  - [vitest.config.ts](../../vitest.config.ts)

## PerProject (konfigurowalne)
- Brand/copy/sekcje sprzedażowe.
- Menu, stopka, dane kontaktowe klienta.
- Zawartość katalogów:
  - [content/blog](../../content/blog)
  - [content/tutorials](../../content/tutorials)
- Integracje klienta (CRM, pixel stack, custom webhooki).

## Reguły pracy
1. Każda zmiana w `CoreStarter` wymaga ADR.
2. Każda zmiana w `CoreStarter` wymaga testu lub aktualizacji testu.
3. Per-project override nie może osłabiać security baseline bez akceptacji Security Lead.

## Kryterium gotowości nowego projektu
- Green CI (`typecheck + lint + test + build`).
- Uzupełnione env (w tym rate limiting).
- Ustalony owner dla `PerProject` content i integracji.
