"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItemType, updateQuantity, removeFromCart } from "@/app/lib/cart";
import { useState } from "react";
import { StarDisplay } from "@/app/ui/products/Rating";

export default function CartItem({
  item,
  onUpdate,
}: {
  item: CartItemType;
  onUpdate: () => void;
}) {
  const [qty, setQty] = useState(item.quantity);

  const handleQuantityChange = (newQty: number) => {
    setQty(newQty);
    updateQuantity(item.id, newQty);
    onUpdate();
  };

  const handleRemove = () => {
    removeFromCart(item.id);
    onUpdate();
  };

  return (
    <div className="flex items-center justify-between gap-4 border-b pb-4">
      <div className="flex items-center gap-4">
        <Image
          src={item.imageUrl}
          alt={item.title}
          width={80}
          height={80}
          className="rounded-md object-cover"
        />
        <div>
          <h2 className="font-semibold">{item.title}</h2>
          <p className="text-sm text-gray-500">
            ${(item.price / 100).toFixed(2)} each
          </p>
          {item.averageRating !== undefined && (
            <div className="mt-1">
              <StarDisplay rating={item.averageRating} />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => handleQuantityChange(Math.max(1, qty - 1))}
          className="p-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          <Minus size={16} />
        </button>
        <span className="px-2">{qty}</span>
        <button
          onClick={() => handleQuantityChange(qty + 1)}
          className="p-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          <Plus size={16} />
        </button>
        <button
          onClick={handleRemove}
          className="ml-4 p-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
