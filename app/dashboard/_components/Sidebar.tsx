"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  Shield,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { cn } from "@/components/ui/cn";
import { supabase } from "@/lib/supabase";

const links = [
  { href: "/dashboard/overview", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/products", label: "Products", icon: Package },
  { href: "/dashboard/orders", label: "Orders", icon: ShoppingCart },
  { href: "/dashboard/verification", label: "Verification", icon: Shield },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

type BrandInfo = {
  brand_name: string;
  email: string;
  verified: boolean;
  verification_status?: string;
};

export default function Sidebar() {
  const pathname = usePathname();
  const [brandInfo, setBrandInfo] = useState<BrandInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBrandInfo();
  }, []);

  const fetchBrandInfo = async () => {
    try {
      const { data: sessionRes } = await supabase.auth.getSession();
      const token = sessionRes.session?.access_token;

      if (!token) return;

      const res = await fetch("/api/brand/info", {
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setBrandInfo(data);
      }
    } catch (error) {
      console.error("Failed to fetch brand info:", error);
    } finally {
      setLoading(false);
    }
  };

  const getVerificationBadge = () => {
    if (!brandInfo) return null;

    if (brandInfo.verified) {
      return (
        <div className="flex items-center gap-1.5 text-green-600">
          <CheckCircle className="w-4 h-4" />
          <span className="text-xs">Verified</span>
        </div>
      );
    }

    if (brandInfo.verification_status === 'under_review') {
      return (
        <div className="flex items-center gap-1.5 text-yellow-600">
          <AlertCircle className="w-4 h-4" />
          <span className="text-xs">Under Review</span>
        </div>
      );
    }

    return (
      <Link href="/dashboard/verification" className="flex items-center gap-1.5 text-primary hover:underline">
        <AlertCircle className="w-4 h-4" />
        <span className="text-xs">Verify Now</span>
      </Link>
    );
  };

  return (
    <aside className="h-screen w-64 shrink-0 border-r border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="px-5 py-6">
        <div className="text-2xl font-serif mb-2">
          <span>wardro</span>
          <span className="text-teal-500">8</span>
          <span>e</span>
        </div>

        {/* Brand Info Section */}
        {!loading && brandInfo && (
          <div className="mb-6 p-3 bg-muted/50 rounded-xl">
            <div className="text-sm font-medium truncate">{brandInfo.brand_name}</div>
            <div className="text-xs text-muted-foreground truncate">{brandInfo.email}</div>
            <div className="mt-2">
              {getVerificationBadge()}
            </div>
          </div>
        )}

        <nav className="space-y-1">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname?.startsWith(href + "/");

            // Highlight verification if not verified
            const shouldHighlight = href === "/dashboard/verification" && brandInfo && !brandInfo.verified;

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors relative",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : shouldHighlight
                      ? "text-primary hover:bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
                {shouldHighlight && (
                  <span className="ml-auto w-2 h-2 bg-primary rounded-full animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
