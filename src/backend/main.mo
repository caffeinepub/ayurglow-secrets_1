import Text "mo:core/Text";
import Time "mo:core/Time";
import Mixin "blob-storage/Mixin";

persistent actor {
  include Mixin();

  public type Post = {
    id : Nat;
    title : Text;
    slug : Text;
    excerpt : Text;
    content : Text;
    category : Text;
    coverImageUrl : Text;
    author : Text;
    publishedAt : Int;
    createdAt : Int;
    isPublished : Bool;
    tags : [Text];
  };

  public type Comment = {
    id : Nat;
    postId : Nat;
    authorName : Text;
    content : Text;
    createdAt : Int;
  };

  var posts : [Post] = [];
  var comments : [Comment] = [];
  var nextPostId : Nat = 1;
  var nextCommentId : Nat = 1;
  var seeded : Bool = false;

  public query func getCategories() : async [Text] {
    ["Health", "Skin Care", "Hair Care", "Weight Management", "Lifestyle"]
  };

  public query func getPublishedPosts() : async [Post] {
    posts.filter(func(p : Post) : Bool { p.isPublished })
  };

  public query func getAllPosts() : async [Post] {
    posts
  };

  public query func getPostById(id : Nat) : async ?Post {
    posts.find(func(p : Post) : Bool { p.id == id })
  };

  public query func getPostBySlug(slug : Text) : async ?Post {
    posts.find(func(p : Post) : Bool { p.slug == slug })
  };

  public query func getPostsByCategory(category : Text) : async [Post] {
    posts.filter(func(p : Post) : Bool { p.isPublished and p.category == category })
  };

  public func createPost(
    title : Text,
    slug : Text,
    excerpt : Text,
    content : Text,
    category : Text,
    coverImageUrl : Text,
    author : Text,
    tags : [Text],
  ) : async Post {
    let now = Time.now();
    let post : Post = {
      id = nextPostId;
      title;
      slug;
      excerpt;
      content;
      category;
      coverImageUrl;
      author;
      publishedAt = now;
      createdAt = now;
      isPublished = false;
      tags;
    };
    posts := posts.concat([post]);
    nextPostId += 1;
    post
  };

  public func updatePost(
    id : Nat,
    title : Text,
    slug : Text,
    excerpt : Text,
    content : Text,
    category : Text,
    coverImageUrl : Text,
    author : Text,
    tags : [Text],
  ) : async ?Post {
    var updated : ?Post = null;
    posts := posts.map(func(p : Post) : Post {
      if (p.id == id) {
        let u : Post = {
          id = p.id;
          title;
          slug;
          excerpt;
          content;
          category;
          coverImageUrl;
          author;
          publishedAt = p.publishedAt;
          createdAt = p.createdAt;
          isPublished = p.isPublished;
          tags;
        };
        updated := ?u;
        u
      } else { p }
    });
    updated
  };

  public func publishPost(id : Nat) : async ?Post {
    var updated : ?Post = null;
    let now = Time.now();
    posts := posts.map(func(p : Post) : Post {
      if (p.id == id) {
        let u : Post = {
          id = p.id;
          title = p.title;
          slug = p.slug;
          excerpt = p.excerpt;
          content = p.content;
          category = p.category;
          coverImageUrl = p.coverImageUrl;
          author = p.author;
          publishedAt = now;
          createdAt = p.createdAt;
          isPublished = true;
          tags = p.tags;
        };
        updated := ?u;
        u
      } else { p }
    });
    updated
  };

  public func unpublishPost(id : Nat) : async ?Post {
    var updated : ?Post = null;
    posts := posts.map(func(p : Post) : Post {
      if (p.id == id) {
        let u : Post = {
          id = p.id;
          title = p.title;
          slug = p.slug;
          excerpt = p.excerpt;
          content = p.content;
          category = p.category;
          coverImageUrl = p.coverImageUrl;
          author = p.author;
          publishedAt = p.publishedAt;
          createdAt = p.createdAt;
          isPublished = false;
          tags = p.tags;
        };
        updated := ?u;
        u
      } else { p }
    });
    updated
  };

  public func deletePost(id : Nat) : async Bool {
    let before = posts.size();
    posts := posts.filter(func(p : Post) : Bool { p.id != id });
    posts.size() < before
  };

  public func addComment(postId : Nat, authorName : Text, content : Text) : async Comment {
    let comment : Comment = {
      id = nextCommentId;
      postId;
      authorName;
      content;
      createdAt = Time.now();
    };
    comments := comments.concat([comment]);
    nextCommentId += 1;
    comment
  };

  public query func getCommentsByPostId(postId : Nat) : async [Comment] {
    comments.filter(func(c : Comment) : Bool { c.postId == postId })
  };

  public func seedData() : async () {
    if (seeded) return;
    seeded := true;
    let now = Time.now();
    let day : Int = 24 * 60 * 60 * 1_000_000_000;

    let p1 : Post = {
      id = nextPostId;
      title = "10 Ayurvedic Herbs for Boosting Immunity";
      slug = "ayurvedic-herbs-boosting-immunity";
      excerpt = "Discover powerful herbs used in Ayurveda for thousands of years to strengthen your immune system naturally.";
      content = "Ayurveda has long recognized the power of herbs in supporting the immune system.\n\n**Ashwagandha** is an adaptogenic herb that helps the body manage stress and boosts immunity.\n\n**Tulsi (Holy Basil)** has powerful antibacterial, antiviral, and antifungal properties.\n\n**Turmeric** with curcumin is a potent anti-inflammatory and antioxidant.\n\n**Giloy** is known as the root of immortality and is one of the most powerful immunomodulatory herbs.\n\n**Neem** has extraordinary immune-enhancing properties that help fight bacterial and viral infections.";
      category = "Health";
      coverImageUrl = "";
      author = "Dr. Priya Sharma";
      publishedAt = now - 7 * day;
      createdAt = now - 7 * day;
      isPublished = true;
      tags = ["immunity", "herbs", "health"];
    };

    let p2 : Post = {
      id = nextPostId + 1;
      title = "Natural Ayurvedic Face Masks for Glowing Skin";
      slug = "ayurvedic-face-masks-glowing-skin";
      excerpt = "Transform your skin with time-tested Ayurvedic face mask recipes using natural ingredients.";
      content = "Ayurveda offers a treasure trove of natural remedies for achieving radiant skin.\n\n**Turmeric and Sandalwood Mask**: Mix turmeric powder, sandalwood powder and rose water. Apply for 15 minutes. Brightens skin and reduces pigmentation.\n\n**Multani Mitti Mask**: Combine Fuller's Earth with rose water. Deep-cleansing, removes excess oil.\n\n**Honey and Besan Mask**: Mix chickpea flour with honey and milk. Exfoliates and moisturizes.\n\n**Neem and Aloe Vera Mask**: Blend neem leaves with aloe vera gel for an antibacterial mask targeting acne.";
      category = "Skin Care";
      coverImageUrl = "";
      author = "Anita Patel";
      publishedAt = now - 5 * day;
      createdAt = now - 5 * day;
      isPublished = true;
      tags = ["skin care", "face mask", "glow"];
    };

    let p3 : Post = {
      id = nextPostId + 2;
      title = "Ayurvedic Hair Oils: The Secret to Lustrous Hair";
      slug = "ayurvedic-hair-oils-lustrous-hair";
      excerpt = "Learn how traditional Ayurvedic hair oils can transform dry, damaged hair into thick, lustrous locks.";
      content = "Hair oiling is a cornerstone of Ayurvedic hair care.\n\n**Brahmi Oil** strengthens hair roots, reduces hair fall, and promotes thick healthy growth.\n\n**Bhringraj Oil** prevents premature greying, reduces hair fall, and promotes regrowth.\n\n**Amla Oil** is rich in Vitamin C and antioxidants, nourishes the scalp and conditions hair strands.\n\n**How to Use**: Warm the oil slightly, massage into scalp using circular motions. Leave for at least an hour or overnight.";
      category = "Hair Care";
      coverImageUrl = "";
      author = "Meera Krishnan";
      publishedAt = now - 4 * day;
      createdAt = now - 4 * day;
      isPublished = true;
      tags = ["hair care", "hair oil", "hair growth"];
    };

    let p4 : Post = {
      id = nextPostId + 3;
      title = "Ayurvedic Approach to Healthy Weight Management";
      slug = "ayurvedic-weight-management";
      excerpt = "Discover how Ayurveda's holistic approach to weight management focuses on balance, digestion, and lifestyle.";
      content = "Ayurveda takes a holistic, sustainable approach to weight management.\n\n**Understanding Your Dosha**: Kapha types tend to gain weight easily. Vata types may be underweight. Pitta types maintain moderate weight.\n\n**Trikatu**: Ginger, black pepper, and long pepper boost digestive fire and enhance metabolism.\n\n**Triphala**: A combination of three fruits that cleanses the digestive tract and supports gentle weight loss.\n\n**Digestive Fire (Agni)**: Eat your largest meal at lunch, avoid cold and raw foods, and eat mindfully.";
      category = "Weight Management";
      coverImageUrl = "";
      author = "Dr. Rajesh Kumar";
      publishedAt = now - 3 * day;
      createdAt = now - 3 * day;
      isPublished = true;
      tags = ["weight", "digestion", "dosha"];
    };

    let p5 : Post = {
      id = nextPostId + 4;
      title = "Morning Rituals: Ayurvedic Dinacharya for a Vibrant Life";
      slug = "ayurvedic-morning-rituals-dinacharya";
      excerpt = "Start your day right with these powerful Ayurvedic morning practices that set the tone for health.";
      content = "Dinacharya is one of Ayurveda's most powerful tools for maintaining health.\n\n**Wake Up Before Sunrise**: Around 4:30-5:30 AM is considered sattvic (pure) and supports mental clarity.\n\n**Oil Pulling**: Swish 1 tablespoon of sesame or coconut oil for 15-20 minutes to remove bacteria.\n\n**Tongue Scraping**: Remove the white coating each morning to eliminate toxins (ama).\n\n**Abhyanga (Self-Massage)**: Warm sesame oil massage before bathing nourishes skin and calms the nervous system.\n\n**Yoga and Pranayama**: Gentle yoga and breathing exercises awaken the body and set a calm tone.";
      category = "Lifestyle";
      coverImageUrl = "";
      author = "Sunita Devi";
      publishedAt = now - 2 * day;
      createdAt = now - 2 * day;
      isPublished = true;
      tags = ["lifestyle", "morning routine", "wellness"];
    };

    let p6 : Post = {
      id = nextPostId + 5;
      title = "Neem: Ayurveda's Ultimate Skin Purifier";
      slug = "neem-ayurveda-skin-purifier";
      excerpt = "Explore the extraordinary skin-healing properties of neem, one of Ayurveda's most versatile plants.";
      content = "Neem has been called the village pharmacy in India for thousands of years.\n\n**Neem for Acne**: Antibacterial properties target acne-causing bacteria while anti-inflammatory compounds reduce redness.\n\n**Neem for Eczema**: Fatty acids in neem oil restore the skin's protective barrier and soothe inflammation.\n\n**DIY Neem Face Wash**: Boil fresh neem leaves in water, strain, and use as a face wash.\n\n**Neem for Scalp**: Treats dandruff, reduces scalp inflammation, and supports better hair growth.";
      category = "Skin Care";
      coverImageUrl = "";
      author = "Anita Patel";
      publishedAt = now - 1 * day;
      createdAt = now - 1 * day;
      isPublished = true;
      tags = ["neem", "skin care", "acne"];
    };

    let p7 : Post = {
      id = nextPostId + 6;
      title = "Triphala: The Three-Fruit Wonder for Total Health";
      slug = "triphala-three-fruit-wonder";
      excerpt = "Learn about Triphala, Ayurveda's most celebrated herbal formula and its wide-ranging health benefits.";
      content = "Triphala is perhaps the most important formulation in Ayurvedic medicine.\n\n**The Three Fruits**: Amalaki is the richest natural source of Vitamin C. Bibhitaki supports respiratory health. Haritaki is considered the King of Medicines.\n\n**Benefits**: Gentle digestive cleanser, removes accumulated toxins, supports healthy elimination, powerful antioxidant properties.\n\n**How to Take**: Mix 1/4 to 1/2 teaspoon of Triphala powder with warm water before bed.";
      category = "Health";
      coverImageUrl = "";
      author = "Dr. Priya Sharma";
      publishedAt = now - 6 * day;
      createdAt = now - 6 * day;
      isPublished = true;
      tags = ["triphala", "digestion", "detox"];
    };

    let p8 : Post = {
      id = nextPostId + 7;
      title = "Coconut Oil Hair Treatments: Ayurvedic Wisdom";
      slug = "coconut-oil-hair-treatments";
      excerpt = "Explore how coconut oil, a staple of Ayurvedic hair care, can address common hair problems naturally.";
      content = "Coconut oil has been used in Ayurvedic hair care for millennia.\n\n**Why It Works**: Unlike many other oils, coconut oil can penetrate the hair shaft to nourish hair from within.\n\n**Pre-Wash Treatment**: Apply warm coconut oil 30 minutes to overnight before shampooing to prevent protein loss.\n\n**Scalp Massage**: Regular massage increases blood circulation to hair follicles. Mix with Brahmi or Bhringraj for enhanced growth.\n\n**Deep Conditioning**: For dry or chemically treated hair, apply generously, cover with a warm towel, leave for 1-2 hours.";
      category = "Hair Care";
      coverImageUrl = "";
      author = "Meera Krishnan";
      publishedAt = now - 8 * day;
      createdAt = now - 8 * day;
      isPublished = true;
      tags = ["coconut oil", "hair care", "natural"];
    };

    posts := posts.concat([p1, p2, p3, p4, p5, p6, p7, p8]);
    nextPostId := nextPostId + 8;
  };
}
