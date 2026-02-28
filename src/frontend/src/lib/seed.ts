import type { BlogPost } from "../types";
import { isSeeded, markSeeded, savePosts } from "./storage";

function makeId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function d(year: number, month: number, day: number) {
  return new Date(year, month - 1, day).toISOString();
}

const seedPosts: Omit<
  BlogPost,
  "id" | "createdAt" | "updatedAt" | "inlineImages"
>[] = [
  {
    title: "Ayurvedic Remedies to Stop Hair Fall Naturally",
    slug: "ayurvedic-remedies-to-stop-hair-fall-naturally",
    excerpt:
      "Discover powerful Ayurvedic herbs and time-tested home remedies that can naturally reduce hair fall and strengthen your hair roots.",
    content: `<h2>Understanding Hair Fall in Ayurveda</h2>
<p>In Ayurveda, hair fall — known as <strong>Khalitya</strong> — is primarily associated with an imbalance in the Pitta dosha. Pitta governs metabolism and transformation in the body, and when it becomes aggravated, it can lead to inflammation of hair follicles, weakening them over time. Understanding your dosha type is the first step toward treating hair fall holistically.</p>

<h2>Top Ayurvedic Herbs for Hair Fall</h2>
<p><strong>Bhringraj (Eclipta alba)</strong> is considered the "King of Herbs" for hair in Ayurveda. It nourishes the hair follicles, improves blood circulation to the scalp, and has natural anti-inflammatory properties. Regular application of Bhringraj oil or consuming Bhringraj powder with warm water can significantly reduce hair fall within a few weeks.</p>
<p><strong>Amla (Indian Gooseberry)</strong> is rich in Vitamin C and antioxidants, making it one of the most powerful remedies for hair fall. It strengthens the hair shaft, prevents premature graying, and promotes healthy hair growth. You can consume amla juice daily or apply amla oil twice a week for best results.</p>

<h2>Effective Home Remedies</h2>
<p>A classic Ayurvedic hair mask combines <strong>fenugreek seeds</strong> (methi), <strong>neem leaves</strong>, and <strong>coconut oil</strong>. Soak fenugreek seeds overnight, grind them into a paste, mix with fresh neem leaf juice and warm coconut oil, and apply to your scalp. Leave for 30-45 minutes before washing with a mild herbal shampoo. This remedy reduces scalp inflammation and strengthens roots.</p>

<h2>Dietary Guidelines</h2>
<p>Ayurveda emphasizes that healthy hair comes from proper nutrition. Include iron-rich foods like sesame seeds, lentils, and green leafy vegetables in your diet. Avoid spicy, fried, and processed foods that aggravate Pitta. Drink plenty of water and consume cooling foods like cucumber, coconut water, and buttermilk during summer months.</p>

<h2>Lifestyle Tips</h2>
<p>Practice regular scalp massage (Shiro Abhyanga) with warm sesame or coconut oil. Massage in circular motions for 10-15 minutes to improve blood circulation. Avoid excessive heat styling, tight hairstyles, and chemical treatments. Practice stress-reducing techniques like yoga and meditation, as stress is a major trigger for hair fall.</p>`,
    category: "hair-care",
    coverImageUrl: "/assets/generated/blog-haircare.dim_800x500.jpg",
    status: "published",
    publishedAt: d(2025, 1, 5),
    authorName: "AyurGlow Team",
    tags: ["hair fall", "ayurveda", "bhringraj", "amla", "hair care"],
  },
  {
    title: "Best Ayurvedic Herbs for Glowing Skin",
    slug: "best-ayurvedic-herbs-for-glowing-skin",
    excerpt:
      "Explore the most effective Ayurvedic herbs scientifically proven to give you naturally radiant, glowing skin without any chemicals.",
    content: `<h2>The Ayurvedic Approach to Radiant Skin</h2>
<p>In Ayurveda, true beauty — called <strong>Subhanga Karanam</strong> — comes from within. Skin health is directly related to digestive health, liver function, and the balance of the three doshas. When we address these root causes rather than just surface symptoms, we achieve a lasting glow that no cream can replicate. The ancient sages identified specific herbs that purify the blood, balance hormones, and rejuvenate skin cells at a deep level.</p>

<h2>Turmeric (Haridra) – The Golden Herb</h2>
<p><strong>Turmeric</strong> contains curcumin, a powerful antioxidant and anti-inflammatory compound. In Ayurveda, it is revered as a skin purifier (Twak Prasadana). Mix half a teaspoon of turmeric powder with raw honey and apply as a face mask for 15 minutes, three times a week. This helps reduce pigmentation, control acne, and give skin an even tone. Drinking golden milk (turmeric in warm milk) before bed also improves skin texture from inside.</p>

<h2>Neem (Azadirachta indica) – The Natural Purifier</h2>
<p><strong>Neem</strong> is a powerful blood purifier and antibacterial herb. It contains nimbin and nimbidin compounds that fight acne-causing bacteria and reduce skin inflammation. Use neem leaf paste as a spot treatment for pimples, or add neem powder to your face pack for clearer skin. Internally, consuming neem juice (diluted) helps cleanse the liver, which is the organ most responsible for skin health in Ayurveda.</p>

<h2>Saffron (Kesar) – The Skin Brightener</h2>
<p><strong>Saffron</strong> is one of the most prized herbs in Ayurvedic beauty treatments. It contains safranal and crocin, compounds that improve skin tone and reduce melanin production. Soak 4-5 strands of saffron in warm milk overnight and apply to skin in the morning, or add saffron to your daily milk for an internal glow treatment. Regular use over 4-6 weeks shows visible brightening results.</p>

<h2>Sandalwood (Chandan) – The Cooling Healer</h2>
<p><strong>Sandalwood</strong> has a cooling effect (Sheet Virya) that balances Pitta dosha — the primary cause of skin redness, irritation, and uneven tone. Mix sandalwood powder with rose water to make a paste and apply to face for 20 minutes. It reduces pores, controls oil production, and leaves skin with a natural fragrance and glow. Sandalwood oil mixed with coconut oil can be used as a night serum for deeper nourishment.</p>

<h2>Daily Ritual for Glowing Skin</h2>
<p>Combine these herbs in a weekly routine: Monday — turmeric and honey mask; Wednesday — neem and rosewater pack; Friday — sandalwood and milk cream. Supplement with 1 teaspoon of amla juice in the morning and saffron milk at night. Within 30 days, you will notice a significant improvement in skin clarity, texture, and natural radiance.</p>`,
    category: "skin-care",
    coverImageUrl: "/assets/generated/blog-skincare.dim_800x500.jpg",
    status: "published",
    publishedAt: d(2025, 1, 12),
    authorName: "AyurGlow Team",
    tags: ["skin glow", "turmeric", "neem", "saffron", "ayurvedic beauty"],
  },
  {
    title: "How to Reduce Hair Fall Due to Stress – Ayurvedic Guide",
    slug: "how-to-reduce-hair-fall-due-to-stress-ayurvedic-guide",
    excerpt:
      "Stress-induced hair fall is extremely common today. This comprehensive Ayurvedic guide shows you how to calm your nervous system and stop hair loss naturally.",
    content: `<h2>The Stress-Hair Fall Connection in Ayurveda</h2>
<p>Ayurveda recognized the connection between mind and body millennia before modern medicine. Chronic stress causes Vata and Pitta imbalances that directly affect hair health. Elevated stress hormones constrict blood vessels in the scalp, depriving hair follicles of essential nutrients. In Ayurvedic terms, this is called <strong>Manasika Dosha</strong> (mental dosha), which when disturbed, creates a cascade of physical symptoms including hair fall.</p>

<h2>Ashwagandha – The Stress-Buster Herb</h2>
<p><strong>Ashwagandha (Withania somnifera)</strong> is classified as an adaptogen — an herb that helps the body adapt to stress. It reduces cortisol levels, the primary stress hormone responsible for triggering telogen effluvium (stress-related hair loss). Take 500mg of Ashwagandha root powder with warm milk every night before bed. Within 6-8 weeks, you'll notice both reduced stress levels and decreased hair fall.</p>

<h2>Brahmi – Nourishing the Nervous System</h2>
<p><strong>Brahmi (Bacopa monnieri)</strong> is specifically prescribed in Ayurveda for <strong>Mano Vikara</strong> (mental disorders) including anxiety and stress. It not only calms the nervous system but also directly nourishes hair follicles when applied topically. Make Brahmi oil by infusing fresh Brahmi leaves in sesame oil for two weeks. Massage into scalp twice weekly for dual-action stress relief and hair strengthening.</p>

<h2>Pranayama for Hair Health</h2>
<p>Breathing exercises are a cornerstone of Ayurvedic stress management. Practice <strong>Nadi Shodhana (Alternate Nostril Breathing)</strong> for 10 minutes daily. This balances the left and right hemispheres of the brain, activates the parasympathetic nervous system, and improves circulation to the scalp. <strong>Bhramari (Bee Breath)</strong> is another powerful technique that reduces anxiety and promotes deeper sleep — both essential for hair health.</p>

<h2>The Ayurvedic Sleep Ritual</h2>
<p>Poor sleep is both a cause and effect of stress, creating a vicious cycle that worsens hair fall. Ayurveda recommends the Dinacharya (daily routine) practice of sleeping by 10 PM and waking by 6 AM. Apply warm sesame or Brahmi oil to the soles of your feet and crown of your head before sleep. This activates marma points (vital energy centers) and promotes deep, restorative sleep that allows hair follicle regeneration.</p>

<h2>Anti-Stress Diet for Hair Growth</h2>
<p>During stressful periods, increase consumption of Sattvic (pure, calming) foods: ghee, milk, sweet fruits, almonds, and dates. Reduce Rajasic (stimulating) foods like coffee, spicy foods, and alcohol which further aggravate Pitta. Drink <strong>Ashwagandha milk</strong> (warm milk with Ashwagandha, cardamom, and honey) at bedtime to nourish the nervous system while you sleep.</p>`,
    category: "hair-care",
    coverImageUrl: "/assets/generated/blog-haircare.dim_800x500.jpg",
    status: "published",
    publishedAt: d(2025, 1, 20),
    authorName: "AyurGlow Team",
    tags: [
      "stress hair fall",
      "ashwagandha",
      "brahmi",
      "pranayama",
      "mental health",
    ],
  },
  {
    title: "Triphala Benefits for Skin, Hair & Digestion",
    slug: "triphala-benefits-for-skin-hair-digestion",
    excerpt:
      "Triphala is Ayurveda's most revered tridoshic formulation. Learn how this three-fruit combination transforms your health, beauty, and digestion.",
    content: `<h2>What is Triphala?</h2>
<p><strong>Triphala</strong> — meaning "three fruits" in Sanskrit — is Ayurveda's most widely used and studied polyherbal formulation. It combines equal parts of <strong>Amalaki (Emblica officinalis)</strong>, <strong>Bibhitaki (Terminalia bellirica)</strong>, and <strong>Haritaki (Terminalia chebula)</strong>. Together, these three fruits create a synergistic medicine that is said to be <strong>tridoshic</strong> — balancing all three doshas (Vata, Pitta, and Kapha) simultaneously. This is why Triphala has been called the "universal remedy" in Ayurvedic practice.</p>

<h2>Triphala for Digestive Health</h2>
<p>The most celebrated benefit of Triphala is its profound effect on the digestive system. It acts as a gentle laxative that cleanses the colon without creating dependency — unlike pharmaceutical laxatives. More importantly, it nourishes and rejuvenates the intestinal walls, improving nutrient absorption. Take 1/2 to 1 teaspoon of Triphala powder in warm water before bed. Begin with a smaller dose and gradually increase. Within 2 weeks, you'll notice improved bowel regularity, reduced bloating, and better nutrient absorption.</p>

<h2>Triphala for Radiant Skin</h2>
<p>Since Ayurveda considers the gut the root of all health (including skin health), Triphala's digestive benefits directly translate to skin improvements. Additionally, its three constituent fruits are among the richest natural sources of Vitamin C and antioxidants. These compounds fight free radical damage, reduce oxidative stress, and stimulate collagen production. Regular consumption of Triphala for 60-90 days results in noticeably clearer, brighter, and more youthful-looking skin. For topical use, make Triphala tea and use as a face wash daily.</p>

<h2>Triphala for Hair Strength</h2>
<p>The high Vitamin C content in Triphala — particularly from Amalaki — is crucial for iron absorption. Iron deficiency is one of the leading causes of hair fall in women. By improving iron absorption and providing direct antioxidant nourishment to hair follicles, Triphala addresses hair fall at its root. Make Triphala oil by mixing Triphala powder in coconut oil (heat gently for 5 minutes, strain when cool) and massage into scalp twice weekly for stronger, shinier hair.</p>

<h2>How to Use Triphala Correctly</h2>
<p>For maximum benefit, take Triphala at bedtime (1/2 tsp powder in warm water) and in the morning (1/4 tsp mixed in honey, 30 minutes before breakfast). Avoid taking it with milk as this combination is considered incompatible in Ayurveda. Start slowly — some people experience mild digestive adjustment in the first week. After 3 months of consistent use, take a 2-week break before continuing, as Ayurveda recommends cycling herbal supplements for optimal effect.</p>`,
    category: "health-remedies",
    coverImageUrl: "/assets/generated/blog-health.dim_800x500.jpg",
    status: "published",
    publishedAt: d(2025, 1, 28),
    authorName: "AyurGlow Team",
    tags: ["triphala", "digestion", "ayurveda", "tridoshic", "gut health"],
  },
  {
    title: "Home Remedies for Pimples Using Ayurveda",
    slug: "home-remedies-for-pimples-using-ayurveda",
    excerpt:
      "Say goodbye to harsh chemical acne treatments. These powerful Ayurvedic home remedies will clear pimples while balancing your skin naturally.",
    content: `<h2>Pimples in Ayurvedic Perspective</h2>
<p>Acne and pimples are called <strong>Yuvana Pidika</strong> in Ayurveda, where <em>Yuvana</em> means youth and <em>Pidika</em> means eruption. The primary cause is an aggravation of Pitta and Kapha doshas. Pitta causes inflammation and redness while Kapha creates excess sebum production. Additionally, poor digestion (Agni Mandya) leads to Ama (toxin) accumulation in the blood, which manifests as skin breakouts. True Ayurvedic acne treatment therefore addresses both external triggers and internal imbalances.</p>

<h2>Neem and Turmeric Face Pack</h2>
<p>Combine 2 tablespoons of <strong>neem leaf powder</strong> with 1 teaspoon of <strong>turmeric</strong> and enough rose water to make a smooth paste. Apply to clean skin, avoiding the eye area. Leave for 15-20 minutes. Neem's antibacterial properties kill the acne-causing bacteria Propionibacterium acnes, while turmeric reduces inflammation and speeds healing. Use this pack three times a week for active breakouts and twice weekly for prevention.</p>

<h2>Multani Mitti (Fuller's Earth) Treatment</h2>
<p><strong>Multani Mitti</strong> is an Ayurvedic clay with exceptional oil-absorbing and pore-cleansing properties. Mix 2 tablespoons Multani Mitti with 1 tablespoon sandalwood powder and rose water. Apply to oily areas and leave until completely dry (about 20 minutes). This pack deeply cleanses pores, reduces excess oil, and provides a cooling effect that calms Pitta. For sensitive skin, add 1 teaspoon of aloe vera gel to prevent dryness.</p>

<h2>Internal Remedies</h2>
<p>Acne that doesn't respond to topical treatments is usually driven by internal factors. Drink <strong>Neem juice</strong> (1-2 tablespoons diluted in water) on an empty stomach every morning for blood purification. Consume Triphala powder every night to improve digestion and eliminate toxins. Avoid trigger foods: dairy, refined sugar, spicy foods, and refined oils. Increase intake of cooling foods: coconut water, cucumber, mint, and aloe vera juice.</p>

<h2>Spot Treatment with Clove Oil</h2>
<p><strong>Clove oil (Lavanga))</strong> is a potent antibacterial and anti-inflammatory agent used in Ayurvedic medicine. Dilute one drop of clove essential oil with 5 drops of coconut oil and apply directly to individual pimples with a cotton swab. Leave overnight. The eugenol in clove oil penetrates into the pimple and kills bacteria while reducing swelling significantly within 24-48 hours. Do not apply undiluted clove oil as it is very strong and can cause irritation.</p>

<h2>Weekly Anti-Acne Ritual</h2>
<p>Follow this weekly protocol for clear skin: Morning — Neem juice and warm lemon water on empty stomach. Before bath — Neem and turmeric face pack. Post bath — Light moisturizing with aloe vera gel. Night — Triphala in warm water. Every 3 days — Multani Mitti deep cleanse pack. Maintain this routine consistently for 45 days to see dramatic improvements in skin clarity and texture.</p>`,
    category: "skin-care",
    coverImageUrl: "/assets/generated/blog-skincare.dim_800x500.jpg",
    status: "published",
    publishedAt: d(2025, 2, 3),
    authorName: "AyurGlow Team",
    tags: ["pimples", "acne", "neem", "turmeric", "skin care"],
  },
  {
    title: "Ayurvedic Diet for Healthy Hair Growth",
    slug: "ayurvedic-diet-for-healthy-hair-growth",
    excerpt:
      "What you eat directly determines your hair health. Learn which Ayurvedic foods and nutrients fuel spectacular hair growth and prevent deficiencies.",
    content: `<h2>Food as Medicine for Hair in Ayurveda</h2>
<p>Ayurveda's principle of <strong>Ahara Vihara</strong> (diet and lifestyle) is foundational to hair health. According to ancient texts, hair is the by-product of bone tissue (Asthi Dhatu) and nails. This means that nutrients that strengthen bones — calcium, Vitamin D, magnesium, and phosphorus — also strengthen hair. Additionally, because hair contains primarily keratin (a protein), adequate protein intake is non-negotiable for healthy hair growth.</p>

<h2>The Power Foods for Hair Growth</h2>
<p><strong>Sesame seeds (Til)</strong> are perhaps the most powerful hair food in Ayurveda. They are rich in calcium, magnesium, zinc, copper, and Vitamin B1 — all critical for hair growth. Eat a tablespoon of roasted black sesame seeds every morning. You can also mix them with jaggery for a tasty energy ball (til ke ladoo). Sesame oil applied to the scalp has additional benefits of warming and nourishing the scalp directly.</p>
<p><strong>Indian Gooseberry (Amla)</strong> contains 20 times more Vitamin C than an orange. Vitamin C is essential for collagen production, which forms the structural foundation of hair. It also enhances iron absorption — iron deficiency being a primary cause of female hair fall. Include fresh amla in your diet during season (October-March) and use amla powder throughout the year mixed in water, smoothies, or chutneys.</p>

<h2>Protein Sources in Ayurvedic Diet</h2>
<p>Ayurveda recommends plant-based proteins as the primary source of nutrition. <strong>Moong dal</strong> is the most easily digestible protein and highly recommended for hair health. <strong>Almonds</strong> (soaked overnight to remove the skin) provide biotin, Vitamin E, and healthy fats that nourish hair follicles from within. <strong>Ghee</strong>, considered a rejuvenating food (Rasayana), provides fat-soluble vitamins A, D, E, and K that are essential for healthy hair growth and scalp health.</p>

<h2>Spices That Promote Hair Growth</h2>
<p>Incorporate <strong>fenugreek (Methi)</strong> in your cooking regularly — it contains diosgenin, a compound that promotes hair growth. <strong>Curry leaves</strong> (Kari Patta) are rich in iron and amino acids that strengthen hair follicles. Add them to daily cooking or consume 8-10 fresh curry leaves every morning on an empty stomach. <strong>Cumin (Jeera)</strong> improves digestion and iron absorption when consumed regularly — both critical for hair nutrition.</p>

<h2>Foods to Avoid</h2>
<p>Certain foods actively damage hair health and should be minimized or eliminated: Refined sugars cause inflammation that weakens hair follicles. Excessive salt causes water retention and reduces scalp circulation. Alcohol depletes zinc and biotin — two essential hair nutrients. Refined oils (vegetable, canola) promote inflammation. Trans fats found in processed foods interfere with hormonal balance, which directly affects hair growth cycles. Replace these with natural sweeteners (honey, dates), rock salt (Sendha Namak), and cold-pressed oils.</p>`,
    category: "hair-care",
    coverImageUrl: "/assets/generated/blog-haircare.dim_800x500.jpg",
    status: "published",
    publishedAt: d(2025, 2, 7),
    authorName: "AyurGlow Team",
    tags: ["hair diet", "nutrition", "amla", "sesame", "protein for hair"],
  },
  {
    title: "Aloe Vera Benefits for Skin and Hair in Ayurveda",
    slug: "aloe-vera-benefits-for-skin-and-hair-in-ayurveda",
    excerpt:
      "Aloe Vera, known as Kumari in Ayurveda, is a complete beauty solution. Discover its transformative benefits for skin hydration and hair strength.",
    content: `<h2>Aloe Vera (Kumari) in Ayurvedic Medicine</h2>
<p>Known as <strong>Kumari</strong> (meaning "young woman" or "one who gives youth") in Sanskrit, Aloe Vera has been used in Ayurvedic medicine for over 6,000 years. Its name reflects its ability to restore youthful appearance. The gel within its thick leaves contains over 75 potentially active compounds including vitamins A, C, E, B12, folic acid, and choline. Ayurveda classifies it as having a sweet-bitter taste with cooling properties that pacify Pitta dosha — making it ideal for skin and scalp inflammation.</p>

<h2>Aloe Vera for Skin Hydration and Glow</h2>
<p>Aloe vera gel is a natural humectant that draws moisture into the skin and locks it in. For daily skin care, cut a fresh aloe vera leaf, extract the gel, and apply directly to clean face. Leave for 20 minutes before washing off. For an enhanced glow treatment, mix fresh aloe gel with a few drops of rose water and 1/4 teaspoon of turmeric. This combination hydrates, brightens, and soothes skin simultaneously. Regular use for 4 weeks results in noticeably plumper, more radiant skin.</p>

<h2>Aloe Vera for Acne and Scars</h2>
<p>Aloe vera contains salicylic acid (a natural acne-fighting compound) and gibberellins that kill acne bacteria and reduce sebum production. More importantly for long-term skin health, its anti-inflammatory properties prevent post-acne hyperpigmentation (dark spots). Apply fresh aloe gel as a spot treatment overnight on active pimples. For fading existing scars and dark spots, mix aloe gel with a drop of Vitamin E oil and apply nightly. Consistent use for 60-90 days shows significant scar reduction.</p>

<h2>Aloe Vera Hair Pack for Strength and Shine</h2>
<p>Fresh aloe vera is one of the most effective natural conditioners available. Its enzymatic properties gently cleanse the scalp, removing dead skin cells without stripping natural oils. For a deep conditioning treatment, blend half a cup of fresh aloe gel with 2 tablespoons of coconut oil and 1 tablespoon of castor oil. Apply from roots to tips, cover with a warm towel, and leave for 45 minutes. Wash with a mild shampoo. This treatment dramatically increases hair elasticity and shine while reducing breakage.</p>

<h2>Internal Benefits</h2>
<p>Beyond topical use, consuming aloe vera juice internally amplifies its beauty benefits. Drink 30ml of fresh aloe vera juice (without the yellow aloin layer which can be laxative) with water every morning. This improves digestion, reduces bloating, supports liver function, and purifies blood — all of which reflect in clearer skin and healthier hair. Add fresh mint and a squeeze of lemon for a refreshing morning tonic that also supports the lymphatic system.</p>`,
    category: "skin-care",
    coverImageUrl: "/assets/generated/blog-skincare.dim_800x500.jpg",
    status: "published",
    publishedAt: d(2025, 2, 11),
    authorName: "AyurGlow Team",
    tags: [
      "aloe vera",
      "kumari",
      "skin hydration",
      "hair conditioning",
      "natural beauty",
    ],
  },
  {
    title: "Causes of Hair Fall in Women and Ayurvedic Solutions",
    slug: "causes-of-hair-fall-in-women-and-ayurvedic-solutions",
    excerpt:
      "Hair fall in women has multiple root causes — hormonal, nutritional, and lifestyle. This Ayurvedic guide addresses each cause with targeted natural solutions.",
    content: `<h2>Why Women Experience Hair Fall – An Ayurvedic Analysis</h2>
<p>According to Ayurveda, hair fall in women is most commonly caused by <strong>Pitta aggravation</strong>, which can be triggered by multiple factors: hormonal fluctuations (pregnancy, postpartum, menopause), stress, poor digestion, iron deficiency, and thyroid disorders. Unlike men whose hair fall is primarily genetic (Khalitya), women's hair fall is more complex and typically multifactorial. The good news is that Ayurveda excels at treating multifactorial conditions because it addresses the entire body system rather than isolated symptoms.</p>

<h2>Hormonal Hair Fall</h2>
<p>Hormonal imbalances — particularly elevated androgens (male hormones) and thyroid dysfunction — are among the most common causes of female hair fall. <strong>Shatavari (Asparagus racemosus)</strong> is Ayurveda's premier female hormone balancer. It nourishes the reproductive system, regulates estrogen levels, and reduces the androgen imbalance that causes hair thinning. Take 500mg of Shatavari powder with warm milk twice daily. <strong>Lodhra (Symplocos racemosa)</strong> is another excellent herb for hormonal balance.</p>

<h2>Iron Deficiency and Anemia</h2>
<p>Iron deficiency is arguably the most common cause of hair fall in women worldwide due to menstrual blood loss. Ayurveda addresses this through iron-rich food medicine. <strong>Pomegranate (Dadima)</strong> is one of the best natural sources of iron and also contains punicalagins that improve iron absorption. Consume one pomegranate or 200ml of fresh pomegranate juice daily. <strong>Lauha Bhasma</strong> (calcined iron preparation) is the classical Ayurvedic remedy for severe iron deficiency — consult a Vaidya before using.</p>

<h2>Postpartum Hair Fall</h2>
<p>Hair fall 2-4 months after delivery (known medically as postpartum telogen effluvium) is extremely common. In Ayurveda, this is seen as a depletion of Ojas (vital essence) and requires specific rejuvenation therapy. The <strong>Panchamrit</strong> combination (milk, ghee, honey, curd, sugar) taken daily helps restore Ojas. <strong>Ashwagandha</strong> and <strong>Shatavari</strong> together form the ideal postpartum tonic. <strong>Mahanarayan oil</strong> massaged into the scalp and back of neck daily helps restore circulation and nourishment to the hair follicles.</p>

<h2>Thyroid-Related Hair Fall</h2>
<p>Hypothyroidism dramatically affects hair growth cycles, causing diffuse hair thinning throughout the scalp. <strong>Guggul (Commiphora mukul)</strong> is Ayurveda's most used thyroid-supporting herb. It contains guggulsterones that improve thyroid hormone metabolism. <strong>Kanchanar (Bauhinia variegate)</strong> is specifically mentioned in classical texts for thyroid disorders. These herbs require guidance from an Ayurvedic practitioner for proper dosage. Supplementary iodine from sea vegetables (seaweed) and selenium from pumpkin seeds also support thyroid health.</p>

<h2>Comprehensive 90-Day Protocol</h2>
<p>For comprehensive hair fall reversal, follow this protocol: Week 1-4 — Focus on digestion using Triphala and digestive spices. Week 5-8 — Add Ashwagandha or Shatavari (based on your constitution) for hormonal balance. Week 9-12 — Include Bhringraj oil massage and Amla internally for direct hair nourishment. Throughout — maintain iron-rich diet, stress management practices, and adequate sleep. Re-evaluate at 90 days and continue for another cycle if needed.</p>`,
    category: "hair-care",
    coverImageUrl: "/assets/generated/blog-haircare.dim_800x500.jpg",
    status: "published",
    publishedAt: d(2025, 2, 15),
    authorName: "AyurGlow Team",
    tags: [
      "women hair fall",
      "hormonal hair loss",
      "postpartum",
      "shatavari",
      "iron deficiency",
    ],
  },
  {
    title: "Daily Ayurvedic Routine for Healthy Body & Mind",
    slug: "daily-ayurvedic-routine-for-healthy-body-mind",
    excerpt:
      "Dinacharya — the Ayurvedic daily routine — is the foundation of lasting health and vitality. Learn how to transform your mornings and evenings for optimal wellness.",
    content: `<h2>The Science of Dinacharya</h2>
<p><strong>Dinacharya</strong> (daily routine) is one of Ayurveda's most practical and powerful tools for health. It is based on the understanding that our bodies follow natural rhythms aligned with the sun, moon, and seasons. By aligning our activities with these natural cycles, we can optimize digestion, sleep, energy, and mental clarity. Modern research increasingly validates many Dinacharya practices through the science of <strong>circadian biology</strong> — the study of how body processes are regulated by 24-hour cycles.</p>

<h2>The Morning Ritual (Brahma Muhurta)</h2>
<p>Ayurveda recommends waking during <strong>Brahma Muhurta</strong> — approximately 90 minutes before sunrise (around 4:30-5:30 AM in most regions). This time is considered sattvic (pure) and ideal for spiritual practices and mental clarity. Begin with <strong>Ushapan</strong> — drinking 2-4 glasses of water stored overnight in a copper vessel. Copper-infused water has antimicrobial properties, balances all three doshas, and stimulates the digestive system. Follow with <strong>oil pulling (Gandusha)</strong> — swishing 1 tablespoon of cold-pressed sesame or coconut oil in the mouth for 10-15 minutes to detoxify the oral cavity.</p>

<h2>Self-Care Practices</h2>
<p><strong>Abhyanga</strong> (self-massage with warm oil) is perhaps the most transformative Dinacharya practice. Warm sesame oil is ideal for Vata types, coconut oil for Pitta, and mustard oil for Kapha. Massage from head to toe using long strokes on limbs and circular motions on joints. This practice improves lymphatic circulation, nourishes the skin and nervous system, improves sleep quality, and reduces the signs of aging. Even 5-10 minutes of self-massage before showering provides significant benefits. Practice it daily for 30 days and notice the transformation.</p>

<h2>Exercise and Yoga</h2>
<p>Ayurveda prescribes <strong>Vyayama</strong> (exercise) as an essential component of Dinacharya, but with an important caveat: exercise should be done to 50% of maximum capacity (<strong>Ardha Shakti</strong>). This prevents the creation of free radicals (Ama) from excessive exercise. Practice yoga, walking, or swimming in the morning, ideally in fresh air. Specific Yoga poses (asanas) that support overall health include Surya Namaskar (Sun Salutation), Vrikshasana (Tree Pose), and Shavasana (Corpse Pose) for complete relaxation.</p>

<h2>Meal Timing and Digestion</h2>
<p>Ayurveda considers <strong>Agni</strong> (digestive fire) the cornerstone of health. To keep Agni burning optimally: Eat the largest meal at noon when digestive fire is strongest. Avoid eating until the previous meal is digested (minimum 3-4 hours). Sit down while eating and eat in a calm environment without screens. Begin each meal with a small piece of ginger with rock salt to stimulate digestive enzymes. End the day with a light dinner before sunset or by 7 PM to allow complete digestion before sleep.</p>

<h2>Evening Wind-Down Ritual</h2>
<p>Ayurveda's evening Dinacharya prepares the mind and body for restorative sleep. Avoid screens 1 hour before bed — the blue light suppresses melatonin and aggravates Vata. Apply <strong>Ashwagandha oil</strong> (or any warm oil) to the soles of feet to calm the nervous system. Drink warm milk with Ashwagandha, a pinch of nutmeg, and honey to promote deep sleep. Practice <strong>Trataka</strong> (candle gazing meditation) for 5 minutes or simple pranayama to calm the mind before sleep.</p>`,
    category: "lifestyle",
    coverImageUrl: "/assets/generated/blog-lifestyle.dim_800x500.jpg",
    status: "published",
    publishedAt: d(2025, 2, 18),
    authorName: "AyurGlow Team",
    tags: [
      "dinacharya",
      "daily routine",
      "morning ritual",
      "yoga",
      "ayurvedic lifestyle",
    ],
  },
  {
    title: "Best Ayurvedic Oils for Hair Growth and Thickness",
    slug: "best-ayurvedic-oils-for-hair-growth-and-thickness",
    excerpt:
      "Discover the most potent Ayurvedic hair oils that have been used for centuries to promote thick, lustrous hair growth and prevent premature baldness.",
    content: `<h2>The Ancient Science of Hair Oiling</h2>
<p>Shiro Abhyanga (head oil massage) has been practiced in India for thousands of years, and its benefits are now being validated by modern trichology. Warm oil applied to the scalp improves blood circulation to hair follicles, delivering essential nutrients and oxygen while removing metabolic waste products. The lipids in natural oils penetrate the hair shaft, reducing protein loss and improving tensile strength. Ayurvedic hair oils are not merely oils — they are meticulously formulated herbal preparations where herbs are infused into carrier oils through a specific heating process called <strong>Taila Paka</strong>.</p>

<h2>Bhringraj Oil – The King of Hair Oils</h2>
<p><strong>Bhringraj (Eclipta alba)</strong> translates literally to "king of hair" and has been used exclusively for hair care in Ayurveda for millennia. Bhringraj oil reduces Pitta in the scalp (the primary cause of hair fall and premature graying), nourishes hair follicles with its iron and methanol-based compounds, and has been shown in studies to be more effective than minoxidil for promoting hair growth in animal models. Massage 2-3 tablespoons of warm Bhringraj oil into the scalp and hair, leave for at least 2 hours (or overnight for deep conditioning), and wash with mild shampoo. Use twice weekly.</p>

<h2>Brahmi Oil for Scalp Nourishment</h2>
<p><strong>Brahmi oil</strong> made from Bacopa monnieri is the premier oil for scalp health and stress-related hair fall. Its active compounds — bacosides — have been shown to strengthen hair roots and improve scalp circulation. Brahmi oil also has a deeply cooling effect that reduces scalp heat (Pitta) and inflammation, creating an optimal environment for hair growth. It is particularly effective for those who experience hair fall accompanied by headaches, stress, or anxiety. Apply warm Brahmi oil, massage for 15 minutes focusing on the crown and temples, and leave for 2-4 hours.</p>

<h2>Castor Oil for Thickness</h2>
<p><strong>Castor oil (Eranda Taila)</strong> is Ayurveda's secret weapon for hair thickness. Its primary component, ricinoleic acid, has exceptional ability to penetrate the hair shaft and scalp, stimulating prostaglandin E2 receptors that promote hair growth. Castor oil is significantly thicker than other oils, which is why it is best mixed with lighter oils: combine 1 part castor oil with 3 parts coconut or sesame oil. Apply specifically to areas of thinning and massage vigorously. Leave for minimum 4 hours. The combination of castor and coconut oil is considered the most effective DIY treatment for hair thickening in Ayurveda.</p>

<h2>Coconut Oil – The Universal Hair Conditioner</h2>
<p><strong>Coconut oil (Narikela Taila)</strong> has a unique molecular structure (high in medium-chain triglycerides, particularly lauric acid) that allows it to penetrate deep into the hair cortex — something most other oils cannot do. This penetration capability means coconut oil can prevent protein loss from the hair shaft, which is the primary cause of hair breakage and thinning. Use virgin, cold-pressed coconut oil for hair — refined coconut oil lacks many of the beneficial compounds. Apply as a pre-wash treatment for at least 30 minutes before shampooing.</p>

<h2>Weekly Hair Oil Protocol</h2>
<p>For optimal results, follow this weekly schedule: Monday — Bhringraj oil for hair fall prevention. Thursday — Coconut and castor oil blend for thickness. Weekend — Brahmi oil deep conditioning treatment (leave overnight). Always warm the oil before application (never overheated — test on wrist first). For maximum absorption, apply oils in the evening and wash the next morning. Within 4-6 weeks of this protocol, you'll notice significantly reduced hair fall, increased thickness, and improved shine.</p>`,
    category: "hair-care",
    coverImageUrl: "/assets/generated/blog-haircare.dim_800x500.jpg",
    status: "published",
    publishedAt: d(2025, 2, 22),
    authorName: "AyurGlow Team",
    tags: [
      "hair oils",
      "bhringraj oil",
      "castor oil",
      "brahmi oil",
      "hair thickness",
    ],
  },
];

export function seedDatabase(): void {
  if (isSeeded()) return;

  const now = new Date().toISOString();
  const posts: BlogPost[] = seedPosts.map((p) => ({
    ...p,
    id: makeId(),
    createdAt: p.publishedAt ?? now,
    updatedAt: p.publishedAt ?? now,
    inlineImages: [],
  }));

  savePosts(posts);
  markSeeded();
}
