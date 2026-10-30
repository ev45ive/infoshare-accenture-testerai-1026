'use client'
import { useState, useEffect, useCallback } from 'react'
import { useCartStore } from '@/store/cart'
import {
  addToDbCart,
  removeFromDbCart,
  updateDbCartQuantity,
  clearDbCart,
} from '@/lib/actions/cart'
import { formatPrice } from '@/lib/format'

// Kształt pozycji koszyka — wspólny dla gościa i zalogowanego
export type CartLineItem = {
  productId: string
  name: string
  price: number       // grosze
  quantity: number
  imageUrl: string
}

// Odczytaj sesję z cookie (httpOnly: false → dostępne w JS)
function readSessionUser(): { id: string; name: string; email: string } | null {
  if (typeof window === 'undefined') return null
  try {
    const match = document.cookie
      .split('; ')
      .find((c) => c.startsWith('shopeasy_session='))
    if (!match) return null
    const raw = decodeURIComponent(match.split('=').slice(1).join('='))
    const session = JSON.parse(raw)
    if (!session?.user || Date.now() > session.expiresAt) return null
    return session.user
  } catch {
    return null
  }
}

export function useCart() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [dbItems, setDbItems] = useState<CartLineItem[]>([])
  const [loadingDb, setLoadingDb] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Zustand (gość)
  const guestItems = useCartStore((s) => s.items)
  const guestAdd = useCartStore((s) => s.addItem)
  const guestRemove = useCartStore((s) => s.removeItem)
  const guestUpdate = useCartStore((s) => s.updateQuantity)
  const guestClear = useCartStore((s) => s.clearCart)

  // Hydrate guest cart po mount (skipHydration: true w store)
  useEffect(() => {
    useCartStore.persist.rehydrate()
    const user = readSessionUser()
    setIsLoggedIn(!!user)
  }, [])

  // Pobierz DB koszyk dla zalogowanego
  const fetchDbCart = useCallback(async () => {
    setLoadingDb(true)
    try {
      const res = await fetch('/api/cart')
      const rows = await res.json()
      setDbItems(
        rows.map((r: { productId: string; product: { name: string; price: number; imageUrl: string }; quantity: number }) => ({
          productId: r.productId,
          name: r.product.name,
          price: r.product.price,
          quantity: r.quantity,
          imageUrl: r.product.imageUrl,
        }))
      )
    } finally {
      setLoadingDb(false)
    }
  }, [])

  useEffect(() => {
    if (isLoggedIn) fetchDbCart()
  }, [isLoggedIn, fetchDbCart])

  // Unifikacja — zwróć właściwe items w zależności od stanu logowania
  const items: CartLineItem[] = isLoggedIn ? dbItems : guestItems

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  // ─── Akcje ────────────────────────────────────────────

  async function addItem(
    product: { id: string; name: string; price: number; stock: number; imageUrl: string },
    quantity = 1
  ): Promise<{ success?: boolean; error?: string }> {
    setError(null)

    if (isLoggedIn) {
      const result = await addToDbCart(product.id, quantity)
      if (result?.success) await fetchDbCart()
      if (result?.error) setError(result.error)
      return result
    }

    // Guest — limitacja BR-01 po stronie klienta
    const currentDistinct = new Set(guestItems.map((i) => i.productId))
    if (!currentDistinct.has(product.id) && currentDistinct.size >= 5) {
      const msg = 'Osiągnięto limit pozycji dla konta standardowego (5). Usuń produkt lub przejdź na konto Premium.'
      setError(msg)
      return { error: msg }
    }

    guestAdd({ productId: product.id, name: product.name, price: product.price, quantity, imageUrl: product.imageUrl })
    return { success: true }
  }

  async function removeItem(productId: string) {
    if (isLoggedIn) {
      await removeFromDbCart(productId)
      await fetchDbCart()
    } else {
      guestRemove(productId)
    }
  }

  async function updateQty(productId: string, quantity: number) {
    if (quantity <= 0) return removeItem(productId)
    if (isLoggedIn) {
      await updateDbCartQuantity(productId, quantity)
      await fetchDbCart()
    } else {
      guestUpdate(productId, quantity)
    }
  }

  async function clear() {
    if (isLoggedIn) {
      await clearDbCart()
      setDbItems([])
    } else {
      guestClear()
    }
  }

  return {
    items,
    total,
    count,
    loading: loadingDb,
    error,
    clearError: () => setError(null),
    isLoggedIn,
    addItem,
    removeItem,
    updateQty,
    clear,
    refresh: fetchDbCart,
    // helpers
    formatPrice,
  }
}
