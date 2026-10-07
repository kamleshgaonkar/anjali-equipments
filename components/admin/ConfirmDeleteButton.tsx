"use client";

import { useState, useTransition } from "react";

export default function ConfirmDeleteButton({
  label = "Delete",
  confirmMessage,
  onConfirm,
}: {
  label?: string;
  confirmMessage: string;
  onConfirm: () => Promise<{ error?: string } | void>;
}) {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className="inline-flex flex-col items-end gap-1">
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          setError(null);
          if (!window.confirm(confirmMessage)) return;

          startTransition(async () => {
            const result = await onConfirm();
            if (result?.error) {
              setError(result.error);
            }
          });
        }}
        className="rounded-lg px-3 py-1.5 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-60"
      >
        {pending ? "Deleting..." : label}
      </button>

      {error ? (
        <p className="max-w-[220px] text-right text-xs text-red-600">{error}</p>
      ) : null}
    </div>
  );
}
