'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/app/ui/button';
import { addToCart } from '@/app/lib/cart';

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
  const handleClick = () => {
    addToCart(product);
  };

  return (
    <Button
      onClick={handleClick}
      className="flex items-center gap-2 bg-[var(--secondary)] hover:bg-[var(--secondary-light)] text-black"
    >
      <ShoppingCart size={16} />
      Add to Cart
    </Button>
  );
}