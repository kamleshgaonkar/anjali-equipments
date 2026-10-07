"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { isValidSlug, slugify } from "@/lib/admin/slug";

export type GroupActionState = {
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

export async function createProductGroup(
  _prev: GroupActionState,
  formData: FormData
): Promise<GroupActionState> {
  const { supabase } = await requireAdmin();

  const categoryId = readText(formData, "category_id");
  const name = readText(formData, "name");
  const slugInput = readText(formData, "slug");
  const description = readText(formData, "description");
  const displayOrderRaw = readText(formData, "display_order");
  const isActive = formData.get("is_active") === "on";
  const imageUrl = readNullableUrl(formData, "imageUrl");

  if (!categoryId) {
    return { error: "Category is required." };
  }

  if (!name) {
    return { error: "Group name is required." };
  }

  const slug = slugify(slugInput || name);

  if (!slug || !isValidSlug(slug)) {
    return { error: "Enter a valid lowercase URL-safe slug." };
  }

  const displayOrder = Number(displayOrderRaw || "0");
  if (!Number.isFinite(displayOrder)) {
    return { error: "Display order must be a number." };
  }

  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("id")
    .eq("id", categoryId)
    .maybeSingle();

  if (categoryError || !category) {
    return { error: "Selected category was not found." };
  }

  const { error } = await supabase.from("product_groups").insert({
    category_id: categoryId,
    name,
    slug,
    description: description || null,
    image: imageUrl,
    display_order: displayOrder,
    is_active: isActive,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/groups");
  revalidatePath("/admin/categories");
  redirect("/admin/groups");
}

export async function updateProductGroup(
  id: string,
  _prev: GroupActionState,
  formData: FormData
): Promise<GroupActionState> {
  const { supabase } = await requireAdmin();

  const categoryId = readText(formData, "category_id");
  const name = readText(formData, "name");
  const slugInput = readText(formData, "slug");
  const description = readText(formData, "description");
  const displayOrderRaw = readText(formData, "display_order");
  const isActive = formData.get("is_active") === "on";
  const imageUrl = readNullableUrl(formData, "imageUrl");

  if (!categoryId) {
    return { error: "Category is required." };
  }

  if (!name) {
    return { error: "Group name is required." };
  }

  const slug = slugify(slugInput || name);

  if (!slug || !isValidSlug(slug)) {
    return { error: "Enter a valid lowercase URL-safe slug." };
  }

  const displayOrder = Number(displayOrderRaw || "0");
  if (!Number.isFinite(displayOrder)) {
    return { error: "Display order must be a number." };
  }

  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("id")
    .eq("id", categoryId)
    .maybeSingle();

  if (categoryError || !category) {
    return { error: "Selected category was not found." };
  }

  const { error } = await supabase
    .from("product_groups")
    .update({
      category_id: categoryId,
      name,
      slug,
      description: description || null,
      image: imageUrl,
      display_order: displayOrder,
      is_active: isActive,
    })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/groups");
  revalidatePath(`/admin/groups/${id}/edit`);
  revalidatePath("/admin/categories");
  redirect("/admin/groups");
}

export async function deleteProductGroup(id: string) {
  const { supabase } = await requireAdmin();

  const { count, error: countError } = await supabase
    .from("products")
    .select("id", { count: "exact", head: true })
    .eq("group_id", id);

  if (countError) {
    return { error: countError.message };
  }

  if ((count ?? 0) > 0) {
    return {
      error:
        "This product group cannot be deleted because it contains products.",
    };
  }

  const { error } = await supabase
    .from("product_groups")
    .delete()
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/groups");
  revalidatePath("/admin/categories");
  return {};
}
