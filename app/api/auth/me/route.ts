import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    // Use Authorization header from Supabase client session
    const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");
    const accessToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : undefined;

    if (!accessToken) {
      return NextResponse.json({ userId: null, email: null, role: null }, { status: 200 });
    }

    const admin = getSupabaseAdmin();
    const { data: userRes, error: userErr } = await admin.auth.getUser(accessToken);
    if (userErr || !userRes?.user) {
      return NextResponse.json({ userId: null, email: null, role: null }, { status: 200 });
    }

    const userId = userRes.user.id;
    const email = userRes.user.email ?? null;

    // Check if this user is a brand by existence in brands table
    const { data: brandRow, error: brandErr } = await admin
      .from("brands")
      .select("id")
      .eq("id", userId)
      .maybeSingle();

    const role = brandErr ? null : brandRow ? "brand" : "user";

    return NextResponse.json({ userId, email, role }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ userId: null, email: null, role: null }, { status: 200 });
  }
}