import collectionFloral from "@/assets/collection-floral.jpg";
import collectionWarm from "@/assets/collection-warm.jpg";
import collectionFresh from "@/assets/collection-fresh.jpg";
import collectionExclusive from "@/assets/collection-exclusive.jpg";
import productLamour from "@/assets/product-lamour.jpg";
import productRoseNoir from "@/assets/product-rosenoir.jpg";
import productLumiere from "@/assets/product-lumiere.jpg";
import productJardin from "@/assets/product-jardin.jpg";
import productIntense from "@/assets/product-intense.jpg";
import clientEmily from "@/assets/client-emily.jpg";
import clientSophia from "@/assets/client-sophia.jpg";
import clientLauren from "@/assets/client-lauren.jpg";

export type CollectionTone = "floral" | "warm" | "fresh" | "exclusive";

export interface Collection {
  id: string;
  title: [string, string];
  description: string;
  image: string;
  tone: CollectionTone;
}

export const collections: Collection[] = [
  {
    id: "floral",
    title: ["Floral", "Bouquets"],
    description: "Soft. Sweet. Romantic.",
    image: collectionFloral,
    tone: "floral",
  },
  {
    id: "warm",
    title: ["Warm &", "Sensual"],
    description: "For unforgettable evenings.",
    image: collectionWarm,
    tone: "warm",
  },
  {
    id: "fresh",
    title: ["Fresh &", "Radiant"],
    description: "Light. Clean. Effortless.",
    image: collectionFresh,
    tone: "fresh",
  },
  {
    id: "exclusive",
    title: ["Exclusive", "Collection"],
    description: "Rare scents. Refined luxury.",
    image: collectionExclusive,
    tone: "exclusive",
  },
];

export interface ProductNotePyramid {
  top: string[];
  heart: string[];
  base: string[];
}

export interface ProductSizeOption {
  label: string;
  volume: string;
  price: number;
}

export interface ProductReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  notes: string;
  price: number;
  image: string;
  collectionName?: string;
  family?: string;
  tagline?: string;
  description?: string;
  inspiration?: string;
  mood?: string;
  intensity?: string;
  concentration?: string;
  longevity?: string;
  sillage?: string;
  pyramid?: ProductNotePyramid;
  sizes?: ProductSizeOption[];
  ingredients?: string;
  reviews?: ProductReviewItem[];
}

