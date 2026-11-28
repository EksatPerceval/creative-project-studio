import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { Chip } from "@/components/site/Chip";
import { Icon } from "@/components/site/Icon";
import { ProductCard } from "@/components/site/ProductCard";
import { IMG } from "@/data/images";
import {
  CATEGORY_LABEL,
  COLOR_LABEL,
  MATERIAL_LABEL,
  MOTIF_LABEL,
  OCCASION_LABEL,
  PRODUCTS,
  SORT_LABEL,
  filterProducts,
  type Category,
  type ColorTone,
  type Material,
  type MotifType,
  type Occasion,
  type SortKey,
} from "@/data/products";
import { SITE, waLink } from "@/data/site";

type CatalogSearch = { q?: string };

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): CatalogSearch =>
    typeof search['q'] === "string" && search['q'].trim() ? { q: search['q'] } : {},
  head: () => ({
    meta: [
      { title: "Katalog Songket Asli Jembrana — Tenun PutriMas" },
      {
        name: "description",
        content:
          "Koleksi tenun songket tangan asli Jembrana: kain lembaran, selendang & edisi anak muda dengan pewarna alami. Pesan via WhatsApp.",
      },
      { property: "og:title", content: "Katalog Songket Asli Jembrana — Tenun PutriMas" },
      {
        property: "og:description",
        content: "Tenun songket tangan asli Jembrana untuk adat, wisuda & gaya modern. Pesan langsung via WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: IMG.heroHanging },
      { name: "twitter:image", content: IMG.heroHanging },
    ],
  }),
  component: CatalogPage,
});

const CATEGORIES: (Category | "semua")[] = ["semua", "lembaran", "pakaian", "anak-muda"];

function PillSelect<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T | undefined;
  options: Record<T, string>;
  onChange: (v: T | undefined) => void;
}) {
  return (
    <label
      className={
        value
          ? "relative inline-flex items-center rounded-full border border-primary bg-primary-soft text-primary-soft-foreground"
          : "relative inline-flex items-center rounded-full border border-border bg-card text-foreground"
      }
    >
      <span className="sr-only">{label}</span>
      <select
        value={value ?? ""}
        onChange={(e) => onChange((e.target.value || undefined) as T | undefined)}
        className="cursor-pointer appearance-none bg-transparent py-1 pl-3 pr-7 text-xs font-medium outline-none"
      >
        <option value="">{label}: Semua</option>
        {(Object.keys(options) as T[]).map((k) => (
          <option key={k} value={k}>
            {label}: {options[k]}
          </option>
        ))}
      </select>
      <Icon name="expand_more" className="pointer-events-none absolute right-2 text-[16px]" />
    </label>
  );
}

function CatalogPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate({ from: "/" });
  const [category, setCategory] = useState<Category | "semua">("semua");
  const [occasion, setOccasion] = useState<Occasion>();
  const [color, setColor] = useState<ColorTone>();
  const [motif, setMotif] = useState<MotifType>();
  const [material, setMaterial] = useState<Material>();
  const [sort, setSort] = useState<SortKey>("populer");
  const [mobileQuery, setMobileQuery] = useState(q ?? "");

  useEffect(() => setMobileQuery(q ?? ""), [q]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { semua: PRODUCTS.length };
    for (const p of PRODUCTS) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, []);

  const results = useMemo(
    () =>
      filterProducts(PRODUCTS, {
        ...(q ? { query: q } : {}),
        ...(category !== "semua" ? { category } : {}),
        ...(occasion ? { occasion } : {}),
        ...(color ? { color } : {}),
        ...(motif ? { motif } : {}),
        ...(material ? { material } : {}),
        sort,
      }),
    [q, category, occasion, color, motif, material, sort],
  );

  const hasFilters = Boolean(q || occasion || color || motif || material || category !== "semua");

  function resetAll() {
    setCategory("semua");
    setOccasion(undefined);
    setColor(undefined);
    setMotif(undefined);
    setMaterial(undefined);
    void navigate({ search: {} });
  }

  return (
    <div className="container-page space-y-5 py-4 md:py-6">
      {/* Desktop promo banner */}
      <section className="bg-warm-gradient relative hidden overflow-hidden rounded-2xl border border-border p-5 md:flex md:items-center md:gap-8">
        <div className="flex-1">
          <span className="inline-flex items-center gap-2 rounded-full bg-card px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-foreground shadow-card">
            <span className="size-2 rounded-full bg-tertiary" />
            Koleksi Autentik Jembrana 2025
          </span>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-foreground lg:text-[26px]">
            Tenun Songket Asli Jembrana — <span className="text-primary">Koleksi & Busana Modern</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground lg:text-base">
            100% tenun tangan ramah lingkungan untuk busana upacara adat, wisuda, hingga padu-padan kasual anak muda.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link
              to="/panduan"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary-glow"
            >
              <Icon name="tune" className="text-[18px]" />
              Bantu Pilih Kain (Panduan Preferensi)
            </Link>
            <span className="text-xs text-muted-foreground">Bebas konsultasi warna & motif langsung ke penenun</span>
          </div>
        </div>
        <div className="relative h-32 w-64 shrink-0 overflow-hidden rounded-xl shadow-card">
          <img src={IMG.heroHanging} alt="Kain songket Jembrana terbentang di atelier" className="size-full object-cover" />
          <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 text-[11px] font-medium text-primary-foreground">
            <Icon name="eco" className="text-[14px]" />
            Pewarna Tumbuhan Alami
          </span>
        </div>
      </section>

      {/* Mobile hero */}
      <section className="relative overflow-hidden rounded-2xl md:hidden">
        <img src={IMG.heroHanging} alt="Kain songket Jembrana di atelier" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/50 to-ink/10" />
        <div className="relative flex min-h-48 flex-col justify-between p-5">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-card/95 px-2.5 py-1 text-xs font-medium text-foreground">
            <Icon name="verified" filled className="text-[16px] text-tertiary" />
            Tenun Tangan Asli Jembrana
          </span>
          <div>
            <h1 className="mt-6 text-[22px] font-bold leading-tight text-primary-foreground">
              Keanggunan Wastra Songket Jembrana
            </h1>
            <div className="mt-3 flex gap-2">
              <a
                href="#koleksi"
                className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
              >
                Jelajahi Koleksi <Icon name="arrow_downward" className="text-[18px]" />
              </a>
              <Link
                to="/panduan"
                className="inline-flex items-center gap-1.5 rounded-lg bg-card/90 px-3 py-2 text-sm font-medium text-foreground"
              >
                <Icon name="menu_book" className="text-[18px] text-primary" /> Panduan Kain
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile search */}
      <form
        id="cari"
        role="search"
        className="relative scroll-mt-24 md:hidden"
        onSubmit={(e) => {
          e.preventDefault();
          const v = mobileQuery.trim();
          void navigate({ search: v ? { q: v } : {} });
        }}
      >
        <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-foreground" />
        <input
          value={mobileQuery}
          onChange={(e) => setMobileQuery(e.target.value)}
          placeholder="Cari motif songket, warna, atau benang..."
          aria-label="Cari songket"
          className="h-12 w-full rounded-xl bg-muted pl-11 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40"
        />
      </form>

      {/* Filter bar */}
      <section className="sticky top-16 z-30 -mx-4 bg-background/95 px-4 py-2 backdrop-blur-md md:static md:mx-0 md:rounded-2xl md:border md:border-border md:bg-card md:p-0 lg:top-20">
        <div className="flex items-center gap-2 md:flex-wrap md:justify-between md:px-4 md:pt-3">
          <div className="scrollbar-none flex gap-2 overflow-x-auto">
            {CATEGORIES.map((c) => (
              <Chip key={c} selected={category === c} onClick={() => setCategory(c)} className="shrink-0 md:py-1.5">
                {c === "semua" ? "Semua Koleksi" : CATEGORY_LABEL[c]}
                <span className="hidden md:inline">({counts[c] ?? 0})</span>
              </Chip>
            ))}
          </div>
          <div className="hidden items-center gap-3 text-xs text-muted-foreground md:flex">
            <span>
              Menampilkan {results.length} dari {PRODUCTS.length} kain
            </span>
            <label className="flex items-center gap-2">
              Urutkan:
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="h-7 rounded-md border border-border bg-background px-2 text-xs text-foreground outline-none"
              >
                {(Object.keys(SORT_LABEL) as SortKey[]).map((k) => (
                  <option key={k} value={k}>
                    {SORT_LABEL[k]}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div className="mt-3 hidden flex-wrap items-center gap-2 border-t border-border px-4 py-2.5 md:flex">
          <span className="mr-1 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            <Icon name="filter_list" className="text-[18px]" /> Sesuaikan:
          </span>
          <PillSelect label="Acara" value={occasion} options={OCCASION_LABEL} onChange={setOccasion} />
          <PillSelect label="Warna" value={color} options={COLOR_LABEL} onChange={setColor} />
          <PillSelect label="Motif" value={motif} options={MOTIF_LABEL} onChange={setMotif} />
          <PillSelect label="Bahan" value={material} options={MATERIAL_LABEL} onChange={setMaterial} />
          {hasFilters ? (
            <button type="button" onClick={resetAll} className="text-xs font-medium text-primary hover:underline">
              Hapus filter
            </button>
          ) : null}
          <Link
            to="/panduan"
            className="ml-auto inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground hover:bg-accent/80"
          >
            <Icon name="auto_awesome" className="text-[16px]" />
            Rekomendasi Untukmu
          </Link>
        </div>
      </section>

      {/* Grid */}
      <section id="koleksi" className="scroll-mt-32">
        <div className="mb-3 flex items-baseline justify-between md:hidden">
          <h2 className="text-lg font-semibold">{q ? `Hasil "${q}"` : "Koleksi Pilihan"}</h2>
          <span className="text-xs text-muted-foreground">{results.length} Wastra Tersedia</span>
        </div>
        {q ? (
          <p className="mb-3 hidden text-sm text-muted-foreground md:block">
            Hasil pencarian untuk <span className="font-semibold text-foreground">"{q}"</span>
          </p>
        ) : null}

        {results.length ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            {results.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <div className="surface-card flex flex-col items-center px-6 py-14 text-center">
            <span className="grid size-16 place-items-center rounded-2xl bg-muted text-primary">
              <Icon name="search_off" className="text-[30px]" />
            </span>
            <h3 className="mt-4 text-lg font-semibold">Motif tidak ditemukan</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Coba kata kunci lain atau pilih kategori Semua. Kurator kami juga siap membantu mencarikan kain.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={resetAll}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-glow"
              >
                <Icon name="restart_alt" className="text-[18px]" /> Lihat Semua Koleksi
              </button>
              <a
                href={waLink(`Halo, saya mencari songket${q ? ` "${q}"` : ""}. Apakah tersedia?`)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-whatsapp px-4 py-2 text-sm font-medium text-whatsapp-foreground hover:bg-whatsapp-hover"
              >
                <Icon name="chat" className="text-[18px]" /> Tanya Kurator
              </a>
            </div>
          </div>
        )}
      </section>

      {/* Trust strip (desktop) */}
      <section className="hidden gap-6 rounded-2xl border border-border bg-surface-low p-6 md:grid md:grid-cols-3">
        {[
          {
            icon: "handshake",
            title: "Tenun Tangan Asli Jembrana",
            body: "Ditenun menggunakan alat tenun bukan mesin (ATBM) tradisional oleh para perempuan perajin di Pendem & Jembrana. Membantu ekonomi mandiri ibu-ibu pengrajin desa.",
          },
          {
            icon: "eco",
            title: "Konsep Back to Nature",
            body: "Mengutamakan serat alami ramah lingkungan serta pewarna tumbuhan asli Bali barat (tarum, mahoni, secang) yang lembut dan aman bersentuhan dengan kulit sensitif.",
          },
          {
            icon: "school",
            title: "Program Pelatihan Tenun",
            body: "Menerima kunjungan edukasi, magang pelajar, pelatihan regenerasi penenun muda, serta pesanan seragam instansi resmi.",
            link: true,
          },
        ].map((f) => (
          <div key={f.title} className="flex gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
              <Icon name={f.icon} />
            </span>
            <div>
              <h3 className="font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{f.body}</p>
              {f.link ? (
                <Link to="/pelatihan" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Info Pelatihan Tenun <Icon name="arrow_forward" className="text-[16px]" />
                </Link>
              ) : null}
            </div>
          </div>
        ))}
      </section>

      {/* Concierge (mobile) */}
      <section className="rounded-2xl bg-surface-low p-5 md:hidden">
        <div className="flex gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
            <Icon name="support_agent" />
          </span>
          <div>
            <p className="eyebrow">Layanan Concierge Pribadi</p>
            <h2 className="mt-1 text-lg font-semibold leading-snug">Konsultasi Langsung dengan Penenun</h2>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Tanpa keranjang belanja yang rumit. Diskusikan ketersediaan motif, ukuran khusus, atau pemesanan seragam adat
              langsung via WhatsApp.
            </p>
          </div>
        </div>
        <a
          href={waLink()}
          target="_blank"
          rel="noreferrer"
          className="mt-4 flex items-center gap-3 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
        >
          <Icon name="chat" /> Chat WhatsApp ({SITE.whatsappDisplay})
        </a>
      </section>
    </div>
  );
}
