"use client";

import { useState } from "react";

interface InteractiveStarRatingProps {
  initialRating?: number;
  maxStars?: number;
  onRatingChange: (rating: number) => void;
}

export default function InteractiveStarRating({
  initialRating = 0,
  maxStars = 5,
  onRatingChange,
}: InteractiveStarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(initialRating);

  const handleStarClick = (ratingValue: number) => {
    setSelectedRating(ratingValue);
    onRatingChange(ratingValue);
  };

  const handleMouseEnter = (ratingValue: number) => {
    setHoverRating(ratingValue);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="flex items-center">
      {[...Array(maxStars)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <span
            key={ratingValue}
            className={`text-2xl cursor-pointer ${
              ratingValue <= (hoverRating || selectedRating)
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
            onClick={() => handleStarClick(ratingValue)}
            onMouseEnter={() => handleMouseEnter(ratingValue)}
            onMouseLeave={handleMouseLeave}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
}
