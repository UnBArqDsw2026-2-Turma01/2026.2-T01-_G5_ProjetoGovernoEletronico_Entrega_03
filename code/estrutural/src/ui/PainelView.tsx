// Autoria: Victor Leandro (@Afrontoso) — painel com contarElementos() (commit 4e527b0)
// Evolução (V3): Julia Oliveira Patricio (@juliapat18) — campo de busca por texto
import { useState } from 'react'
import type { Dashboard } from '../padrao/Dashboard'
import { ElementoView } from './ElementoView'

interface Props {
  painel: Dashboard
}

export function PainelView({ painel }: Props) {
  const { titulo, secoes } = painel.renderizar()
  const [termo, setTermo] = useState('')
  const resultados = painel.buscarPorTexto(termo).map((elemento) => elemento.renderizar())

  return (
    <div className="painel">
      <header className="painel-cabecalho">
        <h1>{titulo}</h1>
        <p>Painel inicial montado com o padrão GoF Composite</p>
      </header>

      <section className="gof" aria-label="Operações do Composite">
        <p className="gof-contagem">
          <code>contarElementos()</code>: <strong>{painel.contarElementos()}</strong> elementos no painel
        </p>
      </section>

      <section className="gof" aria-label="Busca por texto">
        <label htmlFor="busca-texto">
          <code>buscarPorTexto()</code>:{' '}
        </label>
        <input
          id="busca-texto"
          type="search"
          placeholder="Buscar serviço..."
          value={termo}
          onChange={(evento) => setTermo(evento.target.value)}
        />
        {termo.trim() !== '' && (
          <>
            <p className="gof-contagem">
              <strong>{resultados.length}</strong> resultado(s)
            </p>
            <ul aria-label="Resultados da busca">
              {resultados.map((resultado) => (
                <li key={resultado.id}>
                  {resultado.titulo} ({resultado.tipo})
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <main className="painel-secoes">
        {secoes.map((secao) => (
          <ElementoView key={secao.id} elemento={secao} />
        ))}
      </main>
    </div>
  )
}