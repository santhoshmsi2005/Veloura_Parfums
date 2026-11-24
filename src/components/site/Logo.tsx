import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <Link
      to="/"
      aria-label="Veloura Parfums — home"
      className={cn("inline-flex flex-col items-center leading-none", className)}
    >
      <span
        className={cn(
          "font-display text-[1.9rem] font-medium tracking-[0.01em] md:text-[2.25rem]",
          tone === "dark" ? "text-burgundy" : "text-on-dark",
        )}
      >
        Veloura
      </span>
      <span
        className={cn(
          "mt-1 text-[0.5rem] tracking-[0.55em] pl-[0.55em]",
          tone === "dark" ? "text-cocoa/80" : "text-champagne",
        )}
      >
        PARFUMS
      </span>
    </Link>
  );
}
