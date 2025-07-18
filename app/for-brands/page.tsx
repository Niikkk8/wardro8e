"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    Users,
    BarChart3,
    Zap,
    Shield,
    ArrowRight,
    TrendingUp,
    Target,
    Award,
    Globe,
    Heart,
    DollarSign,
    Megaphone,
    Package,
    LineChart
} from "lucide-react";

export default function ForBrandsPage() {
    const metrics = [
        { value: "85%", label: "Higher Engagement", description: "vs. traditional platforms" },
        { value: "3x", label: "Conversion Rate", description: "average increase" },
        { value: "60%", label: "Repeat Customers", description: "within 6 months" },
        { value: "40%", label: "Less Returns", description: "better style matching" },
    ];

    const features = [
        {
            icon: <Target className="w-8 h-8" />,
            title: "Smart Matching",
            description: "AI connects your products with shoppers whose style DNA matches your brand aesthetic perfectly.",
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "Growth Tools",
            description: "Access powerful tools and insights to scale your brand and reach the right customers.",
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: "Quality Badge",
            description: "Earn trust with our quality verification and sustainability badges that shoppers value.",
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: "Global Reach",
            description: "Connect with fashion-forward customers worldwide who appreciate unique designs.",
        },
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Brand Loyalty",
            description: "Build lasting relationships with customers who truly understand your vision.",
        },
        {
            icon: <Package className="w-8 h-8" />,
            title: "Inventory Insights",
            description: "Optimize your collections based on real-time style preference data.",
        },
    ];

    const successStories = [
        {
            brand: "Minimal Studios",
            category: "Sustainable Fashion",
            quote: "Wardro8e helped us reach our target audience with precision. Our conversion rate increased by 250% in just 3 months.",
            metrics: { growth: "+250%", customers: "5K+", rating: "4.9/5" },
            image: "https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=600&h=400&fit=crop"
        },
        {
            brand: "Urban Thread Co.",
            category: "Streetwear Label",
            quote: "The analytics dashboard gives us insights we never had before. We finally understand our customers' style preferences.",
            metrics: { growth: "+180%", customers: "8K+", rating: "4.8/5" },
            image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=400&fit=crop"
        },
    ];

    const tools = [
        {
            icon: <LineChart className="w-6 h-6" />,
            title: "Performance Dashboard",
            description: "Real-time analytics and insights"
        },
        {
            icon: <Megaphone className="w-6 h-6" />,
            title: "Marketing Tools",
            description: "Targeted campaigns and promotions"
        },
        {
            icon: <DollarSign className="w-6 h-6" />,
            title: "Revenue Optimization",
            description: "Pricing and inventory suggestions"
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Customer Insights",
            description: "Deep understanding of your audience"
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
                        <Target className="w-4 h-4 text-primary mr-2" />
                        <span className="text-sm font-medium text-primary">AI-Powered Brand Growth</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light mb-8">
                        For Fashion
                        <span className="block text-primary mt-2">Brands</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                        Reach customers who truly understand and value your unique design vision.
                        Let AI connect you with your perfect audience.
                    </p>
                </motion.div>

                {/* Hero Stats */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
                >
                    {metrics.map((metric, index) => (
                        <div key={index} className="bg-card p-8 rounded-2xl border border-border text-center">
                            <p className="text-4xl font-light mb-2">{metric.value}</p>
                            <p className="text-lg font-medium mb-1">{metric.label}</p>
                            <p className="text-sm text-muted-foreground">{metric.description}</p>
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* Add dashboard mockup section */}
            <section className="py-16 bg-muted/30">
                <div className="container">
                    <h2 className="text-3xl md:text-4xl font-serif font-light mb-8 text-center">Brand Dashboard</h2>
                    <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                        <div className="flex-1">
                            <Image src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop" alt="Dashboard" width={400} height={300} className="rounded-2xl object-cover shadow-lg" />
                        </div>
                        <div className="flex-1">
                            <ul className="space-y-4">
                                <li className="flex items-center"><BarChart3 className="w-6 h-6 text-primary mr-2" /> <span>Real-time analytics and insights</span></li>
                                <li className="flex items-center"><Users className="w-6 h-6 text-primary mr-2" /> <span>Customer engagement up to 85%</span></li>
                                <li className="flex items-center"><TrendingUp className="w-6 h-6 text-primary mr-2" /> <span>Average order value up 42%</span></li>
                                <li className="flex items-center"><Shield className="w-6 h-6 text-primary mr-2" /> <span>Brand protection and quality verification</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Add concise benefits section */}
            <section className="py-16 bg-gradient-to-br from-primary/10 to-primary/5">
                <div className="container">
                    <h2 className="text-3xl md:text-4xl font-serif font-light mb-8 text-center">Why Brands Choose Wardro8e</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-card p-6 rounded-2xl shadow-md flex flex-col items-center">
                            <Target className="w-8 h-8 text-primary mb-3" />
                            <h3 className="font-medium mb-2">Targeted Audience</h3>
                            <p className="text-sm text-muted-foreground text-center">Connect with shoppers who genuinely appreciate your design aesthetic and brand values.</p>
                        </div>
                        <div className="bg-card p-6 rounded-2xl shadow-md flex flex-col items-center">
                            <BarChart3 className="w-8 h-8 text-primary mb-3" />
                            <h3 className="font-medium mb-2">Advanced Analytics</h3>
                            <p className="text-sm text-muted-foreground text-center">Understand your audience with detailed insights, behavior patterns, and performance metrics.</p>
                        </div>
                        <div className="bg-card p-6 rounded-2xl shadow-md flex flex-col items-center">
                            <Zap className="w-8 h-8 text-primary mb-3" />
                            <h3 className="font-medium mb-2">Increased Visibility</h3>
                            <p className="text-sm text-muted-foreground text-center">Get discovered by style-conscious shoppers actively looking for your specific aesthetic.</p>
                        </div>
                        <div className="bg-card p-6 rounded-2xl shadow-md flex flex-col items-center">
                            <Shield className="w-8 h-8 text-primary mb-3" />
                            <h3 className="font-medium mb-2">Brand Protection</h3>
                            <p className="text-sm text-muted-foreground text-center">Maintain your brand integrity with our quality-focused platform and verification process.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="container py-24">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-serif font-light text-center mb-16"
                >
                    Powerful Features for Brands
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-card p-10 rounded-3xl border border-border text-center hover:border-primary transition-all duration-300 group"
                        >
                            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-medium mb-4">{feature.title}</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Tools Section */}
            <section className="py-24 bg-primary/5">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">
                            Everything You Need to Succeed
                        </h2>
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                            Comprehensive tools and insights to help your brand thrive in the digital age
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {tools.map((tool, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-card p-8 rounded-2xl border border-border hover:shadow-lg transition-all duration-300"
                            >
                                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4 text-primary">
                                    {tool.icon}
                                </div>
                                <h3 className="text-xl font-medium mb-2">{tool.title}</h3>
                                <p className="text-muted-foreground">{tool.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Success Stories */}
            <section className="container py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">
                        Success Stories
                    </h2>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                        See how brands are growing with Wardro8e
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {successStories.map((story, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-card rounded-3xl overflow-hidden border border-border"
                        >
                            <div className="relative h-[300px]">
                                <Image
                                    src={story.image}
                                    alt={story.brand}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute bottom-6 left-8 right-8">
                                    <h3 className="text-2xl font-medium text-white mb-2">{story.brand}</h3>
                                    <p className="text-white/80">{story.category}</p>
                                </div>
                            </div>
                            <div className="p-8">
                                <p className="text-lg mb-6 leading-relaxed">
                                    &quot;{story.quote}&quot;
                                </p>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-center">
                                        <p className="text-2xl font-light">{story.metrics.growth}</p>
                                        <p className="text-sm text-muted-foreground">Growth</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-light">{story.metrics.customers}</p>
                                        <p className="text-sm text-muted-foreground">Customers</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-light">{story.metrics.rating}</p>
                                        <p className="text-sm text-muted-foreground">Rating</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Partner Brands */}
            <section className="py-24 bg-muted/30">
                <div className="container">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-serif font-light text-center mb-16"
                    >
                        Join 500+ Growing Brands
                    </motion.h2>

                    <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
                        {[...Array(12)].map((_, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="bg-card p-6 rounded-xl border border-border flex items-center justify-center h-20"
                            >
                                <span className="text-muted-foreground text-sm">Brand {index + 1}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Add join CTA section */}
            <section className="py-16 bg-muted/30">
                <div className="container text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-light mb-6">Ready to Grow Your Brand?</h2>
                    <Link href="/contact" className="bg-primary text-primary-foreground px-8 py-3 text-base rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 inline-flex items-center group">Join Wardro8e <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link>
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
                        Ready to Grow Your Brand?
                    </h2>
                    <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                        Join 500+ brands already connecting with their perfect customers through AI-powered matching.
                        Start your free trial today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                        <Link
                            href="/contact"
                            className="bg-primary text-primary-foreground px-12 py-5 text-lg rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 inline-flex items-center group"
                        >
                            Start Free Trial
                            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/pricing"
                            className="border-2 border-border text-foreground px-12 py-5 text-lg rounded-full hover:border-primary hover:text-primary transition-all duration-300"
                        >
                            View Pricing
                        </Link>
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-8">
                        <div className="flex items-center">
                            <Award className="w-5 h-5 text-primary mr-2" />
                            <span className="text-muted-foreground">14-Day Free Trial</span>
                        </div>
                        <div className="flex items-center">
                            <Shield className="w-5 h-5 text-primary mr-2" />
                            <span className="text-muted-foreground">No Credit Card Required</span>
                        </div>
                        <div className="flex items-center">
                            <Zap className="w-5 h-5 text-primary mr-2" />
                            <span className="text-muted-foreground">Quick Setup</span>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}