// Autoria: Victor Leandro (@Afrontoso) — testes da folha CartaoDeAtalho (commit ce70b45)
import { describe, expect, it } from 'vitest'
import { CartaoDeAtalho } from '../CartaoDeAtalho'

describe('CartaoDeAtalho', () => {
  const cartao = new CartaoDeAtalho('vacinas', 'Vacinas', '💉', '/vacinas')

  it('conta a si mesmo como um único elemento', () => {
    expect(cartao.contarElementos()).toBe(1)
  })

  it('retorna a si mesmo quando o id é igual', () => {
    expect(cartao.buscarPorId('vacinas')).toBe(cartao)
  })

  it('retorna null quando o id é diferente', () => {
    expect(cartao.buscarPorId('exames')).toBeNull()
  })

  it('renderiza os próprios dados como um cartão', () => {
    expect(cartao.renderizar()).toEqual({
      tipo: 'cartao',
      id: 'vacinas',
      titulo: 'Vacinas',
      icone: '💉',
      url: '/vacinas',
    })
  })
})
