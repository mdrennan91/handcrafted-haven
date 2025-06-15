import postgres from "postgres";
import CatalogGrid from "@ui/catalog/CatalogGrid";
import { getAverageRatings } from "@/app/lib/productActions";
import {
  getAllCategories,
  getAllSellers,
  getFilteredProducts,
} from "../lib/filterActions";
import FilterSidebar from "../ui/catalog/FilterSidebar";

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
  image_url: string;
};

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  //  throw new Error('Throw Test Error');
  try {
    const products = await sql<Product[]>`
    SELECT i.*, s.name
    FROM inventory i
    JOIN sellers s ON i.seller_id = s.id
  `;

    // Get product IDs for fetching average ratings
    const productIds = products.map((product) => product.id);
    const filterParams = await searchParams;
    const ratingsMap = await getAverageRatings(productIds);
    const { allCategories } = await getAllCategories();
    const { allSellers } = await getAllSellers();
    const filtered = await getFilteredProducts(filterParams);

    return (
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="col-span-1">
            <FilterSidebar categories={allCategories} sellers={allSellers} />
          </aside>
          <section className="rounded-xl bg-white p-6 shadow-sm border border-gray-200 col-span-1 md:col-span-3">
            <h1 className="text-xl md:text-2xl font-bold mb-6 text-center">
              Catalog
            </h1>
            <CatalogGrid
              products={filtered.map((product) => ({
                id: product.id,
                title: product.inv_title,
                price: product.inv_price,
                imageUrl: product.image_url || "/placeholder.png",
                seller: {
                  id: product.seller_id,
                  name: product.name,
                },
                averageRating: ratingsMap[product.id] || 0, // Add average rating, default to 0
              }))}
            />
          </section>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch data.");
  }
}
