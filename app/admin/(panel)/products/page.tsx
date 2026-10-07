import { Suspense } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProductsTable from "@/components/admin/ProductsTable";
import { requireAdmin } from "@/lib/admin/auth";
import type {
  AdminCategory,
  AdminProductGroup,
  AdminProductListItem,
} from "@/types/admin-catalogue";

type Props = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    group?: string;
    status?: string;
    featured?: string;
  }>;
};

export default async function AdminProductsPage({ searchParams }: Props) {
  const { q, category, group, status, featured } = await searchParams;
  const { supabase } = await requireAdmin();

  const [{ data: categoriesData }, { data: groupsData }, { data: countRows }] =
    await Promise.all([
      supabase
        .from("categories")
        .select("id, name")
        .order("display_order", { ascending: true })
        .order("name", { ascending: true }),
      supabase
        .from("product_groups")
        .select("id, name, category_id")
        .order("display_order", { ascending: true })
        .order("name", { ascending: true }),
      supabase.from("products").select("category_id, group_id"),
    ]);

  const categories = (categoriesData ?? []) as Pick<
    AdminCategory,
    "id" | "name"
  >[];
  const groups = (groupsData ?? []) as Pick<
    AdminProductGroup,
    "id" | "name" | "category_id"
  >[];

  const counts = {
    total: 0,
    byCategory: {} as Record<string, number>,
    byGroup: {} as Record<string, number>,
  };

  (countRows ?? []).forEach((row) => {
    const item = row as { category_id?: string | null; group_id?: string | null };
    counts.total += 1;
    if (item.category_id) {
      counts.byCategory[item.category_id] =
        (counts.byCategory[item.category_id] ?? 0) + 1;
    }
    if (item.group_id) {
      counts.byGroup[item.group_id] = (counts.byGroup[item.group_id] ?? 0) + 1;
    }
  });

  let query = supabase
    .from("products")
    .select(
      "id, category_id, group_id, name, slug, model, image, featured, is_active, display_order, categories(id, name, slug), product_groups(id, name, slug, category_id)"
    )
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  if (q?.trim()) {
    const term = q.trim().replaceAll(",", " ");
    query = query.or(`name.ilike.%${term}%,model.ilike.%${term}%`);
  }

  if (category) {
    query = query.eq("category_id", category);
  }

  if (group) {
    query = query.eq("group_id", group);
  }

  if (status === "active") {
    query = query.eq("is_active", true);
  }

  if (status === "inactive") {
    query = query.eq("is_active", false);
  }

  if (featured === "yes") {
    query = query.eq("featured", true);
  }

  if (featured === "no") {
    query = query.eq("featured", false);
  }

  const { data, error } = await query;

  const hasFilters = Boolean(
    q?.trim() || category || group || status || featured
  );

  if (error) {
    return (
      <div>
        <AdminPageHeader
          title="Products"
          description="Manage commercial kitchen equipment products."
          actionHref="/admin/products/new"
          actionLabel="+ Add Product"
        />
        <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-6 py-5 text-sm text-red-700">
          Unable to load products: {error.message}
        </div>
      </div>
    );
  }

  const products = (data ?? []) as unknown as AdminProductListItem[];

  return (
    <div>
      <AdminPageHeader
        title="Products"
        description="Manage commercial kitchen equipment products."
        actionHref="/admin/products/new"
        actionLabel="+ Add Product"
      />

      <Suspense
        fallback={
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white px-6 py-10 text-sm text-slate-500">
            Loading products...
          </div>
        }
      >
        <ProductsTable
          products={products}
          categories={categories}
          groups={groups}
          counts={counts}
          hasFilters={hasFilters}
        />
      </Suspense>
    </div>
  );
}
