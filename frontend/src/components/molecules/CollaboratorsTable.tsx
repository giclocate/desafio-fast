import { ArrowUpDown } from "lucide-react";
import type { ColaboradorComEstatisticas } from "../../types";
import { formatarPercentual } from "../../lib/utils";

export type CollaboratorSortKey = "nome" | "participacoes";

interface CollaboratorsTableProps {
  colaboradores: ColaboradorComEstatisticas[];
  sortKey: CollaboratorSortKey;
  onSortChange: (key: CollaboratorSortKey) => void;
  onSelect: (colaborador: ColaboradorComEstatisticas) => void;
}

export function CollaboratorsTable({
  colaboradores,
  sortKey,
  onSortChange,
  onSelect,
}: CollaboratorsTableProps) {
  const renderSortButton = (
    label: string,
    key: CollaboratorSortKey,
  ) => {
    const active = sortKey === key;

    return (
      <button
        type="button"
        onClick={() => onSortChange(key)}
        className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
          active
            ? "text-highlight"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {label}
        <ArrowUpDown className="size-3" aria-hidden="true" />
      </button>
    );
  };

  return (
    <div className="panel overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[34rem] text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="h-10 w-16 px-2 text-center align-middle text-xs font-medium uppercase tracking-wider text-muted-foreground">
                ID
              </th>

              <th className="h-10 px-2 text-center align-middle">
                {renderSortButton("Colaborador", "nome")}
              </th>

              <th className="h-10 px-2 text-center align-middle">
                {renderSortButton("Workshops", "participacoes")}
              </th>

              <th className="hidden h-10 px-2 text-center align-middle text-xs font-medium uppercase tracking-wider text-muted-foreground sm:table-cell">
                Participação
              </th>
            </tr>
          </thead>

          <tbody>
            {colaboradores.map((colaborador) => (
              <tr
                key={colaborador.id}
                onClick={() => onSelect(colaborador)}
                className="cursor-pointer border-b border-border transition-colors last:border-0 hover:bg-secondary/60 focus-within:bg-secondary/60"
              >
                <td className="p-2 text-center align-middle font-mono text-xs text-muted-foreground">
                  #{String(colaborador.id).padStart(2, "0")}
                </td>

                <td className="p-2 align-middle">
                  <div className="mx-auto flex w-fit max-w-full items-center justify-end gap-3 text-left">

                    <span className="text-sm font-medium text-foreground">
                      {colaborador.nome}
                    </span>
                  </div>
                </td>

                <td className="p-2 text-center align-middle">
                  <span className="text-normal text-highlight">
                    {colaborador.totalWorkshops}
                  </span>
                </td>

                <td className="hidden p-2 text-center align-middle text-sm tabular-nums text-muted-foreground sm:table-cell">
                  {formatarPercentual(colaborador.percentualParticipacao)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}