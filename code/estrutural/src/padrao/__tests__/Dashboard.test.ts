// Autoria: Victor Leandro (@Afrontoso) — testes do cliente Dashboard (commit 600b7b6)
import { describe, expect, it } from 'vitest'
import { BannerInformativo } from '../BannerInformativo'
import { CartaoDeAtalho } from '../CartaoDeAtalho'
import { Dashboard } from '../Dashboard'
import { Secao } from '../Secao'

function criarDashboard() {
  const minhaSaude = new Secao('minha-saude', 'Minha Saúde')
  minhaSaude.adicionar(new CartaoDeAtalho('vacinas', 'Vacinas', '💉', '/vacinas'))
  minhaSaude.adicionar(
    new BannerInformativo('campanha', 'Campanha', 'Vacine-se.', '/banner.svg'),
  )

  const miniApps = new Secao('mini-apps', 'Mini apps')
  miniApps.adicionar(new CartaoDeAtalho('dengue', 'Dengue', '🦟', '/dengue'))

  const dashboard = new Dashboard('painel', 'Meu SUS Digital')
  dashboard.adicionarSecao(minhaSaude)
  dashboard.adicionarSecao(miniApps)

  return { dashboard, minhaSaude, miniApps }
}

describe('Dashboard', () => {
  it('soma os elementos de todas as seções', () => {
    const { dashboard } = criarDashboard()

    expect(dashboard.contarElementos()).toBe(3)
  })

  it('encontra elementos em qualquer seção', () => {
    const { dashboard, miniApps } = criarDashboard()

    expect(dashboard.buscarPorId('dengue')?.getId()).toBe('dengue')
    expect(dashboard.buscarPorId('mini-apps')).toBe(miniApps)
  })

  it('retorna null quando o id não existe no painel', () => {
    const { dashboard } = criarDashboard()

    expect(dashboard.buscarPorId('inexistente')).toBeNull()
  })

  it('deixa de considerar uma seção removida', () => {
    const { dashboard, miniApps } = criarDashboard()

    dashboard.removerSecao(miniApps)

    expect(dashboard.contarElementos()).toBe(2)
    expect(dashboard.buscarPorId('dengue')).toBeNull()
  })

  it('renderiza o título e todas as seções na ordem em que foram adicionadas', () => {
    const { dashboard } = criarDashboard()

    const renderizado = dashboard.renderizar()

    expect(renderizado.titulo).toBe('Meu SUS Digital')
    expect(renderizado.secoes.map((secao) => secao.id)).toEqual([
      'minha-saude',
      'mini-apps',
    ])
  })
})

// Testes da V2: Gustavo Fornaciari (@GUGOFO). Melhoria 3: multiplicidades do diagrama para o
// Dashboard, "1" painel por Secao de topo e "1..*" seções por painel.
describe('Dashboard: multiplicidades da composição', () => {
  it('rejeita uma seção nula', () => {
    const { dashboard } = criarDashboard()

    expect(() => dashboard.adicionarSecao(null as unknown as Secao)).toThrow()
  })

  it('rejeita a mesma seção adicionada duas vezes ao painel', () => {
    const { dashboard, minhaSaude } = criarDashboard()

    expect(() => dashboard.adicionarSecao(minhaSaude)).toThrow()

    expect(dashboard.contarElementos()).toBe(3)
  })

  it('rejeita uma seção que já pertence a outro painel', () => {
    const { minhaSaude } = criarDashboard()
    const outro = new Dashboard('outro', 'Outro painel')

    expect(() => outro.adicionarSecao(minhaSaude)).toThrow()

    expect(outro.contarElementos()).toBe(0)
  })

  it('rejeita uma seção que já é filha de outra seção', () => {
    const { dashboard } = criarDashboard()
    const pai = new Secao('pai', 'Pai')
    const filha = new Secao('filha', 'Filha')
    pai.adicionar(filha)

    expect(() => dashboard.adicionarSecao(filha)).toThrow()

    expect(dashboard.buscarPorId('filha')).toBeNull()
  })

  it('impede que uma seção de topo do painel seja colocada dentro de outra seção', () => {
    const { minhaSaude, miniApps } = criarDashboard()

    expect(() => minhaSaude.adicionar(miniApps)).toThrow()

    expect(minhaSaude.buscarPorId('mini-apps')).toBeNull()
  })

  it('aceita a seção em outro painel depois de removida do primeiro', () => {
    const { dashboard, miniApps } = criarDashboard()
    const outro = new Dashboard('outro', 'Outro painel')

    dashboard.removerSecao(miniApps)
    outro.adicionarSecao(miniApps)

    expect(outro.buscarPorId('mini-apps')).toBe(miniApps)
  })

  it('não deixa o painel ficar sem nenhuma seção', () => {
    const { dashboard, minhaSaude, miniApps } = criarDashboard()
    dashboard.removerSecao(miniApps)

    expect(() => dashboard.removerSecao(minhaSaude)).toThrow()

    expect(dashboard.buscarPorId('minha-saude')).toBe(minhaSaude)
  })

  it('ignora a remoção de uma seção que não é do painel, mesmo com uma só seção', () => {
    const { dashboard, minhaSaude, miniApps } = criarDashboard()
    dashboard.removerSecao(miniApps)

    dashboard.removerSecao(new Secao('estranha', 'Estranha'))

    expect(dashboard.buscarPorId('minha-saude')).toBe(minhaSaude)
  })
})
