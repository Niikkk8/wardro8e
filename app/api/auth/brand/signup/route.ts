import { NextRequest, NextResponse } from "next/server";
import { validateEmail, validatePassword } from "@/lib/validators";
import { sendOTPEmail, generateOTP } from "@/lib/email";
import RateLimiter from "@/lib/rate-limiter";

export async function POST(req: NextRequest) {
  try {
    // Rate limiting: 5 requests per 15 minutes per IP
    const clientId = RateLimiter.getClientIdentifier(req);
    const rateLimitResult = await RateLimiter.isAllowed(clientId, 5, 15 * 60 * 1000);
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { message: "Too many signup attempts. Please try again later." },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
          }
        }
      );
    }

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