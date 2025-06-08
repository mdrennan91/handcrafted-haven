import { notFound } from 'next/navigation';
import postgres from 'postgres';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Seller',
};

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

async function getSeller(id: string) {
  const result = await sql`
    SELECT name, image_url, specialty, rating, about
    FROM sellers
    WHERE id = ${id}
  `;
  return result[0];
}

export default async function SellerAboutPage({
  params,
}: {
  params: { id: string };
}) {
  const seller = await getSeller(params.id);

  if (!seller) return notFound();

  return (
    <main className="p-6 max-w-4xl mx-auto">
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
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-4">About {seller.name}</h1>
        <p className="text-gray-700">{seller.about}</p>
      </div>
    </main>
  );
}
