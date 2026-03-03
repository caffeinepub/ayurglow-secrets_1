/**
 * seedPosts.ts — Seeds the 10 SEO blog posts to the canister backend.
 *
 * Called once on app startup from App.tsx.
 * Silently skips if posts already exist. Never throws.
 */

import {
  type FrontendBlogPost,
  createOrUpdatePost,
  getPublishedPosts,
  publishPost,
} from "./blogApi";
import { getActor } from "./blogApi";

// The 10 canonical SEO slugs that must exist
const SEO_SLUGS = [
  "ayurvedic-remedies-stop-hair-fall-naturally",
  "best-ayurvedic-herbs-glowing-skin",
  "reduce-hair-fall-due-to-stress-ayurvedic-guide",
  "triphala-benefits-skin-hair-digestion",
  "home-remedies-pimples-ayurveda",
  "ayurvedic-diet-healthy-hair-growth",
  "aloe-vera-benefits-skin-hair-ayurveda",
  "causes-hair-fall-women-ayurvedic-solutions",
  "daily-ayurvedic-routine-healthy-body-mind",
  "best-ayurvedic-oils-hair-growth-thickness",
];

type SeedPost = Omit<
  FrontendBlogPost,
  "id" | "status" | "publishedAt" | "createdAt" | "updatedAt"
>;

