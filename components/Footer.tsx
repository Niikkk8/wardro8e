"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Instagram,
    Twitter,
    Linkedin,
    Mail,
    ArrowRight,
    Sparkles,
    Heart,
    Globe,
    Shield
} from "lucide-react";
import { useTheme } from "./ThemeProvider";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { theme } = useTheme();
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle subscription
        setIsSubscribed(true);
        setTimeout(() => {
            setIsSubscribed(false);
            setEmail("");
        }, 3000);
    };

    const footerLinks = {
        Platform: [
            { name: "For Shoppers", href: "/for-shoppers" },
            { name: "For Brands", href: "/for-brands" },
            { name: "Pricing", href: "/pricing" },
            { name: "API Documentation", href: "#" },
            { name: "Mobile App", href: "#" },
        ],
        Company: [
            { name: "About", href: "/about" },
            { name: "Careers", href: "#", badge: "We're hiring!" },
            { name: "Blog", href: "#" },
            { name: "Press Kit", href: "#" },
            { name: "Contact", href: "/contact" },
        ],
        Resources: [
            { name: "Help Center", href: "#" },
            { name: "Community", href: "#" },
            { name: "Style Guide", href: "#" },
            { name: "Brand Guidelines", href: "#" },
            { name: "Affiliate Program", href: "#" },
        ],
        Legal: [
            { name: "Privacy Policy", href: "#" },
            { name: "Terms of Service", href: "#" },
            { name: "Cookie Policy", href: "#" },
            { name: "GDPR", href: "#" },
            { name: "Licenses", href: "#" },
        ],
    };

    const socialLinks = [
        { icon: Instagram, href: "#", label: "Instagram" },
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
    ];

    const badges = [
        { icon: Shield, label: "SOC 2 Certified" },
        { icon: Globe, label: "GDPR Compliant" },
        { icon: Heart, label: "Carbon Neutral" },
    ];

    return (
        <footer className="bg-muted/50 pt-20 pb-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="container relative">
                {/* Newsletter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-card rounded-3xl p-12 mb-16 border border-border shadow-lg"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-3xl md:text-4xl font-serif font-light mb-4">
                                Stay in the Loop
                            </h3>
                            <p className="text-lg text-muted-foreground">
                                Get the latest fashion trends, platform updates, and exclusive offers delivered to your inbox.
                            </p>
                        </div>
                        <div>
                            {!isSubscribed ? (
                                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="flex-1 px-6 py-4 rounded-full border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-lg"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="bg-primary text-primary-foreground px-8 py-4 rounded-full hover:opacity-90 transition-all hover:scale-105 flex items-center justify-center group text-lg font-medium"
                                    >
                                        Subscribe
                                        <Mail className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </form>
                            ) : (
                                <div className="flex items-center justify-center p-4 bg-primary/10 rounded-full">
                                    <Sparkles className="w-6 h-6 text-primary mr-3" />
                                    <span className="text-lg text-primary font-medium">Thanks for subscribing!</span>
                                </div>
                            )}
                            <p className="text-sm text-muted-foreground mt-4">
                                By subscribing, you agree to our Privacy Policy and consent to receive updates.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
                    {/* Brand Column - Spans 2 columns */}
                    <div className="col-span-1 lg:col-span-2">
                        <Link
                            href="/"
                            className={`text-3xl font-medium flex items-center mb-6 transform transition-transform duration-300 hover:scale-105 ${theme === "dark" ? "text-white" : "text-gray-900"
                                }`}
                        >
                            <span className="font-serif tracking-wide">wardro</span>
                            <span className="text-teal-500">8</span>
                            <span className="font-serif tracking-wide">e</span>
                        </Link>
                        <p className="text-lg text-muted-foreground mb-6 max-w-sm">
                            AI-powered fashion discovery connecting unique brands with
                            style-conscious shoppers worldwide.
                        </p>
                        <div className="flex space-x-4 mb-8">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        className="bg-card p-3 rounded-xl border border-border hover:border-primary hover:text-primary transition-all duration-300 group"
                                        aria-label={social.label}
                                    >
                                        <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    </a>
                                );
                            })}
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {badges.map((badge) => {
                                const Icon = badge.icon;
                                return (
                                    <div key={badge.label} className="flex items-center text-sm text-muted-foreground">
                                        <Icon className="w-4 h-4 mr-2" />
                                        {badge.label}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Links Columns */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category} className="col-span-1">
                            <h4 className="font-medium text-lg mb-6">{category}</h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                                        >
                                            {link.name}
                                            {link.badge && (
                                                <span className="ml-2 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                                    {link.badge}
                                                </span>
                                            )}
                                            <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* App Download Section */}
                <div className="bg-card rounded-2xl p-8 mb-12 border border-border">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h4 className="text-xl font-medium mb-2">Get the Wardro8e App</h4>
                            <p className="text-muted-foreground">Shop your style on the go with our mobile app.</p>
                        </div>
                        <div className="flex gap-4">
                            <button className="bg-black text-white px-6 py-3 rounded-xl hover:opacity-80 transition-opacity">
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                    </svg>
                                    <div className="text-left">
                                        <div className="text-xs">Download on the</div>
                                        <div className="text-sm font-medium">App Store</div>
                                    </div>
                                </div>
                            </button>
                            <button className="bg-black text-white px-6 py-3 rounded-xl hover:opacity-80 transition-opacity">
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z" />
                                    </svg>
                                    <div className="text-left">
                                        <div className="text-xs">Get it on</div>
                                        <div className="text-sm font-medium">Google Play</div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-border pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                            <p className="text-sm text-muted-foreground">
                                © {currentYear} Wardro8e. All rights reserved.
                            </p>
                            <div className="flex space-x-6 text-sm text-muted-foreground">
                                <Link href="#" className="hover:text-primary transition-colors">
                                    Sitemap
                                </Link>
                                <Link href="#" className="hover:text-primary transition-colors">
                                    Security
                                </Link>
                                <Link href="#" className="hover:text-primary transition-colors">
                                    Status
                                </Link>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center">
                            Made with <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" /> for fashion lovers
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;