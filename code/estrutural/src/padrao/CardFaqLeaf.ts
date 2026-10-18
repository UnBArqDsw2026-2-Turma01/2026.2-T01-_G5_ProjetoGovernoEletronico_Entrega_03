// Autoria: Ana Beatriz (@AnnaBeatrizAraujo) — folha CardFaqLeaf (Código V4). A classe segue o diagrama V4 (<<Leaf>> CardFaqLeaf).
import type { ElementoDeTela, ElementoRenderizado } from './ElementoDeTela'
import { contemTexto } from './Texto'

/**
 * Folha (Leaf) do padrão Composite para cartões.
 * Implementa ElementoDeTela conforme o diagrama V4, sem possuir filhos ou métodos de adição/remoção.
 * 
 * Atributos: -id, -pergunta, -resposta, -categoria.
 * Métodos: getId(), renderizar(), contarElementos() [retorna 1], buscarPorId() e buscarPorTexto().
 */

export class CardFaqLeaf implements ElementoDeTela {
  // Atributos do diagrama V4: -id, -pergunta, -resposta, -categoria.
  private readonly id: string
  private readonly pergunta: string
  private readonly resposta: string
  private readonly categoria: string

  constructor(id: string, pergunta: string, resposta: string, categoria: string) {
    this.id = id
    this.pergunta = pergunta
    this.resposta = resposta
    this.categoria = categoria
  }

  /** Operação `getId(): String` da interface ElementoDeTela. */
  getId(): string {
    return this.id
  }

  /**
   * Operação `renderizar(): ElementoRenderizado` da interface. Devolve a descrição deste cartão
   * pronta para a interface desenhar (o núcleo do padrão não depende de React).
   *
   * O DTO ElementoRenderizado do diagrama V4 tem `id` e `titulo` em todos os tipos. Aqui o
   * `titulo` recebe a `pergunta`, que é o que o cartão exibe como cabeçalho; `resposta` e
   * `categoria` mantêm os nomes do diagrama. A variante 'faq' foi acrescentada ao tipo em
   * ElementoDeTela.ts, pois o DTO do diagrama só lista 'cartao', 'banner' e 'secao'.
   */
  renderizar(): ElementoRenderizado {
    return {
      tipo: 'faq',
      id: this.id,
      titulo: this.pergunta,
      resposta: this.resposta,
      categoria: this.categoria,
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
   * Nota da folha: "buscarPorTexto(): retorna this se algum texto exibido contiver o termo (sem
   * acentos e sem diferenciar maiúsculas); senão, lista vazia" (retorno `ElementoDeTela [0..*]`).
   * Os textos exibidos de um cartão de FAQ são a pergunta e a resposta. A `categoria` é uma
   * classificação do cartão, e não texto do cartão, então não entra na busca; se a interface
   * passar a exibi-la, basta incluí-la aqui. A comparação sem acento e sem maiúsculas já é feita
   * por `contemTexto` (Texto.ts).
   */
  buscarPorTexto(termo: string): ElementoDeTela[] {
    return contemTexto(this.pergunta, termo) || contemTexto(this.resposta, termo) ? [this] : []
  }
}
