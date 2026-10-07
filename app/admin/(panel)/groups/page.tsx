import { Suspense } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProductGroupsTable from "@/components/admin/ProductGroupsTable";
import { requireAdmin } from "@/lib/admin/auth";
import type {
  AdminCategory,
  AdminProductGroupWithCategory,
} from "@/types/admin-catalogue";

type Props = {
  searchParams: Promise<{
    category?: string;
    status?: string;
  }>;
};

export default async function AdminGroupsPage({ searchParams }: Props) {
  const { category, status } = await searchParams;
  const { supabase } = await requireAdmin();

  const { data: categoriesData } = await supabase
    .from("categories")
    .select("id, name")
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  const categories = (categoriesData ?? []) as Pick<
    AdminCategory,
    "id" | "name"
  >[];

  let query = supabase
    .from("product_groups")
    .select(
      "id, category_id, name, slug, description, image, display_order, is_active, created_at, updated_at, categories(id, name, slug)"
    )
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  if (category) {
    query = query.eq("category_id", category);
  }

  if (status === "active") {
    query = query.eq("is_active", true);
  }

  if (status === "inactive") {
    query = query.eq("is_active", false);
  }

  const { data, error } = await query;

  if (error) {
    return (
      <div>
        <AdminPageHeader
          title="Product Groups"
          description="Manage subcategory groups within each category."
          actionHref="/admin/groups/new"
          actionLabel="+ Add Product Group"
        />
        <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-6 py-5 text-sm text-red-700">
          Unable to load product groups: {error.message}
        </div>
      </div>
    );
  }

  const groups = (data ?? []) as unknown as AdminProductGroupWithCategory[];

  return (
    <div>
      <AdminPageHeader
        title="Product Groups"
        description="Manage subcategory groups within each category."
        actionHref="/admin/groups/new"
        actionLabel="+ Add Product Group"
      />

      <Suspense
        fallback={
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white px-6 py-10 text-sm text-slate-500">
            Loading product groups...
          </div>
        }
      >
        <ProductGroupsTable groups={groups} categories={categories} />
      </Suspense>
    </div>
  );
}
