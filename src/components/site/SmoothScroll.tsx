import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    // Respect reduced-motion preferences
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.5,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Smooth scroll for anchor link clicks
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLAnchorElement>("a[href*='#']");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Extract the hash part
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;
      const hash = href.slice(hashIndex);

      // Check if it targets the current page
      const isCurrentPage =
        href.startsWith("#") ||
        target.pathname === window.location.pathname ||
        (target.pathname === "/" && window.location.pathname === "/");

      if (isCurrentPage) {
        if (hash === "#" || hash === "#top") {
          e.preventDefault();
          lenis.scrollTo(0, { duration: 1.2 });
          return;
        }

        try {
          const element = document.querySelector(hash);
          if (element) {
            e.preventDefault();
            lenis.scrollTo(element as HTMLElement, { offset: -84, duration: 1.3 });
            if (window.history.pushState) {
              window.history.pushState(null, "", hash);
            }
          }
        } catch {
          // In case selector is invalid
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
