import type { ElementoDeTela, ElementoRenderizado } from './ElementoDeTela'

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
    this.elementos.push(elemento)
  }

  remover(elemento: ElementoDeTela): void {
    const indice = this.elementos.indexOf(elemento)
    if (indice !== -1) {
      this.elementos.splice(indice, 1)
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
}
