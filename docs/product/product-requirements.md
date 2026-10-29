# ShopEasy — Product Requirements Document (PRD)

**Wersja:** 1.0  
**Data:** 2026-07-12  
**Status:** Draft

---

## 1. Przegląd produktu

## **ShopEasy** to webowa i mobilna aplikacja e-commerce B2C umożliwiająca klientom indywidualnym przeglądanie katalogu produktów, zarządzanie koszykiem i realizację zamówień z płatnością online.

## 2. Cel produktu

- Umożliwić klientom zakup produktów online w modelu B2C.
- Zapewnić prosty, 3-krokowy checkout z obsługą min. dwóch metod płatności.
- Dostarczyć klientom wgląd w historię zamówień i status realizacji.
- Wspierać program lojalnościowy (faza 2).

---

## 3. Użytkownicy i role

| Rola                      | Opis                                                                   |
| ------------------------- | ---------------------------------------------------------------------- |
| **Gość**                  | niezalogowany użytkownik; może przeglądać katalog i dodawać do koszyka |
| **Klient zarejestrowany** | zalogowany użytkownik; pełen dostęp do checkout, historii, profilu     |
| **Administrator**         | zarządza katalogiem i zamówieniami (poza zakresem warsztatu)           |

---

## 4. Zakres

### W zakresie (in scope)

- Rejestracja i logowanie klientów
- Katalog produktów z wyszukiwaniem i filtrowaniem
- Koszyk zakupowy
- Checkout 3-krokowy (dostawa → płatność → potwierdzenie)
- Konto użytkownika (profil, historia zamówień)
- Program lojalnościowy — specyfikacja częściowa (faza 2)
- Obsługa błędów i stanów systemu
- Responsywność: desktop i mobile (iOS / Android — przeglądarka)

### Poza zakresem (out of scope)

- Panel administracyjny
- Integracje z zewnętrznymi systemami magazynowymi
- Natywne aplikacje mobilne (iOS/Android)
- Powiadomienia push
- Obsługa zwrotów i reklamacji
- Wielojęzyczność (aplikacja wyłącznie w języku polskim)

---

## 5. Wymagania funkcjonalne

### 5.1 Autoryzacja

**REG-01** Użytkownik może zarejestrować konto podając: imię, nazwisko, adres e-mail, hasło, potwierdzenie hasła.

**REG-02** Walidacja pól rejestracji:

- e-mail: format RFC 5321, unikalność w systemie
- hasło: min. 8 znaków, min. 1 cyfra, min. 1 znak specjalny
- wszystkie pola wymagane

**REG-03** Po rejestracji system wysyła e-mail weryfikacyjny. Konto jest aktywne dopiero po kliknięciu linku.

**REG-04** Użytkownik może zalogować się e-mailem i hasłem.

**REG-05** Po 5 nieudanych próbach logowania konto zostaje tymczasowo zablokowane na 15 minut.

**REG-06** Użytkownik może zresetować hasło przez e-mail (link ważny 1 godzinę).

**REG-07** Sesja wygasa po 30 minutach bezczynności. Przed wygaśnięciem system wyświetla ostrzeżenie z opcją przedłużenia.

**REG-08** Wylogowanie usuwa dane sesji po stronie serwera.

---

### 5.2 Katalog produktów

**KAT-01** Strona główna wyświetla baner promocyjny i sekcję polecanych produktów (max 8 pozycji).

**KAT-02** Lista produktów obsługuje:

- filtrowanie po: kategorii, przedziale cenowym, dostępności
- sortowanie po: nazwie (A-Z), cenie (rosnąco/malejąco), nowości
- paginację (20 produktów na stronę)

**KAT-03** Wyszukiwarka pełnotekstowa przeszukuje: nazwę produktu, opis, kategorię. Minimalna długość frazy: 2 znaki.

**KAT-04** Strona produktu zawiera: zdjęcia (galeria, min. 1), nazwę, opis, cenę brutto, dostępność, warianty (rozmiar/kolor jeśli dotyczy), przycisk "Dodaj do koszyka".

**KAT-05** Produkt niedostępny (stock = 0): przycisk "Dodaj do koszyka" jest nieaktywny, wyświetlana jest informacja "Chwilowo niedostępny".

