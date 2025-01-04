"use client";
import { useAuth } from "@/context/AuthProvider";
import { redirect } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    redirect("/auth/signin");
  }

  return <>{children}</>;
}
