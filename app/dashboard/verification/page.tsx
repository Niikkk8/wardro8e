"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
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
    Loader2,
    Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/components/ui/cn";
import { supabase } from "@/lib/supabase";
import { generateBrandPartnershipContract, type ContractData } from "@/lib/contract-generator";
import Link from "next/link";

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

    // Address Proof Documents
    address_proof_documents: File[];
    
    // Contract Documents
    contract_document_action: string; // 'e_sign' | 'manual_sign'
    contract_documents: File[];
    esign_contract_document: File | null;
};

const businessTypes = [
    { value: "", label: "Select your business type", disabled: true },
    { value: "independent_freelancer", label: "Independent Freelancer", disabled: false },
    { value: "sole_proprietorship", label: "Sole Proprietorship", disabled: false },
    { value: "partnership", label: "Partnership", disabled: false },
    { value: "llp", label: "Limited Liability Partnership (LLP)", disabled: false },
    { value: "private_limited", label: "Private Limited Company", disabled: false },
];

const steps = [
    { id: 1, title: "Business Details", icon: Building2 },
    { id: 2, title: "Contact Info", icon: User },
    { id: 3, title: "Address", icon: MapPin },
    { id: 4, title: "Bank & Social", icon: CreditCard },
    { id: 5, title: "Documents", icon: Upload },
];

// Local storage key for verification form data
const VERIFICATION_FORM_STORAGE_KEY = 'wardro8e_verification_form';

