import { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { ChevronDown, Menu, Search, ShoppingBag, User } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { useCart } from "./cart-context";

const leftLinks = [
  { label: "Shop", href: "/#featured", caret: true },
  { label: "Collections", href: "/#collections" },
  { label: "Best Sellers", href: "/#featured" },
];
const rightLinks = [
  { label: "About", href: "/#story" },
  { label: "Journal", href: "/#testimonials" },
  { label: "Contact", href: "/#footer" },
];

function BagButton() {
  const { count, pulse } = useCart();
  const controls = useAnimationControls();
  useEffect(() => {
    if (pulse > 0)
      void controls.start({
        rotate: [0, -12, 10, -6, 0],
        scale: [1, 1.15, 1],
        transition: { duration: 0.6 },
      });
  }, [pulse, controls]);
  return (
    <motion.button
      animate={controls}
      aria-label={`Shopping bag, ${count} items`}
      className="relative grid h-9 w-9 place-items-center text-cocoa transition-colors hover:text-burgundy"
    >
      <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.4} />
      <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-burgundy px-1 text-[0.55rem] font-medium text-on-dark">
        {count}
      </span>
    </motion.button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkCls =
    "link-underline eyebrow !text-[0.625rem] text-cocoa transition-colors hover:text-burgundy";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-all duration-500",
        scrolled
          ? "border-border/80 bg-ivory/80 shadow-soft backdrop-blur-md"
          : "border-transparent bg-ivory",
      )}
    >
      <nav className="mx-auto grid h-[68px] max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-4 md:h-[76px] md:px-10">
        {/* Left */}
        <div className="flex items-center gap-8">
          <Sheet>
            <SheetTrigger
              aria-label="Open menu"
              className="grid h-9 w-9 place-items-center text-cocoa lg:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1.4} />
            </SheetTrigger>
            <SheetContent side="left" className="w-[85%] border-border bg-ivory p-0 sm:max-w-sm">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex h-full flex-col px-8 pb-10 pt-14">
                <Logo className="self-start !items-start" />
                <ul className="mt-12 space-y-6">
                  {[...leftLinks, ...rightLinks].map((l) => (
                    <li key={l.label}>
                      <SheetClose asChild>
                        <a
                          href={l.href}
                          className="font-display text-2xl text-cocoa transition-colors hover:text-burgundy"
                        >
                          {l.label}
                        </a>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto border-t border-border pt-6 eyebrow text-taupe">
                  Complimentary shipping over $75
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <ul className="hidden items-center gap-8 lg:flex">
            {leftLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className={cn(linkCls, "inline-flex items-center gap-1")}>
                  {l.label}
                  {l.caret && <ChevronDown className="h-3 w-3" strokeWidth={1.5} />}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Center */}
        <Logo />

        {/* Right */}
        <div className="flex items-center justify-end gap-8">
          <ul className="hidden items-center gap-8 lg:flex">
            {rightLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className={linkCls}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1 md:gap-2">
            <button
              aria-label="Search"
              className="hidden h-9 w-9 place-items-center text-cocoa transition-colors hover:text-burgundy sm:grid"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.4} />
            </button>
            <button
              aria-label="Account"
              className="hidden h-9 w-9 place-items-center text-cocoa transition-colors hover:text-burgundy sm:grid"
            >
              <User className="h-[18px] w-[18px]" strokeWidth={1.4} />
            </button>
            <BagButton />
          </div>
        </div>
      </nav>
    </header>
  );
}
