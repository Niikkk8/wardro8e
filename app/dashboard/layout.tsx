import React from "react";
import Sidebar from "./_components/Sidebar";
import AuthGuard from "@/components/AuthGuard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requireRole="brand" requireVerified={false} redirectTo="/auth/brand/login">
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>
    </AuthGuard>
  );
}


