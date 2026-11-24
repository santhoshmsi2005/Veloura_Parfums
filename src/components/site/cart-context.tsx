import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

interface CartState {
  count: number;
  pulse: number;
  add: () => void;
  wishlist: ReadonlySet<string>;
  toggleWish: (id: string) => void;
}

const CartContext = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);
  const [pulse, setPulse] = useState(0);
  const [wishlist, setWishlist] = useState<ReadonlySet<string>>(() => new Set());

  const add = useCallback(() => {
    setCount((c) => c + 1);
    setPulse((p) => p + 1);
  }, []);

  const toggleWish = useCallback((id: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ count, pulse, add, wishlist, toggleWish }),
    [count, pulse, add, wishlist, toggleWish],
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
