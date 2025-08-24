"use client";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/store";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";

// lightweight internal hook to dispatch after hydration
import { setAuth, clearAuth } from "@/store/authSlice";
import { supabase } from "@/lib/supabase";

const storeSingleton = makeStore();

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Hydrate auth state from server
    (async () => {
      try {
        // Try to obtain Supabase access token from client session
        const { data: sessionRes } = await supabase.auth.getSession();
        const accessToken = sessionRes.session?.access_token;

        const res = await fetch("/api/auth/me", {
          credentials: "include",
          headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
        });
        if (!res.ok) {
          storeSingleton.dispatch(clearAuth());
          return;
        }
        const data = (await res.json()) as { userId: string | null; email: string | null; role: "brand" | "user" | null };
        console.log("data", data);
        if (data && data.userId && data.email) {
          storeSingleton.dispatch(setAuth({ userId: data.userId, email: data.email, role: data.role }));
          // Redirect rule: if role=brand and not already on any dashboard path
          if (data.role === "brand" && !pathname.includes("/dashboard")) {
            router.replace("/dashboard");
          }
        } else {
          storeSingleton.dispatch(clearAuth());
        }
      } catch {
        storeSingleton.dispatch(clearAuth());
      }
    })();
  }, [pathname, router]);

  return <Provider store={storeSingleton}>{children}</Provider>;
}