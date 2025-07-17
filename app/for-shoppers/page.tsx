"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Heart, TrendingUp, Shield, ArrowRight, Star, Search, ShoppingBag } from "lucide-react";

export default function ForShoppersPage() {
    const features = [
        {
            icon: <Sparkles className="w-6 h-6" />,
            title: "AI Style Profile",
            description: "Our AI learns your unique preferences to create a personalized style DNA.",
        },
        {
            icon: <Heart className="w-6 h-6" />,
            title: "Curated Discovery",
            description: "Find pieces from brands that truly match your aesthetic, not just trending items.",
        },
        {
            icon: <TrendingUp className="w-6 h-6" />,
            title: "Style Evolution",
            description: "Track how your style evolves and get predictions for upcoming trends you'll love.",
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Quality Assured",
            description: "Every brand is vetted for quality, sustainability, and authentic design.",
        },
    ];

    const steps = [
        {
            icon: <Search className="w-6 h-6" />,
            title: "Take the Style Quiz",
            description: "Answer a few questions about your preferences and style inspirations.",
        },
        {
            icon: <Sparkles className="w-6 h-6" />,
            title: "Get Your Style DNA",
            description: "Our AI creates a unique profile based on your fashion preferences.",
        },
        {
            icon: <ShoppingBag className="w-6 h-6" />,
            title: "Discover & Shop",
            description: "Explore curated pieces from brands that match your aesthetic.",
        },
    ];

    const testimonials = [
        {
            name: "Sarah Chen",
            role: "Fashion Enthusiast",
            content: "Finally found brands that actually match my minimalist aesthetic. No more endless scrolling!",
            rating: 5,
        },
        {
            name: "Emma Rodriguez",
            role: "Style Blogger",
            content: "The AI recommendations are spot-on. It's like having a personal stylist who really gets me.",
            rating: 5,
        },
        {
            name: "Lisa Thompson",
            role: "Sustainable Shopper",
            content: "Love discovering independent brands that align with my values and style preferences.",
            rating: 5,
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
                        For Fashion Lovers
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Discover fashion that speaks to your soul. No more endless scrolling through
                        items that don't match your vibe.
                    </p>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="container mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="order-2 lg:order-1"
                    >
                        <div className="space-y-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-start space-x-4"
                                >
                                    <div className="bg-primary/10 p-3 rounded-xl text-primary mt-1">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                                        <p className="text-muted-foreground">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <Link
                            href="/contact"
                            className="mt-8 bg-primary text-primary-foreground px-8 py-3 rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 inline-flex items-center group"
                        >
                            Start Your Style Journey
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="order-1 lg:order-2"
                    >
                        <div className="relative">
                            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-lg">
                                <Image
                                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=700&fit=crop"
                                    alt="Shopping experience"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="absolute top-8 -left-4 bg-card p-4 rounded-xl shadow-lg border border-border">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                        <Sparkles className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Style Match</p>
                                        <p className="text-sm text-primary">98% Accurate</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-8 -right-4 bg-card p-4 rounded-xl shadow-lg border border-border">
                                <div className="flex items-center space-x-2 mb-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                                    ))}
                                </div>
                                <p className="text-sm text-muted-foreground">Loved by 10K+ shoppers</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* How It Works */}
            <section className="container mt-32">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-3xl font-serif font-light text-center mb-12"
                >
                    How It Works
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section className="container mt-32">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-3xl font-serif font-light text-center mb-12"
                >
                    What Shoppers Say
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-card p-6 rounded-2xl border border-border"
                        >
                            <div className="flex items-center space-x-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                                ))}
                            </div>
                            <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                            <div>
                                <p className="font-medium">{testimonial.name}</p>
                                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mt-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-primary/5 rounded-3xl p-12 text-center"
                >
                    <h2 className="text-4xl font-serif font-light mb-4">
                        Ready to Find Your Style Match?
                    </h2>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Join thousands of fashion lovers who've discovered their perfect style through AI.
                        It's free and takes less than 5 minutes.
                    </p>
                    <Link
                        href="/contact"
                        className="bg-primary text-primary-foreground px-8 py-3 rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 inline-flex items-center group"
                    >
                        Take the Style Quiz
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}