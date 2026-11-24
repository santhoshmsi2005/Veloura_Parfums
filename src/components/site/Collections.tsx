import { motion } from "framer-motion";
import { collections, type CollectionTone } from "@/data/catalog";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import { fadeUp, inView, stagger } from "./motion";

const toneOverlay: Record<CollectionTone, string> = {
  floral: "bg-gradient-to-r from-wine/90 via-burgundy/55 to-transparent",
  warm: "bg-gradient-to-r from-burgundy/80 via-burgundy/35 to-transparent",
  fresh: "bg-gradient-to-r from-wine/90 via-wine/50 to-transparent",
  exclusive: "bg-gradient-to-r from-cocoa/85 via-cocoa/45 to-transparent",
};

export function Collections() {
  return (
    <section
      id="collections"
      aria-labelledby="collections-title"
      className="mx-auto max-w-[1440px] px-4 pt-16 md:px-10 md:pt-20"
    >
      <SectionHeading id="collections-title" title="Shop by Collection" />
      <motion.div
        {...inView}
        variants={stagger(0.1)}
        className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
      >
        {collections.map((c) => (
          <motion.a
            key={c.id}
            href="#featured"
            variants={fadeUp}
            className="group relative block aspect-[16/10] overflow-hidden bg-wine shadow-soft sm:aspect-[4/3] lg:aspect-[7/5]"
          >
            <img
              src={c.image}
              alt=""
              loading="lazy"
              decoding="async"
              width={800}
              height={800}
              className="absolute inset-0 h-full w-full object-cover object-right transition-transform duration-[1400ms] ease-[var(--ease-luxe)] group-hover:scale-110"
            />
            <div className={cn("absolute inset-0", toneOverlay[c.tone])} />
            <div className="relative flex h-full flex-col justify-between p-6 text-on-dark transition-transform duration-500 ease-[var(--ease-luxe)] group-hover:-translate-y-1.5 md:p-7">
              <div>
                <h3 className="font-display text-[1.6rem] uppercase leading-[1.02] tracking-[0.06em]">
                  {c.title[0]}
                  <br />
                  {c.title[1]}
                </h3>
                <p className="mt-2 text-[0.72rem] tracking-wide text-on-dark-muted">
                  {c.description}
                </p>
              </div>
              <span className="eyebrow inline-flex w-fit items-center border border-on-dark/60 px-4 py-2 !text-[0.58rem] transition-all duration-500 group-hover:border-champagne group-hover:bg-on-dark group-hover:text-wine">
                Shop now
              </span>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
