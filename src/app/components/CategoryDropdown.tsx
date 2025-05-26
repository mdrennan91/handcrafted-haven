'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const categories = [
  'All Categories',
  'Ceramics',
  'Textiles',
  'Decor',
  'Jewelry',
  'Art',
  'Woodwork',
  'Glass',
];

export default function CategoryDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(categories[0]);

  function handleSelect(category: string) {
    setSelected(category);
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center whitespace-nowrap bg-[var(--secondary)] text-black font-medium rounded-full px-4 py-2 text-sm shadow-sm hover:bg-[var(--secondary-light)] transition"
      >
        {selected}
        <ChevronDown className="ml-2 w-4 h-4" />
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-md text-sm overflow-hidden ring-1 ring-black ring-opacity-5">
          {categories.map((cat) => (
            <li
              key={cat}
              onClick={() => handleSelect(cat)}
              className="cursor-pointer px-4 py-2 hover:bg-[var(--secondary-light)] hover:text-black transition"
            >
              {cat}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}