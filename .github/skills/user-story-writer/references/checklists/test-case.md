# Checklista: przypadki testowe

## Dobre praktyki

- Jeden przypadek = jeden cel; niezależny od innych przypadków.
- Unikalne ID; tytuł opisuje cel i oczekiwany wynik.
- Pola: scenariusz, AC, typ (positive, negative, boundary), priorytet, referencje do zestawów danych.
- `Preconditions` konkretne: stan systemu, konto, adres, środowisko.
- Jedna akcja na krok; każdy krok ma obserwowalny oczekiwany rezultat.
- Oczekiwane rezultaty precyzyjne: dosłowne teksty komunikatów tylko ze źródła (PRD, screenshot, obserwacja użytkownika); nieznane jako `TBD`.
- Dane przez referencje (`TD-...`), nie wartości przepisane w wielu miejscach.
- Krok wykonalny przez osobę bez znajomości funkcji.
- Przypadki powtarzalne; dla brzegów oba punkty progu (ostatnia wartość odrzucona i pierwsza przyjęta).
- Bez kodu i automatyzacji.

## Złe praktyki

- Wiele celów w jednym przypadku.
- Zależność od innego przypadku ("wykonaj po TC-...").
- Rezultaty typu "działa poprawnie", "wyświetla się komunikat" bez wskazania którego.
- Wymyślone teksty komunikatów lub adresy.
- Kroki bez oczekiwanego rezultatu.
- Dane wpisane na stałe, których nie da się powtórzyć (np. e-mail, który może istnieć w systemie) bez uwagi o unikalności.
- Postconditions bez wpływu na kolejne przypadki (zbędne).
