import { memo, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { formatPrice, products, type Product } from "@/data/catalog";
import { cn } from "@/lib/utils";
import { useCart } from "./cart-context";
import { SectionHeading } from "./SectionHeading";
import { fadeUp, inView, stagger } from "./motion";

export const ProductCard = memo(function ProductCard({
  product,
  wished,
  onWish,
  onAdd,
}: {
  product: Product;
  wished: boolean;
  onWish: (id: string) => void;
  onAdd: (p: Product) => void;
}) {
  return (
    <motion.article
      variants={fadeUp}
      className="group relative flex flex-col border border-border/80 bg-card transition-all duration-500 ease-[var(--ease-luxe)] hover:-translate-y-1.5 hover:shadow-lift"
    >
      <Link
        to="/products/$productId"
        params={{ productId: product.id }}
        className="group/link flex flex-1 flex-col focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-burgundy"
        aria-label={`View ${product.name} details`}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-cream">
          <img
            src={product.image}
            alt={`${product.name} eau de parfum bottle`}
            loading="lazy"
            decoding="async"
            width={640}
            height={960}
            className="h-full w-full scale-[1.32] object-cover transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:scale-[1.4]"
          />
        </div>
        <div className="flex flex-1 flex-col items-center px-3 pt-4 text-center">
          <h3 className="font-display text-[0.98rem] uppercase leading-tight tracking-[0.06em] text-cocoa transition-colors duration-300 group-hover/link:text-burgundy sm:tracking-[0.12em] md:text-lg">
            {product.name}
          </h3>
          <p className="mt-1 text-[0.6rem] uppercase tracking-[0.2em] text-taupe">
            {product.notes}
          </p>
          <p className="mt-2 font-display text-lg text-burgundy">{formatPrice(product.price)}</p>
        </div>
      </Link>

      {/* Wishlist Button */}
      <motion.button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onWish(product.id);
        }}
        aria-label={
          wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`
        }
        aria-pressed={wished}
        whileTap={{ scale: 0.8 }}
        className={cn(
          "absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-ivory/85 backdrop-blur transition-all duration-500",
          wished
            ? "opacity-100"
            : "opacity-100 lg:translate-y-1 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:focus-visible:opacity-100",
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={wished ? "on" : "off"}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: [1.3, 1], opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Heart
              className={cn("h-4 w-4", wished ? "fill-burgundy text-burgundy" : "text-cocoa")}
              strokeWidth={1.4}
            />
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* Add to Cart Button */}
      <div className="px-3 pb-5 pt-3 text-center">
        <Button
          variant="luxe"
          size="luxe-sm"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onAdd(product);
          }}
          className="w-full max-w-[150px] shadow-none"
        >
          Add to cart
        </Button>
      </div>
    </motion.article>
  );
});

export function FeaturedProducts() {
  const { add, wishlist, toggleWish } = useCart();
  const onAdd = useCallback(
    (p: Product) => {
      add();
      toast(`${p.name} added to your bag`, { description: `${p.notes} · ${formatPrice(p.price)}` });
    },
    [add],
  );

  return (
    <section
      id="featured"
      aria-labelledby="featured-title"
      className="mx-auto max-w-[1440px] px-4 pt-16 md:px-10 md:pt-20"
    >
      <SectionHeading id="featured-title" title="Featured Fragrances" />
      <motion.div
        {...inView}
        variants={stagger(0.09)}
        className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-5"
      >
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            wished={wishlist.has(p.id)}
            onWish={toggleWish}
            onAdd={onAdd}
          />
        ))}
      </motion.div>
      <div className="mt-9 text-center">
        <a
          href="#featured"
          className="link-underline eyebrow group inline-flex items-center gap-2 text-cocoa"
        >
          View all fragrances
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
            strokeWidth={1.4}
          />
        </a>
      </div>
    </section>
  );
}
