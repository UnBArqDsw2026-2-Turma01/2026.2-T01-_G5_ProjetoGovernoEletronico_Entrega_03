// Autoria: Julia Oliveira Patricio (@juliapat18) — apoio à busca por texto (Código V3)
function normalizar(texto: string): string {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

export function contemTexto(texto: string, termo: string): boolean {
  if (termo.trim() === '') {
    return false
  }
  return normalizar(texto).includes(normalizar(termo.trim()))
}