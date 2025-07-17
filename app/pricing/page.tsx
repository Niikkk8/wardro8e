"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check, X, ArrowRight } from "lucide-react";

export default function PricingPage() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

    const plans = [
        {
            name: "Shopper",
            price: "Free",
            description: "For fashion enthusiasts",
            features: [
                { text: "AI-powered style matching", included: true },
                { text: "Unlimited browsing", included: true },
                { text: "Save favorite items", included: true },
                { text: "Personalized recommendations", included: true },
                { text: "Style evolution tracking", included: true },
                { text: "Priority support", included: false },
                { text: "API access", included: false },
            ],
            cta: "Start Shopping",
            ctaLink: "/for-shoppers",
            popular: false,
        },
        {
            name: "Brand Starter",
            price: billingCycle === "monthly" ? "$99" : "$990",
            period: billingCycle === "monthly" ? "/month" : "/year",
            description: "For emerging brands",
            features: [
                { text: "Up to 100 products", included: true },
                { text: "Basic analytics dashboard", included: true },
                { text: "Customer insights", included: true },
                { text: "Direct messaging", included: true },
                { text: "Monthly performance reports", included: true },
                { text: "Priority placement", included: false },
                { text: "API access", included: false },
            ],
            cta: "Start Free Trial",
            ctaLink: "/contact",
            popular: true,
            savings: billingCycle === "yearly" ? "Save $198" : null,
        },
        {
            name: "Brand Pro",
            price: billingCycle === "monthly" ? "$299" : "$2,990",
            period: billingCycle === "monthly" ? "/month" : "/year",
            description: "For established brands",
            features: [
                { text: "Unlimited products", included: true },
                { text: "Advanced analytics", included: true },
                { text: "Priority placement", included: true },
                { text: "API access", included: true },
                { text: "Dedicated account manager", included: true },
                { text: "Custom integrations", included: true },
                { text: "White-label options", included: true },
            ],
            cta: "Contact Sales",
            ctaLink: "/contact",
            popular: false,
            savings: billingCycle === "yearly" ? "Save $598" : null,
        },
    ];

    const faqs = [
        {
            question: "Can I change plans anytime?",
            answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
        },
        {
            question: "Is there a free trial for brand plans?",
            answer: "Yes, we offer a 14-day free trial for all brand plans. No credit card required to start.",
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
        },
        {
            question: "Can I cancel my subscription?",
            answer: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
        },
    ];

    return (
        <div className="pt-32 pb-16">
            {/* Hero Section */}
            <section className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-serif font-light mb-6">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                        Free for shoppers, affordable for brands. Choose the plan that fits your needs.
                    </p>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center space-x-4">
                        <span className={billingCycle === "monthly" ? "font-medium" : "text-muted-foreground"}>
                            Monthly
                        </span>
                        <button
                            onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                            className="relative w-16 h-8 bg-muted rounded-full transition-colors"
                        >
                            <div
                                className={`absolute top-1 w-6 h-6 bg-primary rounded-full transition-transform ${billingCycle === "yearly" ? "translate-x-8" : "translate-x-1"
                                    }`}
                            />
                        </button>
                        <span className={billingCycle === "yearly" ? "font-medium" : "text-muted-foreground"}>
                            Yearly
                            <span className="text-primary ml-1">(Save 20%)</span>
                        </span>
                    </div>
                </motion.div>
            </section>

            {/* Pricing Cards */}
            <section className="container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`bg-card rounded-2xl p-8 ${plan.popular ? "ring-2 ring-primary relative" : ""
                                } border border-border`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm">
                                    Most Popular
                                </div>
                            )}
                            <h3 className="text-2xl font-medium mb-2">{plan.name}</h3>
                            <p className="text-muted-foreground mb-6">{plan.description}</p>
                            <div className="mb-6">
                                <span className="text-4xl font-light">{plan.price}</span>
                                {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                                {plan.savings && (
                                    <p className="text-sm text-primary mt-1">{plan.savings}</p>
                                )}
                            </div>
                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start">
                                        {feature.included ? (
                                            <Check className="w-5 h-5 text-primary mr-2 mt-0.5" />
                                        ) : (
                                            <X className="w-5 h-5 text-muted-foreground/50 mr-2 mt-0.5" />
                                        )}
                                        <span className={feature.included ? "" : "text-muted-foreground/50"}>
                                            {feature.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href={plan.ctaLink}
                                className={`w-full py-3 rounded-full transition-all duration-300 hover:scale-105 flex items-center justify-center group ${plan.popular
                                        ? "bg-primary text-primary-foreground hover:opacity-90"
                                        : "border border-border hover:border-primary hover:text-primary"
                                    }`}
                            >
                                {plan.cta}
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Enterprise Section */}
            <section className="container mt-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-primary/5 rounded-3xl p-12 text-center"
                >
                    <h2 className="text-3xl font-serif font-light mb-4">
                        Need a Custom Solution?
                    </h2>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        For large brands and enterprises, we offer custom plans tailored to your specific needs.
                    </p>
                    <Link
                        href="/contact"
                        className="bg-primary text-primary-foreground px-8 py-3 rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 inline-flex items-center group"
                    >
                        Contact Sales Team
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </section>

            {/* FAQs */}
            <section className="container mt-24">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-3xl font-serif font-light text-center mb-12"
                >
                    Frequently Asked Questions
                </motion.h2>
                <div className="max-w-3xl mx-auto grid gap-6">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-card p-6 rounded-xl border border-border"
                        >
                            <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                            <p className="text-muted-foreground">{faq.answer}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}