"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Mail,
  Building2,
  FileText,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Loader2,
  RotateCcw,
  Eye,
  EyeOff
} from "lucide-react";

type Step = "form" | "otp" | "success";

interface FormData {
  brandName: string;
  brandLegalName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  brandName?: string;
  brandLegalName?: string;
  email?: string;
  agreeToTerms?: string;
  general?: string;
}

export default function BrandSignupPage() {
  const [step, setStep] = useState<Step>("form");
  const [formData, setFormData] = useState<FormData>({
    brandName: "",
    brandLegalName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // OTP state
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateEmail = (email: string) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
  const validatePassword = (password: string) => {
    const errs: string[] = [];
    if (password.length < 8) errs.push("At least 8 characters");
    if (!/(?=.*[a-z])/.test(password)) errs.push("One lowercase letter");
    if (!/(?=.*[A-Z])/.test(password)) errs.push("One uppercase letter");
    if (!/(?=.*\d)/.test(password)) errs.push("One number");
    if (!/(?=.*[@$!%*?&])/.test(password)) errs.push("One special char");
    return { valid: errs.length === 0, errs };
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.brandName.trim()) newErrors.brandName = "Brand name is required";
    if (!formData.brandLegalName.trim()) newErrors.brandLegalName = "Legal business name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email)) newErrors.email = "Enter a valid email";
    const pass = validatePassword(formData.password);
    if (!pass.valid) newErrors.general = `Password needs: ${pass.errs.join(', ')}`;
    if (!formData.confirmPassword) newErrors.general = (newErrors.general ? newErrors.general + "; " : "") + "Confirm your password";
    else if (formData.confirmPassword !== formData.password) newErrors.general = (newErrors.general ? newErrors.general + "; " : "") + "Passwords do not match";
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const startSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setErrors({});
    try {
      const res = await fetch('/api/auth/brand/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName: formData.brandName.trim(),
          brandLegalName: formData.brandLegalName.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        })
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.message || 'Failed to send OTP');
      }
      setStep("otp");
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } catch (err: unknown) {
      setErrors({ general: err instanceof Error ? err.message : "Failed to send verification code" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPChange = (index: number, value: string) => {
    // Allow full paste or single-digit entry
    const digits = value.replace(/\D/g, '').split('');
    const next = [...otp];
    if (digits.length > 1) {
      for (let i = 0; i < digits.length && index + i < 6; i++) {
        next[index + i] = digits[i];
      }
    } else if (digits.length === 1) {
      next[index] = digits[0];
    } else {
      next[index] = '';
    }
    setOTP(next);
    if (otpError) setOtpError('');

    // Move focus forward to the first empty slot after current
    const firstEmpty = next.findIndex((d, i) => i > index && d === '');
    if (firstEmpty !== -1) inputRefs.current[firstEmpty]?.focus();
    else if (index < 5 && next[index] !== '') inputRefs.current[index + 1]?.focus();
  };

  const handleOTPKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) inputRefs.current[index - 1]?.focus();
    if (e.key === 'ArrowRight' && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const onVerify = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      setOtpError("Enter the 6-digit code");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/brand/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email.trim().toLowerCase(), otp: code })
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.message || 'Verification failed');
      }

      setStep("success");
    } catch (err: unknown) {
      setOtpError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const onResend = async () => {
    if (isResending) return;
    setIsResending(true);
    try {
      const res = await fetch('/api/auth/brand/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName: formData.brandName.trim(),
          brandLegalName: formData.brandLegalName.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        })
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.message || 'Failed to resend code');
      }
    } catch (err: unknown) {
      setOtpError(err instanceof Error ? err.message : "Failed to resend code");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="pt-24 md:pt-28 pb-10 md:pb-14 min-h-screen bg-gradient-to-br from-primary/10 to-primary/5">
      <div className="container max-w-xl md:max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/auth" className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors mb-5 md:mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Auth</span>
          </Link>

          <div className="bg-card p-6 md:p-8 rounded-3xl border border-border">
            {step === "form" && (
              <>
                <div className="text-center mb-5 md:mb-6">
                  <h1 className="text-2xl md:text-3xl font-serif font-light mb-1">Create Your <span className="text-primary block">Brand Account</span></h1>
                  <p className="text-sm md:text-base text-muted-foreground">Quick signup with email verification</p>
                </div>

                {errors.general && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-3 mb-4 flex items-start space-x-3 text-sm">
                    <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                    <span className="text-destructive text-sm">{errors.general}</span>
                  </div>
                )}

                <form onSubmit={startSignup} className="space-y-3 md:space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-4">
                    <div className="space-y-1">
                      <Label>Brand Name *</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="text"
                          name="brandName"
                          value={formData.brandName}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-3 py-1.5 md:py-2.5 rounded-xl border ${errors.brandName ? "border-destructive" : "border-border"} bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary`}
                          placeholder="Brand name"
                          required
                        />
                      </div>
                      {errors.brandName && <p className="text-sm text-destructive">{errors.brandName}</p>}
                    </div>
                    <div className="space-y-1">
                      <Label>Legal Business Name *</Label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="text"
                          name="brandLegalName"
                          value={formData.brandLegalName}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-3 py-1.5 md:py-2.5 rounded-xl border ${errors.brandLegalName ? "border-destructive" : "border-border"} bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary`}
                          placeholder="Legal name"
                          required
                        />
                      </div>
                      {errors.brandLegalName && <p className="text-sm text-destructive">{errors.brandLegalName}</p>}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label>Work Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-1.5 md:py-2.5 rounded-xl border ${errors.email ? "border-destructive" : "border-border"} bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary`}
                        placeholder="Email"
                        required
                      />
                    </div>
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-4">
                    <div className="space-y-1">
                      <Label>Password *</Label>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className={`w-full pr-10 pl-3 py-1.5 md:py-2.5 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary`}
                          placeholder="Password"
                          required
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label>Confirm Password *</Label>
                      <div className="relative">
                        <Input
                          type={showConfirm ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className={`w-full pr-10 pl-3 py-1.5 md:py-2.5 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary`}
                          placeholder="Confirm"
                          required
                        />
                        <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary/20"
                      required
                    />
                    <label htmlFor="agreeToTerms" className="text-sm text-muted-foreground">
                      I agree to the <Link href="/terms" className="text-primary hover:underline">Terms</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                    </label>
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (<><Loader2 className="w-5 h-5 animate-spin" /><span className="ml-2">Sending Code...</span></>) : ("Continue")}
                  </Button>
                </form>

                <div className="text-center mt-6 pt-5 border-t border-border">
                  <p className="text-muted-foreground">Already have an account? <Link href="/auth/brand/login" className="text-primary hover:underline font-medium">Sign in</Link></p>
                </div>
              </>
            )}

            {step === "otp" && (
              <>
                <div className="text-center mb-5 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-serif font-light mb-1">Verify Your Email</h2>
                  <p className="text-sm md:text-base text-muted-foreground">Enter the 6-digit code sent to <span className="font-medium text-foreground">{formData.email}</span></p>
                </div>

                {otpError && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-3 mb-4 flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                    <span className="text-destructive text-sm">{otpError}</span>
                  </div>
                )}

                <div className="flex justify-center gap-2 mb-4 md:mb-5" onPaste={(e) => {
                  e.preventDefault();
                  const text = e.clipboardData.getData('text');
                  handleOTPChange(0, text);
                }}>
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => { inputRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOTPChange(i, e.target.value)}
                      onKeyDown={(e) => handleOTPKeyDown(i, e)}
                      className="w-10 h-10 md:w-12 md:h-12 text-center text-lg font-medium border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  ))}
                </div>

                <Button onClick={onVerify} disabled={isLoading || otp.join("").length !== 6} className="w-full">
                  {isLoading ? (<><Loader2 className="w-5 h-5 animate-spin" /><span className="ml-2">Verifying...</span></>) : ("Verify & Create Account")}
                </Button>

                <Button onClick={onResend} disabled={isResending} variant="outline" className="mt-3 w-full">
                  {isResending ? (<><Loader2 className="w-5 h-5 animate-spin" /><span className="ml-2">Sending...</span></>) : (<><RotateCcw className="w-5 h-5" /><span className="ml-2">Resend Code</span></>)}
                </Button>
              </>
            )}

            {step === "success" && (
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-medium mb-2">You&apos;re all set!</h2>
                <p className="text-muted-foreground mb-6">Your brand account has been created. Verification status is pending approval.</p>
                <Link href="/dashboard" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-medium hover:bg-primary/90 transition-colors inline-block">Go to Dashboard</Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
