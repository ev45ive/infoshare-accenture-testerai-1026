# Procedura: przegląd artefaktu

Przegląd nie zmienia plików, dopóki użytkownik nie zaakceptuje uwag.

## Kroki

1. Wczytaj: artefakt, checklistę jego typu oraz rodzica do sprawdzenia spójności (story dla scenariusza; scenariusz dla przypadków i danych). Do weryfikacji faktów czytaj PRD lub screenshoty tylko tam, gdzie artefakt się na nie powołuje.
2. Przejdź checklistę punkt po punkcie. Ocena: `OK`, `Uwaga`, `Błąd`, `N/A`.
   - `Błąd`: zgadywanie lub wymyślona wartość, brak oczekiwanego rezultatu, brak pokrycia AC, sprzeczność ze źródłem, naruszenie zasady twardej.
   - `Uwaga`: jakość, czytelność, niejednoznaczność, brak źródła przy wartości.
3. Zweryfikuj twierdzenia o zachowaniu aplikacji ze źródłem wskazanym w artefakcie. Brak źródła to `Uwaga`; niezgodność ze źródłem to `Błąd`.
4. Wyślij raport w czacie (nie zapisuj go do pliku):
   - podsumowanie: 1-2 zdania i liczba uwag wg wagi
   - tabela: `#` | sekcja lub ID | problem | waga | sugerowana poprawka
   - luki w pokryciu i spójności (AC bez scenariusza, scenariusz bez przypadków, zestaw danych bez użycia)
   - pytania do użytkownika, jeśli poprawka wymaga wiedzy spoza źródeł
5. Zapytaj (`vscode_askQuestions`, wielokrotny wybór; domyślnie zaznaczone `Błąd`), które uwagi zastosować.
6. Zastosuj zaakceptowane uwagi według procedury tworzenia i zmiany: załaduj ją dopiero teraz, potwierdź ścieżkę i zmień tylko to, co zaakceptowano.
7. Podsumuj zmiany krótko w czacie.
