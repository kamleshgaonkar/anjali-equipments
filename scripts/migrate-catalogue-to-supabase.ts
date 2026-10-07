/**
 * One-time / rerunnable static catalogue → Supabase migration.
 *
 * Reads approved static data only. Does not modify static files or public routes.
 * Upserts by slug identity so re-runs do not create duplicates.
 *
 * Usage:
 *   npm run migrate:catalogue -- --dry-run
 *   npm run migrate:catalogue
 */

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { categories as staticCategories } from "../data/categories";
import { catalog } from "../data/products/catalog";
import { products as staticProducts } from "../data/products";
import { toCatalogueSlug } from "../lib/catalogue";
import type { Product } from "../types/product";

type PlannedCategory = {
  name: string;
  slug: string;
  description: string | null;
  hero_image: string | null;
  display_order: number;
  is_active: true;
};

type PlannedGroup = {
  categorySlug: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  display_order: number;
  is_active: true;
};

type PlannedProduct = {
  categorySlug: string;
  groupSlug: string;
  name: string;
  slug: string;
  model: string | null;
  short_description: string | null;
  description: string | null;
  image: string | null;
  gallery: string[];
  features: string[];
  specifications: { label: string; value: string }[];
  material: string | null;
  custom_sizes: boolean;
  warranty: string | null;
  origin: string | null;
  hsn_code: string | null;
  featured: boolean;
  is_active: true;
  display_order: number;
  seo_title: string | null;
  seo_description: string | null;
  staticId: string;
};

type ValidationIssue = {
  level: "error" | "warning";
  message: string;
};

