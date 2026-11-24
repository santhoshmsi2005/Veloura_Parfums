import { describe, expect, it } from "vitest";
import { products, formatPrice } from "@/data/catalog";

const priceOf = (name: string) => products.find((p) => p.name === name)?.price;

describe("Featured fragrance prices", () => {
  it("L'Amour is $120", () => expect(priceOf("L'Amour")).toBe(120));
  it("Rose Noir is $145", () => expect(priceOf("Rose Noir")).toBe(145));
  it("Eau de Lumière is $110", () => expect(priceOf("Eau de Lumière")).toBe(110));
  it("Jardin Secret is $135", () => expect(priceOf("Jardin Secret")).toBe(135));
  it("Veloura Intense is $160", () => expect(priceOf("Veloura Intense")).toBe(160));
  it("formats prices in US dollars", () => expect(formatPrice(120)).toBe("$120.00"));
});
