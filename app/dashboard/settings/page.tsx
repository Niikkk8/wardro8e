"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";

export default function SettingsPage() {
  const [brandName, setBrandName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data: sessionRes } = await supabase.auth.getSession();
        const token = sessionRes.session?.access_token;
        const res = await fetch('/api/brand/settings', {
          method: 'GET',
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          credentials: 'include',
        });
        if (res.ok) {
          const j = await res.json();
          if (j && j.id) {
            setBrandName(j.brand_name ?? "");
            setEmail(j.email ?? "");
          }
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <h1 className="text-3xl md:text-4xl mb-6">Settings</h1>

      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        {loading ? (
          <div className="text-sm text-muted-foreground">Loading…</div>
        ) : (
          <>
            <div className="space-y-1">
              <Label>Brand Name</Label>
              <Input value={brandName} onChange={(e) => setBrandName(e.target.value)} placeholder="Your brand" />
            </div>
            <div className="space-y-1">
              <Label>Email</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@brand.com" />
            </div>
            <div>
              <button
                disabled={saving}
                onClick={async () => {
                  setSaving(true);
                  try {
                    const { data: sessionRes } = await supabase.auth.getSession();
                    const token = sessionRes.session?.access_token;
                    await fetch('/api/brand/settings', {
                      method: 'PATCH',
                      headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                      },
                      credentials: 'include',
                      body: JSON.stringify({ brand_name: brandName, email }),
                    });
                  } finally {
                    setSaving(false);
                  }
                }}
                className="rounded-xl bg-primary text-primary-foreground px-4 py-2 hover:opacity-90 disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}


