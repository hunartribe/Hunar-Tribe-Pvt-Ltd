import React, { useCallback, useEffect, useState } from "react";

import Field from "./Field";
import ListEditor from "./ListEditor";
import { useToast } from "./Toast";
import { loadSection, saveSection } from "../cms/store";
import { validateFields } from "../cms/validate";
import { SITE_URL } from "../firebase";

/**
 * Renders a whole CMS screen from its schema entry: the singleton fields as a
 * form, then one ListEditor per list. `children` lets a screen add extra UI
 * (the products screen uses it for its Storage browser).
 */
const SectionEditor = ({ section, children }) => {
  const notify = useToast();

  const [data, setData] = useState(null);
  const [errors, setErrors] = useState({});
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    setData(null);
    setDirty(false);
    setErrors({});

    loadSection(section.key)
      .then(({ data: loaded }) => {
        if (active) setData(loaded);
      })
      .catch((err) => {
        console.error(err);
        notify("Could not load this section. Check your connection.", "error");
      });

    return () => {
      active = false;
    };
  }, [section.key, notify]);

  // Warn before losing unsaved edits.
  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const update = useCallback((name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
    setDirty(true);
  }, []);

  const handleSave = async () => {
    const found = validateFields(section.fields || [], data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      notify("Fix the highlighted fields first.", "error");
      return;
    }

    setSaving(true);
    try {
      await saveSection(section.key, data);
      setDirty(false);
      notify("Saved. Refresh the site to see the change.");
    } catch (err) {
      console.error(err);
      notify(err.message || "Save failed.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (!data) {
    return <p className="text-sm text-stone-500">Loading…</p>;
  }

  return (
    <div className="flex flex-col gap-6 pb-24">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-semibold text-stone-900">
            {section.label}
          </h1>
          <p className="mt-1 text-sm text-stone-600">{section.description}</p>
          <p className="mt-2 text-xs text-stone-500">
            Appears on: {section.previewNote}
          </p>
        </div>
        <a
          href={SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-700"
        >
          View site ↗
        </a>
      </header>

      {section.fields?.length ? (
        <section className="rounded-xl border border-stone-200 bg-white p-5">
          <div className="grid gap-5 sm:grid-cols-2">
            {section.fields.map((field) => (
              <div
                key={field.name}
                className={
                  field.type === "textarea" || field.type === "image"
                    ? "sm:col-span-2"
                    : ""
                }
              >
                <Field
                  field={field}
                  value={data[field.name]}
                  item={data}
                  siblings={data}
                  folder={section.storageFolder}
                  error={errors[field.name]}
                  onChange={(value) => update(field.name, value)}
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {(section.lists || []).map((list) => (
        <ListEditor
          key={list.name}
          list={list}
          items={data[list.name] || []}
          onChange={(items) => update(list.name, items)}
        />
      ))}

      {typeof children === "function" ? children({ data, update }) : children}

      <div className="fixed bottom-0 left-0 right-0 border-t border-stone-200 bg-white/95 px-6 py-3 backdrop-blur lg:left-64">
        <div className="flex items-center justify-end gap-4">
          <span className="text-sm text-stone-500">
            {dirty ? "Unsaved changes" : "All changes saved"}
          </span>
          <button
            onClick={handleSave}
            disabled={saving || !dirty}
            className="rounded-lg bg-[#F16521] px-5 py-2 text-sm font-medium text-white disabled:opacity-40"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionEditor;
