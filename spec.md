# AyurGlow Secrets

## Current State

All blog posts, comments, and images are stored in the **user's own browser** (localStorage + IndexedDB). This means:
- Posts created in the admin panel only exist on the device/browser that created them.
- Visitors who open the shared website URL see zero posts because their browser has no data.
- The backend canister already has full CRUD APIs (`createPost`, `updatePost`, `publishPost`, `unpublishPost`, `deletePost`, `getAllPosts`, `getPublishedPosts`, `getPostBySlug`, `getPostsByCategory`, `addComment`, `getCommentsByPostId`) ready to use.
- Images (cover + inline) are base64 data URLs stored in IndexedDB.

## Requested Changes (Diff)

### Add
- A `useBackend` hook or direct actor usage in AdminPage, BlogPage, PostPage to call canister APIs.
- A shared `blogApi.ts` utility that wraps all canister calls and maps between the canister `Post` type (using `bigint` IDs) and the frontend `BlogPost` type.
- Image handling: cover images and inline images remain as base64 data URLs stored inside the post's `coverImageUrl` and content/inlineImages fields — the canister `coverImageUrl` field is a text field that can hold a base64 string.
- Inline images: serialize the inlineImages array as a JSON string embedded in the content or as a separate field. Since the canister `content` is a text field, inline image metadata + base64 URLs should be encoded into `coverImageUrl` and stored via a special JSON prefix in `content` like `[IMAGES:json]...rest of content` OR serialized into the `tags` array. Best approach: store inline images JSON in the `excerpt` field is bad. Instead, encode inline images as a special JSON block at the START of content: `[inlineImages:BASE64_JSON]\n\nactual content`. The PostPage parser already handles `[image:id]` tags — keep this pattern but hydrate image URLs from the JSON block.
- Loading states (`Loader2` spinner) while backend calls are in flight on BlogPage and PostPage.

### Modify
- **`src/frontend/src/lib/blogApi.ts`** (new file): All backend canister interactions — create, update, delete, publish, unpublish, list posts, get post by slug, get posts by category, add comment, get comments by post.
- **`AdminPage.tsx`**: Replace all `upsertPost`, `deletePost`, `getPosts`, `getAllComments`, `updateCommentStatus`, `deleteComment` localStorage calls with backend canister calls via `blogApi.ts`. Keep the form UI exactly as-is. Add loading state for initial post list fetch.
- **`BlogPage.tsx`**: Replace `getPublishedPosts()` localStorage call with `blogApi.getPublishedPosts()` backend call.
- **`PostPage.tsx`**: Replace `getPost(slug)`, `getCommentsByPost()`, `getPostsByCategory()`, `addComment()` localStorage calls with backend canister calls via `blogApi.ts`. Keep inline image hydration logic but source images from the embedded JSON in content.
- **`src/frontend/src/lib/storage.ts`**: Keep the file (seed system may reference it) but the main app pages no longer use it for blog data.

### Remove
- Direct `import` of localStorage functions (`getPosts`, `getPublishedPosts`, `getPost`, `upsertPost`, `deletePost`, `addComment`, `getCommentsByPost`, `getPostsByCategory`, `getAllComments`, `updateCommentStatus`, `deleteComment`) from AdminPage, BlogPage, PostPage.
- Direct `import` of `loadImage`, `loadImages` from `imageDb.ts` in AdminPage and PostPage (images are now embedded in the post data from the canister).

## Implementation Plan

1. Create `src/frontend/src/lib/blogApi.ts`:
   - Import `useActor` pattern or use the actor directly.
   - Map canister `Post` (bigint id, bigint publishedAt/createdAt) to frontend `BlogPost` (string id, string dates).
   - Handle inline images: encode them as `[IMAGES:${base64EncodedJson}]\n\n` prefix in the content field when saving, decode when loading.
   - Export: `getPosts()`, `getPublishedPosts()`, `getPostBySlug(slug)`, `getPostsByCategory(category)`, `createOrUpdatePost(post)`, `deletePost(id)`, `publishPost(id)`, `unpublishPost(id)`, `getCommentsByPost(postId)`, `addComment(postId, name, text)`.
   - All functions are async and use the canister actor from `src/frontend/src/backend.ts`.

2. Rewrite `AdminPage.tsx`:
   - On mount: call `blogApi.getPosts()` (returns all posts including drafts) instead of localStorage `getPosts()`.
   - On save: call `blogApi.createOrUpdatePost(post)`.
   - On delete: call `blogApi.deletePost(id)`.
   - On toggle publish: call `blogApi.publishPost(id)` or `blogApi.unpublishPost(id)`.
   - Comments: `blogApi.getCommentsByPost` — note canister comments have no moderation status, so show all comments; remove approve/pending distinction or keep UI but auto-approve.
   - Show loading spinner while data loads.

3. Rewrite `BlogPage.tsx`:
   - Replace `getPublishedPosts()` with `await blogApi.getPublishedPosts()` in a `useEffect`.
   - Show loading skeleton while loading.

4. Rewrite `PostPage.tsx`:
   - Replace `getPost(slug)` with `await blogApi.getPostBySlug(slug)`.
   - Replace `getCommentsByPost` with `await blogApi.getCommentsByPost(postId)`.
   - Replace `addComment` with `await blogApi.addComment(postId, name, text)`.
   - Related posts: `await blogApi.getPostsByCategory(category)`.
   - Hydrate inline images from the JSON prefix in content.

5. Validate: typecheck + build must pass. No localStorage references in these three pages.
