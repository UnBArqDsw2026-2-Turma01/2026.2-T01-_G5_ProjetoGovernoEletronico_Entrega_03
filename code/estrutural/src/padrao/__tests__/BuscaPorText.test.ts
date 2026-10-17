import { describe, expect, it } from 'vitest'
import { BannerInformativo } from '../BannerInformativo'
import { CartaoDeAtalho } from '../CartaoDeAtalho'
import { Dashboard } from '../Dashboard'
import { Secao } from '../Secao'

function montar() {
  const painel = new Dashboard('d', 'Painel')
  const saude = new Secao('s1', 'Minha Saúde')
  const mais = new Secao('s2', 'Mais serviços')
  mais.adicionar(new CartaoDeAtalho('c1', 'Vacinação', 'icone', '/vacinas'))
  saude.adicionar(mais)
  saude.adicionar(new BannerInformativo('b1', 'Campanha', 'Vacine-se contra a gripe', 'img'))
  painel.adicionarSecao(saude)
  return painel
}

const ids = (lista: { getId(): string }[]) => lista.map((e) => e.getId())

describe('buscarPorTexto', () => {
  it('encontra folhas em seções aninhadas', () => {
    expect(ids(montar().buscarPorTexto('vacin'))).toEqual(['c1', 'b1'])
  })
  it('ignora acentos e maiúsculas', () => {
    expect(ids(montar().buscarPorTexto('VACINACAO'))).toEqual(['c1'])
  })
  it('inclui a própria seção quando o título contém o termo', () => {
    expect(ids(montar().buscarPorTexto('saude'))).toEqual(['s1'])
  })
  it('retorna lista vazia para termo em branco ou sem resultado', () => {
    expect(montar().buscarPorTexto('   ')).toEqual([])
    expect(montar().buscarPorTexto('xyz')).toEqual([])
  })
})