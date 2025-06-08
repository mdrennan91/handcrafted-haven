import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// short cut for auth, but doesn't support role-based auth?
// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';
// export default NextAuth(authConfig).auth;

//add logic for customer/base user. This covers Seller
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const pathname = req.nextUrl.pathname;

  if (token) {
    const role = token.role;

    // Redirect non-admins trying to access /admin
    if (pathname.startsWith('/admin') && role !== 'Admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // Redirect non-sellers trying to access /dashboard
    if (pathname.startsWith('/dashboard') && role !== 'Seller') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  } else {
    // If not authenticated, block protected routes
    if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

//figure out which paths to protect

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  //matcher allows you to filter Middleware to run on specific paths.
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  // matcher: ['/dashboard/:path*'],
};
