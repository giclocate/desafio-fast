import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "../services/api";
import type { ColaboradorComEstatisticas, IndicadoresGerais } from "../types";
import {
  calcularEstatisticasColaboradores,
  calcularIndicadoresGerais,
} from "../lib/statistics";

export const colaboradoresQuery = queryOptions({
  queryKey: ["colaboradores"],
  queryFn: api.getColaboradores,
});

export const workshopsQuery = queryOptions({
  queryKey: ["workshops"],
  queryFn: api.getWorkshops,
});

export const workshopQuery = (id: number) =>
  queryOptions({
    queryKey: ["workshops", id],
    queryFn: () => api.getWorkshopById(id),
    retry: false,
  });

export function useColaboradores() {
  return useQuery(colaboradoresQuery);
}

export function useWorkshops() {
  return useQuery(workshopsQuery);
}

export function useWorkshop(id: number) {
  return useQuery(workshopQuery(id));
}

interface EstatisticasResultado {
  colaboradores: ColaboradorComEstatisticas[];
  indicadores: IndicadoresGerais;
}

/** Combina colaboradores + workshops e devolve as métricas derivadas. */
export function useEstatisticas() {
  const colaboradores = useColaboradores();
  const workshops = useWorkshops();

  const isLoading = colaboradores.isLoading || workshops.isLoading;
  const error = colaboradores.error ?? workshops.error ?? null;

  const dados: EstatisticasResultado | null =
    colaboradores.data && workshops.data
      ? {
          colaboradores: calcularEstatisticasColaboradores(colaboradores.data, workshops.data),
          indicadores: calcularIndicadoresGerais(colaboradores.data, workshops.data),
        }
      : null;

  return {
    isLoading,
    error,
    dados,
    workshops: workshops.data ?? [],
    refetch: () => {
      void colaboradores.refetch();
      void workshops.refetch();
    },
  };
}

