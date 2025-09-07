"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  Shield,
  AlertCircle,
  CheckCircle,
  X
} from "lucide-react";
import { cn } from "@/components/ui/cn";
import { useAppSelector } from "@/store/hooks";

const links = [
  { href: "/dashboard/overview", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/products", label: "Products", icon: Package },
  { href: "/dashboard/orders", label: "Orders", icon: ShoppingCart },
  { href: "/dashboard/verification", label: "Verification", icon: Shield },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

// Remove the BrandInfo type since we'll use Redux store

interface SidebarProps {
  onClose?: () => void;
  collapsed?: boolean;
}

export default function Sidebar({ onClose, collapsed = false }: SidebarProps) {
  const pathname = usePathname();
  const authState = useAppSelector((state) => state.auth);
  const account = authState.account;

  const getVerificationBadge = () => {
    if (!account) return null;

    if (account.verified) {
      return (
        <div className="flex items-center gap-1.5 text-green-600">
          <CheckCircle className="w-4 h-4" />
          <span className="text-xs">Verified</span>
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
    <aside className={`h-full overflow-hidden border-r border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/60 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'
      }`}>
      <div className={`py-6 transition-all duration-300 flex flex-col h-full overflow-hidden ${collapsed ? 'px-3' : 'px-5'}`}>
        <div className="flex-shrink-0 flex items-center justify-between mb-2">
          {!collapsed && (
            <div className="text-2xl font-serif">
              <span>wardro</span>
              <span className="text-teal-500">8</span>
              <span>e</span>
            </div>
          )}
          {collapsed && (
            <div className="text-xl font-serif mx-auto">
              <span className="text-teal-500">8</span>
            </div>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-1 hover:bg-muted rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <nav className="space-y-1 flex-1 mt-6 overflow-y-auto overflow-x-hidden min-h-0">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname?.startsWith(href + "/");

            // Highlight verification if not verified
            const shouldHighlight = href === "/dashboard/verification" && account && !account.verified;

            return (
              <Link
                key={href}
                href={href}
                onClick={() => onClose?.()}
                className={cn(
                  "flex items-center rounded-xl px-3 py-2 text-sm transition-colors relative flex-shrink-0",
                  collapsed ? "justify-center" : "gap-3",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : shouldHighlight
                      ? "text-primary hover:bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
                title={collapsed ? label : undefined}
              >
                <Icon className="w-4 h-4" />
                {!collapsed && <span>{label}</span>}
                {shouldHighlight && !collapsed && (
                  <span className="ml-auto w-2 h-2 bg-primary rounded-full animate-pulse" />
                )}
                {shouldHighlight && collapsed && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Brand Info Section */}
        {account && !collapsed && (
          <div className="flex-shrink-0 mb-6 p-3 bg-muted/50 rounded-xl">
            <div className="text-sm font-medium truncate">
              {account.brandName || account.email}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {account.email}
            </div>
            <div className="mt-2">
              {getVerificationBadge()}
            </div>
          </div>
        )}

        {/* Footer Section */}
        {!collapsed && (
          <div className="flex-shrink-0 pt-4 border-t border-border/50">
            <div className="text-xs text-muted-foreground text-center">
              Wardro8e Dashboard
            </div>
            <div className="text-xs text-muted-foreground text-center mt-1">
              v1.0.0
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
