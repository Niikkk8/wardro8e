"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
export default function AuthRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Don't redirect while still loading
    if (loading) return;

    // If user is authenticated as a brand and not already on dashboard, redirect
    if (user?.role === "brand" && !pathname.includes("/dashboard")) {
      console.log("Redirecting brand user to dashboard");
      router.replace("/dashboard");
    }
  }, [user, loading, pathname, router]);

  return null; // This component doesn't render anything
}
