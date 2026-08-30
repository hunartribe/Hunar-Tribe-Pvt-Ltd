import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useToast } from "../components/Toast";
import { loadSectionStatus, seedMissingSections } from "../cms/store";
import { sections } from "../cms/schema";
import { SITE_URL } from "../firebase";

const DashboardPage = () => {
  const notify = useToast();

  const [status, setStatus] = useState(null);
  const [seeding, setSeeding] = useState(false);

  const refresh = useCallback(async () => {
    try {
      setStatus(await loadSectionStatus());
    } catch (err) {
      console.error(err);
      notify("Could not reach the content database.", "error");
      setStatus({});
    }
  }, [notify]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleSeed = async () => {
    if (
      !window.confirm(
        "Copy the site's built-in content into the database for any section that has none? Sections you have already edited are left alone."
      )
    )
      return;

    setSeeding(true);
    try {
      const written = await seedMissingSections();
      notify(
        written.length
          ? `Set up ${written.length} section${written.length === 1 ? "" : "s"}.`
          : "Every section already has content."
      );
      await refresh();
    } catch (err) {
      console.error(err);
      notify(err.message || "Could not write the starter content.", "error");
    } finally {
      setSeeding(false);
    }
  };

  const missing = status
    ? sections.filter((section) => !(section.key in status))
    : [];

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Dashboard</h1>
          <p className="mt-1 max-w-2xl text-sm text-stone-600">
            Everything you change here goes live on the website as soon as a
            visitor reloads the page. Nothing needs to be rebuilt or deployed.
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

      {status && missing.length > 0 ? (
        <section className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-semibold text-amber-900">
            {missing.length} section
            {missing.length === 1 ? " is" : "s are"} not set up yet
          </h2>
          <p className="mt-1 text-sm text-amber-800">
            Until a section is set up, the site shows the content built into it.
            Copy that content into the database so you can edit it here — the
            site will look exactly the same afterwards.
          </p>
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="mt-3 rounded-lg bg-amber-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {seeding ? "Setting up…" : "Set up the remaining sections"}
          </button>
        </section>
      ) : null}

      <section className="rounded-xl border border-stone-200 bg-white">
        <header className="border-b border-stone-200 px-5 py-3">
          <h2 className="font-semibold text-stone-900">Sections</h2>
        </header>
        <ul className="divide-y divide-stone-100">
          {sections.map((section) => {
            const ready = status ? section.key in status : null;
            return (
              <li key={section.key}>
                <Link
                  to={`/section/${section.key}`}
                  className="flex items-center justify-between gap-4 px-5 py-3 hover:bg-stone-50"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-stone-900">
                      {section.label}
                    </p>
                    <p className="truncate text-xs text-stone-500">
                      {section.previewNote}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs ${
                      ready === null
                        ? "bg-stone-100 text-stone-500"
                        : ready
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {ready === null
                      ? "Checking…"
                      : ready
                        ? "Editable"
                        : "Not set up"}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default DashboardPage;
