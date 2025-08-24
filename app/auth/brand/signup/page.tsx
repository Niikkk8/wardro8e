"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setPendingSignup } from "@/store/authSlice";
import { validateSignupForm, type SignupForm } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Mail, Building2, FileText, CheckCircle, AlertCircle, ArrowLeft, 
  Loader2, RotateCcw, Eye, EyeOff
} from "lucide-react";

type Step = "form" | "otp" | "success";

export default function BrandSignupPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { pendingSignup } = useAppSelector((state: any) => state.auth);

  const [step, setStep] = useState<Step>("form");
  const [formData, setFormData] = useState<SignupForm>({
    brandName: "",
    brandLegalName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Simple OTP state - just a single input
  const [otp, setOTP] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isResending, setIsResending] = useState(false);

  // Memoized function to prevent infinite re-renders
  const isOTPExpired = React.useCallback(() => {
    if (!pendingSignup) return true;
    return pendingSignup.expiresAt <= Date.now();
  }, [pendingSignup]);

  // Check for authenticated user and redirect
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/dashboard');
      }
    };
    checkAuth();
  }, [router]);

  // Restore pending signup if available - run only when pendingSignup changes
  useEffect(() => {
    if (pendingSignup && !isOTPExpired()) {
      setFormData({
        brandName: pendingSignup.brandName,
        brandLegalName: pendingSignup.brandLegalName,
        email: pendingSignup.email,
        password: pendingSignup.password,
        confirmPassword: pendingSignup.password,
        agreeToTerms: true,
      });
      setStep("otp");
    }
  }, [pendingSignup]); // Remove isOTPExpired from dependencies since it's now stable

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const startSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateSignupForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch('/api/auth/brand/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName: formData.brandName.trim(),
          brandLegalName: formData.brandLegalName.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to send OTP' }));
        throw new Error(errorData.message);
      }

      const data = await response.json();
      
      // Store signup data for OTP verification
      dispatch(setPendingSignup({
        brandName: formData.brandName.trim(),
        brandLegalName: formData.brandLegalName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        otp: data.otp,
        expiresAt: data.expiresAt,
      }));

      setStep("otp");
    } catch (err: unknown) {
      setErrors({ general: err instanceof Error ? err.message : "Failed to send verification code" });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!otp.trim() || otp.length !== 6) {
      setOtpError("Enter the 6-digit code");
      return;
    }

    if (!pendingSignup) {
      setOtpError("No pending signup found. Please restart the signup process.");
      return;
    }

    if (isOTPExpired()) {
      setOtpError("Your verification code has expired. Please restart the signup process.");
      dispatch(setPendingSignup(null));
      setStep("form");
      return;
    }

    setIsLoading(true);
    setOtpError("");

    try {
      const response = await fetch('/api/auth/brand/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: pendingSignup.email,
          otp: otp.trim(),
          brandName: pendingSignup.brandName,
          brandLegalName: pendingSignup.brandLegalName,
          password: pendingSignup.password,
          storedOtp: pendingSignup.otp,
          expiresAt: pendingSignup.expiresAt
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Verification failed' }));
        throw new Error(errorData.message);
      }

      // Clear pending signup after successful verification
      dispatch(setPendingSignup(null));
      setStep("success");
    } catch (err: unknown) {
      setOtpError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    if (!pendingSignup) return;

    setIsResending(true);
    setOtpError("");

    try {
      const response = await fetch('/api/auth/brand/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName: pendingSignup.brandName,
          brandLegalName: pendingSignup.brandLegalName,
          email: pendingSignup.email,
          password: pendingSignup.password,
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to resend code' }));
        throw new Error(errorData.message);
      }

      const data = await response.json();
      
      // Update pending signup with new OTP
      dispatch(setPendingSignup({
        ...pendingSignup,
        otp: data.otp,
        expiresAt: data.expiresAt,
      }));

      setOTP(""); // Clear the input
    } catch (err: unknown) {
      setOtpError(err instanceof Error ? err.message : "Failed to resend code");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="pt-24 pb-10 min-h-screen bg-gradient-to-br from-primary/10 to-primary/5">
      <div className="container max-w-xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/auth" className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Auth</span>
          </Link>

          <div className="bg-card p-8 rounded-3xl border border-border">
            {step === "form" && (
              <>
                <div className="text-center mb-6">
                  <h1 className="text-3xl font-serif font-light mb-2">
                    Create Your <span className="text-primary">Brand Account</span>
                  </h1>
                  <p className="text-muted-foreground">Quick signup with email verification</p>
                </div>

                {errors.general && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 mb-6 flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                    <span className="text-destructive">{errors.general}</span>
                  </div>
                )}

                <form onSubmit={startSignup} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Brand Name *</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          name="brandName"
                          value={formData.brandName}
                          onChange={handleChange}
                          className={`pl-10 ${errors.brandName ? "border-destructive" : ""}`}
                          placeholder="Brand name"
                        />
                      </div>
                      {errors.brandName && <p className="text-sm text-destructive">{errors.brandName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label>Legal Business Name *</Label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          name="brandLegalName"
                          value={formData.brandLegalName}
                          onChange={handleChange}
                          className={`pl-10 ${errors.brandLegalName ? "border-destructive" : ""}`}
                          placeholder="Legal name"
                        />
                      </div>
                      {errors.brandLegalName && <p className="text-sm text-destructive">{errors.brandLegalName}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Work Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                        placeholder="Email"
                      />
                    </div>
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Password *</Label>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className={`pr-10 ${errors.password ? "border-destructive" : ""}`}
                          placeholder="Password"
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowPassword(!showPassword)} 
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label>Confirm Password *</Label>
                      <div className="relative">
                        <Input
                          type={showConfirm ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className={`pr-10 ${errors.confirmPassword ? "border-destructive" : ""}`}
                          placeholder="Confirm"
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowConfirm(!showConfirm)} 
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        >
                          {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 text-primary border-border rounded"
                    />
                    <label htmlFor="agreeToTerms" className="text-sm text-muted-foreground">
                      I agree to the <Link href="/terms" className="text-primary hover:underline">Terms</Link> and{' '}
                      <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                    </label>
                  </div>
                  {errors.agreeToTerms && <p className="text-sm text-destructive">{errors.agreeToTerms}</p>}

                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Sending Code...
                      </>
                    ) : (
                      "Continue"
                    )}
                  </Button>
                </form>

                <div className="text-center mt-6 pt-6 border-t border-border">
                  <p className="text-muted-foreground">
                    Already have an account?{' '}
                    <Link href="/auth/brand/login" className="text-primary hover:underline font-medium">
                      Sign in
                    </Link>
                  </p>
                </div>
              </>
            )}

            {step === "otp" && (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-serif font-light mb-2">Verify Your Email</h2>
                  <p className="text-muted-foreground">
                    Enter the 6-digit code sent to <span className="font-medium text-foreground">{formData.email}</span>
                  </p>
                </div>

                {otpError && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 mb-6 flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                    <span className="text-destructive">{otpError}</span>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <Label>Verification Code</Label>
                    <Input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setOTP(value);
                        if (otpError) setOtpError('');
                      }}
                      className="text-center text-lg font-mono tracking-widest"
                      placeholder="123456"
                    />
                  </div>

                  <Button 
                    onClick={verifyOTP} 
                    disabled={isLoading || otp.length !== 6} 
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Verifying...
                      </>
                    ) : (
                      "Verify & Create Account"
                    )}
                  </Button>

                  <Button 
                    onClick={resendOTP} 
                    disabled={isResending} 
                    variant="outline" 
                    className="w-full"
                  >
                    {isResending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <RotateCcw className="w-5 h-5 mr-2" />
                        Resend Code
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}

            {step === "success" && (
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-medium mb-2">You&apos;re all set!</h2>
                <p className="text-muted-foreground mb-6">
                  Your brand account has been created. Verification status is pending approval.
                </p>
                <Link 
                  href="/dashboard" 
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors inline-block"
                >
                  Go to Dashboard
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}