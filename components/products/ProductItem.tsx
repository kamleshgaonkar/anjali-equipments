  import { ArrowUpRight } from "lucide-react";
  import { Product } from "@/types/product";

  interface ProductItemProps {
    product: Product;
    onClick: () => void;
    onHover: () => void;
    onLeave: () => void;
    onMouseMove: (pos: { x: number; y: number }) => void;
  }

  export default function ProductItem({
    product,
    onClick,
    onHover,
    onLeave,
    onMouseMove,
  }: ProductItemProps) {
    return (
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onMouseMove={(e) =>
          onMouseMove({
            x: e.clientX,
            y: e.clientY,
          })
        }
        className="group flex w-full cursor-pointer items-center justify-between border-b border-slate-200 py-4 text-left transition-colors hover:border-red-600"
      >
        <div className="flex items-center gap-3">
          {/* Red Dot */}
          <span className="h-2 w-2 rounded-full bg-red-600 transition-transform duration-300 group-hover:scale-125" />

          {/* Product Name */}
          <span className="text-lg text-slate-800 transition-colors duration-300 group-hover:text-red-700">
            {product.name}
          </span>
        </div>

        {/* Arrow */}
        <ArrowUpRight
          size={18}
          className="text-slate-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-red-700"
        />
      </button>
    );
  }