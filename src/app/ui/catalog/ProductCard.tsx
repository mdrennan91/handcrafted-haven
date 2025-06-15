"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@ui/button";
import { ShoppingCart } from "lucide-react";
import { addToCart } from "@/app/lib/cart";
import { useState } from "react";
import { StarDisplay } from "../products/Rating";

export type ProductCardProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  seller: {
    id: string;
    name: string;
  };
  averageRating?: number;
};

export default function ProductCard({
  product,
}: {
  product: ProductCardProps;
}) {
  const [wiggle, setWiggle] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    });
    setWiggle(true);
    setTimeout(() => setWiggle(false), 500);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between rounded-xl bg-white p-4 shadow-md hover:shadow-lg transition-transform duration-200 hover:scale-[1.02] border border-gray-100">
      <div className="overflow-hidden rounded-lg bg-gray-100 h-48">
        <Image
          src={product.imageUrl}
          alt={product.title}
          width={300}
          height={200}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="mt-4">
        <p className="text-sm font-semibold text-gray-900">{product.title}</p>
        <span className="inline-block bg-gray-100 text-green-600 text-xs font-semibold px-2 py-1 rounded-full">
          ${(product.price / 100).toFixed(2)}
        </span>

        {product.averageRating !== undefined && (
          <div className="mt-2">
            <StarDisplay rating={product.averageRating} />
          </div>
        )}

        <p className="mt-2 text-sm text-gray-500">
          by{" "}
          <Link
            href={`/sellers/${product.seller.id}`}
            className="text-gray-700 font-semibold hover:text-[var(--secondary)] transition"
          >
            {product.seller.name}
          </Link>
        </p>
        <div className="flex mt-4 justify-between">
          <Button url={`/products/${product.id}`}>View Product</Button>

          <Button
            type="button"
            value="cart"
            title="Add to Cart"
            variant="cartButton"
            onClick={handleAddToCart}
          >
            <ShoppingCart
              size={16}
              className={wiggle ? "animate-wiggle" : ""}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
