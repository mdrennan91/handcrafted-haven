import postgres from "postgres";
// import Image from 'next/image';
import Link from "next/link";
import ProductCard from "@ui/catalog/ProductCard";
import { notFound } from "next/navigation";

const sql = postgres(process.env.DATABASE_URL!, {
  ssl: "require",
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

// export default async function ProductsPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const { id } = params;
export default async function ProductsPage() {
  // For simplicity, using a hardcoded ID
  const id = "96f2d901-d2ab-4660-8db7-2cc7b04aea7d";

  const sellerResult = await sql<Seller[]>`
    SELECT id, name, specialty, image_url, rating
    FROM sellers
    WHERE id = ${id}
  `;

  const seller = sellerResult[0];

  if (!seller) {
    return notFound();
  }

  const products = await sql<Product[]>`
    SELECT *
    FROM inventory
    WHERE seller_id = ${id}
  `;

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Products by {seller.name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard
              product={{
                id: product.id,
                title: product.inv_title,
                price: product.inv_price,
                imageUrl: "/placeholder.png",
                seller: {
                  id: seller.id,
                  name: seller.name,
                },
              }}
            />
            
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg border border-gray-200 shadow-md hover:shadow-lg hover:bg-blue-700 transition">
                <Link href={`/dashboard/products/${product.id}/edit`}>✏️ Edit Product
                </Link>
              </button>
            
          </div>
        ))}
      </div>
    </main>
  );
}
