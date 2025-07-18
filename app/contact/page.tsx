"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
    Mail,
    Phone,
    MapPin,
    MessageSquare,
    ArrowRight,
    Instagram,
    Twitter,
    Linkedin
} from "lucide-react";

export default function ContactPage() {

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
                        <span className="text-sm font-medium text-primary">We&apos;re Here to Help</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light mb-8">
                        Get In&nbsp;
                        <span className="text-primary mt-2">Touch</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                        Have questions about our platform? Want to partner with us? Or just want to say hello?
                        We&apos;d love to hear from you.
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

            {/* Clean, elegant contact form */}
            <section className="py-12 bg-muted/30">
                <div className="container flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1 flex flex-col items-start gap-4 border-r border-border pr-0 md:pr-8 md:border-r">
                        <h2 className="text-3xl md:text-4xl font-serif font-light mb-2">Contact Us</h2>
                        <p className="text-base text-muted-foreground">Have a question or want to partner with us? Reach out and our team will get back to you soon.</p>
                        <ul className="mb-2 space-y-1">
                            <li><span className="font-medium">Email:</span> <a href="mailto:hello@wardro8e.com" className="text-primary hover:underline">hello@wardro8e.com</a></li>
                            <li><span className="font-medium">Office:</span> 123 Fashion District, San Francisco, CA</li>
                        </ul>
                        <div className="rounded-2xl overflow-hidden shadow-lg w-full max-w-xs h-32">
                            <Image src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=200&fit=crop" alt="Office" width={200} height={128} className="object-cover w-full h-full" />
                        </div>
                    </div>
                    <div className="flex-1 w-full max-w-md">
                        <form className="bg-white/80 backdrop-blur-md border border-primary/20 shadow-2xl p-8 rounded-2xl flex flex-col gap-6">
                            <div>
                                <label htmlFor="contact-name" className="block text-sm font-medium mb-2 text-muted-foreground">Your Name</label>
                                <input type="text" name="name" id="contact-name" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all text-base" required />
                            </div>
                            <div>
                                <label htmlFor="contact-email" className="block text-sm font-medium mb-2 text-muted-foreground">Your Email</label>
                                <input type="email" name="email" id="contact-email" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all text-base" required />
                            </div>
                            <div>
                                <label htmlFor="contact-message" className="block text-sm font-medium mb-2 text-muted-foreground">Your Message</label>
                                <textarea name="message" id="contact-message" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all text-base resize-none" rows={4} required />
                            </div>
                            <button type="submit" className="bg-gradient-to-r from-primary to-primary/70 text-white px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition-all hover:scale-105 text-base font-semibold">Send Message</button>
                            {/* Success message placeholder */}
                            {/* <div className="text-green-600 text-center font-medium mt-2">Thank you! We'll be in touch soon.</div> */}
                        </form>
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