"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Instagram,
    Twitter,
    Linkedin,
    ArrowRight,
    Globe,
    Shield,
    Heart
} from "lucide-react";
import { useTheme } from "./ThemeProvider";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { theme } = useTheme();
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);

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
                                            {"badge" in link && link.badge && (
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