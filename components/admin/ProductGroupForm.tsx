"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { slugify } from "@/lib/admin/slug";
import { buildGroupImagePath } from "@/lib/admin/storage";
import type {
  AdminCategory,
  AdminProductGroup,
} from "@/types/admin-catalogue";
import {
  createProductGroup,
  updateProductGroup,
  type GroupActionState,
} from "@/app/admin/(panel)/groups/actions";

const initialState: GroupActionState = {};

export default function ProductGroupForm({
  group,
  categories,
}: {
  group?: AdminProductGroup;
  categories: Pick<AdminCategory, "id" | "name" | "slug" | "is_active">[];
}) {
  const isEdit = Boolean(group);
  const boundUpdate = updateProductGroup.bind(null, group?.id ?? "");
  const [state, formAction, pending] = useActionState(
    isEdit ? boundUpdate : createProductGroup,
    initialState
  );

  const [categoryId, setCategoryId] = useState(group?.category_id ?? "");
  const [name, setName] = useState(group?.name ?? "");
  const [slug, setSlug] = useState(group?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [imageUrl, setImageUrl] = useState<string | null>(group?.image ?? null);

  useEffect(() => {
    if (!slugTouched) {
      setSlug(slugify(name));
    }
  }, [name, slugTouched]);

  const selectableCategories = categories.filter(
    (category) => category.is_active || category.id === group?.category_id
  );

  const selectedCategorySlug = useMemo(() => {
    return (
      selectableCategories.find((category) => category.id === categoryId)
        ?.slug ?? ""
    );
  }, [selectableCategories, categoryId]);

  const normalizedGroupSlug = slugify(slug);
  const canUpload = Boolean(selectedCategorySlug && normalizedGroupSlug);

  return (
    <form action={formAction} className="mx-auto max-w-3xl space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="grid gap-5">
          <div>
            <label
              htmlFor="group-category"
              className="block text-sm font-semibold text-slate-700"
            >
              Category *
            </label>
            <select
              id="group-category"
              name="category_id"
              required
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#8b191c] focus:ring-2 focus:ring-[#8b191c]/20"
            >
              <option value="" disabled>
                Select a category
              </option>
              {selectableCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                  {!category.is_active ? " (Inactive)" : ""}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="group-name"
              className="block text-sm font-semibold text-slate-700"
            >
              Group Name *
            </label>
            <input
              id="group-name"
              name="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#8b191c] focus:ring-2 focus:ring-[#8b191c]/20"
            />
          </div>

          <div>
            <label
              htmlFor="group-slug"
              className="block text-sm font-semibold text-slate-700"
            >
              Slug *
            </label>
            <input
              id="group-slug"
              name="slug"
              required
              value={slug}
              onChange={(event) => {
                setSlugTouched(true);
                setSlug(event.target.value);
              }}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#8b191c] focus:ring-2 focus:ring-[#8b191c]/20"
            />
          </div>

          <div>
            <label
              htmlFor="group-description"
              className="block text-sm font-semibold text-slate-700"
            >
              Description
            </label>
            <textarea
              id="group-description"
              name="description"
              rows={4}
              defaultValue={group?.description ?? ""}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#8b191c] focus:ring-2 focus:ring-[#8b191c]/20"
            />
          </div>

          <ImageUploadField
            name="imageUrl"
            label="Image"
            value={imageUrl}
            onChange={setImageUrl}
            canUpload={canUpload}
            uploadBlockedMessage="Select a category and enter a group slug before uploading an image."
            getStoragePath={(file) =>
              buildGroupImagePath(
                selectedCategorySlug,
                normalizedGroupSlug,
                file
              )
            }
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="group-display-order"
                className="block text-sm font-semibold text-slate-700"
              >
                Display Order
              </label>
              <input
                id="group-display-order"
                name="display_order"
                type="number"
                defaultValue={group?.display_order ?? 0}
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#8b191c] focus:ring-2 focus:ring-[#8b191c]/20"
              />
            </div>

            <div className="flex items-end">
              <label className="inline-flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">
                <input
                  type="checkbox"
                  name="is_active"
                  defaultChecked={group?.is_active ?? true}
                  className="h-4 w-4 rounded border-slate-300 text-[#8b191c] focus:ring-[#8b191c]"
                />
                Active
              </label>
            </div>
          </div>
        </div>

        {state.error ? (
          <p
            role="alert"
            className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            {state.error}
          </p>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center justify-center rounded-xl bg-[#8b191c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#731417] disabled:opacity-70"
          >
            {pending
              ? "Saving..."
              : isEdit
                ? "Save Changes"
                : "Create Product Group"}
          </button>

          <Link
            href="/admin/groups"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
}
