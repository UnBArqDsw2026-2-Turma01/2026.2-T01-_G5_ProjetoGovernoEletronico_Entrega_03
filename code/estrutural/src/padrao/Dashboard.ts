// Autoria: Victor Leandro (@Afrontoso) — cliente Dashboard (commit 600b7b6)
// Evolução do código (V2): Gustavo Fornaciari (@GUGOFO).
import { definirDono, liberarDono, obterDono } from './donoDoElemento'
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

  // Melhoria 3 (Gustavo): no diagrama cada Secao de topo pertence a exatamente 1 Dashboard
  // (multiplicidade "1" do lado do Dashboard). Rejeita seção nula e seção que já tem dono,
  // seja outro painel, seja outra seção.
  adicionarSecao(secao: Secao): void {
    if (secao == null) {
      throw new Error('Não é possível adicionar uma seção nula ao painel.')
    }
    if (obterDono(secao) !== undefined) {
      throw new Error(`A seção "${secao.getId()}" já pertence a um painel ou a outra seção.`)
    }
    this.secoes.push(secao)
    definirDono(secao, this)
  }

  // Melhoria 3 (Gustavo): o diagrama declara 1..* seções por Dashboard, então um painel já
  // montado não pode ficar sem nenhuma. Seções que não são do painel continuam sendo ignoradas.
  removerSecao(secao: Secao): void {
    const indice = this.secoes.indexOf(secao)
    if (indice === -1) {
      return
    }
    if (this.secoes.length === 1) {
      throw new Error('O painel precisa manter ao menos uma seção.')
    }
    this.secoes.splice(indice, 1)
    liberarDono(secao)
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
