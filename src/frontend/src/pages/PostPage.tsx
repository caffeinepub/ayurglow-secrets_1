import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  Facebook,
  Leaf,
  Loader2,
  MessageCircle,
  Send,
  Share2,
  Tag,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import type React from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import PostCard from "../components/PostCard";
import { formatPostDate, getCategoryImage } from "../components/PostCard";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import {
  addComment,
  getCommentsByPost,
  getPost,
  getPostsByCategory,
} from "../lib/storage";
import type { BlogPost, Comment } from "../types";
import { CATEGORIES } from "../types";

const CATEGORY_COLORS: Record<string, { text: string; bg: string }> = {
  "health-remedies": {
    text: "oklch(0.44 0.13 148)",
    bg: "oklch(0.92 0.06 148)",
  },
  "skin-care": { text: "oklch(0.42 0.12 195)", bg: "oklch(0.92 0.05 195)" },
  "hair-care": { text: "oklch(0.40 0.12 230)", bg: "oklch(0.92 0.05 230)" },
  "weight-management": {
    text: "oklch(0.42 0.12 215)",
    bg: "oklch(0.92 0.05 215)",
  },
  lifestyle: { text: "oklch(0.44 0.13 148)", bg: "oklch(0.90 0.07 148)" },
};

function getCategoryName(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
}

const MAX_WIDTHS: Record<string, string> = {
  small: "300px",
  medium: "500px",
  large: "700px",
  full: "100%",
};

// ─────────────── inline formatting parser ──────────────────────────────────

/**
 * Parse a single line of text and return an array of React nodes, converting:
 *  **text**             → <strong>
 *  _text_               → <em>
 *  [color:#hex]text[/color] → <span style={{color}}>
 */
