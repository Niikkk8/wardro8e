import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer, getAuthenticatedUser } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return NextResponse.json({ settings: null }, { status: 200 });
    
    const supabase = getSupabaseServer(req);
    const { data, error } = await supabase
      .from("brands")
      .select("id,brand_name,brand_legal_name,verified,description,email")
      .eq("id", user.id)
      .maybeSingle();
    if (error) return NextResponse.json({ message: "Failed to fetch" }, { status: 500 });
    if (!data) return NextResponse.json({ settings: null }, { status: 200 });
    // Flatten for client simplicity
    return NextResponse.json({
      id: data.id,
      brand_name: data.brand_name,
      brand_legal_name: data.brand_legal_name,
      verified: data.verified,
      description: data.description,
      email: data.email,
    });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    
    const body = await req.json();
    const updates: Record<string, unknown> = {};
    if (typeof body?.brand_name === "string") updates.brand_name = body.brand_name.trim();
    if (typeof body?.description === "string") updates.description = body.description;
    if (typeof body?.email === "string") updates.email = body.email.trim().toLowerCase();

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ message: "No changes" }, { status: 400 });
    }

    const supabase = getSupabaseServer(req);
    const { data, error } = await supabase
      .from("brands")
      .update(updates)
      .eq("id", user.id)
      .select("id,brand_name,slug,description,email")
      .single();
    if (error) return NextResponse.json({ message: "Update failed" }, { status: 500 });
    return NextResponse.json({ settings: data });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