---

### 5.3 Koszyk

**KOS-01** Gość i zalogowany klient mogą dodawać produkty do koszyka.

**KOS-02** Koszyk zalogowanego klienta jest trwały (zachowany między sesjami).

**KOS-03** Klient może: zmienić ilość pozycji, usunąć pozycję, wyczyścić koszyk.

**KOS-04** Limit pozycji w koszyku dla konta standardowego: **max 5 różnych produktów** (nie sztuk).

**KOS-05** Próba dodania 6. produktu skutkuje komunikatem błędu: "Osiągnięto limit pozycji dla konta standardowego (5). Usuń produkt lub przejdź na konto Premium."

**KOS-06** Koszyk wyświetla: listę pozycji z ilością i ceną jednostkową, łączną kwotę netto i brutto, pole kodu rabatowego.

**KOS-07** Pole kodu rabatowego przyjmuje kod i wyświetla komunikat o zastosowanym rabacie lub błędzie. (Logika kodów rabatowych: poza zakresem fazy 1.)

**KOS-08** Jeśli produkt w koszyku stał się niedostępny przed finalizacją zamówienia, system informuje o tym przed przejściem do checkout.

---

### 5.4 Checkout — 3-krokowy proces zamówienia

#### Krok 1: Dane dostawy

**CHK-01** Klient podaje adres dostawy: imię, nazwisko, ulica i numer, kod pocztowy (format XX-XXX), miasto, kraj (domyślnie: Polska), numer telefonu kontaktowego.

**CHK-02** Zalogowany klient może wybrać adres z zapisanych adresów lub podać nowy.

**CHK-03** Walidacja wszystkich pól odbywa się przed przejściem do kroku 2.

**CHK-04** Klient może wybrać metodę dostawy (min. 2 opcje: kurier 1-2 dni robocze, paczkomat 2-3 dni robocze) z widocznym kosztem.

#### Krok 2: Płatność

**CHK-05** Dostępne metody płatności:

- karta kredytowa/debetowa (numer, data ważności, CVV)
- BLIK (6-cyfrowy kod)

**CHK-06** Dane karty nie są przechowywane przez system — przekazywane bezpośrednio do bramki płatności.

**CHK-07** Sesja płatności wygasa po **15 minutach** od wejścia na krok 2. Po upływie czasu system wyświetla komunikat i przekierowuje do koszyka.

**CHK-08** Przy błędzie płatności system wyświetla komunikat z przyczyną i umożliwia ponowną próbę (max 3 próby bez powrotu do koszyka).

#### Krok 3: Potwierdzenie

**CHK-09** Przed złożeniem zamówienia klient widzi pełne podsumowanie: pozycje, adres dostawy, metodę płatności (maskowaną), koszt dostawy, łączną kwotę.

**CHK-10** Po złożeniu zamówienia system:

- generuje unikalny numer zamówienia
- wysyła e-mail potwierdzający (wymagany — zamówienie bez potwierdzonego e-maila nie jest finalizowane)
- wyświetla stronę potwierdzenia z numerem zamówienia i szacowanym terminem dostawy

**CHK-11** Po potwierdzeniu zamówienia zmiana adresu dostawy jest niemożliwa.

---

### 5.5 Konto użytkownika

**USR-01** Sekcja "Moje konto" zawiera: Profil, Historia zamówień, Program lojalnościowy.

**USR-02** Profil: klient może edytować imię, nazwisko, numer telefonu, adres e-mail (wymaga potwierdzenia), hasło.

**USR-03** Historia zamówień: lista zamówień z kolumnami: numer, data, status, łączna kwota. Kliknięcie otwiera szczegóły.

**USR-04** Szczegół zamówienia zawiera: pozycje z ilościami i cenami, adres dostawy, metodę płatności, status, historię statusów.

**USR-05** Statusy zamówienia: Przyjęte → W realizacji → Wysłane → Dostarczone.

---

### 5.6 Program lojalnościowy _(specyfikacja częściowa — faza 2)_

**LOY-01** Zalogowany klient zbiera punkty za każde zamówienie.

**LOY-02** Punkty można wymieniać na rabaty przy kolejnych zamówieniach.

**LOY-03** Klient widzi saldo punktów w sekcji "Program lojalnościowy".


