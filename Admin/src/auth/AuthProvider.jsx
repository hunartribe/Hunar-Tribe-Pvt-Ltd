import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(
    () =>
      onAuthStateChanged(auth, (nextUser) => {
        setUser(nextUser);
        setChecking(false);
      }),
    []
  );

  const value = {
    user,
    checking,
    signIn: (email, password) =>
      signInWithEmailAndPassword(auth, email.trim(), password),
    signOut: () => signOut(auth),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
