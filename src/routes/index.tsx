import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Benefits } from "@/components/site/Benefits";
import { Collections } from "@/components/site/Collections";
import { FeaturedProducts } from "@/components/site/FeaturedProducts";
import { BrandStory } from "@/components/site/BrandStory";
import { PromoBanner } from "@/components/site/PromoBanner";
import { Testimonials } from "@/components/site/Testimonials";
import { Newsletter } from "@/components/site/Newsletter";
import { Footer } from "@/components/site/Footer";
import { Preloader } from "@/components/site/Preloader";
import { CartProvider } from "@/components/site/cart-context";

const TITLE = "Veloura Parfums — Scents that leave a legacy";
const DESCRIPTION =
  "Timeless luxury fragrances celebrating elegance, femininity and unforgettable presence. Discover L'Amour, Rose Noir and the Veloura collections.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

const INTRO_KEY = "veloura-intro-seen";

function Index() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const seen = window.sessionStorage.getItem(INTRO_KEY) === "1";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = seen ? 250 : reduce ? 500 : 1750;
    const t = window.setTimeout(() => {
      setLoading(false);
      window.sessionStorage.setItem(INTRO_KEY, "1");
    }, delay);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = loading ? "hidden" : "";
  }, [loading]);

  return (
    <>
      <AnimatePresence>{loading && <Preloader />}</AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.6 }}
      >
        <AnnouncementBar />
        <Navbar />
        <main>
          <Hero ready={!loading} />
          <Benefits />
          <Collections />
          <FeaturedProducts />
          <BrandStory />
          <PromoBanner />
          <Testimonials />
          <Newsletter />
        </main>
        <Footer />
      </motion.div>
    </>
  );
}
