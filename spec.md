# AyurGlow Secrets

## Current State

The app has a Motoko backend with a `seedData()` function that seeds 8 sample posts, but `seedData()` is never called automatically. The 10 original SEO blog posts that the user wants to see are not seeded. Every redeployment creates a fresh canister, so user-created posts are lost unless they are part of the seed data. The frontend calls `seedData()` via the actor on first load (but this was removed or never properly wired).

## Requested Changes (Diff)

### Add
- All 10 original SEO blog posts as seed data in the Motoko backend:
  1. "Ayurvedic Remedies to Stop Hair Fall Naturally" (hair-care)
  2. "Best Ayurvedic Herbs for Glowing Skin" (skin-care)
  3. "How to Reduce Hair Fall Due to Stress – Ayurvedic Guide" (hair-care)
  4. "Triphala Benefits for Skin, Hair & Digestion" (health-remedies)
  5. "Home Remedies for Pimples Using Ayurveda" (skin-care)
  6. "Ayurvedic Diet for Healthy Hair Growth" (hair-care)
  7. "Aloe Vera Benefits for Skin and Hair in Ayurveda" (skin-care)
  8. "Causes of Hair Fall in Women and Ayurvedic Solutions" (hair-care)
  9. "Daily Ayurvedic Routine for Healthy Body & Mind" (lifestyle)
  10. "Best Ayurvedic Oils for Hair Growth and Thickness" (hair-care)
- Author for all seed posts: "Anuradha Sengupta"
- Auto-call `seedData()` on canister initialization so posts appear immediately without any manual step

### Modify
- Replace the existing 8-post seed data with the 10 correct SEO blog posts above

### Remove
- The old 8 generic sample seed posts

## Implementation Plan

1. Regenerate Motoko backend with all 10 posts in `seedData()` and auto-seed on init
2. Frontend: wire `seedData()` call on app startup (if not already wired)
3. Deploy
