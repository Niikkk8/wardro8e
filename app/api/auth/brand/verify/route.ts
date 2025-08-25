import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limiter";

function getSupabaseServer() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE!;

  return createClient(supabaseUrl, supabaseServiceRole, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting: 10 verification attempts per 15 minutes per IP
    const clientId = getClientIdentifier(req);
    const rateLimitResult = checkRateLimit(`verify:${clientId}`, 10);

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

    // Simple OTP comparison
    if (storedOtp !== trimmedOtp) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    // Create a regular Supabase client for auth operations
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    console.log('Creating user for email:', normalizedEmail);

    // Use regular signUp method
    const { data: signUpRes, error: signUpErr } = await supabaseAuth.auth.signUp({
      email: normalizedEmail,
      password: password,
      options: {
        data: {
          // User metadata accessible to the user
          full_name: brandName.trim(),
          brand_name: brandName.trim(),
          role: 'brand',
        },
        // Since we verified OTP, we can skip email confirmation
        // Note: This requires email confirmations to be disabled in Supabase dashboard
        // Or we handle the confirmation separately
      }
    });
    if (signUpErr) {
      console.error("Create user error:", signUpErr);

      // Provide more specific error messages
      if (signUpErr.message?.includes('already registered')) {
        return NextResponse.json({
          message: "This email is already registered"
        }, { status: 400 });
      }

      if (signUpErr.message?.includes('password')) {
        return NextResponse.json({
          message: "Password does not meet requirements"
        }, { status: 400 });
      }

      return NextResponse.json({
        message: signUpErr.message || "Failed to create user account"
      }, { status: 500 });
    }

    if (!signUpRes.user) {
      console.error("No user returned from signUp");
      return NextResponse.json({
        message: "User creation failed - no user returned"
      }, { status: 500 });
    }

    console.log('User created successfully, ID:', signUpRes.user.id);

    // Now use service role client ONLY for database operations
    const supabaseDB = getSupabaseServer();

    // Insert brand row with id = auth user id
    const { data: brand, error: brandErr } = await supabaseDB
      .from("brands")
      .insert({
        id: signUpRes.user.id,
        brand_name: brandName.trim(),
        brand_legal_name: brandLegalName.trim(),
        email: normalizedEmail,
        verified: false,
      })
      .select()
      .single();
    if (brandErr) {
      console.error("Insert brand error:", brandErr);

      // Note: With normal signUp, we can't easily delete the user
      // You might want to handle this differently

      return NextResponse.json({
        message: "Account created but brand profile failed. Please contact support."
      }, { status: 500 });
    }

    console.log('Brand profile created successfully');

    // Return success with session if available
    return NextResponse.json({
      message: "Account created successfully!",
      brand,
      userId: signUpRes.user.id,
      // Include session data if you want to auto-login
      session: signUpRes.session
    }, { status: 201 });

  } catch (error) {
    console.error("Verify endpoint error:", error);

    // Log the full error for debugging
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    }

    return NextResponse.json({
      message: "An unexpected error occurred. Please try again."
    }, { status: 500 });
  }
}