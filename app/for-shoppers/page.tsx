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

            {/* Redesigned Style Quiz section */}
            <section className="py-16 bg-muted/30">
                <div className="container flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1 flex justify-center mb-8 md:mb-0">
                        <div className="w-full max-w-xs md:max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white flex flex-col items-center p-6">
                            <Image src="https://cdn.pixabay.com/photo/2017/01/31/13/14/question-mark-2026615_1280.png" alt="Quiz illustration" width={80} height={80} className="w-20 h-20 mb-4" />
                            <div className="w-full mb-2">
                                <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                                    <div className="h-2 bg-primary rounded-full w-1/3 transition-all" />
                                </div>
                            </div>
                            <div className="w-full text-center mb-4">
                                <span className="font-medium">What colors do you wear most often?</span>
                                <div className="flex justify-center gap-2 mt-2">
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">Neutrals</span>
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">Brights</span>
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">Pastels</span>
                                </div>
                            </div>
                            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-full mt-2 hover:opacity-90 transition-all text-sm font-medium">Next</button>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="bg-card p-8 rounded-2xl shadow-md flex flex-col items-start">
                            <h2 className="text-2xl md:text-3xl font-serif font-light mb-4">Start With a Style Quiz</h2>
                            <p className="text-lg text-muted-foreground mb-6">Take our interactive quiz to help our AI understand your unique preferences and inspirations. Get your personalized style DNA and unlock a world of curated fashion.</p>
                            <Link href="/" className="bg-primary text-primary-foreground px-8 py-3 text-base rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 inline-flex items-center group">Try the Style Quiz <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Redesigned benefits as horizontal scrollable carousel on mobile, staggered cards on desktop */}
            <section className="py-16 bg-gradient-to-br from-primary/10 to-primary/5">
                <div className="container">
                    <h2 className="text-3xl md:text-4xl font-serif font-light mb-8 text-center">Why Shoppers Love Wardro8e</h2>
                    <div className="flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:gap-8 md:overflow-x-visible">
                        {[{icon:<Sparkles className="w-8 h-8 text-primary mb-3" />,title:'Personalized Discovery',desc:'Find pieces that match your unique style preferences without endless scrolling.'},{icon:<Heart className="w-8 h-8 text-primary mb-3" />,title:'Discover Unique Brands',desc:'Connect with independent designers and brands that align with your aesthetic.'},{icon:<TrendingUp className="w-8 h-8 text-primary mb-3" />,title:'Style Evolution',desc:'Our AI learns and evolves with your preferences to refine your personal style.'},{icon:<Shield className="w-8 h-8 text-primary mb-3" />,title:'Quality Assured',desc:'Every brand is carefully vetted for quality, sustainability, and authentic design philosophy.'}].map((b,i)=>(
                            <div key={i} className="bg-card p-6 rounded-2xl shadow-md flex flex-col items-center min-w-[220px] md:min-w-0 md:w-full">
                                {b.icon}
                                <h3 className="font-medium mb-2 text-center">{b.title}</h3>
                                <p className="text-sm text-muted-foreground text-center">{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Redesigned gallery as masonry grid with hover overlays and favorite icons */}
            <section className="py-16 bg-muted/30">
                <div className="container">
                    <h2 className="text-3xl md:text-4xl font-serif font-light mb-8 text-center">Shop the Looks</h2>
                    <div className="columns-1 md:columns-3 gap-4 [column-fill:_balance]"><div className="flex flex-col gap-4">
                        {["https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&h=800&fit=crop","https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=600&h=800&fit=crop","https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop","https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=800&fit=crop"].map((src,i)=>(
                            <div key={i} className="relative rounded-2xl overflow-hidden shadow-xl group mb-4">
                                <Image src={src} alt={`Look ${i+1}`} width={600} height={800} className="object-cover w-full h-[300px]" />
                                <button className="absolute top-3 right-3 bg-white/80 rounded-full p-2 shadow hover:bg-primary/80 hover:text-white transition-all"><svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='w-5 h-5'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 15l7-7 7 7' /></svg></button>
                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium text-lg">View Look</div>
                            </div>
                        ))}</div></div>
                </div>
            </section>

            {/* Add bold, gradient CTA */}
            <section className="py-16 bg-gradient-to-r from-primary to-primary/70 text-center">
                <div className="container">
                    <h2 className="text-3xl md:text-4xl font-serif font-light mb-6 text-white">Ready to Discover Your Style?</h2>
                    <Link href="/" className="bg-white text-primary px-10 py-4 text-lg rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 inline-flex items-center group font-semibold shadow-lg">Create Your Style Profile <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" /></Link>
                </div>
            </section>

            {/* Find Your Style Tribe section (bold, editorial) */}
            <section className="py-16 bg-gradient-to-br from-primary/10 to-primary/5">
                <div className="container flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1 flex flex-col items-center md:items-start">
                        <Image src="https://cdn.pixabay.com/photo/2017/01/31/13/14/question-mark-2026615_1280.png" alt="Community illustration" width={128} height={128} className="w-32 h-32 mb-6" />
                        <h2 className="text-3xl md:text-4xl font-serif font-light mb-4 text-center md:text-left">Find Your Style Tribe</h2>
                        <p className="text-lg text-muted-foreground mb-6 text-center md:text-left">Join a vibrant community of fashion lovers, share your looks, and get inspired by others on their style journey. Connect, learn, and grow your style with us.</p>
                        <Link href="/" className="bg-primary text-primary-foreground px-8 py-3 text-base rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 inline-flex items-center group">Join the Community <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link>
                    </div>
                    <div className="flex-1">
                        {/* Testimonials carousel */}
                        <div className="bg-card p-8 rounded-2xl shadow-xl flex flex-col gap-6">
                            <h3 className="text-xl font-medium mb-2">What Our Members Say</h3>
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {[{name:'Sarah Chen',role:'Fashion Enthusiast',content:'Finally found brands that actually match my minimalist aesthetic. No more endless scrolling through items that don\'t speak to me!',img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'},{name:'Emma Rodriguez',role:'Style Blogger',content:'The AI recommendations are spot-on. It\'s like having a personal stylist who really gets me and my evolving style.',img:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'},{name:'Lisa Thompson',role:'Sustainable Shopper',content:'Love discovering independent brands that align with my values. The quality verification gives me confidence in every purchase.',img:'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop'}].map((t,i)=>(
                                    <div key={i} className="bg-muted p-6 rounded-xl min-w-[220px] flex flex-col items-center shadow-md">
                                        <Image src={t.img} alt={t.name} width={48} height={48} className="rounded-full w-12 h-12 mb-2 object-cover" />
                                        <div className="font-medium mb-1">{t.name}</div>
                                        <div className="text-xs text-muted-foreground mb-2">{t.role}</div>
                                        <div className="text-sm text-center">“{t.content}”</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}