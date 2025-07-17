"use client";

import React from "react";
import Link from "next/link";
import { Instagram, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        Platform: [
            { name: "For Shoppers", href: "/for-shoppers" },
            { name: "For Brands", href: "/for-brands" },
            { name: "Pricing", href: "/pricing" },
            { name: "API", href: "#" },
        ],
        Company: [
            { name: "About", href: "/about" },
            { name: "Careers", href: "#" },
            { name: "Blog", href: "#" },
            { name: "Contact", href: "/contact" },
        ],
        Support: [
            { name: "Help Center", href: "#" },
            { name: "Privacy Policy", href: "#" },
            { name: "Terms of Service", href: "#" },
            { name: "Status", href: "#" },
        ],
    };

    const socialLinks = [
        { icon: Instagram, href: "#", label: "Instagram" },
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
    ];

    return (
        <footer className="bg-muted/50 pt-16 pb-8">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Column */}
                    <div className="col-span-1">
                        <Link href="/" className="text-2xl font-light flex items-center mb-4">
                            <span className="font-serif tracking-wide">wardro</span>
                            <span className="text-primary">8</span>
                            <span className="font-serif tracking-wide">e</span>
                        </Link>
                        <p className="text-muted-foreground mb-4">
                            AI-powered fashion discovery connecting unique brands with
                            style-conscious shoppers.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                        aria-label={social.label}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Links Columns */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="font-medium mb-4">{category}</h4>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Newsletter Section */}
                <div className="border-t border-border pt-8 mb-8">
                    <div className="max-w-md mx-auto text-center md:text-left md:mx-0">
                        <h4 className="font-medium mb-2">Stay in Style</h4>
                        <p className="text-muted-foreground mb-4">
                            Get the latest fashion trends and platform updates.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 rounded-full border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            />
                            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-full hover:opacity-90 transition-all">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-muted-foreground text-sm">
                        © {currentYear} Wardro8e. All rights reserved.
                    </p>
                    <p className="text-muted-foreground text-sm">
                        Made with ❤️ for fashion lovers
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;