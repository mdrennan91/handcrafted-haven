import { Frown } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Frown width={100} height={100} />
      <h1>404 not found</h1>
      <Link
        href="/sellers"
        className="mt-4 rounded-md bg-[var(--secondary)] px-4 py-2 text-sm text-white transition-colors hover:bg-[var(--secondary-light)]"
      >
        Go Back
      </Link>
    </div>
  );
}
