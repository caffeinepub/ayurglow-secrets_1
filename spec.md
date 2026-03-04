# AyurGlow Secrets

## Current State
The app has a full blog system backed by a Motoko canister. Blog post text, metadata, and comments are stored on-chain and visible to all visitors. However, images (cover images and inline post images) are uploaded as base64 data-URLs, compressed, and stored only in the uploader's browser IndexedDB. When other users visit the site, they see posts but no images. The `blob-storage` component is already installed in the project.

## Requested Changes (Diff)

### Add
- Image upload via `ExternalBlob` (blob-storage component) so uploaded images get an HTTP URL stored on the canister's blob store, visible to everyone
- A `blobStorage.ts` utility in `lib/` that wraps `ExternalBlob.fromBytes` and returns a public direct URL
- Upload progress feedback in the admin image upload UI

### Modify
- `AdminPage.tsx`: Replace the `compressImage` + IndexedDB save flow with blob-storage upload. After upload, store the returned direct URL (not base64) in `coverImageUrl` and `InlineImage.url`. The `coverImageUrl` and inline image URLs will now be real HTTP URLs, not data-URLs, so they will be saved to the canister directly.
- `blogApi.ts`: Remove the `canisterCoverUrl` stripping logic (which was stripping data-URLs before sending to canister). Now that URLs are real HTTP URLs they should be sent and stored as-is. Also remove `rehydratePostImages` from the hot path (cover/inline URLs are now real URLs stored on the canister, no IndexedDB lookup needed). Keep `rehydratePostImages` as a fallback for old posts that still have empty coverImageUrl.
- `AdminPage.tsx` `handleSubmit`: Remove the IndexedDB `saveImage` calls after canister save — no longer needed.

### Remove
- Dependency on `imageDb.ts` for new uploads (keep the file for backward compat with old posts, but new uploads no longer use it)

## Implementation Plan
1. Create `src/frontend/src/lib/blobStorage.ts` — helper that takes a `File` or `Uint8Array`, uploads via `ExternalBlob`, returns direct URL string
2. Update `AdminPage.tsx` `handleCoverUpload` and `handleInlineUpload` to call the blob-storage helper instead of `compressImage`, show upload progress
3. Update `AdminPage.tsx` `handleSubmit` to skip `saveImage` calls (URLs are now HTTP, not base64)
4. Update `blogApi.ts` `createOrUpdatePost` to send `coverImageUrl` as-is (no stripping), since it's now an HTTP URL
5. Update `blogApi.ts` `getAllPosts` / `getPublishedPosts` to skip `rehydratePostImages` (keep for legacy fallback only)
