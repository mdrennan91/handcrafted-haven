"use client";

import { Button } from "@/app/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <Button
        variant="secondary"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
        className="my-5"
      >
        Try again
      </Button>
    </div>
  );
}
