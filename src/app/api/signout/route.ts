import { NextResponse } from 'next/server';

export async function GET() {
  // This runs on the server and can use your exported `signOut()` from `auth.ts`
  const response = NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'));

  // Remove the session token cookies
  response.cookies.set('authjs.session-token', '', { maxAge: 0 });
  response.cookies.set('authjs.csrf-token', '', { maxAge: 0 });

  return response;
}
