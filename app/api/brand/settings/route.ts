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
    if (!userId) return NextResponse.json({ settings: null }, { status: 200 });
    const admin = getSupabaseAdmin();
    const { data, error } = await admin
      .from("brands")
      .select("id,brand_name,slug,description,email")
      .eq("id", userId)
      .maybeSingle();
    if (error) return NextResponse.json({ message: "Failed to fetch" }, { status: 500 });
    return NextResponse.json({ settings: data });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const userId = await getUserId(req);
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const body = await req.json();
    const updates: Record<string, unknown> = {};
    if (typeof body?.brand_name === "string") updates.brand_name = body.brand_name.trim();
    if (typeof body?.description === "string") updates.description = body.description;
    if (typeof body?.email === "string") updates.email = body.email.trim().toLowerCase();

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ message: "No changes" }, { status: 400 });
    }

    const admin = getSupabaseAdmin();
    const { data, error } = await admin
      .from("brands")
      .update(updates)
      .eq("id", userId)
      .select("id,brand_name,slug,description,email")
      .single();
    if (error) return NextResponse.json({ message: "Update failed" }, { status: 500 });
    return NextResponse.json({ settings: data });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


