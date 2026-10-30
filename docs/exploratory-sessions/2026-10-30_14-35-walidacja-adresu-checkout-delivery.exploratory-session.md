# Sesja eksploracyjna: Walidacja pól adresu w /checkout/delivery

## 1. Metryka
- Tester: TBD
- Data: 2026-10-30
- Nr sesji: S02
- Czas planowany: 5 min
- Start: 14:35
- Koniec: 14:43
- Czas netto: 8 min
- Status: ZAKOŃCZONA

## 2. Środowisko
- Aplikacja: ShopEasy (web)
- URL: http://localhost:3000
- Wersja / build: TBD
- Przeglądarka / urządzenie: przeglądarka Playwright
- Tryb obserwacji: Playwright
- Konto / rola (bez haseł): test@shopeasy.pl (Jan Testowy)
- Dane testowe: TBD

## 3. Charter
Eksploruj walidację pól adresu w /checkout/delivery (kod pocztowy NN-NNN i drugie pole adresu) używając wartości granicznych i niepoprawnych formatów, aby odkryć luki w walidacji.
- Źródło obszaru: zgłoszenie E03 + PRD
- Referencje: zgłoszenie E03; PRD CHK-01 (kod pocztowy XX-XXX), BR-09
- Zakres wyłączony: pozostałe kroki checkoutu, płatność

## 4. Przebieg
Wynik: ZGODNY / BUG / OBSERWACJA / ZABLOKOWANIE

| Czas | Nr kroku | Co zrobiono | Wynik | Notatka / ID bugu |
|---|---|---|---|---|
| 14:36 | K01 | Tester: Koszyk, Produkty, 2x „Dodaj do koszyka", Koszyk, „Przejdź do kasy"; ekran /checkout/delivery z polami: Imię, Nazwisko, Ulica i numer, Kod pocztowy, Miasto, Telefon | OBSERWACJA | Brak osobnego „drugiego pola adresu" (np. linia 2); jest tylko „Ulica i numer". Do potwierdzenia z E03/PRD (CHK-01 nie definiuje drugiego pola). |
| 14:37 | K02 | Tester: „Przejdź do płatności" na pustym formularzu | ZGODNY | Pozostał na /checkout/delivery. Komunikaty: Imię/Nazwisko/Miasto „Wymagane (min. 2 znaki)", Ulica „Wymagane (min. 5 znaków)", Telefon „Nieprawidłowy numer telefonu", Kod „Format: XX-XXX (np. 00-001)". Brak błędów konsoli. |
| 14:38 | K03 | Agent za zgodą wypełnił formularz (Jan, Testowy, ul. Kwiatowa 12/5, kod 0000-1, Warszawa, +48 600 000 000); tester kliknął „Przejdź do płatności" | ZGODNY | Pozostał na /checkout/delivery; jedyny komunikat: „Format: XX-XXX (np. 00-001)" przy kodzie pocztowym. |
| 14:39 | K04 | Agent za zgodą wpisał kod 00-001; tester kliknął „Przejdź do płatności" | ZGODNY | Przejście na /checkout/payment („Płatność"), brak komunikatów walidacji, brak błędów 4xx/5xx w sieci. |
| 14:41 | K05 | Agent za zgodą: powrót (navigate_back) na /checkout/delivery, wypełnienie pól (dane poprawne), kod 00001, kliknięcie „Przejdź do płatności" | ZGODNY | Po powrocie formularz był pusty (bez zapamiętanych danych). Kod 00001 odrzucony: pozostał na /checkout/delivery, komunikat „Format: XX-XXX (np. 00-001)". |
| 14:41 | K06 | Agent za zgodą: kod 00-00 (reszta pól poprawna), kliknięcie „Przejdź do płatności" | ZGODNY | Odrzucony: pozostał na /checkout/delivery, komunikat „Format: XX-XXX (np. 00-001)". |
| 14:42 | K07 | Agent (na prośbę testera): kod ab-cde, kliknięcie „Przejdź do płatności" | ZGODNY | Odrzucony, komunikat „Format: XX-XXX (np. 00-001)". |
| 14:42 | K08 | Agent: kod „00 001" (spacja zamiast łącznika), kliknięcie | ZGODNY | Odrzucony, komunikat o formacie. |
| 14:42 | K09 | Agent: kod 00-001, ulica „ul 1" (4 znaki), kliknięcie | ZGODNY | Odrzucone: „Wymagane (min. 5 znaków)". Komunikat pojawia się z opóźnieniem (pierwszy odczyt tuż po kliknięciu jeszcze go nie pokazał). |
| 14:42 | K10 | Agent: kod 00-001, ulica 258 znaków, kliknięcie | OBSERWACJA | Zaakceptowana, przejście na /checkout/payment. Brak limitu długości pola; PRD nie podaje maks. długości, do potwierdzenia z analitykiem (E03). |

## 5. Bugi

## 6. Podsumowanie
- Pokryte obszary: walidacja kodu pocztowego (pusty, 0000-1, 00001, 00-00, ab-cde, „00 001", 00-001) i ulicy (4 znaki, 258 znaków) w /checkout/delivery.
- Niepokryte / do zrobienia: znaki specjalne/skrypty w ulicy, spacje na początku/końcu, walidacja po stronie serwera, telefon; limit długości ulicy do potwierdzenia z analitykiem.
- Zablokowania (setup, dane, dostęp): brak. Brak osobnego drugiego pola adresu (K01), do wyjaśnienia z autorką E03.
- Bugi: brak potwierdzonych. Obserwacje: K01 (brak drugiego pola), K10 (258 znaków akceptowane).
- Proponowane kolejne sesje: znaki specjalne i długie wartości we wszystkich polach adresu; zapisane adresy (CHK-02).
