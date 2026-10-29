---
id: TS-REG-01
type: test-scenario
story: US-REG-01
title: Registration form validation
status: draft
priority: High
---

# TS-REG-01 - Guest sees validation messages in the registration form

## Goal

Verify that the registration form rejects invalid name, e-mail and password values with the messages defined in the story, including the boundary values of the name (2 characters) and the password (8 characters).

## Covered acceptance criteria

- AC-2: name shorter than 2 characters
- AC-3: invalid e-mail format
- AC-4: password shorter than 8 characters
- AC-5: password confirmation mismatch
- Not covered: AC-1 (static form content; check during execution of any case)

## Preconditions

| # | Condition | Description |
|---|---|---|
| 1 | System | TBD (OS, browser) |
| 2 | Application | http://localhost:3000/register is loaded |
| 3 | User | Guest (not logged in) |

## Planned test cases

| TC ID | Title | Type | Technique | Priority | AC |
|---|---|---|---|---|---|
| TC-REG-001 | Name of 1 character is rejected | boundary | boundary values | High | AC-2 |
| TC-REG-002 | Name of 2 characters passes name validation | boundary | boundary values | Medium | AC-2 |
| TC-REG-003 | Invalid e-mail format is rejected | negative | equivalence classes | High | AC-3 |
| TC-REG-004 | Password of 7 characters is rejected | boundary | boundary values | High | AC-4 |
| TC-REG-005 | Different password confirmation is rejected | negative | equivalence classes | High | AC-5 |

## Test data

- TD-REG-01 to TD-REG-06: see the test-data file for this scenario.

## Notes

- Priority High: registration is the entry point to the purchase flow (risk: lost customers).
- Each case changes only one field relative to the valid baseline (TD-REG-01), so a failure points to one rule.

## Open questions

| # | Question | Owner | Status |
|---|---|---|---|
| 1 | Test environment (OS, browser) is not defined. | QA lead | open |
| 2 | Open questions 1-4 from US-REG-01 affect the expected results. | Product owner | open |