function loadEnvFiles() {
  for (const name of [".env.local", ".env"]) {
    const filePath = resolve(process.cwd(), name);
    if (!existsSync(filePath)) continue;

    const text = readFileSync(filePath, "utf8");
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;

      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();

      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      if (process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  }
}

function parseArgs(argv: string[]) {
  return {
    dryRun: argv.includes("--dry-run"),
  };
}

function nullableString(value: string | undefined | null): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function buildPlannedCategories(): PlannedCategory[] {
  const catalogBySlug = new Map(catalog.map((item) => [item.slug, item]));

  return staticCategories.map((category, index) => {
    const catalogCategory = catalogBySlug.get(category.slug);

    return {
      name: category.name,
      slug: category.slug,
      description: nullableString(
        catalogCategory?.description ?? category.description
      ),
      hero_image: nullableString(
        catalogCategory?.heroImage ?? category.image
      ),
      display_order: index + 1,
      is_active: true,
    };
  });
}

function buildPlannedGroups(): PlannedGroup[] {
  const groups: PlannedGroup[] = [];

  for (const category of catalog) {
    category.groups.forEach((group, index) => {
      groups.push({
        categorySlug: category.slug,
        name: group.title,
        slug: group.slug,
        description: nullableString(group.description),
        image: nullableString(group.image),
        display_order: index + 1,
        is_active: true,
      });
    });
  }

  return groups;
}

function resolveCategorySlugFromProduct(product: Product): string | null {
  const byName = staticCategories.find(
    (category) => category.name === product.category
  );
  if (byName) return byName.slug;

  const bySlug = staticCategories.find(
    (category) => category.slug === product.category
  );
  if (bySlug) return bySlug.slug;

  const catalogByTitle = catalog.find(
    (category) => category.title === product.category
  );
  if (catalogByTitle) return catalogByTitle.slug;

  const catalogBySlug = catalog.find(
    (category) => category.slug === product.category
  );
  if (catalogBySlug) return catalogBySlug.slug;

  return null;
}

function resolveGroupSlug(
  categorySlug: string,
  groupTitleOrSlug: string
): string | null {
  const catalogCategory = catalog.find((item) => item.slug === categorySlug);
  if (!catalogCategory) return null;

  const byTitle = catalogCategory.groups.find(
    (group) => group.title === groupTitleOrSlug
  );
  if (byTitle) return byTitle.slug;

  const bySlug = catalogCategory.groups.find(
    (group) => group.slug === groupTitleOrSlug
  );
  if (bySlug) return bySlug.slug;

  const guessed = toCatalogueSlug(groupTitleOrSlug);
  const byGuess = catalogCategory.groups.find((group) => group.slug === guessed);
  if (byGuess) return byGuess.slug;

  return null;
}

function buildPlannedProducts(): PlannedProduct[] {
  return staticProducts.map((product, index) => {
    const categorySlug = resolveCategorySlugFromProduct(product) ?? "";
    const groupSlug =
      categorySlug && product.group
        ? resolveGroupSlug(categorySlug, product.group) ?? ""
        : "";

    const hsnCandidate =
      (product as Product & { hsnCode?: string; hsn_code?: string }).hsnCode ??
      (product as Product & { hsn_code?: string }).hsn_code;

    return {
      categorySlug,
      groupSlug,
      name: product.name?.trim() ?? "",
      slug: product.slug?.trim() ?? "",
      model: nullableString(product.model),
      short_description: nullableString(product.shortDescription),
      description: nullableString(product.description),
      image: nullableString(product.image),
      gallery: Array.isArray(product.gallery) ? product.gallery : [],
      features: Array.isArray(product.features) ? product.features : [],
      specifications: Array.isArray(product.specifications)
        ? product.specifications.map((item) => ({
            label: item.label,
            value: item.value,
          }))
        : [],
      material: nullableString(product.material),
      // products.custom_sizes is NOT NULL — default missing values to false.
      custom_sizes: product.customSizes ?? false,
      warranty: nullableString(product.warranty),
      origin: nullableString(product.origin),
      hsn_code: nullableString(hsnCandidate),
      featured: Boolean(product.featured),
      is_active: true,
      display_order: index + 1,
      seo_title: nullableString(product.seoTitle),
      seo_description: nullableString(product.seoDescription),
      staticId: product.id,
    };
  });
}

function validatePlan(
  plannedCategories: PlannedCategory[],
  plannedGroups: PlannedGroup[],
  plannedProducts: PlannedProduct[]
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  const categorySlugs = plannedCategories.map((item) => item.slug);
  const categorySlugSet = new Set(categorySlugs);
  const duplicateCategorySlugs = categorySlugs.filter(
    (slug, index) => categorySlugs.indexOf(slug) !== index
  );
  if (duplicateCategorySlugs.length > 0) {
    issues.push({
      level: "error",
      message: `Duplicate category slugs: ${[...new Set(duplicateCategorySlugs)].join(", ")}`,
    });
  }

  for (const category of plannedCategories) {
    if (!category.name) {
      issues.push({
        level: "error",
        message: `Category missing name (slug=${category.slug || "unknown"})`,
      });
    }
    if (!category.slug) {
      issues.push({
        level: "error",
        message: `Category missing slug (name=${category.name || "unknown"})`,
      });
    }
  }

  const groupKeys = plannedGroups.map(
    (group) => `${group.categorySlug}::${group.slug}`
  );
  const duplicateGroupKeys = groupKeys.filter(
    (key, index) => groupKeys.indexOf(key) !== index
  );
  if (duplicateGroupKeys.length > 0) {
    issues.push({
      level: "error",
      message: `Duplicate group slugs within category: ${[...new Set(duplicateGroupKeys)].join(", ")}`,
    });
  }

  for (const group of plannedGroups) {
    if (!categorySlugSet.has(group.categorySlug)) {
      issues.push({
        level: "error",
        message: `Group "${group.name}" references missing category slug "${group.categorySlug}"`,
      });
    }
    if (!group.name || !group.slug) {
      issues.push({
        level: "error",
        message: `Malformed group record: name="${group.name}", slug="${group.slug}", category="${group.categorySlug}"`,
      });
    }
  }

  const productKeys = plannedProducts.map(
    (product) => `${product.categorySlug}::${product.slug}`
  );
  const duplicateProductKeys = productKeys.filter(
    (key, index) => productKeys.indexOf(key) !== index
  );
  if (duplicateProductKeys.length > 0) {
    issues.push({
      level: "error",
      message: `Duplicate product slugs within category: ${[...new Set(duplicateProductKeys)].join(", ")}`,
    });
  }

  const groupKeySet = new Set(groupKeys);

  for (const product of plannedProducts) {
    if (!product.name) {
      issues.push({
        level: "error",
        message: `Product missing name (static id=${product.staticId})`,
      });
    }
    if (!product.slug) {
      issues.push({
        level: "error",
        message: `Product missing slug (static id=${product.staticId}, name=${product.name || "unknown"})`,
      });
    }
    if (!product.categorySlug || !categorySlugSet.has(product.categorySlug)) {
      issues.push({
        level: "error",
        message: `Product "${product.name || product.staticId}" has missing/invalid category (resolved slug="${product.categorySlug || ""}")`,
      });
    }
    if (!product.groupSlug) {
      issues.push({
        level: "error",
        message: `Product "${product.name || product.staticId}" could not resolve group_id from group title/slug`,
      });
    } else if (
      product.categorySlug &&
      !groupKeySet.has(`${product.categorySlug}::${product.groupSlug}`)
    ) {
      issues.push({
        level: "error",
        message: `Product "${product.name || product.staticId}" references missing group "${product.groupSlug}" under category "${product.categorySlug}"`,
      });
    }
  }

  return issues;
}

function createServiceClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL. Add it to .env.local before running the migration."
    );
  }

  if (!serviceRoleKey) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY. Add this server-only key to .env.local (never NEXT_PUBLIC_*). Find it in Supabase Dashboard → Project Settings → API → service_role."
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

