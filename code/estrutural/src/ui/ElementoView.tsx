import type { ElementoRenderizado } from '../padrao/ElementoDeTela'

interface Props {
  elemento: ElementoRenderizado
  nivel?: number
}

/**
 * Desenha qualquer nó da árvore devolvida por renderizar().
 * Seções chamam este mesmo componente para cada filho, espelhando a recursão do Composite.
 */
export function ElementoView({ elemento, nivel = 0 }: Props) {
  switch (elemento.tipo) {
    case 'cartao':
      return (
        <a
          className="cartao"
          href={elemento.url}
          // As rotas são simuladas: o clique não sai do painel.
          onClick={(evento) => evento.preventDefault()}
        >
          <span className="cartao-icone" aria-hidden="true">
            {elemento.icone}
          </span>
          <span className="cartao-titulo">{elemento.titulo}</span>
        </a>
      )

    case 'banner':
      return (
        <aside className="banner" aria-label={elemento.titulo}>
          <img className="banner-imagem" src={elemento.imagem} alt="" />
          <div>
            <strong className="banner-titulo">{elemento.titulo}</strong>
            <p className="banner-mensagem">{elemento.mensagem}</p>
          </div>
        </aside>
      )

    case 'secao': {
      const Titulo = nivel === 0 ? 'h2' : 'h3'
      const idTitulo = `secao-${elemento.id}`
      return (
        <section
          className={nivel === 0 ? 'secao' : 'secao secao-aninhada'}
          aria-labelledby={idTitulo}
        >
          <Titulo id={idTitulo} className="secao-titulo">
            {elemento.titulo}
          </Titulo>
          {elemento.descricao && <p className="secao-descricao">{elemento.descricao}</p>}
          <div className="secao-filhos">
            {elemento.filhos.map((filho) => (
              <ElementoView key={filho.id} elemento={filho} nivel={nivel + 1} />
            ))}
          </div>
        </section>
      )
    }
  }
}
