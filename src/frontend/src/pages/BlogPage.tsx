import { Input } from "@/components/ui/input";
import { Leaf, Loader2, Search } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import PostCard from "../components/PostCard";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { getPublishedPosts } from "../lib/blogApi";
import type { FrontendBlogPost } from "../lib/blogApi";
import { CATEGORIES } from "../types";

// Use the canister-backed type for blog posts
type BlogPost = FrontendBlogPost;

const ALL_FILTER = { slug: "all", name: "All", icon: "🌿" };
const FILTERS = [ALL_FILTER, ...CATEGORIES];

const CATEGORY_PILL: Record<
  string,
  { text: string; bg: string; activeBg: string; activeText: string }
> = {
  all: {
    text: "oklch(0.42 0.12 195)",
    bg: "oklch(0.94 0.03 195)",
    activeBg: "oklch(0.42 0.12 195)",
    activeText: "white",
  },
  "health-remedies": {
    text: "oklch(0.44 0.13 148)",
    bg: "oklch(0.92 0.06 148)",
    activeBg: "oklch(0.44 0.13 148)",
    activeText: "white",
  },
  "skin-care": {
    text: "oklch(0.42 0.12 195)",
    bg: "oklch(0.92 0.05 195)",
    activeBg: "oklch(0.42 0.12 195)",
    activeText: "white",
  },
  "hair-care": {
    text: "oklch(0.40 0.12 230)",
    bg: "oklch(0.92 0.05 230)",
    activeBg: "oklch(0.40 0.12 230)",
    activeText: "white",
  },
  "weight-management": {
    text: "oklch(0.42 0.12 215)",
    bg: "oklch(0.92 0.05 215)",
    activeBg: "oklch(0.42 0.12 215)",
    activeText: "white",
  },
  lifestyle: {
    text: "oklch(0.44 0.13 148)",
    bg: "oklch(0.90 0.07 148)",
    activeBg: "oklch(0.44 0.13 148)",
    activeText: "white",
  },
};

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    getPublishedPosts()
      .then(setPosts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () =>
      posts.filter((post) => {
        const matchesCategory =
          activeCategory === "all" || post.category === activeCategory;
        const q = search.toLowerCase();
        const matchesSearch =
          !q ||
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.authorName.toLowerCase().includes(q) ||
          post.tags.some((t) => t.toLowerCase().includes(q));
        return matchesCategory && matchesSearch;
      }),
    [posts, activeCategory, search],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  function handleCategoryChange(slug: string) {
    setActiveCategory(slug);
    setPage(1);
  }

  function handleSearchChange(val: string) {
    setSearch(val);
    setPage(1);
  }

  return (
    <div className="min-h-screen flex flex-col botanical-bg">
      <SiteHeader />

      <main className="flex-1">
        {/* Page Header */}
        <div
          className="py-16 relative overflow-hidden"
          style={{ background: "oklch(0.20 0.06 195)" }}
        >
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl"
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
              <div className="flex items-center justify-center gap-2 mb-3">
                <Leaf
                  className="h-4 w-4"
                  style={{ color: "oklch(0.76 0.14 85)" }}
                />
                <span
                  className="text-xs uppercase tracking-[0.2em] font-semibold"
                  style={{ color: "oklch(0.76 0.14 85)" }}
                >
                  Knowledge Library
                </span>
              </div>
              <h1
                className="font-display text-4xl sm:text-5xl font-bold mb-3"
                style={{ color: "oklch(0.97 0.01 148)" }}
              >
                Ayurvedic Blog
              </h1>
              <p
                className="text-sm sm:text-base max-w-md mx-auto"
                style={{ color: "oklch(0.78 0.06 175)" }}
              >
                Deep-dive into ancient wisdom, modern applications, and holistic
                wellness practices
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10">
          {/* Search bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {FILTERS.map((cat) => {
              const colors = CATEGORY_PILL[cat.slug] ?? CATEGORY_PILL.all;
              const isActive = activeCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => handleCategoryChange(cat.slug)}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:opacity-90 active:scale-95"
                  style={{
                    background: isActive ? colors.activeBg : colors.bg,
                    color: isActive ? colors.activeText : colors.text,
                    boxShadow: isActive
                      ? "0 2px 8px -2px oklch(0.42 0.12 195 / 0.35)"
                      : "none",
                  }}
                >
                  <span>{cat.icon}</span>
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Results count */}
          {!loading && (
            <p className="text-sm text-muted-foreground mb-6">
              {filtered.length} article{filtered.length !== 1 ? "s" : ""} found
            </p>
          )}

          {/* Loading skeleton */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2
                className="h-8 w-8 animate-spin"
                style={{ color: "oklch(0.42 0.12 195)" }}
              />
            </div>
          )}

          {/* Grid */}
          {!loading && paginated.length === 0 ? (
            <div className="text-center py-20">
              <Leaf
                className="h-14 w-14 mx-auto mb-4 opacity-20"
                style={{ color: "oklch(0.42 0.12 195)" }}
              />
              <p className="text-muted-foreground font-medium">
                No articles found
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {search
                  ? "Try a different search term"
                  : "Check back soon for new content"}
              </p>
            </div>
          ) : !loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map((post, i) => (
                <PostCard
                  key={post.id}
                  post={post as import("../types").BlogPost}
                  index={i}
                />
              ))}
            </div>
          ) : null}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 border border-border hover:bg-secondary"
              >
                ← Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  className="w-9 h-9 rounded-lg text-sm font-medium transition-colors border"
                  style={
                    n === currentPage
                      ? {
                          background: "oklch(0.42 0.12 195)",
                          color: "white",
                          borderColor: "oklch(0.42 0.12 195)",
                        }
                      : {
                          borderColor: "oklch(0.88 0.03 170)",
                          color: "oklch(0.42 0.08 195)",
                        }
                  }
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 border border-border hover:bg-secondary"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