async function upsertCategories(
  supabase: SupabaseClient,
  planned: PlannedCategory[],
  dryRun: boolean
) {
  const { data: existing, error } = await supabase
    .from("categories")
    .select("id, slug");

  if (error) {
    throw new Error(`Failed to read categories: ${error.message}`);
  }

  const bySlug = new Map((existing ?? []).map((row) => [row.slug, row.id]));
  let wouldCreate = 0;
  let wouldUpdate = 0;

  for (const category of planned) {
    const existingId = bySlug.get(category.slug);
    const payload = {
      name: category.name,
      slug: category.slug,
      description: category.description,
      hero_image: category.hero_image,
      display_order: category.display_order,
      is_active: category.is_active,
    };

    if (existingId) {
      wouldUpdate += 1;
      if (!dryRun) {
        const { error: updateError } = await supabase
          .from("categories")
          .update(payload)
          .eq("id", existingId);
        if (updateError) {
          throw new Error(
            `Failed to update category "${category.slug}": ${updateError.message}`
          );
        }
      }
    } else {
      wouldCreate += 1;
      if (!dryRun) {
        const { data, error: insertError } = await supabase
          .from("categories")
          .insert(payload)
          .select("id, slug")
          .single();
        if (insertError || !data) {
          throw new Error(
            `Failed to insert category "${category.slug}": ${insertError?.message ?? "unknown error"}`
          );
        }
        bySlug.set(data.slug, data.id);
      }
    }
  }

  return { wouldCreate, wouldUpdate, bySlug };
}

