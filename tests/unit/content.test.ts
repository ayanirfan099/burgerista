import { describe, it, expect } from "vitest";
import {
  filterProducts,
  products,
  locations,
  brand,
  stages,
} from "../../src/lib/content";
describe("product browsing and content integrity", () => {
  it("keeps all products available through the All filter", () =>
    expect(filterProducts("Alle")).toHaveLength(products.length));
  it("isolates chicken and veggie categories", () => {
    expect(filterProducts("Chicken").map((p) => p.name)).toEqual([
      "V.I.B. Chicken",
    ]);
    expect(filterProducts("Veggie").map((p) => p.name)).toEqual([
      "Superveggie",
    ]);
    expect(filterProducts("Beef").every((p) => !p.vegetarian)).toBe(true);
  });
  it("does not fabricate prices, allergens, addresses or ordering endpoints", () => {
    expect(
      products.every(
        (p) =>
          p.price === null &&
          p.allergens === null &&
          p.availability === "Unbestätigt",
      ),
    ).toBe(true);
    expect(locations).toHaveLength(0);
    expect(products.every((p) => p.orderUrl === brand.menu)).toBe(true);
  });
  it("uses distinct identifiers and seven story stages", () => {
    expect(new Set(products.map((p) => p.id)).size).toBe(products.length);
    expect(stages).toHaveLength(7);
  });
});
