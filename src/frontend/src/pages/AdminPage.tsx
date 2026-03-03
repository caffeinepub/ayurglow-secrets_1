import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  Clipboard,
  Edit,
  Eye,
  EyeOff,
  FileText,
  Leaf,
  Loader2,
  MessageSquare,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─────────────── formatting toolbar ────────────────────────────────────────

const TOOLBAR_COLORS = [
  { label: "Default", value: "", swatch: "transparent", border: true },
  { label: "Black", value: "#000000", swatch: "#000000" },
  { label: "Red", value: "#dc2626", swatch: "#dc2626" },
  { label: "Orange", value: "#ea580c", swatch: "#ea580c" },
  { label: "Amber", value: "#d97706", swatch: "#d97706" },
  { label: "Green", value: "#16a34a", swatch: "#16a34a" },
  { label: "Blue", value: "#2563eb", swatch: "#2563eb" },
  { label: "Indigo", value: "#4f46e5", swatch: "#4f46e5" },
  { label: "Purple", value: "#9333ea", swatch: "#9333ea" },
] as const;

function insertFormatting(
  textarea: HTMLTextAreaElement,
  before: string,
  after: string,
  setContent: (val: string) => void,
) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selected = textarea.value.slice(start, end);
  const newVal =
    textarea.value.slice(0, start) +
    before +
    selected +
    after +
    textarea.value.slice(end);
  setContent(newVal);
  requestAnimationFrame(() => {
    textarea.focus();
    if (selected.length > 0) {
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selected.length,
      );
    } else {
      const cursor = start + before.length;
      textarea.setSelectionRange(cursor, cursor);
    }
  });
}

function FormattingToolbar({
  textareaRef,
  setContent,
}: {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  setContent: (val: string) => void;
}) {
  return (
    <div
      className="flex flex-wrap items-center gap-1.5 px-2 py-1.5 rounded-t-lg border border-b-0 border-border"
      style={{ background: "oklch(0.975 0.008 148)" }}
    >
      {/* Bold */}
      <button
        type="button"
        title="Bold (wraps with **)"
        onClick={() => {
          if (!textareaRef.current) return;
          insertFormatting(textareaRef.current, "**", "**", setContent);
        }}
        className="h-7 w-7 flex items-center justify-center rounded font-bold text-sm hover:bg-primary/10 transition-colors border border-transparent hover:border-primary/20"
        style={{ color: "oklch(0.22 0.04 210)" }}
      >
        B
      </button>

      {/* Italic */}
      <button
        type="button"
        title="Italic (wraps with _)"
        onClick={() => {
          if (!textareaRef.current) return;
          insertFormatting(textareaRef.current, "_", "_", setContent);
        }}
        className="h-7 w-7 flex items-center justify-center rounded italic text-sm hover:bg-primary/10 transition-colors border border-transparent hover:border-primary/20"
        style={{ color: "oklch(0.22 0.04 210)" }}
      >
        I
      </button>

      {/* Divider */}
      <div
        className="w-px self-stretch"
        style={{ background: "oklch(0.85 0.04 195)" }}
      />

      {/* Color swatches */}
      <span className="text-xs text-muted-foreground mr-0.5">Color:</span>
      {TOOLBAR_COLORS.map((color) => (
        <button
          key={color.label}
          type="button"
          title={color.label}
          onClick={() => {
            if (!textareaRef.current) return;
            if (!color.value) {
              // "Default" — insert nothing / remove color = no-op for now
              // Just focus back on textarea
              textareaRef.current.focus();
              return;
            }
            insertFormatting(
              textareaRef.current,
              `[color:${color.value}]`,
              "[/color]",
              setContent,
            );
          }}
          className="w-5 h-5 rounded-full transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          style={{
            background: color.swatch,
            border:
              "border" in color && color.border
                ? "1.5px solid oklch(0.75 0.05 195)"
                : "1.5px solid transparent",
          }}
        />
      ))}
    </div>
  );
}
import { toast } from "sonner";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import {
  deletePost as apiDeletePost,
  publishPost as apiPublishPost,
  unpublishPost as apiUnpublishPost,
  createOrUpdatePost,
  getAllPosts,
  getCommentsByPost,
  resetActor,
} from "../lib/blogApi";
import type { FrontendBlogPost, FrontendComment } from "../lib/blogApi";
import type { InlineImage } from "../types";
import { CATEGORIES } from "../types";

