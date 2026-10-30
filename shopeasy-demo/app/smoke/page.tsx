import { db } from '@/lib/db'
import { SmokeClient } from './smoke-client'

export default async function SmokePage() {
  let dbOk = false
  let dbError = ''

  try {
    await db.$queryRaw`SELECT 1`
    dbOk = true
  } catch (e) {
    dbError = String(e)
  }

  return (
    <main className="p-8 space-y-6 max-w-lg">
      <h1 className="text-2xl font-bold">🧪 Smoke Test</h1>

      <section>
        <h2 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
          Server (Prisma + SQLite)
        </h2>
        <ul className="space-y-1 font-mono text-sm bg-muted p-3 rounded">
          <li>{dbOk ? '✅' : '❌'} Prisma + SQLite{dbError ? `: ${dbError}` : ''}</li>
        </ul>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
          Client (shadcn · Zustand · RHF + Zod)
        </h2>
        <SmokeClient />
      </section>
    </main>
  )
}
