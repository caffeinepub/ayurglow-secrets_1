import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Leaf,
  ShoppingBag,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { getPublishedPosts } from "../lib/blogApi";
import type { FrontendBlogPost } from "../lib/blogApi";
import { CATEGORIES } from "../types";

// FrontendBlogPost is structurally compatible with BlogPost
type BlogPost = FrontendBlogPost;

const OFFERS = [
  {
    icon: "🌿",
    title: "Natural Ayurvedic Health Remedies",
    desc: "Time-tested herbal formulations and natural remedies for complete wellness",
  },
  {
    icon: "💆",
    title: "Skin Care Tips for Natural Glow",
    desc: "Botanical secrets and ancient beauty rituals for radiant, glowing skin",
  },
  {
    icon: "💇",
    title: "Hair Fall & Hair Growth Treatments",
    desc: "Proven Ayurvedic solutions to stop hair fall and promote thick, healthy hair",
  },
  {
    icon: "🧘",
    title: "Holistic Lifestyle & Wellness Advice",
    desc: "Daily routines, yoga, and mindfulness practices for a balanced life",
  },
];

const WHY_REASONS = [
  "100% natural & Ayurvedic approach",
  "Simple home remedies anyone can follow",
  "Safe, affordable, and effective",
  "Suitable for all age groups",
];

