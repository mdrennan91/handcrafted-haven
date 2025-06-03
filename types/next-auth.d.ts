import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
    } & DefaultSession['user'];
  }

  interface User {
    user_id: string;
    user_type: string;
    email: string;
    password: string;
  }

  interface JWT {
    id: string;
    role: string;
  }
}
