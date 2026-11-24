import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import peonies from "@/assets/peonies.jpg";
import { EASE, fadeUp, inView, stagger } from "./motion";

const emailSchema = z
  .string()
  .trim()
  .min(1, { message: "Please enter your email address." })
  .max(255, { message: "That email is a little too long." })
  .email({ message: "Please enter a valid email address." });

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Please enter a valid email address.");
      return;
    }
    setError(null);
    setDone(true);
  };

  return (
    <section
      aria-labelledby="newsletter-title"
      className="grain-light bg-wine-velvet relative mt-16 overflow-hidden text-on-dark md:mt-20"
    >
      <img
        src={peonies}
        alt=""
        loading="lazy"
        decoding="async"
        width={1536}
        height={1024}
        className="absolute inset-y-0 left-0 h-full w-[70%] object-cover object-left opacity-35 [mask-image:linear-gradient(to_right,black_30%,transparent)] md:w-[38%] md:opacity-100"
      />
      <motion.div
        {...inView}
        variants={stagger(0.1)}
        className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-8 px-6 py-14 md:grid-cols-[0.75fr_1.3fr_1fr] lg:gap-12 md:px-10 md:py-16"
      >
        <div className="hidden md:block" />
        <motion.div variants={fadeUp} className="text-center md:text-left">
          <h2
            id="newsletter-title"
            className="text-[2rem] leading-[1.1] md:text-[2.1rem] xl:text-[2.4rem]"
          >
            Stay inspired &amp; be the first to know
          </h2>
          <p className="mt-2 text-sm text-on-dark-muted">
            Join our world of exquisite scents, exclusive offers, and fragrance inspiration.
          </p>
        </motion.div>
        <motion.div variants={fadeUp} className="w-full">
          <AnimatePresence mode="wait" initial={false}>
            {done ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="flex items-center gap-4 border border-line-dark px-5 py-4"
                role="status"
              >
                <motion.span
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 16 }}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-champagne text-wine"
                >
                  <Check className="h-4 w-4" strokeWidth={2} />
                </motion.span>
                <div>
                  <p className="font-display text-xl">Welcome to Veloura.</p>
                  <p className="text-xs text-on-dark-muted">
                    A little something is on its way to your inbox.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.form key="form" exit={{ opacity: 0, y: -10 }} onSubmit={onSubmit} noValidate>
                <div className="flex border border-line-dark bg-wine/40 transition-colors focus-within:border-champagne">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={email}
                    maxLength={255}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Enter your email address"
                    aria-invalid={!!error}
                    aria-describedby={error ? "newsletter-error" : undefined}
                    className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-on-dark placeholder:text-on-dark-muted/70 focus:outline-none"
                  />
                  <Button type="submit" variant="luxe-cream" size="luxe" className="group shrink-0">
                    Subscribe
                    <ArrowRight
                      className="!h-3.5 !w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                      strokeWidth={1.5}
                    />
                  </Button>
                </div>
                <AnimatePresence>
                  {error && (
                    <motion.p
                      id="newsletter-error"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 text-xs text-rose"
                      role="alert"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}
