/** Formata uma data ISO para o padrão brasileiro dd/mm/aaaa às HH:mm. */
export function formatDateTime(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

/** Somente a data (dd/mm/aaaa). */
export function formatDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date)
}

/** Data no formato yyyy-mm-dd para comparação com <input type="date">. */
export function toDateInputValue(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ""
  return date.toISOString().slice(0, 10)
}

/** Iniciais para avatar (ex: "Ana Beatriz Lima" -> "AL"). */
export function getIniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/)
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase()
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase()
}

/** Resume um texto longo para exibição em listas. */
export function truncate(text: string, max = 120): string {
  if (text.length <= max) return text
  return text.slice(0, max).trimEnd() + "…"
}

/** Rótulo curto de trimestre, ex.: "1º tri 2025". */
export function formatarTrimestre(dataISO: string): string {
  const data = new Date(`${dataISO}T00:00:00Z`);
  const trimestre = Math.floor(data.getUTCMonth() / 3) + 1;
  return `${trimestre}º tri ${data.getUTCFullYear()}`;
}

export function formatarPercentual(valor: number): string {
  return `${valor.toFixed(0)}%`;
}

export function formatarNumero(valor: number, casas = 1): string {
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: casas,
  });
}

/** Normaliza texto para busca (minúsculo e sem acentos). */
export function normalizarTexto(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/** Corta um texto longo preservando palavras. */
export function resumirTexto(texto: string, limite = 140): string {
  if (texto.length <= limite) return texto;
  const cortado = texto.slice(0, limite);
  return `${cortado.slice(0, cortado.lastIndexOf(" "))}…`;
}
