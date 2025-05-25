import { PrismaClient } from "../../generated/prisma";
import Link from "next/link";
import Image from "next/image";

const prisma = new PrismaClient();

export default async function SellersPage() {
  const sellers = await prisma.seller.findMany();

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">All Sellers</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sellers.map((seller) => (
          <Link
            key={seller.id}
            href={`/sellers/${seller.id}`}
            className="block rounded-lg bg-gray-50 border p-4 hover:shadow-md transition"
          >
            <Image
              src={seller.imageUrl}
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
    </main>
  );
}