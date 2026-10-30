import { cookies } from 'next/headers'
import type { SessionCookie, SessionUser } from '@/types'

const SESSION_COOKIE = 'shopeasy_session'
const SESSION_TTL_MS = 30 * 60 * 1000 // 30 min

export async function getSession(): Promise<SessionCookie | null> {
  const store = await cookies()
  const raw = store.get(SESSION_COOKIE)?.value
  if (!raw) return null
  try {
    const session = JSON.parse(raw) as SessionCookie
    if (Date.now() > session.expiresAt) return null
    return session
  } catch {
    return null
  }
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const session = await getSession()
  return session?.user ?? null
}

export async function setSession(user: SessionUser): Promise<void> {
  const store = await cookies()
  const session: SessionCookie = {
    user,
    expiresAt: Date.now() + SESSION_TTL_MS,
  }
  store.set(SESSION_COOKIE, JSON.stringify(session), {
    httpOnly: false, // transparent: QA widzi dane sesji w DevTools Application > Cookies
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_MS / 1000,
  })
}

export async function clearSession(): Promise<void> {
  const store = await cookies()
  store.delete(SESSION_COOKIE)
}
