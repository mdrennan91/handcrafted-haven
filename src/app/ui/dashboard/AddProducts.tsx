import { addProduct } from "@/app/lib/productActions";

export default function AddProducts() {
  const sellerId = "96f2d901-d2ab-4660-8db7-2cc7b04aea7d";

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <form action={addProduct} className="space-y-4">
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
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          ></textarea>
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
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="inv_discount"
            className="block text-sm font-medium text-gray-700"
          >
            Discount (%) (optional)
          </label>
          <input
            type="number"
            id="inv_discount"
            name="inv_discount"
            min={0}
            max={100}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
            type="text"
            id="image_url"
            name="image_url"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="https://example.com/image.jpg"
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
              className="mr-2"
            />
            Featured
          </label>
        </div>
        {/* If seller_id is fixed, use a hidden input. Otherwise, use a select. */}
        <input type="hidden" name="seller_id" value={sellerId} />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
