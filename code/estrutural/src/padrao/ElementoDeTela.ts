// Autoria: Victor Leandro (@Afrontoso) — Component do Composite (commit 4c1c3c2)
/**
 * Descrição de um elemento pronta para ser exibida pela interface.
 * O núcleo do padrão não depende de React: renderizar() devolve esta
 * estrutura e a camada ui/ decide como desenhá-la.
 */
export type ElementoRenderizado =
  | {
      tipo: 'cartao'
      id: string
      titulo: string
      icone: string
      url: string
    }
  | {
      tipo: 'banner'
      id: string
      titulo: string
      mensagem: string
      imagem: string
    }
  | {
      tipo: 'secao'
      id: string
      titulo: string
      descricao: string
      filhos: ElementoRenderizado[]
    }
  // ACRESCENTADO por Ana Beatriz (@AnnaBeatrizAraujo) — Código V4.
  
  | {
      tipo: 'miniapp'
      id: string
      titulo: string
      descricao: string
      icone: string
    }
  | {
      tipo: 'faq'
      id: string
      titulo: string
      resposta: string
      categoria: string
    }

/**
 * Componente (Component) no padrão GoF Composite.
 * Interface comum que permite tratar folhas e compostos de forma uniforme.
 */
export interface ElementoDeTela {
  getId(): string
  renderizar(): ElementoRenderizado
  contarElementos(): number
  buscarPorId(id: string): ElementoDeTela | null
  buscarPorTexto(termo: string): ElementoDeTela[]
}
