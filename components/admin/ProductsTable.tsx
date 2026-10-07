"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, X } from "lucide-react";
import ProductRowActions from "@/components/admin/ProductRowActions";
import ProductsCatalogueNav, {
  type ProductCatalogueCounts,
} from "@/components/admin/ProductsCatalogueNav";
import StatusBadge from "@/components/admin/StatusBadge";
import type {
  AdminCategory,
  AdminProductGroup,
  AdminProductListItem,
} from "@/types/admin-catalogue";
import {
  bulkDeleteProducts,
  bulkSetProductActive,
  bulkSetProductFeatured,
} from "@/app/admin/(panel)/products/actions";

export default function ProductsTable({
  products,
  categories,
  groups,
  counts,
  hasFilters,
}: {
  products: AdminProductListItem[];
  categories: Pick<AdminCategory, "id" | "name">[];
  groups: Pick<AdminProductGroup, "id" | "name" | "category_id">[];
  counts: ProductCatalogueCounts;
  hasFilters: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [catalogueOpen, setCatalogueOpen] = useState(false);
  const [bulkError, setBulkError] = useState<string | null>(null);
  const selectAllRef = useRef<HTMLInputElement>(null);

  const q = searchParams.get("q") ?? "";
  const categoryFilter = searchParams.get("category") ?? "";
  const groupFilter = searchParams.get("group") ?? "";
  const statusFilter = searchParams.get("status") ?? "";
  const featuredFilter = searchParams.get("featured") ?? "";

  const visibleIds = useMemo(
    () => products.map((product) => product.id),
    [products]
  );

  useEffect(() => {
    setSelected(new Set());
    setBulkError(null);
  }, [q, categoryFilter, groupFilter, statusFilter, featuredFilter, visibleIds.join(",")]);

  const selectedCount = selected.size;
  const allVisibleSelected =
    visibleIds.length > 0 && visibleIds.every((id) => selected.has(id));
  const someVisibleSelected = visibleIds.some((id) => selected.has(id));

  useEffect(() => {
    if (!selectAllRef.current) return;
    selectAllRef.current.indeterminate =
      someVisibleSelected && !allVisibleSelected;
  }, [allVisibleSelected, someVisibleSelected]);

  function updateParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) params.delete(key);
      else params.set(key, value);
    });

    const query = params.toString();
    router.push(query ? `/admin/products?${query}` : "/admin/products");
  }

  function selectAllProducts() {
    setCatalogueOpen(false);
    updateParams({ category: "", group: "" });
  }

  function selectCategory(categoryId: string) {
    setCatalogueOpen(false);
    updateParams({ category: categoryId, group: "" });
  }

  function selectGroup(groupId: string) {
    setCatalogueOpen(false);
    updateParams({ group: groupId, category: "" });
  }

  function toggleRow(id: string) {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAllVisible() {
    setSelected((current) => {
      if (allVisibleSelected) {
        const next = new Set(current);
        visibleIds.forEach((id) => next.delete(id));
        return next;
      }

      const next = new Set(current);
      visibleIds.forEach((id) => next.add(id));
      return next;
    });
  }

  function selectedIds() {
    return Array.from(selected);
  }

  function runBulk(
    action: () => Promise<{ error?: string } | void>,
    confirmMessage?: string
  ) {
    if (confirmMessage && !window.confirm(confirmMessage)) return;

    setBulkError(null);
    startTransition(async () => {
      const result = await action();
      if (result?.error) {
        setBulkError(result.error);
        return;
      }
      setSelected(new Set());
    });
  }

  const catalogue = (
    <ProductsCatalogueNav
      categories={categories}
      groups={groups}
      counts={counts}
      selectedCategory={categoryFilter}
      selectedGroup={groupFilter}
      onSelectAll={selectAllProducts}
      onSelectCategory={selectCategory}
      onSelectGroup={selectGroup}
    />
  );

  return (
    <div className="mt-8 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start lg:gap-5 xl:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="sticky top-4 hidden max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 lg:block">
        <p className="mb-3 px-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          Catalogue
        </p>
        {catalogue}
      </aside>

      <div className="min-w-0">
        <div className="sticky top-0 z-20 space-y-3 bg-white/95 pb-3 pt-1 backdrop-blur-sm">
          <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-end">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Search
              </label>
              <input
                defaultValue={q}
                placeholder="Product name or model"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    updateParams({
                      q: (event.target as HTMLInputElement).value.trim(),
                    });
                  }
                }}
                onBlur={(event) =>
                  updateParams({ q: event.target.value.trim() })
                }
                className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[#8b191c]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(event) =>
                  updateParams({ status: event.target.value })
                }
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#8b191c] md:w-36"
              >
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="flex items-end gap-3">
              <div className="min-w-0 flex-1 md:flex-none">
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Featured
                </label>
                <select
                  value={featuredFilter}
                  onChange={(event) =>
                    updateParams({ featured: event.target.value })
                  }
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#8b191c] md:w-40"
                >
                  <option value="">All</option>
                  <option value="yes">Featured</option>
                  <option value="no">Not featured</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setCatalogueOpen(true)}
                className="inline-flex h-[42px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 lg:hidden"
              >
                <Filter size={16} />
                Catalogue
              </button>
            </div>
          </div>

          {selectedCount > 0 ? (
            <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="mr-2 text-sm font-semibold text-slate-800">
                {selectedCount} selected
              </p>
              <button
                type="button"
                disabled={pending}
                onClick={() =>
                  runBulk(() => bulkSetProductActive(selectedIds(), true))
                }
                className="rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-white disabled:opacity-60"
              >
                Activate
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={() =>
                  runBulk(() => bulkSetProductActive(selectedIds(), false))
                }
                className="rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-white disabled:opacity-60"
              >
                Deactivate
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={() =>
                  runBulk(() => bulkSetProductFeatured(selectedIds(), true))
                }
                className="rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-white disabled:opacity-60"
              >
                Set Featured
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={() =>
                  runBulk(() => bulkSetProductFeatured(selectedIds(), false))
                }
                className="rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-white disabled:opacity-60"
              >
                Remove Featured
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={() =>
                  runBulk(
                    () => bulkDeleteProducts(selectedIds()),
                    `Delete ${selectedCount} product${selectedCount === 1 ? "" : "s"}? This action cannot be undone.`
                  )
                }
                className="rounded-lg px-3 py-1.5 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60"
              >
                Delete
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={() => setSelected(new Set())}
                className="ml-auto rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-500 hover:bg-white"
              >
                Clear
              </button>
            </div>
          ) : null}

          {bulkError ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
              {bulkError}
            </p>
          ) : null}
        </div>

        {products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <h2 className="text-xl font-semibold text-slate-900">
              {hasFilters ? "No matching products" : "No products yet"}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {hasFilters
                ? "Try adjusting your search or filters."
                : "Create your first product to populate the catalogue."}
            </p>
            {!hasFilters ? (
              <Link
                href="/admin/products/new"
                className="mt-6 inline-flex rounded-xl bg-[#8b191c] px-5 py-3 text-sm font-semibold text-white"
              >
                + Add Product
              </Link>
            ) : null}
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-[920px] w-full text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="w-12 px-4 py-3">
                      <input
                        ref={selectAllRef}
                        type="checkbox"
                        checked={allVisibleSelected}
                        onChange={toggleAllVisible}
                        aria-label="Select visible products"
                        className="h-4 w-4 rounded border-slate-300 text-[#8b191c] focus:ring-[#8b191c]"
                      />
                    </th>
                    <th className="px-4 py-3 font-semibold">Product</th>
                    <th className="px-4 py-3 font-semibold">Model</th>
                    <th className="px-4 py-3 font-semibold">Category</th>
                    <th className="px-4 py-3 font-semibold">Product Group</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Featured</th>
                    <th className="px-4 py-3 font-semibold">Display Order</th>
                    <th className="px-4 py-3 font-semibold text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => {
                    const hasImage = Boolean(product.image?.trim());
                    const editHref = `/admin/products/${product.id}/edit`;

                    return (
                      <tr
                        key={product.id}
                        className="border-b border-slate-100 last:border-b-0"
                      >
                        <td className="px-4 py-4">
                          <input
                            type="checkbox"
                            checked={selected.has(product.id)}
                            onChange={() => toggleRow(product.id)}
                            aria-label={`Select ${product.name}`}
                            className="h-4 w-4 rounded border-slate-300 text-[#8b191c] focus:ring-[#8b191c]"
                          />
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <Link
                              href={editHref}
                              className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-50"
                            >
                              {hasImage ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={product.image ?? ""}
                                  alt=""
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <span className="flex h-full items-center justify-center px-1 text-center text-[9px] font-semibold leading-tight text-slate-400">
                                  Missing image
                                </span>
                              )}
                            </Link>
                            <Link
                              href={editHref}
                              className="font-semibold text-slate-900 transition hover:text-[#8b191c]"
                            >
                              {product.name}
                            </Link>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-slate-600">
                          {product.model || "—"}
                        </td>
                        <td className="px-4 py-4 text-slate-700">
                          {product.categories?.name || "—"}
                        </td>
                        <td className="px-4 py-4 text-slate-700">
                          {product.product_groups?.name || "—"}
                        </td>
                        <td className="px-4 py-4">
                          <StatusBadge active={product.is_active} />
                        </td>
                        <td className="px-4 py-4 text-slate-700">
                          {product.featured ? "Yes" : "No"}
                        </td>
                        <td className="px-4 py-4 text-slate-700">
                          {product.display_order}
                        </td>
                        <td className="px-4 py-4">
                          <ProductRowActions productId={product.id} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {catalogueOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close catalogue"
            className="absolute inset-0 bg-black/40"
            onClick={() => setCatalogueOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[min(320px,88vw)] flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <p className="text-sm font-semibold text-slate-900">Catalogue</p>
              <button
                type="button"
                aria-label="Close catalogue"
                onClick={() => setCatalogueOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3">{catalogue}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
