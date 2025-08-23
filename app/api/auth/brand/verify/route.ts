import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import RateLimiter from "@/lib/rate-limiter";

// Timing-safe string comparison to prevent timing attacks
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  
  return result === 0;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting: 10 verification attempts per 15 minutes per IP
    const clientId = RateLimiter.getClientIdentifier(req);
    const rateLimitResult = await RateLimiter.isAllowed(`verify:${clientId}`, 10, 15 * 60 * 1000);
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { message: "Too many verification attempts. Please try again later." },
        { status: 429 }
      );
    }

    const { email, otp, brandName, brandLegalName, password, storedOtp, expiresAt } = await req.json();
    
    if (!email?.trim() || !otp?.trim() || !brandName?.trim() || !brandLegalName?.trim() || !password || !storedOtp || !expiresAt) {
      return NextResponse.json({ message: "All verification data is required" }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if OTP is expired
    if (expiresAt <= Date.now()) {
      return NextResponse.json({ 
        message: "Your verification code has expired. Please restart the signup process.", 
        code: "OTP_EXPIRED" 
      }, { status: 400 });
    }

    // Server-side OTP validation
    const trimmedOtp = otp.trim();
    
    // Validate OTP format (6 digits)
    if (!/^\d{6}$/.test(trimmedOtp)) {
      return NextResponse.json({ message: "Invalid OTP format" }, { status: 400 });
    }

    // Timing-safe comparison to prevent timing attacks
    if (!timingSafeEqual(storedOtp, trimmedOtp)) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    // Create Supabase user with password
    const admin = getSupabaseAdmin();
    const { data: signUpRes, error: signUpErr } = await admin.auth.admin.createUser({
      email: normalizedEmail,
      password: password,
      email_confirm: true,
      user_metadata: {
        full_name: brandName.trim(),
        brand_name: brandName.trim(),
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
        brand_name: brandName.trim(),
        brand_legal_name: brandLegalName.trim(),
        email: normalizedEmail,
        verified: false,
      })
      .select()
      .single();
    if (brandErr) {
      console.error("insert brand error", brandErr);
      return NextResponse.json({ message: "Failed to create brand row" }, { status: 500 });
    }

    return NextResponse.json({ message: "Verified and registered", brand }, { status: 201 });
  } catch (e) {
    console.error("verify error", e);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}