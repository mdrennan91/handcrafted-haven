import Image from "next/image";
import { lusitana } from "../ui/fonts";
import CatalogGrid from "@ui/catalog/CatalogGrid";
import Link from "next/link";
import postgres from "postgres";
import { Button } from "@ui/button";
import { getAverageRatings } from "@/app/lib/productActions";

const sql = postgres(process.env.DATABASE_URL!, {
  ssl: "require",
  prepare: false,
});

type Product = {
  id: string;
  inv_title: string;
  inv_price: number;
  seller_id: string;
  name: string;
  averageRating?: number;
  image_url: string;
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
    SELECT i.id, i.inv_title, i.inv_price, i.image_url, i.seller_id, s.name
    FROM inventory i
    JOIN sellers s ON i.seller_id = s.id
    LIMIT 4
  `;

  const sellers = await sql<Seller[]>`
    SELECT id, name, specialty, image_url, rating
    FROM sellers
    LIMIT 3
  `;

  // Get product IDs for fetching average ratings
  const productIds = products.map((product) => product.id);

  // Fetch average ratings using the server action
  const ratingsMap = await getAverageRatings(productIds);

  return (
    <main className="bg-[var(--accent1-light)] px-4 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="relative w-full h-[500px] mb-12 overflow-hidden rounded-xl shadow-sm border border-gray-200">
          <Image
            src="/hh-hero-mockup.png"
            alt="Handcrafted Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-[var(--primary)] via-[var(--primary-light)] to-transparent md:w-[50%] flex items-center px-8 md:px-16">
            <div className="text-white space-y-4 max-w-md">
              <h2 className="text-3xl md:text-4xl font-bold leading-snug">
                Explore. Create. Share.
              </h2>
              <p className="text-sm md:text-base">
                Start selling your handmade products today.
              </p>
              <Link href="/catalog">
                <Button
                  type="button"
                  variant="secondary"
                  className="transition-transform duration-200 hover:scale-105"
                >
                  Sign Up Today! &rarr;
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className={`mb-12`}>
          <div className={lusitana.className}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Check out our featured products
            </h2>
          </div>
          
          <CatalogGrid
            products={products.map((p) => ({
              id: p.id,
              title: p.inv_title,
              price: p.inv_price,
              imageUrl: p.image_url || "/placeholder.png",
              seller: {
                id: p.seller_id,
                name: p.name,
              },
              averageRating: ratingsMap[p.id] || 0,
            }))}
          />
          
        </section>

        {/* Featured Sellers */}
        <section className="mb-12">
          <div className={lusitana.className}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet our top-rated sellers
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sellers.map((seller) => (
              <Link
                key={seller.id}
                href={`/sellers/${seller.id}`}
                className="rounded-xl bg-white p-4 shadow-sm hover:shadow-md hover:scale-[1.02] transition border border-gray-200"
              >
                <Image
                  src={seller.image_url}
                  alt={seller.name}
                  width={300}
                  height={200}
                  className="rounded-md object-cover w-full h-40"
                />
                <h3 className="mt-3 text-lg font-semibold text-gray-900">
                  {seller.name}
                </h3>
                <p className="text-sm text-gray-500">{seller.specialty}</p>
                <p className="text-sm text-yellow-600">⭐ {seller.rating}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
