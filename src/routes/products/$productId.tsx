import { useState, useCallback, useMemo } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Droplets,
  Heart,
  Minus,
  Package,
  Plus,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import { toast } from "sonner";

import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { BrandPromises } from "@/components/site/BrandPromises";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ProductCard } from "@/components/site/FeaturedProducts";
import { useCart } from "@/components/site/cart-context";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatPrice, getProductById, products, type Product } from "@/data/catalog";
import { cn } from "@/lib/utils";
import peoniesImg from "@/assets/peonies.jpg";
import storyIngredientsImg from "@/assets/story-ingredients.jpg";

export const Route = createFileRoute("/products/$productId")({
  head: ({ params }) => {
    const product = getProductById(params.productId);
    const title = product
      ? `${product.name} — Eau de Parfum | Veloura Parfums`
      : "Fragrance Not Found | Veloura Parfums";
    const description =
      product?.description ??
      "Discover timeless luxury fragrances crafted with rare botanical extracts by Veloura Parfums.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
      ],
    };
  },
  component: ProductDetailPage,
});

export function ProductDetailPage() {
  const { productId } = Route.useParams();
  const product = getProductById(productId);

  const { add, wishlist, toggleWish } = useCart();

  // Find adjacent products for prev/next navigation
  const currentIndex = products.findIndex((p) => p.id === productId);
  const prevProduct = currentIndex > 0 ? products[currentIndex - 1] : products[products.length - 1];
  const nextProduct = currentIndex < products.length - 1 ? products[currentIndex + 1] : products[0];

  // Sizes setup
  const sizes = useMemo(() => {
    if (product?.sizes && product.sizes.length > 0) return product.sizes;
    return [
      {
        label: "Travel Spray",
        volume: "30ml / 1.0 fl. oz.",
        price: Math.round((product?.price ?? 120) * 0.55),
      },
      { label: "Signature Bottle", volume: "100ml / 3.4 fl. oz.", price: product?.price ?? 120 },
      {
        label: "Grand Flacon",
        volume: "150ml / 5.1 fl. oz.",
        price: Math.round((product?.price ?? 120) * 1.35),
      },
    ];
  }, [product]);

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(1);
  const selectedSize = sizes[selectedSizeIndex] || sizes[0];

  // Quantity state
  const [quantity, setQuantity] = useState(1);

  // Gallery state
  const galleryImages = useMemo(() => {
    if (!product) return [];
    return [
      { id: "bottle", label: "The Flacon", src: product.image, alt: `${product.name} Flacon` },
      {
        id: "botanical",
        label: "Botanical Extracts",
        src: peoniesImg,
        alt: "Natural Grasse Petals",
      },
      {
        id: "ingredients",
        label: "Raw Ingredients",
        src: storyIngredientsImg,
        alt: "Artisanal Perfumery Ingredients",
      },
    ];
  }, [product]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Wishlist handler
  const isWished = product ? wishlist.has(product.id) : false;
  const handleToggleWish = useCallback(() => {
    if (!product) return;
    toggleWish(product.id);
    if (!isWished) {
      toast(`${product.name} added to your wishlist`, {
        description: "Saved to your private fragrance collection.",
      });
    } else {
      toast(`${product.name} removed from wishlist`);
    }
  }, [product, isWished, toggleWish]);

  // Add to cart handler
  const handleAddToCart = useCallback(() => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      add();
    }
    toast(`${quantity}× ${product.name} added to your bag`, {
      description: `${selectedSize.volume} · ${formatPrice(selectedSize.price * quantity)}`,
    });
  }, [add, product, quantity, selectedSize]);

  // Other related products
  const relatedProducts = useMemo(() => {
    return products.filter((p) => p.id !== productId);
  }, [productId]);

  const onAddRelated = useCallback(
    (p: Product) => {
      add();
      toast(`${p.name} added to your bag`, {
        description: `${p.notes} · ${formatPrice(p.price)}`,
      });
    },
    [add],
  );

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col bg-ivory text-cocoa">
        <AnnouncementBar />
        <Navbar />
        <main className="flex flex-1 items-center justify-center px-4 py-20 text-center">
          <div className="max-w-md">
            <h1 className="font-display text-4xl text-burgundy">Fragrance Not Found</h1>
            <p className="mt-3 text-sm text-taupe">
              The fragrance you are searching for may be a private vintage or has been moved.
            </p>
            <div className="mt-8">
              <Button asChild variant="luxe">
                <Link to="/">Return to Collections</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory text-cocoa">
      <AnnouncementBar />
      <Navbar />

      <main>
        {/* Breadcrumbs & Quick-Nav Bar */}
        <section className="border-b border-border/70 bg-cream/30">
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-4 py-3.5 text-xs text-taupe md:px-10">
            {/* Breadcrumb Links */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2">
              <Link to="/" className="link-underline transition-colors hover:text-burgundy">
                Home
              </Link>
              <span className="text-border">/</span>
              <a href="/#featured" className="link-underline transition-colors hover:text-burgundy">
                Fragrances
              </a>
              <span className="text-border">/</span>
              <span className="font-medium text-burgundy">{product.name}</span>
            </nav>

            {/* Quick Fragrance Switcher */}
            <div className="hidden items-center gap-5 sm:flex">
              <Link
                to="/products/$productId"
                params={{ productId: prevProduct.id }}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-burgundy"
                aria-label={`Previous fragrance: ${prevProduct.name}`}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span className="eyebrow !text-[0.58rem]">{prevProduct.name}</span>
              </Link>
              <span className="text-border">·</span>
              <Link
                to="/products/$productId"
                params={{ productId: nextProduct.id }}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-burgundy"
                aria-label={`Next fragrance: ${nextProduct.name}`}
              >
                <span className="eyebrow !text-[0.58rem]">{nextProduct.name}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Primary Product Details Showcase */}
        <section className="mx-auto max-w-[1440px] px-4 py-8 md:px-10 md:py-14">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            {/* LEFT: Visual Gallery & Notes Pyramid */}
            <div className="lg:col-span-6 xl:col-span-6">
              <div className="sticky top-24 space-y-6">
                {/* Main Product Showcase Card */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-none border border-border/80 bg-cream/70 shadow-soft">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={galleryImages[activeImageIndex]?.id || "img"}
                      src={galleryImages[activeImageIndex]?.src}
                      alt={galleryImages[activeImageIndex]?.alt}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full w-full object-cover object-center"
                    />
                  </AnimatePresence>

                  {/* Luxury Badge */}
                  <div className="absolute left-4 top-4 z-10">
                    <span className="eyebrow inline-block bg-ivory/90 px-3 py-1.5 !text-[0.56rem] !tracking-[0.22em] text-wine shadow-sm backdrop-blur-sm">
                      {product.concentration ?? "Eau De Parfum"}
                    </span>
                  </div>

                  {/* Wishlist Button on image */}
                  <motion.button
                    type="button"
                    onClick={handleToggleWish}
                    aria-label={
                      isWished
                        ? `Remove ${product.name} from wishlist`
                        : `Add ${product.name} to wishlist`
                    }
                    aria-pressed={isWished}
                    whileTap={{ scale: 0.85 }}
                    className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-ivory/90 text-cocoa shadow-sm backdrop-blur-sm transition-colors hover:text-burgundy"
                  >
                    <Heart
                      className={cn(
                        "h-4 w-4 transition-colors",
                        isWished ? "fill-burgundy text-burgundy" : "text-cocoa",
                      )}
                      strokeWidth={1.4}
                    />
                  </motion.button>
                </div>

                {/* Gallery Thumbnail Selector */}
                <div className="grid grid-cols-3 gap-3">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={img.id}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={cn(
                        "group relative aspect-[4/3] overflow-hidden border bg-cream transition-all duration-300",
                        activeImageIndex === idx
                          ? "border-burgundy ring-1 ring-burgundy"
                          : "border-border/80 opacity-70 hover:opacity-100",
                      )}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute inset-x-0 bottom-0 bg-wine/75 py-1 text-center font-sans text-[0.55rem] uppercase tracking-wider text-on-dark">
                        {img.label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Fragrance Pyramid Breakdown Card */}
                {product.pyramid && (
                  <div className="border border-border/80 bg-cream/30 p-5 md:p-6">
                    <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                      <Sparkles className="h-4 w-4 text-champagne" strokeWidth={1.4} />
                      <h3 className="eyebrow !text-[0.62rem] text-wine">
                        Olfactory Structure & Key Notes
                      </h3>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4 text-xs sm:grid-cols-3">
                      {/* Top Notes */}
                      <div className="space-y-1.5 border-b border-border/40 pb-3 sm:border-b-0 sm:border-r sm:pr-4">
                        <span className="eyebrow block !text-[0.55rem] text-champagne">
                          Top Notes
                        </span>
                        <p className="text-[0.65rem] text-taupe">Opening spark (0–15 min)</p>
                        <ul className="mt-2 space-y-1 font-serif text-sm italic text-cocoa">
                          {product.pyramid.top.map((note) => (
                            <li key={note}>• {note}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Heart Notes */}
                      <div className="space-y-1.5 border-b border-border/40 pb-3 sm:border-b-0 sm:border-r sm:px-4">
                        <span className="eyebrow block !text-[0.55rem] text-champagne">
                          Heart Notes
                        </span>
                        <p className="text-[0.65rem] text-taupe">The soul (2–4 hours)</p>
                        <ul className="mt-2 space-y-1 font-serif text-sm italic text-cocoa">
                          {product.pyramid.heart.map((note) => (
                            <li key={note}>• {note}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Base Notes */}
                      <div className="space-y-1.5 sm:pl-4">
                        <span className="eyebrow block !text-[0.55rem] text-champagne">
                          Base Notes
                        </span>
                        <p className="text-[0.65rem] text-taupe">Lingering legacy (8–12h)</p>
                        <ul className="mt-2 space-y-1 font-serif text-sm italic text-cocoa">
                          {product.pyramid.base.map((note) => (
                            <li key={note}>• {note}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: Product Identity & Purchase Configurator */}
            <div className="lg:col-span-6 xl:col-span-6">
              <div className="space-y-7">
                {/* Brand & Collection Eyebrow */}
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="eyebrow !text-[0.6rem] !tracking-[0.25em] text-burgundy">
                      {product.collectionName ?? "Veloura Haute Parfumerie"}
                    </span>
                    <span className="text-border">·</span>
                    <span className="eyebrow !text-[0.6rem] !tracking-[0.2em] text-taupe">
                      Grasse, France
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="mt-2 font-display text-4xl uppercase tracking-[0.04em] text-cocoa sm:text-5xl md:text-6xl">
                    {product.name}
                  </h1>

                  {/* Notes & Family */}
                  <p className="mt-2 text-sm uppercase tracking-[0.16em] text-taupe md:text-base">
                    {product.family ?? product.notes}
                  </p>

                  {/* Rating & Reviews */}
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex items-center text-champagne" aria-label="5 out of 5 stars">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-champagne text-champagne"
                          strokeWidth={1}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-cocoa">
                      4.9{" "}
                      <span className="text-taupe">
                        ({product.reviews?.length ? product.reviews.length * 42 : 128} verified
                        reviews)
                      </span>
                    </span>
                  </div>
                </div>

                {/* Price Display */}
                <div className="border-y border-border/80 py-4">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-3xl font-medium text-burgundy md:text-4xl">
                      {formatPrice(selectedSize.price)}
                    </span>
                    <span className="text-xs text-taupe">
                      Includes luxury tax & complimentary discovery vial
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-taupe">
                    Complimentary express shipping on this order.
                  </p>
                </div>

                {/* Evocative Description */}
                <div>
                  <p className="text-sm leading-relaxed text-cocoa/90 md:text-base">
                    {product.description}
                  </p>
                  {product.tagline && (
                    <p className="mt-3 font-serif text-base italic text-burgundy">
                      "{product.tagline}"
                    </p>
                  )}
                </div>

                {/* Scent Characteristics Pills */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <div className="border border-border/60 bg-cream/40 p-3 text-center">
                    <span className="eyebrow block !text-[0.55rem] text-taupe">Mood</span>
                    <span className="mt-1 block font-serif text-xs capitalize text-cocoa">
                      {product.mood ?? "Romantic & Luminous"}
                    </span>
                  </div>
                  <div className="border border-border/60 bg-cream/40 p-3 text-center">
                    <span className="eyebrow block !text-[0.55rem] text-taupe">Longevity</span>
                    <span className="mt-1 block font-serif text-xs text-cocoa">
                      {product.longevity ?? "10–12 Hours"}
                    </span>
                  </div>
                  <div className="col-span-2 border border-border/60 bg-cream/40 p-3 text-center sm:col-span-1">
                    <span className="eyebrow block !text-[0.55rem] text-taupe">Sillage</span>
                    <span className="mt-1 block font-serif text-xs text-cocoa">
                      {product.sillage ?? "Radiant & Alluring"}
                    </span>
                  </div>
                </div>

                {/* Flacon Size Selection */}
                <div>
                  <div className="flex items-center justify-between">
                    <span className="eyebrow !text-[0.62rem] text-cocoa">Select Flacon Size</span>
                    <span className="text-xs text-taupe">{selectedSize.volume}</span>
                  </div>

                  <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                    {sizes.map((sz, idx) => (
                      <button
                        key={sz.label}
                        type="button"
                        onClick={() => setSelectedSizeIndex(idx)}
                        className={cn(
                          "flex flex-col items-center justify-between border p-3 text-center transition-all duration-300",
                          selectedSizeIndex === idx
                            ? "border-burgundy bg-burgundy/5 text-burgundy shadow-sm"
                            : "border-border/80 bg-card text-cocoa hover:border-burgundy/50",
                        )}
                      >
                        <span className="eyebrow !text-[0.58rem]">{sz.label}</span>
                        <span className="mt-1 text-xs text-taupe">{sz.volume}</span>
                        <span className="mt-2 font-display text-sm font-medium">
                          {formatPrice(sz.price)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity and Add to Cart Section */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-3">
                    {/* Quantity Selector */}
                    <div className="flex h-11 items-center border border-border/80 bg-card">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        className="flex h-full w-9 items-center justify-center text-cocoa transition-colors hover:bg-cream disabled:opacity-30"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-10 text-center font-display text-base text-cocoa">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                        className="flex h-full w-9 items-center justify-center text-cocoa transition-colors hover:bg-cream"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      variant="luxe"
                      size="luxe"
                      onClick={handleAddToCart}
                      className="flex-1 shadow-soft"
                    >
                      Add to Bag · {formatPrice(selectedSize.price * quantity)}
                    </Button>

                    {/* Wishlist Button */}
                    <Button
                      variant="luxe-outline"
                      size="luxe"
                      onClick={handleToggleWish}
                      className="px-4"
                      aria-label="Toggle wishlist"
                    >
                      <Heart
                        className={cn(
                          "h-4 w-4",
                          isWished ? "fill-burgundy text-burgundy" : "text-burgundy",
                        )}
                      />
                    </Button>
                  </div>

                  {/* Discovery Guarantee Note */}
                  <div className="flex items-start gap-3 rounded-none border border-champagne/40 bg-champagne/10 p-3.5 text-xs text-cocoa">
                    <Sparkles
                      className="mt-0.5 h-4 w-4 shrink-0 text-champagne"
                      strokeWidth={1.5}
                    />
                    <p className="leading-relaxed">
                      <strong className="font-medium text-burgundy">
                        The Discovery Guarantee:
                      </strong>{" "}
                      Each bottle arrives with a complimentary matching 2ml discovery vial. Test the
                      vial on skin first; if it isn't your signature, return the unopened full
                      flacon for a complimentary exchange or refund.
                    </p>
                  </div>
                </div>

                {/* Luxury Perks Bar */}
                <div className="grid grid-cols-1 gap-3 border-t border-border/80 pt-5 sm:grid-cols-3">
                  <div className="flex items-center gap-2.5 text-xs text-cocoa">
                    <Truck className="h-4 w-4 shrink-0 text-champagne" strokeWidth={1.4} />
                    <span>Complimentary Shipping</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-cocoa">
                    <Package className="h-4 w-4 shrink-0 text-champagne" strokeWidth={1.4} />
                    <span>Signature Velvet Gift Box</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-cocoa">
                    <RotateCcw className="h-4 w-4 shrink-0 text-champagne" strokeWidth={1.4} />
                    <span>30-Day Hassle-Free Returns</span>
                  </div>
                </div>

                {/* Product Accordion Details */}
                <div className="border-t border-border/80 pt-4">
                  <Accordion type="single" collapsible defaultValue="profile" className="w-full">
                    {/* Item 1: Scent Profile */}
                    <AccordionItem value="profile" className="border-border/80">
                      <AccordionTrigger className="eyebrow !text-[0.65rem] text-cocoa hover:text-burgundy hover:no-underline">
                        Scent Profile & Technical Specifications
                      </AccordionTrigger>
                      <AccordionContent className="space-y-3 pt-2 text-xs leading-relaxed text-taupe">
                        <div className="grid grid-cols-2 gap-2 text-cocoa">
                          <div>
                            <span className="text-taupe">Concentration:</span>{" "}
                            {product.concentration ?? "Eau de Parfum (22%)"}
                          </div>
                          <div>
                            <span className="text-taupe">Olfactory Family:</span>{" "}
                            {product.family ?? product.notes}
                          </div>
                          <div>
                            <span className="text-taupe">Wear Time:</span>{" "}
                            {product.longevity ?? "10–12 Hours"}
                          </div>
                          <div>
                            <span className="text-taupe">Origin:</span> Grasse, Côte d'Azur, France
                          </div>
                        </div>
                        <p className="pt-2 text-cocoa/90">
                          Formulated with natural botanical absolutes matured for over 60 days in
                          small chilled vessels before bottling to allow the rare oils to harmonize
                          seamlessly.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Item 2: Inspiration */}
                    <AccordionItem value="inspiration" className="border-border/80">
                      <AccordionTrigger className="eyebrow !text-[0.65rem] text-cocoa hover:text-burgundy hover:no-underline">
                        The Story & Perfumer's Inspiration
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 text-xs leading-relaxed text-cocoa/90">
                        <p>
                          {product.inspiration ??
                            "Crafted with meticulous reverence for traditional French high perfumery. Every drop captures the delicate harmony of light, memory, and enduring emotional connection."}
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Item 3: Application */}
                    <AccordionItem value="ritual" className="border-border/80">
                      <AccordionTrigger className="eyebrow !text-[0.65rem] text-cocoa hover:text-burgundy hover:no-underline">
                        Application & Layering Ritual
                      </AccordionTrigger>
                      <AccordionContent className="space-y-2 pt-2 text-xs leading-relaxed text-cocoa/90">
                        <p>
                          <strong>Pulse Points:</strong> Spray lightly onto pulse points where your
                          skin is warmest—behind the earlobes, base of throat, inner wrists, and
                          inside elbows.
                        </p>
                        <p>
                          <strong>The Halo Effect:</strong> Spray an arc in front of you and walk
                          through the mist to disperse fine droplets across hair and garments
                          without staining delicate fabrics.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Item 4: Ingredients */}
                    <AccordionItem value="ingredients" className="border-border/80">
                      <AccordionTrigger className="eyebrow !text-[0.65rem] text-cocoa hover:text-burgundy hover:no-underline">
                        Ingredients & Conscious Formulation
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 text-[0.7rem] leading-relaxed text-taupe">
                        <p>
                          {product.ingredients ??
                            "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Benzyl Salicylate, Linalool, Hydroxycitronellal, Limonene, Geraniol. 100% Vegan & Cruelty-Free. Formulated without parabens, phthalates, or artificial colorants."}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Promises Bar */}
        <section className="border-y border-border/80 bg-cream/30 py-12 md:py-16">
          <div className="mx-auto max-w-[1200px] px-6">
            <BrandPromises />
          </div>
        </section>

        {/* Customer Reviews for This Product */}
        <section className="mx-auto max-w-[1440px] px-4 py-16 md:px-10 md:py-20">
          <SectionHeading title={`Loved by Clients · ${product.name}`} />

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {product.reviews && product.reviews.length > 0
              ? product.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="flex flex-col justify-between border border-border/80 bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex items-center gap-1 text-champagne">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-3.5 w-3.5 fill-champagne text-champagne"
                            strokeWidth={1}
                          />
                        ))}
                      </div>
                      <h4 className="mt-3 font-display text-lg text-cocoa">{rev.title}</h4>
                      <p className="mt-2 text-xs leading-relaxed text-taupe font-sans italic">
                        "{rev.comment}"
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4 text-[0.7rem]">
                      <div>
                        <span className="font-medium text-cocoa">{rev.author}</span>
                        <span className="text-taupe"> · {rev.location}</span>
                      </div>
                      {rev.verified && (
                        <span className="inline-flex items-center gap-1 text-[0.62rem] text-burgundy">
                          <Check className="h-3 w-3" /> Verified Buyer
                        </span>
                      )}
                    </div>
                  </div>
                ))
              : null}

            {/* Additional editorial review to fill 3 cards */}
            <div className="flex flex-col justify-between border border-border/80 bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1">
              <div>
                <div className="flex items-center gap-1 text-champagne">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-champagne text-champagne"
                      strokeWidth={1}
                    />
                  ))}
                </div>
                <h4 className="mt-3 font-display text-lg text-cocoa">
                  Elegance beyond expectation
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-taupe font-sans italic">
                  "The bottle looks like fine jewelry on my vanity, and the fragrance settles into
                  the most enchanting warm aura. Veloura has earned a client for life."
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4 text-[0.7rem]">
                <div>
                  <span className="font-medium text-cocoa">Victoria S.</span>
                  <span className="text-taupe"> · Geneva, Switzerland</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[0.62rem] text-burgundy">
                  <Check className="h-3 w-3" /> Verified Buyer
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Related Fragrances / "You May Also Admire" */}
        <section className="border-t border-border/80 bg-cream/20 px-4 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-[1440px]">
            <SectionHeading title="You May Also Admire" />
            <p className="mx-auto mt-2 max-w-md text-center text-xs tracking-wider text-taupe uppercase">
              Explore complementary scents from the Veloura atelier
            </p>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:gap-5">
              {relatedProducts.slice(0, 4).map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  wished={wishlist.has(p.id)}
                  onWish={toggleWish}
                  onAdd={onAddRelated}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
