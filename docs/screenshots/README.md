# ShopEasy — Mapa ekranów i flow (wszystkie slice'y PRD)

**Aplikacja:** http://localhost:3000  
**Konto testowe:** `test@shopeasy.pl` / `Test1234!`  
**Screenshoty:** katalog `./`

---

## Diagram przepływu

```
[/] Homepage
 └─ [/products] Lista produktów
     ├─ ?category=elektronika   →  03-s1-products-filter-elektronika.png
     ├─ ?q=słuchawki            →  04-s1-products-search.png
     └─ [/products/:slug]       →  05-s1-product-detail.png  /  06-s1-product-unavailable.png
         └─ "Dodaj do koszyka"
             └─ [/cart]         →  12/13-s3-cart*.png
                 └─ "Przejdź do kasy"
                     └─ (AUTH GUARD → /login?next=/checkout/delivery)
                         └─ [/checkout/delivery]   →  14/15-s4-checkout-delivery*.png
                             └─ [/checkout/payment] →  16/17-s4-checkout-payment*.png  (⏱ 15 min)
                                 └─ [/checkout/success?orderId=...] →  18-s4-checkout-success.png
                                     └─ [/account/orders/:id]       →  21-s5-account-order-detail.png

Auth flow:
[/register]            →  07/08-s2-register*.png
[/login]               →  09-s2-login.png
[/reset-password]      →  10-s2-reset-password.png
[/debug/emails]        →  11-s2-debug-emails.png
Proxy redirect example →  25-s2-auth-guard-redirect.png

Account (wymaga sesji):
[/account/profile]     →  19-s5-account-profile.png
[/account/orders]      →  20-s5-account-orders.png
[/account/loyalty]     →  22-s5-account-loyalty.png (stub LOY-01–03)

Specjalne:
[/delivery-broken]     →  23/24-s6-delivery-broken*.png  (5 celowych błędów WCAG)
```

---

## S1 — Katalog produktów

### 01 — Strona główna

![01-s1-homepage](./01-s1-homepage.png)

| | |
|---|---|
| **URL** | `/` |
| **PRD** | KAT-01 — baner + polecane (max 8) |
| **Wymagania** | Hero, 8 produktów polecanych, CTA: „Przeglądaj produkty" / „Zarejestruj się" |

---

### 02 — Lista produktów

![02-s1-products-list](./02-s1-products-list.png)

| | |
|---|---|
| **URL** | `/products` |
| **PRD** | KAT-02 — filtry, sortowanie, paginacja |
| **Wymagania** | Siatka produktów, FilterBar, licznik „Znaleziono X produktów" |

---

### 03 — Lista filtrowana: Elektronika, cena rosnąco

![03-s1-products-filter-elektronika](./03-s1-products-filter-elektronika.png)

| | |
|---|---|
| **URL** | `/products?category=elektronika&sort=price_asc` |
| **PRD** | KAT-02 — filtrowanie po kategorii + sortowanie |
| **Wymagania** | 4 produkty elektroniki, posortowane od najtańszego |

---

### 04 — Wyszukiwanie pełnotekstowe

![04-s1-products-search](./04-s1-products-search.png)

| | |
|---|---|
| **URL** | `/products?q=słuchawki` |
| **PRD** | KAT-03 — wyszukiwarka (min. 2 znaki) |
| **Wymagania** | 1 wynik: „Słuchawki bezprzewodowe SoundMax X3" |

---

### 05 — Strona produktu (dostępny)

![05-s1-product-detail](./05-s1-product-detail.png)

| | |
|---|---|
| **URL** | `/products/sluchawki-soundmax-x3` |
| **PRD** | KAT-04 — zdjęcie, opis, cena, dostępność, CTA |
| **Wymagania** | Breadcrumb, galeria, cena 299,99 zł, przycisk „Dodaj do koszyka" aktywny |

---

### 06 — Strona produktu (niedostępny, stock=0)

![06-s1-product-unavailable](./06-s1-product-unavailable.png)

