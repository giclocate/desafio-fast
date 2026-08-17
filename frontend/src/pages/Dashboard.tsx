import { CalendarRange, Percent, Users, Users2 } from "lucide-react";

import { EvolutionChart } from "../components/molecules/charts/EvolutionChart";
import { DistributionChart } from "../components/molecules/charts/DistributionChart";
import { RankingChart } from "../components/molecules/charts/RankingChart";
import { StatCard } from "../components/atoms/StatCard";
import { EmptyState, LoadingState } from "../components/atoms/States";
import { PageHeader } from "../components/template/PageHeader";
import { useEstatisticas } from "../hooks/useFastData";
import { formatarNumero } from "../lib/utils";
import {
  calcularEstatisticasColaboradores,
  calcularIndicadoresGerais,
} from "../lib/statistics";
import { colaboradoresMock, workshopsMock } from "../mocks/mockData";

export function DashboardPage() {
  const { dados, workshops, isLoading, error, refetch } = useEstatisticas();

  const mockDados = {
    colaboradores: calcularEstatisticasColaboradores(colaboradoresMock, workshopsMock),
    indicadores: calcularIndicadoresGerais(colaboradoresMock, workshopsMock),
  };

  const indicadores = dados?.indicadores ?? mockDados.indicadores;
  const colaboradores = dados?.colaboradores ?? mockDados.colaboradores;
  const workshopsAtivos = workshops.length > 0 ? workshops : workshopsMock;

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Visão geral"
        title="Dashboard de participação"
        description="Indicadores consolidados do ciclo de workshops trimestrais e distribuição de presenças por colaborador e evento."
      />

      {isLoading && <LoadingState label="Consolidando indicadores…" />}

      {!isLoading && (
        <>
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Colaboradores"
              value={String(indicadores.totalColaboradores)}
              hint="Cadastrados na base"
              icon={Users}
            />
            <StatCard
              label="Workshops"
              value={String(indicadores.totalWorkshops)}
              hint="Realizados no ciclo"
              icon={CalendarRange}
            />
            <StatCard
              label="Participações"
              value={String(indicadores.totalParticipacoes)}
              hint="Presenças registradas"
              icon={Users2}
            />
            <StatCard
              label="Média por workshop"
              value={formatarNumero(indicadores.mediaParticipantesPorWorkshop)}
              hint="Participantes por evento"
              icon={Percent}
            />
          </section>

          {workshopsAtivos.length === 0 ? (
            <div className="mt-6">
              <EmptyState
                title="Sem workshops registrados"
                description="Assim que houver workshops cadastrados, os gráficos serão exibidos aqui."
              />
            </div>
          ) : (
            <div className="mt-6 grid gap-5 xl:grid-cols-2">
              <RankingChart colaboradores={colaboradores} />
              <DistributionChart workshops={workshopsAtivos} />
              <div className="xl:col-span-2">
                <EvolutionChart workshops={workshopsAtivos} />
              </div>
            </div>
          )}
        </>
      )}

      {!isLoading && error && (
        <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          Usando dados mockados porque a origem de dados principal não está disponível. {" "}
          <button type="button" onClick={refetch} className="ml-2 underline underline-offset-2">
            tentar novamente
          </button>
        </div>
      )}
    </div>
  );
}
