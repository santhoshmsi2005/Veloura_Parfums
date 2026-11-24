import { cn } from "@/lib/utils";

/** Thin gold rule with a tiny diamond — used under section titles. */
export function Ornament({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center justify-center gap-2 text-champagne", className)}
      aria-hidden
    >
      <span className="h-px w-10 bg-champagne/60" />
      <svg width="8" height="8" viewBox="0 0 8 8" className="fill-current">
        <path d="M4 0 8 4 4 8 0 4Z" />
      </svg>
      <span className="h-px w-10 bg-champagne/60" />
    </div>
  );
}

/** Delicate line-art flower used as decoration on dark sections. */
export function FloralSprig({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      className={className}
      aria-hidden
    >
      <path d="M100 190 C100 150 96 120 100 80" />
      <path d="M100 140 C80 130 66 112 64 92 C82 98 96 114 100 140Z" />
      <path d="M100 120 C120 112 134 96 138 76 C118 80 104 96 100 120Z" />
      <path d="M100 80 C92 66 92 52 100 38 C108 52 108 66 100 80Z" />
      <path d="M100 80 C86 74 76 62 74 48 C88 52 98 64 100 80Z" />
      <path d="M100 80 C114 74 124 62 126 48 C112 52 102 64 100 80Z" />
      <path d="M100 80 C90 82 80 78 72 70" />
      <path d="M100 80 C110 82 120 78 128 70" />
      <circle cx="100" cy="58" r="3" />
      <path d="M64 92 C56 88 48 90 42 96" />
      <path d="M138 76 C146 72 154 74 160 80" />
    </svg>
  );
}
