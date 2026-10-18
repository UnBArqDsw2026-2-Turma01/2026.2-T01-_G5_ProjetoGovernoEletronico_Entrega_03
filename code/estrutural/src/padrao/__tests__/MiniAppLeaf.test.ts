// Testes da folha MiniAppLeaf (Código V4): Ana Beatriz (@AnnaBeatrizAraujo). Verificam a nota do
// diagrama V4 sobre as folhas ("elemento individual, sem filhos") e o princípio aberto/fechado da
// V3: o novo tipo de folha entra na árvore sem alterar Secao nem Dashboard.
// Apoio de IA generativa: escrito com assistência do Claude; o uso de IA está relatado em IA.md.
import { describe, expect, it } from 'vitest'
import { CartaoDeAtalho } from '../CartaoDeAtalho'
import { Dashboard } from '../Dashboard'
import { MiniAppLeaf } from '../MiniAppLeaf'
import { Secao } from '../Secao'

const ids = (lista: { getId(): string }[]) => lista.map((e) => e.getId())

function criarMiniApp() {
  return new MiniAppLeaf(
    'acolhe-mais',
    'Acolhe Mais+',
    'Apoio e acolhimento em saúde mental.',
    '🤝',
  )
}

describe('MiniAppLeaf', () => {
  it('devolve o próprio id (operação getId da interface)', () => {
    expect(criarMiniApp().getId()).toBe('acolhe-mais')
  })

  it('conta a si mesmo como um único elemento (nota: contarElementos retorna 1)', () => {
    expect(criarMiniApp().contarElementos()).toBe(1)
  })

  it('retorna a si mesmo quando o id é igual (nota: buscarPorId retorna this)', () => {
    const miniApp = criarMiniApp()

    expect(miniApp.buscarPorId('acolhe-mais')).toBe(miniApp)
  })

  it('retorna null quando o id é diferente (retorno ElementoDeTela [0..1])', () => {
    expect(criarMiniApp().buscarPorId('outro-id')).toBeNull()
  })

  it('renderiza os próprios dados; o titulo do DTO recebe o nomeApp', () => {
    expect(criarMiniApp().renderizar()).toEqual({
      tipo: 'miniapp',
      id: 'acolhe-mais',
      titulo: 'Acolhe Mais+',
      descricao: 'Apoio e acolhimento em saúde mental.',
      icone: '🤝',
    })
  })
})

describe('MiniAppLeaf — buscarPorTexto', () => {
  it('retorna a si mesmo quando o nome contém o termo', () => {
    const miniApp = criarMiniApp()

    expect(miniApp.buscarPorTexto('acolhe')).toEqual([miniApp])
  })

  it('retorna a si mesmo quando a descrição contém o termo', () => {
    const miniApp = criarMiniApp()

    expect(miniApp.buscarPorTexto('saude mental')).toEqual([miniApp])
  })

  it('ignora acentos e maiúsculas', () => {
    const miniApp = criarMiniApp()

    expect(miniApp.buscarPorTexto('SAÚDE')).toEqual([miniApp])
    expect(miniApp.buscarPorTexto('acolhimento')).toEqual([miniApp])
  })

  it('retorna lista vazia sem correspondência ou com termo em branco', () => {
    const miniApp = criarMiniApp()

    expect(miniApp.buscarPorTexto('vacinas')).toEqual([])
    expect(miniApp.buscarPorTexto('   ')).toEqual([])
  })
})

describe('MiniAppLeaf na árvore do Composite', () => {
  it('é tratado como o CartaoDeAtalho por uma seção: cada folha conta um elemento', () => {
    const secao = new Secao('mini-apps', 'Mini apps')
    secao.adicionar(criarMiniApp())
    secao.adicionar(new CartaoDeAtalho('vacinas', 'Vacinas', '💉', '/vacinas'))

    expect(secao.contarElementos()).toBe(2)
  })

  it('é encontrado por id e por texto a partir da seção e do painel', () => {
    const miniApp = criarMiniApp()
    const secao = new Secao('mini-apps', 'Mini apps')
    secao.adicionar(miniApp)
    const painel = new Dashboard('painel', 'Meu SUS Digital')
    painel.adicionarSecao(secao)

    expect(secao.buscarPorId('acolhe-mais')).toBe(miniApp)
    expect(painel.buscarPorId('acolhe-mais')).toBe(miniApp)
    expect(ids(painel.buscarPorTexto('acolhe'))).toEqual(['acolhe-mais'])
    expect(painel.contarElementos()).toBe(1)
  })

  it('aparece como miniapp dentro da seção renderizada', () => {
    const secao = new Secao('mini-apps', 'Mini apps')
    secao.adicionar(criarMiniApp())

    const renderizado = secao.renderizar()

    expect(renderizado.tipo === 'secao' && renderizado.filhos[0].tipo).toBe('miniapp')
  })

  it('respeita um pai por elemento: não entra em duas seções ao mesmo tempo', () => {
    const miniApp = criarMiniApp()
    const primeira = new Secao('primeira', 'Primeira')
    const segunda = new Secao('segunda', 'Segunda')
    primeira.adicionar(miniApp)

    expect(() => segunda.adicionar(miniApp)).toThrow()

    primeira.remover(miniApp)
    segunda.adicionar(miniApp)
    expect(segunda.buscarPorId('acolhe-mais')).toBe(miniApp)
  })
})
