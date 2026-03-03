export interface Remedy {
  title: string;
  description?: string;
  ingredients: string[];
  application: string[];
  benefits: string;
  frequency: string;
}

export interface TipSection {
  title: string;
  description: string;
}

export interface SubcategoryContent {
  intro?: string;
  warning?: string;
  remedies: Remedy[];
  tips?: TipSection[];
}

export type RemediesData = Record<string, Record<string, SubcategoryContent>>;

const remediesData: RemediesData = {
  "health-remedies": {
    immunity: {
      intro:
        "Strengthen your body's natural defense system with these powerful Ayurvedic immunity boosters.",
      remedies: [
        {
          title: "Turmeric Golden Milk",
          ingredients: [
            "1 cup warm milk",
            "1 tsp turmeric powder",
            "1/2 tsp cinnamon",
            "Pinch of black pepper",
            "1 tsp honey",
          ],
          application: [
            "Heat milk until warm (not boiling)",
            "Add turmeric, cinnamon, and black pepper",
            "Stir well and let steep for 2 minutes",
            "Add honey before drinking",
          ],
          benefits:
            "Powerful anti-inflammatory and immune-boosting properties. Curcumin in turmeric enhances antibody responses.",
          frequency: "Daily before bedtime",
        },
        {
          title: "Tulsi-Ginger Tea",
          ingredients: [
            "10-12 fresh tulsi leaves",
            "1-inch ginger root",
            "2 cups water",
            "1 tsp honey",
            "Few drops lemon juice",
          ],
          application: [
            "Crush tulsi leaves and grate ginger",
            "Boil water and add tulsi and ginger",
            "Simmer for 5-7 minutes",
            "Strain, add honey and lemon",
          ],
          benefits:
            "Tulsi is an adaptogen that strengthens immunity. Ginger adds antimicrobial properties.",
          frequency: "Twice daily, morning and evening",
        },
        {
          title: "Chyawanprash Tonic",
          ingredients: ["1 tbsp Chyawanprash", "1 cup warm milk or water"],
          application: [
            "Take 1 tablespoon of Chyawanprash",
            "Mix with warm milk or water",
            "Consume on empty stomach",
          ],
          benefits:
            "Traditional Ayurvedic formula with 40+ herbs. Boosts immunity, energy, and vitality.",
          frequency: "Once daily in the morning",
        },
        {
          title: "Amla-Honey Immunity Shot",
          ingredients: [
            "2 fresh amla (Indian gooseberry)",
            "1 tsp honey",
            "Pinch of rock salt",
          ],
          application: [
            "Extract juice from fresh amla",
            "Mix with honey and rock salt",
            "Consume immediately",
          ],
          benefits:
            "Amla is richest source of Vitamin C. Enhances white blood cell production and antioxidant defense.",
          frequency: "Daily on empty stomach",
        },
      ],
    },
    digestion: {
      intro:
        "Restore your digestive fire and balance with these time-tested Ayurvedic remedies.",
      remedies: [
        {
          title: "Triphala Powder",
          ingredients: [
            "1 tsp Triphala powder",
            "1 cup warm water",
            "Optional: 1/2 tsp honey",
          ],
          application: [
            "Mix Triphala powder in warm water",
            "Stir well until dissolved",
            "Add honey if desired",
            "Drink on empty stomach",
          ],
          benefits:
            "Balances all three doshas, improves digestion, and gently cleanses the digestive tract.",
          frequency: "Once daily before bedtime or early morning",
        },
        {
          title: "Ginger-Lemon Digestive Tonic",
          ingredients: [
            "1-inch fresh ginger",
            "1/2 lemon juice",
            "1 tsp honey",
            "Pinch of rock salt",
            "1 cup warm water",
          ],
          application: [
            "Grate ginger and extract juice",
            "Mix ginger juice with lemon juice",
            "Add honey and rock salt",
            "Mix in warm water and drink",
          ],
          benefits:
            "Stimulates digestive fire (Agni), reduces bloating, and improves nutrient absorption.",
          frequency: "Before meals, 2-3 times daily",
        },
        {
          title: "Cumin-Coriander-Fennel Tea (CCF Tea)",
          ingredients: [
            "1 tsp cumin seeds",
            "1 tsp coriander seeds",
            "1 tsp fennel seeds",
            "3 cups water",
          ],
          application: [
            "Boil water in a pot",
            "Add all three seeds",
            "Simmer for 5-10 minutes",
            "Strain and sip throughout the day",
          ],
          benefits:
            "Balances digestive fire, reduces gas and bloating, supports healthy metabolism.",
          frequency: "Sip throughout the day between meals",
        },
        {
          title: "Ajwain Water",
          ingredients: ["1 tsp ajwain (carom seeds)", "1 cup water"],
          application: [
            "Boil water with ajwain seeds",
            "Simmer for 3-5 minutes",
            "Strain and drink warm",
          ],
          benefits:
            "Relieves indigestion, gas, and acidity. Powerful carminative properties.",
          frequency:
            "After heavy meals or when experiencing digestive discomfort",
        },
      ],
    },
    "weight-management": {
      intro:
        "Achieve healthy weight balance naturally with these Ayurvedic metabolism-boosting remedies.",
      remedies: [
        {
          title: "Warm Lemon-Honey Water",
          ingredients: [
            "1 cup warm water",
            "1/2 lemon juice",
            "1 tsp raw honey",
            "Pinch of cinnamon powder",
          ],
          application: [
            "Heat water until warm (not boiling)",
            "Squeeze fresh lemon juice",
            "Add honey and cinnamon",
            "Stir well and drink immediately",
          ],
          benefits:
            "Boosts metabolism, aids fat burning, and detoxifies the body naturally.",
          frequency: "Every morning on empty stomach",
        },
        {
          title: "Triphala-Guggul Formula",
          ingredients: [
            "1 tsp Triphala powder",
            "500mg Guggul extract",
            "1 cup warm water",
          ],
          application: [
            "Mix Triphala powder in warm water",
            "Take Guggul tablet with the mixture",
            "Consume before bedtime",
          ],
          benefits:
            "Supports healthy metabolism, reduces cholesterol, and promotes fat metabolism.",
          frequency: "Once daily before sleep",
        },
        {
          title: "Ginger-Green Tea Metabolism Booster",
          ingredients: [
            "1 green tea bag",
            "1-inch fresh ginger",
            "1 cup hot water",
            "Few mint leaves",
            "1/2 tsp honey",
          ],
          application: [
            "Grate ginger and add to hot water",
            "Add green tea bag and mint leaves",
            "Steep for 5 minutes",
            "Strain, add honey, and drink",
          ],
          benefits:
            "Increases thermogenesis, burns calories, and reduces appetite naturally.",
          frequency: "2-3 times daily between meals",
        },
        {
          title: "Cabbage-Carrot Detox Juice",
          ingredients: [
            "1 cup chopped cabbage",
            "1 medium carrot",
            "1/2 cucumber",
            "1/2 lemon juice",
            "Pinch of black salt",
          ],
          application: [
            "Blend all vegetables with little water",
            "Strain if desired",
            "Add lemon juice and black salt",
            "Drink fresh immediately",
          ],
          benefits:
            "Low in calories, high in fiber. Promotes satiety and supports healthy weight loss.",
          frequency: "Once daily as meal replacement or before meals",
        },
      ],
    },
    "diabetes-bp": {
      intro:
        "Support healthy blood sugar and blood pressure levels with these natural Ayurvedic remedies.",
      warning:
        "These remedies are complementary to medical treatment. Always consult your healthcare provider before making changes to your diabetes or blood pressure management plan.",
      remedies: [
        {
          title: "Fenugreek Seed Water",
          ingredients: ["1 tbsp fenugreek seeds", "1 cup water"],
          application: [
            "Soak fenugreek seeds in water overnight",
            "Drink the water on empty stomach",
            "Chew the soaked seeds if desired",
          ],
          benefits:
            "Helps regulate blood sugar levels and improves insulin sensitivity naturally.",
          frequency: "Daily in the morning on empty stomach",
        },
        {
          title: "Bitter Gourd Juice",
          ingredients: [
            "1 small bitter gourd",
            "1/2 cup water",
            "Pinch of rock salt",
            "Few drops lemon juice",
          ],
          application: [
            "Wash and chop bitter gourd",
            "Blend with water",
            "Strain and add salt and lemon",
            "Drink fresh immediately",
          ],
          benefits:
            "Contains insulin-like compounds that help lower blood glucose levels effectively.",
          frequency: "Once daily in the morning",
        },
        {
          title: "Cinnamon-Honey Tonic",
          ingredients: [
            "1 tsp cinnamon powder",
            "1 tsp honey",
            "1 cup warm water",
          ],
          application: [
            "Mix cinnamon powder in warm water",
            "Let it steep for 10 minutes",
            "Add honey and stir well",
            "Drink before meals",
          ],
          benefits:
            "Improves insulin sensitivity and helps maintain healthy blood sugar levels.",
          frequency: "Twice daily before main meals",
        },
        {
          title: "Garlic-Lemon BP Control",
          ingredients: [
            "2-3 garlic cloves",
            "1/2 lemon juice",
            "1 cup warm water",
          ],
          application: [
            "Crush garlic cloves",
            "Mix with lemon juice",
            "Add to warm water",
            "Drink on empty stomach",
          ],
          benefits:
            "Helps lower blood pressure naturally and supports cardiovascular health.",
          frequency: "Daily in the morning",
        },
      ],
    },
    "stress-sleep": {
      intro:
        "Find calm and restful sleep with these soothing Ayurvedic remedies for stress management.",
      remedies: [
        {
          title: "Ashwagandha Moon Milk",
          ingredients: [
            "1 cup warm milk",
            "1 tsp ashwagandha powder",
            "1/4 tsp nutmeg powder",
            "1 tsp honey",
            "Pinch of cardamom",
          ],
          application: [
            "Warm milk gently (do not boil)",
            "Add ashwagandha and nutmeg",
            "Stir well and let steep for 2 minutes",
            "Add honey and cardamom before drinking",
          ],
          benefits:
            "Ashwagandha is a powerful adaptogen that reduces cortisol, calms the mind, and promotes deep sleep.",
          frequency: "Daily 30 minutes before bedtime",
        },
        {
          title: "Brahmi-Tulsi Stress Relief Tea",
          ingredients: [
            "1 tsp dried brahmi leaves",
            "8-10 fresh tulsi leaves",
            "2 cups water",
            "1 tsp honey",
            "Few drops lemon",
          ],
          application: [
            "Boil water with brahmi and tulsi",
            "Simmer for 5-7 minutes",
            "Strain into a cup",
            "Add honey and lemon",
          ],
          benefits:
            "Brahmi enhances cognitive function and reduces anxiety. Tulsi balances stress hormones.",
          frequency: "Twice daily, morning and evening",
        },
        {
          title: "Chamomile-Lavender Sleep Blend",
          ingredients: [
            "1 chamomile tea bag",
            "1 tsp dried lavender flowers",
            "1 cup hot water",
            "1 tsp honey",
          ],
          application: [
            "Steep chamomile and lavender in hot water",
            "Cover and let infuse for 10 minutes",
            "Strain and add honey",
            "Sip slowly before bed",
          ],
          benefits:
            "Chamomile and lavender have natural sedative properties that promote relaxation and restful sleep.",
          frequency: "Every night 30-60 minutes before sleep",
        },
        {
          title: "Warm Almond-Saffron Milk",
          ingredients: [
            "10 soaked almonds",
            "1 cup warm milk",
            "2-3 saffron strands",
            "1/4 tsp cardamom powder",
            "1 tsp honey",
          ],
          application: [
            "Blend soaked almonds with little milk",
            "Heat remaining milk with saffron",
            "Mix almond paste into warm milk",
            "Add cardamom and honey",
          ],
          benefits:
            "Almonds contain magnesium for relaxation. Saffron elevates mood and promotes quality sleep.",
          frequency: "Daily before bedtime",
        },
      ],
    },
  },
  "skin-care": {
    "natural-glow": {
      intro:
        "Achieve radiant, glowing skin naturally with these Ayurvedic beauty treatments.",
      remedies: [
        {
          title: "Turmeric-Yogurt Glow Mask",
          ingredients: [
            "1 tsp turmeric powder",
            "2 tbsp plain yogurt",
            "1 tsp honey",
            "Few drops lemon juice",
          ],
          application: [
            "Mix all ingredients into a smooth paste",
            "Apply evenly on cleansed face",
            "Leave on for 15-20 minutes",
            "Rinse with lukewarm water",
          ],
          benefits:
            "Turmeric brightens skin, yogurt exfoliates gently, and honey moisturizes for a natural glow.",
          frequency: "2-3 times per week",
        },
        {
          title: "Saffron-Milk Radiance Treatment",
          ingredients: [
            "4-5 saffron strands",
            "2 tbsp raw milk",
            "1 tsp sandalwood powder",
          ],
          application: [
            "Soak saffron in milk for 30 minutes",
            "Add sandalwood powder and mix",
            "Apply on face and neck",
            "Wash off after 20 minutes",
          ],
          benefits:
            "Saffron enhances complexion, milk nourishes, and sandalwood provides cooling effect.",
          frequency: "Twice weekly for best results",
        },
        {
          title: "Aloe Vera-Rose Water Toner",
          ingredients: [
            "2 tbsp fresh aloe vera gel",
            "2 tbsp rose water",
            "Few drops vitamin E oil",
          ],
          application: [
            "Mix aloe vera gel with rose water",
            "Add vitamin E oil",
            "Apply with cotton pad after cleansing",
            "Let it absorb naturally",
          ],
          benefits:
            "Hydrates deeply, balances pH, and gives instant glow while soothing the skin.",
          frequency: "Daily, morning and evening",
        },
        {
          title: "Papaya-Honey Enzyme Mask",
          ingredients: [
            "1/4 cup mashed ripe papaya",
            "1 tbsp honey",
            "1 tsp lemon juice",
          ],
          application: [
            "Mash papaya into smooth pulp",
            "Mix with honey and lemon juice",
            "Apply on face avoiding eyes",
            "Rinse after 15 minutes",
          ],
          benefits:
            "Papaya enzymes exfoliate dead cells, revealing brighter, smoother, glowing skin.",
          frequency: "Once weekly",
        },
      ],
    },
    "acne-pimples": {
      intro:
        "Clear acne naturally with these powerful Ayurvedic antibacterial and anti-inflammatory treatments.",
      remedies: [
        {
          title: "Neem-Turmeric Acne Paste",
          ingredients: [
            "10-12 fresh neem leaves",
            "1 tsp turmeric powder",
            "2 tbsp rose water",
          ],
          application: [
            "Grind neem leaves into paste",
            "Mix with turmeric and rose water",
            "Apply on affected areas",
            "Wash off after 15 minutes",
          ],
          benefits:
            "Neem has powerful antibacterial properties. Turmeric reduces inflammation and prevents scarring.",
          frequency: "Daily or every other day",
        },
        {
          title: "Tea Tree-Aloe Spot Treatment",
          ingredients: [
            "2 tbsp fresh aloe vera gel",
            "3-4 drops tea tree essential oil",
            "1 tsp honey",
          ],
          application: [
            "Mix aloe vera gel with tea tree oil",
            "Add honey and blend well",
            "Apply directly on pimples",
            "Leave overnight or for 2 hours",
          ],
          benefits:
            "Tea tree oil kills acne-causing bacteria. Aloe soothes and heals without drying.",
          frequency: "Daily on active breakouts",
        },
        {
          title: "Sandalwood-Rosewater Face Pack",
          ingredients: [
            "2 tbsp sandalwood powder",
            "3 tbsp rose water",
            "1 tsp multani mitti (Fuller's earth)",
          ],
          application: [
            "Mix sandalwood and multani mitti",
            "Add rose water to make paste",
            "Apply evenly on face",
            "Rinse when completely dry",
          ],
          benefits:
            "Sandalwood cools and heals. Multani mitti absorbs excess oil and unclogs pores.",
          frequency: "2-3 times per week",
        },
        {
          title: "Cinnamon-Honey Antibacterial Mask",
          ingredients: ["1 tsp cinnamon powder", "2 tbsp raw honey"],
          application: [
            "Mix cinnamon and honey thoroughly",
            "Apply on cleansed face",
            "Leave for 10-15 minutes",
            "Rinse with warm water",
          ],
          benefits:
            "Cinnamon has antimicrobial properties. Honey moisturizes while fighting bacteria.",
          frequency: "2-3 times weekly",
        },
      ],
    },
    pigmentation: {
      intro:
        "Fade dark spots and even out skin tone with these natural Ayurvedic brightening treatments.",
      warning:
        "Sun Protection: Always use sunscreen during the day when using these remedies, as some ingredients can increase sun sensitivity.",
      remedies: [
        {
          title: "Lemon-Honey Brightening Mask",
          ingredients: [
            "1 tbsp fresh lemon juice",
            "2 tbsp honey",
            "1 tsp yogurt",
          ],
          application: [
            "Mix lemon juice with honey and yogurt",
            "Apply on pigmented areas",
            "Leave for 15-20 minutes",
            "Rinse with cool water",
          ],
          benefits:
            "Lemon's vitamin C lightens dark spots. Honey moisturizes while yogurt gently exfoliates.",
          frequency: "3 times per week (evening only)",
        },
        {
          title: "Potato-Cucumber Depigmentation Pack",
          ingredients: [
            "1/4 potato juice",
            "1/4 cucumber juice",
            "1 tbsp aloe vera gel",
          ],
          application: [
            "Extract fresh potato and cucumber juice",
            "Mix with aloe vera gel",
            "Apply on affected areas",
            "Wash off after 20 minutes",
          ],
          benefits:
            "Potato contains natural bleaching agents. Cucumber soothes and hydrates.",
          frequency: "Daily for visible results",
        },
        {
          title: "Saffron-Milk Complexion Enhancer",
          ingredients: [
            "5-6 saffron strands",
            "3 tbsp raw milk",
            "1 tsp gram flour (besan)",
          ],
          application: [
            "Soak saffron in milk for 1 hour",
            "Add gram flour to make paste",
            "Apply evenly on face",
            "Rinse when dry",
          ],
          benefits:
            "Saffron lightens pigmentation and evens skin tone naturally over time.",
          frequency: "3-4 times per week",
        },
        {
          title: "Orange Peel-Yogurt Vitamin C Mask",
          ingredients: [
            "2 tbsp dried orange peel powder",
            "2 tbsp plain yogurt",
            "1 tsp honey",
          ],
          application: [
            "Mix orange peel powder with yogurt",
            "Add honey and blend well",
            "Apply on pigmented areas",
            "Wash off after 15 minutes",
          ],
          benefits:
            "Orange peel is rich in vitamin C that fades dark spots and brightens complexion.",
          frequency: "2-3 times weekly",
        },
      ],
    },
    "anti-aging": {
      intro:
        "Turn back time naturally with these Ayurvedic anti-aging treatments that nourish and rejuvenate.",
      remedies: [
        {
          title: "Almond-Saffron Youth Serum",
          ingredients: [
            "10 soaked almonds",
            "4-5 saffron strands",
            "2 tbsp milk",
            "1 tsp honey",
            "Few drops vitamin E oil",
          ],
          application: [
            "Blend soaked almonds with milk",
            "Add saffron soaked in warm milk",
            "Mix in honey and vitamin E",
            "Apply and massage gently for 5 minutes",
            "Leave for 20 minutes, then rinse",
          ],
          benefits:
            "Almonds nourish deeply, saffron brightens, and vitamin E fights free radicals for youthful skin.",
          frequency: "3 times per week",
        },
        {
          title: "Avocado-Honey Collagen Boost Mask",
          ingredients: [
            "1/2 ripe avocado",
            "1 tbsp honey",
            "1 tsp olive oil",
            "Few drops lemon juice",
          ],
          application: [
            "Mash avocado into smooth paste",
            "Mix with honey and olive oil",
            "Add lemon juice",
            "Apply thick layer on face and neck",
            "Rinse after 20-25 minutes",
          ],
          benefits:
            "Avocado's healthy fats plump skin, honey hydrates, and antioxidants reduce fine lines.",
          frequency: "Twice weekly",
        },
        {
          title: "Rose Water-Glycerin Hydration Tonic",
          ingredients: [
            "3 tbsp rose water",
            "1 tbsp vegetable glycerin",
            "Few drops frankincense oil",
          ],
          application: [
            "Mix rose water with glycerin",
            "Add frankincense oil",
            "Store in spray bottle",
            "Spritz on face morning and night",
          ],
          benefits:
            "Deeply hydrates, plumps skin, and reduces appearance of wrinkles with regular use.",
          frequency: "Daily, morning and evening",
        },
        {
          title: "Papaya-Yogurt Enzyme Renewal Mask",
          ingredients: [
            "1/4 cup mashed papaya",
            "2 tbsp yogurt",
            "1 tsp honey",
            "1 tsp aloe vera gel",
          ],
          application: [
            "Blend papaya into smooth pulp",
            "Mix with yogurt, honey, and aloe",
            "Apply evenly avoiding eye area",
            "Leave for 15-20 minutes",
            "Rinse with lukewarm water",
          ],
          benefits:
            "Papaya enzymes exfoliate dead cells, revealing fresher, younger-looking skin.",
          frequency: "Once weekly",
        },
      ],
    },
    "face-packs": {
      intro:
        "Create spa-quality face packs at home with these simple, natural Ayurvedic recipes for every skin type.",
      remedies: [
        {
          title: "Multani Mitti Deep Cleanse Pack",
          description: "Best for: Oily & Combination",
          ingredients: [
            "2 tbsp multani mitti (Fuller's earth)",
            "1 tbsp rose water",
            "1 tsp lemon juice",
            "1 tsp honey",
          ],
          application: [
            "Mix multani mitti with rose water",
            "Add lemon juice and honey",
            "Apply evenly on face",
            "Let dry completely (15-20 min)",
            "Rinse with lukewarm water",
          ],
          benefits:
            "Absorbs excess oil, unclogs pores, removes impurities, and tightens skin naturally.",
          frequency: "Twice weekly",
        },
        {
          title: "Besan-Turmeric Brightening Pack",
          description: "Best for: All Skin Types",
          ingredients: [
            "2 tbsp gram flour (besan)",
            "1/2 tsp turmeric",
            "2 tbsp milk or yogurt",
            "1 tsp honey",
          ],
          application: [
            "Mix besan with turmeric",
            "Add milk/yogurt to make paste",
            "Mix in honey",
            "Apply and leave for 15 minutes",
            "Scrub gently while rinsing",
          ],
          benefits:
            "Brightens complexion, removes tan, exfoliates dead skin, and gives instant glow.",
          frequency: "2-3 times per week",
        },
        {
          title: "Oatmeal-Honey Soothing Pack",
          description: "Best for: Sensitive & Dry",
          ingredients: [
            "2 tbsp ground oatmeal",
            "1 tbsp honey",
            "1 tbsp yogurt",
            "Few drops almond oil",
          ],
          application: [
            "Grind oatmeal into fine powder",
            "Mix with honey and yogurt",
            "Add almond oil",
            "Apply gently on face",
            "Rinse after 15-20 minutes",
          ],
          benefits:
            "Soothes irritation, deeply moisturizes, reduces redness, and calms sensitive skin.",
          frequency: "2-3 times weekly",
        },
        {
          title: "Sandalwood-Rose Cooling Pack",
          description: "Best for: All Skin Types",
          ingredients: [
            "2 tbsp sandalwood powder",
            "3 tbsp rose water",
            "1 tsp honey",
            "Pinch of turmeric",
          ],
          application: [
            "Mix sandalwood with rose water",
            "Add honey and turmeric",
            "Apply evenly on face and neck",
            "Leave until completely dry",
            "Rinse with cool water",
          ],
          benefits:
            "Cools and soothes skin, reduces inflammation, evens tone, and provides natural glow.",
          frequency: "2-3 times per week",
        },
        {
          title: "Banana-Honey Nourishing Pack",
          description: "Best for: Dry & Mature",
          ingredients: [
            "1/2 ripe banana",
            "1 tbsp honey",
            "1 tsp olive oil",
            "Few drops lemon juice",
          ],
          application: [
            "Mash banana into smooth paste",
            "Mix with honey and olive oil",
            "Add lemon juice",
            "Apply thick layer",
            "Wash off after 20 minutes",
          ],
          benefits:
            "Deeply nourishes, hydrates dry skin, reduces fine lines, and restores elasticity.",
          frequency: "Twice weekly",
        },
      ],
    },
  },
  "hair-care": {
    "hair-fall": {
      intro: "Stop hair loss naturally with powerful Ayurvedic herbs and oils.",
      remedies: [
        {
          title: "Onion Juice Hair Treatment",
          ingredients: [
            "2 medium onions",
            "1 tbsp coconut oil",
            "1 tsp honey",
            "Few drops of essential oil (optional)",
          ],
          application: [
            "Peel and chop onions",
            "Blend and extract juice",
            "Mix with coconut oil and honey",
            "Apply on scalp and massage",
            "Leave for 30-45 minutes",
            "Wash with mild herbal shampoo",
          ],
          benefits:
            "Stimulates hair follicles, rich in sulfur, promotes hair regrowth, and strengthens hair roots.",
          frequency: "Apply 2-3 times per week",
        },
        {
          title: "Fenugreek Seeds Hair Mask",
          ingredients: [
            "3 tbsp fenugreek seeds",
            "1/2 cup water",
            "1 tbsp coconut oil",
            "1 tbsp yogurt",
          ],
          application: [
            "Soak fenugreek seeds overnight",
            "Grind into smooth paste",
            "Mix with coconut oil and yogurt",
            "Apply on scalp and hair",
            "Leave for 30 minutes",
            "Rinse thoroughly with water",
          ],
          benefits:
            "Reduces hair fall, strengthens hair shaft, adds shine, and prevents dandruff.",
          frequency: "Use twice weekly",
        },
        {
          title: "Amla-Shikakai Hair Pack",
          ingredients: [
            "2 tbsp amla powder",
            "2 tbsp shikakai powder",
            "1 tbsp bhringraj powder",
            "1 cup water",
            "1 tbsp coconut oil",
          ],
          application: [
            "Mix all powders together",
            "Add water to make paste",
            "Add coconut oil",
            "Apply on scalp and hair",
            "Leave for 45 minutes",
            "Wash with lukewarm water",
          ],
          benefits:
            "Traditional hair fall remedy, nourishes scalp, strengthens roots, promotes healthy growth.",
          frequency: "Apply 2 times per week",
        },
        {
          title: "Curry Leaves-Coconut Oil Treatment",
          ingredients: [
            "1 cup fresh curry leaves",
            "1/2 cup coconut oil",
            "1 tsp fenugreek seeds",
          ],
          application: [
            "Heat coconut oil in a pan",
            "Add curry leaves and fenugreek",
            "Heat until leaves turn black",
            "Cool and strain the oil",
            "Massage into scalp",
            "Leave overnight, wash in morning",
          ],
          benefits:
            "Prevents premature hair fall, darkens hair, nourishes follicles, improves hair texture.",
          frequency: "Use 2-3 times weekly",
        },
      ],
      tips: [
        {
          title: "Gentle Care",
          description: "Avoid harsh chemicals and heat styling tools",
        },
        {
          title: "Protein Diet",
          description: "Eat protein-rich foods like lentils, nuts, and eggs",
        },
        {
          title: "Scalp Massage",
          description: "Regular oil massage improves blood circulation",
        },
      ],
    },
    "hair-growth": {
      intro:
        "Stimulate healthy hair growth with traditional Ayurvedic treatments.",
      remedies: [
        {
          title: "Castor Oil-Coconut Oil Blend",
          ingredients: [
            "2 tbsp castor oil",
            "2 tbsp coconut oil",
            "1 tsp vitamin E oil",
            "Few drops of rosemary oil",
          ],
          application: [
            "Mix all oils in a bowl",
            "Warm slightly for better absorption",
            "Part hair into sections",
            "Apply oil on scalp and massage",
            "Leave overnight or minimum 2 hours",
            "Wash with mild shampoo",
          ],
          benefits:
            "Stimulates hair growth, thickens hair, nourishes follicles, improves hair density.",
          frequency: "Apply 2-3 times per week",
        },
        {
          title: "Aloe Vera-Bhringraj Hair Mask",
          ingredients: [
            "3 tbsp fresh aloe vera gel",
            "2 tbsp bhringraj powder",
            "1 tbsp coconut oil",
            "1 tsp honey",
          ],
          application: [
            "Extract fresh aloe vera gel",
            "Mix with bhringraj powder",
            "Add coconut oil and honey",
            "Apply on scalp and hair length",
            "Massage for 5-10 minutes",
            "Leave for 30 minutes then wash",
          ],
          benefits:
            "Promotes rapid hair growth, strengthens hair roots, prevents hair loss, adds volume.",
          frequency: "Use twice weekly",
        },
        {
          title: "Egg-Yogurt Protein Treatment",
          ingredients: [
            "1 whole egg",
            "2 tbsp yogurt",
            "1 tbsp olive oil",
            "1 tsp honey",
          ],
          application: [
            "Beat egg thoroughly",
            "Mix with yogurt and olive oil",
            "Add honey and blend well",
            "Apply on damp hair",
            "Leave for 30 minutes",
            "Rinse with cool water and shampoo",
          ],
          benefits:
            "Rich in protein, promotes hair growth, adds shine and strength, repairs damaged hair.",
          frequency: "Apply once weekly",
        },
        {
          title: "Hibiscus-Curry Leaves Hair Pack",
          ingredients: [
            "10 hibiscus flowers",
            "15 curry leaves",
            "2 tbsp coconut oil",
            "1 tbsp yogurt",
          ],
          application: [
            "Grind hibiscus flowers and curry leaves",
            "Mix with coconut oil",
            "Add yogurt to make paste",
            "Apply on scalp and hair",
            "Leave for 45 minutes",
            "Wash with herbal shampoo",
          ],
          benefits:
            "Stimulates hair follicles, prevents premature greying, promotes thick growth, conditions hair.",
          frequency: "Use 2 times per week",
        },
      ],
      tips: [
        {
          title: "Balanced Diet",
          description: "Include biotin-rich foods like nuts and seeds",
        },
        {
          title: "Stay Hydrated",
          description: "Drink plenty of water for healthy hair growth",
        },
        {
          title: "Reduce Stress",
          description: "Practice yoga and meditation for better results",
        },
      ],
    },
    dandruff: {
      intro:
        "Eliminate dandruff and maintain a healthy scalp with natural solutions.",
      remedies: [
        {
          title: "Neem-Tea Tree Oil Treatment",
          ingredients: [
            "1 cup neem leaves",
            "2 cups water",
            "5 drops tea tree oil",
            "1 tbsp coconut oil",
          ],
          application: [
            "Boil neem leaves in water",
            "Let it cool and strain",
            "Add tea tree oil and coconut oil",
            "Apply on scalp after shampooing",
            "Massage gently for 5 minutes",
            "Leave for 10 minutes then rinse",
          ],
          benefits:
            "Eliminates dandruff, antifungal properties, soothes itchy scalp, prevents recurrence.",
          frequency: "Use 2-3 times per week",
        },
        {
          title: "Lemon-Yogurt Scalp Mask",
          ingredients: [
            "2 tbsp fresh lemon juice",
            "4 tbsp yogurt",
            "1 tsp honey",
            "1 tsp coconut oil",
          ],
          application: [
            "Mix lemon juice with yogurt",
            "Add honey and coconut oil",
            "Apply on scalp sections",
            "Massage gently",
            "Leave for 30 minutes",
            "Wash with mild shampoo",
          ],
          benefits:
            "Removes dandruff flakes, balances scalp pH, reduces oiliness, refreshes scalp.",
          frequency: "Apply twice weekly",
        },
        {
          title: "Fenugreek-Curd Anti-Dandruff Pack",
          ingredients: [
            "3 tbsp fenugreek seeds",
            "1/2 cup yogurt",
            "1 tsp lemon juice",
            "1 tsp apple cider vinegar",
          ],
          application: [
            "Soak fenugreek seeds overnight",
            "Grind into paste",
            "Mix with yogurt and lemon juice",
            "Add apple cider vinegar",
            "Apply on scalp",
            "Leave for 45 minutes then wash",
          ],
          benefits:
            "Treats stubborn dandruff, moisturizes scalp, reduces inflammation, prevents dryness.",
          frequency: "Use 2 times per week",
        },
        {
          title: "Aloe Vera-Coconut Oil Scalp Soother",
          ingredients: [
            "3 tbsp fresh aloe vera gel",
            "2 tbsp coconut oil",
            "1 tsp neem oil",
            "Few drops of peppermint oil",
          ],
          application: [
            "Extract fresh aloe vera gel",
            "Mix with coconut oil and neem oil",
            "Add peppermint oil",
            "Apply on scalp and massage",
            "Leave for 1 hour",
            "Wash with herbal shampoo",
          ],
          benefits:
            "Soothes irritated scalp, reduces flaking, moisturizes deeply, cooling effect.",
          frequency: "Apply 2-3 times weekly",
        },
      ],
      tips: [
        {
          title: "Regular Washing",
          description: "Wash hair 2-3 times weekly with herbal shampoo",
        },
        {
          title: "Avoid Hot Water",
          description: "Use lukewarm water to prevent scalp dryness",
        },
        {
          title: "Healthy Diet",
          description: "Reduce sugar and increase omega-3 fatty acids",
        },
      ],
    },
    "grey-hair": {
      intro: "Prevent and reverse premature greying with Ayurvedic remedies.",
      remedies: [
        {
          title: "Curry Leaves-Coconut Oil Infusion",
          ingredients: [
            "2 cups fresh curry leaves",
            "1 cup coconut oil",
            "1 tbsp fenugreek seeds",
          ],
          application: [
            "Heat coconut oil in a pan",
            "Add curry leaves and fenugreek seeds",
            "Heat until leaves turn crispy",
            "Cool and strain the oil",
            "Massage into scalp and hair",
            "Leave overnight, wash in morning",
          ],
          benefits:
            "Prevents premature greying, darkens hair naturally, nourishes hair roots, promotes melanin production.",
          frequency: "Use 3-4 times per week",
        },
        {
          title: "Amla-Henna Hair Pack",
          ingredients: [
            "3 tbsp amla powder",
            "2 tbsp henna powder",
            "1 tbsp coffee powder",
            "1 cup water",
            "1 tbsp yogurt",
          ],
          application: [
            "Mix amla, henna, and coffee powder",
            "Add water to make thick paste",
            "Let it sit for 2-3 hours",
            "Add yogurt before applying",
            "Apply on hair and scalp",
            "Leave for 2-3 hours then wash",
          ],
          benefits:
            "Natural hair darkening, covers grey hair, conditions hair, strengthens hair shaft.",
          frequency: "Apply once every 2 weeks",
        },
        {
          title: "Black Tea-Coffee Rinse",
          ingredients: [
            "2 tbsp black tea leaves",
            "2 tbsp coffee powder",
            "3 cups water",
          ],
          application: [
            "Boil water with tea and coffee",
            "Simmer for 10 minutes",
            "Let it cool completely",
            "Strain the liquid",
            "Use as final rinse after shampooing",
            "Leave in hair, do not rinse",
          ],
          benefits:
            "Darkens hair temporarily, adds shine, covers grey strands, natural and safe.",
          frequency: "Use after every hair wash",
        },
        {
          title: "Bhringraj-Brahmi Oil Treatment",
          ingredients: [
            "2 tbsp bhringraj powder",
            "2 tbsp brahmi powder",
            "1 cup coconut oil",
            "1 tsp black sesame seeds",
          ],
          application: [
            "Heat coconut oil gently",
            "Add bhringraj and brahmi powder",
            "Add crushed sesame seeds",
            "Heat for 10 minutes on low flame",
            "Cool and strain",
            "Massage into scalp, leave overnight",
          ],
          benefits:
            "Prevents premature greying, promotes hair pigmentation, nourishes deeply, traditional Ayurvedic remedy.",
          frequency: "Apply 2-3 times weekly",
        },
      ],
      tips: [
        {
          title: "Reduce Stress",
          description: "Practice meditation to prevent stress-induced greying",
        },
        {
          title: "Vitamin B12",
          description: "Include B12-rich foods like dairy and eggs",
        },
        {
          title: "Avoid Chemicals",
          description: "Use natural hair products without harsh chemicals",
        },
      ],
    },
    "ayurvedic-oils": {
      intro:
        "Nourish and strengthen hair with traditional oil blends and hair masks.",
      remedies: [
        {
          title: "Ayurvedic Hot Oil Treatment",
          ingredients: [
            "2 tbsp coconut oil",
            "1 tbsp castor oil",
            "1 tbsp almond oil",
            "5 drops rosemary oil",
            "1 tsp vitamin E oil",
          ],
          application: [
            "Mix all oils in a bowl",
            "Warm the oil mixture gently",
            "Part hair into sections",
            "Apply warm oil on scalp",
            "Massage for 10-15 minutes",
            "Leave for 1-2 hours or overnight",
            "Wash with mild shampoo",
          ],
          benefits:
            "Deep nourishment, strengthens hair, promotes growth, adds shine and softness.",
          frequency: "Use 2-3 times per week",
        },
        {
          title: "Brahmi-Amla Hair Oil",
          ingredients: [
            "1 cup coconut oil",
            "2 tbsp brahmi powder",
            "2 tbsp amla powder",
            "1 tbsp bhringraj powder",
            "10 curry leaves",
          ],
          application: [
            "Heat coconut oil on low flame",
            "Add all powders and curry leaves",
            "Simmer for 15 minutes",
            "Cool and strain",
            "Store in glass bottle",
            "Apply and massage 2-3 times weekly",
          ],
          benefits:
            "Traditional Ayurvedic formula, prevents hair fall, darkens hair, promotes thick growth.",
          frequency: "Apply 2-3 times weekly",
        },
        {
          title: "Banana-Avocado Deep Conditioning Mask",
          ingredients: [
            "1 ripe banana",
            "1/2 ripe avocado",
            "2 tbsp honey",
            "1 tbsp olive oil",
            "1 tbsp yogurt",
          ],
          application: [
            "Mash banana and avocado together",
            "Add honey and olive oil",
            "Mix in yogurt",
            "Apply on damp hair",
            "Cover with shower cap",
            "Leave for 30-45 minutes",
            "Rinse thoroughly with water",
          ],
          benefits:
            "Intense moisturization, repairs damaged hair, adds softness, natural conditioning.",
          frequency: "Use once weekly",
        },
        {
          title: "Hibiscus-Fenugreek Hair Mask",
          ingredients: [
            "10 hibiscus flowers",
            "3 tbsp fenugreek seeds",
            "2 tbsp yogurt",
            "1 tbsp coconut oil",
            "1 tsp honey",
          ],
          application: [
            "Soak fenugreek seeds overnight",
            "Grind hibiscus and fenugreek together",
            "Add yogurt, coconut oil, and honey",
            "Apply on scalp and hair",
            "Leave for 45 minutes",
            "Wash with herbal shampoo",
          ],
          benefits:
            "Stimulates hair growth, prevents hair fall, conditions deeply, adds volume.",
          frequency: "Apply twice weekly",
        },
        {
          title: "Neem-Tulsi Scalp Treatment Oil",
          ingredients: [
            "1 cup coconut oil",
            "1 cup neem leaves",
            "1 cup tulsi leaves",
            "1 tbsp fenugreek seeds",
            "5 drops tea tree oil",
          ],
          application: [
            "Heat coconut oil gently",
            "Add neem, tulsi leaves, and fenugreek",
            "Simmer for 20 minutes",
            "Cool and strain",
            "Add tea tree oil",
            "Massage into scalp before bed",
          ],
          benefits:
            "Treats scalp infections, prevents dandruff, antibacterial properties, promotes healthy scalp.",
          frequency: "Use 2-3 times per week",
        },
      ],
      tips: [
        {
          title: "Warm Oil",
          description: "Slightly warm oil penetrates better into hair shaft",
        },
        {
          title: "Massage Technique",
          description: "Use circular motions to improve blood circulation",
        },
        {
          title: "Storage",
          description: "Store homemade oils in dark glass bottles",
        },
      ],
    },
  },
};

export default remediesData;
