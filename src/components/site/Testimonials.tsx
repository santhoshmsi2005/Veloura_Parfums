import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BadgeCheck, Quote, Star } from "lucide-react";
import { testimonials } from "@/data/catalog";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import { fadeUp, inView } from "./motion";

export function Testimonials() {
  const [emblaRef, embla] = useEmblaCarousel({ align: "start", loop: true });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    setSnaps(embla.scrollSnapList());
    onSelect();
    embla.on("select", onSelect);
    embla.on("reInit", () => {
      setSnaps(embla.scrollSnapList());
      onSelect();
    });
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla, onSelect]);

  const arrowCls =
    "hidden h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-cocoa transition-all duration-500 hover:border-burgundy hover:bg-burgundy hover:text-on-dark md:grid";

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="mx-auto max-w-[1440px] px-4 pt-16 md:px-10 md:pt-20"
    >
      <SectionHeading id="testimonials-title" title="Loved by Our Clients" />
      <motion.div {...inView} variants={fadeUp} className="mt-10 flex items-center gap-4 lg:gap-6">
        <button
          type="button"
          aria-label="Previous review"
          className={arrowCls}
          onClick={() => embla?.scrollPrev()}
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.4} />
        </button>
        <div className="min-w-0 flex-1 overflow-hidden" ref={emblaRef}>
          <div className="-ml-4 flex touch-pan-y">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="min-w-0 shrink-0 grow-0 basis-[86%] pl-4 sm:basis-1/2 lg:basis-1/3"
              >
                <figure className="flex h-full flex-col bg-blush p-7 md:p-8">
                  <div className="flex items-start justify-between">
                    <Quote className="h-7 w-7 -scale-x-100 fill-rose text-rose" strokeWidth={0} />
                    <div className="flex gap-0.5" aria-label="Five out of five stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-3.5 w-3.5 fill-champagne text-champagne"
                          strokeWidth={0}
                        />
                      ))}
                    </div>
                  </div>
                  <blockquote className="mt-4 flex-1 font-display text-[1.2rem] leading-snug text-cocoa">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-rose/50 pt-5">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      loading="lazy"
                      width={240}
                      height={240}
                      className="h-11 w-11 shrink-0 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <p className="eyebrow !text-[0.62rem] text-cocoa">{t.name}</p>
                      <p className="mt-1 flex items-center gap-1 text-[0.68rem] text-taupe">
                        <BadgeCheck className="h-3.5 w-3.5 text-champagne" strokeWidth={1.4} />
                        Verified customer
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          aria-label="Next review"
          className={arrowCls}
          onClick={() => embla?.scrollNext()}
        >
          <ArrowRight className="h-4 w-4" strokeWidth={1.4} />
        </button>
      </motion.div>
      <div className="mt-6 flex justify-center gap-2">
        {snaps.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to review ${i + 1}`}
            onClick={() => embla?.scrollTo(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              i === selected ? "w-6 bg-burgundy" : "w-1.5 bg-rose",
            )}
          />
        ))}
      </div>
    </section>
  );
}
