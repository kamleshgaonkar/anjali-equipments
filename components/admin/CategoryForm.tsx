"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { slugify } from "@/lib/admin/slug";
import { buildCategoryHeroPath } from "@/lib/admin/storage";
import type { AdminCategory } from "@/types/admin-catalogue";
import {
  createCategory,
  updateCategory,
  type CategoryActionState,
} from "@/app/admin/(panel)/categories/actions";

const initialState: CategoryActionState = {};

export default function CategoryForm({
  category,
}: {
  category?: AdminCategory;
}) {
  const isEdit = Boolean(category);
  const boundUpdate = updateCategory.bind(null, category?.id ?? "");
  const [state, formAction, pending] = useActionState(
    isEdit ? boundUpdate : createCategory,
    initialState
  );

  const [name, setName] = useState(category?.name ?? "");
  const [slug, setSlug] = useState(category?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [heroImageUrl, setHeroImageUrl] = useState<string | null>(
    category?.hero_image ?? null
  );

  useEffect(() => {
    if (!slugTouched) {
      setSlug(slugify(name));
    }
  }, [name, slugTouched]);

  const normalizedSlug = slugify(slug);

  return (
    <form action={formAction} className="mx-auto max-w-3xl space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="grid gap-5">
          <div>
            <label
              htmlFor="category-name"
              className="block text-sm font-semibold text-slate-700"
            >
              Category Name *
            </label>
            <input
              id="category-name"
              name="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#8b191c] focus:ring-2 focus:ring-[#8b191c]/20"
            />
          </div>

          <div>
            <label
              htmlFor="category-slug"
              className="block text-sm font-semibold text-slate-700"
            >
              Slug *
            </label>
            <input
              id="category-slug"
              name="slug"
              required
              value={slug}
              onChange={(event) => {
                setSlugTouched(true);
                setSlug(event.target.value);
              }}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#8b191c] focus:ring-2 focus:ring-[#8b191c]/20"
            />
            <p className="mt-2 text-xs text-slate-500">
              Lowercase URL-safe identifier. Example: bulk-cooking
            </p>
          </div>

          <div>
            <label
              htmlFor="category-description"
              className="block text-sm font-semibold text-slate-700"
            >
              Description
            </label>
            <textarea
              id="category-description"
              name="description"
              rows={4}
              defaultValue={category?.description ?? ""}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#8b191c] focus:ring-2 focus:ring-[#8b191c]/20"
            />
          </div>

          <ImageUploadField
            name="heroImageUrl"
            label="Hero Image"
            value={heroImageUrl}
            onChange={setHeroImageUrl}
            canUpload={Boolean(normalizedSlug)}
            uploadBlockedMessage="Enter a category name/slug before uploading an image."
            getStoragePath={(file) =>
              buildCategoryHeroPath(normalizedSlug, file)
            }
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="category-display-order"
                className="block text-sm font-semibold text-slate-700"
              >
                Display Order
              </label>
              <input
                id="category-display-order"
                name="display_order"
                type="number"
                defaultValue={category?.display_order ?? 0}
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#8b191c] focus:ring-2 focus:ring-[#8b191c]/20"
              />
            </div>

            <div className="flex items-end">
              <label className="inline-flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">
                <input
                  type="checkbox"
                  name="is_active"
                  defaultChecked={category?.is_active ?? true}
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
                : "Create Category"}
          </button>

          <Link
            href="/admin/categories"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
}
