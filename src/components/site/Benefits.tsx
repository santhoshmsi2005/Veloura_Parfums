import { motion } from "framer-motion";
import { Droplets, Gift, HandHeart, Rabbit } from "lucide-react";
import { fadeUp, inView, stagger } from "./motion";

const items = [
  { icon: Rabbit, label: "Cruelty Free" },
  { icon: Droplets, label: "Long Lasting Fragrance" },
  { icon: HandHeart, label: "Made With Care" },
  { icon: Gift, label: "Luxury Packaging" },
];

export function Benefits() {
  return (
    <section aria-label="Our promise" className="border-y border-border/70 bg-ivory">
      <motion.ul
        {...inView}
        variants={stagger(0.08)}
        className="mx-auto grid max-w-[1200px] grid-cols-2 gap-y-5 px-6 py-6 md:grid-cols-4 md:py-7"
      >
        {items.map(({ icon: Icon, label }, i) => (
          <motion.li
            key={label}
            variants={fadeUp}
            className={`flex items-center justify-center gap-3 ${i > 0 ? "md:border-l md:border-border/70" : ""}`}
          >
            <Icon className="h-5 w-5 shrink-0 text-champagne" strokeWidth={1.2} />
            <span className="eyebrow !text-[0.6rem] !tracking-[0.2em] text-cocoa">{label}</span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
