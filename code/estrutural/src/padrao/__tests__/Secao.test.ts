// Autoria: Victor Leandro (@Afrontoso) — testes do composto Secao (commit d575efa)
import { describe, expect, it } from 'vitest'
import { BannerInformativo } from '../BannerInformativo'
import { CartaoDeAtalho } from '../CartaoDeAtalho'
import type { ElementoDeTela } from '../ElementoDeTela'
import { Secao } from '../Secao'

function criarArvore() {
  const vacinas = new CartaoDeAtalho('vacinas', 'Vacinas', '💉', '/vacinas')
  const exames = new CartaoDeAtalho('exames', 'Exames', '🧪', '/exames')
  const banner = new BannerInformativo(
    'campanha',
    'Campanha',
    'Vacine-se.',
    '/banner.svg',
  )

  const historico = new Secao('historico', 'Histórico clínico')
  historico.adicionar(exames)

  const minhaSaude = new Secao('minha-saude', 'Minha Saúde')
  minhaSaude.adicionar(vacinas)
  minhaSaude.adicionar(banner)
  minhaSaude.adicionar(historico)

  return { minhaSaude, historico, vacinas, exames, banner }
}

describe('Secao', () => {
  it('começa vazia, sem elementos para contar', () => {
    expect(new Secao('vazia', 'Vazia').contarElementos()).toBe(0)
  })

  it('soma os elementos dos filhos, incluindo seções aninhadas', () => {
    const { minhaSaude, historico } = criarArvore()

    expect(historico.contarElementos()).toBe(1)
    expect(minhaSaude.contarElementos()).toBe(3)
  })

  it('trata cartões e banners da mesma forma ao contar', () => {
    const secao = new Secao('destaques', 'Destaques')
    secao.adicionar(new CartaoDeAtalho('c', 'Cartão', '⭐', '/c'))
    secao.adicionar(new BannerInformativo('b', 'Banner', 'Aviso', '/b.svg'))

    expect(secao.contarElementos()).toBe(2)
  })

  it('encontra a própria seção pelo id', () => {
    const { minhaSaude } = criarArvore()

    expect(minhaSaude.buscarPorId('minha-saude')).toBe(minhaSaude)
  })

  it('busca recursivamente em seções aninhadas', () => {
    const { minhaSaude, exames } = criarArvore()

    expect(minhaSaude.buscarPorId('exames')).toBe(exames)
  })

  it('retorna null quando nenhum elemento tem o id', () => {
    const { minhaSaude } = criarArvore()

    expect(minhaSaude.buscarPorId('inexistente')).toBeNull()
  })

  it('remove um filho existente', () => {
    const { minhaSaude, vacinas } = criarArvore()

    minhaSaude.remover(vacinas)

    expect(minhaSaude.buscarPorId('vacinas')).toBeNull()
    expect(minhaSaude.contarElementos()).toBe(2)
  })

  it('ignora a remoção de um elemento que não é filho', () => {
    const { minhaSaude } = criarArvore()

    minhaSaude.remover(new CartaoDeAtalho('outro', 'Outro', '❔', '/outro'))

    expect(minhaSaude.contarElementos()).toBe(3)
  })

  it('não aceita adicionar a si mesma', () => {
    const secao = new Secao('s', 'Seção')

    expect(() => secao.adicionar(secao)).toThrow()
  })

  it('não aceita adicionar um elemento nulo', () => {
    const secao = new Secao('s', 'Seção')

    expect(() => secao.adicionar(null as unknown as ElementoDeTela)).toThrow()
  })

  it('renderiza a árvore inteira chamando renderizar() de cada filho', () => {
    const { minhaSaude } = criarArvore()

    const renderizado = minhaSaude.renderizar()

    expect(renderizado.tipo).toBe('secao')
    if (renderizado.tipo !== 'secao') return
    expect(renderizado.filhos.map((filho) => filho.tipo)).toEqual([
      'cartao',
      'banner',
      'secao',
    ])
    const historico = renderizado.filhos[2]
    expect(historico.tipo === 'secao' && historico.filhos[0].id).toBe('exames')
  })
})
