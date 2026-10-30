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

- Rola: manualny QA. Bez kodu i automatyzacji testów. Przeglądarka Playwright służy do obserwacji ekranu; kroki w aplikacji wykonuje tester, a agent tylko za jego zgodą (jedna zgoda = jedna akcja).
- Nie zgaduj. Brakującą wartość zapytaj użytkownika lub wpisz `TBD`.
- Zapis tylko w `docs/exploratory-sessions/`.
- Nie czytaj `docs/ai-sessions/*` ani `zgloszenia/*`, chyba że użytkownik je wskaże.
- Hasła i sekrety nigdy nie trafiają do karty. Konto zapisz jako nazwę lub rolę.
- Rozmawiaj i pisz kartę po polsku.
- Wszystkie pytania zadawaj narzędziem pytań (`#tool:vscode_askQuestions`), każde z domyślną odpowiedzią.

## Czas

Bieżąca godzina (HH:MM) pochodzi z jednego ze źródeł, w tej kolejności:

1. Przeglądarka Playwright (tryb Playwright, otwarta strona): pole `time` ze snippetu z sekcji "Tryb Playwright". Przeglądarka działa na tej samej maszynie, więc zegar jest ten sam co w terminalu (sprawdzone: oba zwróciły 14:31).
2. Terminal (Git Bash lub cmd):

```
powershell -NoProfile -Command "Get-Date -Format HH:mm"
```

3. Pytanie do testera.

- Użyj wyniku jako godziny startu, wpisu i końca.
- Jeśli źródło zawiedzie lub zwróci coś innego niż HH:MM, przejdź do następnego.
- Komenda terminala nie jest jeszcze sprawdzona w obu powłokach. Potwierdź ją przy pierwszym użyciu.

## Tryb Playwright (obserwacja ekranu)

Wybierany w kroku 1 (domyślnie). Agent czyta ekran przeglądarki Playwright zamiast pytać testera, co widzi. Tester musi pracować w oknie tej przeglądarki; inna przeglądarka jest dla agenta niewidoczna. W trybie ręcznym tester sam opisuje wynik, a agent niczego nie czyta z przeglądarki.

Odczyt, bez pytania o zgodę:

- `browser_tabs`: URL i tytuł aktywnej karty.
- `browser_evaluate` ze snippetem poniżej: godzina, kliknięcia testera od ostatniego odczytu, URL.
- `browser_snapshot`: treść i elementy interaktywne ekranu. `browser_take_screenshot` tylko gdy snapshot nie wystarcza (układ, grafika).
- `browser_console_messages`, `browser_network_requests`: gdy ekran wygląda błędnie albo krok wywołał żądanie; interesują błędy i odpowiedzi 4xx/5xx.
- `browser_wait_for`: oczekiwanie na zmianę ekranu po kroku testera.

Akcje, tylko za zgodą: `browser_navigate`, `browser_navigate_back`, `browser_click`, `browser_type`, `browser_fill_form`, `browser_select_option`, `browser_press_key`, `browser_hover`. Pytanie nazywa dokładną akcję i element; domyślna odpowiedź: tester wykonuje sam. Wiersz w karcie oznacz "(wykonał agent za zgodą)". Haseł nie wpisuj.

Snippet odczytu (`browser_evaluate`), uruchamiany przy każdym odczycie. Za pierwszym razem instaluje logger kliknięć, potem zwraca i czyści zapisane kliknięcia:

```js
() => {
  if (!window.__qaClickLogOn) {
    window.__qaClickLogOn = true;
    document.addEventListener('click', (e) => {
      const el = e.target.closest('a,button,input,select,textarea,label,[role]') || e.target;
      const isField = el.matches('input,textarea,select');
      const text = el.getAttribute('aria-label') || (isField ? (el.name || el.type) : el.innerText) || '';
      const log = JSON.parse(sessionStorage.getItem('__qaClickLog') || '[]');
      log.push({ t: new Date().toTimeString().slice(0, 5), url: location.pathname, tag: el.tagName.toLowerCase(), text: text.trim().slice(0, 60) });
      sessionStorage.setItem('__qaClickLog', JSON.stringify(log));
    }, true);
  }
  const clicks = JSON.parse(sessionStorage.getItem('__qaClickLog') || '[]');
  sessionStorage.removeItem('__qaClickLog');
  return { time: new Date().toTimeString().slice(0, 5), url: location.href, clicks };
}
```

Ograniczenia:

