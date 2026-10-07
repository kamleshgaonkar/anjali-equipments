"use client";

import { useActionState, useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import FeaturesEditor from "@/components/admin/FeaturesEditor";
import GalleryImagesField from "@/components/admin/GalleryImagesField";
import ImageUploadField from "@/components/admin/ImageUploadField";
import SpecificationsEditor from "@/components/admin/SpecificationsEditor";
import { slugify } from "@/lib/admin/slug";
import {
  buildProductGalleryPath,
  buildProductMainPath,
} from "@/lib/admin/storage";
import type {
  AdminCategory,
  AdminProduct,
  AdminProductGroup,
  AdminProductSpecification,
} from "@/types/admin-catalogue";
import {
  createProduct,
  updateProduct,
  type ProductActionState,
} from "@/app/admin/(panel)/products/actions";

const initialState: ProductActionState = {};

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  );
}

export default function ProductForm({
  product,
  categories,
  groups,
}: {
  product?: AdminProduct;
  categories: Pick<AdminCategory, "id" | "name" | "slug" | "is_active">[];
  groups: Pick<
    AdminProductGroup,
    "id" | "name" | "slug" | "category_id" | "is_active"
  >[];
}) {
  const isEdit = Boolean(product);
  const boundUpdate = updateProduct.bind(null, product?.id ?? "");
  const [state, formAction, pending] = useActionState(
    isEdit ? boundUpdate : createProduct,
    initialState
  );

  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [categoryId, setCategoryId] = useState(product?.category_id ?? "");
  const [groupId, setGroupId] = useState(product?.group_id ?? "");
  const [imageUrl, setImageUrl] = useState<string | null>(product?.image ?? null);
  const [gallery, setGallery] = useState<string[]>(product?.gallery ?? []);
  const [features, setFeatures] = useState<string[]>(product?.features ?? []);
  const [specifications, setSpecifications] = useState<
    AdminProductSpecification[]
  >(product?.specifications ?? []);
  const [seoOpen, setSeoOpen] = useState(
    Boolean(product?.seo_title || product?.seo_description)
  );
  const [seoTitle, setSeoTitle] = useState(product?.seo_title ?? "");
  const [seoDescription, setSeoDescription] = useState(
    product?.seo_description ?? ""
  );

  useEffect(() => {
    if (!slugTouched) {
      setSlug(slugify(name));
    }
  }, [name, slugTouched]);

  const selectableCategories = categories.filter(
    (category) => category.is_active || category.id === product?.category_id
  );

  const groupsForCategory = useMemo(
    () =>
      groups.filter(
        (group) =>
          group.category_id === categoryId &&
          (group.is_active || group.id === product?.group_id)
      ),
    [groups, categoryId, product?.group_id]
  );

  const selectedCategorySlug =
    selectableCategories.find((category) => category.id === categoryId)?.slug ??
    "";
  const selectedGroupSlug =
    groupsForCategory.find((group) => group.id === groupId)?.slug ?? "";
  const normalizedProductSlug = slugify(slug);
  const canUploadImages = Boolean(
    selectedCategorySlug && selectedGroupSlug && normalizedProductSlug
  );

  function handleCategoryChange(nextCategoryId: string) {
    setCategoryId(nextCategoryId);
    setGroupId("");
  }

  return (
    <form action={formAction} className="mx-auto max-w-5xl space-y-6">
      <Section title="Basic Information">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700">
              Product Name *
            </label>
            <input
              name="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#8b191c] focus:ring-2 focus:ring-[#8b191c]/20"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Slug *
            </label>
            <input
              name="slug"
              required
              value={slug}
              onChange={(event) => {
                setSlugTouched(true);
                setSlug(event.target.value);
              }}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#8b191c] focus:ring-2 focus:ring-[#8b191c]/20"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Model
            </label>
            <input
              name="model"
              defaultValue={product?.model ?? ""}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#8b191c] focus:ring-2 focus:ring-[#8b191c]/20"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Category *
            </label>
            <select
              name="category_id"
              required
              value={categoryId}
              onChange={(event) => handleCategoryChange(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#8b191c] focus:ring-2 focus:ring-[#8b191c]/20"
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
            <label className="block text-sm font-semibold text-slate-700">
              Product Group *
            </label>
            <select
              name="group_id"
              required
              value={groupId}
              onChange={(event) => setGroupId(event.target.value)}
              disabled={!categoryId}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#8b191c] focus:ring-2 focus:ring-[#8b191c]/20 disabled:bg-slate-50"
            >
              <option value="" disabled>
                {categoryId ? "Select a product group" : "Select a category first"}
              </option>
              {groupsForCategory.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                  {!group.is_active ? " (Inactive)" : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700">
              Short Description
            </label>
            <textarea
              name="short_description"
              rows={3}
              defaultValue={product?.short_description ?? ""}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#8b191c] focus:ring-2 focus:ring-[#8b191c]/20"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700">
              Full Description
            </label>
            <textarea
              name="description"
              rows={6}
              defaultValue={product?.description ?? ""}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#8b191c] focus:ring-2 focus:ring-[#8b191c]/20"
            />
          </div>
        </div>
      </Section>

      <Section title="Product Details">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Material
            </label>
            <input
              name="material"
              defaultValue={product?.material ?? ""}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#8b191c] focus:ring-2 focus:ring-[#8b191c]/20"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Warranty
            </label>
            <input
              name="warranty"
              defaultValue={product?.warranty ?? ""}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#8b191c] focus:ring-2 focus:ring-[#8b191c]/20"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Origin
            </label>
            <input
              name="origin"
              defaultValue={product?.origin ?? ""}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#8b191c] focus:ring-2 focus:ring-[#8b191c]/20"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700">
              HSN Code
            </label>
            <input
              name="hsn_code"
              defaultValue={product?.hsn_code ?? ""}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#8b191c] focus:ring-2 focus:ring-[#8b191c]/20"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <label className="inline-flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">
            <input
              type="checkbox"
              name="custom_sizes"
              defaultChecked={Boolean(product?.custom_sizes)}
              className="h-4 w-4 rounded border-slate-300 text-[#8b191c] focus:ring-[#8b191c]"
            />
            Custom Sizes Available
          </label>
          <label className="inline-flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={Boolean(product?.featured)}
              className="h-4 w-4 rounded border-slate-300 text-[#8b191c] focus:ring-[#8b191c]"
            />
            Featured Product
          </label>
          <label className="inline-flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">
            <input
              type="checkbox"
              name="is_active"
              defaultChecked={product?.is_active ?? true}
              className="h-4 w-4 rounded border-slate-300 text-[#8b191c] focus:ring-[#8b191c]"
            />
            Published / Active
          </label>
        </div>
      </Section>

      <Section title="Images">
        <ImageUploadField
          name="imageUrl"
          label="Main Product Image"
          value={imageUrl}
          onChange={setImageUrl}
          canUpload={canUploadImages}
          uploadBlockedMessage="Select category, product group and enter a product slug before uploading."
          getStoragePath={(file) =>
            buildProductMainPath(
              selectedCategorySlug,
              selectedGroupSlug,
              normalizedProductSlug,
              file
            )
          }
        />
      </Section>

      <Section title="Gallery">
        <GalleryImagesField
          name="galleryJson"
          value={gallery}
          onChange={setGallery}
          canUpload={canUploadImages}
          uploadBlockedMessage="Select category, product group and enter a product slug before uploading gallery images."
          getStoragePath={(file) =>
            buildProductGalleryPath(
              selectedCategorySlug,
              selectedGroupSlug,
              normalizedProductSlug,
              file
            )
          }
        />
      </Section>

      <Section title="Features">
        <FeaturesEditor
          name="featuresJson"
          value={features}
          onChange={setFeatures}
        />
      </Section>

      <Section title="Specifications">
        <SpecificationsEditor
          name="specificationsJson"
          value={specifications}
          onChange={setSpecifications}
        />
      </Section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <button
          type="button"
          onClick={() => setSeoOpen((open) => !open)}
          className="flex w-full items-center justify-between text-left"
        >
          <h2 className="text-lg font-semibold text-slate-900">SEO</h2>
          <span className="text-sm font-semibold text-slate-500">
            {seoOpen ? "Hide" : "Show"}
          </span>
        </button>

        {seoOpen ? (
          <div className="mt-5 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700">
                SEO Title
              </label>
              <input
                name="seo_title"
                value={seoTitle}
                onChange={(event) => setSeoTitle(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#8b191c] focus:ring-2 focus:ring-[#8b191c]/20"
              />
              <p className="mt-2 text-xs text-slate-500">
                {seoTitle.length} characters
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700">
                SEO Description
              </label>
              <textarea
                name="seo_description"
                rows={4}
                value={seoDescription}
                onChange={(event) => setSeoDescription(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#8b191c] focus:ring-2 focus:ring-[#8b191c]/20"
              />
              <p className="mt-2 text-xs text-slate-500">
                {seoDescription.length} characters
              </p>
            </div>
          </div>
        ) : (
          <>
            <input type="hidden" name="seo_title" value={seoTitle} />
            <input type="hidden" name="seo_description" value={seoDescription} />
          </>
        )}
      </section>

      <Section title="Publishing">
        <div>
          <label className="block text-sm font-semibold text-slate-700">
            Display Order
          </label>
          <input
            name="display_order"
            type="number"
            defaultValue={product?.display_order ?? 0}
            className="mt-2 w-full max-w-xs rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#8b191c] focus:ring-2 focus:ring-[#8b191c]/20"
          />
        </div>
      </Section>

      {state.error ? (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {state.error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-xl bg-[#8b191c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#731417] disabled:opacity-70"
        >
          {pending
            ? "Saving..."
            : isEdit
              ? "Save Changes"
              : "Create Product"}
        </button>
        <Link
          href="/admin/products"
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
