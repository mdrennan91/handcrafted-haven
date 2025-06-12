import { Suspense } from 'react';

import Logo from '../ui/logo';
import RegisterForm from '../ui/register-form';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md sm:max-w-md">
        <Logo />
        <Suspense>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
}
