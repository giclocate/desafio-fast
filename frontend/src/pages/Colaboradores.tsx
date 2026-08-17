import { useMemo, useState, type HTMLAttributes } from "react";
import { CollaboratorsTable, type CollaboratorSortKey,
} from "../components/molecules/CollaboratorsTable";
import { SearchInput } from "../components/atoms/SearchInput";
import { EmptyState, ErrorState } from "../components/atoms/States";
import { PageHeader } from "../components/template/PageHeader";
import { Badge } from "../components/atoms/Badge";
import { useEstatisticas } from "../hooks/useFastData";
import type { ColaboradorComEstatisticas } from "../types";
import { normalizarTexto } from "../lib/utils";

function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={[
        "animate-pulse rounded-md bg-primary/10",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

export function ColaboradoresPage() {
  const { dados, isLoading, error, refetch } = useEstatisticas();
  const [busca, setBusca] = useState("");
  const [sortKey, setSortKey] = useState<CollaboratorSortKey>("nome");
  const [selecionado, setSelecionado] = useState<ColaboradorComEstatisticas | null>(null);

  const colaboradores = useMemo(() => {
    const lista = dados?.colaboradores ?? [];
    const termo = normalizarTexto(busca);
    const filtrados = termo
      ? lista.filter((colaborador) => normalizarTexto(colaborador.nome).includes(termo))
      : lista;

    return [...filtrados].sort((a, b) =>
      sortKey === "nome"
        ? a.nome.localeCompare(b.nome, "pt-BR")
        : b.totalWorkshops - a.totalWorkshops || a.nome.localeCompare(b.nome, "pt-BR"),
    );
  }, [dados, busca, sortKey]);

  const total = dados?.colaboradores.length ?? 0;

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Colaboradores"
        description="Clique em um colaborador para ver as estatísticas individuais de participação."
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          label="Buscar colaborador por nome"
          placeholder="Buscar por nome…"
          value={busca}
          onChange={setBusca}
        />
        <p className="text-xs text-muted-foreground">
          Exibindo {colaboradores.length} de {total} · ordenado por{" "}
          {sortKey === "nome" ? "nome" : "participações"}
        </p>
      </div>

      {isLoading && (
        <div className="space-y-3 rounded-xl border border-border bg-card p-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-2/3" />
              </div>
              <Skeleton className="h-7 w-16" />
            </div>
          ))}
        </div>
      )}

      {!isLoading && error && <ErrorState message={error} onRetry={refetch} />}

      {!isLoading && !error && colaboradores.length === 0 && (
        <EmptyState
          title="Nenhum colaborador encontrado"
          description={
            busca
              ? `Não há colaboradores correspondentes a “${busca}”.`
              : "Ainda não existem colaboradores cadastrados."
          }
        />
      )}

      {!isLoading && !error && colaboradores.length > 0 && (
        <CollaboratorsTable
          colaboradores={colaboradores}
          sortKey={sortKey}
          onSortChange={setSortKey}
          onSelect={setSelecionado}
        />
      )}
    </div>
  );
}