// Helper function to save form data to localStorage (excluding files)
const saveFormDataToLocalStorage = (data: FormData) => {
    try {
        // Create a copy without file objects (can't be serialized)
        const dataToSave = {
            ...data,
            address_proof_documents: [], // Files can't be stored in localStorage
            contract_documents: [], // Files can't be stored in localStorage
            esign_contract_document: null, // Files can't be stored in localStorage
        };
        localStorage.setItem(VERIFICATION_FORM_STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
        console.error('Error saving form data to localStorage:', error);
    }
};

// Helper function to load form data from localStorage
const loadFormDataFromLocalStorage = (): Partial<FormData> | null => {
    try {
        const savedData = localStorage.getItem(VERIFICATION_FORM_STORAGE_KEY);
        if (savedData) {
            return JSON.parse(savedData);
        }
    } catch (error) {
        console.error('Error loading form data from localStorage:', error);
    }
    return null;
};

// Helper function to clear form data from localStorage
const clearFormDataFromLocalStorage = () => {
    try {
        localStorage.removeItem(VERIFICATION_FORM_STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing form data from localStorage:', error);
    }
};

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
        address_proof_documents: [],
        contract_document_action: "",
        contract_documents: [],
        esign_contract_document: null,
    });
    
    // Debounced save function to prevent excessive localStorage writes
    const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const debouncedSaveToLocalStorage = useCallback((data: FormData) => {
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }
        setIsSaving(true);
        saveTimeoutRef.current = setTimeout(() => {
            saveFormDataToLocalStorage(data);
            setIsSaving(false);
        }, 500); // 500ms debounce delay
    }, []);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingStatus, setIsCheckingStatus] = useState(true);
    const [verificationStatus, setVerificationStatus] = useState<string | null>(null);
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
    const [userIP, setUserIP] = useState<string>("");
    const [isGeneratingContract, setIsGeneratingContract] = useState(false);
    const [userBrandName, setUserBrandName] = useState<string>("");
    const [isSaving, setIsSaving] = useState(false);

    // Load saved form data from localStorage on component mount
    useEffect(() => {
        const savedFormData = loadFormDataFromLocalStorage();
        if (savedFormData) {
            setFormData(prev => ({
                ...prev,
                ...savedFormData,
                // Keep file arrays empty as they can't be stored in localStorage
                address_proof_documents: [],
                contract_documents: [],
                esign_contract_document: null,
            }));
        }
    }, []);

    useEffect(() => {
        checkVerificationStatus();
        fetchUserIP();
        fetchUserBrandName();
    }, []);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
        };
    }, []);

    const fetchUserBrandName = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user?.user_metadata?.brand_name) {
                setUserBrandName(session.user.user_metadata.brand_name);
            }
        } catch (error) {
            console.error('Error fetching brand name:', error);
        }
    };

    const fetchUserIP = async () => {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            setUserIP(data.ip);
        } catch (error) {
            console.error('Error fetching IP:', error);
        }
    };

    const checkVerificationStatus = async () => {
        try {
            const { data: sessionRes } = await supabase.auth.getSession();
            const token = sessionRes.session?.access_token;
            
            console.log('Verification page: Checking status', { 
                hasSession: !!sessionRes.session, 
                hasToken: !!token,
                userId: sessionRes.session?.user?.id 
            });

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
                        address_proof_documents: [],
                        contract_documents: [],
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
        const updatedFormData = { ...formData, [name]: value };
        setFormData(updatedFormData);

        // Debounced save to localStorage after updating form data
        debouncedSaveToLocalStorage(updatedFormData);

        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const handleAddressProofFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setFormData(prev => ({
                ...prev,
                address_proof_documents: Array.from(files),
            }));
        }
    };

    const handleContractFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setFormData(prev => ({
                ...prev,
                contract_documents: Array.from(files),
            }));
        }
    };

    const handleEsignContractFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        setFormData(prev => ({
            ...prev,
            esign_contract_document: files && files.length > 0 ? files[0] : null,
        }));
    };

    const validateStep = (step: Step): boolean => {
        const newErrors: Record<string, string> = {};

        switch (step) {
            case 1:
                if (!formData.business_type) newErrors.business_type = "Business type is required";
                if (!formData.gstin) newErrors.gstin = "GSTIN is required";
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
                if (formData.address_proof_documents.length === 0) newErrors.address_proof_documents = "At least one address proof document is required";
                if (!formData.contract_document_action) newErrors.contract_document_action = "Please select how you want to handle the contract";
                if (formData.contract_document_action === 'manual_sign' && formData.contract_documents.length === 0) {
                    newErrors.contract_documents = "Please upload the signed contract documents";
                }
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCompletedSteps(prev => new Set([...prev, currentStep]));
            if (currentStep < 5) {
                setCurrentStep((currentStep + 1) as Step);
            }
        }
    };

    const handleStepClick = (stepId: Step) => {
        // Only allow clicking on current step, previous steps, or next step if current is completed
        if (stepId <= currentStep || (stepId === currentStep + 1 && completedSteps.has(currentStep))) {
            setCurrentStep(stepId);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep((currentStep - 1) as Step);
        }
    };

    const handleDownloadContract = async () => {
        setIsGeneratingContract(true);
        
        try {
            const contractData: ContractData = {
                brand_name: userBrandName || formData.contact_name, // Use actual brand name from auth
                contact_name: formData.contact_name,
                contact_email: formData.contact_email,
                contact_phone: formData.contact_phone,
                address_line1: formData.address_line1,
                address_line2: formData.address_line2,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode,
                business_type: formData.business_type,
                gstin: formData.gstin,
                pan_number: formData.pan_number,
            };

            const doc = generateBrandPartnershipContract(contractData);
            const fileName = `Wardro8e_Partnership_Agreement_${(contractData.brand_name || contractData.contact_name).replace(/\s+/g, '_')}.pdf`;
            doc.save(fileName);
        } catch (error) {
            console.error("Error generating contract:", error);
            setErrors({ general: "Failed to generate contract. Please try again." });
        } finally {
            setIsGeneratingContract(false);
        }
    };

    const handleSubmit = async () => {
        if (!validateStep(5)) return;

        setIsLoading(true);

        try {
            const { data: sessionRes } = await supabase.auth.getSession();
            const token = sessionRes.session?.access_token;
            
            console.log('Verification page: Submitting form', { 
                hasSession: !!sessionRes.session, 
                hasToken: !!token,
                userId: sessionRes.session?.user?.id 
            });

            // Create FormData for file upload
            const submitData = new FormData();

            // Add all form fields
            Object.entries(formData).forEach(([key, value]) => {
                if (key !== 'address_proof_documents' && key !== 'contract_documents' && value) {
                    submitData.append(key, value as string);
                }
            });

            // Add IP address
            if (userIP) {
                submitData.append('user_ip', userIP);
            }

            // Add address proof documents
            formData.address_proof_documents.forEach((file) => {
                submitData.append('address_proof_documents', file);
            });

            // Add contract documents if manual signing is chosen
            if (formData.contract_document_action === 'manual_sign') {
                formData.contract_documents.forEach((file) => {
                    submitData.append('contract_documents', file);
                });
            }

            // If e-sign selected but user already has a signed PDF, allow upload
            if (formData.contract_document_action === 'e_sign' && formData.esign_contract_document) {
                submitData.append('esign_contract_document', formData.esign_contract_document);
            }

            const res = await fetch("/api/brand/verification", {
                method: "POST",
                headers: token ? { Authorization: `Bearer ${token}` } : undefined,
                credentials: "include",
                body: submitData,
            });

            if (res.ok) {
                const data = await res.json();
                setVerificationStatus(data.status ?? 'under_review');
                
                // Clear localStorage on successful submission
                clearFormDataFromLocalStorage();
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
            <div className="h-full flex items-center justify-center p-6 md:p-8">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-medium mb-2">Verification Approved!</h2>
                        <p className="text-muted-foreground mb-6">
                            Congratulations! Your brand has been verified successfully.
                        </p>
                        <div className="flex gap-3 justify-center">
                            <Link href="/dashboard/products">
                                <Button>Start Adding Products</Button>
                            </Link>
                            <Link href="/dashboard/overview">
                                <Button variant="outline">Go to Dashboard</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (verificationStatus === 'under_review') {
        return (
            <div className="h-full flex items-center justify-center p-6 md:p-8">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 text-center">
                        <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-medium mb-2">Under Review</h2>
                        <p className="text-muted-foreground mb-4">
                            Your verification is being reviewed. We&apos;ll notify you once it&apos;s complete.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Review typically takes 2-3 business days.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (verificationStatus === 'awaiting_esign') {
    return (
            <div className="h-full flex items-center justify-center p-6 md:p-8">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
                        <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-medium mb-2">Awaiting E-Signature</h2>
                        <p className="text-muted-foreground mb-4">
                            We&apos;ve received your documents. Please check your email for the e-signature link.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            The e-signature link will be sent within 24 hours.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (verificationStatus === 'rejected') {
        return (
            <div className="h-full flex items-center justify-center p-6 md:p-8">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                        <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-medium mb-2">Verification Rejected</h2>
                        <p className="text-muted-foreground mb-4">
                            Unfortunately, your verification was not approved. Please contact support for more details.
                        </p>
                        <Button variant="outline" onClick={() => setVerificationStatus(null)}>
                            Submit New Application
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full">
            <div className="h-full flex flex-col max-w-4xl mx-auto p-6 md:p-8">
                <div className="flex-shrink-0 mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl md:text-4xl mb-2">Brand Verification</h1>
                            <p className="text-muted-foreground">
                                Complete your verification to start selling on Wardro8e
                            </p>
                        </div>
                        {isSaving && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Saving...
                            </div>
                        )}
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-8 flex-shrink-0">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <div
                                className={cn(
                                    "flex flex-col items-center gap-2",
                                    currentStep === step.id ? "text-primary" : "text-muted-foreground",
                                    (step.id <= currentStep || (step.id === currentStep + 1 && completedSteps.has(currentStep))) 
                                        ? "cursor-pointer hover:text-primary" 
                                        : "cursor-not-allowed opacity-50"
                                )}
                                onClick={() => handleStepClick(step.id as Step)}
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
                <div className="flex-1 bg-card border border-border rounded-3xl overflow-hidden flex flex-col min-h-0">
                    <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-8 scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                        <style jsx>{`
                            .scrollbar-hide::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>
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
                                    <select
                                        name="business_type"
                                        value={formData.business_type}
                                        onChange={(e) => {
                                            const updatedFormData = { ...formData, business_type: e.target.value };
                                            setFormData(updatedFormData);
                                            debouncedSaveToLocalStorage(updatedFormData);
                                        }}
                                                className={cn(
                                            "w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground",
                                            "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                                            errors.business_type ? "border-destructive" : "",
                                            !formData.business_type ? "text-muted-foreground" : ""
                                        )}
                                    >
                                        {businessTypes.map((type) => (
                                            <option 
                                                key={type.value} 
                                                value={type.value} 
                                                disabled={type.disabled}
                                                className={type.disabled ? "text-muted-foreground" : "text-foreground"}
                                            >
                                                {type.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.business_type && (
                                        <p className="text-sm text-destructive">{errors.business_type}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label>GSTIN *</Label>
                                    <Input
                                        name="gstin"
                                        value={formData.gstin}
                                        onChange={handleInputChange}
                                        placeholder="22AAAAA0000A1Z5"
                                        maxLength={15}
                                        className={errors.gstin ? "border-destructive" : ""}
                                    />
                                    {errors.gstin && (
                                        <p className="text-sm text-destructive">{errors.gstin}</p>
                                    )}
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
                            <div className="space-y-8">
                                {/* Address Proof Documents */}
                                <div>
                                    <h2 className="text-xl font-medium mb-2">Address Proof Documents</h2>
                                <p className="text-sm text-muted-foreground mb-4">
                                        Upload documents to verify your address and legal name (Aadhar Card, Passport, Driving License, etc.)
                                </p>

                                <div className="space-y-2">
                                        <Label>Address Proof Documents *</Label>
                                        <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                                            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                                            <p className="text-sm text-muted-foreground mb-2">
                                            Click to upload or drag and drop
                                        </p>
                                        <p className="text-xs text-muted-foreground mb-4">
                                                PDF, JPG, PNG up to 10MB each
                                        </p>
                                        <input
                                            type="file"
                                            multiple
                                            accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={handleAddressProofFileChange}
                                            className="hidden"
                                                id="address-proof-upload"
                                        />
                                        <Label
                                                htmlFor="address-proof-upload"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl cursor-pointer hover:opacity-90"
                                        >
                                            <Upload className="w-4 h-4" />
                                                Choose Address Proof Files
                                        </Label>
                                    </div>

                                        {formData.address_proof_documents.length > 0 && (
                                            <div className="mt-4 space-y-2 max-h-32 overflow-y-auto scrollbar-hide">
                                                {formData.address_proof_documents.map((file, index) => (
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

                                        {errors.address_proof_documents && (
                                            <p className="text-sm text-destructive">{errors.address_proof_documents}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Contract Documents Section */}
                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-medium mb-2">Brand Partnership Contract</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Download and sign our partnership agreement to complete your verification.
                                    </p>

                                    <div className="space-y-4">
                                        {/* Download Contract Link */}
                                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                            <div className="flex items-start gap-3">
                                                <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                                                <div className="flex-1">
                                                    <p className="font-medium text-blue-900 mb-1">Partnership Agreement</p>
                                                    <p className="text-sm text-blue-700 mb-3">
                                                        Download your personalized partnership agreement with pre-filled details and choose your signing method below.
                                                    </p>
                                                    <Button
                                                        type="button"
                                                        onClick={handleDownloadContract}
                                                        disabled={isGeneratingContract || !formData.contact_name || !formData.contact_email}
                                                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                                                    >
                                                        {isGeneratingContract ? (
                                                            <>
                                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                                Generating...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Download className="w-4 h-4" />
                                                                Download Contract
                                                            </>
                                                        )}
                                                    </Button>
                                                    {(!formData.contact_name || !formData.contact_email) && (
                                                        <p className="text-xs text-blue-600 mt-2">
                                                            Please complete previous steps to generate your personalized contract
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>How would you like to sign the contract? *</Label>
                                            <div className="space-y-2">
                                                <label className="flex items-center space-x-3 p-3 border border-border rounded-xl cursor-pointer hover:border-primary">
                                                    <input
                                                        type="radio"
                                                        name="contract_document_action"
                                                        value="e_sign"
                                                        checked={formData.contract_document_action === 'e_sign'}
                                                        onChange={(e) => {
                                                            const updatedFormData = { ...formData, contract_document_action: e.target.value };
                                                            setFormData(updatedFormData);
                                                            debouncedSaveToLocalStorage(updatedFormData);
                                                        }}
                                                        className="text-primary focus:ring-primary"
                                                    />
                                                    <div>
                                                        <p className="font-medium">Electronic Signature (Recommended)</p>
                                                        <p className="text-sm text-muted-foreground">We&apos;ll send you a secure link to e-sign the contract</p>
                                                    </div>
                                                </label>
                                                <label className="flex items-center space-x-3 p-3 border border-border rounded-xl cursor-pointer hover:border-primary">
                                                    <input
                                                        type="radio"
                                                        name="contract_document_action"
                                                        value="manual_sign"
                                                        checked={formData.contract_document_action === 'manual_sign'}
                                                        onChange={(e) => {
                                                            const updatedFormData = { ...formData, contract_document_action: e.target.value };
                                                            setFormData(updatedFormData);
                                                            debouncedSaveToLocalStorage(updatedFormData);
                                                        }}
                                                        className="text-primary focus:ring-primary"
                                                    />
                                                    <div>
                                                        <p className="font-medium">Manual Signature</p>
                                                        <p className="text-sm text-muted-foreground">Download, print, sign, scan and upload the contract</p>
                                                    </div>
                                                </label>
                                            </div>
                                            {errors.contract_document_action && (
                                                <p className="text-sm text-destructive">{errors.contract_document_action}</p>
                                            )}
                                        </div>

                                        {formData.contract_document_action === 'e_sign' && (
                                            <div className="space-y-2">
                                                <Label>Upload Signed Contract (Optional)</Label>
                                                <div className="border-2 border-dashed border-border rounded-xl p-4 text-center">
                                                    <FileText className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                                                    <p className="text-sm text-muted-foreground mb-3">
                                                        If you&apos;ve completed e-signing and have the signed PDF, upload it here.
                                                    </p>
                                                    <input
                                                        type="file"
                                                        accept=".pdf"
                                                        onChange={handleEsignContractFileChange}
                                                        className="hidden"
                                                        id="esign-contract-file-upload"
                                                    />
                                                    <Label
                                                        htmlFor="esign-contract-file-upload"
                                                        className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-xl cursor-pointer hover:opacity-90"
                                                    >
                                                        <Upload className="w-4 h-4" />
                                                        Choose Signed Contract (PDF)
                                                    </Label>
                                                </div>

                                                {formData.esign_contract_document && (
                                                    <div className="mt-4 space-y-2">
                                                        <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                                                            <FileText className="w-4 h-4 text-muted-foreground" />
                                                            <span className="text-sm flex-1 truncate">{formData.esign_contract_document.name}</span>
                                                            <span className="text-xs text-muted-foreground">
                                                                {(formData.esign_contract_document.size / 1024 / 1024).toFixed(2)} MB
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {formData.contract_document_action === 'manual_sign' && (
                                            <div className="space-y-2">
                                                <Label>Upload Signed Contract *</Label>
                                                <div className="border-2 border-dashed border-border rounded-xl p-4 text-center">
                                                    <FileText className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                                                    <p className="text-sm text-muted-foreground mb-3">
                                                        Upload your signed contract document
                                                    </p>
                                                    <input
                                                        type="file"
                                                        multiple
                                                        accept=".pdf"
                                                        onChange={handleContractFileChange}
                                                        className="hidden"
                                                        id="contract-file-upload"
                                                    />
                                                    <Label
                                                        htmlFor="contract-file-upload"
                                                        className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-xl cursor-pointer hover:opacity-90"
                                                    >
                                                        <Upload className="w-4 h-4" />
                                                        Choose Signed Contract
                                                    </Label>
                                                </div>

                                                {formData.contract_documents.length > 0 && (
                                        <div className="mt-4 space-y-2">
                                                        {formData.contract_documents.map((file, index) => (
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

                                                {errors.contract_documents && (
                                                    <p className="text-sm text-destructive">{errors.contract_documents}</p>
                                    )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex-shrink-0 flex items-center justify-between p-6 md:p-8 border-t border-border bg-card">
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