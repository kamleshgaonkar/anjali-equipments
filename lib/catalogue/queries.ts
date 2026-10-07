import type { Product } from "@/types/product";
import { createClient } from "@supabase/supabase-js";
import { createPublicCatalogueClient } from "@/lib/catalogue/public-client";
import {
  mapCategory,
  mapProduct,
  mapProductCategory,
  mapProductGroup,
} from "@/lib/catalogue/mappers";
import type {
  CatalogueSubcategory,
  DbCategoryRow,
  DbProductGroupRow,
  DbProductRow,
  DbProductWithRelations,
  ProductCategory,
  PublicCategory,
  PublicProductGroup,
  NavCatalogueCategory,
} from "@/lib/catalogue/types";

const PRODUCT_SELECT = `
  id,
  category_id,
  group_id,
  name,
  slug,
  model,
  short_description,
  description,
  image,
  gallery,
  features,
  specifications,
  material,
  custom_sizes,
  warranty,
  origin,
  hsn_code,
  featured,
  is_active,
  display_order,
  seo_title,
  seo_description,
  categories!inner (
    id,
    name,
    slug,
    is_active
  ),
  product_groups!inner (
    id,
    name,
    slug,
    category_id,
    is_active
  )
`;

function logCatalogueError(context: string, error: { message: string }) {
  console.error(`[catalogue] ${context}: ${error.message}`);
}

function unwrapRelation<T>(value: T | T[] | null | undefined): T | null {
  if (!value) return null;
  return Array.isArray(value) ? (value[0] ?? null) : value;
}

function normalizeProductRow(row: unknown): DbProductWithRelations | null {
  if (!row || typeof row !== "object") return null;

  const raw = row as DbProductRow & {
    categories?:
      | DbProductWithRelations["categories"]
      | Array<NonNullable<DbProductWithRelations["categories"]>>
      | null;
    product_groups?:
      | DbProductWithRelations["product_groups"]
      | Array<NonNullable<DbProductWithRelations["product_groups"]>>
      | null;
  };

  return {
    ...raw,
    categories: unwrapRelation(raw.categories),
    product_groups: unwrapRelation(raw.product_groups),
  };
}

function mapProducts(rows: unknown[] | null): Product[] {
  if (!rows) return [];

  return rows
    .map((row) => {
      const normalized = normalizeProductRow(row);
      return normalized ? mapProduct(normalized) : null;
    })
    .filter((product): product is Product => Boolean(product));
}

export async function fetchActiveCategories(): Promise<PublicCategory[]> {
  const supabase = createPublicCatalogueClient();

  const { data, error } = await supabase
    .from("categories")
    .select(
      "id, name, slug, description, hero_image, display_order, is_active"
    )
    .eq("is_active", true)
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    logCatalogueError("fetchActiveCategories", error);
    throw new Error("Unable to load product categories.");
  }

  return ((data ?? []) as DbCategoryRow[]).map(mapCategory);
}

function createCachedNavClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      fetch: (input, init) =>
        fetch(input, {
          ...init,
          next: { revalidate: 120 },
        }),
    },
  });
}

export async function fetchNavCatalogue(): Promise<NavCatalogueCategory[]> {
  const supabase = createCachedNavClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, hero_image, display_order, is_active")
    .eq("is_active", true)
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    logCatalogueError("fetchNavCatalogue", error);
    return [];
  }

  return ((data ?? []) as Pick<
    DbCategoryRow,
    "id" | "name" | "slug" | "hero_image"
  >[]).map((row) => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    heroImage: row.hero_image,
  }));
}

export async function fetchActiveCategoryBySlug(
  slug: string
): Promise<PublicCategory | null> {
  const supabase = createPublicCatalogueClient();

  const { data, error } = await supabase
    .from("categories")
    .select(
      "id, name, slug, description, hero_image, display_order, is_active"
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    logCatalogueError("fetchActiveCategoryBySlug", error);
    throw new Error("Unable to load category.");
  }

  if (!data) return null;
  return mapCategory(data as DbCategoryRow);
}

export async function fetchActiveGroupsByCategoryId(
  categoryId: string
): Promise<PublicProductGroup[]> {
  const supabase = createPublicCatalogueClient();

  const { data, error } = await supabase
    .from("product_groups")
    .select(
      "id, category_id, name, slug, description, image, display_order, is_active"
    )
    .eq("category_id", categoryId)
    .eq("is_active", true)
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    logCatalogueError("fetchActiveGroupsByCategoryId", error);
    throw new Error("Unable to load product groups.");
  }

  return ((data ?? []) as DbProductGroupRow[]).map(mapProductGroup);
}

