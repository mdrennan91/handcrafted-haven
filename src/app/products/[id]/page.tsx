import postgres from "postgres";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/app/ui/cart/AddToCartButton";
import LeaveReviewButtonAndForm from "@/app/ui/products/LeaveReviewButtonAndForm";
import ReviewList from "@/app/ui/products/ReviewList";

const sql = postgres(process.env.DATABASE_URL!, {
  ssl: "require",
  prepare: false,
});

type ProductWithSeller = {
  id: string;
  inv_title: string;
  inv_description: string;
  inv_price: number;
  inv_discount: number;
  seller_id: string;
  featured: boolean;
  name: string;
};

type Review = {
  id: string;
  inventory_id: string;
  user_id: string | null;
  rating: number;
  comment: string;
  created_at: string;
  name: string | null; // User's name, will be null for unauthenticated reviews
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productResult = await sql<ProductWithSeller[]>`
    SELECT i.*, s.name
    FROM inventory i
    JOIN sellers s ON i.seller_id = s.id
    WHERE i.id = ${id}
  `;

  const product = productResult[0];

  if (!product) {
    return <p className="p-6">Product not found.</p>;
  }

  // Fetch reviews for this product
  const reviewsResult = await sql<Review[]>`
    SELECT r.*
    FROM reviews r
    WHERE r.inventory_id = ${id}
    ORDER BY r.created_at DESC;
  `;

  const reviews = reviewsResult;

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{product.inv_title}</h1>
      <Image
        src="/placeholder.png"
        alt={product.inv_title}
        width={600}
        height={400}
        className="rounded mb-4"
      />
      <p className="text-green-600 font-semibold text-lg mb-2">
        ${(product.inv_price / 100).toFixed(2)}
      </p>
      <p className="text-sm text-gray-600 mb-6">
        Sold by{" "}
        <Link
          href={`/sellers/${product.seller_id}`}
          className="underline text-blue-600 hover:text-blue-800"
        >
          {product.name}
        </Link>
      </p>
      <p className="text-gray-700 text-base">
        This is a handcrafted item with love ♥
      </p>
      <div className="mt-8">
        <AddToCartButton
          product={{
            id: product.id,
            title: product.inv_title,
            price: product.inv_price,
            imageUrl: "/placeholder.png",
            quantity: 1,
          }}
        />
      </div>
      <LeaveReviewButtonAndForm productId={product.id} />
      <ReviewList reviews={reviews} />
    </main>
  );
}
