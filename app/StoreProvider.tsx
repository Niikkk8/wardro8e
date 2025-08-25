"use client";

import React, { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/store";
import { setUser, clearUser, loadPendingSignup, User } from "@/store/authSlice";
import { supabase } from "@/lib/supabase";

const storeSingleton = makeStore();

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Load pending signup from localStorage
    storeSingleton.dispatch(loadPendingSignup());

    // Initialize auth
    initializeAuth();

    // Subscribe to Supabase auth changes to keep Redux in sync
    const { data: subscription } = supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        const token = session?.access_token;
        if (!token) {
          storeSingleton.dispatch(clearUser());
          return;
        }
        const response = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          storeSingleton.dispatch(clearUser());
          return;
        }
        const data = await response.json();
        if (data && data.userId && data.email) {
          const userData: User = { id: data.userId, email: data.email, role: data.role };
          
          // If it's a brand user, fetch additional brand information
          if (data.role === 'brand') {
            try {
              const brandResponse = await fetch("/api/brand/settings", {
                headers: { Authorization: `Bearer ${token}` },
              });
              if (brandResponse.ok) {
                const brandData = await brandResponse.json();
                userData.brandName = brandData.brand_name;
                userData.brandLegalName = brandData.brand_legal_name;
                userData.verified = brandData.verified;
              }
            } catch (err) {
              console.error('Failed to fetch brand details:', err);
              // Set default values for brand users
              userData.verified = false;
            }
          } else if (data.role === 'user') {
            // For regular users, we might fetch user-specific data here
            // userData.userProfile = await fetchUserProfile(token);
          }
          
          storeSingleton.dispatch(setUser(userData));
        } else {
          storeSingleton.dispatch(clearUser());
        }
      } catch (err) {
        console.error('StoreProvider: auth state sync failed', err);
        storeSingleton.dispatch(clearUser());
      }
    });

    return () => {
      subscription?.subscription?.unsubscribe();
    };
  }, []);

  const initializeAuth = async () => {
    try {
      const { data: sessionRes } = await supabase.auth.getSession();
      const accessToken = sessionRes.session?.access_token;

      if (!accessToken) {
        storeSingleton.dispatch(clearUser());
        return;
      }

      const response = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) {
        storeSingleton.dispatch(clearUser());
        return;
      }

      const data = await response.json();
      if (data && data.userId && data.email) {
        const userData: User = { id: data.userId, email: data.email, role: data.role };
        
        // If it's a brand user, fetch additional brand information
        if (data.role === 'brand') {
          try {
            const brandResponse = await fetch("/api/brand/settings", {
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            if (brandResponse.ok) {
              const brandData = await brandResponse.json();
              userData.brandName = brandData.brand_name;
              userData.brandLegalName = brandData.brand_legal_name;
              userData.verified = brandData.verified;
            }
          } catch (err) {
            console.error('Failed to fetch brand details:', err);
            // Set default values for brand users
            userData.verified = false;
          }
        } else if (data.role === 'user') {
          // For regular users, we might fetch user-specific data here
          // userData.userProfile = await fetchUserProfile(accessToken);
        }
        
        storeSingleton.dispatch(setUser(userData));
      } else {
        storeSingleton.dispatch(clearUser());
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
      storeSingleton.dispatch(clearUser());
    }
  };

  return <Provider store={storeSingleton}>{children}</Provider>;
}
