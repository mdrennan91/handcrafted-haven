"use client";

import { useEffect } from "react";
import { Button } from "@/app/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function ConfirmationPage() {
  useEffect(() => {
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6">
      <Image
        src="/logos/solid-backg-square-logo.png"
        alt="Handcrafted Haven Logo"
        width={300}
        height={300}
        className="mb-6 rounded shadow-md"
      />

      <h1 className="text-2xl font-bold mb-4">Thank you for your purchase!</h1>

      <p className="text-gray-700 max-w-md mb-6">
        We received your order and will send you an email when your items ship.
        Thank you for supporting our artisans — your purchase makes a
        difference.
      </p>

      <Link href="/">
        <Button type="button" variant="secondary">
          Back to Home
        </Button>
      </Link>
    </main>
  );
}
