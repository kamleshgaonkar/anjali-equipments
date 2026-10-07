import {
  getAllCategories,
  getAllProducts,
} from "@/lib/products";
import ProductsPageClient from "@/components/products/ProductsPageClient";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const [categories, products] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
  ]);

  const productCounts: Record<string, number> = {};
  const searchableProducts = products.map((product) => {
    const categorySlug = product.categorySlug ?? "";
    if (categorySlug) {
      productCounts[categorySlug] = (productCounts[categorySlug] ?? 0) + 1;
    }

    return {
      ...product,
      categoryName: product.category,
      categorySlug,
    };
  });

  return (
    <ProductsPageClient
      categories={categories}
      products={searchableProducts}
      productCounts={productCounts}
    />
  );
}
