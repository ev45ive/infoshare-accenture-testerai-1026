# Checklista: dane testowe

## Dobre praktyki

- Każdy zestaw ma ID, cel, klasę, wartości i listę przypadków, które go używają.
- Klasy danych: poprawne, niepoprawne, brzegowe, puste, specjalne (polskie znaki, znaki HTML), duże wartości.
- Wartości brzegowe wynikają z reguł w źródłach (np. minimum 8 znaków daje 7 i 8).
- Dane fikcyjne; żadnych danych realnych osób (PRD: dane osobowe w materiałach są fikcyjne lub zanonimizowane).
- Dane powtarzalne. Dla pól wymagających unikalności opisz sposób generowania wartości (np. sufiks z datą) i uwagę o pozostających w systemie rekordach.
- Konta testowe tylko z `docs/product/konta-testowe.md`; podaj rolę konta, nie kopiuj haseł poza to, co jest tam zapisane.
- Każdy zestaw jest użyty przez co najmniej jeden przypadek.
- Sekcja `Conventions` opisuje unikalność, reset i czyszczenie danych; nieznane jako `TBD`.

## Złe praktyki

- Dane realne lub wyglądające na realne (prawdziwe nazwiska, adresy, PESEL).
- Losowe wartości bez opisu sposobu odtworzenia.
- Zestaw bez celu lub bez wskazania, który przypadek go używa.
- Wartości brzegowe wymyślone bez związku z regułą.
- Dane konsumowane (np. e-mail rejestracji) bez uwagi o ponownym użyciu.
- Kopiowanie tych samych wartości do przypadków zamiast referencji do zestawu.
