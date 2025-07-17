"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Sparkles, Users, Shield } from "lucide-react";

export default function AboutPage() {
    const values = [
        {
            icon: <Sparkles className="w-8 h-8" />,
            title: "Innovation",
            description: "Pushing boundaries with AI to create the future of fashion discovery.",
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Community",
            description: "Building connections between brands and shoppers who share aesthetic values.",
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Trust",
            description: "Ensuring authenticity and quality in every brand partnership.",
        },
    ];

    const milestones = [
        { year: "2022", event: "Founded with a vision to revolutionize fashion discovery" },
        { year: "2023", event: "Launched AI-powered style matching algorithm" },
        { year: "2024", event: "Reached 10,000 active users and 500 partner brands" },
        { year: "2024", event: "Won Fashion Tech Award for Best AI Innovation" },
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
                        Revolutionizing Fashion Discovery
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        We believe that finding your perfect style shouldn&apos;t be an endless scroll
                        through generic recommendations.
                    </p>
                </motion.div>
            </section>

            {/* Mission Section */}
            <section className="container mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-serif font-light mb-6">Our Mission</h2>
                        <p className="text-muted-foreground mb-4">
                            At Wardro8e, we&apos;re on a mission to transform how people discover and
                            connect with fashion. By leveraging cutting-edge AI technology, we create
                            meaningful connections between style-conscious shoppers and the brands that
                            truly resonate with their aesthetic.
                        </p>
                        <p className="text-muted-foreground mb-6">
                            We believe in the power of personal style as a form of self-expression, and
                            we&apos;re dedicated to making that expression more accessible, enjoyable, and
                            authentic for everyone.
                        </p>
                        <div className="flex items-center space-x-4 p-4 bg-card rounded-xl border border-border">
                            <div className="bg-primary/10 p-3 rounded-xl">
                                <Award className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="font-medium">Fashion Tech Award 2024</p>
                                <p className="text-muted-foreground text-sm">
                                    Best AI Innovation in Fashion
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&h=400&fit=crop"
                                alt="Fashion retail"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-8 -left-8 bg-card p-6 rounded-xl shadow-lg border border-border">
                            <p className="text-3xl font-light">2M+</p>
                            <p className="text-muted-foreground">Style Matches Made</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="container mt-32">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-3xl font-serif font-light text-center mb-12"
                >
                    Our Values
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                                {value.icon}
                            </div>
                            <h3 className="text-xl font-medium mb-2">{value.title}</h3>
                            <p className="text-muted-foreground">{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Timeline Section */}
            <section className="container mt-32">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-3xl font-serif font-light text-center mb-12"
                >
                    Our Journey
                </motion.h2>
                <div className="max-w-3xl mx-auto">
                    {milestones.map((milestone, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-center mb-8 last:mb-0"
                        >
                            <div className="bg-primary text-primary-foreground rounded-full px-4 py-2 min-w-[80px] text-center">
                                {milestone.year}
                            </div>
                            <div className="ml-6 flex-1 p-4 bg-card rounded-lg border border-border">
                                <p className="text-muted-foreground">{milestone.event}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Team Section */}
            <section className="container mt-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-3xl font-serif font-light mb-6">Meet Our Team</h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
                        A passionate group of fashion enthusiasts, technologists, and designers working
                        together to reimagine fashion discovery.
                    </p>
                    <div className="bg-card p-12 rounded-3xl border border-border">
                        <p className="text-2xl font-light mb-4">20+ Talented Individuals</p>
                        <p className="text-muted-foreground">
                            From AI engineers to fashion curators, our diverse team brings together the
                            best of technology and style.
                        </p>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}