"use client";

import { useEffect, useState } from "react";
import CartItem from "@/app/ui/cart/CartItem";
import { CartItemType, getCart } from "@/app/lib/cart";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { getAverageRatings } from "@/app/lib/productActions";

export default function CartPage() {
  //  throw new Error('Throw Test Error'); 
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [total, setTotal] = useState(0);
  const [loadingRatings, setLoadingRatings] = useState(true);

  useEffect(() => {
    const storedCart = getCart();
    setCartItems(storedCart);
    setTotal(
      storedCart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );

    const productIds = storedCart.map((item) => item.id);

    if (productIds.length > 0) {
      const fetchAverageRatings = async () => {
        try {
          const ratingsMap = await getAverageRatings(productIds);

          const cartItemsWithRatings = storedCart.map((item) => ({
            ...item,
            averageRating: ratingsMap[item.id] || 0, // Assign 0 if no rating found
          }));

          setCartItems(cartItemsWithRatings);
        } catch (error) {
          console.error("Error fetching average ratings:", error);
        } finally {
          setLoadingRatings(false);
        }
      };

      fetchAverageRatings();
    } else {
      setLoadingRatings(false);
    }
  }, []);

  const refreshCart = () => {
    const updated = getCart();
    setCartItems(updated);
    setTotal(
      updated.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
    // Note: Average ratings are not re-fetched on refreshCart currently.
    // If you need real-time average ratings, you would need to refetch here as well.
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Cart Summary</h1>

      {loadingRatings ? (
        <p>Loading cart...</p>
      ) : cartItems.length === 0 ? (
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
            
              <Button variant="secondary">
                <Link href="/catalog">← Continue Shopping
                </Link>
              </Button>
            
            
              <Button type="button" variant="proceed">
                <Link href="/confirmation">
                Proceed to Checkout
                </Link>
              </Button>
            
          </div>
        </>
      )}
    </main>
  );
}
