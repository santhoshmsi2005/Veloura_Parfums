import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "./motion";

/** Fullscreen cinematic intro. Parent controls mount/unmount via AnimatePresence. */
export function Preloader() {
  const reduce = useReducedMotion();
  const d = reduce ? 0 : 1;

  return (
    <motion.div
      key="preloader"
      role="status"
      aria-label="Loading Veloura Parfums"
      className="grain fixed inset-0 z-[100] flex items-center justify-center bg-ivory"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: reduce ? 0.2 : 0.7, ease: EASE } }}
    >
      <div className="relative z-10 flex w-full flex-col items-center">
        <motion.svg
          viewBox="0 0 40 40"
          className="h-9 w-9 text-champagne"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.9"
          initial={{ opacity: 0, rotate: -20 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8 * d, ease: EASE }}
          aria-hidden
        >
          {[0, 72, 144, 216, 288].map((r) => (
            <motion.path
              key={r}
              d="M20 20 C16 14 16 8 20 4 C24 8 24 14 20 20Z"
              transform={`rotate(${r} 20 20)`}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9 * d, ease: "easeInOut" }}
            />
          ))}
          <circle cx="20" cy="20" r="1.6" fill="currentColor" />
        </motion.svg>

        <motion.p
          className="mt-5 font-display text-5xl font-medium tracking-[0.2em] pl-[0.2em] text-burgundy md:text-6xl"
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8 * d, delay: 0.1 * d, ease: EASE }}
        >
          VELOURA
        </motion.p>
        <motion.p
          className="mt-2 text-[0.6rem] tracking-[0.6em] pl-[0.6em] text-cocoa/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 * d, delay: 0.35 * d }}
        >
          PARFUMS
        </motion.p>

        <motion.span
          className="mt-8 block h-px w-[min(70vw,520px)] origin-center bg-gradient-to-r from-transparent via-champagne to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9 * d, delay: 0.5 * d, ease: EASE }}
        />

        <motion.p
          className="eyebrow mt-6 text-champagne"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 * d, delay: 0.95 * d, ease: EASE }}
        >
          Crafted to captivate
        </motion.p>
      </div>
    </motion.div>
  );
}
