import { Link } from "@tanstack/react-router";

import type { Product } from "@/data/products";
import { formatRupiah, waLink } from "@/data/site";
import { Icon } from "./Icon";

export function orderMessage(p: Product) {
  return `Halo Tenun PutriMas, saya tertarik dengan "${p.name}" (kode ${p.code}). Apakah masih tersedia?`;
}

export function ProductImage({ product, className }: { product: Product; className?: string }) {
  if (!product.image) {
    return (
      <div className={`bg-weave grid place-items-center ${className ?? ""}`}>
        <div className="flex flex-col items-center gap-2">
          <span className="grid size-12 place-items-center rounded-full bg-card text-primary shadow-card">
            <Icon name="texture" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Tenun PutriMas</span>
        </div>
      </div>
    );
  }
  return <img src={product.image} alt={product.name} loading="lazy" className={`object-cover ${className ?? ""}`} />;
}

export function PriceOrCurator({ product, className }: { product: Product; className?: string }) {
  return product.price ? (
    <span className={`font-bold text-primary ${className ?? ""}`}>{formatRupiah(product.price)}</span>
  ) : (
    <span className={`font-bold text-primary ${className ?? ""}`}>Hubungi Kurator</span>
  );
}

/** Storefront catalog card: compact on phones, detailed on larger screens. */
export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="surface-card group flex flex-col overflow-hidden p-2 md:p-2.5">
      <Link to="/produk/$slug" params={{ slug: product.slug }} className="relative block overflow-hidden rounded-lg">
        <ProductImage
          product={product}
          className="aspect-[4/5] w-full transition-transform duration-500 group-hover:scale-105 md:aspect-square"
        />
        <span className="absolute left-2 top-2 rounded-md bg-card/95 px-2 py-0.5 text-[11px] font-medium text-foreground md:left-2.5 md:text-primary">
          <span className="md:hidden">{product.badge ?? product.motifTag}</span>
          <span className="hidden md:inline">{product.motifTag}</span>
        </span>
        {product.badge ? (
          <span className="absolute right-2 top-2 hidden rounded-md bg-accent px-2 py-0.5 text-[11px] font-semibold text-accent-foreground md:inline">
            {product.badge}
          </span>
        ) : null}
        <span className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-primary text-primary-foreground md:hidden">
          <Icon name="chat" className="text-[16px]" />
        </span>
      </Link>

      <div className="flex flex-1 flex-col px-1 pb-1 pt-3">
        <h3 className="truncate text-[15px] font-semibold text-foreground md:text-base">{product.name}</h3>
        <p className="mt-0.5 truncate text-xs text-muted-foreground md:hidden">
          {product.weaveDays} Hari Tenun • {product.yarn.split(" & ")[0]}
        </p>
        <p className="mt-1 hidden text-xs leading-relaxed text-muted-foreground md:line-clamp-2">{product.features}</p>

        <div className="mt-2 hidden items-center justify-between gap-2 text-xs md:flex">
          <span className="text-foreground">Dimensi: {product.dimension}</span>
          <span className="font-medium text-tertiary">{product.highlight}</span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-3 md:pt-2">
          <PriceOrCurator product={product} className="text-sm md:text-base" />
          <Link
            to="/produk/$slug"
            params={{ slug: product.slug }}
            className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-foreground md:hidden"
          >
            Detail
          </Link>
        </div>

        <div className="mt-3 hidden grid-cols-2 gap-2 md:grid">
          <Link
            to="/produk/$slug"
            params={{ slug: product.slug }}
            className="flex h-8 items-center justify-center rounded-md bg-secondary text-xs font-medium text-foreground hover:bg-surface-highest"
          >
            Lihat Detail
          </Link>
          <a
            href={waLink(orderMessage(product))}
            target="_blank"
            rel="noreferrer"
            className="flex h-8 items-center justify-center gap-1.5 rounded-md bg-whatsapp text-xs font-semibold text-whatsapp-foreground hover:bg-whatsapp-hover"
          >
            <Icon name="chat" className="text-[16px]" />
            Pesan via WA
          </a>
        </div>
      </div>
    </article>
  );
}
