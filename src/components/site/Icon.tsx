import { cn } from "@/lib/utils";

type IconProps = { name: string; filled?: boolean; className?: string };

/** Material Symbols icon, matching the original screen designs. */
export function Icon({ name, filled, className }: IconProps) {
  return (
    <span aria-hidden="true" className={cn("material-symbols-outlined text-[20px]", filled && "icon-fill", className)}>
      {name}
    </span>
  );
}
