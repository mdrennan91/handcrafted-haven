import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@ui/button';


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
    <div className="rounded-xl bg-gray-50 p-4 shadow-sm hover:shadow-md transition hover:scale-[1.02] border border-gray-200">
      <div className="overflow-hidden rounded-lg bg-white">
        <Image
          src={product.imageUrl}
          alt={product.title}
          width={300}
          height={200}
          className="rounded-md object-cover w-full h-48"
        />
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-900">{product.title}</h2>
        <p className="text-sm text-gray-500">${(product.price / 100).toFixed(2)}</p>
        <p className="mt-2 text-sm text-gray-600">
          by{' '}
          <Link
            href={`/sellers/${product.seller.id}`}
            className="underline text-blue-600 hover:text-blue-800"
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
    </div>
  );
}