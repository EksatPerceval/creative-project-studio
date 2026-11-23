import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { Icon } from "@/components/site/Icon";
import { orderMessage, PriceOrCurator, ProductImage } from "@/components/site/ProductCard";
import { IMG } from "@/data/images";
import { CATEGORY_LABEL, OCCASION_LABEL, PRODUCTS, getProduct, type Product } from "@/data/products";
import { SITE, formatRupiah, waLink } from "@/data/site";

export const Route = createFileRoute("/produk/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) {
      return { meta: [{ title: "Kain tidak ditemukan — Tenun PutriMas" }, { name: "robots", content: "noindex" }] };
    }
    const desc = `${p.name} — ${p.features}. Tenun tangan asli Jembrana, pesan via WhatsApp.`;
    const image = p.gallery?.[0]?.src ?? p.image;
    return {
      meta: [
        { title: `${p.name} — Tenun PutriMas` },
        { name: "description", content: desc },
        { property: "og:title", content: `${p.name} — Tenun PutriMas` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(image ? [{ property: "og:image", content: image }, { name: "twitter:image", content: image }] : []),
      ],
    };
  },
  notFoundComponent: ProductNotFound,
  component: ProductPage,
});

function ProductNotFound() {
  return (
    <div className="container-page flex flex-col items-center py-20 text-center">
      <span className="grid size-16 place-items-center rounded-2xl bg-muted text-primary">
        <Icon name="search_off" className="text-[30px]" />
      </span>
      <h1 className="mt-4 text-xl font-semibold">Kain tidak ditemukan</h1>
      <p className="mt-1 text-sm text-muted-foreground">Kain ini mungkin sudah terjual atau tautannya berubah.</p>
      <Link to="/" className="mt-5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
        Kembali ke Katalog
      </Link>
    </div>
  );
}

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const gallery = p.gallery ?? (p.image ? [{ src: p.image, label: "Tampak Utama" }] : []);
  const [active, setActive] = useState(0);
  const current = gallery[active];

  const related = PRODUCTS.filter((x) => x.slug !== p.slug && x.image)
    .sort((a, b) => Number(b.category === p.category) - Number(a.category === p.category) || b.popularity - a.popularity)
    .slice(0, 4);

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: p.name, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast.success("Tautan produk disalin");
    } catch {
      /* user cancelled share */
    }
  }

  const specs: { k: string; v: string }[] = [
    { k: "Jenis Produk", v: CATEGORY_LABEL[p.category] },
    { k: "Nama Motif", v: p.motifName },
    { k: "Bahan & Benang", v: p.yarn },
    { k: "Ukuran / Dimensi", v: p.dimension },
    { k: "Karakteristik Kain", v: p.characteristic },
    { k: "Rekomendasi Acara", v: p.occasions.map((o) => OCCASION_LABEL[o]).join(", ") },
  ];

  return (
    <div>
      {/* Breadcrumb bar */}
      <div className="border-b border-border/60 bg-surface-low">
        <div className="container-page flex h-9 items-center justify-between gap-3 text-xs md:text-sm">
          <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1 text-muted-foreground">
            <Link to="/" className="inline-flex items-center gap-1 hover:text-foreground">
              <Icon name="home" className="hidden text-[16px] md:inline" /> Home
            </Link>
            <Icon name="chevron_right" className="text-[16px]" />
            <Link to="/" className="hover:text-foreground">
              Katalog
            </Link>
            <Icon name="chevron_right" className="text-[16px]" />
            <span className="truncate font-medium text-primary">{p.name}</span>
          </nav>
          <div className="hidden shrink-0 items-center gap-3 text-[11px] text-muted-foreground md:flex">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2 py-0.5 text-foreground">
              <span className="size-1.5 rounded-full bg-tertiary" /> Studio Jembrana Siap Melayani
            </span>
            <span>
              Kode Produk: <span className="font-semibold text-foreground">{p.code}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="container-page grid gap-6 py-5 md:py-8 lg:grid-cols-[7fr_5fr] lg:gap-8">
        {/* Gallery */}
        <div className="space-y-3">
          <div className="relative overflow-hidden rounded-2xl bg-muted">
            {current ? (
              <img src={current.src} alt={`${p.name} — ${current.label}`} className="aspect-square w-full object-cover lg:aspect-[4/4.4]" />
            ) : (
              <ProductImage product={p} className="aspect-square w-full" />
            )}
            <div className="absolute left-3 top-3 flex flex-wrap gap-2 md:left-4 md:top-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-card/95 px-3 py-1 text-xs font-medium text-foreground">
                <Icon name="verified" className="text-[16px] text-tertiary" /> 100% Tenun ATBM Asli Jembrana
              </span>
              <span className="hidden items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground md:inline-flex">
                <Icon name="star" className="text-[16px]" /> Koleksi Mahakarya
              </span>
            </div>
            {current ? (
              <a
                href={current.src}
                target="_blank"
                rel="noreferrer"
                aria-label="Perbesar detail serat emas"
                className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-card/95 px-3 py-2 text-xs font-medium text-foreground shadow-card"
              >
                <Icon name="zoom_in" className="text-[18px]" />
                <span className="hidden md:inline">Perbesar Detail Serat Emas</span>
              </a>
            ) : null}
          </div>

          {gallery.length > 1 ? (
            <div className="scrollbar-none flex gap-2 overflow-x-auto md:grid md:grid-cols-5">
              {gallery.map((g, i) => (
                <button
                  key={g.src + i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Tampilkan ${g.label}`}
                  aria-pressed={i === active}
                  className={
                    i === active
                      ? "relative w-24 shrink-0 overflow-hidden rounded-lg ring-2 ring-primary md:w-auto"
                      : "relative w-24 shrink-0 overflow-hidden rounded-lg opacity-80 ring-1 ring-border hover:opacity-100 md:w-auto"
                  }
                >
                  <img src={g.src} alt="" className="aspect-square w-full object-cover" />
                  <span className="absolute inset-x-0 bottom-0 bg-ink/70 py-0.5 text-center text-[10px] text-ink-foreground">
                    {g.label}
                  </span>
                </button>
              ))}
            </div>
          ) : null}

          <div className="surface-card hidden items-center gap-4 p-4 md:flex">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
              <Icon name="handshake" />
            </span>
            <div className="flex-1">
              <p className="font-semibold">Ditenun Perajin Pendem, Jembrana</p>
              <p className="text-xs text-muted-foreground">
                Alat Tenun Bukan Mesin (ATBM) tradisi turun-temurun • ±{p.weaveDays} hari pengerjaan per lembar.
              </p>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-primary-soft px-3 py-1 text-[11px] font-semibold uppercase text-primary-soft-foreground">
              {p.motifTag}
            </span>
            <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-medium text-accent-foreground">Tenun Tangan ATBM</span>
            {p.stockNote ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-[11px] text-foreground">
                <span className="size-2 rounded-full bg-destructive" /> {p.stockNote}
              </span>
            ) : null}
          </div>

          <div>
            <h1 className="text-[26px] font-bold leading-tight tracking-tight md:text-[30px]">{p.name}</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">Koleksi Wastra Adat & Wisuda Eksklusif Tenun PutriMas Bali</p>
          </div>

          <div className="flex flex-wrap items-baseline gap-3">
            <PriceOrCurator product={p} className="text-3xl md:text-[38px]" />
            {p.oldPrice ? (
              <>
                <span className="text-sm text-muted-foreground line-through">{formatRupiah(p.oldPrice)}</span>
                <span className="rounded-md bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">Heritage Special</span>
              </>
            ) : null}
          </div>

          <p className="surface-card p-4 text-[15px] leading-relaxed text-muted-foreground">
            {p.description ??
              `Ditenun secara tradisional menggunakan ATBM oleh perajin Pendem, Jembrana. ${p.features}. ${p.matchReason}`}
          </p>

          <div className="rounded-xl bg-surface-low p-3 md:p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="inline-flex items-center gap-2 font-semibold">
                <Icon name="tune" className="text-primary" /> Spesifikasi & Detail Kain
              </h2>
              <span className="text-[11px] text-muted-foreground">Standar Kurasi PutriMas</span>
            </div>
            <dl className="grid grid-cols-2 gap-2.5">
              {specs.map((s) => (
                <div key={s.k} className="rounded-lg bg-card p-2.5">
                  <dt className="text-[11px] text-muted-foreground">{s.k}</dt>
                  <dd className="mt-0.5 text-[13px] text-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: "workspace_premium", t: "Sertifikat Resmi", s: "Nomor Registrasi Asli" },
              { icon: "inventory_2", t: "Hardbox Premium", s: "Aman & Siap Hadiah" },
              { icon: "front_hand", t: "Garansi Tenun Tangan", s: "Jaminan Tanpa Mesin" },
            ].map((g) => (
              <div key={g.t} className="rounded-lg bg-muted px-2 py-3 text-center">
                <Icon name={g.icon} className="text-tertiary" />
                <p className="mt-1 text-xs font-semibold">{g.t}</p>
                <p className="text-[10px] text-muted-foreground">{g.s}</p>
              </div>
            ))}
          </div>

          <div className="hidden lg:block">
            <OrderActions product={p} onShare={share} />
          </div>
        </div>
      </div>

      {/* Story */}
      <section className="border-t border-border/60 bg-background py-10">
        <div className="container-page">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Warisan Filosofi & Proses</p>
              <h2 className="mt-2 text-2xl font-semibold md:text-[28px]">Keanggunan di Balik Lembaran {p.motifName}</h2>
              <p className="mt-2 text-sm text-muted-foreground md:text-[15px]">
                Setiap lembar songket Jembrana merupakan hasil perenungan dan kesabaran para penenun di Jembrana Barat,
                menjunjung nilai sakral Bali Kuno.
              </p>
            </div>
            <div className="flex gap-6 text-right">
              <div>
                <p className="text-lg font-bold text-primary">{p.weaveDays * 3}+ Jam</p>
                <p className="text-[11px] text-muted-foreground">Waktu Pengerjaan ATBM</p>
              </div>
              <div className="border-l border-border pl-6">
                <p className="text-lg font-bold text-tertiary">Pewarna Ramah</p>
                <p className="text-[11px] text-muted-foreground">Bebas Bahan Kimia Keras</p>
              </div>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                img: IMG.weaverStory,
                tag: "Teknik Tenun ATBM",
                title: "Kerapatan Pakan & Lusin Tertinggi",
                body: "Menggunakan benang pakan pilihan dengan ketukan sisir presisi untuk menciptakan kain yang jatuh lembut di badan tanpa kaku.",
                foot: "Lokasi: Atelier Pendem, Kab. Jembrana",
              },
              {
                img: IMG.philosophy,
                tag: "Makna Sakral Motif",
                title: "Simbol Ketinggian Budi & Kesuburan",
                body: "Pucuk Rebung (tunas bambu muda) melambangkan insan yang selalu bertumbuh luhur ke atas tanpa melupakan akar jati dirinya di bumi.",
                foot: "Filosofi Adat Tradisi Jembrana",
              },
              {
                img: IMG.hardbox,
                tag: "Kurasi & Pengiriman Aman",
                title: "Kotak Hardbox & Sertifikat Keaslian",
                body: "Setiap kain dikemas bersama kartu silsilah perajin dan panduan perawatan serat emas, siap dihadiahkan atau disimpan sebagai pusaka keluarga.",
                foot: "Pengiriman Seluruh Nusantara & Mancanegara",
              },
            ].map((s) => (
              <article key={s.title} className="overflow-hidden rounded-xl bg-secondary">
                <img src={s.img} alt={s.title} loading="lazy" className="aspect-[16/10] w-full object-cover" />
                <div className="p-4">
                  <p className="text-[11px] font-semibold text-primary">{s.tag}</p>
                  <h3 className="mt-1 font-semibold">{s.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.body}</p>
                  <p className="mt-4 text-[11px] text-muted-foreground/70">{s.foot}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="bg-surface-low py-10">
        <div className="container-page">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Kurasi Khusus</p>
              <h2 className="mt-1 text-2xl font-semibold md:text-[28px]">Produk Terkait Lainnya</h2>
              <p className="mt-1 hidden text-sm text-muted-foreground md:block">
                Koleksi motif Jembrana dengan karakteristik benang dan nuansa warna senada untuk acara adat, wisuda, atau
                kebaya.
              </p>
            </div>
            <Link to="/" className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary">
              Lihat Semua <span className="hidden md:inline">Katalog</span> <Icon name="arrow_forward" className="text-[16px]" />
            </Link>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {related.map((r) => (
              <RelatedCard key={r.slug} product={r} />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile sticky order bar */}
      <div className="fixed inset-x-0 bottom-16 z-30 border-t border-border bg-background/95 px-4 py-2.5 backdrop-blur-md lg:hidden">
        <div className="flex gap-2">
          <a
            href={waLink(orderMessage(p))}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center gap-3 rounded-xl bg-primary px-4 py-2 text-primary-foreground"
          >
            <Icon name="chat" />
            <span className="leading-tight">
              <span className="block text-sm font-semibold">Pesan & Konsultasi via WhatsApp</span>
              <span className="block text-[11px] opacity-90">{SITE.whatsappDisplay}</span>
            </span>
          </a>
          <button
            type="button"
            onClick={share}
            aria-label="Bagikan produk"
            className="grid w-12 place-items-center rounded-xl bg-secondary text-foreground"
          >
            <Icon name="share" />
          </button>
        </div>
      </div>
      <div className="h-20 lg:hidden" />
    </div>
  );
}

function OrderActions({ product: p, onShare }: { product: Product; onShare: () => void }) {
  return (
    <div className="space-y-3">
      <a
        href={waLink(orderMessage(p))}
        target="_blank"
        rel="noreferrer"
        className="flex h-12 items-center justify-center gap-2 rounded-xl bg-whatsapp text-base font-semibold text-whatsapp-foreground shadow-sm hover:bg-whatsapp-hover"
      >
        <Icon name="chat" /> Pesan & Konsultasi via WhatsApp <Icon name="arrow_forward" />
      </a>
      <p className="text-center text-[11px] text-muted-foreground">
        Terhubung langsung ke Studio Pendem (<span className="font-semibold text-foreground">{SITE.whatsappDisplay}</span>) untuk
        konfirmasi ketersediaan & pengiriman.
      </p>
      <div className="grid grid-cols-2 gap-2">
        <Link
          to="/panduan"
          className="flex h-10 items-center justify-center gap-2 rounded-lg bg-secondary text-sm font-medium hover:bg-surface-highest"
        >
          <Icon name="texture" className="text-[18px]" /> Cari Kain Serupa
        </Link>
        <button
          type="button"
          onClick={onShare}
          className="flex h-10 items-center justify-center gap-2 rounded-lg bg-secondary text-sm font-medium hover:bg-surface-highest"
        >
          <Icon name="share" className="text-[18px]" /> Bagikan Produk
        </button>
      </div>
      <div className="flex items-start gap-3 rounded-lg bg-warning px-3 py-2.5 text-xs text-warning-foreground">
        <Icon name="video_camera_front" className="text-[20px]" />
        <p>
          Ragu dengan warna asli? Tersedia layanan{" "}
          <a
            href={waLink(`Halo, saya ingin video call untuk melihat "${p.name}" secara langsung.`)}
            target="_blank"
            rel="noreferrer"
            className="font-semibold underline-offset-2 hover:underline"
          >
            Video Call Tenun
          </a>{" "}
          langsung dari studio untuk meninjau pantulan benang emas.
        </p>
      </div>
    </div>
  );
}

function RelatedCard({ product: r }: { product: Product }) {
  return (
    <article className="surface-card group flex flex-col overflow-hidden">
      <Link to="/produk/$slug" params={{ slug: r.slug }} className="relative block overflow-hidden">
        <ProductImage product={r} className="aspect-[4/5] w-full transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute left-2 top-2 rounded-full bg-card/95 px-2 py-0.5 text-[10px] font-medium">{r.motifTag}</span>
      </Link>
      <div className="flex flex-1 flex-col p-3">
        <p className="truncate text-[11px] text-muted-foreground">
          {r.yarn.split(" & ")[0]} • {r.weaveDays} Hari
        </p>
        <h3 className="mt-0.5 truncate text-sm font-semibold md:text-[15px]">{r.name}</h3>
        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div>
            <p className="text-[10px] text-muted-foreground">Harga Lembaran</p>
            <PriceOrCurator product={r} className="text-sm md:text-base" />
          </div>
          <Link
            to="/produk/$slug"
            params={{ slug: r.slug }}
            className="rounded-md bg-secondary px-2.5 py-1.5 text-xs font-medium hover:bg-surface-highest"
          >
            Detail
          </Link>
        </div>
      </div>
    </article>
  );
}
