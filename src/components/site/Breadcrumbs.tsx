import { Link } from "@tanstack/react-router";
import { Fragment } from "react";

import { Icon } from "./Icon";

type Crumb = { label: string; to?: "/" | "/panduan" | "/pelatihan" | "/kontak" };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground md:text-sm">
      {items.map((c, i) => (
        <Fragment key={c.label}>
          {i > 0 ? <Icon name="chevron_right" className="text-[16px]" /> : null}
          {c.to ? (
            <Link to={c.to} className="hover:text-foreground">
              {c.label}
            </Link>
          ) : (
            <span className="font-medium text-primary">{c.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
