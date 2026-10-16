// Autoria: Victor Leandro (@Afrontoso) — painel com contarElementos() (commit 4e527b0)
import type { Dashboard } from '../padrao/Dashboard'
import { ElementoView } from './ElementoView'

interface Props {
  painel: Dashboard
}

export function PainelView({ painel }: Props) {
  const { titulo, secoes } = painel.renderizar()

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

      <main className="painel-secoes">
        {secoes.map((secao) => (
          <ElementoView key={secao.id} elemento={secao} />
        ))}
      </main>
    </div>
  )
}
