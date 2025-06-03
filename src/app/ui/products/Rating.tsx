import React from "react";

interface StarDisplayProps {
  rating: number; // from 0 to 5
  maxStars?: number;
  className?: string;
}

export function StarDisplay({
  rating,
  maxStars = 5,
  className = "",
}: StarDisplayProps) {
  return (
    <div className={`flex gap-1 text-yellow-400 ${className}`}>
      {[...Array(maxStars)].map((_, i) => {
        const filled = i + 1 <= Math.floor(rating);
        const half = !filled && i + 0.5 <= rating;

        return (
          <span key={i} className="text-2xl">
            {filled ? "★" : half ? "☆" : "☆"}
          </span>
        );
      })}
    </div>
  );
}
