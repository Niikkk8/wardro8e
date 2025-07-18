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

            {/* Editorial Our Journey timeline */}
            <section className="py-16 bg-muted/30">
                <div className="container max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-serif font-light mb-8 text-center">Our Journey</h2>
                    <div className="relative pl-8">
                        <div className="absolute left-4 top-0 bottom-0 w-1 bg-primary/20 rounded-full" />
                        {[{year:'2022',event:'Founded with a vision to revolutionize fashion discovery'},{year:'2023',event:'Launched AI-powered style matching algorithm'},{year:'2024',event:'Reached 10,000 active users and 500 partner brands'},{year:'2024',event:'Won Fashion Tech Award for Best AI Innovation'}].map((m,i)=>(
                            <div key={i} className="mb-12 flex items-start relative">
                                <div className="absolute -left-7 top-2 w-5 h-5 bg-primary rounded-full border-4 border-white shadow-lg" />
                                <div className="ml-8">
                                    <div className="text-primary font-semibold mb-1">{m.year}</div>
                                    <div className="text-base text-muted-foreground">{m.event}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Values section with tasteful SVG icons and more detail */}
            <section className="py-16 bg-gradient-to-br from-primary/10 to-primary/5">
                <div className="container">
                    <h2 className="text-3xl md:text-4xl font-serif font-light mb-8 text-center">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="bg-card p-6 rounded-2xl shadow-md flex flex-col items-center">
                            <svg className="w-8 h-8 text-primary mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
                            <h3 className="font-medium mb-2 text-center">Innovation</h3>
                            <p className="text-sm text-muted-foreground text-center">We push boundaries with AI and technology to create the future of fashion discovery and personalization.</p>
                        </div>
                        <div className="bg-card p-6 rounded-2xl shadow-md flex flex-col items-center">
                            <svg className="w-8 h-8 text-primary mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 20h5v-2a4 4 0 0 0-3-3.87M9 20H4v-2a4 4 0 0 1 3-3.87M17 8V7a5 5 0 0 0-10 0v1a5 5 0 0 0 10 0z" /></svg>
                            <h3 className="font-medium mb-2 text-center">Community</h3>
                            <p className="text-sm text-muted-foreground text-center">We build connections between brands and shoppers who share values, style, and vision for a better industry.</p>
                        </div>
                        <div className="bg-card p-6 rounded-2xl shadow-md flex flex-col items-center">
                            <svg className="w-8 h-8 text-primary mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7c0 6 8 10 8 10z" /></svg>
                            <h3 className="font-medium mb-2 text-center">Trust</h3>
                            <p className="text-sm text-muted-foreground text-center">We ensure authenticity, privacy, and quality in every partnership and user experience.</p>
                        </div>
                        <div className="bg-card p-6 rounded-2xl shadow-md flex flex-col items-center">
                            <svg className="w-8 h-8 text-primary mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 1.01 4.5 2.09C13.09 4.01 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                            <h3 className="font-medium mb-2 text-center">Passion</h3>
                            <p className="text-sm text-muted-foreground text-center">We are driven by a love for fashion, technology, and helping people express themselves.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Team section as modern grid with real photos, names, roles, and short bios */}
            <section className="py-16 bg-muted/30">
                <div className="container">
                    <h2 className="text-3xl md:text-4xl font-serif font-light mb-8 text-center">Meet Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="bg-card p-6 rounded-2xl shadow-md flex flex-col items-center">
                            <Image src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=200&h=200&fit=crop" alt="Ava Patel" className="rounded-full mb-3 object-cover w-20 h-20" />
                            <h3 className="font-medium text-center">Ava Patel</h3>
                            <p className="text-xs text-muted-foreground text-center mb-2">Co-Founder & CEO</p>
                            <p className="text-xs text-muted-foreground text-center">Ava leads Wardro8e with a vision for a more personal, inclusive, and tech-driven fashion world.</p>
                        </div>
                        <div className="bg-card p-6 rounded-2xl shadow-md flex flex-col items-center">
                            <Image src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&h=200&fit=crop" alt="Liam Chen" className="rounded-full mb-3 object-cover w-20 h-20" />
                            <h3 className="font-medium text-center">Liam Chen</h3>
                            <p className="text-xs text-muted-foreground text-center mb-2">CTO</p>
                            <p className="text-xs text-muted-foreground text-center">Liam is passionate about building scalable AI and empowering users with smart technology.</p>
                        </div>
                        <div className="bg-card p-6 rounded-2xl shadow-md flex flex-col items-center">
                            <Image src="https://images.unsplash.com/photo-1519340333755-c1aa5571fd46?w=200&h=200&fit=crop" alt="Sofia Rossi" className="rounded-full mb-3 object-cover w-20 h-20" />
                            <h3 className="font-medium text-center">Sofia Rossi</h3>
                            <p className="text-xs text-muted-foreground text-center mb-2">Head of Design</p>
                            <p className="text-xs text-muted-foreground text-center">Sofia brings creativity and a user-first approach to every design decision at Wardro8e.</p>
                        </div>
                        <div className="bg-card p-6 rounded-2xl shadow-md flex flex-col items-center">
                            <Image src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop" alt="Noah Kim" className="rounded-full mb-3 object-cover w-20 h-20" />
                            <h3 className="font-medium text-center">Noah Kim</h3>
                            <p className="text-xs text-muted-foreground text-center mb-2">Lead Engineer</p>
                            <p className="text-xs text-muted-foreground text-center">Noah ensures our platform is fast, reliable, and always evolving for our users.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Vision section as large immersive image with overlay and concise statement */}
            <section className="relative py-24">
                <Image src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=1200&h=400&fit=crop" alt="Vision" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                <div className="container relative z-10 flex flex-col items-center justify-center min-h-[300px]">
                    <h2 className="text-3xl md:text-4xl font-serif font-light mb-4 text-white drop-shadow-lg">Our Vision</h2>
                    <p className="text-lg text-white/90 max-w-2xl text-center drop-shadow">Fashion discovery should be inspiring, personal, and effortless for everyone.</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-0" />
            </section>

            {/* Add Why We Exist micro-section */}
            <section className="py-10 bg-muted/50">
                <div className="container flex flex-col items-center">
                    <div className="flex items-center gap-3 mb-2"><span className="text-2xl">✨</span><span className="font-serif text-lg font-light">Why We Exist</span></div>
                    <blockquote className="text-center text-muted-foreground max-w-xl italic">“We believe personal style is a journey, not a destination. Our mission is to empower everyone to discover, express, and evolve their unique fashion identity.”</blockquote>
                </div>
            </section>

            {/* What Drives Us section visually distinct but consistent */}
            <section className="py-12 bg-muted/50">
                <div className="container max-w-2xl mx-auto text-center">
                    <h3 className="text-xl font-serif font-light mb-4">What Drives Us</h3>
                    <p className="text-base text-muted-foreground">Wardro8e was founded to make fashion discovery more meaningful and accessible. We believe in empowering people to express their individuality, connect with brands that share their values, and enjoy a more sustainable, authentic shopping experience. Our mission is to blend technology and creativity to help everyone find their unique style journey.</p>
                </div>
            </section>
        </div>
    );
}