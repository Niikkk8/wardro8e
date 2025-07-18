"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Sparkles, Users, Shield, Target, Globe, Heart, Zap } from "lucide-react";

export default function AboutPage() {
    const values = [
        {
            icon: <Sparkles className="w-10 h-10" />,
            title: "Innovation",
            description: "Pushing boundaries with AI to create the future of fashion discovery.",
        },
        {
            icon: <Users className="w-10 h-10" />,
            title: "Community",
            description: "Building connections between brands and shoppers who share aesthetic values.",
        },
        {
            icon: <Shield className="w-10 h-10" />,
            title: "Trust",
            description: "Ensuring authenticity and quality in every brand partnership.",
        },
        {
            icon: <Heart className="w-10 h-10" />,
            title: "Passion",
            description: "Driven by our love for fashion and technology to create meaningful experiences.",
        },
    ];

    const milestones = [
        { year: "2022", event: "Founded with a vision to revolutionize fashion discovery", metric: "Day 1" },
        { year: "2023", event: "Launched AI-powered style matching algorithm", metric: "1K Users" },
        { year: "2024", event: "Reached 10,000 active users and 500 partner brands", metric: "10K Users" },
        { year: "2024", event: "Won Fashion Tech Award for Best AI Innovation", metric: "Industry Recognition" },
    ];

    const teamStats = [
        { number: "20+", label: "Team Members", description: "Passionate professionals" },
        { number: "8", label: "Countries", description: "Global perspective" },
        { number: "15+", label: "Years Experience", description: "Average in fashion/tech" },
        { number: "100%", label: "Dedication", description: "To our mission" },
    ];

    return (
        <div className="pt-32 pb-16">
            {/* Hero Section */}
            <section className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6">
                        <Globe className="w-4 h-4 text-primary mr-2" />
                        <span className="text-sm font-medium text-primary">Global Fashion Innovation</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light mb-8">
                        Revolutionizing Fashion
                        <span className="block text-primary mt-2">Discovery</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                        We believe that finding your perfect style shouldn&apos;t be an endless scroll
                        through generic recommendations. It should be an inspiring journey of self-expression.
                    </p>
                </motion.div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl mb-24"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop"
                        alt="Fashion retail innovation"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-12 left-12 right-12 text-white">
                        <h2 className="text-4xl font-serif font-light mb-4">Where Technology Meets Style</h2>
                        <p className="text-xl text-white/80 max-w-2xl">
                            Creating the future of personalized fashion discovery through innovative AI technology
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* Mission Section */}
            <section className="container mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-serif font-light mb-8">Our Mission</h2>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            At Wardro8e, we&apos;re on a mission to transform how people discover and
                            connect with fashion. By leveraging cutting-edge AI technology, we create
                            meaningful connections between style-conscious shoppers and the brands that
                            truly resonate with their aesthetic.
                        </p>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            We believe in the power of personal style as a form of self-expression, and
                            we&apos;re dedicated to making that expression more accessible, enjoyable, and
                            authentic for everyone.
                        </p>
                        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                            Our platform goes beyond simple recommendations. We&apos;re building a community
                            where fashion lovers can explore, discover, and connect with brands that align
                            with their values and aesthetic preferences.
                        </p>

                        <div className="flex items-center space-x-6 p-6 bg-card rounded-2xl border border-border">
                            <div className="bg-primary/10 p-4 rounded-2xl">
                                <Award className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <p className="font-medium text-xl">Fashion Tech Award 2024</p>
                                <p className="text-muted-foreground">
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
                        className="space-y-6"
                    >
                        <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl">
                            <Image
                                src="https://images.unsplash.com/photo-1556155092-490a1ba16284?w=600&h=400&fit=crop"
                                alt="AI Technology"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-card p-8 rounded-2xl border border-border text-center">
                                <p className="text-4xl font-light mb-2">2M+</p>
                                <p className="text-muted-foreground">Style Matches</p>
                            </div>
                            <div className="bg-card p-8 rounded-2xl border border-border text-center">
                                <p className="text-4xl font-light mb-2">98%</p>
                                <p className="text-muted-foreground">Accuracy Rate</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-muted/30">
                <div className="container">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-serif font-light text-center mb-16"
                    >
                        Our Core Values
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-primary group-hover:scale-110 transition-transform">
                                    {value.icon}
                                </div>
                                <h3 className="text-2xl font-medium mb-4">{value.title}</h3>
                                <p className="text-lg text-muted-foreground leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="container py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <div className="relative h-[250px] rounded-2xl overflow-hidden shadow-lg">
                                    <Image
                                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop"
                                        alt="Team collaboration"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="relative h-[200px] rounded-2xl overflow-hidden shadow-lg">
                                    <Image
                                        src="https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=400&h=250&fit=crop"
                                        alt="Fashion tech"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                            <div className="space-y-6 mt-12">
                                <div className="relative h-[200px] rounded-2xl overflow-hidden shadow-lg">
                                    <Image
                                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop"
                                        alt="Team member"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="relative h-[250px] rounded-2xl overflow-hidden shadow-lg">
                                    <Image
                                        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop"
                                        alt="Working together"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-serif font-light mb-8">Our Story</h2>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            Wardro8e was born from a simple frustration: why is it so hard to find clothes
                            that truly match our personal style? Our founders, a team of fashion enthusiasts
                            and tech innovators, came together with a shared vision.
                        </p>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            We realized that the problem wasn&apos;t the availability of fashion choices—it was
                            the overwhelming nature of those choices. Traditional fashion platforms show everyone
                            the same trending items, ignoring individual style preferences.
                        </p>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            That&apos;s when we decided to harness the power of AI to create a platform that
                            understands each person&apos;s unique style DNA. Today, we&apos;re proud to be helping
                            thousands of fashion lovers discover brands and pieces that truly resonate with them.
                        </p>

                        <div className="flex items-center space-x-4">
                            <Target className="w-6 h-6 text-primary" />
                            <p className="text-lg font-medium">Focused on personalization since day one</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-24 bg-primary/5">
                <div className="container">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-serif font-light text-center mb-16"
                    >
                        Our Journey
                    </motion.h2>
                    <div className="max-w-4xl mx-auto">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-center mb-12 last:mb-0"
                            >
                                <div className="bg-primary text-primary-foreground rounded-2xl px-6 py-3 min-w-[120px] text-center">
                                    <p className="text-xl font-medium">{milestone.year}</p>
                                    <p className="text-sm opacity-80">{milestone.metric}</p>
                                </div>
                                <div className="ml-8 flex-1 p-6 bg-card rounded-2xl border border-border">
                                    <p className="text-lg">{milestone.event}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="container py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">Meet Our Team</h2>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                        A passionate group of fashion enthusiasts, technologists, and designers working
                        together to reimagine fashion discovery.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                    {teamStats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-card p-8 rounded-2xl border border-border text-center"
                        >
                            <p className="text-4xl font-light mb-2">{stat.number}</p>
                            <p className="text-lg font-medium mb-1">{stat.label}</p>
                            <p className="text-sm text-muted-foreground">{stat.description}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-card p-12 rounded-3xl border border-border"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-3xl font-medium mb-6">Join Our Mission</h3>
                            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                                We&apos;re always looking for talented individuals who share our passion for
                                fashion and technology. If you&apos;re excited about revolutionizing how people
                                discover and connect with fashion, we&apos;d love to hear from you.
                            </p>
                            <a
                                href="#"
                                className="inline-flex items-center text-primary font-medium hover:underline"
                            >
                                View Open Positions
                                <Zap className="w-4 h-4 ml-2" />
                            </a>
                        </div>
                        <div className="relative h-[300px] rounded-2xl overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop"
                                alt="Team working"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Vision Section */}
            <section className="py-24 bg-gradient-to-br from-primary/10 to-primary/5">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif font-light mb-8">Our Vision for the Future</h2>
                        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12">
                            We envision a world where fashion discovery is effortless, personalized, and inspiring.
                            Where every shopping experience feels like it was curated just for you. Where independent
                            brands can connect with their perfect audience, and shoppers can express their unique
                            style with confidence.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <a
                                href="/for-shoppers"
                                className="bg-primary text-primary-foreground px-10 py-4 text-lg rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 inline-flex items-center group"
                            >
                                Join Our Community
                                <Heart className="ml-3 w-5 h-5 group-hover:scale-110 transition-transform" />
                            </a>
                            <a
                                href="/for-brands"
                                className="border-2 border-border text-foreground px-10 py-4 text-lg rounded-full hover:border-primary hover:text-primary transition-all duration-300"
                            >
                                Partner With Us
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}