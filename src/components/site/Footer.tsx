import { Facebook, Instagram, RotateCcw, ShieldCheck, Truck, Youtube } from "lucide-react";
import { Logo } from "./Logo";

const columns = [
  { title: "Shop", links: ["All Fragrances", "Best Sellers", "New Arrivals", "Gift Sets"] },
  {
    title: "Collections",
    links: ["Floral Bouquets", "Warm & Sensual", "Fresh & Radiant", "Exclusive Collection"],
  },
  { title: "Customer Care", links: ["Shipping & Returns", "FAQ", "Contact Us", "Track Order"] },
  { title: "About", links: ["Our Story", "Ingredients", "Sustainability", "Craftsmanship"] },
];

const perks = [
  { icon: Truck, title: "Complimentary shipping", text: "On orders over $75" },
  { icon: RotateCcw, title: "Easy returns", text: "30-day return policy" },
  { icon: ShieldCheck, title: "Secure payments", text: "Shop with confidence" },
];

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="9.5" />
      <path
        d="M10.5 20.5 12.4 13M10 11.4c0-2 1.4-3.4 3.2-3.4 1.7 0 2.8 1.2 2.8 2.8 0 2-1 3.8-2.6 3.8-.9 0-1.5-.7-1.3-1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

const socials = [
  { icon: Instagram, label: "Instagram" },
  { icon: Facebook, label: "Facebook" },
  { icon: PinterestIcon, label: "Pinterest" },
  { icon: Youtube, label: "YouTube" },
];

const payments = ["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay"];

export function Footer() {
  return (
    <footer id="footer" className="grain-light bg-wine text-on-dark">
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 pb-8 pt-14 md:px-10 md:pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2.6fr_1.2fr] lg:gap-10">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Logo tone="light" className="lg:!items-start" />
            <p className="mt-5 max-w-[16rem] text-[0.8rem] leading-relaxed text-on-dark-muted">
              Timeless fragrances. Unforgettable presence.
            </p>
            <ul className="mt-6 flex gap-3">
              {socials.map(({ icon: Icon, label }) => (
                <li key={label}>
                  <a
                    href="#footer"
                    aria-label={label}
                    className="grid h-9 w-9 place-items-center rounded-full border border-line-dark text-on-dark-muted transition-all duration-500 hover:border-champagne hover:text-champagne"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.4} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="eyebrow !text-[0.62rem] text-champagne">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#footer"
                        className="text-[0.8rem] text-on-dark-muted transition-colors duration-300 hover:text-on-dark"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <ul className="grid gap-5 border-t border-line-dark pt-8 sm:grid-cols-3 lg:grid-cols-1 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            {perks.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex items-center gap-4">
                <Icon className="h-6 w-6 shrink-0 text-champagne" strokeWidth={1.1} />
                <div>
                  <p className="eyebrow !text-[0.6rem] text-on-dark">{title}</p>
                  <p className="mt-1 text-[0.75rem] text-on-dark-muted">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 flex flex-col items-center gap-5 border-t border-line-dark pt-6 text-[0.7rem] text-on-dark-muted md:flex-row md:justify-between">
          <p>© 2026 Veloura Parfums. All rights reserved.</p>
          <ul className="flex flex-wrap justify-center gap-2" aria-label="Accepted payment methods">
            {payments.map((p) => (
              <li
                key={p}
                className="rounded-sm border border-line-dark px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.14em] text-on-dark"
              >
                {p}
              </li>
            ))}
          </ul>
          <div className="flex gap-6">
            <a href="#footer" className="link-underline">
              Privacy Policy
            </a>
            <a href="#footer" className="link-underline">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