async function upsertGroups(
  supabase: SupabaseClient,
  planned: PlannedGroup[],
  categoryIdBySlug: Map<string, string>,
  dryRun: boolean
) {
  const { data: existing, error } = await supabase
    .from("product_groups")
    .select("id, category_id, slug");

  if (error) {
    throw new Error(`Failed to read product_groups: ${error.message}`);
  }

  const byKey = new Map(
    (existing ?? []).map((row) => [`${row.category_id}::${row.slug}`, row.id])
  );

  let wouldCreate = 0;
  let wouldUpdate = 0;

  for (const group of planned) {
    const categoryId = categoryIdBySlug.get(group.categorySlug);
    if (!categoryId) {
      throw new Error(
        `Missing category id for group "${group.slug}" (category slug=${group.categorySlug}). Run categories first.`
      );
    }

    const key = `${categoryId}::${group.slug}`;
    const existingId = byKey.get(key);
    const payload = {
      category_id: categoryId,
      name: group.name,
      slug: group.slug,
      description: group.description,
      image: group.image,
      display_order: group.display_order,
      is_active: group.is_active,
    };

    if (existingId) {
      wouldUpdate += 1;
      if (!dryRun) {
        const { error: updateError } = await supabase
          .from("product_groups")
          .update(payload)
          .eq("id", existingId);
        if (updateError) {
          throw new Error(
            `Failed to update group "${group.slug}": ${updateError.message}`
          );
        }
      }
    } else {
      wouldCreate += 1;
      if (!dryRun) {
        const { data, error: insertError } = await supabase
          .from("product_groups")
          .insert(payload)
          .select("id, category_id, slug")
          .single();
        if (insertError || !data) {
          throw new Error(
            `Failed to insert group "${group.slug}": ${insertError?.message ?? "unknown error"}`
          );
        }
        byKey.set(`${data.category_id}::${data.slug}`, data.id);
      }
    }
  }

  return { wouldCreate, wouldUpdate, byKey };
}

async function upsertProducts(
  supabase: SupabaseClient,
  planned: PlannedProduct[],
  categoryIdBySlug: Map<string, string>,
  groupIdByCategoryAndSlug: Map<string, string>,
  dryRun: boolean
) {
  const { data: existing, error } = await supabase
    .from("products")
    .select("id, category_id, slug");

  if (error) {
    throw new Error(`Failed to read products: ${error.message}`);
  }

  const byKey = new Map(
    (existing ?? []).map((row) => [`${row.category_id}::${row.slug}`, row.id])
  );

  let wouldCreate = 0;
  let wouldUpdate = 0;

  for (const product of planned) {
    const categoryId = categoryIdBySlug.get(product.categorySlug);
    if (!categoryId) {
      throw new Error(
        `Missing category id for product "${product.slug}" (category=${product.categorySlug})`
      );
    }

    const groupId = groupIdByCategoryAndSlug.get(
      `${categoryId}::${product.groupSlug}`
    );
    if (!groupId) {
      throw new Error(
        `Missing group_id for product "${product.slug}" (category=${product.categorySlug}, group=${product.groupSlug})`
      );
    }

    const key = `${categoryId}::${product.slug}`;
    const existingId = byKey.get(key);

    // Do not include `id` — Supabase generates UUIDs for new rows.
    const payload = {
      category_id: categoryId,
      group_id: groupId,
      name: product.name,
      slug: product.slug,
      model: product.model,
      short_description: product.short_description,
      description: product.description,
      image: product.image,
      gallery: product.gallery,
      features: product.features,
      specifications: product.specifications,
      material: product.material,
      custom_sizes: product.custom_sizes,
      warranty: product.warranty,
      origin: product.origin,
      hsn_code: product.hsn_code,
      featured: product.featured,
      is_active: product.is_active,
      display_order: product.display_order,
      seo_title: product.seo_title,
      seo_description: product.seo_description,
    };

    if (existingId) {
      wouldUpdate += 1;
      if (!dryRun) {
        const { error: updateError } = await supabase
          .from("products")
          .update(payload)
          .eq("id", existingId);
        if (updateError) {
          throw new Error(
            `Failed to update product "${product.slug}": ${updateError.message}`
          );
        }
      }
    } else {
      wouldCreate += 1;
      if (!dryRun) {
        const { data, error: insertError } = await supabase
          .from("products")
          .insert(payload)
          .select("id, category_id, slug")
          .single();
        if (insertError || !data) {
          throw new Error(
            `Failed to insert product "${product.slug}": ${insertError?.message ?? "unknown error"}`
          );
        }
        byKey.set(`${data.category_id}::${data.slug}`, data.id);
      }
    }
  }

  return { wouldCreate, wouldUpdate };
}

