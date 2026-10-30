# Demo — Flow użytkownika (klik po kliku)

Adres aplikacji: **http://localhost:3001**  
Konto testowe: `test@shopeasy.pl` / `Test1234!`

---

## 1. Strona główna `/`

1. Otwórz `http://localhost:3001`
2. Widzisz: hero „ShopEasy", 8 polecanych produktów, przyciski nawigacyjne w headerze
3. Kliknij **„Przeglądaj produkty"** (link w hero lub „Produkty" w headerze)

---

## 2. Lista produktów `/products`

1. Widzisz: 12 produktów w siatce, pasek filtrów u góry, licznik „Znaleziono 12 produktów"
2. **Filtrowanie wg kategorii:** wybierz „Elektronika" z dropdown → odświeża się lista (4 produkty)
3. **Sortowanie:** wybierz „Cena: rosnąco" → produkty ustawiane od najtańszego
4. **Wyszukiwanie:** wpisz „słuchawki" w pole tekstowe → pojawia się 1 wynik
5. **Tylko dostępne:** zaznacz checkbox „Tylko dostępne" → produkt Sneakersy UrbanRun Pro (stock=0) znika
6. Usuń filtry (odśwież stronę lub wyczyść pola) i kliknij na **kartę produktu „Słuchawki bezprzewodowe SoundMax X3"**

---

## 3. Strona produktu `/products/sluchawki-soundmax-x3`

1. Widzisz: breadcrumb (Strona główna › Produkty › Słuchawki…), zdjęcie, nazwa, cena 299,99 zł, opis, liczba w magazynie
2. Ustaw ilość (np. 1 — domyślna)
3. Kliknij **„Dodaj do koszyka"**
   - Jeśli niezalogowany: produkt trafia do koszyka gościa (Zustand, localStorage)
   - Jeśli zalogowany: produkt trafia do koszyka w bazie danych
4. Kliknij ikonę **„🛒 Koszyk"** w headerze

---

## 4. Rejestracja `/register` _(opcjonalnie — można pominąć jeśli logujesz istniejącym kontem)_

1. Kliknij **„Zarejestruj"** w headerze lub przejdź na `/register`
2. Wypełnij formularz: imię i nazwisko, e-mail, hasło (min. 8 znaków, 1 cyfra, 1 znak specjalny), potwierdzenie hasła
3. Kliknij **„Zarejestruj się"**
4. Pojawia się komunikat: „Sprawdź skrzynkę e-mail, aby aktywować konto"
5. Otwórz `/debug/emails` (link w footerze) → kliknij link weryfikacyjny z e-maila
6. Nastąpi przekierowanie do `/login?verified=1` z banerem „Konto zostało aktywowane"

---

## 5. Logowanie `/login`

1. Przejdź na `/login` (link „Zaloguj się" w headerze)
2. Wpisz: `test@shopeasy.pl` / `Test1234!`
3. Kliknij **„Zaloguj się"**
4. Przekierowanie na stronę główną `/`
5. Header zmienia się: pojawia się „👤 Jan Testowy" i przycisk „Wyloguj"

> **Test lockouta (BR-05):** Wpisz złe hasło 5 razy z rzędu → pojawia się komunikat „Konto zablokowane na 15 minut". Odblokowanie: uruchom `npm run seed` aby zresetować bazę.

---

## 6. Koszyk `/cart`

1. Kliknij **„🛒 Koszyk"** w headerze
2. Widzisz: listę produktów z ilościami, cenami jednostkowymi i sumą cząstkową
3. **Zmień ilość:** kliknij „+" lub „−" obok produktu
4. **Usuń produkt:** kliknij **„Usuń"** obok pozycji
5. W panelu po prawej: podsumowanie (produkty, dostawa „obliczana przy kasie", łącznie)
6. Kliknij **„Przejdź do kasy"**
   - Jeśli niezalogowany: proxy.ts przekierowuje na `/login?next=/checkout/delivery`
   - Po zalogowaniu: wróć do koszyka i kliknij ponownie

---

## 7. Dostawa `/checkout/delivery`

1. Widzisz: formularz adresu (imię, nazwisko, ulica, kod pocztowy XX-XXX, miasto, telefon) + wybór metody dostawy
2. Wypełnij adres, np.:
   - Imię: `Jan`, Nazwisko: `Testowy`
   - Ulica: `ul. Kwiatowa 12/5`
   - Kod: `00-001`, Miasto: `Warszawa`
   - Telefon: `+48 600 000 000`
3. Wybierz metodę dostawy:
   - **Kurier DHL** — 14,99 zł
   - **Paczkomat InPost** — 9,99 zł
4. Po prawej: podgląd koszyka z aktualizowaną sumą (produkty + dostawa)
5. Kliknij **„Przejdź do płatności"**

> Walidacja: pusty formularz lub błędny kod pocztowy (np. `1234`) → red inline errors.

---

## 8. Płatność `/checkout/payment`

1. Widzisz: **odliczanie „⏱ Czas na płatność: 14:59"** (CHK-07 — 15 minut)
2. Dwie zakładki metody płatności: **Karta płatnicza** | **BLIK**

### Karta płatnicza (domyślna zakładka):
3. Wypełnij:
   - Imię i nazwisko: `Jan Testowy`
   - Numer karty: `1234567890123456`
   - Data ważności: `12/27`
   - CVV: `123`
4. Kliknij **„Zapłać"**

### BLIK (alternatywna):
3. Kliknij zakładkę **„BLIK"**
4. Wpisz 6-cyfrowy kod: `123456`
5. Kliknij **„Zapłać"**

> **Test timeout płatności:** Zmień `PAYMENT_MOCK_MODE=always_timeout` w `.env.local` i uruchom ponownie — płatność zakończy się błędem.  
> **Test odmowy:** `PAYMENT_MOCK_MODE=always_fail` → pojawia się komunikat „Błąd płatności".

---

## 9. Sukces `/checkout/success?orderId=...`

1. Widzisz: „✅ Zamówienie złożone!"
2. Numer zamówienia (ostatnie 8 znaków ID), lista pozycji, koszt dostawy, łączna kwota
3. Kliknij **„Wróć do sklepu"** → `/products`
4. Kliknij **„Moje zamówienia"** → `/account/orders` _(S5 — stub)_

---

## 10. Debug — skrzynka e-mail `/debug/emails`

1. Kliknij link **„📬 Debug: Skrzynka e-mail"** w footerze
2. Widzisz wszystkie e-maile wysłane przez mock (weryfikacja, reset hasła, potwierdzenie zamówienia)
3. Dostępne tylko w `NODE_ENV=development`

---

## Pełna ścieżka happy path (skrót)

```
/ → /products → /products/[slug]
  → (addToCart) → /cart
  → /login → /checkout/delivery
  → /checkout/payment → /checkout/success
```

## Kluczowe scenariusze testowe

| ID | Scenariusz | Gdzie |
|----|-----------|-------|
| BR-01 | Max 5 różnych produktów w koszyku | `/cart` — 6. produkt → błąd |
| BR-05 | Lockout po 5 złych hasłach (15 min) | `/login` |
| BR-06 | Token reset hasła ważny 1h | `/debug/emails` → `/reset-password/confirm?token=...` |
| BR-09 | Kod pocztowy format XX-XXX | `/checkout/delivery` — walidacja |
| CHK-07 | Odliczanie 15 min na płatność | `/checkout/payment` — timer |
| KAT-05 | Produkt niedostępny (stock=0) | `sneakersy-urbanrun-pro` — brak przycisku „Dodaj" |
