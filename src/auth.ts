import NextAuth from 'next-auth';
// import NextAuth, { CredentialsSignin } from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials'; // lets you handle auth where users sign in with username/password, not managed by NextAuthjs
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcryptjs';
import postgres from 'postgres';

//use zod for validating form data before credentials are checked
import { z } from 'zod';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    // console.log('User found:', user);
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(7) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          console.log('❌ Invalid input', credentials);
          return null;
        }

        const { email, password } = parsedCredentials.data;
        const user = await getUser(email);

        if (!user) {
          console.log('❌ User not found for email:', email);
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
          console.log('❌ Incorrect password for:', email);
          return null;
        }

        console.log('✅ Authorized user:', user.email, 'Role:', user.user_type);
        return {
          id: user.user_id,
          email: user.email,
          role: user.user_type,
          password: user.password,
        };
      },
    }),
  ],
});
