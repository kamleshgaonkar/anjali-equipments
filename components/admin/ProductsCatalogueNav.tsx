"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { AdminCategory, AdminProductGroup } from "@/types/admin-catalogue";

export type ProductCatalogueCounts = {
  total: number;
  byCategory: Record<string, number>;
  byGroup: Record<string, number>;
};

type ProductsCatalogueNavProps = {
  categories: Pick<AdminCategory, "id" | "name">[];
  groups: Pick<AdminProductGroup, "id" | "name" | "category_id">[];
  counts: ProductCatalogueCounts;
  selectedCategory: string;
  selectedGroup: string;
  onSelectAll: () => void;
  onSelectCategory: (categoryId: string) => void;
  onSelectGroup: (groupId: string, categoryId: string) => void;
};

export default function ProductsCatalogueNav({
  categories,
  groups,
  counts,
  selectedCategory,
  selectedGroup,
  onSelectAll,
  onSelectCategory,
  onSelectGroup,
}: ProductsCatalogueNavProps) {
  const groupsByCategory = useMemo(() => {
    const map = new Map<string, Pick<AdminProductGroup, "id" | "name" | "category_id">[]>();

    groups.forEach((group) => {
      const list = map.get(group.category_id) ?? [];
      list.push(group);
      map.set(group.category_id, list);
    });

    return map;
  }, [groups]);

  const selectedParentCategory = useMemo(() => {
    if (selectedGroup) {
      return groups.find((group) => group.id === selectedGroup)?.category_id ?? "";
    }
    return selectedCategory;
  }, [groups, selectedCategory, selectedGroup]);

  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(selectedParentCategory ? [selectedParentCategory] : [])
  );

  useEffect(() => {
    if (!selectedParentCategory) return;
    setExpanded((current) => {
      if (current.has(selectedParentCategory)) return current;
      const next = new Set(current);
      next.add(selectedParentCategory);
      return next;
    });
  }, [selectedParentCategory]);

  const allSelected = !selectedCategory && !selectedGroup;

  function toggleCategory(categoryId: string) {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(categoryId)) next.delete(categoryId);
      else next.add(categoryId);
      return next;
    });
  }

  return (
    <nav className="text-sm">
      <button
        type="button"
        onClick={onSelectAll}
        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left font-semibold transition ${
          allSelected
            ? "bg-[#8b191c] text-white"
            : "text-slate-800 hover:bg-slate-100"
        }`}
      >
        <span>All Products</span>
        <span
          className={`text-xs font-semibold ${
            allSelected ? "text-white/80" : "text-slate-400"
          }`}
        >
          {counts.total}
        </span>
      </button>

      <div className="mt-3 space-y-1">
        {categories.map((category) => {
          const isExpanded = expanded.has(category.id);
          const isCategorySelected =
            !selectedGroup && selectedCategory === category.id;
          const categoryGroups = groupsByCategory.get(category.id) ?? [];
          const categoryCount = counts.byCategory[category.id] ?? 0;

          return (
            <div key={category.id}>
              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  aria-label={
                    isExpanded
                      ? `Collapse ${category.name}`
                      : `Expand ${category.name}`
                  }
                  onClick={() => toggleCategory(category.id)}
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
                >
                  {isExpanded ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory(category.id);
                    setExpanded((current) => new Set(current).add(category.id));
                  }}
                  className={`flex min-w-0 flex-1 items-center justify-between rounded-xl px-2 py-1.5 text-left font-semibold transition ${
                    isCategorySelected
                      ? "bg-[#8b191c] text-white"
                      : "text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  <span className="truncate">{category.name}</span>
                  <span
                    className={`ml-2 shrink-0 text-xs font-semibold ${
                      isCategorySelected ? "text-white/80" : "text-slate-400"
                    }`}
                  >
                    {categoryCount}
                  </span>
                </button>
              </div>

              {isExpanded ? (
                <div className="ml-8 mt-0.5 space-y-0.5 border-l border-slate-200 pl-2">
                  {categoryGroups.length === 0 ? (
                    <p className="px-2 py-1.5 text-xs text-slate-400">
                      No product groups
                    </p>
                  ) : (
                    categoryGroups.map((group) => {
                      const isGroupSelected = selectedGroup === group.id;
                      const groupCount = counts.byGroup[group.id] ?? 0;

                      return (
                        <button
                          key={group.id}
                          type="button"
                          onClick={() => onSelectGroup(group.id, category.id)}
                          className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left transition ${
                            isGroupSelected
                              ? "bg-[#8b191c] text-white"
                              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                          }`}
                        >
                          <span className="truncate">{group.name}</span>
                          <span
                            className={`ml-2 shrink-0 text-xs font-semibold ${
                              isGroupSelected ? "text-white/80" : "text-slate-400"
                            }`}
                          >
                            {groupCount}
                          </span>
                        </button>
                      );
                    })
                  )}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
