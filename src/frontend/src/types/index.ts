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

export const CATEGORIES = [
  {
    slug: "health-remedies",
    name: "Health Remedies",
    description:
      "Immunity boosting, digestion, diabetes, stress & sleep solutions",
    icon: "🌿",
    subcategories: [
      "Immunity boosting remedies",
      "Digestion & gut health",
      "Diabetes & BP support",
      "Stress & sleep solutions",
    ],
  },
  {
    slug: "skin-care",
    name: "Skin Care",
    description:
      "Natural glow, acne, pigmentation, anti-aging, DIY herbal face packs",
    icon: "✨",
    subcategories: [
      "Natural glow remedies",
      "Acne & pimples",
      "Pigmentation & dark spots",
      "Anti-aging Ayurveda",
      "DIY herbal face packs",
    ],
  },
  {
    slug: "hair-care",
    name: "Hair Care",
    description: "Hair fall, growth, dandruff, grey hair, Ayurvedic oils",
    icon: "💇",
    subcategories: [
      "Hair fall treatment",
      "Hair growth remedies",
      "Dandruff & scalp care",
      "Grey hair solutions",
      "Ayurvedic oils & masks",
    ],
  },
  {
    slug: "weight-management",
    name: "Weight Management",
    description: "Ayurvedic approach to healthy weight, metabolism, detox",
    icon: "⚖️",
    subcategories: [
      "Weight loss remedies",
      "Metabolism boost",
      "Detox & cleanse",
      "Mindful eating",
    ],
  },
  {
    slug: "lifestyle",
    name: "Lifestyle",
    description: "Daily Ayurvedic routines, yoga, mindfulness, seasonal living",
    icon: "🧘",
    subcategories: [
      "Daily Ayurvedic routine",
      "Yoga & pranayama",
      "Seasonal wellness",
      "Mindful living",
    ],
  },
];
