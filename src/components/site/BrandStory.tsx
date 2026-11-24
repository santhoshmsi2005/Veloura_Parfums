import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import storyImage from "@/assets/story-ingredients.jpg";
import { BrandPromises } from "./BrandPromises";
import { EASE, fadeUp, inView, stagger } from "./motion";

export function BrandStory() {
  return (
    <section
      id="story"
      aria-labelledby="story-title"
      className="grain mt-16 overflow-hidden bg-cream md:mt-20"
    >
      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[46fr_54fr]">
        <motion.div
          {...inView}
          variants={stagger(0.12)}
          className="order-2 flex flex-col justify-center px-6 py-14 sm:px-10 lg:order-1 lg:py-20 lg:pl-16 lg:pr-12 xl:pl-24"
        >
          <motion.p variants={fadeUp} className="eyebrow flex items-center gap-3 text-champagne">
            <span className="h-px w-8 bg-champagne" />
            Our story
          </motion.p>
          <motion.h2
            id="story-title"
            variants={fadeUp}
            className="mt-4 text-[2.4rem] leading-[1.02] text-cocoa md:text-5xl xl:text-[3.4rem]"
          >
            The art of fine fragrance
            <br />
            <em className="text-burgundy">is our heritage.</em>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-[30rem] text-[0.92rem] leading-relaxed text-taupe"
          >
            At Veloura Parfums, every scent is a work of art—beautifully crafted to awaken the
            senses and evoke timeless elegance. We believe fragrance is more than a signature; it is
            an emotion, a memory, and an everlasting presence.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8">
            <Button variant="luxe" size="luxe" asChild>
              <a href="#story">Discover our story</a>
            </Button>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-12">
            <BrandPromises />
          </motion.div>
        </motion.div>

        <div className="relative order-1 h-[340px] overflow-hidden sm:h-[440px] lg:order-2 lg:h-auto lg:min-h-[640px]">
          <motion.img
            initial={{ opacity: 0, scale: 1.06 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1.4, ease: EASE }}
            src={storyImage}
            alt="Burgundy Veloura bottle on marble with vanilla pods, cinnamon, blood orange and red roses"
            loading="lazy"
            decoding="async"
            width={1536}
            height={1024}
            className="absolute inset-0 h-full w-full object-cover object-[62%_center]"
          />
          <div className="absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-cream to-transparent lg:block" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-cream to-transparent lg:hidden" />
        </div>
      </div>
    </section>
  );
}
