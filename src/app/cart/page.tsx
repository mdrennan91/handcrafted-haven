'use client';

import { useEffect, useState } from 'react';
import CartItem from '@/app/ui/cart/CartItem';
import { CartItemType, getCart } from '@/app/lib/cart';
import Link from 'next/link';
import { Button } from '@/app/ui/button';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedCart = getCart();
    setCartItems(storedCart);
    setTotal(
      storedCart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
  }, []);

  const refreshCart = () => {
    const updated = getCart();
    setCartItems(updated);
    setTotal(updated.reduce((acc, item) => acc + item.price * item.quantity, 0));
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Cart Summary</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} onUpdate={refreshCart} />
            ))}
          </div>

          <div className="mt-8 text-right text-lg font-semibold">
            Total: ${(total / 100).toFixed(2)}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link href="/catalog">
              <Button variant="secondary">← Continue Shopping</Button>
            </Link>
            <Link href="/confirmation">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </>
      )}
    </main>
  );
}