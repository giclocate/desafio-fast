import { useCallback, useEffect, useState } from "react"
import type { Workshop } from "../types"
import { api } from "../services/api"

interface UseWorkshopsResult {
  workshops: Workshop[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useWorkshops(): UseWorkshopsResult {
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.getWorkshops()
      setWorkshops(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return { workshops, loading, error, refetch: load }
}

interface UseWorkshopResult {
  workshop: Workshop | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useWorkshop(id: number): UseWorkshopResult {
  const [workshop, setWorkshop] = useState<Workshop | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.getWorkshopById(id)
      setWorkshop(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido")
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    load()
  }, [load])

  return { workshop, loading, error, refetch: load }
}
