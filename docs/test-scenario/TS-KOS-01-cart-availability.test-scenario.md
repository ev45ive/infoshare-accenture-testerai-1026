---
id: TS-KOS-01
type: test-scenario
story: US-KOS-01
title: Cart availability for guest and registered customer
status: draft
priority: High
---

# TS-KOS-01 - Customer keeps cart items across page reload, login and the 5-product limit

## Goal

Verify that products added to the cart by a guest and by a registered customer are kept, that the carts are merged after login, and that the 5-different-products limit is enforced with the defined message. Cart items are the entry point to checkout, so a lost or silently changed cart directly blocks the purchase.

## Covered acceptance criteria

- AC-1: guest adds a product from an available product page
- AC-2: guest cart items remain after page reload
- AC-3: guest cart merged with account cart after login (resulting quantity TBD)
- AC-4: 6th different product is rejected with the limit message

## Preconditions

| # | Condition | Description |
|---|---|---|
| 1 | System | TBD (OS, browser) |
| 2 | Application | http://localhost:3000 is loaded; product page /products/sluchawki-soundmax-x3 is available (stock > 0) |
| 3 | User | Guest (not logged in) for AC-1 and AC-2; registered customer with an existing cart for AC-3 and AC-4 (test account per konta-testowe.md) |

## Planned test cases

| TC ID | Title | Type | Technique | Priority | AC |
|---|---|---|---|---|---|
| TC-KOS-001 | Guest adds an available product to the cart | positive | equivalence classes | High | AC-1 |
| TC-KOS-002 | Guest cart items are still shown after page reload | positive | state transition | High | AC-2 |
| TC-KOS-003 | Guest cart merges with account cart after login (same product) | positive | state transition | High | AC-3 |
| TC-KOS-004 | Adding a 6th different product shows the limit message | boundary | boundary values | High | AC-4 |
| TC-KOS-005 | Adding a 5th different product is accepted | boundary | boundary values | High | AC-4 |
| TC-KOS-006 | Guest cart with a different product merges with account cart after login | positive | state transition | High | AC-3 |

## Test data

- TD-KOS-01: TBD - test-data file not created yet; propose after test cases are accepted.

## Notes

- Priority High: the cart limit (BR-01) and cart persistence are core rules that gate the checkout flow.
- AC-3 expected result is incomplete: resulting quantity is TBD (story open questions 1 and 2). TC-KOS-003 cannot be finalised until these are answered.
- TC-KOS-005 is added to check the boundary on the accepted side of the limit (5 products), not only the rejected side.
- TC-KOS-006 covers merging two different products (no quantity change), as requested in feedback. Quantity-sum case stays in TC-KOS-003 and remains TBD.
- Out of scope (per story): discount codes (KOS-07), stock change alert before checkout (KOS-08), checkout steps (CHK-01 to CHK-11).
- Cart persistence for guests is not covered by KOS-02 (registered customers only); see open questions.

## Open questions

| # | Question | Owner | Status |
|---|---|---|---|
| 1 | Test environment (OS, browser) is not defined. | QA lead | open |
| 2 | Story open question 2: if the same product is in both carts, is the quantity summed or kept as one line? Blocks expected result of TC-KOS-003. | Product owner | open |
| 3 | Story open question 3: what happens when the merged cart exceeds 5 different products, and which message is shown? No test case yet. | Product owner | open |
| 4 | Story open question 4: how long is the guest cart kept after reload? Needed for AC-2 expected result. | Product owner | open |
| 5 | Story open question 5: does "account already has the headphones" mean in the cart or in order history? Needed for TC-KOS-003 precondition. | Product owner | open |
| 6 | Story open question 1: merge rule is confirmed by the user but not defined in PRD; written confirmation needed. | Product owner | open |
