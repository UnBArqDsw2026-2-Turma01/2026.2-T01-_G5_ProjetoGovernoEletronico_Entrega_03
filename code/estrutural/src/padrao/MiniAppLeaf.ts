// Autoria: Ana Beatriz (@AnnaBeatrizAraujo) — folha MiniAppLeaf (Código V4). A classe segue o
// diagrama V4 (<<Leaf>> MiniAppLeaf).
import type { ElementoDeTela, ElementoRenderizado } from './ElementoDeTela'
import { contemTexto } from './Texto'

/**
 * Folha (Leaf) do padrão Composite para cartões de miniaplicativos.
 * Implementa ElementoDeTela conforme o diagrama V4, sem possuir filhos ou métodos de adição/remoção.
 * 
 * Atributos: -id, -nomeApp, -descricao, -icone.
 * Métodos: getId(), renderizar(), contarElementos() [retorna 1], buscarPorId() e buscarPorTexto().
 */

export class MiniAppLeaf implements ElementoDeTela {
  // Atributos do diagrama V4: -id, -nomeApp, -descricao, -icone.
  private readonly id: string
  private readonly nomeApp: string
  private readonly descricao: string
  private readonly icone: string

  constructor(id: string, nomeApp: string, descricao: string, icone: string) {
    this.id = id
    this.nomeApp = nomeApp
    this.descricao = descricao
    this.icone = icone
  }

  /** Operação `getId(): String` da interface ElementoDeTela. */
  getId(): string {
    return this.id
  }

  /**
   * Operação `renderizar(): ElementoRenderizado` da interface. Devolve a descrição deste cartão
   * pronta para a interface desenhar (o núcleo do padrão não depende de React).
   */
  renderizar(): ElementoRenderizado {
    return {
      tipo: 'miniapp',
      id: this.id,
      titulo: this.nomeApp,
      descricao: this.descricao,
      icone: this.icone,
    }
  }

  /** Nota da folha: "contarElementos(): retorna 1". A folha conta apenas a si mesma. */
  contarElementos(): number {
    return 1
  }

  /**
   * Nota da folha: "buscarPorId(id): retorna this se o id for igual; caso contrário, retorna
   * null". Corresponde ao retorno `ElementoDeTela [0..1]` do diagrama.
   */
  buscarPorId(id: string): ElementoDeTela | null {
    return this.id === id ? this : null
  }

  /**
   * Nota da folha: "buscarPorTexto()
   */
  buscarPorTexto(termo: string): ElementoDeTela[] {
    return contemTexto(this.nomeApp, termo) || contemTexto(this.descricao, termo) ? [this] : []
  }
}
