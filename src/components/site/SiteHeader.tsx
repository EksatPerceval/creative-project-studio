import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import { IMG } from "@/data/images";
import { SITE, waLink } from "@/data/site";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

const NAV = [
  { to: "/", label: "Katalog" },
  { to: "/panduan", label: "Panduan Kain" },
  { to: "/pelatihan", label: "Pelatihan Tenun" },
  { to: "/kontak", label: "Kontak" },
] as const;

export function SiteHeader() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [query, setQuery] = useState("");

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    void navigate({ to: "/", search: q ? { q } : {} });
  }

  function isActive(to: string) {
    if (to === "/") return pathname === "/" || pathname.startsWith("/produk");
    return pathname.startsWith(to);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-md">
      {/* Desktop */}
      <div className="container-page hidden h-20 items-center gap-6 lg:flex">
        <Link to="/" className="flex shrink-0 items-center gap-3">
          <img src={IMG.logo} alt="Logo Tenun PutriMas" className="size-8 rounded-full object-cover" />
          <span className="leading-tight">
            <span className="block text-lg font-bold text-primary">{SITE.name}</span>
            <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {SITE.tagline}
            </span>
          </span>
        </Link>

        <form onSubmit={onSearch} className="relative w-full max-w-72" role="search">
          <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari motif, warna, atau jenis songket..."
            aria-label="Cari songket"
            className="h-9 w-full rounded-full bg-muted pl-10 pr-4 text-xs text-foreground outline-none ring-ring/40 placeholder:text-muted-foreground focus:ring-2"
          />
        </form>

        <nav className="ml-auto flex items-center gap-1" aria-label="Navigasi utama">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                isActive(item.to)
                  ? "bg-primary-glow text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={waLink("Halo Tenun PutriMas, saya ingin bertanya tentang koleksi songket.")}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary-glow"
        >
          <span className="size-2 rounded-full bg-accent" />
          Chat WhatsApp
        </a>
        <Link
          to="/kontak"
          aria-label="Akun & kontak studio"
          className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground"
        >
          <Icon name="person" filled className="text-[18px]" />
        </Link>
      </div>

      {/* Mobile & tablet */}
      <div className="flex h-16 items-center gap-3 px-4 lg:hidden">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-xl bg-card text-primary shadow-card">
            <Icon name="diamond" />
          </span>
          <span className="leading-tight">
            <span className="block text-base font-bold text-foreground">PutriMas</span>
            <span className="block text-[11px] font-semibold uppercase tracking-wide text-tertiary">Jembrana Bali</span>
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-1">
          <Link to="/" hash="cari" aria-label="Cari songket" className="grid size-10 place-items-center rounded-full text-foreground hover:bg-muted">
            <Icon name="search" />
          </Link>
          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat WhatsApp"
            className="grid size-10 place-items-center rounded-full text-primary hover:bg-muted"
          >
            <Icon name="chat" />
          </a>
          <Link
            to="/kontak"
            aria-label="Akun & kontak studio"
            className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground"
          >
            <Icon name="person" filled className="text-[18px]" />
          </Link>
        </div>
      </div>
    </header>
  );
}
