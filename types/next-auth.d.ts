import { DefaultSession } from 'next-auth';
import type {JWT as DefaultJWT} from 'next-auth/jwt';
import type { DefaultSessions } from 'next-auth';


declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    role: string;
    email: string;
    password: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    role: string;
  }
}
