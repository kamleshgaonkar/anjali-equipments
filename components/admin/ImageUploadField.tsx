"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  deleteStorageObjectByPublicUrl,
  isSupabaseProductImageUrl,
  uploadPublicImage,
  validateImageFile,
} from "@/lib/admin/storage";

type ImageUploadFieldProps = {
  name: string;
  label: string;
  value: string | null;
  onChange: (url: string | null) => void;
  getStoragePath: (file: File) => string;
  canUpload?: boolean;
  uploadBlockedMessage?: string;
  helpText?: string;
};

export default function ImageUploadField({
  name,
  label,
  value,
  onChange,
  getStoragePath,
  canUpload = true,
  uploadBlockedMessage = "Enter a valid slug before uploading an image.",
  helpText,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    event.target.value = "";

    setError(null);

    if (!file) {
      return;
    }

    if (!canUpload) {
      setError(uploadBlockedMessage);
      return;
    }

    const validation = validateImageFile(file);
    if (!validation.ok) {
      setError(validation.error);
      return;
    }

    const previousUrl = value;
    setUploading(true);

    try {
      const supabase = createClient();
      const path = getStoragePath(validation.file);
      const publicUrl = await uploadPublicImage(
        supabase,
        validation.file,
        path
      );

      onChange(publicUrl);

      if (previousUrl && isSupabaseProductImageUrl(previousUrl)) {
        try {
          await deleteStorageObjectByPublicUrl(supabase, previousUrl);
        } catch (deleteError) {
          setError(
            deleteError instanceof Error
              ? `Image uploaded, but the previous image could not be deleted: ${deleteError.message}`
              : "Image uploaded, but the previous image could not be deleted."
          );
        }
      }
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Unable to upload image to storage."
      );
    } finally {
      setUploading(false);
    }
  }

  async function handleRemove() {
    if (!value) {
      return;
    }

    const confirmed = window.confirm(
      "Remove this image? This cannot be undone for uploaded storage images."
    );

    if (!confirmed) {
      return;
    }

    setError(null);

    if (isSupabaseProductImageUrl(value)) {
      setRemoving(true);

      try {
        const supabase = createClient();
        await deleteStorageObjectByPublicUrl(supabase, value);
        onChange(null);
      } catch (deleteError) {
        setError(
          deleteError instanceof Error
            ? deleteError.message
            : "Unable to delete image from storage."
        );
      } finally {
        setRemoving(false);
      }

      return;
    }

    // Local/public paths (e.g. /categories/cooking.jpg) are only cleared in form state.
    onChange(null);
  }

  const busy = uploading || removing;

  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700">
        {label}
      </label>

      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt=""
          className="mt-3 h-40 w-full rounded-xl border border-slate-200 object-cover"
        />
      ) : (
        <div className="mt-3 flex h-40 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
          No image selected
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
        disabled={busy}
      />

      <input type="hidden" name={name} value={value ?? ""} />

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
        >
          {uploading
            ? "Uploading..."
            : value
              ? "Replace Image"
              : "Upload Image"}
        </button>

        {value ? (
          <button
            type="button"
            disabled={busy}
            onClick={handleRemove}
            className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-60"
          >
            {removing ? "Removing..." : "Remove Image"}
          </button>
        ) : null}
      </div>

      <p className="mt-2 text-xs text-slate-500">
        {helpText || "JPEG, PNG or WebP. Max 5 MB. Uploaded directly to Supabase Storage."}
      </p>

      {error ? (
        <p
          role="alert"
          className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
