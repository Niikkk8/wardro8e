import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, getAuthenticatedUser } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return NextResponse.json({ orders: [] }, { status: 200 });
    
    const admin = getSupabaseAdmin();
    const { data, error } = await admin
      .from("order_items")
      .select("id,order_id,product_id,quantity,price,orders(status,created_at)")
      .eq("brand_id", user.id)
      .order("created_at", { referencedTable: "orders", ascending: false });
    if (error) return NextResponse.json({ message: "Failed to fetch" }, { status: 500 });
    return NextResponse.json({ orders: data ?? [] });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


