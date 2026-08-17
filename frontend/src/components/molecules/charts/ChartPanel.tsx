import type { ReactNode } from "react";

interface ChartPanelProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function ChartPanel({ title, description, children }: ChartPanelProps) {
  return (
    <section className="panel flex flex-col p-5">
      <header className="mb-4">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
      </header>
      <div className="h-72 w-full">{children}</div>
    </section>
  );
}

/** Tooltip padronizado com os tokens do design system. */
export const tooltipStyles = {
  contentStyle: {
    background: "var(--color-surface-elevated)",
    border: "1px solid var(--color-border-strong)",
    borderRadius: "0.5rem",
    fontSize: "0.75rem",
    color: "var(--color-foreground)",
  },
  labelStyle: { color: "var(--color-highlight)", fontWeight: 600 },
  itemStyle: { color: "var(--color-foreground)" },
} as const;

export const chartPalette = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];
