// Auto-generated backend bindings
import { Actor, HttpAgent } from "@dfinity/agent";

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

// IDL factory
import { IDL } from "@dfinity/candid";

export const idlFactory = ({ IDL }: { IDL: any }) => {
  const _CaffeineStorageCreateCertificateResult = IDL.Record({
    method: IDL.Text,
    blob_hash: IDL.Text,
  });
  const _CaffeineStorageRefillInformation = IDL.Record({
    proposed_top_up_amount: IDL.Opt(IDL.Nat),
  });
  const _CaffeineStorageRefillResult = IDL.Record({
    success: IDL.Opt(IDL.Bool),
    topped_up_amount: IDL.Opt(IDL.Nat),
  });
  const Comment = IDL.Record({
    id: IDL.Nat,
    content: IDL.Text,
    createdAt: IDL.Int,
    authorName: IDL.Text,
    postId: IDL.Nat,
  });
  const Post = IDL.Record({
    id: IDL.Nat,
    coverImageUrl: IDL.Text,
    title: IDL.Text,
    content: IDL.Text,
    isPublished: IDL.Bool,
    createdAt: IDL.Int,
    slug: IDL.Text,
    tags: IDL.Vec(IDL.Text),
    publishedAt: IDL.Int,
    author: IDL.Text,
    excerpt: IDL.Text,
    category: IDL.Text,
  });
  return IDL.Service({
    _caffeineStorageBlobIsLive: IDL.Func([IDL.Vec(IDL.Nat8)], [IDL.Bool], ["query"]),
    _caffeineStorageBlobsToDelete: IDL.Func([], [IDL.Vec(IDL.Vec(IDL.Nat8))], ["query"]),
    _caffeineStorageConfirmBlobDeletion: IDL.Func([IDL.Vec(IDL.Vec(IDL.Nat8))], [], []),
    _caffeineStorageCreateCertificate: IDL.Func([IDL.Text], [_CaffeineStorageCreateCertificateResult], []),
    _caffeineStorageRefillCashier: IDL.Func([IDL.Opt(_CaffeineStorageRefillInformation)], [_CaffeineStorageRefillResult], []),
    _caffeineStorageUpdateGatewayPrincipals: IDL.Func([], [], []),
    addComment: IDL.Func([IDL.Nat, IDL.Text, IDL.Text], [Comment], []),
    createPost: IDL.Func([IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Vec(IDL.Text)], [Post], []),
    deletePost: IDL.Func([IDL.Nat], [IDL.Bool], []),
    getAllPosts: IDL.Func([], [IDL.Vec(Post)], ["query"]),
    getCategories: IDL.Func([], [IDL.Vec(IDL.Text)], ["query"]),
    getCommentsByPostId: IDL.Func([IDL.Nat], [IDL.Vec(Comment)], ["query"]),
    getPostById: IDL.Func([IDL.Nat], [IDL.Opt(Post)], ["query"]),
    getPostBySlug: IDL.Func([IDL.Text], [IDL.Opt(Post)], ["query"]),
    getPostsByCategory: IDL.Func([IDL.Text], [IDL.Vec(Post)], ["query"]),
    getPublishedPosts: IDL.Func([], [IDL.Vec(Post)], ["query"]),
    publishPost: IDL.Func([IDL.Nat], [IDL.Opt(Post)], []),
    seedData: IDL.Func([], [], []),
    unpublishPost: IDL.Func([IDL.Nat], [IDL.Opt(Post)], []),
    updatePost: IDL.Func([IDL.Nat, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Vec(IDL.Text)], [IDL.Opt(Post)], []),
  });
};
export const init = ({ IDL }: { IDL: any }) => { return []; };

// ===== Platform compatibility shims =====

export type CreateActorOptions = {
  agentOptions?: ConstructorParameters<typeof HttpAgent>[0];
  actorOptions?: Parameters<typeof Actor.createActor>[1];
};

export class ExternalBlob {
  private readonly _url?: string;
  private readonly _bytes?: Uint8Array;
  public readonly onProgress?: (percentage: number) => void;

  private constructor(opts: { url?: string; bytes?: Uint8Array; onProgress?: (percentage: number) => void }) {
    this._url = opts.url;
    this._bytes = opts.bytes;
    this.onProgress = opts.onProgress;
  }

  static fromURL(url: string, onProgress?: (percentage: number) => void): ExternalBlob {
    return new ExternalBlob({ url, onProgress });
  }

  static fromBytes(bytes: Uint8Array, onProgress?: (percentage: number) => void): ExternalBlob {
    return new ExternalBlob({ bytes, onProgress });
  }

  async getBytes(): Promise<Uint8Array> {
    if (this._bytes) return this._bytes;
    if (this._url) {
      const resp = await fetch(this._url);
      return new Uint8Array(await resp.arrayBuffer());
    }
    throw new Error("ExternalBlob: no data source");
  }

  getURL(): string | undefined {
    return this._url;
  }
}

export async function createActor(
  canisterId: string,
  uploadFile: (file: ExternalBlob) => Promise<Uint8Array>,
  downloadFile: (bytes: Uint8Array) => Promise<ExternalBlob>,
  options?: CreateActorOptions,
): Promise<import("./backend.d").backendInterface> {
  const agent = new HttpAgent({
    ...options?.agentOptions,
  });
  const actor = Actor.createActor<import("./backend.d").backendInterface>(idlFactory, {
    agent,
    canisterId,
    ...options?.actorOptions,
  });
  return actor;
}
