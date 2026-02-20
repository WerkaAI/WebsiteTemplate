# Team Meeting — Step 04 (Zero-Warning Baseline)

- Data: 2026-02-20
- Cel kroku: usunąć warningi jakościowe i potwierdzić czysty baseline.

## Uczestnicy (5+1)
- Platform Architect
- Content/MDX Lead
- Forms & Integrations Lead
- Security & Compliance Lead
- Quality & CI/CD Lead
- Nieszablonowy Geniusz (observer)

## Przebieg dyskusji
1. Quality Lead: zgłoszenie 2 warningów lint blokujących „clean baseline”.
2. Platform Architect: propozycja minimalnych poprawek bez efektów ubocznych.
3. Content Lead: potwierdzenie świadomego użycia natywnego `img` w MDX.
4. Nieszablonowy Geniusz: rekomendacja, by nie nadmiernie przebudowywać MDX (najpierw stabilność, potem optymalizacje).

## Decyzje zespołu
- Poprawić dependencies w `useCallback`.
- Zastosować lokalny wyjątek lint dla `img` w mapowaniu MDX (z komentarzem).
- Zweryfikować `typecheck + lint + test + build`.

## Wynik
- Lint: 0 warningów i 0 błędów.
- Testy: zielone.
- Build: zielony.

## Artefakty
- [src/lib/onboarding/use-chat-progress.ts](../../../src/lib/onboarding/use-chat-progress.ts)
- [src/mdx-components.tsx](../../../src/mdx-components.tsx)
