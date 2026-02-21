# Spotkanie 06: Własny System Rezerwacji (Booking Engine)

**Data:** 2026-02-21
**Uczestnicy:** Victor (Product Lead), David (Architekt), Elena (UI/UX), Marcus (CRO), Sophia (Performance), Bartosz (Wildcard)

## 🎯 Cel Spotkania
Zaprojektowanie i zaplanowanie wdrożenia natywnego systemu rezerwacji wizyt (np. dla fizjoterapeutów), który uniezależni klientów od zewnętrznych portali (ZnanyLekarz, Booksy), zintegruje się z Google Calendar i zachowa standardy top 10% web designu.

## 🗣️ Notatki z Dyskusji
- **David (Architektura):** Budowa własnego backendu do rezerwacji (strefy czasowe, konflikty, powiadomienia) to pułapka i *scope creep*. Rekomendacja: użycie **Cal.com** (open-source) jako silnika (API/Headless).
- **Bartosz (Innowacja):** Pomysł interaktywnego modelu 3D ciała do wyboru wizyty. (Decyzja: Przeniesione do Backlogu jako moduł Premium).
- **Elena (Design):** Kategoryczny zakaz używania standardowych, brzydkich iframe'ów. Interfejs musi być w pełni customowy, spójny z design systemem strony, z płynnymi animacjami (Framer Motion).
- **Marcus (Konwersja):** Obok kalendarza musi znaleźć się *social proof* (opinie, liczby). Wymagany mechanizm "Listy rezerwowej" w przypadku braku terminów.
- **Sophia (Wydajność):** Podejście API-first gwarantuje brak obciążenia zewnętrznym JavaScriptem, co chroni nasze Core Web Vitals i pozycje SEO.

## 📝 Decyzje Architektoniczne
1. **Silnik:** Cal.com (darmowy plan dla jednostek, potężne API, integracja z Google Calendar).
2. **Frontend:** Customowy komponent w Next.js (Tailwind CSS + Radix UI / shadcn/ui).
3. **Integracja:** Wykorzystanie `@calcom/embed-react` z głęboką customizacją CSS lub czystego API Cal.com do pełnej kontroli nad UI.

---

## 🚀 Plan Wdrożenia (Action Plan dla Senior Deva)

### Faza 1: Proof of Concept (PoC) i Konfiguracja (1-2 dni)
- [ ] Założenie testowego konta na Cal.com i spięcie z testowym Google Calendar.
- [ ] Skonfigurowanie typów wydarzeń (np. "Konsultacja fizjoterapeutyczna 45 min").
- [ ] Instalacja paczki `@calcom/embed-react` w projekcie Next.js.
- [ ] Stworzenie surowego komponentu `<BookingWidget />` i weryfikacja komunikacji z API.

### Faza 2: UI/UX & Design System (2-3 dni)
- [ ] Zaprojektowanie widoku kalendarza i wyboru godzin zgodnie z wytycznymi Eleny (minimalizm, duże karty, czytelna typografia).
- [ ] Wdrożenie layoutu dwukolumnowego: Lewa kolumna (Social Proof + Opis wizyty), Prawa kolumna (Interaktywny kalendarz).
- [ ] Ostylowanie komponentu za pomocą Tailwind CSS (nadpisanie domyślnych styli Cal.com).

### Faza 3: Logika Biznesowa i CRO (1-2 dni)
- [ ] Obsługa stanów ładowania (Skeleton loaders) i błędów.
- [ ] Zaprojektowanie i wdrożenie UI dla "Listy rezerwowej" (Waitlist), gdy brakuje terminów.
- [ ] Podpięcie analityki (śledzenie zdarzeń: otwarcie kalendarza, wybór daty, sukces rezerwacji).

### Faza 4: Polish & Performance (1 dzień)
- [ ] Dodanie mikrointerakcji i płynnych przejść między krokami rezerwacji (Framer Motion).
- [ ] Audyt wydajności (Lighthouse) - upewnienie się, że komponent ładuje się leniwie (Lazy Loading) i nie blokuje wątku głównego.
- [ ] Testy RWD (szczególnie użyteczność wyboru daty na małych ekranach mobilnych).
