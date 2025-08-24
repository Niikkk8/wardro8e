"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  orders: { status: string; created_at: string } | null;
};

export default function OrdersPage() {
  const [rows, setRows] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data: sessionRes } = await supabase.auth.getSession();
        const token = sessionRes.session?.access_token;
        const res = await fetch("/api/brand/orders", {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          credentials: "include",
        });
        const j = await res.json();
        if (mounted) setRows(j.orders || []);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <div className="p-6 md:p-8">
      <h1 className="text-3xl md:text-4xl mb-6">Orders</h1>
      <div className="bg-card border border-border rounded-2xl p-0 overflow-hidden">
        {loading ? (
          <div className="p-6 text-sm text-muted-foreground">Loading…</div>
        ) : rows.length === 0 ? (
          <div className="p-6 text-sm text-muted-foreground">No orders yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground border-b border-border">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Qty</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-3">{r.order_id}</td>
                  <td className="px-4 py-3">{r.product_id}</td>
                  <td className="px-4 py-3">{r.quantity}</td>
                  <td className="px-4 py-3">₹{r.price}</td>
                  <td className="px-4 py-3">{r.orders?.status ?? "—"}</td>
                  <td className="px-4 py-3">{r.orders?.created_at ? new Date(r.orders.created_at).toLocaleDateString() : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}


