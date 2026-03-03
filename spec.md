# AyurGlow Secrets

## Current State
The app has a Motoko backend with `seedData()` that seeds 8 default posts with a `seeded` guard flag. The frontend `seedPosts.ts` attempts to seed 10 SEO posts, but relies on `actor.seedData()` as a fallback — which is permanently blocked by the canister guard once it has run. The slug list in the old seedPosts.ts also had mismatches with actual post slugs. Blog pages show a loading spinner but posts never appear because the seeding silently fails.

## Requested Changes (Diff)

### Add
- Retry logic in BlogPage: up to 3 attempts with 2-second delays before showing error state
- Retry button in BlogPage error state
- `waitForActor()` helper in seedPosts.ts that confirms the canister is responsive before seeding
- Retry logic in HomePage for fetching featured posts

### Modify
- `seedPosts.ts`: Completely rewritten to skip `actor.seedData()` entirely — now seeds the 10 SEO posts directly via `createOrUpdatePost` + `publishPost`. Slugs now exactly match the canonical post slugs. Seeding is completely self-contained.
- `BlogPage.tsx`: Added `loadError` state, retry attempts on failure, and a Retry button

### Remove
- Dependency on `actor.seedData()` in frontend seeding logic
- Stale/mismatched slug list

## Implementation Plan
1. Rewrite `seedPosts.ts` with correct slugs, no seedData() dependency, and canister readiness check
2. Update `BlogPage.tsx` with retry logic and error/retry UI
3. Update `HomePage.tsx` with retry logic for featured posts
