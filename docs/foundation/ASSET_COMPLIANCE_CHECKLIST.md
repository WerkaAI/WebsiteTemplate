# Asset Compliance Checklist (CoreStarter)

Cel: upewnić się, że starter nie zawiera wizualnych pozostałości po poprzednich klientach.

## 1) Prawa i tożsamość
- [ ] Brak logo/nazwy poprzedniego klienta w grafikach i wideo
- [ ] Brak rozpoznawalnych elementów brandu klienta (kolory, uniformy, signage)
- [ ] Brak danych osobowych/firmowych widocznych w materiałach

## 2) Techniczne
- [ ] Wszystkie media używane przez runtime są neutralne biznesowo
- [ ] Brak nieużywanych legacy plików w `public/`
- [ ] Nazwy plików są neutralne (bez `autozaba|zaba|zabka`)

## 3) Onboarding
- [ ] Flow onboarding działa bez brandowego MP4
- [ ] Dla każdego kroku istnieje fallback (tekst + statyczny placeholder)
- [ ] Brak odniesień do domen i ekranów poprzedniego klienta

## 4) Release gate
- [ ] `npm run lint` green
- [ ] `npm run typecheck` green
- [ ] `npm run test -- --run` green
- [ ] meeting note + wpis w audycie white-label
