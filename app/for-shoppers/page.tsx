"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    Sparkles,
    Heart,
    TrendingUp,
    Shield,
    ArrowRight,
    Star,
    Search,
    ShoppingBag,
    Clock,
    Zap,
    Eye,
    Palette,
    Gift
} from "lucide-react";

export default function ForShoppersPage() {
    const features = [
        {
            icon: <Sparkles className="w-8 h-8" />,
            title: "AI Style Profile",
            description: "Our advanced AI analyzes thousands of style attributes to create your unique fashion fingerprint that evolves with you.",
        },
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Curated Discovery",
            description: "Find pieces from independent designers and emerging brands that truly match your aesthetic, not just trending items.",
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "Style Evolution",
            description: "Track how your style evolves over time and get personalized predictions for upcoming trends you'll love.",
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Quality Assured",
            description: "Every brand is carefully vetted for quality, sustainability, ethical practices, and authentic design philosophy.",
        },
    ];

    const steps = [
        {
            icon: <Search className="w-8 h-8" />,
            title: "Take the Style Quiz",
            description: "Answer questions about your preferences, lifestyle, and style inspirations in our interactive quiz.",
            image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&h=400&fit=crop"
        },
        {
            icon: <Sparkles className="w-8 h-8" />,
            title: "Get Your Style DNA",
            description: "Our AI creates a comprehensive style profile based on your fashion preferences and personality.",
            image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&h=400&fit=crop"
        },
        {
            icon: <ShoppingBag className="w-8 h-8" />,
            title: "Discover & Shop",
            description: "Explore curated pieces from brands that match your aesthetic and values perfectly.",
            image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop"
        },
    ];

    const testimonials = [
        {
            name: "Sarah Chen",
            role: "Fashion Enthusiast",
            content: "Finally found brands that actually match my minimalist aesthetic. No more endless scrolling through items that don't speak to me!",
            rating: 5,
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
        },
        {
            name: "Emma Rodriguez",
            role: "Style Blogger",
            content: "The AI recommendations are spot-on. It's like having a personal stylist who really gets me and my evolving style.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
        },
        {
            name: "Lisa Thompson",
            role: "Sustainable Shopper",
            content: "Love discovering independent brands that align with my values. The quality verification gives me confidence in every purchase.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop"
        },
    ];

    const benefits = [
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Save Time",
            description: "No more hours of scrolling. Find what you love instantly."
        },
        {
            icon: <Eye className="w-6 h-6" />,
            title: "Discover Hidden Gems",
            description: "Find unique brands you'd never discover on your own."
        },
        {
            icon: <Palette className="w-6 h-6" />,
            title: "Express Yourself",
            description: "Build a wardrobe that truly reflects your personality."
        },
        {
            icon: <Gift className="w-6 h-6" />,
            title: "Exclusive Access",
            description: "Get early access to new collections from partner brands."
        },
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
                        <Zap className="w-4 h-4 text-primary mr-2" />
                        <span className="text-sm font-medium text-primary">Personalized Fashion Discovery</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light mb-8">
                        For Fashion
                        <span className="block text-primary mt-2">Lovers</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                        Discover fashion that speaks to your soul. No more endless scrolling through
                        items that don&apos;t match your vibe. Let AI help you find your perfect style matches.
                    </p>
                </motion.div>

                {/* Hero Image Gallery */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
                        <Image
                            src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&h=800&fit=crop"
                            alt="Fashion style 1"
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8">
                            <p className="text-white text-xl font-medium">Minimalist Chic</p>
                            <p className="text-white/80">Clean lines, timeless pieces</p>
                        </div>
                    </div>

                    <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group md:mt-12">
                        <Image
                            src="https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=600&h=800&fit=crop"
                            alt="Fashion style 2"
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8">
                            <p className="text-white text-xl font-medium">Urban Street</p>
                            <p className="text-white/80">Bold statements, comfort first</p>
                        </div>
                    </div>

                    <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
                        <Image
                            src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop"
                            alt="Fashion style 3"
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8">
                            <p className="text-white text-xl font-medium">Elegant Evening</p>
                            <p className="text-white/80">Sophisticated glamour</p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-muted/30">
                <div className="container">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-serif font-light text-center mb-16"
                    >
                        Why Shoppers Love Wardro8e
                    </motion.h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="order-2 lg:order-1"
                        >
                            <div className="space-y-8">
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex items-start space-x-6"
                                    >
                                        <div className="bg-primary/10 p-4 rounded-2xl text-primary mt-1 flex-shrink-0">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-medium mb-3">{feature.title}</h3>
                                            <p className="text-lg text-muted-foreground leading-relaxed">{feature.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <Link
                                href="/contact"
                                className="mt-12 bg-primary text-primary-foreground px-10 py-4 text-lg rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 inline-flex items-center group"
                            >
                                Start Your Style Journey
                                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
                                <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=1000&fit=crop"
                                        alt="Shopping experience"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="absolute top-12 -left-6 bg-card p-6 rounded-2xl shadow-xl border border-border">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                                            <Sparkles className="w-8 h-8 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xl font-medium">Style Match</p>
                                            <p className="text-lg text-primary">98% Accurate</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute bottom-12 -right-6 bg-card p-6 rounded-2xl shadow-xl border border-border">
                                    <div className="flex items-center space-x-2 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-lg">Loved by 10K+ shoppers</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="container py-24">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-serif font-light text-center mb-16"
                >
                    Shop Smarter, Not Harder
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-card p-8 rounded-2xl border border-border hover:border-primary transition-all duration-300"
                        >
                            <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4 text-primary">
                                {benefit.icon}
                            </div>
                            <h3 className="text-xl font-medium mb-2">{benefit.title}</h3>
                            <p className="text-muted-foreground">{benefit.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 bg-primary/5">
                <div className="container">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-serif font-light text-center mb-16"
                    >
                        How It Works
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="relative h-[250px] rounded-2xl overflow-hidden shadow-lg mb-6">
                                    <Image
                                        src={step.image}
                                        alt={step.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                                    {step.icon}
                                </div>
                                <h3 className="text-2xl font-medium mb-4">{step.title}</h3>
                                <p className="text-lg text-muted-foreground leading-relaxed">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="container py-24">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-serif font-light text-center mb-16"
                >
                    What Shoppers Say
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-card p-8 rounded-3xl border border-border hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex items-center space-x-1 mb-6">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
                                ))}
                            </div>
                            <p className="text-lg mb-6 leading-relaxed">&quot;{testimonial.content}&quot;</p>
                            <div className="flex items-center">
                                <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4">
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-medium text-lg">{testimonial.name}</p>
                                    <p className="text-muted-foreground">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Style Gallery */}
            <section className="py-24 bg-muted/30">
                <div className="container">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-serif font-light text-center mb-16"
                    >
                        Find Your Style Tribe
                    </motion.h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { style: "Minimalist", count: "2.3K" },
                            { style: "Bohemian", count: "1.8K" },
                            { style: "Streetwear", count: "3.1K" },
                            { style: "Vintage", count: "1.5K" },
                            { style: "Sustainable", count: "2.7K" },
                            { style: "Luxury", count: "1.2K" },
                            { style: "Casual Chic", count: "2.9K" },
                            { style: "Avant-garde", count: "980" },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="bg-card p-8 rounded-2xl border border-border hover:border-primary transition-all duration-300 text-center group"
                            >
                                <h3 className="text-xl font-medium mb-2">{item.style}</h3>
                                <p className="text-muted-foreground">{item.count} brands</p>
                                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link href="#" className="text-primary font-medium">
                                        Explore →
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl p-16 text-center"
                >
                    <h2 className="text-5xl md:text-6xl font-serif font-light mb-6">
                        Ready to Find Your Style Match?
                    </h2>
                    <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                        Join thousands of fashion lovers who&apos;ve discovered their perfect style through AI.
                        It&apos;s free and takes less than 5 minutes to get started.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                        <Link
                            href="/contact"
                            className="bg-primary text-primary-foreground px-12 py-5 text-lg rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 inline-flex items-center group"
                        >
                            Take the Style Quiz
                            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/about"
                            className="border-2 border-border text-foreground px-12 py-5 text-lg rounded-full hover:border-primary hover:text-primary transition-all duration-300"
                        >
                            Learn More
                        </Link>
                    </div>

                    <div className="flex items-center justify-center space-x-8">
                        <div className="flex items-center">
                            <Shield className="w-5 h-5 text-primary mr-2" />
                            <span className="text-muted-foreground">100% Free for Shoppers</span>
                        </div>
                        <div className="flex items-center">
                            <Clock className="w-5 h-5 text-primary mr-2" />
                            <span className="text-muted-foreground">5 Minute Setup</span>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}