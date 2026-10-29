# Checklista: user story

## Dobre praktyki

- Format `As a <role>, I want <capability>, so that <benefit>`; konkretna rola (nie "user").
- Benefit opisuje wartość, nie powtarza akcji.
- Jedna historyjka = jedna zdolność (INVEST: Independent, Negotiable, Valuable, Estimable, Small, Testable).
- Kryteria akceptacji (AC):
  - testowalne i jednoznaczne, w formacie Given/When/Then
  - każde z ID (`AC-n`) i źródłem (ID wymagania PRD, reguła BR, screenshot)
  - pokrywają ścieżkę pozytywną, negatywną i brzegi wynikające z reguł
- Dosłowne komunikaty i wartości tylko wtedy, gdy są w źródle; w przeciwnym razie `TBD`.
- Scope: `In scope` i `Out of scope` wypełnione (co należy do innych story).
- `Related requirements` wylicza ID z PRD pokrywane przez story; każde ID ma co najmniej jedno AC.
- `Open questions`: każde `TBD` i każda rozbieżność źródeł ma wpis z właścicielem (kto może odpowiedzieć).
- Brak rozwiązań implementacyjnych (technologia, struktura API).

## Złe praktyki

- Story jako zadanie techniczne albo opis ekranu.
- Kilka ról lub celów w jednej historyjce ("i" łączące niezależne funkcje).
- AC ze słowami bez miary ("szybko", "intuicyjnie", "poprawnie").
- Wymyślone reguły, limity i teksty komunikatów.
- AC dublujące się lub sprzeczne z PRD.
- Pominięta rozbieżność między PRD a UI.
- AC będące powtórzeniem treści story.
