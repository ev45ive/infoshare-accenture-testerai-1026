---
name: user-story-writer
description: "Use when creating, editing or reviewing a user story and its manual-QA test artifacts (test scenarios, test cases, test data). Interactive, iterative workflow: initial sketch, questions with default answers, each iteration saved to docs/ immediately, acceptance. Triggers: user story, historyjka użytkownika, kryteria akceptacji, acceptance criteria, scenariusz testowy, test scenario, przypadek testowy, test case, dane testowe, test data, przegląd user story, review, ShopEasy."
argument-hint: "Nazwa, ID lub ścieżka user story (istniejącego lub nowego)"
disable-model-invocation: false
user-invocable: true
---

# User Story Writer

Koordynuje tworzenie, zmianę i przegląd user story oraz jego artefaktów testowych (testy manualne). Procedury, checklisty, szablony i przykłady ładuj dopiero wtedy, gdy są potrzebne (macierz w kroku 2).

## Wejście

Nazwa, ID lub ścieżka user story:
- ścieżka: przeczytaj plik
- ID (np. `US-REG-01`): wyszukaj `docs/user-story/<ID>-*`
- nazwa: wyszukaj po nazwie pliku i tytule w `docs/user-story/`; przy kilku trafieniach zapytaj, które
- brak trafienia: nowe user story
- brak wejścia: zapytaj użytkownika

## Model artefaktów

```
User Story (US)
└─ Test Scenario (TS)   1..n na story
   ├─ Test Cases (TC)   jeden plik z grupą przypadków na scenariusz
   └─ Test Data (TD)    jeden plik z grupą zestawów na scenariusz
```

| Typ | Folder | Plik | ID domyślne |
|---|---|---|---|
| user-story | `docs/user-story/` | `<US-ID>-<short-name>.user-story.md` | `US-<MODUŁ>-<nr>` |
| test-scenario | `docs/test-scenario/` | `<TS-ID>-<short-name>.test-scenario.md` | `TS-<MODUŁ>-<nr>` |
| test-case | `docs/test-case/` | `<TS-ID>-<short-name>.test-case.md` | `TC-<MODUŁ>-<nnn>` (elementy w pliku) |
| test-data | `docs/test-data/` | `<TS-ID>-<short-name>.test-data.md` | `TD-<MODUŁ>-<nn>` (zestawy w pliku) |

- `short-name`: kebab-case, po angielsku.
- `MODUŁ`: prefiks wymagań z PRD (REG, KAT, KOS, ...).
- Kolejność zależności: story, scenario, potem test-case i test-data. Nie twórz artefaktu podrzędnego bez nadrzędnego; zaproponuj najpierw nadrzędny.

## Zasady twarde

- Rola: manualny QA. Bez kodu i automatyzacji.
- Nie zgaduj, nie halucynuj, nie zakładaj. Brakująca wartość: wpisz `TBD`, dodaj wpis w `Open questions` i zapytaj użytkownika.
- Każde twierdzenie o zachowaniu aplikacji ma źródło: ID wymagania PRD, numer screenshotu lub wskazanie użytkownika. Rozbieżności między źródłami zapisz w `Open questions`.
- Artefakty pisz po angielsku (zmienia użytkownik w kroku 1). Rozmawiaj w języku użytkownika.
- Nie czytaj `docs/ai-sessions/*` ani `zgloszenia/*`, chyba że użytkownik wskaże je jawnie.
- Źródła do zaproponowania (ładuj tylko wybrane):
  - PRD: `docs/product/product-requirements.md` (V1.0 Draft jest aktualna)
  - mapa ekranów: `docs/screenshots/README.md` i pliki `docs/screenshots/*.png`
  - konta testowe: `docs/product/konta-testowe.md`
  - istniejące artefakty w `docs/`
  - treść podana przez użytkownika

## Krok 1: Intake

1. Rozpoznaj wejście.
2. Ustal rodzaj pracy (`create`, `edit`, `review`) i typ artefaktu (`user-story`, `test-scenario`, `test-case`, `test-data` albo cały łańcuch). Jeśli nie wynika z prośby, zapytaj.
3. Dla nowego user story zadaj jedną rundę pytań (`vscode_askQuestions`, każde z domyślną odpowiedzią):
   - ID story: propozycja `US-<MODUŁ>-<nr>`; moduł ustal z PRD, nr jako pierwszy wolny po przeszukaniu `docs/user-story/`
   - formaty ID pochodnych (TS, TC, TD) wg tabeli
   - język artefaktów (domyślnie angielski)
4. Zaplanuj kroki w `manage_todo_list` (jeden wpis = jedna iteracja lub sekcja).

## Krok 2: Załaduj zasoby

Ładuj tylko to, co wynika z rodzaju pracy i typu artefaktu `<T>` (`user-story`, `test-scenario`, `test-case`, `test-data`). Przy pracy na całym łańcuchu ładuj zasoby kolejnego typu dopiero, gdy do niego przejdziesz.

| Rodzaj pracy | Procedura | Dla typu `<T>` |
|---|---|---|
| create | [procedure-create-edit](./references/procedure-create-edit.md) | checklista, szablon, przykład |
| edit | [procedure-create-edit](./references/procedure-create-edit.md) | checklista + aktualny plik; przykład tylko gdy potrzebny |
| review | [procedure-review](./references/procedure-review.md) | checklista + artefakt i jego rodzic |

Zasoby typu:

| `<T>` | Checklista | Szablon | Przykład |
|---|---|---|---|
| user-story | [checklist](./references/checklists/user-story.md) | [template](./assets/templates/user-story.md) | [example](./assets/examples/user-story.md) |
| test-scenario | [checklist](./references/checklists/test-scenario.md) | [template](./assets/templates/test-scenario.md) | [example](./assets/examples/test-scenario.md) |
| test-case | [checklist](./references/checklists/test-case.md) | [template](./assets/templates/test-case.md) | [example](./assets/examples/test-case.md) |
| test-data | [checklist](./references/checklists/test-data.md) | [template](./assets/templates/test-data.md) | [example](./assets/examples/test-data.md) |

Przykłady dotyczą rejestracji (REG-01, REG-02) i służą tylko jako wzorzec formy. Nie kopiuj z nich wartości do pracy nad innym modułem.

## Krok 3: Wykonaj procedurę

Postępuj według załadowanej procedury. Zmiany zapisuj do pliku artefaktu od razu (po potwierdzeniu ścieżki). W czacie podsumowuj zmianę i podawaj link do pliku; nie wklejaj treści artefaktu.

## Krok 4: Zakończenie

Podaj: ścieżki utworzonych lub zmienionych plików, listę pozostałych `TBD` i otwartych pytań oraz propozycję kolejnego artefaktu w łańcuchu.