- Logger zapisuje tylko kliknięcia (znacznik, tekst lub nazwa, URL, czas), bez wartości pól. Wpisany tekst widać w snapshocie.
- Po pełnym przeładowaniu strony logger znika. Wpisy zostają w `sessionStorage`, a snippet instaluje się ponownie przy następnym odczycie. Kliknięcia między przeładowaniem a odczytem nie zostaną zapisane.
- Kliknięcia widzi tylko karta, w której zainstalowano logger.
- Log nie odróżnia kliknięć testera od kliknięć wykonanych przez agenta; te drugie agent zna z własnych zgód.

## Krok 1: Start

Jedna runda pytań:

1. Charter: użytkownik podaje własny albo wybiera z propozycji. Format: "Eksploruj [obszar] używając [zasobów/technik], aby odkryć [informacje/ryzyka]".
2. Czas planowany: domyślnie 30 min.
3. Źródło obszaru: dowolna eksploracja / PRD / makiety / zgłoszenie. Dla PRD czytaj `docs/product/product-requirements.md`, dla makiet `docs/screenshots/README.md`. Zgłoszenie wskazuje użytkownik (treścią lub ścieżką).
4. Środowisko: aplikacja, URL, wersja/build, przeglądarka lub urządzenie, konto/rola, dane testowe, data.
5. Tryb obserwacji: Playwright (domyślnie) / ręczny.

W trybie Playwright sprawdź `browser_tabs`. Jeśli nie ma otwartej strony aplikacji, zapytaj o zgodę na `browser_navigate` pod URL ze środowiska. Pierwszy odczyt snippetem instaluje logger kliknięć i daje godzinę startu. W polu przeglądarki wpisz przeglądarkę Playwright.

Następnie:

1. Ustal nr sesji: liczba istniejących kart w `docs/exploratory-sessions/` + 1, zapis `S01`, `S02`, ...
2. Utwórz kartę `docs/exploratory-sessions/<YYYY-MM-DD_HH-mm>-<slug-charteru>.exploratory-session.md`. Slug: ASCII, małe litery, myślniki, bez polskich znaków.
3. Wypełnij sekcje 1-3 szablonu. Pozostałe sekcje zostaw puste.
4. Jeśli obszar jest znany, zaproponuj 2-4 kroki startowe z uzasadnieniem. Tester wybiera albo podaje własny.

## Krok 2: Pętla kroków

Dla każdego kroku:

1. Tester wykonuje krok w aplikacji (albo za jego zgodą agent, patrz Tryb Playwright).
2. Ustal wynik. Godzinę weź z sekcji Czas. Wynik: ZGODNY / BUG (podejrzenie) / OBSERWACJA (pytanie na potem) / ZABLOKOWANIE.
   - Tryb Playwright: odczytaj ekran i przygotuj propozycję wpisu: co tester kliknął (log kliknięć), ekran i URL, widoczny efekt, błędy konsoli i sieci. Wynik proponuj tylko, gdy oczekiwany wynik pochodzi z PRD, makiet, zgłoszenia lub od testera; w przeciwnym razie zaproponuj OBSERWACJA i dopytaj. Zadaj jedną rundę pytań z propozycją jako domyślną odpowiedzią.
   - Tryb ręczny: zapytaj o wynik, jedną rundą pytań.
3. Dopisz wiersz do tabeli w sekcji 4: czas, nr kroku (K01, K02, ...), co zrobiono, wynik, notatka.
4. Wynik BUG: zapytaj o tytuł, kroki, oczekiwany i aktualny wynik, ważność. W trybie Playwright wstępnie wypełnij kroki (z logu kliknięć), URL i aktualny wynik z odczytu; tester potwierdza. Dodaj wpis w sekcji 5 z ID `BUG-S<nr>-<nn>` i wpisz ID w notatce wiersza. Dowody: w trybie Playwright wklej tekst błędów z konsoli i odpowiedzi sieci 4xx/5xx; zrzut ekranu zostaw jako "do uzupełnienia przez testera".
5. Wynik ZABLOKOWANIE: zapisz przyczynę w notatce i zapytaj, czy przejść do innego kroku.
6. Po każdym wpisie zapytaj o następny ruch: kolejny krok (propozycja), własny krok albo koniec sesji. W trybie Playwright zaproponuj 2-3 kroki na podstawie elementów widocznych w snapshocie, obszaru z charteru i kroków już zapisanych w sekcji 4 (bez powtórek); każdy z jednozdaniowym uzasadnieniem (ryzyko, reguła z PRD). Tester może też poprosić agenta o wykonanie kroku.
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
- Tryb obserwacji: Playwright / ręczny
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
