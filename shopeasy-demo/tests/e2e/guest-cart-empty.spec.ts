import { test, expect } from 'playwright/test'

const PRODUCT_URL = '/products/sluchawki-soundmax-x3'
const PRODUCT_NAME = 'Słuchawki bezprzewodowe SoundMax X3'

test('gość dodaje produkt i usuwa ostatnią pozycję, koszyk jest pusty', async ({ page }) => {
  // Znany początek: pusty koszyk gościa w localStorage
  await page.goto('/')
  await page.evaluate(() => localStorage.removeItem('shopeasy-guest-cart'))

  await page.goto(PRODUCT_URL)
  await page.getByRole('button', { name: 'Dodaj do koszyka' }).click()

  await page.goto('/cart')
  await expect(page.getByRole('heading', { name: 'Koszyk (1 szt.)' })).toBeVisible()
  await expect(page.getByText(PRODUCT_NAME)).toBeVisible()

  await page.getByRole('button', { name: 'Usuń produkt' }).click()

  await expect(page.getByRole('heading', { name: 'Twój koszyk jest pusty' })).toBeVisible()
  await expect(page.getByText(PRODUCT_NAME)).toHaveCount(0)
})
