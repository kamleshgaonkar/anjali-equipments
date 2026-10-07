"use client";

import type { AdminProductSpecification } from "@/types/admin-catalogue";

type SpecificationsEditorProps = {
  name: string;
  value: AdminProductSpecification[];
  onChange: (specs: AdminProductSpecification[]) => void;
};

export default function SpecificationsEditor({
  name,
  value,
  onChange,
}: SpecificationsEditorProps) {
  function updateAt(
    index: number,
    key: keyof AdminProductSpecification,
    nextValue: string
  ) {
    const copy = [...value];
    copy[index] = { ...copy[index], [key]: nextValue };
    onChange(copy);
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
      <div className="flex items-center justify-between gap-3">
        <label className="block text-sm font-semibold text-slate-700">
          Specifications
        </label>
        <button
          type="button"
          onClick={() => onChange([...value, { label: "", value: "" }])}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          + Add Specification
        </button>
      </div>

      <input type="hidden" name={name} value={JSON.stringify(value)} />

      <div className="mt-3 space-y-2">
        {value.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-500">
            No specifications added yet.
          </p>
        ) : (
          value.map((spec, index) => (
            <div
              key={`spec-${index}`}
              className="grid gap-2 rounded-xl border border-slate-200 p-3 md:grid-cols-[1fr_1fr_auto]"
            >
              <input
                value={spec.label}
                onChange={(event) =>
                  updateAt(index, "label", event.target.value)
                }
                placeholder="Label"
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#8b191c]"
              />
              <input
                value={spec.value}
                onChange={(event) =>
                  updateAt(index, "value", event.target.value)
                }
                placeholder="Value"
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#8b191c]"
              />
              <div className="flex gap-1">
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
          ))
        )}
      </div>
    </div>
  );
}
