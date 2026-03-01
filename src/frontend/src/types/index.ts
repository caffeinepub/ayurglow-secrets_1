export interface InlineImage {
  id: string;
  url: string; // base64
  size: "small" | "medium" | "large" | "full";
  alt: string;
  caption: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string; // HTML string
  excerpt: string;
  category: string; // category slug
  coverImageUrl: string; // base64 or URL
  status: "draft" | "published";
  publishedAt: string | null; // ISO date string
  createdAt: string;
  updatedAt: string;
  authorName: string;
  tags: string[];
  inlineImages: InlineImage[];
}

export interface Comment {
  id: string;
  postId: string;
  commenterName: string;
  email: string;
  commentText: string;
  status: "pending" | "approved";
  createdAt: string;
}

export interface Subcategory {
  slug: string;
  name: string;
}

export const CATEGORIES = [
  {
    slug: "health-remedies",
    name: "Health Remedies",
    description:
      "Immunity boosting, digestion, diabetes, stress & sleep solutions",
    icon: "🌿",
    subcategories: [
      { slug: "immunity", name: "Immunity Boosting Remedies" },
      { slug: "digestion", name: "Digestion & Gut Health" },
      { slug: "weight-management", name: "Weight Management" },
      { slug: "diabetes-bp", name: "Diabetes & BP Support" },
      { slug: "stress-sleep", name: "Stress & Sleep Solutions" },
    ] as Subcategory[],
  },
  {
    slug: "skin-care",
    name: "Skin Care",
    description:
      "Natural glow, acne, pigmentation, anti-aging, DIY herbal face packs",
    icon: "✨",
    subcategories: [
      { slug: "natural-glow", name: "Natural Glow Remedies" },
      { slug: "acne-pimples", name: "Acne & Pimples" },
      { slug: "pigmentation", name: "Pigmentation & Dark Spots" },
      { slug: "anti-aging", name: "Anti-Aging Ayurveda" },
      { slug: "face-packs", name: "DIY Herbal Face Packs" },
    ] as Subcategory[],
  },
  {
    slug: "hair-care",
    name: "Hair Care",
    description: "Hair fall, growth, dandruff, grey hair, Ayurvedic oils",
    icon: "💇",
    subcategories: [
      { slug: "hair-fall", name: "Hair Fall Treatment" },
      { slug: "hair-growth", name: "Hair Growth Remedies" },
      { slug: "dandruff", name: "Dandruff & Scalp Care" },
      { slug: "grey-hair", name: "Grey Hair Solutions" },
      { slug: "ayurvedic-oils", name: "Ayurvedic Oils & Masks" },
    ] as Subcategory[],
  },
  {
    slug: "weight-management",
    name: "Weight Management",
    description: "Ayurvedic approach to healthy weight, metabolism, detox",
    icon: "⚖️",
    subcategories: [
      { slug: "weight-loss", name: "Weight Loss Remedies" },
      { slug: "metabolism", name: "Metabolism Boost" },
      { slug: "detox", name: "Detox & Cleanse" },
      { slug: "mindful-eating", name: "Mindful Eating" },
    ] as Subcategory[],
  },
  {
    slug: "lifestyle",
    name: "Lifestyle",
    description: "Daily Ayurvedic routines, yoga, mindfulness, seasonal living",
    icon: "🧘",
    subcategories: [
      { slug: "daily-routine", name: "Daily Ayurvedic Routine" },
      { slug: "yoga-pranayama", name: "Yoga & Pranayama" },
      { slug: "seasonal-wellness", name: "Seasonal Wellness" },
      { slug: "mindful-living", name: "Mindful Living" },
    ] as Subcategory[],
  },
];
