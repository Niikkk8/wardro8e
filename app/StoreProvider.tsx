"use client";

import React, { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/store";
import { setAuthAccount, clearAuth, loadPendingSignup, AuthAccount } from "@/store/authSlice";
import { supabase } from "@/lib/supabase";
import { usePathname, useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";
const storeSingleton = makeStore();

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    storeSingleton.dispatch(loadPendingSignup());

    const hydrateFromSession = async (session: Session) => {
      try {
        const authUser = session?.user ?? null;
        if (!authUser?.id || !authUser?.email) {
          storeSingleton.dispatch(clearAuth());
          // Protect dashboard routes for unauthenticated visitors
          if (pathname?.startsWith('/dashboard')) {
            router.replace('/auth/brand/login');
          }
          return;
        }

        const accountData: AuthAccount = { id: authUser.id, email: authUser.email, role: null };

        // Prefer role from Supabase user metadata (set at signup)
        const metaRole = (authUser.user_metadata?.role || authUser.app_metadata?.role) as 'brand' | 'user' | undefined;
        if (metaRole === 'brand') {
          accountData.role = 'brand';
        } else if (metaRole === 'user') {
          accountData.role = 'user';
        }

        // If role unknown or to enrich brand details, query brands table
        if (accountData.role !== 'user') {
          const { data: brandRow } = await supabase
            .from('brands')
            .select('brand_name, brand_legal_name, verified')
            .eq('id', authUser.id)
            .maybeSingle();
          if (brandRow) {
            accountData.role = 'brand';
            accountData.brandName = brandRow.brand_name as unknown as string | undefined;
            accountData.brandLegalName = brandRow.brand_legal_name as unknown as string | undefined;
            accountData.verified = (brandRow as unknown as { verified?: boolean }).verified ?? false;
          } else if (!accountData.role) {
            // If still unknown and no brand row, default to user
            accountData.role = 'user';
          }
        }

        storeSingleton.dispatch(setAuthAccount(accountData));

        // Route rules
        if (pathname?.startsWith('/dashboard')) {
          // Only brand accounts may access dashboard
          if (accountData.role !== 'brand') {
            router.replace('/auth/brand/login');
            return;
          }
          // If brand is not verified, funnel to verification
          if (accountData.verified === false && pathname !== '/dashboard/verification') {
            router.replace('/dashboard/verification');
            return;
          }
        }

        // If visiting auth pages while authenticated, redirect appropriately
        if (pathname?.startsWith('/auth')) {
          if (accountData.role === 'brand') {
            router.replace('/dashboard');
            return;
          }
          if (accountData.role === 'user') {
            router.replace('/for-shoppers');
            return;
          }
        }

        // Redirect authenticated users from home page to their appropriate landing page
        if (pathname === '/') {
          if (accountData.role === 'brand') {
            router.replace('/dashboard');
            return;
          }
          if (accountData.role === 'user') {
            router.replace('/for-shoppers');
            return;
          }
        }
      } catch (error) {
        console.error('Error in hydrateFromSession:', error);
        storeSingleton.dispatch(clearAuth());
      }
    };

    // Initial hydration to cover environments without INITIAL_SESSION event
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        hydrateFromSession(data.session);
      }
    });

    // Hydrate and keep Redux in sync with Supabase session changes (includes INITIAL_SESSION)
    const { data: subscription } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        hydrateFromSession(session);
      }
    });

    return () => {
      subscription?.subscription?.unsubscribe();
    };
  }, []);

  return <Provider store={storeSingleton}>{children}</Provider>;
}
