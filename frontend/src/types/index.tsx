export interface Colaborador {
  id: number
  nome: string
}

export interface Workshop {
  id: number
  nome: string
  dataRealizacao: string
  descricao: string
  colaboradoresPresentes: Colaborador[]
}

export interface ColaboradorComEstatisticas extends Colaborador {
  totalWorkshops: number;
  percentualParticipacao: number;
  ultimoWorkshop: Workshop | null;
  workshops: Workshop[];
}

export interface IndicadoresGerais {
  totalColaboradores: number;
  totalWorkshops: number;
  totalParticipacoes: number;
  mediaParticipantesPorWorkshop: number;
}