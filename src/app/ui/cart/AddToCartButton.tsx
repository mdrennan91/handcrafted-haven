"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/app/ui/button";
import { addToCart } from "@/app/lib/cart";
import { useState } from "react";

type Props = {
  product: {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    quantity: number;
  };
};

export default function AddToCartButton({ product }: Props) {
  // This variable is to handle the animation for the add to cart
  const [wiggle, setWiggle] = useState(false);

  const handleClick = () => {
    addToCart(product);
    setWiggle(true);
    setTimeout(() => setWiggle(false), 500);
  };

  return (
    <Button
      onClick={handleClick}
      variant="secondary"
      className="flex items-center gap-2"
    >
      <ShoppingCart size={16} className={wiggle ? "animate-wiggle" : ""} />
      Add to Cart
    </Button>
  );
}
