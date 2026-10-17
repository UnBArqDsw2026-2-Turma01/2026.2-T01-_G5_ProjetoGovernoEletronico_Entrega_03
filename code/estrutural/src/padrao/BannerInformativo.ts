// Autoria: Gustavo Fornaciari (@GUGOFO) A classe segue o diagrama V2 (<<Leaf>> BannerInformativo) [commit: c763e51]
import type { ElementoDeTela, ElementoRenderizado } from './ElementoDeTela'
import { contemTexto } from './Texto'

/**
 * Folha (Leaf) no padrão GoF Composite.
 * Aviso ou campanha de saúde exibido no painel. Entra na árvore sem exigir
 * nenhuma alteração em Secao ou Dashboard, que só conhecem ElementoDeTela.
 */
export class BannerInformativo implements ElementoDeTela {
  private readonly id: string
  private readonly titulo: string
  private readonly mensagem: string
  private readonly imagem: string

  constructor(id: string, titulo: string, mensagem: string, imagem: string) {
    this.id = id
    this.titulo = titulo
    this.mensagem = mensagem
    this.imagem = imagem
  }

  getId(): string {
    return this.id
  }

  renderizar(): ElementoRenderizado {
    return {
      tipo: 'banner',
      id: this.id,
      titulo: this.titulo,
      mensagem: this.mensagem,
      imagem: this.imagem,
    }
  }

  contarElementos(): number {
    return 1
  }

  buscarPorId(id: string): ElementoDeTela | null {
    return this.id === id ? this : null
  }

  buscarPorTexto(termo: string): ElementoDeTela[] {
    return contemTexto(this.titulo, termo) || contemTexto(this.mensagem, termo) ? [this] : []
  }
}
