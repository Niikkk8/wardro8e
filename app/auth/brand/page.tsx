"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, UserPlus, LogIn, Building2 } from "lucide-react";

export default function BrandAuthPage() {
  return (
    <div className="pt-24 pb-10 min-h-screen bg-gradient-to-br from-primary/10 to-primary/5">
      <div className="container max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/auth" className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Auth</span>
          </Link>

          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-primary/10 px-6 py-3 rounded-full text-primary font-medium mb-6">
              <Building2 className="w-5 h-5" />
              <span>Brand Portal</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-serif font-light mb-6">
              Welcome to <span className="text-primary">Wardro8e</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Join thousands of fashion brands already selling on our platform. 
              Reach style-conscious customers and grow your business with our AI-powered discovery system.
            </p>
          </div>

          {/* Auth Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Signup */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group"
            >
              <Link href="/auth/brand/signup">
                <div className="bg-card p-8 rounded-3xl border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300 h-full">
                  <div className="bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 mb-6">
                    <UserPlus className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-2xl font-medium mb-4">Create Account</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Start your journey with Wardro8e. Quick setup with email verification.
                  </p>
                  
                  <div className="text-primary font-medium flex items-center justify-center space-x-2 group-hover:translate-x-1 transition-transform">
                    <span>Get Started</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Login */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group"
            >
              <Link href="/auth/brand/login">
                <div className="bg-card p-8 rounded-3xl border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300 h-full">
                  <div className="bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 mb-6">
                    <LogIn className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-2xl font-medium mb-4">Sign In</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Welcome back! Access your brand dashboard and manage your collections.
                  </p>
                  
                  <div className="text-primary font-medium flex items-center justify-center space-x-2 group-hover:translate-x-1 transition-transform">
                    <span>Continue</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-card p-8 rounded-3xl border border-border"
          >
            <h4 className="text-2xl font-medium mb-8 text-center">Why Brands Choose Wardro8e</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "AI-Powered Discovery",
                  description: "Our AI matches your products with customers who love your style",
                  icon: "🤖"
                },
                {
                  title: "Global Reach",
                  description: "Access fashion lovers from around the world",
                  icon: "🌍"
                },
                {
                  title: "Easy Management",
                  description: "Intuitive dashboard for product and order management",
                  icon: "⚡"
                }
              ].map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h5 className="text-lg font-medium mb-2">{benefit.title}</h5>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
