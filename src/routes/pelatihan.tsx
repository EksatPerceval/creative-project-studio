import { createFileRoute, Link } from "@tanstack/react-router";

import { ContactBlock } from "@/components/site/ContactBlock";
import { Icon } from "@/components/site/Icon";
import { IMG } from "@/data/images";
import { waLink } from "@/data/site";

export const Route = createFileRoute("/pelatihan")({
  head: () => ({
    meta: [
      { title: "Tentang Kami & Pelatihan Tenun — Tenun PutriMas" },
      {
        name: "description",
        content:
          "Atelier tenun songket di Pendem, Jembrana: pemberdayaan penenun wanita, konsep Back to Nature, dan program pelatihan tenun ATBM.",
      },
      { property: "og:title", content: "Tentang Kami & Pelatihan Tenun — Tenun PutriMas" },
      {
        property: "og:description",
        content: "Belajar menenun songket Jembrana langsung di atelier Tenun PutriMas, Pendem, Bali.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: IMG.weaversAtelier },
      { name: "twitter:image", content: IMG.weaversAtelier },
    ],
  }),
  component: AboutPage,
});

const PILLARS = [
  {
    n: "01 / Keaslian",
    icon: "back_hand",
    tone: "bg-primary-soft text-primary",
    title: "100% Tenun Tangan Asli",
    body: "Ditenun langsung oleh pengrajin wanita terampil lokal Jembrana menggunakan Alat Tenun Bukan Mesin (ATBM) tradisional untuk menjaga ketelitian setiap helai benang.",
    foot: { icon: "verified", label: "Sertifikasi Kriya Jembrana" },
  },
  {
    n: "02 / Keberlanjutan",
    icon: "eco",
    tone: "bg-accent text-accent-foreground",
    title: "Konsep Back to Nature",
    body: "Proses tenun tradisional yang ramah lingkungan dan berkelanjutan dengan memanfaatkan pewarna alam dari tumbuh-tumbuhan serta serat alami pilihan.",
    foot: { icon: "psychiatry", label: "Pewarna Alam Ramah Lingkungan" },
  },
  {
    n: "03 / Estetika",
    icon: "auto_awesome",
    tone: "bg-secondary text-foreground",
    title: "Gaya Klasik hingga Modern",
    body: "Ragam motif serbaguna yang dirancang khusus untuk keanggunan upacara adat sakral sekaligus tampil relevan dan modis bagi generasi muda masa kini.",
    foot: { icon: "palette", label: "Motif Adat & Kontemporer" },
  },
];

const TRAINING = [
  {
    icon: "menu_book",
    title: "1. Materi Pelatihan",
    body: "Dasar-dasar menenun ATBM, pengenalan motif khas Jembrana, dan teknik pewarnaan alam.",
  },
  {
    icon: "groups",
    title: "2. Sasaran Peserta",
    body: "Pelajar, mahasiswa, masyarakat umum, serta program kemitraan instansi & komunitas.",
  },
  {
    icon: "location_on",
    title: "3. Lokasi Workshop",
    body: "Studio & Atelier Tenun PutriMas, Pendem, Kab. Jembrana, Bali.",
  },
];

function AboutPage() {
  return (
    <div className="container-page space-y-12 py-5 md:py-8">
      <section>
        <nav aria-label="Breadcrumb" className="hidden text-xs text-muted-foreground md:block">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>{" "}
          / <span className="font-medium text-foreground">Tentang Kami & Pelatihan Tenun</span>
        </nav>
        <div className="mt-3 grid gap-4 md:grid-cols-[1.6fr_1fr] md:items-end">
          <div>
            <p className="eyebrow inline-flex items-center gap-1.5">
              <Icon name="auto_awesome" className="text-[16px] md:hidden" />
              Atelier & Edukasi Jembrana
            </p>
            <h1 className="mt-2 text-[28px] font-bold leading-tight tracking-tight text-foreground md:text-[40px]">
              Melestarikan Warisan Tenun Jembrana Bersama Generasi Muda
            </h1>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground md:pb-2 md:text-sm">
            Pusat pengembangan songket Jembrana, pemberdayaan penenun wanita, dan ekonomi kreatif berkonsep{" "}
            <span className="text-foreground">Back to Nature</span>.
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 md:hidden">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs">
            <Icon name="groups" className="text-[16px] text-primary" /> Penenun Wanita Lokal
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs">
            <Icon name="eco" className="text-[16px] text-tertiary" /> Pewarna Alami
          </span>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-baseline justify-between md:hidden">
          <h2 className="text-lg font-semibold">Keunggulan Tenun PutriMas</h2>
          <span className="text-xs text-muted-foreground">3 Pilar Utama</span>
        </div>
        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {PILLARS.map((p) => (
            <article key={p.title} className="surface-card p-5 md:p-8">
              <span className={`grid size-12 place-items-center rounded-xl ${p.tone}`}>
                <Icon name={p.icon} />
              </span>
              <p className="mt-6 hidden text-[11px] font-semibold uppercase tracking-wider text-tertiary md:block">{p.n}</p>
              <h3 className="mt-3 text-lg font-semibold md:mt-1">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-[15px]">{p.body}</p>
              <p className="mt-5 hidden items-center gap-1.5 text-xs text-muted-foreground md:flex">
                <Icon name={p.foot.icon} className="text-[16px] text-tertiary" />
                {p.foot.label}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid overflow-hidden rounded-2xl bg-surface-low md:grid-cols-[1fr_1.4fr]">
        <div className="relative min-h-72">
          <img
            src={IMG.weaversAtelier}
            alt="Penenun wanita Jembrana bekerja menggunakan alat tenun tradisional"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-lg bg-card/95 px-3 py-2.5 backdrop-blur">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">Studio Atelier Pendem</p>
              <p className="text-xs text-foreground">Pemberdayaan Penenun Lokal Jembrana</p>
            </div>
            <Icon name="workspace_premium" className="text-primary" />
          </div>
        </div>
        <div className="p-5 md:p-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase text-accent-foreground">
            <span className="size-1.5 rounded-full bg-primary" /> Program Pelatihan & Edukasi
          </span>
          <h2 className="mt-4 text-2xl font-semibold md:text-[28px]">Pelatihan Tenun Songket Jembrana</h2>
          <ul className="mt-5 space-y-3">
            {TRAINING.map((t) => (
              <li key={t.title} className="flex gap-3 rounded-lg bg-card p-3 shadow-card">
                <span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary-soft text-primary">
                  <Icon name={t.icon} />
                </span>
                <div>
                  <p className="font-semibold">{t.title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{t.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <a
            href={waLink("Halo Tenun PutriMas, saya ingin mendaftar / bertanya tentang program pelatihan tenun.")}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-glow md:w-auto"
          >
            <Icon name="chat" /> Daftar / Tanya Info Pelatihan via WhatsApp
          </a>
        </div>
      </section>

      <ContactBlock />
    </div>
  );
}