async function loadCategoryIdMap(
  supabase: SupabaseClient,
  planned: PlannedCategory[]
) {
  const { data, error } = await supabase.from("categories").select("id, slug");
  if (error) {
    throw new Error(`Failed to reload categories: ${error.message}`);
  }

  const bySlug = new Map((data ?? []).map((row) => [row.slug, row.id]));
  for (const category of planned) {
    if (!bySlug.has(category.slug)) {
      throw new Error(
        `Category "${category.slug}" missing after upsert (dry-run may need a prior write to resolve IDs).`
      );
    }
  }
  return bySlug;
}

async function loadGroupIdMap(
  supabase: SupabaseClient,
  planned: PlannedGroup[],
  categoryIdBySlug: Map<string, string>
) {
  const { data, error } = await supabase
    .from("product_groups")
    .select("id, category_id, slug");
  if (error) {
    throw new Error(`Failed to reload product_groups: ${error.message}`);
  }

  const byKey = new Map(
    (data ?? []).map((row) => [`${row.category_id}::${row.slug}`, row.id])
  );

  for (const group of planned) {
    const categoryId = categoryIdBySlug.get(group.categorySlug);
    if (!categoryId) {
      throw new Error(`Missing category id for planned group ${group.slug}`);
    }
    if (!byKey.has(`${categoryId}::${group.slug}`)) {
      throw new Error(
        `Group "${group.slug}" missing after upsert under category "${group.categorySlug}".`
      );
    }
  }

  return byKey;
}

function printSummary(options: {
  dryRun: boolean;
  plannedCategories: PlannedCategory[];
  plannedGroups: PlannedGroup[];
  plannedProducts: PlannedProduct[];
  categoryStats: { wouldCreate: number; wouldUpdate: number };
  groupStats: { wouldCreate: number; wouldUpdate: number };
  productStats: { wouldCreate: number; wouldUpdate: number };
  issues: ValidationIssue[];
}) {
  const mode = options.dryRun ? "DRY RUN (no writes)" : "LIVE MIGRATION";
  console.log(`\n=== Catalogue → Supabase (${mode}) ===\n`);

  console.log("Categories:");
  console.log(`  ${options.plannedCategories.length} found`);
  console.log(
    `  ${options.categoryStats.wouldCreate} would create / ${options.categoryStats.wouldUpdate} would update`
  );

  console.log("\nGroups:");
  console.log(`  ${options.plannedGroups.length} found`);
  console.log(
    `  ${options.groupStats.wouldCreate} would create / ${options.groupStats.wouldUpdate} would update`
  );

  console.log("\nProducts:");
  console.log(`  ${options.plannedProducts.length} found`);
  console.log(
    `  ${options.productStats.wouldCreate} would create / ${options.productStats.wouldUpdate} would update`
  );

  if (options.issues.length > 0) {
    console.log("\nValidation issues:");
    for (const issue of options.issues) {
      console.log(`  [${issue.level.toUpperCase()}] ${issue.message}`);
    }
  } else {
    console.log("\nValidation: OK");
  }
}

