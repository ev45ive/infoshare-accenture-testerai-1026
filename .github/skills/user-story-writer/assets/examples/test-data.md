---
scenario: TS-REG-01
story: US-REG-01
type: test-data
status: draft
---

# Test data for TS-REG-01 - Registration form validation

## Data sets

| ID | Purpose | Class | Full name | E-mail | Password | Repeat password | Used by |
|---|---|---|---|---|---|---|---|
| TD-REG-01 | Valid baseline (8-character password with digit and special character) | valid | Jan Testowy | jan.testowy+`<timestamp>`@example.com | Abcd1!xy | Abcd1!xy | baseline for other sets |
| TD-REG-02 | Name 1 character | boundary (invalid) | X | as TD-REG-01 | as TD-REG-01 | as TD-REG-01 | TC-REG-001 |
| TD-REG-03 | Name 2 characters | boundary (valid) | Jo | as TD-REG-01 | as TD-REG-01 | as TD-REG-01 | TC-REG-002 |
| TD-REG-04 | E-mail without domain part | invalid | as TD-REG-01 | niezly-email | as TD-REG-01 | as TD-REG-01 | TC-REG-003 |
| TD-REG-05 | Password 7 characters (digit and special character present) | boundary (invalid) | as TD-REG-01 | as TD-REG-01 | Abcd1!x | Abcd1!x | TC-REG-004 |
| TD-REG-06 | Confirmation differs from password | invalid | as TD-REG-01 | as TD-REG-01 | Abcd1!xy | Abcd1!xz | TC-REG-005 |

## Conventions

- Uniqueness: replace `<timestamp>` with the current date and time (e.g. 20261029-1015) so the e-mail is not registered yet.
- Reset and cleanup: TBD (how accounts created by test runs are removed).
- Data policy: all data is fictional; the domain `example.com` is reserved for examples.
- Test accounts: n/a (all cases use a guest).

## Open questions

| # | Question | Owner | Status |
|---|---|---|---|
| 1 | Is an e-mail with a `+` tag accepted by the application? | Developer | open |
| 2 | How are accounts created during tests cleaned up? | QA lead | open |
