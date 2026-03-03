import { Button } from "@/components/ui/button";
import { Link, useParams } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Leaf,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import remediesData from "../lib/remediesData";
import { getPostsByCategory } from "../lib/storage";
import type { BlogPost } from "../types";
import { CATEGORIES } from "../types";

export default function SubcategoryPage() {
  const { categorySlug, subcategorySlug } = useParams({
    from: "/category/$categorySlug/$subcategorySlug",
  });
  const [posts, setPosts] = useState<BlogPost[]>([]);

  const catMeta = CATEGORIES.find((c) => c.slug === categorySlug);
  const subMeta = catMeta?.subcategories.find(
    (s) => s.slug === subcategorySlug,
  );

  useEffect(() => {
    setPosts(getPostsByCategory(categorySlug));
  }, [categorySlug]);

  if (!catMeta || !subMeta) {
    return (
      <div className="min-h-screen flex flex-col botanical-bg">
        <SiteHeader />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <Leaf className="h-16 w-16 mx-auto mb-4 opacity-20" />
          <h1 className="font-display text-3xl font-bold mb-2">
            Topic Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            This topic does not exist or has been removed.
          </p>
          <Link
            to="/category/$slug"
            params={{ slug: categorySlug || "health-remedies" }}
          >
            <Button
              style={{ background: "oklch(0.42 0.12 195)", color: "white" }}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Category
            </Button>
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const HEADER_BG: Record<string, string> = {
    "health-remedies": "oklch(0.24 0.09 155)",
    "skin-care": "oklch(0.22 0.08 195)",
    "hair-care": "oklch(0.22 0.08 225)",
    "weight-management": "oklch(0.22 0.08 210)",
    lifestyle: "oklch(0.24 0.09 148)",
  };

  const headerBg = HEADER_BG[categorySlug] ?? "oklch(0.22 0.07 195)";

  // Get remedy content for this subcategory
  const subcategoryContent =
    remediesData[categorySlug]?.[subcategorySlug] ?? null;

  return (
    <div className="min-h-screen flex flex-col botanical-bg">
      <SiteHeader />

      <main className="flex-1">
        {/* Header */}
        <div
          className="py-16 relative overflow-hidden"
          style={{ background: headerBg }}
        >
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl"
              style={{ background: "oklch(0.55 0.15 195)" }}
            />
          </div>
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              {/* Breadcrumb */}
              <div
                className="flex items-center justify-center gap-2 mb-4 text-sm"
                style={{ color: "oklch(0.75 0.05 175)" }}
              >
                <Link
                  to="/category/$slug"
                  params={{ slug: categorySlug }}
                  className="hover:underline"
                >
                  {catMeta.icon} {catMeta.name}
                </Link>
                <span>/</span>
                <span style={{ color: "oklch(0.90 0.02 160)" }}>
                  {subMeta.name}
                </span>
              </div>
              <h1
                className="font-display text-4xl sm:text-5xl font-bold mb-3"
                style={{ color: "oklch(0.97 0.01 148)" }}
              >
                {subMeta.name}
              </h1>
              {subcategoryContent?.intro && (
                <p
                  className="text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
                  style={{ color: "oklch(0.80 0.05 175)" }}
                >
                  {subcategoryContent.intro}
                </p>
              )}
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10">
          {/* Subcategory pills */}
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Browse by topic
            </p>
            <div className="flex flex-wrap gap-2">
              <Link to="/category/$slug" params={{ slug: categorySlug }}>
                <button
                  type="button"
                  className="px-4 py-1.5 rounded-full text-sm font-medium transition-all border"
                  style={{
                    background: "transparent",
                    color: "oklch(0.42 0.12 195)",
                    borderColor: "oklch(0.88 0.03 170)",
                  }}
                >
                  All Topics
                </button>
              </Link>
              {catMeta.subcategories.map((sub) => (
                <Link
                  key={sub.slug}
                  to="/category/$categorySlug/$subcategorySlug"
                  params={{ categorySlug, subcategorySlug: sub.slug }}
                >
                  <button
                    type="button"
                    className="px-4 py-1.5 rounded-full text-sm font-medium transition-all border"
                    style={
                      sub.slug === subcategorySlug
                        ? {
                            background: "oklch(0.50 0.14 165)",
                            color: "white",
                            borderColor: "oklch(0.50 0.14 165)",
                          }
                        : {
                            background: "transparent",
                            color: "oklch(0.48 0.10 175)",
                            borderColor: "oklch(0.88 0.03 170)",
                          }
                    }
                  >
                    {sub.name}
                  </button>
                </Link>
              ))}
            </div>
          </div>

          {/* Warning banner */}
          {subcategoryContent?.warning && (
            <div
              className="flex gap-3 items-start rounded-xl border p-4 mb-8"
              style={{
                background: "oklch(0.97 0.04 85 / 0.4)",
                borderColor: "oklch(0.80 0.10 80)",
              }}
            >
              <AlertTriangle
                className="h-5 w-5 mt-0.5 shrink-0"
                style={{ color: "oklch(0.60 0.12 80)" }}
              />
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.40 0.08 80)" }}
              >
                <strong>Important:</strong> {subcategoryContent.warning}
              </p>
            </div>
          )}

          {/* Remedy cards */}
          {subcategoryContent && subcategoryContent.remedies.length > 0 && (
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {subcategoryContent.remedies.map((remedy, idx) => (
                  <motion.div
                    key={remedy.title}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: idx * 0.07 }}
                    className="rounded-2xl border overflow-hidden shadow-sm"
                    style={{
                      background: "white",
                      borderColor: "oklch(0.90 0.04 175)",
                    }}
                  >
                    {/* Card header */}
                    <div
                      className="px-5 py-4"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.94 0.06 165), oklch(0.92 0.05 195))",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Leaf
                          className="h-4 w-4"
                          style={{ color: "oklch(0.40 0.14 165)" }}
                        />
                        <h2
                          className="font-semibold text-lg"
                          style={{ color: "oklch(0.25 0.10 165)" }}
                        >
                          {remedy.title}
                        </h2>
                      </div>
                      {remedy.description && (
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full"
                          style={{
                            background: "oklch(0.50 0.14 165 / 0.15)",
                            color: "oklch(0.38 0.12 165)",
                          }}
                        >
                          {remedy.description}
                        </span>
                      )}
                    </div>

                    <div className="p-5 space-y-4">
                      {/* Ingredients */}
                      <div>
                        <h3
                          className="text-xs font-bold uppercase tracking-wider mb-2"
                          style={{ color: "oklch(0.45 0.12 195)" }}
                        >
                          Ingredients
                        </h3>
                        <ul className="space-y-1">
                          {remedy.ingredients.map((ing) => (
                            <li
                              key={ing}
                              className="flex items-start gap-2 text-sm"
                              style={{ color: "oklch(0.35 0.04 170)" }}
                            >
                              <span
                                className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                                style={{
                                  background: "oklch(0.55 0.14 165)",
                                }}
                              />
                              {ing}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Application */}
                      <div>
                        <h3
                          className="text-xs font-bold uppercase tracking-wider mb-2"
                          style={{ color: "oklch(0.45 0.12 195)" }}
                        >
                          Application
                        </h3>
                        <ol className="space-y-1.5">
                          {remedy.application.map((step, i) => (
                            <li
                              key={step}
                              className="flex items-start gap-2.5 text-sm"
                              style={{ color: "oklch(0.35 0.04 170)" }}
                            >
                              <span
                                className="flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full text-xs font-bold mt-0.5"
                                style={{
                                  background: "oklch(0.50 0.14 165)",
                                  color: "white",
                                }}
                              >
                                {i + 1}
                              </span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Benefits */}
                      <div
                        className="rounded-xl p-3 flex gap-2.5 items-start"
                        style={{ background: "oklch(0.96 0.04 165 / 0.6)" }}
                      >
                        <CheckCircle2
                          className="h-4 w-4 mt-0.5 shrink-0"
                          style={{ color: "oklch(0.45 0.14 165)" }}
                        />
                        <div>
                          <p
                            className="text-xs font-bold uppercase tracking-wider mb-0.5"
                            style={{ color: "oklch(0.40 0.12 165)" }}
                          >
                            Benefits
                          </p>
                          <p
                            className="text-sm leading-relaxed"
                            style={{ color: "oklch(0.35 0.06 165)" }}
                          >
                            {remedy.benefits}
                          </p>
                        </div>
                      </div>

                      {/* Frequency */}
                      <div className="flex items-center gap-2">
                        <Clock
                          className="h-4 w-4"
                          style={{ color: "oklch(0.50 0.10 195)" }}
                        />
                        <span
                          className="text-xs font-semibold"
                          style={{ color: "oklch(0.40 0.10 195)" }}
                        >
                          Frequency:
                        </span>
                        <span
                          className="text-xs"
                          style={{ color: "oklch(0.45 0.06 195)" }}
                        >
                          {remedy.frequency}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Tips section */}
          {subcategoryContent?.tips && subcategoryContent.tips.length > 0 && (
            <div className="mb-12">
              <h2
                className="font-display text-xl font-bold mb-4"
                style={{ color: "oklch(0.28 0.10 165)" }}
              >
                Quick Tips
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {subcategoryContent.tips.map((tip) => (
                  <div
                    key={tip.title}
                    className="rounded-xl border p-4 text-center"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.96 0.04 155), oklch(0.94 0.04 195))",
                      borderColor: "oklch(0.88 0.04 175)",
                    }}
                  >
                    <h3
                      className="font-semibold mb-1.5"
                      style={{ color: "oklch(0.32 0.10 165)" }}
                    >
                      {tip.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "oklch(0.45 0.05 170)" }}
                    >
                      {tip.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blog posts section */}
          {posts.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2
                  className="font-display text-xl font-bold"
                  style={{ color: "oklch(0.28 0.10 165)" }}
                >
                  Related Articles
                </h2>
                <Link to="/category/$slug" params={{ slug: categorySlug }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1.5 text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    All {catMeta.name} Articles
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, i) => (
                  <PostCard key={post.id} post={post} index={i} />
                ))}
              </div>
            </>
          )}

          {/* If no remedies and no posts */}
          {!subcategoryContent && posts.length === 0 && (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">{catMeta.icon}</div>
              <p className="text-muted-foreground font-medium text-lg mb-2">
                No articles in this topic yet
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Coming soon — check back for new content
              </p>
              <Link to="/admin">
                <Button
                  style={{ background: "oklch(0.42 0.12 195)", color: "white" }}
                >
                  Add Articles in Admin
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
