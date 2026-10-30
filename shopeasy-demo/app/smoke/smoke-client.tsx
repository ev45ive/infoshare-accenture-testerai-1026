'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCartStore } from '@/store/cart'

const Schema = z.object({
  email: z.string().email('Nieprawidłowy e-mail'),
})
type FormData = z.infer<typeof Schema>

export function SmokeClient() {
  const { items, addItem } = useCartStore()

  // rehydrate Zustand persist (skipHydration: true)
  useEffect(() => {
    useCartStore.persist.rehydrate()
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(Schema) })

  return (
    <div className="space-y-6 bg-muted p-4 rounded font-mono text-sm">

      {/* shadcn/ui + Tailwind + Zustand */}
      <div className="space-y-2">
        <p className="text-muted-foreground">shadcn Button + Zustand [{items.length} pozycji]</p>
        <Button
          size="sm"
          onClick={() =>
            addItem({ productId: 'smoke-1', name: 'Test Product', price: 999, quantity: 1, imageUrl: '' })
          }
        >
          Dodaj do koszyka
        </Button>
        {items.length > 0 && (
          <p className="text-green-600">
            ✅ Zustand: {items.map((i) => `${i.name} ×${i.quantity}`).join(', ')}
          </p>
        )}
      </div>

      {/* React Hook Form + Zod */}
      <div className="space-y-2">
        <p className="text-muted-foreground">React Hook Form + Zod</p>
        <form
          onSubmit={handleSubmit((d) => alert(`✅ OK: ${JSON.stringify(d)}`))}
          className="flex gap-2 items-start"
        >
          <div className="space-y-1">
            <Label htmlFor="email" className="sr-only">E-mail</Label>
            <Input
              id="email"
              {...register('email')}
              placeholder="test@example.com"
              className="text-sm h-8 w-56"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>
          <Button type="submit" size="sm" variant="outline">Waliduj</Button>
        </form>
      </div>

    </div>
  )
}
