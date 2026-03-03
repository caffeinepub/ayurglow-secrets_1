/**
 * seedPosts.ts — Seeds the 10 SEO blog posts to the canister backend.
 *
 * Strategy:
 * 1. Wait for the canister to be ready (retry up to 6 times)
 * 2. Call seedData() to trigger the 8 default backend posts (idempotent guard inside canister)
 * 3. Check which of the 10 SEO posts are still missing by slug
 * 4. Create and publish any missing posts
 *
 * Never throws — all errors are caught silently.
 */

import {
  type FrontendBlogPost,
  createOrUpdatePost,
  getActor,
  publishPost,
  resetActor,
} from "./blogApi";

type SeedPost = Omit<
  FrontendBlogPost,
  "id" | "status" | "publishedAt" | "createdAt" | "updatedAt"
>;

const SEO_POSTS: SeedPost[] = [
  {
    title: "Ayurvedic Remedies to Stop Hair Fall Naturally",
    slug: "ayurvedic-remedies-to-stop-hair-fall-naturally",
    excerpt:
      "Discover powerful Ayurvedic herbs and oils that have been used for centuries to stop hair fall and restore thick, healthy hair.",
    content: `Hair fall is one of the most common concerns today, affecting millions of people worldwide. Ayurveda offers time-tested natural solutions that address the root cause of hair loss rather than just the symptoms.

Why Does Hair Fall Happen?

According to Ayurveda, hair fall is primarily caused by an imbalance in the Pitta dosha. Excess Pitta leads to inflammation of hair follicles, thinning, and eventual hair loss.

1. Bhringraj Oil Massage

Bhringraj, known as the King of Herbs for hair, is one of the most potent Ayurvedic remedies for hair fall. Regular scalp massage with Bhringraj oil improves blood circulation, nourishes hair follicles, and significantly reduces hair fall within 4-6 weeks.

How to use: Warm 2-3 tablespoons of Bhringraj oil, massage into scalp for 10-15 minutes using circular motions, leave for 1-2 hours, then wash with a mild herbal shampoo.

2. Amla (Indian Gooseberry)

Amla is the richest natural source of Vitamin C and antioxidants, essential for collagen production that strengthens hair follicles.

3. Onion Juice Treatment

Onion juice is rich in sulfur, which supports keratin production and improves blood supply to hair follicles.

4. Fenugreek Seeds Mask

Fenugreek seeds contain proteins and nicotinic acid that strengthen hair shafts and prevent breakage.`,
    category: "hair-care",
    coverImageUrl: "",
    authorName: "Anuradha Sengupta",
    tags: ["hair fall", "hair care", "ayurvedic remedies", "bhringraj", "amla"],
    inlineImages: [],
  },
  {
    title: "Best Ayurvedic Herbs for Glowing Skin",
    slug: "best-ayurvedic-herbs-for-glowing-skin",
    excerpt:
      "Unlock the secret to radiant, glowing skin with these powerful Ayurvedic herbs that have been used for thousands of years.",
    content: `In Ayurveda, beautiful skin is a reflection of inner health. True skin radiance comes from within through proper digestion, balanced doshas, and the right nourishing herbs.

1. Turmeric (Haldi)

Turmeric is perhaps the most celebrated herb in Ayurveda for skin health. Curcumin, its active compound, is a powerful antioxidant and anti-inflammatory that fights free radical damage, brightens skin tone, and reduces hyperpigmentation.

How to use: Mix 1/4 teaspoon turmeric with raw milk and honey. Apply as a face pack for 15 minutes, 3 times a week.

2. Neem

Neem is called the village pharmacy in Ayurveda. Its antibacterial, antifungal, and antiviral properties make it exceptional for treating acne, clearing blemishes, and purifying skin.

3. Sandalwood (Chandan)

Sandalwood cools the skin, reduces inflammation, and has a natural brightening effect. It is especially beneficial for Pitta skin types prone to redness and sensitivity.

4. Saffron (Kesar)

Saffron is revered in Ayurveda as a premium skin brightening herb. It enhances complexion, reduces dark circles, and gives a natural inner glow.

5. Aloe Vera

Aloe vera hydrates, soothes, and heals skin. It contains over 75 active compounds including vitamins, minerals, and amino acids that nourish skin deeply.`,
    category: "skin-care",
    coverImageUrl: "",
    authorName: "Anuradha Sengupta",
    tags: ["glowing skin", "skin care", "ayurvedic herbs", "turmeric", "neem"],
    inlineImages: [],
  },
  {
    title: "How to Reduce Hair Fall Due to Stress – Ayurvedic Guide",
    slug: "how-to-reduce-hair-fall-due-to-stress-ayurvedic-guide",
    excerpt:
      "Stress is one of the leading causes of hair fall today. Learn how Ayurveda addresses stress-related hair loss from the root cause.",
    content: `Stress-related hair fall is one of the most common types of hair loss today. When the body is under chronic stress, it shifts resources away from non-essential functions like hair growth, pushing hair follicles into a resting phase prematurely.

How Stress Causes Hair Fall

In Ayurveda, chronic stress aggravates the Vata dosha, leading to poor circulation to the scalp, dryness, and reduced nutrition to hair follicles.

1. Ashwagandha

Ashwagandha is Ayurveda's premier adaptogenic herb. It directly reduces cortisol levels, improves the body's stress response, and supports healthy hair growth.

How to use: Take 1/2 teaspoon of Ashwagandha powder in warm milk before bed daily for 3 months.

2. Brahmi Oil Scalp Massage

Brahmi calms the nervous system when applied topically. Regular scalp massage with Brahmi oil reduces anxiety, improves sleep quality, and directly nourishes hair follicles.

Lifestyle Changes: Practice daily meditation for 15-20 minutes. Do gentle yoga with poses that increase blood flow to the head.`,
    category: "hair-care",
    coverImageUrl: "",
    authorName: "Anuradha Sengupta",
    tags: ["stress", "hair fall", "hair care", "ashwagandha", "brahmi"],
    inlineImages: [],
  },
  {
    title: "Triphala Benefits for Skin, Hair & Digestion",
    slug: "triphala-benefits-for-skin-hair-digestion",
    excerpt:
      "Triphala is Ayurveda's most celebrated herbal formula. Discover how this three-fruit combination transforms your skin, hair, and digestion.",
    content: `Triphala, meaning three fruits in Sanskrit, is considered the cornerstone formulation of Ayurvedic medicine. Used for over 3,000 years, it combines Amalaki, Bibhitaki, and Haritaki to create a synergistic blend that benefits virtually every system of the body.

The Three Fruits of Triphala

Amalaki (Amla): The richest natural source of Vitamin C. A powerful rejuvenator that nourishes all tissues and strengthens immunity.

Bibhitaki: Primarily supports respiratory health and helps remove excess Kapha from the body.

Haritaki: Called the King of Medicines in Ayurveda. Supports all three doshas, improves digestion, and has anti-aging properties.

Triphala for Digestion

Triphala gently cleanses the digestive tract, removes accumulated toxins, improves nutrient absorption, and promotes regular bowel movements.

How to use: Mix 1/2 teaspoon of Triphala powder in warm water, take on an empty stomach early morning or before bed.`,
    category: "health-remedies",
    coverImageUrl: "",
    authorName: "Anuradha Sengupta",
    tags: [
      "triphala",
      "digestion",
      "skin care",
      "hair care",
      "ayurvedic herbs",
    ],
    inlineImages: [],
  },
  {
    title: "Home Remedies for Pimples Using Ayurveda",
    slug: "home-remedies-for-pimples-using-ayurveda",
    excerpt:
      "Say goodbye to pimples naturally with these powerful Ayurvedic home remedies that target the root cause of acne.",
    content: `Pimples and acne are among the most common skin concerns, and Ayurveda offers effective natural solutions that address both the internal and external causes of breakouts.

What Causes Pimples According to Ayurveda?

In Ayurveda, acne is considered primarily a Pitta disorder. Excess Pitta creates inflammation, excess sebum production, and an environment where bacteria thrive.

1. Neem and Turmeric Paste

This is the most powerful combination for fighting pimples. Neem has exceptional antibacterial properties while turmeric reduces inflammation and prevents scarring.

Recipe: Grind 10-12 fresh neem leaves into a paste, add 1/4 teaspoon turmeric and 1 tablespoon rose water. Apply on pimples for 20 minutes, rinse with cool water.

2. Sandalwood and Rose Water

Sandalwood cools the skin and reduces the excess heat that drives Pitta-type acne.

3. Honey and Cinnamon Spot Treatment

Honey has natural antibacterial properties while cinnamon has antimicrobial effects.

4. Multani Mitti Face Pack

Multani mitti absorbs excess oil, unclogs pores, and draws out impurities.`,
    category: "skin-care",
    coverImageUrl: "",
    authorName: "Anuradha Sengupta",
    tags: ["pimples", "acne", "skin care", "neem", "ayurvedic remedies"],
    inlineImages: [],
  },
  {
    title: "Ayurvedic Diet for Healthy Hair Growth",
    slug: "ayurvedic-diet-for-healthy-hair-growth",
    excerpt:
      "Discover the Ayurvedic principles of eating for strong, thick, lustrous hair. What you eat directly impacts your hair health.",
    content: `In Ayurveda, hair is considered a byproduct of bone tissue. Proper nutrition directly feeds hair growth and strength. Healthy hair begins with healthy digestion and the right foods.

Best Foods for Hair Growth

Protein-Rich Foods: Hair is made of keratin, a protein. Best Ayurvedic protein sources include lentils and legumes, sesame seeds, almonds and walnuts, and dairy products like ghee and milk.

Iron-Rich Foods: Iron deficiency is one of the most common causes of hair fall. Include spinach, fenugreek leaves, dates, pomegranate, and jaggery.

Vitamin C Foods: Vitamin C helps absorb iron and is essential for collagen production. Best sources include amla, guava, lemon, and papaya.

Omega-3 Fatty Acids: Include flaxseeds, walnuts, chia seeds, and mustard oil.

Foods to Avoid: Avoid excess spicy and oily foods, refined sugar and processed foods, excessive alcohol and caffeine.`,
    category: "hair-care",
    coverImageUrl: "",
    authorName: "Anuradha Sengupta",
    tags: ["hair growth", "diet", "hair care", "nutrition", "ayurvedic diet"],
    inlineImages: [],
  },
  {
    title: "Aloe Vera Benefits for Skin and Hair in Ayurveda",
    slug: "aloe-vera-benefits-for-skin-and-hair-in-ayurveda",
    excerpt:
      "Aloe vera, known as Kumari in Ayurveda, is one of the most versatile healing plants. Discover its remarkable benefits for skin and hair.",
    content: `Aloe vera, known as Kumari in Sanskrit, has been used in Ayurvedic medicine for over 5,000 years. Its cooling, soothing, and rejuvenating properties make it a complete beauty solution for both skin and hair.

Aloe Vera for Skin

Moisturizer and Hydration: Aloe vera gel hydrates without clogging pores, making it perfect for all skin types including oily and acne-prone skin.

How to use: Apply fresh aloe vera gel as a daily moisturizer morning and night on clean skin.

Sunburn Relief: Aloe vera's anti-inflammatory compounds provide immediate relief from sunburn, rashes, and skin irritation.

Anti-Aging: Aloe vera stimulates collagen and elastin production, reducing fine lines and improving skin elasticity.

Aloe Vera for Hair

Scalp Health: Aloe vera's proteolytic enzymes repair dead skin cells on the scalp and create an optimal environment for hair growth.

Hair Growth: Aloe vera contains enzymes that directly promote hair follicle growth, increasing hair density and thickness over time.`,
    category: "skin-care",
    coverImageUrl: "",
    authorName: "Anuradha Sengupta",
    tags: ["aloe vera", "skin care", "hair care", "natural remedies", "kumari"],
    inlineImages: [],
  },
  {
    title: "Causes of Hair Fall in Women and Ayurvedic Solutions",
    slug: "causes-of-hair-fall-in-women-and-ayurvedic-solutions",
    excerpt:
      "Women experience hair fall due to many unique factors. Ayurveda provides targeted, holistic solutions for each underlying cause.",
    content: `Hair fall in women affects confidence and wellbeing. Ayurveda offers a comprehensive approach that addresses each specific cause.

Common Causes of Hair Fall in Women

1. Hormonal Imbalances: Postpartum hair loss, thyroid disorders, PCOS, menopause, and birth control changes.

Ayurvedic approach: Shatavari is Ayurveda's premier herb for women's hormonal health. Take 1/2 teaspoon with warm milk twice daily. Ashwagandha supports thyroid function and reduces cortisol levels.

2. Nutritional Deficiencies: Iron deficiency anemia is extremely common in women and is a leading cause of hair fall.

Ayurvedic approach: Take Chyawanprash daily and increase intake of iron-rich foods like dates, fenugreek leaves, and sesame seeds.

3. Stress and Anxiety: Chronically elevated cortisol pushes hair follicles into a resting phase, causing diffuse hair thinning.

Ayurvedic approach: Practice Abhyanga (self oil massage) daily. Take Brahmi for mental calm.

4. Scalp Conditions: Dandruff and scalp inflammation block follicles and prevent healthy hair growth.`,
    category: "hair-care",
    coverImageUrl: "",
    authorName: "Anuradha Sengupta",
    tags: ["hair fall", "women", "hair care", "hormonal balance", "shatavari"],
    inlineImages: [],
  },
  {
    title: "Daily Ayurvedic Routine for Healthy Body & Mind",
    slug: "daily-ayurvedic-routine-for-healthy-body-and-mind",
    excerpt:
      "Transform your health with Dinacharya, the Ayurvedic daily routine. A consistent routine aligned with nature's rhythms is the foundation of vibrant health.",
    content: `In Ayurveda, Dinacharya (daily routine) is considered one of the most powerful tools for maintaining health and preventing disease. When we align our daily activities with the natural rhythms of the day, the body functions optimally.

The Ideal Ayurvedic Morning Routine

Wake Up Before Sunrise: Ayurveda recommends waking up 1.5 hours before sunrise. This is considered the most sattvic (pure) time of day.

Drink Warm Water: Immediately upon waking, drink 1-2 glasses of warm water. This activates the digestive system and flushes toxins.

Tongue Scraping: Use a copper tongue scraper to remove the white coating that builds up overnight.

Oil Pulling (Gandusha): Swish 1 tablespoon of sesame or coconut oil for 15-20 minutes.

Abhyanga (Self Oil Massage): Warm self-massage with sesame oil before bathing nourishes the skin and calms the nervous system.

Midday: Eat your largest meal at lunch when digestive fire is strongest.

Evening: Have a light, early dinner before 7 PM. Sleep by 10 PM.`,
    category: "lifestyle",
    coverImageUrl: "",
    authorName: "Anuradha Sengupta",
    tags: ["daily routine", "dinacharya", "lifestyle", "wellness", "ayurveda"],
    inlineImages: [],
  },
  {
    title: "Best Ayurvedic Oils for Hair Growth and Thickness",
    slug: "best-ayurvedic-oils-for-hair-growth-and-thickness",
    excerpt:
      "Discover the top Ayurvedic oils that have been used for centuries to stimulate hair growth, prevent hair fall, and create thick, lustrous hair.",
    content: `Hair oiling (Shiro Abhyanga) is a cornerstone of Ayurvedic hair care. Regular oil massage nourishes the scalp, strengthens hair roots, improves blood circulation, and creates the optimal conditions for hair growth.

Top Ayurvedic Oils for Hair Growth

1. Bhringraj Oil: Called the King of Herbs for hair. Benefits: Stimulates dormant hair follicles, reduces hair fall significantly, prevents premature greying, promotes thick hair growth.

How to use: Warm 2 tablespoons, massage into scalp using circular motions for 10-15 minutes, leave for 1-2 hours or overnight.

2. Brahmi Oil: Strengthens hair roots, reduces stress-related hair fall, improves scalp circulation.

3. Amla Oil: Richest natural source of Vitamin C. Prevents premature greying, strengthens hair shaft, adds natural shine.

4. Castor Oil: Dramatically increases hair thickness, stimulates hair follicles. Best used diluted 1:1 with coconut oil.

5. Neem Oil: Eliminates dandruff, treats scalp fungal infections, reduces scalp inflammation.

Homemade Ayurvedic Hair Oil Recipe: Heat 1 cup of sesame oil on low flame. Add Bhringraj powder, Brahmi powder, and Amla powder. Add curry leaves and fenugreek seeds. Simmer 20 minutes. Cool, strain, store in glass bottle.`,
    category: "hair-care",
    coverImageUrl: "",
    authorName: "Anuradha Sengupta",
    tags: ["hair oil", "hair growth", "bhringraj", "brahmi", "hair care"],
    inlineImages: [],
  },
];

