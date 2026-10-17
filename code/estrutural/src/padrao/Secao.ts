// Autoria: Victor Leandro (@Afrontoso) — composto Secao (commit d575efa)
// Evolução do código (V2): Gustavo Fornaciari (@GUGOFO). Melhorias 1 e 2 em adicionar() e remover()
import { definirDono, liberarDono, obterDono } from './donoDoElemento'
import type { ElementoDeTela, ElementoRenderizado } from './ElementoDeTela'
import { contemTexto } from './Texto'

/**
 * Composto (Composite) no padrão GoF Composite.
 * Agrupa cartões, banners e outras seções, repassando as operações aos filhos.
 */
export class Secao implements ElementoDeTela {
  private readonly id: string
  private readonly titulo: string
  private readonly descricao: string
  private readonly elementos: ElementoDeTela[] = []

  constructor(id: string, titulo: string, descricao = '') {
    this.id = id
    this.titulo = titulo
    this.descricao = descricao
  }

  getId(): string {
    return this.id
  }

  adicionar(elemento: ElementoDeTela): void {
    if (elemento == null) {
      throw new Error('Não é possível adicionar um elemento nulo à seção.')
    }
    if (elemento === this) {
      throw new Error('Uma seção não pode conter a si mesma.')
    }
    // Melhoria 1 (Gustavo): a composição "Elementos" do diagrama tem multiplicidade 0..1 do
    // lado do elemento, ou seja, ele tem no máximo um pai. Quem já pertence a uma seção
    // ou a um painel não pode ser adicionado de novo (limitação apontada na V1).
    if (obterDono(elemento) !== undefined) {
      throw new Error(`O elemento "${elemento.getId()}" já pertence a uma seção ou a um painel.`)
    }
    // Melhoria 2 (Gustavo): amplia a nota "adicionar(): rejeita a própria seção" para o ciclo
    // indireto (A contém B, que passaria a conter A). A árvore do Composite não pode ter ciclos.
    if (this.estaSobOuIgualA(elemento)) {
      throw new Error(`Adicionar "${elemento.getId()}" em "${this.id}" criaria um ciclo na árvore.`)
    }
    this.elementos.push(elemento)
    definirDono(elemento, this)
  }

  remover(elemento: ElementoDeTela): void {
    const indice = this.elementos.indexOf(elemento)
    if (indice !== -1) {
      this.elementos.splice(indice, 1)
      liberarDono(elemento)
    }
  }

  renderizar(): ElementoRenderizado {
    return {
      tipo: 'secao',
      id: this.id,
      titulo: this.titulo,
      descricao: this.descricao,
      filhos: this.elementos.map((elemento) => elemento.renderizar()),
    }
  }

  contarElementos(): number {
    return this.elementos.reduce(
      (total, elemento) => total + elemento.contarElementos(),
      0,
    )
  }

  buscarPorId(id: string): ElementoDeTela | null {
    if (this.id === id) {
      return this
    }
    for (const elemento of this.elementos) {
      const encontrado = elemento.buscarPorId(id)
      if (encontrado) {
        return encontrado
      }
    }
    return null
  }

  buscarPorTexto(termo: string): ElementoDeTela[] {
    const achados = this.elementos.flatMap((elemento) => elemento.buscarPorTexto(termo))
    return contemTexto(this.titulo, termo) ? [this, ...achados] : achados
  }

  // Melhoria 2 (Gustavo): sobe pela cadeia de pais a partir desta seção e informa se o
  // candidato é ela mesma ou algum ancestral, caso em que adicioná-lo fecharia um ciclo.
  private estaSobOuIgualA(candidato: ElementoDeTela): boolean {
    let atual: object | undefined = this
    while (atual !== undefined) {
      if (atual === candidato) {
        return true
      }
      atual = obterDono(atual)
    }
    return false
  }
}
