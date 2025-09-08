import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer, getAuthenticatedUser } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    console.log('Verification status API: Checking authentication');
    const user = await getAuthenticatedUser(req);
    if (!user) {
      console.log('Verification status API: No authenticated user');
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    console.log('Verification status API: Authenticated user found', { userId: user.id });

    const supabase = getSupabaseServer(req);

    // Check if user is a brand (RLS will handle the security)
    const { data: brand, error: brandError } = await supabase
      .from("brands")
      .select("id")
      .eq("id", user.id)
      .single();

    if (brandError || !brand) {
      return NextResponse.json({ message: "Brand not found" }, { status: 404 });
    }

    // Get verification status (RLS will handle the security)
    const { data: verification, error: verificationError } = await supabase
      .from("brand_verifications")
      .select("*")
      .eq("brand_id", user.id)
      .single();

    if (verificationError && verificationError.code !== 'PGRST116') {
      console.error("Error fetching verification:", verificationError);
      return NextResponse.json({ 
        message: "Failed to fetch verification status" 
      }, { status: 500 });
    }

    if (!verification) {
      return NextResponse.json({
        status: null,
        verification: null,
      });
    }

    return NextResponse.json({
      status: verification.status,
      verification: {
        business_type: verification.business_type,
        gstin: verification.gstin,
        pan_number: verification.pan_number,
        contact_name: verification.contact_name,
        contact_phone: verification.contact_phone,
        contact_email: verification.contact_email,
        address_line1: verification.address_line1,
        address_line2: verification.address_line2,
        city: verification.city,
        state: verification.state,
        pincode: verification.pincode,
        bank_name: verification.bank_name,
        account_holder_name: verification.account_holder_name,
        account_number: verification.account_number,
        ifsc_code: verification.ifsc_code,
        website_url: verification.website_url,
        instagram_handle: verification.instagram_handle,
        contract_document_action: verification.contract_document_action,
        created_at: verification.created_at,
        updated_at: verification.updated_at,
      },
      rejection_reason: verification.rejection_reason,
    });

  } catch (error) {
    console.error("Verification status error:", error);
    return NextResponse.json({ 
      message: "Internal server error" 
    }, { status: 500 });
  }
}
