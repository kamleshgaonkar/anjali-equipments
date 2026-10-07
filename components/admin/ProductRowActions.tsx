"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import {
  deleteProduct,
  duplicateProduct,
} from "@/app/admin/(panel)/products/actions";

export default function ProductRowActions({ productId }: { productId: string }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointer(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  function handleDuplicate() {
    setOpen(false);
    startTransition(async () => {
      const result = await duplicateProduct(productId);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  function handleDelete() {
    setOpen(false);
    if (!window.confirm("Delete this product? This action cannot be undone.")) {
      return;
    }

    startTransition(async () => {
      const result = await deleteProduct(productId);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <div className="relative flex justify-end" ref={menuRef}>
      <button
        type="button"
        aria-label="Product actions"
        aria-expanded={open}
        disabled={pending}
        onClick={() => {
          setError(null);
          setOpen((value) => !value);
        }}
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:opacity-60"
      >
        <MoreHorizontal size={18} />
      </button>

      {open ? (
        <div className="absolute right-0 top-9 z-30 min-w-[160px] overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
          <Link
            href={`/admin/products/${productId}/edit`}
            className="block px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
            onClick={() => setOpen(false)}
          >
            Edit
          </Link>
          <button
            type="button"
            onClick={handleDuplicate}
            className="block w-full px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Duplicate
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="block w-full px-3 py-2 text-left text-sm font-semibold text-red-700 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      ) : null}

      {error ? (
        <p className="absolute right-0 top-full z-20 mt-1 w-48 text-right text-xs text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
