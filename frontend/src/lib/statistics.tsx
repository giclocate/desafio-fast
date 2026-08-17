import type {
  Colaborador,
  ColaboradorComEstatisticas,
  IndicadoresGerais,
  Workshop,
} from "../types";

export function ordenarWorkshopsPorData(workshops: Workshop[], crescente = true): Workshop[] {
  return [...workshops].sort((a, b) =>
    crescente
      ? a.dataRealizacao.localeCompare(b.dataRealizacao)
      : b.dataRealizacao.localeCompare(a.dataRealizacao),
  );
}

export function contarParticipacoesPorColaborador(workshops: Workshop[]): Map<number, number> {
  const contagem = new Map<number, number>();

  for (const workshop of workshops) {
    for (const colaborador of workshop.colaboradoresPresentes) {
      contagem.set(colaborador.id, (contagem.get(colaborador.id) ?? 0) + 1);
    }
  }

  return contagem;
}

export function calcularEstatisticasColaborador(
  colaborador: Colaborador,
  workshops: Workshop[],
): ColaboradorComEstatisticas {
  const participados = ordenarWorkshopsPorData(
    workshops.filter((workshop) =>
      workshop.colaboradoresPresentes.some((presente) => presente.id === colaborador.id),
    ),
    false,
  );

  return {
    ...colaborador,
    workshops: participados,
    totalWorkshops: participados.length,
    percentualParticipacao:
      workshops.length === 0 ? 0 : (participados.length / workshops.length) * 100,
    ultimoWorkshop: participados[0] ?? null,
  };
}

export function calcularEstatisticasColaboradores(
  colaboradores: Colaborador[],
  workshops: Workshop[],
): ColaboradorComEstatisticas[] {
  return colaboradores.map((colaborador) =>
    calcularEstatisticasColaborador(colaborador, workshops),
  );
}

export function calcularIndicadoresGerais(
  colaboradores: Colaborador[],
  workshops: Workshop[],
): IndicadoresGerais {
  const totalParticipacoes = workshops.reduce(
    (total, workshop) => total + workshop.colaboradoresPresentes.length,
    0,
  );

  return {
    totalColaboradores: colaboradores.length,
    totalWorkshops: workshops.length,
    totalParticipacoes,
    mediaParticipantesPorWorkshop:
      workshops.length === 0 ? 0 : totalParticipacoes / workshops.length,
  };
}

/** Resolve os colaboradores presentes em um workshop, na ordem do cadastro. */
export function obterParticipantes(
  workshop: Workshop,
  colaboradores: Colaborador[],
): Colaborador[] {
  const porId = new Map(colaboradores.map((colaborador) => [colaborador.id, colaborador]));
  return workshop.colaboradoresPresentes
    .map((colaborador) => porId.get(colaborador.id))
    .filter((colaborador): colaborador is Colaborador => Boolean(colaborador));
}
