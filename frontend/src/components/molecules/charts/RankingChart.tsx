import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartPanel, tooltipStyles } from "./ChartPanel";
import type { ColaboradorComEstatisticas } from "../../../types";

interface Props {
  colaboradores: ColaboradorComEstatisticas[];
}

export function RankingChart({ colaboradores }: Props) {
  const dados = [...colaboradores]
    .sort((a, b) => b.totalWorkshops - a.totalWorkshops)
    .map((colaborador) => ({
      nome: colaborador.nome.split(" ")[0],
      workshops: colaborador.totalWorkshops,
    }));

  return (
    <ChartPanel
      title="Participação por colaborador"
      description="Quantidade de workshops frequentados por cada colaborador."
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dados} margin={{ top: 8, right: 12, bottom: 4, left: -18 }}>
          <CartesianGrid stroke="var(--color-border)" vertical={false} />
          <XAxis
            dataKey="nome"
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
            interval={0}
            angle={-25}
            textAnchor="end"
            height={56}
            stroke="var(--color-border)"
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
            stroke="var(--color-border)"
          />
          <Tooltip
            {...tooltipStyles}
            cursor={{ fill: "var(--color-primary)", opacity: 0.08 }}
            formatter={(valor: number | string | Array<number | string> | undefined) => {
              const total = Number(Array.isArray(valor) ? valor[0] ?? 0 : valor ?? 0);
              return [`${total} workshop(s)`, "Participações"];
            }}
          />
          <Bar
            dataKey="workshops"
            fill="var(--color-chart-1)"
            radius={[6, 6, 0, 0]}
            maxBarSize={44}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartPanel>
  );
}