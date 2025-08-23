"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { UserPlus, LogIn, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) return;
      if (data.session) router.replace("/dashboard");
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) router.replace("/dashboard");
    });
    return () => {
      isMounted = false;
      sub.subscription.unsubscribe();
    };
  }, [router]);
  return (
    <div className="pt-32 pb-16 min-h-screen bg-gradient-to-br from-primary/10 to-primary/5">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto text-center"
        >
          {/* Hero Section */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-primary/10 px-6 py-3 rounded-full text-primary font-medium mb-8"
            >
              <Sparkles className="w-5 h-5" />
              <span>Brand Authentication</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-serif font-light mb-8">
              Join the{" "}
              <span className="text-primary">Wardro8e</span>{" "}
              Ecosystem
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mb-12">
              Connect with style-conscious shoppers through our AI-powered fashion discovery platform. 
              Showcase your unique collections to the right audience.
            </p>
          </div>

          {/* Auth Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Signup Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group"
            >
              <Link href="/auth/brand/signup">
                <div className="bg-card p-4 rounded-3xl border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300 h-full">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-2xl font-medium mb-4">Create Account</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Register your brand and start reaching fashion-forward customers today.
                  </p>
                  
                  <div className="text-primary font-medium flex items-center justify-center space-x-2 group-hover:translate-x-1 transition-transform">
                    <span>Get Started</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Login Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="group"
            >
              <Link href="/auth/brand/login">
                <div className="bg-card p-4 rounded-3xl border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300 h-full">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                    <LogIn className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-2xl font-medium mb-4">Sign In</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Access your brand dashboard and manage your fashion collections.
                  </p>
                  
                  <div className="text-primary font-medium flex items-center justify-center space-x-2 group-hover:translate-x-1 transition-transform">
                    <span>Continue</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 p-8 bg-muted/30 rounded-3xl max-w-5xl mx-auto"
          >
            <h4 className="text-2xl font-medium mb-8">Why Partner with Wardro8e?</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-lg text-muted-foreground">
              <div>
                <div className="font-medium text-foreground mb-2">AI-Powered Matching</div>
                <div>Connect with customers who love your style</div>
              </div>
              <div>
                <div className="font-medium text-foreground mb-2">Global Reach</div>
                <div>Showcase to fashion lovers worldwide</div>
              </div>
              <div>
                <div className="font-medium text-foreground mb-2">Easy Management</div>
                <div>Intuitive dashboard for brand control</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
