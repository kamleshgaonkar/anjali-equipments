"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { isValidSlug, slugify } from "@/lib/admin/slug";
import {
  deleteStorageObjectByPublicUrl,
  isSupabaseProductImageUrl,
} from "@/lib/admin/storage";
import type { AdminProductSpecification } from "@/types/admin-catalogue";

export type ProductActionState = {
  error?: string;
  success?: boolean;
};

function readText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function readNullableUrl(formData: FormData, key: string) {
  const value = readText(formData, key);
  return value || null;
}

function parseFeatures(raw: string) {
  try {
    const parsed = JSON.parse(raw || "[]") as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => String(item ?? "").trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

function parseGallery(raw: string) {
  try {
    const parsed = JSON.parse(raw || "[]") as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => String(item ?? "").trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

function parseSpecifications(raw: string): AdminProductSpecification[] {
  try {
    const parsed = JSON.parse(raw || "[]") as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const row = item as { label?: unknown; value?: unknown };
        const label = String(row.label ?? "").trim();
        const value = String(row.value ?? "").trim();
        if (!label && !value) return null;
        return { label, value };
      })
      .filter((item): item is AdminProductSpecification => Boolean(item));
  } catch {
    return [];
  }
}

function mapDbError(message: string) {
  const lower = message.toLowerCase();

  if (lower.includes("duplicate") || lower.includes("unique")) {
    return "A product with this slug already exists in the selected category.";
  }

  if (lower.includes("foreign key") || lower.includes("violates")) {
    return "Selected category or product group is invalid.";
  }

  return message;
}

async function assertUniqueSlugInCategory(
  categoryId: string,
  slug: string,
  excludeId?: string
) {
  const { supabase } = await requireAdmin();

  let query = supabase
    .from("products")
    .select("id")
    .eq("category_id", categoryId)
    .eq("slug", slug)
    .limit(1);

  if (excludeId) {
    query = query.neq("id", excludeId);
  }

  const { data, error } = await query;
  if (error) {
    throw new Error(mapDbError(error.message));
  }

  if (data && data.length > 0) {
    throw new Error(
      "A product with this slug already exists in the selected category."
    );
  }
}

async function assertGroupBelongsToCategory(
  categoryId: string,
  groupId: string
) {
  const { supabase } = await requireAdmin();

  const { data, error } = await supabase
    .from("product_groups")
    .select("id, category_id")
    .eq("id", groupId)
    .maybeSingle();

  if (error) {
    throw new Error(mapDbError(error.message));
  }

  if (!data || data.category_id !== categoryId) {
    throw new Error(
      "Selected product group does not belong to the selected category."
    );
  }
}

function readProductPayload(formData: FormData) {
  const name = readText(formData, "name");
  const slugInput = readText(formData, "slug");
  const model = readText(formData, "model");
  const categoryId = readText(formData, "category_id");
  const groupId = readText(formData, "group_id");
  const shortDescription = readText(formData, "short_description");
  const description = readText(formData, "description");
  const material = readText(formData, "material");
  const warranty = readText(formData, "warranty");
  const origin = readText(formData, "origin");
  const hsnCode = readText(formData, "hsn_code");
  const seoTitle = readText(formData, "seo_title");
  const seoDescription = readText(formData, "seo_description");
  const displayOrderRaw = readText(formData, "display_order");
  const imageUrl = readNullableUrl(formData, "imageUrl");
  const gallery = parseGallery(readText(formData, "galleryJson"));
  const features = parseFeatures(readText(formData, "featuresJson"));
  const specifications = parseSpecifications(
    readText(formData, "specificationsJson")
  );
  const customSizes = formData.get("custom_sizes") === "on";
  const featured = formData.get("featured") === "on";
  const isActive = formData.get("is_active") === "on";

  return {
    name,
    slugInput,
    model,
    categoryId,
    groupId,
    shortDescription,
    description,
    material,
    warranty,
    origin,
    hsnCode,
    seoTitle,
    seoDescription,
    displayOrderRaw,
    imageUrl,
    gallery,
    features,
    specifications,
    customSizes,
    featured,
    isActive,
  };
}

export async function createProduct(
  _prev: ProductActionState,
  formData: FormData
): Promise<ProductActionState> {
  const { supabase } = await requireAdmin();
  const payload = readProductPayload(formData);

  if (!payload.name) {
    return { error: "Product name is required." };
  }

  if (!payload.categoryId) {
    return { error: "Category is required." };
  }

  if (!payload.groupId) {
    return { error: "Product group is required." };
  }

  const slug = slugify(payload.slugInput || payload.name);
  if (!slug || !isValidSlug(slug)) {
    return { error: "Enter a valid lowercase URL-safe slug." };
  }

  const displayOrder = Number(payload.displayOrderRaw || "0");
  if (!Number.isFinite(displayOrder)) {
    return { error: "Display order must be a number." };
  }

  try {
    await assertGroupBelongsToCategory(payload.categoryId, payload.groupId);
    await assertUniqueSlugInCategory(payload.categoryId, slug);

    const { error } = await supabase.from("products").insert({
      category_id: payload.categoryId,
      group_id: payload.groupId,
      name: payload.name,
      slug,
      model: payload.model || null,
      short_description: payload.shortDescription || null,
      description: payload.description || null,
      image: payload.imageUrl,
      gallery: payload.gallery,
      features: payload.features,
      specifications: payload.specifications,
      material: payload.material || null,
      custom_sizes: payload.customSizes,
      warranty: payload.warranty || null,
      origin: payload.origin || null,
      hsn_code: payload.hsnCode || null,
      featured: payload.featured,
      is_active: payload.isActive,
      display_order: displayOrder,
      seo_title: payload.seoTitle || null,
      seo_description: payload.seoDescription || null,
    });

    if (error) {
      return { error: mapDbError(error.message) };
    }
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Unable to create product.",
    };
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProduct(
  id: string,
  _prev: ProductActionState,
  formData: FormData
): Promise<ProductActionState> {
  const { supabase } = await requireAdmin();
  const payload = readProductPayload(formData);

  if (!payload.name) {
    return { error: "Product name is required." };
  }

  if (!payload.categoryId) {
    return { error: "Category is required." };
  }

  if (!payload.groupId) {
    return { error: "Product group is required." };
  }

  const slug = slugify(payload.slugInput || payload.name);
  if (!slug || !isValidSlug(slug)) {
    return { error: "Enter a valid lowercase URL-safe slug." };
  }

  const displayOrder = Number(payload.displayOrderRaw || "0");
  if (!Number.isFinite(displayOrder)) {
    return { error: "Display order must be a number." };
  }

  try {
    await assertGroupBelongsToCategory(payload.categoryId, payload.groupId);
    await assertUniqueSlugInCategory(payload.categoryId, slug, id);

    const { error } = await supabase
      .from("products")
      .update({
        category_id: payload.categoryId,
        group_id: payload.groupId,
        name: payload.name,
        slug,
        model: payload.model || null,
        short_description: payload.shortDescription || null,
        description: payload.description || null,
        image: payload.imageUrl,
        gallery: payload.gallery,
        features: payload.features,
        specifications: payload.specifications,
        material: payload.material || null,
        custom_sizes: payload.customSizes,
        warranty: payload.warranty || null,
        origin: payload.origin || null,
        hsn_code: payload.hsnCode || null,
        featured: payload.featured,
        is_active: payload.isActive,
        display_order: displayOrder,
        seo_title: payload.seoTitle || null,
        seo_description: payload.seoDescription || null,
      })
      .eq("id", id);

    if (error) {
      return { error: mapDbError(error.message) };
    }
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Unable to update product.",
    };
  }

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}/edit`);
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  const { supabase } = await requireAdmin();

  const { data: product, error: loadError } = await supabase
    .from("products")
    .select("id, image, gallery")
    .eq("id", id)
    .maybeSingle();

  if (loadError) {
    return { error: mapDbError(loadError.message) };
  }

  if (!product) {
    return { error: "Product not found." };
  }

  const imageUrls = [
    typeof product.image === "string" ? product.image : null,
    ...(Array.isArray(product.gallery)
      ? product.gallery.filter((item): item is string => typeof item === "string")
      : []),
  ].filter((url): url is string => Boolean(url));

  const storageWarnings: string[] = [];

  for (const url of imageUrls) {
    if (!isSupabaseProductImageUrl(url)) continue;

    try {
      await deleteStorageObjectByPublicUrl(supabase, url);
    } catch (error) {
      storageWarnings.push(
        error instanceof Error ? error.message : "Storage cleanup failed."
      );
    }
  }

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    return { error: mapDbError(error.message) };
  }

  revalidatePath("/admin/products");

  if (storageWarnings.length) {
    return {
      error: `Product deleted, but some images could not be removed from storage: ${storageWarnings[0]}`,
    };
  }

  return {};
}

export async function duplicateProduct(id: string) {
  const { supabase } = await requireAdmin();

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return { error: mapDbError(error.message) };
  }

  if (!product) {
    return { error: "Product not found." };
  }

  const baseName = `${product.name} Copy`;
  let candidateSlug = slugify(`${product.slug}-copy`);
  let attempt = 1;

  while (true) {
    const { data: existing } = await supabase
      .from("products")
      .select("id")
      .eq("category_id", product.category_id)
      .eq("slug", candidateSlug)
      .limit(1);

    if (!existing?.length) break;
    attempt += 1;
    candidateSlug = slugify(`${product.slug}-copy-${attempt}`);
  }

  const { data: created, error: insertError } = await supabase
    .from("products")
    .insert({
      category_id: product.category_id,
      group_id: product.group_id,
      name: baseName,
      slug: candidateSlug,
      model: product.model,
      short_description: product.short_description,
      description: product.description,
      image: null,
      gallery: [],
      features: product.features ?? [],
      specifications: product.specifications ?? [],
      material: product.material,
      custom_sizes: product.custom_sizes,
      warranty: product.warranty,
      origin: product.origin,
      hsn_code: product.hsn_code,
      featured: false,
      is_active: false,
      display_order: product.display_order ?? 0,
      seo_title: product.seo_title,
      seo_description: product.seo_description,
    })
    .select("id")
    .single();

  if (insertError || !created) {
    return {
      error: mapDbError(insertError?.message || "Unable to duplicate product."),
    };
  }

  revalidatePath("/admin/products");
  redirect(`/admin/products/${created.id}/edit`);
}

function uniqueIds(ids: string[]) {
  return [...new Set(ids.map((id) => id.trim()).filter(Boolean))];
}

export async function bulkSetProductActive(ids: string[], isActive: boolean) {
  const { supabase } = await requireAdmin();
  const productIds = uniqueIds(ids);

  if (productIds.length === 0) {
    return { error: "Select at least one product." };
  }

  const { error } = await supabase
    .from("products")
    .update({ is_active: isActive })
    .in("id", productIds);

  if (error) {
    return { error: mapDbError(error.message) };
  }

  revalidatePath("/admin/products");
  return {};
}

export async function bulkSetProductFeatured(ids: string[], featured: boolean) {
  const { supabase } = await requireAdmin();
  const productIds = uniqueIds(ids);

  if (productIds.length === 0) {
    return { error: "Select at least one product." };
  }

  const { error } = await supabase
    .from("products")
    .update({ featured })
    .in("id", productIds);

  if (error) {
    return { error: mapDbError(error.message) };
  }

  revalidatePath("/admin/products");
  return {};
}

export async function bulkDeleteProducts(ids: string[]) {
  const productIds = uniqueIds(ids);

  if (productIds.length === 0) {
    return { error: "Select at least one product." };
  }

  const errors: string[] = [];

  for (const id of productIds) {
    const result = await deleteProduct(id);
    if (result?.error) {
      errors.push(result.error);
    }
  }

  revalidatePath("/admin/products");

  if (errors.length) {
    return {
      error:
        errors.length === productIds.length
          ? errors[0]
          : `Some products could not be deleted: ${errors[0]}`,
    };
  }

  return {};
}
