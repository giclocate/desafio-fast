import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
}

export function StatCard({ label, value, hint, icon: Icon }: StatCardProps) {
  return (
    <article className="panel flex items-start justify-between gap-4 p-5">
      <div className="min-w-0">
        <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <p className="mt-2 text-3xl font-semibold text-foreground tabular-nums">{value}</p>
        {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      </div>
      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/15 text-highlight ring-1 ring-primary/30">
        <Icon className="size-5" aria-hidden />
      </span>
    </article>
  );
}
