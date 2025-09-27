import { NextRequest, NextResponse } from 'next/server'

const PUBLIC = ['/login']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isPublic = PUBLIC.some(p => pathname.startsWith(p)) || pathname === '/'
  if (isPublic) return NextResponse.next()
  const auth = req.cookies.get('next-auth-placeholder') // no server auth; rely on client redirect
  // allow, client Guard will redirect if no session present
  return NextResponse.next()
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] }
