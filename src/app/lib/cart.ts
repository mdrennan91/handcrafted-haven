export type CartItemType = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

export function getCart(): CartItemType[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('cart');
  return data ? JSON.parse(data) : [];
}

export function addToCart(newItem: CartItemType) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === newItem.id);
  let updatedCart;

  if (existing) {
    updatedCart = cart.map((item) =>
      item.id === newItem.id
        ? { ...item, quantity: item.quantity + newItem.quantity }
        : item
    );
  } else {
    updatedCart = [...cart, newItem];
  }

  localStorage.setItem('cart', JSON.stringify(updatedCart));

  window.dispatchEvent(new Event('cartUpdated'));
}

export function removeFromCart(id: string) {
  const updatedCart = getCart().filter((item) => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(updatedCart));

  window.dispatchEvent(new Event('cartUpdated'));
}

export function updateQuantity(id: string, quantity: number) {
  const updatedCart = getCart().map((item) =>
    item.id === id ? { ...item, quantity } : item
  );
  localStorage.setItem('cart', JSON.stringify(updatedCart));

  window.dispatchEvent(new Event('cartUpdated'));
}