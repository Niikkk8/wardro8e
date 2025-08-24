import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { SignInWithPasswordCredentials } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email?.trim() || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }
    const admin = getSupabaseAdmin();
    const { data, error } = await admin.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    } as SignInWithPasswordCredentials);
    if (error) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }
    const response = NextResponse.json({ 
      message: "Login successful",
      access_token: data.session?.access_token,
      refresh_token: data.session?.refresh_token,
      user: { id: data.user?.id, email: data.user?.email }
    });
    const token = data.session?.access_token;
    if (token) {
      response.cookies.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });
    }
    return response;
  } catch (e) {
    console.error("login error", e);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ message: "Logged out" });
  res.cookies.set('auth-token', '', { httpOnly: true, maxAge: 0, path: '/' });
  return res;
}