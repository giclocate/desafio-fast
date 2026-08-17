import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartPanel, tooltipStyles } from "./ChartPanel";
import type { Workshop } from "../../../types";
import { formatDate, formatarTrimestre } from "../../../lib/utils";
import { ordenarWorkshopsPorData } from "../../../lib/statistics";

export function EvolutionChart({ workshops }: { workshops: Workshop[] }) {
  const dados = ordenarWorkshopsPorData(workshops).map((workshop: Workshop) => ({
    periodo: formatarTrimestre(workshop.dataRealizacao),
    data: formatDate(workshop.dataRealizacao),
    nome: workshop.nome,
    participantes: workshop.colaboradoresPresentes?.length ?? 0,
  }));

  return (
    <ChartPanel
      title="Evolução da participação ao longo do tempo"
      description="Participantes por workshop, em ordem cronológica de realização."
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={dados} margin={{ top: 8, right: 16, bottom: 4, left: -18 }}>
          <defs>
            <linearGradient id="gradienteParticipacao" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.5} />
              <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0.04} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--color-border)" vertical={false} />
          <XAxis
            dataKey="periodo"
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
            stroke="var(--color-border)"
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
            stroke="var(--color-border)"
          />
          <Tooltip
            {...tooltipStyles}
            labelFormatter={(_, payload) => payload?.[0]?.payload?.nome ?? ""}
            formatter={(valor: number | string | Array<number | string> | undefined) => {
              const total = Number(Array.isArray(valor) ? valor[0] ?? 0 : valor ?? 0);
              return [`${total} participante(s)`, "Presenças"];
            }}
          />
          <Area
            type="monotone"
            dataKey="participantes"
            stroke="var(--color-chart-2)"
            strokeWidth={2}
            fill="url(#gradienteParticipacao)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartPanel>
  );
}