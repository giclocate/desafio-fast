import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarClock, Users } from 'lucide-react'
import { useWorkshop } from '../hooks/useWorkshops'
import { formatDateTime, getIniciais } from '../lib/utils'
import { ErrorState, LoadingState } from '../components/atoms/States'

export function WorkshopDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const workshopId = Number(id)
  const { workshop, loading, error, refetch } = useWorkshop(workshopId)

  if (loading) {
    return <LoadingState label="Carregando detalhes do workshop…" />
  }

  if (error || !workshop) {
    return (
      <div className="space-y-4 animate-fade-in">
        <button
          type="button"
          onClick={() => navigate('/workshops')}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Voltar para workshops
        </button>
        <ErrorState
          message={error || `Workshop #${id} não foi encontrado.`}
          onRetry={refetch}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <button
        type="button"
        onClick={() => navigate('/workshops')}
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" />
        Voltar para lista de workshops
      </button>

      <header className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-4 text-sm font-medium text-primary">
          <CalendarClock className="size-4" />
          <time dateTime={workshop.dataRealizacao}>
            {formatDateTime(workshop.dataRealizacao)}
          </time>
        </div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
          {workshop.nome}
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          {workshop.descricao}
        </p>
      </header>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Users className="size-5 text-primary" />
            Participantes Confirmados
          </h2>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {workshop.colaboradoresPresentes?.length ?? 0} presenciais
          </span>
        </div>

        {(!workshop.colaboradoresPresentes || workshop.colaboradoresPresentes.length === 0) ? (
          <p className="text-sm text-muted-foreground">Nenhum participante registrado para este workshop.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
            {workshop.colaboradoresPresentes.map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-3 rounded-lg border border-border/60 bg-muted/30 p-3 transition-colors hover:bg-muted/60"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold">
                  {getIniciais(c.nome)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">{c.nome}</p>
                  <p className="text-xs text-muted-foreground">ID: #{c.id}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
