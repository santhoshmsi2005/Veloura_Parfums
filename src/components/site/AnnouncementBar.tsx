import { Gift, Sparkles, Truck } from "lucide-react";
import { Fragment } from "react";

const messages = [
  { icon: Truck, text: "Complimentary Shipping on Orders Over $75" },
  { icon: Sparkles, text: "Sample Every Order" },
  { icon: Gift, text: "Luxury Gift Wrapping" },
];

export function AnnouncementBar() {
  return (
    <div className="bg-wine text-on-dark">
      <div className="mx-auto flex h-8 max-w-[1440px] items-center justify-center gap-5 overflow-hidden px-4 text-[0.625rem] uppercase tracking-[0.22em]">
        {messages.map(({ icon: Icon, text }, i) => (
          <Fragment key={text}>
            {i > 0 && (
              <span className="hidden h-1 w-1 rotate-45 bg-champagne md:block" aria-hidden />
            )}
            <p
              className={
                i === 0
                  ? "flex items-center gap-2 whitespace-nowrap"
                  : "hidden items-center gap-2 whitespace-nowrap md:flex"
              }
            >
              <Icon className="h-3 w-3 text-champagne" strokeWidth={1.5} />
              {text}
            </p>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
