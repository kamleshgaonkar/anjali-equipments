import AdminPageHeader from "@/components/admin/AdminPageHeader";
import CategoriesTable from "@/components/admin/CategoriesTable";
import { requireAdmin } from "@/lib/admin/auth";
import type {
  AdminCategory,
  AdminCategoryWithCounts,
} from "@/types/admin-catalogue";

export default async function AdminCategoriesPage() {
  const { supabase } = await requireAdmin();

  const { data, error } = await supabase
    .from("categories")
    .select("*, product_groups(count)")
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    return (
      <div>
        <AdminPageHeader
          title="Categories"
          description="Manage top-level product categories."
          actionHref="/admin/categories/new"
          actionLabel="+ Add Category"
        />
        <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-6 py-5 text-sm text-red-700">
          Unable to load categories: {error.message}
        </div>
      </div>
    );
  }

  const categories: AdminCategoryWithCounts[] = (data ?? []).map(
    (row: AdminCategory & { product_groups?: { count: number }[] }) => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      description: row.description,
      hero_image: row.hero_image,
      display_order: row.display_order,
      is_active: row.is_active,
      created_at: row.created_at,
      updated_at: row.updated_at,
      product_groups_count: row.product_groups?.[0]?.count ?? 0,
    })
  );

  return (
    <div>
      <AdminPageHeader
        title="Categories"
        description="Manage top-level product categories for the website catalogue."
        actionHref="/admin/categories/new"
        actionLabel="+ Add Category"
      />
      <CategoriesTable categories={categories} />
    </div>
  );
}
