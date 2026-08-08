import { notFound } from "next/navigation";

import {
  getProduct,
  getRelatedProducts,
} from "@/lib/products";

import ProductGallery from "@/components/products/ProductGallery";
import ProductInfo from "@/components/products/ProductInfo";
import ProductFeatures from "@/components/products/ProductFeatures";
import ProductSpecifications from "@/components/products/ProductSpecifications";
import RelatedProducts from "@/components/products/RelatedProducts";
import CTA from "@/components/sections/CTA";
import PageHero from "@/components/layout/PageHero";
import ProductOverview from "@/components/products/ProductOverview";

type Props = {
  params: Promise<{
    category: string;
    group: string;
    product: string;
  }>;
};

export default async function ProductPage({
  params,
}: Props) {
  const { category, product } = await params;

  const currentProduct = getProduct(category, product);

  if (!currentProduct) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(
    category,
    currentProduct.id
  );
 
  return (
    <>
  <PageHero
    eyebrow={currentProduct.model}
    title={currentProduct.name}
    background={currentProduct.image}
  />

  <main className="bg-white">

    {/* Product Overview */}
    <section className="container-custom py-16">

      <div className="grid gap-16 lg:grid-cols-2">

        <ProductGallery
          name={currentProduct.name}
          image={currentProduct.image}
          gallery={currentProduct.gallery}
        />

        <ProductInfo product={currentProduct} />

      </div>

    </section>

    {/* Product Overview */}
<section className="container-custom border-t border-slate-200 py-12">
  <ProductOverview
    description={currentProduct.description}
  />
</section>

    {/* Features */}
    <section className="container-custom py-12 border-t border-slate-200">
      <ProductFeatures
        features={currentProduct.features ?? []}
      />
    </section>

    {/* Specifications */}
    <section className="container-custom py-12 border-t border-slate-200">
      <ProductSpecifications
        specifications={currentProduct.specifications ?? []}
      />
    </section>

    {/* Related Products */}
    <section className="container-custom py-16 border-t border-slate-200">
      <RelatedProducts
        products={relatedProducts}
        currentCategory={category}
      />
    </section>

  </main>

  <CTA />
</>
  );
}