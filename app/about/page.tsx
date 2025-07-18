"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Sparkles, Users, Shield, Target, Globe, Heart } from "lucide-react";

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

            {/* Brand Evolution Timeline - New Section */}
            <section className="py-24 bg-gradient-to-br from-primary/5 to-muted/30">
                <div className="container max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-serif font-light text-center mb-12">The Wardro8e Evolution</h2>
                    <div className="relative border-l-4 border-primary/20 pl-10">
                        {[
                            {
                                year: '2021',
                                title: 'A Vision is Born',
                                desc: 'Inspired by the desire to make fashion truly personal, our founders set out to build a platform where style is a journey, not a destination.',
                                img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop',
                            },
                            {
                                year: '2022',
                                title: 'Building the Dream',
                                desc: 'A diverse team of technologists, designers, and fashion lovers came together to blend AI with creative expression.',
                                img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop',
                            },
                            {
                                year: '2023',
                                title: 'First Connections',
                                desc: 'Our platform launched, connecting early adopters with emerging brands and unique styles. The community began to grow.',
                                img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&h=400&fit=crop',
                            },
                            {
                                year: '2024',
                                title: 'A Movement in Motion',
                                desc: 'Wardro8e is now a global movement, empowering thousands to discover, express, and evolve their style with confidence.',
                                img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop',
                            },
                        ].map((item, i) => (
                            <div key={i} className="mb-16 flex items-center group">
                                <div className="flex-shrink-0 w-24 h-24 rounded-full overflow-hidden border-4 border-primary/30 shadow-lg mr-8">
                                    <img src={item.img} alt={item.title} className="object-cover w-full h-full" />
                                </div>
                                <div>
                                    <div className="text-primary font-bold text-lg mb-1">{item.year}</div>
                                    <div className="text-2xl font-serif font-light mb-2 group-hover:text-primary transition-colors">{item.title}</div>
                                    <div className="text-muted-foreground text-base max-w-md">{item.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* New Team Section - Diverse, Modern, Aspirational */}
            <section className="py-24 bg-white dark:bg-muted/20">
                <div className="container">
                    <h2 className="text-4xl md:text-5xl font-serif font-light text-center mb-12">Meet the Visionaries</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            {
                                name: 'Maya Singh',
                                role: 'Founder & CEO',
                                img: 'https://randomuser.me/api/portraits/women/44.jpg',
                                bio: 'Maya leads with a passion for inclusivity and innovation, believing that technology can unlock new forms of self-expression in fashion.'
                            },
                            {
                                name: 'Jonas Müller',
                                role: 'Chief Technology Officer',
                                img: 'https://randomuser.me/api/portraits/men/32.jpg',
                                bio: 'Jonas architects the AI that powers Wardro8e, blending data science with a love for creative problem-solving.'
                            },
                            {
                                name: 'Aisha Bello',
                                role: 'Head of Community',
                                img: 'https://randomuser.me/api/portraits/women/68.jpg',
                                bio: 'Aisha builds bridges between brands and shoppers, fostering a vibrant, supportive style community.'
                            },
                            {
                                name: 'Lucas Chen',
                                role: 'Lead Product Designer',
                                img: 'https://randomuser.me/api/portraits/men/85.jpg',
                                bio: 'Lucas crafts beautiful, intuitive experiences that make every user feel seen and inspired.'
                            },
                        ].map((member, i) => (
                            <div key={i} className="bg-card p-8 rounded-3xl shadow-xl flex flex-col items-center text-center">
                                <img src={member.img} alt={member.name} width={96} height={96} className="rounded-full mb-4 object-cover w-24 h-24 border-4 border-primary/20" />
                                <div className="font-serif text-xl font-medium mb-1">{member.name}</div>
                                <div className="text-primary font-semibold mb-2">{member.role}</div>
                                <div className="text-muted-foreground text-sm">{member.bio}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Brand Manifesto - New Vision Section */}
            <section className="py-24 bg-gradient-to-br from-primary/10 to-primary/5">
                <div className="container max-w-2xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-serif font-light mb-8">Our Manifesto</h2>
                    <blockquote className="text-xl md:text-2xl italic text-muted-foreground mb-8">“Fashion is not about following trends. It’s about discovering yourself, celebrating difference, and connecting with a world of creative possibility.”</blockquote>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                        <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&h=400&fit=crop" alt="Creative fashion" width={300} height={200} className="rounded-2xl shadow-lg object-cover" />
                        <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600&h=400&fit=crop" alt="Diverse style" width={300} height={200} className="rounded-2xl shadow-lg object-cover" />
                    </div>
                </div>
            </section>

            {/* Call to Action - Join the Movement */}
            <section className="py-20 bg-primary/10">
                <div className="container text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-light mb-4">Ready to Shape the Future of Fashion?</h2>
                    <p className="text-lg text-muted-foreground mb-8">Join our global community of creators, dreamers, and innovators. Your style journey starts here.</p>
                    <a href="/for-shoppers" className="inline-block bg-primary text-primary-foreground px-10 py-4 text-lg rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-lg">Explore Wardro8e</a>
                </div>
            </section>
        </div>
    );
}