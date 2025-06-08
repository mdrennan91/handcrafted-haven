'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const router = useRouter();

  const [userType, setUserType] = useState('User');
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setErrorMessage('');
    setSuccessMessage('');

    const formData = new FormData(e.currentTarget);

    const response = await fetch('/api/register', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    setIsPending(false);

    if (response.ok) {
      setSuccessMessage('Registration successful! Redirecting to login...');

      if (e.currentTarget instanceof HTMLFormElement) {
        e.currentTarget.reset();
      }

      setTimeout(() => {
        router.push('/login?registered=1');
      }, 1500);
    } else {
      setErrorMessage(result.error || 'Registration failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      <div className="flex-1 rounded-lg bg-[var(--accent1)] px-5 pb-4 pt-9">
        <h1 className="mb-3 text-2xl text-[var(--primary-light)] font-bold">
          Create an Account
        </h1>

        <div className="w-full">
          <label className="mb-3 mt-5 block text-sm font-medium text-[var(--primary-light)]">
            Email
            <input
              name="email"
              type="email"
              required
              placeholder="Enter email address"
              className="peer block w-full rounded-xl border border-gray-300 px-4 py-2 text-sm outline-2 placeholder:text-gray-400"
            />
          </label>

          <label className="mb-3 mt-5 block text-sm font-medium text-[var(--primary-light)]">
            Password
            <input
              name="password"
              type="password"
              required
              placeholder="Password"
              className="peer block w-full rounded-xl border border-gray-300 px-4 py-2 text-sm outline-2 placeholder:text-gray-400"
            />
          </label>

          <label className="mb-3 mt-5 block text-sm font-medium text-[var(--primary-light)]">
            Username
            <input
              name="user_name"
              required
              placeholder="Username"
              className="peer block w-full rounded-xl border border-gray-300 px-4 py-2 text-sm outline-2 placeholder:text-gray-400"
            />
          </label>

          <label className="mb-3 mt-5 block text-sm font-medium text-[var(--primary-light)]">
            Account Type
            <select
              name="user_type"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="peer block w-full rounded-xl border border-gray-300 px-4 py-2 text-sm outline-2"
            >
              <option value="User">User</option>
              <option value="Seller">Seller</option>
            </select>
          </label>

          {userType === 'Seller' && (
            <>
              <label className="mb-3 mt-5 block text-sm font-medium text-[var(--primary-light)]">
                Store Name
                <input
                  name="name"
                  placeholder="Store / Seller Name"
                  className="peer block w-full rounded-xl border border-gray-300 px-4 py-2 text-sm outline-2"
                  required
                />
              </label>

              <label className="mb-3 mt-5 block text-sm font-medium text-[var(--primary-light)]">
                Specialty
                <input
                  name="specialty"
                  placeholder="Specialty"
                  className="peer block w-full rounded-xl border border-gray-300 px-4 py-2 text-sm outline-2"
                  required
                />
              </label>

              <label className="mb-3 mt-5 block text-sm font-medium text-[var(--primary-light)]">
                Image URL
                <input
                  name="image_url"
                  placeholder="Image URL"
                  className="peer block w-full rounded-xl border border-gray-300 px-4 py-2 text-sm outline-2"
                />
              </label>

              <label className="mb-3 mt-5 block text-sm font-medium text-[var(--primary-light)]">
                Rating
                <input
                  name="rating"
                  type="number"
                  min={0}
                  max={5}
                  step={0.1}
                  placeholder="Initial rating (e.g. 0-5)"
                  className="peer block w-full rounded-xl border border-gray-300 px-4 py-2 text-sm outline-2"
                  required
                />
              </label>

              <label className="mb-3 mt-5 block text-sm font-medium text-[var(--primary-light)]">
                About
                <textarea
                  name="about"
                  placeholder="About your shop"
                  className="peer block w-full rounded-xl border border-gray-300 px-4 py-2 text-sm outline-2"
                  required
                />
              </label>
            </>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="mt-4 w-full bg-[var(--secondary)] hover:bg-[var(--secondary-light)] text-black py-2 rounded-xl transition-transform duration-200 hover:scale-105 disabled:opacity-50"
        >
          {isPending ? 'Registering...' : 'Register'}
        </button>

        <div
          className="flex h-8 items-end space-x-1 mt-2"
          aria-live="polite"
          aria-atomic="true"
          aria-disabled={isPending}
        >
          {successMessage && (
            <p className="text-sm text-green-700">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-sm text-red-800">{errorMessage}</p>
          )}
        </div>
      </div>
    </form>
  );
}
