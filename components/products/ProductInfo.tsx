import { BadgeCheck, MessageCircle } from "lucide-react";
import { Product } from "@/types/product";
import QuoteButton from "@/components/quote/QuoteButton";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({
  product,
}: ProductInfoProps) {
  return (
    <div>
      {/* Category */}
      <span className="inline-flex rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-700">
        {product.group}
      </span>

      {/* Product Name */}
      <h1 className="mt-6 text-4xl font-bold text-slate-900">
        {product.name}
      </h1>
      
{/* Model */}
<div className="mt-4 flex items-center gap-3 text-slate-600">
  <span className="font-semibold">
    Model:
  </span>

  <span>
    {product.model}
  </span>
</div>

{/* Short Description */}
{product.shortDescription && (
  <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
    {product.shortDescription}
  </p>
)}

      {/* Manufacturer Badge */}
      <div className="mt-6 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-4">
        <BadgeCheck
          size={22}
          className="shrink-0 text-green-600"
        />

        <div>
          <p className="font-semibold text-slate-900">
            Manufactured by Anjali Equipments
          </p>

          <p className="text-sm text-slate-600">
            Premium Commercial Kitchen Equipment
          </p>
        </div>
      </div>

    {/* Material, Warranty & Custom Size */}
<div className="mt-8 grid grid-cols-3 gap-6">

<div>
  <p className="text-sm uppercase tracking-wide text-slate-500">
    Material
  </p>

  <p className="mt-2 font-semibold text-slate-900">
    {product.material}
  </p>
</div>

<div>
  <p className="text-sm uppercase tracking-wide text-slate-500">
    Warranty
  </p>

  <p className="mt-2 font-semibold text-slate-900">
    {product.warranty}
  </p>
</div>

<div>
  <p className="text-sm uppercase tracking-wide text-slate-500">
    Custom Size
  </p>

  <p className="mt-2 font-semibold text-slate-900">
    {product.customSizes ? "Available" : "Not Available"}
  </p>
</div>

</div>

{/* Quote + WhatsApp */}
<div className="mt-10 flex flex-wrap gap-4">

  <QuoteButton product={product} />

  <a
    href={`https://wa.me/918657003003?text=${encodeURIComponent(
      `Hello Anjali Equipments,

I am interested in:

Product: ${product.name}
Model: ${product.model}

Please share the price and further details.

Thank you.`
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-500 bg-white px-7 py-4 font-semibold text-green-700 transition-all duration-300 hover:bg-green-50"
  >
    <MessageCircle size={20} />
    Get Best Price
  </a>

</div>

    </div>
  );
}