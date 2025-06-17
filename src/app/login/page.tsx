import { Suspense } from 'react';
import LoginForm from '../ui/login-form';
import Logo from '../ui/logo';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};

export default async function LoginPage() {
  const session = await auth();
  if (session) {
    // Redirect based on role
    if (session.user.role === 'Admin') {
      redirect('/admin');
    } else if (session.user.role === 'Seller') {
      redirect('/dashboard');
    } else {
      redirect('/');
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md sm:max-w-md">
        <Logo />
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
