// Autoria: Victor Leandro (@Afrontoso) — folha CartaoDeAtalho (commit ce70b45)
import type { ElementoDeTela, ElementoRenderizado } from './ElementoDeTela'
import { contemTexto } from './Texto'

/**
 * Folha (Leaf) no padrão GoF Composite.
 * Atalho individual do painel, como "Vacinas" ou "Medicamentos". Não possui filhos.
 */
export class CartaoDeAtalho implements ElementoDeTela {
  private readonly id: string
  private readonly titulo: string
  private readonly icone: string
  private readonly url: string

  constructor(id: string, titulo: string, icone: string, url: string) {
    this.id = id
    this.titulo = titulo
    this.icone = icone
    this.url = url
  }

  getId(): string {
    return this.id
  }

  renderizar(): ElementoRenderizado {
    return {
      tipo: 'cartao',
      id: this.id,
      titulo: this.titulo,
      icone: this.icone,
      url: this.url,
    }
  }

  contarElementos(): number {
    return 1
  }

  buscarPorId(id: string): ElementoDeTela | null {
    return this.id === id ? this : null
  }

  buscarPorTexto(termo: string): ElementoDeTela[] {
    return contemTexto(this.titulo, termo) ? [this] : []
  }
}
