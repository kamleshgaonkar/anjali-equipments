"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { isValidSlug, slugify } from "@/lib/admin/slug";

export type CategoryActionState = {
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

export async function createCategory(
  _prev: CategoryActionState,
  formData: FormData
): Promise<CategoryActionState> {
  const { supabase } = await requireAdmin();

  const name = readText(formData, "name");
  const slugInput = readText(formData, "slug");
  const description = readText(formData, "description");
  const displayOrderRaw = readText(formData, "display_order");
  const isActive = formData.get("is_active") === "on";
  const heroImageUrl = readNullableUrl(formData, "heroImageUrl");

  if (!name) {
    return { error: "Category name is required." };
  }

  const slug = slugify(slugInput || name);

  if (!slug || !isValidSlug(slug)) {
    return { error: "Enter a valid lowercase URL-safe slug." };
  }

  const displayOrder = Number(displayOrderRaw || "0");
  if (!Number.isFinite(displayOrder)) {
    return { error: "Display order must be a number." };
  }

  const { error } = await supabase.from("categories").insert({
    name,
    slug,
    description: description || null,
    hero_image: heroImageUrl,
    display_order: displayOrder,
    is_active: isActive,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function updateCategory(
  id: string,
  _prev: CategoryActionState,
  formData: FormData
): Promise<CategoryActionState> {
  const { supabase } = await requireAdmin();

  const name = readText(formData, "name");
  const slugInput = readText(formData, "slug");
  const description = readText(formData, "description");
  const displayOrderRaw = readText(formData, "display_order");
  const isActive = formData.get("is_active") === "on";
  const heroImageUrl = readNullableUrl(formData, "heroImageUrl");

  if (!name) {
    return { error: "Category name is required." };
  }

  const slug = slugify(slugInput || name);

  if (!slug || !isValidSlug(slug)) {
    return { error: "Enter a valid lowercase URL-safe slug." };
  }

  const displayOrder = Number(displayOrderRaw || "0");
  if (!Number.isFinite(displayOrder)) {
    return { error: "Display order must be a number." };
  }

  const { error } = await supabase
    .from("categories")
    .update({
      name,
      slug,
      description: description || null,
      hero_image: heroImageUrl,
      display_order: displayOrder,
      is_active: isActive,
    })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/categories");
  revalidatePath(`/admin/categories/${id}/edit`);
  redirect("/admin/categories");
}

export async function deleteCategory(id: string) {
  const { supabase } = await requireAdmin();

  const { count: groupCount, error: groupError } = await supabase
    .from("product_groups")
    .select("id", { count: "exact", head: true })
    .eq("category_id", id);

  if (groupError) {
    return { error: groupError.message };
  }

  if ((groupCount ?? 0) > 0) {
    return {
      error:
        "This category cannot be deleted because it contains product groups or products.",
    };
  }

  const { count: productCount, error: productError } = await supabase
    .from("products")
    .select("id", { count: "exact", head: true })
    .eq("category_id", id);

  if (productError) {
    if (!productError.message.toLowerCase().includes("category_id")) {
      return { error: productError.message };
    }
  } else if ((productCount ?? 0) > 0) {
    return {
      error:
        "This category cannot be deleted because it contains product groups or products.",
    };
  }

  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/categories");
  return {};
}
