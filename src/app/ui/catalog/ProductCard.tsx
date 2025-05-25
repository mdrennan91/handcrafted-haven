import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@ui/button';
import { ShoppingCart } from 'lucide-react';



export type ProductCardProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  seller: {
    id: string;
    name: string;
  };
};

export default function ProductCard({ product }: { product: ProductCardProps }) {
  return (
    <div className="relative rounded-xl bg-white p-4 shadow-md hover:shadow-lg transition-transform duration-200 hover:scale-[1.02] border border-gray-100">
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
        <p className="mt-2 text-sm text-gray-500">
          by{' '}
          <Link
            href={`/sellers/${product.seller.id}`}
            className="text-gray-700 font-semibold hover:text-[var(--secondary)] transition"
          >
            {product.seller.name}
          </Link>
        </p>
        <div className="mt-4">
            <Link href={`/products/${product.id}`}>
                <Button>View Product</Button>
            </Link>
        </div>
      </div>
      <button
        type="button"
        className="absolute bottom-4 right-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full shadow-md"
      >
        <ShoppingCart size={16} />
      </button>
    </div>
  );
}