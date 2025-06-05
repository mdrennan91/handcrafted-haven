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

  const isSellerRoute = req.nextUrl.pathname.startsWith('/dashboard');
  const isAuthPage = req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register';

  // Redirect authenticated users away from auth pages
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl.origin));
  }

  // Redirect unauthenticated users trying to access protected route
  if (!token && isSellerRoute) {
    return NextResponse.redirect(new URL('/login', req.nextUrl.origin));
  }

  // Redirect unauthorized users
  if (token && isSellerRoute) {
    const role = token.role;
    if (role !== 'Admin' && role !== 'Seller' && role !== 'User') {
      return NextResponse.redirect(new URL('/', req.nextUrl.origin));
    }
  }

  return NextResponse.next();
}

//figure out which paths to protect

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  //matcher allows you to filter Middleware to run on specific paths.
  //   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  matcher: ['/dashboard/:path*'],
};
