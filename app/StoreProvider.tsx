"use client";

import React, { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/store";
import { setUser, clearUser, loadPendingSignup } from "@/store/authSlice";
import { supabase } from "@/lib/supabase";

const storeSingleton = makeStore();

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Load pending signup from localStorage
    storeSingleton.dispatch(loadPendingSignup());

    // Initialize auth state
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      console.log('StoreProvider: Initializing auth...');
      const { data: sessionRes } = await supabase.auth.getSession();
      const accessToken = sessionRes.session?.access_token;

      const response = await fetch("/api/auth/me", {
        credentials: "include",
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
      });

      if (!response.ok) {
        console.log('StoreProvider: Auth check failed, clearing user');
        storeSingleton.dispatch(clearUser());
        return;
      }

      const data = await response.json();
      console.log('StoreProvider: Auth data received:', data);

      if (data && data.userId && data.email) {
        console.log('StoreProvider: Setting user:', data);
        storeSingleton.dispatch(setUser({
          id: data.userId,
          email: data.email,
          role: data.role
        }));

        // Note: Redirection is now handled by AuthRedirect component
      } else {
        console.log('StoreProvider: Invalid auth data, clearing user');
        storeSingleton.dispatch(clearUser());
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
      storeSingleton.dispatch(clearUser());
    }
  };

  return <Provider store={storeSingleton}>{children}</Provider>;
}
