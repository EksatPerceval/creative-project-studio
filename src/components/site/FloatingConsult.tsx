import { useRouterState } from "@tanstack/react-router";

import { waLink } from "@/data/site";
import { Icon } from "./Icon";

export function FloatingConsult() {
  const href = waLink("Halo Tenun PutriMas, saya ingin konsultasi dan memesan songket.");
  // Product pages have their own sticky WhatsApp bar on phones.
  const onProduct = useRouterState({ select: (s) => s.location.pathname.startsWith("/produk") });
  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-float transition-transform hover:-translate-y-0.5 lg:inline-flex"
      >
        <Icon name="forum" className="text-[22px]" />
        Konsultasi & Pesan Songket
      </a>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label="Konsultasi & pesan songket via WhatsApp"
        className={onProduct ? "hidden" : "fixed bottom-20 right-4 z-40 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-float lg:hidden"}
      >
        <Icon name="chat" className="text-[26px]" />
      </a>
    </>
  );
}
