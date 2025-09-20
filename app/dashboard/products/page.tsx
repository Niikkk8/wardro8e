"use client";

import React, { useEffect, useState } from "react";
import { Plus, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import ClothingProductForm from "@/components/ClothingProductForm";
import { useAppSelector } from "@/store/hooks";

type Product = { id: string; title: string; price: number; stock_quantity: number; is_active: boolean; created_at: string };

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showVerificationAlert, setShowVerificationAlert] = useState(false);
  
  // Get verification status from Redux store
  const { account } = useAppSelector((state) => state.auth);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data: sessionRes } = await supabase.auth.getSession();
        const token = sessionRes.session?.access_token;
        const res = await fetch("/api/brand/products", {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          credentials: "include",
        });
        const j = await res.json();
        if (mounted) setItems(j.products || []);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const fetchProducts = async () => {
    try {
      const { data: sessionRes } = await supabase.auth.getSession();
      const token = sessionRes.session?.access_token;
      const res = await fetch("/api/brand/products", {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        credentials: "include",
      });
      const j = await res.json();
      setItems(j.products || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleProductCreated = () => {
    fetchProducts(); // Refresh the products list
  };

  const handleAddProductClick = () => {
    // Check if brand is verified before opening modal
    if (!account?.verified) {
      setShowVerificationAlert(true);
      return;
    }
    setShowCreateForm(true);
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl md:text-4xl">Products</h1>
        <button 
          onClick={handleAddProductClick}
          className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2 hover:opacity-90"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Search products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="bg-card border border-border rounded-2xl p-0 overflow-hidden">
        {loading ? (
          <div className="p-6 text-sm text-muted-foreground">Loading…</div>
        ) : items.length === 0 ? (
          <div className="p-6 text-sm text-muted-foreground">No products yet. Create your first product to get started.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground border-b border-border">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {items
                .filter((p) => !query || p.title.toLowerCase().includes(query.toLowerCase()))
                .map((p) => (
                  <tr key={p.id} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-3">{p.title}</td>
                    <td className="px-4 py-3">₹{p.price}</td>
                    <td className="px-4 py-3">{p.stock_quantity}</td>
                    <td className="px-4 py-3">{p.is_active ? "Active" : "Inactive"}</td>
                    <td className="px-4 py-3">{new Date(p.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Verification Alert Modal */}
      {showVerificationAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-3xl w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-amber-500" />
              <h3 className="text-lg font-semibold">Verification Required</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              You need to complete brand verification before you can add products. 
              This helps maintain quality and trust on our platform.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowVerificationAlert(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={() => window.location.href = '/dashboard/verification'}
                className="flex-1"
              >
                Complete Verification
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Clothing Product Creation Form Modal */}
      {showCreateForm && (
        <ClothingProductForm
          onClose={() => setShowCreateForm(false)}
          onSuccess={handleProductCreated}
        />
      )}
    </div>
  );
}


