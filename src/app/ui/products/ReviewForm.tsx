"use client";

import { useState } from "react";
import InteractiveStarRating from "./InteractiveStarRating";
import { Button } from "../button";
import { addReview } from "@/app/lib/productActions";

export default function ReviewForm({ productId }: { productId: string }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await addReview(productId, rating, comment);

      if (result.error) {
        throw new Error(result.error);
      }

      setSuccess(true);
      setRating(0);
      setComment("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 p-4 rounded-md shadow-2xl">
      <h3 className="text-lg font-semibold mb-4">Add Your Review</h3>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && (
        <p className="text-green-600 mb-4">Review added successfully!</p>
      )}
      <div className="mb-4">
        <label
          htmlFor="rating"
          className="block text-sm font-medium text-gray-700"
        >
          Rating (1-5)
        </label>
        <InteractiveStarRating onRatingChange={setRating} />
      </div>
      <div className="mb-4">
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700"
        >
          Comment
        </label>
        <textarea
          id="comment"
          name="comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        ></textarea>
      </div>
      <Button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
