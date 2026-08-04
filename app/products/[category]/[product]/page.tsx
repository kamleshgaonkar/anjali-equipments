import { notFound } from "next/navigation";

import {
  getCategory,
  getProduct,
  getRelatedProducts,
} from "@/lib/products";

import ProductGallery from "@/components/products/ProductGallery";
import ProductFeatures from "@/components/products/ProductFeatures";
import ProductSpecifications from "@/components/products/ProductSpecifications";
import RelatedProducts from "@/components/products/RelatedProducts";
import PageHero from "@/components/layout/PageHero";
import CTA from "@/components/sections/CTA";

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
<section>
{/* Hero */}  
       
     <PageHero
     eyebrow={category.name}
     title={product.name}
     description={product.description}
     background="/hero/hero.jpg"
   />


    <main className="mx-auto max-w-7xl px-6 py-20">
   

<div className="grid items-start gap-16 xl:grid-cols-[minmax(0,650px)_1fr]">
<div className="w-full max-w-[650px]">
  <ProductGallery
    name={product.name}
    image={product.image}
    gallery={product.gallery}
  />
</div>

        <div>            
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


    
      </main>
      <CTA />
    </section>
  );
}