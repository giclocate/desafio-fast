import type { ReactNode } from "react"
import { AlertTriangle, Inbox, Loader2, RefreshCw } from "lucide-react"

export function LoadingState({ label = "Carregando dados…" }: { label?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-3 py-20 text-muted-foreground"
    >
      <Loader2 className="size-8 animate-spin text-primary" aria-hidden />
      <p className="text-sm font-medium">{label}</p>
    </div>
  )
}

export function ErrorState({
  message,
  onRetry,
}: {
  message: string
  onRetry?: () => void
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center gap-4 rounded-[var(--radius)] border border-destructive/30 bg-destructive/5 py-16 px-6 text-center"
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="size-6 text-destructive" aria-hidden />
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-foreground">Não foi possível carregar</p>
        <p className="max-w-sm text-sm text-muted-foreground">{message}</p>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
        >
          <RefreshCw className="size-4" aria-hidden />
          Tentar novamente
        </button>
      )}
    </div>
  )
}

export function EmptyState({
  title,
  description,
  icon,
}: {
  title: string
  description?: string
  icon?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-[var(--radius)] border border-dashed border-border bg-muted/40 py-16 px-6 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        {icon ?? <Inbox className="size-6" aria-hidden />}
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-foreground">{title}</p>
        {description && (
          <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  )
}
