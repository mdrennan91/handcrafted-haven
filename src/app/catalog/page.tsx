import postgres from 'postgres';
import CatalogGrid from '@ui/catalog/CatalogGrid';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

type Product = {
  id: string;
  inv_title: string;
  inv_description: string;
  inv_price: number;
  inv_discount: number;
  seller_id: string;
  featured: boolean;
  name: string; // seller name
};

export default async function CatalogPage() {
  const products = await sql<Product[]>`
    SELECT i.*, s.name
    FROM inventory i
    JOIN sellers s ON i.seller_id = s.id
  `;

  return (
    <main className="p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-6">Catalog</h1>

      <section className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
        <CatalogGrid
          products={products.map((product) => ({
            id: product.id,
            title: product.inv_title,
            price: product.inv_price,
            imageUrl: '/placeholder.png', // Replace when you store real images
            seller: {
              id: product.seller_id,
              name: product.name,
            },
          }))}
        />
      </section>
    </main>
  );
}
