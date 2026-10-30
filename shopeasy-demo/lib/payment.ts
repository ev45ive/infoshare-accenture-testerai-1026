import type { PaymentMockMode, PaymentResult } from '@/types'

export async function processPayment(_amountCents: number): Promise<PaymentResult> {
  const mode = (process.env.PAYMENT_MOCK_MODE ?? 'normal') as PaymentMockMode

  if (mode === 'always_fail') {
    return {
      success: false,
      code: 'CARD_DECLINED',
      message: 'Karta odrzucona przez bank.',
    }
  }

  if (mode === 'always_timeout') {
    await new Promise((resolve) => setTimeout(resolve, 35_000))
    return {
      success: false,
      code: 'TIMEOUT',
      message: 'Przekroczono czas oczekiwania na odpowiedź bramki.',
    }
  }

  // normal: zawsze sukces w warsztacie (PAYMENT_MOCK_MODE=always_fail do testowania błędów)
  return {
    success: true,
    transactionId: `TXN-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
  }
}
