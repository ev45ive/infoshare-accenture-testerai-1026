---
name: exploratory-session
description: "Use when running a manual exploratory testing session for ShopEasy: sesja eksploracyjna, charter, eksploracja, testowanie exploracyjne, karta sesji, notatki z sesji, raport z sesji, debriefing. Procedure: start (charter, czas, obszar, środowisko), session card, step loop with observations, bugs, blockers, summary."
argument-hint: "Charter lub obszar do eksploracji"
user-invocable: true
disable-model-invocation: false
---

# Exploratory Session

Procedura prowadzenia sesji eksploracyjnej (testy manualne). Prowadzi agent [Exploratory Session](../../agents/exploratory-session.agent.md); tester wykonuje kroki w aplikacji sam.

## Zasady

- Rola: manualny QA. Bez kodu, automatyzacji i sterowania przeglądarką.
- Nie zgaduj. Brakującą wartość zapytaj użytkownika lub wpisz `TBD`.
- Zapis tylko w `docs/exploratory-sessions/`.
- Nie czytaj `docs/ai-sessions/*` ani `zgloszenia/*`, chyba że użytkownik je wskaże.
- Hasła i sekrety nigdy nie trafiają do karty. Konto zapisz jako nazwę lub rolę.
- Rozmawiaj i pisz kartę po polsku.
- Wszystkie pytania zadawaj narzędziem pytań (`#tool:vscode_askQuestions`), każde z domyślną odpowiedzią.

## Czas

Bieżąca godzina (HH:MM) pochodzi z komendy w terminalu. Uruchom ją w Git Bash lub cmd:

```
powershell -NoProfile -Command "Get-Date -Format HH:mm"
```

- Użyj wyniku jako godziny startu, wpisu i końca.
- Jeśli komenda zawiedzie lub zwróci coś innego niż HH:MM, zapytaj testera o godzinę.
- Komenda nie jest jeszcze sprawdzona w obu powłokach. Potwierdź ją przy pierwszej sesji.

## Krok 1: Start

Jedna runda pytań:

1. Charter: użytkownik podaje własny albo wybiera z propozycji. Format: "Eksploruj [obszar] używając [zasobów/technik], aby odkryć [informacje/ryzyka]".
2. Czas planowany: domyślnie 30 min.
3. Źródło obszaru: dowolna eksploracja / PRD / makiety / zgłoszenie. Dla PRD czytaj `docs/product/product-requirements.md`, dla makiet `docs/screenshots/README.md`. Zgłoszenie wskazuje użytkownik (treścią lub ścieżką).
4. Środowisko: aplikacja, URL, wersja/build, przeglądarka lub urządzenie, konto/rola, dane testowe, data.

Następnie:

1. Ustal nr sesji: liczba istniejących kart w `docs/exploratory-sessions/` + 1, zapis `S01`, `S02`, ...
2. Utwórz kartę `docs/exploratory-sessions/<YYYY-MM-DD_HH-mm>-<slug-charteru>.exploratory-session.md`. Slug: ASCII, małe litery, myślniki, bez polskich znaków.
3. Wypełnij sekcje 1-3 szablonu. Pozostałe sekcje zostaw puste.
4. Jeśli obszar jest znany, zaproponuj 2-4 kroki startowe z uzasadnieniem. Tester wybiera albo podaje własny.

## Krok 2: Pętla kroków

Dla każdego kroku:

1. Tester wykonuje krok w aplikacji.
2. Zapytaj o wynik, jedną rundą pytań. Godzinę weź z sekcji Czas. Wynik: ZGODNY / BUG (podejrzenie) / OBSERWACJA (pytanie na potem) / ZABLOKOWANIE.
3. Dopisz wiersz do tabeli w sekcji 4: czas, nr kroku (K01, K02, ...), co zrobiono, wynik, notatka.
4. Wynik BUG: zapytaj o tytuł, kroki, oczekiwany i aktualny wynik, ważność. Dodaj wpis w sekcji 5 z ID `BUG-S<nr>-<nn>` i wpisz ID w notatce wiersza. Dowody zostaw jako "do uzupełnienia przez testera".
5. Wynik ZABLOKOWANIE: zapisz przyczynę w notatce i zapytaj, czy przejść do innego kroku.
6. Po każdym wpisie zapytaj o następny ruch: kolejny krok (propozycja), własny krok albo koniec sesji.
7. Po przekroczeniu czasu planowanego zapytaj: kontynuować czy zakończyć.

## Krok 3: Zakończenie

1. Pobierz godzinę końca z sekcji Czas i zapytaj o czas netto. Ustaw status ZAKOŃCZONA w sekcji 1.
2. Uzupełnij sekcję 6 (Podsumowanie) pięcioma polami: pokryte obszary, niepokryte / do zrobienia, zablokowania (setup, dane, dostęp), bugi, proponowane kolejne sesje.
3. Pokaż w czacie podsumowanie krótko i podaj ścieżkę karty. Nie wklejaj całej karty.

## Szablon karty

```markdown
# Sesja eksploracyjna: <nazwa charteru>

## 1. Metryka
- Tester:
- Data: YYYY-MM-DD
- Nr sesji: S01
- Czas planowany: 30 min
- Start: HH:MM
- Koniec: HH:MM
- Czas netto:
- Status: W TRAKCIE / ZAKOŃCZONA

## 2. Środowisko
- Aplikacja: ShopEasy (web / mobile)
- URL:
- Wersja / build:
- Przeglądarka / urządzenie:
- Konto / rola (bez haseł):
- Dane testowe:

## 3. Charter
Eksploruj [obszar] używając [zasobów/technik], aby odkryć [informacje/ryzyka].
- Źródło obszaru: dowolna eksploracja / PRD / makiety / zgłoszenie
- Referencje:
- Zakres wyłączony:

## 4. Przebieg
Wynik: ZGODNY / BUG / OBSERWACJA / ZABLOKOWANIE

| Czas | Nr kroku | Co zrobiono | Wynik | Notatka / ID bugu |
|---|---|---|---|---|

## 5. Bugi
### BUG-S01-01: <tytuł>
- Krok źródłowy:
- Środowisko:
- Kroki odtworzenia:
- Oczekiwany wynik:
- Aktualny wynik:
- Dowody: do uzupełnienia przez testera
- Ważność:

## 6. Podsumowanie
- Pokryte obszary:
- Niepokryte / do zrobienia:
- Zablokowania (setup, dane, dostęp):
- Bugi:
- Proponowane kolejne sesje:
```
