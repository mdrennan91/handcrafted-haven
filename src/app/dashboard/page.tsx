import postgres from "postgres";
import Image from "next/image";
import ProductCard from "@ui/catalog/ProductCard";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "../ui/button";
import { Metadata } from "next";

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
  image_url: string;
  featured: boolean;
};

export const metadata: Metadata = {
  title: 'Dashboard',
};

// export default async function Seller({ params }: { params: Promise<{ id: string }> }) {
// const { id } = await params;
export default async function SellerDashboad() {
  // For simplicity, using a hardcoded ID
  const session = await auth();

  if (!session || !session.user?.id) {
    return <p className="p-6">You must be logged in to view this page.</p>;
  }

  const id = session.user.id;
  // const id= '6356c780-a88e-476f-954a-aa09041f061b'

  let sellerResult;
  try {
    sellerResult = await sql<Seller[]>`
        SELECT id, name, specialty, image_url, rating
        FROM sellers
        WHERE id = ${id}
      `;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch artisan data.");
  }

  const seller = sellerResult[0];

  if (!seller) {
    redirect("/sellers");
  }

  let products;

  try {
    products = await sql<Product[]>`
        SELECT *
        FROM inventory
        WHERE seller_id = ${id}
      `;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product data.");
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
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
              imageUrl: product.image_url || "/placeholder.png",
              seller: {
                id: seller.id,
                name: seller.name,
              },
            }}
          />
        ))}
      </div>
      <div className="flex gap-4 mb-8 mt-6">
        <Button
          url="/dashboard/add"
          className="bg-green-600 text-white px-4 py-2 rounded-lg border border-gray-200 shadow-md hover:shadow-lg hover:bg-green-700 transition"
        >
          ➕ Add Product
        </Button>

        <Button
          url="/dashboard/products"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg border border-gray-200 shadow-md hover:shadow-lg hover:bg-blue-700 transition"
        >
          ✏️ Edit Product
        </Button>
      </div>
    </div>
  );
}
