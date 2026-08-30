import React, { useState } from "react";

import ItemDrawer from "./ItemDrawer";

const IMAGE_FIELDS = ["image", "logo", "photo", "icon"];

const thumbnailOf = (item) => {
  const key = IMAGE_FIELDS.find((field) => item[field]);
  return key ? item[key] : null;
};

const blankItem = (fields) =>
  fields.reduce((item, field) => {
    item[field.name] = field.type === "checkbox" ? false : "";
    return item;
  }, {});

/** Add / edit / delete / reorder for one array inside a section document. */
const ListEditor = ({ list, items, onChange }) => {
  const [editing, setEditing] = useState(null); // { index, item }

  const secondaryField = list.fields.find(
    (field) =>
      field.name !== list.titleField &&
      !["image", "checkbox"].includes(field.type)
  );

  const move = (index, delta) => {
    const target = index + delta;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const remove = (index) => {
    const label = items[index]?.[list.titleField] || "this entry";
    if (!window.confirm(`Delete "${label}"? This cannot be undone.`)) return;
    onChange(items.filter((_, position) => position !== index));
  };

  const commit = (item) => {
    const next = [...items];
    if (editing.index === -1) next.push(item);
    else next[editing.index] = item;
    onChange(next);
    setEditing(null);
  };

  return (
    <section className="rounded-xl border border-stone-200 bg-white">
      <header className="flex items-center justify-between border-b border-stone-200 px-5 py-3">
        <div>
          <h3 className="font-semibold text-stone-900">{list.label}</h3>
          <p className="text-xs text-stone-500">
            {items.length} {items.length === 1 ? "entry" : "entries"} — they
            appear on the site in this order.
          </p>
        </div>
        <button
          onClick={() =>
            setEditing({ index: -1, item: blankItem(list.fields) })
          }
          className="rounded-lg bg-stone-900 px-3 py-1.5 text-sm text-white"
        >
          Add
        </button>
      </header>

      {items.length === 0 ? (
        <p className="px-5 py-8 text-center text-sm text-stone-500">
          Nothing here yet. The site will fall back to its built-in content
          until you add an entry.
        </p>
      ) : (
        <ul className="divide-y divide-stone-100">
          {items.map((item, index) => {
            const thumb = thumbnailOf(item);
            return (
              <li
                key={index}
                className="flex items-center gap-3 px-5 py-3 hover:bg-stone-50"
              >
                <span className="w-6 shrink-0 text-xs text-stone-400">
                  {index + 1}
                </span>

                {thumb ? (
                  <img
                    src={thumb}
                    alt=""
                    className="h-10 w-10 shrink-0 rounded border border-stone-200 object-contain"
                  />
                ) : null}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-stone-900">
                    {item[list.titleField] || "(untitled)"}
                  </p>
                  {secondaryField ? (
                    <p className="truncate text-xs text-stone-500">
                      {item[secondaryField.name]}
                    </p>
                  ) : null}
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <button
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    aria-label="Move up"
                    className="rounded border border-stone-200 px-2 py-1 text-xs text-stone-600 disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => move(index, 1)}
                    disabled={index === items.length - 1}
                    aria-label="Move down"
                    className="rounded border border-stone-200 px-2 py-1 text-xs text-stone-600 disabled:opacity-30"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => setEditing({ index, item })}
                    className="rounded border border-stone-200 px-2 py-1 text-xs text-stone-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => remove(index)}
                    className="rounded border border-red-200 px-2 py-1 text-xs text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {editing ? (
        <ItemDrawer
          key={editing.index}
          title={`${editing.index === -1 ? "Add to" : "Edit"} ${list.label}`}
          fields={list.fields}
          folder={list.storageFolder}
          item={editing.item}
          onCancel={() => setEditing(null)}
          onSave={commit}
        />
      ) : null}
    </section>
  );
};

export default ListEditor;
