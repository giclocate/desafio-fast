import type { Colaborador, Workshop } from "../types"
import { colaboradoresMock, workshopsMock } from "../mocks/mockData"

/**
 * Camada de abstração de dados.
 *
 * Alterne entre Mock Data e a API REST real mudando `USE_MOCK` para `false`
 * (ou definindo a variável de ambiente `VITE_USE_MOCK="false"`).
 *
 * Endpoints REST esperados:
 *   GET /api/colaboradores
 *   GET /api/workshops
 *   GET /api/workshops/:id
 */

const envMock = import.meta.env.VITE_USE_MOCK
export const USE_MOCK: boolean = envMock !== undefined ? envMock !== "false" : true

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? "/api"


const MOCK_DELAY = 600
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Accept: "application/json" },
  })
  if (!res.ok) {
    throw new Error(`Falha ao carregar dados (HTTP ${res.status})`)
  }
  return (await res.json()) as T
}

export const api = {
  async getColaboradores(): Promise<Colaborador[]> {
    if (USE_MOCK) {
      await delay(MOCK_DELAY)
      return structuredClone(colaboradoresMock)
    }
    return request<Colaborador[]>("/colaboradores")
  },

  async getWorkshops(): Promise<Workshop[]> {
    if (USE_MOCK) {
      await delay(MOCK_DELAY)
      return structuredClone(workshopsMock)
    }
    return request<Workshop[]>("/workshops")
  },

  async getWorkshopById(id: number): Promise<Workshop> {
    if (USE_MOCK) {
      await delay(MOCK_DELAY)
      const found = workshopsMock.find((w) => w.id === id)
      if (!found) throw new Error(`Workshop ${id} não encontrado`)
      return structuredClone(found)
    }
    return request<Workshop>(`/workshops/${id}`)
  },
}