| | |
|---|---|
| **URL** | `/products/sneakersy-urbanrun-pro` |
| **PRD** | KAT-05 — stock=0 → przycisk nieaktywny |
| **Wymagania** | „Niedostępny w magazynie", przycisk wyłączony |

---

## S2 — Autoryzacja

### 07 — Rejestracja (pusty formularz)

![07-s2-register](./07-s2-register.png)

| | |
|---|---|
| **URL** | `/register` |
| **PRD** | REG-01, REG-02 |
| **Wymagania** | Pola: imię i nazwisko, e-mail, hasło, potwierdzenie hasła |

---

### 08 — Rejestracja — błędy walidacji

![08-s2-register-validation](./08-s2-register-validation.png)

| | |
|---|---|
| **URL** | `/register` (po błędnym submit) |
| **PRD** | REG-02 — walidacja inline |
| **Wymagania** | Czerwone komunikaty przy polach: format e-mail, zbyt krótkie hasło, brak znaku specjalnego |

---

### 09 — Logowanie

![09-s2-login](./09-s2-login.png)

| | |
|---|---|
| **URL** | `/login` |
| **PRD** | REG-04, REG-05 |
| **Wymagania** | Pola e-mail i hasło, link do rejestracji i resetu hasła |
| **Test edge case** | 5 złych prób → komunikat lockout 15 min (BR-05) |

---

### 10 — Reset hasła — krok 1

![10-s2-reset-password](./10-s2-reset-password.png)

| | |
|---|---|
| **URL** | `/reset-password` |
| **PRD** | REG-06 — link resetujący ważny 1h (BR-06) |
| **Wymagania** | Pole e-mail, przycisk wysyłki, komunikat o wysłaniu (bez potwierdzenia czy konto istnieje) |

---

### 11 — Debug: skrzynka e-mail

![11-s2-debug-emails](./11-s2-debug-emails.png)

| | |
|---|---|
| **URL** | `/debug/emails` |
| **PRD** | REG-03 (e-mail weryfikacyjny), CHK-10 (e-mail potwierdzający zamówienie) |
| **Wymagania** | Lista mock e-maili: weryfikacyjny, potwierdzenie zamówienia; tylko w NODE_ENV=development |

---

### 25 — Auth guard: przekierowanie do logowania

![25-s2-auth-guard-redirect](./25-s2-auth-guard-redirect.png)

| | |
|---|---|
| **URL** | `/login?next=%2Fcheckout%2Fdelivery` (redirect z `/checkout/delivery`) |
| **PRD** | proxy.ts — ochrona `/checkout/*` i `/account/*` |
| **Wymagania** | Automatyczny redirect do `/login?next=<ścieżka>` dla niezalogowanych |

---

## S3 — Koszyk

### 12 — Koszyk pusty

![12-s3-cart-empty](./12-s3-cart-empty.png)

| | |
|---|---|
| **URL** | `/cart` |
| **PRD** | KOS-03 — stany koszyka |
| **Wymagania** | Komunikat „Twój koszyk jest pusty", link do sklepu |

---

### 13 — Koszyk z produktami

![13-s3-cart-items](./13-s3-cart-items.png)

| | |
|---|---|
| **URL** | `/cart` |
| **PRD** | KOS-01, KOS-03, KOS-04 |
| **Wymagania** | Lista pozycji z ilością/ceną, przyciski ±1, „Usuń", panel podsumowania, „Przejdź do kasy" |
| **Test edge case** | Dodanie 6. produktu → komunikat BR-01 (max 5 różnych) |

---

## S4 — Checkout

### 14 — Checkout krok 1: Dostawa (pusty)

![14-s4-checkout-delivery](./14-s4-checkout-delivery.png)

| | |
|---|---|
| **URL** | `/checkout/delivery` |
| **PRD** | CHK-01, CHK-03, CHK-04 |
| **Wymagania** | Formularz adresu (6 pól), wybór metody dostawy (Kurier/Paczkomat z cenami), podgląd koszyka |

---

### 15 — Checkout krok 1: Dostawa (wypełniony)

