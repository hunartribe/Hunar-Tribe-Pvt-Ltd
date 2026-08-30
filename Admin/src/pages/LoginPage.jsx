import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../auth/AuthProvider";

const AUTH_MESSAGES = {
  "auth/invalid-email": "That doesn't look like a valid email address.",
  "auth/invalid-credential": "Email or password is incorrect.",
  "auth/wrong-password": "Email or password is incorrect.",
  "auth/user-not-found": "Email or password is incorrect.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/too-many-requests":
    "Too many attempts. Wait a few minutes and try again.",
  "auth/network-request-failed": "No connection. Check your internet.",
};

const LoginPage = () => {
  const { user, checking, signIn } = useAuth();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (checking) return null;
  if (user) return <Navigate to={location.state?.from?.pathname || "/"} replace />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      await signIn(email, password);
    } catch (err) {
      setError(AUTH_MESSAGES[err.code] || "Could not sign in. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm"
      >
        <div className="mb-6 flex items-center gap-2">
          <img src="/Logo.svg" alt="" className="h-10 w-10" />
          <div className="leading-tight">
            <p className="text-xl font-bold tracking-tight text-[#3F1212]">
              Hunar <span className="text-[#F16521]">Tribe</span>
            </p>
            <p className="text-xs text-stone-500">Website content manager</p>
          </div>
        </div>

        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-stone-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-[#F16521] focus:ring-1 focus:ring-[#F16521]"
        />

        <label
          htmlFor="password"
          className="mb-1 block text-sm font-medium text-stone-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-[#F16521] focus:ring-1 focus:ring-[#F16521]"
        />

        {error ? (
          <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-lg bg-[#F16521] py-2.5 text-sm font-medium text-white disabled:opacity-50"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>

        <p className="mt-4 text-center text-xs text-stone-500">
          Accounts are created in the Firebase console under Authentication.
        </p>
      </form>
    </main>
  );
};

export default LoginPage;
