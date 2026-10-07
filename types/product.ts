export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  model?: string;
  name: string;
  slug: string;

  /** Display name of the category (e.g. "Cooking"). */
  category: string;
  /** Display name of the product group (e.g. "Cooking Ranges"). */
  group: string;

  /** URL slug for the category when available from Supabase. */
  categorySlug?: string;
  /** URL slug for the product group when available from Supabase. */
  groupSlug?: string;

  image: string;
  gallery?: string[];

  shortDescription?: string;
  description?: string;
  features?: string[];

  specifications?: {
    label: string;
    value: string;
  }[];

  material?: string;
  customSizes?: boolean;
  warranty?: string;

  origin?: string;

  featured?: boolean;

  seoTitle?: string;
  seoDescription?: string;
}
