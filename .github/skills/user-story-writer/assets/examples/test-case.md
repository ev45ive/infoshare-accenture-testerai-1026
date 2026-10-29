---
scenario: TS-REG-01
story: US-REG-01
type: test-case
status: draft
---

# Test cases for TS-REG-01 - Registration form validation

Two of five planned cases are shown; the rest follow the same structure.

## TC-REG-001 - Name of 1 character is rejected

- **Scenario:** TS-REG-01
- **AC:** AC-2
- **Type:** boundary
- **Priority:** High
- **Test data:** TD-REG-02

**Preconditions**
- Guest (not logged in); http://localhost:3000/register is loaded.

**Steps**

| # | Action | Expected result | Test data |
|---|---|---|---|
| 1 | Enter the name in "Imię i nazwisko" | The value is entered | TD-REG-02 |
| 2 | Fill "E-mail", "Hasło" and "Powtórz hasło" with valid values | The values are entered | TD-REG-02 |
| 3 | Click "Zarejestruj się" | Under "Imię i nazwisko" the message "Imię i nazwisko wymagane (min. 2 znaki)" is shown; no other field shows an error | n/a |

## TC-REG-004 - Password of 7 characters is rejected

- **Scenario:** TS-REG-01
- **AC:** AC-4
- **Type:** boundary
- **Priority:** High
- **Test data:** TD-REG-05

**Preconditions**
- Guest (not logged in); http://localhost:3000/register is loaded.

**Steps**

| # | Action | Expected result | Test data |
|---|---|---|---|
| 1 | Fill "Imię i nazwisko" and "E-mail" with valid values | The values are entered | TD-REG-05 |
| 2 | Enter the password in "Hasło" and the same value in "Powtórz hasło" | The values are entered | TD-REG-05 |
| 3 | Click "Zarejestruj się" | Under "Hasło" the message "Min. 8 znaków" is shown; "Powtórz hasło" shows no error | n/a |
