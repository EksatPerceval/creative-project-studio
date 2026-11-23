import { describe, expect, it } from "vitest";

import { PRODUCTS, filterProducts, recommend } from "@/data/products";
import { waLink } from "@/data/site";

describe("fabric guide", () => {
  it("returns no recommendations until an occasion is chosen", () => {
    expect(recommend(PRODUCTS, { color: "terakota", motif: "geometris" })).toEqual([]);
  });

  it("only recommends fabrics suited to the chosen occasion and category", () => {
    const recs = recommend(PRODUCTS, { occasion: "wisuda", category: "lembaran" });
    expect(recs.length).toBeGreaterThan(0);
    for (const r of recs) {
      expect(r.product.occasions).toContain("wisuda");
      expect(r.product.category).toBe("lembaran");
    }
  });
});

describe("catalog", () => {
  it("search finds fabrics by motif name", () => {
    const res = filterProducts(PRODUCTS, { query: "pucuk rebung" });
    expect(res.map((p) => p.slug)).toContain("songket-pucuk-rebung-terakota");
  });
});

describe("whatsapp", () => {
  it("links to the studio number +62 819-9785-4765", () => {
    expect(waLink("Halo")).toBe("https://wa.me/6281997854765?text=Halo");
  });
});
