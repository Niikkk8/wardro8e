"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
    Mail,
    Phone,
    MapPin,
    Send,
    MessageSquare,
    Clock,
    Globe,
    Shield,
    Zap,
    Users,
    Calendar,
    ArrowRight,
    Instagram,
    Twitter,
    Linkedin
} from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        userType: "shopper",
        subject: "General Inquiry",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    const contactInfo = [
        {
            icon: <Mail className="w-7 h-7" />,
            title: "Email",
            details: ["hello@wardro8e.com", "support@wardro8e.com"],
            action: "Email us",
            link: "mailto:hello@wardro8e.com"
        },
        {
            icon: <Phone className="w-7 h-7" />,
            title: "Phone",
            details: ["+1 (555) 123-4567", "Mon-Fri 9am-6pm PST"],
            action: "Call us",
            link: "tel:+15551234567"
        },
        {
            icon: <MapPin className="w-7 h-7" />,
            title: "Office",
            details: ["123 Fashion District", "San Francisco, CA 94103"],
            action: "Get directions",
            link: "#"
        },
    ];

    const faqs = [
        {
            question: "How does the AI matching work?",
            answer: "Our AI analyzes your style preferences, shopping behavior, and feedback to create a unique style profile that continuously improves with each interaction.",
        },
        {
            question: "Is it really free for shoppers?",
            answer: "Yes! Shoppers will always have free access to our platform and all its features. We believe in democratizing fashion discovery.",
        },
        {
            question: "How do I become a partner brand?",
            answer: "Simply sign up for a brand account and our team will review your application within 48 hours. We look for quality, authenticity, and unique design perspectives.",
        },
        {
            question: "What kind of support do you offer?",
            answer: "We offer email support for all users, with priority support for paid brand accounts including dedicated account managers for Pro plans.",
        },
        {
            question: "Can I integrate Wardro8e with my existing systems?",
            answer: "Yes! Our API allows seamless integration with your existing e-commerce platform, inventory management, and analytics tools.",
        },
        {
            question: "How do you ensure brand quality?",
            answer: "Every brand goes through our verification process where we assess quality, sustainability practices, and design authenticity.",
        },
    ];

    const departments = [
        {
            name: "Sales",
            email: "sales@wardro8e.com",
            description: "For partnership and pricing inquiries"
        },
        {
            name: "Support",
            email: "support@wardro8e.com",
            description: "For technical help and account issues"
        },
        {
            name: "Press",
            email: "press@wardro8e.com",
            description: "For media and PR inquiries"
        },
        {
            name: "Careers",
            email: "careers@wardro8e.com",
            description: "Join our growing team"
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
                        <MessageSquare className="w-4 h-4 text-primary mr-2" />
                        <span className="text-sm font-medium text-primary">We're Here to Help</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light mb-8">
                        Get In
                        <span className="block text-primary mt-2">Touch</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                        Have questions about our platform? Want to partner with us? Or just want to say hello?
                        We'd love to hear from you.
                    </p>
                </motion.div>
            </section>

            {/* Contact Options */}
            <section className="container mb-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {contactInfo.map((info, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-card p-10 rounded-3xl border border-border hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className="bg-primary/10 p-4 rounded-2xl text-primary mb-6 inline-flex group-hover:scale-110 transition-transform">
                                {info.icon}
                            </div>
                            <h3 className="text-2xl font-medium mb-4">{info.title}</h3>
                            {info.details.map((detail, i) => (
                                <p key={i} className="text-lg text-muted-foreground mb-2">
                                    {detail}
                                </p>
                            ))}
                            <a
                                href={info.link}
                                className="inline-flex items-center text-primary font-medium mt-4 hover:underline"
                            >
                                {info.action}
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Contact Form and Info */}
            <section className="py-24 bg-muted/30">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="bg-card p-10 rounded-3xl border border-border shadow-lg">
                                <h2 className="text-3xl font-medium mb-8">Send us a message</h2>

                                {!isSubmitted ? (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">First Name</label>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                                    placeholder="John"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Last Name</label>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                                    placeholder="Doe"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                                    placeholder="john@example.com"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Company (Optional)</label>
                                                <input
                                                    type="text"
                                                    name="company"
                                                    value={formData.company}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                                    placeholder="Your Company"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">I am a</label>
                                            <div className="flex space-x-6">
                                                <label className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="userType"
                                                        value="shopper"
                                                        checked={formData.userType === "shopper"}
                                                        onChange={handleChange}
                                                        className="mr-2"
                                                    />
                                                    <span>Shopper</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="userType"
                                                        value="brand"
                                                        checked={formData.userType === "brand"}
                                                        onChange={handleChange}
                                                        className="mr-2"
                                                    />
                                                    <span>Brand</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="userType"
                                                        value="other"
                                                        checked={formData.userType === "other"}
                                                        onChange={handleChange}
                                                        className="mr-2"
                                                    />
                                                    <span>Other</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">Subject</label>
                                            <select
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            >
                                                <option>General Inquiry</option>
                                                <option>Brand Partnership</option>
                                                <option>Technical Support</option>
                                                <option>Press Inquiry</option>
                                                <option>Careers</option>
                                                <option>Other</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">Message</label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                rows={6}
                                                className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                                                placeholder="Tell us what's on your mind..."
                                                required
                                            />
                                        </div>

                                        <button
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                            className="w-full bg-primary text-primary-foreground py-4 text-lg rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <span>Sending...</span>
                                            ) : (
                                                <>
                                                    Send Message
                                                    <Send className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Send className="w-10 h-10 text-primary" />
                                        </div>
                                        <h3 className="text-2xl font-medium mb-4">Message Sent!</h3>
                                        <p className="text-lg text-muted-foreground mb-8">
                                            Thanks for reaching out. We'll get back to you within 24 hours.
                                        </p>
                                        <button
                                            onClick={() => {
                                                setIsSubmitted(false);
                                                setFormData({
                                                    firstName: "",
                                                    lastName: "",
                                                    email: "",
                                                    company: "",
                                                    userType: "shopper",
                                                    subject: "General Inquiry",
                                                    message: "",
                                                });
                                            }}
                                            className="text-primary font-medium hover:underline"
                                        >
                                            Send another message
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Additional Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            {/* Department Contacts */}
                            <div className="bg-card p-8 rounded-3xl border border-border">
                                <h3 className="text-2xl font-medium mb-6">Contact Our Teams</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {departments.map((dept, index) => (
                                        <div key={index} className="p-6 bg-muted rounded-xl">
                                            <h4 className="font-medium text-lg mb-2">{dept.name}</h4>
                                            <p className="text-muted-foreground mb-2">{dept.description}</p>
                                            <a
                                                href={`mailto:${dept.email}`}
                                                className="text-primary hover:underline"
                                            >
                                                {dept.email}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Office Image */}
                            <div className="relative h-[300px] rounded-3xl overflow-hidden shadow-lg">
                                <Image
                                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop"
                                    alt="Wardro8e Office"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-8 left-8 right-8 text-white">
                                    <h3 className="text-2xl font-medium mb-2">Visit Our Office</h3>
                                    <p className="text-white/80">123 Fashion District, San Francisco, CA</p>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div className="bg-card p-8 rounded-3xl border border-border">
                                <h4 className="text-xl font-medium mb-6 flex items-center">
                                    <Zap className="w-6 h-6 mr-2 text-primary" />
                                    Quick Resources
                                </h4>
                                <div className="space-y-4">
                                    <a href="#" className="flex items-center text-lg text-muted-foreground hover:text-primary transition-colors">
                                        <MessageSquare className="w-5 h-5 mr-3" />
                                        Visit our Help Center
                                    </a>
                                    <a href="#" className="flex items-center text-lg text-muted-foreground hover:text-primary transition-colors">
                                        <Shield className="w-5 h-5 mr-3" />
                                        Check System Status
                                    </a>
                                    <a href="#" className="flex items-center text-lg text-muted-foreground hover:text-primary transition-colors">
                                        <Calendar className="w-5 h-5 mr-3" />
                                        Schedule a Demo
                                    </a>
                                    <a href="#" className="flex items-center text-lg text-muted-foreground hover:text-primary transition-colors">
                                        <Users className="w-5 h-5 mr-3" />
                                        Join Community Forum
                                    </a>
                                </div>
                            </div>

                            {/* Response Time */}
                            <div className="bg-primary/5 p-8 rounded-3xl">
                                <div className="flex items-center mb-4">
                                    <Clock className="w-6 h-6 mr-3 text-primary" />
                                    <p className="text-xl font-medium">Average Response Time</p>
                                </div>
                                <p className="text-lg text-muted-foreground mb-4">
                                    We typically respond within 2-4 hours during business hours.
                                </p>
                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    <div className="bg-card p-4 rounded-xl text-center">
                                        <p className="text-2xl font-light">2 hrs</p>
                                        <p className="text-sm text-muted-foreground">Email Response</p>
                                    </div>
                                    <div className="bg-card p-4 rounded-xl text-center">
                                        <p className="text-2xl font-light">5 min</p>
                                        <p className="text-sm text-muted-foreground">Chat Response</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="container py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl font-serif font-light text-center mb-16">
                        Frequently Asked Questions
                    </h2>
                    <div className="grid gap-8">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-card p-8 rounded-2xl border border-border hover:shadow-lg transition-all duration-300"
                            >
                                <h3 className="text-xl font-medium mb-3">{faq.question}</h3>
                                <p className="text-lg text-muted-foreground leading-relaxed">{faq.answer}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-lg text-muted-foreground mb-4">
                            Still have questions?
                        </p>
                        <a
                            href="#"
                            className="inline-flex items-center text-primary font-medium hover:underline"
                        >
                            Visit our Help Center
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                    </div>
                </motion.div>
            </section>

            {/* Social Media */}
            <section className="py-24 bg-primary/5">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h2 className="text-4xl font-serif font-light mb-8">
                            Connect With Us
                        </h2>
                        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                            Follow us on social media for the latest updates, fashion trends, and community highlights.
                        </p>
                        <div className="flex justify-center space-x-8">
                            <a
                                href="#"
                                className="bg-card p-6 rounded-2xl border border-border hover:border-primary transition-all duration-300 group"
                            >
                                <Instagram className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                            </a>
                            <a
                                href="#"
                                className="bg-card p-6 rounded-2xl border border-border hover:border-primary transition-all duration-300 group"
                            >
                                <Twitter className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                            </a>
                            <a
                                href="#"
                                className="bg-card p-6 rounded-2xl border border-border hover:border-primary transition-all duration-300 group"
                            >
                                <Linkedin className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}