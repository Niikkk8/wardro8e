"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    Check,
    X,
    ArrowRight,
    Zap,
    Shield,
    Users,
    BarChart3,
    Package,
    Award,
    DollarSign,
    Sparkles,
    Globe
} from "lucide-react";

export default function PricingPage() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

    const plans = [
        {
            name: "Shopper",
            price: "Free",
            description: "For fashion enthusiasts",
            icon: <Sparkles className="w-8 h-8" />,
            features: [
                { text: "AI-powered style matching", included: true },
                { text: "Unlimited browsing", included: true },
                { text: "Save favorite items", included: true },
                { text: "Personalized recommendations", included: true },
                { text: "Style evolution tracking", included: true },
                { text: "Create style boards", included: true },
                { text: "Follow favorite brands", included: true },
                { text: "Early access to sales", included: true },
                { text: "Priority support", included: false },
                { text: "API access", included: false },
                { text: "Custom integrations", included: false },
                { text: "White-label options", included: false },
            ],
            cta: "Start Shopping",
            ctaLink: "/for-shoppers",
            popular: false,
            color: "primary",
        },
        {
            name: "Brand Starter",
            price: billingCycle === "monthly" ? "$99" : "$990",
            period: billingCycle === "monthly" ? "/month" : "/year",
            description: "For emerging brands",
            icon: <Package className="w-8 h-8" />,
            features: [
                { text: "Up to 100 products", included: true },
                { text: "Basic analytics dashboard", included: true },
                { text: "Customer insights", included: true },
                { text: "Direct messaging", included: true },
                { text: "Monthly performance reports", included: true },
                { text: "Social media integration", included: true },
                { text: "Email support", included: true },
                { text: "Basic API access", included: true },
                { text: "Priority placement", included: false },
                { text: "Advanced analytics", included: false },
                { text: "Dedicated account manager", included: false },
                { text: "Custom integrations", included: false },
            ],
            cta: "Start Free Trial",
            ctaLink: "/contact",
            popular: true,
            savings: billingCycle === "yearly" ? "Save $198" : null,
            color: "primary",
        },
        {
            name: "Brand Pro",
            price: billingCycle === "monthly" ? "$299" : "$2,990",
            period: billingCycle === "monthly" ? "/month" : "/year",
            description: "For established brands",
            icon: <Award className="w-8 h-8" />,
            features: [
                { text: "Unlimited products", included: true },
                { text: "Advanced analytics", included: true },
                { text: "Priority placement", included: true },
                { text: "Full API access", included: true },
                { text: "Dedicated account manager", included: true },
                { text: "Custom integrations", included: true },
                { text: "White-label options", included: true },
                { text: "24/7 priority support", included: true },
                { text: "Quarterly business reviews", included: true },
                { text: "Custom reporting", included: true },
                { text: "Marketing automation", included: true },
                { text: "A/B testing tools", included: true },
            ],
            cta: "Contact Sales",
            ctaLink: "/contact",
            popular: false,
            savings: billingCycle === "yearly" ? "Save $598" : null,
            color: "primary",
        },
    ];

    const faqs = [
        {
            question: "Can I change plans anytime?",
            answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle. If you upgrade, you'll be charged a prorated amount for the remainder of your current billing period.",
        },
        {
            question: "Is there a free trial for brand plans?",
            answer: "Yes, we offer a 14-day free trial for all brand plans. No credit card required to start. You'll have full access to all features during the trial period.",
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual plans. For enterprise customers, we also offer invoicing options.",
        },
        {
            question: "Can I cancel my subscription?",
            answer: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period. We also offer a 30-day money-back guarantee for new customers.",
        },
        {
            question: "Do you offer discounts for non-profits?",
            answer: "Yes, we offer special pricing for registered non-profit organizations and social enterprises. Contact our sales team to learn more about our non-profit discount program.",
        },
        {
            question: "What happens to my data if I cancel?",
            answer: "Your data remains accessible for 30 days after cancellation. You can export all your data at any time. After 30 days, data is securely deleted according to our privacy policy.",
        },
    ];

    const comparison = [
        { feature: "Product Listings", shopper: "View All", starter: "Up to 100", pro: "Unlimited" },
        { feature: "Analytics Dashboard", shopper: "—", starter: "Basic", pro: "Advanced" },
        { feature: "Customer Support", shopper: "Community", starter: "Email", pro: "24/7 Priority" },
        { feature: "API Access", shopper: "—", starter: "Basic", pro: "Full Access" },
        { feature: "Custom Integrations", shopper: "—", starter: "—", pro: "✓" },
        { feature: "Account Manager", shopper: "—", starter: "—", pro: "Dedicated" },
    ];

    return (
        <div className="pt-32 pb-16">
            {/* Hero Section */}
            <section className="container mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6">
                        <DollarSign className="w-4 h-4 text-primary mr-2" />
                        <span className="text-sm font-medium text-primary">Transparent, Fair Pricing</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light mb-8">
                        Simple, Transparent
                        <span className="block text-primary mt-2">Pricing</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
                        Free for shoppers, affordable for brands. Choose the plan that fits your needs
                        and scale as you grow.
                    </p>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center space-x-6">
                        <span className={`text-lg ${billingCycle === "monthly" ? "font-medium" : "text-muted-foreground"}`}>
                            Monthly
                        </span>
                        <button
                            onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                            className="relative w-20 h-10 bg-muted rounded-full transition-colors"
                        >
                            <div
                                className={`absolute top-1 w-8 h-8 bg-primary rounded-full transition-transform ${billingCycle === "yearly" ? "translate-x-10" : "translate-x-1"
                                    }`}
                            />
                        </button>
                        <span className={`text-lg ${billingCycle === "yearly" ? "font-medium" : "text-muted-foreground"}`}>
                            Yearly
                            <span className="text-primary ml-2 font-medium">(Save 20%)</span>
                        </span>
                    </div>
                </motion.div>
            </section>

            {/* Pricing Cards */}
            <section className="container mb-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`bg-card rounded-3xl p-10 ${plan.popular ? "ring-2 ring-primary relative scale-105 shadow-2xl" : ""
                                } border border-border hover:shadow-xl transition-all duration-300`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-medium">
                                    Most Popular
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <div className={`inline-flex p-4 rounded-2xl mb-6 ${plan.popular ? "bg-primary/10 text-primary" : "bg-muted"
                                    }`}>
                                    {plan.icon}
                                </div>

                                <h3 className="text-3xl font-medium mb-3">{plan.name}</h3>
                                <p className="text-lg text-muted-foreground mb-6">{plan.description}</p>

                                <div className="mb-2">
                                    <span className="text-5xl font-light">{plan.price}</span>
                                    {plan.period && <span className="text-xl text-muted-foreground">{plan.period}</span>}
                                </div>
                                {plan.savings && (
                                    <p className="text-sm text-primary font-medium">{plan.savings}</p>
                                )}
                            </div>

                            <div className="space-y-4 mb-10">
                                {plan.features.slice(0, 8).map((feature, i) => (
                                    <div key={i} className="flex items-start">
                                        {feature.included ? (
                                            <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                                        ) : (
                                            <X className="w-5 h-5 text-muted-foreground/50 mr-3 mt-0.5 flex-shrink-0" />
                                        )}
                                        <span className={`text-base ${feature.included ? "" : "text-muted-foreground/50"}`}>
                                            {feature.text}
                                        </span>
                                    </div>
                                ))}

                                {plan.features.length > 8 && (
                                    <details className="group cursor-pointer">
                                        <summary className="text-primary text-sm font-medium list-none flex items-center">
                                            Show all features
                                            <ArrowRight className="w-4 h-4 ml-1 group-open:rotate-90 transition-transform" />
                                        </summary>
                                        <div className="mt-4 space-y-4">
                                            {plan.features.slice(8).map((feature, i) => (
                                                <div key={i} className="flex items-start">
                                                    {feature.included ? (
                                                        <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                                                    ) : (
                                                        <X className="w-5 h-5 text-muted-foreground/50 mr-3 mt-0.5 flex-shrink-0" />
                                                    )}
                                                    <span className={`text-base ${feature.included ? "" : "text-muted-foreground/50"}`}>
                                                        {feature.text}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </details>
                                )}
                            </div>

                            <Link
                                href={plan.ctaLink}
                                className={`w-full py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 flex items-center justify-center group ${plan.popular
                                        ? "bg-primary text-primary-foreground hover:opacity-90"
                                        : "border-2 border-border hover:border-primary hover:text-primary"
                                    }`}
                            >
                                {plan.cta}
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Feature Comparison */}
            <section className="py-24 bg-muted/30">
                <div className="container">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-serif font-light text-center mb-16"
                    >
                        Compare Plans
                    </motion.h2>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-4 px-6 font-medium">Features</th>
                                    <th className="text-center py-4 px-6 font-medium">Shopper</th>
                                    <th className="text-center py-4 px-6 font-medium">Brand Starter</th>
                                    <th className="text-center py-4 px-6 font-medium">Brand Pro</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparison.map((row, index) => (
                                    <motion.tr
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                        viewport={{ once: true }}
                                        className="border-b border-border/50"
                                    >
                                        <td className="py-4 px-6">{row.feature}</td>
                                        <td className="text-center py-4 px-6">{row.shopper}</td>
                                        <td className="text-center py-4 px-6">{row.starter}</td>
                                        <td className="text-center py-4 px-6">{row.pro}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Enterprise Section */}
            <section className="container py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl p-16"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">
                                Need a Custom Solution?
                            </h2>
                            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                                For large brands and enterprises, we offer custom plans tailored to your
                                specific needs, with dedicated support and unlimited possibilities.
                            </p>

                            <div className="space-y-4 mb-10">
                                <div className="flex items-center">
                                    <Globe className="w-6 h-6 text-primary mr-4" />
                                    <span className="text-lg">Global scalability and infrastructure</span>
                                </div>
                                <div className="flex items-center">
                                    <Shield className="w-6 h-6 text-primary mr-4" />
                                    <span className="text-lg">Enterprise-grade security and compliance</span>
                                </div>
                                <div className="flex items-center">
                                    <Users className="w-6 h-6 text-primary mr-4" />
                                    <span className="text-lg">Dedicated success team</span>
                                </div>
                                <div className="flex items-center">
                                    <BarChart3 className="w-6 h-6 text-primary mr-4" />
                                    <span className="text-lg">Custom analytics and reporting</span>
                                </div>
                            </div>

                            <Link
                                href="/contact"
                                className="bg-primary text-primary-foreground px-10 py-4 text-lg rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 inline-flex items-center group"
                            >
                                Contact Sales Team
                                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-card p-8 rounded-2xl border border-border text-center">
                                <p className="text-4xl font-light mb-2">50+</p>
                                <p className="text-muted-foreground">Enterprise Clients</p>
                            </div>
                            <div className="bg-card p-8 rounded-2xl border border-border text-center">
                                <p className="text-4xl font-light mb-2">99.9%</p>
                                <p className="text-muted-foreground">Uptime SLA</p>
                            </div>
                            <div className="bg-card p-8 rounded-2xl border border-border text-center">
                                <p className="text-4xl font-light mb-2">24/7</p>
                                <p className="text-muted-foreground">Dedicated Support</p>
                            </div>
                            <div className="bg-card p-8 rounded-2xl border border-border text-center">
                                <p className="text-4xl font-light mb-2">100%</p>
                                <p className="text-muted-foreground">Customizable</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* FAQs */}
            <section className="container py-24">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-serif font-light text-center mb-16"
                >
                    Frequently Asked Questions
                </motion.h2>
                <div className="max-w-4xl mx-auto grid gap-8">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-card p-8 rounded-2xl border border-border hover:shadow-lg transition-all duration-300"
                        >
                            <h3 className="text-xl font-medium mb-3 flex items-start">
                                <Zap className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                                {faq.question}
                            </h3>
                            <p className="text-lg text-muted-foreground ml-8 leading-relaxed">{faq.answer}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Money Back Guarantee */}
            <section className="py-24 bg-primary/5">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
                        <h2 className="text-4xl font-serif font-light mb-6">
                            30-Day Money-Back Guarantee
                        </h2>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            We&apos;re confident you&apos;ll love Wardro8e. If you&apos;re not completely satisfied within
                            your first 30 days, we&apos;ll give you a full refund. No questions asked.
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}