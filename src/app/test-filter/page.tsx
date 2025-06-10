import FilterSidebar from "@/app/ui/catalog/FilterSidebar";
import { Suspense } from "react";
import { getAllCategories, getAllSellers } from "../lib/filterActions";

// type Category = { category_id: string; category_name: string };
// type Seller = { id: string, name: string};


// const testCategories: Category[] = [
//   { category_id: "cat1", category_name: "Pottery" },
//   { category_id: "cat2", category_name: "Woodwork" },
//   { category_id: "cat3", category_name: "Textiles" },
//   { category_id: "cat4", category_name: "Jewelry" },
// ];

// const testSellers: Seller[] = [
//   { id: "sel1", name: "June’s Creations" },
//   { id: "sel2", name: "Sarah’s Studio" },
//   { id: "sel3", name: "Blake’s Workshop" },
// ];

const { allCategories } = await getAllCategories();
console.log("allCategories", allCategories);
const { allSellers } = await getAllSellers();
console.log("allSellers: ", allSellers);

export default function TestFilterPage() {

  return (
    <main className="flex h-screen bg-gray-50">
      <div className="w-full md:w-64 p-4">
        <Suspense>
        <FilterSidebar
          categories={allCategories}
          sellers={allSellers}
        />
        </Suspense>
      </div>
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Product grid placeholder
      </div>
    </main>
  );
}
