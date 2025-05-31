import postgres from 'postgres';
import Image from 'next/image';
import ProductCard from '@ui/catalog/ProductCard';
import Link from 'next/link';

const sql = postgres(process.env.DATABASE_URL!, {
  ssl: 'require',
  prepare: false,
});

type Seller = {
  id: string;
  name: string;
  specialty: string;
  image_url: string;
  rating: number;
};

type Product = {
  id: string;
  inv_title: string;
  inv_description: string;
  inv_price: number;
  inv_discount: number;
  seller_id: string;
  featured: boolean;
};

// export default async function Seller({ params }: { params: { id: string } }) {
// const { id } = params;
export default async function SellerDashboad() {
  // For simplicity, using a hardcoded ID
  const id = '96f2d901-d2ab-4660-8db7-2cc7b04aea7d';

  const sellerResult = await sql<Seller[]>`
    SELECT id, name, specialty, image_url, rating
    FROM sellers
    WHERE id = ${id}
  `;

  const seller = sellerResult[0];

  if (!seller) {
    return <p className="p-6">Seller not found.</p>;
  }

  const products = await sql<Product[]>`
    SELECT *
    FROM inventory
    WHERE seller_id = ${id}
  `;

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="flex gap-4 items-center mb-6">
        <Image
          src={seller.image_url}
          alt={seller.name}
          width={100}
          height={100}
          className="rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">{seller.name}</h1>
          <p className="text-sm text-gray-500">{seller.specialty}</p>
          <p className="text-sm text-yellow-600">⭐ {seller.rating}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Products by {seller.name}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              id: product.id,
              title: product.inv_title,
              price: product.inv_price,
              imageUrl: '/placeholder.png',
              seller: {
                id: seller.id,
                name: seller.name,
              },
            }}
          />
        ))}
      </div>
      <div className="flex gap-4 mb-8 mt-6">
        <Link href="/dashboard/add">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg border border-gray-200 shadow-md hover:shadow-lg hover:bg-green-700 transition">
            ➕ Add Product
          </button>
        </Link>
        <Link href="/dashboard/products">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg border border-gray-200 shadow-md hover:shadow-lg hover:bg-blue-700 transition">
            ✏️ Edit Product
          </button>
        </Link>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg border border-gray-200 shadow-md hover:shadow-lg hover:bg-red-700 transition">
          ❌ Delete Product
        </button>
      </div>
    </main>
  );
}
