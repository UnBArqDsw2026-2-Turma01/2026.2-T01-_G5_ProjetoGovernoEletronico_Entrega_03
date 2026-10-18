// Testes da folha CardFaqLeaf (Código V4): Ana Beatriz (@AnnaBeatrizAraujo). Verificam a nota do
// diagrama V4 sobre as folhas ("elemento individual, sem filhos") e o princípio aberto/fechado da
// V3: o novo tipo de folha entra na árvore sem alterar Secao nem Dashboard.
// Apoio de IA generativa: escrito com assistência do Claude; o uso de IA está relatado em IA.md.
import { describe, expect, it } from 'vitest'
import { BannerInformativo } from '../BannerInformativo'
import { CardFaqLeaf } from '../CardFaqLeaf'
import { Dashboard } from '../Dashboard'
import { Secao } from '../Secao'

const ids = (lista: { getId(): string }[]) => lista.map((e) => e.getId())

function criarFaq() {
  return new CardFaqLeaf(
    'faq-login',
    'Como acesso o Meu SUS Digital?',
    'Entre com a sua conta gov.br e autorize o uso dos dados.',
    'Acesso',
  )
}

describe('CardFaqLeaf', () => {
  it('devolve o próprio id (operação getId da interface)', () => {
    expect(criarFaq().getId()).toBe('faq-login')
  })

  it('conta a si mesmo como um único elemento (nota: contarElementos retorna 1)', () => {
    expect(criarFaq().contarElementos()).toBe(1)
  })

  it('retorna a si mesmo quando o id é igual (nota: buscarPorId retorna this)', () => {
    const faq = criarFaq()

    expect(faq.buscarPorId('faq-login')).toBe(faq)
  })

  it('retorna null quando o id é diferente (retorno ElementoDeTela [0..1])', () => {
    expect(criarFaq().buscarPorId('outro-id')).toBeNull()
  })

  it('renderiza os próprios dados; o titulo do DTO recebe a pergunta', () => {
    expect(criarFaq().renderizar()).toEqual({
      tipo: 'faq',
      id: 'faq-login',
      titulo: 'Como acesso o Meu SUS Digital?',
      resposta: 'Entre com a sua conta gov.br e autorize o uso dos dados.',
      categoria: 'Acesso',
    })
  })
})

describe('CardFaqLeaf — buscarPorTexto', () => {
  it('retorna a si mesmo quando a pergunta contém o termo', () => {
    const faq = criarFaq()

    expect(faq.buscarPorTexto('acesso o meu')).toEqual([faq])
  })

  it('retorna a si mesmo quando a resposta contém o termo', () => {
    const faq = criarFaq()

    expect(faq.buscarPorTexto('gov.br')).toEqual([faq])
  })

  it('ignora acentos e maiúsculas', () => {
    const faq = criarFaq()

    expect(faq.buscarPorTexto('AUTORIZE')).toEqual([faq])
    expect(faq.buscarPorTexto('conta GOV.BR')).toEqual([faq])
  })

  it('retorna lista vazia sem correspondência ou com termo em branco', () => {
    const faq = criarFaq()

    expect(faq.buscarPorTexto('vacinas')).toEqual([])
    expect(faq.buscarPorTexto('   ')).toEqual([])
  })
})

describe('CardFaqLeaf na árvore do Composite', () => {
  it('é tratado como outra folha por uma seção: cada folha conta um elemento', () => {
    const secao = new Secao('duvidas', 'Dúvidas frequentes')
    secao.adicionar(criarFaq())
    secao.adicionar(new BannerInformativo('campanha', 'Campanha', 'Vacine-se.', '/banner.svg'))

    expect(secao.contarElementos()).toBe(2)
  })

  it('é encontrado por id e por texto a partir da seção e do painel', () => {
    const faq = criarFaq()
    const secao = new Secao('duvidas', 'Dúvidas frequentes')
    secao.adicionar(faq)
    const painel = new Dashboard('painel', 'Meu SUS Digital')
    painel.adicionarSecao(secao)

    expect(secao.buscarPorId('faq-login')).toBe(faq)
    expect(painel.buscarPorId('faq-login')).toBe(faq)
    expect(ids(painel.buscarPorTexto('gov.br'))).toEqual(['faq-login'])
    expect(painel.contarElementos()).toBe(1)
  })

  it('aparece como faq dentro da seção renderizada', () => {
    const secao = new Secao('duvidas', 'Dúvidas frequentes')
    secao.adicionar(criarFaq())

    const renderizado = secao.renderizar()

    expect(renderizado.tipo === 'secao' && renderizado.filhos[0].tipo).toBe('faq')
  })

  it('respeita um pai por elemento: não entra em duas seções ao mesmo tempo', () => {
    const faq = criarFaq()
    const primeira = new Secao('primeira', 'Primeira')
    const segunda = new Secao('segunda', 'Segunda')
    primeira.adicionar(faq)

    expect(() => segunda.adicionar(faq)).toThrow()

    primeira.remover(faq)
    segunda.adicionar(faq)
    expect(segunda.buscarPorId('faq-login')).toBe(faq)
  })
})
