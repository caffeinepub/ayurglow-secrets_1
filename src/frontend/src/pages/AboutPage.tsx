import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Leaf, Sparkles, Star } from "lucide-react";
import { motion } from "motion/react";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { CATEGORIES } from "../types";

const VALUES = [
  {
    icon: "🌿",
    title: "100% Natural",
    desc: "Every remedy we share uses only natural, plant-based ingredients found in traditional Ayurvedic practice.",
  },
  {
    icon: "📚",
    title: "Deeply Researched",
    desc: "Our content is carefully reviewed against ancient Ayurvedic texts and modern scientific research.",
  },
  {
    icon: "💚",
    title: "Safe & Effective",
    desc: "All remedies are safe for home use, chemical-free, and suitable for all age groups.",
  },
  {
    icon: "🧘",
    title: "Holistic Approach",
    desc: "We address root causes, not just symptoms — treating body, mind, and spirit together.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col botanical-bg">
      <SiteHeader />

      <main className="flex-1">
        {/* Page Header */}
        <div
          className="py-20 relative overflow-hidden"
          style={{ background: "oklch(0.20 0.06 195)" }}
        >
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl"
              style={{ background: "oklch(0.55 0.15 195)" }}
            />
            <div
              className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl"
              style={{ background: "oklch(0.76 0.14 85)" }}
            />
          </div>
          <div className="container mx-auto px-4 relative text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Leaf
                  className="h-4 w-4"
                  style={{ color: "oklch(0.76 0.14 85)" }}
                />
                <span
                  className="text-xs uppercase tracking-[0.2em] font-semibold"
                  style={{ color: "oklch(0.76 0.14 85)" }}
                >
                  Our Story
                </span>
              </div>
              <h1
                className="font-display text-4xl sm:text-5xl font-bold mb-4"
                style={{ color: "oklch(0.97 0.01 148)" }}
              >
                About AyurGlow Secrets
              </h1>
              <p
                className="text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
                style={{ color: "oklch(0.78 0.06 175)" }}
              >
                A wellness platform bridging 5,000-year-old Ayurvedic wisdom
                with modern everyday life
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main about content */}
        <section className="py-20 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="ornamental-divider mb-4 max-w-xs">
                  <Star
                    className="h-4 w-4 shrink-0"
                    style={{ color: "oklch(0.76 0.14 85)" }}
                  />
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
                  Who We Are
                </h2>
                <div className="space-y-5 text-base leading-8 text-muted-foreground">
                  <p>
                    <strong className="text-foreground font-semibold">
                      AyurGlow Secrets
                    </strong>{" "}
                    is a wellness platform dedicated to sharing the healing
                    power of Ayurveda for a healthier life, glowing skin, and
                    stronger hair. Inspired by ancient Ayurvedic texts and
                    traditional Indian home remedies, our goal is to help people
                    adopt natural solutions over chemical-based treatments.
                  </p>
                  <p>
                    We believe true beauty and health begin from within. Through
                    balanced nutrition, herbal remedies, and mindful living,
                    Ayurveda offers sustainable healing without side effects.
                    Our content is carefully researched and simplified to help
                    you easily follow Ayurvedic practices in your daily life.
                  </p>
                  <p>
                    Whether you're struggling with hair fall, looking for
                    natural skin glow remedies, or seeking a healthier
                    lifestyle, AyurGlow Secrets is your trusted guide. We
                    translate complex Sanskrit texts into simple, actionable
                    steps you can follow at home.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-square shadow-hero">
                  <img
                    src="/assets/generated/blog-ayurvedic-herbs.dim_800x500.jpg"
                    alt="Ayurvedic herbs and natural remedies"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.18 0.07 200 / 0.4) 0%, transparent 60%)",
                    }}
                  />
                </div>
                {/* Floating badge */}
                <div
                  className="absolute -bottom-4 -left-4 rounded-2xl p-5 shadow-card-hover"
                  style={{ background: "oklch(0.42 0.12 195)" }}
                >
                  <p
                    className="font-display text-4xl font-bold"
                    style={{ color: "white" }}
                  >
                    5000+
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "oklch(0.85 0.05 185)" }}
                  >
                    Years of Wisdom
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Our Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-20"
            >
              <div className="text-center mb-12">
                <div className="ornamental-divider mb-4 max-w-xs mx-auto">
                  <Sparkles
                    className="h-4 w-4 shrink-0"
                    style={{ color: "oklch(0.76 0.14 85)" }}
                  />
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">
                  Our Values
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {VALUES.map((val, i) => (
                  <motion.div
                    key={val.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="card-botanical rounded-2xl border border-border bg-card p-6 shadow-card"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                      style={{ background: "oklch(0.92 0.06 155)" }}
                    >
                      {val.icon}
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-2">
                      {val.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {val.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Categories we cover */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-20"
            >
              <div className="text-center mb-10">
                <h2 className="font-display text-3xl font-bold mb-3">
                  What We Cover
                </h2>
                <p className="text-muted-foreground">
                  Five comprehensive pillars of Ayurvedic wellness
                </p>
              </div>

              <div className="space-y-4">
                {CATEGORIES.map((cat, i) => (
                  <motion.div
                    key={cat.slug}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <Link
                      to="/category/$slug"
                      params={{ slug: cat.slug }}
                      className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 group"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                        style={{ background: "oklch(0.92 0.06 155)" }}
                      >
                        {cat.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-semibold text-base group-hover:text-primary transition-colors mb-1">
                          {cat.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {cat.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.subcategories.map((sub) => (
                            <span
                              key={sub}
                              className="text-xs px-2 py-0.5 rounded-full border border-border text-muted-foreground"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                      <CheckCircle2
                        className="h-5 w-5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: "oklch(0.50 0.14 165)" }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden p-10 text-center"
              style={{ background: "oklch(0.22 0.07 195)" }}
            >
              <div
                className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10"
                style={{ background: "oklch(0.76 0.14 85)" }}
              />
              <h2
                className="font-display text-2xl sm:text-3xl font-bold mb-3"
                style={{ color: "oklch(0.97 0.01 148)" }}
              >
                Start Exploring Ayurvedic Wisdom
              </h2>
              <p
                className="text-sm sm:text-base max-w-md mx-auto mb-6"
                style={{ color: "oklch(0.78 0.06 175)" }}
              >
                Browse our growing library of articles on health remedies, skin
                care, hair care, weight management, and lifestyle.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/blog">
                  <Button
                    style={{
                      background: "oklch(0.55 0.15 195)",
                      color: "white",
                    }}
                  >
                    <Leaf className="h-4 w-4 mr-2" />
                    Browse Articles
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