// Use canister-backed types
type BlogPost = FrontendBlogPost;
type Comment = FrontendComment;

// ─────────────── helpers ───────────────────────────────────────────────────

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

// Compress image to stay well under localStorage limits (~300 KB per image)
function compressImage(
  file: File,
  maxWidth = 1200,
  quality = 0.7,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas not supported"));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL("image/jpeg", quality);
        resolve(compressed);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

// ─────────────── types ─────────────────────────────────────────────────────

interface PostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  coverImageUrl: string;
  authorName: string;
  tags: string;
  publishImmediately: boolean;
  scheduledDate: string;
  status: "draft" | "published";
  inlineImages: InlineImage[];
}

const EMPTY_FORM: PostFormData = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  coverImageUrl: "",
  authorName: "AyurGlow Team",
  tags: "",
  publishImmediately: true,
  scheduledDate: "",
  status: "draft",
  inlineImages: [],
};

type View = "list" | "create" | "edit";

// ─────────────── main component ────────────────────────────────────────────

export default function AdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [view, setView] = useState<View>("list");
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<PostFormData>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [inlineUploading, setInlineUploading] = useState(false);

  // Inline image form
  const [inlineImgFile, setInlineImgFile] = useState<string>("");
  const [inlineImgSize, setInlineImgSize] =
    useState<InlineImage["size"]>("medium");
  const [inlineImgAlt, setInlineImgAlt] = useState("");
  const [inlineImgCaption, setInlineImgCaption] = useState("");
  const inlineFileRef = useRef<HTMLInputElement>(null);
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

  const refreshData = useCallback(async () => {
    setLoadError(null);
    try {
      const allPosts = await getAllPosts();
      setPosts(allPosts);

      // Fetch comments for all posts in parallel
      const commentArrays = await Promise.all(
        allPosts.map((p) => getCommentsByPost(p.id)),
      );
      const allComments = commentArrays.flat();
      setComments(allComments);
    } catch (err) {
      console.error("Failed to load admin data:", err);
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to load posts from canister";
      setLoadError(msg);
      resetActor();
      toast.error("Failed to load posts from canister. Please try again.");
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    refreshData().finally(() => setIsLoading(false));
  }, [refreshData]);

  // Auto-generate slug from title
  const handleTitleChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug:
        prev.slug === "" || prev.slug === slugify(prev.title)
          ? slugify(value)
          : prev.slug,
    }));
  };

  const handleEditPost = async (post: BlogPost) => {
    setEditingPost(post);

    // Images are already decoded from the canister content prefix by blogApi
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      coverImageUrl: post.coverImageUrl,
      authorName: post.authorName,
      tags: post.tags.join(", "),
      publishImmediately: false,
      scheduledDate: post.publishedAt
        ? new Date(post.publishedAt).toISOString().slice(0, 16)
        : "",
      status: post.status,
      inlineImages: post.inlineImages ?? [],
    });
    setView("edit");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewPost = () => {
    setEditingPost(null);
    setForm(EMPTY_FORM);
    setView("create");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setView("list");
    setEditingPost(null);
    setForm(EMPTY_FORM);
    refreshData().catch(console.error);
  };

  // Cover image upload
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    setCoverUploading(true);
    try {
      const compressed = await compressImage(file);
      setForm((prev) => ({ ...prev, coverImageUrl: compressed }));
      toast.success("Cover image uploaded");
    } catch {
      toast.error("Failed to upload image. Please try a smaller file.");
    } finally {
      setCoverUploading(false);
    }
  };

  // Inline image upload
  const handleInlineUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    setInlineUploading(true);
    try {
      const compressed = await compressImage(file);
      setInlineImgFile(compressed);
      toast.success("Image ready to add");
    } catch {
      toast.error("Failed to load image. Please try a smaller file.");
    } finally {
      setInlineUploading(false);
    }
  };

  const handleAddInlineImage = () => {
    if (!inlineImgFile) {
      toast.error("Please upload an image first");
      return;
    }
    const img: InlineImage = {
      id: generateId(),
      url: inlineImgFile,
      size: inlineImgSize,
      alt: inlineImgAlt,
      caption: inlineImgCaption,
    };
    setForm((prev) => ({
      ...prev,
      inlineImages: [...prev.inlineImages, img],
    }));
    setInlineImgFile("");
    setInlineImgAlt("");
    setInlineImgCaption("");
    setInlineImgSize("medium");
    if (inlineFileRef.current) inlineFileRef.current.value = "";
    toast.success("Image added to post");
  };

  const handleRemoveInlineImage = (id: string) => {
    setForm((prev) => ({
      ...prev,
      inlineImages: prev.inlineImages.filter((img) => img.id !== id),
    }));
  };

  const handleUpdateInlineImageSize = (
    id: string,
    size: InlineImage["size"],
  ) => {
    setForm((prev) => ({
      ...prev,
      inlineImages: prev.inlineImages.map((img) =>
        img.id === id ? { ...img, size } : img,
      ),
    }));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.slug || !form.category || !form.authorName) {
      toast.error("Please fill in Title, Slug, Category, and Author");
      return;
    }

    setSubmitting(true);
    try {
      const now = new Date().toISOString();
      const tags = form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      let status: "draft" | "published" = "draft";
      if (form.publishImmediately) {
        status = "published";
      } else if (form.scheduledDate) {
        status = "published";
      } else {
        status = form.status;
      }

      // Use "new_" prefix for new posts so blogApi knows to call createPost
      const postId = editingPost?.id ?? `new_${generateId()}`;

      const post: BlogPost = {
        id: postId,
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        content: form.content,
        category: form.category,
        coverImageUrl: form.coverImageUrl,
        authorName: form.authorName,
        tags,
        status,
        publishedAt:
          editingPost?.publishedAt ?? (status === "published" ? now : null),
        createdAt: editingPost?.createdAt ?? now,
        updatedAt: now,
        inlineImages: form.inlineImages,
      };

      const saved = await createOrUpdatePost(post);

      // If the user wants to publish and the post was just created (draft by default on canister),
      // call publishPost explicitly
      if (status === "published") {
        await apiPublishPost(saved.id);
      }

      toast.success(
        view === "edit"
          ? "Post updated successfully!"
          : status === "published"
            ? "Post published!"
            : "Post saved as draft!",
      );
      setView("list");
      setEditingPost(null);
      setForm(EMPTY_FORM);
      await refreshData();
    } catch (err) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "Failed to save post";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePublish = async (post: BlogPost) => {
    try {
      if (post.status === "published") {
        await apiUnpublishPost(post.id);
        toast.success("Post unpublished");
      } else {
        await apiPublishPost(post.id);
        toast.success("Post published!");
      }
      await refreshData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update post status");
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      await apiDeletePost(id);
      await refreshData();
      toast.success("Post deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete post");
    }
  };

  const publishedCount = posts.filter((p) => p.status === "published").length;
  const draftCount = posts.filter((p) => p.status === "draft").length;
  // Canister comments are all approved (no moderation queue)
  const approvedComments = comments;

  return (
    <div className="min-h-screen flex flex-col botanical-bg">
      <SiteHeader />

      <main className="flex-1">
        {/* Admin header */}
        <div className="py-12" style={{ background: "oklch(0.20 0.06 195)" }}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Leaf
                    className="h-4 w-4"
                    style={{ color: "oklch(0.76 0.14 85)" }}
                  />
                  <span
                    className="text-xs uppercase tracking-[0.2em] font-semibold"
                    style={{ color: "oklch(0.76 0.14 85)" }}
                  >
                    Content Management
                  </span>
                </div>
                <h1
                  className="font-display text-3xl sm:text-4xl font-bold"
                  style={{ color: "oklch(0.97 0.01 148)" }}
                >
                  Admin Panel
                </h1>
              </div>
              <Link to="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5"
                  style={{ color: "oklch(0.80 0.05 175)" }}
                >
                  <ArrowLeft className="h-4 w-4" />
                  View Site
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            {view === "list" ? (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <Tabs defaultValue="posts">
                  <div className="flex items-center justify-between mb-4">
                    <TabsList>
                      <TabsTrigger value="posts" className="gap-1.5">
                        <FileText className="h-3.5 w-3.5" />
                        Posts
                        <span className="text-xs">({posts.length})</span>
                      </TabsTrigger>
                      <TabsTrigger value="comments" className="gap-1.5">
                        <MessageSquare className="h-3.5 w-3.5" />
                        Comments
                        <span className="text-xs">({comments.length})</span>
                      </TabsTrigger>
                    </TabsList>

                    <Button
                      onClick={handleNewPost}
                      style={{
                        background: "oklch(0.42 0.12 195)",
                        color: "white",
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      New Post
                    </Button>
                  </div>

                  {/* ── POSTS TAB ── */}
                  <TabsContent value="posts">
                    {/* Stats */}
                    <div className="flex gap-6 mb-6">
                      <div className="text-sm">
                        <span className="text-2xl font-display font-bold text-primary">
                          {publishedCount}
                        </span>
                        <span className="text-muted-foreground ml-1.5">
                          published
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-2xl font-display font-bold text-muted-foreground">
                          {draftCount}
                        </span>
                        <span className="text-muted-foreground ml-1.5">
                          drafts
                        </span>
                      </div>
                    </div>

                    {isLoading ? (
                      <div className="flex items-center justify-center py-20">
                        <Loader2
                          className="h-8 w-8 animate-spin"
                          style={{ color: "oklch(0.42 0.12 195)" }}
                        />
                      </div>
                    ) : loadError ? (
                      <div className="text-center py-20 rounded-xl border border-dashed border-destructive/30">
                        <FileText className="h-12 w-12 mx-auto mb-3 opacity-20" />
                        <p className="text-destructive font-medium mb-2">
                          Failed to load posts from canister
                        </p>
                        <p className="text-xs text-muted-foreground mb-4 max-w-xs mx-auto">
                          The canister may be initialising. Please wait a moment
                          and try again.
                        </p>
                        <Button
                          onClick={() => {
                            setIsLoading(true);
                            refreshData().finally(() => setIsLoading(false));
                          }}
                          style={{
                            background: "oklch(0.42 0.12 195)",
                            color: "white",
                          }}
                        >
                          <Loader2 className="h-4 w-4 mr-2" />
                          Retry
                        </Button>
                      </div>
                    ) : posts.length === 0 ? (
                      <div className="text-center py-20 rounded-xl border border-dashed border-border">
                        <FileText className="h-12 w-12 mx-auto mb-3 opacity-20" />
                        <p className="text-muted-foreground font-medium mb-4">
                          No posts yet
                        </p>
                        <Button
                          onClick={handleNewPost}
                          style={{
                            background: "oklch(0.42 0.12 195)",
                            color: "white",
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Create First Post
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {posts.map((post) => (
                          <motion.div
                            key={post.id}
                            layout
                            className="rounded-xl border border-border bg-card p-4 sm:p-5"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center flex-wrap gap-2 mb-1">
                                  <h3 className="font-semibold text-sm truncate">
                                    {post.title}
                                  </h3>
                                  <Badge
                                    className="shrink-0 text-xs"
                                    style={
                                      post.status === "published"
                                        ? {
                                            background: "oklch(0.55 0.15 195)",
                                            color: "white",
                                          }
                                        : {}
                                    }
                                    variant={
                                      post.status === "published"
                                        ? "default"
                                        : "secondary"
                                    }
                                  >
                                    {post.status === "published"
                                      ? "Published"
                                      : "Draft"}
                                  </Badge>
                                </div>
                                <div className="flex items-center flex-wrap gap-2 text-xs text-muted-foreground">
                                  <span
                                    className="font-medium"
                                    style={{ color: "oklch(0.48 0.10 195)" }}
                                  >
                                    {CATEGORIES.find(
                                      (c) => c.slug === post.category,
                                    )?.name ?? post.category}
                                  </span>
                                  <span>·</span>
                                  <span>{post.authorName}</span>
                                  <span>·</span>
                                  <span>{formatDate(post.createdAt)}</span>
                                  {post.publishedAt && (
                                    <>
                                      <span>·</span>
                                      <span>
                                        Published:{" "}
                                        {formatDate(post.publishedAt)}
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleTogglePublish(post)}
                                  className="gap-1.5 text-xs"
                                >
                                  {post.status === "published" ? (
                                    <>
                                      <EyeOff className="h-3.5 w-3.5" />
                                      Unpublish
                                    </>
                                  ) : (
                                    <>
                                      <Eye className="h-3.5 w-3.5" />
                                      Publish
                                    </>
                                  )}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditPost(post)}
                                  className="gap-1.5 text-xs border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
                                >
                                  <Edit className="h-3.5 w-3.5" />
                                  Edit
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-destructive hover:bg-destructive/10"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Delete Post
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete "
                                        {post.title}"? This cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        onClick={() =>
                                          handleDeletePost(post.id)
                                        }
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  {/* ── COMMENTS TAB ── */}
                  <TabsContent value="comments">
                    <div className="space-y-4">
                      <h3 className="font-display font-semibold text-lg mb-3">
                        All Comments
                        <span className="text-muted-foreground font-normal text-sm ml-2">
                          ({approvedComments.length})
                        </span>
                      </h3>
                      {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                          <Loader2
                            className="h-6 w-6 animate-spin"
                            style={{ color: "oklch(0.42 0.12 195)" }}
                          />
                        </div>
                      ) : approvedComments.length === 0 ? (
                        <p className="text-sm text-muted-foreground py-4">
                          No comments yet.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {approvedComments.map((c) => (
                            <div
                              key={c.id}
                              className="rounded-xl border border-border bg-card p-4 flex items-start justify-between gap-3"
                            >
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <span className="font-semibold text-sm">
                                    {c.commenterName}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    · {formatDate(c.createdAt)}
                                  </span>
                                  <Badge
                                    className="text-xs"
                                    style={{
                                      background: "oklch(0.92 0.06 155)",
                                      color: "oklch(0.35 0.10 155)",
                                    }}
                                  >
                                    Live
                                  </Badge>
                                </div>
                                <p className="text-sm text-foreground">
                                  {c.commentText}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  Post ID: {c.postId}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            ) : (
              /* ════════════ POST FORM ════════════ */
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="max-w-3xl mx-auto"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCancel}
                    className="gap-1.5 text-muted-foreground"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                  <h2 className="font-display text-2xl font-bold">
                    {view === "edit" ? "Edit Post" : "New Post"}
                  </h2>
                </div>

                <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-card space-y-6">
                  {/* ──── COVER IMAGE (top) ──── */}
                  <div className="space-y-2">
                    <Label>Cover Image</Label>
                    <div className="flex flex-col gap-3">
                      {form.coverImageUrl && (
                        <div className="relative rounded-lg overflow-hidden aspect-[16/9] bg-muted">
                          <img
                            src={form.coverImageUrl}
                            alt="Cover preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setForm((prev) => ({
                                ...prev,
                                coverImageUrl: "",
                              }))
                            }
                            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )}
                      <label className="cursor-pointer">
                        <div className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border py-3 px-4 text-sm text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors">
                          {coverUploading ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="h-4 w-4" />
                              Upload cover image
                            </>
                          )}
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleCoverUpload}
                          disabled={coverUploading}
                        />
                      </label>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">
                          Or enter image URL
                        </Label>
                        <Input
                          placeholder="https://..."
                          value={form.coverImageUrl}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              coverImageUrl: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* ──── TITLE ──── */}
                  <div className="space-y-1.5">
                    <Label htmlFor="title">
                      Title <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="title"
                      placeholder="e.g., 5 Ayurvedic Herbs for Glowing Skin"
                      value={form.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                    />
                  </div>

                  {/* ──── SLUG ──── */}
                  <div className="space-y-1.5">
                    <Label htmlFor="slug">
                      Slug <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="slug"
                      placeholder="auto-generated-from-title"
                      value={form.slug}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, slug: e.target.value }))
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      URL: /blog/{form.slug || "your-post-slug"}
                    </p>
                  </div>

                  {/* ──── CATEGORY + AUTHOR ──── */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label>
                        Category <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={form.category}
                        onValueChange={(v) =>
                          setForm((prev) => ({ ...prev, category: v }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map((cat) => (
                            <SelectItem key={cat.slug} value={cat.slug}>
                              {cat.icon} {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="author">
                        Author <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="author"
                        placeholder="e.g., AyurGlow Team"
                        value={form.authorName}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            authorName: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  {/* ──── TAGS ──── */}
                  <div className="space-y-1.5">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      placeholder="ayurveda, herbs, wellness (comma-separated)"
                      value={form.tags}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, tags: e.target.value }))
                      }
                    />
                  </div>

                  <Separator />

                  {/* ──── EXCERPT ──── */}
                  <div className="space-y-1.5">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      placeholder="A brief summary of your article (appears in post cards)"
                      value={form.excerpt}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          excerpt: e.target.value,
                        }))
                      }
                      rows={3}
                      className="resize-none"
                    />
                  </div>

                  {/* ──── CONTENT ──── */}
                  <div className="space-y-1.5">
                    <Label htmlFor="content">Content</Label>
                    <FormattingToolbar
                      textareaRef={contentTextareaRef}
                      setContent={(val) =>
                        setForm((prev) => ({ ...prev, content: val }))
                      }
                    />
                    <Textarea
                      id="content"
                      ref={contentTextareaRef}
                      placeholder="Write your article content here in plain text. Each new line will appear as a new paragraph."
                      value={form.content}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                      rows={18}
                      className="text-sm resize-y rounded-t-none"
                    />
                    <p className="text-xs text-muted-foreground">
                      Write plain text. Separate paragraphs with a blank line.
                      To place an image in-between your content, upload it
                      below, then click the <strong>📋 Copy Tag</strong> button
                      next to it and paste the tag (e.g.{" "}
                      <code>[image:abc123]</code>) at the exact spot in your
                      text where you want it to appear.
                    </p>
                  </div>

                  <Separator />

                  {/* ──── INLINE IMAGES ──── */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">
                      In-Post Images
                    </Label>
                    <p className="text-xs text-muted-foreground -mt-2">
                      Upload images here, then click the{" "}
                      <strong>📋 Copy Tag</strong> button next to each image to
                      get a tag like <code>[image:abc123]</code>. Paste that tag
                      anywhere in your content above where you want the image to
                      appear. Images without a tag will appear after your
                      content.
                    </p>

                    {/* Inline image uploader */}
                    <div
                      className="rounded-xl border border-border p-5 space-y-4"
                      style={{ background: "oklch(0.975 0.008 148)" }}
                    >
                      <div className="flex items-center gap-3">
                        <label className="cursor-pointer flex-1">
                          <div className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border py-3 px-4 text-sm text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors">
                            {inlineUploading ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Loading...
                              </>
                            ) : inlineImgFile ? (
                              <>
                                <Check className="h-4 w-4 text-green-600" />
                                Image loaded — configure below
                              </>
                            ) : (
                              <>
                                <Upload className="h-4 w-4" />
                                Upload in-post image
                              </>
                            )}
                          </div>
                          <input
                            ref={inlineFileRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleInlineUpload}
                            disabled={inlineUploading}
                          />
                        </label>
                      </div>

                      {inlineImgFile && (
                        <div className="space-y-3">
                          <img
                            src={inlineImgFile}
                            alt="Preview"
                            className="max-h-32 rounded-lg border border-border"
                          />
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <Label className="text-xs">Image Size</Label>
                              <Select
                                value={inlineImgSize}
                                onValueChange={(v) =>
                                  setInlineImgSize(v as InlineImage["size"])
                                }
                              >
                                <SelectTrigger className="h-8 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="small">
                                    Small (300px)
                                  </SelectItem>
                                  <SelectItem value="medium">
                                    Medium (500px)
                                  </SelectItem>
                                  <SelectItem value="large">
                                    Large (700px)
                                  </SelectItem>
                                  <SelectItem value="full">
                                    Full Width
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Alt Text</Label>
                              <Input
                                placeholder="Describe the image"
                                value={inlineImgAlt}
                                onChange={(e) =>
                                  setInlineImgAlt(e.target.value)
                                }
                                className="h-8 text-xs"
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">
                              Caption (optional)
                            </Label>
                            <Input
                              placeholder="Image caption"
                              value={inlineImgCaption}
                              onChange={(e) =>
                                setInlineImgCaption(e.target.value)
                              }
                              className="h-8 text-xs"
                            />
                          </div>
                          <Button
                            type="button"
                            size="sm"
                            onClick={handleAddInlineImage}
                            style={{
                              background: "oklch(0.50 0.14 165)",
                              color: "white",
                            }}
                          >
                            <Plus className="h-3.5 w-3.5 mr-1.5" />
                            Add Image to Post
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Added inline images list */}
                    {form.inlineImages.length > 0 && (
                      <div className="space-y-3">
                        <p className="text-sm font-medium text-muted-foreground">
                          Added images ({form.inlineImages.length})
                        </p>
                        {form.inlineImages.map((img) => (
                          <div
                            key={img.id}
                            className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
                          >
                            <img
                              src={img.url}
                              alt={img.alt}
                              className="w-14 h-10 object-cover rounded border border-border shrink-0"
                            />
                            <div className="flex-1 min-w-0 space-y-1">
                              <div className="flex items-center gap-2">
                                <Select
                                  value={img.size}
                                  onValueChange={(v) =>
                                    handleUpdateInlineImageSize(
                                      img.id,
                                      v as InlineImage["size"],
                                    )
                                  }
                                >
                                  <SelectTrigger className="h-6 text-xs w-28">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="small">Small</SelectItem>
                                    <SelectItem value="medium">
                                      Medium
                                    </SelectItem>
                                    <SelectItem value="large">Large</SelectItem>
                                    <SelectItem value="full">Full</SelectItem>
                                  </SelectContent>
                                </Select>
                                {img.alt && (
                                  <span className="text-xs text-muted-foreground truncate">
                                    {img.alt}
                                  </span>
                                )}
                              </div>
                              {img.caption && (
                                <p className="text-xs text-muted-foreground truncate">
                                  {img.caption}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                title="Copy image tag to paste in content"
                                onClick={() => {
                                  navigator.clipboard
                                    .writeText(`[image:${img.id}]`)
                                    .then(() =>
                                      toast.success(
                                        `Tag [image:${img.id.slice(0, 6)}…] copied — paste it in your content where you want this image`,
                                      ),
                                    )
                                    .catch(() =>
                                      toast.error(
                                        "Could not copy to clipboard",
                                      ),
                                    );
                                }}
                                className="h-7 text-xs gap-1"
                                style={{ color: "oklch(0.42 0.12 195)" }}
                              >
                                <Clipboard className="h-3.5 w-3.5" />
                                Copy Tag
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveInlineImage(img.id)}
                                className="text-destructive h-7"
                              >
                                <X className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* ──── PUBLICATION SETTINGS ──── */}
                  <div
                    className="rounded-xl border border-border p-5 space-y-4"
                    style={{ background: "oklch(0.975 0.008 148)" }}
                  >
                    <h3 className="font-display font-semibold text-base">
                      Publication Settings
                    </h3>

                    {/* Publish Immediately toggle */}
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="publish-now" className="cursor-pointer">
                          Publish Immediately
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Sets status to published with current timestamp
                        </p>
                      </div>
                      <Switch
                        id="publish-now"
                        checked={form.publishImmediately}
                        onCheckedChange={(checked) =>
                          setForm((prev) => ({
                            ...prev,
                            publishImmediately: checked,
                          }))
                        }
                      />
                    </div>

                    {/* Scheduled date (shown when not publishing immediately) */}
                    {!form.publishImmediately && (
                      <div className="space-y-1.5">
                        <Label htmlFor="scheduled-date">
                          Scheduled Publication Date
                        </Label>
                        <Input
                          id="scheduled-date"
                          type="datetime-local"
                          value={form.scheduledDate}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              scheduledDate: e.target.value,
                            }))
                          }
                        />
                        <p className="text-xs text-muted-foreground">
                          Leave empty to save as draft
                        </p>
                      </div>
                    )}

                    {/* Status radio */}
                    {!form.publishImmediately && !form.scheduledDate && (
                      <div className="space-y-2">
                        <Label>Status</Label>
                        <div className="flex gap-4">
                          {(["draft", "published"] as const).map((s) => (
                            <label
                              key={s}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <input
                                type="radio"
                                name="status"
                                value={s}
                                checked={form.status === s}
                                onChange={() =>
                                  setForm((prev) => ({ ...prev, status: s }))
                                }
                                className="accent-primary"
                              />
                              <span className="text-sm capitalize">{s}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ──── SAVE BUTTON ──── */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      className="flex-1 border-muted text-muted-foreground"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="flex-1"
                      style={{
                        background: "oklch(0.42 0.12 195)",
                        color: "white",
                      }}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4 mr-2" />
                          {form.publishImmediately
                            ? "Publish Post"
                            : form.scheduledDate
                              ? "Schedule Post"
                              : "Save Post"}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
