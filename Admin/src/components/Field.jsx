import React, { useRef, useState } from "react";

import { uploadImage } from "../cms/store";
import { slugify } from "../cms/validate";
import { useToast } from "./Toast";

const inputClass =
  "w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-[#F16521] focus:ring-1 focus:ring-[#F16521]";

/**
 * Picture picker. An uploaded image wins; when a record still carries the
 * `assetKey` it was seeded with, we say so rather than showing an empty box —
 * the image on the site is bundled into the build, not stored here.
 */
const ImageField = ({ field, value, item, folder, onChange }) => {
  const notify = useToast();
  const fileInput = useRef(null);
  const [busy, setBusy] = useState(false);

  const assetKey = field.assetKeyField ? item?.[field.assetKeyField] : null;

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setBusy(true);
    try {
      const { url } = await uploadImage(folder || "cms/misc", file);
      onChange(url);
      notify("Image uploaded.");
    } catch (err) {
      notify(err.message || "Upload failed.", "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex items-start gap-4">
      <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-stone-300 bg-stone-50">
        {value ? (
          <img src={value} alt="" className="h-full w-full object-contain" />
        ) : (
          <span className="px-1 text-center text-[10px] leading-tight text-stone-400">
            {assetKey ? "Built-in image" : "No image"}
          </span>
        )}
      </div>

      <div className="flex flex-col items-start gap-2">
        <input
          ref={fileInput}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
          className="hidden"
          onChange={handleFile}
        />
        <button
          type="button"
          disabled={busy}
          onClick={() => fileInput.current?.click()}
          className="rounded-lg bg-stone-900 px-3 py-1.5 text-sm text-white disabled:opacity-50"
        >
          {busy ? "Uploading…" : value ? "Replace image" : "Upload image"}
        </button>

        {value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs text-stone-500 underline"
          >
            {assetKey ? "Remove and use the built-in image" : "Remove image"}
          </button>
        ) : null}

        {!value && assetKey ? (
          <p className="text-xs text-stone-500">
            Using the image that ships with the site ({assetKey}). Upload one to
            replace it.
          </p>
        ) : null}
        <p className="text-xs text-stone-400">PNG, JPG, WEBP, GIF or SVG, up to 5MB.</p>
      </div>
    </div>
  );
};

const Field = ({ field, value, item, error, folder, onChange, siblings }) => {
  const id = `field-${field.name}`;

  const control = () => {
    switch (field.type) {
      case "checkbox":
        return (
          <label className="flex items-center gap-2 text-sm text-stone-700">
            <input
              id={id}
              type="checkbox"
              checked={Boolean(value)}
              onChange={(e) => onChange(e.target.checked)}
              className="h-4 w-4 accent-[#F16521]"
            />
            {field.label}
          </label>
        );

      case "textarea":
        return (
          <textarea
            id={id}
            rows={field.rows || 3}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className={inputClass}
          />
        );

      case "select":
        return (
          <select
            id={id}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className={inputClass}
          >
            <option value="">— none —</option>
            {(field.options || []).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "color":
        return (
          <div className="flex items-center gap-2">
            <input
              id={id}
              type="color"
              value={value || "#119BD1"}
              onChange={(e) => onChange(e.target.value)}
              className="h-9 w-14 cursor-pointer rounded border border-stone-300"
            />
            <input
              type="text"
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              className={inputClass}
            />
          </div>
        );

      case "image":
        return (
          <ImageField
            field={field}
            value={value}
            item={item}
            folder={folder}
            onChange={onChange}
          />
        );

      case "slug":
        return (
          <div className="flex items-center gap-2">
            <input
              id={id}
              type="text"
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              className={inputClass}
            />
            {field.slugFrom && siblings?.[field.slugFrom] ? (
              <button
                type="button"
                onClick={() => onChange(slugify(siblings[field.slugFrom]))}
                className="shrink-0 rounded-lg border border-stone-300 px-3 py-2 text-xs text-stone-600"
              >
                From title
              </button>
            ) : null}
          </div>
        );

      default:
        return (
          <input
            id={id}
            type={field.type === "tel" ? "tel" : "text"}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className={inputClass}
          />
        );
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      {field.type !== "checkbox" ? (
        <label htmlFor={id} className="text-sm font-medium text-stone-700">
          {field.label}
          {field.required ? <span className="text-red-500"> *</span> : null}
        </label>
      ) : null}

      {control()}

      {field.help ? (
        <p className="text-xs text-stone-500">{field.help}</p>
      ) : null}
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
};

export default Field;
