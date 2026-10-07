import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import CategoryForm from "@/components/admin/CategoryForm";
import { requireAdmin } from "@/lib/admin/auth";

export default async function NewCategoryPage() {
  await requireAdmin();

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/categories"
          className="text-sm font-semibold text-slate-600 transition hover:text-[#8b191c]"
        >
          ← Back to Categories
        </Link>
      </div>

      <AdminPageHeader
        title="Add Category"
        description="Create a new top-level catalogue category."
      />

      <div className="mt-8">
        <CategoryForm />
      </div>
    </div>
  );
}