// All slugs we expect to have in the canister
const SEO_SLUGS = SEO_POSTS.map((p) => p.slug);

// Also include the slugs from the backend's seedData() so we don't double-create
const BACKEND_SEED_SLUGS = [
  "ayurvedic-herbs-boosting-immunity",
  "ayurvedic-face-masks-glowing-skin",
  "ayurvedic-hair-oils-lustrous-hair",
  "ayurvedic-weight-management",
  "ayurvedic-morning-rituals-dinacharya",
  "neem-ayurveda-skin-purifier",
  "triphala-three-fruit-wonder",
  "coconut-oil-hair-treatments",
];

let _seedingInProgress = false;
let _seedingDone = false;

/**
 * Waits for the canister actor to be ready, retrying up to maxAttempts times.
 */
async function waitForActor(maxAttempts = 6, delayMs = 2000): Promise<boolean> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const actor = await getActor(1, 0);
      // Try a lightweight call to confirm the canister is responsive
      await (
        actor as unknown as { getCategories: () => Promise<string[]> }
      ).getCategories();
      return true;
    } catch {
      resetActor();
      if (i < maxAttempts - 1) {
        await new Promise((r) => setTimeout(r, delayMs));
      }
    }
  }
  return false;
}

export async function ensureSeedPostsExist(): Promise<void> {
  // Prevent concurrent calls
  if (_seedingInProgress || _seedingDone) return;
  _seedingInProgress = true;

  try {
    // Wait for the canister to be ready before attempting anything
    const ready = await waitForActor();
    if (!ready) {
      return; // Canister not ready — will retry on next page load
    }

    const actor = await getActor(1, 0);

    // Call seedData() first — this is idempotent on the canister side (guarded by `seeded` flag).
    // It will add the 8 default posts if they don't exist yet.
    try {
      await (actor as unknown as { seedData: () => Promise<void> }).seedData();
    } catch {
      // seedData might fail if the canister is busy; that's OK
    }

    // Fetch ALL existing posts from the canister
    let existingRaw: { slug: string }[] = [];
    try {
      existingRaw = await actor.getAllPosts();
    } catch {
      // If fetching fails, reset and bail — will retry on next load
      resetActor();
      return;
    }

    const existingSlugs = new Set(existingRaw.map((p) => p.slug));

    // Find which of the 10 SEO posts are missing (ignore backend seed slugs, they're managed by backend)
    const missingSlugs = SEO_SLUGS.filter(
      (slug) => !existingSlugs.has(slug) && !BACKEND_SEED_SLUGS.includes(slug),
    );

    if (missingSlugs.length === 0) {
      _seedingDone = true;
      return;
    }

    // Create missing posts one at a time with small delays to avoid overwhelming the canister
    for (let i = 0; i < SEO_POSTS.length; i++) {
      const postData = SEO_POSTS[i];
      if (!missingSlugs.includes(postData.slug)) continue;

      try {
        const now = new Date().toISOString();
        const draft: FrontendBlogPost = {
          ...postData,
          id: `new_${Date.now()}_${i}`,
          status: "draft",
          publishedAt: null,
          createdAt: now,
          updatedAt: now,
        };

        const saved = await createOrUpdatePost(draft);
        await publishPost(saved.id);

        // Small delay between posts to avoid canister rate limits
        if (i < SEO_POSTS.length - 1) {
          await new Promise((r) => setTimeout(r, 300));
        }
      } catch {
        // Silently ignore individual post failures — don't break the app
      }
    }

    _seedingDone = true;
  } catch {
    // Silently ignore all errors — seeding failure must never break the app
    _seedingDone = false;
  } finally {
    _seedingInProgress = false;
  }
}
