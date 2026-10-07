import type { Product } from "@/types/product";
import type {
  DbCategoryRow,
  DbProductGroupRow,
  DbProductWithRelations,
  ProductCategory,
  PublicCategory,
  PublicProductGroup,
} from "@/lib/catalogue/types";

export function mapCategory(row: DbCategoryRow): PublicCategory {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    image: row.hero_image ?? "",
    description: row.description ?? "",
  };
}

export function mapProductGroup(row: DbProductGroupRow): PublicProductGroup {
  return {
    id: row.id,
    categoryId: row.category_id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? "",
    image: row.image ?? "",
    displayOrder: row.display_order,
  };
}

export function mapProductCategory(
  category: DbCategoryRow,
  groups: DbProductGroupRow[]
): ProductCategory {
  return {
    id: category.id,
    title: category.name,
    slug: category.slug,
    heroImage: category.hero_image ?? "",
    description: category.description ?? "",
    groups: groups.map((group) => ({
      id: group.id,
      title: group.name,
      slug: group.slug,
      image: group.image ?? "",
      description: group.description ?? "",
    })),
  };
}

export function mapProduct(row: DbProductWithRelations): Product | null {
  const category = row.categories;
  const group = row.product_groups;

  if (!category || !group) {
    return null;
  }

  if (!row.is_active || !category.is_active || !group.is_active) {
    return null;
  }

  return {
    id: row.id,
    model: row.model ?? undefined,
    name: row.name,
    slug: row.slug,
    category: category.name,
    group: group.name,
    categorySlug: category.slug,
    groupSlug: group.slug,
    image: row.image ?? "",
    gallery: Array.isArray(row.gallery) ? row.gallery : [],
    shortDescription: row.short_description ?? undefined,
    description: row.description ?? undefined,
    features: Array.isArray(row.features) ? row.features : [],
    specifications: Array.isArray(row.specifications)
      ? row.specifications
      : [],
    material: row.material ?? undefined,
    customSizes: row.custom_sizes ?? false,
    warranty: row.warranty ?? undefined,
    origin: row.origin ?? undefined,
    featured: Boolean(row.featured),
    seoTitle: row.seo_title ?? undefined,
    seoDescription: row.seo_description ?? undefined,
  };
}
