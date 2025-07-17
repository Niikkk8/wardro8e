"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Heart, TrendingUp, ArrowRight } from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI Style Matching",
      description: "Our AI learns your preferences to curate a personalized fashion feed just for you.",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Unique Brands",
      description: "Discover independent designers and emerging brands that match your aesthetic.",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Style Evolution",
      description: "Track your style journey and get trend predictions tailored to your taste.",
    },
  ];

  const stats = [
    { value: "10K+", label: "Active Shoppers" },
    { value: "500+", label: "Partner Brands" },
    { value: "98%", label: "Match Accuracy" },
  ];

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="container min-h-[80vh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-serif font-light mb-6">
              Where AI Meets
              <span className="block text-primary">Personal Style</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover fashion that speaks to you. Our AI-powered platform connects you
              with unique brands that match your individual style DNA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/for-shoppers"
                className="bg-primary text-primary-foreground px-8 py-3 rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 flex items-center justify-center group"
              >
                Start Shopping
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/for-brands"
                className="border border-border text-foreground px-8 py-3 rounded-full hover:border-primary hover:text-primary transition-all duration-300"
              >
                I&apos;m a Brand
              </Link>
            </div>
            <div className="flex items-center space-x-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                >
                  <p className="text-3xl font-light">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
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
                <div className="relative h-[250px] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop"
                    alt="Fashion 1"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-[150px] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop"
                    alt="Fashion 2"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="relative h-[150px] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=300&fit=crop"
                    alt="Fashion 3"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-[250px] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=500&fit=crop"
                    alt="Fashion 4"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background rounded-full p-6 shadow-xl">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-border"
            >
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-primary/5 rounded-3xl p-12 text-center"
        >
          <h2 className="text-4xl font-serif font-light mb-4">
            Ready to Transform Your Style Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of fashion lovers who&apos;ve discovered their perfect style match through AI.
          </p>
          <Link
            href="/for-shoppers"
            className="bg-primary text-primary-foreground px-8 py-3 rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 inline-flex items-center group"
          >
            Get Started Now
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}