export default function HomePage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    getPublishedPosts()
      .then((all) => setPosts(all.slice(0, 6)))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen flex flex-col botanical-bg">
      <SiteHeader />

      <main className="flex-1">
        {/* ==================== HERO ==================== */}
        <section className="relative min-h-[600px] sm:min-h-[680px] overflow-hidden flex items-center">
          <img
            src="/assets/generated/hero-banner.dim_1200x600.jpg"
            alt="AyurGlow Hero – Ayurvedic herbs and natural wellness"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.14 0.07 200 / 0.92) 0%, oklch(0.20 0.08 175 / 0.70) 60%, oklch(0.24 0.06 155 / 0.35) 100%)",
            }}
          />

          <div className="relative w-full container mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="max-w-2xl"
            >
              {/* Eyebrow tag */}
              <div className="flex items-center gap-2 mb-5">
                <div
                  className="h-px w-10"
                  style={{ background: "oklch(0.76 0.14 85)" }}
                />
                <span
                  className="text-xs uppercase tracking-[0.25em] font-semibold"
                  style={{ color: "oklch(0.84 0.12 85)" }}
                >
                  Ancient Ayurvedic Wisdom
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] mb-5 text-white">
                Welcome to{" "}
                <span
                  className="block"
                  style={{ color: "oklch(0.84 0.12 85)" }}
                >
                  AyurGlow Secrets
                </span>
              </h1>

              <p
                className="text-base sm:text-lg leading-relaxed mb-4 font-body"
                style={{ color: "oklch(0.88 0.03 165)" }}
              >
                <strong
                  className="font-semibold"
                  style={{ color: "oklch(0.95 0.01 148)" }}
                >
                  Ancient Ayurvedic Wisdom for Healthy Body, Glowing Skin &amp;
                  Strong Hair
                </strong>
              </p>

              <p
                className="text-sm sm:text-base leading-relaxed mb-8 font-body"
                style={{ color: "oklch(0.82 0.03 175)" }}
              >
                Discover time-tested Ayurvedic remedies for overall health,
                radiant skin, and strong, healthy hair. We bring you natural,
                chemical-free solutions rooted in ancient Indian wisdom and
                backed by modern understanding.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link to="/blog">
                  <Button
                    size="lg"
                    className="font-semibold shadow-lg"
                    style={{
                      background: "oklch(0.50 0.14 165)",
                      color: "white",
                    }}
                  >
                    Explore Remedies
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/40 text-white hover:bg-white/10 hover:text-white hover:border-white/60"
                  >
                    <Leaf className="h-4 w-4 mr-2" />
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* ==================== WHAT WE OFFER ==================== */}
        <section className="py-20 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="ornamental-divider mb-4 max-w-xs mx-auto">
              <Sparkles
                className="h-4 w-4 shrink-0"
                style={{ color: "oklch(0.76 0.14 85)" }}
              />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">
              What We Offer
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Comprehensive Ayurvedic knowledge to transform your health,
              beauty, and lifestyle naturally
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {OFFERS.map((offer, i) => (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-botanical rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto"
                  style={{ background: "oklch(0.92 0.06 155)" }}
                >
                  {offer.icon}
                </div>
                <h3 className="font-display text-base font-semibold mb-2 leading-snug">
                  {offer.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {offer.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ==================== WHY AYURGLOW ==================== */}
        <section
          className="py-20"
          style={{ background: "oklch(0.97 0.015 175)" }}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Star
                    className="h-4 w-4"
                    style={{ color: "oklch(0.76 0.14 85)" }}
                  />
                  <span
                    className="text-xs uppercase tracking-[0.2em] font-semibold"
                    style={{ color: "oklch(0.55 0.15 195)" }}
                  >
                    Why Choose Us
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold mb-5">
                  Why AyurGlow Secrets?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8 text-base">
                  We are committed to bringing you only the most authentic,
                  researched, and safe Ayurvedic remedies that have stood the
                  test of thousands of years.
                </p>

                <div className="space-y-4">
                  {WHY_REASONS.map((reason, i) => (
                    <motion.div
                      key={reason}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2
                        className="h-5 w-5 shrink-0"
                        style={{ color: "oklch(0.50 0.14 165)" }}
                      />
                      <span className="text-base font-medium">{reason}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8">
                  <Link to="/about">
                    <Button
                      className="font-semibold"
                      style={{
                        background: "oklch(0.42 0.12 195)",
                        color: "white",
                      }}
                    >
                      Read Our Story
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Decorative image side */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-hero">
                  <img
                    src="/assets/generated/blog-ayurvedic-herbs.dim_800x500.jpg"
                    alt="Ayurvedic herbs and natural remedies"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, oklch(0.18 0.07 200 / 0.5) 0%, transparent 60%)",
                    }}
                  />
                  <div className="absolute bottom-5 left-5 right-5">
                    <Badge
                      className="text-xs mb-2"
                      style={{
                        background: "oklch(0.76 0.14 85 / 0.9)",
                        color: "oklch(0.20 0.06 75)",
                      }}
                    >
                      5,000+ Years of Wisdom
                    </Badge>
                    <p className="text-white text-sm font-medium">
                      Ancient herbs, modern science, timeless results
                    </p>
                  </div>
                </div>
                {/* Floating stat card */}
                <div
                  className="absolute -top-4 -right-4 rounded-xl p-4 shadow-card-hover"
                  style={{ background: "oklch(0.42 0.12 195)" }}
                >
                  <p className="text-white text-xs font-medium">Articles</p>
                  <p className="text-white font-display text-2xl font-bold">
                    10+
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================== CATEGORIES ==================== */}
        <section className="py-20 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="ornamental-divider mb-4 max-w-xs mx-auto">
              <Leaf
                className="h-4 w-4 shrink-0"
                style={{ color: "oklch(0.76 0.14 85)" }}
              />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">
              Explore by Category
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Five pillars of Ayurvedic wisdom curated for your modern life
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  to="/category/$slug"
                  params={{ slug: cat.slug }}
                  className="block group h-full"
                >
                  <div className="relative h-52 rounded-xl overflow-hidden border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
                    <img
                      src={getCategoryImage(cat.slug)}
                      alt={cat.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-4">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center mb-2 text-lg"
                        style={{ background: "oklch(0.92 0.06 148 / 0.9)" }}
                      >
                        {cat.icon}
                      </div>
                      <h3 className="font-display text-sm font-bold text-white leading-tight">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-white/70 mt-0.5 line-clamp-2 leading-snug">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ==================== FEATURED POSTS ==================== */}
        <section
          className="py-20"
          style={{ background: "oklch(0.97 0.01 170)" }}
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-end justify-between mb-10"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Leaf
                    className="h-4 w-4"
                    style={{ color: "oklch(0.55 0.15 195)" }}
                  />
                  <span
                    className="text-xs uppercase tracking-[0.15em] font-semibold"
                    style={{ color: "oklch(0.55 0.15 195)" }}
                  >
                    Latest Wisdom
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold">
                  Featured Articles
                </h2>
              </div>
              <Link to="/blog" className="hidden sm:block shrink-0">
                <Button
                  variant="outline"
                  className="border-primary/30 text-primary"
                >
                  View All
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </Link>
            </motion.div>

            {posts.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <Leaf className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p>No posts yet. Visit the admin panel to create content.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, i) => (
                  <PostCard key={post.id} post={post} index={i} />
                ))}
              </div>
            )}

            <div className="mt-8 text-center sm:hidden">
              <Link to="/blog">
                <Button
                  variant="outline"
                  className="border-primary/30 text-primary w-full"
                >
                  View All Articles
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ==================== MONETIZATION ROADMAP ==================== */}
        <section className="py-20 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="ornamental-divider mb-4 max-w-xs mx-auto">
              <TrendingUp
                className="h-4 w-4 shrink-0"
                style={{ color: "oklch(0.76 0.14 85)" }}
              />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">
              Our Growth Roadmap
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Building a sustainable Ayurvedic wellness community — through
              trusted content, authentic product recommendations, and valuable
              digital resources.
            </p>
          </motion.div>

          {/* Three monetization pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Card 1 — AdSense */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0 }}
              className="relative rounded-2xl border border-border bg-card p-7 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "oklch(0.92 0.06 155)" }}
                >
                  <TrendingUp
                    className="h-6 w-6"
                    style={{ color: "oklch(0.40 0.14 165)" }}
                  />
                </div>
                <Badge
                  className="text-xs font-semibold"
                  style={{
                    background: "oklch(0.94 0.05 100)",
                    color: "oklch(0.45 0.14 100)",
                    border: "1px solid oklch(0.80 0.10 100 / 0.5)",
                  }}
                >
                  In Progress
                </Badge>
              </div>
              <h3 className="font-display text-lg font-bold mb-3">
                Ad-Supported Content
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                After publishing 25–30 quality posts, we'll integrate Google
                AdSense to monetize our health &amp; beauty content — keeping
                all articles completely free for readers.
              </p>
              <div
                className="mt-5 pt-4 border-t flex items-center gap-2"
                style={{ borderColor: "oklch(0.90 0.02 180)" }}
              >
                <span
                  className="text-xs font-medium"
                  style={{ color: "oklch(0.55 0.15 195)" }}
                >
                  Goal: 25–30 quality posts
                </span>
              </div>
            </motion.div>

            {/* Card 2 — Affiliate Marketing */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl border border-border bg-card p-7 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "oklch(0.92 0.06 155)" }}
                >
                  <ShoppingBag
                    className="h-6 w-6"
                    style={{ color: "oklch(0.40 0.14 165)" }}
                  />
                </div>
                <Badge
                  className="text-xs font-semibold"
                  style={{
                    background: "oklch(0.92 0.06 155)",
                    color: "oklch(0.35 0.13 165)",
                    border: "1px solid oklch(0.70 0.12 155 / 0.4)",
                  }}
                >
                  Active Soon
                </Badge>
              </div>
              <h3 className="font-display text-lg font-bold mb-3">
                Ayurvedic Product Affiliates
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                We partner with trusted Ayurvedic brands for affiliate marketing
                — recommending quality oils, herbs, and supplements from leading
                Indian and global marketplaces.
              </p>
              <div
                className="mt-5 pt-4 border-t"
                style={{ borderColor: "oklch(0.90 0.02 180)" }}
              >
                <p
                  className="text-xs font-semibold mb-2 uppercase tracking-wide"
                  style={{ color: "oklch(0.55 0.15 195)" }}
                >
                  Partner Brands
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Patanjali",
                    "Himalaya",
                    "Baidyanath",
                    "Amazon",
                    "Flipkart",
                  ].map((brand) => (
                    <span
                      key={brand}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        background: "oklch(0.94 0.04 175)",
                        color: "oklch(0.38 0.12 195)",
                        border: "1px solid oklch(0.80 0.06 175 / 0.6)",
                      }}
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Card 3 — Digital Products */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl border border-border bg-card p-7 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "oklch(0.92 0.06 155)" }}
                >
                  <BookOpen
                    className="h-6 w-6"
                    style={{ color: "oklch(0.40 0.14 165)" }}
                  />
                </div>
                <Badge
                  className="text-xs font-semibold"
                  style={{
                    background: "oklch(0.93 0.04 240)",
                    color: "oklch(0.42 0.12 240)",
                    border: "1px solid oklch(0.75 0.10 240 / 0.4)",
                  }}
                >
                  Coming Soon
                </Badge>
              </div>
              <h3 className="font-display text-lg font-bold mb-3">
                Own Digital Products
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Coming soon: exclusive Ayurvedic digital resources crafted by
                our wellness experts for deep, personalised healing.
              </p>
              <ul className="space-y-2 flex-1">
                {[
                  "Ayurvedic Skin & Hair Care eBook",
                  "Hair Fall Recovery Plan (PDF)",
                  "Online Consultation Tie-ups",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2
                      className="h-4 w-4 shrink-0"
                      style={{ color: "oklch(0.55 0.15 195)" }}
                    />
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Affiliate Partners Strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-xl border border-border px-6 py-4 flex flex-wrap items-center gap-3"
            style={{ background: "oklch(0.97 0.015 175)" }}
          >
            <span
              className="text-xs font-semibold uppercase tracking-wider shrink-0"
              style={{ color: "oklch(0.45 0.12 195)" }}
            >
              Trusted Ayurvedic Brands:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {[
                "Patanjali",
                "Himalaya",
                "Baidyanath",
                "Amazon",
                "Flipkart",
              ].map((brand, i, arr) => (
                <span key={brand} className="flex items-center gap-2">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "oklch(0.40 0.14 165)" }}
                  >
                    {brand}
                  </span>
                  {i < arr.length - 1 && (
                    <span
                      className="text-xs"
                      style={{ color: "oklch(0.70 0.04 180)" }}
                    >
                      ·
                    </span>
                  )}
                </span>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ==================== ABOUT US SECTION ==================== */}
        <section className="py-20 container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <div className="ornamental-divider mb-4 max-w-xs mx-auto">
                <Sparkles
                  className="h-4 w-4 shrink-0"
                  style={{ color: "oklch(0.76 0.14 85)" }}
                />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">
                About AyurGlow Secrets
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl border border-border bg-card p-8 sm:p-10 shadow-card text-center"
            >
              <p className="text-base sm:text-lg leading-8 text-muted-foreground mb-6">
                AyurGlow Secrets is a wellness platform dedicated to sharing the
                healing power of Ayurveda for a healthier life, glowing skin,
                and stronger hair. Inspired by ancient Ayurvedic texts and
                traditional Indian home remedies, our goal is to help people
                adopt natural solutions over chemical-based treatments.
              </p>
              <p className="text-base sm:text-lg leading-8 text-muted-foreground mb-8">
                We believe true beauty and health begin from within. Through
                balanced nutrition, herbal remedies, and mindful living,
                Ayurveda offers sustainable healing without side effects. Our
                content is carefully researched and simplified to help you
                easily follow Ayurvedic practices in your daily life.
              </p>
              <Link to="/about">
                <Button
                  className="font-semibold"
                  style={{
                    background: "oklch(0.42 0.12 195)",
                    color: "white",
                  }}
                >
                  Read Full Story
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ==================== CTA BANNER ==================== */}
        <section className="py-8 pb-20 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden p-10 sm:p-14 text-center"
            style={{ background: "oklch(0.22 0.07 195)" }}
          >
            <div
              className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-10"
              style={{ background: "oklch(0.55 0.15 195)" }}
            />
            <div
              className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-10"
              style={{ background: "oklch(0.76 0.14 85)" }}
            />

            <div className="relative">
              <Badge
                className="mb-4 text-xs"
                style={{
                  background: "oklch(0.76 0.14 85 / 0.2)",
                  color: "oklch(0.76 0.14 85)",
                  border: "1px solid oklch(0.76 0.14 85 / 0.3)",
                }}
              >
                5,000 Years of Wisdom
              </Badge>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold mb-4"
                style={{ color: "oklch(0.97 0.01 148)" }}
              >
                Start Your Ayurvedic Journey Today
              </h2>
              <p
                className="max-w-xl mx-auto text-sm sm:text-base leading-relaxed mb-8"
                style={{ color: "oklch(0.80 0.05 175)" }}
              >
                Explore our comprehensive library of Ayurvedic remedies for
                health, skin, hair, weight management, and lifestyle. Natural
                healing is just one article away.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/blog">
                  <Button
                    size="lg"
                    style={{
                      background: "oklch(0.55 0.15 195)",
                      color: "white",
                    }}
                  >
                    <Leaf className="h-4 w-4 mr-2" />
                    Browse All Articles
                  </Button>
                </Link>
                <Link to="/category/$slug" params={{ slug: "health-remedies" }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    Health Remedies →
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function getCategoryImage(slug: string): string {
  const map: Record<string, string> = {
    "health-remedies": "/assets/generated/blog-health.dim_800x500.jpg",
    "skin-care": "/assets/generated/blog-skincare.dim_800x500.jpg",
    "hair-care": "/assets/generated/blog-haircare.dim_800x500.jpg",
    "weight-management": "/assets/generated/blog-weight.dim_800x500.jpg",
    lifestyle: "/assets/generated/blog-lifestyle.dim_800x500.jpg",
  };
  return map[slug] ?? "/assets/generated/blog-ayurvedic-herbs.dim_800x500.jpg";
}
