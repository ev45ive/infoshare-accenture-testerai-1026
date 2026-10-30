import { NextRequest, NextResponse } from 'next/server'

const PROTECTED_PREFIXES = ['/account', '/checkout']

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p))
  if (!isProtected) return NextResponse.next()

  const raw = req.cookies.get('shopeasy_session')?.value
  if (!raw) {
    return NextResponse.redirect(
      new URL(`/login?next=${encodeURIComponent(pathname)}`, req.url)
    )
  }

  try {
    const session = JSON.parse(raw)
    if (!session?.user || Date.now() > session.expiresAt) {
      return NextResponse.redirect(
        new URL(`/login?next=${encodeURIComponent(pathname)}`, req.url)
      )
    }
  } catch {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/account/:path*', '/checkout/:path*'],
}
