'use client';

import { deleteProduct } from '@/app/seed/route';

export default function DeleteProductButton({ id }: { id: string }) {
  const handleDelete = (e: React.FormEvent) => {
    if (!confirm('Be careful! Are you sure you want to delete this product?')) {
      e.preventDefault();
    }
  };

  return (
    <form action={deleteProduct.bind(null, id)} onSubmit={handleDelete}>
      <button
        type="submit"
        className="mt-4 text-red-600 border border-red-600 rounded px-4 py-2 hover:bg-red-50"
      >
        Delete Product
      </button>
    </form>
  );
}
