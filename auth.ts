import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcryptjs'
import postgres from 'postgres';

//use zod for validating form data before credentials are checked
import { z } from 'zod';

const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
        return user[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user');
    }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
   providers: [Credentials({
    async authorize(credentials) {
        const parsedCredentials = z.object({email:z.string().email(), password: z.string().min(7)})
        .safeParse(credentials);

        if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await getUser(email);
            if(!user) return null;
            const passwordsMatch = await bcrypt.compare(password, user.password);

            if (passwordsMatch) return user;
        }
            console.log('Invalid credentials');
            return null;
        },
      }),
    ],
});