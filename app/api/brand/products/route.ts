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
    if (!userId) return NextResponse.json({ products: [] }, { status: 200 });
    const admin = getSupabaseAdmin();
    const { data, error } = await admin
      .from("products")
      .select("id,title,price,stock_quantity,is_active,created_at")
      .eq("brand_id", userId)
      .order("created_at", { ascending: false });
    if (error) return NextResponse.json({ message: "Failed to fetch" }, { status: 500 });
    return NextResponse.json({ products: data ?? [] });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserId(req);
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const body = await req.json();
    const title: string = (body?.title || "").toString().trim();
    const price: number = Number(body?.price ?? 0);
    const stock: number = Number(body?.stock_quantity ?? 0);
    const description: string | null = body?.description ? String(body.description) : null;
    const image_urls: string[] | null = Array.isArray(body?.image_urls) ? body.image_urls : null;
    if (!title || !Number.isFinite(price)) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }
    const admin = getSupabaseAdmin();
    const { data, error } = await admin
      .from("products")
      .insert({
        brand_id: userId,
        title,
        description,
        price,
        stock_quantity: Number.isFinite(stock) ? stock : 0,
        image_urls,
        is_active: true,
      })
      .select("id,title,price,stock_quantity,is_active,created_at")
      .single();
    if (error) return NextResponse.json({ message: "Create failed" }, { status: 500 });
    return NextResponse.json({ product: data }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


