# Sesja eksploracyjna: Koszyk gościa po zalogowaniu (E02)

## 1. Metryka
- Tester: TBD
- Data: 2026-10-30
- Nr sesji: S01
- Czas planowany: 10 min
- Start: 11:25
- Koniec: 12:00
- Czas netto: 35 min
- Status: ZAKOŃCZONA

## 2. Środowisko
- Aplikacja: ShopEasy (web)
- URL: http://localhost:3000
- Wersja / build: TBD
- Przeglądarka / urządzenie: TBD
- Konto / rola (bez haseł): TBD (konto klienta, na którym jest ten sam produkt co w koszyku gościa)
- Dane testowe: produkt SoundMax X3 (słuchawki)

## 3. Charter
Eksploruj koszyk gościa po zalogowaniu na konto z tym samym produktem, aby odkryć, jak scalane są pozycje (ilość, cena, duplikaty) i czy żadna pozycja się nie gubi.
- Źródło obszaru: zgłoszenie
- Referencje: zgłoszenie E02 (Koszyk po zalogowaniu, Marta Nowak, Product Owner)
- Zakres wyłączony: TBD

## 4. Przebieg
Wynik: ZGODNY / BUG / OBSERWACJA / ZABLOKOWANIE

| Czas | Nr kroku | Co zrobiono | Wynik | Notatka / ID bugu |
|---|---|---|---|---|
| 11:51 | K01 | Otwarto http://localhost:3000 jako gość, sprawdzono koszyk | ZGODNY | Wg testera zgodnie z oczekiwaniem |
| 11:53 | K02 | Koszyk gościa przed logowaniem: 1 szt. SoundMax X3, cena 299,99 zł, łącznie 299,99 zł (zrzut od testera) | ZGODNY | Wg testera zgodnie z oczekiwaniem |
| 11:55 | K03 | Zalogowano jako Jan Testowy (konto testowe z docs/product/konta-testowe.md), otwarto koszyk | BUG (podejrzenie) | BUG-S01-01. Koszyk konta pusty, pozycja z koszyka gościa nie pojawiła się |
| 12:00 | K04 | Dodano SoundMax X3 jako zalogowany; odświeżono stronę, wylogowano i zalogowano ponownie, otwarto koszyk | ZGODNY | Wg testera pozycja zachowana: 1 szt., 299,99 zł. Sprawdza KOS-02 |
| 11:59 | K04 | Dodano SoundMax X3 jako zalogowany; trwałość: odświeżenie, wylogowanie i ponowne zalogowanie, sprawdzenie koszyka | ZGODNY | Wg testera (potwierdzenie „OK” po każdym kroku). Stan koszyka po każdym kroku do uzupełnienia |

## 5. Bugi
### BUG-S01-01: Pozycja z koszyka gościa znika po zalogowaniu na konto
- Krok źródłowy: K03
- Środowisko: ShopEasy (web), http://localhost:3000, konto testowe Jan Testowy (bez hasła w karcie)
- Kroki odtworzenia:
  1. Jako gość dodać słuchawki SoundMax X3 do koszyka (K01, K02).
  2. Zalogować się na konto Jan Testowy, na którym według zgłoszenia E02 są te słuchawki.
  3. Otworzyć koszyk.
- Oczekiwany wynik: Do ustalenia z PO (Marta Nowak). PRD nie definiuje scalania koszyka gościa z koszykiem konta.
- Aktualny wynik: Koszyk konta jest pusty ("Twój koszyk jest pusty"). Pozycja SoundMax X3 z koszyka gościa nie pojawiła się.
- Dowody: do uzupełnienia przez testera (zrzut koszyka gościa z K02 i zrzut pustego koszyka po zalogowaniu z K03)
- Ważność: Wysoka

## 6. Podsumowanie
- Pokryte obszary: koszyk gościa przed logowaniem (K01-K02); koszyk konta po zalogowaniu (K03); trwałość koszyka zalogowanego klienta po odświeżeniu, wylogowaniu i ponownym logowaniu (K04, KOS-02).
- Niepokryte / do zrobienia: scalanie koszyka gościa z koszykiem konta, gdy konto ma już produkty (scenariusz E02 w pełnej postaci, nie wykonano); limit 5 pozycji dla konta standardowego (KOS-04); oczekiwany wynik scalania do potwierdzenia z PO (Marta Nowak).
- Zablokowania (setup, dane, dostęp): brak. Nie potwierdzono, czy konto testowe ma w historii lub koszyku słuchawki SoundMax X3 przed sesją.
- Bugi: BUG-S01-01 (ważność: wysoka, BUG podejrzenie): pozycja z koszyka gościa nie pojawia się w koszyku konta po zalogowaniu.
- Proponowane kolejne sesje: S02 po potwierdzeniu wyniku z PO: scalanie koszyka gościa z niepustym koszykiem konta oraz limit KOS-04.
