import { Link } from "@tanstack/react-router";

import { SITE, waLink } from "@/data/site";
import { Icon } from "./Icon";

export function SiteFooter() {
  return (
    <footer className="bg-ink pb-24 pt-12 text-ink-foreground lg:pb-10">
      <div className="container-page grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xl font-bold text-primary-soft">{SITE.name}</p>
          <p className="mt-3 text-xs leading-relaxed text-ink-foreground/80">
            Pelestarian seni tenun songket khas Jembrana, Bali. Menenun keanggunan warisan leluhur secara 100% buatan
            tangan dengan pewarna ramah lingkungan dan benang berkualitas premium.
          </p>
          <p className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold text-accent">
            <Icon name="verified" className="text-[18px]" />
            Sertifikasi Tenun Asli Jembrana
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest">Navigasi Cepat</p>
          <ul className="mt-4 space-y-2 text-xs text-ink-foreground/80">
            <li><Link to="/" className="hover:text-ink-foreground">Katalog Songket Eksklusif</Link></li>
            <li><Link to="/panduan" className="hover:text-ink-foreground">Panduan Kain Adat & Wisuda</Link></li>
            <li><Link to="/pelatihan" className="hover:text-ink-foreground">Program Pelatihan Tenun</Link></li>
            <li>
              <a href={waLink("Halo, saya ingin konsultasi pesanan custom & motif khusus.")} target="_blank" rel="noreferrer" className="hover:text-ink-foreground">
                Konsultasi Custom & Motif Khusus
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest">Studio & Workshop</p>
          <p className="mt-4 text-xs leading-relaxed text-ink-foreground/80">{SITE.address}</p>
          <p className="mt-3 text-xs">WhatsApp: {SITE.whatsappDisplay}</p>
          <p className="mt-1 text-xs">Email: {SITE.email}</p>
          <p className="mt-1 text-xs text-ink-foreground/80">{SITE.hours}</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest">Layanan Concierge</p>
          <p className="mt-4 text-xs leading-relaxed text-ink-foreground/80">
            Pemesanan dan konsultasi motif songket ditangani langsung oleh kurator atelier kami via WhatsApp tanpa sistem
            keranjang belanja.
          </p>
          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex h-9 items-center justify-center gap-2 rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-primary-glow"
          >
            <Icon name="chat" />
            Hubungi Studio Sekarang
          </a>
        </div>
      </div>
      <div className="container-page mt-12 flex flex-col gap-2 text-[11px] text-ink-foreground/70 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Tenun PutriMas Jembrana. Seluruh Hak Cipta Dilindungi.</p>
        <p className="flex gap-4">
          <span>Etika Pengrajin</span>
          <span>Garansi Keaslian</span>
        </p>
      </div>
    </footer>
  );
}
