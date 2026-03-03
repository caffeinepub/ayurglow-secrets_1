import { Button } from "@/components/ui/button";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Leaf } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { getPostsByCategory } from "../lib/blogApi";
import type { FrontendBlogPost } from "../lib/blogApi";
import { CATEGORIES } from "../types";

type BlogPost = FrontendBlogPost;

export default function CategoryPage() {
  const { slug } = useParams({ from: "/category/$slug" });
  const [posts, setPosts] = useState<BlogPost[]>([]);

  const catMeta = CATEGORIES.find((c) => c.slug === slug);

  useEffect(() => {
    getPostsByCategory(slug).then(setPosts).catch(console.error);
  }, [slug]);

  if (!catMeta) {
    return (
      <div className="min-h-screen flex flex-col botanical-bg">
        <SiteHeader />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <Leaf className="h-16 w-16 mx-auto mb-4 opacity-20" />
          <h1 className="font-display text-3xl font-bold mb-2">
            Category Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            This category does not exist or has been removed.
          </p>
          <Link to="/blog">
            <Button
              style={{ background: "oklch(0.42 0.12 195)", color: "white" }}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
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

  const headerBg = HEADER_BG[slug] ?? "oklch(0.22 0.07 195)";

  return (
    <div className="min-h-screen flex flex-col botanical-bg">
      <SiteHeader />

      <main className="flex-1">
        {/* Category Header */}
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
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 text-4xl"
                style={{ background: "oklch(0.92 0.06 148 / 0.15)" }}
              >
                {catMeta.icon}
              </div>
              <h1
                className="font-display text-4xl sm:text-5xl font-bold mb-3"
                style={{ color: "oklch(0.97 0.01 148)" }}
              >
                {catMeta.name}
              </h1>
              <p
                className="text-sm sm:text-base max-w-lg mx-auto leading-relaxed"
                style={{ color: "oklch(0.80 0.05 175)" }}
              >
                {catMeta.description}
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10">
          {/* Subcategory tags — each pill links to its own page */}
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Browse by topic
            </p>
            <div className="flex flex-wrap gap-2">
              <span
                className="px-4 py-1.5 rounded-full text-sm font-medium border"
                style={{
                  background: "oklch(0.42 0.12 195)",
                  color: "white",
                  borderColor: "oklch(0.42 0.12 195)",
                }}
              >
                All Topics
              </span>
              {catMeta.subcategories.map((sub) => (
                <Link
                  key={sub.slug}
                  to="/category/$categorySlug/$subcategorySlug"
                  params={{ categorySlug: slug, subcategorySlug: sub.slug }}
                  className="px-4 py-1.5 rounded-full text-sm font-medium transition-all border hover:opacity-80"
                  style={{
                    background: "transparent",
                    color: "oklch(0.48 0.10 175)",
                    borderColor: "oklch(0.88 0.03 170)",
                  }}
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <Link to="/blog">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                All Articles
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
                No articles in this category yet
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
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
