import { PrismaClient } from "../../generated/prisma";
import CatalogGrid from "../components/CatalogGrid";

const prisma = new PrismaClient();

export default async function CatalogPage() {
  const products = await prisma.product.findMany({
    include: { seller: true },
  });

  return (
    <main className="p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-6">Catalog</h1>

      <section className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
        <CatalogGrid products={products} />
      </section>
    </main>
  );
}