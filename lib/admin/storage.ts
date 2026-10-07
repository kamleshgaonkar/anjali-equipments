import type { SupabaseClient } from "@supabase/supabase-js";

export const PRODUCT_IMAGES_BUCKET = "product-images";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const MAX_BYTES = 5 * 1024 * 1024;

function extensionForType(type: string) {
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  return "jpg";
}

export function validateImageFile(file: File | null) {
  if (!file || file.size === 0) {
    return {
      ok: false as const,
      error: "Please select an image file.",
    };
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return {
      ok: false as const,
      error: "Only JPEG, PNG and WebP images are allowed.",
    };
  }

  if (file.size > MAX_BYTES) {
    return {
      ok: false as const,
      error: "Image must be 5 MB or smaller.",
    };
  }

  return { ok: true as const, file };
}

export function buildCategoryHeroPath(slug: string, file: File) {
  const ext = extensionForType(file.type);
  return `categories/${slug}/hero-${Date.now()}.${ext}`;
}

export function buildGroupImagePath(
  categorySlug: string,
  groupSlug: string,
  file: File
) {
  const ext = extensionForType(file.type);
  return `groups/${categorySlug}/${groupSlug}/image-${Date.now()}.${ext}`;
}

export function buildProductMainPath(
  categorySlug: string,
  groupSlug: string,
  productSlug: string,
  file: File
) {
  const ext = extensionForType(file.type);
  return `products/${categorySlug}/${groupSlug}/${productSlug}/main-${Date.now()}.${ext}`;
}

export function buildProductGalleryPath(
  categorySlug: string,
  groupSlug: string,
  productSlug: string,
  file: File
) {
  const ext = extensionForType(file.type);
  const safeName = file.name
    .toLowerCase()
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);

  return `products/${categorySlug}/${groupSlug}/${productSlug}/gallery/${Date.now()}-${safeName || "image"}.${ext}`;
}

export function buildProjectCoverPath(slug: string, file: File) {
  const ext = extensionForType(file.type);
  return `projects/${slug}/cover-${Date.now()}.${ext}`;
}

export function buildProjectGalleryPath(slug: string, file: File) {
  const ext = extensionForType(file.type);
  const safeName = file.name
    .toLowerCase()
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);

  return `projects/${slug}/gallery/${Date.now()}-${safeName || "image"}.${ext}`;
}

export function getStorageObjectPathFromPublicUrl(url: string) {
  try {
    const parsed = new URL(url);
    const marker = `/storage/v1/object/public/${PRODUCT_IMAGES_BUCKET}/`;
    const index = parsed.pathname.indexOf(marker);

    if (index === -1) {
      return null;
    }

    const objectPath = decodeURIComponent(
      parsed.pathname.slice(index + marker.length)
    );

    return objectPath || null;
  } catch {
    return null;
  }
}

export function isSupabaseProductImageUrl(url: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!supabaseUrl) {
    return getStorageObjectPathFromPublicUrl(url) !== null;
  }

  try {
    const parsed = new URL(url);
    const expectedHost = new URL(supabaseUrl).hostname;
    if (parsed.hostname !== expectedHost) {
      return false;
    }
  } catch {
    return false;
  }

  return getStorageObjectPathFromPublicUrl(url) !== null;
}

export async function uploadPublicImage(
  supabase: SupabaseClient,
  file: File,
  path: string
) {
  const { error } = await supabase.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .getPublicUrl(path);

  return data.publicUrl;
}

export async function deleteStorageObjectByPublicUrl(
  supabase: SupabaseClient,
  url: string
) {
  const objectPath = getStorageObjectPathFromPublicUrl(url);

  if (!objectPath) {
    return { deleted: false as const };
  }

  const { error } = await supabase.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .remove([objectPath]);

  if (error) {
    throw new Error(error.message);
  }

  return { deleted: true as const };
}