async function main() {
  loadEnvFiles();
  const { dryRun } = parseArgs(process.argv.slice(2));

  const plannedCategories = buildPlannedCategories();
  const plannedGroups = buildPlannedGroups();
  const plannedProducts = buildPlannedProducts();
  const issues = validatePlan(
    plannedCategories,
    plannedGroups,
    plannedProducts
  );

  const errors = issues.filter((issue) => issue.level === "error");
  if (errors.length > 0) {
    console.error("\nValidation failed. Migration stopped.\n");
    for (const issue of issues) {
      console.error(`[${issue.level.toUpperCase()}] ${issue.message}`);
    }
    console.error(
      `\nStatic counts — categories: ${plannedCategories.length}, groups: ${plannedGroups.length}, products: ${plannedProducts.length}`
    );
    process.exit(1);
  }

  let supabase: SupabaseClient;
  try {
    supabase = createServiceClient();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (dryRun) {
      console.log("\n=== Catalogue → Supabase (DRY RUN — validation only) ===\n");
      console.log("Categories:");
      console.log(`  ${plannedCategories.length} found`);
      console.log(`  ${plannedCategories.length} would create/update (DB compare skipped)`);
      console.log("\nGroups:");
      console.log(`  ${plannedGroups.length} found`);
      console.log(`  ${plannedGroups.length} would create/update (DB compare skipped)`);
      console.log("\nProducts:");
      console.log(`  ${plannedProducts.length} found`);
      console.log(`  ${plannedProducts.length} would create/update (DB compare skipped)`);
      console.log("\nValidation: OK");
      console.log(`\nNote: ${message}`);
      console.log(
        "Add SUPABASE_SERVICE_ROLE_KEY to .env.local to compare against existing rows / run the live migration."
      );
      process.exit(0);
    }
    console.error(`\n${message}`);
    process.exit(1);
  }

  // Categories first so group/product FKs can resolve by slug.
  const categoryStats = await upsertCategories(
    supabase,
    plannedCategories,
    dryRun
  );

  const categoryIdBySlug = dryRun
    ? await (async () => {
        const { data, error } = await supabase
          .from("categories")
          .select("id, slug");
        if (error) {
          throw new Error(`Failed to read categories for dry-run: ${error.message}`);
        }
        const map = new Map((data ?? []).map((row) => [row.slug, row.id]));
        // For dry-run create candidates not yet in DB, use placeholders so group lookup can still count.
        for (const category of plannedCategories) {
          if (!map.has(category.slug)) {
            map.set(category.slug, `dry-run-category:${category.slug}`);
          }
        }
        return map;
      })()
    : await loadCategoryIdMap(supabase, plannedCategories);

  const groupStats = await upsertGroups(
    supabase,
    plannedGroups,
    categoryIdBySlug,
    dryRun
  );

  const groupIdByCategoryAndSlug = dryRun
    ? await (async () => {
        const { data, error } = await supabase
          .from("product_groups")
          .select("id, category_id, slug");
        if (error) {
          throw new Error(
            `Failed to read product_groups for dry-run: ${error.message}`
          );
        }
        const map = new Map(
          (data ?? []).map((row) => [`${row.category_id}::${row.slug}`, row.id])
        );
        for (const group of plannedGroups) {
          const categoryId = categoryIdBySlug.get(group.categorySlug)!;
          const key = `${categoryId}::${group.slug}`;
          if (!map.has(key)) {
            map.set(key, `dry-run-group:${group.slug}`);
          }
        }
        return map;
      })()
    : await loadGroupIdMap(supabase, plannedGroups, categoryIdBySlug);

  // In dry-run, skip product upsert DB writes but still compute create/update vs existing.
  // Products that depend on not-yet-created categories/groups are counted as creates.
  const productStats = await upsertProducts(
    supabase,
    plannedProducts,
    categoryIdBySlug,
    groupIdByCategoryAndSlug,
    dryRun
  );

  printSummary({
    dryRun,
    plannedCategories,
    plannedGroups,
    plannedProducts,
    categoryStats,
    groupStats,
    productStats,
    issues,
  });

  if (dryRun) {
    console.log("\nDry run complete. No database writes were performed.");
  } else {
    console.log("\nMigration complete.");
  }
}

main().catch((error) => {
  console.error("\nMigration failed:");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