export const products: Product[] = [
  {
    id: "lamour",
    name: "L'Amour",
    notes: "Rose & Vanilla",
    price: 120,
    image: productLamour,
    collectionName: "Floral Bouquets",
    family: "Floral Ambrée · Romantic Gourmand",
    tagline: "An everlasting whisper of tender romance and luminous devotion.",
    description:
      "An intoxicating tribute to romance, L'Amour entwines tender petals of dewy Grasse rose with decadent French bourbon vanilla and luminous golden amber. Delicate yet unforgettable, it wraps the wearer in an irresistible cocoon of modern elegance.",
    inspiration:
      "Crafted in Grasse during the May rose harvest, L'Amour evokes the serene sensation of first dawn over blooming petals, touched by warm sunbeams and whispered promises.",
    mood: "Intimate, romantic, luminous",
    intensity: "Medium-Soft",
    concentration: "Eau de Parfum (22% Extrait Concentration)",
    longevity: "10–12 Hours",
    sillage: "Radiant & Lingering",
    pyramid: {
      top: ["Damask Rose Petals", "Candied Bergamot", "Pink Peppercorn"],
      heart: ["French Bourbon Vanilla", "Centifolia Rose Absolute", "Velvet Jasmine"],
      base: ["White Musk", "Warm Golden Amber", "Cashmere Wood"],
    },
    sizes: [
      { label: "Travel Spray", volume: "30ml / 1.0 fl. oz.", price: 65 },
      { label: "Signature Bottle", volume: "100ml / 3.4 fl. oz.", price: 120 },
      { label: "Grand Flacon", volume: "150ml / 5.1 fl. oz.", price: 165 },
    ],
    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Benzyl Salicylate, Linalool, Hydroxycitronellal, Limonene, Geraniol, Citronellol, Coumarin, Farnesol, Citral. 100% Vegan & Cruelty-Free.",
    reviews: [
      {
        id: "rev-lamour-1",
        author: "Camille D.",
        location: "Paris, France",
        rating: 5,
        date: "2 weeks ago",
        title: "Pure romantic perfection",
        comment:
          "The combination of fresh rose and creamy vanilla is exquisitely balanced. It isn't overly sweet—it is aristocratic, soft, and lasts all day on my cashmere scarves.",
        verified: true,
      },
      {
        id: "rev-lamour-2",
        author: "Eleanor W.",
        location: "New York, NY",
        rating: 5,
        date: "1 month ago",
        title: "My bridal scent",
        comment:
          "I wore L'Amour for my wedding day and could not have made a better choice. Guests kept leaning in to compliment the aura. Truly a masterpiece.",
        verified: true,
      },
    ],
  },
  {
    id: "rose-noir",
    name: "Rose Noir",
    notes: "Dark Rose & Oud",
    price: 145,
    image: productRoseNoir,
    collectionName: "Warm & Sensual",
    family: "Woody Floral · Dark Oriental",
    tagline: "A nocturnal elixir of smoldering woods and velvet petals.",
    description:
      "A dramatic nocturnal elixir where velvet crimson roses bloom in the shadows of mystical smoked oud and black amber. Mysterious, decadent, and commanding, Rose Noir leaves a lingering trail that commands the room with magnetic sophistication.",
    inspiration:
      "Inspired by moonlit gardens in Marrakech and the timeless sensuality of rare Eastern oud wood, blended with the velvety darkness of Turkish midnight roses.",
    mood: "Mysterious, seductive, unforgettable",
    intensity: "Rich & Powerful",
    concentration: "Eau de Parfum (24% Extrait Concentration)",
    longevity: "12–16 Hours",
    sillage: "Bold & Enveloping",
    pyramid: {
      top: ["Blackcurrant Nectar", "Saffron Threads", "Turkish Rose Petals"],
      heart: ["Dark Damascena Rose", "Smoked Agarwood (Oud)", "Patchouli Heart"],
      base: ["Black Amber Resin", "Smoked Incense", "Atlas Cedarwood"],
    },
    sizes: [
      { label: "Travel Spray", volume: "30ml / 1.0 fl. oz.", price: 78 },
      { label: "Signature Bottle", volume: "100ml / 3.4 fl. oz.", price: 145 },
      { label: "Grand Flacon", volume: "150ml / 5.1 fl. oz.", price: 195 },
    ],
    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Alpha-Isomethyl Ionone, Eugenol, Cinnamyl Alcohol, Benzyl Benzoate, Evernia Prunastri (Oakmoss) Extract. 100% Vegan & Cruelty-Free.",
    reviews: [
      {
        id: "rev-rosenoir-1",
        author: "Amelia K.",
        location: "London, UK",
        rating: 5,
        date: "3 weeks ago",
        title: "Commands the entire room",
        comment:
          "Rose Noir has become my absolute signature. Every single time I step into an evening event, people ask me what fragrance I'm wearing. Deep, woody, and luxurious.",
        verified: true,
      },
      {
        id: "rev-rosenoir-2",
        author: "Marcus V.",
        location: "Milan, Italy",
        rating: 5,
        date: "2 months ago",
        title: "Sensual and intoxicating",
        comment:
          "The oud here is masterfully refined—not harsh at all. It harmonizes with dark rose petals in a way that feels royal and opulent.",
        verified: true,
      },
    ],
  },
  {
    id: "eau-de-lumiere",
    name: "Eau de Lumière",
    notes: "Citrus & Jasmine",
    price: 110,
    image: productLumiere,
    collectionName: "Fresh & Radiant",
    family: "Solar Citrus · Sparkling Floral",
    tagline: "Golden sunlight captured in a bottle of sparkling citrus and jasmine.",
    description:
      "Capturing the golden glow of early morning sunlight across Mediterranean citrus orchards. Eau de Lumière bursts with luminous Sicilian bergamot and honeyed royal jasmine, creating an effortless, sparkling halo of natural radiance.",
    inspiration:
      "Drawn from the sun-drenched cliffs of the Amalfi Coast, where lemon groves meet sparkling azure waters and jasmine drifts on warm sea breezes.",
    mood: "Uplifting, radiant, luminous",
    intensity: "Fresh & Airy",
    concentration: "Eau de Parfum (20% Concentration)",
    longevity: "8–10 Hours",
    sillage: "Crisp & Breezy",
    pyramid: {
      top: ["Sicilian Bergamot", "Mandarin Zest", "Neroli Blossoms"],
      heart: ["Royal Jasmine Sambac", "Italian Orange Flower", "White Freesia"],
      base: ["Solar Ambergris Accord", "Blonde Cedar", "Luminous Clean Musks"],
    },
    sizes: [
      { label: "Travel Spray", volume: "30ml / 1.0 fl. oz.", price: 60 },
      { label: "Signature Bottle", volume: "100ml / 3.4 fl. oz.", price: 110 },
      { label: "Grand Flacon", volume: "150ml / 5.1 fl. oz.", price: 150 },
    ],
    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Hydroxycitronellal, Citral, Geraniol, Citronellol. 100% Vegan & Cruelty-Free.",
    reviews: [
      {
        id: "rev-lumiere-1",
        author: "Sophia M.",
        location: "San Francisco, CA",
        rating: 5,
        date: "1 month ago",
        title: "Sunshine in a bottle",
        comment:
          "Bright, joyful, and impeccably elegant. The jasmine is crystalline rather than heavy, making it the perfect daytime signature.",
        verified: true,
      },
    ],
  },
  {
    id: "jardin-secret",
    name: "Jardin Secret",
    notes: "Floral Musk",
    price: 135,
    image: productJardin,
    collectionName: "Floral Bouquets",
    family: "Powdery Floral · Ethereal White Musk",
    tagline: "A secluded botanical sanctuary veiled in morning dew and velvet musk.",
    description:
      "A private sanctuary hidden behind ancient stone arches draped in climbing wisteria. Jardin Secret whispers with soft gardenia, powdery Florentine iris, and gentle velvet musks—a scent of tranquil, poetic beauty.",
    inspiration:
      "The quiet moments in secret French cloister gardens, surrounded by dewy white blossoms before the rest of the world awakens.",
    mood: "Serene, poetic, timeless",
    intensity: "Soft & Enveloping",
    concentration: "Eau de Parfum (22% Extrait Concentration)",
    longevity: "10–12 Hours",
    sillage: "Intimate & Graceful",
    pyramid: {
      top: ["Green Violet Leaf", "Dewy Lily of the Valley", "Crisp Anjou Pear"],
      heart: ["Florentine White Iris", "French Gardenia", "Magnolia Petals"],
      base: ["Velvet White Musk", "Orris Butter", "Blonde Sandalwood"],
    },
    sizes: [
      { label: "Travel Spray", volume: "30ml / 1.0 fl. oz.", price: 72 },
      { label: "Signature Bottle", volume: "100ml / 3.4 fl. oz.", price: 135 },
      { label: "Grand Flacon", volume: "150ml / 5.1 fl. oz.", price: 180 },
    ],
    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Alpha-Isomethyl Ionone, Benzyl Salicylate, Hydroxycitronellal, Linalool, Geraniol. 100% Vegan & Cruelty-Free.",
    reviews: [
      {
        id: "rev-jardin-1",
        author: "Clara B.",
        location: "Vienna, Austria",
        rating: 5,
        date: "2 weeks ago",
        title: "Poetic and soothing",
        comment:
          "There is a calming, serene purity to Jardin Secret. It feels like wearing fine silk. The iris note is of extraordinary quality.",
        verified: true,
      },
    ],
  },
  {
    id: "veloura-intense",
    name: "Veloura Intense",
    notes: "Amber & Sandalwood",
    price: 160,
    image: productIntense,
    collectionName: "Exclusive Collection",
    family: "Warm Woody Oriental · Haute Luxe",
    tagline: "The pinnacle of nocturnal opulence steeped in golden amber resin.",
    description:
      "The pinnacle of nocturnal opulence. Veloura Intense celebrates the sultry depth of rare Mysore sandalwood steeped in molten golden amber and warm balsamic tonka. Rich, enveloping, and undeniably unforgettable.",
    inspiration:
      "The velvet drapery of Parisian salons and the historic heritage of haute perfumery. Designed for individuals who leave a lasting legacy.",
    mood: "Opulent, commanding, warm",
    intensity: "Deep & Opulent",
    concentration: "Extrait de Parfum (26% Concentration)",
    longevity: "14–18 Hours",
    sillage: "Substantial & Magnetic",
    pyramid: {
      top: ["Guatemalan Cardamom", "Bitter Orange", "Roasted Tonka Bean"],
      heart: ["Mysore Sandalwood", "Golden Amber Resin", "Labdanum Absolute"],
      base: ["Madagascar Vanilla Bean", "Smoked Haitian Vetiver", "Siam Benzoin"],
    },
    sizes: [
      { label: "Travel Spray", volume: "30ml / 1.0 fl. oz.", price: 85 },
      { label: "Signature Bottle", volume: "100ml / 3.4 fl. oz.", price: 160 },
      { label: "Grand Flacon", volume: "150ml / 5.1 fl. oz.", price: 215 },
    ],
    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Coumarin, Limonene, Linalool, Eugenol, Isoeugenol, Benzyl Benzoate, Cinnamal. 100% Vegan & Cruelty-Free.",
    reviews: [
      {
        id: "rev-intense-1",
        author: "Julian H.",
        location: "Zurich, Switzerland",
        rating: 5,
        date: "3 weeks ago",
        title: "The grandest sandalwood ever created",
        comment:
          "Rich, creamy sandalwood wrapped in amber and smoked vanilla. The 26% extrait concentration is noticeable from the first spritz. Lasts until the next morning.",
        verified: true,
      },
    ],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "emily",
    quote:
      "Veloura perfumes are truly beautiful. The scent stays with me all day, and the packaging feels absolutely luxurious.",
    name: "Emily R.",
    avatar: clientEmily,
  },
  {
    id: "sophia",
    quote: "The fragrance is delicate yet unforgettable. I love wearing it for special occasions.",
    name: "Sophia M.",
    avatar: clientSophia,
  },
  {
    id: "lauren",
    quote:
      "From the beautiful packaging to the incredible scent, everything feels like pure luxury.",
    name: "Lauren T.",
    avatar: clientLauren,
  },
  {
    id: "amelia",
    quote:
      "Rose Noir has become my signature. Every time I wear it, someone stops to ask what it is.",
    name: "Amelia K.",
    avatar: clientSophia,
  },
];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value);
