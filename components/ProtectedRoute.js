"use client";
import { useAuth } from "@/context/AuthProvider";
import { redirect, usePathname } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const pathname = usePathname();

  const publicPaths = ["/auth/signin", "/auth/signup"];

  if (!user && !publicPaths.includes(pathname)) {
    redirect("/auth/signin");
  }

  return <>{children}</>;
}
