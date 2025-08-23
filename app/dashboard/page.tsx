"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, CheckCircle, Clock } from "lucide-react";

export default function BrandDashboard() {
  return (
    <div className="pt-32 pb-16 min-h-screen bg-gradient-to-br from-primary/10 to-primary/5">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-10 h-10 text-primary" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-serif font-light mb-4">
              Welcome to Your{" "}
              <span className="text-primary">Brand Dashboard</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              You&apos;ve successfully logged in! This is where your brand management interface will be.
            </p>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card p-8 rounded-3xl border border-border"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-green-100 p-3 rounded-2xl">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-medium">Account Created</h3>
                  <p className="text-muted-foreground">Your brand account is active</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-card p-8 rounded-3xl border border-border"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-orange-100 p-3 rounded-2xl">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-medium">Verification Pending</h3>
                  <p className="text-muted-foreground">Admin verification required</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-card p-10 rounded-3xl border border-border text-center"
          >
            <h2 className="text-3xl font-serif font-light mb-6">What&apos;s Next?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div>
                <div className="text-2xl font-light mb-2">1.</div>
                <h4 className="font-medium mb-2">Complete Profile</h4>
                <p className="text-sm text-muted-foreground">
                  Add your brand information, logo, and product categories
                </p>
              </div>
              <div>
                <div className="text-2xl font-light mb-2">2.</div>
                <h4 className="font-medium mb-2">Await Verification</h4>
                <p className="text-sm text-muted-foreground">
                  Our team will review and verify your brand account
                </p>
              </div>
              <div>
                <div className="text-2xl font-light mb-2">3.</div>
                <h4 className="font-medium mb-2">Start Selling</h4>
                <p className="text-sm text-muted-foreground">
                  Upload products and connect with style-conscious shoppers
                </p>
              </div>
            </div>
          </motion.div>

          {/* Logout Button */}
          <div className="text-center mt-12">
            <button
              onClick={async () => {
                try {
                  await fetch('/api/auth/brand/login', { method: 'DELETE' });
                  window.location.href = '/auth/brand/login';
                } catch (error) {
                  console.error('Logout error:', error);
                }
              }}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Sign Out
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
