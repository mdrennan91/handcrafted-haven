import postgres from "postgres";
import CatalogGrid from "@ui/catalog/CatalogGrid";

const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });

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

  // Get product IDs for fetching average ratings
  const productIds = products.map((product) => product.id);

  let ratingsMap: { [productId: string]: number } = {};
  if (productIds.length > 0) {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}/api/products/average-ratings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productIds }),
        }
      );

      if (response.ok) {
        const averageRatings: { [productId: string]: number } =
          await response.json();
        ratingsMap = averageRatings;
      } else {
        console.error("Failed to fetch average ratings for catalog");
      }
    } catch (error) {
      console.error("Error fetching average ratings for catalog:", error);
    }
  }

  return (
    <main className="p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-6">Catalog</h1>

      <section className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
        <CatalogGrid
          products={products.map((product) => ({
            id: product.id,
            title: product.inv_title,
            price: product.inv_price,
            imageUrl: "/placeholder.png", // Replace when you store real images
            seller: {
              id: product.seller_id,
              name: product.name,
            },
            averageRating: ratingsMap[product.id] || 0, // Add average rating, default to 0
          }))}
        />
      </section>
    </main>
  );
}
