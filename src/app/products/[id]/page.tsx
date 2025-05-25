import { PrismaClient } from "../../../generated/prisma";
import Image from "next/image";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { seller: true },
  });

  if (!product) {
    return <p className="p-6">Product not found.</p>;
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <Image
        src={product.imageUrl}
        alt={product.title}
        width={600}
        height={400}
        className="rounded mb-4"
      />
      <p className="text-green-600 font-semibold text-lg mb-2">
        ${product.price.toFixed(2)}
      </p>
      <p className="text-sm text-gray-600 mb-6">
        Sold by{" "}
        <Link
          href={`/sellers/${product.seller.id}`}
          className="underline text-blue-600 hover:text-blue-800"
        >
          {product.seller.name}
        </Link>
      </p>
      <p className="text-gray-700 text-base">
        This is a handcrafted item with love ♥
      </p>
    </main>
  );
}