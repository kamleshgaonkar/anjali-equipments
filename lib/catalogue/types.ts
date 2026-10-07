import type { Product } from "@/types/product";

/** Public category shape used by /products and related UI. */
export type PublicCategory = {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
};

export type NavCatalogueCategory = {
  id: string;
  name: string;
  slug: string;
  heroImage: string | null;
};

export type PublicProductGroup = {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  displayOrder: number;
};

/** Catalogue category used by category/group pages (former catalog.ts shape). */
export type ProductCategory = {
  id: string;
  title: string;
  slug: string;
  heroImage: string;
  description: string;
  groups: Array<{
    id: string;
    title: string;
    slug: string;
    image: string;
    description: string;
  }>;
};

export type CatalogueSubcategory = {
  title: string;
  slug: string;
  description: string;
  image: string;
  products: Product[];
};

export type DbCategoryRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  hero_image: string | null;
  display_order: number;
  is_active: boolean;
};

export type DbProductGroupRow = {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  display_order: number;
  is_active: boolean;
};

export type DbProductRow = {
  id: string;
  category_id: string;
  group_id: string;
  name: string;
  slug: string;
  model: string | null;
  short_description: string | null;
  description: string | null;
  image: string | null;
  gallery: string[] | null;
  features: string[] | null;
  specifications: Array<{ label: string; value: string }> | null;
  material: string | null;
  custom_sizes: boolean | null;
  warranty: string | null;
  origin: string | null;
  hsn_code: string | null;
  featured: boolean;
  is_active: boolean;
  display_order: number;
  seo_title: string | null;
  seo_description: string | null;
};

export type DbProductWithRelations = DbProductRow & {
  categories: Pick<DbCategoryRow, "id" | "name" | "slug" | "is_active"> | null;
  product_groups: Pick<
    DbProductGroupRow,
    "id" | "name" | "slug" | "category_id" | "is_active"
  > | null;
};
