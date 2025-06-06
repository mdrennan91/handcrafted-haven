"use client"; 

import FilterSidebar from "@/app/ui/catalog/FilterSidebar";


type Category = { id: string; name: string };
type Seller = { id: string, name: string};


const testCategories: Category[] = [
  { id: "cat1", name: "Pottery" },
  { id: "cat2", name: "Woodwork" },
  { id: "cat3", name: "Textiles" },
  { id: "cat4", name: "Jewelry" },
];

const testSellers: Seller[] = [
  { id: "sel1", name: "June’s Creations" },
  { id: "sel2", name: "Sarah’s Studio" },
  { id: "sel3", name: "Blake’s Workshop" },
];

export default function TestFilterPage() {

  return (
    <main className="flex h-screen bg-gray-50">
      <div className="w-full md:w-64 p-4">
        <FilterSidebar
          categories={testCategories}
          sellers={testSellers}
        />
      </div>
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Product grid placeholder
      </div>
    </main>
  );
}