export async function fetchActiveGroupsByCategorySlug(
  categorySlug: string
): Promise<PublicProductGroup[]> {
  const category = await fetchActiveCategoryBySlug(categorySlug);
  if (!category) return [];
  return fetchActiveGroupsByCategoryId(category.id);
}

export async function fetchCatalogCategory(
  categorySlug: string
): Promise<ProductCategory | null> {
  const supabase = createPublicCatalogueClient();

  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select(
      "id, name, slug, description, hero_image, display_order, is_active"
    )
    .eq("slug", categorySlug)
    .eq("is_active", true)
    .maybeSingle();

  if (categoryError) {
    logCatalogueError("fetchCatalogCategory.category", categoryError);
    throw new Error("Unable to load category.");
  }

  if (!category) return null;

  const { data: groups, error: groupsError } = await supabase
    .from("product_groups")
    .select(
      "id, category_id, name, slug, description, image, display_order, is_active"
    )
    .eq("category_id", category.id)
    .eq("is_active", true)
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  if (groupsError) {
    logCatalogueError("fetchCatalogCategory.groups", groupsError);
    throw new Error("Unable to load product groups.");
  }

  return mapProductCategory(
    category as DbCategoryRow,
    (groups ?? []) as DbProductGroupRow[]
  );
}

export async function fetchActiveProducts(): Promise<Product[]> {
  const supabase = createPublicCatalogueClient();

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_active", true)
    .eq("categories.is_active", true)
    .eq("product_groups.is_active", true)
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    logCatalogueError("fetchActiveProducts", error);
    throw new Error("Unable to load products.");
  }

  return mapProducts(data as unknown[] | null);
}

export async function fetchActiveProductsByCategorySlug(
  categorySlug: string
): Promise<Product[]> {
  const supabase = createPublicCatalogueClient();

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_active", true)
    .eq("categories.slug", categorySlug)
    .eq("categories.is_active", true)
    .eq("product_groups.is_active", true)
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    logCatalogueError("fetchActiveProductsByCategorySlug", error);
    throw new Error("Unable to load category products.");
  }

  return mapProducts(data as unknown[] | null);
}

export async function fetchActiveProductsByCategoryAndGroup(
  categorySlug: string,
  groupSlug: string
): Promise<Product[]> {
  const supabase = createPublicCatalogueClient();

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_active", true)
    .eq("categories.slug", categorySlug)
    .eq("categories.is_active", true)
    .eq("product_groups.slug", groupSlug)
    .eq("product_groups.is_active", true)
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    logCatalogueError("fetchActiveProductsByCategoryAndGroup", error);
    throw new Error("Unable to load group products.");
  }

  return mapProducts(data as unknown[] | null);
}

export async function fetchActiveProductByRoute(
  categorySlug: string,
  groupSlug: string,
  productSlug: string
): Promise<Product | null> {
  const supabase = createPublicCatalogueClient();

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("slug", productSlug)
    .eq("is_active", true)
    .eq("categories.slug", categorySlug)
    .eq("categories.is_active", true)
    .eq("product_groups.slug", groupSlug)
    .eq("product_groups.is_active", true)
    .maybeSingle();

  if (error) {
    logCatalogueError("fetchActiveProductByRoute", error);
    throw new Error("Unable to load product.");
  }

  if (!data) return null;
  const normalized = normalizeProductRow(data);
  return normalized ? mapProduct(normalized) : null;
}

/** Legacy helper: resolve by category slug + product slug (group not required). */
export async function fetchActiveProductByCategoryAndSlug(
  categorySlug: string,
  productSlug: string
): Promise<Product | null> {
  const supabase = createPublicCatalogueClient();

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("slug", productSlug)
    .eq("is_active", true)
    .eq("categories.slug", categorySlug)
    .eq("categories.is_active", true)
    .eq("product_groups.is_active", true)
    .maybeSingle();

  if (error) {
    logCatalogueError("fetchActiveProductByCategoryAndSlug", error);
    throw new Error("Unable to load product.");
  }

  if (!data) return null;
  const normalized = normalizeProductRow(data);
  return normalized ? mapProduct(normalized) : null;
}

