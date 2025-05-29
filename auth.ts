import NextAuth, { CredentialsSignin } from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';  // lets you handle auth where users sign in with username/password, not managed by NextAuthjs
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcryptjs'
import postgres from 'postgres';

//use zod for validating form data before credentials are checked
import { z } from 'zod';

const sql = postgres(process.env.DATABASE_URL!, {ssl: 'require'});

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
        console.log('User found:', user);
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
        const email = credentials?.email;
        const password = credentials?.password;

        console.log('⏩ Credentials received:', { email, password });

        
        const parsedCredentials = z.object({email:z.string().email(), password: z.string().min(7)})
        .safeParse(credentials);

        if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            console.log('parsedCredentials email: ', email);
            console.log('parsedCredentials password: ', password);
            const user = await getUser(email);
            console.log('user ', user);
            if(!user) return null;
            const passwordsMatch = await bcrypt.compare(password, user.password);

            if (passwordsMatch) {
                console.log('passwordMatch/user: ', user);
                return user;
            }
        }
            console.log('Invalid credentials');
            return null;
        },
      }),
    ],
});

// export const { auth, signIn, signOut } = NextAuth({
//     ...authConfig,
//     providers: [Credentials({
//         authorize: async (credentials) => {
//         const email = credentials?.email;
//         const password = credentials?.password;

//         console.log('⏩ Credentials received:', { email, password });

//         const result = await sql`SELECT * FROM users WHERE email = ${email}`;
//         const user = result[0];

//         console.log('🔍 User from DB:', user);

//         if (!user) {
//             console.log('❌ No user found');
//             return null;
//         }

//         const isValid = await bcrypt.compare(password, user.password);
//         console.log('🔐 Password match?', isValid);

//         if (!isValid) {
//             console.log('❌ Password mismatch');
//             return null;
//         }

//         console.log('✅ Authenticated successfully!');
//         return {
//             id: user.user_id,
//             email: user.email,
//             user_type: user.user_type,
//         };
//       }

//     })]
// })