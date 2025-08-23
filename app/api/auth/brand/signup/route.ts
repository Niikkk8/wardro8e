import { NextRequest, NextResponse } from "next/server";
import { validateEmail, validatePassword } from "@/lib/validators";
import { sendOTPEmail, generateOTP } from "@/lib/email";
import { pendingBrandSignups } from "@/lib/pending-otp";

export async function POST(req: NextRequest) {
  try {
    const { brandName, brandLegalName, email, password } = await req.json();

    if (!brandName?.trim() || !brandLegalName?.trim() || !email?.trim() || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }

    const pass = validatePassword(password);
    if (!pass.isValid) {
      return NextResponse.json({ message: "Weak password", errors: pass.errors }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 min

    pendingBrandSignups.set(normalizedEmail, {
      brandName: brandName.trim(),
      brandLegalName: brandLegalName.trim(),
      email: normalizedEmail,
      password,
      otp,
      expiresAt,
    });

    const sent = await sendOTPEmail(normalizedEmail, otp, brandName.trim());
    if (!sent.success) {
      pendingBrandSignups.delete(normalizedEmail);
      return NextResponse.json({ message: "Failed to send OTP" }, { status: 500 });
    }

    return NextResponse.json({ message: "OTP sent" });
  } catch (e) {
    console.error("signup OTP error", e);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// no exports to avoid type pollution in route typings