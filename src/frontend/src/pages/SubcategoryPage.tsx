import { Button } from "@/components/ui/button";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Leaf } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
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
              <p
                className="text-sm sm:text-base max-w-lg mx-auto leading-relaxed"
                style={{ color: "oklch(0.80 0.05 175)" }}
              >
                {catMeta.name} &mdash; Ayurvedic articles and remedies
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10">
          {/* Other subcategories for this category */}
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

          <div className="flex items-center justify-between mb-6">
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
            <p className="text-sm text-muted-foreground">
              {posts.length} article{posts.length !== 1 ? "s" : ""}
            </p>
          </div>

          {posts.length === 0 ? (
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
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </div>
          )}

          {/* Coming soon notice */}
          <div
            className="mt-8 rounded-xl border border-dashed border-border p-6 text-center"
            style={{ background: "oklch(0.97 0.01 148)" }}
          >
            <p className="font-medium text-muted-foreground">
              More articles on <strong>{subMeta.name}</strong> coming soon!
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
