import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)

  const ip = request.headers.get('x-forwarded-for') || ''

  requestHeaders.set('x-forwarded-for', ip)

  requestHeaders.set('referer', request.headers.get('referer') || '')

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}
