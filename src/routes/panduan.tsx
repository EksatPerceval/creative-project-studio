import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useRef, useState, type ReactNode } from "react";

import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Chip } from "@/components/site/Chip";
import { Icon } from "@/components/site/Icon";
import { orderMessage, PriceOrCurator, ProductImage } from "@/components/site/ProductCard";
import {
  CATEGORY_LABEL,
  COLOR_LABEL,
  MOTIF_LABEL,
  OCCASION_LABEL,
  PRODUCTS,
  recommend,
  type Category,
  type ColorTone,
  type GuidePrefs,
  type MotifType,
  type Occasion,
} from "@/data/products";
import { waLink } from "@/data/site";

export const Route = createFileRoute("/panduan")({
  head: () => ({
    meta: [
      { title: "Panduan Pemilihan Kain Songket — Tenun PutriMas" },
      {
        name: "description",
        content: "Pilih acara, warna dan motif untuk menemukan kain songket Jembrana yang paling sesuai untukmu.",
      },
      { property: "og:title", content: "Panduan Pemilihan Kain Songket — Tenun PutriMas" },
      {
        property: "og:description",
        content: "Temukan songket Jembrana yang cocok untuk pernikahan, wisuda, kantor atau gaya kasual.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GuidePage,
});

const COLOR_DOT: Record<ColorTone, string> = {
  terakota: "bg-primary-soft",
  maroon: "bg-destructive",
  pastel: "bg-surface-highest",
  gelap: "bg-ink",
};

const DEFAULT_PREFS: GuidePrefs = {
  occasion: "pernikahan",
  category: "lembaran",
  color: "terakota",
  motif: "geometris",
};

function GuideGroup({ title, required, children }: { title: string; required?: boolean; children: ReactNode }) {
  return (
    <fieldset className="rounded-xl bg-transparent md:bg-card md:p-4 md:shadow-card">
      <legend className="float-left mb-2.5 w-full text-sm font-semibold text-foreground md:text-base">
        {title} {required ? <span className="text-sm font-medium text-primary">*Wajib</span> : null}
      </legend>
      <div className="clear-both flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

function GuidePage() {
  const [prefs, setPrefs] = useState<GuidePrefs>(DEFAULT_PREFS);
  const [applied, setApplied] = useState<GuidePrefs | null>(DEFAULT_PREFS);
  const [warning, setWarning] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const preview = useMemo(() => recommend(PRODUCTS, prefs), [prefs]);
  const results = useMemo(() => (applied ? recommend(PRODUCTS, applied) : []), [applied]);

  function toggle<K extends keyof GuidePrefs>(key: K, value: NonNullable<GuidePrefs[K]>) {
    setWarning(false);
    setPrefs((p) => {
      const next = { ...p };
      if (p[key] === value) delete next[key];
      else next[key] = value;
      return next;
    });
  }

  function apply() {
    if (!prefs.occasion) {
      setWarning(true);
      return;
    }
    setApplied(prefs);
    requestAnimationFrame(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  function reset() {
    setPrefs({});
    setApplied(null);
    setWarning(false);
  }

  function editPrefs() {
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="container-page space-y-8 py-4 md:py-6">
      <div className="hidden md:block">
        <Breadcrumbs items={[{ label: "Katalog Tenun PutriMas", to: "/" }, { label: "Panduan Pemilihan Kain & Rekomendasi" }]} />
      </div>

      {/* Preference panel */}
      <section ref={panelRef} className="bg-warm-gradient scroll-mt-24 rounded-2xl p-5 md:p-8">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <p className="eyebrow md:hidden">Kurasi Personal PutriMas</p>
            <div className="flex items-start gap-3">
              <span className="hidden size-10 shrink-0 place-items-center rounded-lg bg-accent/60 text-primary md:grid">
                <Icon name="auto_awesome" />
              </span>
              <div>
                <h1 className="mt-1 text-2xl font-bold leading-tight text-foreground md:mt-0 md:text-[28px]">
                  Panduan Pemilihan Kain Songket
                </h1>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Pilih kebutuhan dan preferensi Anda untuk menemukan kain songket Jembrana yang paling sesuai.
                </p>
              </div>
            </div>
          </div>
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-foreground md:hidden">
            <Icon name="auto_awesome" />
          </span>
          <span className="hidden items-center gap-1.5 rounded-full bg-card/70 px-3 py-1 text-xs text-muted-foreground md:inline-flex">
            <span className="size-2 rounded-full bg-primary-glow" /> Penasihat Tenun Cerdas
          </span>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <GuideGroup title="1. Tujuan / Acara" required>
            {(Object.keys(OCCASION_LABEL) as Occasion[]).map((k) => (
              <Chip key={k} selected={prefs.occasion === k} onClick={() => toggle("occasion", k)}>
                {OCCASION_LABEL[k]}
              </Chip>
            ))}
          </GuideGroup>
          <GuideGroup title="2. Kategori Produk">
            {(["lembaran", "pakaian", "semua"] as (Category | "semua")[]).map((k) => (
              <Chip key={k} selected={prefs.category === k} onClick={() => toggle("category", k)}>
                {k === "semua" ? "Semua Kategori" : k === "lembaran" ? "Kain Lembaran Songket" : CATEGORY_LABEL[k]}
              </Chip>
            ))}
          </GuideGroup>
          <GuideGroup title="3. Nuansa Warna">
            {(Object.keys(COLOR_LABEL) as ColorTone[]).map((k) => (
              <Chip key={k} selected={prefs.color === k} dot={COLOR_DOT[k]} onClick={() => toggle("color", k)}>
                {COLOR_LABEL[k]}
              </Chip>
            ))}
          </GuideGroup>
          <GuideGroup title="4. Karakter Motif">
            {(Object.keys(MOTIF_LABEL) as MotifType[]).map((k) => (
              <Chip key={k} selected={prefs.motif === k} onClick={() => toggle("motif", k)}>
                {MOTIF_LABEL[k]}
              </Chip>
            ))}
          </GuideGroup>
        </div>

        {warning ? (
          <div role="alert" className="mt-5 flex items-start gap-3 rounded-xl bg-warning px-4 py-3 text-warning-foreground">
            <Icon name="warning" filled className="text-[22px] text-destructive" />
            <div>
              <p className="text-sm font-semibold">Kombinasi Belum Lengkap</p>
              <p className="text-xs">
                Silakan pilih minimal satu tujuan acara terlebih dahulu untuk melihat rekomendasi terkurasi.
              </p>
            </div>
          </div>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center">
          <button
            type="button"
            onClick={apply}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary-glow md:h-10 md:rounded-md"
          >
            <Icon name="explore" className="text-[18px]" />
            Lihat Rekomendasi Produk {prefs.occasion ? `(${preview.length} Ditemukan)` : ""}
          </button>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-1.5 px-3 text-sm text-muted-foreground hover:text-foreground"
          >
            <Icon name="restart_alt" className="text-[18px]" /> Reset Pilihan
          </button>
          <p className="hidden text-xs italic text-muted-foreground md:ml-auto md:block">
            Filter dapat diubah sewaktu-waktu tanpa memuat ulang halaman.
          </p>
        </div>
      </section>

      {/* Results */}
      {applied ? (
        <section ref={resultsRef} className="scroll-mt-24 space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="flex flex-wrap items-center gap-2 text-xl font-semibold md:text-2xl">
                Rekomendasi Produk Untukmu
                <span className="rounded-md bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
                  {results.length} Kain Paling Sesuai
                </span>
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
                <span>Kriteria Aktif:</span>
                {applied.occasion ? <Crit label="Acara" value={OCCASION_LABEL[applied.occasion]} /> : null}
                {applied.category && applied.category !== "semua" ? (
                  <Crit label="Kategori" value={CATEGORY_LABEL[applied.category]} />
                ) : null}
                {applied.color ? <Crit label="Warna" value={COLOR_LABEL[applied.color]} /> : null}
                {applied.motif ? <Crit label="Motif" value={MOTIF_LABEL[applied.motif]} /> : null}
              </div>
            </div>
            <button
              type="button"
              onClick={editPrefs}
              className="inline-flex w-fit items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-sm text-foreground hover:bg-surface-highest"
            >
              <Icon name="tune" className="text-[18px] text-primary" /> Ubah Kriteria Preferensi
            </button>
          </div>

          {results.length ? (
            <>
              <div className="flex flex-col gap-2 rounded-xl bg-muted px-4 py-3 text-sm text-muted-foreground md:flex-row md:items-center">
                <Icon name="psychology_alt" className="hidden text-[22px] md:block" />
                <p className="flex-1">
                  Apakah rekomendasi ini sudah sesuai dengan rencana busanamu? Kurator kami siap menyesuaikan selera Anda
                  secara personal.
                </p>
                <a
                  href={waLink("Halo, saya ingin bertanya ke ahli tenun tentang rekomendasi kain.")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-primary"
                >
                  Tanya Ahli Tenun <Icon name="arrow_forward" className="text-[16px]" />
                </a>
              </div>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {results.map(({ product: p, score }) => (
                  <article key={p.slug} className="surface-card flex flex-col p-3">
                    <div className="relative overflow-hidden rounded-lg">
                      <ProductImage product={p} className="aspect-[4/3] w-full" />
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-accent px-2 py-0.5 text-[11px] font-semibold text-accent-foreground">
                        <Icon name="star" className="text-[14px]" /> {score}% Cocok dengan Preferensimu
                      </span>
                    </div>
                    <p className="eyebrow mt-3">{p.motifTag}</p>
                    <div className="mt-1 flex items-start justify-between gap-3">
                      <h3 className="text-lg font-semibold leading-snug">{p.name}</h3>
                    </div>
                    <PriceOrCurator product={p} className="mt-1 text-base" />
                    <dl className="mt-3 space-y-1.5 rounded-lg bg-muted px-3 py-2.5 text-xs">
                      <Spec k="Motif" v={p.motifName} />
                      <Spec k="Bahan Benang" v={p.yarn} />
                      <Spec k="Karakteristik" v={p.characteristic} />
                      <Spec k="Dimensi" v={p.dimension} strong />
                    </dl>
                    <div className="mt-3 flex gap-2 rounded-lg bg-surface-low px-3 py-2.5 text-xs leading-relaxed text-muted-foreground">
                      <Icon name="verified" className="text-[18px] text-primary" />
                      <p>
                        <span className="font-semibold text-primary">Alasan Cocok:</span> {p.matchReason}
                      </p>
                    </div>
                    <div className="mt-auto space-y-1.5 pt-4">
                      <a
                        href={waLink(orderMessage(p))}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-9 items-center justify-center gap-2 rounded-md bg-whatsapp text-sm font-medium text-whatsapp-foreground hover:bg-whatsapp-hover"
                      >
                        <Icon name="chat" className="text-[18px]" /> Konsultasi & Pesan WA
                      </a>
                      <Link
                        to="/produk/$slug"
                        params={{ slug: p.slug }}
                        className="flex h-7 items-center justify-center gap-1.5 rounded-md bg-secondary text-sm text-foreground hover:bg-surface-highest"
                      >
                        <Icon name="visibility" className="text-[16px]" /> Lihat Detail Kain
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center rounded-2xl bg-surface-low px-6 py-12 text-center">
              <span className="grid size-20 place-items-center rounded-2xl bg-card text-primary shadow-card">
                <Icon name="search_off" className="text-[34px]" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">Belum Ada Kain yang Persis Sesuai Kombinasi Ini</h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Coba ubah kombinasi warna atau motif, atau konsultasikan langsung kebutuhan kain Anda dengan tim kami.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={editPrefs}
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-glow"
                >
                  <Icon name="tune" className="text-[18px]" /> Pilih Preferensi Lain
                </button>
                <a
                  href={waLink("Halo, saya belum menemukan kombinasi songket yang saya cari. Bisa dibantu?")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-tertiary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-tertiary/90"
                >
                  <Icon name="chat" className="text-[18px]" /> Tanya Admin via WhatsApp
                </a>
              </div>
            </div>
          )}
        </section>
      ) : null}

      {/* Custom order banner */}
      <section className="flex flex-col gap-4 rounded-2xl bg-surface-high p-5 md:flex-row md:items-center md:p-6">
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
          <Icon name="design_services" />
        </span>
        <div className="flex-1">
          <h2 className="text-lg font-semibold">Belum menemukan kombinasi warna atau motif yang dicari?</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Pengrajin Tenun PutriMas menerima pesanan tenun khusus (Pre-order custom pewarnaan alam, motif silsilah
            keluarga, dan dimensi bespoke).
          </p>
        </div>
        <a
          href={waLink("Halo, saya ingin konsultasi pesanan tenun kustom.")}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary-glow"
        >
          <Icon name="brush" className="text-[18px]" /> Konsultasi Kustom via WhatsApp
        </a>
      </section>
    </div>
  );
}

function Crit({ label, value }: { label: string; value: string }) {
  return (
    <span className="rounded-md bg-muted px-2 py-0.5">
      {label}: <span className="font-semibold text-foreground">{value}</span>
    </span>
  );
}

function Spec({ k, v, strong }: { k: string; v: string; strong?: boolean }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="shrink-0 text-foreground">{k}:</dt>
      <dd className={strong ? "text-right font-semibold text-foreground" : "text-right text-muted-foreground"}>{v}</dd>
    </div>
  );
}
