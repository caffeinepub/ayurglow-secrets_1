import type { BlogPost, Comment } from "../types";

const POSTS_KEY = "ayurglow_posts";
const COMMENTS_KEY = "ayurglow_comments";

// ── Posts ──────────────────────────────────────────────────────────────────

export function getPosts(): BlogPost[] {
  try {
    const raw = localStorage.getItem(POSTS_KEY);
    return raw ? (JSON.parse(raw) as BlogPost[]) : [];
  } catch {
    return [];
  }
}

export function savePosts(posts: BlogPost[]): void {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

export function getPost(slug: string): BlogPost | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export function getPostById(id: string): BlogPost | undefined {
  return getPosts().find((p) => p.id === id);
}

export function upsertPost(post: BlogPost): void {
  const posts = getPosts();
  const idx = posts.findIndex((p) => p.id === post.id);
  if (idx >= 0) {
    posts[idx] = post;
  } else {
    posts.unshift(post);
  }
  savePosts(posts);
}

export function deletePost(id: string): void {
  savePosts(getPosts().filter((p) => p.id !== id));
}

export function getPublishedPosts(): BlogPost[] {
  return getPosts().filter((p) => p.status === "published");
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return getPosts().filter(
    (p) => p.status === "published" && p.category === categorySlug,
  );
}

// ── Comments ───────────────────────────────────────────────────────────────

export function getComments(): Comment[] {
  try {
    const raw = localStorage.getItem(COMMENTS_KEY);
    return raw ? (JSON.parse(raw) as Comment[]) : [];
  } catch {
    return [];
  }
}

export function saveComments(comments: Comment[]): void {
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
}

export function getCommentsByPost(postId: string): Comment[] {
  return getComments().filter(
    (c) => c.postId === postId && c.status === "approved",
  );
}

export function getAllComments(): Comment[] {
  return getComments();
}

export function addComment(comment: Comment): void {
  const comments = getComments();
  comments.push(comment);
  saveComments(comments);
}

export function updateCommentStatus(
  id: string,
  status: "pending" | "approved",
): void {
  const comments = getComments();
  const idx = comments.findIndex((c) => c.id === id);
  if (idx >= 0) {
    comments[idx].status = status;
    saveComments(comments);
  }
}

export function deleteComment(id: string): void {
  saveComments(getComments().filter((c) => c.id !== id));
}

// ── Seed ──────────────────────────────────────────────────────────────────

export function isSeeded(): boolean {
  return localStorage.getItem("ayurglow_seeded") === "true";
}

export function markSeeded(): void {
  localStorage.setItem("ayurglow_seeded", "true");
}
