import { createFileRoute } from "@tanstack/react-router";

import { ContactBlock } from "@/components/site/ContactBlock";
import { Icon } from "@/components/site/Icon";
import { SITE, waLink } from "@/data/site";

export const Route = createFileRoute("/kontak")({
  head: () => ({
    meta: [
      { title: "Kontak & Lokasi Studio — Tenun PutriMas" },
      {
        name: "description",
        content: "Hubungi Studio Tenun PutriMas di Pendem, Jembrana, Bali via WhatsApp, email, atau kunjungi atelier kami.",
      },
      { property: "og:title", content: "Kontak & Lokasi Studio — Tenun PutriMas" },
      { property: "og:description", content: "Konsultasi motif & pemesanan songket langsung dengan kurator via WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const SERVICES = [
  { icon: "chat", title: "Konsultasi & Pemesanan", body: "Tanya ketersediaan, harga, dan pengiriman kain langsung ke kurator.", msg: "Halo, saya ingin konsultasi & memesan songket." },
  { icon: "videocam", title: "Video Call Tenun", body: "Lihat langsung warna asli dan kilau benang emas dari studio.", msg: "Halo, saya ingin menjadwalkan video call untuk melihat kain." },
  { icon: "design_services", title: "Pesanan Kustom", body: "Pre-order pewarnaan alam, motif silsilah keluarga, dan ukuran khusus.", msg: "Halo, saya ingin memesan songket kustom." },
  { icon: "badge", title: "Seragam Instansi", body: "Pemesanan seragam adat untuk instansi, sekolah, dan komunitas.", msg: "Halo, saya ingin bertanya tentang pemesanan seragam instansi." },
];

function ContactPage() {
  return (
    <div className="container-page space-y-8 py-5 md:py-8">
      <section>
        <p className="eyebrow">Layanan Concierge Pribadi</p>
        <h1 className="mt-2 text-[28px] font-bold leading-tight md:text-[36px]">Konsultasi Langsung dengan Penenun</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Tanpa keranjang belanja yang rumit. Semua pemesanan ditangani langsung oleh kurator atelier kami via WhatsApp di{" "}
          <span className="font-semibold text-foreground">{SITE.whatsappDisplay}</span>.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((s) => (
          <a
            key={s.title}
            href={waLink(s.msg)}
            target="_blank"
            rel="noreferrer"
            className="surface-card group flex flex-col p-5 transition-transform hover:-translate-y-0.5"
          >
            <span className="grid size-11 place-items-center rounded-xl bg-primary-soft text-primary">
              <Icon name={s.icon} />
            </span>
            <h2 className="mt-4 font-semibold">{s.title}</h2>
            <p className="mt-1 flex-1 text-sm text-muted-foreground">{s.body}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-whatsapp">
              Chat via WhatsApp <Icon name="arrow_forward" className="text-[16px]" />
            </span>
          </a>
        ))}
      </section>

      <ContactBlock />
    </div>
  );
}
