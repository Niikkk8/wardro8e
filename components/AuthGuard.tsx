"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
  requireRole?: 'brand' | 'user';
  redirectTo?: string;
}

export default function AuthGuard({ children, requireRole, redirectTo = '/auth' }: AuthGuardProps) {
  const { user, loading } = useAppSelector((state: any) => state.auth);
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
    router.replace('/auth');
    return null;
  }

  return <>{children}</>;
}