export async function fetchActiveProductById(
  id: string
): Promise<Product | null> {
  const supabase = createPublicCatalogueClient();

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("id", id)
    .eq("is_active", true)
    .eq("categories.is_active", true)
    .eq("product_groups.is_active", true)
    .maybeSingle();

  if (error) {
    logCatalogueError("fetchActiveProductById", error);
    throw new Error("Unable to load product.");
  }

  if (!data) return null;
  const normalized = normalizeProductRow(data);
  return normalized ? mapProduct(normalized) : null;
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  const supabase = createPublicCatalogueClient();

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_active", true)
    .eq("featured", true)
    .eq("categories.is_active", true)
    .eq("product_groups.is_active", true)
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    logCatalogueError("fetchFeaturedProducts", error);
    throw new Error("Unable to load featured products.");
  }

  return mapProducts(data as unknown[] | null);
}

export async function fetchRelatedProducts(
  categorySlug: string,
  currentProductId: string,
  options?: {
    groupSlug?: string;
    limit?: number;
  }
): Promise<Product[]> {
  const limit = options?.limit ?? 4;
  const groupSlug = options?.groupSlug;

  const supabase = createPublicCatalogueClient();

  if (groupSlug) {
    const { data: groupRows, error: groupError } = await supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("is_active", true)
      .neq("id", currentProductId)
      .eq("categories.slug", categorySlug)
      .eq("categories.is_active", true)
      .eq("product_groups.slug", groupSlug)
      .eq("product_groups.is_active", true)
      .order("display_order", { ascending: true })
      .order("name", { ascending: true })
      .limit(limit);

    if (groupError) {
      logCatalogueError("fetchRelatedProducts.group", groupError);
      throw new Error("Unable to load related products.");
    }

    const fromGroup = mapProducts(groupRows as unknown[] | null);
    if (fromGroup.length >= limit) {
      return fromGroup.slice(0, limit);
    }

    const { data: categoryRows, error: categoryError } = await supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("is_active", true)
      .neq("id", currentProductId)
      .eq("categories.slug", categorySlug)
      .eq("categories.is_active", true)
      .eq("product_groups.is_active", true)
      .order("display_order", { ascending: true })
      .order("name", { ascending: true })
      .limit(limit * 3);

    if (categoryError) {
      logCatalogueError("fetchRelatedProducts.category", categoryError);
      throw new Error("Unable to load related products.");
    }

    const fromCategory = mapProducts(categoryRows as unknown[] | null);
    const seen = new Set(fromGroup.map((product) => product.id));
    const filled = [...fromGroup];

    for (const product of fromCategory) {
      if (seen.has(product.id)) continue;
      filled.push(product);
      if (filled.length >= limit) break;
    }

    return filled;
  }

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_active", true)
    .neq("id", currentProductId)
    .eq("categories.slug", categorySlug)
    .eq("categories.is_active", true)
    .eq("product_groups.is_active", true)
    .order("display_order", { ascending: true })
    .order("name", { ascending: true })
    .limit(limit);

  if (error) {
    logCatalogueError("fetchRelatedProducts", error);
    throw new Error("Unable to load related products.");
  }

  return mapProducts(data as unknown[] | null);
}

export async function searchActiveProducts(
  search: string
): Promise<Product[]> {
  const query = search.toLowerCase().trim();
  if (!query) return [];

  const products = await fetchActiveProducts();

  return products.filter((product) => {
    const haystack = [
      product.name,
      product.model,
      product.group,
      product.category,
      product.shortDescription,
      product.description,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
}

export async function buildCategorySubcategoriesFromDb(
  categorySlug: string
): Promise<CatalogueSubcategory[] | null> {
  const catalogCategory = await fetchCatalogCategory(categorySlug);
  if (!catalogCategory) return null;

  const products = await fetchActiveProductsByCategorySlug(categorySlug);

  const productsByGroupSlug = new Map<string, Product[]>();
  for (const product of products) {
    const groupSlug = product.groupSlug ?? "";
    if (!groupSlug) continue;
    const list = productsByGroupSlug.get(groupSlug) ?? [];
    list.push(product);
    productsByGroupSlug.set(groupSlug, list);
  }

  return catalogCategory.groups.map((group) => {
    const groupProducts = productsByGroupSlug.get(group.slug) ?? [];

    return {
      title: group.title,
      slug: group.slug,
      description: group.description,
      image:
        groupProducts.find((product) => Boolean(product.image))?.image ||
        group.image ||
        catalogCategory.heroImage,
      products: groupProducts,
    };
  });
}

export async function getGroupedProductsByCategorySlug(
  categorySlug: string
): Promise<Record<string, Product[]>> {
  const products = await fetchActiveProductsByCategorySlug(categorySlug);

  return products.reduce<Record<string, Product[]>>((groups, product) => {
    const group = product.group || "Products";
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(product);
    return groups;
  }, {});
}
