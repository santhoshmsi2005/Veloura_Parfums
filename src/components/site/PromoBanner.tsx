import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FloralSprig } from "./Ornament";
import { fadeUp, inView, stagger } from "./motion";

export function PromoBanner() {
  return (
    <section
      aria-label="Seasonal offer"
      className="mx-auto max-w-[1440px] px-4 pt-16 md:px-10 md:pt-20"
    >
      <motion.div
        {...inView}
        variants={stagger(0.1)}
        className="grain-light bg-wine-velvet relative overflow-hidden px-6 py-10 text-on-dark shadow-lift md:px-14 md:py-12"
      >
        <FloralSprig className="pointer-events-none absolute -right-6 -top-6 h-56 w-56 rotate-12 text-champagne/35 md:right-6 md:h-64 md:w-64" />
        <FloralSprig className="pointer-events-none absolute -bottom-16 -left-10 h-48 w-48 -rotate-[30deg] text-champagne/15" />
        <div className="relative z-10 flex flex-col items-center gap-6 text-center md:flex-row md:gap-10 md:text-left">
          <motion.div
            variants={fadeUp}
            className="flex items-end gap-2 text-champagne md:border-r md:border-line-dark md:pr-10"
          >
            <span className="font-display text-7xl leading-[0.8] md:text-8xl">20%</span>
            <span className="eyebrow mb-1 !tracking-[0.3em]">off</span>
          </motion.div>
          <motion.div variants={fadeUp} className="flex-1">
            <h2 className="text-3xl leading-tight md:text-[2.2rem]">
              Because you deserve something exquisite.
            </h2>
            <p className="mt-2 text-sm text-on-dark-muted">
              Enjoy 20% off your order for a limited time only.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="md:mr-40 xl:mr-48">
            <Button variant="luxe-cream" size="luxe" asChild>
              <a href="#featured">Shop the sale</a>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
