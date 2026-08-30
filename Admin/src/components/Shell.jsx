import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

import { useAuth } from "../auth/AuthProvider";
import { sectionGroups } from "../cms/schema";

const linkClass = ({ isActive }) =>
  `block rounded-lg px-3 py-2 text-sm ${
    isActive
      ? "bg-[#F16521] font-medium text-white"
      : "text-stone-700 hover:bg-stone-100"
  }`;

const Shell = () => {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const nav = (
    <nav className="flex flex-col gap-5 px-3 py-4">
      <NavLink to="/" end className={linkClass} onClick={() => setMenuOpen(false)}>
        Dashboard
      </NavLink>

      {sectionGroups().map((group) => (
        <div key={group.label} className="flex flex-col gap-1">
          <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-stone-400">
            {group.label}
          </p>
          {group.sections.map((section) => (
            <NavLink
              key={section.key}
              to={`/section/${section.key}`}
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              {section.label}
            </NavLink>
          ))}
        </div>
      ))}

      <div className="flex flex-col gap-1">
        <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-stone-400">
          Enquiries
        </p>
        <NavLink to="/leads" className={linkClass} onClick={() => setMenuOpen(false)}>
          Leads inbox
        </NavLink>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Mobile bar */}
      <div className="flex items-center justify-between border-b border-stone-200 bg-white px-4 py-3 lg:hidden">
        <button
          onClick={() => setMenuOpen((open) => !open)}
          className="rounded-lg border border-stone-300 px-3 py-1.5 text-sm"
        >
          Menu
        </button>
        <p className="font-bold tracking-tight text-[#3F1212]">
          Hunar <span className="text-[#F16521]">Tribe</span>
        </p>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto border-r border-stone-200 bg-white ${
          menuOpen ? "block" : "hidden"
        } lg:block`}
      >
        <div className="flex items-center gap-2 border-b border-stone-200 px-4 py-4">
          <img src="/Logo.svg" alt="" className="h-9 w-9" />
          <div className="leading-tight">
            <p className="font-bold tracking-tight text-[#3F1212]">
              Hunar <span className="text-[#F16521]">Tribe</span>
            </p>
            <p className="text-[11px] text-stone-500">Content manager</p>
          </div>
        </div>

        {nav}

        <div className="border-t border-stone-200 px-4 py-4">
          <p className="mb-2 truncate text-xs text-stone-500">{user?.email}</p>
          <button
            onClick={signOut}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-700"
          >
            Sign out
          </button>
        </div>
      </aside>

      <main className="px-5 py-6 lg:ml-64 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Shell;
