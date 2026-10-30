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
| TD-KOS-01 | Guest and registered cart flows, product limit (BR-01) | valid, boundary (4, 5, 6 distinct products) | P1-P6 from the product list below | 1 each | test@shopeasy.pl (see `docs/product/konta-testowe.md`) | 0, 1 (P2), 1 (P1), 4 (P1-P4) or 5 (P1-P5) distinct products; see set purpose below | TC-KOS-001, TC-KOS-002, TC-KOS-003, TC-KOS-004, TC-KOS-005, TC-KOS-006 |

Products (source: database `Product` table, 2026-10-30; all in stock, quantity 1 used):

| Ref | Product | Slug | Price (zl) | Stock |
|---|---|---|---|---|
| P1 | Słuchawki bezprzewodowe SoundMax X3 | `sluchawki-soundmax-x3` | 299,99 | 15 |
| P2 | Mysz gamingowa SwiftClick 8K | `mysz-swiftclick-8k` | 199,99 | 20 |
| P3 | Powerbank UltraCharge 20000 | `powerbank-ultracharge-20000` | 149,99 | 30 |
| P4 | T-shirt bawełniany BasicTee | `tshirt-basictee` | 49,99 | 50 |
| P5 | Świeca sojowa ZenLight Lawendowa | `swieca-zenlight-lawendowa` | 39,99 | 40 |
| P6 | Spodnie dresowe ComfortFit | `spodnie-comfortfit` | 89,99 | 25 |

Set purpose by case:
- Guest, empty cart, adds P1: TC-KOS-001, TC-KOS-002.
- Account cart with 4 distinct products (P1-P4), add P5 as the 5th: TC-KOS-005 (accepted).
- Account cart with 5 distinct products (P1-P5), add P6 as the 6th: TC-KOS-004 (rejected, BR-01).
- Account cart with P2 only, guest cart with P1: TC-KOS-006 (different-product merge).
- Account cart with P1, guest cart with P1: TC-KOS-003 (same-product merge; quantity TBD).

## Conventions

- Uniqueness: not required; the cases use an existing account and no registration.
- Reset and cleanup: the account cart is stored in the `CartItem` table (0 rows on 2026-10-30, so the baseline is an empty cart). It persists after login (KOS-02), so the cart state before each case must be set and reset explicitly; the method is still TBD.
- Data policy: all data is fictional; no real personal data.
- Test accounts: `test@shopeasy.pl` from `docs/product/konta-testowe.md`. Role: not stored in the database (`User` table has no role column); the only user is Jan Testowy, email verified, not locked. Role TBD (KOS-04 limit applies to a standard account). Password is not copied here.

## Open questions

| # | Question | Owner | Status |
|---|---|---|---|
| 1 | How to reset or set the account cart before each case (TC-KOS-003 to TC-KOS-006)? | QA lead | open |
| 2 | Role of `test@shopeasy.pl`: standard or Premium? KOS-04 and BR-01 apply to a standard account. | Product owner | open |
| 3 | Names of 4-6 distinct products for the account cart (TC-KOS-004, TC-KOS-005) and the product for TC-KOS-006: resolved from the database (P1-P6). Out of stock: `sneakersy-urbanrun-pro` (stock 0), not used. | QA lead | closed |
| 4 | Does "account already has SoundMax X3" mean in cart or in order history? Needed for TC-KOS-003 precondition (story Open questions 5). | Product owner | open |
