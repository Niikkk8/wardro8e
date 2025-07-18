"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Heart,
  TrendingUp,
  ArrowRight,
  Star,
  Zap,
  Shield,
  Users,
  Clock,
  Award
} from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: <Sparkles className="w-7 h-7" />,
      title: "AI Style Matching",
      description: "Our advanced AI learns your preferences to curate a personalized fashion feed that evolves with your style.",
    },
    {
      icon: <Heart className="w-7 h-7" />,
      title: "Unique Brands",
      description: "Discover independent designers and emerging brands that match your aesthetic, not just mass-market trends.",
    },
    {
      icon: <TrendingUp className="w-7 h-7" />,
      title: "Style Evolution",
      description: "Track your style journey and receive trend predictions tailored specifically to your evolving taste.",
    },
  ];

  const stats = [
    { value: "10K+", label: "Active Shoppers", description: "Fashion enthusiasts" },
    { value: "500+", label: "Partner Brands", description: "Curated designers" },
    { value: "98%", label: "Match Accuracy", description: "AI precision" },
    { value: "2M+", label: "Style Matches", description: "Happy connections" },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="container min-h-[90vh] flex items-center py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Zap className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">AI-Powered Fashion Discovery</span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-light mb-8 leading-tight">
              Where AI Meets
              <span className="block text-primary mt-2">Personal Style</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed">
              Discover fashion that speaks to your soul. Our AI-powered platform creates
              meaningful connections between you and brands that truly understand your
              individual style DNA.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 mb-16">
              <Link
                href="/for-shoppers"
                className="bg-primary text-primary-foreground px-10 py-4 text-lg rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 flex items-center justify-center group"
              >
                Start Shopping
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/for-brands"
                className="border-2 border-border text-foreground px-10 py-4 text-lg rounded-full hover:border-primary hover:text-primary transition-all duration-300"
              >
                I&apos;m a Brand
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                >
                  <p className="text-4xl font-light">{stat.value}</p>
                  <p className="text-base font-medium">{stat.label}</p>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-[320px] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop"
                    alt="Fashion 1"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="relative h-[200px] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop"
                    alt="Fashion 2"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="space-y-6 mt-12">
                <div className="relative h-[200px] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=300&fit=crop"
                    alt="Fashion 3"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="relative h-[320px] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=600&fit=crop"
                    alt="Fashion 4"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background rounded-full p-4 shadow-2xl">
              <Sparkles className="w-10 h-10 text-primary animate-pulse" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-serif font-light mb-6">
              Why Choose Wardro8e?
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Experience the future of fashion discovery with our cutting-edge AI technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-border group hover:-translate-y-2"
              >
                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-medium mb-4">{feature.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Now / Inspiration Grid */}
      <section className="py-24 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-serif font-light mb-6">
              Trending Now
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Explore the latest looks and inspiration from our AI-powered style feed.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1,2,3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * i }}
                viewport={{ once: true }}
                className="relative h-[500px] rounded-3xl overflow-hidden shadow-xl group"
              >
                <Image
                  src={`https://images.unsplash.com/photo-15${i+3}9109136881-3be0616acf4b?w=600&h=800&fit=crop`}
                  alt={`Trending fashion ${i}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-2xl font-medium text-white mb-2">{['Minimalist Edit','Urban Street','Sustainable Picks'][i-1]}</h3>
                  <p className="text-white/80">{['Clean lines, timeless pieces','Bold statements, comfort first','Eco-conscious style'][i-1]}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Style Profiling */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-4">AI Style Profiling</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">Our advanced AI creates a detailed style profile based on your preferences and fashion choices.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-2xl shadow-lg flex flex-col items-center">
              <Sparkles className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">Personal Style DNA Mapping</h3>
              <p className="text-base text-muted-foreground">Our AI analyzes thousands of style attributes to create your unique fashion fingerprint.</p>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-lg flex flex-col items-center">
              <TrendingUp className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">Personalized Trend Prediction</h3>
              <p className="text-base text-muted-foreground">Get curated trend forecasts that align with your unique style preferences.</p>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-lg flex flex-col items-center">
              <Heart className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">Style Evolution Tracking</h3>
              <p className="text-base text-muted-foreground">Our AI learns and evolves with you, continuously refining recommendations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-4">How Wardro8e Works</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">Your personal style journey in three simple steps</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-primary text-primary-foreground w-14 h-14 rounded-full flex items-center justify-center mb-4 text-xl font-medium">1</div>
              <h3 className="text-lg font-medium mb-2">Express Your Style</h3>
              <p className="text-base text-muted-foreground text-center">Take our fun style quiz that helps our AI understand your unique preferences and fashion inspirations.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary text-primary-foreground w-14 h-14 rounded-full flex items-center justify-center mb-4 text-xl font-medium">2</div>
              <h3 className="text-lg font-medium mb-2">Discover Your Fashion Universe</h3>
              <p className="text-base text-muted-foreground text-center">Explore your personalized feed featuring brands and pieces that align with your unique style DNA.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary text-primary-foreground w-14 h-14 rounded-full flex items-center justify-center mb-4 text-xl font-medium">3</div>
              <h3 className="text-lg font-medium mb-2">Connect With Style Soulmates</h3>
              <p className="text-base text-muted-foreground text-center">Engage with brands that match your aesthetic. Save favorites and create collection boards that evolve with your style.</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/for-shoppers" className="bg-primary text-primary-foreground px-8 py-3 text-base rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 inline-flex items-center group">
              Get Started Now
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Early Access */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-4">Join the Fashion Revolution</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">Be among the first to experience the future of personalized fashion discovery. Sign up for early access and help shape the platform that will transform how you discover and connect with fashion.</p>
          </motion.div>
          <form className="max-w-xl mx-auto flex flex-col md:flex-row gap-4 justify-center">
            <input type="email" placeholder="Enter your email" className="flex-1 px-6 py-3 rounded-full border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base" required />
            <button type="submit" className="bg-primary text-primary-foreground px-8 py-3 rounded-full hover:opacity-90 transition-all hover:scale-105 flex items-center justify-center group text-base font-medium">Get Early Access <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></button>
          </form>
          <ul className="flex flex-col md:flex-row gap-4 justify-center mt-6 text-muted-foreground text-sm">
            <li>AI-powered style recommendations tailored just for you</li>
            <li>Discover independent brands that match your aesthetic</li>
            <li>Early adopter perks and exclusive limited collections</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-4">Frequently Asked Questions</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">Everything you need to know about Wardro8e and how it works.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card p-6 rounded-2xl shadow-md">
              <h3 className="font-medium mb-2">How does Wardro8e&apos;s AI styling work?</h3>
              <p className="text-sm text-muted-foreground">Our AI analyzes thousands of style attributes and your interactions with the platform to understand your unique preferences. It creates a personalized style profile that continually evolves as you engage with more content, ensuring increasingly accurate recommendations that reflect your personal taste.</p>
            </div>
            <div className="bg-card p-6 rounded-2xl shadow-md">
              <h3 className="font-medium mb-2">Is Wardro8e free for shoppers?</h3>
              <p className="text-sm text-muted-foreground">Yes, Wardro8e is completely free for shoppers. We believe in making personalized fashion discovery accessible to everyone. Our revenue comes from partnerships with brands and retailers featured on our platform.</p>
            </div>
            <div className="bg-card p-6 rounded-2xl shadow-md">
              <h3 className="font-medium mb-2">How do brands join the Wardro8e platform?</h3>
              <p className="text-sm text-muted-foreground">Brands can apply through our partner portal. After a brief review process to ensure quality and authenticity, approved brands can upload their collections and gain access to our analytics dashboard to connect with shoppers who truly appreciate their aesthetic.</p>
            </div>
            <div className="bg-card p-6 rounded-2xl shadow-md">
              <h3 className="font-medium mb-2">Can I save items for later?</h3>
              <p className="text-sm text-muted-foreground">Absolutely! You can save items to your personal collection boards, organized by categories or occasions of your choice. This helps our AI further understand your preferences while giving you easy access to your favorite discoveries.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-serif font-light mb-6">
              What Our Community Says
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of satisfied shoppers and brands
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-card p-10 rounded-3xl border border-border"
            >
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-xl mb-6 leading-relaxed">
                &quot;Wardro8e completely transformed how I shop. The AI recommendations are
                spot-on, and I&apos;ve discovered amazing brands I never would have found otherwise.&quot;
              </p>
              <div className="flex items-center">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                    alt="Customer"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-lg">Sarah Chen</p>
                  <p className="text-muted-foreground">Fashion Enthusiast</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-card p-10 rounded-3xl border border-border"
            >
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-xl mb-6 leading-relaxed">
                &quot;As a brand, Wardro8e helped us reach our exact target audience.
                Our sales increased by 300% in just 6 months!&quot;
              </p>
              <div className="flex items-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mr-4">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-lg">Nordic Style Co.</p>
                  <p className="text-muted-foreground">Partner Brand</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 to-primary/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container text-center"
        >
          <h2 className="text-5xl md:text-6xl font-serif font-light mb-6">
            Ready to Transform Your Style Journey?
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Join thousands of fashion lovers who&apos;ve discovered their perfect style match through AI.
            Start your personalized fashion journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/for-shoppers"
              className="bg-primary text-primary-foreground px-12 py-5 text-lg rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 inline-flex items-center group"
            >
              Get Started Now
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="border-2 border-border text-foreground px-12 py-5 text-lg rounded-full hover:border-primary hover:text-primary transition-all duration-300"
            >
              Learn More
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-12 mt-16">
            <div className="flex items-center">
              <Shield className="w-6 h-6 text-primary mr-3" />
              <span className="text-lg">Secure Shopping</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-6 h-6 text-primary mr-3" />
              <span className="text-lg">24/7 Support</span>
            </div>
            <div className="flex items-center">
              <Users className="w-6 h-6 text-primary mr-3" />
              <span className="text-lg">Trusted by 10K+ Users</span>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}