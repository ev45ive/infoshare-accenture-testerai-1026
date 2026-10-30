/**
 * ShopEasy — pełny flow screenshotów (wszystkie slice'y PRD)
 * Uruchom: node scripts/screenshots.mjs
 */

import { chromium } from 'playwright'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, '..', 'screenshots')
const BASE = 'http://localhost:3000'

async function shot(page, filename) {
  await page.screenshot({ path: path.join(OUT, filename), fullPage: true })
  console.log(`  ✅ ${filename}`)
}

async function login(page) {
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' })
  await page.fill('input[type="email"]', 'test@shopeasy.pl')
  await page.fill('input[type="password"]', 'Test1234!')
  await page.click('button[type="submit"]')
  await page.waitForURL(`${BASE}/`, { timeout: 8000 })
  console.log('  🔑 Zalogowano jako Jan Testowy')
}

;(async () => {
  const browser = await chromium.launch({ headless: true })
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
  const page = await ctx.newPage()

  // ── S1: KATALOG ──────────────────────────────────────────────
  console.log('\n📦 S1 — Katalog')

  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await shot(page, '01-s1-homepage.png')

  await page.goto(`${BASE}/products`, { waitUntil: 'networkidle' })
  await shot(page, '02-s1-products-list.png')

  await page.goto(`${BASE}/products?category=elektronika&sort=price_asc`, { waitUntil: 'networkidle' })
  await shot(page, '03-s1-products-filter-elektronika.png')

  await page.goto(`${BASE}/products?q=s%C5%82uchawki`, { waitUntil: 'networkidle' })
  await shot(page, '04-s1-products-search.png')

  await page.goto(`${BASE}/products/sluchawki-soundmax-x3`, { waitUntil: 'networkidle' })
  await shot(page, '05-s1-product-detail.png')

  await page.goto(`${BASE}/products/sneakersy-urbanrun-pro`, { waitUntil: 'networkidle' })
  await shot(page, '06-s1-product-unavailable.png')

  // ── S2: AUTH ──────────────────────────────────────────────────
  console.log('\n🔐 S2 — Auth')

  await page.goto(`${BASE}/register`, { waitUntil: 'networkidle' })
  await shot(page, '07-s2-register.png')

  // Walidacja inline — wypełnij błędnie i wyślij
  await page.fill('input[name="name"]', 'X')
  await page.fill('input[name="email"]', 'niezly-email')
  await page.fill('input[name="password"]', '123')
  await page.click('button[type="submit"]')
  await page.waitForTimeout(600)
  await shot(page, '08-s2-register-validation.png')

  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' })
  await shot(page, '09-s2-login.png')

  await page.goto(`${BASE}/reset-password`, { waitUntil: 'networkidle' })
  await shot(page, '10-s2-reset-password.png')

  await page.goto(`${BASE}/debug/emails`, { waitUntil: 'networkidle' })
  await shot(page, '11-s2-debug-emails.png')

  // ── S3: KOSZYK ────────────────────────────────────────────────
  console.log('\n🛒 S3 — Koszyk')
  await login(page)

  await page.goto(`${BASE}/cart`, { waitUntil: 'networkidle' })
  await shot(page, '12-s3-cart-empty.png')

  // Dodaj 2 produkty
  await page.goto(`${BASE}/products/sluchawki-soundmax-x3`, { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /dodaj do koszyka/i }).click()
  await page.waitForTimeout(1200)

  await page.goto(`${BASE}/products/powerbank-ultracharge-20000`, { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /dodaj do koszyka/i }).click()
  await page.waitForTimeout(1200)

  await page.goto(`${BASE}/cart`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)
  await shot(page, '13-s3-cart-items.png')

  // ── S4: CHECKOUT ──────────────────────────────────────────────
  console.log('\n💳 S4 — Checkout')

  await page.goto(`${BASE}/checkout/delivery`, { waitUntil: 'networkidle' })
  await shot(page, '14-s4-checkout-delivery.png')

  // Wypełnij formularz dostawy
  const byPlaceholder = (ph) => page.locator(`input[placeholder="${ph}"]`)
  await byPlaceholder('Jan').fill('Jan')
  await byPlaceholder('Kowalski').fill('Testowy')
  await page.locator('input[placeholder*="Kwiatowa"]').fill('ul. Testowa 1/2')
  await byPlaceholder('00-001').fill('00-001')
  await byPlaceholder('Warszawa').fill('Warszawa')
  await page.locator('input[placeholder*="600"]').fill('+48 600 000 000')
  await shot(page, '15-s4-checkout-delivery-filled.png')

  await page.getByRole('button', { name: /przejdź do płatności/i }).click()
  await page.waitForURL(`${BASE}/checkout/payment`, { timeout: 6000 })
  await page.waitForTimeout(700)
  await shot(page, '16-s4-checkout-payment-card.png')

  // Zakładka BLIK
  await page.getByRole('button', { name: /blik/i }).click()
  await page.waitForTimeout(400)
  await shot(page, '17-s4-checkout-payment-blik.png')

  // Zapłać kartą
  await page.getByRole('button', { name: /karta/i }).click()
  await page.waitForTimeout(300)
  await page.fill('input[placeholder="Jan Kowalski"]', 'Jan Testowy')
  await page.fill('input[placeholder*="1234567890123456"]', '1234567890123456')
  await page.fill('input[placeholder="MM/YY"]', '12/27')
  await page.fill('input[placeholder="123"]', '123')
  await page.getByRole('button', { name: /zapłać/i }).click()
  await page.waitForURL(`${BASE}/checkout/success**`, { timeout: 10000 })
  await page.waitForTimeout(500)
  await shot(page, '18-s4-checkout-success.png')

  const successUrl = page.url()
  const orderId = new URL(successUrl).searchParams.get('orderId')
  console.log(`  📦 orderId: ${orderId}`)

  // ── S5: KONTO ─────────────────────────────────────────────────
  console.log('\n👤 S5 — Konto')

  await page.goto(`${BASE}/account/profile`, { waitUntil: 'networkidle' })
  await shot(page, '19-s5-account-profile.png')

  await page.goto(`${BASE}/account/orders`, { waitUntil: 'networkidle' })
  await shot(page, '20-s5-account-orders.png')

  if (orderId) {
    await page.goto(`${BASE}/account/orders/${orderId}`, { waitUntil: 'networkidle' })
    await shot(page, '21-s5-account-order-detail.png')
  }

  await page.goto(`${BASE}/account/loyalty`, { waitUntil: 'networkidle' })
  await shot(page, '22-s5-account-loyalty.png')

  // ── S6: SPECJALNE ─────────────────────────────────────────────
  console.log('\n🔍 S6 — Specjalne')

  await page.goto(`${BASE}/delivery-broken`, { waitUntil: 'networkidle' })
  await shot(page, '23-s6-delivery-broken.png')

  // Próba submitu bez wypełnienia — pokaż błędy WCAG
  await page.getByRole('button', { name: /przejdź do płatności/i }).click()
  await page.waitForTimeout(500)
  await shot(page, '24-s6-delivery-broken-errors.png')

  // Proxy guard — dostęp bez sesji → redirect do login
  const ctx2 = await browser.newContext({ viewport: { width: 1280, height: 900 } })
  const p2 = await ctx2.newPage()
  await p2.goto(`${BASE}/checkout/delivery`)
  await p2.waitForURL(`${BASE}/login**`, { timeout: 5000 })
  await p2.screenshot({ path: path.join(OUT, '25-s2-auth-guard-redirect.png'), fullPage: true })
  console.log('  ✅ 25-s2-auth-guard-redirect.png')
  await ctx2.close()

  await browser.close()

  console.log('\n🎉 Gotowe! Screenshoty zapisane w screenshots/')
})().catch(err => {
  console.error('\n❌ Błąd:', err.message)
  process.exit(1)
})
