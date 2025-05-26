import ProductCard from './ProductCard';

type Product = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  seller: {
    id: string;
    name: string;
  };
};

export default function CatalogGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}