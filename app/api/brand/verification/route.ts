import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, getAuthenticatedUser } from "@/lib/supabase";
import { sendVerificationSubmissionEmail } from "@/lib/email";

// Type Definitions
interface UploadedDocument {
  type: "address_proof" | "contract";
  url: string;
  original_name: string;
  uploaded_at: string;
}

interface VerificationFormData {
  business_type: string;
  gstin: string;
  pan_number: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  pincode: string;
  bank_name: string | null;
  account_holder_name: string | null;
  account_number: string | null;
  ifsc_code: string | null;
  website_url: string | null;
  instagram_handle: string | null;
  contract_document_action: "e_sign" | "manual_sign";
  user_ip: string | null;
}

interface SubmissionMetadata {
  user_agent: string;
  submitted_at: string;
}

// Remove the getUserId function since we'll use getAuthenticatedUser

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const admin = getSupabaseAdmin();

    // Check if user is a brand
    const { data: brand, error: brandError } = await admin
      .from("brands")
      .select("id")
      .eq("id", user.id)
      .single();

    if (brandError || !brand) {
      return NextResponse.json({ message: "Brand not found" }, { status: 404 });
    }

    // Parse form data
    const formData = await req.formData();
    
    // Extract form fields with proper typing
    const verificationData: VerificationFormData = {
      business_type: formData.get("business_type") as string,
      gstin: formData.get("gstin") as string,
      pan_number: formData.get("pan_number") as string,
      contact_name: formData.get("contact_name") as string,
      contact_phone: formData.get("contact_phone") as string,
      contact_email: formData.get("contact_email") as string,
      address_line1: formData.get("address_line1") as string,
      address_line2: formData.get("address_line2") as string | null,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      pincode: formData.get("pincode") as string,
      bank_name: formData.get("bank_name") as string | null,
      account_holder_name: formData.get("account_holder_name") as string | null,
      account_number: formData.get("account_number") as string | null,
      ifsc_code: formData.get("ifsc_code") as string | null,
      website_url: formData.get("website_url") as string | null,
      instagram_handle: formData.get("instagram_handle") as string | null,
      contract_document_action: formData.get("contract_document_action") as "e_sign" | "manual_sign",
      user_ip: formData.get("user_ip") as string | null,
    };

    // Validate required fields with proper typing
    const requiredFields: (keyof VerificationFormData)[] = [
      "business_type", "gstin", "pan_number", "contact_name", 
      "contact_phone", "contact_email", "address_line1", 
      "city", "state", "pincode", "contract_document_action"
    ];

    for (const field of requiredFields) {
      if (!verificationData[field]) {
        return NextResponse.json({ 
          message: `${field} is required` 
        }, { status: 400 });
      }
    }

    // Handle file uploads
    const addressProofDocuments = formData.getAll("address_proof_documents") as File[];
    const contractDocuments = formData.getAll("contract_documents") as File[];

    // Use proper types instead of any[]
    const uploadedAddressProofDocuments: UploadedDocument[] = [];
    const uploadedContractDocuments: UploadedDocument[] = [];

    // Upload address proof documents
    if (addressProofDocuments.length > 0) {
      for (const file of addressProofDocuments) {
        if (file.size > 0) {
          const fileExt = file.name.split(".").pop();
          const fileName = `${user.id}/address-proof/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
          
          const { error } = await admin.storage
            .from("address-proof-docs")
            .upload(fileName, file, {
              contentType: file.type,
            });

          if (error) {
            console.error("Address proof upload error:", error);
            return NextResponse.json({ 
              message: "Failed to upload address proof document" 
            }, { status: 500 });
          }

          uploadedAddressProofDocuments.push({
            type: "address_proof",
            url: fileName,
            original_name: file.name,
            uploaded_at: new Date().toISOString(),
          });
        }
      }
    }

    // Upload contract documents (if manual signing was chosen)
    if (verificationData.contract_document_action === "manual_sign" && contractDocuments.length > 0) {
      for (const file of contractDocuments) {
        if (file.size > 0) {
          const fileExt = file.name.split(".").pop();
          const fileName = `${user.id}/contracts/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
          
          const { error } = await admin.storage
            .from("contract-docs")
            .upload(fileName, file, {
              contentType: file.type,
            });

          if (error) {
            console.error("Contract upload error:", error);
            return NextResponse.json({ 
              message: "Failed to upload contract document" 
            }, { status: 500 });
          }

          uploadedContractDocuments.push({
            type: "contract",
            url: fileName,
            original_name: file.name,
            uploaded_at: new Date().toISOString(),
          });
        }
      }
    }

    // Insert verification data with proper typing
    const { data: verification, error: verificationError } = await admin
      .from("brand_verifications")
      .upsert({
        brand_id: user.id,
        status: verificationData.contract_document_action === "e_sign" ? "awaiting_esign" : "under_review",
        business_type: verificationData.business_type,
        gstin: verificationData.gstin,
        pan_number: verificationData.pan_number,
        contact_name: verificationData.contact_name,
        contact_phone: verificationData.contact_phone,
        contact_email: verificationData.contact_email,
        address_line1: verificationData.address_line1,
        address_line2: verificationData.address_line2,
        city: verificationData.city,
        state: verificationData.state,
        pincode: verificationData.pincode,
        bank_name: verificationData.bank_name,
        account_holder_name: verificationData.account_holder_name,
        account_number: verificationData.account_number,
        ifsc_code: verificationData.ifsc_code,
        website_url: verificationData.website_url,
        instagram_handle: verificationData.instagram_handle,
        address_proof_documents: uploadedAddressProofDocuments,
        contract_document_action: verificationData.contract_document_action,
        contract_documents: uploadedContractDocuments,
        user_ip: verificationData.user_ip,
        submission_metadata: {
          user_agent: req.headers.get("user-agent") || "",
          submitted_at: new Date().toISOString(),
        } satisfies SubmissionMetadata,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (verificationError) {
      console.error("Verification insert error:", verificationError);
      return NextResponse.json({ 
        message: "Failed to save verification data" 
      }, { status: 500 });
    }

    // Send email notification
    try {
      await sendVerificationSubmissionEmail(
        verificationData.contact_email,
        verificationData.contact_name,
        verification.status
      );
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      message: "Verification submitted successfully",
      verification,
      status: verification.status,
    });

  } catch (error) {
    console.error("Verification submission error:", error);
    return NextResponse.json({ 
      message: "Internal server error" 
    }, { status: 500 });
  }
}