function renderLine(line: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let rest = line;
  let keyIdx = 0;

  // Token regex — order matters: color tags first, then bold, then italic
  const TOKEN =
    /(\[color:(#[0-9a-fA-F]{3,8})\])([\s\S]*?)(\[\/color\])|(\*\*)([\s\S]*?)(\*\*)|(_)([\s\S]*?)(_)/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  // biome-ignore lint/suspicious/noAssignInExpressions: standard regex loop pattern
  while ((match = TOKEN.exec(rest)) !== null) {
    // Push text before this match as a plain string
    if (match.index > lastIndex) {
      nodes.push(rest.slice(lastIndex, match.index));
    }

    if (match[1]) {
      // Color: groups 1-4
      const color = match[2];
      const inner = match[3];
      nodes.push(
        <span key={`c-${keyIdx++}`} style={{ color }}>
          {renderLine(inner)}
        </span>,
      );
    } else if (match[5]) {
      // Bold: groups 5-7
      const inner = match[6];
      nodes.push(<strong key={`b-${keyIdx++}`}>{renderLine(inner)}</strong>);
    } else if (match[8]) {
      // Italic: groups 8-10
      const inner = match[9];
      nodes.push(<em key={`i-${keyIdx++}`}>{renderLine(inner)}</em>);
    }

    lastIndex = match.index + match[0].length;
  }

  // Push any remaining text
  if (lastIndex < rest.length) {
    nodes.push(rest.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [line];
}

function InlineImageFigure({
  img,
  className,
}: {
  img: import("../types").InlineImage;
  className?: string;
}) {
  return (
    <figure
      className={`mx-auto ${className ?? ""}`}
      style={{ maxWidth: MAX_WIDTHS[img.size] }}
    >
      <img
        src={img.url}
        alt={img.alt}
        className="w-full rounded-xl border border-border shadow-sm"
      />
      {img.caption && (
        <figcaption className="text-center text-xs text-muted-foreground mt-2">
          {img.caption}
        </figcaption>
      )}
    </figure>
  );
}

function PostContent({
  content,
  inlineImages,
}: {
  content: string;
  inlineImages: import("../types").InlineImage[];
}) {
  // Build a lookup map for quick access by id
  const imgMap = new Map(inlineImages.map((img) => [img.id, img]));
  // Track which images were rendered inline so we can show the rest at the end
  const renderedIds = new Set<string>();

  // Split content on [image:id] tags, preserving the tokens
  const IMAGE_TAG = /(\[image:[^\]]+\])/g;
  const tokens = content.split(IMAGE_TAG);

  // Group tokens into paragraphs + image nodes
  type Node =
    | { type: "paragraph"; text: string }
    | { type: "image"; id: string };

  const nodes: Node[] = [];
  let textBuffer = "";

  const flushText = () => {
    if (textBuffer.trim()) {
      nodes.push({ type: "paragraph", text: textBuffer });
    }
    textBuffer = "";
  };

  for (const token of tokens) {
    const match = token.match(/^\[image:([^\]]+)\]$/);
    if (match) {
      flushText();
      nodes.push({ type: "image", id: match[1] });
    } else {
      textBuffer += token;
    }
  }
  flushText();

  return (
    <>
      {nodes.map((node, idx) => {
        if (node.type === "image") {
          const img = imgMap.get(node.id);
          if (!img) return null;
          renderedIds.add(img.id);
          return (
            // biome-ignore lint/suspicious/noArrayIndexKey: positional index is stable for rendered nodes
            <div key={idx} className="my-6">
              <InlineImageFigure img={img} />
            </div>
          );
        }
        // paragraph node
        const paragraphs = node.text.split(/\n\n+/).filter((b) => b.trim());
        return paragraphs.map((block) => {
          const key = `para-${idx}-${block.slice(0, 40)}`;
          const lines = block.trim().split(/\n/);
          return (
            <p key={key} className="mb-4 leading-relaxed">
              {lines.map((line, li) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: line breaks within a paragraph have no stable identity
                <span key={li}>
                  {renderLine(line)}
                  {li < lines.length - 1 && <br />}
                </span>
              ))}
            </p>
          );
        });
      })}
      {/* Append any images that weren't placed via tags */}
      {inlineImages.filter((img) => !renderedIds.has(img.id)).length > 0 && (
        <div className="mt-8 space-y-6">
          {inlineImages
            .filter((img) => !renderedIds.has(img.id))
            .map((img) => (
              <InlineImageFigure key={img.id} img={img} />
            ))}
        </div>
      )}
    </>
  );
}

export default function PostPage() {
  const { slug } = useParams({ from: "/blog/$slug" });
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [commenterName, setCommenterName] = useState("");
  const [email, setEmail] = useState("");
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setLoading(true);
    const found = getPost(slug);
    setPost(found ?? null);
    if (found) {
      setComments(getCommentsByPost(found.id));
      const related = getPostsByCategory(found.category)
        .filter((p) => p.id !== found.id)
        .slice(0, 3);
      setRelatedPosts(related);
    }
    setLoading(false);
  }, [slug]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post || !commenterName.trim() || !commentText.trim()) return;
    setSubmitting(true);
    try {
      const newComment: Comment = {
        id: Math.random().toString(36).slice(2) + Date.now().toString(36),
        postId: post.id,
        commenterName: commenterName.trim(),
        email: email.trim(),
        commentText: commentText.trim(),
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      addComment(newComment);
      setCommenterName("");
      setEmail("");
      setCommentText("");
      setSubmitted(true);
      toast.success("Comment submitted! Awaiting moderation.");
    } catch {
      toast.error("Failed to submit comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = post?.title ?? "";

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col botanical-bg">
        <SiteHeader />
        <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-32" />
            <div className="aspect-[2/1] w-full bg-muted rounded-2xl" />
            <div className="h-10 bg-muted rounded w-3/4" />
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-11/12" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-4/5" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-full" />
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col botanical-bg">
        <SiteHeader />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <Leaf className="h-16 w-16 mx-auto mb-4 opacity-20" />
          <h1 className="font-display text-3xl font-bold mb-2">
            Post Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            This article may have been removed or the link is incorrect.
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

  const categoryColors = CATEGORY_COLORS[post.category] ?? {
    text: "oklch(0.42 0.12 195)",
    bg: "oklch(0.92 0.05 195)",
  };
  const coverImage = post.coverImageUrl || getCategoryImage(post.category);

  return (
    <div className="min-h-screen flex flex-col botanical-bg">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero cover */}
        <div className="relative h-72 sm:h-96 overflow-hidden">
          <img
            src={coverImage}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/assets/generated/blog-ayurvedic-herbs.dim_800x500.jpg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 -mt-24 relative pb-12">
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            {/* Article */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-2xl shadow-card p-6 sm:p-10 mb-8 border border-border"
            >
              {/* Category badge */}
              <div className="mb-4 flex items-center gap-2 flex-wrap">
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{
                    background: categoryColors.bg,
                    color: categoryColors.text,
                  }}
                >
                  {getCategoryName(post.category)}
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl font-bold leading-snug mb-4">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  <span>{post.authorName}</span>
                </div>
                {post.publishedAt && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <span>{formatPostDate(post.publishedAt)}</span>
                  </div>
                )}
              </div>

              {/* Excerpt */}
              {post.excerpt && (
                <p
                  className="text-base leading-relaxed mb-6 font-medium px-4 py-3 rounded-lg border-l-4"
                  style={{
                    color: "oklch(0.45 0.08 190)",
                    borderColor: "oklch(0.76 0.14 85)",
                    background: "oklch(0.96 0.02 85 / 0.4)",
                  }}
                >
                  {post.excerpt}
                </p>
              )}

              <Separator className="mb-6" />

              {/* Content – render as plain text paragraphs with inline images */}
              <div className="ayur-prose">
                <PostContent
                  content={post.content}
                  inlineImages={post.inlineImages ?? []}
                />
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-border/50 flex flex-wrap gap-2 items-center">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Share */}
              <div className="mt-8 pt-6 border-t border-border/50">
                <div className="flex items-center gap-3 flex-wrap">
                  <Share2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Share:
                  </span>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                    style={{
                      background: "oklch(0.42 0.12 230)",
                      color: "white",
                    }}
                  >
                    <Facebook className="h-3.5 w-3.5" />
                    Facebook
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                    style={{
                      background: "oklch(0.22 0.04 210)",
                      color: "white",
                    }}
                  >
                    𝕏 Twitter
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`${shareTitle} ${shareUrl}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                    style={{
                      background: "oklch(0.48 0.14 155)",
                      color: "white",
                    }}
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.article>

            {/* ========= COMMENTS ========= */}
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-6">
                <MessageCircle
                  className="h-5 w-5"
                  style={{ color: "oklch(0.42 0.12 195)" }}
                />
                <h2 className="font-display text-2xl font-bold">
                  Comments{" "}
                  <span className="text-muted-foreground font-normal text-lg">
                    ({comments.length})
                  </span>
                </h2>
              </div>

              {/* Comment list */}
              <div className="space-y-4 mb-8">
                {comments.length === 0 ? (
                  <div className="text-center py-8 rounded-xl border border-dashed border-border text-muted-foreground">
                    <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">
                      No comments yet. Be the first to share your thoughts!
                    </p>
                  </div>
                ) : (
                  comments.map((comment) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl border border-border bg-card p-4 sm:p-5"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm font-bold"
                          style={{
                            background: "oklch(0.92 0.06 195)",
                            color: "oklch(0.42 0.12 195)",
                          }}
                        >
                          {comment.commenterName.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="font-semibold text-sm">
                              {comment.commenterName}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatPostDate(comment.createdAt)}
                            </span>
                          </div>
                          <p className="text-sm leading-relaxed text-foreground">
                            {comment.commentText}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Add comment form */}
              <div
                className="rounded-xl border border-border bg-card p-5 sm:p-6"
                style={{
                  boxShadow: "0 2px 16px -4px oklch(0.42 0.12 195 / 0.08)",
                }}
              >
                <h3 className="font-display text-lg font-semibold mb-4">
                  Leave a Comment
                </h3>

                {submitted ? (
                  <div
                    className="rounded-lg p-4 text-sm font-medium"
                    style={{
                      background: "oklch(0.92 0.06 155)",
                      color: "oklch(0.28 0.09 155)",
                    }}
                  >
                    ✅ Your comment has been submitted and is awaiting
                    moderation. Thank you!
                  </div>
                ) : (
                  <form onSubmit={handleSubmitComment} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Input
                        placeholder="Your name *"
                        value={commenterName}
                        onChange={(e) => setCommenterName(e.target.value)}
                        required
                        disabled={submitting}
                      />
                      <Input
                        type="email"
                        placeholder="Email (optional)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={submitting}
                      />
                    </div>
                    <Textarea
                      placeholder="Share your thoughts, experiences, or questions..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      required
                      rows={4}
                      disabled={submitting}
                      className="resize-none"
                    />
                    <Button
                      type="submit"
                      disabled={
                        submitting ||
                        !commenterName.trim() ||
                        !commentText.trim()
                      }
                      className="w-full sm:w-auto"
                      style={{
                        background: "oklch(0.42 0.12 195)",
                        color: "white",
                      }}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Posting...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Post Comment
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </section>

            {/* ========= RELATED POSTS ========= */}
            {relatedPosts.length > 0 && (
              <section className="mb-10">
                <h2 className="font-display text-2xl font-bold mb-6">
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedPosts.map((related, i) => (
                    <PostCard key={related.id} post={related} index={i} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
