import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { pendingBrandSignups } from "@/lib/pending-otp";

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();
    if (!email?.trim() || !otp?.trim()) {
      return NextResponse.json({ message: "Email and OTP are required" }, { status: 400 });
    }
    const normalizedEmail = email.trim().toLowerCase();
    const pending = pendingBrandSignups.get(normalizedEmail);
    if (!pending) return NextResponse.json({ message: "No pending signup found" }, { status: 400 });
    if (pending.expiresAt <= Date.now()) {
      pendingBrandSignups.delete(normalizedEmail);
      return NextResponse.json({ message: "OTP expired. Restart signup." }, { status: 400 });
    }
    if (pending.otp !== otp.trim()) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    // Create Supabase user with password
    const admin = getSupabaseAdmin();
    const { data: signUpRes, error: signUpErr } = await admin.auth.admin.createUser({
      email: normalizedEmail,
      password: pending.password,
      email_confirm: true,
      user_metadata: {
        full_name: pending.brandName,
        brand_name: pending.brandName,
      }
    });
    if (signUpErr) {
      console.error("createUser error", signUpErr);
      return NextResponse.json({ message: "Failed to create user" }, { status: 500 });
    }

    // Insert brand row with id = auth user id and include email
    const { data: brand, error: brandErr } = await admin
      .from("brands")
      .insert({
        id: signUpRes.user?.id,
        brand_name: pending.brandName,
        brand_legal_name: pending.brandLegalName,
        email: normalizedEmail,
        verified: false,
      })
      .select()
      .single();
    if (brandErr) {
      console.error("insert brand error", brandErr);
      return NextResponse.json({ message: "Failed to create brand row" }, { status: 500 });
    }

    pendingBrandSignups.delete(normalizedEmail);
    return NextResponse.json({ message: "Verified and registered", brand }, { status: 201 });
  } catch (e) {
    console.error("verify error", e);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}