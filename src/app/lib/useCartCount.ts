'use client';

import { useEffect, useState } from 'react';
import { getCart } from './cart';

export function useCartCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const cart = getCart();
      const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
      setCount(totalItems);
    };

    updateCount();

    window.addEventListener('storage', updateCount);

    window.addEventListener('cartUpdated', updateCount);

    return () => {
      window.removeEventListener('storage', updateCount);
      window.removeEventListener('cartUpdated', updateCount);
    };
  }, []);

  return count;
}