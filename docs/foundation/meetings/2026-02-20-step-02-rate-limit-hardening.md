# Team Meeting — Step 02 (Rate Limit Hardening)

- Data: 2026-02-20
- Cel kroku: przejście z in-memory only na trwały rate limiting z fallbackiem.

## Uczestnicy (5+1)
- Platform Architect
- Content/MDX Lead
- Forms & Integrations Lead
- Security & Compliance Lead
- Quality & CI/CD Lead
- Nieszablonowy Geniusz (observer)

## Przebieg dyskusji
1. Forms Lead: potwierdzenie ryzyka — in-memory limit jest niewystarczający w środowisku multi-instance.
2. Security Lead: wymóg produkcyjny — `Retry-After` i jawne nagłówki limitu.
3. Platform Architect: decyzja architektoniczna — adapter `RateLimiter` z automatycznym fallbackiem.
4. Quality Lead: wymóg testów jednostkowych dla trybu memory.
5. Nieszablonowy Geniusz: sugestia ograniczenia ekspozycji danych identyfikujących użytkownika przez hashowanie kluczy.

## Decyzje zespołu
- Wdrożyć `src/lib/security/rate-limit.ts` (Upstash + fallback memory).
- Przepiąć endpoint kontaktu na nowy limiter.
- Dodać testy dla memory limitera.
- Dodać env vars Upstash do przykładów środowiska.

## Wynik
- Endpoint kontaktu korzysta z trwałego mechanizmu, gdy dostępny jest Upstash.
- Gdy Upstash niedostępny, działa bezpieczny fallback do memory.
- Dodane nagłówki limitu i `Retry-After`.

## Artefakty
- [src/lib/security/rate-limit.ts](../../../src/lib/security/rate-limit.ts)
- [src/app/api/contact/route.ts](../../../src/app/api/contact/route.ts)
- [src/lib/security/__tests__/rate-limit.test.ts](../../../src/lib/security/__tests__/rate-limit.test.ts)
- [.env.example](../../../.env.example)
- [.env.local.example](../../../.env.local.example)
