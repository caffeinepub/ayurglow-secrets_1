/**
 * blogApi.ts — Canister-backed blog API
 *
 * Wraps all backend canister calls and maps between canister types
 * (Post / Comment with bigint ids) and frontend BlogPost / FrontendComment types.
 *
 * Inline images are encoded into the content field as a JSON prefix:
 *   [IMAGES:BASE64_JSON_HERE]
 *
 *   actual content here...
 *
 * Where BASE64_JSON_HERE = btoa(JSON.stringify(InlineImage[]))
 */

import { createActorWithConfig } from "../config";
import type { InlineImage } from "../types";
import { loadImage } from "./imageDb";

// ─────────────── Frontend types ────────────────────────────────────────────

export interface FrontendBlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  coverImageUrl: string;
  status: "draft" | "published";
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  authorName: string;
  tags: string[];
  inlineImages: InlineImage[];
}

export interface FrontendComment {
  id: string;
  postId: string;
  commenterName: string;
  commentText: string;
  createdAt: string;
}

// ─────────────── Actor helper ──────────────────────────────────────────────

let _actor: Awaited<ReturnType<typeof createActorWithConfig>> | null = null;
let _actorPromise: Promise<
  Awaited<ReturnType<typeof createActorWithConfig>>
> | null = null;

export function resetActor() {
  _actor = null;
  _actorPromise = null;
}

async function createActor() {
  if (_actor) return _actor;
  if (_actorPromise) return _actorPromise;
  _actorPromise = createActorWithConfig()
    .then((a) => {
      _actor = a;
      _actorPromise = null;
      return a;
    })
    .catch((err) => {
      _actor = null;
      _actorPromise = null;
      throw err;
    });
  return _actorPromise;
}

/** Get actor, retrying up to maxAttempts times with delayMs between each */
export async function getActor(maxAttempts = 4, delayMs = 1500) {
  let lastErr: unknown;
  for (let i = 0; i < maxAttempts; i++) {
    try {
      return await createActor();
    } catch (err) {
      lastErr = err;
      resetActor();
      if (i < maxAttempts - 1) {
        await new Promise((r) => setTimeout(r, delayMs));
      }
    }
  }
  throw lastErr;
}

// ─────────────── Conversion helpers ────────────────────────────────────────

/** Convert bigint nanoseconds → ISO date string */
function nsToIso(ns: bigint): string {
  return new Date(Number(ns / 1_000_000n)).toISOString();
}

/**
 * Normalise legacy category strings (seeded before slugs were used) to slugs.
 * e.g. "Health" -> "health-remedies", "Skin Care" -> "skin-care"
 */
function normalizeCategory(raw: string): string {
  const map: Record<string, string> = {
    health: "health-remedies",
    "health remedies": "health-remedies",
    "skin care": "skin-care",
    skincare: "skin-care",
    "hair care": "hair-care",
    haircare: "hair-care",
    "weight management": "weight-management",
    weightmanagement: "weight-management",
    weight: "weight-management",
    lifestyle: "lifestyle",
    // already-correct slugs pass through
    "health-remedies": "health-remedies",
    "skin-care": "skin-care",
    "hair-care": "hair-care",
    "weight-management": "weight-management",
  };
  const key = raw.toLowerCase().trim();
  return map[key] ?? raw;
}

/** The prefix token used to embed inline images in the content field */
const IMAGES_PREFIX_REGEX = /^\[IMAGES:([A-Za-z0-9+/=]+)\]\n\n?/;

/** Encode inline images into a content prefix.
 *  Stores the full image metadata including the HTTP URL (from blob storage).
 *  The URL is an HTTP URL (not base64), so it is safe to store in the canister.
 */
function encodeImagesPrefix(images: InlineImage[], content: string): string {
  if (!images || images.length === 0) return content;
  try {
    // Include the url field — images now use HTTP URLs from blob storage, not base64
    const toStore = images.map(({ id, url, size, alt, caption }) => ({
      id,
      url: url ?? "",
      size,
      alt,
      caption,
    }));
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(toStore))));
    return `[IMAGES:${encoded}]\n\n${content}`;
  } catch {
    return content;
  }
}

/** Decode inline images from the content prefix, return { images, content } */
function decodeImagesFromContent(raw: string): {
  images: InlineImage[];
  content: string;
} {
  const match = raw.match(IMAGES_PREFIX_REGEX);
  if (!match) return { images: [], content: raw };
  try {
    const decoded = decodeURIComponent(escape(atob(match[1])));
    const images = JSON.parse(decoded) as InlineImage[];
    const content = raw.slice(match[0].length);
    return { images, content };
  } catch {
    return { images: [], content: raw };
  }
}

/** Map a canister Post → FrontendBlogPost */
function mapPost(post: {
  id: bigint;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  coverImageUrl: string;
  isPublished: boolean;
  publishedAt: bigint;
  createdAt: bigint;
  author: string;
  tags: string[];
}): FrontendBlogPost {
  const { images, content } = decodeImagesFromContent(post.content);
  return {
    id: post.id.toString(),
    title: post.title,
    slug: post.slug,
    content,
    excerpt: post.excerpt,
    category: normalizeCategory(post.category),
    coverImageUrl: post.coverImageUrl,
    status: post.isPublished ? "published" : "draft",
    publishedAt: post.publishedAt > 0n ? nsToIso(post.publishedAt) : null,
    createdAt: nsToIso(post.createdAt),
    updatedAt: nsToIso(post.createdAt), // canister has no updatedAt; use createdAt
    authorName: post.author,
    tags: post.tags,
    inlineImages: images,
  };
}

