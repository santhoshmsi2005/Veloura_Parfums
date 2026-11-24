import { motion } from "framer-motion";
import { Ornament } from "./Ornament";
import { fadeUp, inView } from "./motion";

export function SectionHeading({ title, id }: { title: string; id?: string }) {
  return (
    <motion.div {...inView} variants={fadeUp} className="text-center">
      <h2 id={id} className="section-title">
        {title}
      </h2>
      <Ornament className="mt-3" />
    </motion.div>
  );
}
