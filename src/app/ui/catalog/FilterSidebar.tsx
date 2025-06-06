"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Transition } from '@headlessui/react';
import { X, Filter as FilterIcon } from 'lucide-react';
import clsx from 'clsx';

type Category = { id: string; name: string };
type Seller = { id: string, name: string};

//function FilterSibebar excepts props: categories & sellers
export default function FilterSidebar({
    categories,
    sellers,    
}: {
    categories: Category[];
    sellers: Seller[];    
}) {
        const { replace } = useRouter();
        const searchParams = useSearchParams();
        const pathname = usePathname();
        const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
        const [selectedSellers, setSelectedSellers] = useState<string[]>([]);
        const [selectedPrice, setSelectedPrice] = useState<string>("");  //only one price range at a time
        //for mobile: do we have the filter panel open or closed?
        const [mobileOpen, setMobileOpen] = useState(false);

        //whenever the URL changes, sync our local state from searchParams
        useEffect(()=>{
            const cats = searchParams.getAll("categories");
            const sells = searchParams.getAll("sellers");
            const price = searchParams.get("price") || "";

            setSelectedCategories(cats || []);
            setSelectedSellers(sells || []);
            setSelectedPrice(price);
        }, [searchParams]);


        function updateURL(params: {
            categories: string[];
            sellers: string[];
            price: string;
        }) {
            const newParams = new URLSearchParams(searchParams.toString());
            
            //replace old categories, then append new ones
            newParams.delete("categories");
            for (const catId of params.categories) {
                newParams.append("categories", catId);
            }

            newParams.delete("sellers");
            for (const sellerId of params.sellers) {
                newParams.append("selelrs", sellerId)
            }

            newParams.delete("price");
            if (params.price) {
                newParams.set("price", params.price);
            }

            //set new url params
            replace(`${pathname}?${newParams.toString()}`);
        }




        //whenever someone clicks on a category
        function toggleCategory(id: string) {
            const isSelected = selectedCategories.includes(id);
            let newCats:string[];
            if(isSelected) {
                newCats = selectedCategories.filter((category) => category!==id);            
            } else {
                newCats = [...selectedCategories, id];

            }
            setSelectedCategories(newCats);
            updateURL({categories: newCats, sellers: selectedSellers, price: selectedPrice });
        }

        //whenever someone clicks on a seller, update seller info in URL
        function toggleSeller(id: string) {
            const isSelected = selectedSellers.includes(id);
            let newSells:string[];
            if(isSelected) {
                newSells = selectedSellers.filter((category) => category!==id);            
            } else {
                newSells = [...selectedSellers, id];
            }
            setSelectedSellers(newSells);
            updateURL({categories: selectedCategories, sellers: newSells, price: selectedPrice });
        }

        function setPriceRange(val: string) {
            setSelectedPrice(val);
            updateURL({categories: selectedCategories, sellers: selectedSellers, price: val});
        }

        return (
            <>
            {/** MOBILE “Filter” button */}
            <div className="md:hidden mb-4">
                <button
                className="flex items-center px-4 py-2 bg-[var(--primary)] text-white rounded-md"
                onClick={() => setMobileOpen(true)}
                >
                <FilterIcon className="w-5 h-5 mr-2" />
                Filter
                </button>
            </div>

            {/** DESKTOP SIDEBAR (hidden on mobile) */}
            <aside className="hidden md:block w-64 flex-shrink-0">
                <div className="sticky top-6 space-y-6 rounded-lg bg-white border border-gray-200 p-4">
                {/** -- Categories Section -- */}
                <h3 className="font-semibold mb-2">Categories</h3>
                <div className="space-y-1 max-h-48 overflow-auto">
                    {/**Build categories list */}
                    {categories.map((cat) => (
                    <label
                        key={cat.id}
                        className={clsx(
                        "flex items-center space-x-2 cursor-pointer",
                        selectedCategories.includes(cat.id) && "font-medium text-[var(--primary)]"
                        )}
                    >
                        <input
                        type="checkbox"
                        value={cat.id}
                        checked={selectedCategories.includes(cat.id)}
                        onChange={() => toggleCategory(cat.id)}
                        className="form-checkbox h-4 w-4 text-[var(--primary)]"
                        />
                        <span>{cat.name}</span>
                    </label>
                    ))}
                </div>

                <hr />

                {/** -- Sellers Section -- */}
                <h3 className="font-semibold mb-2">Sellers</h3>
                <div className="space-y-1 max-h-48 overflow-auto">
                    {/**Build sellers list */}
                    {sellers.map((sel) => (
                    <label
                        key={sel.id}
                        className={clsx(
                        "flex items-center space-x-2 cursor-pointer",
                        selectedSellers.includes(sel.id) && "font-medium text-[var(--primary)]"
                        )}
                    >
                        <input
                        type="checkbox"
                        value={sel.id}
                        checked={selectedSellers.includes(sel.id)}
                        onChange={() => toggleSeller(sel.id)}
                        className="form-checkbox h-4 w-4 text-[var(--primary)]"
                        />
                        <span>{sel.name}</span>
                    </label>
                    ))}
                </div>

                <hr />

                {/** -- Price Section (radio buttons) -- */}
                <h3 className="font-semibold mb-2">Price</h3>
                <div className="space-y-1">
                    {[
                    { label: "Under $25",   value: "under-25" },
                    { label: "$25 - $74.99", value: "25-75" },
                    { label: "$75 - $150",   value: "75-150" },
                    { label: "Above $150",   value: "above-150" },
                    ].map((opt) => (
                    <label
                        key={opt.value}
                        className={clsx(
                        "flex items-center space-x-2 cursor-pointer",
                        selectedPrice === opt.value && "font-medium text-[var(--primary)]"
                        )}
                    >
                        <input
                        type="radio"
                        name="price"
                        value={opt.value}
                        checked={selectedPrice === opt.value}
                        onChange={() => setPriceRange(opt.value)}
                        className="form-radio h-4 w-4 text-[var(--primary)]"
                        />
                        <span>{opt.label}</span>
                    </label>
                    ))}
                </div>
                </div>
            </aside>

            {/** MOBILE SLIDE‐OVER FILTER (only visible if mobileOpen = true) */}
            <Transition
                show={mobileOpen}
                as="div"
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-4"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-4"
                className="fixed inset-0 z-40 flex"
            >
                <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
                <div className="relative ml-auto w-3/4 max-w-xs bg-white shadow-xl">
                <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
                    <h3 className="text-lg font-semibold">Filter</h3>
                    <button
                    onClick={() => setMobileOpen(false)}
                    className="p-1 text-gray-500 hover:text-gray-700"
                    >
                    <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-4 space-y-6 overflow-y-auto h-full">
                    {/** Categories section */}
                    <div>
                    <h4 className="font-medium mb-2">Categories</h4>
                    <div className="space-y-1 max-h-40 overflow-auto">
                        {categories.map((cat) => (
                        <label
                            key={cat.id}
                            className={clsx(
                            "flex items-center space-x-2 cursor-pointer",
                            selectedCategories.includes(cat.id) && "font-medium text-[var(--primary)]"
                            )}
                        >
                            <input
                            type="checkbox"
                            value={cat.id}
                            checked={selectedCategories.includes(cat.id)}
                            onChange={() => toggleCategory(cat.id)}
                            className="form-checkbox h-4 w-4 text-[var(--primary)]"
                            />
                            <span>{cat.name}</span>
                        </label>
                        ))}
                    </div>
                    </div>

                    {/** Sellers section */}
                    <div>
                    <h4 className="font-medium mb-2">Sellers</h4>
                    <div className="space-y-1 max-h-40 overflow-auto">
                        {sellers.map((sel) => (
                        <label
                            key={sel.id}
                            className={clsx(
                            "flex items-center space-x-2 cursor-pointer",
                            selectedSellers.includes(sel.id) && "font-medium text-[var(--primary)]"
                            )}
                        >
                            <input
                            type="checkbox"
                            value={sel.id}
                            checked={selectedSellers.includes(sel.id)}
                            onChange={() => toggleSeller(sel.id)}
                            className="form-checkbox h-4 w-4 text-[var(--primary)]"
                            />
                            <span>{sel.name}</span>
                        </label>
                        ))}
                    </div>
                    </div>

                    {/** Price list */}
                    <div>
                    <h4 className="font-medium mb-2">Price</h4>
                    <div className="space-y-1">
                        {[
                        { label: "Under $25",    value: "under-25" },
                        { label: "$25 - $74.99", value: "25-75" },
                        { label: "$75 - $150",   value: "75-150" },
                        { label: "Above $150",   value: "above-150" },
                        ].map((opt) => (
                        <label
                            key={opt.value}
                            className={clsx(
                            "flex items-center space-x-2 cursor-pointer",
                            selectedPrice === opt.value && "font-medium text-[var(--primary)]"
                            )}
                        >
                            <input
                            type="radio"
                            name="price"
                            value={opt.value}
                            checked={selectedPrice === opt.value}
                            onChange={() => setPriceRange(opt.value)}
                            className="form-radio h-4 w-4 text-[var(--primary)]"
                            />
                            <span>{opt.label}</span>
                        </label>
                        ))}
                    </div>
                    </div>
                </div>
                </div>
            </Transition>
            </>
        );

 


    }