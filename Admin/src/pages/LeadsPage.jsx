import React, { useCallback, useEffect, useState } from "react";

import { useToast } from "../components/Toast";
import { deleteLead, loadLeads, setLeadStatus } from "../cms/store";

const STATUSES = ["new", "contacted", "closed"];

const STATUS_STYLE = {
  new: "bg-amber-100 text-amber-800",
  contacted: "bg-blue-100 text-blue-800",
  closed: "bg-stone-200 text-stone-600",
};

const formatDate = (value) => {
  if (!value?.toDate) return "—";
  return value.toDate().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const LeadsPage = () => {
  const notify = useToast();

  const [leads, setLeads] = useState(null);
  const [filter, setFilter] = useState("all");

  const refresh = useCallback(async () => {
    try {
      setLeads(await loadLeads());
    } catch (err) {
      console.error(err);
      notify("Could not load enquiries.", "error");
      setLeads([]);
    }
  }, [notify]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const changeStatus = async (lead, status) => {
    try {
      await setLeadStatus(lead.id, status);
      setLeads((prev) =>
        prev.map((entry) =>
          entry.id === lead.id ? { ...entry, status } : entry
        )
      );
    } catch (err) {
      notify(err.message || "Could not update that enquiry.", "error");
    }
  };

  const remove = async (lead) => {
    if (!window.confirm(`Delete the enquiry from ${lead.fullName}?`)) return;
    try {
      await deleteLead(lead.id);
      setLeads((prev) => prev.filter((entry) => entry.id !== lead.id));
      notify("Enquiry deleted.");
    } catch (err) {
      notify(err.message || "Could not delete that enquiry.", "error");
    }
  };

  const visible = (leads || []).filter(
    (lead) => filter === "all" || (lead.status || "new") === filter
  );

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">
            Leads inbox
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-stone-600">
            Everyone who fills in the contact form on the website appears here,
            newest first.
          </p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-stone-300 px-3 py-2 text-sm"
        >
          <option value="all">All enquiries</option>
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </header>

      {leads === null ? (
        <p className="text-sm text-stone-500">Loading…</p>
      ) : visible.length === 0 ? (
        <p className="rounded-xl border border-stone-200 bg-white px-5 py-10 text-center text-sm text-stone-500">
          No enquiries here yet.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {visible.map((lead) => (
            <li
              key={lead.id}
              className="rounded-xl border border-stone-200 bg-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-stone-900">{lead.fullName}</p>
                  <p className="text-sm text-stone-600">
                    <a
                      href={`tel:${lead.mobile}`}
                      className="hover:underline"
                    >
                      {lead.mobile}
                    </a>
                    {" · "}
                    <a
                      href={`mailto:${lead.email}`}
                      className="hover:underline"
                    >
                      {lead.email}
                    </a>
                  </p>
                  <p className="mt-0.5 text-xs text-stone-400">
                    {formatDate(lead.createdAt)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs ${
                      STATUS_STYLE[lead.status] || STATUS_STYLE.new
                    }`}
                  >
                    {lead.status || "new"}
                  </span>
                  <select
                    value={lead.status || "new"}
                    onChange={(e) => changeStatus(lead, e.target.value)}
                    className="rounded-lg border border-stone-300 px-2 py-1 text-xs"
                  >
                    {STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => remove(lead)}
                    className="rounded border border-red-200 px-2 py-1 text-xs text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {lead.message ? (
                <p className="mt-3 whitespace-pre-wrap rounded-lg bg-stone-50 px-3 py-2 text-sm text-stone-700">
                  {lead.message}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LeadsPage;
