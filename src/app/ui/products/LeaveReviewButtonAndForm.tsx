"use client";

import { useState } from "react";
import ReviewForm from "./ReviewForm";
import { Button } from "../button";

export default function LeaveReviewButtonAndForm({
  productId,
}: {
  productId: string;
}) {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="mt-8">
      <Button onClick={handleButtonClick}>
        {showForm ? "Hide Review Form" : "Leave a Review"}
      </Button>

      <div
        className={`transition-all duration-500 ease-in-out ${
          showForm
            ? "opacity-100 max-h-screen"
            : "opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        <ReviewForm productId={productId} />
      </div>
    </div>
  );
}
