/**
 * seedPosts.ts — Seeds the site owner's 4 blog posts to the canister backend.
 *
 * Strategy:
 * 1. Wait for the canister to be ready (retry up to 8 times)
 * 2. Fetch all existing posts
 * 3. Delete any posts that are NOT one of the 4 required posts
 * 4. Create any of the 4 required posts that are missing
 *
 * This ensures only the owner's 4 posts are visible to everyone.
 * Never throws — all errors are caught silently.
 */

import {
  type FrontendBlogPost,
  createOrUpdatePost,
  deletePost,
  getActor,
  publishPost,
  resetActor,
} from "./blogApi";

type SeedPost = Omit<
  FrontendBlogPost,
  "id" | "status" | "publishedAt" | "createdAt" | "updatedAt"
>;

// The 4 posts the site owner created — seeded to canister so all visitors can see them
const REQUIRED_POSTS: SeedPost[] = [
  {
    title:
      "Ayurvedic Immunity Boosting Remedies | Natural Ways to Increase Immunity",
    slug: "ayurvedic-immunity-boosting-remedies-natural-ways-to-increase-immunity",
    excerpt:
      "Strengthen your body's natural defense system with these powerful Ayurvedic immunity boosters rooted in ancient Indian wisdom.",
    content: `Strengthen your body's natural defense system with these powerful Ayurvedic immunity boosters.

Turmeric Golden Milk

Ingredients:
1 cup warm milk
1 tsp turmeric powder
1/2 tsp cinnamon
Pinch of black pepper
1 tsp honey

Application:
Heat milk until warm (not boiling)
Add turmeric, cinnamon, and black pepper
Stir well and let steep for 2 minutes
Add honey before drinking

Benefits: Powerful anti-inflammatory and immune-boosting properties. Curcumin in turmeric enhances antibody responses.

Frequency: Daily before bedtime

Tulsi-Ginger Tea

Ingredients:
10-12 fresh tulsi leaves
1-inch ginger root
2 cups water
1 tsp honey
Few drops lemon juice

Application:
Crush tulsi leaves and grate ginger
Boil water and add tulsi and ginger
Simmer for 5-7 minutes
Strain, add honey and lemon

Benefits: Tulsi is an adaptogen that strengthens immunity. Ginger adds antimicrobial properties.

Frequency: Twice daily, morning and evening

Chyawanprash Tonic

Ingredients:
1 tbsp Chyawanprash
1 cup warm milk or water

Application:
Take 1 tablespoon of Chyawanprash
Mix with warm milk or water
Consume on empty stomach

Benefits: Traditional Ayurvedic formula with 40+ herbs. Boosts immunity, energy, and vitality.

Frequency: Once daily in the morning

Amla-Honey Immunity Shot

Ingredients:
2 fresh amla (Indian gooseberry)
1 tsp honey
Pinch of rock salt

Application:
Extract juice from fresh amla
Mix with honey and rock salt
Consume immediately

Benefits: Amla is richest source of Vitamin C. Enhances white blood cell production and antioxidant defense.

Frequency: Daily on empty stomach`,
    category: "health-remedies",
    coverImageUrl: "",
    authorName: "Anuradha Sengupta",
    tags: ["immunity", "ayurveda", "turmeric", "tulsi", "chyawanprash"],
    inlineImages: [],
  },
  {
    title:
      "Ayurvedic Remedies to Stop Hair Fall Naturally | Proven Herbal Solutions",
    slug: "ayurvedic-remedies-to-stop-hair-fall-naturally-proven-herbal-solutions",
    excerpt:
      "Stop hair loss naturally with powerful Ayurvedic herbs and oils that have been used for centuries to restore thick, healthy hair.",
    content: `Stop hair loss naturally with powerful Ayurvedic herbs and oils that have been used for centuries.

Onion Juice Hair Treatment

Ingredients:
2 medium onions
1 tbsp coconut oil
1 tsp honey
Few drops of essential oil (optional)

Application:
Peel and chop onions
Blend and extract juice
Mix with coconut oil and honey
Apply on scalp and massage
Leave for 30-45 minutes
Wash with mild herbal shampoo

Benefits:
Stimulates hair follicles
Rich in sulfur
Promotes hair regrowth
Strengthens hair roots

Frequency: Apply 2-3 times per week

Fenugreek Seeds Hair Mask

Ingredients:
3 tbsp fenugreek seeds
1/2 cup water
1 tbsp coconut oil
1 tbsp yogurt

Application:
Soak fenugreek seeds overnight
Grind into smooth paste
Mix with coconut oil and yogurt
Apply on scalp and hair
Leave for 30 minutes
Rinse thoroughly with water

Benefits:
Reduces hair fall
Strengthens hair shaft
Adds shine
Prevents dandruff

Frequency: Use twice weekly

Amla-Shikakai Hair Pack

Ingredients:
2 tbsp amla powder
2 tbsp shikakai powder
1 tbsp bhringraj powder
1 cup water
1 tbsp coconut oil

Application:
Mix all powders together
Add water to make paste
Add coconut oil
Apply on scalp and hair
Leave for 45 minutes
Wash with lukewarm water

Benefits:
Traditional hair fall remedy
Nourishes scalp
Strengthens roots
Promotes healthy growth

Frequency: Apply 2 times per week

Curry Leaves-Coconut Oil Treatment

Ingredients:
1 cup fresh curry leaves
1/2 cup coconut oil
1 tsp fenugreek seeds

Application:
Heat coconut oil in a pan
Add curry leaves and fenugreek
Heat until leaves turn black
Cool and strain the oil
Massage into scalp
Leave overnight, wash in morning

Benefits:
Prevents premature hair fall
Darkens hair
Nourishes follicles
Improves hair texture

Frequency: Use 2-3 times weekly`,
    category: "hair-care",
    coverImageUrl: "",
    authorName: "Anuradha Sengupta",
    tags: ["hair fall", "hair care", "ayurvedic remedies", "bhringraj", "amla"],
    inlineImages: [],
  },
  {
    title:
      "Best Ayurvedic Herbs for Glowing Skin | Natural Ayurvedic Skin Care",
    slug: "best-ayurvedic-herbs-for-glowing-skin-natural-ayurvedic-skin-care",
    excerpt:
      "Achieve naturally radiant, glowing skin with these powerful Ayurvedic herbs and proven home remedies.",
    content: `Achieve naturally radiant, glowing skin with these powerful Ayurvedic herbs.

Turmeric-Yogurt Glow Mask

Ingredients:
1 tsp turmeric powder
2 tbsp plain yogurt
1 tsp honey
Few drops lemon juice

Application:
Mix all ingredients into a smooth paste
Apply evenly on cleansed face
Leave on for 15-20 minutes
Rinse with lukewarm water

Benefits: Turmeric brightens skin, yogurt exfoliates gently, and honey moisturizes for a natural glow.

Frequency: 2-3 times per week

Saffron-Milk Radiance Treatment

Ingredients:
4-5 saffron strands
2 tbsp raw milk
1 tsp sandalwood powder

Application:
Soak saffron in milk for 30 minutes
Add sandalwood powder and mix
Apply on face and neck
Wash off after 20 minutes

Benefits: Saffron enhances complexion, milk nourishes, and sandalwood provides cooling effect.

Frequency: Twice weekly for best results

Aloe Vera-Rose Water Toner

Ingredients:
2 tbsp fresh aloe vera gel
2 tbsp rose water
Few drops vitamin E oil

Application:
Mix aloe vera gel with rose water
Add vitamin E oil
Apply with cotton pad after cleansing
Let it absorb naturally

Benefits: Hydrates deeply, balances pH, and gives instant glow while soothing the skin.

Frequency: Daily, morning and evening

Papaya-Honey Enzyme Mask

Ingredients:
1/4 cup mashed ripe papaya
1 tbsp honey
1 tsp lemon juice

Application:
Mash papaya into smooth pulp
Mix with honey and lemon juice
Apply on face avoiding eyes
Rinse after 15 minutes

Benefits: Papaya enzymes exfoliate dead cells, revealing brighter, smoother, glowing skin.

Frequency: Once weekly`,
    category: "skin-care",
    coverImageUrl: "",
    authorName: "Anuradha Sengupta",
    tags: [
      "glowing skin",
      "skin care",
      "ayurvedic herbs",
      "turmeric",
      "saffron",
    ],
    inlineImages: [],
  },
  {
    title:
      "How to Reduce Hair Fall Due to Stress | Ayurvedic Treatment for Hair Loss",
    slug: "how-to-reduce-hair-fall-due-to-stress-ayurvedic-treatment-for-hair-loss",
    excerpt:
      "Stress is one of the leading causes of hair fall. Learn how Ayurveda addresses stress-related hair loss from the root cause.",
    content: `Stress is one of the leading causes of hair fall today. Learn how Ayurveda addresses stress-related hair loss from the root cause.

The Stress-Hair Fall Connection in Ayurveda

Ayurveda recognized the connection between mind and body millennia before modern medicine. Chronic stress causes Vata and Pitta imbalances that directly affect hair health.

Ashwagandha Moon Milk

Ingredients:
1 cup warm milk
1 tsp ashwagandha powder
1/4 tsp nutmeg powder
1 tsp honey
Pinch of cardamom

Application:
Warm milk gently (do not boil)
Add ashwagandha and nutmeg
Stir well and let steep for 2 minutes
Add honey and cardamom before drinking

Benefits: Ashwagandha is a powerful adaptogen that reduces cortisol, calms the mind, and promotes deep sleep.

Frequency: Daily 30 minutes before bedtime

Brahmi-Tulsi Stress Relief Tea

Ingredients:
1 tsp dried brahmi leaves
8-10 fresh tulsi leaves
2 cups water
1 tsp honey
Few drops lemon

Application:
Boil water with brahmi and tulsi
Simmer for 5-7 minutes
Strain into a cup
Add honey and lemon

Benefits: Brahmi enhances cognitive function and reduces anxiety. Tulsi balances stress hormones.

Frequency: Twice daily, morning and evening

Brahmi Oil Scalp Massage

Brahmi calms the nervous system when applied topically. Regular scalp massage with Brahmi oil reduces anxiety, improves sleep quality, and directly nourishes hair follicles.

How to use: Heat Brahmi oil until warm. Massage into scalp for 10-15 minutes using circular motions. Leave for 1-2 hours. Wash with mild shampoo.

Frequency: 2-3 times per week

Pranayama for Hair Health

Practice Nadi Shodhana (Alternate Nostril Breathing) for 10 minutes daily. This balances the nervous system, improves circulation to the scalp, and reduces anxiety.`,
    category: "hair-care",
    coverImageUrl: "",
    authorName: "Anuradha Sengupta",
    tags: ["stress", "hair fall", "hair care", "ashwagandha", "brahmi"],
    inlineImages: [],
  },
];

