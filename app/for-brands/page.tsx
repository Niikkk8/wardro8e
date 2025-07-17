"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Users, BarChart3, Zap, Shield, ArrowRight, TrendingUp, Target, Award } from "lucide-react";

export default function ForBrandsPage() {
    const benefits = [
        {
            icon: <Users className="w-6 h-6" />,
            title: "Targeted Audience",
            description: "Connect with shoppers who genuinely appreciate your design aesthetic.",
        },
        {
            icon: <BarChart3 className="w-6 h-6" />,
            title: "Advanced Analytics",
            description: "Understand your audience with detailed insights and performance metrics.",
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Increased Visibility",
            description: "Get discovered by style-conscious shoppers actively looking for your aesthetic.",
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Brand Protection",
            description: "Maintain your brand integrity with our quality-focused platform.",
        },
    ];

    const metrics = [
        { value: "85%", label: "Higher Engagement", description: "vs. traditional platforms" },
        { value: "3x", label: "Conversion Rate", description: "average increase" },
        { value: "60%", label: "Repeat Customers", description: "within 6 months" },
    ];

    const features = [
        {
            icon: <Target className="w-6 h-6" />,
            title: "Smart Matching",
            description: "AI connects your products with shoppers whose style DNA matches your brand aesthetic.",
        },
        {
            icon: <TrendingUp className="w-6 h-6" />,
            title: "Growth Tools",
            description: "Access tools and insights to grow your brand and reach the right customers.",
        },
        {
            icon: <Award className="w-6 h-6" />,
            title: "Quality Badge",
            description: "Earn trust with our quality verification and sustainability badges.",
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
                        For Fashion Brands
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Reach customers who truly understand and value your unique design vision.
                    </p>
                </motion.div>
            </section>

            {/* Main Benefits Section */}
            <section className="container mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-card rounded-2xl p-8 border border-border">
                            <div className="relative h-[300px] rounded-xl overflow-hidden mb-6">
                                <Image
                                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
                                    alt="Brand dashboard"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                {metrics.map((metric, index) => (
                                    <div key={index}>
                                        <p className="text-2xl font-light">{metric.value}</p>
                                        <p className="text-sm font-medium">{metric.label}</p>
                                        <p className="text-xs text-muted-foreground">{metric.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="space-y-6">
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-start space-x-4"
                                >
                                    <div className="bg-primary/10 p-3 rounded-xl text-primary mt-1">
                                        {benefit.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium mb-2">{benefit.title}</h3>
                                        <p className="text-muted-foreground">{benefit.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <Link
                            href="/pricing"
                            className="mt-8 bg-primary text-primary-foreground px-8 py-3 rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 inline-flex items-center group"
                        >
                            View Pricing Plans
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="container mt-32">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-3xl font-serif font-light text-center mb-12"
                >
                    Powerful Features for Brands
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-card p-8 rounded-2xl border border-border text-center"
                        >
                            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Success Stories */}
            <section className="container mt-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-primary/5 rounded-3xl p-12"
                >
                    <h2 className="text-3xl font-serif font-light text-center mb-12">
                        Success Stories
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-card p-6 rounded-xl border border-border">
                            <p className="text-muted-foreground mb-4">
                                &quot;Wardro8e helped us reach our target audience with precision. Our conversion
                                rate increased by 250% in just 3 months.&quot;
                            </p>
                            <div>
                                <p className="font-medium">Minimal Studios</p>
                                <p className="text-sm text-muted-foreground">Sustainable Fashion Brand</p>
                            </div>
                        </div>
                        <div className="bg-card p-6 rounded-xl border border-border">
                            <p className="text-muted-foreground mb-4">
                                &quot;The analytics dashboard gives us insights we never had before. We finally
                                understand our customers&apos; style preferences.&quot;
                            </p>
                            <div>
                                <p className="font-medium">Urban Thread Co.</p>
                                <p className="text-sm text-muted-foreground">Streetwear Label</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* CTA Section */}
            <section className="container mt-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-4xl font-serif font-light mb-4">
                        Ready to Grow Your Brand?
                    </h2>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Join 500+ brands already connecting with their perfect customers through AI-powered matching.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="bg-primary text-primary-foreground px-8 py-3 rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 inline-flex items-center group"
                        >
                            Start Free Trial
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/pricing"
                            className="border border-border text-foreground px-8 py-3 rounded-full hover:border-primary hover:text-primary transition-all duration-300"
                        >
                            View Pricing
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}