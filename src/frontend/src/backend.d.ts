// Auto-generated backend type declarations
export interface Comment {
  id: bigint;
  content: string;
  createdAt: bigint;
  authorName: string;
  postId: bigint;
}

export interface Post {
  id: bigint;
  coverImageUrl: string;
  title: string;
  content: string;
  isPublished: boolean;
  createdAt: bigint;
  slug: string;
  tags: Array<string>;
  publishedAt: bigint;
  author: string;
  excerpt: string;
  category: string;
}

export interface _CaffeineStorageCreateCertificateResult {
  method: string;
  blob_hash: string;
}
export interface _CaffeineStorageRefillInformation {
  proposed_top_up_amount: [] | [bigint];
}
export interface _CaffeineStorageRefillResult {
  success: [] | [boolean];
  topped_up_amount: [] | [bigint];
}

export type backendInterface = {
  _caffeineStorageBlobIsLive: (hash: Uint8Array | number[]) => Promise<boolean>;
  _caffeineStorageBlobsToDelete: () => Promise<Array<Uint8Array | number[]>>;
  _caffeineStorageConfirmBlobDeletion: (blobs: Array<Uint8Array | number[]>) => Promise<undefined>;
  _caffeineStorageCreateCertificate: (blobHash: string) => Promise<_CaffeineStorageCreateCertificateResult>;
  _caffeineStorageRefillCashier: (refillInformation: [] | [_CaffeineStorageRefillInformation]) => Promise<_CaffeineStorageRefillResult>;
  _caffeineStorageUpdateGatewayPrincipals: () => Promise<undefined>;
  addComment: (postId: bigint, authorName: string, content: string) => Promise<Comment>;
  createPost: (title: string, slug: string, excerpt: string, content: string, category: string, coverImageUrl: string, author: string, tags: Array<string>) => Promise<Post>;
  deletePost: (id: bigint) => Promise<boolean>;
  getAllPosts: () => Promise<Array<Post>>;
  getCategories: () => Promise<Array<string>>;
  getCommentsByPostId: (postId: bigint) => Promise<Array<Comment>>;
  getPostById: (id: bigint) => Promise<[] | [Post]>;
  getPostBySlug: (slug: string) => Promise<[] | [Post]>;
  getPostsByCategory: (category: string) => Promise<Array<Post>>;
  getPublishedPosts: () => Promise<Array<Post>>;
  publishPost: (id: bigint) => Promise<[] | [Post]>;
  seedData: () => Promise<undefined>;
  unpublishPost: (id: bigint) => Promise<[] | [Post]>;
  updatePost: (id: bigint, title: string, slug: string, excerpt: string, content: string, category: string, coverImageUrl: string, author: string, tags: Array<string>) => Promise<[] | [Post]>;
};

export declare const idlFactory: any;
export declare const init: (args: { IDL: any }) => any[];
