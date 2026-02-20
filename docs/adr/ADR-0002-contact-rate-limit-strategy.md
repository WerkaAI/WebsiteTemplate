# ADR-0002: Contact API rate limit strategy (durable + fallback)

- Status: Accepted
- Data: 2026-02-20

## Kontekst
Endpoint kontaktu używał wyłącznie in-memory rate limitera, co nie zapewnia spójnego ograniczania ruchu w środowiskach wieloinstancyjnych.

## Opcje
1. Pozostawić wyłącznie in-memory.
2. Wymusić wyłącznie zewnętrzny store (twarda zależność).
3. Zastosować model hybrydowy: Upstash Redis + fallback in-memory.

## Decyzja
Wybór opcji 3.

## Konsekwencje
- Plusy:
  - trwały limit w produkcji
  - odporność na chwilowe awarie zewnętrznego store
  - brak twardego zablokowania środowisk developerskich
- Minusy:
  - dodatkowa zależność i konfiguracja env
  - większa złożoność kodu

## Plan rollback
- Wyłączyć zmienne `UPSTASH_REDIS_REST_URL` i `UPSTASH_REDIS_REST_TOKEN`.
- System automatycznie wraca do trybu in-memory.

## Metryki sukcesu
- Spadek liczby nadużyć endpointu kontaktu.
- Brak wzrostu błędów 5xx na ścieżce `/api/contact`.
- Stabilne działanie limitu przy ruchu równoległym.
