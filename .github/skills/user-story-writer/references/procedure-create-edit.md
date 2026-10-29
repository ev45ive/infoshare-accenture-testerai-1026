# Procedura: tworzenie i zmiana artefaktu (iteracyjnie)

## Zasady

- Jedna iteracja = jedna sekcja lub grupa sekcji. Iteracja 0 = szkic całego artefaktu.
- Plik na dysku odzwierciedla ostatnio zaakceptowany stan. Nie zapisuj niezaakceptowanych zmian.
- Każda runda pytań to jedno wywołanie `vscode_askQuestions`:
  - każde pytanie ma rekomendowaną odpowiedź domyślną wynikającą ze źródeł
  - maksymalnie 5-6 pytań na rundę
  - wartość nieznana ze źródeł: pytanie bez rekomendacji, z opcją "TBD - odroczyć"
- Wartości, których nie ma w źródłach, nie trafiają do artefaktu inaczej niż jako `TBD`.

## Iteracja 0: szkic wstępny

1. Cel: wypełnij szablon tym, co wynika z kontekstu (wejście użytkownika, rozmowa, istniejące artefakty). Resztę oznacz `TBD`.
2. Źródła: zaproponuj listę (pytanie wielokrotnego wyboru z sugerowanym zaznaczeniem wg tabeli na końcu). Przeczytaj tylko wybrane.
3. Pytania: runda pytań z domyślnymi odpowiedziami (rola, zakres, nieznane wartości).
4. Pokaż szkic w czacie: pełny dla krótkich artefaktów, dla długich nagłówki sekcji z kluczową treścią.
5. Ścieżka: zapytaj o potwierdzenie. Propozycja zgodna ze wzorcem `./docs/<typ>/<id>-<short-name>.<typ>.md` jako opcja rekomendowana; inna ścieżka przez wolny tekst. Jeśli plik już istnieje, ostrzeż i zapytaj, czy edytować istniejący.
6. Zapisz plik ze `status: draft`.

## Iteracja n: rozwijanie sekcji

Powtarzaj dla kolejnych sekcji (kolejność wg tabeli), aż wszystkie `TBD` są rozstrzygnięte albo świadomie odroczone.

1. Cel iteracji: jedno zdanie (która sekcja i po co).
2. Źródła: potwierdź lub zaproponuj nowe; doczytaj tylko brakujące.
3. Pytania: runda z domyślnymi odpowiedziami.
4. Szkic poprawionej sekcji w czacie (tylko ta sekcja).
5. Akceptacja (`vscode_askQuestions`): "Zaakceptuj" (rekomendowane) lub "Popraw" z wolnym tekstem. Przy "Popraw" wróć do kroku 3 albo od razu uwzględnij uwagę i pokaż sekcję ponownie.
6. Po akceptacji: zmień w pliku tylko tę sekcję (`replace_string_in_file`), zaktualizuj pola zależne (`Open questions`, `Linked artifacts`, lista przypadków w scenariuszu), oznacz wpis todo jako zakończony.

## Potwierdzenie ścieżki przy edycji

Przy zmianie istniejącego artefaktu potwierdź ścieżkę (domyślnie: znaleziony plik) przed pierwszym zapisem w sesji. Potwierdź ponownie, jeśli ścieżka ma się zmienić (np. nowy `short-name`).

## Zakończenie artefaktu

1. Gdy użytkownik uzna artefakt za gotowy, przejdź krótko przez checklistę typu i zgłoś niespełnione punkty.
2. Po akceptacji ustaw `status: accepted`.
3. Zaproponuj kolejny artefakt w łańcuchu (story, scenario, test-case i test-data).

## Kolejność sekcji, źródła i tematy pytań wg typu

| Typ | Kolejność sekcji | Źródła do zaproponowania | Tematy pytań |
|---|---|---|---|
| user-story | Story, Acceptance criteria, Scope, Related requirements, Open questions | PRD (wymagania modułu, reguły BR, stany systemu), mapa ekranów i screenshoty, prośba użytkownika | rola i cel biznesowy, granice zakresu, scenariusze negatywne i brzegowe, dosłowne komunikaty, rozbieżności PRD i UI |
| test-scenario | Goal, Covered acceptance criteria, Preconditions, Planned test cases, Notes | zaakceptowane user story (wymagane), PRD (reguły BR), screenshoty, konta testowe | ścieżki do pokrycia, technika projektowania, priorytet wg ryzyka, stan początkowy, środowisko |
| test-case | Przypadki wg listy "Planned test cases"; dla każdego: Preconditions, Steps, Expected results | scenariusz (wymagany), AC ze story, PRD, screenshoty (teksty komunikatów), obserwacje użytkownika z aplikacji | oczekiwane komunikaty (dosłowne), stan początkowy, wykonalność kroków w UI, priorytet |
| test-data | Data sets, Conventions, Open questions | przypadki testowe (które dane są potrzebne), PRD (reguły walidacji, BR, sekcja o danych fikcyjnych), konta testowe | klasy danych (poprawne, niepoprawne, brzegowe, puste, specjalne), wartości brzegowe z reguł, unikalność i reset, role kont |

Zależność test-case i test-data: w przypadkach wpisuj referencje do zestawów (`TD-...`). Jeśli plik test-data jeszcze nie istnieje, oznacz referencję `TBD` i zaproponuj utworzenie test-data zaraz po przypadkach.
