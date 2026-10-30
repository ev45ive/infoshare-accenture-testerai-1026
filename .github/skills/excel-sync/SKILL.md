---
name: excel-sync
description: "Use when syncing user-story-writer artifacts (user story, test scenario, test case, test data) between markdown in docs/ and Excel workbooks: synchronizacja z Excelem, excel sync, eksport do xlsx, import z xlsx, arkusz, szablon xlsx, pusty szablon, status synchronizacji, konflikt md/xlsx, nazwy arkuszy i kolumn. Procedure: status (dry run), conflict decisions, sync, verification, template and config changes."
argument-hint: "Typ artefaktu (user-story | test-scenario | test-case | test-data) i/lub ID, np. TS-KOS-01; domyślnie wszystkie"
user-invocable: true
disable-model-invocation: false
---

# Excel Sync

Dwukierunkowa synchronizacja artefaktów z [user-story-writer](../user-story-writer/SKILL.md) (markdown w `docs/`) z arkuszami Excel. Markdown jest zapisem źródłowym; Excel służy do przeglądu, filtrowania i edycji tabelarycznej.

## Zasoby (stała część skilla)

| Zasób | Rola |
|---|---|
| [config.json](./assets/config.json) | Nazwy skoroszytów, arkuszy i kolumn; folder docelowy `docs/excel/` |
| [assets/templates/](./assets/templates/) | Puste szablony xlsx, po jednym na typ: `user-story.xlsx`, `test-scenario.xlsx`, `test-case.xlsx`, `test-data.xlsx` |
| [excel_sync.py](./scripts/excel_sync.py) | Skrypt: `template`, `status`, `sync` |

Skoroszyty robocze: `docs/excel/<user-stories|test-scenarios|test-cases|test-data>.xlsx` (tworzone z szablonu przy pierwszej synchronizacji).

## Model

- Klucz artefaktu: `id` (user-story, test-scenario) lub `scenario` (test-case, test-data). Zmiana klucza w pliku lub arkuszu oznacza nowy artefakt.
- Arkusz główny ma jeden wiersz na plik markdown (kolumna `File` jest informacyjna). Arkusze podrzędne (kryteria AC, kroki, pytania, zestawy danych itd.) wiążą się z nim kolumną `... ID`.
- W test-data kolumny pól wejściowych (po `Used by`) są dynamiczne: dodawaj je w Excelu po prawej stronie.
- Ukryty arkusz `_sync` trzyma skrót ostatnio zsynchronizowanej treści. Nie edytuj go i nie usuwaj.
- Wyniki `status` dla klucza:

| Wynik | Znaczenie | Akcja `sync` |
|---|---|---|
| `in-sync` | brak różnic | brak |
| `push` | zmieniony markdown (lub nowy) | md -> xlsx |
| `pull` | zmieniony xlsx (lub nowy wiersz) | xlsx -> md |
| `conflict` | zmieniono obie strony | pomija; wymaga decyzji |
| `blocked` | pull zgubiłby sekcje md spoza mapowania | pomija; wymaga decyzji |
| `md-removed` / `xlsx-removed` | artefakt usunięty po jednej stronie | pomija; wymaga decyzji |

## Procedura

### 1. Wejście

1. Ustal typy i/lub ID z prośby (`--type`, `--id`). Brak wejścia: wszystkie typy.
2. Jeśli użytkownik prosi tylko o zmianę nazw arkuszy/kolumn lub pusty szablon, przejdź do kroku 7 (po przygotowaniu środowiska z kroku 2).

### 2. Środowisko (Python i openpyxl)

Sprawdź w terminalu, w kolejności: `python --version`, a gdy nie działa, `py --version` (Windows) i `python3 --version` (macOS/Linux). Używaj polecenia, które zadziałało, we wszystkich dalszych komendach (poniżej zapisane jako `python`).

**Python jest dostępny, ale brakuje openpyxl:** zapytaj o zgodę i uruchom `python -m pip install openpyxl`. Zweryfikuj: `python -c "import openpyxl; print(openpyxl.__version__)"`.

**Python nie jest dostępny** (brak polecenia, kod wyjścia 9009, albo uruchomienie otwiera Microsoft Store): poprowadź użytkownika krok po kroku. Instalacja zmienia system, więc przed każdym krokiem uzyskaj zgodę (`vscode_askQuestions`). Wykrywaj system z kontekstu środowiska.

- Windows, wariant A (preferowany, jeśli `winget --version` działa): `winget install --id Python.Python.3.12 -e`. Instalator dodaje Pythona do PATH.
- Windows, wariant B: użytkownik pobiera instalator ze strony python.org, uruchamia go sam i zaznacza **Add python.exe to PATH** na pierwszym ekranie. Nie pobieraj ani nie uruchamiaj instalatora za użytkownika.
- Windows: jeśli `python` otwiera Microsoft Store, użytkownik wyłącza aliasy w Ustawienia > Aplikacje > Zaawansowane ustawienia aplikacji > Aliasy wykonywania aplikacji (pozycje `python.exe` i `python3.exe`).
- macOS: `brew install python` (gdy jest Homebrew) albo instalator z python.org.
- Linux: pakiet systemowy (`python3`, `python3-pip`). Poleceń z `sudo` nie uruchamiaj; podaj je użytkownikowi do wykonania we własnym terminalu.

