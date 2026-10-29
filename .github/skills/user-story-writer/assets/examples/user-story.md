---
id: US-REG-01
type: user-story
title: Registration form validation
status: draft
requirements: [REG-01, REG-02, BR-10]
---

# US-REG-01 - Registration form validation

## Story

As a guest creating a new account, I want the registration form to tell me immediately which fields are invalid, so that I can correct them and complete registration without guessing.

## Acceptance criteria

- **AC-1** [REG-01, screenshot 07] Given a guest on `/register`, When the page loads, Then the form shows the fields "Imię i nazwisko", "E-mail", "Hasło", "Powtórz hasło" and the button "Zarejestruj się".
- **AC-2** [REG-02, screenshot 08] Given the field "Imię i nazwisko" contains fewer than 2 characters, When the form is validated, Then the message "Imię i nazwisko wymagane (min. 2 znaki)" is shown under the field.
- **AC-3** [REG-02, screenshot 08] Given the field "E-mail" contains a value that is not an e-mail address, When the form is validated, Then the message "Nieprawidłowy format e-mail" is shown under the field.
- **AC-4** [REG-02, BR-10, screenshot 08] Given the field "Hasło" contains fewer than 8 characters, When the form is validated, Then the message "Min. 8 znaków" is shown under the field.
- **AC-5** [REG-01, screenshot 08] Given the value of "Powtórz hasło" differs from "Hasło", When the form is validated, Then the message "Hasła nie są zgodne" is shown under "Powtórz hasło".

## Scope

**In scope**
- Client-visible validation of the four registration fields.

**Out of scope**
- E-mail verification and account activation (REG-03).
- Login, password reset.

## Related requirements

- REG-01: registration with name, e-mail, password, password confirmation
- REG-02: field validation (e-mail format and uniqueness, password rules, all fields required)
- BR-10: password min. 8 characters, min. 1 digit, min. 1 special character

## Linked artifacts

- Scenarios: TS-REG-01 (registration-form-validation)

## Open questions

| # | Question | Owner | Status |
|---|---|---|---|
| 1 | PRD (REG-01) lists separate first name and last name; UI has one field "Imię i nazwisko". Which is correct? | Product owner | open |
| 2 | Message texts for a password without a digit, without a special character, and for an already registered e-mail are not in the sources. | Product owner / developer | open |
| 3 | Behavior when a required field is empty on submit (inline message or browser validation)? | Product owner | open |
| 4 | When is validation triggered (on submit, on leaving the field)? | Developer | open |
