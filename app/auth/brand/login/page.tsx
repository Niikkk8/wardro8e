"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/store/hooks";
import { login } from "@/store/authActions";
import { validateEmail } from "@/lib/validators";

export default function BrandLoginPage() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!validateEmail(email)) {
      setError("Enter a valid email");
      return;
    }
    
    if (!password) {
      setError("Enter your password");
      return;
    }

    setIsLoading(true);
    
    try {
      await dispatch(login(email.trim().toLowerCase(), password));
      // Note: Redirection is now handled by AuthRedirect component
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Note: Redirection is now handled by AuthRedirect component

  return (
    <div className="pt-24 md:pt-28 pb-10 md:pb-14 min-h-screen bg-gradient-to-br from-primary/10 to-primary/5">
      <div className="container max-w-md md:max-w-lg mx-auto">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/auth" className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors mb-5 md:mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Auth</span>
          </Link>

          <div className="bg-card p-6 md:p-8 rounded-3xl border border-border">
            <div className="text-center mb-5 md:mb-6">
              <h1 className="text-2xl md:text-3xl font-serif font-light mb-1">Welcome Back</h1>
              <p className="text-sm md:text-base text-muted-foreground">Sign in to your brand account</p>
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-3 mb-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                <span className="text-destructive text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              <div className="space-y-1">
                <Label className="text-[13px] md:text-sm">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" placeholder="Email" required />
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-[13px] md:text-sm">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input type={show ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10" placeholder="Password" required />
                  <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
                </div>
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">{isLoading ? (<><Loader2 className="w-5 h-5 animate-spin" /><span className="ml-2">Signing in...</span></>) : ("Sign In")}</Button>
            </form>

            <div className="text-center mt-6 pt-5 border-t border-border">
              <p className="text-muted-foreground">New to Wardro8e? <Link href="/auth/brand/signup" className="text-primary hover:underline font-medium">Create account</Link></p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
