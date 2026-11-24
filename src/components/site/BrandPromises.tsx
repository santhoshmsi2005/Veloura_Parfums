import { motion } from "framer-motion";
import { Feather, Gem, Leaf, Package } from "lucide-react";
import { fadeUp, inView, stagger } from "./motion";

const promises = [
  {
    icon: Gem,
    title: "Handcrafted Excellence",
    text: "Blended in small batches by master perfumers.",
  },
  {
    icon: Leaf,
    title: "Ethical Sourcing",
    text: "Ingredients gathered with respect for land and people.",
  },
  {
    icon: Feather,
    title: "Timeless Ingredients",
    text: "Rare absolutes chosen to age beautifully on skin.",
  },
  {
    icon: Package,
    title: "Thoughtful Packaging",
    text: "Recyclable keepsake boxes, finished by hand.",
  },
];

export function BrandPromises() {
  return (
    <motion.ul
      {...inView}
      variants={stagger(0.08)}
      className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border/80 pt-8 md:grid-cols-4 md:gap-x-5"
    >
      {promises.map(({ icon: Icon, title, text }) => (
        <motion.li key={title} variants={fadeUp} className="flex flex-col items-start">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-champagne/50">
            <Icon className="h-4 w-4 text-champagne" strokeWidth={1.2} />
          </span>
          <h3 className="mt-3 font-sans text-[0.6rem] font-medium uppercase tracking-[0.2em] text-cocoa">
            {title}
          </h3>
          <p className="mt-1.5 text-[0.72rem] leading-relaxed text-taupe">{text}</p>
        </motion.li>
      ))}
    </motion.ul>
  );
}
