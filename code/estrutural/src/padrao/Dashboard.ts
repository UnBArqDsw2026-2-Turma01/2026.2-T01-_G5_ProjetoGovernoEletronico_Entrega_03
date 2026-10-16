import type { ElementoDeTela, ElementoRenderizado } from './ElementoDeTela'
import type { Secao } from './Secao'

export interface DashboardRenderizado {
  id: string
  titulo: string
  secoes: ElementoRenderizado[]
}

/**
 * Cliente (Client) no padrão GoF Composite.
 * Raiz que organiza as seções do painel. Não implementa ElementoDeTela:
 * apenas delega as operações para cada Secao, sem diferenciar folha de composto.
 */
export class Dashboard {
  private readonly id: string
  private readonly titulo: string
  private readonly secoes: Secao[] = []

  constructor(id: string, titulo: string) {
    this.id = id
    this.titulo = titulo
  }

  adicionarSecao(secao: Secao): void {
    this.secoes.push(secao)
  }

  removerSecao(secao: Secao): void {
    const indice = this.secoes.indexOf(secao)
    if (indice !== -1) {
      this.secoes.splice(indice, 1)
    }
  }

  renderizar(): DashboardRenderizado {
    return {
      id: this.id,
      titulo: this.titulo,
      secoes: this.secoes.map((secao) => secao.renderizar()),
    }
  }

  contarElementos(): number {
    return this.secoes.reduce(
      (total, secao) => total + secao.contarElementos(),
      0,
    )
  }

  buscarPorId(id: string): ElementoDeTela | null {
    for (const secao of this.secoes) {
      const encontrado = secao.buscarPorId(id)
      if (encontrado) {
        return encontrado
      }
    }
    return null
  }
}
