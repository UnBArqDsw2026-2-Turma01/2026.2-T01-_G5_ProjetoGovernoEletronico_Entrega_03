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
