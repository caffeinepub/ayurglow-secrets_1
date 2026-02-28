# AyurGlow Secrets

## Current State
Brand new project. No existing code or backend.

## Requested Changes (Diff)

### Add
- Full Ayurvedic wellness blog website named "AyurGlow Secrets"
- Tagline: "Ancient Ayurvedic Wisdom for Healthy Body, Glowing Skin & Strong Hair"
- Custom logo in header
- Homepage with: Hero section, What We Offer, Why AyurGlow Secrets, About Us, Featured Blog Posts, Category grid
- 5 category pages: Health Remedies, Skin Care, Hair Care, Weight Management, Lifestyle
- Blog listing page with all posts, category filter, search
- Individual blog post page with: cover image, in-content images with size options, publication date, comment section
- Admin panel at /admin (no login required) with:
  - Create/edit/delete blog posts
  - Add cover image at top of post
  - Add images in-between content with size options (small/medium/large/full)
  - Set publication date or "Publish Immediately" option
  - Category selection
  - Post status (draft/published)
- 10 pre-seeded blog posts covering all SEO topics listed
- "Best Ayurvedic Herbs for Glowing Skin" post visible in both Admin and Blog page
- Comment section on each blog post (no login required, just name + comment)
- Social media links (Instagram, Facebook, YouTube, Twitter/X, Pinterest) in footer under "Connect With Us"
- Footer with categories, quick links, about blurb
- No "Built with Caffeine.ai" branding
- Blue and green color theme throughout
- All category remedy links must navigate to real content pages
- Responsive design, SEO-friendly structure

### Modify
- Nothing (new project)

### Remove
- Nothing (new project)

## Implementation Plan
1. Generate logo (leaf/herb motif in blue-green)
2. Select blob-storage component for image uploads
3. Generate Motoko backend with: BlogPost, Comment, Category data models; CRUD operations for posts; comment submission
4. Build React frontend:
   - Layout: Header with logo + nav, Footer with social links
   - Pages: Home, Blog, BlogPost (detail), Category, Admin
   - Admin: form with rich text editor, image upload (cover + inline), publish date picker, publish-immediately toggle
   - Seed 10 blog posts with proper categories and dates
   - Comment form on blog post pages
   - Blue-green design system
