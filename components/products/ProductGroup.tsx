import { Product } from "@/types/product";
import ProductItem from "./ProductItem";

interface ProductGroupProps {
  title: string;
  products: Product[];
  onProductClick: (product: Product) => void;
  onProductHover: (image: string) => void;
  onProductLeave: () => void;
  onMouseMove: (pos: { x: number; y: number }) => void;
}
export default function ProductGroup({
  title,
  products,
  onProductClick,
  onProductHover,
  onProductLeave,
  onMouseMove,
}: ProductGroupProps){
  if (!products.length) return null;

  return (
    <section className="mb-20">

      {/* Group Heading */}

      <div className="mb-8">

        <h3 className="text-3xl font-semibold text-slate-900">
          {title}
        </h3>

        <div className="mt-4 h-px w-20 bg-red-600" />

      </div>

      {/* Products */}

      <div className="space-y-1">

        {products.map((product) => (

<ProductItem
  key={product.id}
  product={product}
  onClick={() => onProductClick(product)}
  onHover={() => onProductHover(product.image)}
  onLeave={onProductLeave}
  onMouseMove={onMouseMove}
/>

        ))}

      </div>

    </section>
  );
}