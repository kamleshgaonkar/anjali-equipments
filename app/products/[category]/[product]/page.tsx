import { notFound } from "next/navigation";

import {
  getCategory,
  getProduct,
  getRelatedProducts,
} from "@/lib/products";

import ProductBreadcrumb from "@/components/products/ProductBreadcrumb";
import ProductGallery from "@/components/products/ProductGallery";
import ProductFeatures from "@/components/products/ProductFeatures";
import ProductSpecifications from "@/components/products/ProductSpecifications";
import RelatedProducts from "@/components/products/RelatedProducts";
import ProductCTA from "@/components/products/ProductCTA";

type Props = {
  params: Promise<{
    category: string;
    product: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { category: categorySlug, product: productSlug } = await params;

  const category = getCategory(categorySlug);

  if (!category) {
    notFound();
  }

  const product = getProduct(categorySlug, productSlug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(
    categorySlug,
    product.id
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <ProductBreadcrumb
        categoryName={category.name}
        categorySlug={categorySlug}
        productName={product.name}
      />

<div className="grid items-start gap-16 xl:grid-cols-[minmax(0,650px)_1fr]">
<div className="w-full max-w-[650px]">
  <ProductGallery
    name={product.name}
    image={product.image}
    gallery={product.gallery}
  />
</div>

        <div>
          <p className="mb-4 inline-flex rounded-full bg-red-50 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-red-700">
            {category.name}
          </p>

          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            {product.name}
          </h1>

          <p className="mt-8 text-lg leading-8 text-slate-600">
            {product.description}
          </p>

          <ProductFeatures
            features={product.features}
          />

          <ProductSpecifications
            specifications={product.specifications}
          />
        </div>
      </div>

      <RelatedProducts
        products={relatedProducts}
      />

      <ProductCTA />
    </main>
  );
}