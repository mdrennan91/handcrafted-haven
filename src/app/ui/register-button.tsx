import Link from 'next/link';

export default function RegisterButton() {
  return (
    <p className="text-center text-sm text-gray-600 mt-4">
      Not registered?{' '}
      <Link
        href="/register"
        className="font-medium text-blue-600 hover:underline"
      >
        Create an account
      </Link>
    </p>
  );
}
