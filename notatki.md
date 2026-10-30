
# Instalacje
node -v
npm -v 
git -v

# Terminal
Ctrl+`

v24.15.0
11.12.1
git version 2.40.1.windows.1

# GIT
Ctrl+Shift+P -> Clone -> PASTE: -> Clone from URL -> Open window

https://github.com/ev45ive/infoshare-accenture-testerai-1026.git


# Pliki kontekstu

> Pliki te opisują polecenia, reguły i role wykorzystywane przez asystenta. 
> Ich nazwy oraz sposób ładowania mogą zależeć od używanego narzędzia.

## Pliki promptów

- `*.prompt.md` — opisują polecenia uruchamiane przez użytkownika na żądanie, zwykle za pomocą składni takiej jak `/nazwa-polecenia`.
- Mogą zawierać instrukcje, a także przyjmować parametry przekazane przez użytkownika.

## Pliki instrukcji

- `*.instruction.md` — zawierają zasady i informacje, które asystent powinien uwzględniać podczas pracy.
- Mogą być ładowane automatycznie, na przykład na podstawie konfiguracji lub lokalizacji pliku w katalogu projektu.

## Umiejętności (skills)

- Plik `<nazwa>/SKILL.md` opisuje bardziej rozbudowany, wieloetapowy sposób realizacji zadania (workflow).
- Umiejętność może być uruchamiana ręcznie, jeśli narzędzie to obsługuje, albo dołączana automatycznie w odpowiednim kontekście.
- Może odwoływać się do powiązanych zasobów, takich jak:
  - procedury i instrukcje,
  - szablony i przykłady,
  - skrypty.

## Pliki agentów

- `*.agent.md` — definiują wyspecjalizowaną rolę asystenta, w tym jej cel, sposób działania i dostępne zasoby.
- Mogą również określać ograniczenia dotyczące używanych narzędzi oraz wskazywać powiązane instrukcje, umiejętności i pliki.
