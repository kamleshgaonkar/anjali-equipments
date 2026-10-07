"use client";

import {
  resolveScopeLink,
  scopeLinkValue,
  type ScopeCategoryOption,
  type ScopeGroupOption,
} from "@/lib/admin/project-scope";
import type { ProjectScopeItem } from "@/types/admin-catalogue";

type ProjectScopeEditorProps = {
  name: string;
  value: ProjectScopeItem[];
  onChange: (items: ProjectScopeItem[]) => void;
  categories: ScopeCategoryOption[];
  groups: ScopeGroupOption[];
};

function emptyItem(): ProjectScopeItem {
  return {
    label: "",
    href: null,
    linkType: "none",
    categoryId: null,
    groupId: null,
  };
}

export default function ProjectScopeEditor({
  name,
  value,
  onChange,
  categories,
  groups,
}: ProjectScopeEditorProps) {
  function updateAt(index: number, next: ProjectScopeItem) {
    const copy = [...value];
    copy[index] = next;
    onChange(copy);
  }

  function updateLabel(index: number, label: string) {
    updateAt(index, { ...value[index], label });
  }

  function updateLink(index: number, linkValue: string) {
    const resolved = resolveScopeLink(linkValue, categories, groups);
    updateAt(index, { ...value[index], ...resolved });
  }

  function removeAt(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function move(index: number, direction: -1 | 1) {
    const next = index + direction;
    if (next < 0 || next >= value.length) return;
    const copy = [...value];
    const [item] = copy.splice(index, 1);
    copy.splice(next, 0, item);
    onChange(copy);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <label className="block text-sm font-semibold text-slate-700">
            Equipment supplied on this project
          </label>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Labels can be custom. Link each item to a category or product group
            page, or leave it as plain text.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onChange([...value, emptyItem()])}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          + Add Scope Item
        </button>
      </div>

      <input type="hidden" name={name} value={JSON.stringify(value)} />

      <div className="mt-3 space-y-3">
        {value.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-500">
            No project scope items yet. Add the equipment actually supplied.
          </p>
        ) : (
          value.map((item, index) => (
            <div
              key={`scope-${index}`}
              className="rounded-xl border border-slate-200 p-4"
            >
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Scope Label
                  </label>
                  <input
                    value={item.label}
                    onChange={(event) => updateLabel(index, event.target.value)}
                    placeholder="e.g. Preparation Tables"
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#8b191c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Link To
                  </label>
                  <select
                    value={scopeLinkValue(item)}
                    onChange={(event) => updateLink(index, event.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#8b191c]"
                  >
                    <option value="none">No link</option>
                    <optgroup label="Categories">
                      {categories.map((category) => (
                        <option
                          key={category.id}
                          value={`category:${category.id}`}
                        >
                          {category.name}
                          {!category.is_active ? " (Inactive)" : ""}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Product Groups">
                      {groups.map((group) => {
                        const category = categories.find(
                          (option) => option.id === group.category_id
                        );

                        return (
                          <option key={group.id} value={`group:${group.id}`}>
                            {category
                              ? `${category.name} › ${group.name}`
                              : group.name}
                            {!group.is_active ? " (Inactive)" : ""}
                          </option>
                        );
                      })}
                    </optgroup>
                  </select>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs text-slate-500">
                  {item.href ? (
                    <>
                      Public URL:{" "}
                      <span className="font-medium text-slate-700">
                        {item.href}
                      </span>
                    </>
                  ) : (
                    "Shown as plain text on the project page."
                  )}
                </p>
                <div className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    className="rounded-md px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40"
                  >
                    Up
                  </button>
                  <button
                    type="button"
                    onClick={() => move(index, 1)}
                    disabled={index === value.length - 1}
                    className="rounded-md px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40"
                  >
                    Down
                  </button>
                  <button
                    type="button"
                    onClick={() => removeAt(index)}
                    className="rounded-md px-2 py-1 text-xs font-semibold text-red-700 hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