![15-s4-checkout-delivery-filled](./15-s4-checkout-delivery-filled.png)

| | |
|---|---|
| **URL** | `/checkout/delivery` |
| **PRD** | CHK-03 — walidacja przed przejściem do kroku 2 |
| **Wymagania** | Wszystkie pola wypełnione, koszt dostawy zsumowany w panelu |

---

### 16 — Checkout krok 2: Płatność kartą

![16-s4-checkout-payment-card](./16-s4-checkout-payment-card.png)

| | |
|---|---|
| **URL** | `/checkout/payment` |
| **PRD** | CHK-05, CHK-07 — timer 15 min |
| **Wymagania** | Odliczanie „⏱ Czas na płatność: MM:SS", zakładka Karta, pola: imię, nr karty, data, CVV |

---

### 17 — Checkout krok 2: Płatność BLIK

![17-s4-checkout-payment-blik](./17-s4-checkout-payment-blik.png)

| | |
|---|---|
| **URL** | `/checkout/payment` |
| **PRD** | CHK-05 — BLIK jako druga metoda |
| **Wymagania** | Zakładka BLIK aktywna, pole 6-cyfrowego kodu |

---

### 18 — Potwierdzenie zamówienia

![18-s4-checkout-success](./18-s4-checkout-success.png)

| | |
|---|---|
| **URL** | `/checkout/success?orderId=...` |
| **PRD** | CHK-10 — numer zamówienia, e-mail, link do historii |
| **Wymagania** | „✅ Zamówienie złożone!", numer, lista pozycji, koszt dostawy, suma, linki: Sklep / Moje zamówienia |

---

## S5 — Konto użytkownika

### 19 — Profil

![19-s5-account-profile](./19-s5-account-profile.png)

| | |
|---|---|
| **URL** | `/account/profile` |
| **PRD** | USR-01, USR-02 |
| **Wymagania** | Sidebar nav (Profil / Historia / Lojalnościowy), dane: imię, e-mail, ID konta |

---

### 20 — Historia zamówień

![20-s5-account-orders](./20-s5-account-orders.png)

| | |
|---|---|
| **URL** | `/account/orders` |
| **PRD** | USR-03 — lista z numerem, datą, statusem, kwotą |
| **Wymagania** | Widoczne złożone zamówienie z statusem „Przyjęte", link do szczegółów |

---

### 21 — Szczegół zamówienia

![21-s5-account-order-detail](./21-s5-account-order-detail.png)

| | |
|---|---|
| **URL** | `/account/orders/:id` |
| **PRD** | USR-04 — pozycje, adres, metoda płatności, status |
| **Wymagania** | Pełne dane: pozycje z ilościami, cena dostawy, razem, status, data |

---

### 22 — Program lojalnościowy (stub)

![22-s5-account-loyalty](./22-s5-account-loyalty.png)

| | |
|---|---|
| **URL** | `/account/loyalty` |
| **PRD** | LOY-01–03 — **celowo niekompletny** (materiał warsztatowy) |
| **Wymagania (stub)** | „⚠️ Funkcja w przygotowaniu", saldo punktów niedostępne |
| **Luki do znalezienia** | Brak przelicznika, brak zasad wygasania, brak progów, brak regulaminu |

---

## S6 — Ekrany specjalne (ćwiczenia accessibility)

### 23 — Formularz dostawy z błędami WCAG

![23-s6-delivery-broken](./23-s6-delivery-broken.png)

| | |
|---|---|
| **URL** | `/delivery-broken` |
| **PRD** | Sekcja 8 — WCAG 2.1 AA — ekran specjalny do ćwiczeń |
| **Baner** | „🔍 Wersja do ćwiczeń accessibility" |

**5 celowych naruszeń WCAG:**

