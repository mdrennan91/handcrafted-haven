'use server';

import { AuthError } from 'next-auth';
import { signIn, auth } from '../../../auth';
import { redirect } from 'next/navigation';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', formData);

    // console.log('Login attempt:', {
    //     formPassword: formData.get('password'),
    //     });
    const session = await auth(); // 🔥 server-side session from your setup
    const role = session?.user?.role;

    if (role === 'Seller') {
      redirect('/dashboard');
    } else {
      redirect('/');
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid Username or Password';
        default:
          return 'Oops! Something went wrong.';
      }
    }
    throw error;
  }
}
