import { authMiddleware } from '@clerk/nextjs'
import { AuthObject } from '@clerk/nextjs/server'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export default authMiddleware({
  afterAuth: (auth: AuthObject, req: NextRequest, evt: NextFetchEvent) => {
    if (
      !auth.sessionId &&
      req.nextUrl.pathname !== '/login' &&
      !req.nextUrl.pathname.startsWith('/api')
    ) {
      const url = req.nextUrl.clone()
      url.pathname = '/login'

      return NextResponse.redirect(url)
    }
    if (auth.sessionId && req.nextUrl.pathname === '/login') {
      const url = req.nextUrl.clone()
      url.pathname = '/profiles' // base for logged in users
      return NextResponse.redirect(url)
    }

    req.headers.set('x-user', JSON.stringify(auth.userId))
    const userProfile = req.cookies.get('my-profile')
    if (!userProfile && req.nextUrl.pathname === '/watch') {
      const url = req.nextUrl.clone()
      url.pathname = '/profiles'
      return NextResponse.redirect(url)
    }

    return NextResponse.next()
  },
})

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login page)
     */
    // '/((?!api|_next/static|_next/image|favicon.ico)[^/].*)',
    '/((?!api|_next/static|_next/image|favicon.ico)[^/].*)',
    '/api/profiles',
  ],
}
