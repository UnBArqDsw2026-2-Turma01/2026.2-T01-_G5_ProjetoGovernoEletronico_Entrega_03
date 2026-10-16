// Autoria: Victor Leandro (@Afrontoso) — painel com contarElementos() e buscarPorId() (commit 4e527b0)
import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Dashboard } from '../padrao/Dashboard'
import type { ElementoDeTela } from '../padrao/ElementoDeTela'
import { ElementoView } from './ElementoView'

interface Props {
  painel: Dashboard
}

type ResultadoBusca =
  | { estado: 'vazio' }
  | { estado: 'encontrado'; elemento: ElementoDeTela }
  | { estado: 'nao-encontrado'; id: string }

const NOMES_DOS_TIPOS = {
  cartao: 'Cartão de atalho (folha)',
  banner: 'Banner informativo (folha)',
  secao: 'Seção (composto)',
} as const

export function PainelView({ painel }: Props) {
  const [idBuscado, setIdBuscado] = useState('')
  const [resultado, setResultado] = useState<ResultadoBusca>({ estado: 'vazio' })

  const { titulo, secoes } = painel.renderizar()

  function buscar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    const id = idBuscado.trim()
    if (!id) return
    const elemento = painel.buscarPorId(id)
    setResultado(elemento ? { estado: 'encontrado', elemento } : { estado: 'nao-encontrado', id })
  }

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

        <form className="gof-busca" onSubmit={buscar}>
          <label htmlFor="id-buscado">
            <code>buscarPorId()</code>
          </label>
          <input
            id="id-buscado"
            value={idBuscado}
            onChange={(evento) => setIdBuscado(evento.target.value)}
            placeholder="ex.: vacinas, mini-apps, mais-servicos"
          />
          <button type="submit">Buscar</button>
        </form>

        <div role="status" className="gof-resultado">
          {resultado.estado === 'encontrado' && (
            <ResultadoEncontrado elemento={resultado.elemento} />
          )}
          {resultado.estado === 'nao-encontrado' && (
            <span>
              Nenhum elemento com o id <code>{resultado.id}</code>.
            </span>
          )}
        </div>
      </section>

      <main className="painel-secoes">
        {secoes.map((secao) => (
          <ElementoView key={secao.id} elemento={secao} />
        ))}
      </main>
    </div>
  )
}

function ResultadoEncontrado({ elemento }: { elemento: ElementoDeTela }) {
  // O resultado é tratado só pela interface comum, sem saber a classe concreta.
  const descricao = elemento.renderizar()
  return (
    <span>
      Encontrado: <strong>{descricao.titulo}</strong> — {NOMES_DOS_TIPOS[descricao.tipo]}, com{' '}
      {elemento.contarElementos()} elemento(s).
    </span>
  )
}
