// Autoria: Victor Leandro (@Afrontoso) — testes da folha BannerInformativo (commit fd71b23)
import { describe, expect, it } from 'vitest'
import { BannerInformativo } from '../BannerInformativo'
import { CartaoDeAtalho } from '../CartaoDeAtalho'
import { Dashboard } from '../Dashboard'
import { Secao } from '../Secao'

describe('BannerInformativo', () => {
  const banner = new BannerInformativo(
    'campanha-gripe',
    'Campanha de vacinação',
    'Vacine-se contra a gripe na UBS mais próxima.',
    '/banner-campanha.svg',
  )

  it('conta a si mesmo como um único elemento', () => {
    expect(banner.contarElementos()).toBe(1)
  })

  it('retorna a si mesmo quando o id é igual', () => {
    expect(banner.buscarPorId('campanha-gripe')).toBe(banner)
  })

  it('retorna null quando o id é diferente', () => {
    expect(banner.buscarPorId('vacinas')).toBeNull()
  })

  it('renderiza os próprios dados como um banner', () => {
    expect(banner.renderizar()).toEqual({
      tipo: 'banner',
      id: 'campanha-gripe',
      titulo: 'Campanha de vacinação',
      mensagem: 'Vacine-se contra a gripe na UBS mais próxima.',
      imagem: '/banner-campanha.svg',
    })
  })
})

// Testes da V2: Gustavo Fornaciari (@GUGOFO). Verificam a nota do diagrama sobre a folha:
// "Entra na árvore sem alterar Secao nem Dashboard. Segue o mesmo contrato de folha do
// CartaoDeAtalho", e como ela convive com as regras de composição da V2.
describe('BannerInformativo na árvore do Composite', () => {
  function criarBanner() {
    return new BannerInformativo('campanha', 'Campanha', 'Vacine-se.', '/banner.svg')
  }

  it('é tratado como o CartaoDeAtalho por uma seção: cada folha conta um elemento', () => {
    const secao = new Secao('destaques', 'Destaques')
    secao.adicionar(criarBanner())
    secao.adicionar(new CartaoDeAtalho('vacinas', 'Vacinas', '💉', '/vacinas'))

    expect(secao.contarElementos()).toBe(2)
  })

  it('é encontrado por buscarPorId a partir da seção e do painel', () => {
    const banner = criarBanner()
    const secao = new Secao('destaques', 'Destaques')
    secao.adicionar(banner)
    const painel = new Dashboard('painel', 'Meu SUS Digital')
    painel.adicionarSecao(secao)

    expect(secao.buscarPorId('campanha')).toBe(banner)
    expect(painel.buscarPorId('campanha')).toBe(banner)
    expect(painel.contarElementos()).toBe(1)
  })

  it('aparece como banner dentro da seção renderizada', () => {
    const secao = new Secao('destaques', 'Destaques')
    secao.adicionar(criarBanner())

    const renderizado = secao.renderizar()

    expect(renderizado.tipo === 'secao' && renderizado.filhos[0].tipo).toBe('banner')
  })

  it('respeita um pai por elemento: não entra em duas seções ao mesmo tempo', () => {
    const banner = criarBanner()
    const primeira = new Secao('primeira', 'Primeira')
    const segunda = new Secao('segunda', 'Segunda')
    primeira.adicionar(banner)

    expect(() => segunda.adicionar(banner)).toThrow()

    primeira.remover(banner)
    segunda.adicionar(banner)
    expect(segunda.buscarPorId('campanha')).toBe(banner)
  })
})
