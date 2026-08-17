import { useMemo, useState, type KeyboardEvent } from "react"
import { useNavigate } from "react-router-dom"
import { CalendarDays, CalendarClock, Users } from "lucide-react"
import { PageHeader } from "../components/template/PageHeader"
import { SearchInput } from "../components/atoms/SearchInput"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/molecules/Card"
import { EmptyState, ErrorState, LoadingState } from "../components/atoms/States"
import { useWorkshops } from "../hooks/useWorkshops"
import { formatDateTime, toDateInputValue, truncate } from "../lib/utils"

export function WorkshopsPage() {
  const { workshops = [], loading, error, refetch } = useWorkshops()
  const [busca, setBusca] = useState("")
  const [dataFiltro, setDataFiltro] = useState("")
  const navigate = useNavigate()

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase()
    const safeWorkshops = Array.isArray(workshops) ? workshops : []
    const lista = safeWorkshops.filter((w) => {
      const matchNome = termo ? (w?.nome || "").toLowerCase().includes(termo) : true
      const matchData = dataFiltro ? toDateInputValue(w?.dataRealizacao) === dataFiltro : true
      return matchNome && matchData
    })
    return [...lista].sort(
      (a, b) => new Date(a?.dataRealizacao || 0).getTime() - new Date(b?.dataRealizacao || 0).getTime(),
    )
  }, [workshops, busca, dataFiltro])

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Workshops"
        description="Todos os workshops realizados. Clique em um card para ver a descrição completa e os participantes."
      />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="w-full sm:max-w-sm">
          <SearchInput
            value={busca}
            onChange={setBusca}
            label="Buscar workshop por nome"
            placeholder="Buscar por nome…"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="filtro-data" className="sr-only">
            Filtrar por data
          </label>
          <input
            id="filtro-data"
            type="date"
            value={dataFiltro}
            onChange={(e) => setDataFiltro(e.target.value)}
            className="rounded-md border border-input bg-card px-3 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30 
            [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:brightness-0 [&::-webkit-calendar-picker-indicator]:white" 
          />
          {(busca || dataFiltro) && (
            <button
              type="button"
              onClick={() => {
                setBusca("")
                setDataFiltro("")
              }}
              className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Limpar
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <LoadingState label="Carregando workshops…" />
      ) : error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : filtrados.length === 0 ? (
        <EmptyState
          title="Nenhum workshop encontrado"
          description="Ajuste a busca ou o filtro de data para ver resultados."
          icon={<CalendarDays className="size-6 text-white" aria-hidden />}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((w) => (
            <Card
              key={w.id}
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/workshops/${w.id}`)}
              onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  navigate(`/workshops/${w.id}`)
                }
              }}
              className="flex cursor-pointer flex-col transition-all hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            >
              <CardHeader>
                <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-primary">
                  <CalendarClock className="size-3.5" aria-hidden />
                  <time dateTime={w.dataRealizacao}>{formatDateTime(w.dataRealizacao)}</time>
                </div>
                <CardTitle className="text-pretty">{w.nome}</CardTitle>
                <CardDescription>{truncate(w.descricao, 110)}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  <Users className="size-3.5" aria-hidden />
                  {w.colaboradoresPresentes?.length ?? 0} participantes
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
