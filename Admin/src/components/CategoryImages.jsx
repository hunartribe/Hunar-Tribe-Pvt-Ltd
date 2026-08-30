import React, { useCallback, useEffect, useRef, useState } from "react";

import { useToast } from "./Toast";
import { deleteStorageFile, listFolder, uploadToFolder } from "../cms/store";

const inputClass =
  "w-full rounded border border-stone-300 px-2 py-1 text-xs outline-none focus:border-[#F16521]";

/**
 * Storage browser for one product collection: upload and remove the images the
 * site shows, and give each one a name, price and badge. Metadata is saved with
 * the rest of the page; uploads and deletions happen immediately.
 */
const CategoryImages = ({ categories, onChange }) => {
  const notify = useToast();
  const fileInput = useRef(null);

  const [selected, setSelected] = useState(0);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Deleting a category above the selected one would otherwise leave the
  // picker pointing past the end of the list.
  const index = Math.min(selected, Math.max(categories.length - 1, 0));
  const category = categories[index];
  const folder = category?.folder;

  const refresh = useCallback(async () => {
    if (!folder) return;
    setLoading(true);
    try {
      setFiles(await listFolder(folder));
    } catch (err) {
      console.error(err);
      notify(`Could not read the "${folder}" folder.`, "error");
      setFiles([]);
    } finally {
      setLoading(false);
    }
  }, [folder, notify]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Per-image metadata lives on the category record, keyed by file name.
  const metaFor = (name) =>
    (category?.products || []).find((entry) => entry.file === name) || {};

  const setMeta = (name, patch) => {
    const products = [...(category.products || [])];
    const at = products.findIndex((entry) => entry.file === name);
    const next = { ...(at === -1 ? { file: name } : products[at]), ...patch };

    if (at === -1) products.push(next);
    else products[at] = next;

    const updated = [...categories];
    updated[index] = { ...category, products };
    onChange(updated);
  };

  const handleUpload = async (event) => {
    const chosen = Array.from(event.target.files || []);
    event.target.value = "";
    if (chosen.length === 0) return;

    setUploading(true);
    try {
      for (const file of chosen) {
        await uploadToFolder(folder, file);
      }
      notify(
        `Uploaded ${chosen.length} image${chosen.length === 1 ? "" : "s"}.`
      );
      await refresh();
    } catch (err) {
      notify(err.message || "Upload failed.", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (file) => {
    if (!window.confirm(`Delete "${file.name}" from the website permanently?`))
      return;
    try {
      await deleteStorageFile(file.fullPath);
      notify("Image deleted.");
      await refresh();
    } catch (err) {
      notify(err.message || "Could not delete that image.", "error");
    }
  };

  if (categories.length === 0) return null;

  return (
    <section className="rounded-xl border border-stone-200 bg-white">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 px-5 py-3">
        <div>
          <h3 className="font-semibold text-stone-900">Collection images</h3>
          <p className="text-xs text-stone-500">
            The Products grid shows four of these at random each time the page
            loads. A name, price or badge is optional.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={index}
            onChange={(e) => setSelected(Number(e.target.value))}
            className="rounded-lg border border-stone-300 px-3 py-2 text-sm"
          >
            {categories.map((entry, position) => (
              <option key={entry.name} value={position}>
                {entry.name}
              </option>
            ))}
          </select>
          <input
            ref={fileInput}
            type="file"
            multiple
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="hidden"
            onChange={handleUpload}
          />
          <button
            type="button"
            disabled={uploading || !folder}
            onClick={() => fileInput.current?.click()}
            className="rounded-lg bg-stone-900 px-3 py-2 text-sm text-white disabled:opacity-50"
          >
            {uploading ? "Uploading…" : "Upload images"}
          </button>
        </div>
      </header>

      {loading ? (
        <p className="px-5 py-8 text-center text-sm text-stone-500">
          Loading images…
        </p>
      ) : files.length === 0 ? (
        <p className="px-5 py-8 text-center text-sm text-stone-500">
          No images in the “{folder}” folder yet.
        </p>
      ) : (
        <ul className="grid gap-4 p-5 sm:grid-cols-2 xl:grid-cols-3">
          {files.map((file) => {
            const meta = metaFor(file.name);
            return (
              <li
                key={file.fullPath}
                className="flex flex-col gap-2 rounded-lg border border-stone-200 p-3"
              >
                <img
                  src={file.url}
                  alt={meta.title || file.name}
                  className="h-36 w-full rounded object-cover"
                />
                <p className="truncate text-[11px] text-stone-400">
                  {file.name}
                </p>

                <input
                  value={meta.title || ""}
                  onChange={(e) => setMeta(file.name, { title: e.target.value })}
                  placeholder="Product name (optional)"
                  className={inputClass}
                />
                <div className="flex gap-2">
                  <input
                    value={meta.price || ""}
                    onChange={(e) =>
                      setMeta(file.name, { price: e.target.value })
                    }
                    placeholder="₹ price"
                    className={inputClass}
                  />
                  <input
                    value={meta.badge || ""}
                    onChange={(e) =>
                      setMeta(file.name, { badge: e.target.value })
                    }
                    placeholder="Badge e.g. Best Seller"
                    className={inputClass}
                  />
                </div>
                <input
                  value={meta.url || ""}
                  onChange={(e) => setMeta(file.name, { url: e.target.value })}
                  placeholder="Shop link for this item (optional)"
                  className={inputClass}
                />

                <button
                  type="button"
                  onClick={() => handleDelete(file)}
                  className="self-start text-xs text-red-600 underline"
                >
                  Delete image
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default CategoryImages;
