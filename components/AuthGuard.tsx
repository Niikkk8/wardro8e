"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { Loader2 } from "lucide-react";
import { RootState } from "@/store";
interface AuthGuardProps {
  children: React.ReactNode;
  requireRole?: 'brand' | 'user';
  requireVerified?: boolean;
  redirectTo?: string;
}

export default function AuthGuard({ children, requireRole, requireVerified = false, redirectTo = '/auth' }: AuthGuardProps) {
  const { user, loading } = useAppSelector((state: RootState) => state.auth);
  const router = useRouter();

  // Show loading spinner while checking auth status
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    router.replace(redirectTo);
    return null;
  }

  // Check role requirement if specified
  if (requireRole && user.role !== requireRole) {
    // Redirect based on user type
    if (user.role === 'brand') {
      router.replace('/dashboard');
    } else if (user.role === 'user') {
      router.replace('/for-shoppers');
    } else {
      router.replace('/auth');
    }
    return null;
  }

  // Check verification requirement for brands only
  if (requireVerified && user.role === 'brand') {
    if (!user.verified) {
      router.replace('/dashboard/verification');
      return null;
    }
  }

  return <>{children}</>;
}
