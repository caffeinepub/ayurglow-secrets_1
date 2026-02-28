import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Comment, Post } from "../backend.d";
import { useActor } from "./useActor";

// ============================================================
// Query Keys
// ============================================================
export const queryKeys = {
  publishedPosts: ["publishedPosts"] as const,
  allPosts: ["allPosts"] as const,
  categories: ["categories"] as const,
  postBySlug: (slug: string) => ["post", "slug", slug] as const,
  postById: (id: bigint) => ["post", "id", id.toString()] as const,
  postsByCategory: (category: string) =>
    ["posts", "category", category] as const,
  comments: (postId: bigint) => ["comments", postId.toString()] as const,
};

// ============================================================
// Queries
// ============================================================

export function usePublishedPosts() {
  const { actor, isFetching } = useActor();
  return useQuery<Post[]>({
    queryKey: queryKeys.publishedPosts,
    queryFn: async () => {
      if (!actor) return [];
      const posts = await actor.getPublishedPosts();
      // Seed if empty
      if (posts.length === 0) {
        await actor.seedData();
        return actor.getPublishedPosts();
      }
      return posts;
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useAllPosts() {
  const { actor, isFetching } = useActor();
  return useQuery<Post[]>({
    queryKey: queryKeys.allPosts,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPosts();
    },
    enabled: !!actor && !isFetching,
    staleTime: 10_000,
  });
}

export function useCategories() {
  const { actor, isFetching } = useActor();
  return useQuery<string[]>({
    queryKey: queryKeys.categories,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategories();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function usePostBySlug(slug: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Post | null>({
    queryKey: queryKeys.postBySlug(slug),
    queryFn: async (): Promise<Post | null> => {
      if (!actor) return null;
      const result = await actor.getPostBySlug(slug);
      return result.length > 0 ? (result[0] as Post) : null;
    },
    enabled: !!actor && !isFetching && !!slug,
    staleTime: 30_000,
  });
}

export function usePostsByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Post[]>({
    queryKey: queryKeys.postsByCategory(category),
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPostsByCategory(category);
    },
    enabled: !!actor && !isFetching && !!category,
    staleTime: 30_000,
  });
}

export function useComments(postId: bigint) {
  const { actor, isFetching } = useActor();
  return useQuery<Comment[]>({
    queryKey: queryKeys.comments(postId),
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCommentsByPostId(postId);
    },
    enabled: !!actor && !isFetching,
    staleTime: 15_000,
  });
}

// ============================================================
// Mutations
// ============================================================

export function useAddComment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      postId,
      authorName,
      content,
    }: {
      postId: bigint;
      authorName: string;
      content: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addComment(postId, authorName, content);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.comments(variables.postId),
      });
    },
  });
}

export function useCreatePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      title: string;
      slug: string;
      excerpt: string;
      content: string;
      category: string;
      coverImageUrl: string;
      author: string;
      tags: string[];
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createPost(
        params.title,
        params.slug,
        params.excerpt,
        params.content,
        params.category,
        params.coverImageUrl,
        params.author,
        params.tags,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.allPosts });
      queryClient.invalidateQueries({ queryKey: queryKeys.publishedPosts });
    },
  });
}

export function useUpdatePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      id: bigint;
      title: string;
      slug: string;
      excerpt: string;
      content: string;
      category: string;
      coverImageUrl: string;
      author: string;
      tags: string[];
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updatePost(
        params.id,
        params.title,
        params.slug,
        params.excerpt,
        params.content,
        params.category,
        params.coverImageUrl,
        params.author,
        params.tags,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.allPosts });
      queryClient.invalidateQueries({ queryKey: queryKeys.publishedPosts });
    },
  });
}

export function usePublishPost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.publishPost(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.allPosts });
      queryClient.invalidateQueries({ queryKey: queryKeys.publishedPosts });
    },
  });
}

export function useUnpublishPost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.unpublishPost(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.allPosts });
      queryClient.invalidateQueries({ queryKey: queryKeys.publishedPosts });
    },
  });
}

export function useDeletePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deletePost(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.allPosts });
      queryClient.invalidateQueries({ queryKey: queryKeys.publishedPosts });
    },
  });
}

// ============================================================
// Helper utilities
// ============================================================

export function formatDate(nanoseconds: bigint): string {
  const ms = Number(nanoseconds) / 1_000_000;
  const date = new Date(ms);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
