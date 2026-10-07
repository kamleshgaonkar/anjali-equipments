import type { Product } from "@/types/product";
import type { PublicCategory } from "@/lib/catalogue/types";
import {
  fetchActiveCategories,
  fetchActiveCategoryBySlug,
  fetchActiveProductByCategoryAndSlug,
  fetchActiveProductById,
  fetchActiveProductByRoute,
  fetchActiveProducts,
  fetchActiveProductsByCategoryAndGroup,
  fetchActiveProductsByCategorySlug,
  fetchFeaturedProducts,
  fetchRelatedProducts,
  getGroupedProductsByCategorySlug,
  searchActiveProducts,
} from "@/lib/catalogue/queries";

export type { PublicCategory };

export async function getAllCategories(): Promise<PublicCategory[]> {
  return fetchActiveCategories();
}

export async function getCategory(
  slug: string
): Promise<PublicCategory | null> {
  return fetchActiveCategoryBySlug(slug);
}

export async function getAllProducts(): Promise<Product[]> {
  return fetchActiveProducts();
}

export async function getProductById(id: string): Promise<Product | null> {
  return fetchActiveProductById(id);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return fetchFeaturedProducts();
}

export async function getProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  return fetchActiveProductsByCategorySlug(categorySlug);
}

export async function getProductsByCategoryAndGroup(
  categorySlug: string,
  groupSlug: string
): Promise<Product[]> {
  return fetchActiveProductsByCategoryAndGroup(categorySlug, groupSlug);
}

/**
 * Resolve a product for a public route.
 * Prefer category + group + product when group is provided.
 */
export async function getProduct(
  categorySlug: string,
  productSlug: string,
  groupSlug?: string
): Promise<Product | null> {
  if (groupSlug) {
    return fetchActiveProductByRoute(categorySlug, groupSlug, productSlug);
  }

  return fetchActiveProductByCategoryAndSlug(categorySlug, productSlug);
}

export async function getRelatedProducts(
  categorySlug: string,
  currentProductId: string,
  groupSlug?: string
): Promise<Product[]> {
  return fetchRelatedProducts(categorySlug, currentProductId, {
    groupSlug,
    limit: 4,
  });
}

export async function getGroupedProductsByCategory(
  categorySlug: string
): Promise<Record<string, Product[]>> {
  return getGroupedProductsByCategorySlug(categorySlug);
}

export async function searchProducts(search: string): Promise<Product[]> {
  return searchActiveProducts(search);
}
