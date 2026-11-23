import { Link, useRouterState } from "@tanstack/react-router";

import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

const ITEMS = [
  { to: "/", label: "Koleksi", icon: "storefront" },
  { to: "/panduan", label: "Motif", icon: "texture" },
  { to: "/pelatihan", label: "Tenun", icon: "draw" },
  { to: "/kontak", label: "Layanan", icon: "support_agent" },
] as const;

export function MobileBottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const active = (to: string) =>
    to === "/" ? pathname === "/" || pathname.startsWith("/produk") : pathname.startsWith(to);

  return (
    <nav
      aria-label="Navigasi bawah"
      className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/95 backdrop-blur-md lg:hidden"
    >
      <ul className="grid h-16 grid-cols-4">
        {ITEMS.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className={cn(
                "flex h-full flex-col items-center justify-center gap-1 text-[11px] font-medium",
                active(item.to) ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon name={item.icon} filled={active(item.to)} className="text-[22px]" />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
