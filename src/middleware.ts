//import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { getToken } from 'next-auth/jwt';

// short cut for auth, but doesn't support role-based auth?
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
export default NextAuth(authConfig).auth;

//add logic for customer/base user. This covers Seller
// export default async function midleware(req: NextRequest) {
//     const token = await getToken({req, secret: process.env.AUTH_SECRET});

//     const isSellerRoute = req.nextUrl.pathname.startsWith('/dashboard');

//     if (!token && isSellerRoute) {
//         return NextResponse.redirect(new URL('/login', req.url))
//     }

//     if (token && isSellerRoute) {
//         const role = token.user_type;

//         if (role!=="Admin" && role !== "Seller") {
//             //Logged in but not authorized  -  create unauthorized page?
//             return NextResponse.redirect(new URL('/'))  //goes back to home page right now
//         }
//     }
//     return NextResponse.next();
// }

//figure out which paths to protect
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  //matcher allows you to filter Middleware to run on specific paths.
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
    // matcher: ['/dashboard/:path*'],
};