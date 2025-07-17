"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        subject: "General Inquiry",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log("Form submitted:", formData);
    };

    const contactInfo = [
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Email",
            details: ["hello@wardro8e.com", "support@wardro8e.com"],
        },
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Phone",
            details: ["+1 (555) 123-4567", "Mon-Fri 9am-6pm PST"],
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "Office",
            details: ["123 Fashion District", "San Francisco, CA 94103"],
        },
    ];

    const faqs = [
        {
            question: "How does the AI matching work?",
            answer: "Our AI analyzes your style preferences, shopping behavior, and feedback to create a unique style profile that continuously improves.",
        },
        {
            question: "Is it really free for shoppers?",
            answer: "Yes! Shoppers will always have free access to our platform and all its features.",
        },
        {
            question: "How do I become a partner brand?",
            answer: "Simply sign up for a brand account and our team will review your application within 48 hours.",
        },
        {
            question: "What kind of support do you offer?",
            answer: "We offer email support for all users, with priority support for paid brand accounts including dedicated account managers for Pro plans.",
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
                        Get In Touch
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll
                        respond as soon as possible.
                    </p>
                </motion.div>
            </section>

            {/* Contact Form and Info */}
            <section className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="bg-card p-8 rounded-2xl border border-border">
                            <h2 className="text-2xl font-medium mb-6">Send us a message</h2>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Subject</label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    >
                                        <option>General Inquiry</option>
                                        <option>Brand Partnership</option>
                                        <option>Technical Support</option>
                                        <option>Press Inquiry</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                                        placeholder="Tell us what's on your mind..."
                                    />
                                </div>
                                <button
                                    onClick={handleSubmit}
                                    className="w-full bg-primary text-primary-foreground py-3 rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 flex items-center justify-center group"
                                >
                                    Send Message
                                    <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-2xl font-medium mb-6">Contact Information</h3>
                            <div className="space-y-6">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className="flex items-start space-x-4">
                                        <div className="bg-primary/10 p-3 rounded-xl text-primary">
                                            {info.icon}
                                        </div>
                                        <div>
                                            <p className="font-medium mb-1">{info.title}</p>
                                            {info.details.map((detail, i) => (
                                                <p key={i} className="text-muted-foreground">
                                                    {detail}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="bg-card p-6 rounded-2xl border border-border">
                            <h4 className="font-medium mb-4 flex items-center">
                                <MessageSquare className="w-5 h-5 mr-2 text-primary" />
                                Quick Help
                            </h4>
                            <div className="space-y-3">
                                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                                    Visit our Help Center →
                                </a>
                                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                                    Check System Status →
                                </a>
                                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                                    Read Documentation →
                                </a>
                            </div>
                        </div>

                        {/* Response Time */}
                        <div className="bg-primary/5 p-6 rounded-2xl">
                            <div className="flex items-center mb-2">
                                <Clock className="w-5 h-5 mr-2 text-primary" />
                                <p className="font-medium">Average Response Time</p>
                            </div>
                            <p className="text-muted-foreground">
                                We typically respond within 2-4 hours during business hours.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FAQs */}
            <section className="container mt-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl font-serif font-light text-center mb-12">
                        Frequently Asked Questions
                    </h2>
                    <div className="grid gap-6">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-card p-6 rounded-xl border border-border"
                            >
                                <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                                <p className="text-muted-foreground">{faq.answer}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>
        </div>
    );
}