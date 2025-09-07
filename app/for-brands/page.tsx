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
    LineChart,
    Building2,
    Rocket,
    Lightbulb,
    Settings
} from "lucide-react";

export default function ForBrandsPage() {
    const stats = [
        { value: "85%", label: "Higher Engagement", description: "vs. traditional platforms" },
        { value: "3x", label: "Conversion Rate", description: "average increase" },
        { value: "60%", label: "Repeat Customers", description: "within 6 months" },
        { value: "40%", label: "Less Returns", description: "better style matching" },
    ];

    const features = [
        {
            icon: <Target className="w-8 h-8" />,
            title: "AI-Powered Matching",
            description: "Our advanced AI connects your products with shoppers whose style DNA perfectly matches your brand aesthetic.",
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "Growth Analytics",
            description: "Access powerful insights and tools to scale your brand and reach the right customers at the right time.",
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: "Quality Verification",
            description: "Earn trust with our quality verification and sustainability badges that shoppers actively seek out.",
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: "Global Reach",
            description: "Connect with fashion-forward customers worldwide who appreciate unique designs and authentic brands.",
        },
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Brand Loyalty",
            description: "Build lasting relationships with customers who truly understand and value your design vision.",
        },
        {
            icon: <Package className="w-8 h-8" />,
            title: "Inventory Insights",
            description: "Optimize your collections based on real-time style preference data and trend predictions.",
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

    const benefits = [
        {
            icon: <Users className="w-6 h-6" />,
            title: "Targeted Audience",
            description: "Connect with shoppers who genuinely appreciate your design aesthetic and brand values."
        },
        {
            icon: <BarChart3 className="w-6 h-6" />,
            title: "Advanced Analytics",
            description: "Understand your audience with detailed insights, behavior patterns, and performance metrics."
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Increased Visibility",
            description: "Get discovered by style-conscious shoppers actively looking for your specific aesthetic."
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Brand Protection",
            description: "Maintain your brand integrity with our quality-focused platform and verification process."
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

    const processSteps = [
        {
            number: "01",
            title: "Apply & Onboard",
            description: "Submit your brand application and get onboarded with our team in under 48 hours.",
            icon: <Rocket className="w-8 h-8" />
        },
        {
            number: "02",
            title: "Connect Your Store",
            description: "Integrate your existing e-commerce platform or upload your product catalog.",
            icon: <Settings className="w-8 h-8" />
        },
        {
            number: "03",
            title: "AI Analysis",
            description: "Our AI analyzes your products and matches them with the perfect customer base.",
            icon: <Lightbulb className="w-8 h-8" />
        },
        {
            number: "04",
            title: "Start Growing",
            description: "Begin connecting with customers who truly understand and value your brand.",
            icon: <TrendingUp className="w-8 h-8" />
        }
    ];

    return (
        <div className="pt-32 pb-16">
            {/* Hero Section - Similar to for-shoppers but adapted for brands */}
            <section className="container mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6">
                        <Building2 className="w-4 h-4 text-primary mr-2" />
                        <span className="text-sm font-medium text-primary">AI-Powered Seller Growth</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light mb-8">
                        For Fashion
                        <span className="block text-primary mt-2">Sellers</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                        Connect with customers who truly understand your vision. Let AI-powered matching
                        drive authentic growth and build lasting relationships with your ideal audience.
                    </p>
                </motion.div>

                {/* Hero Image Gallery - Brand-focused images */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
                        <Image
                            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=800&fit=crop"
                            alt="Brand Analytics"
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8">
                            <p className="text-white text-xl font-medium">Analytics Dashboard</p>
                            <p className="text-white/80">Real-time insights & growth metrics</p>
                        </div>
                    </div>

                    <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group md:mt-12">
                        <Image
                            src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=800&fit=crop"
                            alt="Brand Growth"
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8">
                            <p className="text-white text-xl font-medium">Customer Connection</p>
                            <p className="text-white/80">AI-powered style matching</p>
                        </div>
                    </div>

                    <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
                        <Image
                            src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&h=800&fit=crop"
                            alt="Brand Success"
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8">
                            <p className="text-white text-xl font-medium">Brand Success</p>
                            <p className="text-white/80">Sustainable growth & loyalty</p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Stats Section - Unique horizontal layout */}
            <section className="py-16 bg-muted/20">
                <div className="container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <p className="text-4xl md:text-5xl font-light text-primary mb-2">{stat.value}</p>
                                <p className="text-lg font-medium mb-1">{stat.label}</p>
                                <p className="text-sm text-muted-foreground">{stat.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section - Unique step-by-step layout */}
            <section className="py-24">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">
                            Get Started in 4 Simple Steps
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Join hundreds of brands that have transformed their business with Wardro8e
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="bg-card p-8 rounded-2xl border border-border text-center hover:border-primary transition-all duration-300">
                                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                                        {step.icon}
                                    </div>
                                    <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium">
                                        {step.number}
                                    </div>
                                    <h3 className="text-xl font-medium mb-4">{step.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section - Unique card layout with hover effects */}
            <section className="py-24 bg-gradient-to-br from-primary/10 to-primary/5">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">
                            Everything Your Brand Needs
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Powerful tools designed specifically for fashion brands to grow and succeed
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="bg-card p-8 rounded-2xl border border-border hover:border-primary transition-all duration-300 hover:shadow-xl relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="relative z-10">
                                        <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-xl font-medium mb-4">{feature.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section - Unique side-by-side layout */}
            <section className="py-24">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-serif font-light mb-8">
                                Why Brands Choose Wardro8e
                            </h2>
                            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                                Join hundreds of fashion brands that have transformed their business 
                                with our AI-powered platform. See real results, not just promises.
                            </p>
                            
                            <div className="space-y-6">
                                {benefits.map((benefit, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex items-start space-x-4"
                                    >
                                        <div className="bg-primary/10 p-3 rounded-lg text-primary flex-shrink-0">
                                            {benefit.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium mb-2">{benefit.title}</h3>
                                            <p className="text-muted-foreground">{benefit.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-3xl">
                                <div className="grid grid-cols-2 gap-6">
                                    {tools.map((tool, index) => (
                                        <div key={index} className="bg-card p-6 rounded-xl border border-border">
                                            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-primary">
                                                {tool.icon}
                                            </div>
                                            <h3 className="font-medium mb-2">{tool.title}</h3>
                                            <p className="text-sm text-muted-foreground">{tool.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
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
                    <h2 className="text-5xl md:text-6xl font-serif font-light mb-6">
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

            {/* Partner Brands - Unique grid */}
            <section className="py-24 bg-gradient-to-br from-primary/10 to-primary/5">
                <div className="container">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-serif font-light text-center mb-16"
                    >
                        Join 500+ Growing Sellers
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