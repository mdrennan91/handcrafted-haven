"use server";

import { getProductById, updateProduct } from "@/app/lib/productActions";
import DeleteProductButton from "./DeleteProductButton";

export default async function EditProduct({ id }: { id: string }) {
  const product = await getProductById(id);

  if (!product) {
    return <p className="p-6 text-red-500">Product not found.</p>;
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <form action={updateProduct.bind(null, id)} className="space-y-4">
        <div>
          <label
            htmlFor="inv_title"
            className="block text-sm font-medium text-gray-700"
          >
            Product Title
          </label>
          <input
            type="text"
            id="inv_title"
            name="inv_title"
            defaultValue={product.inv_title}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="inv_description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="inv_description"
            name="inv_description"
            rows={4}
            defaultValue={product.inv_description}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="inv_price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="inv_price"
            name="inv_price"
            defaultValue={product.inv_price}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="inv_discount"
            className="block text-sm font-medium text-gray-700"
          >
            Discount (%)
          </label>
          <input
            type="number"
            id="inv_discount"
            name="inv_discount"
            defaultValue={product.inv_discount}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="image_url"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            type="url"
            id="image_url"
            name="image_url"
            defaultValue={product.image_url}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="featured"
            className="inline-flex items-center text-sm font-medium text-gray-700"
          >
            <input
              type="checkbox"
              id="featured"
              name="featured"
              defaultChecked={product.featured}
              className="mr-2"
            />
            Featured
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Update Product
        </button>
      </form>
      <DeleteProductButton id={id} />
    </main>
  );
}
