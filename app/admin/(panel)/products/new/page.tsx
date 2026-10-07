import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProductForm from "@/components/admin/ProductForm";
import { requireAdmin } from "@/lib/admin/auth";
import type { AdminCategory, AdminProductGroup } from "@/types/admin-catalogue";

export default async function NewProductPage() {
  const { supabase } = await requireAdmin();

  const [{ data: categoriesData }, { data: groupsData }] = await Promise.all([
    supabase
      .from("categories")
      .select("id, name, slug, is_active")
      .order("display_order", { ascending: true })
      .order("name", { ascending: true }),
    supabase
      .from("product_groups")
      .select("id, name, slug, category_id, is_active")
      .order("display_order", { ascending: true })
      .order("name", { ascending: true }),
  ]);

  const categories = (categoriesData ?? []) as Pick<
    AdminCategory,
    "id" | "name" | "slug" | "is_active"
  >[];
  const groups = (groupsData ?? []) as Pick<
    AdminProductGroup,
    "id" | "name" | "slug" | "category_id" | "is_active"
  >[];

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/products"
          className="text-sm font-semibold text-slate-600 transition hover:text-[#8b191c]"
        >
          ← Back to Products
        </Link>
      </div>

      <AdminPageHeader
        title="Add Product"
        description="Create a new catalogue product."
      />

      <div className="mt-8">
        {categories.length === 0 || groups.length === 0 ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5 text-sm text-amber-800">
            Create at least one category and one product group before adding
            products.
          </div>
        ) : (
          <ProductForm categories={categories} groups={groups} />
        )}
      </div>
    </div>
  );
}
