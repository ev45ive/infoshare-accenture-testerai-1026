# Checklista: scenariusz testowy

## Dobre praktyki

- Tytuł opisuje cel użytkownika lub ścieżkę, nie pojedynczy test.
- `Covered acceptance criteria` odwołuje się do ID AC ze story; każde AC ze story jest pokryte przez co najmniej jeden scenariusz (albo świadomie wskazane jako niepokryte).
- `Preconditions` opisują stan (system, dane, konto, adres aplikacji), nie kroki.
- `Planned test cases`: tabela z ID, tytułem, typem (positive, negative, boundary), techniką projektowania (klasy równoważności, wartości brzegowe, tablica decyzyjna, przejścia stanów), priorytetem i AC.
- Priorytet uzasadniony ryzykiem i wpływem biznesowym.
- Jest ścieżka pozytywna i negatywna; brzegi tam, gdzie reguły mają progi.
- Jawnie opisane granice (co poza scenariuszem).
- Nieznane wartości jako `TBD` z wpisem w `Open questions`.

## Złe praktyki

- Szczegółowe kroki w scenariuszu (należą do przypadków testowych).
- Scenariusz równy jednemu przypadkowi.
- Dublowanie pokrycia tych samych AC bez powodu.
- AC bez żadnego przypadku.
- Priorytet bez uzasadnienia lub wszystko "High".
- Konkretne dane wejściowe w scenariuszu (należą do test-data).
