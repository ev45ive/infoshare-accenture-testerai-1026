---
description: "Use when creating, editing or reviewing test scenarios (scenariusz testowy, test scenario, TS-, pokrycie AC, priorytet, planned test cases) in docs/test-scenario. Covers required structure, AC coverage, priority rationale, test techniques and bad practices."
applyTo: "docs/test-scenario/**"
---
# Zasady tworzenia scenariuszy testowych

Scenariusz opisuje cel użytkownika lub ścieżkę, nie pojedynczy test.

Wszystkie punkty poniżej są twarde (MUST). Treść artefaktu pisz po angielsku.

## Struktura i treść

- Tytuł opisuje cel użytkownika lub ścieżkę, nie pojedynczy test.
- `Covered acceptance criteria` odwołuje się do ID AC z user story.
- Każde AC z user story jest pokryte przez co najmniej jeden scenariusz albo jawnie oznaczone jako niepokryte.
- `Preconditions` opisują stan (system, dane, konto, adres aplikacji), nie kroki.
- `Planned test cases` to tabela z kolumnami: TC ID, tytuł, typ (positive, negative, boundary), technika (klasy równoważności, wartości brzegowe, tablica decyzyjna, przejścia stanów), priorytet, AC.
- Scenariusz zawiera ścieżkę pozytywną i negatywną. Wartości brzegowe dodawaj tam, gdzie reguła ma próg.
- Granice scenariusza (co jest poza zakresem) opisz w `Notes`.
- Nieznane wartości zapisz jako `TBD` i dodaj wpis w `Open questions`.

## Priorytet

- Uzasadnij priorytet ryzykiem i wpływem biznesowym w `Notes`.
- Nie oznaczaj wszystkich przypadków jako High.

## Zakazy (MUST NOT)

- Szczegółowych kroków testowych (należą do test-case).
- Konkretnych danych wejściowych (należą do test-data).
- Dublowania pokrycia tych samych AC bez uzasadnienia.
- AC bez żadnego przypadku testowego.
- Priorytetu bez uzasadnienia.
- Scenariusza równego jednemu przypadkowi testowemu.
