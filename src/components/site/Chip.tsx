import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
  dot?: string;
  children: ReactNode;
  size?: "sm" | "lg";
};

/** Selectable pill used for categories and guide preferences. */
export function Chip({ selected, dot, children, className, size = "sm", ...rest }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        size === "sm" ? "px-3 py-1 text-sm" : "rounded-xl px-3.5 py-3 text-sm",
        selected
          ? "bg-primary text-primary-foreground shadow-sm"
          : size === "lg"
            ? "bg-card text-foreground shadow-card hover:bg-muted"
            : "bg-muted text-muted-foreground hover:bg-surface-highest hover:text-foreground",
        className,
      )}
      {...rest}
    >
      {selected && !dot ? <Icon name="check" className="text-[16px]" /> : null}
      {dot ? <span className={cn("size-2.5 rounded-full", dot)} /> : null}
      {children}
    </button>
  );
}
