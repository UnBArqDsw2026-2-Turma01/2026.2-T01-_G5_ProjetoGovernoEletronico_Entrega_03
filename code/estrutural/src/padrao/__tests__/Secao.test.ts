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

// Testes da V2: Gustavo Fornaciari (@GUGOFO). Melhoria 1: multiplicidade 0..1 da composição
// "Elementos" do diagrama (cada elemento tem no máximo um pai).
describe('Secao: um pai por elemento', () => {
  it('rejeita um elemento que já pertence a outra seção', () => {
    const { minhaSaude, vacinas } = criarArvore()
    const outra = new Secao('outra', 'Outra')

    expect(() => outra.adicionar(vacinas)).toThrow()

    expect(outra.contarElementos()).toBe(0)
    expect(minhaSaude.buscarPorId('vacinas')).toBe(vacinas)
  })

  it('rejeita o mesmo elemento adicionado duas vezes à mesma seção', () => {
    const { minhaSaude, vacinas } = criarArvore()

    expect(() => minhaSaude.adicionar(vacinas)).toThrow()

    expect(minhaSaude.contarElementos()).toBe(3)
  })

  it('rejeita uma seção aninhada que já tem pai', () => {
    const { historico } = criarArvore()
    const outra = new Secao('outra', 'Outra')

    expect(() => outra.adicionar(historico)).toThrow()

    expect(outra.contarElementos()).toBe(0)
  })

  it('aceita o elemento em outra seção depois de removido da primeira', () => {
    const { minhaSaude, vacinas } = criarArvore()
    const outra = new Secao('outra', 'Outra')

    minhaSaude.remover(vacinas)
    outra.adicionar(vacinas)

    expect(outra.buscarPorId('vacinas')).toBe(vacinas)
    expect(minhaSaude.buscarPorId('vacinas')).toBeNull()
  })

  it('remover um elemento que não é filho não o desvincula do pai', () => {
    const { minhaSaude, vacinas } = criarArvore()
    const outra = new Secao('outra', 'Outra')

    outra.remover(vacinas)

    expect(() => outra.adicionar(vacinas)).toThrow()
    expect(minhaSaude.contarElementos()).toBe(3)
  })
})

// Testes da V2: Gustavo Fornaciari (@GUGOFO). Melhoria 2: amplia a nota do composto
// ("adicionar() rejeita a própria seção") para ciclos indiretos.
describe('Secao: sem ciclos', () => {
  it('rejeita adicionar a uma seção filha a seção que a contém', () => {
    const a = new Secao('a', 'A')
    const b = new Secao('b', 'B')
    a.adicionar(b)

    expect(() => b.adicionar(a)).toThrow(/ciclo/)
  })

  it('rejeita um ciclo em vários níveis de profundidade', () => {
    const a = new Secao('a', 'A')
    const b = new Secao('b', 'B')
    const c = new Secao('c', 'C')
    a.adicionar(b)
    b.adicionar(c)

    expect(() => c.adicionar(a)).toThrow(/ciclo/)
  })

  it('mantém a árvore intacta depois de rejeitar o ciclo', () => {
    const a = new Secao('a', 'A')
    const b = new Secao('b', 'B')
    a.adicionar(b)

    expect(() => b.adicionar(a)).toThrow()

    expect(b.contarElementos()).toBe(0)
    expect(a.buscarPorId('b')).toBe(b)
  })

  it('aceita aninhar seções que não formam ciclo', () => {
    const a = new Secao('a', 'A')
    const b = new Secao('b', 'B')
    const c = new Secao('c', 'C')
    a.adicionar(b)

    c.adicionar(a)

    expect(c.buscarPorId('b')).toBe(b)
  })

  it('aceita o que antes seria ciclo depois que a seção sai da árvore', () => {
    const a = new Secao('a', 'A')
    const b = new Secao('b', 'B')
    a.adicionar(b)
    a.remover(b)

    b.adicionar(a)

    expect(b.buscarPorId('a')).toBe(a)
  })
})
