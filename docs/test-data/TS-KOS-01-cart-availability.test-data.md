---
scenario: TS-KOS-01
story: US-KOS-01
type: test-data
status: accepted
---

# Test data for TS-KOS-01 - Customer keeps cart items across page reload, login and the 5-product limit

## Data sets

Columns after `Class` are the input fields used by the scenario.

| ID | Purpose | Class | Product | Quantity | Account | Account cart before case | Used by |
|---|---|---|---|---|---|---|---|
| TD-KOS-01 | Guest and registered cart flows, product limit (BR-01) | valid, boundary (4, 5, 6 distinct products) | SoundMax X3, `/products/sluchawki-soundmax-x3`, 299,99 zł; 4-6 other distinct products: TBD | 1 | test@shopeasy.pl (see `docs/product/konta-testowe.md`) | 0, 1 (SoundMax X3), 4, or 5 distinct products: set-up TBD | TC-KOS-001, TC-KOS-002, TC-KOS-003, TC-KOS-004, TC-KOS-005, TC-KOS-006 |

Set purpose by case:
- 4 distinct products in account cart: TC-KOS-005 (5th product accepted).
- 5 distinct products in account cart: TC-KOS-004 (6th product rejected, BR-01).
- 1 other product in account cart: TC-KOS-006 (different-product merge).
- SoundMax X3 in account cart: TC-KOS-003 (same-product merge; quantity TBD).

## Conventions

- Uniqueness: not required; the cases use an existing account and no registration.
- Reset and cleanup: TBD. The account cart persists after login (KOS-02), so the cart state before each case must be set and reset explicitly.
- Data policy: all data is fictional; no real personal data.
- Test accounts: `test@shopeasy.pl` from `docs/product/konta-testowe.md`. Role: TBD (KOS-04 limit applies to a standard account). Password is not copied here.

## Open questions

| # | Question | Owner | Status |
|---|---|---|---|
| 1 | How to reset or set the account cart before each case (TC-KOS-003 to TC-KOS-006)? | QA lead | open |
| 2 | Role of `test@shopeasy.pl`: standard or Premium? KOS-04 and BR-01 apply to a standard account. | Product owner | open |
| 3 | Names of 4-6 distinct products for the account cart (TC-KOS-004, TC-KOS-005), and the product for TC-KOS-006. Only SoundMax X3 and `sneakersy-urbanrun-pro` (out of stock, screenshot 06) are known. | QA lead | open |
| 4 | Does "account already has SoundMax X3" mean in cart or in order history? Needed for TC-KOS-003 precondition (story Open questions 5). | Product owner | open |
