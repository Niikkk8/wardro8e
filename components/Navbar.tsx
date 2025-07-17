"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface NavItem {
    name: string;
    href?: string;
    dropdown?: { name: string; href: string }[];
}

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems: NavItem[] = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        {
            name: "Solutions",
            dropdown: [
                { name: "For Shoppers", href: "/for-shoppers" },
                { name: "For Brands", href: "/for-brands" },
            ],
        },
        { name: "Pricing", href: "/pricing" },
        { name: "Contact", href: "/contact" },
    ];

    const isActive = (href: string) => pathname === href;

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-background/90 backdrop-blur-md shadow-sm py-4"
                    : "bg-transparent py-6"
                }`}
        >
            <div className="container flex items-center justify-between">
                <Link href="/" className="text-2xl font-light flex items-center">
                    <span className="font-serif tracking-wide">wardro</span>
                    <span className="text-primary">8</span>
                    <span className="font-serif tracking-wide">e</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <div key={item.name} className="relative">
                            {item.dropdown ? (
                                <div
                                    className="flex items-center space-x-1 cursor-pointer text-muted-foreground hover:text-primary transition-colors"
                                    onMouseEnter={() => setActiveDropdown(item.name)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <span>{item.name}</span>
                                    <ChevronDown className="w-4 h-4" />
                                    <AnimatePresence>
                                        {activeDropdown === item.name && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute top-full left-0 mt-2 w-48 bg-card rounded-lg shadow-lg py-2 border border-border"
                                            >
                                                {item.dropdown.map((dropItem) => (
                                                    <Link
                                                        key={dropItem.name}
                                                        href={dropItem.href}
                                                        className={`block px-4 py-2 hover:bg-muted hover:text-primary transition-colors ${isActive(dropItem.href)
                                                                ? "text-primary bg-muted"
                                                                : "text-muted-foreground"
                                                            }`}
                                                    >
                                                        {dropItem.name}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <Link
                                    href={item.href!}
                                    className={`transition-colors ${isActive(item.href!)
                                            ? "text-primary"
                                            : "text-muted-foreground hover:text-primary"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            )}
                        </div>
                    ))}

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-muted transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? (
                            <Sun className="w-5 h-5" />
                        ) : (
                            <Moon className="w-5 h-5" />
                        )}
                    </button>

                    <Link
                        href="/contact"
                        className="bg-primary text-primary-foreground px-6 py-2 rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center space-x-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-muted transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? (
                            <Sun className="w-5 h-5" />
                        ) : (
                            <Moon className="w-5 h-5" />
                        )}
                    </button>
                    <button
                        className="text-foreground"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background/95 backdrop-blur-md border-t border-border"
                    >
                        <div className="container py-4 space-y-4">
                            {navItems.map((item) => (
                                <div key={item.name}>
                                    {item.dropdown ? (
                                        <>
                                            <div className="text-muted-foreground py-2">{item.name}</div>
                                            <div className="ml-4 space-y-2">
                                                {item.dropdown.map((dropItem) => (
                                                    <Link
                                                        key={dropItem.name}
                                                        href={dropItem.href}
                                                        className={`block py-1 text-sm ${isActive(dropItem.href)
                                                                ? "text-primary"
                                                                : "text-muted-foreground"
                                                            }`}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        {dropItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <Link
                                            href={item.href!}
                                            className={`block py-2 ${isActive(item.href!)
                                                    ? "text-primary"
                                                    : "text-muted-foreground"
                                                }`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                            <Link
                                href="/contact"
                                className="block w-full bg-primary text-primary-foreground px-6 py-2 rounded-full text-center"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Get Started
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;