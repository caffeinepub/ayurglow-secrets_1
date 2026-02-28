# AyurGlow Secrets

## Current State
- Full Ayurvedic wellness blog with 5 categories: Health Remedies, Skin Care, Hair Care, Weight Management, Lifestyle
- 10 seed blog posts covering the requested SEO topics
- Admin panel with CRUD, inline images, publish controls
- Comment section on blog posts
- Social media links in footer (Instagram, Facebook, YouTube, Pinterest, X)
- Blue/green color theme with logo

## Requested Changes (Diff)

### Add
- **Monetization section on Homepage**: A dedicated section showcasing the 3 monetization strategies (Google AdSense, Affiliate Marketing, Own Digital Products). This serves as a "Coming Soon" or "Partner With Us" section with cards explaining each revenue approach.
- **Sub-category detail pages/sections**: Each category page should clearly list and display all 5 sub-categories from the user's specification (Health Remedies has 5 subs, Skin Care has 5 subs, Hair Care has 5 subs). Currently some categories are missing "Weight management" subcategory under Health Remedies.
- **Health Remedies subcategory fix**: Add "Weight management" to Health Remedies subcategories (currently missing from that category's subcategory list in types/index.ts).
- **Affiliate marketing showcase section**: A footer or sidebar section showing Ayurvedic affiliate partners (Patanjali, Himalaya, Baidyanath, Amazon, Flipkart) with a "Shop Natural Products" CTA.
- **Digital Products teaser**: A section or card on the homepage hinting at upcoming eBooks/PDFs (Hair Fall Recovery Plan, Ayurvedic Skin & Hair Care eBook) with a "Coming Soon" badge.

### Modify
- **CATEGORIES in types/index.ts**: Update Health Remedies subcategories to include all 5: "Immunity boosting remedies", "Digestion & gut health", "Weight management", "Diabetes & BP support", "Stress & sleep solutions"
- **HomePage**: Add monetization/partnership section between Featured Articles and About Us sections
- **CategoryPage**: Ensure all subcategory tags are displayed and clickable for filtering

### Remove
- Nothing to remove

## Implementation Plan
1. Update `types/index.ts` — add "Weight management" to Health Remedies subcategories
2. Update `HomePage.tsx` — add Monetization Strategy section with 3 cards (AdSense, Affiliate, Digital Products) and an Affiliate Partners strip
3. Update `CategoryPage.tsx` — verify subcategory tags show all items correctly (no changes needed, they already render from CATEGORIES)
4. Optionally add a "Shop Ayurvedic Products" banner/strip in SiteFooter linking to affiliate partners
