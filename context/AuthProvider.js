"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/Firebase";

const AuthContext = createContext({ user: null });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user?.email); // Log auth changes
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const unsubscribe = onAuthStateChanged(auth, (user) => {
    console.log("Auth state changed:", user?.email); // Log auth changes
    setUser(user);
    setLoading(false);
  });

  unsubscribe();

  console.log("AuthProvider current user:", user?.email); // Log current user state
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
