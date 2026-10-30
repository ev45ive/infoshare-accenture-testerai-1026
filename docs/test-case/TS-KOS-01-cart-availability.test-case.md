---
scenario: TS-KOS-01
story: US-KOS-01
type: test-case
status: accepted
---

# Test cases for TS-KOS-01 - Customer keeps cart items across page reload, login and the 5-product limit

## TC-KOS-001 - Guest adds an available product to the cart

- **Scenario:** TS-KOS-01
- **AC:** AC-1
- **Type:** positive
- **Priority:** High
- **Test data:** TD-KOS-01

**Preconditions**
- Guest (not logged in), no SoundMax X3 in the cart.
- Product page `/products/sluchawki-soundmax-x3` is available (stock > 0).

**Steps**

| # | Action | Expected result | Test data |
|---|---|---|---|
| 1 | Open `/products/sluchawki-soundmax-x3` | Product page shows price 299,99 zł and an active "Dodaj do koszyka" button | TD-KOS-01 |
| 2 | Click "Dodaj do koszyka" | Confirmation of the action: TBD (Open questions 1) | TD-KOS-01 |
| 3 | Open `/cart` | Cart lists SoundMax X3, quantity 1, unit price 299,99 zł | TD-KOS-01 |

## TC-KOS-002 - Guest cart items are still shown after page reload

- **Scenario:** TS-KOS-01
- **AC:** AC-2
- **Type:** positive
- **Priority:** High
- **Test data:** TD-KOS-01

**Preconditions**
- Guest (not logged in), no SoundMax X3 in the cart.

**Steps**

| # | Action | Expected result | Test data |
|---|---|---|---|
| 1 | Open `/products/sluchawki-soundmax-x3` and click "Dodaj do koszyka" | Product is added to the cart (see TC-KOS-001, step 2) | TD-KOS-01 |
| 2 | Open `/cart` | Cart lists SoundMax X3, quantity 1 | TD-KOS-01 |
| 3 | Reload the page | Cart still lists SoundMax X3, quantity 1, unit price 299,99 zł | TD-KOS-01 |

## TC-KOS-003 - Guest cart merges with account cart after login (same product)

- **Scenario:** TS-KOS-01
- **AC:** AC-3
- **Type:** positive
- **Priority:** High
- **Test data:** TD-KOS-01

**Preconditions**
- Registered test account (see `docs/product/konta-testowe.md`) has SoundMax X3 in the cart: set-up TBD (Open questions 3).
- Guest (not logged in) has SoundMax X3, quantity 1, in the cart.

**Steps**

| # | Action | Expected result | Test data |
|---|---|---|---|
| 1 | Open `/products/sluchawki-soundmax-x3` and click "Dodaj do koszyka" as guest | Product is added to the guest cart | TD-KOS-01 |
| 2 | Open `/login`, enter the test account e-mail and password, submit | Login succeeds; redirect target TBD (Open questions 4) | TD-KOS-01 |
| 3 | Open `/cart` | One line for SoundMax X3 with quantity TBD (story AC-3, Open questions 2) | TD-KOS-01 |

## TC-KOS-004 - Adding a 6th different product shows the limit message

- **Scenario:** TS-KOS-01
- **AC:** AC-4
- **Type:** boundary
- **Priority:** High
- **Test data:** TD-KOS-01

**Preconditions**
- Registered customer is logged in and the cart contains 5 different products: set-up TBD (Open questions 3).
- A 6th product, different from the 5, is available (stock > 0): TBD (Open questions 3).

**Steps**

| # | Action | Expected result | Test data |
|---|---|---|---|
| 1 | Open `/cart` | Cart lists 5 different products | TD-KOS-01 |
| 2 | Open the product page of the 6th product | Product page shows an active "Dodaj do koszyka" button | TD-KOS-01 |
| 3 | Click "Dodaj do koszyka" | Message "Osiągnięto limit pozycji dla konta standardowego (5). Usuń produkt lub przejdź na konto Premium." is shown | TD-KOS-01 |
| 4 | Open `/cart` | Cart still lists 5 different products; the 6th product is not in the cart | TD-KOS-01 |

## TC-KOS-005 - Adding a 5th different product is accepted

- **Scenario:** TS-KOS-01
- **AC:** AC-4
- **Type:** boundary
- **Priority:** Medium
- **Test data:** TD-KOS-01

**Preconditions**
- Registered customer is logged in and the cart contains 4 different products: set-up TBD (Open questions 3).
- A 5th product, different from the 4, is available (stock > 0): TBD (Open questions 3).

**Steps**

| # | Action | Expected result | Test data |
|---|---|---|---|
| 1 | Open `/cart` | Cart lists 4 different products | TD-KOS-01 |
| 2 | Open the product page of the 5th product | Product page shows an active "Dodaj do koszyka" button | TD-KOS-01 |
| 3 | Click "Dodaj do koszyka" | Limit message is not shown | TD-KOS-01 |
| 4 | Open `/cart` | Cart lists 5 different products, including the 5th product | TD-KOS-01 |

## TC-KOS-006 - Guest cart with a different product merges with account cart after login

- **Scenario:** TS-KOS-01
- **AC:** AC-5
- **Type:** positive
- **Priority:** Medium
- **Test data:** TD-KOS-01

**Preconditions**
- Registered test account has one product (not SoundMax X3) in the cart: product and set-up TBD (Open questions 3).
- Guest (not logged in) has SoundMax X3, quantity 1, in the cart.

**Steps**

| # | Action | Expected result | Test data |
|---|---|---|---|
| 1 | Open `/products/sluchawki-soundmax-x3` and click "Dodaj do koszyka" as guest | Product is added to the guest cart | TD-KOS-01 |
| 2 | Open `/login`, enter the test account e-mail and password, submit | Login succeeds | TD-KOS-01 |
| 3 | Open `/cart` | Cart contains the account product and SoundMax X3 (merge rule: story Open questions 1) | TD-KOS-01 |

## Open questions

| # | Question | Owner | Status |
|---|---|---|---|
| 1 | What confirmation is shown after clicking "Dodaj do koszyka" (TC-KOS-001, TC-KOS-002)? No message is defined in PRD or screenshots. | Product owner | open |
| 2 | Resulting quantity when the same product is in both carts (TC-KOS-003, step 3). Story Open questions 2. | Product owner | open |
| 3 | Set-up of the test account carts: which products, how to prepare 4 and 5 different products, and whether "account already has SoundMax X3" means cart or order history. Story Open questions 5. | QA lead / Product owner | open |
| 4 | Redirect target after login (TC-KOS-003, TC-KOS-006). Not defined in PRD. | Product owner | open |