Po instalacji:

1. Poproś o zamknięcie i otwarcie terminala (najlepiej restart VS Code), bo PATH ładuje się przy starcie procesu.
2. Zweryfikuj `python --version`. Jeśli nadal brak, sprawdź PATH (Windows: `where python`; macOS/Linux: `which python3`) i pokaż użytkownikowi, którego katalogu brakuje. Dodanie do PATH: Windows > Ustawienia systemowe > Zmienne środowiskowe > `Path` użytkownika (katalog z `python.exe` i podkatalog `Scripts`); w terminalu bash dla Git Bash dopisanie do `~/.bashrc` tylko za zgodą.
3. Zainstaluj openpyxl jak wyżej.

Nie przechodź do kroku 3, dopóki `python` i `import openpyxl` nie działają. Jeśli użytkownik odmawia instalacji, zakończ i wskaż, czego brakuje.

### 3. Status (dry run)

```bash
python .github/skills/excel-sync/scripts/excel_sync.py status [--type T] [--id ID]
```

Pokaż użytkownikowi tabelę wyników. Nic nie jest zapisywane.

### 4. Decyzje

- `in-sync`, `push`, `pull`: nie pytaj, chyba że `pull` dotyczy pliku `accepted` (potwierdź przed nadpisaniem).
- `conflict`: dla każdego klucza zapytaj (`vscode_askQuestions`), która strona wygrywa: `md`, `xlsx` albo pomiń. Domyślnie: pomiń. Nie rozstrzygaj za użytkownika.
- `blocked`: wskaż sekcje md, które nie mają odpowiednika w xlsx; zapytaj, czy je zgubić (`--prefer xlsx`) czy pominąć.
- `md-removed` / `xlsx-removed`: zapytaj, czy odtworzyć artefakt (`--prefer xlsx` odtwarza md, `--prefer md` odtwarza wiersze w xlsx) czy pominąć.
- Plik xlsx otwarty w Excelu blokuje zapis. Poproś o zamknięcie przed `sync`.

### 5. Synchronizacja

```bash
python .github/skills/excel-sync/scripts/excel_sync.py sync [--type T] [--id ID] [--prefer md|xlsx]
```

- Bez `--prefer` skrypt synchronizuje tylko jednoznaczne przypadki.
- `--prefer` stosuj tylko z `--id` i po decyzji użytkownika z kroku 4.
- `pull` generuje markdown od nowa w formacie szablonu user-story-writer (zachowuje końce linii istniejącego pliku). Zagnieżdżone listy zostają spłaszczone, a wstęp sekcji `Data sets` jest odtwarzany.
- Komunikat `WARN ... does not round-trip` oznacza, że wygenerowany markdown różni się treścią od xlsx: sprawdź plik.

### 6. Weryfikacja i zakończenie

1. Uruchom `status` jeszcze raz; oczekiwane `in-sync` dla wszystkich zsynchronizowanych kluczy.
2. Po każdym `pull` pokaż zmienione pliki md (`git diff`) i zaproponuj przegląd wg checklisty user-story-writer (np. `TBD` bez wpisu w `Open questions`, AC bez przypadku testowego).
3. Podaj: ścieżki zmienionych md i xlsx, liczbę kluczy per wynik, pominięte konflikty.

### 7. Szablon i konfiguracja

- Zmiana nazw arkuszy lub kolumn: edytuj tylko etykiety (wartości) w [config.json](./assets/config.json); klucze wewnętrzne (lewa strona) i klucz `key_field` zostaw bez zmian.
- Po zmianie wygeneruj szablony: `python .github/skills/excel-sync/scripts/excel_sync.py template [--type T]`.
- Istniejące skoroszyty w `docs/excel/` nie migrują się same. Skrypt zatrzyma się z listą brakujących arkuszy/kolumn; zmień ich nazwy ręcznie lub usuń skoroszyt i zsynchronizuj od nowa (stan `_sync` zniknie, więc pierwsze różnice będą `conflict`).
- Nowe typy artefaktów i nowe kolumny wymagają zmiany adaptera w skrypcie; nie dopisuj ich tylko w configu.

## Zasady twarde

- Nie edytuj plików md ani xlsx ręcznie w ramach tego skilla; zmiany robi skrypt.
- Nie wybieraj `--prefer` samodzielnie.
- Nie czytaj `docs/ai-sessions/*` ani `zgloszenia/*`.
