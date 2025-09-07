'use client';

import React from "react";
import { Package, ShoppingCart, IndianRupee, Users, AlertCircle, ArrowRight } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";

export default function OverviewPage() {
  const authState = useAppSelector((state) => state.auth);
  const isVerified: boolean | undefined = authState.account?.verified;

  // Show loading state while auth data is being fetched
  if (authState.loading) {
    return (
      <div className="p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl mb-6">Overview</h1>
        <div className="text-center py-8">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-3xl md:text-4xl mb-6">Overview</h1>
      
      {/* Verification Status Message */}
      {isVerified === false && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-amber-800 mb-1">
                Brand Verification Required
              </h3>
              <p className="text-sm text-amber-700 mb-3">
                Your brand is not verified yet. Complete the verification process to access all features and start selling on Wardro8e.
              </p>
              <Link 
                href="/dashboard/verification"
                className="inline-flex items-center gap-2 text-sm font-medium text-amber-800 hover:text-amber-900 transition-colors"
              >
                Complete Verification
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Products", value: "—", icon: Package },
          { label: "Orders", value: "—", icon: ShoppingCart },
          { label: "Revenue (₹)", value: "—", icon: IndianRupee },
          { label: "Customers", value: "—", icon: Users },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 text-primary p-2">
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">{label}</div>
              <div className="text-xl font-medium">{value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-xl mb-4">Recent Orders</h2>
          <div className="text-sm text-muted-foreground">No orders yet.</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-xl mb-4">Top Products</h2>
          <div className="text-sm text-muted-foreground">No products yet.</div>
        </div>
      </div>
    </div>
  );
}


