import React from "react";
import { Package, ShoppingCart, IndianRupee, Users } from "lucide-react";

export default function OverviewPage() {
  return (
    <div className="p-6 md:p-8">
      <h1 className="text-3xl md:text-4xl mb-6">Overview</h1>
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


