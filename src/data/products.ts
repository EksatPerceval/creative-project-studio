import { IMG } from "./images";

export type Category = "lembaran" | "pakaian" | "anak-muda";
export type Occasion = "pernikahan" | "wisuda" | "formal" | "kasual";
export type ColorTone = "terakota" | "maroon" | "pastel" | "gelap";
export type MotifType = "geometris" | "flora" | "minimalis";
export type Material = "katun" | "sutra" | "campuran";

export const CATEGORY_LABEL: Record<Category, string> = {
  lembaran: "Songket Lembaran",
  pakaian: "Pakaian & Selendang",
  "anak-muda": "Edisi Anak Muda",
};

export const OCCASION_LABEL: Record<Occasion, string> = {
  pernikahan: "Pernikahan & Adat",
  wisuda: "Wisuda",
  formal: "Acara Formal / Kantor",
  kasual: "Gaya Kasual Modern",
};

export const COLOR_LABEL: Record<ColorTone, string> = {
  terakota: "Terakota & Emas",
  maroon: "Merah Maroon",
  pastel: "Pastel Lembut",
  gelap: "Netral & Gelap",
};

export const MOTIF_LABEL: Record<MotifType, string> = {
  geometris: "Geometris Khas Jembrana",
  flora: "Flora Bali",
  minimalis: "Minimalis Modern",
};

export const MATERIAL_LABEL: Record<Material, string> = {
  katun: "Katun Organik",
  sutra: "Sutra Alam",
  campuran: "Serat Campuran",
};

export type Product = {
  slug: string;
  code: string;
  name: string;
  /** Short motif tag shown on the photo. */
  motifTag: string;
  /** Secondary badge on the photo (e.g. "Best Seller"). */
  badge?: string;
  category: Category;
  image?: string;
  gallery?: { src: string; label: string }[];
  motifName: string;
  material: Material;
  yarn: string;
  features: string;
  dimension: string;
  highlight: string;
  characteristic: string;
  weaveDays: number;
  price?: number;
  oldPrice?: number;
  stockNote?: string;
  occasions: Occasion[];
  colors: ColorTone[];
  motifType: MotifType;
  description?: string;
  matchReason: string;
  popularity: number;
  addedOrder: number;
};

