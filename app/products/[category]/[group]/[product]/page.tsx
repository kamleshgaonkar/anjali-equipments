import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProduct, getRelatedProducts } from "@/lib/products";
import {
  buildCategorySubcategories,
  getCatalogCategory,
} from "@/lib/catalogue";

import {
  HeaderOffsetSpacer,
  StickyBreadcrumbBar,
} from "@/components/layout/StickyBreadcrumbBar";
import ProductCatalogueSidebar from "@/components/products/ProductCatalogueSidebar";
import ProductGallery from "@/components/products/ProductGallery";
import ProductInfo from "@/components/products/ProductInfo";
import ProductFeatures from "@/components/products/ProductFeatures";
import ProductSpecifications from "@/components/products/ProductSpecifications";
import RelatedProducts from "@/components/products/RelatedProducts";
import ProductOverview from "@/components/products/ProductOverview";
import CTA from "@/components/sections/CTA";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    category: string;
    group: string;
    product: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, group, product } = await params;
  const currentProduct = await getProduct(category, product, group);

  if (!currentProduct) {
    return {
      title: "Product Not Found | Anjali Equipments",
    };
  }

  return {
    title:
      currentProduct.seoTitle ||
      `${currentProduct.name} | Anjali Equipments`,
    description:
      currentProduct.seoDescription ||
      currentProduct.shortDescription ||
      currentProduct.description ||
      undefined,
  };
}

export default async function ProductPage({ params }: Props) {
  const { category, group, product } = await params;

  const currentProduct = await getProduct(category, product, group);

  if (!currentProduct) {
    notFound();
  }

  const [catalogCategory, subcategories, relatedProducts] = await Promise.all([
    getCatalogCategory(category),
    buildCategorySubcategories(category),
    getRelatedProducts(category, currentProduct.id, group),
  ]);

  if (!catalogCategory) {
    notFound();
  }

  return (
    <>
      <HeaderOffsetSpacer />
      <StickyBreadcrumbBar />

      <main className="bg-white">
        <div className="container-custom py-10 md:py-12 lg:py-14">
          {/* Sidebar + product information (sidebar only >= 1440px) */}
          <div className="min-[1440px]:grid min-[1440px]:grid-cols-[250px_minmax(0,1fr)] min-[1440px]:gap-10">
            <aside className="hidden min-[1440px]:block">
              <ProductCatalogueSidebar
                categoryTitle={catalogCategory.title}
                categorySlug={catalogCategory.slug}
                groups={subcategories}
                activeGroupSlug={group}
                activeProductSlug={product}
              />
            </aside>

            <div className="min-w-0 space-y-12 md:space-y-14">
              <section className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
                <ProductGallery
                  name={currentProduct.name}
                  image={currentProduct.image}
                  gallery={currentProduct.gallery}
                />

                <ProductInfo product={currentProduct} />
              </section>

              <ProductOverview description={currentProduct.description} />

              <ProductFeatures features={currentProduct.features ?? []} />

              <ProductSpecifications
                specifications={currentProduct.specifications ?? []}
              />
            </div>
          </div>

          {/* Related Products — full container width, no sidebar */}
          <RelatedProducts products={relatedProducts} />
        </div>
      </main>

      <CTA />
    </>
  );
}