// All slugs we expect to have in the canister
const REQUIRED_SLUGS = new Set(REQUIRED_POSTS.map((p) => p.slug));

let _seedingInProgress = false;
let _seedingDone = false;

export function isSeedingInProgress(): boolean {
  return _seedingInProgress;
}

export function isSeedingDone(): boolean {
  return _seedingDone;
}

/**
 * Waits for the canister actor to be ready, retrying up to maxAttempts times.
 */
async function waitForActor(maxAttempts = 8, delayMs = 2000): Promise<boolean> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const actor = await getActor(1, 0);
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
  if (_seedingInProgress) return;

  _seedingInProgress = true;

  try {
    const ready = await waitForActor();
    if (!ready) {
      return;
    }

    const actor = await getActor(1, 0);

    let existingRaw: { id: bigint; slug: string }[] = [];
    try {
      existingRaw = (await actor.getAllPosts()) as {
        id: bigint;
        slug: string;
      }[];
    } catch {
      resetActor();
      return;
    }

    // Step 1: Delete any posts that are NOT in our required set
    const toDelete = existingRaw.filter((p) => !REQUIRED_SLUGS.has(p.slug));
    for (const post of toDelete) {
      try {
        await deletePost(post.id.toString());
        await new Promise((r) => setTimeout(r, 200));
      } catch {
        // ignore deletion failures
      }
    }

    // Step 2: Re-fetch to see what's left
    let remainingRaw: { id: bigint; slug: string }[] = [];
    try {
      remainingRaw = (await actor.getAllPosts()) as {
        id: bigint;
        slug: string;
      }[];
    } catch {
      // If fetch fails, assume empty and proceed with full seeding
      remainingRaw = [];
    }

    const existingSlugs = new Set(remainingRaw.map((p) => p.slug));

    // Reset done flag if we don't have all required posts
    if (!Array.from(REQUIRED_SLUGS).every((s) => existingSlugs.has(s))) {
      _seedingDone = false;
    }

    if (_seedingDone) {
      return;
    }

    // Step 3: Create any missing required posts
    const missingSlugs = Array.from(REQUIRED_SLUGS).filter(
      (slug) => !existingSlugs.has(slug),
    );

    if (missingSlugs.length === 0) {
      _seedingDone = true;
      return;
    }

    for (let i = 0; i < REQUIRED_POSTS.length; i++) {
      const postData = REQUIRED_POSTS[i];
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

        if (i < REQUIRED_POSTS.length - 1) {
          await new Promise((r) => setTimeout(r, 400));
        }
      } catch {
        // Silently ignore individual post failures
      }
    }

    _seedingDone = true;
  } catch {
    _seedingDone = false;
  } finally {
    _seedingInProgress = false;
  }
}
