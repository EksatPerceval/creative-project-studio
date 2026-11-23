import { IMG } from "@/data/images";
import { SITE } from "@/data/site";
import { Icon } from "./Icon";

const ROWS = [
  { icon: "location_on", label: "Alamat Studio", value: SITE.address },
  { icon: "call", label: "Telepon / WhatsApp", value: SITE.whatsappDisplay },
  { icon: "mail", label: "Email", value: SITE.email },
  { icon: "schedule", label: "Jam Operasional", value: SITE.hours },
];

export function ContactBlock() {
  return (
    <section className="surface-card grid gap-8 p-5 md:p-8 lg:grid-cols-2">
      <div>
        <p className="eyebrow">Kunjungi Atelier Kami</p>
        <h2 className="mt-2 text-2xl font-semibold text-foreground">Lokasi Workshop & Kontak Resmi</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Kami menyambut kunjungan langsung untuk melihat proses tenun, konsultasi motif, serta diskusi program
          kemitraan.
        </p>
        <ul className="mt-6 space-y-4">
          {ROWS.map((r) => (
            <li key={r.label} className="flex gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-muted text-primary">
                <Icon name={r.icon} />
              </span>
              <span>
                <span className="block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{r.label}</span>
                <span className="block text-sm text-foreground">{r.value}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative min-h-64 overflow-hidden rounded-xl">
        <img src={IMG.map} alt="Peta lokasi Studio Tenun PutriMas di Pendem, Jembrana" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
        <span className="absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-float">
          <Icon name="location_on" filled className="text-[16px]" />
          Tenun PutriMas Pendem
        </span>
        <span className="absolute bottom-4 left-4 rounded-md bg-card/95 px-3 py-1 text-xs font-medium text-foreground">
          Pendem, Jembrana, Bali
        </span>
        <a
          href={SITE.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md bg-card px-3 py-2 text-sm font-semibold text-foreground shadow-card hover:bg-muted"
        >
          <Icon name="open_in_new" className="text-[18px]" />
          Buka di Google Maps
        </a>
      </div>
    </section>
  );
}
