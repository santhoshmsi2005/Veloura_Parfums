import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-perfumes.jpg";
import { EASE, fadeUp, stagger } from "./motion";

export function Hero({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion();
  const state = ready ? "show" : "hidden";

  return (
    <section id="top" className="grain relative overflow-hidden bg-ivory">
      <div className="relative mx-auto grid max-w-[1600px] lg:min-h-[620px] lg:grid-cols-[45fr_55fr] xl:min-h-[680px]">
        {/* Imagery — full bleed on desktop, sits under the text column which fades it out */}
        <motion.div
          className="relative h-[400px] overflow-hidden sm:h-[500px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[82%]"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.06 }}
          transition={{ duration: 1.6, ease: EASE }}
        >
          <motion.img
            src={heroImage}
            alt="Three Veloura perfume bottles — burgundy, rose and champagne — among peonies, with a woman in a blush satin dress behind"
            width={1536}
            height={1024}
            fetchPriority="high"
            className="h-full w-full object-cover object-[68%_center] lg:object-[60%_center]"
            animate={
              reduce || !ready ? { scale: 1, x: 0 } : { scale: [1, 1.035, 1], x: [0, -6, 0] }
            }
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="bg-hero-fade absolute inset-0 hidden lg:block" />
          <div className="bg-hero-fade-mobile absolute inset-0 lg:hidden" />
          <div className="absolute inset-x-0 bottom-0 hidden h-28 bg-gradient-to-t from-ivory to-transparent lg:block" />
        </motion.div>

        {/* Copy */}
        <motion.div
          className="relative z-10 -mt-14 flex flex-col justify-center px-6 pb-14 sm:px-10 lg:mt-0 lg:pb-24 lg:pl-16 lg:pr-0 xl:pl-24"
          variants={stagger(0.14, 0.15)}
          initial="hidden"
          animate={state}
        >
          <motion.p variants={fadeUp} className="eyebrow flex items-center gap-3 text-champagne">
            <span className="h-px w-8 bg-champagne" />
            Crafted to captivate
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-5 text-[3.1rem] leading-[0.98] text-cocoa sm:text-6xl lg:text-[4.6rem] xl:text-[5.4rem]"
          >
            Scents that
            <br />
            <em className="font-normal text-burgundy">leave a legacy.</em>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-[25rem] text-[0.95rem] leading-relaxed text-taupe"
          >
            Veloura Parfums creates timeless fragrances that celebrate elegance, femininity, and
            unforgettable presence.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9">
            <Button asChild variant="luxe" size="luxe" className="group">
              <a href="#collections">
                Discover the collection
                <ArrowRight
                  className="!h-3.5 !w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
