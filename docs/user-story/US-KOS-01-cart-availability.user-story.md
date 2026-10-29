---
id: US-KOS-01
type: user-story
title: Cart availability for guest and registered customer
status: draft
requirements: [KOS-01, KOS-02, KOS-04, KOS-05, BR-01]
---

# US-KOS-01 - Cart availability for guest and registered customer

## Story

As a registered customer, I want my cart items to stay available across sessions and after I log in, so that I can continue my purchase.

## Acceptance criteria

- **AC-1** [KOS-01] Given a guest on an available product page, When the guest clicks "Dodaj do koszyka", Then the product is added to the cart.
- **AC-2** [KOS-02, user answer] Given a guest has items in the cart, When the page is reloaded, Then the guest cart items are still shown.
- **AC-3** [KOS-02, user answer] Given a guest has added SoundMax X3 and the account already has SoundMax X3 in the cart, When the guest logs in, Then the carts are merged and the resulting quantity for SoundMax X3 is TBD.
- **AC-4** [KOS-04, KOS-05, BR-01] Given the cart contains 5 different products, When the customer adds a 6th different product, Then the message "Osiągnięto limit pozycji dla konta standardowego (5). Usuń produkt lub przejdź na konto Premium." is shown.

## Scope

**In scope**
- Adding products to the cart as a guest.
- Keeping the cart between sessions for a registered customer.
- Merging the guest cart with the account cart after login.
- Limit of 5 different products.

**Out of scope**
- Discount codes (KOS-07).
- Stock change alert before checkout (KOS-08).
- Checkout steps (CHK-01 to CHK-11).

## Related requirements

- KOS-01: guest and registered customer can add products to the cart
- KOS-02: cart of a registered customer persists between sessions
- KOS-04: limit of 5 different products for a standard account
- KOS-05: error message for the 6th product
- BR-01: max 5 different products in the cart

## Linked artifacts

- Scenarios: TBD

## Open questions

| # | Question | Owner | Status |
|---|---|---|---|
| 1 | Merge rule is confirmed by the user, but PRD does not define it. Confirm the merge rule in writing. | Product owner (Marta Nowak) | open |
| 2 | If the same product is in both carts, is the quantity summed or kept as one line? | Product owner | open |
| 3 | If the merged cart exceeds 5 different products, what happens and which message is shown? | Product owner | open |
| 4 | Guest cart persistence after reload is confirmed by the user, but KOS-02 covers only registered customers. How long is it kept? | Product owner | open |
| 5 | Does "account already has the headphones" mean in the cart or in order history? E02 does not say. | Product owner | open |
