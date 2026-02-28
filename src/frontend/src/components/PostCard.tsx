import { Link } from "@tanstack/react-router";
import { Calendar, User } from "lucide-react";
import { motion } from "motion/react";
import type { BlogPost } from "../types";

const CATEGORY_COLORS: Record<string, string> = {
  "health-remedies": "oklch(0.48 0.14 155)",
  "skin-care": "oklch(0.42 0.12 195)",
  "hair-care": "oklch(0.40 0.12 230)",
  "weight-management": "oklch(0.42 0.12 215)",
  lifestyle: "oklch(0.44 0.13 148)",
};

const CATEGORY_BG: Record<string, string> = {
  "health-remedies": "oklch(0.92 0.06 148)",
  "skin-care": "oklch(0.92 0.06 195)",
  "hair-care": "oklch(0.92 0.05 230)",
  "weight-management": "oklch(0.92 0.05 215)",
  lifestyle: "oklch(0.90 0.07 148)",
};

const CATEGORY_NAMES: Record<string, string> = {
  "health-remedies": "Health Remedies",
  "skin-care": "Skin Care",
  "hair-care": "Hair Care",
  "weight-management": "Weight Management",
  lifestyle: "Lifestyle",
};

interface PostCardProps {
  post: BlogPost;
  index?: number;
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

function formatPostDate(dateStr: string | null): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export default function PostCard({ post, index = 0 }: PostCardProps) {
  const categoryColor =
    CATEGORY_COLORS[post.category] ?? "oklch(0.48 0.12 195)";
  const categoryBg = CATEGORY_BG[post.category] ?? "oklch(0.92 0.05 195)";
  const categoryName = CATEGORY_NAMES[post.category] ?? post.category;

  const imageUrl = post.coverImageUrl || getCategoryImage(post.category);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="group h-full"
    >
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="block h-full"
      >
        <div className="h-full rounded-xl overflow-hidden border border-border bg-card shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col">
          {/* Cover Image */}
          <div className="relative aspect-[16/9] overflow-hidden bg-muted">
            <img
              src={imageUrl}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/assets/generated/blog-ayurvedic-herbs.dim_800x500.jpg";
              }}
            />
            {/* Category badge on image */}
            <div className="absolute top-3 left-3">
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ background: categoryBg, color: categoryColor }}
              >
                {categoryName}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-5">
            <h3 className="font-display text-lg font-semibold leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1 mb-4">
              {post.excerpt}
            </p>

            {/* Meta */}
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/50">
              <div className="flex items-center gap-1.5">
                <User className="h-3 w-3" />
                <span className="truncate max-w-[100px]">
                  {post.authorName}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                <span>
                  {formatPostDate(post.publishedAt || post.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export { getCategoryImage, formatPostDate };