export const PRODUCTS: Product[] = [
  {
    slug: "songket-pucuk-rebung-terakota",
    code: "SKT-JMB-084",
    name: "Songket Jembrana Motif Pucuk Rebung Terakota",
    motifTag: "Motif Pucuk Rebung",
    badge: "Adat & Wisuda",
    category: "lembaran",
    image: IMG.foldedTerracotta,
    gallery: [
      { src: IMG.detailMain, label: "Tampak Utama" },
      { src: IMG.softFabric, label: "Utuh Lembaran" },
      { src: IMG.goldMacro, label: "Serat Emas" },
      { src: IMG.drape, label: "Jatuh Kain" },
      { src: IMG.kebaya, label: "Gaya Kebaya" },
    ],
    motifName: "Pucuk Rebung Klasik Jembrana",
    material: "katun",
    yarn: "Katun Alami Halus & Benang Emas Kencana",
    features: "Katun Halus & Benang Emas • Tekstur Jatuh Lembut • Cocok: Resepsi / Wisuda",
    dimension: "200 cm × 105 cm",
    highlight: "Pewarna Alami",
    characteristic: "Halus, jatuh lemas, tidak kaku & adem",
    weaveDays: 35,
    price: 3850000,
    oldPrice: 4350000,
    stockNote: "Sisa 2 Lembar Siap Kirim",
    occasions: ["pernikahan", "wisuda", "formal"],
    colors: ["terakota"],
    motifType: "geometris",
    description:
      "Ditenun secara tradisional menggunakan ATBM dengan perpaduan benang katun ramah lingkungan dan kilau benang emas kencana khas Jembrana. Motif Pucuk Rebung melambangkan keteguhan moral, kesuburan, serta pembaruan hidup yang abadi, menghadirkan estetika mewah nan sakral untuk upacara adat maupun wisuda agung.",
    matchReason:
      "Sangat ideal untuk busana pernikahan adat agung Bali dan wisuda kehormatan dengan rona terakota hangat yang sakral.",
    popularity: 100,
    addedOrder: 3,
  },
  {
    slug: "selendang-songket-emerald-gold",
    code: "SKT-JMB-091",
    name: "Selendang Songket Emerald Gold",
    motifTag: "Motif Floral Jepun",
    badge: "Best Seller Selendang",
    category: "pakaian",
    image: IMG.emeraldSelendang,
    gallery: [
      { src: IMG.emeraldSelendang, label: "Tampak Utama" },
      { src: IMG.drape, label: "Jatuh Kain" },
    ],
    motifName: "Floral Jepun",
    material: "katun",
    yarn: "Katun Organik & Metallic Gold",
    features: "Katun Organik & Metallic Gold • Ringan • Padu-padan Kasual & Formal",
    dimension: "180 cm × 55 cm",
    highlight: "Siap Pakai",
    characteristic: "Ringan, lentur & mudah ditata",
    weaveDays: 14,
    price: 1450000,
    occasions: ["kasual", "formal", "wisuda"],
    colors: ["pastel"],
    motifType: "flora",
    matchReason: "Selendang ringan dengan motif bunga jepun yang mudah dipadukan untuk acara formal maupun kasual.",
    popularity: 95,
    addedOrder: 6,
  },
  {
    slug: "songket-ruby-maroon-kencana",
    code: "SKT-JMB-077",
    name: "Songket Jembrana Ruby Maroon Kencana",
    motifTag: "Bunga Jepun Marun",
    badge: "Koleksi Eksklusif",
    category: "lembaran",
    image: IMG.rubyMaroon,
    motifName: "Bunga Jepun Marun",
    material: "sutra",
    yarn: "Benang Sutra & Tembaga",
    features: "Benang Sutra & Tembaga • Berstruktur Megah • Upacara Adat Agung & Resepsi",
    dimension: "210 cm × 110 cm",
    highlight: "Tenun ATBM 40 Hari",
    characteristic: "Megah, berstruktur & berkilau",
    weaveDays: 40,
    price: 4650000,
    occasions: ["pernikahan", "formal"],
    colors: ["maroon"],
    motifType: "flora",
    matchReason: "Rona marun yang dalam dan benang tembaga memberi kesan agung untuk upacara adat dan resepsi.",
    popularity: 88,
    addedOrder: 4,
  },
  {
    slug: "shawl-songket-pastel-terracotta",
    code: "SKT-JMB-102",
    name: "Shawl Songket Pastel Terracotta",
    motifTag: "Geometris Kontemporer",
    badge: "Edisi Anak Muda",
    category: "anak-muda",
    image: IMG.pastelShawl,
    motifName: "Geometris Kontemporer",
    material: "campuran",
    yarn: "Serat Bambu Halus & Sutra Tipis",
    features: "Serat Bambu Halus & Sutra Tipis • Sejuk Nyaman • Daily & Semi-Formal",
    dimension: "175 cm × 60 cm",
    highlight: "Ringan & Breathable",
    characteristic: "Sangat ringan, sejuk & breathable",
    weaveDays: 12,
    price: 1250000,
    occasions: ["kasual", "wisuda"],
    colors: ["pastel", "terakota"],
    motifType: "minimalis",
    matchReason: "Warna pastel lembut dan serat bambu yang sejuk, pas untuk gaya harian dan semi-formal anak muda.",
    popularity: 80,
    addedOrder: 10,
  },
  {
    slug: "songket-heritage-gold-terracotta",
    code: "SKT-JMB-069",
    name: "Songket Heritage Gold Terracotta Adat",
    motifTag: "Patra Sari Jembrana",
    badge: "Adat Leluhur",
    category: "lembaran",
    image: IMG.heritageFolded,
    motifName: "Patra Geometris & Tunas Bambu",
    material: "katun",
    yarn: "Katun Tenun Tangan & Aksen Emas Padat",
    features: "Katun Tenun Tangan • Aksen Emas Padat • Sangat Mewah untuk Kebaya Pengantin",
    dimension: "200 cm × 110 cm",
    highlight: "Tenun 45 Hari",
    characteristic: "Megah, kokoh, tekstur rapat",
    weaveDays: 45,
    price: 3450000,
    occasions: ["pernikahan", "formal"],
    colors: ["terakota"],
    motifType: "geometris",
    matchReason:
      "Pilihan utama keluarga mempelai untuk kebaya adat agung, bernilai filosofis keluhuran dan keteduhan adat Jembrana.",
    popularity: 90,
    addedOrder: 2,
  },
  {
    slug: "songket-sudamala-cream-warm-gold",
    code: "SKT-JMB-073",
    name: "Songket Sudamala Cream Warm Gold",
    motifTag: "Motif Sudamala Suci",
    badge: "Wisuda Favorit",
    category: "lembaran",
    image: IMG.cream,
    motifName: "Sudamala Suci",
    material: "katun",
    yarn: "Katun Primissima & Benang Emas Halus",
    features: "Katun Primissima & Benang Emas Halus • Nuansa Suci & Elegan Bersih",
    dimension: "195 cm × 105 cm",
    highlight: "Bahan Lembut",
    characteristic: "Bersih, lembut & sakral",
    weaveDays: 40,
    price: 4100000,
    occasions: ["wisuda", "pernikahan"],
    colors: ["pastel"],
    motifType: "geometris",
    matchReason: "Nuansa krem bersih dengan kilau emas halus, favorit untuk wisuda dan upacara suci.",
    popularity: 85,
    addedOrder: 5,
  },
  {
    slug: "scarf-songket-cengkeh-mint-gold",
    code: "SKT-JMB-095",
    name: "Scarf Songket Cengkeh Mint Gold",
    motifTag: "Bunga Cengkeh",
    badge: "Aksen Hijab/Scarf",
    category: "anak-muda",
    image: IMG.emeraldSelendang,
    motifName: "Bunga Cengkeh",
    material: "campuran",
    yarn: "Kombinasi Rayon & Benang Emas",
    features: "Kombinasi Rayon & Benang Emas • Ringan & Berkilau Anggun",
    dimension: "185 cm × 65 cm",
    highlight: "Mudah Ditata",
    characteristic: "Ringan, berkilau & lentur",
    weaveDays: 10,
    price: 2250000,
    occasions: ["kasual", "formal"],
    colors: ["pastel", "gelap"],
    motifType: "flora",
    matchReason: "Scarf ringan yang mudah ditata sebagai aksen hijab atau syal untuk tampilan modern.",
    popularity: 78,
    addedOrder: 9,
  },
  {
    slug: "songket-sutra-subamia-deep-wine",
    code: "SKT-JMB-058",
    name: "Songket Sutra Subamia Deep Wine",
    motifTag: "Subamia Langka",
    badge: "Limited 1 of 3",
    category: "lembaran",
    image: IMG.redGoldFold,
    motifName: "Subamia",
    material: "sutra",
    yarn: "Sutra dengan Pewarna Batang Kayu & Daun",
    features: "Pewarna Batang Kayu & Daun • Kolektor Item • Sakral, Elegan & Bernilai",
    dimension: "215 cm × 110 cm",
    highlight: "Sertifikat Resmi",
    characteristic: "Sakral, elegan & bernilai koleksi",
    weaveDays: 50,
    price: 6200000,
    stockNote: "Limited 1 dari 3 Lembar",
    occasions: ["pernikahan", "formal"],
    colors: ["maroon"],
    motifType: "geometris",
    matchReason: "Sutra langka bernuansa anggur tua dengan pewarna alami, layak menjadi pusaka keluarga.",
    popularity: 70,
    addedOrder: 1,
  },
  {
    slug: "selendang-songket-tembaga-kencana",
    code: "SKT-JMB-099",
    name: "Selendang Songket Tembaga Kencana Modern",
    motifTag: "Geometris Minimalis",
    badge: "Edisi Selendang & Kamen",
    category: "pakaian",
    image: IMG.tembagaSelendang,
    motifName: "Geometris Minimalis Bali Barat",
    material: "sutra",
    yarn: "Serat Sutra & Benang Tembaga Berkilau",
    features: "Serat Sutra & Tembaga • Sangat Ringan • Fleksibel untuk Draping",
    dimension: "185 cm × 65 cm",
    highlight: "Fleksibel Draping",
    characteristic: "Sangat ringan, fleksibel untuk draping",
    weaveDays: 20,
    price: 1650000,
    occasions: ["pernikahan", "wisuda", "kasual"],
    colors: ["terakota"],
    motifType: "geometris",
    matchReason:
      "Sangat fleksibel dipadukan dengan kebaya modern untuk resepsi pernikahan malam maupun wisuda kehormatan.",
    popularity: 83,
    addedOrder: 7,
  },
  {
    slug: "songket-beras-tumpah",
    code: "SKT-JMB-061",
    name: "Songket Beras Tumpah",
    motifTag: "Beras Tumpah",
    badge: "Edisi Emas",
    category: "lembaran",
    image: IMG.berasTumpah,
    motifName: "Beras Tumpah",
    material: "sutra",
    yarn: "Sutra & Benang Emas Padat",
    features: "Sutra & Benang Emas Padat • Simbol Kemakmuran • Upacara Adat",
    dimension: "200 cm × 105 cm",
    highlight: "21 Hari Tenun",
    characteristic: "Berkilau, padat & mewah",
    weaveDays: 21,
    price: 4850000,
    occasions: ["pernikahan", "formal"],
    colors: ["terakota"],
    motifType: "geometris",
    matchReason: "Taburan motif emas yang padat melambangkan kemakmuran, cocok untuk upacara adat besar.",
    popularity: 76,
    addedOrder: 8,
  },
  {
    slug: "selendang-pucuk-rebung-abu",
    code: "SKT-JMB-104",
    name: "Selendang Pucuk Rebung Abu Klasik",
    motifTag: "Pucuk Rebung",
    badge: "Klasik",
    category: "pakaian",
    image: IMG.greyScarf,
    motifName: "Pucuk Rebung",
    material: "katun",
    yarn: "Katun Halus & Benang Perak",
    features: "Katun Halus & Benang Perak • Netral & Elegan • Kantor & Formal",
    dimension: "180 cm × 50 cm",
    highlight: "12 Hari Tenun",
    characteristic: "Lembut, netral & elegan",
    weaveDays: 12,
    price: 1950000,
    occasions: ["formal", "kasual"],
    colors: ["gelap"],
    motifType: "geometris",
    matchReason: "Nuansa abu netral yang elegan untuk acara kantor dan formal tanpa terlihat berlebihan.",
    popularity: 72,
    addedOrder: 12,
  },
  {
    slug: "songket-bintang-jembrana",
    code: "SKT-JMB-066",
    name: "Songket Bintang Jembrana",
    motifTag: "Motif Bintang",
    badge: "Kurasi Khusus",
    category: "lembaran",
    image: IMG.bintang,
    motifName: "Bintang Jembrana",
    material: "sutra",
    yarn: "Sutra Alam & Benang Emas",
    features: "Sutra Alam & Benang Emas • Corak Bintang • Resepsi & Adat",
    dimension: "205 cm × 110 cm",
    highlight: "28 Hari Tenun",
    characteristic: "Anggun, berkilau & berwibawa",
    weaveDays: 28,
    price: 5400000,
    occasions: ["pernikahan", "formal"],
    colors: ["maroon"],
    motifType: "geometris",
    matchReason: "Corak bintang di atas sutra merah tua memberi kesan berwibawa untuk resepsi keluarga.",
    popularity: 74,
    addedOrder: 11,
  },
  {
    slug: "set-kebaya-tenun-anggun",
    code: "SKT-JMB-110",
    name: "Set Kebaya Tenun Anggun",
    motifTag: "Siap Pakai",
    badge: "Terbaru",
    category: "pakaian",
    image: IMG.kebayaSet,
    motifName: "Patra Sari Modern",
    material: "katun",
    yarn: "Katun Halus & Benang Emas",
    features: "Kamen Songket & Selendang • Siap Pakai • Wisuda & Resepsi",
    dimension: "Set Kamen + Selendang",
    highlight: "Siap Pakai",
    characteristic: "Praktis, rapi & anggun",
    weaveDays: 16,
    price: 3250000,
    occasions: ["wisuda", "pernikahan", "formal"],
    colors: ["terakota", "pastel"],
    motifType: "flora",
    matchReason: "Set siap pakai yang praktis untuk wisuda dan resepsi tanpa repot memadupadankan.",
    popularity: 82,
    addedOrder: 13,
  },
  {
    slug: "udeng-songket-jembrana",
    code: "SKT-JMB-112",
    name: "Udeng Songket Jembrana",
    motifTag: "Aksesori Pria",
    badge: "Populer",
    category: "pakaian",
    image: IMG.udeng,
    motifName: "Geometris Jembrana",
    material: "katun",
    yarn: "Katun & Benang Perak",
    features: "Katun & Benang Perak • Aksesori Kepala Pria • Upacara & Adat",
    dimension: "100 cm × 100 cm",
    highlight: "5 Hari Tenun",
    characteristic: "Kokoh, mudah dibentuk",
    weaveDays: 5,
    price: 650000,
    occasions: ["pernikahan", "formal"],
    colors: ["gelap"],
    motifType: "geometris",
    matchReason: "Udeng berbahan songket untuk melengkapi busana adat pria dengan rapi.",
    popularity: 86,
    addedOrder: 14,
  },
  {
    slug: "songket-sekar-jagat",
    code: "SKT-JMB-071",
    name: "Songket Jembrana Motif Sekar Jagat",
    motifTag: "Sekar Jagat",
    badge: "Klasik",
    category: "lembaran",
    image: IMG.sekarJagat,
    motifName: "Sekar Jagat",
    material: "sutra",
    yarn: "Sutra & Benang Emas Murni",
    features: "Sutra & Benang Emas Murni • Ragam Bunga Dunia • Upacara Adat",
    dimension: "200 cm × 105 cm",
    highlight: "18 Hari Tenun",
    characteristic: "Ramai, cerah & penuh makna",
    weaveDays: 18,
    price: 4200000,
    occasions: ["pernikahan", "wisuda"],
    colors: ["terakota", "pastel"],
    motifType: "flora",
    matchReason: "Ragam bunga Sekar Jagat melambangkan keindahan dunia, cocok untuk perayaan penuh suka cita.",
    popularity: 79,
    addedOrder: 15,
  },
  {
    slug: "songket-motif-klasik-edisi-khusus",
    code: "SKT-JMB-ARS",
    name: "Songket Jembrana Motif Klasik (Edisi Khusus)",
    motifTag: "Koleksi Arsip",
    badge: "Edisi Khusus",
    category: "lembaran",
    motifName: "Motif Klasik Arsip",
    material: "sutra",
    yarn: "Detail tersedia via konsultasi",
    features: "Deskripsi detail tersedia melalui konsultasi WhatsApp",
    dimension: "Menyesuaikan pesanan",
    highlight: "Pre-order",
    characteristic: "Ditentukan bersama kurator",
    weaveDays: 60,
    occasions: ["pernikahan", "formal"],
    colors: ["gelap"],
    motifType: "geometris",
    matchReason: "Motif arsip yang ditenun ulang khusus sesuai permintaan keluarga.",
    popularity: 60,
    addedOrder: 16,
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export type SortKey = "populer" | "adat" | "ringan" | "terbaru";

export const SORT_LABEL: Record<SortKey, string> = {
  populer: "Paling Diminati",
  adat: "Rekomendasi Adat",
  ringan: "Paling Ringan (Daily)",
  terbaru: "Terbaru di Alat Tenun",
};

export type CatalogFilter = {
  query?: string;
  category?: Category;
  occasion?: Occasion;
  color?: ColorTone;
  motif?: MotifType;
  material?: Material;
  sort?: SortKey;
};

/** Filters and sorts the catalog for the storefront grid. */
export function filterProducts(list: Product[], f: CatalogFilter): Product[] {
  const q = f.query?.trim().toLowerCase();
  const out = list.filter((p) => {
    if (f.category && p.category !== f.category) return false;
    if (f.occasion && !p.occasions.includes(f.occasion)) return false;
    if (f.color && !p.colors.includes(f.color)) return false;
    if (f.motif && p.motifType !== f.motif) return false;
    if (f.material && p.material !== f.material) return false;
    if (q) {
      const hay = [p.name, p.motifTag, p.motifName, p.yarn, p.features, CATEGORY_LABEL[p.category], ...p.colors.map((c) => COLOR_LABEL[c])]
        .join(" ")
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
  const sort = f.sort ?? "populer";
  const sorted = [...out];
  if (sort === "populer") sorted.sort((a, b) => b.popularity - a.popularity);
  if (sort === "adat")
    sorted.sort(
      (a, b) => Number(b.occasions.includes("pernikahan")) - Number(a.occasions.includes("pernikahan")) || b.weaveDays - a.weaveDays,
    );
  if (sort === "ringan") sorted.sort((a, b) => a.weaveDays - b.weaveDays);
  if (sort === "terbaru") sorted.sort((a, b) => b.addedOrder - a.addedOrder);
  return sorted;
}

export type GuidePrefs = {
  occasion?: Occasion;
  category?: Category | "semua";
  color?: ColorTone;
  motif?: MotifType;
};

export type Recommendation = { product: Product; score: number };

/**
 * Recommends fabrics for the preference guide. The occasion is required and must
 * match; category must match when chosen; color and motif raise the score.
 */
export function recommend(list: Product[], prefs: GuidePrefs): Recommendation[] {
  if (!prefs.occasion) return [];
  const occasion = prefs.occasion;
  return list
    .filter((p) => p.occasions.includes(occasion))
    .filter((p) => !prefs.category || prefs.category === "semua" || p.category === prefs.category)
    .filter((p) => !prefs.color || p.colors.includes(prefs.color))
    .map((p) => {
      let score = 80;
      if (p.occasions[0] === occasion) score += 6;
      if (prefs.motif && p.motifType === prefs.motif) score += 10;
      else if (prefs.motif) score -= 12;
      if (p.image) score += 2;
      return { product: p, score: Math.min(98, score) };
    })
    .filter((r) => r.score >= 75)
    .sort((a, b) => b.score - a.score || b.product.popularity - a.product.popularity);
}
