"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Building2,
    User,
    MapPin,
    CreditCard,
    Upload,
    Globe,
    Instagram,
    Phone,
    Mail,
    FileText,
    AlertCircle,
    CheckCircle,
    ChevronRight,
    ChevronLeft,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/components/ui/cn";
import { supabase } from "@/lib/supabase";

type Step = 1 | 2 | 3 | 4 | 5;

type FormData = {
    // Business Details
    business_type: string;
    gstin: string;
    pan_number: string;

    // Contact Details
    contact_name: string;
    contact_phone: string;
    contact_email: string;

    // Address
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    pincode: string;

    // Bank Details (optional)
    bank_name: string;
    account_holder_name: string;
    account_number: string;
    ifsc_code: string;

    // Social/Online
    website_url: string;
    instagram_handle: string;

    // Documents
    documents: File[];
};

const steps = [
    { id: 1, title: "Business Details", icon: Building2 },
    { id: 2, title: "Contact Info", icon: User },
    { id: 3, title: "Address", icon: MapPin },
    { id: 4, title: "Bank & Social", icon: CreditCard },
    { id: 5, title: "Documents", icon: Upload },
];

export default function VerificationPage() {
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [formData, setFormData] = useState<FormData>({
        business_type: "",
        gstin: "",
        pan_number: "",
        contact_name: "",
        contact_phone: "",
        contact_email: "",
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        pincode: "",
        bank_name: "",
        account_holder_name: "",
        account_number: "",
        ifsc_code: "",
        website_url: "",
        instagram_handle: "",
        documents: [],
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingStatus, setIsCheckingStatus] = useState(true);
    const [verificationStatus, setVerificationStatus] = useState<string | null>(null);

    useEffect(() => {
        checkVerificationStatus();
    }, []);

    const checkVerificationStatus = async () => {
        try {
            const { data: sessionRes } = await supabase.auth.getSession();
            const token = sessionRes.session?.access_token;

            const res = await fetch("/api/brand/verification/status", {
                headers: token ? { Authorization: `Bearer ${token}` } : undefined,
                credentials: "include",
            });

            if (res.ok) {
                const data = await res.json();
                setVerificationStatus(data.status);

                // If there's existing data, populate the form
                if (data.verification) {
                    setFormData(prev => ({
                        ...prev,
                        ...data.verification,
                        documents: [],
                    }));
                }
            }
        } catch (error) {
            console.error("Error checking verification status:", error);
        } finally {
            setIsCheckingStatus(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setFormData(prev => ({
                ...prev,
                documents: Array.from(files),
            }));
        }
    };

    const validateStep = (step: Step): boolean => {
        const newErrors: Record<string, string> = {};

        switch (step) {
            case 1:
                if (!formData.business_type) newErrors.business_type = "Business type is required";
                if (!formData.pan_number) newErrors.pan_number = "PAN number is required";
                break;
            case 2:
                if (!formData.contact_name) newErrors.contact_name = "Contact name is required";
                if (!formData.contact_phone) newErrors.contact_phone = "Phone number is required";
                if (!formData.contact_email) newErrors.contact_email = "Email is required";
                break;
            case 3:
                if (!formData.address_line1) newErrors.address_line1 = "Address is required";
                if (!formData.city) newErrors.city = "City is required";
                if (!formData.state) newErrors.state = "State is required";
                if (!formData.pincode) newErrors.pincode = "Pincode is required";
                break;
            case 5:
                if (formData.documents.length === 0) newErrors.documents = "At least one document is required";
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            if (currentStep < 5) {
                setCurrentStep((currentStep + 1) as Step);
            }
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep((currentStep - 1) as Step);
        }
    };

    const handleSubmit = async () => {
        if (!validateStep(5)) return;

        setIsLoading(true);

        try {
            const { data: sessionRes } = await supabase.auth.getSession();
            const token = sessionRes.session?.access_token;

            // Create FormData for file upload
            const submitData = new FormData();

            // Add all form fields
            Object.entries(formData).forEach(([key, value]) => {
                if (key !== 'documents' && value) {
                    submitData.append(key, value as string);
                }
            });

            // Add documents
            formData.documents.forEach((file) => {
                submitData.append('documents', file);
            });

            const res = await fetch("/api/brand/verification", {
                method: "POST",
                headers: token ? { Authorization: `Bearer ${token}` } : undefined,
                credentials: "include",
                body: submitData,
            });

            if (res.ok) {
                setVerificationStatus('under_review');
            } else {
                const error = await res.json();
                setErrors({ general: error.message || "Failed to submit verification" });
            }
        } catch (error) {
            console.error("Error submitting verification:", error);
            setErrors({ general: "Failed to submit verification" });
        } finally {
            setIsLoading(false);
        }
    };

    if (isCheckingStatus) {
        return (
            <div className="p-6 md:p-8 flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (verificationStatus === 'approved') {
        return (
            <div className="p-6 md:p-8">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-medium mb-2">Verification Approved!</h2>
                        <p className="text-muted-foreground">Your brand has been verified successfully.</p>
                    </div>
                </div>
            </div>
        );
    }

    if (verificationStatus === 'under_review') {
        return (
            <div className="p-6 md:p-8">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 text-center">
                        <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-medium mb-2">Under Review</h2>
                        <p className="text-muted-foreground">
                            Your verification is being reviewed. We&apos;ll notify you once it&apos;s complete.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl md:text-4xl mb-2">Brand Verification</h1>
                <p className="text-muted-foreground mb-8">
                    Complete your verification to start selling on Wardro8e
                </p>

                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-8">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <div
                                className={cn(
                                    "flex flex-col items-center gap-2 cursor-pointer",
                                    currentStep === step.id ? "text-primary" : "text-muted-foreground"
                                )}
                                onClick={() => setCurrentStep(step.id as Step)}
                            >
                                <div
                                    className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors",
                                        currentStep === step.id
                                            ? "bg-primary border-primary text-primary-foreground"
                                            : currentStep > step.id
                                                ? "bg-green-100 border-green-500 text-green-600"
                                                : "bg-background border-border"
                                    )}
                                >
                                    {currentStep > step.id ? (
                                        <CheckCircle className="w-5 h-5" />
                                    ) : (
                                        <step.icon className="w-5 h-5" />
                                    )}
                                </div>
                                <span className="text-xs hidden md:block">{step.title}</span>
                            </div>
                            {index < steps.length - 1 && (
                                <div
                                    className={cn(
                                        "flex-1 h-0.5 mx-2",
                                        currentStep > step.id ? "bg-primary" : "bg-border"
                                    )}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Form Content */}
                <div className="bg-card border border-border rounded-3xl p-6 md:p-8">
                    {errors.general && (
                        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 mb-6 flex items-start space-x-3">
                            <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                            <span className="text-destructive">{errors.general}</span>
                        </div>
                    )}

                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Step 1: Business Details */}
                        {currentStep === 1 && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-medium mb-4">Business Details</h2>

                                <div className="space-y-2">
                                    <Label>Business Type *</Label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {["individual", "company", "partnership"].map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, business_type: type }))}
                                                className={cn(
                                                    "px-4 py-2 rounded-xl border capitalize transition-colors",
                                                    formData.business_type === type
                                                        ? "bg-primary text-primary-foreground border-primary"
                                                        : "bg-background border-border hover:border-primary"
                                                )}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                    {errors.business_type && (
                                        <p className="text-sm text-destructive">{errors.business_type}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label>GSTIN (Optional)</Label>
                                    <Input
                                        name="gstin"
                                        value={formData.gstin}
                                        onChange={handleInputChange}
                                        placeholder="22AAAAA0000A1Z5"
                                        maxLength={15}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>PAN Number *</Label>
                                    <Input
                                        name="pan_number"
                                        value={formData.pan_number}
                                        onChange={handleInputChange}
                                        placeholder="ABCDE1234F"
                                        maxLength={10}
                                        className={errors.pan_number ? "border-destructive" : ""}
                                    />
                                    {errors.pan_number && (
                                        <p className="text-sm text-destructive">{errors.pan_number}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 2: Contact Details */}
                        {currentStep === 2 && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-medium mb-4">Contact Information</h2>

                                <div className="space-y-2">
                                    <Label>Contact Name *</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <Input
                                            name="contact_name"
                                            value={formData.contact_name}
                                            onChange={handleInputChange}
                                            className={cn("pl-10", errors.contact_name ? "border-destructive" : "")}
                                            placeholder="Full name"
                                        />
                                    </div>
                                    {errors.contact_name && (
                                        <p className="text-sm text-destructive">{errors.contact_name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label>Phone Number *</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <Input
                                            name="contact_phone"
                                            value={formData.contact_phone}
                                            onChange={handleInputChange}
                                            className={cn("pl-10", errors.contact_phone ? "border-destructive" : "")}
                                            placeholder="+91 98765 43210"
                                            maxLength={15}
                                        />
                                    </div>
                                    {errors.contact_phone && (
                                        <p className="text-sm text-destructive">{errors.contact_phone}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label>Email Address *</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <Input
                                            type="email"
                                            name="contact_email"
                                            value={formData.contact_email}
                                            onChange={handleInputChange}
                                            className={cn("pl-10", errors.contact_email ? "border-destructive" : "")}
                                            placeholder="contact@brand.com"
                                        />
                                    </div>
                                    {errors.contact_email && (
                                        <p className="text-sm text-destructive">{errors.contact_email}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Address */}
                        {currentStep === 3 && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-medium mb-4">Business Address</h2>

                                <div className="space-y-2">
                                    <Label>Address Line 1 *</Label>
                                    <Input
                                        name="address_line1"
                                        value={formData.address_line1}
                                        onChange={handleInputChange}
                                        className={errors.address_line1 ? "border-destructive" : ""}
                                        placeholder="Street address"
                                    />
                                    {errors.address_line1 && (
                                        <p className="text-sm text-destructive">{errors.address_line1}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label>Address Line 2 (Optional)</Label>
                                    <Input
                                        name="address_line2"
                                        value={formData.address_line2}
                                        onChange={handleInputChange}
                                        placeholder="Apartment, suite, etc."
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>City *</Label>
                                        <Input
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className={errors.city ? "border-destructive" : ""}
                                            placeholder="City"
                                        />
                                        {errors.city && (
                                            <p className="text-sm text-destructive">{errors.city}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label>State *</Label>
                                        <Input
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            className={errors.state ? "border-destructive" : ""}
                                            placeholder="State"
                                        />
                                        {errors.state && (
                                            <p className="text-sm text-destructive">{errors.state}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Pincode *</Label>
                                    <Input
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleInputChange}
                                        className={errors.pincode ? "border-destructive" : ""}
                                        placeholder="110001"
                                        maxLength={10}
                                    />
                                    {errors.pincode && (
                                        <p className="text-sm text-destructive">{errors.pincode}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 4: Bank & Social (Optional) */}
                        {currentStep === 4 && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-medium mb-2">Bank Details</h2>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Optional - You can add these later from settings
                                    </p>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Bank Name</Label>
                                                <Input
                                                    name="bank_name"
                                                    value={formData.bank_name}
                                                    onChange={handleInputChange}
                                                    placeholder="HDFC Bank"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Account Holder Name</Label>
                                                <Input
                                                    name="account_holder_name"
                                                    value={formData.account_holder_name}
                                                    onChange={handleInputChange}
                                                    placeholder="Name as per bank"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Account Number</Label>
                                                <Input
                                                    name="account_number"
                                                    value={formData.account_number}
                                                    onChange={handleInputChange}
                                                    placeholder="Account number"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label>IFSC Code</Label>
                                                <Input
                                                    name="ifsc_code"
                                                    value={formData.ifsc_code}
                                                    onChange={handleInputChange}
                                                    placeholder="HDFC0001234"
                                                    maxLength={11}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium mb-4">Online Presence</h3>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Website URL</Label>
                                            <div className="relative">
                                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                                <Input
                                                    name="website_url"
                                                    value={formData.website_url}
                                                    onChange={handleInputChange}
                                                    className="pl-10"
                                                    placeholder="https://yourbrand.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Instagram Handle</Label>
                                            <div className="relative">
                                                <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                                <Input
                                                    name="instagram_handle"
                                                    value={formData.instagram_handle}
                                                    onChange={handleInputChange}
                                                    className="pl-10"
                                                    placeholder="@yourbrand"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 5: Documents */}
                        {currentStep === 5 && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-medium mb-2">Upload Documents</h2>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Please upload at least one document with address proof (Aadhar, Passport, etc.)
                                </p>

                                <div className="space-y-2">
                                    <Label>Documents *</Label>
                                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                                        <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Click to upload or drag and drop
                                        </p>
                                        <p className="text-xs text-muted-foreground mb-4">
                                            PDF, JPG, PNG up to 10MB
                                        </p>
                                        <input
                                            type="file"
                                            multiple
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            id="file-upload"
                                        />
                                        <Label
                                            htmlFor="file-upload"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl cursor-pointer hover:opacity-90"
                                        >
                                            <Upload className="w-4 h-4" />
                                            Choose Files
                                        </Label>
                                    </div>

                                    {formData.documents.length > 0 && (
                                        <div className="mt-4 space-y-2">
                                            {formData.documents.map((file, index) => (
                                                <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                                                    <FileText className="w-4 h-4 text-muted-foreground" />
                                                    <span className="text-sm flex-1 truncate">{file.name}</span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {errors.documents && (
                                        <p className="text-sm text-destructive">{errors.documents}</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-8">
                        <Button
                            variant="outline"
                            onClick={handlePrevious}
                            disabled={currentStep === 1}
                            className="gap-2"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Previous
                        </Button>

                        {currentStep === 5 ? (
                            <Button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        Submit Verification
                                        <CheckCircle className="w-4 h-4" />
                                    </>
                                )}
                            </Button>
                        ) : (
                            <Button
                                onClick={handleNext}
                                className="gap-2"
                            >
                                Next
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}