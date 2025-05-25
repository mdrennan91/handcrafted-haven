import { PrismaClient } from "../../../generated/prisma";
import Image from "next/image";
import ProductCard from "../../components/ProductCard";

const prisma = new PrismaClient();

export default async function SellerProfile({ params }: { params: { id: string } }) {
  const seller = await prisma.seller.findUnique({
    where: { id: params.id },
  });

  if (!seller) {
    return <p className="p-6">Seller not found.</p>;
  }

  const products = await prisma.product.findMany({
    where: { sellerId: params.id },
    include: { seller: true },
  });

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="flex gap-4 items-center mb-6">
        <Image
          src={seller.imageUrl}
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
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}