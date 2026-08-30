import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "./AuthProvider";

/** Every admin route sits behind this; there is no anonymous access. */
const RequireAuth = ({ children }) => {
  const { user, checking } = useAuth();
  const location = useLocation();

  if (checking) {
    return (
      <div className="flex h-screen items-center justify-center text-stone-500">
        Checking your session…
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
