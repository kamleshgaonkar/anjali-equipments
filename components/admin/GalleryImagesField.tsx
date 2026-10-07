"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  deleteStorageObjectByPublicUrl,
  isSupabaseProductImageUrl,
  uploadPublicImage,
  validateImageFile,
} from "@/lib/admin/storage";

type GalleryImagesFieldProps = {
  name: string;
  value: string[];
  onChange: (urls: string[]) => void;
  getStoragePath: (file: File) => string;
  canUpload?: boolean;
  uploadBlockedMessage?: string;
};

export default function GalleryImagesField({
  name,
  value,
  onChange,
  getStoragePath,
  canUpload = true,
  uploadBlockedMessage = "Enter category, group and product slug before uploading gallery images.",
}: GalleryImagesFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [removingIndex, setRemovingIndex] = useState<number | null>(null);

  async function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    setError(null);

    if (!files.length) return;

    if (!canUpload) {
      setError(uploadBlockedMessage);
      return;
    }

    setUploading(true);
    const uploaded: string[] = [];

    try {
      const supabase = createClient();

      for (const file of files) {
        const validation = validateImageFile(file);
        if (!validation.ok) {
          setError(validation.error);
          continue;
        }

        const path = getStoragePath(validation.file);
        const publicUrl = await uploadPublicImage(
          supabase,
          validation.file,
          path
        );
        uploaded.push(publicUrl);
      }

      if (uploaded.length) {
        onChange([...value, ...uploaded]);
      }
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Unable to upload one or more gallery images."
      );
    } finally {
      setUploading(false);
    }
  }

  async function removeAt(index: number) {
    const url = value[index];
    if (!url) return;

    const confirmed = window.confirm("Remove this gallery image?");
    if (!confirmed) return;

    setError(null);

    if (isSupabaseProductImageUrl(url)) {
      setRemovingIndex(index);
      try {
        const supabase = createClient();
        await deleteStorageObjectByPublicUrl(supabase, url);
        onChange(value.filter((_, i) => i !== index));
      } catch (deleteError) {
        setError(
          deleteError instanceof Error
            ? deleteError.message
            : "Unable to delete gallery image from storage."
        );
      } finally {
        setRemovingIndex(null);
      }
      return;
    }

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
        <label className="block text-sm font-semibold text-slate-700">
          Gallery Images
        </label>
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
        >
          {uploading ? "Uploading..." : "+ Add Gallery Images"}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="hidden"
        onChange={handleFiles}
        disabled={uploading}
      />

      <input type="hidden" name={name} value={JSON.stringify(value)} />

      {value.length === 0 ? (
        <div className="mt-3 flex h-28 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
          No gallery images yet
        </div>
      ) : (
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {value.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt=""
                className="h-32 w-full object-cover"
              />
              <div className="flex flex-wrap gap-1 p-2">
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  className="rounded-md px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40"
                >
                  Move Left
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={index === value.length - 1}
                  className="rounded-md px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40"
                >
                  Move Right
                </button>
                <button
                  type="button"
                  onClick={() => removeAt(index)}
                  disabled={removingIndex === index}
                  className="ml-auto rounded-md px-2 py-1 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60"
                >
                  {removingIndex === index ? "Removing..." : "Remove"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="mt-2 text-xs text-slate-500">
        JPEG, PNG or WebP. Max 5 MB each. Uploaded directly to Supabase Storage.
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
