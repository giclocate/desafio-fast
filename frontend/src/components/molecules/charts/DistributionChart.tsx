import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { ChartPanel, chartPalette, tooltipStyles } from "./ChartPanel";
import type { Workshop } from "../../../types";

export function DistributionChart({ workshops }: { workshops: Workshop[] }) {
  const dados = workshops.map((workshop) => ({
    nome: workshop.nome,
    participantes: workshop.colaboradoresPresentes?.length ?? 0,
  }));

  return (
    <ChartPanel
      title="Distribuição de participantes por workshop"
      description="Peso relativo de cada workshop no total de participações."
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={dados}
            dataKey="participantes"
            nameKey="nome"
            innerRadius="45%"
            outerRadius="72%"
            paddingAngle={3}
            stroke="var(--color-background)"
            strokeWidth={2}
          >
            {dados.map((item, index) => (
              <Cell key={item.nome} fill={chartPalette[index % chartPalette.length]} />
            ))}
          </Pie>
          <Tooltip
            {...tooltipStyles}
            formatter={(valor: number | string | Array<number | string> | undefined) => {
              const total = Number(Array.isArray(valor) ? valor[0] ?? 0 : valor ?? 0);
              return [`${total} participante(s)`, "Presenças"]; 
            }}
          />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ fontSize: "0.7rem", color: "var(--color-muted-foreground)" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartPanel>
  );
}