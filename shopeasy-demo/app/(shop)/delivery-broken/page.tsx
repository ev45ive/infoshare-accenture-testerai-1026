'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type DeliveryMethod = 'COURIER' | 'PARCEL_LOCKER' | null

export default function DeliveryBrokenPage() {
  const [delivery, setDelivery] = useState<DeliveryMethod>(null)

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 16px' }}>
      {/* Exercise banner */}
      <div style={{ background: '#fef3c7', border: '1px solid #fbbf24', padding: '12px 16px', borderRadius: '8px', marginBottom: '24px', fontSize: '14px' }}>
        🔍 <strong>Wersja do ćwiczeń accessibility</strong> — ta strona zawiera celowe błędy WCAG 2.1 AA.
      </div>

      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '32px' }}>Dostawa i adres</h1>

      {/* ── ADDRESS SECTION ──────────────────────────────────────── */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Adres dostawy</h2>

        {/* Imię / Nazwisko — CORRECT fields using shadcn/ui Label + Input */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Label htmlFor="firstName">Imię</Label>
            <Input id="firstName" name="firstName" placeholder="Jan" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Label htmlFor="lastName">Nazwisko</Label>
            <Input id="lastName" name="lastName" placeholder="Kowalski" />
          </div>
        </div>

        {/* Ulica — CORRECT field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
          <Label htmlFor="street">Ulica i numer</Label>
          <Input id="street" name="street" placeholder="ul. Kwiatowa 12/5" />
        </div>

        {/* ── WCAG BUG #1: span instead of label — field has no programmatic label ── */}
        {/* Violation: WCAG 1.3.1 Info and Relationships (Level A) + 4.1.2 Name, Role, Value */}
        {/* The <span> has no `for` attribute, no aria-label, no aria-labelledby on the input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px', maxWidth: '200px' }}>
          <span>Kod pocztowy</span>
          <input
            id="postal-code"
            name="postalCode"
            placeholder="00-001"
            style={{ border: '1px solid #d1d5db', borderRadius: '6px', padding: '8px 12px', fontSize: '14px', width: '100%' }}
          />
        </div>

        {/* ── WCAG BUG #2: DOM order differs from visual order — phone tabbed before city ── */}
        {/* Violation: WCAG 1.3.2 Meaningful Sequence + 2.4.3 Focus Order */}
        {/* Visual order (via CSS `order`): Miasto first, Telefon second */}
        {/* Tab order (DOM order): Telefon first (order:2), Miasto second (order:1) — WRONG */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>
          {/* DOM: phone first — visually appears SECOND (order:2) */}
          <div style={{ order: 2, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label htmlFor="phone">Telefon</label>
            <input
              id="phone"
              name="phone"
              placeholder="+48 600 000 000"
              style={{ border: '1px solid #d1d5db', borderRadius: '6px', padding: '8px 12px', fontSize: '14px' }}
            />
          </div>
          {/* DOM: city second — visually appears FIRST (order:1) */}
          <div style={{ order: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label htmlFor="city">Miasto</label>
            <input
              id="city"
              name="city"
              placeholder="Warszawa"
              style={{ border: '1px solid #d1d5db', borderRadius: '6px', padding: '8px 12px', fontSize: '14px' }}
            />
          </div>
        </div>
      </div>

      {/* ── DELIVERY METHOD SECTION ───────────────────────────────── */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Metoda dostawy</h2>

        {/* ── WCAG BUG #5: custom radio uses div+onClick — not reachable by keyboard ── */}
        {/* Violation: WCAG 2.1.1 Keyboard + 4.1.2 Name, Role, Value */}
        {/* No role="radio", no aria-checked, no onKeyDown handler — keyboard users cannot select */}
        <div
          onClick={() => setDelivery('COURIER')}
          style={{
            cursor: 'pointer',
            padding: '12px',
            border: delivery === 'COURIER' ? '1px solid #2563eb' : '1px solid #ccc',
            borderRadius: '8px',
            marginBottom: '8px',
            background: delivery === 'COURIER' ? '#eff6ff' : '#fff',
          }}
        >
          <strong>Kurier DHL</strong> — 14,99 zł
        </div>
        <div
          onClick={() => setDelivery('PARCEL_LOCKER')}
          style={{
            cursor: 'pointer',
            padding: '12px',
            border: delivery === 'PARCEL_LOCKER' ? '1px solid #2563eb' : '1px solid #ccc',
            borderRadius: '8px',
            background: delivery === 'PARCEL_LOCKER' ? '#eff6ff' : '#fff',
          }}
        >
          <strong>Paczkomat InPost</strong> — 9,99 zł
        </div>
      </div>

      {/* ── WCAG BUG #4: informative image has empty alt="" — screen reader ignores it ── */}
      {/* Violation: WCAG 1.1.1 Non-text Content */}
      {/* The icon conveys meaningful info ("free delivery over 200 PLN") but alt is empty */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '14px', color: '#374151' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/info-icon.svg" alt="" width="20" height="20" />
        <span>Dostawa gratis powyżej 200 zł</span>
      </div>

      {/* ── WCAG BUG #3: insufficient contrast ratio (~1.5:1) — fails WCAG 1.4.3 ── */}
      {/* Violation: WCAG 1.4.3 Contrast (Minimum) — requires 4.5:1 for normal text */}
      {/* #a0a0a0 text on #e0e0e0 background = contrast ratio ≈ 1.5:1 */}
      <button
        type="button"
        style={{
          backgroundColor: '#e0e0e0',
          color: '#a0a0a0',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        Przejdź do płatności
      </button>

      {/*
        ╔══════════════════════════════════════════════════════════════╗
        ║  TRAINER REFERENCE — Lista celowych błędów WCAG 2.1 AA      ║
        ╠══════════════════════════════════════════════════════════════╣
        ║  BUG #1 — Brak etykiety dla pola "Kod pocztowy"             ║
        ║    Kryterium: 1.3.1 Info and Relationships (A)              ║
        ║    Kryterium: 4.1.2 Name, Role, Value (A)                  ║
        ║    Użyto <span> zamiast <label>; brak for/aria-label        ║
        ║                                                              ║
        ║  BUG #2 — Nieprawidłowa kolejność focusu (Telefon/Miasto)   ║
        ║    Kryterium: 1.3.2 Meaningful Sequence (A)                ║
        ║    Kryterium: 2.4.3 Focus Order (A)                        ║
        ║    Kolejność DOM: Telefon → Miasto                          ║
        ║    Kolejność wizualna (CSS order): Miasto → Telefon         ║
        ║                                                              ║
        ║  BUG #3 — Niewystarczający kontrast przycisku CTA           ║
        ║    Kryterium: 1.4.3 Contrast (Minimum) (AA)                ║
        ║    Kontrast #a0a0a0 na #e0e0e0 ≈ 1.5:1 (wymagane 4.5:1)   ║
        ║                                                              ║
        ║  BUG #4 — Informatywna ikona z pustym alt=""                ║
        ║    Kryterium: 1.1.1 Non-text Content (A)                   ║
        ║    Ikona przekazuje info o darmowej dostawie, ale alt=""    ║
        ║                                                              ║
        ║  BUG #5 — Wybór metody dostawy niedostępny z klawiatury    ║
        ║    Kryterium: 2.1.1 Keyboard (A)                           ║
        ║    Kryterium: 4.1.2 Name, Role, Value (A)                  ║
        ║    Użyto <div onClick> bez role/aria-checked/onKeyDown      ║
        ╚══════════════════════════════════════════════════════════════╝
      */}
    </div>
  )
}