---

## 6. Reguły biznesowe

| ID    | Reguła                                                    |
| ----- | --------------------------------------------------------- |
| BR-01 | Max 5 różnych produktów w koszyku dla konta standardowego |
| BR-02 | Zamówienie wymaga potwierdzonego adresu e-mail            |
| BR-03 | Sesja płatności wygasa po 15 minutach                     |
| BR-04 | Po potwierdzeniu zamówienia adres dostawy jest niezmienny |
| BR-05 | Po 5 nieudanych logowaniach konto blokowane na 15 minut   |
| BR-06 | Link resetowania hasła ważny 1 godzinę                    |
| BR-07 | Sesja użytkownika wygasa po 30 minutach bezczynności      |
| BR-08 | Max 3 próby płatności bez powrotu do koszyka              |
| BR-09 | Kod pocztowy w formacie XX-XXX (Polska)                   |
| BR-10 | Hasło: min. 8 znaków, min. 1 cyfra, min. 1 znak specjalny |

---

## 7. Wymagania niefunkcjonalne

### Wydajność

- Czas ładowania strony produktu: < 2 s przy połączeniu 10 Mbps
- Czas odpowiedzi wyszukiwarki: < 1 s

### Dostępność systemu

- Dostępność: 99,5% (SLA)
- Okno serwisowe: niedziela 2:00–4:00

### Bezpieczeństwo

- Komunikacja wyłącznie przez HTTPS (TLS 1.2+)
- Dane kart płatniczych nie są przechowywane lokalnie
- Hasła przechowywane jako hash (bcrypt min. 12 rund)
- Ochrona przed: CSRF, XSS, SQL Injection

### Responsywność

- Pełna funkcjonalność na: desktop (≥1024px), tablet (768–1023px), mobile (320–767px)
- Obsługiwane przeglądarki: Chrome, Firefox, Safari, Edge (wersje z ostatnich 2 lat)

---

## 8. Wymagania dostępności (WCAG)

Aplikacja musi spełniać **WCAG 2.1 poziom AA** dla wszystkich ekranów publicznych i konta użytkownika.

### Kluczowe kryteria

- Wszystkie elementy interaktywne dostępne z klawiatury (Tab, Enter, Escape, strzałki)
- Logiczna i przewidywalna kolejność fokusu
- Wszystkie pola formularzy mają widoczne etykiety powiązane atrybutem `for`/`aria-label`
- Kontrast tekstu: min. 4.5:1 (normalny), 3:1 (duży)
- Obrazy produktów mają tekst alternatywny opisujący zawartość
- Komunikaty błędów nie opierają się wyłącznie na kolorze
- Aplikacja działa przy powiększeniu do 200% bez utraty funkcjonalności
- Formularz płatności kompatybilny z czytnikami ekranu

### Ekran specjalny — celowe błędy a11y (do ćwiczeń)

Na potrzeby warsztatu przygotowany zostanie wariant formularza dostawy (Checkout krok 1) z **celowo wprowadzonymi problemami**:

- brak etykiety dla pola "Kod pocztowy"
- błędna kolejność fokusu (pole "Telefon" przed "Miasto")
- kontrast przycisku CTA poniżej 3:1
- brak tekstu alternatywnego dla ikony informacyjnej
- element "Metoda dostawy" niedostępny z klawiatury

---

## 9. Inwentarz ekranów

### Ekrany publiczne

| ID   | Ekran                | Opis                                        |
| ---- | -------------------- | ------------------------------------------- |
| S-01 | Strona główna        | Baner, polecane produkty, nawigacja główna  |
| S-02 | Lista produktów      | Filtry, siatka produktów, paginacja         |
| S-03 | Strona produktu      | Galeria, opis, cena, warianty, CTA          |
| S-04 | Logowanie            | Formularz, linki: rejestracja / reset hasła |
| S-05 | Rejestracja          | Formularz wielopolowy z walidacją inline    |
| S-06 | Reset hasła — krok 1 | Pole e-mail + komunikat o wysłaniu linku    |
| S-07 | Reset hasła — krok 2 | Formularz nowego hasła (z linku e-mail)     |

### Koszyk i checkout

