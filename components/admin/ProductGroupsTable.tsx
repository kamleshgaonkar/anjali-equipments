"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import StatusBadge from "@/components/admin/StatusBadge";
import type {
  AdminCategory,
  AdminProductGroupWithCategory,
} from "@/types/admin-catalogue";
import { deleteProductGroup } from "@/app/admin/(panel)/groups/actions";

export default function ProductGroupsTable({
  groups,
  categories,
}: {
  groups: AdminProductGroupWithCategory[];
  categories: Pick<AdminCategory, "id" | "name">[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category") ?? "";
  const statusFilter = searchParams.get("status") ?? "";

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const query = params.toString();
    router.push(query ? `/admin/groups?${query}` : "/admin/groups");
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Category
          </label>
          <select
            value={categoryFilter}
            onChange={(event) => updateFilter("category", event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#8b191c]"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(event) => updateFilter("status", event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#8b191c]"
          >
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {groups.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <h2 className="text-xl font-semibold text-slate-900">
            No product groups found
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Create a product group or adjust your filters.
          </p>
          <Link
            href="/admin/groups/new"
            className="mt-6 inline-flex rounded-xl bg-[#8b191c] px-5 py-3 text-sm font-semibold text-white"
          >
            + Add Product Group
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Group Name</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Slug</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Display Order</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((group) => (
                  <tr
                    key={group.id}
                    className="border-b border-slate-100 last:border-b-0"
                  >
                    <td className="px-4 py-4 font-semibold text-slate-900">
                      {group.name}
                    </td>
                    <td className="px-4 py-4 text-slate-700">
                      {group.categories?.name ?? "—"}
                    </td>
                    <td className="px-4 py-4 text-slate-600">{group.slug}</td>
                    <td className="px-4 py-4">
                      <StatusBadge active={group.is_active} />
                    </td>
                    <td className="px-4 py-4 text-slate-700">
                      {group.display_order}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/groups/${group.id}/edit`}
                          className="rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                        >
                          Edit
                        </Link>
                        <ConfirmDeleteButton
                          confirmMessage={`Delete product group "${group.name}"? This cannot be undone.`}
                          onConfirm={() => deleteProductGroup(group.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
