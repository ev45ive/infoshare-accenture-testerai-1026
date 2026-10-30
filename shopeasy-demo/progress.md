# ShopEasy — Progress

**Ostatnia aktualizacja:** 2026-07-13

---

## ✅ Slice 0 — Foundation

### Baza danych

- `prisma/schema.prisma` — pełny schemat: 11 modeli + 3 enumy (`OrderStatus`, `PaymentMethod`, `PaymentStatus`)
  - Modele: `User`, `PasswordResetToken`, `Category`, `Product`, `ProductVariant`, `CartItem`, `Address`, `Order`, `OrderItem`, `OrderStatusHistory`, `LoyaltyAccount`
- `prisma/seed.ts` — seed z danymi testowymi:
  - 3 kategorie: Elektronika, Odzież, Dom i ogród
  - 12 produktów (1 celowo niedostępny: sneakers, stock=0 — testowanie KAT-05)
  - 1 user testowy: `test@shopeasy.pl` / `Test1234!` (emailVerified=true)
- `npm run seed` — skrypt do resetowania danych

### Typy i helpery

- `types/index.ts` — `SessionUser`, `SessionCookie`, `CartCookieItem`, `MockEmail`, `PaymentResult`, `PaymentMockMode`
- `lib/db.ts` — Prisma singleton z `PrismaBetterSqlite3({ url })` (Prisma 7 driver adapter)
- `lib/session.ts` — JSON cookie, TTL 30 min, `httpOnly: false` (transparentny dla QA)
- `lib/email.ts` — mock in-memory store (przeżywa HMR przez `global._emailStore`)
- `lib/payment.ts` — mock sterowany przez `PAYMENT_MOCK_MODE` (normal / always_fail / always_timeout)
- `lib/validations/auth.ts` — Zod schemas: `RegisterSchema`, `LoginSchema`, `ResetPasswordRequestSchema`, `ResetPasswordConfirmSchema`
- `lib/validations/checkout.ts` — Zod schemas: `AddressSchema`, `CardPaymentSchema`, `BlikSchema`

### Layout sklepu

- `app/(shop)/layout.tsx` — wrapper z Header + Footer
- `components/layout/Header.tsx` — Server Component, pokazuje imię zalogowanego lub Zaloguj/Zarejestruj
- `components/layout/Footer.tsx` — link do `/debug/emails`
- `components/layout/LogoutButton.tsx` — Client Component, POST /api/auth/logout + redirect

### Homepage

- `app/page.tsx` — prosty landing z CTA "Przeglądaj produkty" i "Zarejestruj się"

---

## ✅ Slice 2 — Auth

### API routes

| Route                              | Method | Opis                                                              |
| ---------------------------------- | ------ | ----------------------------------------------------------------- |
| `/api/auth/register`               | POST   | Walidacja Zod, bcrypt 12r, email weryfikacyjny (mock)             |
| `/api/auth/login`                  | POST   | Lockout BR-05, check emailVerified, cookie sesji                  |
| `/api/auth/logout`                 | POST   | Usuwa cookie sesji                                                |
| `/api/auth/verify`                 | GET    | Token z URL → `emailVerified=true` → redirect `/login?verified=1` |
| `/api/auth/reset-password`         | POST   | Token 1h (BR-06), email z linkiem (mock), zawsze 200 (security)   |
| `/api/auth/reset-password/confirm` | POST   | Walidacja tokenu, bcrypt update, `used=true`                      |

### Auth pages

- `app/(auth)/login/page.tsx` — RHF+Zod, komunikaty: verified=1, błąd lockout, błąd hasła
- `app/(auth)/register/page.tsx` — walidacja inline, po sukcesie info o emailu
- `app/(auth)/reset-password/page.tsx` — krok 1: podaj email
- `app/(auth)/reset-password/confirm/page.tsx` — krok 2: nowe hasło (z tokenu w URL)

### Auth guard

- `proxy.ts` — Next.js 16 proxy (renamed from middleware), chroni `/account/*` i `/checkout/*`
  - Bez sesji → 307 redirect `/login?next=<original-path>`
  - Wygasła sesja → redirect na login

### Debug

- `app/debug/emails/page.tsx` — podgląd wszystkich mock emaili (tylko `NODE_ENV=development`)

---

## 🔧 Konfiguracja techniczna

| Co            | Szczegół                                                                     |
| ------------- | ---------------------------------------------------------------------------- |
| Framework     | Next.js 16.2.10 (App Router, Turbopack)                                      |
| Baza          | Prisma 7.8.0 + `@prisma/adapter-better-sqlite3` + `better-sqlite3`           |
| Adapter API   | `new PrismaBetterSqlite3({ url })` — fabryka, nie instancja Database         |
| Tailwind      | v4, CSS-first, `@import "tailwindcss"` w globals.css                         |
| shadcn/ui     | base-nova, Tailwind v4 ready; brak komponentu `form` (użyć RHF bezpośrednio) |
| Zod           | **v4** (nie v3!) — API kompatybilne w zakresie użytym w projekcie            |
| Auth          | JSON cookie `shopeasy_session`, `httpOnly: false` dla widoczności w DevTools |
| Next.js proxy | `proxy.ts` z `export function proxy()` (Next.js 16 rename z middleware)      |

### Zmienne środowiskowe (`.env.local`)

```
DATABASE_URL="file:./dev.db"
SESSION_SECRET="shopeasy-workshop-secret"
PAYMENT_MOCK_MODE="normal"   # normal | always_fail | always_timeout
```

### next.config.ts

```ts
serverExternalPackages: ["better-sqlite3", "@prisma/adapter-better-sqlite3"];
```

---

## ⬜ Slice 1 — Catalog (następne)

- `app/(shop)/page.tsx` — homepage z banerem i polecanymi (KAT-01)
- `app/(shop)/products/page.tsx` — lista + filtry + paginacja (KAT-02)
- `app/(shop)/products/[slug]/page.tsx` — strona produktu (KAT-04, KAT-05)
- `components/products/ProductCard`, `ProductGrid`, `ProductFilters`

## ⬜ Slice 3 — Cart

- `app/api/cart/route.ts` — CRUD, limit 5 produktów (BR-01)
- `app/(shop)/cart/page.tsx`
- `components/cart/CartItem`, `CartSummary`
- Merge guest→user po zalogowaniu (`lib/cart.ts`)

## ⬜ Slice 4 — Checkout

- Delivery, Payment (timer 15min, 3 retries), Confirm, Success
- `app/api/orders/route.ts`, `app/api/payment/process/route.ts`

## ⬜ Slice 5 — Account

- Profile, Orders list, Order detail, Loyalty (stub 501)

## ⬜ Slice 6 — Debug + a11y

- `checkout/delivery-broken/page.tsx` — 5 celowych błędów WCAG

---

## Zweryfikowane scenariusze

| Scenariusz                                           | Status   |
| ---------------------------------------------------- | -------- |
| Rejestracja → email w /debug/emails → verify → login | ✅       |
| Login z poprawnymi danymi → header z imieniem        | ✅       |
| Logout → redirect na /login, brak sesji              | ✅       |
| 5 złych loginów → HTTP 423 + komunikat o blokadzie   | ✅       |
| /account/profile bez sesji → 307 /login?next=...     | ✅       |
| Reset hasła → email z linkiem → confirm → nowe hasło | ✅ (API) |
| Smoke test (/smoke) → wszystkie 5 checkpointów       | ✅       |