| ID   | Ekran                           | Opis                                                        |
| ---- | ------------------------------- | ----------------------------------------------------------- |
| S-08 | Koszyk                          | Lista pozycji, edycja ilości, kod rabatowy, CTA do checkout |
| S-09 | Checkout krok 1 — Dostawa       | Formularz adresu, wybór metody dostawy                      |
| S-10 | Checkout krok 2 — Płatność      | Wybór metody, formularz karty / BLIK, timer                 |
| S-11 | Checkout krok 3 — Potwierdzenie | Podsumowanie zamówienia, CTA "Złóż zamówienie"              |
| S-12 | Potwierdzenie zamówienia        | Numer zamówienia, info o e-mailu, link do historii          |
| S-13 | Błąd płatności                  | Komunikat błędu, opcja ponowienia, link do koszyka          |

### Konto użytkownika

| ID   | Ekran                              | Opis                                              |
| ---- | ---------------------------------- | ------------------------------------------------- |
| S-14 | Moje konto — Profil                | Dane osobowe, edycja, zmiana hasła                |
| S-15 | Moje konto — Historia zamówień     | Lista zamówień z statusami                        |
| S-16 | Moje konto — Szczegół zamówienia   | Pełne dane zamówienia, historia statusów          |
| S-17 | Moje konto — Program lojalnościowy | Saldo punktów, historia, regulamin (niekompletny) |

### Ekrany specjalne (do ćwiczeń)

| ID   | Ekran                                       | Cel                                                   |
| ---- | ------------------------------------------- | ----------------------------------------------------- |
| S-18 | Formularz dostawy — wersja z błędami a11y   | Ćwiczenie WCAG: identyfikacja problemów accessibility |
| S-19 | Koszyk / produkt — widok mobile z błędem UX | Ćwiczenie bug reporting i analiza UX na mobile        |

---

## 10. Stany systemu i obsługa błędów

| Stan                                        | Trigger              | Zachowanie systemu                                                  |
| ------------------------------------------- | -------------------- | ------------------------------------------------------------------- |
| Produkt niedostępny                         | stock = 0            | Przycisk "Dodaj do koszyka" nieaktywny, info "Chwilowo niedostępny" |
| Produkt w koszyku — zmieniła się dostępność | Przed checkout       | Alert z listą niedostępnych pozycji, blokada przejścia do checkout  |
| Timeout płatności                           | 15 min na kroku 2    | Komunikat + przekierowanie do koszyka (dane zachowane)              |
| Błąd płatności                              | Odmowa bramki        | Komunikat z przyczyną, opcja ponowienia (max 3x)                    |
| Timeout sesji                               | 30 min bezczynności  | Ostrzeżenie 5 min przed + przekierowanie do logowania               |
| Błąd serwera (500)                          | Awaria backendu      | Strona błędu z komunikatem i linkiem do strony głównej              |
| Konto zablokowane                           | 5 nieudanych logowań | Komunikat z informacją o blokadzie i czasie odblokowania            |

---

## 11. Dane i prywatność

- Aplikacja gromadzi dane osobowe (imię, nazwisko, e-mail, adres, telefon) — wymaga polityki prywatności i zgody RODO.
- Dane kart płatniczych nie są przechowywane — obsługa przez zewnętrzną bramkę.
- Do celów warsztatu wszelkie dane osobowe w materiałach są **fikcyjne lub zanonimizowane**.
- Uczestnicy ćwiczą anonimizację na przykładowym dokumencie zawierającym: imię i nazwisko, PESEL, adres, numer sprawy, e-mail.

---

## 12. Założenia i ograniczenia

### Założenia

- Aplikacja działa w Polsce; waluta: PLN; język: polski.
- Zewnętrzna bramka płatności jest dostępna i działa (mock na potrzeby warsztatu).
- E-maile transakcyjne są symulowane (nie wysyłane realnie podczas warsztatu).
- Prototyp / zestaw ekranów wystarczy do ćwiczeń eksploracyjnych — działająca aplikacja nie jest wymagana.

### Ograniczenia

- Brak wsparcia dla Internet Explorer.
- Brak integracji z systemami zewnętrznymi (ERP, magazyn, CRM).
- Program lojalnościowy celowo niekompletny — nie należy uzupełniać specyfikacji przed ćwiczeniami.
