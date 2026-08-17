import type { ReactNode } from "react"
import { Sidebar } from "../molecules/Sidebar"

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Sidebar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">{children}</main>
      <footer className="border-t border-border py-6">
        <p className="mx-auto max-w-6xl px-4 text-center text-xs text-muted-foreground sm:px-6">
          Desafio 2a — Etapa Frontend · Rastreador de Workshops da FAST Soluções
        </p>
      </footer>
    </div>
  )
}
