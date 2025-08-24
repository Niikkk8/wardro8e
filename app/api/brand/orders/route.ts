import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

async function getUserId(req: NextRequest): Promise<string | null> {
  const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");
  const bearer = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : undefined;
  const cookieToken = req.cookies.get("auth-token")?.value;
  const accessToken = bearer || cookieToken;
  if (!accessToken) return null;
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.auth.getUser(accessToken);
  if (error || !data?.user?.id) return null;
  return data.user.id;
}

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserId(req);
    if (!userId) return NextResponse.json({ orders: [] }, { status: 200 });
    const admin = getSupabaseAdmin();
    const { data, error } = await admin
      .from("order_items")
      .select("id,order_id,product_id,quantity,price,orders(status,created_at)")
      .eq("brand_id", userId)
      .order("created_at", { referencedTable: "orders", ascending: false });
    if (error) return NextResponse.json({ message: "Failed to fetch" }, { status: 500 });
    return NextResponse.json({ orders: data ?? [] });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