| # | Pole | Naruszenie | Kryterium WCAG 2.1 AA |
|---|---|---|---|
| 1 | Kod pocztowy | `<span>` zamiast `<label>` — brak etykiety programowej | 1.3.1 Info and Relationships, 4.1.2 Name, Role, Value |
| 2 | Miasto / Telefon | DOM: Telefon przed Miastem; CSS `order` odwraca wizualnie | 1.3.2 Meaningful Sequence, 2.4.3 Focus Order |
| 3 | Przycisk CTA | Kontrast `#a0a0a0` na `#e0e0e0` ≈ **1.5:1** (wymaga min. 4.5:1) | 1.4.3 Contrast (Minimum) |
| 4 | Ikona informacyjna | `alt=""` na obrazku niosącym informację o darmowej dostawie | 1.1.1 Non-text Content |
| 5 | Metoda dostawy | `<div onClick>` bez `role="radio"`, bez `aria-checked`, bez `onKeyDown` | 2.1.1 Keyboard, 4.1.2 Name, Role, Value |

---

### 24 — Formularz broken — po próbie submit

![24-s6-delivery-broken-errors](./24-s6-delivery-broken-errors.png)

| | |
|---|---|
| **URL** | `/delivery-broken` (po kliknięciu „Przejdź do płatności") |
| **PRD** | Ćwiczenie: identyfikacja problemów a11y w praktyce |
| **Wymagania** | Żadna weryfikacja nie działa poprawnie — formularz jest przykładem złej praktyki |

---

## Mapa: PRD ID → screenshot

| PRD ID | Opis | Screenshot |
|--------|------|------------|
| KAT-01 | Strona główna — polecane | [01-s1-homepage.png](./01-s1-homepage.png) |
| KAT-02 | Lista produktów — filtry/sort | [02](./02-s1-products-list.png), [03](./03-s1-products-filter-elektronika.png) |
| KAT-03 | Wyszukiwarka pełnotekstowa | [04-s1-products-search.png](./04-s1-products-search.png) |
| KAT-04 | Strona produktu | [05-s1-product-detail.png](./05-s1-product-detail.png) |
| KAT-05 | Produkt niedostępny (stock=0) | [06-s1-product-unavailable.png](./06-s1-product-unavailable.png) |
| REG-01/02 | Rejestracja + walidacja | [07](./07-s2-register.png), [08](./08-s2-register-validation.png) |
| REG-03/06 | E-mail weryfikacyjny / reset | [11-s2-debug-emails.png](./11-s2-debug-emails.png) |
| REG-04/05 | Logowanie + lockout | [09-s2-login.png](./09-s2-login.png) |
| REG-06 | Reset hasła | [10-s2-reset-password.png](./10-s2-reset-password.png) |
| KOS-01/03 | Koszyk — stany | [12](./12-s3-cart-empty.png), [13](./13-s3-cart-items.png) |
| BR-01 | Max 5 produktów w koszyku | [13-s3-cart-items.png](./13-s3-cart-items.png) _(test: dodaj 6.)_ |
| CHK-01/03/04 | Checkout — dostawa | [14](./14-s4-checkout-delivery.png), [15](./15-s4-checkout-delivery-filled.png) |
| CHK-05 | Płatność (karta + BLIK) | [16](./16-s4-checkout-payment-card.png), [17](./17-s4-checkout-payment-blik.png) |
| CHK-07/BR-03 | Timer płatności 15 min | [16-s4-checkout-payment-card.png](./16-s4-checkout-payment-card.png) |
| CHK-10 | Potwierdzenie zamówienia | [18-s4-checkout-success.png](./18-s4-checkout-success.png) |
| USR-01/02 | Profil konta | [19-s5-account-profile.png](./19-s5-account-profile.png) |
| USR-03/04 | Historia i szczegół zamówień | [20](./20-s5-account-orders.png), [21](./21-s5-account-order-detail.png) |
| LOY-01–03 | Program lojalnościowy (stub) | [22-s5-account-loyalty.png](./22-s5-account-loyalty.png) |
| WCAG-S18 | Formularz z błędami a11y | [23](./23-s6-delivery-broken.png), [24](./24-s6-delivery-broken-errors.png) |
| proxy.ts | Auth guard redirect | [25-s2-auth-guard-redirect.png](./25-s2-auth-guard-redirect.png) |
