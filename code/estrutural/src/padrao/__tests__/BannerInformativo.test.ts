// Autoria: Victor Leandro (@Afrontoso) — testes da folha BannerInformativo (commit fd71b23)
import { describe, expect, it } from 'vitest'
import { BannerInformativo } from '../BannerInformativo'

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
