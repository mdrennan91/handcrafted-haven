import Image from 'next/image';
import { lusitana } from '../ui/fonts';
import CatalogGrid from '@ui/catalog/CatalogGrid';
import Link from 'next/link';
import postgres from 'postgres';
import { Button } from '@ui/button';


const sql = postgres(process.env.DATABASE_URL!, {
  ssl: 'require',
  prepare: false,
});

type Product = {
  id: string;
  inv_title: string;
  inv_price: number;
  seller_id: string;
  name: string;
};

type Seller = {
  id: string;
  name: string;
  specialty: string;
  image_url: string;
  rating: number;
};

export default async function Content() {
  const products = await sql<Product[]>`
    SELECT i.id, i.inv_title, i.inv_price, i.seller_id, s.name
    FROM inventory i
    JOIN sellers s ON i.seller_id = s.id
    LIMIT 4
  `;

  const sellers = await sql<Seller[]>`
    SELECT id, name, specialty, image_url, rating
    FROM sellers
    LIMIT 3
  `;

  return (
    <main className="bg-[var(--accent1-light)] px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <h1 className={`${lusitana.className} text-center text-2xl md:text-3xl font-bold mb-2`}>
          Welcome to Our Team 08 Project
        </h1>
        <p className="text-center mb-10 text-sm md:text-base">
          This is the landing page. More to come soon!
        </p>

        {/* Featured Products */}
        <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-12">
          <h2 className="text-xl font-bold mb-6 text-center">Featured Products</h2>
          <div className="flex justify-center">
            <CatalogGrid
              products={products.map((p) => ({
                id: p.id,
                title: p.inv_title,
                price: p.inv_price,
                imageUrl: '/placeholder.png',
                seller: {
                  id: p.seller_id,
                  name: p.name,
                },
              }))}
            />
          </div>
          <div className="text-center mt-4">
            <Link href="/catalog">
              <Button>View Full Catalog &rarr;</Button>
            </Link>
          </div>
        </section>

        {/* Featured Sellers */}
        <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-12">
          <h2 className="text-xl font-bold mb-6 text-center">Featured Sellers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sellers.map((seller) => (
              <Link
                key={seller.id}
                href={`/sellers/${seller.id}`}
                className="block rounded-lg bg-gray-50 border p-4 hover:shadow-md transition"
              >
                <Image
                  src={seller.image_url}
                  alt={seller.name}
                  width={300}
                  height={200}
                  className="rounded-md object-cover w-full h-40"
                />
                <h3 className="mt-3 text-lg font-semibold text-gray-900">{seller.name}</h3>
                <p className="text-sm text-gray-500">{seller.specialty}</p>
                <p className="text-sm text-yellow-600">⭐ {seller.rating}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/sellers">
              <Button>View All Sellers &rarr;</Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}