const SEO_POSTS: SeedPost[] = [
  {
    title: "Ayurvedic Remedies to Stop Hair Fall Naturally",
    slug: "ayurvedic-remedies-stop-hair-fall-naturally",
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

How to use: Mix 2 tablespoons of amla powder with coconut oil, apply to scalp, leave for 30 minutes, rinse thoroughly.

3. Onion Juice Treatment

Onion juice is rich in sulfur, which supports keratin production and improves blood supply to hair follicles.

How to use: Extract juice from 2 medium onions, apply directly to scalp, leave for 30-45 minutes, wash with mild shampoo. Use 2-3 times per week.

4. Fenugreek Seeds Mask

Fenugreek seeds contain proteins and nicotinic acid that strengthen hair shafts and prevent breakage.

How to use: Soak 3 tablespoons of fenugreek seeds overnight, grind into paste, mix with yogurt, apply to hair and scalp for 30 minutes.

Consistency is key with Ayurvedic remedies. Most treatments show visible results within 4-8 weeks of regular use.`,
    category: "hair-care",
    coverImageUrl: "/assets/generated/blog-haircare.dim_800x500.jpg",
    authorName: "Anuradha Sengupta",
    tags: ["hair fall", "hair care", "ayurvedic remedies", "bhringraj", "amla"],
    inlineImages: [],
  },
  {
    title: "Best Ayurvedic Herbs for Glowing Skin",
    slug: "best-ayurvedic-herbs-glowing-skin",
    excerpt:
      "Unlock the secret to radiant, glowing skin with these powerful Ayurvedic herbs that have been used for thousands of years.",
    content: `In Ayurveda, beautiful skin is a reflection of inner health. True skin radiance comes from within through proper digestion, balanced doshas, and the right nourishing herbs.

1. Turmeric (Haldi)

Turmeric is perhaps the most celebrated herb in Ayurveda for skin health. Curcumin, its active compound, is a powerful antioxidant and anti-inflammatory that fights free radical damage, brightens skin tone, and reduces hyperpigmentation.

How to use: Mix 1/4 teaspoon turmeric with raw milk and honey. Apply as a face pack for 15 minutes, 3 times a week.

2. Neem

Neem is called the village pharmacy in Ayurveda. Its antibacterial, antifungal, and antiviral properties make it exceptional for treating acne, clearing blemishes, and purifying skin.

How to use: Boil fresh neem leaves in water, let cool, strain, and use as a face wash or toner daily.

3. Sandalwood (Chandan)

Sandalwood cools the skin, reduces inflammation, and has a natural brightening effect. It is especially beneficial for Pitta skin types prone to redness and sensitivity.

How to use: Mix sandalwood powder with rose water into a smooth paste. Apply as a mask for 20 minutes.

4. Saffron (Kesar)

Saffron is revered in Ayurveda as a premium skin brightening herb. It enhances complexion, reduces dark circles, and gives a natural inner glow.

How to use: Soak 4-5 saffron strands in 2 tablespoons of warm milk overnight. Apply to face each morning.

5. Aloe Vera

Aloe vera hydrates, soothes, and heals skin. It contains over 75 active compounds including vitamins, minerals, and amino acids that nourish skin deeply.

How to use: Apply fresh aloe vera gel directly on skin as a daily moisturizer.`,
    category: "skin-care",
    coverImageUrl: "/assets/generated/blog-skincare.dim_800x500.jpg",
    authorName: "Anuradha Sengupta",
    tags: ["glowing skin", "skin care", "ayurvedic herbs", "turmeric", "neem"],
    inlineImages: [],
  },
  {
    title: "How to Reduce Hair Fall Due to Stress – Ayurvedic Guide",
    slug: "reduce-hair-fall-due-to-stress-ayurvedic-guide",
    excerpt:
      "Stress is one of the leading causes of hair fall today. Learn how Ayurveda addresses stress-related hair loss from the root cause.",
    content: `Stress-related hair fall is one of the most common types of hair loss today. When the body is under chronic stress, it shifts resources away from non-essential functions like hair growth, pushing hair follicles into a resting phase prematurely.

How Stress Causes Hair Fall

In Ayurveda, chronic stress aggravates the Vata dosha, leading to poor circulation to the scalp, dryness, and reduced nutrition to hair follicles. Additionally, elevated cortisol levels disrupt the normal hair growth cycle.

1. Ashwagandha

Ashwagandha is Ayurveda's premier adaptogenic herb. It directly reduces cortisol levels, improves the body's stress response, and supports healthy hair growth.

How to use: Take 1/2 teaspoon of Ashwagandha powder in warm milk before bed daily for 3 months.

2. Brahmi Oil Scalp Massage

Brahmi calms the nervous system when applied topically. Regular scalp massage with Brahmi oil reduces anxiety, improves sleep quality, and directly nourishes hair follicles.

How to use: Massage warm Brahmi oil into the scalp for 15 minutes before bed, leave overnight.

Lifestyle Changes

Practice daily meditation for 15-20 minutes. Do gentle yoga with poses that increase blood flow to the head. Maintain a regular sleep schedule. Increase intake of iron-rich foods like spinach, lentils, and pumpkin seeds.`,
    category: "hair-care",
    coverImageUrl: "/assets/generated/blog-haircare.dim_800x500.jpg",
    authorName: "Anuradha Sengupta",
    tags: ["stress", "hair fall", "hair care", "ashwagandha", "brahmi"],
    inlineImages: [],
  },
  {
    title: "Triphala Benefits for Skin, Hair & Digestion",
    slug: "triphala-benefits-skin-hair-digestion",
    excerpt:
      "Triphala is Ayurveda's most celebrated herbal formula. Discover how this three-fruit combination transforms your skin, hair, and digestion.",
    content: `Triphala, meaning three fruits in Sanskrit, is considered the cornerstone formulation of Ayurvedic medicine. Used for over 3,000 years, it combines Amalaki, Bibhitaki, and Haritaki to create a synergistic blend that benefits virtually every system of the body.

The Three Fruits of Triphala

Amalaki (Amla): The richest natural source of Vitamin C. A powerful rejuvenator that nourishes all tissues and strengthens immunity.

Bibhitaki: Primarily supports respiratory health and helps remove excess Kapha from the body.

Haritaki: Called the King of Medicines in Ayurveda. Supports all three doshas, improves digestion, and has anti-aging properties.

Triphala for Digestion

Triphala gently cleanses the digestive tract, removes accumulated toxins, improves nutrient absorption, and promotes regular bowel movements.

How to use: Mix 1/2 teaspoon of Triphala powder in warm water, take on an empty stomach early morning or before bed.

Triphala for Skin

The high antioxidant content fights free radical damage, reduces inflammation, and promotes skin cell renewal. Effective for reducing acne, fading dark spots, brightening skin tone, and reducing signs of premature aging.

Triphala for Hair

Triphala strengthens hair from within by improving nutrient absorption and purifying the blood. Use as a hair rinse to reduce dandruff, add shine, and strengthen hair roots.`,
    category: "health-remedies",
    coverImageUrl: "/assets/generated/blog-health.dim_800x500.jpg",
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
    slug: "home-remedies-pimples-ayurveda",
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

Recipe: Mix 2 tablespoons sandalwood powder with enough rose water to form a paste. Apply to face for 20-30 minutes.

3. Honey and Cinnamon Spot Treatment

Honey has natural antibacterial properties while cinnamon has antimicrobial effects.

Recipe: Mix 1 teaspoon raw honey with 1/4 teaspoon cinnamon powder. Apply directly on pimples overnight.

4. Multani Mitti Face Pack

Multani mitti absorbs excess oil, unclogs pores, and draws out impurities.

Recipe: Mix 2 tablespoons multani mitti with rose water into a paste. Apply to face, leave until dry, rinse with lukewarm water.`,
    category: "skin-care",
    coverImageUrl: "/assets/generated/blog-skincare.dim_800x500.jpg",
    authorName: "Anuradha Sengupta",
    tags: ["pimples", "acne", "skin care", "neem", "ayurvedic remedies"],
    inlineImages: [],
  },
  {
    title: "Ayurvedic Diet for Healthy Hair Growth",
    slug: "ayurvedic-diet-healthy-hair-growth",
    excerpt:
      "Discover the Ayurvedic principles of eating for strong, thick, lustrous hair. What you eat directly impacts your hair health.",
    content: `In Ayurveda, hair is considered a byproduct of bone tissue. Proper nutrition directly feeds hair growth and strength. Healthy hair begins with healthy digestion and the right foods.

Best Foods for Hair Growth

Protein-Rich Foods: Hair is made of keratin, a protein. Best Ayurvedic protein sources include lentils and legumes, sesame seeds, almonds and walnuts, and dairy products like ghee and milk.

Iron-Rich Foods: Iron deficiency is one of the most common causes of hair fall. Include spinach, fenugreek leaves, dates, pomegranate, and jaggery.

Vitamin C Foods: Vitamin C helps absorb iron and is essential for collagen production. Best sources include amla, guava, lemon, and papaya.

Omega-3 Fatty Acids: Include flaxseeds, walnuts, chia seeds, and mustard oil.

Foods to Avoid

Avoid excess spicy and oily foods, refined sugar and processed foods, excessive alcohol and caffeine, and cold and raw foods that weaken digestive fire.

Specific Ayurvedic Hair Growth Tonics

Drink 30ml fresh amla juice daily on empty stomach. Eat 1 tablespoon of black sesame seeds daily. Include 1-2 teaspoons of pure cow ghee in daily diet. Drink coconut water for hydration and minerals.`,
    category: "hair-care",
    coverImageUrl: "/assets/generated/blog-haircare.dim_800x500.jpg",
    authorName: "Anuradha Sengupta",
    tags: ["hair growth", "diet", "hair care", "nutrition", "ayurvedic diet"],
    inlineImages: [],
  },
  {
    title: "Aloe Vera Benefits for Skin and Hair in Ayurveda",
    slug: "aloe-vera-benefits-skin-hair-ayurveda",
    excerpt:
      "Aloe vera, known as Kumari in Ayurveda, is one of the most versatile healing plants. Discover its remarkable benefits for skin and hair.",
    content: `Aloe vera, known as Kumari in Sanskrit, has been used in Ayurvedic medicine for over 5,000 years. Its cooling, soothing, and rejuvenating properties make it a complete beauty solution for both skin and hair.

Aloe Vera for Skin

Moisturizer and Hydration: Aloe vera gel hydrates without clogging pores, making it perfect for all skin types including oily and acne-prone skin.

How to use: Apply fresh aloe vera gel as a daily moisturizer morning and night on clean skin.

Sunburn Relief: Aloe vera's anti-inflammatory compounds provide immediate relief from sunburn, rashes, and skin irritation.

Anti-Aging: Aloe vera stimulates collagen and elastin production, reducing fine lines and improving skin elasticity.

How to use: Mix aloe vera gel with a few drops of vitamin E oil as a daily anti-aging serum.

Acne Treatment: Aloe vera's salicylic acid unclogs pores while its antimicrobial properties fight acne-causing bacteria.

How to use: Apply fresh aloe gel on pimples as an overnight spot treatment.

Aloe Vera for Hair

Scalp Health: Aloe vera's proteolytic enzymes repair dead skin cells on the scalp and create an optimal environment for hair growth.

How to use: Apply aloe vera gel directly on scalp, massage gently, leave for 30 minutes before shampooing.

Hair Growth: Aloe vera contains enzymes that directly promote hair follicle growth, increasing hair density and thickness over time.

How to use: Mix aloe vera gel with Bhringraj oil, apply to scalp and hair, leave for 1 hour.`,
    category: "skin-care",
    coverImageUrl: "/assets/generated/blog-skincare.dim_800x500.jpg",
    authorName: "Anuradha Sengupta",
    tags: ["aloe vera", "skin care", "hair care", "natural remedies", "kumari"],
    inlineImages: [],
  },
  {
    title: "Causes of Hair Fall in Women and Ayurvedic Solutions",
    slug: "causes-hair-fall-women-ayurvedic-solutions",
    excerpt:
      "Women experience hair fall due to many unique factors. Ayurveda provides targeted, holistic solutions for each underlying cause.",
    content: `Hair fall in women affects confidence and wellbeing. Ayurveda offers a comprehensive approach that addresses each specific cause.

Common Causes of Hair Fall in Women

1. Hormonal Imbalances: Postpartum hair loss, thyroid disorders, PCOS, menopause, and birth control changes.

Ayurvedic approach: Shatavari is Ayurveda's premier herb for women's hormonal health. Take 1/2 teaspoon with warm milk twice daily. Ashwagandha supports thyroid function and reduces cortisol levels.

2. Nutritional Deficiencies: Iron deficiency anemia is extremely common in women and is a leading cause of hair fall. Vitamin D, B12, zinc, and protein deficiencies also cause significant hair loss.

Ayurvedic approach: Take Chyawanprash daily and increase intake of iron-rich foods like dates, fenugreek leaves, and sesame seeds.

3. Stress and Anxiety: Chronically elevated cortisol pushes hair follicles into a resting phase, causing diffuse hair thinning.

Ayurvedic approach: Practice Abhyanga (self oil massage) daily. Take Brahmi for mental calm.

4. Scalp Conditions: Dandruff and scalp inflammation block follicles and prevent healthy hair growth.

Ayurvedic approach: Apply neem oil mixed with coconut oil to scalp weekly. Use a Triphala hair rinse after shampooing.

A Holistic Ayurvedic Hair Fall Program for Women

Morning routine: Drink amla juice on empty stomach. Massage scalp with warm oil twice a week. Practice 10 minutes of scalp-targeting yoga poses.

Evening routine: Take Shatavari or Ashwagandha in warm milk. Practice meditation or deep breathing exercises.`,
    category: "hair-care",
    coverImageUrl: "/assets/generated/blog-haircare.dim_800x500.jpg",
    authorName: "Anuradha Sengupta",
    tags: ["hair fall", "women", "hair care", "hormonal balance", "shatavari"],
    inlineImages: [],
  },
  {
    title: "Daily Ayurvedic Routine for Healthy Body & Mind",
    slug: "daily-ayurvedic-routine-healthy-body-mind",
    excerpt:
      "Transform your health with Dinacharya, the Ayurvedic daily routine. A consistent routine aligned with nature's rhythms is the foundation of vibrant health.",
    content: `In Ayurveda, Dinacharya (daily routine) is considered one of the most powerful tools for maintaining health and preventing disease. When we align our daily activities with the natural rhythms of the day, the body functions optimally.

The Ideal Ayurvedic Morning Routine

Wake Up Before Sunrise: Ayurveda recommends waking up 1.5 hours before sunrise. This is considered the most sattvic (pure) time of day.

Drink Warm Water: Immediately upon waking, drink 1-2 glasses of warm water. This activates the digestive system and flushes toxins.

Tongue Scraping: Use a copper tongue scraper to remove the white coating that builds up overnight. This removes accumulated toxins and stimulates digestive organs.

Oil Pulling (Gandusha): Swish 1 tablespoon of sesame or coconut oil for 15-20 minutes. This removes bacteria from the mouth and has detoxifying effects on the whole body.

Abhyanga (Self Oil Massage): Warm self-massage with sesame oil before bathing nourishes the skin, calms the nervous system, and improves circulation.

Yoga and Pranayama: Practice 15-20 minutes of yoga followed by 10 minutes of pranayama. This awakens the body gently.

Midday Routine

Eat your largest meal at lunch when digestive fire is strongest. Take a short walk after eating.

Evening Routine

Have a light, early dinner before 7 PM. Avoid screens 1 hour before bed. Massage feet with warm sesame oil before sleeping. Sleep by 10 PM.`,
    category: "lifestyle",
    coverImageUrl: "/assets/generated/blog-lifestyle.dim_800x500.jpg",
    authorName: "Anuradha Sengupta",
    tags: ["daily routine", "dinacharya", "lifestyle", "wellness", "ayurveda"],
    inlineImages: [],
  },
  {
    title: "Best Ayurvedic Oils for Hair Growth and Thickness",
    slug: "best-ayurvedic-oils-hair-growth-thickness",
    excerpt:
      "Discover the top Ayurvedic oils that have been used for centuries to stimulate hair growth, prevent hair fall, and create thick, lustrous hair.",
    content: `Hair oiling (Shiro Abhyanga) is a cornerstone of Ayurvedic hair care. Regular oil massage nourishes the scalp, strengthens hair roots, improves blood circulation, and creates the optimal conditions for hair growth.

Top Ayurvedic Oils for Hair Growth

1. Bhringraj Oil: Called the King of Herbs for hair. Benefits: Stimulates dormant hair follicles, reduces hair fall significantly, prevents premature greying, promotes thick hair growth.

How to use: Warm 2 tablespoons, massage into scalp using circular motions for 10-15 minutes, leave for 1-2 hours or overnight.

2. Brahmi Oil: Benefits: Strengthens hair roots, reduces stress-related hair fall, improves scalp circulation, promotes healthy hair growth, and has a calming effect on the nervous system.

3. Amla Oil: Benefits: Richest natural source of Vitamin C, essential for collagen production. Prevents premature greying, strengthens hair shaft, adds natural shine, and fights dandruff.

4. Castor Oil: Benefits: Dramatically increases hair thickness, stimulates hair follicles, moisturizes dry scalp. Note: best used diluted 1:1 with coconut oil.

5. Neem Oil: Benefits: Eliminates dandruff, treats scalp fungal infections, reduces scalp inflammation, strengthens weak hair follicles.

Homemade Ayurvedic Hair Oil Recipe

Heat 1 cup of sesame oil on low flame. Add 2 tablespoons each of Bhringraj powder, Brahmi powder, and Amla powder. Add 20 curry leaves and 1 tablespoon fenugreek seeds. Simmer on lowest heat for 20 minutes. Cool completely, strain, store in a glass bottle. Apply 2-3 times per week for best results.`,
    category: "hair-care",
    coverImageUrl: "/assets/generated/blog-haircare.dim_800x500.jpg",
    authorName: "Anuradha Sengupta",
    tags: ["hair oil", "hair growth", "bhringraj", "brahmi", "hair care"],
    inlineImages: [],
  },
];

let _seedingInProgress = false;
let _seedingDone = false;

export async function ensureSeedPostsExist(): Promise<void> {
  // Prevent concurrent calls
  if (_seedingInProgress || _seedingDone) return;
  _seedingInProgress = true;

  try {
    // First call seedData() to populate the canister with generic seed data
    const actor = await getActor();
    await actor.seedData();

    // Fetch all published posts to check which SEO slugs already exist
    const existing = await getPublishedPosts();
    const existingSlugs = new Set(existing.map((p) => p.slug));

    // Find which of the 10 SEO posts are missing
    const missingSlugs = SEO_SLUGS.filter((slug) => !existingSlugs.has(slug));

    if (missingSlugs.length === 0) {
      _seedingDone = true;
      return;
    }

    // Create missing posts one at a time (avoid overwhelming the canister)
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
      } catch {
        // Silently ignore individual post failures — don't break the app
      }
    }

    _seedingDone = true;
  } catch {
    // Silently ignore all errors — seeding failure must never break the app
  } finally {
    _seedingInProgress = false;
  }
}
