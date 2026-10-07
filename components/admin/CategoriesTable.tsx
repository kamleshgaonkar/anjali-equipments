"use client";

import Link from "next/link";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import StatusBadge from "@/components/admin/StatusBadge";
import type { AdminCategoryWithCounts } from "@/types/admin-catalogue";
import { deleteCategory } from "@/app/admin/(panel)/categories/actions";

export default function CategoriesTable({
  categories,
}: {
  categories: AdminCategoryWithCounts[];
}) {
  if (categories.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <h2 className="text-xl font-semibold text-slate-900">
          No categories yet
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Create your first category to start organising the catalogue.
        </p>
        <Link
          href="/admin/categories/new"
          className="mt-6 inline-flex rounded-xl bg-[#8b191c] px-5 py-3 text-sm font-semibold text-white"
        >
          + Add Category
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 font-semibold">Category Name</th>
              <th className="px-4 py-3 font-semibold">Slug</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Display Order</th>
              <th className="px-4 py-3 font-semibold">Product Groups</th>
              <th className="px-4 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr
                key={category.id}
                className="border-b border-slate-100 last:border-b-0"
              >
                <td className="px-4 py-4 font-semibold text-slate-900">
                  {category.name}
                </td>
                <td className="px-4 py-4 text-slate-600">{category.slug}</td>
                <td className="px-4 py-4">
                  <StatusBadge active={category.is_active} />
                </td>
                <td className="px-4 py-4 text-slate-700">
                  {category.display_order}
                </td>
                <td className="px-4 py-4 text-slate-700">
                  {category.product_groups_count}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/categories/${category.id}/edit`}
                      className="rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      Edit
                    </Link>
                    <ConfirmDeleteButton
                      confirmMessage={`Delete category "${category.name}"? This cannot be undone.`}
                      onConfirm={() => deleteCategory(category.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
