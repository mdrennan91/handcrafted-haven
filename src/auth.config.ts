import type { NextAuthConfig } from 'next-auth';


export const authConfig = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },

    async authorized({auth, request: {nextUrl}}) {
      const user = auth?.user;
      const role = user?.role;     
      const path = nextUrl.pathname;

      // if path is /admin and role is admin, return true
      // false otherwise
      if (path.startsWith('/admin')) {
        return role === "Admin"
      }

      // if path is /dashboard and role is seller, return true
      if(path.startsWith('/dashboard') ){
        return role === "Seller"
      }

      //all other routes - if this is false, every request goes back to /login
      return true;

    }
  },
  providers: [], // Add providers with an empty array for now
   debug: true,
} satisfies NextAuthConfig;
