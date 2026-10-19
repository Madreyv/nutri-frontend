export type Categoria = {
  id: number
  descricao: string
}

export type Alimento = {
  id: number
  descricao: string
  energia: number | null
  proteina: number | null
  lipideos: number | null
  carboidrato: number | null
  fibra: number | null
  categoria: number
}

export type AlimentoEquivalente = {
  id: number
  nome: string
  energia: number
  quantidadeGramas: number
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '/api').replace(/\/$/, '')

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`)
  if (!response.ok) {
    const detail = await response.text()
    throw new Error(detail || `Falha ao consultar a API (${response.status}).`)
  }
  return response.json() as Promise<T>
}

export const api = {
  categorias: () => getJson<Categoria[]>('/categorias'),
  alimentos: (categoriaId: number) => getJson<Alimento[]>(`/alimentos/${categoriaId}`),
  gruposDoAlimento: (alimentoId: number) => getJson<string[]>(`/alimentos/${alimentoId}/grupos`),
  equivalentes: (alimentoId: number, gramas: number) =>
    getJson<AlimentoEquivalente[]>(`/alimentos/${alimentoId}/equivalentes?gramas=${encodeURIComponent(gramas)}`),
}