/** Map a canister Comment → FrontendComment */
function mapComment(comment: {
  id: bigint;
  postId: bigint;
  authorName: string;
  content: string;
  createdAt: bigint;
}): FrontendComment {
  return {
    id: comment.id.toString(),
    postId: comment.postId.toString(),
    commenterName: comment.authorName,
    commentText: comment.content,
    createdAt: nsToIso(comment.createdAt),
  };
}

// ─────────────── Image re-hydration ────────────────────────────────────────

/**
 * Re-hydrate image URLs for a post loaded from the canister.
 *
 * - If a cover/inline image already has an HTTP URL (from blob storage), use it directly.
 * - For legacy posts where URLs were stripped, fall back to IndexedDB lookup.
 *
 * Gracefully falls back when no data is found.
 */
export async function rehydratePostImages(
  post: FrontendBlogPost,
): Promise<FrontendBlogPost> {
  // Cover image: use existing URL if it's an HTTP URL, otherwise check IndexedDB
  let coverUrl = post.coverImageUrl || "";
  if (!coverUrl.startsWith("http")) {
    const coverKey = `cover_${post.id}`;
    const coverData = await loadImage(coverKey).catch(() => null);
    coverUrl = coverData ?? coverUrl;
  }

  // Inline images: use URL from decoded data if it's an HTTP URL, otherwise check IndexedDB
  const rehydratedInlineImages = await Promise.all(
    (post.inlineImages ?? []).map(async (img) => {
      if (img.url?.startsWith("http")) {
        return img; // Already has a valid HTTP URL from blob storage
      }
      // Legacy: try IndexedDB
      const storedUrl = await loadImage(img.id).catch(() => null);
      return { ...img, url: storedUrl ?? img.url ?? "" };
    }),
  );

  return {
    ...post,
    coverImageUrl: coverUrl,
    inlineImages: rehydratedInlineImages,
  };
}

// ─────────────── Public API ────────────────────────────────────────────────

export async function getAllPosts(): Promise<FrontendBlogPost[]> {
  const actor = await getActor();
  const posts = await actor.getAllPosts();
  return posts.map(mapPost);
}

export async function getPublishedPosts(): Promise<FrontendBlogPost[]> {
  const actor = await getActor();
  const posts = await actor.getPublishedPosts();
  return posts.map(mapPost);
}

export async function getPostBySlug(
  slug: string,
): Promise<FrontendBlogPost | null> {
  const actor = await getActor();
  const result = await actor.getPostBySlug(slug);
  if (result.length === 0) return null;
  return mapPost(result[0] as Parameters<typeof mapPost>[0]);
}

export async function getPostsByCategory(
  category: string,
): Promise<FrontendBlogPost[]> {
  const actor = await getActor();
  const posts = await actor.getPostsByCategory(category);
  return posts.map(mapPost);
}

/**
 * Create or update a post.
 * New posts have an id that starts with "new_" or is non-numeric.
 * After creation, the canister returns a Post with a real bigint id.
 */
export async function createOrUpdatePost(
  post: FrontendBlogPost,
): Promise<FrontendBlogPost> {
  const actor = await getActor();

  // Encode inline images into content
  const encodedContent = encodeImagesPrefix(
    post.inlineImages ?? [],
    post.content,
  );

  const isNew = post.id.startsWith("new_") || Number.isNaN(Number(post.id));

  // Images are now HTTP URLs from blob-storage, safe to send directly to
  // canister (no base64 stripping needed).
  if (isNew) {
    const created = await actor.createPost(
      post.title,
      post.slug,
      post.excerpt,
      encodedContent,
      post.category,
      post.coverImageUrl,
      post.authorName,
      post.tags,
    );
    return mapPost(created);
  }

  // Existing post — call updatePost
  const result = await actor.updatePost(
    BigInt(post.id),
    post.title,
    post.slug,
    post.excerpt,
    encodedContent,
    post.category,
    post.coverImageUrl,
    post.authorName,
    post.tags,
  );

  if (result.length === 0) {
    throw new Error("Post not found on canister");
  }
  return mapPost(result[0] as Parameters<typeof mapPost>[0]);
}

export async function deletePost(id: string): Promise<boolean> {
  const actor = await getActor();
  return actor.deletePost(BigInt(id));
}

export async function publishPost(
  id: string,
): Promise<FrontendBlogPost | null> {
  const actor = await getActor();
  const result = await actor.publishPost(BigInt(id));
  if (result.length === 0) return null;
  return mapPost(result[0] as Parameters<typeof mapPost>[0]);
}

export async function unpublishPost(
  id: string,
): Promise<FrontendBlogPost | null> {
  const actor = await getActor();
  const result = await actor.unpublishPost(BigInt(id));
  if (result.length === 0) return null;
  return mapPost(result[0] as Parameters<typeof mapPost>[0]);
}

export async function getCommentsByPost(
  postId: string,
): Promise<FrontendComment[]> {
  const actor = await getActor();
  const comments = await actor.getCommentsByPostId(BigInt(postId));
  return comments.map(mapComment);
}

export async function addComment(
  postId: string,
  authorName: string,
  content: string,
): Promise<void> {
  const actor = await getActor();
  await actor.addComment(BigInt(postId), authorName, content);
}
