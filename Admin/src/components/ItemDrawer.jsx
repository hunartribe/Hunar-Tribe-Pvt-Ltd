import React, { useState } from "react";

import Field from "./Field";
import { validateFields } from "../cms/validate";

/** Slide-over form for adding or editing one list item. */
const ItemDrawer = ({ title, fields, folder, item, onCancel, onSave }) => {
  const [draft, setDraft] = useState(item);
  const [errors, setErrors] = useState({});

  const update = (name, value) =>
    setDraft((prev) => ({ ...prev, [name]: value }));

  const handleSave = () => {
    const found = validateFields(fields, draft);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    onSave(draft);
  };

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-black/30">
      <div className="flex h-full w-full max-w-xl flex-col bg-white shadow-xl">
        <header className="flex items-center justify-between border-b border-stone-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-stone-900">{title}</h2>
          <button
            onClick={onCancel}
            className="text-2xl leading-none text-stone-400 hover:text-stone-700"
            aria-label="Close"
          >
            ×
          </button>
        </header>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-6 py-5">
          {fields.map((field) => (
            <Field
              key={field.name}
              field={field}
              value={draft[field.name]}
              item={draft}
              siblings={draft}
              folder={folder}
              error={errors[field.name]}
              onChange={(value) => update(field.name, value)}
            />
          ))}
        </div>

        <footer className="flex justify-end gap-3 border-t border-stone-200 px-6 py-4">
          <button
            onClick={onCancel}
            className="rounded-lg border border-stone-300 px-4 py-2 text-sm text-stone-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded-lg bg-[#F16521] px-4 py-2 text-sm font-medium text-white"
          >
            Done
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ItemDrawer;
