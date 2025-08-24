import { NextRequest, NextResponse } from "next/server";
import { validateEmail, validatePassword } from "@/lib/validators";
import { sendOTPEmail, generateOTP } from "@/lib/email";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limiter";

export async function POST(req: NextRequest) {
  try {
    // Rate limiting: 5 requests per 15 minutes per IP
    const clientId = getClientIdentifier(req);
    const rateLimitResult = checkRateLimit(clientId, 5);
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { message: "Too many signup attempts. Please try again later." },
        { status: 429 }
      );
    }

    const { brandName, brandLegalName, email, password } = await req.json();

    if (!brandName?.trim() || !brandLegalName?.trim() || !email?.trim() || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }

    const passCheck = validatePassword(password);
    if (!passCheck.isValid) {
      return NextResponse.json({ message: `Password requirements: ${passCheck.errors.join(', ')}` }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const otp = generateOTP();

    const sent = await sendOTPEmail(normalizedEmail, otp, brandName.trim());
    if (!sent.success) {
      return NextResponse.json({ message: "Failed to send OTP" }, { status: 500 });
    }

    // Return the OTP to be stored client-side (in production, consider encryption)
    return NextResponse.json({ 
      message: "OTP sent",
      otp, // Client will store this
      expiresAt: Date.now() + 15 * 60 * 1000 // 15 min
    });
  } catch (e) {
    console.error("signup OTP error", e);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// no exports to avoid type pollution in route typings