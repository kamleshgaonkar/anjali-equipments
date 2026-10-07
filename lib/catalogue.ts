import type { Product } from "@/types/product";
import {
  buildCategorySubcategoriesFromDb,
  fetchCatalogCategory,
} from "@/lib/catalogue/queries";
import type {
  CatalogueSubcategory,
  ProductCategory,
} from "@/lib/catalogue/types";

export type { CatalogueSubcategory, ProductCategory };

export function toCatalogueSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function getCatalogCategory(
  categorySlug: string
): Promise<ProductCategory | null> {
  return fetchCatalogCategory(categorySlug);
}

export async function buildCategorySubcategories(
  categorySlugOrCategory: string | ProductCategory
): Promise<CatalogueSubcategory[]> {
  const categorySlug =
    typeof categorySlugOrCategory === "string"
      ? categorySlugOrCategory
      : categorySlugOrCategory.slug;

  const subcategories = await buildCategorySubcategoriesFromDb(categorySlug);
  return subcategories ?? [];
}

/** Prefer explicit slugs from Supabase-mapped products. */
export function getProductHref(product: Product) {
  const categorySlug =
    product.categorySlug ?? toCatalogueSlug(product.category);
  const groupSlug = product.groupSlug ?? toCatalogueSlug(product.group);

  return `/products/${categorySlug}/${groupSlug}/${product.slug}`;
}
