"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { UserPlus, LogIn, Sparkles, Building2, User } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) return;
      if (data.session) {
        console.log('Auth page: Found existing session, redirecting to dashboard');
        // Check user role and redirect accordingly
        // This will be handled by the StoreProvider
        router.replace("/dashboard");
      }
    });
    // Remove the auth state change listener to avoid conflicts with StoreProvider
    // The StoreProvider will handle all authentication state changes
    return () => {
      isMounted = false;
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
              <span>Choose Your Experience</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-serif font-light mb-8">
              Join the{" "}
              <span className="text-primary">Wardro8e</span>{" "}
              Community
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mb-12">
              Whether you&apos;re a fashion brand looking to grow or a shopper seeking unique styles, 
              we have the perfect experience for you.
            </p>
          </div>

          {/* User Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {/* Brands */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group"
            >
              <Link href="/auth/brand">
                <div className="bg-card p-6 rounded-3xl border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300 h-full">
                  <div className="bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 mb-6">
                    <Building2 className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-2xl font-medium mb-4">For Brands</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Sell your fashion collections and reach style-conscious customers worldwide.
                  </p>
                  
                  <div className="text-primary font-medium flex items-center justify-center space-x-2 group-hover:translate-x-1 transition-transform">
                    <span>Brand Portal</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Shoppers */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="group"
            >
              <Link href="/for-shoppers">
                <div className="bg-card p-6 rounded-3xl border border-border hover:shadow-xl hover:border-teal-500/30 transition-all duration-300 h-full">
                  <div className="bg-teal-500/10 w-20 h-20 rounded-2xl flex items-center justify-center text-teal-500 group-hover:scale-110 transition-transform duration-300 mb-6">
                    <User className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-2xl font-medium mb-4">For Shoppers</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Discover unique fashion from curated brands and find your perfect style.
                  </p>
                  
                  <div className="text-teal-500 font-medium flex items-center justify-center space-x-2 group-hover:translate-x-1 transition-transform">
                    <span>Start Shopping</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Brand Auth Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h4 className="text-2xl font-medium mb-8">Brand Authentication</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Signup */}
              <Link href="/auth/brand/signup">
                <div className="bg-card p-6 rounded-2xl border border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center text-primary mb-4">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <h5 className="text-xl font-medium mb-2">Create Brand Account</h5>
                  <p className="text-muted-foreground">Register your brand and start selling</p>
                </div>
              </Link>

              {/* Login */}
              <Link href="/auth/brand/login">
                <div className="bg-card p-6 rounded-2xl border border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center text-primary mb-4">
                    <LogIn className="w-6 h-6" />
                  </div>
                  <h5 className="text-xl font-medium mb-2">Sign In</h5>
                  <p className="text-muted-foreground">Access your brand dashboard</p>
                </div>
              </Link>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-16 p-8 bg-muted/30 rounded-3xl max-w-5xl mx-auto"
          >
            <h4 className="text-2xl font-medium mb-8">Why Choose Wardro8e?</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-lg text-muted-foreground">
              <div>
                <div className="font-medium text-foreground mb-2">AI-Powered Discovery</div>
                <div>Connect customers with their perfect style</div>
              </div>
              <div>
                <div className="font-medium text-foreground mb-2">Global Marketplace</div>
                <div>Reach fashion lovers worldwide</div>
              </div>
              <div>
                <div className="font-medium text-foreground mb-2">Seamless Experience</div>
                <div>Easy management for brands and shoppers</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
